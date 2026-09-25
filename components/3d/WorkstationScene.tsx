import { useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createMascot } from './Mascot';
import { createParticles } from './Particles';
import {
  SceneContainer,
  disposeObjectTree,
  type SceneContext,
  type SceneFactory,
  type SceneLifecycle,
  type SceneStatus,
} from './SceneContainer';

interface WorkstationSceneProps {
  label?: string;
  onStatus?: (status: SceneStatus) => void;
}

/**
 * Builds the monitor screen as a canvas texture: HAESSLER WORLD identity,
 * SYSTEM ONLINE status and the four domains — drawn once, no per-frame
 * texture updates.
 */
function buildScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 400;
  const g = canvas.getContext('2d');
  if (!g) throw new Error('2D context unavailable');

  g.fillStyle = '#0B1117';
  g.fillRect(0, 0, canvas.width, canvas.height);

  g.fillStyle = '#111A22';
  g.fillRect(0, 0, canvas.width, 44);
  ['#ff5f57', '#febc2e', '#28c840'].forEach((color, index) => {
    g.fillStyle = color;
    g.beginPath();
    g.arc(28 + index * 24, 22, 6, 0, Math.PI * 2);
    g.fill();
  });

  g.fillStyle = '#00E5FF';
  g.font = '700 50px "JetBrains Mono", monospace';
  g.fillText('HΛESSLER_WORLD', 40, 138);

  g.fillStyle = '#4CC9FF';
  g.font = '24px "JetBrains Mono", monospace';
  g.fillText('SYSTEM ONLINE', 40, 190);

  g.fillStyle = '#8A9AA5';
  g.font = '20px "JetBrains Mono", monospace';
  ['FULL STACK', 'MOBILE', 'ARCHITECTURE', 'AI'].forEach((domain, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    g.fillText(domain, 40 + column * 280, 252 + row * 40);
  });

  g.fillStyle = 'rgba(0,0,0,0.10)';
  for (let y = 0; y < canvas.height; y += 4) {
    g.fillRect(0, y, canvas.width, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/**
 * HAESSLER WORLD opening scene: a stylized engineering workstation — desk,
 * monitor (live screen texture), keyboard, mug, cable, books, the mascot and
 * ambient particles in a dark atmospheric space.
 *
 * Deliberately low-poly primitives (no downloaded assets except the mascot
 * GLB), so the whole scene is a few dozen draw calls and works on mobile.
 * Composition is the default view; the visitor may orbit gently but never
 * has to. Everything decorative — the camera never gates comprehension,
 * because every fact on the screen exists as HTML in the hero.
 */
export function createWorkstationScene(ctx: SceneContext): SceneLifecycle {
  const { scene, camera, renderer, isMobile, prefersReducedMotion, pointer } =
    ctx;

  const world = new THREE.Group();
  scene.add(world);

  camera.position.set(0, 1.55, 5.1);
  camera.lookAt(0, 0.95, 0);

  // — lighting: cool ambient, soft key, cyan rim, screen glow.
  const ambient = new THREE.AmbientLight(0x3a4a58, 0.85);
  const key = new THREE.DirectionalLight(0xbfe9ff, 1.0);
  key.position.set(2.6, 4.2, 2.4);
  const rim = new THREE.DirectionalLight(0x00e5ff, 0.55);
  rim.position.set(-3.2, 2.4, -2.6);
  const screenGlow = new THREE.PointLight(0x9fd8ff, 1.3, 6);
  screenGlow.position.set(0, 1.4, 0.4);
  world.add(ambient, key, rim, screenGlow);

  // — materials.
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x111a22,
    metalness: 0.35,
    roughness: 0.55,
  });
  const deskMaterial = new THREE.MeshStandardMaterial({
    color: 0x0e1620,
    metalness: 0.2,
    roughness: 0.85,
  });
  const darkMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a1016,
    metalness: 0.3,
    roughness: 0.7,
  });

  // — ground disc.
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(2.8, 48),
    new THREE.MeshBasicMaterial({ color: 0x070b10 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.005;
  world.add(ground);

  // — desk and legs.
  const desk = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.08, 1.5), deskMaterial);
  desk.position.set(0, 0.43, 0);
  world.add(desk);

  const legGeometry = new THREE.BoxGeometry(0.08, 0.42, 0.08);
  ([
    [-1.55, 0.6],
    [1.55, 0.6],
    [-1.55, -0.6],
    [1.55, -0.6],
  ] as const).forEach(([x, z]) => {
    const leg = new THREE.Mesh(legGeometry, darkMaterial);
    leg.position.set(x, 0.21, z);
    world.add(leg);
  });

  // — monitor.
  const monitor = new THREE.Mesh(new THREE.BoxGeometry(1.62, 1.0, 0.07), frameMaterial);
  monitor.position.set(0, 1.35, -0.35);
  const stand = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.52, 0.07), frameMaterial);
  stand.position.set(0, 0.73, -0.37);
  const standBase = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.3), frameMaterial);
  standBase.position.set(0, 0.49, -0.37);
  world.add(monitor, stand, standBase);

  const screenTexture = buildScreenTexture();
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 0.9),
    new THREE.MeshBasicMaterial({ map: screenTexture })
  );
  screen.position.set(0, 1.35, -0.305);
  world.add(screen);

  const led = new THREE.Mesh(
    new THREE.SphereGeometry(0.012, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0x00e5ff })
  );
  led.position.set(0.72, 0.9, -0.3);
  world.add(led);

  // — desk props: keyboard, mug, cable, books (the warm human hint).
  const keyboard = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.035, 0.3), frameMaterial);
  keyboard.position.set(0, 0.485, 0.42);
  keyboard.rotation.x = -0.05;
  world.add(keyboard);

  const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.075, 0.17, 24), darkMaterial);
  mug.position.set(1.0, 0.555, 0.3);
  world.add(mug);

  const cableCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 0.5, -0.35),
    new THREE.Vector3(-0.5, 0.1, 0.4),
    new THREE.Vector3(-1.2, 0.47, 0.45)
  );
  const cable = new THREE.Mesh(
    new THREE.TubeGeometry(cableCurve, 24, 0.008, 6),
    darkMaterial
  );
  world.add(cable);

  const bookA = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.04, 0.22),
    new THREE.MeshStandardMaterial({ color: 0x8a5a3b, roughness: 0.8 })
  );
  const bookB = new THREE.Mesh(
    new THREE.BoxGeometry(0.26, 0.035, 0.19),
    new THREE.MeshStandardMaterial({ color: 0x1a2730, roughness: 0.8 })
  );
  bookA.position.set(1.35, 0.5, -0.35);
  bookB.position.set(1.34, 0.538, -0.34);
  bookB.rotation.y = 0.18;
  world.add(bookA, bookB);

  // — floating area anchors. Placeholders for the Phase-4 world objects
  //   (MOBILE electric blue / SYSTEM cyan / WEB3 violet); they give the
  //   opening frame depth and preview the area color language. The heaviest
  //   one (torus knot) is dropped on mobile to cut geometry.
  const floaters: Array<{
    mesh: THREE.Mesh;
    baseY: number;
    speed: number;
    phase: number;
  }> = [];
  const floaterSpecs = [
    {
      geo: new THREE.OctahedronGeometry(0.16) as THREE.BufferGeometry,
      color: 0x3d8bff,
      pos: [-1.7, 2.0, 0.1],
      speed: 0.5,
      phase: 0,
    },
    {
      geo: new THREE.IcosahedronGeometry(0.13) as THREE.BufferGeometry,
      color: 0x00e5ff,
      pos: [1.75, 2.25, -0.3],
      speed: 0.65,
      phase: 1.8,
    },
    ...(isMobile
      ? []
      : [
          {
            geo: new THREE.TorusKnotGeometry(0.1, 0.035, 64, 8),
            color: 0x8b5cf6,
            pos: [0.1, 2.5, -0.9],
            speed: 0.4,
            phase: 3.1,
          },
        ]),
  ];
  floaterSpecs.forEach(({ geo, color, pos, speed, phase }) => {
    const material = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.55,
      roughness: 0.35,
      metalness: 0.2,
    });
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(pos[0], pos[1], pos[2]);
    world.add(mesh);
    floaters.push({ mesh, baseY: pos[1], speed, phase });
  });

  // — ambient particles and mascot.
  const particles = createParticles(ctx, {
    count: isMobile ? 50 : 160,
    bounds: { x: 4, y: 4.5, z: 3 },
  });
  const mascot = createMascot(ctx, {
    url: '/dog.glb',
    desiredHeight: isMobile ? 0.7 : 0.85,
    position: [-1.15, 0.47, 0.3],
    rotationY: 0.55,
  });

  // — gentle orbit: a controlled camera the visitor may play with, never one
  //   they must master. On touch, vertical scrolling stays alive over the
  //   canvas; horizontal drags rotate.
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.95, 0);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.rotateSpeed = 0.45;
  controls.minPolarAngle = Math.PI * 0.3;
  controls.maxPolarAngle = Math.PI * 0.55;
  controls.autoRotate = !prefersReducedMotion;
  controls.autoRotateSpeed = 0.4;
  if (isMobile) {
    renderer.domElement.style.touchAction = 'pan-y';
  }

  /**
   * Portrait reframe: a phone screen is tall and narrow, so the landscape
   * composition would crop the workstation. Pulling the camera back and
   * raising the target keeps desk + monitor + mascot in frame without
   * shrinking the HTML content. Fires through `ctx.onResize` on mount and
   * on every rotation/resize; landscape restores the default composition.
   */
  let portrait = camera.aspect < 0.95;
  const applyFraming = () => {
    const nextPortrait = camera.aspect < 0.95;
    if (nextPortrait === portrait) return;
    portrait = nextPortrait;

    if (portrait) {
      camera.position.set(0, 1.35, 7.8);
      controls.target.set(0, 1.25, 0);
    } else {
      camera.position.set(0, 1.55, 5.1);
      controls.target.set(0, 0.95, 0);
    }
    controls.update();
  };
  ctx.onResize(() => applyFraming());

  const update = (time: number, delta: number) => {
    if (!prefersReducedMotion) {
      particles.update(time, delta);
      floaters.forEach((floater) => {
        floater.mesh.rotation.y += delta * floater.speed;
        floater.mesh.rotation.x += delta * floater.speed * 0.4;
        floater.mesh.position.y =
          floater.baseY + Math.sin(time * 0.9 + floater.phase) * 0.07;
      });
      screenGlow.intensity = 1.3 + Math.sin(time * 2.2) * 0.07;

      // Pointer parallax on the world itself — works with, not against, the
      // orbit controls that own the camera.
      const tiltY = pointer.x * 0.05;
      const tiltX = -pointer.y * 0.035;
      world.rotation.y += (tiltY - world.rotation.y) * 0.05;
      world.rotation.x += (tiltX - world.rotation.x) * 0.05;
    }

    mascot.update(time, prefersReducedMotion ? { x: 0, y: 0 } : pointer);
    controls.update();
  };

  const dispose = () => {
    controls.dispose();
    mascot.dispose();
    particles.dispose();
    scene.remove(world);
    disposeObjectTree(world);
  };

  return { update, dispose, ready: mascot.ready };
}

/**
 * React wrapper around the raw-Three factory. Loaded client-side only via
 * `next/dynamic` from the hero, so three.js never blocks first paint.
 */
export const WorkstationScene = ({ label, onStatus }: WorkstationSceneProps) => {
  const factory = useMemo<SceneFactory>(() => createWorkstationScene, []);

  return <SceneContainer create={factory} label={label} onStatus={onStatus} />;
};

export default WorkstationScene;

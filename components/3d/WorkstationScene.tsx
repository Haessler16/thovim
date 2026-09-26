import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { createMascot } from './Mascot';
import { createParticles } from './Particles';
import {
  AREA_POSITIONS,
  createWorldObjects,
} from './WorldObjects';
import {
  SceneContainer,
  disposeObjectTree,
  type SceneContext,
  type SceneFactory,
  type SceneLifecycle,
  type SceneStatus,
} from './SceneContainer';
import type { WorldAreaId } from '../../lib/experience/content';

interface WorkstationSceneProps {
  label?: string;
  onStatus?: (status: SceneStatus) => void;
  /** Monitor screen copy — comes from the dictionary, not hardcoded. */
  systemName: string;
  systemStatus: string;
  domains: string[];
  /** Hover over a world object (null = pointer left every object). */
  onHoverArea?: (areaId: WorldAreaId | null) => void;
  /** An area object was clicked; the hero opens the proof panel. */
  onActivateArea?: (areaId: WorldAreaId) => void;
  /** Imperative API handed to the hero once the scene exists. */
  onReady?: (api: WorldSceneApi) => void;
}

export interface WorldSceneApi {
  /** Flies the camera to an area (or back to the default framing on null). */
  focusArea: (areaId: WorldAreaId | null) => void;
}

/**
 * Builds the monitor screen from dictionary strings: world identity, status
 * and the four domains — drawn once, no per-frame texture updates.
 */
function buildScreenTexture(
  systemName: string,
  systemStatus: string,
  domains: string[]
): THREE.CanvasTexture {
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
  g.font = '700 46px "JetBrains Mono", monospace';
  g.fillText(systemName, 40, 138);

  g.fillStyle = '#4CC9FF';
  g.font = '24px "JetBrains Mono", monospace';
  g.fillText(systemStatus, 40, 190);

  g.fillStyle = '#8A9AA5';
  g.font = '20px "JetBrains Mono", monospace';
  domains.forEach((domain, index) => {
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

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * HAESSLER WORLD opening scene: the workstation plus six interactive area
 * objects standing in the space around it (Phase 4). Low-poly primitives
 * throughout; every string comes from the dictionaries via the hero.
 *
 * Camera contract (§5): a clear default composition that already works, a
 * gentle orbit the visitor may play with, wheel/pinch zoom bounded to a
 * sensible range around the desk, and a smooth dolly to an area object when
 * it is activated — always returning to the default frame. The camera never
 * gates comprehension: the hero's HTML carries every fact.
 */
export function createWorkstationScene(
  ctx: SceneContext,
  props: WorkstationSceneProps
): SceneLifecycle {
  const { scene, camera, renderer, isMobile, prefersReducedMotion, pointer } =
    ctx;

  const world = new THREE.Group();
  scene.add(world);

  const DEFAULT_LANDSCAPE = {
    position: new THREE.Vector3(0, 1.55, 5.1),
    target: new THREE.Vector3(0, 0.95, 0),
  };
  const DEFAULT_PORTRAIT = {
    position: new THREE.Vector3(0, 1.35, 7.8),
    target: new THREE.Vector3(0, 1.25, 0),
  };

  camera.position.copy(DEFAULT_LANDSCAPE.position);
  camera.lookAt(DEFAULT_LANDSCAPE.target);

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

  // — monitor (screen copy drawn from the dictionary).
  const monitor = new THREE.Mesh(new THREE.BoxGeometry(1.62, 1.0, 0.07), frameMaterial);
  monitor.position.set(0, 1.35, -0.35);
  const stand = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.52, 0.07), frameMaterial);
  stand.position.set(0, 0.73, -0.37);
  const standBase = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.3), frameMaterial);
  standBase.position.set(0, 0.49, -0.37);
  world.add(monitor, stand, standBase);

  const screenTexture = buildScreenTexture(
    props.systemName,
    props.systemStatus,
    props.domains
  );
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

  // — decorative depth floaters (area-colored; dropped heavy one on mobile).
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
  //   they must master. Bounded zoom (wheel on desktop) leans into the desk;
  //   pan stays off; on touch, one-finger vertical scrolling stays alive.
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(DEFAULT_LANDSCAPE.target);
  controls.enablePan = false;
  controls.enableZoom = !isMobile;
  controls.minDistance = 3.4;
  controls.maxDistance = 9;
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.rotateSpeed = 0.45;
  controls.zoomSpeed = 0.6;
  controls.minPolarAngle = Math.PI * 0.3;
  controls.maxPolarAngle = Math.PI * 0.55;
  controls.autoRotate = !prefersReducedMotion;
  controls.autoRotateSpeed = 0.4;
  if (isMobile) {
    renderer.domElement.style.touchAction = 'pan-y';
  }

  /** Portrait reframe (see SceneContainer onResize contract). */
  let portrait = camera.aspect < 0.95;
  const defaultView = () => (portrait ? DEFAULT_PORTRAIT : DEFAULT_LANDSCAPE);
  const applyFraming = () => {
    const nextPortrait = camera.aspect < 0.95;
    if (nextPortrait === portrait) return;
    portrait = nextPortrait;
    const view = defaultView();
    camera.position.copy(view.position);
    controls.target.copy(view.target);
    controls.update();
  };
  ctx.onResize(() => applyFraming());

  // — camera flights: object → camera dolly (§8), eased, interruptible.
  interface Flight {
    fromPosition: THREE.Vector3;
    toPosition: THREE.Vector3;
    fromTarget: THREE.Vector3;
    toTarget: THREE.Vector3;
    elapsed: number;
    duration: number;
  }
  let flight: Flight | null = null;

  const flyTo = (position: THREE.Vector3, target: THREE.Vector3) => {
    controls.autoRotate = false;
    flight = {
      fromPosition: camera.position.clone(),
      toPosition: position.clone(),
      fromTarget: controls.target.clone(),
      toTarget: target.clone(),
      elapsed: 0,
      duration: 0.95,
    };
  };

  // — interactive world objects (hover/click/pick live in WorldObjects).
  const worldObjects = createWorldObjects(ctx, {
    onHover: (areaId) => props.onHoverArea?.(areaId),
    onSelect: (areaId) => {
      worldObjects.setActive(areaId);
      const [x, y, z] = AREA_POSITIONS[areaId];
      // Frame the object off-center-left so the HTML panel can share the
      // stage without covering it, pulling in along the world axis.
      flyTo(
        new THREE.Vector3(x * 0.55, y + 0.3, z + 2.3),
        new THREE.Vector3(x * 0.9, y, z)
      );
      props.onActivateArea?.(areaId);
    },
  });

  const api: WorldSceneApi = {
    focusArea(areaId) {
      if (areaId === null) {
        worldObjects.setActive(null);
        const view = defaultView();
        flyTo(view.position, view.target);
        return;
      }
      const [x, y, z] = AREA_POSITIONS[areaId];
      flyTo(
        new THREE.Vector3(x * 0.55, y + 0.3, z + 2.3),
        new THREE.Vector3(x * 0.9, y, z)
      );
    },
  };
  props.onReady?.(api);

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

      // Pointer parallax pauses while the camera is flying so it never
      // fights the dolly.
      if (!flight) {
        const tiltY = pointer.x * 0.05;
        const tiltX = -pointer.y * 0.035;
        world.rotation.y += (tiltY - world.rotation.y) * 0.05;
        world.rotation.x += (tiltX - world.rotation.x) * 0.05;
      }
    }

    if (flight) {
      flight.elapsed += delta;
      const t = Math.min(flight.elapsed / flight.duration, 1);
      const k = easeInOutCubic(t);
      camera.position.lerpVectors(flight.fromPosition, flight.toPosition, k);
      controls.target.lerpVectors(flight.fromTarget, flight.toTarget, k);
      if (t >= 1) flight = null;
    }

    mascot.update(time, prefersReducedMotion ? { x: 0, y: 0 } : pointer);
    worldObjects.update(time, delta);
    controls.update();
  };

  const dispose = () => {
    controls.dispose();
    worldObjects.dispose();
    mascot.dispose();
    particles.dispose();
    screenTexture.dispose();
    scene.remove(world);
    disposeObjectTree(world);
  };

  return { update, dispose, ready: mascot.ready };
}

/**
 * React wrapper around the raw-Three factory. Client-only (the hero imports
 * it through `next/dynamic`), so three.js never blocks first paint. Latest
 * callbacks are kept in a ref so hover/click wiring survives hero re-renders
 * without rebuilding the scene.
 */
export const WorkstationScene = ({
  label,
  onStatus,
  systemName,
  systemStatus,
  domains,
  onHoverArea,
  onActivateArea,
  onReady,
}: WorkstationSceneProps) => {
  const latest = useRef({
    onHoverArea,
    onActivateArea,
    onReady,
  });

  useEffect(() => {
    latest.current = { onHoverArea, onActivateArea, onReady };
  }, [onHoverArea, onActivateArea, onReady]);

  const factory = useMemo<SceneFactory>(
    () => (sceneCtx) =>
      createWorkstationScene(sceneCtx, {
        // Screen copy is read once at scene creation; the scene remounts on
        // locale change because the whole page tree re-renders under it.
        systemName,
        systemStatus,
        domains,
        onHoverArea: (areaId) => latest.current.onHoverArea?.(areaId),
        onActivateArea: (areaId) => latest.current.onActivateArea?.(areaId),
        onReady: (api) => latest.current.onReady?.(api),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <SceneContainer create={factory} label={label} onStatus={onStatus} />
  );
};

export default WorkstationScene;

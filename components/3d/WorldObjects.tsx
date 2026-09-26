import * as THREE from 'three';

import type { WorldAreaId } from '../../lib/experience/content';
import { disposeObjectTree, type SceneContext } from './SceneContainer';

/**
 * Interactive world objects (Phase 4, §7–8 of the brief).
 *
 * Six discoverable areas standing in the space around the workstation, each a
 * low-poly object with its semantic accent (§14): MOBILE electric blue,
 * WEB3 violet, BACKEND/ARCHITECTURE cyan, AI magenta, HUMAN warm amber.
 *
 * The layer owns picking, hover reaction and click dispatch ONLY. Everything
 * those objects mean — names, metrics, copy, links — comes from
 * `lib/experience/content.ts` and the dictionaries via the panel in the hero,
 * so no portfolio data is hardcoded in scene logic (§29). Rendering is
 * raycast against emissive meshes; the pointer state comes from the container
 * so the hero's HTML layer and the scene share one input.
 */

/** Semantic accent hex per world area (mirrors `lib/theme.ts` tokens). */
const ACCENT_HEX: Record<WorldAreaId, number> = {
  mobile: 0x3d8bff,
  web3: 0x8b5cf6,
  backend: 0x00e5ff,
  architecture: 0x00e5ff,
  ai: 0xe14fd1,
  human: 0xf5a97f,
  nexxo: 0x3d8bff,
};

/**
 * Portrait-friendly ring layout around the workstation (x, y, z).
 * Exported: the workstation scene derives each area's camera framing from
 * the same coordinates, so moving an object moves its focus with it.
 */
export const AREA_POSITIONS: Record<WorldAreaId, [number, number, number]> = {
  mobile: [-2.15, 1.85, 0.35],
  web3: [2.2, 1.95, 0.1],
  backend: [-2.3, 0.75, -0.9],
  architecture: [2.35, 0.9, -1.05],
  ai: [-1.05, 3.05, -1.35],
  human: [1.15, 3.1, -1.5],
  // The product lab stands closer than the rest: a personal product deserves
  // to be discovered, not hunted for (§3).
  nexxo: [-0.1, 3.35, 1.1],
};

/**
 * Per-area object builders. Deliberately low-poly so the six objects cost
 * less than the monitor they orbit. Geometry choices follow the brief §7:
 * phone, network chain, server, node graph, AI core, sketchbook.
 */
function buildAreaObject(
  id: WorldAreaId,
  accent: number
): { object: THREE.Group; geometry: THREE.BufferGeometry } {
  const group = new THREE.Group();

  switch (id) {
    case 'mobile': {
      // Smartphone: rounded slab, emissive screen.
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.26, 0.5, 0.03),
        new THREE.MeshStandardMaterial({
          color: 0x111a22,
          metalness: 0.5,
          roughness: 0.4,
        })
      );
      const screenGeo = new THREE.PlaneGeometry(0.22, 0.42);
      const screen = new THREE.Mesh(
        screenGeo,
        new THREE.MeshBasicMaterial({ color: accent })
      );
      screen.position.z = 0.017;
      group.add(body, screen);
      break;
    }
    case 'web3': {
      // Network chain: three blocks joined by links.
      const blockGeo = new THREE.BoxGeometry(0.14, 0.14, 0.14);
      const blockMaterial = new THREE.MeshStandardMaterial({
        color: 0x111a22,
        emissive: accent,
        emissiveIntensity: 0.5,
        metalness: 0.4,
        roughness: 0.4,
      });
      [-0.17, 0, 0.17].forEach((x, index) => {
        const block = new THREE.Mesh(blockGeo, blockMaterial);
        block.position.set(x, index % 2 === 0 ? -0.05 : 0.05, 0);
        block.rotation.y = 0.4;
        group.add(block);
      });
      break;
    }
    case 'backend': {
      // Server: two stacked rack units with a status strip.
      const unitGeo = new THREE.BoxGeometry(0.34, 0.12, 0.24);
      const unitMaterial = new THREE.MeshStandardMaterial({
        color: 0x111a22,
        metalness: 0.45,
        roughness: 0.45,
      });
      const stripGeo = new THREE.PlaneGeometry(0.26, 0.02);
      const stripMaterial = new THREE.MeshBasicMaterial({ color: accent });
      [0.075, -0.075].forEach((y) => {
        const unit = new THREE.Mesh(unitGeo, unitMaterial);
        unit.position.y = y;
        group.add(unit);
        const strip = new THREE.Mesh(stripGeo, stripMaterial);
        strip.position.set(0, y + 0.02, 0.121);
        group.add(strip);
      });
      break;
    }
    case 'architecture': {
      // Node graph: central hub with three satellites and link lines.
      const hubGeo = new THREE.SphereGeometry(0.07, 16, 16);
      const hubMaterial = new THREE.MeshStandardMaterial({
        color: 0x111a22,
        emissive: accent,
        emissiveIntensity: 0.65,
        roughness: 0.35,
      });
      const hub = new THREE.Mesh(hubGeo, hubMaterial);
      group.add(hub);
      const satelliteGeo = new THREE.SphereGeometry(0.035, 12, 12);
      const satelliteMaterial = new THREE.MeshBasicMaterial({ color: accent });
      const linkMaterial = new THREE.LineBasicMaterial({
        color: accent,
        transparent: true,
        opacity: 0.45,
      });
      [
        [0.17, 0.1, 0],
        [-0.17, 0.1, 0],
        [0, -0.16, 0.05],
      ].forEach(([x, y, z]) => {
        const satellite = new THREE.Mesh(satelliteGeo, satelliteMaterial);
        satellite.position.set(x, y, z);
        group.add(satellite);
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(x, y, z),
          ]),
          linkMaterial
        );
        group.add(line);
      });
      break;
    }
    case 'ai': {
      // AI core: icosahedron shell over a glowing nucleus.
      const shell = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.16, 0),
        new THREE.MeshStandardMaterial({
          color: 0x111a22,
          emissive: accent,
          emissiveIntensity: 0.4,
          metalness: 0.5,
          roughness: 0.3,
          wireframe: true,
        })
      );
      const nucleus = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.07, 1),
        new THREE.MeshBasicMaterial({ color: accent })
      );
      group.add(shell, nucleus);
      break;
    }
    case 'human': {
      // Sketchbook: warm open book with a pencil line.
      const cover = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.035, 0.22),
        new THREE.MeshStandardMaterial({ color: 0x8a5a3b, roughness: 0.8 })
      );
      const page = new THREE.Mesh(
        new THREE.PlaneGeometry(0.26, 0.18),
        new THREE.MeshBasicMaterial({ color: 0xf5e9d6 })
      );
      page.rotation.x = -Math.PI / 2;
      page.position.y = 0.02;
      group.add(cover, page);
      break;
    }
    case 'nexxo': {
      // NEXXO PRODUCT LAB: floating phone with an indexed-value screen and
      // two orbiting transaction nodes (§2 — a product lab, not a neon
      // crypto scene; electric blue + cyan only).
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.28, 0.54, 0.03),
        new THREE.MeshStandardMaterial({
          color: 0x111a22,
          metalness: 0.55,
          roughness: 0.35,
        })
      );
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(0.24, 0.46),
        new THREE.MeshBasicMaterial({ color: accent })
      );
      screen.position.z = 0.017;
      const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
      const nodeGeometry = new THREE.SphereGeometry(0.028, 12, 12);
      const nodeA = new THREE.Mesh(nodeGeometry, nodeMaterial);
      nodeA.position.set(0.24, 0.18, 0);
      const nodeB = new THREE.Mesh(nodeGeometry, nodeMaterial);
      nodeB.position.set(-0.24, -0.2, 0);
      const linkMaterial = new THREE.LineBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.5,
      });
      const link = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0.24, 0.18, 0),
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(-0.24, -0.2, 0),
        ]),
        linkMaterial
      );
      group.add(body, screen, nodeA, nodeB, link);
      break;
    }
  }

  // Picking geometry: one invisible, slightly generous shell per object so
  // hover/click targets are comfortable on touch screens.
  const geometry = new THREE.SphereGeometry(0.3, 8, 8);
  const picking = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ visible: false })
  );
  picking.name = 'picking';
  group.add(picking);

  return { object: group, geometry };
}

export interface WorldObjectsOptions {
  onHover: (areaId: WorldAreaId | null) => void;
  onSelect: (areaId: WorldAreaId) => void;
}

export interface WorldObjectsHandle {
  update: (time: number, delta: number) => void;
  /** Prevents hover noise while the camera flies to a selection. */
  setActive: (areaId: WorldAreaId | null) => void;
  dispose: () => void;
}

export function createWorldObjects(
  ctx: SceneContext,
  { onHover, onSelect }: WorldObjectsOptions
): WorldObjectsHandle {
  const { scene, camera, pointer } = ctx;

  const root = new THREE.Group();
  scene.add(root);

  const raycaster = new THREE.Raycaster();
  const pickables: Array<{
    areaId: WorldAreaId;
    object: THREE.Group;
    picking: THREE.Mesh;
    basePosition: THREE.Vector3;
    baseScale: number;
  }> = [];

  const geometries: THREE.BufferGeometry[] = [];

  (Object.keys(ACCENT_HEX) as WorldAreaId[]).forEach((areaId) => {
    const { object, geometry } = buildAreaObject(areaId, ACCENT_HEX[areaId]);
    geometries.push(geometry);
    object.position.set(...AREA_POSITIONS[areaId]);
    root.add(object);

    const picking = object.getObjectByName('picking') as THREE.Mesh;
    pickables.push({
      areaId,
      object,
      picking,
      basePosition: object.position.clone(),
      baseScale: 1,
    });
  });

  let hovered: WorldAreaId | null = null;
  let locked: WorldAreaId | null = null;
  let pointerInside = false;
  let elapsed = 0;

  const handlePointerLeave = () => {
    pointerInside = false;
  };

  const handlePointerDown = () => {
    pointerInside = true;
  };

  window.addEventListener('pointerdown', handlePointerDown, { passive: true });
  window.addEventListener('pointerleave', handlePointerLeave, {
    passive: true,
  });

  const handleClick = (event: MouseEvent) => {
    if (event.target !== ctx.renderer.domElement) return;
    const rect = ctx.renderer.domElement.getBoundingClientRect();
    raycaster.setFromCamera(
      new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      ),
      camera
    );
    const hit = raycaster.intersectObjects(
      pickables.map((entry) => entry.picking),
      false
    )[0];
    const entry = pickables.find((candidate) => candidate.picking === hit?.object);
    if (entry) onSelect(entry.areaId);
  };

  window.addEventListener('click', handleClick);

  return {
    update(time, delta) {
      elapsed = time;

      // Hover detection (throttled to every other frame is unnecessary at
      // this object count; a straight raycast per frame stays cheap).
      if (pointerInside && locked === null) {
        raycaster.setFromCamera(
          new THREE.Vector2(pointer.x, pointer.y),
          camera
        );
        const hit = raycaster.intersectObjects(
          pickables.map((entry) => entry.picking),
          false
        )[0];
        const entry = pickables.find(
          (candidate) => candidate.picking === hit?.object
        );
        const nextHovered = entry?.areaId ?? null;
        if (nextHovered !== hovered) {
          hovered = nextHovered;
          onHover(hovered);
        }
      } else if (hovered !== null && (locked !== null || !pointerInside)) {
        hovered = null;
        onHover(null);
      }

      // Idle float + scale reaction. Selected object locks to a gentle pulse.
      pickables.forEach((entry) => {
        const isHot = entry.areaId === hovered || entry.areaId === locked;
        const targetScale = isHot ? 1.22 : 1;
        entry.baseScale += (targetScale - entry.baseScale) * 0.12;
        entry.object.scale.setScalar(entry.baseScale);

        const sway = Math.sin(elapsed * 0.8 + entry.basePosition.x) * 0.05;
        entry.object.position.y =
          entry.basePosition.y + sway + (isHot ? 0.05 : 0);

        if (entry.areaId === 'ai') {
          entry.object.rotation.y += delta * 0.6;
          entry.object.rotation.x += delta * 0.25;
        } else if (entry.areaId === 'mobile' || entry.areaId === 'web3') {
          entry.object.rotation.y = Math.sin(elapsed * 0.5) * 0.25;
        } else if (entry.areaId === 'nexxo') {
          // The product lab keeps a slow, confident presence — no gadgets.
          entry.object.rotation.y = Math.sin(elapsed * 0.35) * 0.3;
        }
      });
    },

    setActive(areaId) {
      locked = areaId;
      if (areaId !== null) {
        hovered = null;
        onHover(null);
      }
    },

    dispose() {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerleave', handlePointerLeave);
      scene.remove(root);
      root.traverse((node) => {
        const mesh = node as THREE.Mesh & {
          geometry?: THREE.BufferGeometry;
        };
        if (mesh.geometry && !geometries.includes(mesh.geometry)) {
          mesh.geometry.dispose();
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      disposeObjectTree(root);
    },
  };
}

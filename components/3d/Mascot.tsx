import * as THREE from 'three';

import { loadGLTFModel } from '../../lib/model';
import { disposeObjectTree, type SceneContext } from './SceneContainer';

/**
 * Model-agnostic mascot — the abstraction the brief demands so `/dog.glb`
 * can later become `/lynx.glb` (or any other model) without touching the
 * world scene.
 *
 * Nothing about the model is hardcoded: the loaded GLB is normalized by its
 * bounding box (feet on the group origin, height scaled to `desiredHeight`),
 * so models authored at any scale drop in correctly.
 *
 * Idle life is deliberately subtle: a small breathing bob, slow yaw sway and
 * a cursor-follow turn capped well below cartoonish amplitude. `lookToward`
 * exists for Phase 4 (world areas) so the mascot can turn toward whatever
 * object the visitor activates.
 */
export interface MascotOptions {
  /** Public GLB path (defaults to the existing dog model). */
  url?: string;
  /** Height the model is normalized to, in world units. */
  desiredHeight?: number;
  /** Where the mascot stands inside the world. */
  position?: [number, number, number];
  /** Idle bob amplitude (world units). */
  bobAmplitude?: number;
  /** Idle bob speed (rad/s). */
  bobSpeed?: number;
  /** Default facing direction (yaw, radians). */
  rotationY?: number;
}

export interface MascotHandle {
  /** Resolves once the model is loaded (or immediately if it failed). */
  ready: Promise<void>;
  update: (time: number, pointer: { x: number; y: number }) => void;
  /** Ease a turn toward a world x position (e.g. the active world area). */
  lookToward: (worldX: number) => void;
  /** Return to idle cursor-follow behavior. */
  clearFocus: () => void;
  dispose: () => void;
}

export function createMascot(
  ctx: SceneContext,
  options: MascotOptions = {}
): MascotHandle {
  const {
    url = '/dog.glb',
    desiredHeight = 0.85,
    position = [0, 0, 0],
    bobAmplitude = 0.012,
    bobSpeed = 1.2,
    rotationY = 0,
  } = options;

  const group = new THREE.Group();
  group.position.set(position[0], position[1], position[2]);
  ctx.scene.add(group);

  let focusX: number | undefined;

  const ready = loadGLTFModel(group, url, {
    receiveShadow: false,
    castShadow: false,
  })
    .then((obj) => {
      // Normalize any authored scale: target height, feet on the ground.
      const box = new THREE.Box3().setFromObject(obj);
      const size = new THREE.Vector3();
      box.getSize(size);
      obj.scale.setScalar(desiredHeight / Math.max(size.y, 1e-4));
      obj.rotation.y = rotationY;

      const scaled = new THREE.Box3().setFromObject(obj);
      const center = new THREE.Vector3();
      scaled.getCenter(center);
      obj.position.x -= center.x;
      obj.position.z -= center.z;
      obj.position.y -= scaled.min.y;
    })
    .catch(() => {
      // Missing or broken model: the world keeps rendering without it.
    });

  return {
    ready,

    update(time, pointer) {
      group.position.y = position[1] + Math.sin(time * bobSpeed) * bobAmplitude;

      const idleYaw = rotationY + pointer.x * 0.35;
      const targetYaw =
        focusX === undefined
          ? idleYaw
          : Math.atan2(focusX - position[0], 2.2);
      group.rotation.y += (targetYaw - group.rotation.y) * 0.08;

      const lean = pointer.x * 0.12;
      group.rotation.z += (lean - group.rotation.z) * 0.06;
    },

    lookToward(worldX) {
      focusX = worldX;
    },

    clearFocus() {
      focusX = undefined;
    },

    dispose() {
      ctx.scene.remove(group);
      disposeObjectTree(group);
    },
  };
}

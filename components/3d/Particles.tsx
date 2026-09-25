import * as THREE from 'three';

import type { SceneContext } from './SceneContainer';

interface ParticlesOptions {
  count?: number;
  color?: number;
  size?: number;
  opacity?: number;
  /** Volume the particles drift inside, centered on the origin. */
  bounds?: { x: number; y: number; z: number };
}

interface ParticleField {
  update: (time: number, delta: number) => void;
  dispose: () => void;
}

/**
 * Ambient dust for the world: one additive Points cloud with slow upward
 * drift and horizontal sway. Counts stay low (see `countFor`) and the whole
 * field is one draw call, so it is cheap even on mobile.
 */
export function createParticles(
  ctx: SceneContext,
  {
    count = ctx.isMobile ? 60 : 180,
    color = 0x00e5ff,
    size = 0.05,
    opacity = 0.45,
    bounds = { x: 5, y: 5, z: 4 },
  }: ParticlesOptions = {}
): ParticleField {
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() * 2 - 1) * bounds.x;
    positions[i * 3 + 1] = Math.random() * bounds.y;
    positions[i * 3 + 2] = (Math.random() * 2 - 1) * bounds.z;
    speeds[i] = 0.08 + Math.random() * 0.14;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  );

  const material = new THREE.PointsMaterial({
    color,
    size,
    sizeAttenuation: true,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  ctx.scene.add(points);

  let elapsed = 0;

  return {
    update(_time, delta) {
      elapsed += delta;
      const attribute = geometry.getAttribute(
        'position'
      ) as THREE.BufferAttribute;
      const array = attribute.array as Float32Array;

      for (let i = 0; i < count; i += 1) {
        array[i * 3 + 1] += speeds[i] * delta;
        array[i * 3] += Math.sin(elapsed * 0.4 + i) * 0.0006;

        // Wrap at the ceiling instead of recycling the buffer.
        if (array[i * 3 + 1] > bounds.y) array[i * 3 + 1] = 0;
      }

      attribute.needsUpdate = true;
    },
    dispose() {
      geometry.dispose();
      material.dispose();
      ctx.scene.remove(points);
    },
  };
}

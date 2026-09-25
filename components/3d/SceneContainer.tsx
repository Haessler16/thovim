import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Shared types + lifecycle host for the HAESSLER WORLD 3D layer.
 *
 * Deliberately raw Three.js (same approach as the legacy `Voxel-Dog`), no
 * React Three Fiber: the existing project already ships raw Three.js and the
 * brief forbids adding dependencies. Everything imperative lives inside a
 * `SceneFactory`; React never holds Three objects in state, which keeps
 * cleanup trivial and hydration safe.
 *
 * Contract:
 *  - the container probes WebGL support BEFORE creating a renderer. Without
 *    WebGL it reports `unsupported` and renders nothing — the HTML fallback
 *    in the hero stays visible, so the page never depends on this canvas.
 *  - devicePixelRatio is capped (2 desktop / 1.5 mobile).
 *  - the RAF loop pauses while the tab is hidden.
 *  - with `prefers-reduced-motion` the factory is expected to render one
 *    static frame (`ctx.prefersReducedMotion`) instead of animating.
 *  - `dispose()` removes the canvas and frees geometries, materials and
 *    textures on unmount.
 */

export type SceneStatus = 'ready' | 'failed' | 'unsupported';

export interface ScenePointer {
  /** Normalized pointer position, -1..1 on both axes. */
  x: number;
  y: number;
}

/** Called by the container on mount and on every container resize. */
export type SceneResizeHandler = (
  aspect: number,
  width: number,
  height: number
) => void;

export interface SceneContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  container: HTMLElement;
  /** Coarse pointer / small viewport: factories should cut complexity. */
  isMobile: boolean;
  prefersReducedMotion: boolean;
  /** Live pointer position; updated by the container, read by factories. */
  pointer: ScenePointer;
  /**
   * Registers a resize handler. The container already updated camera aspect
   * and renderer size before calling handlers, so factories only need to
   * reframe (e.g. pull the camera back on narrow/portrait viewports).
   */
  onResize: (handler: SceneResizeHandler) => void;
}

export interface SceneLifecycle {
  /** Called every frame with elapsed seconds and frame delta. */
  update: (time: number, delta: number) => void;
  /** Free everything the factory created (the container disposes the rest). */
  dispose: () => void;
  /**
   * Optional promise the container waits on before reporting `ready` —
   * typically model loading. Until it resolves, the HTML fallback stays up.
   */
  ready?: Promise<void>;
}

export type SceneFactory = (ctx: SceneContext) => SceneLifecycle;

interface SceneContainerProps {
  create: SceneFactory;
  onStatus?: (status: SceneStatus) => void;
  /** Decorative by design: every fact exists as accessible HTML elsewhere. */
  label?: string;
  /**
   * Box height. Defaults to filling the positioned parent (the hero slot);
   * pass a responsive length when the scene stacks in normal flow on mobile.
   */
  height?: string | number | Record<string, string | number>;
}

/** Frees geometries/materials/textures of a subtree. Used on unmount. */
export function disposeObjectTree(root: THREE.Object3D): void {
  root.traverse((node) => {
    const mesh = node as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const material = mesh.material as
      | THREE.Material
      | THREE.Material[]
      | undefined;
    if (!material) return;
    const list = Array.isArray(material) ? material : [material];
    list.forEach((entry) => {
      const standard = entry as THREE.MeshStandardMaterial;
      if (standard.map) standard.map.dispose();
      if (standard.emissiveMap) standard.emissiveMap.dispose();
      entry.dispose();
    });
  });
}

export const SceneContainer = ({
  create,
  onStatus,
  label,
  height = '100%',
}: SceneContainerProps) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const statusRef = useRef(onStatus);
  useEffect(() => {
    statusRef.current = onStatus;
  }, [onStatus]);

  useEffect(() => {
    const container = refContainer.current;
    if (!container) return;

    /**
     * WebGL probe before anything expensive. The callback is deferred one
     * frame so the effect body never triggers a parent setState synchronously
     * (cascading-render rule).
     */
    const probeCanvas = document.createElement('canvas');
    const gl =
      probeCanvas.getContext('webgl2') ?? probeCanvas.getContext('webgl');
    if (!gl) {
      const frame = window.requestAnimationFrame(() =>
        statusRef.current?.('unsupported')
      );
      return () => window.cancelAnimationFrame(frame);
    }

    const isMobile =
      window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      120
    );
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2)
    );
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const pointer: ScenePointer = { x: 0, y: 0 };
    const resizeHandlers = new Set<SceneResizeHandler>();

    let lifecycle: SceneLifecycle | undefined;
    let frameReq = 0;
    let disposed = false;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });

    const handleResize = () => {
      const w = container.clientWidth;
      const h = Math.max(container.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      resizeHandlers.forEach((handler) => handler(camera.aspect, w, h));
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    /** Skip update+render while the canvas is offscreen (and tab hidden). */
    let inView = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: '120px' }
    );
    intersectionObserver.observe(container);

    try {
      lifecycle = create({
        scene,
        camera,
        renderer,
        container,
        isMobile,
        prefersReducedMotion,
        pointer,
        onResize: (handler) => {
          resizeHandlers.add(handler);
        },
      });

      // Initial framing pass (after the factory built its camera/controls).
      const initialW = container.clientWidth;
      const initialH = Math.max(container.clientHeight, 1);
      resizeHandlers.forEach((handler) =>
        handler(initialW / initialH, initialW, initialH)
      );

      if (lifecycle.ready) {
        lifecycle.ready.then(
          () => {
            if (!disposed) statusRef.current?.('ready');
          },
          () => {
            if (!disposed) statusRef.current?.('failed');
          }
        );
      } else {
        statusRef.current?.('ready');
      }
    } catch {
      statusRef.current?.('failed');
    }

    const clock = new THREE.Clock();
    const animate = () => {
      frameReq = window.requestAnimationFrame(animate);
      if (document.hidden || !inView) return;
      const delta = Math.min(clock.getDelta(), 0.1);
      lifecycle?.update(clock.elapsedTime, delta);
      renderer.render(scene, camera);
    };

    if (prefersReducedMotion) {
      // One composed frame: the world exists, it simply does not move.
      lifecycle?.update(0, 0);
      renderer.render(scene, camera);
    } else {
      frameReq = window.requestAnimationFrame(animate);
    }

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameReq);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      lifecycle?.dispose();
      disposeObjectTree(scene);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [create]);

  return (
    <Box
      ref={refContainer}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
      height={height}
      overflow="hidden"
      sx={{
        canvas: { outline: 'none' },
      }}
    />
  );
};

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { Mesh, Object3D } from 'three';

/**
 * Loads a GLB and adds it to any THREE.Object3D parent.
 *
 * The parameter is `Object3D` (not `Scene`) so callers can mount models into
 * their own wrapper groups — the HAESSLER WORLD Mascot normalizes scale and
 * position inside a group, while the legacy Voxel-Dog keeps passing a Scene.
 * Either parent type satisfies the signature.
 */
export function loadGLTFModel(
  parent: Object3D,
  glbPath: string,
  options = { receiveShadow: true, castShadow: true }
) {
  const { castShadow, receiveShadow } = options;
  return new Promise<Object3D>((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      glbPath,
      (gltf) => {
        const obj = gltf.scene;
        obj.name = 'mascot-model';
        obj.position.y = 0;
        obj.position.x = 0;
        obj.receiveShadow = receiveShadow;
        obj.castShadow = castShadow;
        parent.add(obj);

        obj.traverse(function (child) {
          if ((child as Mesh).isMesh) {
            child.castShadow = castShadow;
            child.receiveShadow = receiveShadow;
          }
        });

        resolve(obj);
      },
      undefined,
      function (error) {
        reject(error);
      }
    );
  });
}

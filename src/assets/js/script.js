import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';

/**
 * Debug UI - lil-gui documentation: https://lil-gui.georgealways.com/
 */
const gui = new GUI({
  width: 300,
  title: 'Debug UI',
  closeFolders: false,

});
// gui.close();

window.addEventListener('keydown', (even) => {
  if (event.key == 'c'){
    gui.open(gui._closed);
  }
});

// gui.hide();

window.addEventListener('keydown', (even) => {
  if (event.key == 'h'){
    gui.show(gui._hidden);
  }
});

const debugObject1 = {};
const debugObject2 = {};
const debugObject3 = {};

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

// resize listener
window.addEventListener('resize', () => {
   
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camra
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update render
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('dblclick', () => {
  if(document.fullscreenElement){
    document.exitFullscreen();
  } else {
    canvas.requestFullscreen();
  }
});

/**
 * Cursor
 */
const cursor = {
  x: 0,
  y: 0,
}
window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = - (event.clientY / sizes.height - 0.5);
  // console.log(cursor.x, cursor.y);
});


/** 
 * Canvas
 */
const canvas = document.querySelector('canvas.webgl');

/** 
 * Scene
 */
const scene = new THREE.Scene();

/** 
 * Axes Helper
 */
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Object - group of cubes
 */
//  Object - single cube
// debugObject1.color = '#d6cc38';
// debugObject1.subdivision = 2;

// const geometry = new THREE.BoxGeometry(
//   1, // width
//   1, // height
//   1, // depth
//   debugObject1.subdivision, // widthSegments
//   debugObject1.subdivision, // heightSegments
//   debugObject1.subdivision, // depthSegments
// );
// const material = new THREE.MeshBasicMaterial({ 
//   color: debugObject1.color,
//   wireframe: true,
// });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// position
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;
// mesh.position.set(0.7, -0.6, 1);

// scale
// mesh.scale.x = 0.7;
// mesh.scale.y = -0.6;
// mesh.scale.z = 1;
// mesh.scale.set(2, 0.5, 0.5);

// rotation
// mesh.rotation.reorder('YXZ');
// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.y = Math.PI * 0.25;

// scene.add(mesh);

// Object - group of cubes
const group = new THREE.Group();
// group.scale.y = 1.5;
group.rotation.y = 0;
scene.add(group);

debugObject1.color = '#d6cc38';
debugObject1.subdivision = 6;

const geometryCube1 = new THREE.BoxGeometry(
  1, // width
  1, // height
  1, // depth
  debugObject1.subdivision, // widthSegments
  debugObject1.subdivision, // heightSegments
  debugObject1.subdivision, // depthSegments
);

const materialCube1 = new THREE.MeshBasicMaterial({ 
  color: debugObject1.color,
  wireframe: true
});

const meshCube1 = new THREE.Mesh(
  geometryCube1,
  materialCube1,
);

meshCube1.position.x = - 3;
meshCube1.position.y = - 1;
meshCube1.scale.y = 1.5;
group.add(meshCube1);

debugObject2.color = '#FF0000';
debugObject2.subdivision = 4;

const geometryCube2 = new THREE.SphereGeometry(
  // 1, // width
  // 1, // height
  // 1, // depth
  // debugObject2.subdivision, // widthSegments
  // debugObject2.subdivision, // heightSegments
  // debugObject2.subdivision, // depthSegments
  1,
  32,
  16
);

const materialCube2 = new THREE.MeshBasicMaterial({
  color: debugObject2.color,
  wireframe: true
});

const meshCube2 = new THREE.Mesh(
  geometryCube2,
  materialCube2
);

meshCube2.position.x = 0;
meshCube2.position.z = -2;
group.add(meshCube2);

debugObject3.color = '#0000FF';
debugObject3.subdivision = 2;

const geometryCube3 = new THREE.BoxGeometry(
  1, // width
  1, // height
  1, // depth
  debugObject3.subdivision, // widthSegments
  debugObject3.subdivision, // heightSegments
  debugObject3.subdivision, // depthSegments
);

const materialCube3 = new THREE.MeshBasicMaterial({
  color: debugObject3.color,
  wireframe: true
});

const meshCube3 = new THREE.Mesh(
  geometryCube3,
  materialCube3
);

meshCube3.position.x = 2;
meshCube3.position.y = 1;
group.add(meshCube3);

/**
 * tweak folders
 */
const cubeTweak1 = gui.addFolder('meshCube1');
const cubeTweak2 = gui.addFolder('meshCube2');
const cubeTweak3 = gui.addFolder('meshCube3');
// cubeTweak.close();

/**
 * Tweaks
 */

// range
cubeTweak1.add(group.children[0].position, 'y')
  .min(- 3)
  .max(3)
  .step(0.01)
  .name('elevation');

cubeTweak1.add(group.children[0].position, 'x')
  .min(- 3)
  .max(3)
  .step(0.01)
  .name('horizontal position');

cubeTweak2.add(group.children[1].position, 'y')
.min(- 3)
.max(3)
.step(0.01)
.name('elevation');

cubeTweak3.add(group.children[2].position, 'y')
.min(- 3)
.max(3)
.step(0.01)
.name('elevation');

// checkbox
cubeTweak1.add(group.children[0], 'visible');
cubeTweak2.add(group.children[1], 'visible');
cubeTweak3.add(group.children[2], 'visible');

// wireframe
cubeTweak1.add(materialCube1, 'wireframe');
cubeTweak2.add(materialCube2, 'wireframe');
cubeTweak3.add(materialCube3, 'wireframe');

// color
cubeTweak1.addColor(materialCube1, 'color')
.onChange(() => {
  material.color.set(debugObject1.color);
});

cubeTweak2.addColor(materialCube2, 'color')
.onChange(() => {
  material.color.set(debugObject2.color);
});

cubeTweak3.addColor(materialCube3, 'color')
.onChange(() => {
  material.color.set(debugObject3.color);
});

// function/button
debugObject1.spin = () => {
  gsap.to(meshCube1.rotation, { y: meshCube1.rotation.y + Math.PI * 2 });
};
cubeTweak1.add(debugObject1, 'spin');

debugObject2.spin = () => {
  gsap.to(meshCube2.rotation, { y: meshCube2.rotation.y + Math.PI * 2 });
};
cubeTweak2.add(debugObject2, 'spin');

debugObject3.spin = () => {
  gsap.to(meshCube3.rotation, { y: meshCube3.rotation.y + Math.PI * 2 });
};
cubeTweak3.add(debugObject3, 'spin');

// tweaking the geometry
cubeTweak1.add(debugObject1, 'subdivision')
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    // remove old geometry from the GPU memory
    meshCube1.geometry.dispose();
    meshCube1.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject1.subdivision,
      debugObject1.subdivision,
      debugObject1.subdivision
    )
  });

// cubeTweak2.add(debugObject2, 'subdivision')
// .min(1)
// .max(20)
// .step(1)
// .onFinishChange(() => {
//   // remove old geometry from the GPU memory
//   meshCube2.geometry.dispose();
//   meshCube2.geometry = new THREE.BoxGeometry(
//     1,
//     1,
//     1,
//     debugObject2.subdivision,
//     debugObject2.subdivision,
//     debugObject2.subdivision
//   )
// });

cubeTweak3.add(debugObject3, 'subdivision')
.min(1)
.max(20)
.step(1)
.onFinishChange(() => {
  // remove old geometry from the GPU memory
  meshCube3.geometry.dispose();
  meshCube3.geometry = new THREE.BoxGeometry(
    1,
    1,
    1,
    debugObject3.subdivision,
    debugObject3.subdivision,
    debugObject3.subdivision
  )
});

/**
 * BufferGeometry
 */
// BufferGeometry - 1 triangle
// Create an empty BufferGeometry
// const geometry = new THREE.BufferGeometry();

// Float32Array: array that can only store floats inside, the lenght of that array is fixed.
// Specify the Float32Array length
// const positionsArray = new Float32Array(9);

// Fill the Float32Array
// First vertice
// positionsArray[0] = 0;
// positionsArray[1] = 0;
// positionsArray[2] = 0;

// Second vertice
// positionsArray[3] = 0;
// positionsArray[4] = 1;
// positionsArray[5] = 0;

// Third vertice
// positionsArray[6] = 1;
// positionsArray[7] = 0;
// positionsArray[8] = 0;

// Create a Float32Array containing the vertices position (3 by 3)
// const positionsArray = new Float32Array([
//   0, 0, 0, // First vertex
//   0, 1, 0, // Second vertex
//   1, 0, 0  // Third vertex
// ]);

// BufferGeometry - multiple triangles
// Create an empty BufferGeometry
// const geometry = new THREE.BufferGeometry();

// Create 40 triangles (360 values)
// const count = 40;
// a triangle is composed of 3 vertices and each vertex is composed of 3 values (x, y, z)
// const positionsArray = new Float32Array(count * 3 * 3);
// for(let i = 0; i < positionsArray.length; i++)
// {
//     // -0.5 to center the array of triangles
//     positionsArray[i] = (Math.random() - 0.5) * 4;
// }

// Before you can send that array to the BufferGeometry, you have to transform it into a BufferAttribute.
// THREE.BufferAttribute(Float32Array, how much values make one vertex attribute) -->  a vertex position is composed of 3 values (x, y and z)
// Create the attribute, name it 'position' and add this attribute to our BufferGeometry.
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
// geometry.setAttribute('position', positionsAttribute);

// const material = new THREE.MeshBasicMaterial({ color: 0xff_00_00, wireframe: true });

// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera( -1,
//   1 * aspectRatio,
//   1 * aspectRatio,
//   -1,
//   0.1,
//   100
// );
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 4;
// camera.lookAt(group.position);
// console.log(mesh.position.distanceTo(camera.position));
scene.add(camera);

/** 
 * Orbit controls
 */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 1;
// controls.update();

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);

// Time: Adaptation to the framerate
// let time = Date.now();

// Clock
const clock = new THREE.Clock();

/**
 * Animation
 */
const tick = () => {
  
  // Time: Adaptation to the framerate
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime;

  // Clock
  const elapsedTime = clock.getElapsedTime();

  // update objects
  // group.rotation.y += 0.001 * deltaTime;
  // group.rotation.x += 0.001 * deltaTime;

  // group.rotation.y = elapsedTime * Math.PI * 2;
  // group.position.y = Math.sin(elapsedTime);
  // group.position.x = Math.cos(elapsedTime);

  // camera.position.y = Math.sin(elapsedTime);
  // camera.position.x = Math.cos(elapsedTime);
  // camera.lookAt(group.position);

  // GSAP libray: GreenSock
  // gsap.to(group.position, { duration: 1, delay: 1, x:2 });
  // gsap.to(group.position, { duration: 1, delay: 3, x:0 });

  // group.rotation.y = elapsedTime;

  // Update camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(group.position);

  // Update controls
  controls.update();

  // render
  renderer.render(scene, camera);
  
  // passing the tick function
  window.requestAnimationFrame(tick);
};

tick();
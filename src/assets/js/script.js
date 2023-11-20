import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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


// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Axes Helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Object
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff_00_00 });
// const mesh = new THREE.Mesh(geometry, material);

// group
// const group = new THREE.Group();
// group.scale.y = 1.5;
// group.rotation.y = 0;
// scene.add(group);

// const cube1 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1, 2, 2, 2),
//   new THREE.MeshBasicMaterial({ 
//     color: 0xff_00_00,
//     wireframe: true
//   }),
// );
// cube1.position.x = - 2;
// group.add(cube1);

// const cube2 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 0x00_ff_00}),
// );
// cube2.position.x = 0;
// group.add(cube2);

// const cube3 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 0x00_00_ff}),
// );
// cube3.position.x = 2;
// group.add(cube3);

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

/**
 * BufferGeometry
 */
// Create an empty BufferGeometry
const geometry = new THREE.BufferGeometry();

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
const positionsArray = new Float32Array([
  0, 0, 0, // First vertex
  0, 1, 0, // Second vertex
  1, 0, 0  // Third vertex
]);

// Before you can send that array to the BufferGeometry, you have to transform it into a BufferAttribute.
// THREE.BufferAttribute(Float32Array, how much values make one vertex attribute) -->  a vertex position is composed of 3 values (x, y and z)
// Create the attribute, name it 'position' and add this attribute to our BufferGeometry.
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute('position', positionsAttribute);

const material = new THREE.MeshBasicMaterial({ color: 0xff_00_00, wireframe: true });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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
camera.position.z = 3;
// camera.lookAt(group.position);
// console.log(mesh.position.distanceTo(camera.position));
scene.add(camera);

// Orbit controls
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

// Animation
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
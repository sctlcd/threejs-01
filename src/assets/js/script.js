import * as THREE from 'three';

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
const group = new THREE.Group();
group.scale.y = 1.5;
group.rotation.y = 0;
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff_00_00}),
);
cube1.position.x = - 2;
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00_ff_00}),
);
cube2.position.x = 0;
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00_00_ff}),
);
cube3.position.x = 2;
group.add(cube3);


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
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
// camera.lookAt(mesh.position);
// console.log(mesh.position.distanceTo(camera.position));
scene.add(camera);

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

  camera.position.y = Math.sin(elapsedTime);
  camera.position.x = Math.cos(elapsedTime);
  camera.lookAt(group.position);

  // render
  renderer.render(scene, camera);
  
  // passing the tick function
  window.requestAnimationFrame(tick);
};

tick();
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

/**
 * Debug UI - lil-gui documentation: https://lil-gui.georgealways.com/
 */
const gui = new GUI({
  width: 300,
  title: 'Debug UI',
  closeFolders: true,
  close: false,
  hide: false,
});

// gui.close();

window.addEventListener('keydown', (even) => {
  if (event.key == 'f'){
    gui.open(gui._closed);
  }
});

// gui.hide();

window.addEventListener('keydown', (even) => {
  if (event.key == 'h'){
    gui.show(gui._hidden);
  }
});

// const debugObject = {};
const debugObject1 = {};
const debugObject2 = {};
const debugObject3 = {};

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
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

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
 * Light
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

/**
 * Environment map
 */
const rgbeLoader = new RGBELoader();
// Send a callback function as the second parameter
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => {
  // Retrieve the environment mapas the parameter 
  // Change environmentMap mapping property to THREE.EquirectangularReflectionMapping
  // Example: https://threejs.org/examples/webgl_materials_envmaps.html
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  
  // Assign environmentMap to the background and environment properties of the scene
  // Defines the background of the scene
  scene.background = environmentMap;
  // Sets the environment map for all physical materials in the scene
  scene.environment = environmentMap;
});


/**
 * Sizes
 */
// resize listener
window.addEventListener('resize', () => {
   
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
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
 * Orbit controls
 */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 1;
// controls.update();

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
 * Textures
 */
// using onload event
// const image = new Image();
// image.onload = () => {
//   const texture = new THREE.Texture(image);
//   console.log('image loaded');
// };
// image.src = '/textures/door/color.jpg';

// using eventTarget: addEventListener() method
// const image1 = new Image();
// const colorTexture1 = new THREE.Texture(image1);
// colorTexture1.colorSpace = THREE.SRGBColorSpace;

// image1.addEventListener('load', () => {
//  colorTexture1.needsUpdate = true;
// });

// image1.src = '/textures/door/color.jpg';

// const image2 = new Image();
// const colorTexture2 = new THREE.Texture(image2);
// colorTexture2.colorSpace = THREE.SRGBColorSpace;

// image2.addEventListener('load', () => {
//  colorTexture2.needsUpdate = true;
// });

// image2.src = '/textures/space-blanket-folds/space-bbanket-folds-min.jpg';

// const image3 = new Image();
// const colorTexture3 = new THREE.Texture(image3);
// colorTexture3.colorSpace = THREE.SRGBColorSpace;

// image3.addEventListener('load', () => {
//  colorTexture3.needsUpdate = true;
// });

// image3.src = '/textures/rock/rock-cliff-volcanic-min.jpg';

// using texture loader and loadingManager
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => { 
  console.log('onStart');
};
loadingManager.onLoaded = () => { 
  console.log('onLoaded');
};
loadingManager.onProgress = () => { 
  console.log('onProgress');
};
loadingManager.onError = () => { 
  console.log('onError');
};
const textureLoader = new THREE.TextureLoader(loadingManager);

const doorColorTexture = textureLoader.load('./textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg');
const matcapTexture = textureLoader.load('./textures/matcaps/1.png');
const gradientTexture = textureLoader.load('./textures/gradients/5.jpg');

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

const pathImage1 = '/textures/door/color.jpg'; // '/textures/minecraft.png';
const colorTexture1 = textureLoader.load(pathImage1);
colorTexture1.colorSpace = THREE.SRGBColorSpace;

// Transforming the texture
// colorTexture1.repeat.x = 2;
// colorTexture1.repeat.y = 3;
// colorTexture1.wrapS = THREE.RepeatWrapping;
// colorTexture1.wrapT = THREE.RepeatWrapping;
// colorTexture1.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture1.wrapT = THREE.MirroredRepeatWrapping;

// colorTexture1.offset.x = 0.5;
// colorTexture1.offset.y = 0.5;

// colorTexture1.rotation = Math.PI * 0.25;
// colorTexture1.center.x = 0.5;
// colorTexture1.center.y = 0.5;

// Minification filter
// colorTexture1.generateMipmaps = false; // deactivate the mipmaps generation when used with NearestFilter on minFilter -> better performances
// colorTexture1.minFilter = THREE.NearestFilter;

// Magnification Filter
colorTexture1.magFilter = THREE.NearestFilter;

const pathImage2 = '/textures/space-blanket-folds/space-bbanket-folds-min.jpg';
const colorTexture2 = textureLoader.load(pathImage2);
colorTexture2.colorSpace = THREE.SRGBColorSpace;

const pathImage3 = '/textures/rock/rock-cliff-volcanic-min.jpg';
const colorTexture3 = textureLoader.load(pathImage3);
colorTexture3.colorSpace = THREE.SRGBColorSpace;

/**
 * Objects
 */
//  Objects - single cube
// debugObject.color = '#008000';
// debugObject.subdivision = 4;

// const geometry = new THREE.BoxGeometry(
//   1, // width
//   1, // height
//   1, // depth
//   debugObject.subdivision, // widthSegments
//   debugObject.subdivision, // heightSegments
//   debugObject.subdivision, // depthSegments 
// );
// const material = new THREE.MeshBasicMaterial({ 
//   color: debugObject.color,
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

// Objects - group of cubes
const group = new THREE.Group();
// group.scale.y = 1.5;
group.rotation.y = 0;
scene.add(group);

debugObject1.color = '#d6cc38';
debugObject1.subdivision = 100;
debugObject1.width = 1;
debugObject1.height = 1;
debugObject1.depth = 1;

const geometry1 = new THREE.BoxGeometry(
  debugObject1.width, // width
  debugObject1.height, // height
  debugObject1.depth, // depth
  debugObject1.subdivision, // widthSegments
  debugObject1.subdivision, // heightSegments
  debugObject1.subdivision, // depthSegments
);

/**
 * Materials
 */
// MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial({ map: doorColorTexture });
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color = new THREE.Color('red');
// material.wireframe = true;
// material.transparent = true;
// material.opacity = 0.5;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide;

// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial();

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false; // deactivate the mipmaps generation when used with NearestFilter on minFilter -> better performances
// material.gradientMap = gradientTexture;

// MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial();
// material .metalness = 1; // 0.7;
// material.roughness = 1; // 0.2;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial();
material .metalness = 0; // 1; // 0.7;
material.roughness = 0; // 1; // 0.2;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// Clearcoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0;

// Sheen
// material.sheen = 1;
// material.sheenRoughness = 0.25;
// material.sheenColor.set(1, 1, 1);

// Iridescence
// material.iridescence = 1;
// material.iridescenceIOR = 1;
// material.iridescenceThicknessRange = [100, 800];

// Transmission
material.transmission = 1;
material.ior = 1.5;
material.thickness= 0.5;

gui
  .add(material, 'metalness')
  .min(0)
  .max(1)
  .step(0.0001);

gui
  .add(material, 'roughness')
  .min(0)
  .max(1)
  .step(0.0001);

gui
  .add(material, 'clearcoat')
  .min(0)
  .max(1)
  .step(0.0001);

gui
  .add(material, 'clearcoatRoughness')
  .min(0)
  .max(1)
  .step(0.0001);

gui
  .add(material, 'sheen')
  .min(0)
  .max(1)
  .step(0.0001);

gui
  .add(material, 'sheenRoughness')
  .min(0)
  .max(1)
  .step(0.0001);

gui
  .addColor(material, 'sheenColor');

gui
  .add(material, 'iridescence')
  .min(0)
  .max(1)
  .step(0.0001);

gui
  .add(material, 'iridescenceIOR')
  .min(1)
  .max(2.333)
  .step(0.0001);
  
gui
  .add(material.iridescenceThicknessRange, '0')
  .min(1)
  .max(1000)
  .step(1);

gui
  .add(material.iridescenceThicknessRange, '1')
  .min(1)
  .max(1000)
  .step(1);

gui
  .add(material, 'transmission')
  .min(0)
  .max(1)
  .step(0.0001);

gui
  .add(material, 'ior')
  .min(1)
  .max(10)
  .step(0.0001);

gui
  .add(material, 'thickness')
  .min(0)
  .max(1)
  .step(0.0001);

let materialGeometry1 = new THREE.MeshBasicMaterial({ 
  // color: debugObject1.color,
  // wireframe: true
  map: colorTexture1,
});

const meshGeometry1 = new THREE.Mesh(
  geometry1,
  // materialGeometry1,
  material
);

meshGeometry1.position.x = - 3;
meshGeometry1.position.y = - 1;
meshGeometry1.scale.y = 1.5;
group.add(meshGeometry1);

debugObject2.color = '#FF0000';
debugObject2.subdivision = 128;
debugObject2.radius = 1;

const geometry2 = new THREE.SphereGeometry(
  debugObject2.radius, // radius
  debugObject2.subdivision, // widthSegments
  debugObject2.subdivision / 2, // heightSegments 
);

let materialGeometry2 = new THREE.MeshBasicMaterial({
  // color: debugObject2.color,
  // wireframe: true,
  map: colorTexture2,
});

const meshGeometry2 = new THREE.Mesh(
  geometry2,
  // materialGeometry2,
  material
);

meshGeometry2.position.x = 0;
meshGeometry2.position.z = -2;
group.add(meshGeometry2);

debugObject3.color = '#0000FF';
debugObject3.radiusTop = 1;
debugObject3.radiusBottom = 1;
debugObject3.height = 2;
debugObject3.radialSegments = 32;

const geometry3 = new THREE.CylinderGeometry(
  debugObject3.radiusTop, // radiusTop
  debugObject3.radiusBottom, // radiusBottom
  debugObject3.height, // height
  debugObject3.radialSegments, // radialSegments
);

let materialGeometry3 = new THREE.MeshBasicMaterial({
  // color: debugObject3.color,
  // wireframe: true
  map: colorTexture3,
});

const meshGeometry3 = new THREE.Mesh(
  geometry3,
  // materialGeometry3
  material
);

meshGeometry3.position.x = 4;
meshGeometry3.position.y = 2;
meshGeometry3.position.z = -2;
group.add(meshGeometry3);

/**
 * tweak folders
 */
// const cubeTweak = gui.addFolder('Cube');
const geometryTweak1 = gui.addFolder('mesh geometry 1 - Box');
const geometryTweak2 = gui.addFolder('mesh geometry 2 - Sphere');
const geometryTweak3 = gui.addFolder('mesh geometry 3 - Cylinder');

// window.addEventListener('keydown', (even) => {
//   if (event.key == '0'){
//     if (gui._closeFolders) {
//       cubeTweak.open();
//       gui._closeFolders = false;
//     }else {
//       cubeTweak.close();
//       gui._closeFolders = true;
//     }
//   }
// });

window.addEventListener('keydown', (even) => {
  if (event.key == '1'){
    if (gui._closeFolders) {
      geometryTweak1.open();
      gui._closeFolders = false;
    }else {
      geometryTweak1.close();
      gui._closeFolders = true;
    }
  }
});

window.addEventListener('keydown', (even) => {
  if (event.key == '2'){
    if (gui._closeFolders) {
      geometryTweak2.open();
      gui._closeFolders = false;
    }else {
      geometryTweak2.close();
      gui._closeFolders = true;
    }
  }
});

window.addEventListener('keydown', (even) => {
  if (event.key == '3'){
    if (gui._closeFolders) {
      geometryTweak3.open();
      gui._closeFolders = false;
    }else {
      geometryTweak3.close();
      gui._closeFolders = true;
    }
  }
});

window.addEventListener('keydown', (even) => {
  if (event.key == 'a'){
    if (gui._closeFolders) {
      geometryTweak1.open();
      geometryTweak2.open();
      geometryTweak3.open();
      gui._closeFolders = false;
    }else {
      geometryTweak1.close();
      geometryTweak2.close();
      geometryTweak3.close();
      gui._closeFolders = true;
    }
  }
});

/**
 * Tweaks
 */

// range
// cubeTweak.add(mesh.position, 'y')
//     .min(- 3)
//     .max(3)
//     .step(0.01)
//     .name('elevation');

geometryTweak1.add(group.children[0].position, 'y')
  .min(- 3)
  .max(3)
  .step(0.01)
  .name('elevation');

geometryTweak1.add(group.children[0].position, 'x')
  .min(- 4)
  .max(4)
  .step(0.01)
  .name('horizontal position');

geometryTweak2.add(group.children[1].position, 'y')
.min(- 4)
.max(4)
.step(0.01)
.name('elevation');

geometryTweak2.add(group.children[1].position, 'x')
  .min(- 6)
  .max()
  .step(0.01)
  .name('horizontal position');

geometryTweak3.add(group.children[2].position, 'y')
.min(- 3)
.max(3)
.step(0.01)
.name('elevation');

// checkbox
// cubeTweak.add(mesh, 'visible');
geometryTweak1.add(group.children[0], 'visible');
geometryTweak2.add(group.children[1], 'visible');
geometryTweak3.add(group.children[2], 'visible');

// wireframe
// cubeTweak.add(material, 'wireframe');
// geometryTweak1.add(materialGeometry1, 'wireframe');
// geometryTweak2.add(materialGeometry2, 'wireframe');
// geometryTweak3.add(materialGeometry3, 'wireframe');

// color
// cubeTweak.addColor(material, 'color')
// .onChange(() => {
//   material.color.set(debugObject.color);
// });

// geometryTweak1
//   .addColor(materialGeometry1, 'color')
//   .onChange(() => {
//     material.color.set(debugObject1.color);
//   });

// geometryTweak2
//   .addColor(materialGeometry2, 'color')
//   .onChange(() => {
//     material.color.set(debugObject2.color);
//   });

// geometryTweak3
//   .addColor(materialGeometry3, 'color')
//   .onChange(() => {
//     material.color.set(debugObject3.color);
//   });

// function/button
// debugObject.spin = () => {
//   gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2 });
// };
// cubeTweak.add(debugObject, 'spin');

debugObject1.spin = () => {
  gsap.to(meshGeometry1.rotation, { y: meshGeometry1.rotation.y + Math.PI * 2 });
};
geometryTweak1.add(debugObject1, 'spin');

debugObject2.spin = () => {
  gsap.to(meshGeometry2.rotation, { y: meshGeometry2.rotation.y + Math.PI * 2 });
};
geometryTweak2.add(debugObject2, 'spin');

debugObject3.spin = () => {
  gsap.to(meshGeometry3.rotation, { y: meshGeometry3.rotation.y + Math.PI * 2 });
};
geometryTweak3.add(debugObject3, 'spin');

// tweaking the geometry
// cubeTweak
//   .add(debugObject, 'subdivision')
//   .min(1)
//   .max(20)
//   .step(1)
//   .onFinishChange(() => {
//     // remove old geometry from the GPU memory
//     mesh.geometry.dispose();
//     mesh.geometry = new THREE.BoxGeometry(
//       1, 1, 1,
//       debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
//     )
//   });

geometryTweak1
.add(debugObject1, 'width')
.min(0.5)
.max(4)
.step(1)
.onFinishChange(() => {
  // remove old geometry from the GPU memory
  meshGeometry1.geometry.dispose();
  meshGeometry1.geometry = new THREE.BoxGeometry(
    debugObject1.width,
    debugObject1.height,
    debugObject1.depth,
    debugObject1.subdivision,
    debugObject1.subdivision,
    debugObject1.subdivision
  );
});

geometryTweak1
.add(debugObject1, 'height')
.min(0.5)
.max(4)
.step(1)
.onFinishChange(() => {
  // remove old geometry from the GPU memory
  meshGeometry1.geometry.dispose();
  meshGeometry1.geometry = new THREE.BoxGeometry(
    debugObject1.width,
    debugObject1.height,
    debugObject1.depth,
    debugObject1.subdivision,
    debugObject1.subdivision,
    debugObject1.subdivision
  );
});

geometryTweak1
.add(debugObject1, 'depth')
.min(0.5)
.max(4)
.step(1)
.onFinishChange(() => {
  // remove old geometry from the GPU memory
  meshGeometry1.geometry.dispose();
  meshGeometry1.geometry = new THREE.BoxGeometry(
    debugObject1.width,
    debugObject1.height,
    debugObject1.depth,
    debugObject1.subdivision,
    debugObject1.subdivision,
    debugObject1.subdivision
  );
});

geometryTweak1
  .add(debugObject1, 'subdivision')
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    // remove old geometry from the GPU memory
    meshGeometry1.geometry.dispose();
    meshGeometry1.geometry = new THREE.BoxGeometry(
      debugObject1.width,
    debugObject1.height,
    debugObject1.depth,
      debugObject1.subdivision,
      debugObject1.subdivision,
      debugObject1.subdivision
    );
  });

  geometryTweak2
  .add(debugObject2, 'radius')
  .min(0.5)
  .max(4)
  .step(1)
  .onFinishChange(() => {
    // remove old geometry from the GPU memory
    meshGeometry2.geometry.dispose();
    meshGeometry2.geometry = new THREE.SphereGeometry(
      debugObject2.radius,
      debugObject2.subdivision,
      debugObject2.subdivision / 2
    );
  });

geometryTweak2
  .add(debugObject2, 'subdivision')
  .min(4)
  .max(64)
  .step(1)
  .onFinishChange(() => {
    // remove old geometry from the GPU memory
    meshGeometry2.geometry.dispose();
    meshGeometry2.geometry = new THREE.SphereGeometry(
      1,
      debugObject2.subdivision,
      debugObject2.subdivision / 2
    );
  });

geometryTweak3
  .add(debugObject3, 'radiusTop')
  .min(0.5)
  .max(4)
  .step(1)
  .onFinishChange(() => {
    // remove old geometry from the GPU memory
    meshGeometry3.geometry.dispose();
    meshGeometry3.geometry = new THREE.CylinderGeometry(
      debugObject3.radiusTop,
      debugObject3.radiusBottom,
      debugObject3.height,
      debugObject3.radialSegments,
    );
  });

geometryTweak3
  .add(debugObject3, 'radiusBottom')
  .min(0.5)
  .max(4)
  .step(1)
  .onFinishChange(() => {
    // remove old geometry from the GPU memory
    meshGeometry3.geometry.dispose();
    meshGeometry3.geometry = new THREE.CylinderGeometry(
      debugObject3.radiusTop,
      debugObject3.radiusBottom,
      debugObject3.height,
      debugObject3.radialSegments,
    );
  });

geometryTweak3
  .add(debugObject3, 'height')
  .min(0.5)
  .max(4)
  .step(1)
  .onFinishChange(() => {
    // remove old geometry from the GPU memory
    meshGeometry3.geometry.dispose();
    meshGeometry3.geometry = new THREE.CylinderGeometry(
      debugObject3.radiusTop,
      debugObject3.radiusBottom,
      debugObject3.height,
      debugObject3.radialSegments,
    );
  });

geometryTweak3
  .add(debugObject3, 'radialSegments')
  .min(8)
  .max(80)
  .step(1)
  .onFinishChange(() => {
    // remove old geometry from the GPU memory
    meshGeometry3.geometry.dispose();
    meshGeometry3.geometry = new THREE.CylinderGeometry(
      debugObject3.radiusTop,
      debugObject3.radiusBottom,
      debugObject3.height,
      debugObject3.radialSegments,
    );
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

  group.children[0].rotation.y = 0.5 * elapsedTime;
  group.children[1].rotation.y = 0.5 * elapsedTime;
  group.children[2].rotation.y = 0.5 * elapsedTime;

  group.children[0].rotation.x = -0.5 * elapsedTime;
  group.children[1].rotation.x = -0.5 * elapsedTime;
  group.children[2].rotation.x = -0.5 * elapsedTime;

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
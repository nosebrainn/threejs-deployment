import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

//Initialize scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Initialize viewport
const renderer = new THREE.WebGLRenderer({}); //alpha: true //Add that to WebGL arg
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//3D Object on Global Variable
let object;

//Orbit Controls
let controls;

//Object to render
let objToRender = 'brian';

//Instantiate loader
const loader = new GLTFLoader();

//Load file
loader.load(
  `./models/${objToRender}/scene.gltf`,
  function (gltf) {
    //If the file is loaded add to scene
    object = gltf.scene;
    scene.add(object);  
  },
  function (xhr) {
    //Console log model add
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //if error log
    console.error(error);
  }
);


//Initialize cube
//const geometry = new THREE.BoxGeometry();
//const material = new THREE.MeshBasicMaterial({color: 0xff000});
//const cube = new THREE.Mesh(geometry, material);
//scene.add(cube);

//Moves camera to not be in cube
camera.position.z = 4;
camera.position.y = 2;
//COULD ALSO USE THIS
//camera.position.z = objToRender == "blender" ? 25:500;


//LIGHTING
const toplight = new THREE.DirectionalLight(0xffffff, 1); // (Color, Intensity)
toplight.position.set(500, 500, 500); //top-left-ish
toplight.castShadow = true;
scene.add(toplight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender == "blender" ? 5:1)
scene.add(ambientLight)


//Resize Window
window.addEventListener("resize", function(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// -------------------------------CUBE ANIMATION

//Rotates --Recursion
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

//Bounces Object
var clock = new THREE.Clock();
var time = 0;
var delta = 0;


function bounce() {
  requestAnimationFrame(bounce);
  delta = clock.getDelta();
  time += delta;
  object.position.y = 0.5 + Math.abs(Math.cos(time * 3)) * 2;
  object.rotation.x += 0.01;
  object.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// -------------------------------CUBE ANIMATION

bounce();
//animate();
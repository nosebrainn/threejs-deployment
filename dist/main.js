import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

//Initialize scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Initialize viewport
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Initialize cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color: 0xff000});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//Moves camera to not be in cube
camera.position.z = 10;
camera.position.y = 5;


//Rotates --Recursion
function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

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
  cube.position.y = 0.5 + Math.abs(Math.cos(time * 3)) * 2;
  renderer.render(scene, camera);
}

bounce();
//animate(); //rotates cube
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(2, 3, 5);
camera.lookAt(scene.position);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 10, 5, 10), new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  wireframe: true
}));
plane.rotation.x = -Math.PI * 0.5;
scene.add(plane);

var ball = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 8), new THREE.MeshBasicMaterial({
  color: 0xff00ff,
  wireframe: true
}));
scene.add(ball);

var clock = new THREE.Clock();
var time = 0;
var delta = 0;

render();

function render() {
  requestAnimationFrame(render);
  delta = clock.getDelta();
  time += delta;
  ball.rotation.x = time * 4;
  ball.position.y = 0.5 + Math.abs(Math.sin(time * 3)) * 2;
  ball.position.z = Math.cos(time) * 4;
  renderer.render(scene, camera);
}
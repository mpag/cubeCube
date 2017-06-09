//Global Variables
//Scene
var scene = new THREE.Scene();
scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );

//Camera
var camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 20;
camera.position.y = 0;
var home = new THREE.Vector3( 0, 0, 2 );
camera.lookAt(home);

//Renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

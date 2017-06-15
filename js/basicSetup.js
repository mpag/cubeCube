//////////	
// MAIN //
//////////

// standard global variables
var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

// custom global variables
var cube;

// initialization
init();

// animation loop / game loop
animate();

///////////////
// FUNCTIONS //
///////////////
			
function init() 
{
	///////////
	// SCENE //
	///////////
	scene = new THREE.Scene();

	////////////
	// CAMERA //
	////////////
	
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;

	// camera attributes
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(1300,1400,3800);
	camera.lookAt(scene.position);
	
	//////////////
	// RENDERER //
	//////////////
	
	// create and start the renderer; choose antialias setting.
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer();
	
	renderer.shadowMapEnabled = true;
	// renderer.shadowMapType = THREE.PCFSoftShadowMap;
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	
	// attach div element to variable to contain the renderer
	container = document.getElementById( 'ThreeJS' );
	
	// attach renderer to the container div
	container.appendChild( renderer.domElement );
	
	////////////
	// EVENTS //
	////////////

	// automatically resize renderer
	THREEx.WindowResize(renderer, camera);
	
	//////////////
	// CONTROLS //
	//////////////

	// move mouse and: left   click to rotate, 
	//                 middle click to zoom, 
	//                 right  click to pan
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	
	///////////
	// STATS //
	///////////
	
	// displays current and past frames per second attained by scene
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );
	
	///////////
	// LIGHT //
	///////////
	
	// create a light
	var light = new THREE.SpotLight(0xffffff);
	var light1 = new THREE.SpotLight(0xffffff);
	light.position.set(300,300,0);
	light1.position.set(-300,300,0);
	light.castShadow = true;
	light1.castShadow = true;
	scene.add(light,light1);
	var ambientLight = new THREE.AmbientLight(0x111111);
	scene.add(ambientLight);

	
	//////////////
	// GEOMETRY //
	//////////////	

	//Base Geom
	var boxGeometry = new THREE.BoxGeometry( 50, 50, 50);

	//Materials
	var imgTexture = new THREE.ImageUtils.loadTexture( "UV.jpg" );
	imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
	var imgBumpTexture = new THREE.ImageUtils.loadTexture( "UV.jpg" );
	imgBumpTexture.wrapS = imgBumpTexture.wrapT = THREE.RepeatWrapping;
	var material = new THREE.MeshPhongMaterial( { map: imgTexture, bumpMap: imgBumpTexture, bumpScale: 0.01, side: THREE.DoubleSide});

	//Geom Definition

	var geometryTerrain = new THREE.PlaneGeometry( 2800, 2800, 256, 256 );
	terrain = new THREE.Mesh( geometryTerrain, material );
	terrain.rotation.x = Math.PI / -2;
	terrain.receiveShadow = true;
	terrain.castShadow = true;

	var numpoints = 2000;
	var dots = [];
	cubes = [];

	for (var i = 0 ; i < numpoints ; i++) {
	    var x = Math.random() * (10000) - 5000 //Math.random() * (max - min) + min
	    var y = Math.random() * 200 + 50
	    var z = Math.random() * (10000) - 5000
	    var dotGeometry = new THREE.Geometry();
	    dots.push(dotGeometry);
	    dotGeometry.vertices.push(new THREE.Vector3(x, y, z)); 
	    cube2 = new THREE.Mesh( boxGeometry, material);
	    cube2.position.x = x;
	    cube2.position.y = y;
	    cube2.position.z = z;
	    cube2.castShadow = true;
	    cube2.receiveShadow = true;
	    cubes.push(cube2);
	    scene.add(cube2);
	};

	//Addition to Scene
	scene.add(terrain);	


	/////////
	// SKY //
	/////////
	
	// recommend either a skybox or fog effect (can't use both at the same time) 
	// without one of these, the scene's background color is determined by webpage background

	// make sure the camera's "far" value is large enough so that it will render the skyBox!
	var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
	// BackSide: render faces from inside of the cube, instead of from outside (default).
	var skyBoxMaterial = new THREE.MeshStandardMaterial( { map: imgTexture, side: THREE.DoubleSide});
	skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);
	
	// // fog must be added to scene before first render
	// scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );
}

function animate() 
{
    requestAnimationFrame( animate );	
	render();		
	update();
}

function update()
{
	// delta = change in time since last call (in seconds)
	var delta = clock.getDelta(); 
	terrain.rotation.z += 0.005;
	for (var i = 0 ; i < (cubes.length) ; i++){
	var num1 = Math.random()*(0.1-0.001)+0.001;
	var num2 = Math.random()*(0.1-0.001)+0.001;
	var num3 = Math.random()*(0.1-0.001)+0.001;
	cubes[i].rotation.z += num1;
	cubes[i].rotation.x += num2;
	cubes[i].rotation.y += num3;
	};

	// // functionality provided by THREEx.KeyboardState.js
	// if ( keyboard.pressed("1") )
	// 	document.getElementById('message').innerHTML = ' Have a nice day! - 1';	
	// if ( keyboard.pressed("2") )
	// 	document.getElementById('message').innerHTML = ' Have a nice day! - 2 ';	

	controls.update();
	stats.update();
}

function render() 
{	
	renderer.render( scene, camera );
}
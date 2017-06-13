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
	camera.position.set(0,150,400);
	camera.lookAt(scene.position);
	
	//////////////
	// RENDERER //
	//////////////
	
	// create and start the renderer; choose antialias setting.
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer();
	
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
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
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
	cube = new THREE.Mesh( boxGeometry, material );
	cube.position.set(-50,45,0)

	cube2 = new THREE.Mesh( boxGeometry, material );
	cube2.position.set(50,45,0)

	var geometryTerrain = new THREE.PlaneGeometry( 500, 500, 256, 256 );
	terrain = new THREE.Mesh( geometryTerrain, material );
	terrain.rotation.x = Math.PI / -2;

	//Addition to Scene
	scene.add(cube,cube2,terrain);	

/*	var axes = new THREE.AxisHelper(100);
	scene.add( axes );*/
	

	/////////
	// SKY //
	/////////
	
	// recommend either a skybox or fog effect (can't use both at the same time) 
	// without one of these, the scene's background color is determined by webpage background

	// make sure the camera's "far" value is large enough so that it will render the skyBox!
	var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
	// BackSide: render faces from inside of the cube, instead of from outside (default).
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { 
		map: imgTexture,
		bumpMap: imgBumpTexture,
		bumpScale: 0.01,
		side: THREE.DoubleSide
	});
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
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
	cube2.rotation.z += 0.005;
	cube2.rotation.x += 0.005;
	cube2.rotation.y += 0.005;
	cube.rotation.z += -0.005;
	cube.rotation.x += -0.005;
	cube.rotation.y += -0.005;

	// functionality provided by THREEx.KeyboardState.js
	if ( keyboard.pressed("1") )
		document.getElementById('message').innerHTML = ' Have a nice day! - 1';	
	if ( keyboard.pressed("2") )
		document.getElementById('message').innerHTML = ' Have a nice day! - 2 ';	

	controls.update();
	stats.update();
}

function render() 
{	
	renderer.render( scene, camera );
}
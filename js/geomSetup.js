var geometry = new THREE.BoxGeometry( 2, 2, 2);
var diffuseColor = new THREE.Color(0xff69b4);
var imgTexture = new THREE.ImageUtils.loadTexture( "trump.jpg" );
imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
var imgTexture2 = new THREE.ImageUtils.loadTexture( "trump2.jpg" );
imgTexture2.wrapS = imgTexture2.wrapT = THREE.RepeatWrapping;
var imgBumpTexture = new THREE.ImageUtils.loadTexture( "trumpBump.jpg" );
imgBumpTexture.wrapS = imgBumpTexture.wrapT = THREE.RepeatWrapping;

var material = new THREE.MeshPhongMaterial( { 
	map: imgTexture,
	bumpMap: imgBumpTexture,
	bumpScale: 0.01
});
var material2 = new THREE.MeshPhongMaterial( { 
	map: imgTexture2,
	bumpMap: imgBumpTexture,
	bumpScale: 0.01
});
var terrainMaterial = new THREE.MeshPhongMaterial( { color: 0xd3d3d3} );

var cube = new THREE.Mesh( geometry, material );
cube.position.set(2,0,2)

var cube2 = new THREE.Mesh( geometry, material2 );
cube2.position.set(-2,0,2)


var geometryTerrain = new THREE.PlaneGeometry( 15, 15, 256, 256 );
terrain = new THREE.Mesh( geometryTerrain, material2 );

scene.add(cube,cube2,terrain);
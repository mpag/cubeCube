var geometry = new THREE.BoxGeometry( 2, 2, 2);
var material = new THREE.MeshLambertMaterial( { color: 0xFF00FF } );
var cube = new THREE.Mesh( geometry, material );

scene.add( cube );
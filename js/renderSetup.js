// function render() {
// 	requestAnimationFrame( render );

// 	cube.rotation.x += 0.008;
// 	cube.rotation.y += 0.008;
// 	cube2.rotation.x += -0.008;
// 	cube2.rotation.y += -0.008;

// 	renderer.render( scene, camera );
// };

// render();

function animate() 
{
    requestAnimationFrame( animate );
	cube.rotation.x += 0.008;
	cube.rotation.y += 0.008;
	cube2.rotation.x += -0.008;
	cube2.rotation.y += -0.008;
	render();		
	update();
}

function update()
{
	if ( keyboard.pressed("z") ) 
	{ 
		// do something
	}
	
	controls.update();
	stats.update();
}

function render() 
{
	renderer.render( scene, camera );
}

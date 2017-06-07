function render() {
	requestAnimationFrame( render );

	cube.rotation.x += 0.008;
	cube.rotation.y += 0.008;

	renderer.render( scene, camera );
};

render();
import {
	Color,
	Mesh,
	PlaneGeometry,
	ShaderMaterial,
	UniformsUtils,
	Vector2,
	Vector3,
	WebGLRenderTarget
} from 'three';

class FullScreenQuad {

	constructor( material ) {

		this._canvas = document.createElementNS( 'http://www.w3.org/1999/xhtml', 'canvas' );
		this._canvas.width = 2;
		this._canvas.height = 2;

		const context = this._canvas.getContext( 'webgl2', { antialias: false } );
		this._renderer = new WebGLRenderer( { canvas: this._canvas, context: context } );
		this._renderer.setPixelRatio( 1 );
		this._renderer.setSize( 2, 2, false );

		this._camera = new OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

		this._geometry = new PlaneGeometry( 2, 2 );
		this._material = material;

		this._mesh = new Mesh( this._geometry, this._material );

	}

	dispose() {

		this._mesh.geometry.dispose();
		this._mesh.material.dispose();
		this._renderer.dispose();

	}

	render( renderer, writeBuffer, readBuffer, deltaTime, maskActive ) {

		this._mesh.material = this._material;
		this._renderer.setRenderTarget( readBuffer );
		this._renderer.render( this._scene, this._camera );

		// Copy the result to the write buffer
		renderer.setRenderTarget( writeBuffer );
		renderer.render( this._scene, this._camera );

	}

}

export { FullScreenQuad };

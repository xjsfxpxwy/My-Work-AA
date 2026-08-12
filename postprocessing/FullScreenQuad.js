import {
	Color,
	FrontSide,
	Mesh,
	PlaneGeometry,
	ShaderMaterial,
	UniformsUtils,
	Vector2,
	Vector3,
	WebGLRenderer,
	WebGLRenderTarget,
	OrthographicCamera
} from 'three';

class Pass {

	constructor() {

		this.isPass = true;

		// if set to true, the pass is processed by the composer
		this.enabled = true;

		// if set to true, the pass indicates to swap read and write buffer after rendering
		this.needsSwap = true;

		// if set to true, the pass clears its buffer before rendering
		this.clear = false;

		// if set to true, the result of the pass is rendered to screen. This is set automatically by EffectComposer.
		this.renderToScreen = false;

	}

	setSize( /* width, height */ ) {}

	render( /* renderer, writeBuffer, readBuffer, deltaTime, maskActive */ ) {

		console.error( 'THREE.Pass: .render() must be implemented in derived pass.' );

	}

	dispose() {}

}

// Helper for passes that need to fill the viewport with a single quad.

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

		renderer.setRenderTarget( writeBuffer );
		renderer.render( this._scene, this._camera );

	}

}

export { Pass, FullScreenQuad };

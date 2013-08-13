/**
 * LICENSE (BSD)
 *
 * Copyright (c) 2013, Gerd Christian Kunze
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 *  * Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 *  * Neither the name of Gerd Christian Kunze nor the names of the
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Renderer
 * 13.08.2013 12:54
 */

(function(){

	ThreeJsApi.Renderer = (function(){

		var Width = 640;
		var setWidth = function( Pixel ){
			Width = Pixel;
			getTJSObject().setSize( Pixel, getHeight() );
			return this;
		};
		var getWidth = function(){
			return Width;
		};

		var Height = 480;
		var setHeight = function( Pixel ){
			Height = Pixel;
			getTJSObject().setSize( getWidth(), Pixel );
			return this;
		};
		var getHeight = function(){
			return Height;
		};

		var viewTarget = function( Selector ) {
			//noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
			jQuery( Selector ).append( getTJSObject().domElement );
			return this;
		};
		var viewFrame = function() {
			getTJSObject().render( ThreeJsApi.Scene.getTJSObject(), ThreeJsApi.Camera.getCurrent().getTJSObject() );
			return this;
		};
		var viewAnimation = function() {
			//noinspection JSCheckFunctionSignatures
			requestAnimationFrame( viewAnimation );
			viewAnimationStep();
		};
		var viewAnimationStep = function() {
			Animation();
			viewFrame();
		};

		var Animation = function(){};
		var methodAnimation = function( AnimationCallback ) {
			Animation = AnimationCallback;
			return this;
		};


		var useWebGL = function(){
			setTJSObject( new THREE.WebGLRenderer() );
			getTJSObject().setSize( getWidth(), getHeight() );
			return this;
		};
		var useCanvas = function(){
			setTJSObject( new THREE.CanvasRenderer() );
			getTJSObject().setSize( getWidth(), getHeight() );
			return this;
		};

		var TJSObject = null;
		var setTJSObject = function( tjsObject ){
			TJSObject = tjsObject;
			return this;
		};
		var getTJSObject = function(){
			if( TJSObject == null ) {
				//noinspection JSUnresolvedVariable
				if( window.WebGLRenderingContext ) {
					useWebGL();
				} else {
					useCanvas();
				}
			}
			return TJSObject;
		};

		return {
			getTJSObject: getTJSObject,

			useWebGL: useWebGL,
			useCanvas: useCanvas,

			viewTarget: viewTarget,
			methodAnimation: methodAnimation,
			viewFrame: viewFrame,
			viewAnimation: viewAnimation,
			viewAnimationStep: viewAnimationStep,

			setWidth: setWidth,
			getWidth: getWidth,

			setHeight: setHeight,
			getHeight: getHeight
		}

	})();

	// Init
	ThreeJsApi.Renderer.getTJSObject();

})();

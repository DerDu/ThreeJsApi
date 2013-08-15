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
 * ThreeJsApi
 * 13.08.2013 18:54
 */

var ThreeJsApi = (function(){

	var Load = function( Selector ){

		var Handler = Selector;
		var getHandler = function() { return Handler; };
		var setHandler = function( Value ) {
			Handler = Value;
			return this;
		};

		var Scene = null;
		var getScene = function() { return Scene; };
		var setScene = function( Value ) { Scene = Value; return this; };
		// Init
		setScene( ThreeJsApi.Create().Scene() );

		var Animation = null;
		var getAnimation = function() { return Animation; };
		var setAnimation = function( Value ) { Animation = Value; return this; };
		var AnimationFrameRenderer = function() {
			getRenderer().getTJSObject().render( getScene().getTJSObject(), getCamera().getTJSObject() );
		};
		var AnimationFrameLoop = function() {
			getAnimation().getLoop()();
		};
		var AnimationRun = function() {
			//noinspection JSCheckFunctionSignatures
			requestAnimationFrame( AnimationRun );
			AnimationStep();
		};
		var AnimationStep = function() {
			AnimationFrameLoop();
			AnimationFrameRenderer();
		};
		// Init
		setAnimation( ThreeJsApi.Create().Animation() );

		var Renderer = null;
		var getRenderer = function() { return Renderer; };
		var setRenderer = function( Value ) {
			Renderer = Value;
			// Append Renderer to DOM
			var Display = jQuery( getRenderer().getTJSObject().domElement );
			var Target = jQuery( getHandler() );
			Target.append( Display );
			// Add PostFX-Connection
			if( typeof THREE.EffectComposer != 'undefined' ) {
				PostFx = new THREE.EffectComposer( getRenderer() );
			}
			getScene().setRendererType( getRendererType() );
			return this;
		};
		var getRendererType = function() {
			if( getRenderer().getTJSObject() instanceof THREE.WebGLRenderer ) {
				return 'WebGL'
			} else if( getRenderer().getTJSObject() instanceof THREE.CanvasRenderer ) {
				return 'Canvas'
			}
			return undefined;
		};

		var PostFx = null;
		var getPostFx = function() {
			return PostFx;
		};

		var Camera = null;
		var getCamera = function() { return Camera; };
		var setCamera = function( Value ) {
			Camera = Value;
			return this;
		};

		// Additional
		var setWidth = function( Value ) {
			getRenderer().setWidth( Value );
			getCamera().setAspect( getRenderer().getWidth() / getRenderer().getHeight() );
			getCamera().getTJSObject().updateProjectionMatrix();
		};
		var setHeight = function( Value ) {
			getRenderer().setHeight( Value );
			getCamera().setAspect( getRenderer().getWidth() / getRenderer().getHeight() );
			getCamera().getTJSObject().updateProjectionMatrix();
		};

		return {
			setHandler: setHandler,
			getHandler: getHandler,
			setRenderer: setRenderer,
			getRenderer: getRenderer,
			getRendererType: getRendererType,
			setCamera: setCamera,
			getCamera: getCamera,
			setScene: setScene,
			getScene: getScene,

			getPostFx: getPostFx,

			getAnimation: getAnimation,
			setAnimation: setAnimation,
			runAnimation: AnimationRun,
			stepAnimation: AnimationStep,

			setWidth: setWidth,
			setHeight: setHeight

		};
	};

	var Factory = {};
	var getFactory = function( FactoryName ) {
		if( typeof FactoryName == 'undefined' ) {
			return Factory;
		} else {
			if( typeof Factory[FactoryName] == 'undefined' ) {
				console.log( 'ThreeJsApi: ' + FactoryName + ' missing!' );
				return null;
			} else {
				return Factory[FactoryName];
			}
		}
	};
	var addFactory = function( FactoryName, FactoryObject ) {
		Factory[FactoryName] = FactoryObject;
	};

	var Create = function() {
		return {
			Renderer: function() { return Factory.Renderer() },
			Camera: function() { return Factory.Camera() },
			Scene: function() { return Factory.Scene() },
			Geometry: function() { return Factory.Geometry() },
			Material: function() { return Factory.Material() },
			Mesh: function() { return Factory.Mesh() },
			Animation: function() { return Factory.Animation() },
			Texture: function() { return Factory.Texture() }
		};
	};

	return {
		Load: Load,
		Create: Create,

		addFactory: addFactory,
		getFactory: getFactory
	}

})();

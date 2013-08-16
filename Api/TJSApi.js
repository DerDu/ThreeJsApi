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
 * TJSApi
 * 15.08.2013 13:52
 */

var TJSApi = (function(){
		// Combined Factory
		var Factory = function(){};
		// ThreeJs Factory
		var FactoryTJS = {};
		// TJSApi Factory
		var FactoryAPI = {
			Material: {},
			Geometry: {},
			Object: {}
		};
		var Engine = function() {

			var EngineRenderer;
			var Renderer = function( APIObject ) {
				if( typeof APIObject == 'undefined' ) {
					return EngineRenderer;
				} else {
					EngineRenderer = APIObject;
					return this;
				}
			};
			var EngineCamera;
			var Camera = function( APIObject ) {
				if( typeof APIObject == 'undefined' ) {
					return EngineCamera;
				} else {
					EngineCamera = APIObject;
					return this;
				}
			};
			var EngineScene;
			var Scene = function( APIObject ) {
				if( typeof APIObject == 'undefined' ) {
					return EngineScene;
				} else {
					EngineScene = APIObject;
					return this;
				}
			};

			var EngineAnimation = {
				Loop: function() {
					// User specified
				},
				Render: function() {
					Renderer().TJSObject.render( Scene().TJSObject, Camera().TJSObject );
				},
				Run: function() {
					//noinspection JSCheckFunctionSignatures
					requestAnimationFrame( EngineAnimation.Run );
					EngineAnimation.Loop();
					EngineAnimation.Render();
				}
			};

			return {
				Renderer: Renderer,
				Camera: Camera,
				Scene: Scene,

				Animation: EngineAnimation,

				Helper: function() {
					return {
						Axis: function( Size ) { Scene().TJSObject.add( new THREE.AxisHelper( Size ) ); }
					}
				},

				Factory: TJSApi.Factory
			}
		};
		return {
			Engine: Engine,
			Factory: Factory,
			FactoryTJS: FactoryTJS,
			FactoryAPI: FactoryAPI
		}
})();

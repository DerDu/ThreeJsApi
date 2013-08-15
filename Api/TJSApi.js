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
		var Factory = {};
		var Object = {
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

				Factory: function() {
					return {
						Renderer: function() {
							return {
								WebGL: function() { return TJSApi.Create.Renderer.Use.WebGL(); },
								Canvas: function() { return TJSApi.Create.Renderer.Use.Canvas(); }
							}
						},
						Camera: function() {
							return {
								Perspective: function() { return TJSApi.Create.Camera.Use.Perspective(); }
							}
						},
						Scene: function() {
							return TJSApi.Create.Scene();
						},
						Geometry: function(){
							return {
								Cube: function( Width, Height, Depth ) { return TJSApi.Create.Geometry.Use.Cube( Width, Height, Depth ); },
								Torus: function( Radius, TubeRadius ) { return TJSApi.Create.Geometry.Use.Torus( Radius, TubeRadius ); }
							}
						},
						Material: function(){
							return {
								Mesh: function() {
									return {
										Basic: function() { return TJSApi.Create.Material.Use.Mesh.Type.Basic( '#0000FF' ); },
										Lambert: function() { return TJSApi.Create.Material.Use.Mesh.Type.Lambert( '#0000FF' ); },
										Phong: function() { return TJSApi.Create.Material.Use.Mesh.Type.Phong( '#0000FF' ); }
									}
								}
							}
						},
						Object: function() {
							return {
								Mesh: function( Geometry, Material ) { return TJSApi.Create.Object.Use.Mesh( Geometry, Material ); }
							}
						}
					}
				}

			}
		};
		return {
			Create: Factory,
			Object: Object,
			Engine: Engine
		}
})();

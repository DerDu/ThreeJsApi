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
 * APIFactory
 * 16.08.2013 15:17
 */

(function() {
	TJSApi.Factory = function() {
		return {
			Renderer: function() {
				return {
					WebGL: function() {
						return TJSApi.FactoryAPI.Renderer(
							TJSApi.FactoryTJS.Renderer.Use.WebGL()
						);
					},
					Canvas: function() {
						return TJSApi.FactoryAPI.Renderer(
							TJSApi.FactoryTJS.Renderer.Use.Canvas()
						);
					}
				}
			},
			Camera: function() {
				return {
					Basic: function() {
						return TJSApi.FactoryAPI.Camera(
							TJSApi.FactoryTJS.Camera.Use.Basic()
						);
					},
					Perspective: function() {
						return TJSApi.FactoryAPI.Camera(
							TJSApi.FactoryTJS.Camera.Use.Perspective()
						);
					}
				}
			},
			Scene: function() {
				return {
					Basic: function() {
						return TJSApi.FactoryAPI.Scene(
							TJSApi.FactoryTJS.Scene()
						);
					},
					Physics: function() {
						return TJSApi.FactoryAPI.Scene(
							new Physijs.Scene()
						);
					}
				}
			},
			Geometry: function(){
				return {
					Cube: function( Width, Height, Depth, WidthSegments, HeightSegments, DepthSegments ) {
						return TJSApi.FactoryAPI.Geometry.Cube(
							TJSApi.FactoryTJS.Geometry.Use.Cube( Width, Height, Depth, WidthSegments, HeightSegments, DepthSegments )
						);
					},
					Torus: function( Radius, TubeRadius ) {
						return TJSApi.FactoryAPI.Geometry.Torus(
							TJSApi.FactoryTJS.Geometry.Use.Torus( Radius, TubeRadius )
						);
					},
					Plane: function( Width, Height, WidthSegments, HeightSegments ) {
						return TJSApi.FactoryAPI.Geometry.Plane(
							TJSApi.FactoryTJS.Geometry.Use.Plane( Width, Height, WidthSegments, HeightSegments )
						);
					}
				}
			},
			Material: function(){
				return {
					Mesh: function() {
						return {
							Basic: function() {
								return TJSApi.FactoryAPI.Material.Mesh(
									TJSApi.FactoryTJS.Material.Use.Mesh.Type.Basic( '#6666FF' )
								);
							},
							Lambert: function() {
								return TJSApi.FactoryAPI.Material.Mesh(
									TJSApi.FactoryTJS.Material.Use.Mesh.Type.Lambert( '#6666FF' )
								);
							},
							Phong: function() {
								return TJSApi.FactoryAPI.Material.Mesh(
									TJSApi.FactoryTJS.Material.Use.Mesh.Type.Phong( '#6666FF' )
								);
							}
						}
					}
				}
			},
			Texture: function( File ) {
				return TJSApi.FactoryAPI.Texture(
					TJSApi.FactoryTJS.Texture( File )
				);
			},
			Fog: function( Color, Near, Far ) {
				return TJSApi.FactoryAPI.Fog(
					TJSApi.FactoryTJS.Fog( Color, Near, Far )
				);
			},
			Light: function() {
				return {
					Ambient: function() {
						return TJSApi.FactoryAPI.Light.Ambient(
							TJSApi.FactoryTJS.Light.Use.Ambient()
						);
					},
					Directional: function() {
						return TJSApi.FactoryAPI.Light.Directional(
							TJSApi.FactoryTJS.Light.Use.Directional()
						);
					}
				}
			},
			Mesh: function() {
				return {
					Basic: function( Geometry, Material ) {
						return TJSApi.FactoryAPI.Mesh.Basic(
							TJSApi.FactoryTJS.Mesh.Use.Basic( Geometry, Material )
						);
					},
					Physics: function(){
						return {
							Cube: function( Geometry, Material, Mass ) {
								return TJSApi.FactoryAPI.Mesh.Basic(
									new Physijs.BoxMesh( Geometry.TJSObject, Material.TJSObject, Mass )
								);
							}
						}
					}
				}
			},
			Controller: function() {
				return {
					Camera: function() {
						return {
							Orbit: function( APICamera ){
								return new TJSApi.FactoryAPI.Controller.Camera.Orbit( APICamera )
							}
						}
					},
					Mouse: function( APIRenderer, APICamera, APIScene ) {
						return new TJSApi.FactoryAPI.Controller.Mouse( APIRenderer, APICamera, APIScene );
					},
					Keyboard: function( APIMouse ) {
						return new TJSApi.FactoryAPI.Controller.Keyboard( APIMouse );
					},
					Object: function() {
						return {
							Draggable: function( APICamera, APIMouse ){
								return new TJSApi.FactoryAPI.Controller.Object.Draggable( APICamera, APIMouse )
							}
						}
					}
				}
			},
			Helper: function() {
				return {
					Axis: function( Size ){
						return TJSApi.FactoryAPI.Helper.Axis(
							TJSApi.FactoryTJS.Helper.Use.Axis( Size )
						);
					},
					DirectionalLight: function( Size ){
						return TJSApi.FactoryAPI.Helper.DirectionalLight(
							TJSApi.FactoryTJS.Helper.Use.DirectionalLight( Size )
						);
					},
					PointLight: function( Size ){
						return TJSApi.FactoryAPI.Helper.PointLight(
							TJSApi.FactoryTJS.Helper.Use.PointLight( Size )
						);
					},
					HemisphereLight: function( Size ){
						return TJSApi.FactoryAPI.Helper.HemisphereLight(
							TJSApi.FactoryTJS.Helper.Use.HemisphereLight( Size )
						);
					}
				}
			}
		}
	}
})();

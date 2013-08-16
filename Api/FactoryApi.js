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
					WebGL: function() { return TJSApi.FactoryTJS.Renderer.Use.WebGL(); },
					Canvas: function() { return TJSApi.FactoryTJS.Renderer.Use.Canvas(); }
				}
			},
			Camera: function() {
				return {
					Basic: function() { return TJSApi.FactoryTJS.Camera.Use.Basic(); },
					Perspective: function() { return TJSApi.FactoryTJS.Camera.Use.Perspective(); }
				}
			},
			Scene: function() {
				return TJSApi.FactoryTJS.Scene();
			},
			Mouse: function( Renderer, Camera, Scene ) {
				return TJSApi.FactoryAPI.Mouse( Renderer, Camera, Scene );
			},
			Geometry: function(){
				return {
					Cube: function( Width, Height, Depth, WidthSegments, HeightSegments, DepthSegments ) { return TJSApi.FactoryTJS.Geometry.Use.Cube( Width, Height, Depth, WidthSegments, HeightSegments, DepthSegments ); },
					Torus: function( Radius, TubeRadius ) { return TJSApi.FactoryTJS.Geometry.Use.Torus( Radius, TubeRadius ); },
					Plane: function( Width, Height, WidthSegments, HeightSegments ) { return TJSApi.FactoryTJS.Geometry.Use.Plane( Width, Height, WidthSegments, HeightSegments ); },
					Bird: function() { return TJSApi.FactoryTJS.Geometry.Use.Bird(); }
				}
			},
			Material: function(){
				return {
					Mesh: function() {
						return {
							Basic: function() { return TJSApi.FactoryTJS.Material.Use.Mesh.Type.Basic( '#6666FF' ); },
							Lambert: function() { return TJSApi.FactoryTJS.Material.Use.Mesh.Type.Lambert( '#6666FF' ); },
							Phong: function() { return TJSApi.FactoryTJS.Material.Use.Mesh.Type.Phong( '#6666FF' ); }
						}
					}
				}
			},
			Object: function() {
				return {
					Mesh: function( Geometry, Material ) { return TJSApi.FactoryTJS.Object.Use.Mesh( Geometry, Material ); }
				}
			}
		}
	}
})();

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
 * Create
 * 15.08.2013 13:52
 */

(function(){

	TJSApi.FactoryTJS.Renderer = function() {
		var Factory = {
			WebGL: function() {
				return new THREE.WebGLRenderer( {antialias: true} );
			},
			Canvas: function() {
				return new THREE.CanvasRenderer();
			}
		};
		return {
			Use: Factory
		}
	}();

	TJSApi.FactoryTJS.Camera = function() {
		var Factory = {
			Basic: function() {
				return new THREE.Camera();
			},
			Perspective: function() {
				return new THREE.PerspectiveCamera();
			}
		};
		return {
			Use: Factory
		}
	}();

	TJSApi.FactoryTJS.Scene = function() {
		return new THREE.Scene();
	};

	TJSApi.FactoryTJS.Geometry = function() {
		var Factory = {
			Cube: function( Width, Height, Depth, WidthSegments, HeightSegments, DepthSegments ) {
				return new THREE.CubeGeometry( Width, Height, Depth, WidthSegments, HeightSegments, DepthSegments );
			},
			Sphere: function(  Radius, WidthSegments, HeightSegments, PhiStart, PhiLength, ThetaStart, ThetaLength ) {
				return new THREE.SphereGeometry( Radius, WidthSegments, HeightSegments, PhiStart, PhiLength, ThetaStart, ThetaLength );
			},
			Torus: function( Radius, TubeLength, RadialSegments, TubularSegments ) {
				return new THREE.TorusGeometry( Radius, TubeLength, RadialSegments, TubularSegments );
			},
			Plane: function( Width, Height, WidthSegments, HeightSegments ) {
				return new THREE.PlaneGeometry( Width, Height, WidthSegments, HeightSegments );
			}
		};
		return {
			Use: Factory
		}
	}();

	TJSApi.FactoryTJS.Material = function() {
		var Factory = {
			Mesh: function() {
				var Factory = {
					Basic: function( Color ) {
						return new THREE.MeshBasicMaterial( {color: Color} );
					},
					Lambert: function( Color ) {
						return new THREE.MeshLambertMaterial( {color: Color} );
					},
					Phong: function( Color ) {
						return new THREE.MeshPhongMaterial( {color: Color} );
					}
				};
				return {
					Type: Factory
				}
			}()
		};
		return {
			Use: Factory
		}
	}();

	TJSApi.FactoryTJS.Texture = function( File ) {
		//noinspection JSPotentiallyInvalidConstructorUsage
		return new THREE.ImageUtils.loadTexture( File );
	};

	TJSApi.FactoryTJS.Fog = function( Color, Near, Far ) {
		return new THREE.Fog( Color, Near, Far );
	};

	TJSApi.FactoryTJS.Light = function() {
		var Factory = {
			Ambient: function() {
				return new THREE.AmbientLight();
			}
		};
		return {
			Use: Factory
		}
	}();

	TJSApi.FactoryTJS.Mesh = function() {
		var Factory = {
			Basic: function( APIGeometry, APIMaterial ) {
				return new THREE.Mesh( APIGeometry.TJSObject, APIMaterial.TJSObject );
			}
		};
		return {
			Use: Factory
		}
	}();

})();

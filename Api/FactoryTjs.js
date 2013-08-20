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
				return TJSApi.FactoryAPI.Renderer( new THREE.WebGLRenderer( {antialias: true} ) );
			},
			Canvas: function() {
				return TJSApi.FactoryAPI.Renderer( new THREE.CanvasRenderer() );
			}
		};
		return {
			Use: Factory
		}
	}();
	TJSApi.FactoryTJS.Camera = function() {
		var Factory = {
			Basic: function() {
				return TJSApi.FactoryAPI.Camera( new THREE.Camera() );
			},
			Perspective: function() {
				return TJSApi.FactoryAPI.Camera( new THREE.PerspectiveCamera() );
			}
		};
		return {
			Use: Factory
		}
	}();
	TJSApi.FactoryTJS.Scene = function() {
		return TJSApi.FactoryAPI.Scene( new THREE.Scene() );
	};
	TJSApi.FactoryTJS.Geometry = function() {
		var Factory = {
			Cube: function( Width, Height, Depth, WidthSegments, HeightSegments, DepthSegments ) {
				return TJSApi.FactoryAPI.Geometry.Cube( new THREE.CubeGeometry( Width, Height, Depth, WidthSegments, HeightSegments, DepthSegments ) );
			},
			Torus: function( Radius, TubeLength, RadialSegments, TubularSegments ) {
				return TJSApi.FactoryAPI.Geometry.Torus( new THREE.TorusGeometry( Radius, TubeLength, RadialSegments, TubularSegments ) );
			},
			Plane: function( Width, Height, WidthSegments, HeightSegments ) {
				return TJSApi.FactoryAPI.Geometry.Plane( new THREE.PlaneGeometry( Width, Height, WidthSegments, HeightSegments ) );
			},
			Grid: function( Width, Height, Size, LineMaterial ) {
// TODO: Grid Geometry
				var Buffer = ( Width > Height ? Width : Height );

				var Geometry = new THREE.Geometry();
				Geometry.vertices.push( new THREE.Vector3( - Buffer, 0, 0 ) );
				Geometry.vertices.push( new THREE.Vector3( Buffer, 0, 0 ) );

				var LineCount = ( Buffer / Size * 2 );

				return TJSApi.FactoryAPI.Geometry.Grid(

				);
			},
			Bird: function() {
				var Bird = function () {
					var scope = this;

					THREE.Geometry.call( this );

					v(   5,   0,   0 );
					v( - 5, - 2,   1 );
					v( - 5,   0,   0 );
					v( - 5, - 2, - 1 );

					v(   0,   2, - 6 );
					v(   0,   2,   6 );
					v(   2,   0,   0 );
					v( - 3,   0,   0 );

					f3( 0, 2, 1 );
					// f3( 0, 3, 2 );

					f3( 4, 7, 6 );
					f3( 5, 6, 7 );

					this.computeCentroids();
					this.computeFaceNormals();

					function v( x, y, z ) {
						scope.vertices.push( new THREE.Vector3( x, y, z ) );
					}
					function f3( a, b, c ) {
						scope.faces.push( new THREE.Face3( a, b, c ) );
					}
				};
				Bird.prototype = Object.create( THREE.Geometry.prototype );

				return TJSApi.FactoryAPI.Geometry.Bird( new Bird() );
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
						return TJSApi.FactoryAPI.Material.Mesh( new THREE.MeshBasicMaterial( {color: Color} ) );
					},
					Lambert: function( Color ) {
						return TJSApi.FactoryAPI.Material.Mesh( new THREE.MeshLambertMaterial( {color: Color} ) );
					},
					Phong: function( Color ) {
						return TJSApi.FactoryAPI.Material.Mesh( new THREE.MeshPhongMaterial( {color: Color} ) );
					}
				};
				return {
					Type: Factory
				}
			}(),
			Line: function() {
				var Factory = {};
				return {
					Type: Factory
				}
			}(),
			Particle: function() {
				var Factory = {};
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
		return TJSApi.FactoryAPI.Texture( new THREE.ImageUtils.loadTexture( File ) );
	};
	TJSApi.FactoryTJS.Fog = function() {
		return TJSApi.FactoryAPI.Fog( new THREE.Fog() );
	};
	TJSApi.FactoryTJS.Object = function() {
		var Factory = {
			Mesh: function( APIGeometry, APIMaterial ) {
				return TJSApi.FactoryAPI.Object.Mesh( new THREE.Mesh( APIGeometry.TJSObject, APIMaterial.TJSObject ) );
			}
		};
		return {
			Use: Factory
		}
	}();
})();

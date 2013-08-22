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
			Camera: {},
			Controller: {
				Camera: {},
				Object: {}
			},
			Fog: {},
			Geometry: {},
			Light: {},
			Material: {},
			Mesh: {},
			Renderer: {},
			Scene: {},
			Texture: {}
		};

		var RequireBase = 'Api';
		var RequireList= [
			['/TJSApi/3rdParty/jQuery/jquery-1.10.2.min.js'],
			['/TJSApi/3rdParty/ThreeJs/three.min.js'],
			['/TJSApi/3rdParty/ThreeJs/stats.min.js'],
			// Physics
			['/TJSApi/3rdParty/PhysiJs/physi.js', function(){
				Physijs.scripts.worker = RequireBase + '/TJSApi/3rdParty/PhysiJs/physijs_worker.js';
				Physijs.scripts.ammo = 'ammo.small.js';
			}],
			//['/TJSApi/3rdParty/AmmoJs/ammo.small.js'],

			['/TJSApi/FactoryTjs.js'],
			['/TJSApi/FactoryApi.js'],

			['/TJSApi/Renderer/Camera.js'],
			['/TJSApi/Renderer/Renderer.js'],
			['/TJSApi/Renderer/Scene.js'],
			['/TJSApi/Renderer/Fog.js'],

			['/TJSApi/Library/Texture.js'],
			['/TJSApi/Library/Geometry.js'],
			['/TJSApi/Library/Material.js'],
			['/TJSApi/Library/Mesh.js'],
			['/TJSApi/Library/Light/Ambient.js'],

			['/TJSApi/Controller/Mouse.js'],
			['/TJSApi/Controller/Keyboard.js'],
			['/TJSApi/Controller/Camera/Orbit.js'],
			['/TJSApi/Controller/Object/Draggable.js'],
		];

		var RequireFile = function( Source, Callback ){
			console.log( 'Loading: ' + Source );
			var Head = document.getElementsByTagName( "head" )[0];
			var Script = document.createElement( 'script' );
			Script.src = Source;
			Script.type = 'text/javascript';
			//real browsers
			Script.onload = Callback;
			//Internet explorer
			Script.onreadystatechange = function() {
				if( this.readyState == 'complete' ) {
					Callback();
				}
			};
			Head.appendChild( Script );
			RequireDone.push( Source );
		};
		var RequireDone = [];
		var Require = function( SetupCallback ) {
			if( typeof SetupCallback == 'function' ) {
				SetupCallback();
			}
			var ListLength = RequireList.length;
			var DoneLength = RequireDone.length;
			if( DoneLength < ListLength ) {
				RequireFile( RequireBase + RequireList[DoneLength][0], function() { Require( RequireList[DoneLength][1] ) } );
			}
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

					TJSApi.Debug().PerformanceMonitor().Begin();

					EngineAnimation.Loop();
					EngineAnimation.Render();

					// Run Physics if available
					if( typeof Scene().TJSObject.simulate == 'function' ) {
						Scene().TJSObject.simulate();
					}

					TJSApi.Debug().PerformanceMonitor().End();

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


		var DebugSetting = {
			PerformanceMonitor: {
				Enable: false,
				TJSObject: {}
			},
			MessageMonitor: {
				Enable: false,
				TJSObject: {}
			}
		};

		var Debug = function() {
			return {
				PerformanceMonitor: function() {
					return {
						Enable: function( Engine ) {
							if( typeof Stats != 'undefined' ) {
								DebugSetting.PerformanceMonitor.Enable = true;
								DebugSetting.PerformanceMonitor.TJSObject = new Stats();
								DebugSetting.PerformanceMonitor.TJSObject.domElement.style.position = 'absolute';
								DebugSetting.PerformanceMonitor.TJSObject.domElement.style.right = '0px';
								DebugSetting.PerformanceMonitor.TJSObject.domElement.style.top = '0px';
								DebugSetting.PerformanceMonitor.TJSObject.setMode(0);
								jQuery( Engine.Renderer().Display() ).append( DebugSetting.PerformanceMonitor.TJSObject.domElement );
								jQuery( Engine.Renderer().Display() ).css('position','relative');
							}
						},
						LogFps: function() {
							if( Debug().PerformanceMonitor().Status() ) {
								DebugSetting.PerformanceMonitor.TJSObject.setMode(0);
							}
						},
						LogMs: function() {
							if( Debug().PerformanceMonitor().Status() ) {
								DebugSetting.PerformanceMonitor.TJSObject.setMode(1);
							}
						},
						Begin: function() {
							if( Debug().PerformanceMonitor().Status() ) {
								DebugSetting.PerformanceMonitor.TJSObject.begin();
							}
						},
						End: function() {
							if( Debug().PerformanceMonitor().Status() ) {
								DebugSetting.PerformanceMonitor.TJSObject.end();
							}
						},
						Status: function() {
							//noinspection JSConstructorReturnsPrimitive
							return DebugSetting.PerformanceMonitor.Enable;
						}
					}
				},
				MessageMonitor: function() {
					return {
						Enable: function() {
							if( typeof console != 'undefined' && typeof console.log != 'undefined' ) {
								DebugSetting.MessageMonitor.Enable = true;
								DebugSetting.MessageMonitor.TJSObject = console;
							}
						},
						Text: function( Message ) {
							if( Debug().MessageMonitor().Status() ) {
								DebugSetting.MessageMonitor.TJSObject.log( Message );
							}
						},
						Object: function( Object ) {
							if( Debug().MessageMonitor().Status() ) {
								DebugSetting.MessageMonitor.TJSObject.log( Object, true );
							}
						},
						Status: function() {
							//noinspection JSConstructorReturnsPrimitive
							return DebugSetting.MessageMonitor.Enable;
						}
					}
				}
			}
		};

		var ConvertAPIVectorToTJSVector3 = function( ObjectXYZ ) {
			return new THREE.Vector3( ObjectXYZ.X, ObjectXYZ.Y, ObjectXYZ.Z );
		};
		var ConvertTJSVector3ToAPIVector = function( Vector3 ) {
			return { X: Vector3.x, Y: Vector3.y, Z: Vector3.z };
		};

		var Math = {
			Vector: {
				Subtraction: function( APIVectorA, APIVectorB ) {
					return this.Convert.ToAPI(
						this.Convert.ToTJS( APIVectorA ).sub( this.Convert.ToTJS( APIVectorB ) )
					);
				},
				Addition: function( APIVectorA, APIVectorB ) {
					return this.Convert.ToAPI(
						this.Convert.ToTJS( APIVectorA ).add( this.Convert.ToTJS( APIVectorB ) )
					);
				},
				Length: function( APIVector ) {
					//noinspection JSConstructorReturnsPrimitive
					return window.Math.sqrt(
						  window.Math.pow( APIVector.X, 2 )
						+ window.Math.pow( APIVector.Y, 2 )
						+ window.Math.pow( APIVector.Z, 2 )
					);
				},
				MultiplyScalar: function( APIVector, Value ) {
					return this.Convert.ToAPI(
						this.Convert.ToTJS( APIVector ).multiplyScalar( Value )
					);
				},
				Convert: {
					ToTJS: ConvertAPIVectorToTJSVector3,
					ToAPI: ConvertTJSVector3ToAPIVector
				}
			}
		};

		var ReadyLoadFiles = true;
		var Ready = function( Callback ) {
			if( ReadyLoadFiles ) {
				Require();
				ReadyLoadFiles = false;
			}
			if( RequireList.length != RequireDone.length ) {
				window.setTimeout( 'TJSApi.Ready('+ Callback +');', 100 );
			} else {
				Callback();
			}
		};

		return {
			Engine: Engine,
			Factory: Factory,
			Debug: Debug,

			FactoryTJS: FactoryTJS,
			FactoryAPI: FactoryAPI,

			Math: Math,

			Ready: Ready
		}
})();


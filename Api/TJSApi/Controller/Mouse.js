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
 * Mouse
 * 16.08.2013 10:45
 */

(function(){
	TJSApi.FactoryAPI.Controller.Mouse = function( APIRenderer, APICamera, APIScene ) {

		var Projector = new THREE.Projector();

		var MousePositionOn = false;
		var PositionOn = function() {
			//noinspection JSConstructorReturnsPrimitive
			return MousePositionOn
		};

		var MousePointer;
		var Pointer = function() { return MousePointer; };

		var MousePosition2D = { x: 0, y: 0 };
		var Position2D = function() { return { X: MousePosition2D.x, Y: MousePosition2D.y } };

		var MousePosition3D = { x: 0, y: 0, z: 0 };
		var Position3D = function() { return { X: MousePosition3D.x, Y: MousePosition3D.y, Z: MousePosition3D.z } };

		var ObjectList = [];
		var PointerObjectList = function() { return ObjectList; };
		var PointerObject = function() { return ObjectList[0]; };

		/** Top/Left = Negative, Bottom/Right = Positive, NoMovement = 0 */
		var MouseDirection = { X: 0, Y: 0 };
		var MouseDirectionPosition = { X: 0, Y: 0 };
		var MouseDirectionUpdate = function() {
			var MouseMovePosition = Position2D();
			if( MouseMovePosition.X < MouseDirectionPosition.X ) { MouseDirection.X = -1; }
			else if( MouseMovePosition.X > MouseDirectionPosition.X ) { MouseDirection.X = 1; }
			else { MouseDirection.X = 0; }
			if( MouseMovePosition.Y < MouseDirectionPosition.Y ) { MouseDirection.Y = -1; }
			else if( MouseMovePosition.Y > MouseDirectionPosition.Y ) { MouseDirection.Y = 1; }
			else { MouseDirection.Y = 0; }
			MouseDirectionPosition = Position2D();
		};
		var GetMouseDirectionX = function() {
			//noinspection JSConstructorReturnsPrimitive
			return MouseDirection.X;
		};
		var GetMouseDirectionY = function() {
			//noinspection JSConstructorReturnsPrimitive
			return MouseDirection.Y;
		};

		/** Event-Stack */
		var Event = {
			Press: {
				All: [], Left: [], Middle: [], Right: []
			},
			Release: {
				All: [], Left: [], Middle: [], Right: []
			},
			Click: {
				All: [], Left: [], Middle: [], Right: []
			},
			Move: {
				// Auto-Direction-Detection
				All: [MouseDirectionUpdate], Left: [], Middle: [], Right: []
			},
			Wheel: {
				All: function(){},
				Up: function(){},
				Down: function(){}
			}
		};

		var MouseBrowserEvent = null;
		var MouseEvent = function() {
			//noinspection JSConstructorReturnsPrimitive
			return MouseBrowserEvent;
		};

		var CalculateMouse = function( Event ) {
			// Save Event for Api
			MouseBrowserEvent = Event;
			// Calculate Position 2D
			MousePosition2D = new THREE.Vector3(
				Event.offsetX,
				Event.offsetY,
				0.5
			);
			// Calculate Position 3D
			MousePosition3D = new THREE.Vector3(
				( MousePosition2D.x / APIRenderer.Width() ) *2 -1,
				- ( MousePosition2D.y / APIRenderer.Height() ) *2 +1,
				0.5
			);
			Projector.unprojectVector( MousePosition3D, APICamera.TJSObject );
			// Calculate Direction Ray 3D
			var RayPosition3D = MousePosition3D.clone();
			MousePointer = new THREE.Raycaster( APICamera.TJSObject.position, RayPosition3D.sub( APICamera.TJSObject.position ).normalize() );
		};

		var CalculateObjects = function() {
			var TJSObjectListSearch = MousePointer.intersectObjects( APIScene.TJSObject.children );
			var TJSObjectListLength = TJSObjectListSearch.length;

			ObjectList = [];
			for( var Search = 0; Search < TJSObjectListLength; Search++ ) {
				var Hit = APIScene.Get( TJSObjectListSearch[Search].object.id );
				if( typeof Hit.Event == 'function' && Hit.Event().Toggle().Click() ) {
					ObjectList.push( Hit );
				}
			}
		};

		var RegisterEventPressAll = function( Callback ) { Event.Press.All.push( Callback ); };
		var RegisterEventPressLeft = function( Callback ) { Event.Press.Left.push( Callback ); };
		var RegisterEventPressMiddle = function( Callback ) { Event.Press.Middle.push( Callback ); };
		var RegisterEventPressRight = function( Callback ) { Event.Press.Right.push( Callback ); };

		var RegisterEventReleaseAll = function( Callback ) { Event.Release.All.push(Callback ); };
		var RegisterEventReleaseLeft = function( Callback ) { Event.Release.Left.push( Callback ); };
		var RegisterEventReleaseMiddle = function( Callback ) { Event.Release.Middle.push( Callback ); };
		var RegisterEventReleaseRight = function( Callback ) { Event.Release.Right.push( Callback ); };

		var RegisterEventClickAll = function( Callback ) { Event.Click.All.push( Callback ); };
		var RegisterEventClickLeft = function( Callback ) { Event.Click.Left.push( Callback ); };
		var RegisterEventClickMiddle = function( Callback ) { Event.Click.Middle.push( Callback ); };
		var RegisterEventClickRight = function( Callback ) { Event.Click.Right.push( Callback ); };

		var RegisterEventMoveAll = function( Callback ) { Event.Move.All.push( Callback ); };
		var RegisterEventMoveLeft = function( Callback ) { Event.Move.Left.push( Callback ); };
		var RegisterEventMoveMiddle = function( Callback ) { Event.Move.Middle.push( Callback ); };
		var RegisterEventMoveRight = function( Callback ) { Event.Move.Right.push( Callback ); };

		var RegisterEventWheelAll = function( Callback ) { Event.Wheel.All = Callback; };
		var RegisterEventWheelUp = function( Callback ) { Event.Wheel.Up = Callback; };
		var RegisterEventWheelDown = function( Callback ) { Event.Wheel.Down = Callback; };

		var MousePressedToggle = false;
		var MousePressed = function() {
			//noinspection JSConstructorReturnsPrimitive
			return MousePressedToggle;
		};
		var MouseMovedToggle = 0;
		var MouseMoved = function() {
			//noinspection JSConstructorReturnsPrimitive
			return MouseMovedToggle;
		};

		// Init
		var Display = jQuery( APIRenderer.Display() );

		// Pointer on Display ?
		Display.on( 'mouseenter', function() { MousePositionOn = true } );
		Display.on( 'mouseleave', function() { MousePositionOn = false } );

		Display.on( 'contextmenu', function( MouseEvent ) {
			// Debug
			TJSApi.Debug().MessageMonitor().Text( 'Mouse (Event): ContextMenu' );
			// Pre
			MouseEvent.preventDefault();
			MousePressedToggle = true;
			// Calculate Mouse
			CalculateMouse( MouseEvent );
			// Calculate Objects
			CalculateObjects();
			// Run

			// Post
			MousePressedToggle = false;
			return false;
		});

		Display.on( 'mousedown', function( MouseEvent ) {
			// Debug
			TJSApi.Debug().MessageMonitor().Text( 'Mouse (Event): Down' );
			// Pre
			MouseEvent.preventDefault();
			MousePressedToggle = true;
			MouseMovedToggle = 0;
			// Calculate Mouse
			CalculateMouse( MouseEvent );
			// Calculate Objects
			CalculateObjects();
			// Run
			// Execute
			switch ( MouseEvent.which ) {
				case 1:
					TJSApi.Debug().MessageMonitor().Text( 'Mouse (Button):Left > (Callback):Press-Left / Press-All' );
					jQuery( Event.Press.Left ).each(function( Index, Callback ){ Callback(); });
					jQuery( Event.Press.All ).each(function( Index, Callback ){ Callback(); });
					break;
				case 2:
					TJSApi.Debug().MessageMonitor().Text( 'Mouse (Button):Middle > (Callback):Press-Middle / Press-All' );
					jQuery( Event.Press.Middle ).each(function( Index, Callback ){ Callback(); });
					jQuery( Event.Press.All ).each(function( Index, Callback ){ Callback(); });
					break;
				case 3:
					TJSApi.Debug().MessageMonitor().Text( 'Mouse (Button):Right > (Callback):Press-Right / Press-All' );
					jQuery( Event.Press.Right ).each(function( Index, Callback ){ Callback(); });
					jQuery( Event.Press.All ).each(function( Index, Callback ){ Callback(); });
					break;
				default:
					TJSApi.Debug().MessageMonitor().Text( 'Mouse (Button): Not supported' );
					// Ignore unsupported Mouse-Button
			}
			// Post
			return false;
		});

		Display.on( 'mouseup', function( MouseEvent ) {
			// Debug
			TJSApi.Debug().MessageMonitor().Text( 'Mouse (Event): Up' );
			// Pre
			MouseEvent.preventDefault();
			// Calculate Mouse
			CalculateMouse( MouseEvent );
			// Calculate Objects
			CalculateObjects();
			// Run
			// Handle Click
			if( MouseMoved() < 5 ) {
				// Execute
				switch ( MouseEvent.which ) {
					case 1:
						TJSApi.Debug().MessageMonitor().Text( 'Mouse (Button):Left > (Callback):Click-Left / Click-All' );
						jQuery( Event.Click.Left ).each(function( Index, Callback ){ Callback(); });
						jQuery( Event.Click.All ).each(function( Index, Callback ){ Callback(); });
						break;
					case 2:
						TJSApi.Debug().MessageMonitor().Text( 'Mouse (Button):Middle > (Callback):Click-Middle / Click-All' );
						jQuery( Event.Click.Middle ).each(function( Index, Callback ){ Callback(); });
						jQuery( Event.Click.All ).each(function( Index, Callback ){ Callback(); });
						break;
					case 3:
						TJSApi.Debug().MessageMonitor().Text( 'Mouse (Button):Right > (Callback):Click-Right / Click-All' );
						jQuery( Event.Click.Right ).each(function( Index, Callback ){ Callback(); });
						jQuery( Event.Click.All ).each(function( Index, Callback ){ Callback(); });
						break;
					default:
						TJSApi.Debug().MessageMonitor().Text( 'Mouse (Button): Not supported' );
						// Ignore unsupported Mouse-Button
				}
			}
			// Execute
			switch ( MouseEvent.which ) {
				case 1:
					TJSApi.Debug().MessageMonitor().Text( 'Mouse (Button):Left > (Callback):Release-Left / Release-All' );
					jQuery( Event.Release.Left ).each(function( Index, Callback ){ Callback(); });
					jQuery( Event.Release.All ).each(function( Index, Callback ){ Callback(); });
					break;
				case 2:
					TJSApi.Debug().MessageMonitor().Text( 'Mouse (Button):Middle > (Callback):Release-Middle / Release-All' );
					jQuery( Event.Release.Middle ).each(function( Index, Callback ){ Callback(); });
					jQuery( Event.Release.All ).each(function( Index, Callback ){ Callback(); });
					break;
				case 3:
					TJSApi.Debug().MessageMonitor().Text( 'Mouse (Button):Right > (Callback):Release-Right / Release-All' );
					jQuery( Event.Release.Right ).each(function( Index, Callback ){ Callback(); });
					jQuery( Event.Release.All ).each(function( Index, Callback ){ Callback(); });
					break;
				default:
					TJSApi.Debug().MessageMonitor().Text( 'Mouse (Button): Not supported' );
					// Ignore unsupported Mouse-Button
			}
			// Post
			MousePressedToggle = false;
			MouseMovedToggle = false;
			return false;
		});

		Display.on( 'mousemove', function( MouseEvent ) {
			// Debug
			TJSApi.Debug().MessageMonitor().Text( 'Mouse (Event): Move' );
			// Pre
			MouseEvent.preventDefault();
			( !MouseMovedToggle ? MouseMovedToggle = 1 : MouseMovedToggle++ );
			// Calculate Mouse
			CalculateMouse( MouseEvent );
			// Calculate Objects
			CalculateObjects();
			// Run
			switch ( MouseEvent.which ) {
				case 1:
					TJSApi.Debug().MessageMonitor().Text( 'Mouse (Button):Left > (Callback):Move-Left / Move-All' );
					jQuery( Event.Move.Left ).each(function( Index, Callback ){ Callback(); });
					jQuery( Event.Move.All ).each(function( Index, Callback ){ Callback(); });
					break;
				case 2:
					TJSApi.Debug().MessageMonitor().Text( 'Mouse (Button):Middle > (Callback):Move-Middle / Move-All' );
					jQuery( Event.Move.Middle ).each(function( Index, Callback ){ Callback(); });
					jQuery( Event.Move.All ).each(function( Index, Callback ){ Callback(); });
					break;
				case 3:
					TJSApi.Debug().MessageMonitor().Text( 'Mouse (Button):Right > (Callback):Move-Right / Move-All' );
					jQuery( Event.Move.Right ).each(function( Index, Callback ){ Callback(); });
					jQuery( Event.Move.All ).each(function( Index, Callback ){ Callback(); });
					break;
				default:
					// TJSApi.Debug.MessageMonitor.Text( 'Mouse (Button): Not supported' );
					// Ignore unsupported Mouse-Button
			}
			// Post
			return false;
		});

		Display.on( 'mousewheel', function( MouseEvent ) {
			// Debug
			TJSApi.Debug().MessageMonitor().Text( 'Mouse (Event): Wheel' );
			// Pre
			var Delta = MouseEvent.originalEvent;
			Delta = Delta.wheelDelta > 0 || Delta.detail < 0 ? 1 : -1;
			MouseEvent.preventDefault();
			// Calculate Mouse
			CalculateMouse( MouseEvent );
			// Calculate Objects
			CalculateObjects();
			// Run
			if ( Delta > 0 ) {
				TJSApi.Debug().MessageMonitor().Text( 'Mouse (Wheel):Up > (Callback):Wheel-Up / Wheel-All' );
				Event.Wheel.Up();
				Event.Wheel.All();
			} else {
				TJSApi.Debug().MessageMonitor().Text( 'Mouse (Wheel):Down > (Callback):Wheel-Down / Wheel-All' );
				Event.Wheel.Down();
				Event.Wheel.All();
			}
			// Post
			return false;
		});

		return {
			MousePosition2D: Position2D,
			MousePosition3D: Position3D,
			MousePositionOn: PositionOn,
			MousePointer: function() {
				return {
					Origin: function() { return { X: Pointer().ray.origin.x, Y: Pointer().ray.origin.y, Z: Pointer().ray.origin.z } },
					Direction: function() { return { X: Pointer().ray.direction.x, Y: Pointer().ray.direction.y, Z: Pointer().ray.direction.z } }
				}
			},
			MouseEvent: MouseEvent,

			Direction: function() {
				return {
					Horizontal: GetMouseDirectionX,
					Vertical: GetMouseDirectionY
				}
			},

			Event: function() {
				return {
					Press: function() {
						return {
							All: RegisterEventPressAll,
							Left: RegisterEventPressLeft,
							Middle: RegisterEventPressMiddle,
							Right: RegisterEventPressRight
						}
					},
					Release: function() {
						return {
							All: RegisterEventReleaseAll,
							Left: RegisterEventReleaseLeft,
							Middle: RegisterEventReleaseMiddle,
							Right: RegisterEventReleaseRight
						}
					},
					Click: function() {
						return {
							All: RegisterEventClickAll,
							Left: RegisterEventClickLeft,
							Middle: RegisterEventClickMiddle,
							Right: RegisterEventClickRight
						}
					},
					Move: function() {
						return {
							All: RegisterEventMoveAll,
							Left: RegisterEventMoveLeft,
							Middle: RegisterEventMoveMiddle,
							Right: RegisterEventMoveRight
						}
					},
					Wheel: function() {
						return {
							All: RegisterEventWheelAll,
							Up: RegisterEventWheelUp,
							Down: RegisterEventWheelDown
						}
					}
				}
			},
			Target: function() {
				return {
					Object: function() { return PointerObject(); }
				}
			}

		}
	}
})();

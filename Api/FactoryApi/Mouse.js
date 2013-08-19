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
	TJSApi.FactoryAPI.Mouse = function( APIObjectRenderer, APIObjectCamera, APIObjectScene ) {

		var Projector = new THREE.Projector();

		var MousePointer;
		var Pointer = function() { return MousePointer; };

		var MousePosition2D;
		var Position2D = function() { return { X: MousePosition2D.x, Y: MousePosition2D.y } };

		var MousePosition3D;
		var Position3D = function() { return { X: MousePosition3D.x, Y: MousePosition3D.y, Z: MousePosition3D.z } };

		var ClickedObjectList = [];
		var ClickedObjects = function() { return ClickedObjectList; };
		var ClickedObject = function() { return ClickedObjectList[0]; };

		var Event = {
			Click: {
				All: function(){},
				Left: function(){},
				Middle: function(){},
				Right: function(){}
			},
			Move: {
				All: function(){},
				Left: function(){},
				Middle: function(){},
				Right: function(){}
			},
			Wheel: {
				All: function(){},
				Up: function(){},
				Down: function(){}
			}
		};

		var MouseBrowserEvent = null;
		var MouseEvent = function() {
			return MouseBrowserEvent;
		};

		var CalculateMouse = function( Event ) {
			// Save Event for Api
			MouseBrowserEvent = Event;
			// Calculate Position 2D
			MousePosition2D = new THREE.Vector3(
				( Event.offsetX / APIObjectRenderer.Width() ) *2 -1,
				- ( Event.offsetY / APIObjectRenderer.Height() ) *2 +1,
				0.5
			);
			// Calculate Position 3D
			MousePosition3D = MousePosition2D.clone();
			Projector.unprojectVector( MousePosition3D, APIObjectCamera.TJSObject );
			// Calculate Direction Ray 3D
			var RayPosition3D = MousePosition3D.clone();
			MousePointer = new THREE.Raycaster( APIObjectCamera.TJSObject.position, RayPosition3D.sub( APIObjectCamera.TJSObject.position ).normalize() );
		};

		var CalculateObjects = function() {
			// Find Clicked Objects (API)
			var TJSObjectList = MousePointer.intersectObjects( APIObjectScene.Clickable.TJSObjects() );
			var APIObjectList = APIObjectScene.Clickable.APIObjects();
			ClickedObjectList = [];
			jQuery( TJSObjectList ).each( function( IndexTJS, ObjectTJS ) {
				var ObjectAPI = APIObjectList[ObjectTJS.object.id];
				if( typeof ObjectAPI != 'undefined' && jQuery.inArray( ObjectAPI, ClickedObjectList ) == -1 ) {
					ClickedObjectList.push( ObjectAPI );
				}
			});
		};

		var RegisterEventClickAll = function( Callback ) { Event.Click.All = Callback; };
		var RegisterEventClickLeft = function( Callback ) { Event.Click.Left = Callback; };
		var RegisterEventClickMiddle = function( Callback ) { Event.Click.Middle = Callback; };
		var RegisterEventClickRight = function( Callback ) { Event.Click.Right = Callback; };

		var RegisterEventMoveAll = function( Callback ) { Event.Move.All = Callback; };
		var RegisterEventMoveLeft = function( Callback ) { Event.Move.Left = Callback; };
		var RegisterEventMoveMiddle = function( Callback ) { Event.Move.Middle = Callback; };
		var RegisterEventMoveRight = function( Callback ) { Event.Move.Right = Callback; };

		var RegisterEventWheelAll = function( Callback ) { Event.Wheel.All = Callback; };
		var RegisterEventWheelUp = function( Callback ) { Event.Wheel.Up = Callback; };
		var RegisterEventWheelDown = function( Callback ) { Event.Wheel.Down = Callback; };

		var MousePressedToogle = false;
		var MousePressed = function() {
			return MousePressedToogle;
		};
		var MouseMovedToogle = false;
		var MouseMoved = function() {
			return MouseMovedToogle;
		};

		// Init
		var Display = jQuery( jQuery( APIObjectRenderer.Display() ) );

		Display.on( 'contextmenu', function( MouseEvent ) {
			// Pre
			MouseEvent.preventDefault();
			MousePressedToogle = true;
			// Calculate Mouse
			CalculateMouse( MouseEvent );
			// Calculate Objects
			CalculateObjects();
			// Run

			// Post
			MousePressedToogle = false;
			return false;
		});

		Display.on( 'mousedown', function( MouseEvent ) {

			// Pre

			MouseEvent.preventDefault();
			MousePressedToogle = true;
			MouseMovedToogle = false;
			// Calculate Mouse
			CalculateMouse( MouseEvent );
			// Calculate Objects
			CalculateObjects();

			// Run

			// Execute
			switch ( MouseEvent.which ) {
				case 1:
					Event.Click.Left(); Event.Click.All();
					break;
				case 2:
					Event.Click.Middle(); Event.Click.All();
					break;
				case 3:
					Event.Click.Right(); Event.Click.All();
					break;
				default:
					// Ignore unsupported Mouse-Button
			}

			// Post

			return false;
		});

		Display.on( 'mouseup', function( MouseEvent ) {
			// Pre

			MouseEvent.preventDefault();
			// Calculate Mouse
			CalculateMouse( MouseEvent );
			// Calculate Objects
			CalculateObjects();

			// Run

			// Post

			MousePressedToogle = false;
			MouseMovedToogle = false;
			return false;
		});

		Display.on( 'mousemove', function( MouseEvent ) {

			// Pre

			MouseEvent.preventDefault();
			MouseMovedToogle = true;
			// Calculate Mouse
			CalculateMouse( MouseEvent );
			// Calculate Objects
			CalculateObjects();

			// Run

			switch ( MouseEvent.which ) {
				case 1:
					Event.Move.Left(); Event.Move.All();
					break;
				case 2:
					Event.Move.Middle(); Event.Move.All();
					break;
				case 3:
					Event.Move.Right(); Event.Move.All();
					break;
				default:
					// Ignore unsupported Mouse-Button
			}

			// Post
			return false;
		});

		Display.on( 'mousewheel', function( MouseEvent ) {

			var Delta = MouseEvent.originalEvent;
		    Delta = Delta.wheelDelta>0||Delta.detail<0?1:-1;


			console.log( 'Mouse: Wheel', Delta );
			// Pre

			MouseEvent.preventDefault();
			// Calculate Mouse
			CalculateMouse( MouseEvent );
			// Calculate Objects
			CalculateObjects();

			// Run

			if ( Delta > 0 ) {
				Event.Wheel.Up(); Event.Wheel.All();
			} else {
				Event.Wheel.Down(); Event.Wheel.All();
			}

			// Post
			return false;
		});

		return {
			MousePosition2D: Position2D,
			MousePosition3D: Position3D,
			MousePointer: Pointer,
			MouseEvent: MouseEvent,

			Event: function() {
				return {
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
					},
					ClickedObject: ClickedObject,
					ClickedObjects: ClickedObjects
				}
			}

		}
	}
})();

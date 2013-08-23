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
 * Object
 * 16.08.2013 15:08
 */

(function(){
	TJSApi.FactoryAPI.Mesh.Basic = function( TJSObject ) {

		var TJSId = function() {
			return TJSObject.id;
		};

		var Position = function() {
			return {
				X: PositionX(),
				Y: PositionY(),
				Z: PositionZ()
			}
		};

		var PositionX = function( Value ) {
			if( typeof Value == 'undefined' ) {
				return TJSObject.position.x;
			} else {
				TJSObject.__dirtyPosition = true;
				TJSObject.position.x = Value;
				return this;
			}
		};
		var PositionY = function( Value ) {
			if( typeof Value == 'undefined' ) {
				return TJSObject.position.y;
			} else {
				TJSObject.__dirtyPosition = true;
				TJSObject.position.y = Value;
				return this;
			}
		};
		var PositionZ = function( Value ) {
			if( typeof Value == 'undefined' ) {
				return TJSObject.position.z;
			} else {
				TJSObject.__dirtyPosition = true;
				TJSObject.position.z = Value;
				return this;
			}
		};

		var RotationX = function( Value ) {
			if( typeof Value == 'undefined' ) {
				return TJSObject.rotation.x;
			} else {
				TJSObject.rotation.x = Value;
				return this;
			}
		};
		var RotationY = function( Value ) {
			if( typeof Value == 'undefined' ) {
				return TJSObject.rotation.y;
			} else {
				TJSObject.rotation.y = Value;
				return this;
			}
		};
		var RotationZ = function( Value ) {
			if( typeof Value == 'undefined' ) {
				return TJSObject.rotation.z;
			} else {
				TJSObject.rotation.z = Value;
				return this;
			}
		};

		var ToggleEventClick = false;
		var ToggleClickEvent = function( Boolean ) {
			if( typeof Boolean == 'undefined' ) {
				//noinspection JSConstructorReturnsPrimitive
				return ToggleEventClick;
			} else {
				ToggleEventClick = Boolean;
				return this;
			}
		};
		var ToggleEventCollide = false;
		var ToggleCollisionEvent = function( Boolean ) {
			if( typeof Boolean == 'undefined' ) {
				//noinspection JSConstructorReturnsPrimitive
				return ToggleEventCollide;
			} else {
				ToggleEventCollide = Boolean;
				return this;
			}
		};

		return {
			TJSObject: TJSObject,
			TJSId: TJSId,

			Position: Position,
			PositionX: PositionX,
			PositionY: PositionY,
			PositionZ: PositionZ,

			RotationX: RotationX,
			RotationY: RotationY,
			RotationZ: RotationZ,

			MouseClickable: ToggleClickEvent,

			Event: function() {
				return {
					Click: ToggleClickEvent,
					Collision: ToggleCollisionEvent
				}
			}
		}
	}
})();

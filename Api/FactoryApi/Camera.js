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
 * Camera
 * 15.08.2013 14:01
 */

(function(){
	TJSApi.FactoryAPI.Camera = function( TJSObject ) {

		// Orthographic

		var Left = function( Value ) {
			if( typeof Value == 'undefined' ) {
				return TJSObject.left;
			} else {
				TJSObject.left = Value;
				TJSObject.updateProjectionMatrix();
				return this;
			}
		};
		var Right = function( Value ) {
			if( typeof Value == 'undefined' ) {
				return TJSObject.right;
			} else {
				TJSObject.right = Value;
				TJSObject.updateProjectionMatrix();
				return this;
			}
		};
		var Top = function( Value ) {
			if( typeof Value == 'undefined' ) {
				return TJSObject.top;
			} else {
				TJSObject.top = Value;
				TJSObject.updateProjectionMatrix();
				return this;
			}
		};
		var Bottom = function( Value ) {
			if( typeof Value == 'undefined' ) {
				return TJSObject.bottom;
			} else {
				TJSObject.bottom = Value;
				TJSObject.updateProjectionMatrix();
				return this;
			}
		};

		// Perspective

		var FieldOfView = function( Value ) {
			if( typeof Value == 'undefined' ) {
				return TJSObject.fov;
			} else {
				TJSObject.fov = Value;
				TJSObject.updateProjectionMatrix();
				return this;
			}
		};
		var AspectRatio = function( Value ) {
			if( typeof Value == 'undefined' ) {
				return TJSObject.aspect;
			} else {
				TJSObject.aspect = Value;
				TJSObject.updateProjectionMatrix();
				return this;
			}
		};
		var NearClippingDistance = function( Value ) {
			if( typeof Value == 'undefined' ) {
				return TJSObject.near;
			} else {
				TJSObject.near = Value;
				TJSObject.updateProjectionMatrix();
				return this;
			}
		};
		var FarClippingDistance = function( Value ) {
			if( typeof Value == 'undefined' ) {
				return TJSObject.far;
			} else {
				TJSObject.far = Value;
				TJSObject.updateProjectionMatrix();
				return this;
			}
		};

		// Common
		var Position = function() {
			return {
				X: TJSObject.position.x,
				Y: TJSObject.position.y,
				Z: TJSObject.position.z
			}
		};

		var PositionX = function( Value ) {
			if( typeof Value == 'undefined' ) {
				return TJSObject.position.x;
			} else {
				TJSObject.position.x = Value;
				return this;
			}
		};
		var PositionY = function( Value ) {
			if( typeof Value == 'undefined' ) {
				return TJSObject.position.y;
			} else {
				TJSObject.position.y = Value;
				return this;
			}
		};
		var PositionZ = function( Value ) {
			if( typeof Value == 'undefined' ) {
				return TJSObject.position.z;
			} else {
				TJSObject.position.z = Value;
				return this;
			}
		};

		var LookAtTarget = {
			Position: function() {
				return { X: 0, Y: 0, Z: 0 };
			}
		};
		var LookAt = function( APIObject ) {
			if( typeof APIObject == 'undefined' ) {
				if( APIObject instanceof THREE.Vector3 ) {
					return { TJSObject: { position: LookAtTarget } };
				} else {
					return LookAtTarget;
				}
			} else {
				LookAtTarget = APIObject;
				// Allow Vector3 as APIObject to calculate camera movement
				if( APIObject instanceof THREE.Vector3 ) {
					TJSObject.lookAt( APIObject );
				} else {
					TJSObject.lookAt( APIObject.TJSObject.position );
				}
				TJSObject.updateProjectionMatrix();
				return this;
			}
		};

		var CameraController = function( DeltaPhi, DeltaTheta, DeltaRadius ){

			DeltaPhi = ( typeof DeltaPhi == 'undefined' || DeltaPhi == null ? 0 : DeltaPhi );
			DeltaTheta = ( typeof DeltaTheta == 'undefined' || DeltaPhi == null ? 0 : DeltaTheta );
			DeltaRadius = ( typeof DeltaRadius == 'undefined' || DeltaPhi == null ? 0 : DeltaRadius );

			var Object = LookAt();
			var ObjectPosition = Object.Position();
			var Offset = Position();

			// angle from z-axis around y-axis
			var Theta = Math.atan2( Offset.X, Offset.Z );
			// angle from y-axis
			var Phi = Math.atan2( Math.sqrt( Math.pow( Offset.X, 2 ) + Math.pow( Offset.Z, 2 ) ), Offset.Y );

			// Change ANGLE
			Theta += DeltaTheta;
			Phi += DeltaPhi;

			var PhiMin = 0; // radians
			var PhiMax = Math.PI / 2; // radians

			var RadiusMin = 1;
			var RadiusMax = Infinity;

			var EPS = 0.000001;

			// restrict phi to be between desired limits
			Phi = Math.max( PhiMin, Math.min( PhiMax, Phi ) );
			// restrict phi to be between EPS and PI-EPS
			Phi = Math.max( EPS, Math.min( Math.PI - EPS, Phi ) );

			// Length
			var Radius = Math.sqrt( Math.pow( Offset.X, 2 ) + Math.pow( Offset.Y, 2 ) + Math.pow( Offset.Z, 2 ) );

			// Change RADIUS
			Radius += DeltaRadius;
			Radius = Math.max( RadiusMin, Math.min( RadiusMax, Radius ) );

			// Calculate new position
			var Calculation = {
				X: Radius * Math.sin( Phi ) * Math.sin( Theta ),
				Y: Radius * Math.cos( Phi ),
				Z: Radius * Math.sin( Phi ) * Math.cos( Theta )
			};

			// Update Camera to new position/rotation
			Calculation = TJSApi.Math.Vector.Subtraction( Calculation, Position() );



			var NewPosition = TJSApi.Math.Vector.Addition( ObjectPosition, Calculation );

			PositionX( NewPosition.X );
			PositionY( NewPosition.Y );
			PositionZ( NewPosition.Z );

			LookAt( Object );

		};

		var Controller = function( DeltaPhi, DeltaTheta, DeltaRadius ) {
			CameraController( DeltaPhi, DeltaTheta, DeltaRadius )
		};

		if( TJSObject instanceof THREE.PerspectiveCamera ) {
			return {
				TJSObject: TJSObject,

				FieldOfView: FieldOfView,
				AspectRatio: AspectRatio,
				NearClippingDistance: NearClippingDistance,
				FarClippingDistance: FarClippingDistance,

				Position: Position,
				PositionX: PositionX,
				PositionY: PositionY,
				PositionZ: PositionZ,

				LookAt: LookAt,

				Controller: Controller
			}
		} else if( TJSObject instanceof THREE.OrthographicCamera ) {
			return {
				TJSObject: TJSObject,

				Left: Left,
				Right: Right,
				Top: Top,
				Bottom: Bottom,

				NearClippingDistance: NearClippingDistance,
				FarClippingDistance: FarClippingDistance,

				Position: Position,
				PositionX: PositionX,
				PositionY: PositionY,
				PositionZ: PositionZ,

				LookAt: LookAt,

				Controller: Controller
			}
		} else {
			return {
				TJSObject: TJSObject,

				Position: Position,
				PositionX: PositionX,
				PositionY: PositionY,
				PositionZ: PositionZ,

				LookAt: LookAt,

				Controller: Controller
			}
		}
	}
})();

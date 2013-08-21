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
 * CameraOrbit
 * 21.08.2013 10:24
 */

(function(){
	TJSApi.FactoryAPI.Controller.Camera.Orbit = function( APICamera ) {

		var Camera = APICamera;

		var Speed = {
			Zoom: 1.0,
			Rotate: 7.0,
			Pan: 2.0
		};

		var Limit = {
			Zoom: {
				Min: 0.1,
				Max: 8000
			},
			Rotate: {
				Min: 0.00001,
				Max: Math.PI / 2
			}
		};

		var RotateScale = function() {
			return 2 * Math.PI / 60 / 60 * Speed.Rotate;
		};
		var ZoomScale = function() {
			return Math.pow( 0.95, Speed.Zoom );
		};

	// Left / Right
		var ThetaDelta = 0;
		var RotateLeft = function( Angle ) {
			if( typeof Angle == 'undefined' ) Angle = RotateScale();
			ThetaDelta -= Angle;
			Update();
		};
		var RotateRight = function( Angle ) {
			if( typeof Angle == 'undefined' ) Angle = RotateScale();
			ThetaDelta += Angle;
			Update();
		};

	// Up / Down
		var PhiDelta = 0;
		var RotateUp = function( Angle ) {
			if( typeof Angle == 'undefined' ) Angle = RotateScale();
			PhiDelta -= Angle;
			Update();
		};
		var RotateDown = function( Angle ) {
			if( typeof Angle == 'undefined' ) Angle = RotateScale();
			PhiDelta += Angle;
			Update();
		};

	// In / Out
		var ZoomDelta = 1;
		var ZoomIn = function( Scale ) {
			if( typeof Scale == 'undefined' ) Scale = ZoomScale();
			ZoomDelta *= Scale;
			Update();
		};
		var ZoomOut = function( Angle ) {
			if( typeof Angle == 'undefined' ) Angle = ZoomScale();
			ZoomDelta /= Angle;
			Update();
		};

		var Update = function() {
			var CameraPosition = Camera.Position();
			var ObjectPosition = Camera.LookAt().Position();
			var OffsetPosition = TJSApi.Math.Vector.Subtraction( CameraPosition, ObjectPosition );

		// Left / Right
			var Theta = Math.atan2( OffsetPosition.X, OffsetPosition.Z );
			Theta += ThetaDelta;

		// Up / Down
			var Phi = Math.atan2( Math.sqrt( OffsetPosition.X * OffsetPosition.X + OffsetPosition.Z * OffsetPosition.Z ), OffsetPosition.Y );
			Phi += PhiDelta;
			Phi = Math.max( Limit.Rotate.Min, Math.min( Limit.Rotate.Max, Phi ) );

		// Zoom
			var Radius = TJSApi.Math.Vector.Length( OffsetPosition ) * ZoomDelta;
			Radius = Math.max( Limit.Zoom.Min, Math.min( Limit.Zoom.Max, Radius ) );

			OffsetPosition.X = Radius * Math.sin( Phi ) * Math.sin( Theta );
			OffsetPosition.Y = Radius * Math.cos( Phi );
			OffsetPosition.Z = Radius * Math.sin( Phi ) * Math.cos( Theta );

			CameraPosition = TJSApi.Math.Vector.Addition( ObjectPosition, OffsetPosition );
			Camera.PositionX( CameraPosition.X );
			Camera.PositionY( CameraPosition.Y );
			Camera.PositionZ( CameraPosition.Z );

			Camera.LookAt( Camera.LookAt() );

			PhiDelta = 0;
			ThetaDelta = 0;
			ZoomDelta = 1;
		};

		return {
			Rotate: function(){
				return {
					Up: function( Angle ) { RotateUp( Angle ) },
					Down: function( Angle ) { RotateDown( Angle ) },
					Left: function( Angle ) { RotateLeft( Angle ) },
					Right: function( Angle ) { RotateRight( Angle ) }
				}
			},
			Zoom: function() {
				return {
					In: function( Scale ) { ZoomIn( Scale ) },
					Out: function( Scale ) { ZoomOut( Scale ) }
				}
			},
			Update: function() {
				Update();
			}
		}
	}
})();

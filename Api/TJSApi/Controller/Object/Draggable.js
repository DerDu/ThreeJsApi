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
 * Draggable
 * 22.08.2013 14:22
 */

(function(){
	TJSApi.FactoryAPI.Controller.Object.Draggable = function( APICamera, APIMouse ) {

		var Draggable = null;

		var MouseDown = function() {
			Draggable = APIMouse.Target().Object();
		};
		var MouseMove = function() {
			if( Draggable != null ) {

				var Direction = APIMouse.MousePointer().Direction();
				var Origin = APIMouse.MousePointer().Origin();

				var Position = TJSApi.Math.Vector.MultiplyScalar( Direction, APICamera.LookAtDistance() );
				Position = TJSApi.Math.Vector.Addition( Position, Origin );

				if( AllowedAxis.X ) Draggable.PositionX( Position.X );
				if( AllowedAxis.Y )Draggable.PositionY( Position.Y );
				if( AllowedAxis.Z )Draggable.PositionZ( Position.Z );
			}
		};
		var MouseUp = function() {
			Draggable = null;
		};


		var AllowedAxis = {
			X: true,
			Y: false,
			Z: true
		};

		return {
			EventMousePressed: MouseDown,
			EventMouseMoved: MouseMove,
			EventMouseReleased: MouseUp,

			AllowedAxes: function() {
				return {
					ToggleX: function( Boolean ) { AllowedAxis.X = Boolean },
					ToggleY: function( Boolean ) { AllowedAxis.Y = Boolean },
					ToggleZ: function( Boolean ) { AllowedAxis.Z = Boolean }
				}
			}
		}
	}
})();

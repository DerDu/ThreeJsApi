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
	TJSApi.Object.Camera = function( TJSObject ) {

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

		if( TJSObject instanceof THREE.PerspectiveCamera ) {
			return {
				TJSObject: TJSObject,

				FieldOfView: FieldOfView,
				AspectRatio: AspectRatio,
				NearClippingDistance: NearClippingDistance,
				FarClippingDistance: FarClippingDistance,

				PositionX: PositionX,
				PositionY: PositionY,
				PositionZ: PositionZ
			}
		} else {
			return {
				TJSObject: TJSObject,

				PositionX: PositionX,
				PositionY: PositionY,
				PositionZ: PositionZ
			}
		}
	}
})();

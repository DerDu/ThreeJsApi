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
 * Perspective
 * 13.08.2013 13:24
 */

(function(){

	ThreeJsApi.CameraPerspective = (function(){

		var Fov = 75;
		var Aspect = ThreeJsApi.Renderer.getWidth() / ThreeJsApi.Renderer.getHeight();
		var Near = 1;
		var Far = 10000;

		var setFov = function( Value ) {
			Fov = Value;
			getTJSObject().fov = Value;
			return this;
		};
		var getFov = function() {
			return Fov;
		};

		var setAspect = function( Value ) {
			Aspect = Value;
			getTJSObject().aspect = Value;
			return this;
		};
		var getAspect = function() {
			return Aspect;
		};

		var setNear = function( Value ) {
			Near = Value;
			getTJSObject().near = Value;
			return this;
		};
		var getNear = function() {
			return Near;
		};

		var setFar = function( Value ) {
			Far = Value;
			getTJSObject().far = Value;
			return this;
		};
		var getFar = function() {
			return Far;
		};

		var Position = {
			X: 0,
			Y: 0,
			Z: 0
		};
		var setPosition = function( X, Y, Z ) {
			setPositionX( X );
			setPositionX( Y );
			setPositionX( Z );
			return this;
		};
		var setPositionX = function( Value ) {
			Position.X = Value;
			getTJSObject().position.x = Value;
			return this;
		};
		var setPositionY = function( Value ) {
			Position.Y = Value;
			getTJSObject().position.y = Value;
			return this;
		};
		var setPositionZ = function( Value ) {
			Position.Z = Value;
			getTJSObject().position.z = Value;
			return this;
		};

		var TJSObject = null;
		var setTJSObject = function( Object ){
			TJSObject = Object;
			return this;
		};
		var getTJSObject = function(){
			if( TJSObject == null ) {
				setTJSObject( new THREE.PerspectiveCamera( getFov(), getAspect(), getNear(), getFar() ) );
				setPositionZ()
			}
			return TJSObject;
		};

		return {
			getTJSObject: getTJSObject,

			setFov: setFov,
			getFov: getFov,

			setAspect: setAspect,
			getAspect: getAspect,

			setNear: setNear,
			getNear: getNear,

			setFar: setFar,
			getFar: getFar,

			setPosition: setPosition,
			setPositionX: setPositionX,
			setPositionY: setPositionY,
			setPositionZ: setPositionZ
		};

	})();

	// Init
	ThreeJsApi.Camera.Perspective().getTJSObject();

})();

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
 * Orthographic
 * 15.08.2013 10:56
 */

(function(){
	ThreeJsApi.addFactory( 'CameraOrthographic', function(){

		var TJSObject = new THREE.OrthographicCamera();
		var getTJSObject = function(){ return TJSObject; };

		var Left = 45;
		var getLeft = function() { return Left; };
		var setLeft = function( Value ) {
			Left = Value;
			getTJSObject().left = Value;
			return this;
		};
		var Right = 45;
		var getRight = function() { return Right; };
		var setRight = function( Value ) {
			Right = Value;
			getTJSObject().right = Value;
			return this;
		};
		var Top = 45;
		var getTop = function() { return Top; };
		var setTop = function( Value ) {
			Top = Value;
			getTJSObject().top = Value;
			return this;
		};
		var Bottom = 45;
		var getBottom = function() { return Bottom; };
		var setBottom = function( Value ) {
			Bottom = Value;
			getTJSObject().bottom = Value;
			return this;
		};

		var Near = 1;
		var getNear = function() { return Near; };
		var setNear = function( Value ) {
			Near = Value;
			getTJSObject().near = Value;
			return this;
		};

		var Far = 10000;
		var getFar = function() { return Far; };
		var setFar = function( Value ) {
			Far = Value;
			getTJSObject().far = Value;
			return this;
		};

		var Position = { X: 0, Y: 0, Z: 0 };
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

		// Init
		setLeft( Left );
		setRight( Right );
		setTop( Top );
		setBottom( Bottom );
		setNear( Near );
		setFar( Far );
		setPositionZ( 1000 );

		return {
			getTJSObject: getTJSObject,

			setLeft: setLeft,
			getLeft: getLeft,

			setRight: setRight,
			getRight: getRight,

			setTop: setTop,
			getTop: getTop,

			setBottom: setBottom,
			getBottom: getBottom,

			setNear: setNear,
			getNear: getNear,

			setFar: setFar,
			getFar: getFar,

			setPosition: setPosition,
			setPositionX: setPositionX,
			setPositionY: setPositionY,
			setPositionZ: setPositionZ
		};

	});

})();
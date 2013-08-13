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
 * Cube
 * 13.08.2013 14:58
 */

(function(){

	ThreeJsApi.GeometryCube = (function(){

		var Width = 200;
		var setWidth = function( Value ) {
			Width = Value;
			return this;
		};
		var getWidth = function() {
			return Width;
		};

		var Height = 200;
		var setHeight = function( Value ) {
			Height = Value;
			return this;
		};
		var getHeight = function() {
			return Height;
		};

		var Depth = 200;
		var setDepth = function( Value ) {
			Depth = Value;
			return this;
		};
		var getDepth = function() {
			return Depth;
		};


		var TJSObject = null;
		var setTJSObject = function( Object ){
			TJSObject = Object;
			return this;
		};
		var getTJSObject = function(){
			return TJSObject;
		};
		var createGeometry = function() {
			setTJSObject( new THREE.CubeGeometry( getWidth(), getHeight(), getDepth() ) );
			return this;
		};

		return {
			getTJSObject: getTJSObject,
			createGeometry: createGeometry,

			setWidth: setWidth,
			getWidth: getWidth,

			setHeight: setHeight,
			getHeight: getHeight,

			setDepth: setDepth,
			getDepth: getDepth
		}

	})();

	// Init
	ThreeJsApi.Geometry.Cube().getTJSObject();

})();

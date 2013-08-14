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
 * 14.08.2013 09:21
 */

(function(){
	ThreeJsApi.addFactory('GeometryCube', function(){

		var TJSObject = null;
		var getTJSObject = function(){
			if( TJSObject == null ) {
				TJSObject = new THREE.CubeGeometry( getWidth(), getHeight(), getDepth(), getPolygonCount(),getPolygonCount() ,getPolygonCount() );
			}
			return TJSObject;
		};

		var Width = 100;
		var getWidth = function() { return Width; };
		var setWidth = function( Value ) {
			Width = Value;
			return this;
		};

		var Height = 100;
		var getHeight = function() { return Height; };
		var setHeight = function( Value ) {
			Height = Value;
			return this;
		};

		var Depth = 100;
		var getDepth = function() { return Depth; };
		var setDepth = function( Value ) {
			Depth = Value;
			return this;
		};

		var PolygonCount = 3;
		var getPolygonCount = function() { return PolygonCount; };
		var setPolygonCount = function( Value ) {
			PolygonCount = Value;
			return this;
		};

		return {
			getTJSObject: getTJSObject,

			setWidth: setWidth,
			getWidth: getWidth,

			setHeight: setHeight,
			getHeight: getHeight,

			setDepth: setDepth,
			getDepth: getDepth,

			setPolygonCount: setPolygonCount,
			getPolygonCount: getPolygonCount
		}

	});
})();

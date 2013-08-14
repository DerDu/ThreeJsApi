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
 * Lambert
 * 14.08.2013 13:22
 */

(function(){
	ThreeJsApi.addFactory('MaterialMeshLambert', function(){

		var TJSObject = null;
		var getTJSObject = function(){
			if( TJSObject == null ) {
				// Canvas-Renderer doesn't support MeshLambertMaterial in combination with Textures
				if( window.WebGLRenderingContext ) {
					TJSObject = new THREE.MeshLambertMaterial( {
						color: getColor(), wireframe: getWireFrame(), map:getTexture().getTJSObject(), transparent: getTransparent()
					} )
				} else {
					TJSObject = new THREE.MeshBasicMaterial( {
						color: getColor(), wireframe: getWireFrame(), map:getTexture().getTJSObject(), transparent: getTransparent()
					} )
				}
			}
			return TJSObject;
		};

		var Color = '#FFFFFF';
		var getColor = function() { return Color; };
		var setColor = function( Value ) {
			Color = Value;
			return this;
		};

		var WireFrame = false;
		var getWireFrame = function() { return WireFrame; };
		var setWireFrame = function( Value ) {
			WireFrame = Value;
			return this;
		};

		var Texture;
		var getTexture = function() { return Texture; };
		var setTexture = function( Value ) {
			Texture = Value;
			return this;
		};

		var Transparent = false;
		var getTransparent = function() { return Transparent; };
		var setTransparent = function( Value ) {
			Transparent = Value;
			return this;
		};


		return {
			getTJSObject: getTJSObject,

			setColor: setColor,
			getColor: getColor,
			setWireFrame: setWireFrame,
			getWireFrame: getWireFrame,
			setTexture: setTexture,
			getTexture: getTexture,
			setTransparent: setTransparent,
			getTransparent: getTransparent
		}

	});
})();

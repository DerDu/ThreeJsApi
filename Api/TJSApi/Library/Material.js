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
 * Material
 * 16.08.2013 15:07
 */

(function(){
	TJSApi.FactoryAPI.Material.Mesh = function( TJSObject ) {

		// Common
		var Color = function( Value ) {
			if( typeof Value == 'undefined' ) {
				return TJSObject.color.get();
			} else {
				TJSObject.color.set( Value );
				return this;
			}
		};

		var WireFrame = function( Value ) {
			if( typeof Value == 'undefined' ) {
				return TJSObject.wireframe;
			} else {
				TJSObject.wireframe = Boolean;
				return this;
			}
		};

		var Transparent = function( Value ) {
			if( typeof Value == 'undefined' ) {
				return TJSObject.transparent;
			} else {
				TJSObject.transparent = Boolean;
				return this;
			}
		};

		var Texture = function( APIObject ) {
			if( typeof APIObject == 'undefined' ) {
				return TJSObject.texture;
			} else {
				TJSObject.texture = APIObject.TJSObject;
				return this;
			}
		};

		if( TJSObject instanceof THREE.MeshBasicMaterial ) {
			return {
				TJSObject: TJSObject,

				Color: Color,
				WireFrame: WireFrame
			}
		} else if( TJSObject instanceof THREE.MeshLambertMaterial ) {

			// Canvas-Renderer doesn't support MeshLambertMaterial in combination with Textures

			return {
				TJSObject: TJSObject,

				Color: Color,
				WireFrame: WireFrame,

				Texture: {
					UseTexture: Texture,
					Transparent: Transparent
				}
			}
		} else {
			return {
				TJSObject: TJSObject,

				Color: Color,
				WireFrame: WireFrame
			}
		}
	}
})();

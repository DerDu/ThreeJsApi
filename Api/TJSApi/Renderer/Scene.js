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
 * Scene
 * 15.08.2013 14:01
 */

(function(){
	TJSApi.FactoryAPI.Scene = function( TJSObject ) {

		var SceneObjectList = [];

		var AddObject = function( APIObject ) {
			// Add Object to List
			SceneObjectList[APIObject.TJSObject.id] = APIObject;
			// Add Object to Scene
			TJSObject.add( APIObject.TJSObject );
		};
		var GetObject = function( Id ) {
			return SceneObjectList[Id];
		};
		var AddFog = function( APIObject ) {
			// Add Fog to Scene
			TJSObject.fog = APIObject.TJSObject;
		};

		// compatible interface dummy
		var Position = function() {
			return { X: 0, Y: 0, Z: 0 }
		};

		var Gravity = function( X, Y, Z ) {
			if( typeof TJSObject.setGravity == 'function' ) {
				TJSObject.setGravity( new THREE.Vector3( X, Y, Z ) );
			}
		};

		return {
			TJSObject: TJSObject,

			Add: AddObject,
			Get: GetObject,

			Fog: AddFog,
			// Physics
			Gravity: Gravity,

			// compatible interface dummy
			Position: Position,

			Clickable: {
				APIObjects: function() { return MouseClickableAPI; },
				TJSObjects: function() { return MouseClickableTJS; }
			}
		}
	}
})();

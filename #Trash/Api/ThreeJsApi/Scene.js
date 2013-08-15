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
 * 14.08.2013 09:16
 */

(function(){
	ThreeJsApi.addFactory('Scene', function(){

		var TJSObject = new THREE.Scene();
		var getTJSObject = function(){ return TJSObject; };

		var ObjectList = [];
		var addObject = function( Object ) {
			if( typeof Object.addMaterial != 'undefined' ) {
				Object.setRendererType( getRendererType() );
			}
			ObjectList[ObjectList.length] = Object;
			getTJSObject().add( Object.getTJSObject() );
			return this;
		};
		var getObject = function( Index ) {
			return ObjectList[Index];
		};

		var SceneFog;
		var getFog = function() { return SceneFog; };
		var setFog = function( Value ) {
			SceneFog = Value;
			getTJSObject().fog = SceneFog.getTJSObject();
			return this;
		};

		var Fog = function(){
			return ThreeJsApi.getFactory()['SceneFog']();
		};

		var RendererType;
		var getRendererType = function() { return RendererType; };
		var setRendererType = function( Value ) {
			RendererType = Value;
			return this;
		};

		return {
			getTJSObject: getTJSObject,

			addObject: addObject,
			getObject: getObject,

			setFog: setFog,
			getFog: getFog,

			setRendererType: setRendererType,
			getRendererType: getRendererType,

			Fog: Fog
		}

	});
})();
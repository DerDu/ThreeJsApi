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
 * MultiMaterial
 * 14.08.2013 16:27
 */

(function(){
	ThreeJsApi.addFactory('MeshMultiMaterial', function(){

		var TJSObject = null;
		var getTJSObject = function(){
			if( TJSObject == null ) {
				TJSObject = new THREE.Object3D();
				for( var Index in Material ) {
					if( Material.hasOwnProperty( Index ) ) {
						//noinspection JSUnresolvedVariable
						if( getRendererType() == 'WebGL' ) {
							TJSObject.add( new THREE.Mesh( Geometry.getTJSObject(), Material[(Material.length -1) - Index].getTJSObject() ) );
						} else {
							TJSObject.add( new THREE.Mesh( Geometry.getTJSObject(), Material[Index].getTJSObject() ) );
						}
						TJSObject.dynamic = true;
					}
				}
			}
			return TJSObject;
		};

		var Geometry = null;
		var getGeometry = function(){ return Geometry; };
		var setGeometry = function( Value ){
			Geometry = Value;
			return this;
		};

		var Material = [];
		var getMaterial = function(){ return Material; };
		var addMaterial = function( Value ) {
			Material[Material.length] = Value;
			return this;
		};

		var RendererType;
		var getRendererType = function() { return RendererType; };
		var setRendererType = function( Value ) {
			RendererType = Value;
			return this;
		};

		return {
			getTJSObject: getTJSObject,

			setGeometry: setGeometry,
			getGeometry: getGeometry,

			addMaterial: addMaterial,
			getMaterial: getMaterial,

			setRendererType: setRendererType,
			getRendererType: getRendererType
		}

	});
})();

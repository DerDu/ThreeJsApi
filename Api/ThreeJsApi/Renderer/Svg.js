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
 * Svg
 * 14.08.2013 16:54
 */

(function(){
	ThreeJsApi.addFactory('RendererSvg', function(){

		var TJSObject = new THREE.SVGRenderer();
		var getTJSObject = function(){ return TJSObject; };

		var Width = 640;
		var getWidth = function(){ return Width; };
		var setWidth = function( Pixel ){
			Width = Pixel;
			getTJSObject().setSize( Pixel, getHeight() );
			return this;
		};

		var Height = 480;
		var getHeight = function(){ return Height; };
		var setHeight = function( Pixel ){
			Height = Pixel;
			getTJSObject().setSize( getWidth(), Pixel );
			return this;
		};

		var BackgroundColor = '#00000';
		var getBackgroundColor = function(){ return BackgroundColor; };
		var setBackgroundColor = function( Value ){
			BackgroundColor = Value;
			getTJSObject().setClearColor( Value );
			return this;
		};

		// Init
		setWidth( Width );
		setHeight( Height );
		setBackgroundColor( BackgroundColor );

		return {
			getTJSObject: getTJSObject,

			setWidth: setWidth,
			getWidth: getWidth,

			setHeight: setHeight,
			getHeight: getHeight,

			setBackgroundColor: setBackgroundColor,
			getBackgroundColor: getBackgroundColor
		}

	});
})();

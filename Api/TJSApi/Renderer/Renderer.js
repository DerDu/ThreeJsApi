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
 * Renderer
 * 15.08.2013 14:00
 */

(function(){
	TJSApi.FactoryAPI.Renderer = function( TJSObject ) {

		var RendererWidth = 640;
		var Width = function( Value ) {
			if( typeof Value == 'undefined' ) {
				//noinspection JSConstructorReturnsPrimitive
				return RendererWidth;
			} else {
				RendererWidth = Value;
				TJSObject.setSize( RendererWidth, RendererHeight );
				return this;
			}
		};

		var RendererHeight = 480;
		var Height = function( Value ) {
			if( typeof Value == 'undefined' ) {
				//noinspection JSConstructorReturnsPrimitive
				return RendererHeight;
			} else {
				RendererHeight = Value;
				TJSObject.setSize( RendererWidth, RendererHeight );
				return this;
			}
		};

		var RendererClearColor = 480;
		var ClearColor = function( Value ) {
			if( typeof Value == 'undefined' ) {
				//noinspection JSConstructorReturnsPrimitive
				return RendererClearColor;
			} else {
				RendererClearColor = Value;
				TJSObject.setClearColor( RendererClearColor );
				return this;
			}
		};

		var RenderDisplay = 'body';
		var Display = function( Selector ) {
			if( typeof Selector == 'undefined' ) {
				//noinspection JSConstructorReturnsPrimitive
				return RenderDisplay;
			} else {
				RenderDisplay = Selector;
				var Screen = jQuery( RenderDisplay );
				Screen.append( TJSObject.domElement );
				Width( Screen.width() );
				Height( Screen.height() );
				return this;
			}
		};

		// Init
//		Width( RendererWidth );
//		Height( RendererHeight );
//		Display( RenderDisplay );

		return {
			TJSObject: TJSObject,

			ClearColor: ClearColor,

			Width: Width,
			Height: Height,
			Display: Display
		}
	};
})();

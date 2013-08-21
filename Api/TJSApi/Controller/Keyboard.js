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
 * Keyboard
 * 21.08.2013 19:27
 */


(function(){
	TJSApi.FactoryAPI.Controller.Keyboard = function( APIRenderer, APIMouse ) {

		var Event = {
			Down: {
				All: function(){}
			},
			Up: {
				All: function(){}
			}
		};

		var Code = {

			27: 'Escape',

			112: 'F1', 113: 'F2', 114: 'F3', 115: 'F4', 116: 'F5', 117: 'F6', 118: 'F7', 119: 'F8', 120: 'F9', 121: 'F10', 122: 'F11', 123: 'F12',

			// Number
			49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9', 48: '0', 8: 'Backspace',

			// Char
			9: 'Tab', 81: 'q', 87: 'w', 69: 'e', 82: 'r', 84: 't', 90: 'z', 85: 'u', 73: 'i', 79: 'o', 80: 'p',
						65: 'a', 83: 's', 68: 'd', 70: 'f', 71: 'g', 72: 'h', 74: 'j', 75: 'k', 76: 'l',        13: 'Enter',
			16: 'Shift',  89: 'y', 88: 'x', 67: 'c', 86: 'v', 66: 'b', 78: 'n', 77: 'm',

			17: 'Ctrl',     18: 'Alt',      32: 'Space',

			// Win / Command Keys
			91: 'CommandLeft', 92: 'CommandRight',

			// NumBlock
			107: 'Num:+', 109: 'Num:-',

			103: 'Num:7', 104: 'Num:8', 105: 'Num:9',
			100: 'Num:4', 101: 'Num:5', 102: 'Num:6',
			97:  'Num:1', 98:  'Num:2', 99:  'Num:3',
			96:  'Num:0',

			// Page Up/Down
			33: 'PgUp', 34: 'PgDn',

			// Left/Right/Up/Down
			37: 'Left', 39: 'Right', 38: 'Up', 40: 'Down'
		};

		var FlipObject = function( obj ) {
		  var new_obj = {};
		  for (var prop in obj) {
		    if(obj.hasOwnProperty(prop)) {
		      new_obj[obj[prop]] = prop;
		    }
		  }
		  return new_obj;
		};

		var Char = FlipObject( Code );

		var RegisterEventDown = function( Callback, KeyCode ) {
			if( typeof KeyCode != 'undefined' ) {
				if( typeof KeyCode != 'integer' ) {
					KeyCode = Char[KeyCode];
				}
				Event.Down[KeyCode] = Callback;
			} else {
				Event.Down.All = Callback;
			}
		};

		var RegisterEventUp = function( Callback, KeyCode ) {
			if( typeof KeyCode != 'undefined' ) {
				if( typeof KeyCode != 'integer' ) {
					KeyCode = Char[KeyCode];
				}
				Event.Up[KeyCode] = Callback;
			} else {
				Event.Up.All = Callback;
			}
		};

		// Init
		var Handler = jQuery( document );
		var Display = jQuery( APIRenderer.Display() );

		// Only if Mouse not available or inside Renderer Display?
		var HandlerIsValid = function() {
			if( typeof APIMouse == 'undefined' ) {
				//noinspection JSConstructorReturnsPrimitive
				return true;
			} else {
				return APIMouse.MousePositionOn();
			}
		};

		Handler.on( 'keydown', function( KeyEvent ) {
			TJSApi.Debug.MessageMonitor.Text( 'Keyboard (Event): Down [' + Code[KeyEvent.which] + '] Code ' + KeyEvent.which );

			if( !HandlerIsValid() ) {
				TJSApi.Debug.MessageMonitor.Text( 'Keyboard (Skipped): Down [' + Code[KeyEvent.which] + ']' );
				return true;
			}

			TJSApi.Debug.MessageMonitor.Text( 'Keyboard (Valid): Down [' + Code[KeyEvent.which] + ']' );

			KeyEvent.preventDefault();

			if( typeof Event.Down[KeyEvent.which] != 'undefined' ) {
				Event.Down[KeyEvent.which]();
			}

			Event.Down.All();
			return false;
		});

		Handler.on( 'keyup', function( KeyEvent ) {
			TJSApi.Debug.MessageMonitor.Text( 'Keyboard (Event): Up [' + Code[KeyEvent.which] + '] Code ' + KeyEvent.which );

			if( !HandlerIsValid() ) {
				TJSApi.Debug.MessageMonitor.Text( 'Keyboard (Skipped): Up [' + Code[KeyEvent.which] + ']' );
				return true;
			}

			TJSApi.Debug.MessageMonitor.Text( 'Keyboard (Valid): Up [' + Code[KeyEvent.which] + ']' );

			KeyEvent.preventDefault();

			if( typeof Event.Up[KeyEvent.which] != 'undefined' ) {
				Event.Up[KeyEvent.which]();
			}

			Event.Up.All();
			return false;
		});

		var CharToCode = function( Char ) {
			return Code[Char];
		};
		var CodeToChar = function( Code ) {
			return Char[Code];
		};

		return {
			Event: function() {
				return {
					Down: function() {
						return {
							Key: RegisterEventDown
						}
					},
					Up: function() {
						return {
							Key: RegisterEventUp
						}
					}
				}
			},
			Convert: function() {
				return {
					CharToCode: CharToCode,
					CodeToChar: CodeToChar
				}
			}
		}
	}
})();

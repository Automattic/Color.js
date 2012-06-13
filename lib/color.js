(function(exports) {

	var Color = function( color, type ) {
		this._init( color, type );
		return this;
	};

	Color.prototype = {
		_color: 0,

		_init: function( color, type ) {
			if ( ! color ) {
				return this;
			}
			type = type || 'hex';
			switch ( type ) {
				case 'hex':
					return this.fromHex( color );
				case 'rgb':
					return this.fromRgb( color[0], color[1], color[2] );
				case 'hsl':
					return this.fromHsl( color[0], color[1], color[2] );
				case 'int':
					return this.fromInt( color );
			}
			return this;
		},

		fromRgb: function( r, g, b ) {
			this._color = parseInt( ( ( r << 16 ) + ( g << 8 ) + b ), 10 );
			return this;
		},

		fromHex: function( color ) {
			color = color.replace(/^#/, '');
			if ( color.length === 3 ) {
				color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
			}
			this._color = parseInt( color, 16 );
			return this;
		},

		fromHsl: function( h, s, l ) {
			var r, g, b, q, p;
			h /= 360; s /= 100; l /= 100;
			if ( s === 0 ) {
				r = g = b = l; // achromatic
			}
			else {
				q = l < 0.5 ? l * ( 1 + s ) : l + s - l * s;
				p = 2 * l - q;
				r = this.hue2rgb( p, q, h + 1/3 );
				g = this.hue2rgb( p, q, h );
				b = this.hue2rgb( p, q, h - 1/3 );
			}
			return this.fromRgb( r * 255, g * 255, b * 255 );
		},

		fromInt: function( int ) {
			this._color = parseInt( int, 10 );
			return this;
		},

		hue2rgb: function( p, q, t ) {
			if ( t < 0 ) {
				t += 1;
			}
			if ( t > 1 ) {
				t -= 1;
			}
			if ( t < 1/6 ) {
				return p + ( q - p ) * 6 * t;
			}
			if ( t < 1/2 ) {
				return q;
			}
			if ( t < 2/3 ) {
				return p + ( q - p ) * ( 2/3 - t ) * 6;
			}
			return p;
		},

		toString: function() {
			var hex = parseInt( this._color, 10 ).toString( 16 );
			// maybe left pad it
			if ( hex.length < 6 ) {
				for (var i = 6 - hex.length - 1; i >= 0; i--) {
					hex = '0' + hex;
				}
			}
			return '#' + hex;
		},

		toCSS: function( type, alpha ) {
			type = type || 'hex';
			alpha = parseFloat( alpha || 1 );
			switch ( type ) {
				case 'rgb':
				case 'rgba':
					var rgb = this.toRgb();
					if ( alpha < 1 ) {
						return "rgba( " + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ", " + alpha + " )";
					}
					else {
						return "rgb( " + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + " )";
					}
					break;
				case 'hsl':
				case 'hsla':
					var hsl = this.toHsl();
					if ( alpha < 1 ) {
						return "hsla( " + hsl[0] + ", " + hsl[1] + ", " + hsl[2] + ", " + alpha + " )";
					}
					else {
						return "hsl( " + hsl[0] + ", " + hsl[1] + ", " + hsl[2] + " )";
					}
					break;
				default:
					return this.toString();
			}
		},

		toRgb: function() {
			return [
				255 & ( this._color >> 16 ),
				255 & ( this._color >> 8 ),
				255 & ( this._color )
			];
		},

		toHsl: function() {
			var rgb = this.toRgb();
			var r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
			var max = Math.max( r, g, b ), min = Math.min( r, g, b );
			var h, s, l = ( max + min ) / 2;

			if ( max === min ) {
				h = s = 0; // achromatic
			}
			else {
				var d = max - min;
				s = l > 0.5 ? d / ( 2 - max - min ) : d / ( max + min );
				switch ( max ) {
					case r: h = ( g - b ) / d + ( g < b ? 6 : 0 );
						break;
					case g: h = ( b - r ) / d + 2;
						break;
					case b: h = ( r - g ) / d + 4;
						break;
				}
				h /= 6;
			}

			return [
				Math.round( h * 360 ),
				Math.round( s * 100 ),
				Math.round( l * 100 )
			];
		},

		toInt: function() {
			return this._color;
		},

		toLuminosity: function() {
			var rgb = this.toRgb();
			return 0.2126 * Math.pow( rgb[0] / 255, 2.2 ) + 0.7152 * Math.pow( rgb[1] / 255, 2.2 ) + 0.0722 * Math.pow( rgb[2] / 255, 2.2);
		},

		getDistanceLuminosityFrom: function( color ) {
			if ( ! ( color instanceof Color ) ) {
				throw 'getDistanceLuminosityFrom requires a Color object';
			}
			var lum1 = this.toLuminosity();
			var lum2 = color.toLuminosity();
			if ( lum1 > lum2 ) {
				return ( lum1 + 0.05 ) / ( lum2 + 0.05 );
			}
			else {
				return ( lum2 + 0.05 ) / ( lum1 + 0.05 );
			}
		},

		getMaxContrastColor: function() {
			var lum = this.toLuminosity();
			var hex = ( lum >= 0.5 ) ? '000000' : 'ffffff';
			return new Color( hex );
		},

		getGrayscaleContrastingColor: function( contrast ) {
			if ( ! contrast ) {
				return this.getMaxContrastColor();
			}

			// don't allow less than 5
			var target_contrast = ( contrast < 5 ) ? 5 : contrast;
			var color = this.getMaxContrastColor();
			contrast = color.getDistanceLuminosityFrom( this );

			// if current max contrast is less than the target contrast, we had wishful thinking.
			if ( contrast <= target_contrast ) {
				return color;
			}

			var incr = ( '#000000' === color.toString() ) ? 1 : -1;

			while ( contrast > target_contrast ) {
				color = color.incrementLightness( incr );
				contrast = color.getDistanceLuminosityFrom( this );
			}

			return color;
		},

		// TRANSFORMS

		darken: function( amount ) {
			amount = amount || 5;
			return this.incrementLightness( - amount );
		},

		lighten: function( amount ) {
			amount = amount || 5;
			return this.incrementLightness( amount );
		},

		incrementLightness: function( amount ) {
			var hsl = this.toHsl();
			hsl[2] += amount;

			if ( hsl[2] < 0 ) {
				hsl[2] = 0;
			}
			if ( hsl[2] > 100 ) {
				hsl[2] = 100;
			}

			return this.fromHsl( hsl[0], hsl[1], hsl[2] );
		},

		saturate: function( amount ) {
			amount = amount || 15;
			return this.incrementSaturation( amount );
		},

		desaturate: function( amount ) {
			amount = amount || 15;
			return this.incrementSaturation( - amount );
		},

		incrementSaturation: function( amount ) {
			var hsl = this.toHsl();
			hsl[0] += amount;

			if ( hsl[0] < 0 ) {
				hsl[0] = 0;
			}
			if ( hsl[0] > 100 ) {
				hsl[0] = 100;
			}

			return this.fromHsl( hsl[0], hsl[1], hsl[2] );
		},

		toGrayscale: function() {
			var hsl = this.toHsl();
			hsl[1] = 0;
			return this.fromHsl( hsl[0], hsl[1], hsl[2] );
		},

		getComplement: function() {
			return this.incrementHue( 180 );
		},

		getSplitComplement: function( step ) {
			step = step || 1;
			var incr = 180 + ( step * 30 );
			return this.incrementHue( incr );
		},

		getAnalog: function( step ) {
			step = step || 1;
			var incr = step * 30;
			return this.incrementHue( incr );
		},

		getTetrad: function( step ) {
			step = step || 1;
			var incr = step * 60;
			return this.incrementHue( incr );
		},

		getTriad: function( step ) {
			step = step || 1;
			var incr = step * 120;
			return this.incrementHue( incr );
		},

		incrementHue: function( amount ) {
			var hsl = this.toHsl();
			hsl[0] = ( hsl[0] + amount ) % 360;
			return this.fromHsl( hsl[0], hsl[1], hsl[2] );
		}

	};
	exports.Color = Color;

}(typeof exports === 'object' && exports || this));

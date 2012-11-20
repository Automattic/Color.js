module.exports = {
	setUp: function (callback) {
		Color = require( '../src/color.js' ).Color;
		callback();
	},
	tearDown: function (callback) {
		// clean up
		callback();
	},
	fromHex: function( test ) {
		var hexPairs = {
			'000000': 0,
			'a0a0a0': 10526880,
			'ffffff': 16777215,
			'FFFFFF': 16777215,
			'#FFFFFF': 16777215,
			'0xffffff': 16777215
		};

		for ( var hex in hexPairs ) {
			test.equals( hexPairs[hex], Color( hex ).toInt() );
		}

		test.done();
	},
	fromCssErrors: function( test ) {
		var badParseStrings = [
			'hsl',
			'hsv',
			'rgb',
			'hslv',
			'hsl(',
			'hsv(',
			'rgb(',
			'hsl()',
			'hsv()',
			'rgb()',
			'hsl(a)',
			'hsl(10,a)',
			'hsl(a,10)',
			'hsl(10,10)',
			'hsl(10,10,)',
			'hsl(10,10,a)',
			'hsl(10,a,10)',
			'hsl(a,10,10)',
			'hsla(10,10,10,a)',
			'hsl(10,10,10'
		];

		badParseStrings.forEach(function(string){
			var color = new Color(string);
			test.equals( color.error, true, string + ' should produce an error' );
		});

		test.done();
	},

	fromCssParse: function( test ) {
		var goodParseStrings = [
			'rgb(255,0,127)',
			'rgb(255,0,127);',
			'hsl(350,10%,10%)',
			'hsl(350,10,10)',
			'hsv(120,10,10)'
		];

		goodParseStrings.forEach(function(string){
			test.equals( Color(string).error, false, string + ' should not produce an error' );
		});

		test.done();
	},

	fromRgb: function( test ) {
		var rgbPairs = {
			0: [ 0, 0, 0 ],
			1: [ 0, 0, 1 ],
			255: [ 0, 0, 255 ],
			256: [ 0, 1, 0 ],
			65280: [ 0, 255, 0 ],
			65536: [ 1, 0, 0 ],
			16711680: [ 255, 0, 0 ],
			16711681: [ 255, 0, 1 ],
			16711937: [ 255, 1, 1 ],
			16777215: [ 255, 255, 255 ]
		};
		var rgb, desc;

		for ( var int in rgbPairs ) {
			rgb = rgbPairs[int];
			rgb = { r: rgb[0], g: rgb[1], b: rgb[2] };
			desc = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';

			test.equals( int, Color( rgb ).toInt(), "from object: " + desc );
			test.equals( int, Color( desc ).toInt(), "from string: " + desc );
		}

		test.done();
	},
	fromInt: function( test ) {
		var color = new Color();
		var intPairs = {
			'0': 0,
			'10': 10,
			'16777215': 16777215
		}

		for ( var int in intPairs ) {
			test.equals( color.fromInt( int ).toInt(), intPairs[int] );
		}

		test.done();
	}
};
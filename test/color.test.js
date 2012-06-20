
Array.prototype.compareArrays = function(arr) {
	if (this.length != arr.length) return false;
	for (var i = 0; i < arr.length; i++) {
		if (this[i].compareArrays) { //likely nested array
			if (!this[i].compareArrays(arr[i])) return false;
			else continue;
		}
		if (this[i] != arr[i]) return false;
	}
	return true;
}

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
		var color = new Color();
		var hexPairs = {
			'000000': 0,
			'a0a0a0': 10526880,
			'ffffff': 16777215,
			'FFFFFF': 16777215,
			'#FFFFFF': 16777215,
			'0xffffff': 16777215
		};

		for ( var hex in hexPairs ) {
			test.equals( hexPairs[hex], color.fromHex(hex).toInt() );
		}
		test.done();
	},
	fromRgb: function( test ) {
		var color = new Color();
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
			desc = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
			test.equals( int, color.fromRgb( rgb[0], rgb[1], rgb[2] ).toInt(), desc );
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
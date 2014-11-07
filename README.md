Color.js
========

A utility class for working with colors in JavaScript. It supports easy object creation, manipulation, and conversion between color formats.

**Documentation incomplete, more to come**

## Usage

Basic Example:

```javascript
// Make a Color object
var myColor = Color( '#bada55' );
// Output HSL CSS
myColor.toCSS( 'hsl' );
// "hsl( 74, 64%, 59% )"
```
### Construction Methods

All construction methods can be called explicitly, but `Color` will usually intelligently know the value you're passing it.

#### fromHex( hex )
`hex`: an RRGGBB hexadecimal color, with or without a leading hash (#).
```javascript
var hex = '#bada55';
var myColor = Color().fromHex( hex );
// or, just:
var myColorShorthand = Color( hex );
```

#### fromRgb( rgb )
`rgb`: an object containing `r`, `g`, and `b` integer properties. `r`, `g`, and `b` must be integers within the range `[0, 256]`.

```javascript
var rgb = {
	r: 0,
	g: 127,
	b: 256
};
var myRgbColor = Color().fromRgb( rgb );
var myRgbShorthand = Color( rgb );
```

#### fromHsl( hsl )
`hsl`: an object containing `h`, 's', and `l` integer properties. `h` should be in the range `[0,360]`[^h] and `s` and `l` must be in the range `[0,100]`.

```javascript
var hsl = {
	h: 210,
	s: 80,
	l: 23
};
var myHslColor = Color().fromHsl( hsl );
var myHslShorthand = Color( hsl );
```

[^h]: As hue is measured in circular degrees, anything out of range will simply be plotted as a mode of 360.

#### fromHsv( hsv )
`hsv`: an object containing `h`, 's', and `v` integer properties. `h` should be in the range `[0,360]`[^h] and `s` and `v` must be in the range `[0,100]`.

```javascript
var hsv = {
	h: 21,
	s: 33,
	v: 80
};
var myHsvColor = Color().fromHsv( hsv );
var myHsvShorthand = Color( hsv );
```

#### fromCSS( css )
`css`: (string) Any valid CSS color
```javascript
var css =  'rgb( 0, 127, 256 )';
var color1 = Color().fromCSS( css );
var color1Shorthand = Color( css );
var color2 = Color( 'hsla( 210, 80%, 23%, 0.4 )' );
var color3 = Color( '#bada55' );
```

Each will be parsed and passed to the appropriate `from*` methods.

### Output methods

#### toString

```javascript
var c = Color( 'rgb(12, 34, 145)' );
c.toString();
// "#0c2291"
```

Note that there is no `toHex` method, as this is essentially it.

#### toRgb

```javascript
var c = Color( 'rgb(12, 34, 145)' );
c.toRgb();
// { r: 12, g: 34, b: 145 }
```

#### toHsl

```javascript
var c = Color( 'rgb(12, 34, 145)' );
c.toHsl();
// { h: 230, s: 85, l: 31 }
```

Note that the `toHsl` method only outputs integers for its members, leading it to be not 100% faithful when performing conversions. This is a pragmatic decision made for the sake of elegance in the API - perfectionists can surely find other libraries. :)

#### toHsv

```javascript
var c = Color( 'rgb(12, 34, 145)' );
c.toHsv();
// { h: 230, s: 92, v: 57 }
```

#### toCSS( type, alpha )

```javascript
var c = Color( 'rgb(12, 34, 145)' );
c.toCSS();
// '#0c2291'
c.toCSS( 'rgb' );
// 'rgb( 12, 34, 145 )'
c.toCSS( 'rgba' );
```

### Manipulation methods



## Release Notes

### 0.9.11 (2013-08-09)

* top-level node.js exports compatibility.
* now using Grunt 0.4.x

### 0.9.10 (2012-12-10)

* remove redundant `getGrayscaleContrastingColor` method
* remove deprecated `incrementLightness` method


### 0.9.9 (2012-11-20)

* massively improved CSS string parsing
* use internal `._error` method for error cases

### 0.9.8 (2012-10-04)

* preserve hue/saturation in HSV flows
* allow construction from an HSV object

### 0.9.7 (2012-10-04)

* refactor `.h()`, `.s()`, and `.l()` methods for DRYness
* add `.a()` get/set method for alpha channel
* fix missing % signs in hsl CSS output
* add a `.clone()` method
* add HSV functionality

### 0.9.3 (2013-08-26)

* return blank string on error in `.toString()`
* improved error handling
* construct without `new` keyword

### 0.9.0 (2012-07-26)

* initial public release
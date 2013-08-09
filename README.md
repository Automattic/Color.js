Color.js
========

A utility class for working with colors in JavaScript.

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
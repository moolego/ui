Class: UI.Paint {#UI.Paint}
===========================

### Implements:

Events, Options

### Arguments:

1. options - (*object*)

### Options:

1. props - (*object*) All the stuff needed to draw the canvas (layers, shadows, ...). These properties are generated from a skin sheet.
2. className - (*string*) The class name set to the canvas element
3. width - (*integer*) Canvas width
4. height - (*integer*) Canvas height

### Returns:

* (*object*) A new Paint instance.

### Examples:

	this.paint = new UI.Paint({
		props: this.props,
		width: this.element.x + offsetWidth,
		height: this.element.y + offsetHeight,
		debug: this.options.debug,
		element: this.element,
		skin: this.options.skin,
		component: this.options.component,
		type: this.options.type,
		state: this.options.state
	});


### Implied global:
	MooLego - UI
	MooTools - $empty, Class, Element, Events, Options

### Members:

	Canvas, Engine, Implements, PI, abs, absSize, addColorStop, angle, arc, atan, beginPath, bezier, bezierCurveTo, build, canvas, canvasSize, circle, clearRect, closePath, color, composite, context, convert2Px, cos, createLinearGradient, createPattern, createRadialGradient, ctx, debug, default, direction, draw, drawShadows, drawShadowsCalled, drawShape, each, endCircle, fill, fillStyle, fireEvent, getContext,  getProperties, globalCompositeOperation, gradient, height, hexToRgb, image, initialize, inject, join, layers, left, length, line, lineTo, lineWidth, magnify, match, moveTo, offset, offsetX, offsetY, onComplete, onload, opacity, options, pattern, position, pow, props, quadraticCurveTo, radius, ratio, relSize, def, restore, rotate, rotation, roundedRect, save, scale, setColor, setImage, setOffset, setOptions, setProperties, setSize, setStyles, setTransformation, shadow, shadowMagnify, shadowOffset, shadowSet, shadowSize, shadowThickness, shape, sin, size, sqrt, src, startCircle, stop, stroke, styles, test, toInt, top, trace, translate, triangle, trident, type, url, width, zIndex


UI.Paint Method: build {#UI.Paint:build}
-----------------------------------------

Create a new canvas object and get the 2D context

### Syntax:

	this.build();


UI.Paint Method: setSize {#UI.Paint:setSize}
---------------------------------------------

Set size of the canvas object handling the shadow, then draw it.

### Syntax:

	this.setSize(width, height, props);

### Arguments:

1. width - (*integer*) Width of the canvas without shadow offsets
2. height - (*integer*) Width of the canvas without shadow offsets
3. props - (*object*) Skin properties. If not set, will get props passed on initialize

UI.Paint Method: draw {#UI.Paint:draw}
---------------------------------------


### Syntax:

	this.draw(props);

### Arguments:

1. props - (**)


UI.Paint Method: processLayers {#UI.Paint:processLayers}
---------------------------------------------------------

Draw layers defined in props

### Syntax:

	this.processLayers(props);
	
### Arguments:

1. props - (*object*) An object where each layers properties are defined
    
### Returns:

* (*void*)



UI.Paint Method: trace {#UI.Paint:trace}
-----------------------------------------

Draw the shape depending on the skin component props definition

### Syntax:

	this.trace(key);


### Arguments:

1. key - (*string*) key


UI.Paint Method: convert2Px {#UI.Paint:convert2Px}
--------------------------------------------------

Draw the shape depending on the skin component props definition

### Syntax:

	this.convert2Px(value[0], 'y', true);

### Arguments:

1. value - (*string/integer/float*) value
2. direction - (*string*) Direction. Could be either 'x' or 'y'
3. absolute - (*boolean*) Determine if the position is relative to previous element or absolute (relative to canvas)
   
### Return:

* (*float*) The value converted in pixel



UI.Paint Method: setOffset {#UI.Paint:setOffset}
------------------------------------------------

Determine the start point's coordinates as width and height for a shape

### Syntax:

	this.setOffset(coordinates, position, size);

### Arguments:

1. value - (*array*) Array with three entries to determine offset
2. position - (*string*) Determine if the position is relative to previous element or absolute (relative to the canvas)
3. size - (*array*) Array containing layer's width and height. Could be either a number or 'auto' to determine it from its offset

### Returns:

offset - (*array*) An array with x and y start point coordinates, as well as width and height



UI.Paint Method: getProperties {#UI.Paint:getProperties}
---------------------------------------------------------

Set all values to draw the canvas and prepare arrays for radius, offsets, size, ...

### Syntax:



### Arguments:

1. key - (*string*) Layer name

### Returns:

* properties - (*object*) An object to be drawn

UI.Paint Method: setColor {#UI.Paint:setColor}
-----------------------------------------------

Set the fill color, handling direction, gradient and opacity

### Syntax:

	this.setColor('fill|stroke',props);

### Arguments:

1. part - (*string*) Determine for which part the color is set. Could be 'fill' or 'stroke'.
2. props - (*object*) The layer properties.


UI.Paint Method: setTransformation {#UI.Paint:setTransformation}
-----------------------------------------------------------------

Apply transformations, like rotation, scale and composite mode.

### Syntax:

	this.setTransformation(props);

### Arguments:

1. props - (*object*) The layer properties.


UI.Paint Method: drawShape {#UI.Paint:drawShape}
-------------------------------------------------

Draw the stroke and fill the shape

### Syntax:

	this.drawShape();

### Arguments:

1. props - (*object*) The layer properties.


UI.Paint Method: setShadow {#UI.Paint:setShadow}
-------------------------------------------------

Set Shadow Options

### Syntax:

	this.setShadow({});

### Arguments:

1. props - (*object*) The shadow properties.


UI.Paint Method: setImage {#UI.Paint:setImage}
-----------------------------------------------

Draw an image on canvas handling patterns

### Syntax:


### Arguments:

1. props - (*object*) The layer properties.

### Note:

Experimental!

UI.Paint Method: roundedRect {#UI.Paint:roundedRect}
-----------------------------------------------------

Draw a rounded rectangle path

### Syntax:

	this.roundedRect({
		offset: 1,
		color: ['#494949', '#5f5f5f'],
		opacity: 1,
		radius: 4
	});


### Arguments:

1. props - (object) The layer properties.
     
### Example:



     
### Return:

     (void)

UI.Paint Method: circle {#UI.Paint:circle}
-------------------------------------------

Draw a circle or a circle part, determined width props.angle (array).

### Arguments:
1. props - (object) The layer properties.
    
### Example:
    
	layers: {
		circle: {
			shape: 'circle',
			position: 'absolute',
			size: [10, 10],
			opacity: 1,
			offset: 0
		}
	}


UI.Paint Method: line {#UI.Paint:line}
---------------------------------------

Draw a line

### Syntax:

1. props - (*object*) The layer properties.

### Arguments:

1. shape - (*string*) lineUp|lineDown
2. width - (*width*)
3. opacity - (*float*)
4. color - (*string*)
5. offset - (*float|array*)

### Example:
    
     layers: {
		line: {
			position: 'absolute',
			shape: 'lineUp',
			opacity: 1,
			width: 1,
			color: '#000'
		}
	}



UI.Paint Method: triangle {#UI.Paint:triangle}
-----------------------------------------------

Draw a triangle in a rectangle determine with props.size (array)

### Syntax:

	this.circle({
		shape: 'triangle',
		radius: [8, 8, 8, 8],
		position: 'abolute',
		offset: 13,
		color: '#fff'
	});

### Arguments:

1. props - (*object*) The layer properties.

UI.Paint Method: complex {#UI.Paint:complex}
---------------------------------------------

Draw complex shapes

### Syntax:

	this.complex({
		shape: 'complex',
		baseSize: [150, 150],
		def: [
			['moveTo', 75, 25],
			['quadraticCurveTo', 25, 25, 25, 62.5],
			['quadraticCurveTo', 25, 100, 50, 100],
			['quadraticCurveTo', 50, 120, 30, 125],
			['quadraticCurveTo', 60, 120, 65, 100],
			['quadraticCurveTo', 125, 100, 125, 62.5],
			['quadraticCurveTo', 125, 25, 75, 25]
		]
	});

### Arguments:

1. props - (*object*) Object that containing the layer properties.

### Examples:


### Notes:
	
This method is an experiment. Doesn't work properly! see complex.html in the labs.



UI.Paint Method: inject {#UI.Paint:inject}
-------------------------------------------

Inject canvas then return class instance

### Arguments:

1. target - (*element*) the target dom element
2. position - (*string*) the position were to inject

### Returns:

1. (*object*) This



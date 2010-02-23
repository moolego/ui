Class: UI.Paint {#UI.Paint}
===========================

### Implements:

Events, Options




UI.Paint Method: constructor {#UI.Paint:constructor}
-----------------------------------------------------


### Syntax:

	var myUI.Paint = new UI.Paint(options);

### Arguments:

1. options - (**)

### Options:

* props - (**)
* width - (**)
* height - (**)
* zIndex - (**)
* context - (**)
* debug - (**)

### Events:

* onComplete -


UI.Paint Method: build {#UI.Paint:build}
-----------------------------------------

Create a new canvas object and get the 2D context

### Syntax:




UI.Paint Method: setSize {#UI.Paint:setSize}
---------------------------------------------


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


### Syntax:



### Arguments:

1. key - (**)

### Returns:





UI.Paint Method: setColor {#UI.Paint:setColor}
-----------------------------------------------


### Syntax:



### Arguments:

1. part - (**)
2. props - (**)


UI.Paint Method: setTransformation {#UI.Paint:setTransformation}
-----------------------------------------------------------------


### Syntax:



### Arguments:

1. props - (**)


UI.Paint Method: drawShape {#UI.Paint:drawShape}
-------------------------------------------------


### Syntax:



### Arguments:

1. props - (**)


UI.Paint Method: setShadow {#UI.Paint:setShadow}
-------------------------------------------------


### Syntax:



### Arguments:

1. shadow - (**)


UI.Paint Method: setImage {#UI.Paint:setImage}
-----------------------------------------------


### Syntax:



### Arguments:

1. props - (**)


UI.Paint Method: roundedRect {#UI.Paint:roundedRect}
-----------------------------------------------------


### Syntax:



### Arguments:

1. props - (**)


UI.Paint Method: circle {#UI.Paint:circle}
-------------------------------------------


### Syntax:



### Arguments:

1. props - (**)


UI.Paint Method: line {#UI.Paint:line}
---------------------------------------


### Syntax:



### Arguments:

1. props - (**)


UI.Paint Method: triangle {#UI.Paint:triangle}
-----------------------------------------------


### Syntax:



### Arguments:

1. props - (**)


UI.Paint Method: complex {#UI.Paint:complex}
---------------------------------------------


### Syntax:



### Arguments:

1. props - (**)


UI.Paint Method: inject {#UI.Paint:inject}
-------------------------------------------


### Syntax:



### Arguments:

1. target - (**)
2. position - (**)

### Returns:





Class: UI.Element {#UI.Element}
===============================

UI.Element is the root class of most class of Moolego UI.

### Implements:

Events, Options

### Syntax:

	var element = new UI.Element({
		html : 'Hello World'
	}).inject(document.body);
	
### Arguments:

Options

### Options:

- lib - (*string*) The prefix used for element class
- component - (*string*) Component name, used for skinning
- type - (*string*) Type name, used for skinning
- state - (*string*) Default state applied on initialize
- className - (*string*) If this is defined, UI.Element will use this as element class name instead of generating one with options.lib, component and type
- tag - (*string*) The element tag. By default it is 'div'
- resizable - (*boolean*) Define if the element will be resizable. By default set to false
- draggable - (*boolean*) Define if the element will be draggable. By default set to false
- selectable - (*boolean*) Define if element content is selectable
- skin - (*string*) The skin name to use by default for components
- props - (*object*) Skin properties that will overwrite properties defined in skin sheet
- style - (*object*) Element styles properties that will overwrite styles defined in skin sheet


## Events:

- onClick - (*function*) A function who will be fired on element click
- onMouseDown - (*function*) A function who will be fired on element mousedown
- onBuild - (*function*) A function who will be fired on element build start
- onBuildComplete - (*function*) A function who will be fired on element build complete
- onResizeStart - (*function*) A function who will be fired on element resize start
- onResize - (*function*) A function who will be fired on element resize
- onResizeComplete - (*function*) A function who will be fired on element complete
- onDragStart - (*function*) A function who will be fired on element drag start
- onDrag - (*function*) A function who will be fired on element drag
- onDragComplete - (*function*) A function who will be fired on element drag complete

UI.Element Method: toElement {#UI.Element:toElement}
-----------------------------------------------------

This method allows to get the DOM element built with <UI.Element>

### Syntax:

	var myElement = new UI.Element({
		html : 'Hello World'
	}).inject(document.body);

	var coord = $(myElement).getCoordinates();

It will actually return myElement.element.

But as most used mootools functions are directly reimplemented in <UI.Element>, you can most of time simply do :
     
	var myElement = new UI.Element({
		html : 'Hello World'
	}).inject(document.body);
	var coord = myElement.getCoordinates();
     
### Return:

* (*element*) The DOM element

UI.Element Method: build {#UI.Element:build}
---------------------------------------------

Create a native element

### Syntax:

	this.build();

### Return:

	(*void*)

UI.Element Method: buildResizer {#UI.Element:buildResizer}
-----------------------------------------------------------

Create a new element as resize handler

### Syntax:

	this.buildResizer();


UI.Element Method: setClassName {#UI.Element:setClassName}
-----------------------------------------------------------

Define class name from this.options.lib, component and type or with className if defined

### Syntax:

	this.setClassName();


UI.Element Method: setSkin {#UI.Element:setSkin}
-------------------------------------------------

Get the skin for the current component and set this props with default properties

### Syntax:




UI.Element Method: setState {#UI.Element:setState}
---------------------------------------------------

Set the element state

### Syntax:

	this.setStat('default');

### Arguments:

Arguments:
1. state - (*string*) the name of new state to set and draw
2. size - (*object*) Optional - An object containing width and height to set a new size while changing state

### Returns:

this



UI.Element Method: setCanvas {#UI.Element:setCanvas}
-----------------------------------------------------

Create a canvas element inject it and add a redraw event

### Syntax:

	this.setCanvas();

### Returns:

void

UI.Element Method: setSize {#UI.Element:setSize}
-------------------------------------------------

Set the element size and optionaly a new state

### Syntax:

	this.setSize


### Arguments:

width - (*integer*) new element width
height - (*integer*) new element height
state - (*string*) (*optional*) state to draw
target - (**)

### Returns:

this




UI.Element Method: setLocation {#UI.Element:setLocation}
---------------------------------------------------------

Set the element location

### Syntax:

	var myWindow = new UI.Window();
	
	var coord = myWindow.getCenterLocation();
	
	myWindow.setLocation(coord.left, coord.top, 'morph');

### Arguments:

1. left - (*integer*) new element left position
2. top - (*integer*) new element top position
3. morph - (*string*) If specified, a morph transition will be done to new location

### Returns:
	
	this




UI.Element Method: setBehavior {#UI.Element:setBehavior}
---------------------------------------------------------

Set default element behavior, adding general events (mouse events)

### Return:

     (void)

### Note:

onClick event is fired on mouse up because of Explorer. Sometimes it doesn't fire onClick event (f.e. if a button has no label).




UI.Element Method: enableDrag {#UI.Element:enableDrag}
-------------------------------------------------------

Add draggable capabilities for the element.

### Syntax:

	this.enableDrag();

### Returns:

this



UI.Element Method: disableDrag {#UI.Element:disableDrag}
---------------------------------------------------------

Remove draggable capabilities for the element.

### Syntax:

	this.disableDrag();
	
### Returns:

this


UI.Element Method: enableResize {#UI.Element:enableResize}
-----------------------------------------------------------

Add resizable capabilities for the element.

### Syntax:

	this.enableResize()

### Returns:

this



UI.Element Method: getCenterLocation {#UI.Element:getCenterLocation}
---------------------------------------------------------------------

Get the coordinates to place the element at center's window

### Syntax:



### Returns:

* location - (*object*) An object containing top and left properties.



UI.Element Method: adaptLocation {#UI.Element:adaptLocation}
-------------------------------------------------------------

Adapt element location if it is dragged out of its boundaries

### Syntax:

	this.adaptLocation();


UI.Element Method: show {#UI.Element:show}
-------------------------------------------

Fire the onShow event, and set display block and full opacity to element

### Syntax:

	this.show();

### Returns:

this



UI.Element Method: hide {#UI.Element:hide}
-------------------------------------------

Fire the onHide Event, and set display none to element

### Syntax:

	this.hide();

### Returns:

this



UI.Element Method: setStyle {#UI.Element:setStyle}
---------------------------------------------------

Sets a CSS property to the Element.

### Syntax:

	this.setStyle(property,value);

### Arguments:

1. property - (*string*) The property to set.
2. value - (*mixed*) The value to which to set it. Numeric values of properties requiring a unit will automatically be appended with 'px'.

### Returns:

* (*instance*) This class.


### Example:

	this.setStyle('height', '480px');

### Note:
	Reimplementation of the setStyle Native Element method from mootools

UI.Element Method: setStyles {#UI.Element:setStyles}
-----------------------------------------------------

Applies a collection of styles to the Element.

### Syntax:

	this.setStyles(styles);

### Arguments:

1. styles - (*object*) An object of property/value pairs for all the styles to apply.

### Returns:

* (*instance*) This class.

### Example:

	this.setStyles({
    	border: '1px solid #fff',
    	width: 600,
    	height: 480
	});

### Note:

Reimplementation of the setStyle Native Element method from mootools. 
See mootools native method for more info.


UI.Element Method: getStyle {#UI.Element:getStyle}
---------------------------------------------------

Returns the style of the Element given the property passed in.

### Syntax:

	var style = this.getStyle(property);

### Arguments:

1. property - (*string*) The css style property you want to retrieve.

### Returns:

* (*string*) The style value.

### Examples:

	myComponent.getStyle('height'); // Returns "480px".
	myComponent.getStyle('height').toInt(); // Returns 480.

### Note:

Reimplementation of the getStyle Native Element method from mootools. 
See mootools native method for more info.


UI.Element Method: inject {#UI.Element:inject}
-----------------------------------------------

Injects, or inserts, the Component at a particular place relative to the Element's children (specified by the second the argument).

### Syntax:

	myComponent.inject(el[, where]);

### Arguments:

1. el - (*mixed*) el can be the id of an element or an element.
2. where - (*string, optional: defaults to 'bottom'*) The place to inject this Element. Can be 'top', 'bottom', 'after', or 'before'.

### Returns:

* (*instance*) This class.

### Note

Reimplementation of the inject Native Element method from mootools. 
See mootools native method for more info.




UI.Element Method: adopt {#UI.Element:adopt}
---------------------------------------------


### Syntax:



### Arguments:

1. element - (**)

### Returns:





UI.Element Method: addClass {#UI.Element:addClass}
---------------------------------------------------


### Syntax:



### Arguments:

1. className - (**)

### Returns:





UI.Element Method: set {#UI.Element:set}
-----------------------------------------


### Syntax:



### Arguments:

1. property - (**)
2. value - (**)

### Returns:





UI.Element Method: onMorph {#UI.Element:onMorph}
-------------------------------------------------


### Syntax:




UI.Element Method: get {#UI.Element:get}
-----------------------------------------


### Syntax:



### Arguments:

1. property - (**)

### Returns:





UI.Element Method: getSize {#UI.Element:getSize}
-------------------------------------------------


### Syntax:



### Returns:





UI.Element Method: morph {#UI.Element:morph}
---------------------------------------------


### Syntax:



### Arguments:

1. props - (**)

### Returns:





UI.Element Method: getComputedSize {#UI.Element:getComputedSize}
-----------------------------------------------------------------


### Syntax:



### Returns:





UI.Element Method: getCoordinates {#UI.Element:getCoordinates}
---------------------------------------------------------------


### Syntax:



### Arguments:

1. ref - (**)

### Returns:





UI.Element Method: destroy {#UI.Element:destroy}
-------------------------------------------------


### Syntax:



### Returns:





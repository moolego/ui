Class: UI.Element {#UI.Element}
===============================



### Implements:

Events, Options




UI.Element Method: constructor {#UI.Element:constructor}
---------------------------------------------------------


### Syntax:

	var myUI.Element = new UI.Element(options);

### Arguments:

1. options - (**)

### Options:

* lib - (**)
* component - (**)
* type - (**)
* state - (**)
* props - (**)
* skin - (**)
* styles - (**)
* group - (**)
* className - (**)
* useAutoClass - (**)
* tag - (**)
* selectable - (**)
* draggable - (**)
* dragLimitX - (**)
* dragLimitY - (**)
* resizable - (**)
* resizeLimitX - (**)
* resizeLimitY - (**)


UI.Element Method: toElement {#UI.Element:toElement}
-----------------------------------------------------


### Syntax:



### Returns:





UI.Element Method: build {#UI.Element:build}
---------------------------------------------


### Syntax:




UI.Element Method: buildResizer {#UI.Element:buildResizer}
-----------------------------------------------------------


### Syntax:




UI.Element Method: setClassName {#UI.Element:setClassName}
-----------------------------------------------------------


### Syntax:




UI.Element Method: setSkin {#UI.Element:setSkin}
-------------------------------------------------


### Syntax:




UI.Element Method: setState {#UI.Element:setState}
---------------------------------------------------


### Syntax:



### Arguments:

1. state - (**)
2. size - (**)

### Returns:





UI.Element Method: setCanvas {#UI.Element:setCanvas}
-----------------------------------------------------


### Syntax:



### Returns:





UI.Element Method: setSize {#UI.Element:setSize}
-------------------------------------------------


### Syntax:



### Arguments:

1. width - (**)
2. height - (**)
3. state - (**)
4. target - (**)

### Returns:





UI.Element Method: setLocation {#UI.Element:setLocation}
---------------------------------------------------------


### Syntax:



### Arguments:

1. left - (**)
2. top - (**)
3. morph - (**)

### Returns:





UI.Element Method: setBehavior {#UI.Element:setBehavior}
---------------------------------------------------------


### Syntax:




UI.Element Method: mousedown {#UI.Element:mousedown}
-----------------------------------------------------


### Syntax:



### Arguments:

1. e - (**)


UI.Element Method: click {#UI.Element:click}
---------------------------------------------


### Syntax:




UI.Element Method: mouseup {#UI.Element:mouseup}
-------------------------------------------------


### Syntax:




UI.Element Method: enableDrag {#UI.Element:enableDrag}
-------------------------------------------------------


### Syntax:



### Returns:





UI.Element Method: disableDrag {#UI.Element:disableDrag}
---------------------------------------------------------


### Syntax:



### Returns:





UI.Element Method: enableResize {#UI.Element:enableResize}
-----------------------------------------------------------


### Syntax:



### Returns:





UI.Element Method: onStart {#UI.Element:onStart}
-------------------------------------------------


### Syntax:




UI.Element Method: onDrag {#UI.Element:onDrag}
-----------------------------------------------


### Syntax:




UI.Element Method: onComplete {#UI.Element:onComplete}
-------------------------------------------------------


### Syntax:




UI.Element Method: resizeDrag {#UI.Element:resizeDrag}
-------------------------------------------------------


### Syntax:




UI.Element Method: resizeComplete {#UI.Element:resizeComplete}
---------------------------------------------------------------


### Syntax:




UI.Element Method: getCenterLocation {#UI.Element:getCenterLocation}
---------------------------------------------------------------------


### Syntax:



### Returns:





UI.Element Method: adaptLocation {#UI.Element:adaptLocation}
-------------------------------------------------------------


### Syntax:




UI.Element Method: show {#UI.Element:show}
-------------------------------------------


### Syntax:



### Returns:





UI.Element Method: hide {#UI.Element:hide}
-------------------------------------------


### Syntax:



### Returns:





UI.Element Method: setStyle {#UI.Element:setStyle}
---------------------------------------------------


### Syntax:



### Arguments:

1. style - (**)
2. value - (**)

### Returns:





UI.Element Method: setStyles {#UI.Element:setStyles}
-----------------------------------------------------


### Syntax:



### Arguments:

1. styles - (**)

### Returns:





UI.Element Method: getStyle {#UI.Element:getStyle}
---------------------------------------------------


### Syntax:



### Arguments:

1. style - (**)

### Returns:





UI.Element Method: inject {#UI.Element:inject}
-----------------------------------------------


### Syntax:



### Arguments:

1. container - (**)
2. position - (**)

### Returns:





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





/*
Script: UI.Element.Coordinates.js
  Contains methods to work with size, scroll, or positioning of Elements and the window object.
 
License:
  MIT-style license.
 
Credits:
  - Element positioning based on the [qooxdoo](http://qooxdoo.org/) code and smart browser fixes, [LGPL License](http://www.gnu.org/licenses/lgpl.html).
  - Viewport dimensions based on [YUI](http://developer.yahoo.com/yui/) code, [BSD License](http://developer.yahoo.com/yui/license.html).
*/

UI.Element.implement({
	/*
	 * 	Function: setSize
	 * 		Set size of the element and its canvas
	 */
	
	setSize : function(width, height, state){
		this.paddingWidth = this.element.getStyle('paddingLeft').toInt() + this.element.getStyle('paddingRight').toInt();
		this.paddingHeight = this.element.getStyle('paddingTop').toInt() + this.element.getStyle('paddingBottom').toInt();
		
		this.element.x = width || this.options.width || this.props.width || this.element.getSize().x - this.paddingWidth;
		this.element.y = height || this.options.height || this.props.height || this.element.getSize().y - this.paddingHeight;

		if (this.element.x > 0) this.element.setStyle('width', this.element.x);
		if (this.element.y > 0) this.element.setStyle('height', this.element.y);

		this.fireEvent('setCanvasSize', state);
		return this;
	},
	
	/*
	    Function: setLocation
			Set element location 
	*/
	
	setLocation	: function(left,top) {
		this.element.left = left || this.options.left || this.props.defaultLeft || this.element.getCoordinates().x - this.props.shadowMagnify * 2;
		this.element.top = top || this.options.top || this.props.defaultTop || this.element.getCoordinates().y - this.props.shadowMagnify * 2;
		this.element.setStyles({
			top	: this.element.left,
			left : this.element.top
		});
	},

	/*
	    Function: setLocation
			Set element location 
	*/
	
	getCenterLocation: function() {
		var location = {};
		
		location.top = (window.getHeight() - this.options.height.toInt()) / 2,
		location.left = (window.getWidth() - this.options.width.toInt()) / 2
		
		return location;
	}
});

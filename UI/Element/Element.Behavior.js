/*
Script: UI.Element.Behavior.js
  Contains methods to work with size, scroll, or positioning of Elements and the window object.
 
License:
  MIT-style license.
 
Credits:
  - Element positioning based on the [qooxdoo](http://qooxdoo.org/) code and smart browser fixes, [LGPL License](http://www.gnu.org/licenses/lgpl.html).
  - Viewport dimensions based on [YUI](http://developer.yahoo.com/yui/) code, [BSD License](http://developer.yahoo.com/yui/license.html).
*/

UI.Element.implement({

	/*
	    Function: setBehavior
			Set element behavior
	*/
	

	setBehavior : function() {
		if (this.options.draggable)  { this.enableDrag(); }
		if (this.options.resizable) { this.enableResize(); }
		
		this.element.addEvents({
			click 		: this.fireEvent.bind(this, 'click'),
			mousedown 	: this.fireEvent.bind(this, 'mousedown'),
			mouseover 	: this.fireEvent.bind(this, 'mouseover'),
			mouseenter 	: this.fireEvent.bind(this, 'mouseenter'),
			mouseOut 	: this.fireEvent.bind(this, 'mouseOut'),
			mouseup 	: this.fireEvent.bind(this, 'mouseup')
		});
	},
	
	/*
		Function: enableDrag
			Add draggable capabilities for the element.
	*/
	enableDrag :function() {
		this.dragHandler = this.element.makeDraggable({
			handle 		: this.head,
			limit 		: { x: this.options.dragLimitX, y: this.options.dragLimitY },
			
			onStart 	: function() { this.fireEvent("onDragStart"); }.bind(this),
			onDrag 		: function() { this.fireEvent('onDrag'); }.bind(this),
			onComplete 	: function() { this.fireEvent('onDragComplete'); }.bind(this)
		});
		
		this.addEvents({
			onDragComplete 	: this.adaptLocation.bind(this)
		});
		
		return this;
	},	

	/*
	  	Function: enableDrag
			Remove draggable capabilities for the element.
	*/
		
	disableDrag	: function() {
		if (this.options.draggable)  {
			this.dragHandler.detach();
		};
		
		return this;
	},	

	
	/*
	    Function: adaptLocation
	      Adapt location if window is dragged out of its boundaries
	*/
	
	adaptLocation : function() {
		var location = {};
		var needed = false;
		var coordinates = this.element.getCoordinates();
		
		this.reposFx = new Fx.Morph(this.element, {
			'duration': 1000,
			'transition': Fx.Transitions.Elastic.easeOut,
			'wait':true
		});

		if (coordinates.top.toInt() > window.getHeight()-53) {
			location.top = window.getHeight()-$random(25,75)
			needed = true;
		}
		
		if (coordinates.left.toInt() + this.element.getStyle('width').toInt() < 0) {
			location.left = $random(25,75)-this.element.getStyle('width').toInt();
			needed = true;
		}
		
		if (this.element.getStyle('right').toInt() > window.getWidth()) {
			location.right = window.getWidth()-$random(25,75);
			needed = true;
		}
		
		if (needed) this.reposFx.start(location) ;
	},
	
	
	/*
	    Function: enableResize
	    	Add resizable capabilities for the element.
	*/
	
	enableResize : function() {
	
		this.element.makeResizable({
			handle			: this.resize,
			limit			: { 
				x			: this.options.resizeLimitX,
				y			: this.options.resizeLimitX 
			},
			onStart 		: function() { this.fireEvent('onResizeStart'); }.bind(this),
			onDrag 			: function() { this.fireEvent('onResizeDrag'); }.bind(this),
			onComplete		: function() { this.fireEvent("onResizeComplete"); }.bind(this)
		});
		
		this.addEvents({
			onResizeDrag 	: function(){
				this.setSize(this.element.getSize().x,this.element.getSize().y);
			}
		});
		
		return this;
	},
});

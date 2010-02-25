/*
	Class: UI.Menu.Scroller
		Manage scrolls for menus. Calls to this class are transparently handled by <UI.Menu>
	
	Arguments:
			options
			
	Options: 
		wheel - (integer) Scroll increment when wheel is used
		speed - (integer) A speed increase factor, by default set to 12
		margin - (integer) Determine remaining margin on top and bottom when a menu is too large to feet in window
		target - (element) Menu element where scrolls will be attached
		onScroll - (function) function to fire on menu scrolling
		onResize - (function) function to fire on menu resizing
	
	Returns:
		void
		
	Example:
		(start code)
		this.scrolls = new UI.Scrolling.Menu({
			target : this.view,
			onScroll : function(){
				this.removeSubmenu();
			}.bind(this),
			onResize : function(){
				this.view.canvas.draw();
				if (this.shadow) this.shadow.show(this.container);
			}.bind(this)
		});
		(end)
		
	Implied global: 
		$clear 273 329 388 436, 
		$empty 68 69, 
		Class 58, 
		Element 164 242 300, 
		Event 194, 
		Events 60, 
		Options 60, 
		UI 58 254 312, 
		Window 101 107 237 295 361 414, 
		window 305 306
		
	Members:
		Element, Implements, MenuScroller, addDownArrow, addEvent, 
	    addEvents, addUpArrow, arrowDown, arrowUp, bind, bottom, canvas, class, 
	    className, content, destroy, element, fireEvent, getCoordinates, 
	    getHeight, getScroll, getStyle, grab, height, initialize, inject, left, 
	    margin, marginBottom, marginTop, mouseout, mouseover, onResize, 
	    onScroll, options, overflow, paddingBottom, paddingTB, paddingTop, 
	    periodical, position, removeEvents, removeScrolls, resetSize, 
	    scrollDown, scrollUp, scroller, attach, setOptions, setStyle, 
	    setStyles, setWrapper, skin, speed, state, stop, styles, target, toInt, 
	    top, type, wheel, width, wrapper, y, zIndex
*/

UI.MenuScroller = new Class({

	Implements: [Events, Options],
	
	options: {
		className: 'ui-scrollbar',
		wheel: 8,
		speed: 12,
		margin: 20,
		target: 'element',
		onScroll: $empty,
		onResize: $empty
	},
	
	/* 
	 Constructor: initialize
	 Construtor
	 
	 Arguments:
	 options - (object) options
	 */
	initialize: function(options){
		this.setOptions(options);
		
		this.element = this.options.element;
		this.content = this.options.content;
		this.margin = this.options.margin;
		
		this.resetSize();
		this.setWrapper();
		this.attach();
	},
	
	/* 
	 Method: setNewSize
	 private function
	 
	 Determine the menu position, it size and scrolls direction
	 
	 Return:
	 (void)
	 */
	resetSize: function(){
		var windowScroll = Window.getScroll();
		var elementCoordinates = this.element.getCoordinates();
		elementCoordinates.top -= windowScroll.y;
		elementCoordinates.bottom -= windowScroll.y;
		var arrows = [0, 0];
		this.element.setStyle('display', 'none');
		var windowHeight = Window.getHeight();
		
		if (elementCoordinates.top <= this.margin && elementCoordinates.bottom > windowHeight - this.margin) {
			//stick out on both sides (top and bottom)
			this.content.setStyles({
				'top': elementCoordinates.top - this.margin
			});
			this.element.setStyles({
				'top': this.margin,
				'height': windowHeight - this.margin * 2
			});
			arrows = [1, 1];
		}
		else 
			if (elementCoordinates.bottom > windowHeight - this.margin) {
				//stick out on bottom
				this.element.setStyles({
					'height': windowHeight - elementCoordinates.top - this.margin
				});
				arrows[1] = 1;
			}
			else 
				if (elementCoordinates.top <= this.margin) {
					//stick out on top
					this.content.setStyles({
						'top': elementCoordinates.top - this.margin
					});
					this.element.setStyles({
						'top': this.margin + windowScroll.y,
						'height': elementCoordinates.bottom - this.margin
					});
					arrows[0] = 1;
				}
		this.element.setStyle('display', 'block');
		if (arrows[0]) {
			this.addUpArrow();
		}
		if (arrows[1]) {
			this.addDownArrow();
		}
	},
	
	/* 
	 Method: addWrapper
	 private function
	 
	 Add a wrapper to the menu content to allow overflow
	 
	 Return:
	 (void)
	 */
	setWrapper: function(){
		var elementCoordinates = this.element.getCoordinates();
		this.paddingTop = this.content.getStyle('paddingTop').toInt();
		this.paddingBottom = this.content.getStyle('paddingBottom').toInt();
		this.paddingTB = this.paddingTop + this.paddingBottom;
		
		this.wrapper = new Element('div', {
			'class': 'menu-overflow-wrapper',
			styles: {
				overflow: 'hidden',
				position: 'relative',
				width: elementCoordinates.width,
				height: elementCoordinates.height - this.paddingTB,
				marginTop: this.paddingTop,
				marginBottom: this.paddingBottom,
				zIndex: 2
			}
		}).inject(this.element, 'top').grab(this.content);
		
		this.content.setStyles({
			paddingTop: 0,
			paddingBottom: 0
		});
	},
	
	/* 
	 Method: attach
	 private function
	 
	 Add mousewheel event
	 
	 Return:
	 (void)
	 */
	attach: function(){
		this.element.addEvent('mousewheel', function(e){
			var ev = new Event(e).stop();
			if (e.wheel > 0) {
				this.scrollUp(e.wheel);
			}
			else {
				this.scrollDown(e.wheel);
			}
		}.bind(this));
	},
	
	/* 
	 Method: removeScrolls
	 private function
	 
	 Remove scrolls and scrolls events
	 
	 Return:
	 (void)
	 */
	removeScrolls: function(){
		this.content.setStyles({
			'top': 0,
			paddingTop: this.paddingTop,
			paddingBottom: this.paddingBottom
		});
		this.element.setStyles({
			height: 'auto',
			top: 'auto'
		}).grab(this.content).removeEvents('mousewheel');
		this.wrapper.destroy();
		this.fireEvent('destroyArrows');
	},
	
	/* 
	 Method: addUpArrow
	 private function
	 
	 Add the up arrow element and events to manage it
	 
	 Return:
	 (void)
	 */
	addUpArrow: function(){
		var windowScroll = Window.getScroll();
		var elementCoord = this.element.getCoordinates();
		elementCoord.top -= windowScroll.y;
		elementCoord.bottom -= windowScroll.y;
		
		this.arrowUp = new Element('div', {
			'class': 'ui-menu-arrow-up'
		}).setStyles({
			position: 'absolute',
			width: elementCoord.width,
			height: elementCoord.top + 20,
			top: -elementCoord.top,
			left: 0,
			zIndex: 2
		}).inject(this.element, 'bottom');
		
		// new element to inject
		this.arrowUp.canvas = new UI.Element({
			width: elementCoord.width,
			height: 20,
			skin: this.options.skin,
			type: 'menuArrow',
			state: 'up'
		}).setStyles({
			position: 'absolute',
			bottom: 0,
			zIndex: -1
		}).inject(this.arrowUp);
		
		var self = this;
		
		this.arrowUp.addEvents({
			'mouseover': function(){
				self.scroller = self.scrollUp.periodical(30, self, 2);
			},
			'mouseout': function(){
				$clear(self.scroller);
			}
		});
		
		this.addEvent('destroyArrows', function(){
			if (this.arrowUp) {
				this.arrowUp.destroy();
				this.arrowUp = false;
			}
		});
	},
	
	/* 
	 Method: addDownArrow
	 private function
	 
	 Add the down arrow element and events to manage it
	 
	 Return:
	 (void)
	 */
	addDownArrow: function(){
		var windowScroll = Window.getScroll();
		var elementCoord = this.element.getCoordinates();
		elementCoord.top -= windowScroll.y;
		elementCoord.bottom -= windowScroll.y;
		
		this.arrowDown = new Element('div', {
			'class': 'ui-menu-arrow-down'
		}).setStyles({
			position: 'absolute',
			width: elementCoord.width,
			height: window.getHeight() - elementCoord.bottom + 20,
			bottom: elementCoord.bottom - window.getHeight(),
			left: 0,
			zIndex: 2
		}).inject(this.element, 'bottom');
		
		// new shape to inject
		this.arrowDown.canvas = new UI.Element({
			width: elementCoord.width,
			height: 20,
			skin: this.options.skin,
			type: 'menuArrow',
			state: 'down'
		}).setStyles({
			position: 'absolute',
			top: 0,
			zIndex: -1
		}).inject(this.arrowDown);
		
		this.arrowDown.addEvents({
			'mouseover': function(){
				this.scroller = this.scrollDown.periodical(30, this, -2);
			}.bind(this)			,
			'mouseout': function(){
				$clear(this.scroller);
			}.bind(this)
		});
		
		this.addEvent('destroyArrows', function(){
			if (this.arrowDown) {
				this.arrowDown.destroy();
				this.arrowDown = false;
			}
		});
	},
	
	/* 
	 Method: scrollDown
	 private function
	 
	 Scroll the menu down
	 
	 Arguments:
	 e - (event) Event handling mousewheel
	 
	 Return:
	 (void)
	 */
	scrollDown: function(e){
		this.fireEvent('scroll');
		var elementCoordinates = this.element.getCoordinates();
		var wrapperCoordinates = this.wrapper.getCoordinates();
		var contentCoordinates = this.content.getCoordinates();
		
		if (contentCoordinates.bottom > wrapperCoordinates.bottom) {
			// we can extend (up) the element to fit the window
			if (elementCoordinates.top - Window.getScroll().y - this.options.speed > this.margin) {
				this.element.setStyles({
					top: this.element.getStyle('top').toInt() - this.options.speed,
					height: elementCoordinates.height + this.options.speed
				});
				this.wrapper.setStyle('height', wrapperCoordinates.height + this.options.speed);
				this.fireEvent('resize');
				// we just need to scroll
			}
			else {
				if (!this.arrowUp) {
					this.addUpArrow();
				}
				this.content.setStyle('top', this.content.getStyle('top').toInt() - this.options.speed * (-e));
			}
		}
		else 
			if (this.arrowDown) {
				if (!this.arrowUp) {
					this.wrapper.setStyle('height', contentCoordinates.height + this.paddingTB);
					this.element.setStyle('height', contentCoordinates.height + this.paddingTB);
					this.element.setStyle('top', this.element.getStyle('top').toInt() + this.paddingTB);
					this.fireEvent('resize');
				}
				else {
					this.content.setStyle('top', elementCoordinates.height - contentCoordinates.height - this.paddingTB);
				}
				$clear(this.scroller);
				this.arrowDown.destroy();
				this.arrowDown = false;
			}
	},
	
	/* 
	 Method: scrollUp
	 private function
	 
	 Scroll the menu up
	 
	 Arguments:
	 e - (event) Event handling mousewheel
	 
	 Return:
	 (void)
	 */
	scrollUp: function(e){
		this.fireEvent('scroll');
		var elementCoordinates = this.element.getCoordinates();
		var wrapperCoordinates = this.wrapper.getCoordinates();
		var contentCoordinates = this.content.getCoordinates();
		
		if (contentCoordinates.top < wrapperCoordinates.top) {
			// we can extend the element to fit the window
			if (elementCoordinates.bottom + this.margin < Window.getHeight() + Window.getScroll().y) {
				this.element.setStyle('height', elementCoordinates.height + this.options.speed);
				this.wrapper.setStyle('height', wrapperCoordinates.height + this.options.speed);
				this.content.setStyle('top', this.content.getStyle('top').toInt() + this.options.speed);
				this.fireEvent('resize');
				// we just need to scroll
			}
			else {
				if (!this.arrowDown) {
					this.addDownArrow();
				}
				this.content.setStyle('top', this.content.getStyle('top').toInt() + this.options.speed * e);
			}
		}
		else 
			if (this.arrowUp) {
				this.content.setStyle('top', 0);
				if (!this.arrowDown) {
					this.wrapper.setStyle('height', contentCoordinates.height + this.paddingTB);
					this.element.setStyle('height', contentCoordinates.height + this.paddingTB);
					this.fireEvent('resize');
				}
				$clear(this.scroller);
				this.arrowUp.destroy();
				this.arrowUp = false;
			}
	}
	
});
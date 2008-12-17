/*
	Class: UI.Window.Controller
		Window controller. It handles windows cascading position, minimize position, focusing, ...
	
	Arguments:
		options - (object)
	
	Options:
		zBase - (integer)
		zStep - (integer)
		cascade - (object)
		stack - (object)
	
	Requires:
		<UI.Window>
	
	Discussion:
		Stacks should be better implemented
*/

var ui = ui || {};

UI.Controller.Window = new Class({
	Singleton			: true,
	//Extends			: UI.Controller,
	Implements 			: [Events, Options],
	
	options: {
		className		: 'ui-winman',
		version			: '0.1a',
		zBase			: 2000,
		zStep			: 10,
		cascade			: {
			start		: {
				x		: 51,
				y		: 101
			},
			step: {
				x		: 20,
				y		: 20
			}
		},
		stack			: {
			offsetWidth : 4,		
			offsetHeight: 4			
		}
	},
	
	/* 
	Constructor: initialize
		Construtor
	
	Arguments:
		options - (object) options
	
	Returns:
		(void)
	*/
	
	initialize: function(options){
		this.setOptions();
		
		UI.elements.window = new Array();

		this.zIndex = this.options.zBase;
		
		window.addEvent('resize', function(){ this.resizeMaximizedWindow(); }.bind(this));
	},


	/*
	Function: register
		Add passing window to the manage list

	Arguments:
		win - (object) the window class instance to register
	
	Returns:
		(void)
	*/
	
	register: function(win) {
		UI.elements.window.push(win);
		win.element.setStyle('zIndex', this.zIndex);
		this.zIndex += this.options.zStep;
	},
	
	/*
	Function: close
		Destroy the provided window and focus to next one

	Arguments:
		win - (object) the window class instance to close and destroy
	
	Returns:
		(void)
	*/
	
	close: function(elementClass) {
		elementClass.hide();
		elementClass.fireEvent('onClose');
		for (var i = UI.elements.window.length - 1; i >= 0; i--) {
			if (UI.elements.window[i] == elementClass) {
				elementClass.destroy();
				delete UI.elements.window[i];
				UI.elements.window = UI.elements.window.clean();
			}
		}
		this.focus();
	},
	
	/*
	Function: focus
		Increment max z-index and focus provided window

	Arguments:
		win - (object) the window class instance to focus
	
	Returns:
		(void)
	*/
	
	focus: function(win) {
		
		if (!$defined(win)) {
			//make next highest window focus
			var zIndex = 0;
			var window;
			for (var i = UI.elements.window.length - 1; i >= 0; i--) {
				var windowZIndex = UI.elements.window[i].element.getStyle('zIndex');
				if (windowZIndex >= zIndex && !UI.elements.window[i].minimized) {
					window = UI.elements.window[i];
					zIndex = windowZIndex;
				}
			}
			if (window) window.focus();
			return;
		} else if (win && this.active != win) {
			if (this.active && !this.active.minimized) this.blur(this.active);
			
			this.zIndex += this.options.zStep;
			win.element.style.zIndex = this.zIndex;
			
			this.active = win;
			win.fireEvent('focus');
			return;
		}
	},
	
	/*
	Function: blur
		Blur active window

	Arguments:
		win - (object) the window class instance to blur
	
	Returns:
		(void)
	*/
	
	blur: function(win) {
		if ($defined(win) && !win.minimized) {
			win.setState('inactive');
			win.fireEvent('onBlur');
		} else if (this.active) {
			this.blur(this.active);
		}
	},
	
	/*
	Function: getMinimizedLocation
		Return the position of next minimized window
	
	Returns:
		location - (array) Array containing left and top position	  
	 */	
	 	
	getMinimizedLocation: function() {
		var x = -150;
		var y = window.getHeight()-35;
		
		UI.elements.window.each(function(w,i) {
			if (w.state == 'minimized') {
				x += w.getStyle('width').toInt() + 4;
			}
		});
		
		return [x, y];
	},
	
	/*
	Function: resetMinimizedLocation
		Replace minimized windows
	
	Returns:
		(void)
	*/
	
	resetMinimizedLocation : function(){
		var x = -150;
		var y = window.getHeight()-35;
		UI.elements.window.each(function(win) {
			if (win.state == 'minimized') {
				x += win.getStyle('width').toInt() + 4;
				win.setLocation(x, y);
			}
		});
	},

	/*
	Function: resizeMaximizedWindow
		Set new maximized size for all mamimized window 
	
	Returns:
		(void)
	*/	
	
	resizeMaximizedWindow: function() {
		UI.elements.window.each(function(win) {
			if (win.state == 'maximized') {
				win.setSize({
					height	: window.getHeight()-53,
					width	: window.getWidth()
				});
			}
		});
	},

	/*
	Function: getCascadeLocation
		Calculate the location of the window in the cascade

	Arguments:
		win - (object) the window class instance to get location

	Returns:
		location - (object) location coordinates { left : 100, top : 100 }
	*/

	getCascadeLocation: function(win) {
		var location = {
			left : this.options.cascade.start.x.toInt(),
			top : this.options.cascade.start.y.toInt()
		}
		UI.elements.window.each(function(w,i) {
			if (w.state != 'minimized' && w.options.location == 'cascade') {
				location.left += this.options.cascade.step.x;
				location.top += this.options.cascade.step.y;
			}
		},this);
		return location;
	},
	
	/*
	Function: propagateUnderShadow
		private function
		
		Propagate click from shadow offset to the back window
	
	Arguments:
		e - (event) Event handling click
	
	Returns:
		(void)
	
	*/
	
	propagateUnderShadow : function(e) {
		var x = e.client.x;
		var y = e.client.y;
		var z = 0;
		var s = '';
		UI.elements.window.each(function(w,i) {
			c = w.element.getCoordinates();
			if ( c.left <= x && x <= c.left + c.width && c.top <= y && y < c.top + c.height) {
				if ( w.element.getStyle('z-index') > z ) {
					z = w.element.getStyle('z-index');
					s = w;
				}
				s.focus();
			}
		});
	},

	/*
	Function: resetCascade
		Reset all window location and set a cascade
	
	Returns:
		(void)
	 */
	
	resetCascade: function() {
		UI.elements.window.each(function(w,i) {
			console.log(w.state);
			
			if (w.state == 'normalized') {
				w.setStyles(getCascadePosition(w));
				w.location = 'cascade';
			}
		});
	}
});

ui.windowController = UI.windowController || new UI.Controller.Window();
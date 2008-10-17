/*
Class: UI.Controller
	base class for controllers.

License:
	MIT-style license.

Require:
	UI/Windows.js

*/

UI.Controller = {};

/*
Class: UI.Window.Controller
	The window controller class of the <http://app.floor.ch> floor apps framework
	Creates a new window controller

License:
	MIT-style license.

Require:
	UI/Windows.js

*/

UI.Controller.Window = new Class({
	//Extends				: UI.Controller,
	Implements 			: [Events, Options],
	
	options: {
		className		: 'ui-winman',
		version			: '0.1a',
		zBase			: 2000,
		zStep			: 10,
		cascade			: {
			start		: {
				x		: 50,
				y		: 100
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
	
	initialize: function(options){
		this.setOptions();
		
		UI.elements.window = new Array();

		this.zIndex = this.options.zBase;
		
		window.addEvent('resize', function(){ 	this.resizeMaximizedWindow(); }.bind(this));
	},


	/*
	  Function: register
	  
	   	Add passing window to the manage list
	   
	  Arguments: window Object
	  
	 */	
	
	register: function(win) {
		UI.elements.window.push(win);
	},
	
	/*
	  Function: destroy
	  
	   Destroy the window class instance
	   
	  Arguments: window Object
	  
	 */	
	
	destroy: function(elementClass) {
		for (var i = UI.elements.window.length - 1; i >= 0; i--) {
			if (UI.elements.window[i] == elementClass) {
				elementClass.destroy();
				delete UI.elements.window[i];
				UI.elements.window = UI.elements.window.clean();
			}
		}
	},
	
	/*
	  Function: focus
	  
	   	Increment max z-index and blur active window
	   
	  Arguments: window Object
	  
	 */	
	
	focus: function(win) {
		this.zIndex = this.zIndex + this.options.zStep;
		win.element.style.zIndex = this.zIndex;

		if (this.active) this.active.blur();
		
		this.active = win;
	},

	
	/*
	  Function: setMinimizedCoordinates
	  
	   	Return coordinates of the minimized window abstract in the stack
	  
	 */	
	
	setMinimizedCoordinates: function() {
		var y = 60;
		
		UI.elements.window.each(function(w,i) {
			if (w.state == 'minimized') {
				y = y + w.element.getStyle('height').toInt() + this.options.stack.offsetHeight;
				
				console.log(y);
			}
		},this);
		
		var coordinates = {
			width	: 200, 
			height	: 25,
			left	: 10,
			top		: y
		};
		
		
		return coordinates;
	},
	
	/*
	  Function: resizeMaximizedWindow
	  
	   	Propagate click from shadow offset to the back window 
	  
	 */	
	 	
	setMinimizedLocation: function() {
		var x = 4;
		
		UI.elements.window.each(function(w,i) {
			if (w.state == 'minimized') {
				x = x + w.element.getStyle('width').toInt() + 4;
			}
		});
		
		return x;
	},

	/*
	  Function: resizeMaximizedWindow
	  
	   	Set new maximized size for all mamimized window 
	
	
	  
	 */	
	
	resizeMaximizedWindow: function() {
		UI.elements.window.each(function(win,i) {
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
	  
	  Arguments : window Object
	  
	  Return
	  		Hash of location coordinates { left : 100, top : 100 }
	  
	*/

	
	getCascadeLocation: function(win) {
		var location = {
			left : this.options.cascade.start.x.toInt(),
			top : this.options.cascade.start.y.toInt()
		}
		
		UI.elements.window.each(function(w,i) {
			if (w.state == 'normalized' && w.options.position == 'cascade') {
				location.left = location.left + this.options.cascade.step.x;
				location.top = location.top + this.options.cascade.step.y;
			}
		},this);
		
		return location;
	},
	
	
	/*
	  Function: propagateUnderShadow
	  
	   	Propagate click from shadow offset to the back window 
	  
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

UI.Controller.Window.toSingleton();
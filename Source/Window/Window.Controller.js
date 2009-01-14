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

UI.WindowController = new Class({

	//Extends			: UI.Controller,
	Implements 			: [Events, Options],
	
	options: {
		version: '0.1a',
		zBase: 2000,
		zStep: 1,
		cascade: {
			start: {
				x: 51,
				y: 101
			},
			step: {
				x: 20,
				y: 20
			}
		},
		stack: {
			offsetWidth: 4,
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
				
		ui.windows = new Array();
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
		ui.windows.push(win);
		if (win.options.zIndex == 'auto')
			win.element.setStyle('zIndex', this.zIndex);
		else
			win.element.setStyle('zIndex', win.options.zIndex);
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
	
	
	close: function(win) {
		win = win || this.active; 
		win.hide();
		win.fireEvent('onClose');
		for (var i = ui.windows.length - 1; i >= 0; i--) {
			if (ui.windows[i] == win) {
				win.destroy();
				delete ui.windows[i];
				ui.windows = ui.windows.clean();
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
			for (var i = ui.windows.length - 1; i >= 0; i--) {
				var windowZIndex = ui.windows[i].element.getStyle('zIndex');
				if (windowZIndex >= zIndex && !ui.windows[i].minimized) {
					window = ui.windows[i];
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
		
		ui.windows.each(function(w,i) {
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
		ui.windows.each(function(win) {
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
	
	resizeMaximizedWindow: function(){
		ui.windows.each(function(win) {
			if (win.state == 'maximized') {
				win.setSize({
					height: window.getHeight()-53,
					width: window.getWidth()
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

	getCascadeLocation: function(win){
		var location = {
			left : this.options.cascade.start.x.toInt(),
			top : this.options.cascade.start.y.toInt()
		}
		ui.windows.each(function(w,i) {
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
	
	propagateUnderShadow : function(e){
		var x = e.client.x;
		var y = e.client.y;
		var z = 0;
		var s = '';
		ui.windows.each(function(win,i) {
			c = win.element.getCoordinates();
			if ( c.left <= x && x <= c.left + c.width && c.top <= y && y < c.top + c.height) {
				if ( win.element.getStyle('z-index') > z ) {
					z = win.element.getStyle('z-index');
					s = win;
				}
				s.focus();
			}
		});
	},

	/*
	Function: cascade
		Move every windows to its position in the cascade
	
	Returns:
		(void)
	*/

	cascade: function(group){
		var start = [170,50];
		var offset = [20,20];
		var zIndex = this.zIndex;
		
		ui.windows.each(function(win){
			win.element.style.zIndex = zIndex++;

			start[0] += offset[0];			
			start[1] += offset[1];

			var fx = new Fx.Morph(win.element, {
				'duration': 1000,
				transition: Fx.Transitions.Sine.easeInOut,
				link: 'ignore'
			}).start({		
				'left': start[0],
				'top': start[1]
			});	
			
			win.location = 'cascade';	
		});
		
		this.zIndex = zIndex;
	},
	
	closeAll: function(){
		ui.windows.each(function(win){
			this.close(win);			
		},this);
	}
	
});

ui.windowController = ui.windowController || new UI.WindowController();
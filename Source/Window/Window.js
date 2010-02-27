/*
	Class: UI.Window
		The UI.Window class defines objects that manage and coordinate the windows an application displays on the screen.
	
	Require:
		<UI.Element>
		<UI.Canvas>
		<UI.Skin>
		<UI.Button>
		<UI.Control>
		<UI.View>
	
	Extends:
		<UI.Element>
	
	Arguments:
		Options
		
	Options: 
		- title - (string) title displayed in the head titlebar.
		- type - (string) define the type of the window (default, transparent).
		- location - (string)  Could be either 'custom','center' or 'cascade'. Override top and left options if defined - default to custom.
		- width - (number) Width of the container wrapper in px.
		- height - (number) Height  of the container wrapper in px.
		- top	- (number) Position of the container wrapper in px from the top.
		- left - (number) Position of the container wrapper in px from the left.
		- right - (number) Position of the container wrapper in px from the right.
		- bottom - (number) Position of the container wrapper in px from the bottom.
		- position - (string) Define if position is "fixed". Default to 'absolute.
		- state - ('normalized','maximized','normalized') Define the initial state - default to normalized.
		- useEffects - (boolean) Define if effects should be implemented.
		- resizable - (boolean) Define if the window is resizable.
		- draggable - (boolean) Define if the window is draggable.
		- scrollbar - (boolean) Define if the container should use scrollbar.
		- register - (bolean) Define if the window should be handle by the window manager.
		- status - (bollean) Define if the window should use a statusbar.
		- url	- (string) Define the url from the window content.
	
	Example:
		(start code)
		var win = new UI.Window({
			width 	: 760,
			height	: 600,
			title	: 'a moolego window',
		}).setContent('iframe','http://ui.moolego.org');
		(end)
	
	
	Implied global:
		- Moolego - UI
		- Mootools - $, $empty, $merge, Class, Element, Window
		- Javascript - document
	
	Members:
		Button, Element, Extends, Label, TabView, Toolbar, View, 
	    Window, adaptLocation, addEvent, addEvents, bind, body, borderSize, 
	    bottom, build, buildControls, buildFoot, buildHead, buildResizer, 
	    buildToolbar, buildView, canvas, close, component, components, 
	    container, content, control, controller, controls, disableSelect, 
	    display, dragHandlers, dragLimitX, dragLimitY, draggable, each, element, 
	    enableDrag, fireEvent, focus, foot, getCascadeLocation, 
	    getCenterLocation, getCoordinates, getHeight, getInitialLocation, 
	    getMinimizedLocation, getSize, getStyle, getWidth, head, height, hide, 
	    inactive, initialize, inject, injected, layers, left, location, 
	    maximize, maximized, minimize, minimized, mousedown, mouseenter, 
	    mouseleave, mouseover, normalize, onBlur, onClose, onDragComplete, 
	    onDragStart, onFocus, onLoad, onMaximize, onMinimize, onNormalize, 
	    onResizeComplete, onResizeStart, onRestore, opacity, options, overflow, 
	    overlay, parent, position, propagateUnderShadow, props, push, register, 
	    resetMinimizedLocation, resizable, resizeComplete, resizeLimitX, 
	    resizeLimitY, resizeOnDragIfMaximized, resizer, right, scrollbar, set, 
	    attach, setContent, setLocation, setSize, setState, setStatus, 
	    setStyle, setStyles, setTitle, show, size, skin, state, status, styles, 
	    tabView, tabbar, tag, title, toggle, toggleInterface, toolbar, top, 
	    type, updateSize, useEffects, view, visibility, width, window, 
	    x, y, zIndex
	
	Discussion:
		Effects still need to be implemented as option
*/

UI.Window = new Class({
	Extends: UI.Element,
	
	options: {
		component: 'window',
		title: 'Window',
		
		// Size options
		width: 640,
		height: 480,
		
		// location options
		location: 'cascade',
		position: 'fixed',
		top: false,
		left: false,
		right: false,
		bottom: false,
		zIndex: 'auto', // to get zIndex from skin or an Int as zIndex
		tag: 'div',
		
		// Components Options
		head: true,
		view: {},
		foot: true,
		
		// 		
		controls: ['close', 'minimize', 'maximize'],
		scrollbar: true,
		
		// Not Implemented should be able to enable/disable effects
		useEffects: false,
		
		// Drag options
		draggable: true,
		dragLimitX: [-1000, window.getWidth() + 1000],
		dragLimitY: [51, window.getHeight() + 1000],
		dragHandlers: ['head', 'foot'],
		hideOnDrag : false,
		
		// Resize options
		resizable: true,
		resizeLimitX: [200, screen.width],
		resizeLimitY: [200, screen.height],
		resizeOnDragIfMaximized: false,
		
		onMinimize: $empty,
		onMaximize: $empty,
		onRestore: $empty,
		onLoad: $empty,
		onBlur: $empty,
		onFocus: $empty,
		onClose: $empty
	},

	/* 
	Constructor: initialize
		Construtor
	
	Arguments:
		options - (object) options
	
	See also:
		<UI.Element::initialize>
	*/
	initialize: function(options){
		// call parent constructor
		this.parent(options);
		
		// set window position
		var location = this.getInitialLocation();
		this.options.top = location.top;
		this.options.left = location.left;
		this.element.setStyles(location);
		this.adaptLocation();

		//set the position (absolute or fixed)
		if (this.options.position == 'fixed'){
			this.props.styles.position = 'fixed';
			this.element.setStyle('position', 'fixed');
		}

		ui.controller.window.register(this);
		ui.controller.window.focus(this);
	},
	
	/* 
	Function: build
		private function
		
		Creates html structure and inject it in the dom.
	
	Return:
		(void)
	
	See also:
		<UI.Element::build>
	*/
	build: function() {	
		this.parent();

		this.buildHead();
		this.buildView();
		this.buildFoot();
		
		this.inject(this.options.container || $(document.body));
		
		if (this.paint) {
			this.paint.canvas.addEvent('click', function(e){
				ui.controller.window.propagateUnderShadow(e);
			});
		}
	},

	/* 
	Function: buildHead
		private function
		
		Create a new head element, set class and styles and inject
	
	Returns:
		(void)
	*/	
	buildHead: function(){
		// create new dom element as head of the window
		this.head = new Element('div', this.props.components.head)
		.inject(this.element);
		
		//
		this.dragHandlers.push(this.head);
		this.head.disableSelect();	
		
		
		if (this.options.skin) {
			this.props.components.title.skin = this.options.skin;
		}
		
		this.props.components.title.skin = this.options.skin;
		
		this.title = new UI.Label(this.props.components.title)
		 .inject(this.head);
		
		this.setTitle(this.options.title);
		this.buildControls(this.options.controls);
		
	},

	/*
	Function: buildControls
		private function
		
		Create window controls that allow window close, maximize and minimize
	
	Returns:
		(void)
	*/
	buildControls: function(){
		if (!this.options.controls) { return; }
			
		var controllist = [];
		this.controls = new Element('div',this.props.components.controls)
		.addEvent('click',function(e) { e.stop(); })
		.inject(this.head);
		
		this.options.controls.each(function(action){
			this.props.components.control.type = action;
			this.props.components.control.skin = this.options.skin;
			
			var button = new UI.Button(this.props.components.control)
			.addEvent('onClick', this.control.bind(this, action))
			.inject(this.controls);	
			
			controllist.push(button);
		},this);
		
		this.addEvents({
			'onMinimize': function() { this.controls.hide(); },
			'onNormalize': function() { this.controls.show(); }
		});
	},
	
	/*
    Function: buildToolbar
    	Build the window's toolbar. and attach related events
    
    Arguments:
    	toolbar - (object) Toolbar's options object. See <UI.Toolbar>
    
    Returns:
    	this
		
	Discussion:
		it should be passed as options when the application instanciates its window
	*/
	buildToolbar: function(toolbar){
		toolbar.skin = this.options.skin;
		
		this.toolbar = new UI.Toolbar(toolbar).inject(this.head);

		// not really nice because related to a specific layer ... 
		if (this.paint) {
			this.props.layers.head.size[1] = this.head.getSize().y;
		}
		
		this.props.components.toggle.skin = this.options.skin;
		
		var toggle = new UI.Button(this.props.components.toggle)
		.addEvent('onClick', this.toggleInterface.bind(this))
		.inject(this.head);	
		
		this.addEvents({
			onMinimize: function() { 
				this.toolbar.element.hide() ;
				toggle.hide();
			},
			onNormalize: function() {
				this.toolbar.element.show();
				toggle.show();
			}
		});
		
		this.updateSize();
		this.fireEvent('render', this.state);
		
		return this;
	},

	/* 
	Function: buildView
		private function
		
		Create a new view of the define type and attach related window events
	
	Returns:
		(void)
		
	Discussion:
		We should setup a better switch to build view according its type
	*/
	buildView : function() {
		if (this.options.tabView) {
			this.buildTabview();
		} else {
			// should be merge depending on certain conditions 
			if (this.options.skin) 
				this.options.view.skin = this.options.skin;
			
			if (!this.options.view.type)
				this.options.view.type = this.props.components.view.type;
			
			this.options.view.overflow = this.options.overflow;
			var props = $merge(this.props.components.view,this.options.view);
			props.skin = this.options.skin;
			this.view = new UI.View(props)
			.inject(this.element);
		}
		
		this.addEvents({
			injected: function() { this.view.fireEvent('onResize'); },
			onMinimize: function() { this.view.hide(); },
			onNormalize: function() { this.view.show(); this.setSize(); }
		});
		
		this.content = this.view.content;
	},
	/* 
	Function: buildTabview
		private function
		
		Create a new tabview of the define type
	
	Returns:
		(void)
	*/
	buildTabview: function() {
		var options = this.options.tabView;
		this.options.tabView.container = this.element;
		this.options.tabView.skin = this.options.skin;
			
		this.view = new UI.TabView(this.options.tabView)
		.inject(this.element);
	},

	/* 
	Function: buildFoot
		private function
		
		Create a new foot container and inject resize handler and statusbar in it
	
	Returns:
		(void)
	*/
	buildFoot: function() {
		if (!this.options.foot || this.foot) { return; }
		
		this.foot = new Element('div', this.props.components.foot)
		.inject(this.element);

		this.foot.disableSelect();
			
		this.status = new Element('div',this.props.components.status)
		.inject(this.foot);
		
		this.dragHandlers.push(this.status);
		
		this.setStatus();
		
		this.addEvents({
			'onMinimize': function() { this.foot.hide(); },
			'onNormalize': function() { this.foot.show(); }
		});
	},

	/*
	Function: buildResizeHandler
		private function
		
		Add specific events  for resizer in window
	
	See also:
		<UI.Element::buildResizer>
	
	Returns:
		(void)
	*/
	buildResizer: function() {
		this.parent();
		
		this.addEvents({
			'minimize': function() { this.resizer.hide(); },
			'normalize': function() { this.resizer.show(); }
		});
	},
	
	/*
	Method: toggleInterface
		The action method for the "Hide Toolbar" menu item (which alternates with "Show Toolbar").
	
	Returns:
		this
	*/
	toggleInterface: function() {
		if (this.toolbar.element.getStyle('display') == 'block') {
			
			// newt line is vorbidden
			
			if (this.paint) {
				this.props.layers.head.size[1] = this.head.getSize().y;
			}
			this.toolbar.element.hide();
		} else {
			this.toolbar.element.setStyles({
				opacity: 1,
				visibility: 'visible',
				display: 'block'
			});
			
			// next line is vorbidden
			if (this.paint) {
				this.props.layers.head.size[1] = this.head.getSize().y;
			}
		}
		
		if (this.foot) {
			if (this.foot.getStyle('display') == 'block') {
				this.foot.hide();
			}
			else {
				this.foot.setStyles({
					opacity: 1,
					visibility: 'visible',
					display: 'block'
				});
			}
		}
		
		this.updateSize();
		this.setSize(this.element.x,this.element.y);
		this.fireEvent('onResizeDrag');
		this.fireEvent('render', this.state);
		
		return this;
	},

	/*
	    Function: attach
	    	private function
	    	
	    	Define the specific window attach
	    
	    Returns:
	    	(void)
	    
	    See also:
	    	<UI.Element::attach>
	*/
	attach: function(){
		this.parent();
		
		// bizarre bizarre...
		this.setStyle('position','fixed');
		
		this.addEvents({
			mousedown : this.focus.bind(this),
			resizeComplete: function(){
				this.maximized = false;
				var coord = this.element.getCoordinates();
				this.options.width = coord.width;
				this.options.height = coord.height;
			}.bind(this)
		});

		this.addEvents({
			'onBlur': function(){
				if (this.view.iframe) this.view.overlay.show();
				this.controls.setStyle('opacity', '.49');
			},
			'onFocus': function(){
				if (this.view.iframe) this.view.overlay.hide();
				if (this.controls) {
					this.controls.setStyle('opacity', '.99')
				}
			},
			'onResizeStart': function(){
				if (this.view.iframe) this.view.overlay.show();
			},
			'onResizeComplete': function(){
				if (this.view.iframe) this.view.overlay.hide();
			},
			'onDragStart': function(){
				if (this.options.hideOnDrag) {
					this.view.hide();
				} else if (this.view.iframe) {
					this.view.overlay.show();
				}
			},
			'onDragComplete': function(){
				if (this.options.hideOnDrag) {
					this.view.show();
				}
				else 
					if (this.view.iframe) {
						this.view.overlay.hide();
					}
			}
		});
	},

	/*
	Function: enableDrag
		private function
		
		Add draggable capabilities for the window.
	
	Returns:
		(void)
	
	See also:
		<UI.Element::enableDrag>
	*/
	enableDrag: function(){
		this.parent();
		this.addEvents({
			onDragComplete 	: function() {
				this.options.location = 'custom';
				this.maximized = false;
				var coord = this.element.getCoordinates();
				this.options.top = coord.top;
				this.options.left = coord.left;
				this.options.width = coord.width;
				this.options.height = coord.height;
			}.bind(this)
		});
		
		this.element.setStyle('position','absolute');
	},	


	/*
	Function: focus
		If minimize normalize and fireEvent OnFocus
	
	Returns:
		(void)
	*/
	focus: function(){
		if (this.minimized){
			this.normalize();
			ui.controller.window.resetMinimizedLocation();
		} else if (this.maximized && this.options.resizeOnDragIfMaximized) {
			this.normalize();
		} else {
			ui.controller.window.focus(this);
		}
		
		if (this.state != 'default') {
			this.setState('default');
		}
	},

	/*
    Function: minimize
		This action method displays the minimized window
	
	Returns:
		(void)
	*/
	minimize : function() {
		this.fireEvent('onMinimize');
		this.maximized = false;
		this.minimized = true;

		var size = {
			width: this.skin.minimized.width,
			height: this.skin.minimized.height
		};
		
		this.setSize(size.width,size.height,'minimized');
		
		this.setState('minimized', size);
		var coord = ui.controller.window.getMinimizedLocation();

		this.setLocation(coord[0], coord[1]);
		this.setStyle('position', 'fixed');
		ui.controller.window.focus();
	},

	/*
	Function: maximize
		private function
		
		This action method set the size to fit the window container
	
	Returns:
		(void)
	*/
	maximize: function(){
		if(this.maximized) {
			this.normalize();
		} else {
			var width = Window.getWidth() - this.computedSize.computedLeft - this.computedSize.computedRight;
			var height = Window.getHeight() - this.options.dragLimitY[0] - this.computedSize.computedBottom - this.computedSize.computedTop;
			
			this.setSize(width,height);
			var coord = this.getCoordinates();
			
			this.computedSize.computedLeft
			
			this.options.top = coord.top;
			this.options.left = coord.left - this.computedSize.computedLeft;
			this.element.setStyles({
				top: this.options.dragLimitY[0],
				left: 0
			});
			
			this.minimized = false;
			this.maximized = true;
			this.fireEvent('onMaximize');
			this.fireEvent('onResizeDrag');
		}
	},

	/*
	Function: normalize
		Normalize window
	
	Returns:
		(void)
	*/
	normalize: function(){
		this.fireEvent('onNormalize');
		
		var size = {
			width: false,
			height: false
		};
		
		this.updateSize();
		this.setState('default', size);
		
		this.setLocation();
		
		ui.controller.window.focus(this);
		
		this.maximized = false;
		this.minimized = false;
		this.fireEvent('onResizeDrag');
	},		

	/*
	Function: getInitialLocation
		private function
		
		Return the initial location depending on location options and window's size
	
	Returns:
		coordinates - (object) Object containing top and left properties
	*/
	getInitialLocation: function(){
		if (this.options.top || this.options.right || this.options.bottom || this.options.left) {
			//right || left
			var left = (this.options.right && !this.options.left) ? 
				Window.getWidth() - this.options.right - this.options.width : 
				this.options.left;
			
			//top || bottom
			var top = (this.options.bottom && !this.options.top) ? 
				Window.getHeight() - this.options.bottom - this.options.height : 
				this.options.top;
			
			return { 
				top: top, 
				left: left
			};
		} else if (this.options.location == 'center') {
			return this.getCenterLocation();
		} else {
			var c = ui.controller.window.getCascadeLocation(this);
			return { 
				top: c.top, 
				left: c.left 
			};
		}
	},

	
	/*
	Function: updateSize
		Update size and position of the window inner components
	
	Returns:
		(void)
	*/
	updateSize: function(){
		element = this.element.getComputedSize();

		if (this.options.head && !this.headSize) {
			this.headHeight = this.head.getComputedSize().totalHeight;
		}
		if (this.options.foot && !this.footSize) { 
			this.footHeight = this.foot.getComputedSize().totalHeight;
		}
		if (this.options.tabView) { 
			this.view.tabbar.setStyle('width', element.x);
		}
		if (this.paint && this.props.layers.head.size) {
			this.props.layers.head.size[1] = this.head.getSize().y;
			this.skin.inactive.layers.head.size[1] = this.head.getSize().y;
		}
		var view = this.view.element.getComputedSize();
		var viewHeight = element.height - this.headHeight - this.footHeight - (view.computedBottom + view.computedTop);
		this.view.setStyle('height', viewHeight);
		this.view.fireEvent('onResize');
	},

	/*
	Function: setSize
		Set window's frame size and updateSize
	
	Returns:
		this
	
	See also:
		<UI.Element::setSize>			
	*/  

	setSize: function(width, height, state){
		this.parent(width, height, state);
		this.updateSize();
		
		return this;
	},	
	
	/* 
	Function: setTitle
		set title html
	
	Arguments:
		html - (string) html formatted title
	
	Returns:
		this
	*/
	setTitle: function(html){
		return this.title.set('html',html);

	},

	/*
    Function: setContent
    	Set Content of the Window View. See <UI.View::setContent> for arguments details
    
    Arguments:
    	method - (string)
    	source - (string)
    	options - (object)
    
    Returns:
    	this
	*/
	
	setContent: function(method,source,options){
		return this.view.setContent(method,source,options);
	},
	
	/*
    Function: setStatus
    	Set Status of the Window foot
    
    Arguments:
    	html - (string) html formatted new status
    
    Returns:
    	this
	*/
	setStatus: function(html){
		this.status.set('html',html);
		return this;		
	},

	/*
	Function: control
		handle window controls' actions
      
	Arguments:
		actions - (string) minimize,maximize,close
	
	Returns:
		this
	*/	
	control: function(action){
		this[action]();
		return this;
	},
	
	/*
    Function: close
		Close window
      
	Returns:
		(void)
	*/	
	close: function(){
		ui.controller.window.close(this);
		
		this.fireEvent('onClose');
	}
});

/*
	Object: ui.controller.window
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
	
	
	Implied global:
		ui,
		$defined,
		window

	Members:
		active, addEvent, bind, blur, cascade, clean, client, close, 
	    closeAll, controller, destroy, each, element, fireEvent, focus, 
	    getCascadeLocation, getCoordinates, getHeight, getMinimizedLocation, 
	    getStyle, getWidth, height, hide, left, length, list, location, log, 
	    minimized, morph, offsetHeight, offsetWidth, options, 
	    propagateUnderShadow, push, register, resetMinimizedLocation, 
	    resizeMaximizedWindow, s, setLocation, setSize, setState, setStyle, 
	    stack, start, state, step, style, toInt, top, version, width, window, x, 
	    y, zBase, zIndex, zStep
	
	Discussion:
		Stacks should be better implemented
		
*/

ui.controller.window = {
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
			},
			offset : [170,50]
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
	
	start: function(){
		this.list = [];
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
		this.list.push(win);
		if (win.options.zIndex == 'auto') {
			win.element.setStyle('zIndex', this.zIndex);
		}
		else {
			win.element.setStyle('zIndex', win.options.zIndex);
		}
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
		for (var i = this.list.length - 1; i >= 0; i--) {
			if (this.list[i] == win) {
				win.destroy();
				delete this.list[i];
				this.list = this.list.clean();
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
			for (var i = this.list.length - 1; i >= 0; i--) {
				var windowZIndex = this.list[i].element.getStyle('zIndex');
				if (windowZIndex >= zIndex && !this.list[i].minimized) {
					window = this.list[i];
					zIndex = windowZIndex;
				}
			}
			
			if (window) {
				window.focus();
			}
			
			return;
		} else if (win && this.active != win) {
			if (this.active && !this.active.minimized) {
				this.blur(this.active);
			}
			
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
	
	minimize: function() {
		this.active.minimize();
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
		
		this.list.each(function(w,i) {
			if (w.state == 'minimized') {
				x += w.getStyle('width').toInt() + 8;
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
		this.list.each(function(win) {
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
		this.list.each(function(win) {
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
			left : 71,
			top : 121
		};
		
		this.list.each(function(w,i) {
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
		this.list.each(function(win,i) {
			var c = win.element.getCoordinates();
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
		var start = [51,101];
		var offset = [20,20];
		var zIndex = this.zIndex;
		var last;
		
		this.list.each(function(win){
			if (win.state != 'minimized') {
				
				win.element.style.zIndex = zIndex++;
				
				start[0] += offset[0];
				start[1] += offset[1];
				
				win.element.morph({
					'left': start[0],
					'top': start[1]
				});
				
				win.location = 'cascade';
				last = win;
			}
		});
		
		this.zIndex = zIndex;
	},
	
	closeAll: function(){
		this.list.each(function(win){
			this.close(win);			
		},this);
	}
};

ui.controller.window.start();



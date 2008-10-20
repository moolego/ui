/*

Class: UI.Window
	The UI.Window class defines objects that manage and coordinate the windows 
	an application displays on the screen.

Require:
	UI.Element, UI.Canvas, UI.Skin, UI.Button, UI.View.

Inherits from:
	UI.Element - As window container.

Arguments:
	Options
	
Options: 

	title - (string) title displayed in the head titlebar.
	type - (string) define the type of the window (default, transparent).
	location - ('custom','center','cascade')  override top and left options if defined - default to custom.
	width - (number) Width of the container wrapper in px.
	height - (number) Height  of the container wrapper in px.
	top	- (number) Height  of the container wrapper in px.
	left - (number) Height  of the container wrapper in px.
	state - ('normalized','maximized','normalized') Define the initial state - default to normalized.
	useEffects - (boolean) Define if effects should be implemented.
	resizable - (boolean) Define if the window is resizable.
	draggable - (boolean) Define if the window is draggable.
	scrollbar - (boolean) Define if the container should use scrollbar.
	register - (bollean) Define if the window should be handle by the window manager.
	status - (bollean) Define if the window should use a statusbar.
	url	- (string) Define the url from the window content.

Example:
	(start code)
	var win = new UI.Window({
		width 	: 260,
		height	: 400,
		title	: 'bonjour',
	}).setContent('iframe','http://www.iframework.org');
	(end)
*/

UI.Window = new Class({
	Extends						: UI.Element,
	Implements					: [Events, Options],
	options						: {
		component				: 'window',
		
		title					: 'Window',

		// Size options
		width					: 640,
		height					: 480,
		
		// see UI.VIew.setContent() for information about loading window's content.
		url						: false,

		// location options
		location				: 'cascade',
		top						: 0,
		left					: 0,	
		zIndex					: 'auto',   // to get zIndex from themanager or an Int as zIndex
		
		elementTag				: 'div',
		
		// Components Options
		head					: true,
		controls				: ['close','minimize','maximize'],

		foot					: true,
	
		// Not Implemented should be able to enable/disable effects
		useEffects				: false,
		
		// Drag options
		draggable				: true,
		dragLimitX				: [-1000, window.getWidth() + 1000],
		dragLimitY				: [53, window.getHeight() + 1000],
		
		// Resize options
		resizable				: true,
		resizeLimitX			: [200, window.getWidth()],
		resizeLimitY			: [200, window.getHeight()],
		
		// Main View Options
		viewOverflow			: 'scrollbar',
		viewBackgroundColor		: '#fff',
		
		// Implemented events
		onResize			: $empty,
		onMinimize			: $empty,
		onMaximize			: $empty,
		onRestore			: $empty,
		onLoad				: $empty,
		onBlur				: $empty,
		onFocus				: $empty,
		onClose				: $empty
	},

	/*
	    Function: initialize
	    	Constructor
	*/
	
	initialize: function(options) {
		// handle window manager singleton class
		this.controller = new UI.Controller.Window();
		
		// set specific styles for window element
		this.location = this.getInitialLocation();
		this.options.styles.top = this.location.top;
		this.options.styles.left = this.location.left;
		
		// call parent constructor
		this.parent(options);
		//this.focus();
	},

	
	/*
	    Function: build
	
	      Creates html structure and inject it to the dom.
	*/
	
	build: function() {	
		// call parent builder
		this.parent()
		
		
		this.setHead();
		this.setView();
		this.setFoot();
		this.setOverlay();
		
		this.coordinates = this.element.getCoordinates();
		
		this.inject(this.options.container || document.body);
	},
	

	/* 
		Function: setHead
			Create a new head element, set class and styles and inject
	*/	

	setHead : function() {
		var bs = this.skinProperties.borderSize;
		this.head = new Element('div', { 
			'class' 		: this.className +'-head',
			styles 			: {
				position 	: 'relative',
				overflow 	: 'hidden',
				width		: '100%',
			 	left		: bs,
			 	top			: bs,
			 	width		: this.options.width - (bs * 2),
				zIndex		: 1
			}
		}).inject(this.element);
		this.head.disableSelect();
		
		this.setControls();
		
		this.title = new UI.Label({	
			type 	: 'windowTitle',
			html	: this.options.title
		}).inject(this.head);
		
	},
	
	/* 
		Function: setView
			Create a new view and attach related events window
	*/	

	setView : function() {
		this.view = new UI.View({
			type				: this.skinProperties.components.view.type,
			overflow			: this.options.viewOverflow,
			className			: this.className + '-view',
			styles				: {
				marginLeft: this.skinProperties.borderSize
			}
			//overflow			: (this.options.tabView) ? 'hidden' : 'scrollbar'
		}).inject(this.element);
		
		this.content = this.view.content;
		
		this.setTabView();
		
		this.addEvents({
			//onResizeDrag	: function() { this.view.fireEvent('onResize');  },
			onMinimize 		: function() { this.view.hide(); },
			onNormalize 	: function() { this.view.show(); },
			onLoadComplete	: function() { this.view.updateSize(); }
		});
	},


	/* 
		Function: setTabView
			Create a new view and attach related events window
	*/	

	setTabView : function() {
		if (this.options.tabView) {
			this.options.tabView.container = this.view.content;
			this.tabView = new UI.TabView(this.options.tabView);
		}
	},

	/* 
		Function: setFoot
			Create a new foot container and inject resize handler and statusbar in it
	*/

	setFoot: function() {
		if (this.options.foot) {
			this.foot = new Element('div', {
				'class'				: this.className+'-foot',
				styles : {
					zIndex:10,
					position		: 'relative',
				    right			: '0',
				   	width			: '100%',
					height			: this.skinProperties.footHeight,
					left 			: this.skinProperties.borderSize
				}  
			}).inject(this.element);
			this.foot.disableSelect();
			
			if (this.options.resizable) {
				this.resize = new Element('div', {
					styles: {
						position: 'absolute',
						right: 0,
						marginBottom: 0,
						width: '24px',
						height: '24px'
					}
				}).inject(this.foot);
			}
			
			this.addEvents({
				'onMinimize'	: function(){ this.foot.hide();	},
				'onNormalize'	: function(){ this.foot.show(); }
			});
			
			this.setStatus();
		}
	},


	/*
	    Function: setToolbar
			Sets the window's toolbar. and attach related events
			
		Note: 	it should be passed as options when the application instanciates its window
	*/
	
	setToolbar: function(toolbar) {
		this.toolbar = new UI.Toolbar(toolbar).inject(this.head);

		// not really nice... 
		this.skinProperties.layers.underlay.size[1] = this.head.getSize().y;

		this.updateSize();
		
		this.addEvents({
			onMinimize 			: function() { this.toolbar.content.hide() },
			onNormalize 		: function() { this.toolbar.content.show() },
			obBlur				: function() { 	this.toolbar.content.setStyle('opacity',.5) },
			obFocus				: function() { 	this.toolbar.content.setStyle('opacity',1) }
		});
		
		new UI.Button({
			type		: 'toggleToolbar',
			label		: false,
			styles		: {
				position: 'absolute',
				top		: 5,
				right	: 10,
				margin	: 0,
				padding	: 0
			},
			onClick		: this.toggleToolbar.bind(this)
		}).inject(this.head);	
		
		return this;
	},

	/*
	    Function: setContent
	    	Set Content of the Window View
	*/
	
	setContent: function(method,source,options){
		this.view.setContent(method,source,options);
		return this;
	},
				
	/*
	    Method: toggleToolbar
			The action method for the "Hide Toolbar" menu item (which alternates with "Show Toolbar").
			
		Note: 	it should be passed as options when the application instanciates its window
	*/
	
	toggleToolbar: function() {
		if (this.toolbar.element.getStyle('display') == 'block') {
			this.skinProperties.layers.underlay.size[1] = this.head.getSize().y;
			this.toolbar.element.hide();
			this.updateSize();
		} else {
			this.toolbar.element.show();
			this.skinProperties.layers.underlay.size[1] = this.head.getSize().y;
			this.updateSize();
		}
	},
	
	setStatus : function() {
		if (!this.status) {
			this.status = new Element('div', {
				styles: {
					fontFamily: this.skinProperties.fontFamily,
					fontSize: '0.75em',
					padding: '3px 16px',
					height: '16px',
					width: '50%'
				}
			}).inject(this.foot);
		};
		
		this.status.set('html',status);
		return this;		
	},

	/* 
		Function: setOverlay
			create a new overlay object 
	*/

	setOverlay: function() {
		this.overlay = new Element('div',{ 
			styles : {
				backgroundColor: '#fff',
				opacity:'.2',
				top:0,
				left:0,
			    position: 'absolute',
			    height: '100%',
			    width: '100%',
				zIndex	: '100000'
			}})
		 .inject(this.view.element);

		this.addEvents({
			'onBlur' : function() { this.overlay.show(); },
			'onFocus' : function() { this.overlay.hide(); },
			'onResizeStart' : function() { this.overlay.show(); },
			'onResizeComplete' : function() { this.overlay.hide(); },
			'onDragStart' : function() { this.overlay.show(); },
			'onDragComplete' : function() { this.overlay.hide(); }
		});
	},

	/*
	    Function: setBeahaviours
	    	Define the spcific window behaviours
	*/
	
	setBehavior: function(){
		this.parent();

		this.element.addEvents({
			mousedown 	: function(){this.focus()}.bind(this)
		});
	},

	/*
		Function: enableDrag
				Add draggable capabilities for the window.
	*/

	enableDrag :function() {
		this.parent();
		
		this.addEvents({
			onDragComplete 	: function() { this.options.location = 'custom' },
			onMinimize 		: function() { this.disableDrag(); },
			onNormalize 	: function() { this.enableDrag(); }
		});
		
		this.element.setStyle('position','absolute');
	},	

	/*
		Function: getInitialLocation
			Return the initial location depending on location options
	*/

	getInitialLocation: function() {
		if (this.options.location == 'center') {
			return this.getCenterLocation();
		} else if (this.options.location == 'cascade') {
			var c = this.controller.getCascadeLocation(this)
			return { top : c.top, left : c.left };
		} else {
			return { top : this.options.top, left: this.options.left };
		}
	},

	/*
	    Function: setControls
	      Create window controls that allow window close, maximize and minimize
	*/
	
	setControls: function() {
		var actions = this.options.controls;
		
		this.controls = new Element('div',{
			 styles : {
			 	'float'				: 'left',
	    		padding				: this.skinProperties.controlsPadding,
				height				: this.skinProperties.controlHeight
			}
		 }).inject(this.head);
		
		actions.each(function(action){
			new UI.Button({
				type		: this.skinProperties.components.control.type,
				className	: this.className + '-' + action,
				label		: false,
				width		: this.skinProperties.components.control.width,
				height		: this.skinProperties.components.control.height,
				styles		: {
					margin : this.skinProperties.components.controls.padding
				},
				onClick		: this.control.bind(this, action)
			}).inject(this.controls);	
		},this);
		
		this.addEvents({
			'onMinimize': function(){
				this.controls.hide();
			},
			'onNormalize': function(){
				this.controls.show();
			}
		});
	},


	/*
	    Function: setSize
	    	Set window's frame size and updateSize
	*/	

	setSize: function(width,height) {
		this.parent(width,height);
		this.updateSize();
	},
	
	
	/*
	    Function: updateSize
	      Update size and position of the window inner components
	*/

	updateSize : function(opt) {
		var element = this.element.getSize();
		
		var bs = this.skinProperties.borderSize;
		var borderOffset = bs*2;
		
		var offsetHeight = 0;
		var topView = 0;
		
		if (this.options.head) { 
			offsetHeight = offsetHeight + this.head.getSize().y;
			topView = this.head.getSize().y;
		}
		
		if (this.options.foot) { 
			offsetHeight = offsetHeight + this.foot.getSize().y;
		}
		
		if (this.options.tabView) { 
			var height = this.tabView.tabs.getSize().y;
			offsetHeight = offsetHeight + height;
			topView = topView + height;
		}
		
		var viewHeight = element.y - offsetHeight;
		
		if (this.options.head) {
			this.head.setStyles({
				width: element.x - borderOffset
			});
		}
		this.skinProperties.layers.underlay.size[1] = this.head.getSize().y;
		
		if (this.options.tabView) {
			this.tabView.tabs.setStyles({
				left	: bs,
				width	: element.x - borderOffset,
				top		: this.head.getStyle('height').toInt() + bs
			});
		}
		
		this.view.element.setStyles({ 
			top		: bs,
			width	: element.x - borderOffset,	
			height	: viewHeight -  borderOffset
		});
		
		if (this.options.foot) {
			this.foot.setStyles({
				bottom	: -bs,
				width	: element.x - borderOffset
			});
		}
		this.view.updateSize();
	},

	/*

    Function: minimize
		This action method removes the window from the screen list and displays the minimized window
	*/

	minimize : function() {
		this.fireEvent('onMinimize');
		this.state = 'minimized';
		this.coordinates = this.element.getCoordinates();
		
		var size = this.controller.setMinimizedCoordinates();

		this.head.setStyle('width', size.width);
		this.element.setStyles(size);
	},

	/*
    Function: maximize
      This action method set the size to fit the window container
	*/

	maximize : function() {

		this.lastState = this.state;
		this.state = 'maximized';
				
		this.setSize(window.getWidth(),window.getHeight());
		this.fireEvent('onMaximize');
	},

	/*
		Function: normalize
			Normalize the current window
	*/

	normalize : function() {
		this.state = 'default';
		this.setStyles({
			left	: this.coordinates.x,
			top		: this.coordinates.y
		});
		this.setSize(this.coordinates.width,this.coordinates.height);
		this.fireEvent('onNormalize');
	},		

	/*
	    Function: control
	      Toggle state 
	      
		Arguments:
			actions - (minimize,maximize,close)
	*/	

	control : function(action) {
		if (action == 'minimize') {
			this.state == 'default' ?  this.minimize() : this.normalize();
		} else if (action == 'maximize') {
			this.state == 'default' ? this.maximize() : this.normalize();
		} else if (action == 'close') {
			this.close();
		};
	},

	/*
	    Function: focus
	      If minimize normalize and fireEvent OnFocus
	*/
	
	focus: function() {
		if (this.state == 'minimized') this.normalize();
		if (this.isActive) { return; }

		this.controller.focus(this);
		this.fireEvent('onFocus');
		this.setState('default');
		this.isActive = true;
		return;
	},

	/*
	    Function: blur
	      FireEvent onBlur and set isActiv to false
	*/	
	
	blur: function() {		
		this.setState('inactive');
		this.fireEvent('onBlur');
		this.isActive = false;
	},

	/*
	    Function: close
	      Close window and fireEvent 
	*/	
	
	inject : function(container){
		//this.updateSize();
		this.parent(container);
		this.canvas.canvas.addEvent('click', function(e){
			this.controller.propagateUnderShadow(e)}.bind(this)
		);
	},
	
	close : function() {
		this.hide();
		
		this.controller.destroy(this);
		
		this.fireEvent('onClose');
	}
});

/*

Class: UI.Window
	The UI.Window class defines objects that manage and coordinate the windows an application displays on the screen.

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
		
		tag						: 'div',
		
		// Components Options
		head					: true,
		view					: true,
		foot					: true,

		// 		
		controls				: ['close','minimize','maximize'],
	
		// Not Implemented should be able to enable/disable effects
		useEffects				: false,
		
		// Drag options
		draggable				: true,
		dragLimitX				: [-1000, window.getWidth() + 1000],
		dragLimitY				: [50, window.getHeight() + 1000],
		dragHandlers			: ['head','foot'],
		
		// Resize options
		resizable				: true,
		resizeLimitX			: [200, window.getWidth()],
		resizeLimitY			: [200, window.getHeight()],
		
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
		
		// call parent constructor
		this.parent(options);
		
		// set windnow position
		if (this.options.component == 'window') {
			this.element.setStyles(this.getInitialLocation());
		}
		this.controller.focus(this);
		this.fireEvent('focus');
		this.isActive = true;
	},

	/*
	    Function: build
	
	      Creates html structure and inject it to the dom.
	*/
	
	build: function() {	
		// call parent builder
		this.parent()

		this.buildHead();
		this.buildView();
		this.buildFoot();
		this.buildOverlay();
		
		this.coordinates = this.element.getCoordinates();
		
		this.inject(this.options.container || document.body);
	},

	/* 
		Function: setHead
			Create a new head element, set class and styles and inject
	*/	

	buildHead : function() {
		this.head = new Element('div', this.props.components.head)
		.inject(this.element);
	
		this.dragHandlers.push(this.head);
		this.head.disableSelect();	
		this.buildControls();
		this.title = new UI.Label(this.props.components.title)
		.inject(this.head);
		
		this.setTitle(this.options.title);
		
		var width = this.controls.getSize().x;
		width = 70;
		
		if (this.props.components.controls.styles['float'] == 'right') { 
			this.title.element.setStyle('paddingLeft',width); 
		} else { 
			this.title.element.setStyle('paddingRight',width) 
		}
	},

	/*
	    Function: setControls
	      Create window controls that allow window close, maximize and minimize
	*/
	
	buildControls: function() {
		if (!this.options.controls) { return }
		
		var controllist = new Array();
		
		this.controls = new Element('div',this.props.components.controls)
		.addEvents({
			mouseenter	: function() {
				controllist.each(function(button) {
					button.setState('over');
					button.set('html', '');
					
				})
			},
			mouseleave	: function() {
				controllist.each(function(button) {
					button.setState('over');
					button.set('html', '');
					
				})
			}
		})
		.inject(this.head);
		
		this.options.controls.each(function(action){
			this.props.components.control.type = action;

			var button = new UI.Button(this.props.components.control)
			.addEvent('onClick', this.control.bind(this, action))
			.inject(this.controls);	
			
			controllist.push(button);
		},this);
		
		this.addEvents({
			'onMinimize': function() { this.controls.hide() },
			'onNormalize': function() { this.controls.show() }
		});
	},
	
	/*
	    Function: setToolbar
			Sets the window's toolbar. and attach related events
			
		Note: 	it should be passed as options when the application instanciates its window
	*/
	
	buildToolbar: function(toolbar) {
		this.toolbar = new UI.Toolbar(toolbar).inject(this.head);

		// not really nice because related to a specific layer ... 
		this.props.layers.underlay.size[1] = this.head.getSize().y;
		this.updateSize();
		
		this.addEvents({
			onMinimize 			: function() { this.toolbar.content.hide() },
			onNormalize 		: function() { this.toolbar.content.show() },
			obBlur				: function() { this.toolbar.content.setStyle('opacity',.5) },
			obFocus				: function() { this.toolbar.content.setStyle('opacity',1) }
		});
		
		new UI.Button(this.props.components.toggle)
		.addEvent('onClick', this.toggleToolbar.bind(this))
		.inject(this.head);	
		
		return this;
	},

	/* 
		Function: setView
			Create a new view of the define type and attach related window events
	*/	

	buildView : function() {
		if (this.options.tabView) {
			var options = this.options.tabView;
			
			this.options.tabView.container = this.element;
			
			this.view = new UI.TabView(this.options.tabView)
			.setStyles({
				position	: 'absolute',
				top 		: this.props.borderSize,
				left 		: this.props.borderSize
			}).inject(this.element);
			
			this.view.tabbar.setStyles({
				width 	: this.options.width - this.props.borderSize
			});
			
		} else {
			// should be merge depending on certain conditions 
			
			if (!this.options.view.type) 
			 this.options.view.type = this.props.components.view.type;
			 
			if (this.options.viewOverflow) 
			 this.options.view.overflow = this.options.viewOverflow;

			var props = $merge(this.props.components.view,this.options.view);
			
			this.view = new UI.View(props)
			.inject(this.element);
			
			this.addEvents('injected', function() {
				console.log('injected');
				this.view.fireEvent('onResize');
			});
		}

		this.content = this.view.content;

		this.addEvents({
			onMinimize 		: function() { this.view.hide(); },
			onNormalize 	: function() { this.view.show(); }
		});
	},

	/* 
		Function: setOverlay
			create a new overlay object 
	*/

	buildOverlay: function() {
		/*
		this.overlay = new Element('div',this.props.components.overlay)
		 .inject(this.view.element);

		this.addEvents({
			'onBlur' : function() { this.overlay.show(); },
			'onFocus' : function() { this.overlay.hide(); },
			'onResizeStart' : function() { this.overlay.show(); },
			'onResizeComplete' : function() { this.overlay.hide(); },
			'onDragStart' : function() { this.overlay.show(); },
			'onDragComplete' : function() { this.overlay.hide(); }
		});
		*/
	},

	/* 
		Function: setFoot
			Create a new foot container and inject resize handler and statusbar in it
	*/

	buildFoot: function() {
		if (!this.options.foot || this.foot) { return };
		
		this.foot = new Element('div', this.props.components.foot)
		.inject(this.element);

		this.foot.disableSelect();
		
		if (this.options.resizable) {
			this.buildResizeHandler();	
		}
			
		this.status = new Element('div',this.props.components.status)
		.inject(this.foot);
		
		this.dragHandlers.push(this.status);
		
		this.setStatus();
	},

	/*
		Function: buildResizeHandler
			Create a new element as resize handler
		
	 */
	
	buildResizeHandler : function() {
		this.resize = new UI.Element({
			component		: 'element',
			type			: 'resizeHandler'
		})
	//	.addEvent('mousedown', function(e) { new Event(e).stop() })
		
		.inject(this.foot);
	},

	/*
		Method: toggleToolbar
			The action method for the "Hide Toolbar" menu item (which alternates with "Show Toolbar").
		
		Note:   it should be passed as options when the application instanciates its window
	*/
	
	toggleToolbar: function() {
		if (this.toolbar.element.getStyle('display') == 'block') {
			this.props.layers.underlay.size[1] = this.head.getSize().y;
			this.toolbar.element.hide();
		} else {
			this.toolbar.element.show();
			this.props.layers.underlay.size[1] = this.head.getSize().y;
		}
		
		this.updateSize();
		this.fireEvent('setCanvasSize', this.state);
	},


	/*
	    Function: setBeahaviours
	    	Define the spcific window behaviours
	*/
	
	setBehavior: function(){
		this.parent();

		this.element.addEvent('mousedown', this.focus.bind(this));
		
		this.addEvents({
			resizeComplete: function(){
				this.options.width = this.element.getCoordinates().width;
				this.options.height = this.element.getCoordinates().height;
			}.bind(this)
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

    Function: minimize
		This action method displays the minimized window
	*/

	minimize : function() {
		/*if(this.minimized) {
			this.normalize();
		} else {
			if (!this.maximized) this.coordinates = this.element.getCoordinates();
			
			var size = this.controller.setMinimizedCoordinates();
			this.head.setStyle('width', size.width);
			this.element.setStyles(size);
			
			this.maximized = false;
			this.minimized = true;

			this.fireEvent('onMinimize');
		}*/
	},

	/*
	    Function: maximize
	      This action method set the size to fit the window container
	*/

	maximize : function() {
		if(this.maximized) {
			this.normalize();
		} else {
			if (!this.minimized) this.coordinates = this.element.getCoordinates();
			this.setSize(window.getWidth(),window.getHeight()-this.options.dragLimitY[0]);
			this.element.setStyles({
				top : this.options.dragLimitY[0],
				left : 0
			})
			this.minimized = false;
			this.maximized = true;
			this.fireEvent('onMaximize');
		}
	},

	/*
		Function: normalize
			Normalize the current window
	*/

	normalize : function() {
		this.setStyles({
			left	: this.coordinates.left,
			top		: this.coordinates.top
		});
		
		this.setSize(this.coordinates.width,this.coordinates.height);
		
		this.maximized = false;
		this.minimized = false;
		
		this.fireEvent('onNormalize');
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
	    Function: updateSize
	      Update size and position of the window inner components
	*/

	updateSize : function(opt) {
		var element = this.element.getSize();
		
		var bs = this.props.borderSize;
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
			var height = this.view.tabbar.getSize().y;
			offsetHeight = offsetHeight + height;
			topView = topView + height;
			this.view.tabbar.setStyle('width', element.x - borderOffset);
		}

		var viewHeight = element.y - offsetHeight;
		
		if (this.options.head) {
			this.head.setStyles({
				width: element.x - borderOffset
			});
		}
		
		this.props.layers.underlay.size[1] = this.head.getSize().y;
		this.skin['inactive'].layers.underlay.size[1] = this.head.getSize().y;
	
		this.view.element.setStyles({ 
			top		: bs + topView,
			width	: element.x - borderOffset,	
			height	: viewHeight -  borderOffset
		});
		
		if (this.options.foot) {
			this.foot.setStyles({
				bottom	: -bs,
				width	: element.x - borderOffset
			});
		}
		
		this.view.fireEvent('onResize');
	},

	
	 /*
		Function: setSize
			Set window's frame size and updateSize
			
	*/  
	 
	setSize: function(width,height, state) {
		this.parent(width,height, state);
		this.updateSize();
	},	
	
	/* 
		Function: setTitle
			set title html 
			
	 */
	
	setTitle : function(html) {
		this.title.set('html',html);
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
	    Function: setStatus
	    	Set Status of the Window foot
	*/

	setStatus : function(html) {
		this.status.set('html',html);
		return this;		
	},

	/*
	    Function: control
	      Toggle state 
	      
		Arguments:
			actions - (minimize,maximize,close)
	*/	

	control : function(action) {
		if (action == 'minimize') this.minimize();
		else if (action == 'maximize') this.maximize();
		else if (action == 'close') this.close();
	},

	/*
	    Function: close
			Close window
	      
		Arguments:
			actions - (minimize,maximize,close)
	*/	
	
	close : function() {
		this.controller.close(this);
		this.fireEvent('onClose');
	}
});

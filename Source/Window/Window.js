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
		title - (string) title displayed in the head titlebar.
		type - (string) define the type of the window (default, transparent).
		location - (string)  Could be either 'custom','center' or 'cascade'. Override top and left options if defined - default to custom.
		width - (number) Width of the container wrapper in px.
		height - (number) Height  of the container wrapper in px.
		top	- (number) Position of the container wrapper in px from the top.
		left - (number) Position of the container wrapper in px from the left.
		right - (number) Position of the container wrapper in px from the right.
		bottom - (number) Position of the container wrapper in px from the bottom.
		position - (string) Define if position is "fixed". Default to 'absolute.
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
	
	Discussion:
		Effects still need to be implemented as option
*/

UI.Window = new Class({
	Extends						: UI.Element,
	options						: {
		component				: 'window',
		
		title					: 'Window',

		// Size options
		width					: 640,
		height					: 480,

		// location options
		location				: 'cascade',
		position				: 'absolute',
		top						: false,
		left					: false,
		right					: false,
		bottom					: false,
		zIndex					: 'auto',   // to get zIndex from themanager or an Int as zIndex
		
		tag						: 'div',
		
		// Components Options
		head					: true,
		view					: {},
		foot					: true,

		// 		
		controls				: ['close','minimize','maximize'],
		scrollbar				: true,
	
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
		resizeOnDragIfMaximized	: false,
		
		// Implemented events
		onMinimize			: $empty,
		onMaximize			: $empty,
		onRestore			: $empty,
		onLoad				: $empty,
		onBlur				: $empty,
		onFocus				: $empty,
		onClose				: $empty
	},

	/* 
	Constructor: initialize
		Construtor
	
	Arguments:
		options - (object) options
	
	See also:
		<UI.Element::initialize>
	*/
	
	initialize: function(options) {
		// handle window manager singleton class
		this.controller = ui.windowController;
		
		// call parent constructor
		this.parent(options);
		
		// set windnow position
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

		this.controller.focus(this);
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
		// call parent builder
		this.parent()

		this.buildHead();
		this.buildView();
		this.buildFoot();
		
		this.inject(this.options.container || document.body);
		
		this.canvas.canvas.addEvent('click', function(e){this.controller.propagateUnderShadow(e)}.bind(this));
	},

	/* 
	Function: buildHead
		private function
		
		Create a new head element, set class and styles and inject
	
	Returns:
		(void)
	*/	

	buildHead : function() {
		this.head = new Element('div', this.props.components.head)
		.inject(this.element);
	
		this.dragHandlers.push(this.head);
		this.head.disableSelect();	
		this.buildControls();
		
		if (this.options.skin) 
		 this.props.components.title.skin = this.options.skin;
		
		this.title = new UI.Label(this.props.components.title)
		 .inject(this.head);
		
		this.setTitle(this.options.title);
		
		this.addEvent('onIntected', function(){
			
			var width = this.controls.getSize().x;
		
			console.log('test:',width);
			
		})
		width = 0;
		
		if (this.props.components.controls.styles['float'] == 'right') { 
			this.title.element.setStyle('paddingLeft',width); 
		} else { 
			this.title.element.setStyle('paddingRight',width) 
		}
		
		if (this.options.toolbar) this.buildToolbar(this.options.toolbar);
	},

	/*
	Function: setControls
		private function
		
		Create window controls that allow window close, maximize and minimize
	
	Returns:
		(void)
	*/
	
	buildControls: function() {
		if (!this.options.controls) { return }
		
		var controllist = new Array();

		this.controls = new Element('div',this.props.components.controls)
		
		.addEvents({
			mouseenter	: function() {
				controllist.each(function(button) {
					button.setState('over');
				})
			},
			mouseover	: function() {
				controllist.each(function(button) {
					button.setState('over');
				})
			},
			mouseleave	: function() {
				controllist.each(function(button) {
					button.setState('default');					
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
    Function: buildToolbar
    	Build the window's toolbar. and attach related events
    
    Arguments:
    	toolbar - (object) Toolbar's options object. See <UI.Toolbar>
    
    Returns:
    	this
		
	Discussion:
		it should be passed as options when the application instanciates its window
	*/
	
	buildToolbar: function(toolbar) {
		this.toolbar = new UI.Toolbar(toolbar).inject(this.head);

		// not really nice because related to a specific layer ... 
		this.props.layers.underlay.size[1] = this.head.getSize().y;
		
		var toggle = new UI.Button(this.props.components.toggle)
		.addEvent('onClick', this.toggleToolbar.bind(this))
		.inject(this.head);	
		
		this.addEvents({
			onMinimize 			: function() { 
				this.toolbar.element.hide() ;
				toggle.hide();
			},
			onNormalize			: function() {
				this.toolbar.element.show();
				toggle.show();
			}
		});
		
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
			
			if (this.options.skin) 
			 this.options.view.skin = this.options.skin;
			
			if (!this.options.view.type) 
			 this.options.view.type = this.props.components.view.type;

			if (this.options.scrollbar == false) 
			 this.options.view.overflow = this.options.viewOverflow;

			var props = $merge(this.props.components.view,this.options.view);
			
			this.view = new UI.View(props)
			.inject(this.element);
			
			this.addEvents({
				'injected'		: function() { this.view.fireEvent('onResize'); },
				onMinimize 		: function() { this.view.hide(); },
				onNormalize 	: function() { this.foot.show(); this.view.show(); this.setSize(); }
			});
		}

		this.content = this.view.content;
	},

	/* 
	Function: buildFoot
		private function
		
		Create a new foot container and inject resize handler and statusbar in it
	
	Returns:
		(void)
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
		
		this.addEvents({
			'onMinimize' : function() { this.foot.hide(); },
			'onNormalize' : function() { this.foot.show(); }
		});
	},

	/*
	Function: buildResizeHandler
		private function
		
		Create a new element as resize handler
	
	Returns:
		(void)
	 */
	
	buildResizeHandler : function() {
		this.resize = new UI.Element({
			component		: 'element',
			type			: 'resizeHandler'
		}).inject(this.foot);
	},

	/*
	Method: toggleToolbar
		The action method for the "Hide Toolbar" menu item (which alternates with "Show Toolbar").
	
	Returns:
		this
	*/
	
	toggleToolbar: function() {
		if (this.toolbar.element.getStyle('display') == 'block') {
			this.props.layers.underlay.size[1] = this.head.getSize().y;
			this.toolbar.element.hide();
		} else {
			this.toolbar.element.setStyles({
				opacity : 1,
				visibility : 'visible',
				display : 'block'
			});
			this.props.layers.underlay.size[1] = this.head.getSize().y;
		}
		
		this.updateSize();
		this.fireEvent('canvasDraw', this.state);
		
		return this;
	},


	/*
	    Function: setBehavior
	    	private function
	    	
	    	Define the specific window behavior
	    
	    Returns:
	    	(void)
	    
	    See also:
	    	<UI.Element::setBehavior>
	*/
	
	setBehavior: function(){
		this.parent();
		
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
			'onBlur' : function() { this.view.overlay.show(); },
			'onFocus' : function() { this.view.overlay.hide(); },
			'onResizeStart' : function() { this.view.overlay.show(); },
			'onResizeComplete' : function() { this.view.overlay.hide(); },
			'onDragStart' : function() { this.view.overlay.show(); },
			'onDragComplete' : function() { this.view.overlay.hide(); }
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

	enableDrag :function() {
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
	
	focus: function() {
		if (this.minimized) {
			this.normalize();
			this.controller.resetMinimizedLocation();
		} else if (this.maximized && this.options.resizeOnDragIfMaximized) {
			this.normalize();
		} else {
			this.controller.focus(this);
		}
		
		if (this.state != 'default') this.setState('default');
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
			width : this.skin['minimized'].width,
			height : this.skin['minimized'].height
		};
		this.setState('minimized', size);
		var coord = this.controller.getMinimizedLocation();
		this.setLocation(coord[0], coord[1], 'morph');
		this.setStyle('position', 'fixed');
		this.controller.focus();
	},

	/*
	Function: maximize
		private function
		
		This action method set the size to fit the window container
	
	Returns:
		(void)
	*/

	maximize : function() {
		if(this.maximized) {
			this.normalize();
		} else {
			this.setSize(window.getWidth(),window.getHeight()-this.options.dragLimitY[0]);
			var coord = this.getCoordinates();
			this.options.top = coord.top;
			this.options.left = coord.left;
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
		Normalize window
	
	Returns:
		(void)
	*/

	normalize : function() {
		
		this.fireEvent('onNormalize');
		var size = {
			width : false,
			height : false
		};
		this.setState('default', size);
		
		this.setLocation();
		
		this.controller.focus(this);
		
		this.maximized = false;
		this.minimized = false;
		
		
	},		

	/*
	Function: getInitialLocation
		private function
		
		Return the initial location depending on location options and window's size
	
	Returns:
		coordinates - (object) Object containing top and left properties
	*/

	getInitialLocation: function() {
		if (this.options.top || this.options.right || this.options.bottom || this.options.left) {
			//right || left
			var left = (this.options.right && !this.options.left) ? 
				window.getWidth() - this.options.right - this.options.width : 
				this.options.left;
			
			//top || bottom
			var top = (this.options.bottom && !this.options.top) ? 
				window.getHeight() - this.options.bottom - this.options.height : 
				this.options.top;
			
			return { 
				top : top, 
				left: left
			};
		} else if (this.options.location == 'center') {
			return this.getCenterLocation();
		} else {
			var c = this.controller.getCascadeLocation(this)
			return { top : c.top, left : c.left };
		}
	},

	
	/*
	Function: updateSize
		Update size and position of the window inner components
	
	Returns:
		(void)
	*/

	updateSize : function() {
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
	
	Returns:
		this
	
	See also:
		<UI.Element::setSize>			
	*/  
	 
	setSize: function(width,height, state) {
		this.parent(width,height, state);
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
	
	setTitle : function(html) {
		this.title.set('html',html);
		return this;
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
		this.view.setContent(method,source,options);
		return this;
	},

	/*
    Function: setStatus
    	Set Status of the Window foot
    
    Arguments:
    	html - (string) html formatted new status
    
    Returns:
    	this
	*/

	setStatus : function(html) {
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

	control : function(action) {
		switch (action) {
			case 'minimize' :
				this.minimize();
				break;
			case 'maximize' : 
				this.maximize();
				break;
			case 'close' : 
				this.close();
				break;
		}
		
		return this;
	},

	/*
    Function: close
		Close window
      
	Returns:
		(void)
	*/	
	
	close : function() {
		this.controller.close(this);
	}
});

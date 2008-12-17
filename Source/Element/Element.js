/*
	Class: UI.Element
		UI.Element is the root class of most class of Moolego UI. It is used by :
			- <UI.View>
			- <UI.Window>
			- <UI.Menu> (also <UI.Context>)
			- Most Controls elements (<UI.Button>, ...)
	
	Arguments:
		Options
		
	Options: 
		lib - (string) The prefix used for element class
		component - (string) Component name, used for skinning
		type - (string) Type name, used for skinning
		state - (string) Default state applied on initialize
		
		className - (string) If this is defined, UI.Element will use this as element class name instead of generating one with options.lib, component and type
		tag - (string) The element tag. By default it is 'div'
		
		resizable - (boolean) Define if the element will be resizable. By default set to false
		draggable - (boolean) Define if the element will be draggable. By default set to false
		selectable - (boolean) Define if element content is selectable
		
		skin - (string) The skin name to use by default for components
		props - (object) Skin properties that will overwrite properties defined in skin sheet
		
		style - (object) Element styles properties that will overwrite styles defined in skin sheet
		
		onClick - (function) A function who will be fired on element click
		onMouseDown - (function) A function who will be fired on element mousedown
		onBuild - (function) A function who will be fired on element build start
		onBuildComplete - (function) A function who will be fired on element build complete
		onResizeStart - (function) A function who will be fired on element resize start
		onResize - (function) A function who will be fired on element resize
		onResizeComplete - (function) A function who will be fired on element complete
		onDragStart - (function) A function who will be fired on element drag start
		onDrag - (function) A function who will be fired on element drag
		onDragComplete - (function) A function who will be fired on element drag complete
		
	Example:
		(start code)
		var element = new UI.Element({
			html : 'Hello World'
		}).inject(document.body);
		(end)
	*/

UI.Element = new Class({
	Implements				: [Events, Options],
		
	options: {
		lib					: 'ui',

		component			: 'element',
		type				: 'default',
		state				: 'default',	
		
		className			: false,
		tag					: 'span',
		
		resizable			: false,
		draggable			: false,
		selectable			: true,

		skin				: 'AquaGraphite',
		props				: false,
		
		styles				: {},
		
		//devel
		debug				: false,
		
		//group id
		group				: false,
		
		// implemeted events
		onClick				: $empty,
		onMouseDown			: $empty,
		onBuild				: $empty,
		onBuildComplete		: $empty,
		onResizeStart		: $empty,
		onResize			: $empty,
		onResizeComplete	: $empty,
		onDragStart			: $empty,
		onDrag				: $empty,
		onDragComplete		: $empty,
		
		onShow				: $empty,
		onHide				: $empty
	},

	/* 
	Constructor: initialize
		Construtor
	
	Arguments:
		options - (object) options
	*/
	
	initialize: function(options){
		this.setOptions(options);
		if (!this.controller) this.controller = ui.controller;

		this.setClassName();
		this.setSkin();
		
       	this.build();

		this.setBehavior();
	},
	
	/* 
	Function: toElement
		This method allows to get the DOM element built with <UI.Element> in this way : 
		(start code)
		var myElement = new UI.Element({
			html : 'Hello World'
		}).inject(document.body);
		var coord = $(myElement).getCoordinates();
		(end)
		It will actually return myElement.element.
		
		But as most used mootools functions are directly reimplemented in <UI.Element>, you can most of time simply do :
		(start code)
		var myElement = new UI.Element({
			html : 'Hello World'
		}).inject(document.body);
		var coord = myElement.getCoordinates();
		(end)
	
	Return:
		this.element - (element) The DOM element
	*/
	
	toElement : function(){
		return this.element;
	},

	/* 
	Function: build
		private function
		
		Create a native element
	
	Return:
		(void)
	*/
	
	build : function(){
		this.fireEvent('build');

		this.element = new Element(this.options.tag, {
			'class' : this.className,
			styles	: this.props.styles,
			events	: this.options.events,
			id		: this.options.id,
			name	: this.options.name,
			html	: this.options.html,
			'for'	: this.options['for']
		});
		
		//this.element.setStyle('visibility', 'hidden');
		if (!this.options.selectable) this.element.disableSelect();
		this.element.ui = true;
		this.state = this.options.state;
		this.dragHandlers = [];
	},

	/*
	Function: setClassName
		private function
		
		define class name from this.options.lib, component and type or with className if defined
		
	Return:
		(void)
	 */
	
	setClassName : function() {
		if (this.options.className) {
			this.className = this.options.className;
		} else {
			this.className = this.options.lib + '-' + this.options.component;
			
			if (this.options.type != 'default') 
				this.className = this.className + '-' + this.options.type;
			if (this.options.state != 'default') 
				this.className = this.className + '-' + this.options.state;
		}
	},
	
	/* 
		Method: setSkin
		private function
	
		Get the skin for the current component and set this props with default properties
	
	Return:
		(void)
	 */
	
	setSkin: function(){
		UI.skin = new UI.Skin(this.options.skin);
		
		this.skin = UI.skin.get(this);
		
		this.props = this.skin[this.options.state];
	},
	
	/* 
	Method: setCanvas
		private function
	
		Create a canvas element inject it and add a redraw event
	*/
	
	setCanvas : function(){
		if (this.canvas || (this.props && !this.props.layers) || (this.props && this.props.layers && $H(this.props.layers).getLength() <= 2))
			return false;

		this.canvas = new UI.Canvas({
			props 			: this.props,
			width			: this.element.x,
			height			: this.element.y,
			debug			: this.options.debug,
			element			: this.element,
			skin			: this.options.skin,
			component		: this.options.component,
			type			: this.options.type,
			state			: this.options.state,
		}).inject(this.element);
		
		this.addEvent('canvasDraw', function(state){
			if (!state)	var props = this.props;
			else var props = this.skin[state] || this.props;
			this.canvas.setSize(this.element.x,this.element.y, props);
		});
	},

	/* 
	Method: setState
		Set the element state
	
	Arguments:
		state - (string) the name of new state to set and draw
		size - (object) Optional - An object containing width and height to set a new size while changing state
	
	Return:
		this	
	*/
	
	setState : function(state, size){
		if (this.skin[state]) {
			this.state = state;
			if (this.skin[state].styles) this.setStyles(this.skin[state].styles);
			
			if ($defined(size))
				this.setSize(size.width, size.height, state);
			else
				this.fireEvent('canvasDraw', state);
		}
		return this;
	},
	
	/* 
	Method: setSize
		Set the element size and optionaly a new state
	
	Arguments:
		width - (integer) new element width
		height - (integer) new element height
		state - (string) (optional) state to draw
	
	Return:
		this	
	*/
	
	setSize : function(width, height, state){
		this.fireEvent('onResize');
		this.element.x = width || this.options.width || this.props.width || this.element.getSize().x;
		this.element.y = height || this.options.height || this.props.height || this.element.getSize().y;
		if (this.element.x) this.element.setStyle('width', this.element.x);
		if (this.element.y) this.element.setStyle('height', this.element.y);
		this.fireEvent('canvasDraw', state);

		return this;
	},


	/* 
	Method: setLocation
		Set the element location
	
	Arguments:
		left - (integer) new element left position
		top - (integer) new element top position
		moprh - (string) (optional) If specified, a morph transition will be done to new location
	
	Return:
		this
		
	Example:
		(start code)
		var myWindow = new UI.Window();
		var coord = myWindow.getCenterLocation();
		myWindow.setLocation(coord.left, coord.top, 'morph');
		(end)
		
	Discussion:
		
	
	*/
	
	setLocation	: function(left,top,morph) {
		this.element.left = left || this.options.left || this.props.defaultLeft || this.element.getCoordinates().x - this.props.shadowMagnify * 2;
		this.element.top = top || this.options.top || this.props.defaultTop || this.element.getCoordinates().y - this.props.shadowMagnify * 2;
		
		this.element[morph ? 'morph' : 'setStyles']({
			top	: this.element.top,
			left : this.element.left
		});
		
		return this;
	},

	
	/*
    Function: setBehavior
    	private function
    	
		Set default element behavior, addind general events (mouse events)
	
	Return:
		(void)
	
	Discussion:
		onClick event is fired on mouse up because of Explorer. Sometimes it doesn't fire onClick event (f.e. if a button has no label).
	*/

	setBehavior : function() {
		
		if (this.options.draggable)  { this.enableDrag(); }
		if (this.options.resizable) { this.enableResize(); }
		
		this.element.addEvents({
			mousedown 	: this.fireEvent.bind(this, 'mousedown'),
			click		: function(){
				if (!Browser.Engine.trident) 
				 this.fireEvent('click');
			}.bind(this),
			mouseup		: function(){
				if (Browser.Engine.trident)	
				 this.fireEvent('click');
				this.fireEvent('mouseup');
			}.bind(this),
			
			mouseenter 	: this.fireEvent.bind(this, 'mouseenter'),
			mouseleave 	: this.fireEvent.bind(this, 'mouseleave'),
			mouseover 	: this.fireEvent.bind(this, 'mouseover'),
			mouseOut 	: this.fireEvent.bind(this, 'mouseOut'),
			
		});
	},


	/*
		Function: enableDrag
			Add draggable capabilities for the element.
	*/
	
	enableDrag :function() {
		
		if (this.dragHandlers.length == 0) {
			this.dragHandlers = null;
		}
		
		this.dragHandler = new Drag(this.element, {
			handle 		: this.dragHandlers,
			limit 		: { x: this.options.dragLimitX, y: this.options.dragLimitY },
			
			onStart 	: this.fireEvent.bind(this, 'onDragStart'),
			onDrag 		: this.fireEvent.bind(this, 'onDrag'),
			onComplete 	: this.fireEvent.bind(this, 'onDragComplete')
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
		if (this.dragHandler) this.dragHandler.stop();
		return this;
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
	
	/* 
	Method: getCenterLocation
		Get the coordinates to place the element at center's window
	
	Return:
		location - (object) An object containing top and left properties.	
	*/
	
	getCenterLocation: function() {
		var location = {};
		
		location.top = (window.getHeight() - this.options.height.toInt()) / 2,
		location.left = (window.getWidth() - this.options.width.toInt()) / 2
		
		return location;
	},


	/*
	Function: adaptLocation
		Adapt element location if it is dragged out of its boundaries
	
	Return:
		(void)
	*/
	
	adaptLocation : function() {
		var location = {};
		var needed = false;
		var coordinates = this.element.getCoordinates();
		
		if (coordinates.top.toInt() > window.getHeight()-53) {
			location.top = window.getHeight()-$random(25,75)
			needed = true;
		}
		
		if (coordinates.left.toInt() + this.element.getStyle('width').toInt() < 0) {
			location.left = $random(25,75)-this.element.getStyle('width').toInt();
			needed = true;
		}
		
		if (this.element.getStyle('left').toInt() > window.getWidth()) {
			location.left = window.getWidth()-$random(25,75);
			needed = true;
		}
		
		if (needed) {
			if (this.props.fx && this.props.fx.adaptLocation)  {
				if (!this.reposFx) this.reposFx = new Fx.Morph(this.element, this.props.fx.adaptLocation);
				this.reposFx.start(location) ;
			}
		}
	},	
	
	/*
    Function: show
    	Fire the onShow event, and set display block and full opacity to element
    
    Return:
    	this
	*/
	
	show: function() {
		this.fireEvent('show');
		this.element.setStyle('opacity', 1);
		this.element.show();

		return this;
	},

	/*
    Function: hide
    	Fire the onHide Event, and set display none to element
    
    Return:
    	this
	*/
	
	hide: function() {
		this.fireEvent('hide');
		this.element.hide();
		
		return this;
	}
});


/*
	Native Mootools Element:
		Bind some native mootools element methods to element, so we can chain methods as in mootools
	
	Example:
		(start code)
		var element = new UI.Element({
			html : 'Hello World'
		}).inject(document.body).setStyle('border', '1px solid black).addClass('customElement');
		(end)
*/

UI.Element.implement({

	/*
    Function: setStyle
    	See mootools setStyle documentation
    
    Return:
    	this
	*/
	
	setStyle: function(style, value) {
		this.element.setStyle(style, value);
		
		return this;	
	},

	/*
    Function: setStyles
    	See mootools setStyles documentation
    
    Return:
    	this
	*/
	
	setStyles: function(styles) {
		this.element.setStyles(styles);
		
		return this;	
	},
	
	/*
    Function: getStyle
    	See mootools getStyle documentation
    
    Return:
    	this.element style
	*/
	
	getStyle: function(style) {
		return this.element.getStyle(style);	
	},
	
	/*
    Function: inject
    	Inject the element element into container, fire an inject event at beginning and an injected event at the end
    	
    Argument: 
    	container - see mootools inject documentation
    	position - see mootools inject documentation
    
    Return:
    	this
	*/
	
	inject: function (container, position){
		this.fireEvent('inject');

		this.element.inject(container, position);
		this.element.setStyle('visibility', 'visible');
		this.setSize();
		this.setCanvas();
		this.controller.register(this);
		this.fireEvent('injected');
		return this;		
	},
	
	/*
    Function: adopt
    	See mootools adopt documentation
    
    Return:
    	this
	*/
	
	adopt: function (element){
		this.element.adopt(element);
		this.setSize();
		return this;		
	},
	
	/*
    Function: addClass
    	See mootools addClas documentation
    
    Return:
    	this
	*/
	
	addClass: function(className) {
		this.element.addClass(className);
		
		return this;	
	},
	
	/*
    Function: set
    	See mootools set documentation
    
    Return:
    	this
	*/
	
	set: function(property, value) {
		if (property == 'html' && this.label) {
			this.label.set(property, value);
			//this.setSize();
		} else {
			this.element.set(property, value);
		}
		return this;	
	},
	
	/*
    Function: get
    	See mootools get documentation
    
    Return:
    	this.element properties
	*/
	
	get: function(property) {
		return this.element.get(property);	
	},
	
	/*
    Function: getSize
    	See mootools getSize documentation
    
    Return:
    	this.element size
	*/
	
	getSize: function() {
		return this.element.getSize();	
	},
	
	/*
    Function: set
    	See mootools getCoordinates documentation
    
    Return:
    	this.element coordinates
	*/
	
	getCoordinates: function(ref) {
		return this.element.getCoordinates(ref);
	},

	
	/*
    Function: destroy
    	See mootools getCoordinates documentation
    
    Return:
    	(void)
	*/

	destroy: function() {
		/*
		//we get inner element
		if (this.element.elements) {
			//get component
			this.element.elements.each(function(component){
				component.each(function(elementClass){
					console.log('destroy : ' + elementClass.options.component);
					elementClass.destroy();
					delete elementClass;
				});
			});
		}
		*/
		
		this.element.destroy();

		return;
	}
});

/*
	Some usefull method from clientcide.con
	
	License:
		http://clientside.cnet.com/wiki/cnet-libraries#license
*/

Element.implement({
	
	/*
    Function: disableSelect
    	Disable the ability to select element content text
    
    Return:
    	this
	*/
	
	disableSelect: function(){
		if (typeof this.onselectstart != "undefined") 
			this.onselectstart = function(){
				return false
			}
		else 
			if (typeof this.style.MozUserSelect != 'undefined') 
				this.style.MozUserSelect = 'none'
			else 
				this.onmousedown = function(){
					return false
				}
				
		this.style.cursor = 'default'
		
		return this;
	},
	
	/*
    Function: enableSelect
    	Enable the ability to select element content text
    
    Return:
    	this
	*/
	
	enableSelect: function(){
	
		if (this.onselectstart) 
			this.onselectstart = '' // for the badboy
		else 
			if ($type(this.style.MozUserSelect) == "none") 
				this.style.MozUserSelect = '' // for Firefox 
			else 
				this.onmousedown = function(){
					return true
				} //finaly the others (opera, not sure for safari)
				
		this.style.cursor = "default";
		
		return this;
	},
	
	/*
    Function: isVisible
    	See documentation at http://www.clientcide.com/wiki/cnet-libraries
    
    Return:
    	this.element display style
	*/
	
	isVisible: function(){
		return this.getStyle('display') != 'none';
	},
	
	/*
    Function: toggle
    	See documentation at http://www.clientcide.com/wiki/cnet-libraries
    
    Return:
    	this.element new display style
	*/
	
	toggle: function(){
		return this[this.isVisible() ? 'hide' : 'show']();
	},
	
	/*
    Function: hide
    	See documentation at http://www.clientcide.com/wiki/cnet-libraries
    
    Return:
    	this
	*/
	
	hide: function(){
		var d;
		try {
			//IE fails here if the element is not in the dom
			d = this.getStyle('display');
		} 
		catch (e) {
		}
		this.store('originalDisplay', d || 'block');
		this.setStyle('display', 'none');
		return this;
	},
	
	/*
    Function: show
    	See documentation at http://www.clientcide.com/wiki/cnet-libraries
    
    Return:
    	this
	*/
	
	show: function(display){
		original = this.retrieve('originalDisplay') ? this.retrieve('originalDisplay') : this.get('originalDisplay');
		this.setStyle('display', (display || original || 'block'));
		return this;
	},
	
	/*
    Function: swapClass
    	See documentation at http://www.clientcide.com/wiki/cnet-libraries
    
    Return:
    	this
	*/
	
	swapClass: function(remove, add){
		return this.removeClass(remove).addClass(add);
	}
});
/*
Class: UI.Element
	UI.Element is the root class of most class of Moolego UI
*/

UI.Element = new Class({
	Implements				: [Events, Options],
		
	options: {
		lib					: 'ui',

		component			: 'element',
		type				: 'default',
		state				: 'default',	
		
		tag					: 'div',
		
		resizable			: false,
		draggable			: false,
		selectable			: true,
		onlyCanvas			: false,	

		skin				: 'AquaGraphite',
		props				: false,
		
		styles				: {},
		
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
		onDragComplete		: $empty
		
	},

	/* 
		Method: initialize
		
			Construtor
	 */
	
	initialize: function(options){
		this.setOptions(options);
		if (!this.controller) this.controller = UI.controller;

		this.setClassName();
		this.setSkin();
		
       	this.build();

		this.setBehavior();
	},
	
	toElement : function(){
		return this.element;
	},

	/* 
		Method: build
		
			Instanciate an element Native Mootols
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
		
		this.element.setStyle('visibility', 'hidden');
		if (!this.options.selectable) this.element.disableSelect();
		this.element.ui = true;
		this.state = this.options.state;
		this.dragHandlers = [];
	},

	/* 
		Method: setSkin
		
			Define the className according the component name, type and state
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
		
			Get the skin for the current component
	 */
	
	setSkin: function(){
		UI.skin = new UI.Skin(this.options.skin);
		
		this.skin = UI.skin.get(this);
		
		this.props = this.skin[this.options.state];
		this.props.layers = new Hash(this.props.layers);
	},
	
	/* 
		Method: setCanvas
		
			Draw the canvas
	*/
	
	setCanvas : function(){
		if (this.canvas || (this.props && !this.props.layers) || (this.props && this.props.layers && this.props.layers.getLength() <= 2))
			return false;

		this.canvas = new UI.Canvas({
			props 			: this.props,
			width			: this.element.x,
			height			: this.element.y
		}).inject(this.element);
		
		this.addEvent('setCanvasSize', function(state){
			if (!state)	var props = this.props;
			else var props = this.skin[state] || this.props;
			
			this.canvas.setSize(this.element.x,this.element.y, props);
		});
	},

	/* 
		Method: setState
			Set the button state
	*/
	setState : function(state, dontResize){
		if (this.skin[state]) {
			this.state = state;
			if (this.skin[state].styles) this.setStyles(this.skin[state].styles);
			
			if (!$defined(dontResize)) this.setSize(false, false, state);
		}
		
		return this;
	},
	
	/*
	 * 	Function: setSize
	 * 		Set size of the element and its canvas
	 */
	
	setSize : function(width, height, state){
		this.element.x = width || this.options.width || this.props.width || this.element.getSize().x;
		this.element.y = height || this.options.height || this.props.height || this.element.getSize().y;

		if (this.element.x) this.element.setStyle('width', this.element.x);
		if (this.element.y) this.element.setStyle('height', this.element.y);
		this.fireEvent('setCanvasSize', state);

		return this;
	},


	/*
	    Function: setLocation
			Set element location 
	*/
	
	setLocation	: function(left,top) {
		this.element.left = left || this.options.left || this.props.defaultLeft || this.element.getCoordinates().x - this.props.shadowMagnify * 2;
		this.element.top = top || this.options.top || this.props.defaultTop || this.element.getCoordinates().y - this.props.shadowMagnify * 2;
		this.element.setStyles({
			top	: this.element.left,
			left : this.element.top
		});
	},

	
	/*
		Script: UI.Element.Native.js
		  Contains methods to work with size, scroll, or positioning of Elements and the window object.
		 
		License:
		  MIT-style license.
		 
		Credits:
		  - Element positioning based on the [qooxdoo](http://qooxdoo.org/) code and smart browser fixes, [LGPL License](http://www.gnu.org/licenses/lgpl.html).
		  - Viewport dimensions based on [YUI](http://developer.yahoo.com/yui/) code, [BSD License](http://developer.yahoo.com/yui/license.html).
	*/
 
		
	/*
   		reImpelement some Native Mootools Element needed methods
	*/
	
	
	/*
	    Function: show
	    	Set display block to the view element
	*/
	
	show: function() {
		this.fireEvent('show');
		this.element.setStyle('opacity', 1);
		this.element.show();

		return this;
	},

	/*
    	Function: hide
    		Set display none to the view element

	*/
	
	hide: function() {
		this.element.hide();
		
		return this;
	},
	
		
	/*
    Function: inject
    	Inject the element element into container
    	
    Argument: 
    	View Container

	*/
	
	inject: function (container, position){
		this.fireEvent('inject');

		this.element.inject(container, position);
		this.element.setStyle('visibility', 'visible');

		this.setSize();
		this.setCanvas();
		this.controller.register(this);
		
		return this;		
	},

	
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
	    Function: setLocation
			Set element location 
	*/
	
	getCenterLocation: function() {
		var location = {};
		
		location.top = (window.getHeight() - this.options.height.toInt()) / 2,
		location.left = (window.getWidth() - this.options.width.toInt()) / 2
		
		return location;
	},


	/*
	    Function: adaptLocation
	      Adapt location if window is dragged out of its boundaries
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
				this.reposFx = new Fx.Morph(this.element, this.props.fx.adaptLocation);
				
				this.reposFx.start(location) ;
			} else {
				
				
			}
		}
	}
});

/*
	Bindings to the native mootools element functions

	Discussion: 
		should be implemented automaticaly
 */


UI.Element.implement({

	/*
	 * Function: setStyle
	 * 	implement setStyle from de wrappwr
	 */
	
	setStyle: function(style, value) {
		this.element.setStyle(style, value);
		
		return this;	
	},

	/*
	 * Function: setStyles
	 * 	implement setStyles from element
	 */
	
	setStyles: function(styles) {
		this.element.setStyles(styles);
		
		return this;	
	},
	
	/*
	 * Function: setStyles
	 * 	implement setStyles from element
	 */
	
	getStyle: function(style) {
		return this.element.getStyle(style);;	
	},
	
	/*
	 * Function: addClass
	 * 	implement addClass from de wrapper
	 */
	
	addClass: function(className) {
		this.element.addClass(className);
		
		return this;	
	},
	
	/*
	 * Function: addEvent
	 * 	implement addEvent from de wrapper
	 */
	
	addEvent: function(event, action) {
		this.element.addEvent(event, action);
		return this;	
	},
	
	/*
	 * Function: addEvents
	 * 	implement addEvents from de wrapper
	 */
	
	addEvents: function(events) {
		this.element.addEvents(events);
		
		return this;	
	},
	
	/*
	 * Function: addClass
	 * 	implement element set method
	 */
	
	set: function(property, value) {
		this.element.set(property, value);
		return this;	
	},
	
	/*
	 * Function: get
	 * 	implement element get method
	 */
	
	get: function(property) {
		return this.element.get(property);	
	},
	
	/*
	 * Function: getSize
	 * 	implement element getSize method
	 */
	
	getSize: function() {
		return this.element.getSize();	
	},
	
	/*
	 * Function: getCoordinates
	 * 	implement element getCoordinates method
	 */
	
	getCoordinates: function(ref) {
		return this.element.getCoordinates(ref);
	},

	
	/*
    Function: destroy
    
    	Destroy the view element

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
Script: Extension.Element.js
        Extends the Element class with some needed methods.

License: MIT
        
*/

Element.implement({
	disableSelect: function(){
		if (typeof this.onselectstart != "undefined") 
			this.onselectstart = function(){
				return false
			}
		else 
			if (typeof this.style.MozUserSelect != "undefined") 
				this.style.MozUserSelect = "none"
			else 
				this.onmousedown = function(){
					return true
				}
				
		this.style.cursor = "default"
	},
	
	enableSelect: function(){
	
		if (this.onselectstart) 
			this.onselectstart = "" // for the badboy
		else 
			if ($type(this.style.MozUserSelect) == "none") 
				this.style.MozUserSelect = "" // for Firefox 
			else 
				this.onmousedown = function(){
					return false
				} //finaly the others (opera, not sure for safari)
		this.style.cursor = "default"
	},
	
	/*
	 Script: Element.Shortcuts.js
	 Extends the Element native object to include some shortcut methods.
	 
	 License:
	 http://clientside.cnet.com/wiki/cnet-libraries#license
	 */
	
	isVisible: function(){
		return this.getStyle('display') != 'none';
	},
	
	toggle: function(){
		return this[this.isVisible() ? 'hide' : 'show']();
	},
	
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
	
	show: function(display){
		original = this.retrieve('originalDisplay') ? this.retrieve('originalDisplay') : this.get('originalDisplay');
		this.setStyle('display', (display || original || 'block'));
		return this;
	},
	
	swapClass: function(remove, add){
		return this.removeClass(remove).addClass(add);
	},
	
	log: function(text, args){
		if (window.console) 
			console.log(text.substitute(args ||
			{}));
	}
});



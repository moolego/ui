/*
Class: UI.Element
	UI.Element is the root class of most class of iFramework UI
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

		skin				: 'GreyGlass',
		props		: false,
		
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
       	this.setLanguage();
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
			html	: this.options.html,
			'for'	: this.options['for']
		});
		this.element.setStyle('visibility', 'hidden');
		if (!this.options.selectable) this.element.disableSelect();
		this.element.ui = true;
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
			props 	: this.props,
			width			: this.element.x,
			height			: this.element.y
		}).inject(this.element);
		this.addEvent('setCanvasSize', function(state){
			if (!state)
				var props = this.props;
			else
				var props = this.skin[state];
			this.canvas.setSize(this.element.x,this.element.y, props);
		});
	},
	
	/*
	 * 	Function: setSize
	 * 		setSize of element and its canvas
	 */
	
	setLanguage : function( ) {
		this.lang = new Hash();
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
	}
});

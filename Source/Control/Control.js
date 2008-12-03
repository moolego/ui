/*
Class: UI.Control
	UI.Control is the root class of most control elements of iFramework UI


*/



UI.Control = new Class({
	Extends					: UI.Element,
		
	options: {
		// implement events
		tag					: 'span',
		onChange			: $empty
	},

	/* 
		Method: initialize
		
			Construtor
	 */
	
	initialize: function(options){
		this.parent(options);
	},
	
	build: function() {
		this.parent();
		this.control = this.element;
	},
	
	/*
	 * 	Function: setSize
	 * 		setSize of Element
	 */
	
	setSize : function(width,height, state){
		if (this.textLabel) {
			var twidth = width || this.options.width || this.props.width || this.textLabel.getSize().x;
			var theight = height || this.options.height || this.props.height || this.textLabel.getSize().y;
		}else if (this.input && this.input.getProperty('type') != 'hidden') {
			var twidth = width || this.options.width || this.props.width || this.input.getSize().x;
			var theight = height || this.options.height || this.props.height || this.input.getSize().y;
		}
		
		this.parent(twidth, theight, state);
	},
	
	/* 
		Method: createInput
		
			create an input and inject it in the control element
	 */
	
	setInput : function(type, tag){
		if (!$defined(tag)) tag	= 'input';
		if (!$defined(type)) type = 'hidden';

		if (type) {
			this.input = new Element(tag, {
				type		: type,
				name 		: this.options.name
			}).inject(this.control);
		} else {
			this.input = new Element(tag, {
				name 		: this.options.name
			}).inject(this.control);
		}
		
		switch (tag) {
			case 'input' :
				this.input.set('value', this.options.value);
				break;
			case 'textarea' :
				this.input.set('html', this.options.value);
				break;
		}
		if (type != 'hidden') {
			this.input.set(this.props.components.input);
		}
	},
	
	/* 
		Method: getForm
		
			Get the parent form element or return false
	 */
	
	getForm : function(){
		if (this.control) {
			var element = this.control.getParent();
			while (element.get('tag') != 'form') {
				element = element.getParent();
			}
			return element;
		}
		return false;
	},
	
	setBehavior : function(){
		this.parent();
		if (this.input) {
			this.input.addEvents({
				blur	: this.fireEvent.bind(this, 'blur'),
				focus	: this.fireEvent.bind(this, 'focus')
			});
		}
	},

	set : function(property, value){
		if (property == 'html') {
			if (this.textLabel) this.textLabel.set(property, value);
			this.setSize();
		} else {
			this.element.set(property, value);
		}
	}
});
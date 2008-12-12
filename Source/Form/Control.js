/*
	Class: UI.Control
		UI.Control is the root class of most control elements of moolego UI. It can't be used alone.
		
	Extends:
		<UI.Element>
		
	Arguments:
		options
	
	Returns:
		Canvas object.
	
	Discussion:
	
*/



UI.Control = new Class({
	Extends					: UI.Element,
		
	options: {},

	/* 
	Function: build
		private function
		
		Call UI.Element build and set the control element
	
	See also:
		<UI.Element::build>
	*/
	
	build: function() {
		this.parent();
		this.control = this.element;
	},
	
	/* 
	Function: setSize
		Set the size of an element, defined by the label size in most case and relay it to parent method.
	
	Arguments:
		width - (integer) New element width
		height - (integer) New element height
		state - (string) (optional) Can be specified to draw a new state too
	
	See also:
		<UI.Element::setSize>
	*/
	
	setSize : function(width,height, state){
		if (this.label) {
			var twidth = width || this.options.width || this.props.width || this.label.getSize().x;
			var theight = height || this.options.height || this.props.height || this.label.getSize().y;
		}else if (this.input && this.input.getProperty('type') != 'hidden') {
			var twidth = width || this.options.width || this.props.width || this.input.getSize().x;
			var theight = height || this.options.height || this.props.height || this.input.getSize().y;
		}
		
		this.parent(twidth, theight, state);
	},
	
	/* 
	Function: setInput
		private function
		
		Set an input in the control element
	
	Arguments:
		type - (string) The input type. Could be hidden, text, ...
		tag - (string) The input tag. Could be input or textarea
		
	Return:
		(void)
	
	Discussion:
		As we want to remove input from control, this method should no longer exist.
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
	Function: getForm
		Get the form element containing this element
		
	Return:
		(element) the form element
	
	Discussion:
		As we want to remove input from control, this method shoul no longer exist.
		We will use instead the group and serialize method of the UI.Controller
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
	
	/* 
	Function: setBehavior
		private function
		
		Set control relative behavior (blur and focus)
	
	Return:
		(void)
	
	See also:
		<UI.Element::setBehavior>
	*/
	
	setBehavior : function(){
		this.parent();
		if (this.input) {
			this.input.addEvents({
				blur	: this.fireEvent.bind(this, 'blur'),
				focus	: this.fireEvent.bind(this, 'focus')
			});
		}
	},
	
	/* 
	Function: set
		Intercept set method to pass the html to textLabel instead of element
	
	Return:
		(void)
	*/

	set : function(property, value){
		if (property == 'html') {
			if (this.label) this.label.set(property, value);
			this.setSize();
		} else {
			this.element.set(property, value);
		}
	}
});
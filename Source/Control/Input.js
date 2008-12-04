/*
Class: UI.Input
	Create a skinnable input element

Arguments:
	options

Options: 
	name - (string) name for the input element
	value - (string) value
	component - (string) component name

Example:
	(start code)
	var button = new UI.Button({
		name: 'myInput',
		value: 'Hello world'
	}).inject(document.body);
	(end)
*/

UI.Input = new Class({
	Extends				: UI.Control,
	
	options				: {
		component		: 'input',
		
		// default options
		name			: 'ui-input',
		value			: ''
	},
	
	/* 
	Constructor: initialize
		Constructor
	
	Arguments:
		options - (object)
	*/
	
	initialize: function(options) {
		this.parent(options);
	},
	
	/* 
	Function: build
		private function
		
		Create a div and a hidden input to receive the selected value
	
	Return:
		(void)
	*/
	
	build : function(){
		//create a new div as input element
		this.parent();
		
		//create input
		this.setInput('text');
		this.input.setStyle('width', this.props.width - this.input.getStyle('paddingLeft').toInt() - this.input.getStyle('paddingRight').toInt());
	},
	
	/* 
	Function: setState
		Set element state
	
	Arguments:
		state - (string) State name
		
	Return:
		(void)
	*/
	
	setState : function(state){
		this.parent(state);
		if (this.skin[state]) this.input.set(this.skin[state].components.input.styles);
	},
	
	/* 
	Function: setBehavior
		private function
		
		Set control relative behavior (blur and focus)
	
	Return:
		(void)
	*/
	
	setBehavior : function() {
		this.parent();
		this.input.addEvents({
			blur	: function(){
				this.setState('default');
			},
			focus	: this.setState.bind(this, 'focus')
		})
	}
});

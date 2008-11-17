/*
Class: UI.Input
	Creates button and let you attach events action

Arguments:
	options

Options: 
	className - (string) css classname for the given button
	buttonType - ()

Example:
	(start code)
		var button = new UI.Button({
			onClick		: {},
			onMouseOver	: {},
			onDblClick	: {}
		});
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
	
	initialize: function(options) {
		this.parent(options);
	},
	
	/* 
		Method: build
		
			Create a div and a hidden input to receive the selected value
	*/
	
	build : function(){
		//create a new div as input element
		this.parent();
		
		//create input
		this.setInput('text');
		this.input.setStyle('width', this.props.width - this.input.getStyle('paddingLeft').toInt() - this.input.getStyle('paddingRight').toInt());
	},
	
	/* 
		Method: setState
		
			Set the button state
	*/
	setState : function(state){
		this.parent(state);
		this.input.set(this.skin[state].components.input.styles);
	},
	
	setBehavior : function() {
		this.parent();
		this.input.addEvents({
			blur	: this.setState.bind(this, 'default'),
			focus	: this.setState.bind(this, 'focus')
		})
	}
});

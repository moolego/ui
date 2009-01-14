/*
	Class: UI.Input
		Create a skinnable input element
	
	Extends:
		<UI.Control>
	
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
	
	Extends: UI.Control,
	
	options: {
		component: 'input',
		
		// default options
		name: 'ui-input',
		value: ''
	},
	
	/* 
	Function: build
		private function
		
		Create a div and a hidden input to receive the selected value
	
	Return:
		(void)
	
	See also:
		<UI.Control::build>
		<UI.Element::build>
	*/
	
	build: function(){
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
	
	See also:
		<UI.Element::setState>
	*/
	
	setState: function(state){
		this.parent(state);
		if (this.skin[state]) this.input.set(this.skin[state].components.input.styles);
	},
	
	/* 
	Function: setBehavior
		private function
		
		Set control relative behavior (blur and focus)
	
	Return:
		(void)
	
	See also:
		<UI.Control::setBehavior>
		<UI.Element::setBehavior>
	*/
	
	setBehavior: function() {
		this.parent();
		this.addEvents({
			blur: this.setState.bind(this, 'default'),
			focus: this.setState.bind(this, 'focus')
		})
	}
	
});

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
		
	Implied global: 
		Class - 25
		UI - 25 27
		
	Members:
		Control, Extends, Input, addEvents, bind, blur, component, 
    	focus, name, options, parent, setBehavior, setState, value
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
		<UI.Controlocus)
	
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
		});
	}
	
});

/*
	Class: UI.Checkbox
		Creates checkbox control
	
	Extends:
		<UI.Control>
	
	Arguments:
		options	
	
	Options: 
		label - (string) checkbox label
		name - (string) input element name
		value - (string) checkbox's value
		checked - (boolean) set to true to check on initialize
	
	Example:
		(start code)
			var checkbox = new UI.Checkbox({
				name		: 'myCheckbox'
				value		: 'check',
				label		: 'Hello world!'			
			}).inject(document.body);
		(end)
*/

UI.Checkbox = new Class({
	Extends				: UI.Control,
	
	options				: {
		// default options
		label			: false,
		name			: 'checkbox-input',
		value			: 'default',
		checked			: false,
		
		// styles
		component		: 'checkbox'
	},
	
	/*
	Function: build
		private function
		
		Call UI.Element build, set an input and a textLabel
	
	Returns:
		(void)
	
	See also:
		<UI.Control::build>
		<UI.Element::build>
	*/
	
	build : function() {
		this.parent();
		this.setInput();

		if (this.options.label) {
			this.textLabel = new UI.Label({
				'for'		: this.options.name,
				skin 		: this.options.skin,
				html 		: this.options.label,
				styles 		: this.props.labelStyles
			}).inject(this.element);
			delete this.props.width;
			delete this.props.height;
		}
		this.control.store('value', this.options.value);
		if (this.options.checked) this.toggleValue();
	},	
	
	/* 
	Function: toggleValue
		Toggle the value of the checkbox
	
	Return:
		this
	*/
	
	toggleValue : function(){
		
		if (this.state == 'checked') {
			this.setState('default');
			this.state = 'default';
			this.input.value = '';
			this.value = undefined;
		} else {
			this.setState('checked');
			this.state = 'checked';
			this.input.value = this.control.retrieve('value');
			this.value = this.control.retrieve('value');
		}
		
		return this;
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
	
	setBehavior : function() {
		this.parent();
		this.element.addEvents({
			click : function(e){
				new Event(e).stop();
				this.toggleValue()
			}.bind(this)
		});
	}
});
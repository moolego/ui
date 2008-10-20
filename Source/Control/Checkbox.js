/*
Class: UI.Checkbox
	Creates checkbox control

Arguments:
		

Options: 
	className - (string) css classname for the given button
	buttonType - ()

Example:
	(start code)
		var button = new UI.Checkbox({
			className	: 'ui-control-checkbox'
			skin 		: 'grey'
			onClick		: {},
			onMouseOver	: {},
			onDblClick	: {}
		});
	(end)
*/

UI.Checkbox = new Class({
	Extends				: UI.Control,
	Implements			: [Events, Options],
	
	options				: {
		// default options
		label			: false,
		name			: 'checkbox-input',
		value			: 'default',
		checked			: false,
		
		// styles
		component		: 'checkbox'
	},
	
	initialize: function(options) {
		this.parent(options);
	},
	
	/* 
		Method: build
		
			Create a div and a hidden input to receive the selected value
	*/
	
	build : function() {
		this.parent();
		this.setInput();

		if (this.options.label) {
			this.textLabel = new UI.Label({
				'for'		: this.options.name,
				html 		: this.options.label,
				styles 		: this.props.labelStyles
			}).inject(this.element);
		}
		this.control.store('value', this.options.value);
		if (this.options.checked) this.toggleValue();
	},	
	
	/* 
		Method: toggleValue
		
			Set the input value
	*/
	toggleValue : function(){
		if (this.state == 'checked') {
			this.setState('default');
			this.state = 'default';
			this.input.value = '';
		} else {
			this.setState('checked');
			this.state = 'checked';
			this.input.value = this.control.retrieve('value');
		}
	},

	/* 
		Method: addActions
		
			Set actions
	*/
	
	setBehavior : function() {
		this.parent();
		this.element.addEvents({
			click : this.toggleValue.bind(this)
		});
	}
});
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
		Method: toggleValue
		
			Set the input value
	*/
	toggleValue : function(state){
		
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
	},
	
	/* 
		Method: checked
		
			Set the input value
			
			provisory
	*/	
	
	checked : function(state){
		if (state == true) {
			this.setState('checked');
			this.state = 'checked';
			this.input.value = this.control.retrieve('value');
		} else {
			this.setState('default');
			this.state = 'default';
			this.input.value = '';
		}
	},

	/* 
		Method: addActions
		
			Set actions
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
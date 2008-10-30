/*
Class: UI.Button
	Creates button and let you attach events action

Arguments:
	options

Options: 
	label - (string) css classname for the given button

Example:
	(start code)
		var button = new UI.Button({
			label		: 'i am a new UI.Button',
			onClick		: { alert('click') }
		});
	(end)
*/

UI.Button = new Class({
	Extends				: UI.Control,
	Implements			: [Events, Options],
	
	options				: {
		component		: 'button',
		
		// default options
		label			: 'Button',
		submit			: false
	},
	
	initialize: function(options) {
		this.parent(options);
	},
	
	/* 
		Method: build
		
			Create a div and a hidden input to receive the selected value
	*/
	
	build : function(){
		this.parent();
		if(this.options.label) {
			this.textLabel = new UI.Label({
				skin : this.options.skin,
				html : this.options.label,
				styles : this.props.components.label.styles
			}).inject(this.element);
		}
	},
	
	/* 
		Method: setState
		
			Set the button state
	*/
	setState : function(state){
		if (this.textLabel) {
			this.textLabel.setStyles(this.skin[state].components.label.styles);
		}
		this.parent(state);
	},
	
	/* 
		Method: addActions
		
			Set actions
	*/
	setBehavior : function() {
		this.parent();
		
		//we add mouse event
		this.element.addEvents({
			mouseenter	: this.setState.bind(this, 'over'),
			mousedown	: this.setState.bind(this, 'down'),
			mouseleave	: this.setState.bind(this, 'default'),	
			mouseup		: function(){
				if (this.options.submit) this.submit();
				this.setState('over');
			}.bind(this)
		});
	},
	
	submit : function() {
		this.getForm().submit();
	}
});
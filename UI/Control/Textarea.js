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

UI.Textarea = new Class({
	Extends				: UI.Control,
	Implements			: [Events, Options],
	
	options				: {
		component		: 'textarea',
		
		// default options
		name			: 'ui-input',
		value			: '',
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
		this.setInput('', 'textarea');
		this.input.set({
			styles : {
				width : this.skinProperties.width - this.input.getStyle('paddingLeft').toInt() - this.input.getStyle('paddingRight').toInt(),
				height : this.skinProperties.height - this.input.getStyle('paddingTop').toInt() - this.input.getStyle('paddingBottom').toInt(),
				overflow : 'hidden'
			},
			
		});
	},
	
	/* 
		Method: setState
		
			Set the button state
	*/
	setState : function(state){
		this.parent(state);
		this.input.setStyles(this.skin[state].components.input.styles);
	},
	
	setBehavior : function() {
		this.parent();
		this.input.addEvents({
			blur	: this.setState.bind(this, 'default'),
			focus	: this.setState.bind(this, 'focus'),
			resize	: function(){
				console.log('resize');
			}
		})
	}
});
/*
Class: UI.Slider
	Creates slider and let you attach events action

Requires:
	Mootools Slider Plugins

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

UI.Slider = new Class({
	Extends				: UI.Control,
	Implements			: [Events, Options],
	
	options				: {
		
		// default options
		submit			: false,
		
		className		: 'slider',
		
		component		: 'slider',
		type			: 'default',
		state			: 'default',
		
		shadow			: false,
		
		// implemented events
		onChange		: $empty
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
		
		this.handler = new UI.Element({
			label				: false,
			component			: 'slider',
			type				: 'knob',
			width				: 21,
			height				: 21,
			styles				:  this.skinProperties.components.knob.styles,
			skinProperties		: {
				defaultRadius	: 4
			}
		}).inject(this.element);
	},
	
	setBehavior : function() {
		//console.log(this.element);
		//console.log(this.handler.element);
		
		this.slider = new Slider(this.element, this.handler.element, {
			steps: 35,	// There are 35 steps
			range: [8],	// Minimum value is 8
			onChange: function(value){
				//this.fireEvent('change');
				// Everytime the value changes, we change the font of an element
				
			}
		});
	}
});















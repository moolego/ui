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
	Extends				: UI.Element,
	Implements			: [Events, Options],
	
	options				: {
		
		// default options
		className		: 'slider',
		
		component		: 'slider',
		type			: 'default',
		state			: 'default',
		
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
			skin				: this.options.skin,
			component			: 'slider',
			type				: 'knob'
		}).inject(this.element);

	},
	
	inject : function(target, position) {
		this.parent(target, position);
		
		this.slider = new Slider(this.element, this.handler.element);
	}
});

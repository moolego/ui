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
	
	options				: {
		
		// default options
		className		: 'slider',
		
		component		: 'slider',
		type			: 'horizontal',
		state			: 'default',
		
		// implemented events
		onStart			: $empty,
		onChange		: $empty,
		onComplete		: $empty,
		onTick			: $empty,
		
		// mootools slider default settings
		snap			: false,
		offset			: 0,
		range			: false,
		wheel			: false,
		steps			: 100
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
		this.slider = new Slider(this.canvas.canvas, this.handler.element, {
			snap 		: this.options.snap,
			offset		: this.options.offset,
			range		: this.options.range,
			wheel		: this.options.wheel,
			steps		: this.options.steps,
			mode		: this.options.type,
			onStart		: function(step){this.fireEvent('start', step)}.bind(this),
			onTick		: function(position){
				if(this.options.snap) position = this.toPosition(this.step);
				this.knob.setStyle(this.property, position);
			},
			onChange	: function(step){this.fireEvent('change', step)}.bind(this),
			onComplete	: function(step){this.fireEvent('complete', step)}.bind(this)
		});
	},
	
	set : function(value){
		this.slider.set(value);
		return this;
	}
});

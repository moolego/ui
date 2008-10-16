/*
Class: UI.Bubble
	Creates Bubble and let you attach events action

Arguments:
	options

Options: 
	className - (string) css classname for the given button
	buttonType - ()

Example:
	(start code)
		var Bubble = new UI.Bubble({
			onClick		: {},
			onMouseOver	: {},
			onDblClick	: {}
		});
	(end)
*/

UI.Bubble = new Class({
	Extends				: UI.Element,
	Implements			: [Events, Options],
	
	options				: {
		component		: 'tip',
		
		// default options
		
		label			: 'Bubble',
		target			: 'element'

	},
	
	initialize: function(options) {
		this.parent(options);
		
		this.inject(document.body);
		this.setLocation();
		this.fade(1);
	},

	
	/* 
		Method: build
		
			Create a div and a hidden input to receive the selected value
	*/
	
	build : function(){
		this.parent();
		this.control = this.element;
		
		//we create a span for text
		if(this.options.label) {
			this.textLabel = new UI.Label({
				html : this.options.label,
				styles : this.skinProperties.components.label.styles
			}).inject(this.element);
		}
		
		this.fx = new Fx.Tween(this.element, {wait : false});
	},
	
	setBehavior : function(){
		this.parent();
		
		this.element.addEvents({
			'click' : function(){
				this.fade(0);
			}.bind(this)
		});
	},

		
	/* 
		Method: setPosition
		
			Set the position of the tip to the element
	*/
	
	setLocation : function(){
		var tipCoord = this.element.getCoordinates();
		switch ($type(this.options.target)) {
			case 'element' :
				var coord = this.options.target.getCoordinates();
				break;
			case 'object' :
				var coord = this.options.target.element.getCoordinates();
				break;	
		}
		
		var left = 0;
		var top = 0;
		
		// should implement left and right as location too
		
		if (this.options.type == 'default') {
			left = coord.right - 40;
			top = coord.top - tipCoord.height - 10;
		} else if (this.options.type == 'bottom') {
			left =  coord.right - 40;
			top = coord.top + coord.height + 10;
		};
		
		this.element.setStyles({
			left 	: left,
			top 	: top
		});
	},

	/* 
		Method: setSize
		
			Set the size of the tip
	*/
	
	setSize : function(width,height){
		if (this.textLabel) {
			this.options.width = width || this.options.width || this.skinProperties.width || this.textLabel.getSize().x;
			this.options.height = height || this.options.height || this.skinProperties.height || this.textLabel.getSize().y;
		};
		
		this.parent();
	},
		
	/* 
		Method: setPosition
		
			Set the position of the tip to the element
	*/
	
	fade : function(way){
		this.fx.start('opacity', way);
		return this;
	}
});
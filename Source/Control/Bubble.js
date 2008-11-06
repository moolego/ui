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
		component		: 'bubble',
		
		// default options
		label			: 'Bubble',
		target			: 'element',
		resetPosition	: true,
		zIndex			: 1000
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
				styles : this.props.components.label.styles
			}).inject(this.element);
		}
		
		this.fx = new Fx.Tween(this.element, {
			wait : false,
			onStart : function(){
				this.element.show();
			},
			onComplete : function(){
				if(!this.element.getStyle('opacity')) {
					this.element.hide();
				}
			}
		});
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
		
			Set the position of the bubble to the element
	*/
	
	setLocation : function(){
		var coord = this.getLocation();
		this.element.setStyles({
			left 	: coord.left,
			top 	: coord.top
		});
		
		if (this.options.resetPosition) {
			this.posFx = new Fx.Morph(this.element, {
				wait : false
			});
			
			this.reposition = function(){
				var dest = this.getLocation();
				this.posFx.start({
					'left': dest.left,
					'top': dest.top
				});
			}.bind(this);
			
			//add event on windows resize
			window.addEvents({
				resize			: this.reposition,
				setTipsPosition : this.reposition
			});
		}
	},
	
	/* 
		Method: getLocation
		
			Get the location for the bubble
	*/
	
	getLocation : function(){
		var bubbleCoord = this.element.getCoordinates();
		var coord = this.options.target.getCoordinates();
		
		// should implement left and right as location too
		if (this.options.type == 'default') {
			var left = coord.right - 40;
			var top = coord.top - bubbleCoord.height - 10;
		} else if (this.options.type == 'bottom') {
			var left =  coord.right - 40;
			var top = coord.top + coord.height + 10;
		};
		
		return {
			top : top,
			left: left
		}
	},

	/* 
		Method: setSize
		
			Set the size of the bubble
	*/
	
	setSize : function(width,height){
		if (this.textLabel) {
			this.options.width = width || this.options.width || this.props.width || this.textLabel.getSize().x;
			this.options.height = height || this.options.height || this.props.height || this.textLabel.getSize().y;
		};
		
		this.parent();
	},
		
	/* 
		Method: setPosition
		
			Set the position of the bubble to the element
	*/
	
	fade : function(way){
		this.fx.start('opacity', way);
		return this;
	},
	
	/* 
		Method: destroy
		
			Destroy the element, and remove the event on window
	*/
	
	destroy : function(){
		window.removeEvent('resize', this.reposition);
		this.parent();
	}
});
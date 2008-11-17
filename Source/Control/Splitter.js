// JavaScript Document

/*
Class: UI.Splitter
	The Splitter class
	Creates a new Splitter Object

Arguments:
		
*/

UI.Splitter = new Class({
	
	options : {
		className			: 'ui-layout-splitter',
		minSize				: '50'
	},
	
	initialize: function(options){
		this.setOptions(options);
		this.size = this.options.wrapper.getSize(); 
		this.build();
		this.resize();
	},
	
	build: function(){

		var mainSize = this.size.x - this.options.sectionOne.getCoordinates().width;
		
		this.draglimit = {
			x	: [-this.options.minSize,  this.options.sectionTwo.getSize() - this.options.minSize],
			y	: [0, 0]
		}
		
		this.handler = new Element('div',{	'class'	: this.options.className })
		 .setStyles({ 
		 	height 			: '100%', 
			cursor 			: 'col-resize', 
			'margin-left'	: this.options.sectionOne.getSize().x - 2
		}).inject(this.options.wrapper);
		
		this.handler.makeDraggable({
			limit				: this.draglimit,
			onStart				: function() { this.fireEvent('onResizeStart') }.bind(this),
			onDrag				: function() { this.resize() }.bind(this),
			onComplete			: function() { this.fireEvent('onResizeEnd') }.bind(this)
		});
	},

	resize: function() {
		this.options.sectionOne.setStyle('width', this.handler.getCoordinates().left - this.options.wrapper.getCoordinates().left + 3);
		this.options.sectionTwo.setStyle('width', this.options.wrapper.getSize().x - this.options.sectionOne.getSize().x);

		//this.debugSize();
	}
});
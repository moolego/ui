// JavaScript Document

/*
Class: UI.Layout.App
	The Layout.App class of the <http://iframework.org> iframework.
	Creates a new Layout.App

Arguments:
		
*/

UI.SplitView = new Class({
	Extends					: UI.View,	
	
	options : {
		component	: 'splitview',
		overflow	: 'hidden',
		minSize		: '160px'
	},
	
	initialize: function(options){
		this.parent(options);
		this.build();
		this.resize();
	},

	build: function(){
		this.parent();
		
		this.size = this.element.getSize(); 
		
		var mainSize = this.size.x - 161;

		this.side = new UI.View(this.props.components.side)
		 .inject(this.element);

		this.main = new UI.View(this.props.components.main)
		 .setStyle('width', mainSize)
		 .inject(this.element);
		
		var mainSize = this.size.x - this.side.element.getSize().x;
		
		this.draglimit = {
			x	: [-this.options.minSize,  this.side.element.getSize() - this.options.minSize],
			y	: [0, 0]
		}
		
		this.handler = new Element('div',this.props.components.splitter)
		 .setStyles({ 'margin-left'	: this.side.element.getSize().x - 2	})
		 .inject(this.element);
		
		this.handler.makeDraggable({
			limit				: this.draglimit,
			onStart				: function() { this.fireEvent('onResizeStart') }.bind(this),
			onDrag				: function() { this.resize() }.bind(this),
			onComplete			: function() { this.fireEvent('onResizeEnd') }.bind(this)
		});
	},

	resize: function() {

		this.side.element.setStyle('width', this.handler.getCoordinates().left - this.element.getCoordinates().left + 3);
		this.main.element.setStyle('width', this.element.getSize().x - this.side.element.getSize().x);
		this.fireEvent('onResize');
	}
});
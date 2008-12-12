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
		minSize		: 160
	},
	
	build: function(){
		this.parent();
		
		this.addEvent('injected', function(){
			this.size = this.getSize(); 
						
			this.buildViews();
			this.buildHandler();
		
		}.bind(this));
	},
	
	/*
		buildViews
		
		
		
	 */
	
	buildViews: function() {
		this.views = [];
		
		console.log(this.props);
		console.log(this.props.views);
		
		this.props.views.each( function(view){
			this.views.push(new UI.View(view)
			 .inject(this.element))
		});

		var mainSize = this.size.x - this.side.element.getSize().x;
	},
	
	buildSplitter : function() {
		this.draglimit = {
			x	: [-this.options.minSize,  this.width - this.options.minSize],
			y	: [0, 0]
		}
		
		this.handler = new Element('div',this.props.components.splitter)
		 .setStyles({  
		 	marginLeft	: this.side.element.getSize().x - 2,
			height	: this.side.element.getSize().y,
			backgroundColor : '#000',
			position: 'abolute'
		}).inject(this.views[1].element);
		 
		this.handler.makeDraggable({
			limit				: this.draglimit,
			//onStart				: function() { this.fireEvent('onResizeStart') }.bind(this),
			onDrag				: function() { this.resize() }.bind(this),
			//onComplete			: function() { this.fireEvent('onResizeEnd') }.bind(this)
		});
	},

	resize: function() {

		this.side.element.setStyle('width', this.handler.getCoordinates().left - this.element.getCoordinates().left + 3);
		this.main.element.setStyle('width', this.element.getSize().x - this.side.element.getSize().x);
		this.fireEvent('onResize');
	},
	
	inject: function(container,position) {
		this.parent(container,position);
		
		//this.side.setStyles('width','160px');
		//this.resize();
		
	}
});
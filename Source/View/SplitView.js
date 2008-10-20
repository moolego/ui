// JavaScript Document

/*
Class: UI.Layout.App
	The Layout.App class of the <http://iframework.org> iframework.
	Creates a new Layout.App

Arguments:
		
*/

UI.SplitView = new Class({
	Implements				: [Events, Options],
	
	options : {
		className			: 'ui-layout-app',
		minSize				: '50'
	},
	
	initialize: function(options){
		this.setOptions(options);
		this.build();
		this.resize();
	},
	
	build: function(){
		this.size = this.options.container.getSize(); 
		
		var mainSize = this.size.x - 161;

		this.side = new UI.View({ 
			width				: 160,
			height				: '100%',
			styles				: { 
				'float'			: 'left',
				overflow		: 'hidden',
				backgroundColor	: '#d6dde5',
				borderRight		: '1px solid #8b8b8b'
			},
			overflow		: 'hidden'
		}).inject(this.options.container);
		
		this.side.element.setStyles({
			'float':'left',
			backgroundColor: '#d6dde5'
		});

		this.main = new UI.View({
			width		: mainSize,
			className	: this.options.className + '-main',
			container	: this.options.container,
			overflow	: 'hidden'
		}).inject(this.options.container);;
		
		this.main.element.setStyles({
			'float': 'left',
			'overflow' : 'hidden'
		});
		
		/*
		this.handler = new UI.Splitter({
			styles: {
				height			: '100%',
				cursor			: 'e-resize',
				width			: '7px',
				opacity			: '.3',
				marginLeft		: this.side.element.getSize().x - 2
			}
		}).inject(this.options.container);
		*/
		
		
		var mainSize = this.size.x - this.side.element.getSize().x;
		
		this.draglimit = {
			x	: [-this.options.minSize,  this.side.element.getSize() - this.options.minSize],
			y	: [0, 0]
		}
		
		this.handler = new Element('div',{	'class'	: 'ui-splitview-handler' })
		 .setStyles({
			height 			: '100%', 
			cursor 			: 'e-resize', 
			width			: '7px',
			opacity			: '.3',
			'margin-left'	: this.side.element.getSize().x - 2
		}).inject(this.options.container);
		
		this.handler.makeDraggable({
			limit				: this.draglimit,
			onStart				: function() { this.fireEvent('onResizeStart') }.bind(this),
			onDrag				: function() { this.resize() }.bind(this),
			onComplete			: function() { this.fireEvent('onResizeEnd') }.bind(this)
		});
	},

	resize: function() {
		this.side.element.setStyle('width', this.handler.getCoordinates().left - this.options.container.getCoordinates().left + 3);
		this.main.element.setStyle('width', this.options.container.getSize().x - this.side.element.getSize().x);
	}
});
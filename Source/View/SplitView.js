/*
	Class: UI.SplitView
		The UI.SplitView class splits views.
	
	Extends:
		<UI.View>
	
	Require:
		<UI.Canvas>
		<UI.Skin>
		<UI.Element>
		<UI.View>
		<UI.Scrollbar>
		
	Arguments:
		options
		
	Options:
	
	Returns:
		Listview object.
		
	Example:
		(start code)
		var splitview = new UI.SplitView({
			width			: 260,
			height			: 400,
		}).inject(document.body);
		
		splitview.views[0].setContent('ajax','side.php');
		splitview.views[1].setContent('ajax','content.php');
		
		(end)	
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
		
		this.view = new Array();
		
		this.addEvent('injected', function(){
			this.size = this.getSize(); 
						
			this.buildViews();
			this.buildSplitter();
		
		}.bind(this));
	},
	
	/*
		buildViews
		
		
		
	 */
	
	buildViews: function() {
		var viewlist = new Hash(this.props.views)
		viewlist.each( function(view){
			console.log(view);
			this.view.push(new UI.View(view)
			 .inject(this.element))
		},this);

		this.view[1].element.setStyle('width', this.element.getSize().x - this.view[0].getSize().x);
	},
	
	buildSplitter : function() {
		this.draglimit = {
			x	: [-this.options.minSize,  this.width - this.options.minSize],
			y	: [0, 0]
		}
		
		this.handler = new Element('div',this.props.components.splitter)
		 .setStyles({  
		 	marginLeft	: this.view[0].element.getSize().x - 2,
			height	: this.view[0].element.getSize().y,
			backgroundColor : '#000',
			position: 'abolute',
			cursor : 'e-resize'
		}).inject(this.element);
		 
		this.handler.makeDraggable({
			limit				: this.draglimit,
			//onStart				: function() { this.fireEvent('onResizeStart') }.bind(this),
			onDrag				: function() { this.resize() }.bind(this)
			//onComplete			: function() { this.fireEvent('onResizeEnd') }.bind(this)
		});
	},

	resize: function() {

		this.view[0].setStyle('width', this.handler.getCoordinates().left - this.element.getCoordinates().left + 3);
		this.view[1].setStyle('width', this.element.getSize().x - this.view[1].element.getSize().x);
		this.fireEvent('onResize');
	}
});
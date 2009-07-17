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
		
		
	Implied global: 
		UI,
		Class,Element,Hash
	
	Members:
		Extends, SplitView, View, addEvent, bind, build, buildSplitter, 
	    buildViews, component, components, draglimit, each, element, fireEvent, 
	    getCoordinates, getSize, inject, left, limit, makeDraggable, minSize, 
	    onDrag, options, overflow, parent, props, push, setStyle, size, 
	    splitter, updateSize, view, views, x, y
	*/

UI.SplitView = new Class({
	
	Extends: UI.View,
	
	options: {
		component: 'splitview',
		
		overflow: 'hidden',
		minSize: 20,
		
		splitter: true
	},
	
	build: function(){
		this.parent();

		this.addEvent('injected', function(){
			this.size = this.getSize();
							
			this.buildViews();
			if (this.options.splitter) {
				this.buildSplitter();
			}
		
		}.bind(this));
	},
	
	/*
		function : buildViews
		
			Get Information from components skin and build views

	 */
	
	buildViews: function() {
		this.view = [];
		var list = new Hash(this.props.views);
		
		list.each( function(props,name){
			var view = new UI.View(props)
			 .inject(this.element);	 
			this.view.push(view);
			this[name] = view;
		},this);

		this.view[1].element.setStyle('width', this.size.x - this.view[0].getSize().x);
	},

	/*
		function : buildSplitter
		
			Build splitter element depending on skin def
		
		
	 */

	buildSplitter: function() {
		var props = this.props.components.splitter;
		
		this.draglimit = {
			x: [this.options.minSize,  this.size.x-this.options.minSize],
			y: [0, 0]
		};
		
		this.splitter = new Element('div',props)
		.inject(this.element);
		
		this.splitter.makeDraggable({
			limit: this.draglimit,
			onDrag: this.updateSize.bind(this)
		});
		
		this.splitter.setStyle('left',this.view[0].getSize().x);
	},

	/*
		function : resize
		
			resize 
		
		
	 */

	updateSize: function() {
		this.view[0].element.setStyle('width', this.splitter.getCoordinates().left - this.element.getCoordinates().left);
		this.view[1].element.setStyle('width', this.size.x - this.view[0].element.getSize().x);
		
		this.fireEvent('resize');
	}
	
});
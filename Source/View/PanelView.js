/*
Class: UI.PanelView
	Creates a panelView Object that let you browse inner views(panels) 

*/

UI.PanelView = new Class({
	Extends					: UI.View,
	
	
	options: {
		className			: 'ui-panelview',
		buildType			: 'div',
		properties			: {},
		styles				: {
			width			:'100%',
			height			:'100%'
		},
		direction			: 'horizontal',
		transitionType		: 'scroll',
		transitionFx		: {
    		duration		: 1600,
    		wait			: false
		},
		panel				: {
			className		: 'ui-panelview-panel',
			styles 			: {
				width			: '300px',
				height			: '100%'
			}
		},
		onLoad				: $empty,
		onComlete			: $empty,
		onTransition		: $empty,
		onResize			: $empty
	},

/*
    Function: initialize
   
    	Constructor

*/
	
	initialize: function(options){
		this.setOptions(options);
		this.list = new Array();
		this.fireEvent("onResize");
		this.build();
		
		this.transitionFx = new Fx.Scroll(this.element.element, this.options.transitionFx);
	},

/*
    Function: build
   
    	Create mainview

*/

 	build: function (){
		this.element = new UI.View({
			overflow			: 'hidden',
			styles				: {
				height: '100%',
			    margin: '0',
			    overflow: 'hidden',
			    padding: '0',
			    backgroundColor: '#FFF'
			}
		});
	},

	/*
    Function: add
   
    	Add panel(subview), intect it in the container, resize container and return it

	*/
	
	add: function() {
		var panel = new UI.View(this.options.panel);
		panel.element.inject(this.element.content);
		this.list.push(panel);
		
		//console.log('create panel: '+this.list.indexOf(panel));
		this.resize();	
		return panel;
	},

	/*
    Function: applyTransition
   
    	Set the given panel as active and move to it 

	*/


	applyTransition: function(panel) {
		this.panel = panel;
		this.transitionFx.toElement(panel.element);
	},


	/*
    Function: next
   
    	Find the next panel from the list and move to it if exist

	*/

	next: function() {
		var next = this.list.indexOf(this.panel)+1;
				
		if (this.list[next]) {
			this.applyTransition(this.list[next]);		
		}
	},

	/*
    Function: previous
   
    	Find the previous panel from the list and move to it if exist

	*/

	previous: function() {
		var prev = this.list.indexOf(this.panel)-1;
		if (this.list[prev]) {
			this.applyTransition(this.list[prev]);		
		}
	},

	/*
    Function: updateScrollBar
   
    	Update scrollbars of all subviews
    	
    Note:
    	Should be attach as event when creating subviews

	*/

	updateScrollBar : function(){
		this.list.each(function(panel,index) {
			panel.scrollbar.update();			  
		},this);
	},

	/*
    Function: resize
   
    	Resize main view content to fit its components (to enbable slide)
    
    Note: maybe can be accomplish using css but dont know how yet

	*/
	
	resize : function() {
		var size = 0;
		
		this.list.each(function(panel,index) {
			size = size + panel.element.getSize().x;				  
		});

		//this.element.content.setStyle('width',size+'px');
	},

	/*
    Function: inject
   
    	Inject the main view element into its container

	*/

	inject: function(container) {
		this.element.inject(container);
	},


	/*
    Function: remove
   
    	Destroy the main element view 

	*/

	remove: function(element) {
		
		element.destroy();
	},

	/*
    Function: removePanel
   
    	Destroy the given wrapper panel 
    	
    Note: it seems that the pop function that remove the panel from the list doesn't work

	*/
	
	removeAllNext: function(panel) {
		var next = this.list.indexOf(panel) + 1;
		var last = this.list.indexOf(this.list.getLast());
		
		if (next > last)  { return  } 
		
		for (var i = next; i <= last; i++) {
			//console.log('remove panel:'+i);
			var panel = this.list[i];
			if (panel) {
				this.list.pop(panel);
				panel.destroy();
			}
		}
	}
});

/*
	Class: UI.PaneView
		Creates a panelView Object that let you browse inner views(panels)
	
	Extends:
		<UI.View>
		
	Arguments:
		options
		
	Options:
		see <UI.View>
		
		
	Returns:
		Paneview object.
		
	Example:
		(start code)
		new UI.PaneView({
			url				: 'data.php?id=42',
			width			: 260,
			height			: 400,
		}).inject(this.content);
		(end)
	
	Discussion:
		Need to make some more cleaning in this class
*/

UI.PaneView = new Class({
	
	Extends: UI.View,
	
	options: {
		className: 'ui-paneview',
		component: 'view',
		properties: {},
		styles: {
			width: '100%',
			height: '100%'
		},
		overflow:'slide',
		direction: 'horizontal',
		transitionType: 'scroll',
		transitionFx: {
			duration: 1600,
			wait: false
		},
		pane: {
			className: 'ui-paneview-pane',
			styles: {
				width: '200px',
				height: '100%'
			}
		},
		onLoad: $empty,
		onComlete: $empty,
		onTransition: $empty,
		onResize: $empty
	},

	/*
	Method: build
		private function
		
		Overwrite <UI.View::build>. Create mainview

	Returns:
		(void)
	*/

 	build: function (){
		this.list = new Array();
		this.parent();
		this.setBehaviour();
		
		
	},
	/*
    Function: setBehaviour
   
    	Add pane(subview), intect it in the container, resize container and return it

	*/
	
	setBehaviour : function(){
		this.transitionFx = new Fx.Scroll(this.element, this.options.transitionFx);
	},

	/*
    Function: add
   
    	Add pane(subview), intect it in the container, resize container and return it

	*/
	
	add: function(pane){
		var pane = new UI.View(this.options.pane).inject(this.content);
		
		this.list.push(pane);
		
		this.resize();	
		return pane;
	},

	/*
    Function: applyTransition
   
    	Set the given pane as active and move to it 

	*/


	applyTransition: function(pane){
		console.log('apply transition on element '+this.element);
		this.pane = pane;
		this.transitionFx.toElement(this.list.getLast());
		console.log('list length:'+this.list.length);
	},


	/*
    Function: next
   
    	Find the next pane from the list and move to it if exist

	*/

	next: function(){
		var next = this.list.indexOf(this.pane)+1;
				
		if (this.list[next]) {
			this.applyTransition(this.list[next]);		
		}
	},

	/*
    Function: previous
   
    	Find the previous pane from the list and move to it if exist

	*/

	previous: function(){
		var prev = this.list.indexOf(this.pane)-1;
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
		this.list.each(function(pane,index) {
			pane.scrollbar.update();			  
		},this);
	},

	/*
    Function: resize
   
    	Resize main view content to fit its components (to enbable slide)
    
    Note: maybe can be accomplish using css but dont know how yet

	*/
	
	resize: function(){
		var size = 0;
		
		this.list.each(function(pane,index) {
			size = size + pane.element.getSize().x;
			console.log('update size');				  
		});

		this.content.setStyle('width',size+'px');
	},

	/*
    Function: inject
   
    	Inject the main view element into its container

	*/

	inject: function(container){
		this.element.inject(container);
	},


	/*
    Function: remove
   
    	Destroy the main element view 

	*/

	remove: function(element){
		
		element.destroy();
	},

	/*
    Function: removePane
   
    	Destroy the given wrapper pane 
    	
    Note: it seems that the pop function that remove the pane from the list doesn't work

	*/
	
	removeAllNext: function(pane) {
		console.log('-- removeAllNext() from pane '+this.list.indexOf(pane));
		var last = this.list.getLast();
		console.log('last '+this.list.indexOf(last));
		while (last != pane) {
			console.log('remove '+this.list.indexOf(last));	
			this.list.erase(last);
			last.destroy();
			last = this.list.getLast();
		}
	}
	
	
	
});

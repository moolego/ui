/*
	Class: UI.PaneView
		Creates a paneView Object that let you browse inner views(panes)
	
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
			height: '100%',
			overflow:'hidden'
		},
		overflow:'slide',
		direction: 'horizontal',
		transitionType: 'scroll',
		transitionFx: {
			transition: Fx.Transitions.Quad.easeOut,
			duration: 300,
			wait: false
		},
		pane: {
			className: 'ui-paneview-pane',
			styles: {
				'float': 'left',
				width: '200px',
				height: '100%'
			}
		},
		onTransition: $empty
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
		var pane = new UI.View(this.options.pane)
		 .inject(this.content);
		
		this.list.push(pane);
		
		this.addEvent('resize',function(){
			pane.scrollbar.update();
			
		});
		
		
		this.resize();	
		return pane;
	},

	/*
    Function: applyTransition
   
    	Set the given pane as active and move to it 

	*/


	applyTransition: function(pane){
		this.pane = pane;
		if (this.element.getSize().x < this.content.getSize().x) {
			console.log('apply transition');
			this.transitionFx.toElement(pane);
		} else {
			//if (pane.element.getPrevious())
			//	this.transitionFx.toElement(pane.element.getPrevious());
		}
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
    Function: resize
   
    	Resize main view content to fit its components (to enbable slide)
    
    Note: maybe can be accomplish using css but dont know how yet

	*/
	
	resize: function(){
		var size = 0;
		
		this.list.each(function(pane,index) {
			size = size + pane.element.getSize().x;			  
		});

		this.content.setStyle('width',size+'px');
	},

	/*
    Function: inject
   
    	Inject the main view element into its container

	*/

	inject: function(container){
		this.element.inject(container);
		return this;
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
		var last = this.list.getLast();
		while (last != pane) {
			this.list.erase(last);
			last.destroy();
			last = this.list.getLast();
		}
	}
	
	
	
});

/*
Class: UI.TabView
	Creates a panels container that let you manage inner panels.

*/

UI.TabView = new Class({
	Extends: UI.View,
	
	options: {
		component: 'tabview',
		overflow : 'hidden'
	},
	
	/*
	 Method: initialize
	 Constructor
	 
	 */
	initialize: function(options){
		this.tabs = new Array();
		
		this.parent(options);
		
		
	},
	
	/*
	 Function: build
	 
	 Creates html structure and inject it to the dom.
	 
	 */
	build: function(){
		this.parent();
		this.buildTabs();
	},
	
	/*
	 Function: add
	 
	 Create tabbar and add tabs
	 
	 */
	buildTabs: function(){
		if (this.options.container) {
			var container = this.options.container
		} else {
			var container = this.element
		}
		
		this.tabbar = new UI.Element(this.props.components.tabbar)
		.addEvents({
			onClick : function() {
				this.element.setStyle('height','21px')			
			} 
		})
		.inject(container);
		
		this.options.tabs.each(function(tab){
			this.add(tab);
		}.bind(this));
	},
	
	/*
	 Function: add
	 
	 Create tab and its related view and addEvent
	 
	 */
	add: function(props){
		var view = new UI.View({ 
			height : this.options.height - 21,
			type : 'tab'
		})
		.setStyle('height',this.options.height - 21)
		.inject(this.content).hide();
		
		var tab = new UI.Button({
			type: 'tab',
			label: props.name,
			onClick: function() { 
				if (tab == this.tab) return;
			
				if (props.url) 
					view.setContent('ajax',props.url);
				
				view.show();
				
				if (this.view) this.view.hide();
				tab.options.state = 'active';
				
				if (this.tab) {
					this.tab.options.state = 'default';
					this.tab.setState('default');
				}
								
				this.tab = tab;
				this.view = view; 
			}.bind(this)
		});
		
		if (props.selected) this.selected = tab;
		
		this.tabs.push(tab);		
	},
	
	/*
    	Function: setContent
    
    		Set Content of the current view (tab)
	*/		
	
	setContent: function(method,source,options) {
		this.view.setContent(method,source,options);
	},
	
	setBehavior : function() {
		this.parent();
		
		this.addEvent('injected', function(){
			var item = this.selected || this.tabs[0];
			item.options.state = 'active';
			this.tabs.each(function(tab){
				tab.inject(this.tabbar);
			}.bind(this));
			item.setState('active');
			item.fireEvent('click');
		});
	},
	
	/*
    	Function: setActiveTab
    
    		Set wich tab should be activated
	*/
	
	setActiveTab: function(num) {
		if (num > 0 && num <= this.tabs.length) {
			this.tabs[--num].setState('active');
			this.tabs[num].fireEvent('click');
		}
	}
	
	
});

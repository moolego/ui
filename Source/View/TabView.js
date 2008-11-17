/*
Class: UI.TabView
	Creates a panels container that let you manage inner panels.

*/

UI.TabView = new Class({
	Extends: UI.View,
	
	Implements: [Events, Options],
	
	options: {
		component: 'tabview',
	},
	
	/*
	 Method: initialize
	 Constructor
	 
	 */
	initialize: function(options){
		this.parent(options);
	},
	
	/*
	 Function: build
	 
	 Creates html structure and inject it to the dom.
	 
	 */
	build: function(){
		this.parent();
		this.setTabs();
		
		//return tabs;
	},
	
	/*
	 Function: add
	 
	 Create tabbar and add tabs
	 
	 */
	setTabs: function(){
		this.tabbar = new UI.Element(this.props.components.tabbar)
		.inject(this.options.container);
		
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
			type : 'tab'
		}).inject(this.content).hide();
		
		var tab = new UI.Button({
			type: 'tab',
			label: props.name,
			onClick: function() { 
				if (tab == this.tab) return;
			
				if (props.url) view.setContent('ajax',props.url);
				
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
		}).inject(this.tabbar);
		
		//tab.addEvent();		
	}
});

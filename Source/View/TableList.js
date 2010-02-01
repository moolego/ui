/*
	Class: UI.TableView
		Creates a tabbar that let you manage inner view.
	
	Extends:
		<UI.View>

	
	Example:
	(start code)
		var tabview = new UI.TabView({
			resizable: true,
			tabs : [
				{
					name : 'Mootools',
					url	: 'assets/pulp1.json'
				},
				{
					name : 'MooLego',
					url	: 'assets/pulp2.json',
					selected : true
				}
			]
		}).inject(document.body);)
	(end)

	Implied global: 
		- MooLego - UI,
		- MooTools - Class -
	
	
	Members:
		Button, Element, Extends, TabView, View, add, addEvent, 
	    addEvents, bind, build, buildTabs, component, components, container, 
	    content, each, element, fireEvent, height, hide, initialize, inject, 
	    label, length, name, onClick, options, overflow, parent, props, push, 
	    scrollbar, selected, setActiveTab, setBehavior, setContent, setState, 
	    setStyle, show, state, tab, tabbar, tabs, type, update, url, view

*/

UI.TabView = new Class({
	
	Extends: UI.View,
	
	options: {
		component: 'tabview',
		overflow: 'hidden'
	},
	
	/*
	Function: build
		private function
		
		Creates html structure and inject it to the dom.
	
	See also:
		<UI.View::build>
		<UI.Element::build>
	*/
	
	build: function(){
		this.list = [];
		
		this.parent();
		this.buildTabs();
		this.buildView();
		
		this.options.tabs.each(function(tab){
			this.add(tab);
		}.bind(this));
	},

	
	/*
	 Function: add
	 
	 Create tabbar and add tabs
	 */
	
	buildTabs: function(){
		var container = '';
		if (this.options.container) {
			container = this.options.container;
		} else {
			container = this.element;
		}
		
		this.tabbar = new UI.Element(this.props.components.tabbar)
		.inject(container);
	},

	/* 
	Function: buildView
		private function
		
		Create a new view of the define type and attach related window events
	
	Returns:
		(void)
		
	Discussion:
		We should setup a better switch to build view according its type
	*/
	buildView : function() {
		this.tabview = new UI.View({
			skin: this.options.skin,
			overflow: 'hidden'
		}).inject(this.content);
		
		this.addEvents({
			injected: function() {
				this.updateSize();
				this.tabview.fireEvent('onResize'); 
			}
		});
	},
	/*
	 Function: add
	 
	 Create tab and its related view and addEvent

	*/
	
	add: function(props){
		var view = new UI.View({
			type : 'tab'
		}).inject(this.tabview).hide();
		
		var tab = new UI.Button({
			type: 'tab',
			label: props.name,
			onClick: function() { 
				if (tab == this.tab) {
					return;
				}
			
				if (props.url && !view.element.retrieve('loaded')) {
					view.setContent('ajax', props.url);
					view.element.store('loaded',true);
				}
					
				view.show();
				view.scrollbar.update();
				
				if (this.view) {
					this.view.hide();
				}
				tab.options.state = 'active';
				
				if (this.tab) {
					this.tab.options.state = 'default';
					this.tab.setState('default');
				}
								
				this.tab = tab;
				this.view = view; 
			}.bind(this)
		});
		
		this.addEvent('resize',function(){
			view.scrollbar.update();
		});
		
		if (props.selected) {
			this.selected = tab;
		}
		
		this.list.push(tab);		
	},
	
	/*
    	Function: setContent
    
    		Set Content of the current view (tab)
	*/		
	
	setContent: function(method,source,options){
		this.active.setContent(method,source,options);
	},
	
	/*
    	Function: setBehavior
    
    		Set some behaviours
	*/		
	
	setBehavior: function() {
		this.parent();
		
		this.addEvent('injected', function(){
			var item = this.selected || this.list[0];
			item.options.state = 'active';
			this.list.each(function(tab){
				tab.inject(this.tabbar);
			}.bind(this));
			item.setState('active');
			item.fireEvent('click');
		});
	},


	/*
	Function: setSize
		Set window's frame size and updateSize
	
	Returns:
		this
	
	See also:
		<UI.Element::setSize>			
	*/  

	setSize: function(width, height, state){
		this.parent(width, height, state);
		this.updateSize();
		
		return this;
	},	

	/*
	Function: updateSize
		Update size and position of the window inner components
	
	Returns:
		(void)
	*/
	updateSize: function(){
		element = this.element.getComputedSize();
		
		// hummm...
		
		this.tabbarHeight = this.tabbar.getComputedSize().totalHeight;
		//this.tabbar.setSize(element.width,'21');
		var view = this.tabview.getComputedSize();
		
		var viewHeight = element.height - this.tabbarHeight - (view.computedBottom + view.computedTop);
		this.tabview.setStyle('height', viewHeight);
		this.fireEvent('onResize');
	},
	
	/*
    	Function: setActiveTab
    
    		Set wich tab should be activated
	*/
	setActiveTab: function(num){
		if (num > 0 && num <= this.list.length) {
			this.list[--num].setState('active');
			this.list[num].fireEvent('click');
		}
	},
	
	/*
    	Function: next
    
    		Set next tab active. nothing if last.
	*/
	
	next: function(num){
		if (num > 0 && num <= this.list.length) {
			this.list[--num].setState('active');
			this.list[num].fireEvent('click');
		}
	}

});

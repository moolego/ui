/*
Class: UI.TabView
	Creates a panels container that let you manage inner panels.

*/

UI.TabView = new Class({
	Extends			: UI.View,
	
	Implements: [Events, Options],
	
	options: {
		className			: 'ui-tabview',
		viewOverflow		: 'hidden'
	},
	
	initialize: function(options){
		this.setOptions(options);
		this.list = new Array();	
		this.build();
	},

	/*
	    Function: build
	
	      Creates html structure and inject it to the dom. 
	
	*/

 	build: function (){
		if (this.options.container) {
			this.container = this.options.container
		} else {
			this.container = new UI.View({
				className	: this.options.className,
				styles		: this.options.styles,
				overflow	: 'hidden'
			});
		}

		console.log('create and inject tabs before :'+this.container);
		
		this.tabs = new Element('div', { 
			'class' : 'ui-tabview-bar',
			styles	: {
				position		: 'absolute',
				display			: 'block',
				fontSize		: '.7em',
				height			: '24px',
				backgroundColor	: '#989898',
				padding			: '0',
				margin			: '0'
			}
		}).inject(this.container,'before');

		this.options.tabs.each( function(tab) {
			this.add(tab);
		}.bind(this));
		 
		//return tabs;
	},

	/*
	    Function: add
	
	      Create tab and its related view and addEvent
	
	*/
	
	add: function(tab) {
		var className = this.options.className;
		
		var newTab = new UI.Button({
			label 	: tab.name,
			width	: 70,
			height	: 20,
			onClick : function(){ new App.ControlTest(); }
		}).inject(this.tabs);			

		if (!tab.view) tab.view = {}

		tab.view.container = this.container;
		tab.view.className = 'ui-tabview-view';
		tab.view.styles = { display : 'none' };
		
		var view = new UI.View(tab.view)
		.setStyles({
			width	: '100%',
			height	: '100%',
			display	: 'none'
		}).hide();
		
		newTab.addEvent('click', function() { 
			console.log('click on tab: '+tab.name);
			if (this.view) this.view.hide();
			//if (this.tab) this.tab.removeClass(className+'-tab-s');
			if (tab.url) view.setContent('iframe',tab.url);
			view.show();
			newTab.addClass(className+'-tab-s');
			this.tab = newTab;
			this.view = view; 
		}.bind(this));		
	},

	/*
	    Function: inject
	
	      Inject tabView
	
	*/
	
	inject: function(container) {
		this.container.inject(container);
	}
});

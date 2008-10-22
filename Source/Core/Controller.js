/*
Class: UI.Controller
	base class for controllers.

License:
	MIT-style license.

Require:
	UI/Windows.js

*/


UI.Controller = new Class({
	Implements 			: [Events, Options],
	
	options: {
		zBase			: 1
	},
	
	initialize: function(options){
		this.setOptions();
		this.zIndex = this.options.zBase;
		this.followers = [];
		this.i = 0;
	},

/*
	  Function: register
	  
	   	Add passing element to the elements list
	   
	  Arguments: window Object
	  
	 */	
	
	register: function(elementClass) {
		//get first element parent made with UI
		var element = elementClass.element.getParent();
		while (element && !element.ui) {
			element = element.getParent();
		}
		
		//store element in first element parent made with UI
		if (element) {
			if (!element.elements) element.elements = new Hash();
			if (!element.elements[elementClass.options.component]) element.elements[elementClass.options.component] = new Array();
			element.elements[elementClass.options.component].push(elementClass);	
		
		//store element in UI (element is not in our UI)
		} else {
			if (!UI.elements[elementClass.options.component]) UI.elements[elementClass.options.component] = new Array();
			UI.elements[elementClass.options.component].push(elementClass);
		}
		
		//replace tips
		if (elementClass.options.component != 'tip') {
			window.fireEvent('resize');
		}
		
		//set z-index
		if (elementClass.element.getStyle('zIndex') == 'auto' || elementClass.element.getStyle('zIndex') == 0)
			elementClass.element.setStyle('zIndex', elementClass.options.zIndex || this.zIndex++);
	}
});

UI.controller = new UI.Controller();

//UI.Controller.toSingleton();

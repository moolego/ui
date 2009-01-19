/*
Class: UI.Controller
	Default element controller.
	It handle element's z-index as well as group managing and group serialization (usefull for controls values
*/

UI.Controller = new Class({
	
	Implements: [Events, Options],
	
	options: {
		zBase: 1
	},
	
	/*
	Constructor: initialize
		Constructor
		
	Arguments:
		options - (object) options
	*/
	
	initialize: function(options){
		ui.elements = new Array();
		
		this.setOptions();
		this.zIndex = this.options.zBase;
		this.groups = {};
		this.elements = [];
		this.closeMenu = $empty;
		this.setBehavior();
		this.handelKeys();
	},

	/*
	Function: register
		private function
		
		Add passing element to the elements list
	   
	Arguments:
		object - (object) an element class' instance
	  
	 */
	
	register: function(object){
		var oid = ui.elements.push(object) - 1;
		/*
		//get first element parent made with UI
		var element = object.element.getParent();
		while (element && !element.ui) {
			element = element.getParent();
		}
		
		//store element in first element parent made with UI
		if (element) {
			if (!element.elements) element.elements = new Hash();
			if (!element.elements[object.options.component]) element.elements[object.options.component] = new Array();
			element.elements[object.options.component].push(object);	
		
		//store element in UI (element is not in our UI)
		} else {
			if (!UI.elements[object.options.component]) UI.elements[object.options.component] = new Array();
			UI.elements[object.options.component].push(object);
		}
		
		//replace tips
		if (object.options.component != 'tip') {
			window.fireEvent('setTipsPosition');
		}
		*/
		
		//set z-index
		if (object.element.getStyle('zIndex') == 'auto' || object.element.getStyle('zIndex') == 0)
			object.element.setStyle('zIndex', object.options.zIndex || this.zIndex++);
			
		//add element to the group if needed
		if (object.options.group) this.group(oid);
	},
	
	/*
	Function: group
		private function
		
		Add passing element to provided group
	   
	Arguments:
		object - (object) an element class' instance
	  
	 */
	
	group: function(oid) {
		//we check if the group exist, else we create it
		this.groups[ui.elements[oid].options.group] = this.groups[ui.elements[oid].options.group] || new Array();
		this.groups[ui.elements[oid].options.group].push(oid);
	},
	
	/*
	Function: serialize
		private function
		
		Add passing element to the elements list
	   
	Arguments:
		groupID - (string) name of the group you want to serialize element's value.
	  
	*/
	
	serialize: function(groupID) {
		if (!this.groups[groupID]) return false;
		//we get all elements
		var string = [];
		this.groups[groupID].each(function(eC){
			if (eC.value) string.push(eC.options.name + '=' + eC.value);
		});
		console.log(string.join('&'));
	},
	
	setBehavior: function(){
		document.addEvent('mousedown', function(e){
			this.closeMenu(e);
		}.bind(this));
	},
	
	handelKeys : function(){
		window.addEvent('keydown', function(e){
			//menuTest
			if (e.key == 'down' && this.menu) {
				this.menu.goDown();
			}
			else if (e.key == 'up' && this.menu) {
				this.menu.goUp();
			}
		}.bind(this));
	}
	
});

ui.controller = ui.controller || new UI.Controller();

/*
Object: UI
  MooLego UI - a User Interface Library built on MooTools.
 
License:
  MIT-style license.
 
Copyright:
  Copyright (c) 2007-2009 [Jerome Vial](http://moolego.org/).
 
Code & Documentation:
  [The MooLego Team](http://moolego.net/developers/).
 
Inspiration:
  - Love inspired by [MooTools](http://www.mootools.net) Copyright (c) 2006-2008, [MIT-style license](http://opensource.org/licenses/mit-license.php)
  - ui.notifitation is more than inspired by NotificationCenter for MooTools [notificationCenter.js](http://return42.blogspot.com/2009/07/notification-message-dispatch-for.html) (c) 2009 Tobias Svensson [MIT License](http://opensource.org/licenses/mit-license.php)

*/

var UI = {
  props		: {},
  
};

var ui = {
	'version': '0.2',
 	'build': '%build%',
	'defaultSkin': 'AquaGraphite'
};
ui.controller = {};


/*
Namespace: ui.notification
	A simple implementation of a notification center for MooTools. This is just a 
	draft, more or less. It is heavily inspired by NSNotificationCenter from Apple's 
	Cocoa framework.

Implied global: 
	- MooLego - ui

Members:
	addObserver, each, erase, include, name, notification, 
    observer, observers, postNotification, removeObserver, selector, sender, 
    start
	
Credit:
	(c) 2009 Tobias Svensson

*/

ui.notification = {
	start: function(){
		this.observers = [];
	},

	/*
	Function: add
		Add observer to the notification list
	   
	Arguments:
		- observer - (object) observing object
		- name - (event)
		- selector - (function) observing object call back
		- sender - (object) sending object
	
	  
	*/

	add: function(observer, name, selector, sender){
		if (!observer || !name || !selector) {
			return;
		}
		
		var newObserver = {
			'observer': observer,
			'name': name,
			'selector': selector,
			'sender': sender
		};
		this.observers.include(newObserver);
	},

	/*
	Function: post
		This will post a notification for the 'eventName' event and send the sender 
		called sendingObject and the message (in this case an array) someArray to the
		receiver.
	   
	Arguments:
		- name - (object) an observer
		- sender - (object)
		- object - 
	  
	*/
	
	post: function(name, sender, object){
		if (!name || !sender || !object) {
			return;
		}
		
		this.observers.each(function(o, index){
			if (o.name === name) {
				if ((o.sender && o.sender === sender) || (!o.sender)) {
					o.selector(name, sender, object);
				}
			}
		});
	},

	/*
	Function: remove
		Which will then remove all registered elements for observingObject from the 
		dispatch list.
	   
	Arguments:
		observer - (object) observing object
	  
	 */
	
	remove: function(observer){
		if (!observer) {
			return;
		}
		
		this.observers.each(function(o, index){
			if (o.observer === observer) {
				this.observers.erase(o);
			}
		});
	}
};
 
ui.notification.start();



/*
	Object: ui.controller.element

	Default element controller.
	It handle element's z-index as well as group managing and group serialization (usefull for controls values)
	
	Implied global:
		- MooLego - ui
		- MooTools - $empty
		- Javascript - window

	Members:
		addEvent, bind, closeMenu, controller, each, element, elements, 
	    getStyle, goDown, goUp, group, groups, handelKeys, join, key, list, 
	    menu, name, options, push, register, serialize, setBehavior, setStyle, 
	    start, value, zIndex

	Discussion: 
		For now, the controller structure is not well defined, 
	
*/

ui.controller.element = {

	/*
	Constructor: start
		Constructor
		
	Arguments:
		options - (object) options
	*/
	
	start: function(){
		this.list = [];
		
		this.zIndex = 1;
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
		var oid = this.list.push(object) - 1;
		
		//set z-index
		if (object.element.getStyle('zIndex') == 'auto' || object.element.getStyle('zIndex') === 0) {
			object.element.setStyle('zIndex', object.options.zIndex || this.zIndex++);
		}
			
		//add element to the group if needed
		if (object.options.group) {
			this.group(oid);
		}
		
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
			if (!this.list[object.options.component]) this.list[object.options.component] = new Array();
			this.list[object.options.component].push(object);
		}
		
		//replace tips
		// should in tips contreller in tips.js
		
		if (object.options.component != 'tip') {
			window.fireEvent('setTipsPosition');
		}
		*/
		
	},
	
	/*
	Function: group
		private function
		
		Add passing element to the provided group
	   
	Arguments:
		object - (object) an element class' instance
	  
	 */
	
	group: function(oid) {
		//we check if the group exists, else we create it
		this.groups[this.list[oid].options.group] = this.groups[this.list[oid].options.group] || [];
		this.groups[this.list[oid].options.group].push(oid);
	},
	
	/*
	Function: serialize
		private function
		
		Add passing element to the elements list
	   
	Arguments:
		groupID - (string) name of the group you want to serialize element's value.
		
	Discussion:
	
		Not implemented
	  
	*/
	
	serialize: function(groupID) {
		if (!this.groups[groupID]) {
			return false;
		}

		var string = [];
		this.groups[groupID].each(function(eC){
			if (eC.value) {
				string.push(eC.options.name + '=' + eC.value);
			}
		});
		
		return string.join('&');
	},

	/*
	Function: handelKeys
		private function
		
		Listen to the keyboard and propagate effect on menu
		
	Discussion:
	
		Should be handled by ui.notification and UI.Menu
		or by ui.controller.menu eventual
		and should be optional
	  
	*/
	
	setBehavior: function(){
		document.addEvent('mousedown', function(e){
			this.closeMenu(e);
		}.bind(this));
	},
	
	/*
	Function: handelKeys
		private function
		
		Listen to the keyboard and propagate effect on menu
		
	Discussion:
	
		Should be also handled by ui.notification and UI.Menu
		
	  
	*/

	handelKeys : function(){
		window.addEvent('keydown', function(e){
			if (e.key == 'down' && this.menu) {
				this.menu.goDown();
			}
			else if (e.key == 'up' && this.menu) {
				this.menu.goUp();
			}
			
			//var ev = new Event(e).stop();
		}.bind(this));
	}
	
};

ui.controller.element.start();

/*
---
description: The UI.Interface class let you replace default dom components by mooolego components.

authors: [moolego,r2d2]

requires:
- core:1.2.1: '*'
- mooCanvas

provides: [UI.Canvas]
 
...
*/
/*
	
	Class: UI.Interface
		The UI.Interface class let you replace default dom components by mooolego components.
	
	Require:
		UI.Skin
		UI.Canvas
		UI.Element
		And the components you want to be replaced
	
	Arguments:
		Options
	
	Options: 
		target - (string) define the element container id of what you want to be replaced (nice english, is'nt it?)
	
	Example:
		(start code)
		new UI.Interface({
			target: 'formular'
		});
		(end)
		
	Implied global: 
		Moolego - UI
		Mootools - $, Class, Events, Options
		
	Members:
		Button, Checkbox, Element, Implements, Input, Interface, 
	    RadiosGroup, Select, Textarea, adopt, component, destroy, each, element, 
	    get, getChildren, getElement, getElements, getSize, getStyle, getStyles, 
	    height, html, initialize, inject, inputStyles, label, list, name, 
	    newRadio, options, process, processButton, processCheckbox, 
	    processFieldset, processInput, processRadio, processSelect, 
	    processTextarea, push, radios, replaceTag, selectable, setOptions, 
	    styles, submit, target, text, toInt, value, width, x, y
*/

UI.Interface = new Class({

	Implements : [Options, Events],

	options: {
		target: 'document.body',
		replaceTag: 'input, select, textarea, fieldset'
	},

	initialize: function(options){
		this.setOptions(options);
		
		this.radios = {};
		
		//define the target
		this.target = $(this.options.target);
		
		this.process();
	},

	/* 
	Function: process
		private function
		
		process all element depending on the tag name and type
		
		Return 
		 	void
	*/

	process: function(){
		//get form elements and replace them
		this.target.getElements(this.options.replaceTag).each(function(control){
			switch (control.get('tag')) {
				case 'input' :
					switch (control.get('type')) {
						case 'text': 
							this.processInput(control);
							break;
						case 'password': 
							this.processInput(control);
							break;
						case 'radio':
							this.processRadio(control);
							break;
						case 'button':
							this.processButton(control); 
							break;
						case 'reset':
							this.processButton(control); 
							break;
						case 'submit':
							this.processButton(control); 
							break;
						case 'checkbox': 
							this.processCheckbox(control);
					}
					break;
				case 'select':
					this.processSelect(control);
					break;
				case 'textarea':
					this.processTextarea(control);
					break;
				case 'fieldset':
					this.processFieldset(control);
					break;
				case 'fieldset':
					this.processFieldset(control);
					break;
			}
		}, this);

		// skin the form
		var coord = this.target.getSize();
		var element = new UI.Element({
			component : 'input',
			element : this.target
		});

	},

	/* 
	Function: processRadio
		private function
		
		process replacement of all radio on the scope of the target
		
		Return 
		 	void
	*/

	processRadio: function (element) {
		var name = element.get('name');

		//create a new controller
		if (!this.radios[name]) {
			this.radios[name] = new UI.RadiosGroup({
				name : name
			});
		}

		this.radios[name].newRadio({
			value : element.get('value'),
			label : false,
			styles : element.getStyles('padding', 'margin', 'top', 'left')
		}).inject(element, 'after');
		
		element.destroy();
	},

	/* 
	Function: processInput
		private function
		
		process replacement of all input on the scope of the target
		
		Return 
		 	void
	*/

	processInput: function(element) {
		var coord = element.getSize();
		
		var input = new UI.Input({
			width: coord.x,
			height: coord.y,
			name: element.get('name'),
			value: element.get('value'),
			inputStyles: element.getStyles('padding', 'fontSize'),
			styles: element.getStyles('margin', 'top', 'left')
		}).inject(element, 'before');
		
		element.destroy();
	},

	/* 
	Function: processTextarea
		private function
		
		process replacement of all textarea that are in the scope of the target
		
		Return 
		 	void
	*/

	processTextarea: function(element) {
		var coord = element.getSize();
	
		var textarea = new UI.Textarea({
			width: coord.x,
			height: coord.y,
			name: element.get('name'),
			value: element.get('value'),
			inputStyles: element.getStyles('padding'),
			styles: element.getStyles('margin', 'top', 'left')
		}).inject(element, 'before');
		
		element.destroy();
	},

	/* 
	Function: processSelect
		private function
		
		process replacement of all select that are in the scope of the target
		
		Return 
		 	void
	*/	

	processSelect: function(element) {
		//create the menu list
		var menu = [];
		element.getChildren().each(function(option){
			menu.push({
				text : option.get('html')
			});
		});

		var select = new UI.Select({
			name: element.get('name'),
			list: menu,
			styles: element.getStyles('padding', 'margin', 'top', 'left')
		}).inject(element, 'before');
		element.destroy();
	},

	/* 
	Function: processCheckbox
		private function
		
		process replacement of all select that are in the scope of the target
		
		Return 
		 	void
	*/	

	processCheckbox: function(element) {
		var checkbox = new UI.Checkbox({
			label: false,
			name: element.get('name'),
			styles: element.getStyles('padding', 'margin', 'top', 'left')
		}).inject(element, 'before');
		element.destroy();
	},

	/* 
	Function: processButton
		private function
		
		process replacement of all button that are in the scope of the target
		
		Return 
		 	void
	*/	

	processButton: function(element){
		var params = {};
		// is a submit type or not
		if (element.get('type') == 'submit') {
			params.submit = true;
		}
		params.label = element.get('value');
		//params.labelStyles = element.getStyles('padding');
		params.styles = element.getStyles('margin', 'top', 'left', 'float');
		var button = new UI.Button(params).inject(element, 'before');
		element.destroy();
	},

	/* 
	Function: processFieldset
		private function
		
		process replacement of all fieldset that are in the scope of the target
		
		Return 
		 	void
	*/

	processFieldset: function() {
		// skin the fieldset
		this.target.getElements('fieldset').each(function(fieldset){

			//skin the legend
			var l = fieldset.getElement('legend');
			var coord = l.getSize();
			var legende = new UI.Element({
				component: 'element',
				selectable: false,
				width: coord.x,
				height: coord.y,
				html: l.get('html'),
				styles: l.getStyles('width', 'padding', 'margin', 'display', 'top', 'left', 'fontWeight', 'fontSize', 'fontFamily')
			}).inject(fieldset, 'before');
			l.destroy();

			var size = fieldset.getSize();
			var f = new UI.Element({
				component: 'fieldset',
				width: size.x - fieldset.getStyle('paddingLeft').toInt() - fieldset.getStyle('paddingRight').toInt(),
				height: size.y - fieldset.getStyle('paddingTop').toInt() - fieldset.getStyle('paddingBottom').toInt(),
				styles: fieldset.getStyles('padding', 'margin', 'display', 'top', 'left')
			}).inject(fieldset, 'before');
			f.element.adopt(fieldset.getChildren());
			fieldset.destroy();
		});
	}
});

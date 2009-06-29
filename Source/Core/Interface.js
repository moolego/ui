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
		target : 'formular'
	});
	(end)
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
		
		this.build();
	},
	
	build: function(){
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
		new UI.Element({
			component : 'input',
			element : this.target
		});

	},
	
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
	
	processInput: function(element) {
		var coord = element.getSize();
		new UI.Input({
			width: coord.x,
			height: coord.y,
			name: element.get('name'),
			value: element.get('value'),
			inputStyles: element.getStyles('padding', 'fontSize'),
			styles: element.getStyles('margin', 'top', 'left')
		}).inject(element, 'before');
		element.destroy();
	},
	
	processTextarea: function(element) {
		var coord = element.getSize();
		new UI.Textarea({
			width: coord.x,
			height: coord.y,
			name: element.get('name'),
			value: element.get('value'),
			inputStyles: element.getStyles('padding'),
			styles: element.getStyles('margin', 'top', 'left')
		}).inject(element, 'before');
		element.destroy();
	},
	
	processSelect: function(element) {
		//create the menu list
		var menu = new Array();
		element.getChildren().each(function(option){
			menu.push({
				text : option.get('html')
			});
		});
		
		new UI.Select({
			name: element.get('name'),
			list: menu,
			styles: element.getStyles('padding', 'margin', 'top', 'left')
		}).inject(element, 'before');
		element.destroy();
	},
	
	processCheckbox: function(element) {
		new UI.Checkbox({
			label: false,
			name: element.get('name'),
			styles: element.getStyles('padding', 'margin', 'top', 'left')
		}).inject(element, 'before');
		element.destroy();
	},
	
	processButton: function(element){
		var params = {};
		// is a submit type or not
		if (element.get('type') == 'submit') params.submit = true;
		params.label = element.get('value');
		//params.labelStyles = element.getStyles('padding');
		params.styles = element.getStyles('margin', 'top', 'left', 'float');
		new UI.Button(params).inject(element, 'before');
		element.destroy();
	},
	
	processFieldset: function() {
		// skin the fieldset
		this.target.getElements('fieldset').each(function(fieldset){
			
			
			//skin the legend
			var f = fieldset.getElement('legend')
			var coord = f.getSize();
			new UI.Element({
				component: 'element',
				selectable: false,
				width: coord.x,
				height: coord.y,
				html: f.get('html'),
				styles: f.getStyles('width', 'padding', 'margin', 'display', 'top', 'left', 'fontWeight', 'fontSize', 'fontFamily')
			}).inject(fieldset, 'before');
			f.destroy();
			
			
			var size = fieldset.getSize();
			var fs = new UI.Element({
				component: 'fieldset',
				width: size.x - fieldset.getStyle('paddingLeft').toInt() - fieldset.getStyle('paddingRight').toInt(),
				height: size.y - fieldset.getStyle('paddingTop').toInt() - fieldset.getStyle('paddingBottom').toInt(),
				styles: fieldset.getStyles('padding', 'margin', 'display', 'top', 'left')
			}).inject(fieldset, 'before');
			fs.element.adopt(fieldset.getChildren());
			fieldset.destroy();
		});
		
	}
	
});

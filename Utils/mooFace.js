

var mooFace = new Class({
	Implements : [Options, Events],
	options : {
		target	: 'document.body'
	},
	
	initialize : function(options){
		this.setOptions(options);
		
		this.radios = {};
		
		//define the target
		this.target = $(this.options.target);
		
		this.build();
	},
	
	build : function(){
		//get form elements and replace them
		this.target.getElements('input, select, textarea').each(function(input){
			switch (input.get('tag')) {
				case 'input' :
					switch (input.get('type')) {
						case 'text' : 
							this.mInput(input);
							break;
						case 'password' : 
							this.mInput(input);
							break;
						case 'radio' :
							this.mRadio(input);
							break;
						case 'button' :
							this.mButton(input); 
							break;
						case 'submit' :
							this.mButton(input); 
							break;
						case 'checkbox' : 
							this.mCheckbox(input);
					}
					break;
				case 'select' :
					this.mSelect(input);
					break;
				case 'textarea' :
					this.mTextarea(input);
					break;
			}
		}, this);
		
		// skin the fieldset
		this.target.getElements('fieldset').each(function(fieldset){
			/*
			
			//skin the legend
			var f = fieldset.getElement('legend')
			var coord = f.getSize();
			new UI.Element({
				component	: 'element',
				selectable	: false,
				width		: coord.x,
				height		: coord.y,
				html		: f.get('html'),
				styles		: f.getStyles('padding', 'margin', 'display', 'top', 'left')
			}).inject(fieldset, 'before');
			f.destroy();
			
			
			var size = fieldset.getSize();
			var fs = new UI.Element({
				width		: size.x - fieldset.getStyle('paddingLeft').toInt() - fieldset.getStyle('paddingRight').toInt(),
				height		: size.y - fieldset.getStyle('paddingTop').toInt() - fieldset.getStyle('paddingBottom').toInt(),
				styles 		: fieldset.getStyles('padding', 'margin', 'display', 'top', 'left'),
				component 	: 'input'
			}).inject(fieldset, 'before');
			fs.element.adopt(fieldset.getChildren());
			fieldset.destroy();*/
		});
		
		// skin the form
		var coord = this.target.getSize();
		new UI.Element({
			component : 'input',
			element : this.target
		});

	},
	
	mRadio : function (element) {
		var name = element.get('name');
		
		//create a new controller
		if (!this.radios[name]) {
			this.radios[name] = new UI.RadiosGroup({
				name : name
			});
		}
		
		this.radios[name].newRadio({
			value : element.get('value'),
			styles : element.getStyles('padding', 'margin', 'display', 'top', 'left')
		}).inject(element, 'after');
		element.destroy();
	},
	
	mInput : function(element) {
		var coord = element.getSize();
		new UI.Input({
			width		: coord.x,
			height		: coord.y,
			name		: element.get('name'),
			value 		: element.get('value'),
			inputStyles : element.getStyles('padding'),
			styles		: element.getStyles('margin', 'display', 'top', 'left')
		}).inject(element, 'before');
		element.destroy();
	},
	
	mSelect : function(element) {
		//create the menu list
		var menu = new Array();
		element.getChildren().each(function(option){
			menu.push({
				text : option.get('html')
			});
		});
		
		new UI.Select({
			name : element.get('name'),
			list : menu,
			styles : element.getStyles('padding', 'margin', 'display', 'top', 'left')
		}).inject(element, 'before');
		element.destroy();
	},
	
	mCheckbox : function(element) {
		new UI.Checkbox({
			label : false,
			name : element.get('name'),
			styles : element.getStyles('padding', 'margin', 'top', 'left')
		}).inject(element, 'before');
		element.destroy();
	},
	
	mButton : function(element){
		var params = {};
		// is a submit type or not
		if (element.get('type') == 'submit') params.submit = true;
		params.label 		= element.get('value');
		params.labelStyles 	= element.getStyles('padding');
		params.styles 		= element.getStyles('margin', 'display', 'top', 'left', 'float');
		new UI.Button(params).inject(element, 'before');
		element.destroy();
	}
});

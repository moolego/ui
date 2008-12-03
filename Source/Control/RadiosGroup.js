/*
Class: UI.RadioGroup
	Creates button and let you attach events action

Arguments:
		

Options: 
	className - (string) css classname for the given button

Example:
	(start code)
		var radios = new UI.Control.RadioGroup({
			name		: 'radioname'
		}).inject(myForm);
		radios.newRadio({
			label		: 'FooBar',
			value		: 'foobar'
		});
	(end)
*/

UI.RadiosGroup = new Class({
	Extends				: UI.Control,
	
	options				: {
		
		// default options
		className		: 'ui-radio',
		value			: '',
		component		: 'radio',
		type			: 'default',
		state			: 'default',
		skin			: false,
		props	: false,

		// implemented events
		onClick			: $empty,
		onMouseOver		: $empty
	},
	
	initialize: function(options) {
		this.parent(options);
		//this.setSkin();
		
		this.radios = [];
		this.selectedRadio = false;
		
	},
	
	newRadio : function(opt) {
		var radio = new Element('span', {
			'class'	: 'ui-radio',
			styles : $merge({
				position : 'relative',
				display : 'inline-block',
				height	: 15,
				zIndex 	: this.radios.length+1
			}, opt.styles)
		}).store('value', opt.value);
		
		this.radios.push(radio);
		if(!this.radios[1]) {
			this.control = radio;
			this.setInput();	
		}
		
		if (opt.label) {
			var label = new UI.Label({
				skin 		: this.options.skin,
				'for'		: this.options.name,
				html 		: opt.label,
				styles 		: this.props.styles
			}).inject(radio);
			
			//set width to element
			radio.setStyle('width', 100);
		} else {
			radio.setStyle('width', this.props.width);
		}
		
		this.setCanvas(radio);
		
		if(opt.selected && !this.selectedRadio) {
			this.selectedRadio = radio;
			this.input.value = radio.retrieve('value');
			this.setState(radio, 'selected');
		}
		this.addRadioAction(radio);

		return radio;
	},
	
	addRadioAction : function(radio) {
		radio.addEvents({
			'click': function(){
				if (this.selectedRadio) this.setState(this.selectedRadio, 'default');
				this.setState(radio, 'selected');
				this.selectedRadio = radio;
				this.input.value = radio.retrieve('value');
			}.bind(this)
		});
	},
	
	/* 
		Method: setCanvas
		
			Draw the canvas
	*/
	
	setCanvas : function(radio){
		if (radio.canvas || (this.props && !this.props.layers) || (this.props && this.props.layers && this.props.layers.length == 0))
			return false;
			
		radio.canvas = new UI.Canvas({
			props 			: this.props,
			width			: this.props.width,
			height			: this.props.height
		}).inject(radio);
		
		radio.addEvent('setCanvasSize', function(){
			this.canvas.setSize(this.element.x,this.element.y, this.props);
		});
	},
	
	setState : function(radio, state) {
		radio.canvas.draw(this.skin[state]);
	}
});
/*
	Class: UI.RadiosGroup
		Create a radios group able to make radio
	
	Extends:
		<UI.Control>
	
	Arguments:
		options
		
	Options (RadiosGroup):
		name - (string) name of the radiosgroup input
	
	Options (RadiosGroup.newRadio):
		label - (string) radio label
		value - (string) radio value
		selected - (boolean) define if the radio must be selected at creation or not

	Example:
		(start code)
			var radios = new UI.Control.RadioGroup({
				name		: 'radioname'
			});
			radios.newRadio({
				label		: 'FooBar',
				value		: 'foobar'
			}).inject(document.body);
			radios.newRadio({
				label		: 'FooBar 2',
				value		: 'foobar_2',
				selected	: true
			}).inject(document.body);
		(end)
		
	Discussion:
		Should use UI.Controller group instead of a radiogroup, then create a UI.Radio class
*/

UI.RadiosGroup = new Class({
	Extends				: UI.Control,
	
	options				: {
		// default options
		name			: 'radiosgroup',
		component		: 'radio'
	},
	
	/*
	Constructor: initialize
		Constructor
		
	Arguments:
		options - (object) options
	
	Returns:
		this
	
	See also:
		<UI.Element::initialize>
	*/
	
	initialize: function(options) {
		this.parent(options);
		
		this.radios = [];
		this.selectedRadio = false;
		
		return this;
	},
	
	/* 
	Function: newRadio
		Create a new radio element and return it
	
	Arguments:
		opt - (object) options, see above
		
	Return:
		(element) radio element
	
	Discussion:
		this method shoul no longer exist.
	*/
	
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
	
	/* 
	Function: newRadio
		private function
	
		Add event to radio
	
	Arguments:
		radio - (element) the radio element where event will be attached
		
	Return:
		(void)
	*/
	
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
	Function: setCanvas
		private function
	
		Create a canvas for the provided radio element
	
	Arguments:
		radio - (element) the radio element
		
	Return:
		(void)
	*/
	
	setCanvas : function(radio){
		if (radio.canvas || (this.props && !this.props.layers) || (this.props && this.props.layers && this.props.layers.length == 0))
			return false;
			
		radio.canvas = new UI.Canvas({
			props 			: this.props,
			width			: this.props.width,
			height			: this.props.height
		}).inject(radio);
		
		radio.addEvent('drawCanvas', function(){
			this.canvas.setSize(this.element.x,this.element.y, this.props);
		});
	},
	
	/* 
	Function: setState
		private function
	
		set the state for the radio
	
	Arguments:
		radio - (element) the radio element
		state - (string) state
		
	Return:
		(void)
	*/
	
	setState : function(radio, state) {
		radio.canvas.draw(this.skin[state]);
	}
});
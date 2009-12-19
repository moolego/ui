/*
	Class: UI.Bubble
		Creates Bubble and let you attach events action
	
	Extend:
		<UI.Element>
	
	Arguments:
		options
	
	Options: 
		- label - (string) bubble content
		- target - (string / element) Can be either an element id either a <UI.Element> instance
	
	Example:
		(start code)
			var bubble = new UI.Bubble({
				target : 'myElement',
				label : 'This bubble says Hello world!'
			});
		(end)
		
	Implied global: 
		- MooLego - UI
		- Mootools - $,	Class, Fx
		- Javascript - document, window
		
	Members:
		Bubble, Element, Extends, Label, Morph, Tween, addEvents, bind, 
	    body, build, click, component, components, control, destroy, element, 
	    fade, fx, getCoordinates, getLocation, getSize, getStyle, height, hide, 
	    html, image, initialize, inject, label, left, onComplete, onImageLoad, 
	    onStart, options, parent, posFx, props, removeEvent, reposition, 
	    resetPosition, resize, right, setBehavior, setLocation, setSize, 
	    setStyles, setTipsPosition, show, start, styles, target, top, type, 
	    wait, width, x, y, zIndex
*/

UI.Bubble = new Class({

	Extends: UI.Element,
	
	options: {
		component: 'bubble',
		
		// default options
		label: 'Bubble',
		target: 'element',
		resetPosition: true,
		zIndex: 1000
	},
	
	/* 
	 Constructor: initialize
	 Construtor
	 
	 Arguments:
	 options - (object) options
	 
	 See also:
	 <UI.Element::initialize>
	 */
	initialize: function(options){
		this.parent(options);
		this.inject($(document.body));
		this.setLocation();
		this.fade(1);
	},
	
	/* 
	 Function: build
	 private function
	 
	 Make a  Label and set the fade Fx
	 
	 Return:
	 (void)
	 
	 See also:
	 <UI.Element::build>
	 */
	build: function(){
		this.parent();
		this.control = this.element;
		
		//we create a span for text
		if (this.options.label) {
			this.label = new UI.Label({
				html: this.options.label,
				styles: this.props.components.label.styles,
				image: this.options.image,
				onImageLoad: function(){
					this.setSize();
					this.setLocation();
				}.bind(this)
			}).inject(this.element);
		}
		
		// fx should be defined in skin sheet or not
		// and an option can/should be add to use effect on build or not
		
		this.fx = new Fx.Tween(this.element, {
			wait: false,
			onStart: function(){
				this.element.show();
			},
			onComplete: function(){
				if (!this.element.getStyle('opacity')) {
					this.element.hide();
				}
			}
		});
	},
	
	/* 
	 Function: setBehavior
	 private function
	 
	 Add a click event to close the bubble
	 
	 Returns:
	 (void)
	 
	 See also:
	 <UI.Element::setBehavior>
	 */
	setBehavior: function(){
		this.parent();
		
		this.element.addEvents({
			'click': function(){
				this.fade(0);
			}.bind(this)
		});
	},
	
	
	/* 
	 Function: setLocation
	 private function
	 
	 Set the bubble location. It is attached to the provided element either at top or bottom deppending the element type (default or bottom)
	 
	 Return:
	 (void)
	 
	 Discussion:
	 We should also implement left and right position
	 */
	setLocation: function(){
		
		
		var coord = this.getLocation();
		//console.log('setLocation: ',coord);
		this.element.setStyles({
			left: coord.left,
			top: coord.top
		});
		
		if (this.options.resetPosition) {
			this.posFx = new Fx.Morph(this.element, {
				wait: false
			});
			
			this.reposition = function(){
				var dest = this.getLocation();
				this.posFx.start({
					'left': dest.left,
					'top': dest.top
				});
			}.bind(this);
			
			//add event on windows resize
			window.addEvents({
				resize: this.reposition,
				setTipsPosition: this.reposition
			});
		}
	},
	
	/* 
	 Function: getLocation
	 Set an input in the control element
	 
	 Return:
	 location - (object) Object containing top and left values
	 */
	getLocation: function(){
		var bubbleCoord = this.element.getCoordinates();
		var coord = this.options.target.getCoordinates();
		
		var left,top;
		
			if (this.options.type == 'bottom') {
				left = coord.right - 40;
				top = coord.top + coord.height + 10;
			} else {
				left = coord.right - 40;
				top = coord.top - bubbleCoord.height - 10;
				
			}
		
		return {
			top: top,
			left: left
		};
	},
	
	/* 
	 Method: setSize
	 Set the size of the bubble from the label
	 
	 Returns:
	 (void)
	 
	 See also:
	 <UI.Element::setSize>
	 */
	setSize: function(width, height){
		if (this.label) {
			width = width || this.options.width || this.props.width || this.label.getSize().x;
			height = height || this.options.height || this.props.height || this.label.getSize().y;
		}
		this.parent(width, height);
	},
	
	/* 
	 Function: fade
	 Fade the tip to provided opacity
	 
	 Arguments:
	 way - (float) The destination opacity
	 
	 Return:
	 this
	 */
	fade: function(way){
		this.fx.start('opacity', way);
		return this;
	},
	
	/* 
	 Method: destroy
	 Destroy the element, and remove the event on window
	 
	 Return:
	 (void)
	 
	 See also:
	 <UI.Element::destroy>
	 */
	destroy: function(){
		window.removeEvent('resize', this.reposition);
		this.parent();
	}
});
/*
	Class: UI.Canvas
		Contains basic drawing functions.
	
	Require:
		mooCanvas
		
	Arguments:
		options
		
	Options:
		- props - (object) All the stuff needed to draw the canvas (layers, shadows, ...). These properties are generated from a skin sheet.
		- className - (string) The class name set to the canvas element
		- width - (integer) Canvas width
		- height - (integer) Canvas height
		
		- disableShadowOnExplorer - (boolean) Disable shadows on Explorer navigators for performance reasons.
		
	Events:	
	
		- onComplete - (function) - function to fire when the canvas is drawn
	
	
	
	Returns:
		Canvas object.
		
	Example:
		(start code)
		var canvas = new UI.Canvas({
			props 			: this.props,
			width			: this.element.x,
			height			: this.element.y
		}).inject(this.element);
		(end)
	
	

	Implied global:
		MooLego - UI
		MooTools - $empty, Class, Element, Events, Options
		
		
	Members:
		Canvas, Engine, Implements, PI, abs, absSize, addColorStop, 
	    angle, arc, atan, beginPath, bezier, bezierCurveTo, build, canvas, 
	    canvasSize, circle, clearRect, closePath, color, composite, context, 
	    convert2Px, cos, createLinearGradient, createPattern, 
	    createRadialGradient, ctx, debug, default, direction, 
	    disableShadowOnExplorer, draw, drawShadows, drawShadowsCalled, 
	    drawShape, each, endCircle, fill, fillStyle, fireEvent, getContext, 
	    getProperties, globalCompositeOperation, gradient, height, hexToRgb, 
	    image, initialize, inject, join, layers, left, length, line, lineTo, 
	    lineWidth, magnify, match, moveTo, offset, offsetX, offsetY, onComplete, 
	    onload, opacity, options, pattern, position, pow, props, 
	    quadraticCurveTo, radius, ratio, relSize, reorder, restore, rotate, 
	    rotation, roundedRect, save, scale, setColor, setImage, setOffset, 
	    setOptions, setProperties, setSize, setStyles, setTransformation, 
	    shadow, shadowMagnify, shadowOffset, shadowSet, shadowSize, 
	    shadowThickness, shape, sin, size, sqrt, src, startCircle, stop, stroke, 
	    styles, test, toInt, top, trace, translate, triangle, trident, type, 
	    url, width, zIndex

	
	Discussion:
		
	
*/

UI.Canvas = new Class({

	Implements: [Events, Options],
	
	options: {
		props: {},
		width: 300,
		height: 150,
		
		zIndex: -1,
		
		context: '2d',
		
		debug: false,
		disableShadowOnExplorer: true,
		
		onComplete: $empty
	},
	
	/*
	 Constructor: initialize
	 Constructor
	 Create a new canvas object and draw it
	 
	 Arguments:
	 options - (object) options
	 */
	initialize: function(options){
		this.setOptions(options);
		this.props = this.options.props;
		
		this.build();
		this.setSize();
		
		this.draw();
	},
	
	/* 
	 Function : build
	 private function
	 Create a new canvas object and get the 2D context
	 
	 Returns:
	 (void)
	 */
	build: function(){
		this.canvas = new Element('canvas', {
			styles: {
				position: 'absolute',
				zIndex: this.options.zIndex
			}
		});
		
		this.ctx = this.canvas.getContext("2d");
	},
	
	/* 
	 Function : setSize
	 set size of the canvas object handling the shadow, then draw it.
	 
	 Arguments:
	 width - (integer) Width of the canvas without shadow offsets
	 height - (integer) Width of the canvas without shadow offsets
	 props - (object) Skin properties. If not set, will get props passed on initialize
	 
	 Return:
	 (void)
	 */
	setSize: function(width, height, props){
		if (props) {
			this.props = props;
		}
		
		this.shadowSize = this.props.layers.shadow.size;
		this.shadowMagnify = this.props.layers.shadow.magnify;
		
		this.shadowOffset = [this.props.layers.shadow.offsetX, this.props.layers.shadow.offsetY];
		
		this.shadowThickness = this.shadowSize + this.shadowMagnify;
		
		this.canvasSize = [(width || this.options.width) + this.shadowThickness * 2 + Math.abs(this.shadowOffset[0]), (height || this.options.height) + this.shadowThickness * 2 + Math.abs(this.shadowOffset[1])];
		
		this.canvas.setProperties({
			width: this.canvasSize[0],
			height: this.canvasSize[1]
		});
		
		this.canvas.setStyles({
			top: -this.shadowThickness,
			left: -this.shadowThickness,
			width: this.canvasSize[0],
			height: this.canvasSize[1]
		});
		
		this.absSize = [this.canvasSize[0] - this.shadowThickness * 2 - Math.abs(this.shadowOffset[0]), this.canvasSize[1] - this.shadowThickness * 2 - Math.abs(this.shadowOffset[1])];
		
		this.relSize = this.absSize;
		this.offset = [this.shadowThickness, this.shadowThickness];
		
		if (width && height) {
			this.draw();
		}
	},
	
	/*
	 Function: draw
	 Draw layers defined in props
	 
	 Arguments:
	 props - (object) draw properties
	 
	 Returns:
	 (void)
	 */
	draw: function(props){
		
		if (!this.shadowSet) {
			if (props) {
				this.props = props;
			}
			this.ctx.clearRect(0, 0, this.canvasSize[0], this.canvasSize[1]);
			
			if (this.shadowSize &&
			!this.drawShadowsCalled &&
			(Browser.Engine.trident &&
			!this.options.disableShadowOnExplorer ||
			!Browser.Engine.trident)) {
				this.drawShadows();
				return;
			}
		}
		var layers = new Hash(this.props.layers);
		if (this.props.layers.reorder) {
			this.props.layers.reorder.each(function(key){
				if (key != 'default' && key != 'reorder' && key != 'shadow') {
					this.trace(key);
				}
			}, this);
		}
		else {
			layers.each(function(layer, key){
				if (key != 'default' && key != 'reorder' && key != 'shadow') {
					this.trace(key);
				}
			}, this);
		}
		
		this.offset = [this.shadowThickness, this.shadowThickness];
		this.relSize = [this.canvasSize[0] - this.shadowThickness * 2 - Math.abs(this.shadowOffset[0]), this.canvasSize[1] - this.shadowThickness * 2 - Math.abs(this.shadowOffset[1])];
		this.shadowSet = false;
		this.fireEvent('complete');
	},
	
	/*
	 Function: drawShadows
	 private function
	 
	 Draw shadow with successive rounded rect
	 
	 Returns:
	 (void)
	 */
	drawShadows: function(){
		//get first layer parameters
		var layerKey = null;
		$H(this.props.layers).each(function(props, key){
			if (key != 'shadow' && key != 'default') {
				layerKey = layerKey || key;
			}
		});
		var modelProps = this.getProperties(layerKey);
		
		//set color
		//console.log(this.props.layers.shadow.color);
		
		var color = '';
		
		if (this.props.layers.shadow.color && this.props.layers.shadow.color.test(/#[0-9A-F]+/)) {
			color = this.props.layers.shadow.color.hexToRgb(true);
		}
		else {
			color = '0,0,0';
		}
		
		//set size
		var size = [this.canvasSize[0] - this.shadowOffset[0], this.canvasSize[1] - this.shadowOffset[1]];
		
		//set diffusion
		var diffusion = 1.3;
		
		//set radius
		if ($defined(this.props.layers.shadow.radius)) {
			modelProps.radius = [this.props.layers.shadow.radius, this.props.layers.shadow.radius, this.props.layers.shadow.radius, this.props.layers.shadow.radius];
		}
		var radius = [diffusion * (this.props.layers.shadow.size - 1 - this.props.layers.shadow.magnify + modelProps.radius[0]), diffusion * (this.props.layers.shadow.size - 1 - this.props.layers.shadow.magnify + modelProps.radius[1]), diffusion * (this.props.layers.shadow.size - 1 - this.props.layers.shadow.magnify + modelProps.radius[2]), diffusion * (this.props.layers.shadow.size - 1 - this.props.layers.shadow.magnify + modelProps.radius[3])];
		
		
		//set opacity
		var opacity = (this.props.layers.shadow.opacity || 1) / 1;
		
		//set shape
		var shape = modelProps.shape;
		
		//draw
		var props = {
			radius: radius,
			color: this.props.layers.shadow.color || '#000',
			size: size,
			offset: [this.shadowOffset[0], this.shadowOffset[1]]
		};
		
		for (var i = this.shadowThickness * 1.5; i > 0; i--) {
			var oratio = opacity / (i * 2 / 1.5 + 10);
			this.ctx.save();
			this.setTransformation(props);
			this[shape](props);
			this.ctx.fillStyle = "rgba(" + color + ", " + oratio + ")";
			this.ctx.fill();
			this.ctx.restore();
			
			props.size = [props.size[0] - 2, props.size[1] - 2];
			props.offset = [++props.offset[0], ++props.offset[1]];
			props.radius = [props.radius[0] > 0 ? props.radius[0] - diffusion : 0, props.radius[1] > 0 ? props.radius[1] - diffusion : 0, props.radius[2] > 0 ? props.radius[2] - diffusion : 0, props.radius[3] > 0 ? props.radius[3] - diffusion : 0];
		}
		
		modelProps.offset[0]++;
		modelProps.offset[1]++;
		
		modelProps.size[0] = modelProps.size[0] - 2;
		modelProps.size[1] = modelProps.size[1] - 2;
		
		this.ctx.save();
		this.setTransformation(modelProps);
		this.ctx.globalCompositeOperation = 'destination-out';
		this[shape](modelProps);
		this.ctx.fill();
		this.ctx.restore();
		
		
		this.shadowSet = true;
		this.draw();
	},
	
	/*
	 Function: inject
	 inject canvas then return class instance
	 
	 Arguments:
	 target		: (element) - the target dom element
	 position	: (string - optional) the position were to inject
	 
	 Returns:
	 this
	 */
	inject: function(target, position){
		this.canvas.inject(target, position);
		return this;
	},
	
	/*
	 Function: trace
	 private function
	 draw the shape depending on the skin component props definition
	 
	 Arguments:
	 key - (string) key
	 
	 Return
	 (void)
	 */
	trace: function(key){
		var properties = this.getProperties(key);
		if (this.options.debug) {
			this.debug('trace', properties);
		}
		
		this.ctx.save();
		
		this.setTransformation(properties);
		
		switch (properties.shape) {
			case 'circle':
				this.circle(properties);
				break;
			case 'roundedRect' || 'roundRect':
				this.roundedRect(properties);
				break;
			case 'line' || 'lineDown':
				properties.direction = 'down';
				this.line(properties);
				break;
			case 'lineUp':
				properties.direction = 'up';
				this.line(properties);
				break;
			case 'triangle':
				this.triangle(properties);
				break;
			case 'complex':
				this.complex(properties);
				break;
		}
		
		this.drawShape(properties);
		
		this.ctx.restore();
	},
	
	
	
	/*
	 Function: convert2Px
	 private function
	 
	 draw the shape depending on the skin component props definition
	 
	 Arguments:
	 value - (string/integer/float) value
	 direction - (string) Direction. Could be either 'x' or 'y'
	 absolute - (boolean) Determine if the position is relative to previous element or absolute (relative to canvas)
	 
	 Return
	 value - (float) The value converted in pixel
	 */
	convert2Px: function(value, direction, absolute){
		direction = (direction == 'x') ? 0 : 1;
		var refSize = absolute ? this.absSize[direction] : this.relSize[direction];
		if ($type(value) == 'string') {
			// size is in %
			if (value.match(/%$/)) {
				return value.toInt() / 100 * refSize;
				//size is in px	
			}
			else 
				if (value.match(/px$/)) {
					return value.toInt();
				//size is auto
				}
				else 
					if (value == 'auto') {
						return value;
					}
		}
		else {
			// size is in px (int or float)
			return value;
		}
	},
	
	/*
	 Function: setOffset
	 private function
	 
	 Determine the start point's coordinates as width and height for a shape
	 
	 Arguments:
	 value - (array) Array with three entries to determine offset
	 position - (string) Determine if the position is relative to previous element or absolute (relative to canvas)
	 size - (array) Array containing layer's width and height. Could be either a number or 'auto' to determine it from offset
	 
	 Return:
	 offset - (array) An array with x and y start point coordinates, as well as width and height
	 */
	setOffset: function(value, position, size){
		var absolute = (position == 'relative') ? false : true;
		value = [this.convert2Px(value[0], 'y', absolute), this.convert2Px(value[1], 'x', absolute), this.convert2Px(value[2], 'y', absolute), this.convert2Px(value[3], 'x', absolute)];
		// check size
		if (size) {
			// automatic width
			if ($type(size) == 'array' && size[1] && size[0] == 'auto' && size[1] != 'auto') {
				size[1] = this.convert2Px(size[1], 'y', absolute);
				
				// automatic height
			}
			else 
				if ($type(size) == 'array' && size[1] && size[0] != 'auto' && size[1] == 'auto') {
					size[0] = this.convert2Px(size[0], 'x', absolute);
					
				// both width and height specified
				}
				else 
					if ($type(size) == 'array' && size[1] && size[0] != 'auto' && size[1] != 'auto') {
						size[0] = this.convert2Px(size[0], 'x', absolute);
						size[1] = this.convert2Px(size[1], 'y', absolute);
						
					// both auto => error
					}
					else 
						if ($type(size) == 'array' && size[1] && size[0] == 'auto' && size[1] == 'auto') {
							size = false;
							
						// just one value is specified
						}
						else 
							if (size != 'auto') {
								size = [this.convert2Px(size, 'x', absolute), this.convert2Px(size, 'y', absolute)];
							}
		}
		// calculate size from offsets
		
		var offsetX,
			offsetY,
			width,
			height;
		
		if (!size) {
			if (absolute) {
				offsetX = value[3] + this.shadowThickness;
				offsetY = value[0] + this.shadowThickness;
				width = this.absSize[0] - value[1] - value[3];
				height = this.absSize[1] - value[0] - value[2];
			}
			else {
				offsetX = this.offset[0] + value[3];
				offsetY = this.offset[1] + value[0];
				width = this.relSize[0] - value[1] - value[3];
				height = this.relSize[1] - value[0] - value[2];
				
				this.offset = [offsetX, offsetY];
				this.relSize = [width, height];
			}
			// size is given
		}
		else {
			// determine X coordinates
			switch (true) {
				// align on left
				case value[3] != 'auto':
					if (absolute) {
						width = (size[0] == 'auto') ? this.absSize[0] - value[1] - value[3] : size[0];
						offsetX = value[3] + this.shadowThickness;
					}
					else {
						width = (size[0] == 'auto') ? this.relSize[0] - value[1] - value[3] : size[0];
						offsetX = this.offset[0] + value[3];
						
						this.offset[0] = offsetX;
						this.relSize[0] = width;
					}
					break;
					
				// align on right
				case value[1] != 'auto':
					if (absolute) {
						width = (size[0] == 'auto') ? this.absSize[0] - value[1] - value[3] : size[0];
						offsetX = this.absSize[0] - width - value[1] + this.shadowThickness;
					}
					else {
						width = (size[0] == 'auto') ? this.relSize[0] - value[1] - value[3] : size[0];
						offsetX = this.offset[0] + this.relSize[0] - width - value[1];
						
						this.offset[0] = offsetX;
						this.relSize[0] = width;
					}
					break;
					
				// align Xcenter
				case value[3] == 'auto' && value[1] == 'auto':
					if (absolute) {
						width = size[0];
						offsetX = (this.absSize[0] - width) / 2 + this.shadowThickness;
					}
					else {
						width = size[0];
						offsetX = (this.relSize[0] - width) / 2;
						
						this.offset[0] = offsetX;
						this.relSize[0] = width;
					}
					break;
			}
			
			// determine Y coordinates
			switch (true) {
				// align on top
				case value[0] != 'auto':
					if (absolute) {
						height = (size[1] == 'auto') ? this.absSize[1] - value[0] - value[2] : size[1];
						offsetY = value[0] + this.shadowThickness;
					}
					else {
						height = (size[1] == 'auto') ? this.relSize[1] - value[0] - value[2] : size[1];
						offsetY = this.offset[1] + value[0];
						this.offset[1] = offsetY;
						this.relSize[1] = height;
					}
					break;
					
				// align on bottom
				case value[2] != 'auto':
					if (absolute) {
						height = (size[1] == 'auto') ? this.absSize[1] - value[0] - value[2] : size[1];
						offsetY = this.absSize[1] - height - value[2] + this.shadowThickness;
					}
					else {
						height = (size[1] == 'auto') ? this.relSize[1] - value[0] - value[2] : size[1];
						offsetY = this.offset[1] + this.relSize[1] - height - value[2];
						this.offset[1] = offsetY;
						this.relSize[1] = height;
					}
					break;
					
				// align Ycenter
				case value[0] == 'auto' && value[2] == 'auto':
					if (absolute) {
						height = size[1];
						offsetY = (this.absSize[1] - height) / 2 + this.shadowThickness;
					}
					else {
						width = size[1];
						offsetY = (this.relSize[1] - height) / 2;
						this.offset[1] = offsetY;
						this.relSize[1] = height;
					}
					break;
			}
		}
		return [offsetX, offsetY, width, height];
	},
	
	/*
	 Function: getProperties
	 private function
	 
	 Set all values to draw the canvas and prepare arrays for radius, offsets, size, ...
	 
	 Arguments:
	 key - (string) Layer name
	 
	 Return:
	 properties - (object) an object to be drawn
	 */
	getProperties: function(key){
		var properties = {
			position: $pick(this.props.layers[key].position, this.props.layers['default'].position),
			size: $pick(this.props.layers[key].size, this.props.layers['default'].size),
			shape: $pick(this.props.layers[key].shape, this.props.layers['default'].shape),
			color: $pick(this.props.layers[key].color, this.props.layers['default'].color),
			gradient: $pick(this.props.layers[key].gradient, this.props.layers['default'].gradient),
			stroke: $pick(this.props.layers[key].stroke, this.props.layers['default'].stroke),
			image: $pick(this.props.layers[key].image, this.props.layers['default'].image),
			width: $pick(this.props.layers[key].width, this.props.layers['default'].width),
			opacity: $pick(this.props.layers[key].opacity, this.props.layers['default'].opacity),
			angle: $pick(this.props.layers[key].angle, this.props.layers['default'].angle),
			rotation: $pick(this.props.layers[key].rotation, this.props.layers['default'].rotation),
			scale: $pick(this.props.layers[key].scale, this.props.layers['default'].scale),
			composite: $pick(this.props.layers[key].composite, this.props.layers['default'].composite),
			def: $pick(this.props.layers[key].def, this.props.layers['default'].def),
			baseSize: $pick(this.props.layers[key].baseSize, this.props.layers['default'].baseSize)
		};
		
		// test the position
		
		var coordinates = $pick(this.props.layers[key].offset, this.props.layers['default'].offset);
		if ($type(coordinates) == 'array') {
			//4 sides defined
			if ($defined(coordinates[3])) {
				coordinates = this.setOffset(coordinates, properties.position, properties.size);
				//3 sides defined
			}
			else 
				if ($defined(coordinates[2])) {
					coordinates = this.setOffset([coordinates[0], coordinates[1], coordinates[2], coordinates[1]], properties.position, properties.size);
				//2 sides defined
				}
				else {
					coordinates = this.setOffset([coordinates[0], coordinates[1], coordinates[0], coordinates[1]], properties.position, properties.size);
				}
			//1 side defined
		}
		else {
			coordinates = this.setOffset([coordinates, coordinates, coordinates, coordinates], properties.position, properties.size);
		}
		properties.offset = [coordinates[0], coordinates[1]];
		properties.size = [coordinates[2], coordinates[3]];
		
		// add the radius
		var radius = $pick(this.props.layers[key].radius, this.props.layers['default'].radius);
		
		if ($type(radius) == 'array') {
			properties.radius = $defined(radius[3]) ? radius : [radius[0], radius[0], radius[1], radius[1]];
		}
		else {
			properties.radius = [radius, radius, radius, radius];
		}
		
		
		return properties;
	},
	
	/*
	 Function: setColor
	 private function
	 
	 Set the fill color, handling direction, gradient and opacity
	 
	 Arguments:
	 part - (string) Determine for wich part the color is set. Could be 'fill' or 'stroke'.
	 
	 Return:
	 (void)
	 */
	setColor: function(part, props){
		var ax, ay, bx, by, cx, cy, color;
		
		
		var p = (part == 'fill') ? 'gradient' : 'stroke';
		
		if (!props[p]) {
			props[p] = {
				color: props.color,
				opacity: props.opacity || 1
			};
		}
		if (props[p] && $type(props[p].color) == 'array') {
			if (props[p].type != 'radial') {
				// convert angle from degree to gradient
				if (!$defined(props[p].angle)) {
					props[p].angle = 90;
				}
				var a = props[p].angle * Math.PI / 180;
				var aAbs = Math.abs(a);
				
				var s0 = props.size[0];
				var s1 = props.size[1];
				
				//set stuff for IE
				this.ctx.ratio = props.size[1] / props.size[0];
				this.ctx.angle = a;
				
				//define start/end points (automatic in IE)
				if (props[p].angle >= -90 && props[p].angle < 90) {
					ax = -((Math.cos(a - Math.atan(s1 / s0)) * Math.sqrt(Math.pow(s0, 2) + Math.pow(s1, 2)) * Math.cos(a)) / 2);
					ay = -((Math.cos(a - Math.atan(s1 / s0)) * Math.sqrt(Math.pow(s0, 2) + Math.pow(s1, 2)) * Math.sin(a)) / 2);
				}
				else {
					ax = ((Math.cos(Math.PI - a - Math.atan(s1 / s0)) * Math.sqrt((s0).pow(2) + (s1).pow(2)) * Math.cos(Math.PI - a)) / 2);
					ay = -((Math.cos(Math.PI - a - Math.atan(s1 / s0)) * Math.sqrt((s0).pow(2) + (s1).pow(2)) * Math.sin(Math.PI - a)) / 2);
				}
				bx = -ax;
				by = -ay;
				
				//make the gradient with start point and end point
				color = this.ctx.createLinearGradient(ax, ay, bx, by);
			} else {
				//set translation correction
				cx = props.size[0] / 2;
				cy = props.size[1] / 2;
				
				var x0, y0, r0;
				
				//set startCircle, if not defined, set center and size 0
				if (props[p].startCircle) {
					x0 = this.convert2Px(props[p].startCircle[0], 'x') - cx;
					y0 = this.convert2Px(props[p].startCircle[1], 'y') - cy;
					r0 = this.convert2Px(props[p].startCircle[2], 'x');
				} else {
					x0 = 0;
					y0 = 0;
					r0 = 0;
				}

				var x1, y1, r1;
				
				//set endCircle, if not defined, set center 0 and size to layer's width
				if (props[p].endCircle) {
					x1 = this.convert2Px(props[p].endCircle[0], 'x') - cx;
					y1 = this.convert2Px(props[p].endCircle[1], 'y') - cy;
					r1 = this.convert2Px(props[p].endCircle[2], 'x') / 2;
				} else {
					x1 = 0;
					y1 = 0;
					r1 = this.relSize[0] / 2;
				}
				
				color = this.ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
			}
			
			var i;
			
			//check if opacity exist, else create it
			var length = props[p].color.length;
			if (!props[p].opacity || $type(props[p].opacity) != 'array') {
				var opacity = props[p].opacity || 1;
				props[p].opacity = [];
				for (i = 0; i < length; i++) {
					props[p].opacity[i] = opacity;
				}
			}
			
			//check if stops exist, else create them
			if (!props[p].stop) {
				props[p].stop = [];
				for (i = 0; i < length; i++) {
					props[p].stop[i] = i * (1 / (length - 1));
				}
			}
			//add color stop
			for (i = 0; i < length; i++) {
				//we get the color
				var gradient = 'rgba(' + props[p].color[i].hexToRgb(true).join(',') + ', ' + props[p].opacity[i] + ')';
				color.addColorStop(props[p].stop[i], gradient);
			}
			
		//Normal color management
		}
		else {
			//check if opacity exist, else create it
			props[p].opacity = props[p].opacity || 1;
			
			color = 'rgba(' + props[p].color.hexToRgb(true).join(',') + ',' + props[p].opacity + ')';
		}
		
		this.ctx[part + 'Style'] = color;
	},
	
	/*
	 Function: setTransformation
	 private function
	 
	 apply transformations, like rotation, scale and composite mode.
	 
	 Arguments:
	 props - (object) The layer properties.
	 
	 Return:
	 (void)
	 */
	setTransformation: function(props){

		
		if (props.shape != 'complex') {
			this.ctx.translate(props.size[0] / 2 + props.offset[0], props.size[1] / 2 + props.offset[1]);
		}
		//rotation
		if (props.rotation) {
			this.ctx.rotate(Math.PI * props.rotation / 180);
		}
		
		//scale
		if (props.scale) {
			if ($type(props.scale) != 'array') {
				props.scale = [props.scale, props.scale];
			}
			this.ctx.scale(props.scale[0], props.scale[1]);
		}
		
		//composite
		if (props.composite) {
			this.ctx.globalCompositeOperation = props.composite;
		}
	},
	
	/*
	 Function: drawShape
	 private function
	 
	 Draw the stroke and fill the shape
	 
	 Arguments:
	 props - (object) The layer properties.
	 
	 Return:
	 (void)
	 */
	drawShape: function(props){
		if (props.image) {
			this.setImage(props);
		}
		else 
			if (props.color || props.gradient) {
				this.setColor('fill', props);
				this.ctx.fill();
			}
		if (props.stroke) {
			//determine lineWidth
			this.ctx.lineWidth = (props.stroke.width) ? props.stroke.width : 1;
			this.setColor('stroke', props);
			this.ctx.stroke();
		}
		
	},
	
	/*
	 Function: setImage
	 private function - experimental
	 
	 Draw an image on canvas handling patterns
	 
	 Arguments:
	 props - (object) The layer properties.
	 
	 Return:
	 (void)
	 */
	setImage: function(props){
		
		var that = this;
		
		//set vars
		props.image.pattern = props.image.pattern || 'repeat';
		
		// we load the image
		var img = new Image();
		img.onload = function(){
			// create pattern
			var ptrn = this.ctx.createPattern(img, props.image.pattern);
			that.ctx.fillStyle = ptrn;
			that.ctx.fill();
		};
		//we draw it as a pattern
		img.src = props.image.url;
	},
	
	/*
	 Function: roundedRect
	 private function
	 
	 Draw a rounded rectangle path
	 
	 Arguments:
	 props - (object) The layer properties.
	 
	 Return:
	 (void)
	 */
	roundedRect: function(props){
		// preparing data befaore drawing
		var s0 = props.size[0];
		var s1 = props.size[1];
		
		var h0 = s0 / 2;
		var h1 = s1 / 2;
		
		var r0 = props.radius[0];
		var r1 = props.radius[1];
		var r2 = props.radius[2];
		var r3 = props.radius[3];
		
		// begin path and draw then close
		this.ctx.beginPath();
		this.ctx.moveTo(r0 - h0, -h1);
		this.ctx.lineTo(s0 - r1 - h0, -h1);
		this.ctx.quadraticCurveTo(s0 - h0, -h1, s0 - h0, r1 - h1);
		this.ctx.lineTo(s0 - h0, s1 - r2 - h1);
		this.ctx.quadraticCurveTo(s0 - h0, s1 - h1, s0 - r2 - h0, s1 - h1);
		this.ctx.lineTo(r3 - h0, s1 - h1);
		this.ctx.quadraticCurveTo(-h0, s1 - h1, -h0, s1 - r3 - h1);
		this.ctx.lineTo(-h0, r0 - h1);
		this.ctx.quadraticCurveTo(-h0, -h1, r0 - h0, -h1);
		this.ctx.closePath();
	},
	
	/*
	 Function: circle
	 private function
	 
	 Draw a circle or a circle part, determined width props.angle (array).
	 
	 Arguments:
	 props - (object) The layer properties.
	 
	 Return:
	 (void)
	 */
	circle: function(props){
		//get angle
		props.angle = props.angle || [0, 360];
		
		//get center location
		var x = 0;
		var y = 0;
		var r = props.size[1] / 2;
		var b = Math.PI * props.angle[0] / 180;
		var a = Math.PI * props.angle[1] / 180;
		
		// draw circle
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, a, b, true);
		this.ctx.closePath();
	},
	
	/*
	 Function: line
	 private function
	 
	 Draw a line
	 
	 Arguments:
	 props - (object) The layer properties.
	 
	 Return:
	 (void)
	 */
	line: function(props){
		// prepare datas
		props.stroke = props.stroke || {
			color: props.color,
			width: props.width
		};
		
		delete props.color;
		
		var h0 = props.size[0] / 2;
		var h1 = props.size[1] / 2;
		
		// draw
		this.ctx.beginPath();
		if (props.direction == 'up') {
			this.ctx.moveTo(-h0 + 0.5, h1 - 0.5);
			this.ctx.lineTo(h0 - 0.5, -h1 + 0.5);
		}
		else {
			this.ctx.moveTo(-h0 + 0.5, -h1 + 0.5);
			this.ctx.lineTo(h0 - 0.5, h1 - 0.5);
		}
	},
	
	/*
	 Function: triangle
	 private function
	 
	 Draw a triangle in a rectangle determine with props.size (array)
	 
	 Arguments:
	 props - (object) The layer properties.
	 
	 Return:
	 (void)
	 */
	triangle: function(props){
		// prepare datas
		var h0 = props.size[0] / 2;
		var h1 = props.size[1] / 2;
		
		// draw
		this.ctx.beginPath();
		this.ctx.moveTo(-h0, h1);
		this.ctx.lineTo(h0, h1);
		this.ctx.lineTo(0, -h1);
		this.ctx.closePath();
	},
	
	/*
	 Function: bezier
	 private function
	 
	 to draw complex shapes
	 
	 Arguments:
	 props - (object) The layer properties.
	 
	 Return:
	 (void)
	 */
	complex: function(props){
		var ctx = this.ctx;
		// prepare datas
		
		//console.log(props);
		
		var width = props.size[0];
		var height = props.size[1];
		
		//console.log(width,height);
		
		
		ctx.beginPath();
		var i = 0;
		
		var defaultWidth = props.baseSize[0] || 100;
		var defaultHeight = props.baseSize[1] || 100;
		
		var ratioX = width / defaultWidth;
		var ratioY = height / defaultHeight;
		
		var def = new Hash(props.def);
		
		props.def.each(function(list){
			var p = [];
			var j = 0;
			var command;
			
			list.each(function(val){
			
				if (j == 0) {
				
					command = val
				}
				else {
					if ((j % 2) === 0) {
						p[j] = val * ratioY;
					}
					else {
						p[j] = val * ratioX;
						
					}
					
				}
				j++;
			});
			
			if (command == 'moveTo') {
				ctx.moveTo(p[1], p[2]);
			}
			if (command == 'quadraticCurveTo') {
				ctx.quadraticCurveTo(p[1], p[2], p[3], p[4]);
			}
			if (command == 'bezierCurveTo') {
				ctx.quadraticCurveTo(p[1], p[2], p[3], p[4], p[5], p[6]);
			}
			i++;
		});
		
		ctx.closePath();
	}
});

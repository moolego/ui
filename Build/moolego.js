/*
	Object: UI
		Root of moolego UI. All classes will be declared in this object.

	About:
		moolego UI for mootools v1.2 - 2008-2009
		
		by Floor SA (http://www.floor.ch) MIT-style license
*/

var UI = UI || {
	version		: '0.1b',
	author		: 'Floor',
	elements	: new Hash(),
	props		: {}
};/*
	Class: UI.Canvas
		Contains basic drawing functions.
	
	Require:
		mooCanvas
		
	Arguments:
		options
		
	Options:
		props - (object) All the stuff needed to draw the canvas (layers, shadows, ...). These properties are generated from a skin sheet.
		className - (string) The class name set to the canvas element
		width - (integer) Canvas width
		height - (integer) Canvas height
		
		disableShadowOnExplorer - (boolean) Disable shadows on Explorer navigators for performance reasons.
		
		onComplete : (function) - function to fire when the canvas is drawn
	
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
	
	Discussion:
	
*/

UI.Canvas = new Class({
	Implements: [Events, Options],

	options: {
		props			: {},
		width			: 300,
		height			: 150,
		className		: 'ui-canvas',
		
		disableShadowOnExplorer : true,
		
		onComplete		: $empty
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

		this.shadowsLoaded = false;
		this.shadowSet 	= false;

		this.draw();
	},

	/* 
	Function : build
		private function

		Create a new canvas object and get the 2D context
	 */

	build : function() {
		this.canvas = new Canvas({
			'class'	: this.options.className,
			styles	: {
				position 	: 'absolute',
				zIndex		: -1
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

	setSize : function(width, height, props){
		if (props) this.props = props;
		
		this.shadowSize = this.props.layers.shadow.size;
		this.shadowMagnify = this.props.layers.shadow.magnify;
		
		this.shadowOffset = [
			this.props.layers.shadow.offsetX,
			this.props.layers.shadow.offsetY
		];
		
		this.shadowThikness = this.shadowSize + this.shadowMagnify;

		this.canvasSize = [
			(width  || this.options.width) + this.shadowThikness * 2 + Math.abs(this.shadowOffset[0]),
			(height || this.options.height) + this.shadowThikness * 2 + Math.abs(this.shadowOffset[1])
		];
		
		this.canvas.setProperties({
			width : this.canvasSize[0],
			height: this.canvasSize[1]
		});
		
		this.canvas.setStyles({
			top	  : - this.shadowThikness,
			left  : - this.shadowThikness,
			width : this.canvasSize[0],
			height: this.canvasSize[1]
		});
		
		this.absSize = [
			this.canvasSize[0] - this.shadowThikness * 2 - Math.abs(this.shadowOffset[0]),
			this.canvasSize[1] - this.shadowThikness * 2 - Math.abs(this.shadowOffset[1])
		];
		
		this.relSize = this.absSize;
		this.offset = [this.shadowThikness, this.shadowThikness];
		
		if (width, height) this.draw();
	},

	/*
	Function: draw
		Draw layers defined in props
		
	Arguments:
		props - (object) draw properties
	
	Returns:
		(void)
	*/
	
	draw : function(props)  {
		if (!this.shadowSet) {
			if (props) this.props = props;
			this.ctx.clearRect(0, 0, this.canvasSize[0], this.canvasSize[1]);
			
			if (
				this.shadowSize &&
				!this.drawShadowsCalled && 
				(
					Browser.Engine.trident &&
					!this.options.disableShadowOnExplorer ||
					!Browser.Engine.trident
				)
			) {
				this.drawShadows();
				return;
			}
		}
		var layers = new Hash(this.props.layers);
		if(this.props.layers.reorder){
			this.props.layers.reorder.each(function(key){
				if (key != 'default' && key != 'reorder' && key != 'shadow') this.trace(key);
			}, this);
		} else {
			layers.each(function(layer, key){
				if (key != 'default' && key != 'reorder' && key != 'shadow') this.trace(key);
			}, this);
		}

		this.offset = [this.shadowThikness, this.shadowThikness];
		this.relSize = [
			this.canvasSize[0] - this.shadowThikness * 2 - Math.abs(this.shadowOffset[0]),
			this.canvasSize[1] - this.shadowThikness * 2 - Math.abs(this.shadowOffset[1])
		];
		this.shadowSet 	= false;
		this.fireEvent('complete');
	},
	
	/*
	Function: drawShadows
		private function
		
		Draw shadow with successive rounded rect
	
	Returns: 
		(void)
	*/
	
	drawShadows : function(){
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
		if(this.props.layers.shadow.color && this.props.layers.shadow.color.test(/#[0-9A-F]+/)){
			var color = this.props.layers.shadow.color.hexToRgb(true);
		}else{
			var color = '0,0,0';
		}

		//set size
		var size = [
			this.canvasSize[0] - this.shadowOffset[0],
			this.canvasSize[1] - this.shadowOffset[1]
		];
		
		//set diffusion
		var diffusion = 1.3;
		
		//set radius
		if ($defined(this.props.layers.shadow.radius))
			modelProps.radius = [
				this.props.layers.shadow.radius,
				this.props.layers.shadow.radius,
				this.props.layers.shadow.radius,
				this.props.layers.shadow.radius
			];
		var radius = [
			diffusion * (this.props.layers.shadow.size - 1 - this.props.layers.shadow.magnify + modelProps.radius[0]),
			diffusion * (this.props.layers.shadow.size - 1 - this.props.layers.shadow.magnify + modelProps.radius[1]),
			diffusion * (this.props.layers.shadow.size - 1 - this.props.layers.shadow.magnify + modelProps.radius[2]),
			diffusion * (this.props.layers.shadow.size - 1 - this.props.layers.shadow.magnify + modelProps.radius[3])
		];
		
		
		//set opacity
		var opacity = (this.props.layers.shadow.opacity || 1)/1;
		
		//set shape
		var shape = modelProps.shape;
		
		//draw
		var props = {
			radius		: radius,
			color		: this.props.layers.shadow.color || '#000',
			size		: size,
			offset		: [this.shadowOffset[0], this.shadowOffset[1]]
		}
		
		for (var i = this.shadowThikness * 1.5; i > 0; i--) {
			var oratio = opacity/(i* 2 / 1.5 + 10);
			//console.log(oratio);
			this.ctx.save();
				this.setTransformation(props);
				this[shape](props);
				this.ctx.fillStyle = "rgba("+color+", "+oratio+")";
				this.ctx.fill();
			this.ctx.restore();
			
			props.size = [
				props.size[0] - 2,
				props.size[1] - 2
			];
			props.offset = [
				++props.offset[0],
				++props.offset[1]
			];
			props.radius = [
				props.radius[0] > 0 ? props.radius[0] - diffusion : 0,
				props.radius[1] > 0 ? props.radius[1] - diffusion : 0,
				props.radius[2] > 0 ? props.radius[2] - diffusion : 0,
				props.radius[3] > 0 ? props.radius[3] - diffusion : 0,
			];
		}
		
		modelProps.offset[0]++;
		modelProps.offset[1]++;
		
		modelProps.size[0] = modelProps.size[0]-2;
		modelProps.size[1] = modelProps.size[1]-2;
		
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
	*/
	
	inject : function(target, position){
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

	trace : function(key) {
		var properties = this.getProperties(key);
		this.ctx.save();
		this.setTransformation(properties);
		switch(properties.shape) {
			case 'circle' : 
				this.circle(properties);
				break;
			case 'roundedRect' || 'roundRect' : 
				this.roundedRect(properties);
				break;
			case 'line' || 'lineDown' : 
				properties.direction = 'down';
				this.line(properties);
				break;
			case 'lineUp' : 
				properties.direction = 'up';
				this.line(properties);
				break;
			case 'triangle': 
				this.triangle(properties);
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
		(float) The value converted in pixel
	*/
	
	convert2Px : function(value, direction, absolute) {
		direction = (direction == 'x') ? 0 : 1;
		var refSize = absolute ? this.absSize[direction] : this.relSize[direction]
		if($type(value) == 'string') {
			// size is in %
			if(value.match(/%$/)) {
				return value.toInt()/100 * refSize;
			//size is in px	
			} else if(value.match(/px$/)) {
				return value.toInt();
			//size is auto
			} else if (value == 'auto') {
				return value;
			}
		} else {
			// size is in px (int or float)
			return value;
		}
	},

	/*
	Function: setOffset
		private function
		
		Determine the start point's coordinates as width and height for a layer
	
	Arguments: 
		value - (array) Array with three entries to determine offset
		position - (string) Determine if the position is relative to previous element or absolute (relative to canvas)
		size - (array) Array containing layer's width and height. Could be either a number or 'auto' to determine it from offset
		
	Return:
		(array) An array with x and y start point coordinates, as well as width and height
	*/	

	setOffset : function(value,position, size) {
		var absolute = (position == 'relative') ? false : true;
		value = [
			this.convert2Px(value[0], 'y', absolute),
			this.convert2Px(value[1], 'x', absolute),
			this.convert2Px(value[2], 'y', absolute),
			this.convert2Px(value[3], 'x', absolute)
		];
		// check size
		if(size) {
			// automatic width
			if($type(size) == 'array' && size[1] && size[0] == 'auto' && size[1] != 'auto') {
				size[1] = this.convert2Px(size[1], 'y', absolute);
			
			// automatic height
			}else if($type(size) == 'array' && size[1] && size[0] != 'auto' && size[1] == 'auto') {
				size[0] = this.convert2Px(size[0], 'x', absolute);

			// both width and height specified
			} else if ($type(size) == 'array' && size[1] && size[0] != 'auto' && size[1] != 'auto') {
				size[0] = this.convert2Px(size[0], 'x', absolute);
				size[1] = this.convert2Px(size[1], 'y', absolute);

			// both auto => error
			} else if($type(size) == 'array' && size[1] && size[0] == 'auto' && size[1] == 'auto') {
				size = false;
			
			// just one value is specified
			} else if (size != 'auto') {
				size = [
					this.convert2Px(size, 'x', absolute),
					this.convert2Px(size, 'y', absolute)
				];
			}
		}
		// calculate size from offsets
		if (!size) {
			if (absolute) {
				var offsetX = value[3] + this.shadowThikness;
				var offsetY = value[0] + this.shadowThikness;
				var width = this.absSize[0] - value[1] - value[3];
				var height = this.absSize[1] - value[0] - value[2];
			} else {
				var offsetX = this.offset[0] + value[3];
				var offsetY = this.offset[1] + value[0];
				var width = this.relSize[0] - value[1] - value[3];
				var height = this.relSize[1] - value[0] - value[2];
				
				this.offset = [offsetX, offsetY];
				this.relSize	= [width, height];
			}
		// size is given
		} else {
			// determine X coordinates
			switch (true) {
				// align on left
				case value[3] != 'auto' : 
					if (absolute) {
						var width 		= (size[0] == 'auto') ? this.absSize[0] - value[1] - value[3] : size[0];
						var offsetX 	= value[3] + this.shadowThikness;
					} else {
						var width 		= (size[0] == 'auto') ? this.relSize[0] - value[1] - value[3] : size[0];
						var offsetX 	= this.offset[0] + value[3];
						this.offset[0]	= offsetX;
						this.relSize[0]	= width;
					}
					break;
					
				// align on right
				case value[1] != 'auto' :
					if (absolute) {
						var width 		= (size[0] == 'auto') ? this.absSize[0] - value[1] - value[3] : size[0];
						var offsetX 	= this.absSize[0] - width - value[1] + this.shadowThikness;
					} else {
						var width		= (size[0] == 'auto') ? this.relSize[0] - value[1] - value[3] : size[0];
						var offsetX		= this.offset[0] + this.relSize[0] - width - value[1];
						this.offset[0]	= offsetX;
						this.relSize[0]	= width;
					}
					break;
					
				// align Xcenter
				case value[3] == 'auto' && value[1] == 'auto' :
					if (absolute) {
						var width 		= size[0];
						var offsetX 	= (this.absSize[0] - width) / 2 + this.shadowThikness;
					} else {
						var width		= size[0];
						var offsetX		= (this.relSize[0] - width) / 2;
						this.offset[0]	= offsetX;
						this.relSize[0]	= width;
					}
					break;
			}
			
			// determine Y coordinates
			switch (true) {
				// align on top
				case value[0] != 'auto' : 
					if (absolute) {
						var height 		= (size[1] == 'auto') ? this.absSize[1] - value[0] - value[2] : size[1];
						var offsetY 	= value[0] + this.shadowThikness;
					} else {
						var height 		= (size[1] == 'auto') ? this.relSize[1] - value[0] - value[2] : size[1];
						var offsetY 	= this.offset[1] + value[0];
						this.offset[1]	= offsetY;
						this.relSize[1]	= height;
					}
					break;

				// align on bottom
				case value[2] != 'auto' :
					if (absolute) {
						var height 		= (size[1] == 'auto') ? this.absSize[1] - value[0] - value[2] : size[1];
						var offsetY 	= this.absSize[1] - height - value[2] + this.shadowThikness;
					} else {
						var height		= (size[1] == 'auto') ? this.relSize[1] - value[0] - value[2] : size[1];
						var offsetY		= this.offset[1] + this.relSize[1] - height - value[2];
						this.offset[1]	= offsetY;
						this.relSize[1]	= height;
					}
					break;
					
				// align Ycenter
				case value[0] == 'auto' && value[2] == 'auto' : 
					if (absolute) {
						var height 		= size[1];
						var offsetY 	= (this.absSize[1] - height) / 2 + this.shadowThikness;
					} else {
						var width		= size[1];
						var offsetY		= (this.relSize[1] - height) / 2;
						this.offset[1]	= offsetY;
						this.relSize[1]	= height;
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
		(object) an object to be drawn
	*/
	
	getProperties : function(key) {
		var properties = {
			position	: $pick(this.props.layers[key].position,	this.props.layers['default'].position),
			size		: $pick(this.props.layers[key].size, 		this.props.layers['default'].size),
			shape		: $pick(this.props.layers[key].shape,		this.props.layers['default'].shape),
			color		: $pick(this.props.layers[key].color,		this.props.layers['default'].color),
			gradient	: $pick(this.props.layers[key].gradient,	this.props.layers['default'].gradient),
			stroke		: $pick(this.props.layers[key].stroke,		this.props.layers['default'].stroke),
			image		: $pick(this.props.layers[key].image,		this.props.layers['default'].image),
			width		: $pick(this.props.layers[key].width,		this.props.layers['default'].width),
			opacity		: $pick(this.props.layers[key].opacity,		this.props.layers['default'].opacity),
			angle		: $pick(this.props.layers[key].angle,		this.props.layers['default'].angle),
			rotation	: $pick(this.props.layers[key].rotation,	this.props.layers['default'].rotation),
			scale		: $pick(this.props.layers[key].scale,		this.props.layers['default'].scale),
			composite	: $pick(this.props.layers[key].composite,	this.props.layers['default'].composite)
		};
			
		// we test the position
		var coordinates = $pick(this.props.layers[key].offset, this.props.layers['default'].offset);
		if ($type(coordinates) == 'array') {
			//4 sides defined
			if ($defined(coordinates[3])) {
				coordinates = this.setOffset(coordinates, properties.position, properties.size);
			//3 sides defined
			} else if ($defined(coordinates[2])) {
				coordinates = this.setOffset([coordinates[0], coordinates[1], coordinates[2], coordinates[1]], properties.position, properties.size);
			//2 sides defined
			} else {
				coordinates = this.setOffset([coordinates[0], coordinates[1], coordinates[0], coordinates[1]], properties.position, properties.size);
			}
		//1 side defined
		} else {
			coordinates = this.setOffset([coordinates, coordinates, coordinates, coordinates], properties.position, properties.size);
		}
		properties.offset = [coordinates[0], coordinates[1]];
		properties.size = [coordinates[2], coordinates[3]];
		
		// +radius
		var radius = $pick(this.props.layers[key].radius, this.props.layers['default'].radius);
		
		if ($type(radius) == 'array') {
			properties.radius = $defined(radius[3]) ? radius : [radius[0], radius[0], radius[1], radius[1]];
		} else {
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
	
	setColor : function(part, props) {
		var p = (part == 'fill') ? 'gradient' : 'stroke';
		
		if (!props[p]) {
			props[p] = {
				color: props.color,
				opacity : props.opacity || 1
			};
		}
		
		if (props[p] && $type(props[p].color) == 'array') {
			
			// convert angle from degree to gradient
			if (!$defined(props[p].angle)) props[p].angle = 90;
			var a = props[p].angle * Math.PI / 180;
			var aAbs = Math.abs(a);
			
			//set stuff for IE
			this.ctx.ratio = props.size[1]/props.size[0];
			this.ctx.angle = a;
			
			if (props[p].angle >= -90 && props[p].angle < 90) {
				var ax = -((Math.cos(a - Math.atan(props.size[1] / props.size[0])) * Math.sqrt(Math.pow(props.size[0], 2) + Math.pow(props.size[1], 2)) * Math.cos(a)) / 2);
				var ay = -((Math.cos(a - Math.atan(props.size[1] / props.size[0])) * Math.sqrt(Math.pow(props.size[0], 2) + Math.pow(props.size[1], 2)) * Math.sin(a)) / 2);
			} else {
				var ax =  ((Math.cos(Math.PI - a - Math.atan(props.size[1] / props.size[0])) * Math.sqrt((props.size[0]).pow(2) + (props.size[1]).pow(2)) * Math.cos(Math.PI - a)) / 2);
				var ay =  - ((Math.cos(Math.PI - a - Math.atan(props.size[1] / props.size[0])) * Math.sqrt((props.size[0]).pow(2) + (props.size[1]).pow(2)) * Math.sin(Math.PI - a)) / 2);
			}
			var bx = -ax;
			var by = -ay;
			
			//make the gradient with start point and end point
			//console.log(props.size[0], props.size[1]);
			

			var color = this.ctx.createLinearGradient(ax, ay, bx, by);
			
			//check if opacity exist, else create it
			var length = props[p].color.length;
			if (!props[p].opacity || $type(props[p].opacity) != 'array') {
				var opacity = props[p].opacity || 1;
				props[p].opacity = [];
				for (var i = 0; i < length; i++) {
					props[p].opacity[i] = opacity;
				}
			}
			
			//check if stops exist, else create them
			if (!props[p].stop) {
				props[p].stop = [];
				for (var i = 0; i < length; i++) {
					props[p].stop[i] = i * (1 / (length - 1));
				}
			}
			//add color stop
			for (var i = 0; i < length; i++) {
				//we get the color
				var gradient = 'rgba(' + props[p].color[i].hexToRgb(true).join(',') + ', ' + props[p].opacity[i] + ')'
				color.addColorStop(props[p].stop[i], gradient);
			}
			
			
		//Normal color management
		} else {
			//check if opacity exist, else create it
			props[p].opacity = props[p].opacity || 1

			var color = 'rgba(' + props[p].color.hexToRgb(true).join(',') + ',' + props[p].opacity + ')';
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

	setTransformation : function(props) {
		this.ctx.translate(props.size[0]/ 2 + props.offset[0], props.size[1] / 2 + props.offset[1]);
		//rotation
		if (props.rotation) {
			this.ctx.rotate(Math.PI * props.rotation / 180);
		}
		
		//scale
		if (props.scale) {
			if ($type(props.scale) != 'array') props.scale = [props.scale, props.scale];
			this.ctx.scale(props.scale[0], props.scale[1]);
		}
		
		//composite
		if (props.composite) this.ctx.globalCompositeOperation = props.composite;

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
	
	drawShape : function(props){
		if (props.image) {
			this.setImage(props);
		} else if (props.color || props.gradient) {
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
	
	setImage : function(props) {
		//set vars
		props.image.pattern = props.image.pattern || 'repeat';
		
		// we load the image
		var img = new Image();
		img.onload = function(){
			// create pattern
			var ptrn = this.ctx.createPattern(img, props.image.pattern);
			this.ctx.fillStyle = ptrn;
			this.ctx.fill();
		}.bind(this)
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
			
	roundedRect: function(props) {
		this.ctx.beginPath();
		this.ctx.moveTo(props.radius[0] - props.size[0] / 2, - props.size[1] / 2);
		this.ctx.lineTo(props.size[0] - props.radius[1] - props.size[0] / 2, - props.size[1] / 2);
		this.ctx.quadraticCurveTo(props.size[0] - props.size[0] / 2, - props.size[1] / 2, props.size[0] - props.size[0] / 2, props.radius[1] - props.size[1] / 2);
		this.ctx.lineTo(props.size[0] - props.size[0] / 2, props.size[1] - props.radius[2] - props.size[1] / 2);
		this.ctx.quadraticCurveTo(props.size[0] - props.size[0] / 2, props.size[1] - props.size[1] / 2, props.size[0] - props.radius[2] - props.size[0] / 2, props.size[1] - props.size[1] / 2);
		this.ctx.lineTo(props.radius[3] - props.size[0] / 2, props.size[1] - props.size[1] / 2);
		this.ctx.quadraticCurveTo( - props.size[0] / 2, props.size[1] - props.size[1] / 2,  - props.size[0] / 2, props.size[1] - props.radius[3] - props.size[1] / 2);
		this.ctx.lineTo( - props.size[0] / 2, props.radius[0] - props.size[1] / 2);
		this.ctx.quadraticCurveTo( - props.size[0] / 2, - props.size[1] / 2, props.radius[0] - props.size[0] / 2, - props.size[1] / 2);
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
		var r = props.size[1]/2;
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
	
	line : function(props) {
		props.stroke = props.stroke || {
			color : props.color,
			width : props.width
		}
		
		delete props.color;
		
		this.ctx.beginPath();
		if (props.direction == 'up') {
			this.ctx.moveTo(-props.size[0]/2 + 0.5,  props.size[1]/2 - 0.5);
			this.ctx.lineTo( props.size[0]/2 - 0.5, -props.size[1]/2 + 0.5);
		} else {
			this.ctx.moveTo(-props.size[0]/2 + 0.5, -props.size[1]/2 + 0.5);
			this.ctx.lineTo( props.size[0]/2 - 0.5,  props.size[1]/2 - 0.5);
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
	
	triangle : function(props) {
		this.ctx.beginPath();
		this.ctx.moveTo(-props.size[0]/2, props.size[1]/2);
		this.ctx.lineTo( props.size[0]/2, props.size[1]/2);
		this.ctx.lineTo( 0, -props.size[1]/2);
		this.ctx.closePath();
	}	
});
/*

Class: UI.Skin
	The UI.Skin class defines a singleton object that handle skins.

Arguments:
	Options
	
Options: 
	skin - (string) skin name defined in skins. ie: AquaGraphite

Example:
	(start code)
	UI.skin = new UI.Skin('AquaGraphite');
	(end)
*/

UI.Skin = new Class({
	Singleton 	: true,
 	Implements	: [Events, Options],
	
	options : {
		skin	: 'AquaGraphite'
	},
	
	/*
	Constructor: initialize
		Constructor

		Set the default skin
		
	Arguments:
		options - (object) options
	*/
 	
	initialize : function(options) {
		this.setOptions(options);
		this.defaultSkin = this.options.skin;
	},
	
	/* 
	Function : processSkin
		private function
	
		Merge what can be merged on the skin sheet the first time it's called so it will be faster for next calls.
		
	Arguments:
		skinName - (string) the name of the skin who should be preprocessed.
	
	Return:
		(void)
	*/

	processSkin : function(skinName) {
		//we merge syles for each states of each type of components
		for (var cKey in UI.props[skinName]) {
			if (cKey != 'default') {
				for(var tKey in UI.props[skinName][cKey]) {
					for(var sKey in  UI.props[skinName][cKey][tKey]) {
						if (sKey != 'shortcuts') {
							var props = UI.props[skinName]['default'];
							if (UI.props[skinName][cKey]['default']) {
								props = this.merge(
									props,
									UI.props[skinName][cKey]['default']['default'],
									UI.props[skinName][cKey]['default'][sKey]
								);
							}
							props = this.merge(
								props,
								UI.props[skinName][cKey][tKey]['default'],
								UI.props[skinName][cKey][tKey][sKey]
							);
							UI.props[skinName][cKey][tKey][sKey] = props;
						}
					}
				}
			}
		}
		UI.props[skinName].preprocessed = true;
	},
	

	/*
	Function: get
		get properties for provided class. This methos will check in the options of the instance needed parameters.
		
	Properties:
		className - (object) A UI.Element (or a child class) instance.
		
	className: (object)
		the get method will use in the provided instance following options :
			options.skin
			options.component
			option.type
			options.props
			options.style
		It will also check for other options, as defined in skin sheet as shortkeys
		
	Return:
		(object) An object containing skin properties for current type, merged with optional provided custom properties.
	 */
	
	get : function(className){
		var
			skin		= className.options.skin ? className.options.skin : this.defaultSkin,
			cKey		= className.options.component,
			tKey		= className.options.type,
			props		= className.options.props,
			styles		= className.options.styles;
		
		//check if it was already preprocessed
		if(!UI.props[skin].preprocessed) this.processSkin(skin);

		//get properties for provided type
		if (UI.props[skin][cKey][tKey]) {
			var type = $unlink(UI.props[skin][cKey][tKey]);
		} else if (UI.props[skin][cKey]['default']) {
			var type = $unlink(UI.props[skin][cKey]['default']);
		} else {
			var type = {
				'default': $unlink(UI.props[skin]['default'])
			};
		}
		//add custom states
		for(var csKey in props) {
			if(!type[csKey]) type[csKey] = props[csKey];
		}
		
		for (var sKey in type) {
			//bind shortcuts
			if(type[sKey].shortcuts) {
				for (var scKey in type[sKey].shortcuts) {
					if (className.options[scKey])
						eval('type[\'' + sKey + '\'].' + type[sKey].shortcuts[scKey] + ' = this.merge(type[\'' + sKey + '\'].' + type[sKey].shortcuts[scKey] + ',className.options.' + scKey + ')');
				}
			}

			//merge custom properties
			if (props)
				type[sKey] = this.merge(type[sKey], props['default'], props[sKey]);
			
			//merge custom styles
			type[sKey].styles = this.merge(type[sKey].styles, styles);
			
			//set size
			//if (className.options.width) type[sKey].width = className.options.width;
			//if (className.options.height) type[sKey].height = className.options.height;
		}
		
		//remove shadows if not used
		if (type['default'].layers.shadow.size == 0) {
			delete type['default'].shadows;
		};
		
		return type;
	},
	
	/*
		Function: getComponentProps
			get skin definition for specified component (inside an other element)
			
		Properties: (hash)
			component - (string) the name of the component
			
		Return:
			(object) Object containing component properties
	*/
	
	getComponentProps : function(skin, component){
		var componentProps = {};
		$H(skin).each(function(state, key){
			if (state.components && state.components[component]){
				componentProps[key] = state.components[component];
			}
		});
		return componentProps;
	},
		
	/*
		Function: merge
			private function
			
			merge is a lighter version of the core mootools merge function
			Merges any number of objects recursively without referencing them or their sub-objects.
			
		See also: mootools merge function
			
	*/	
	
	merge : function() {
		var mix = {};
		for (var i = 0, l = arguments.length; i < l; i++){
			var object = arguments[i];
			for (var key in object){
				var op = object[key], mp = mix[key];
				mix[key] = ($type(op) == 'object' && $type(mp) == 'object') ? this.merge(mp, op) : op;
			}
		}
		return mix;
	}
});
/*
Class: UI.Element
	UI.Element is the root class of most class of Moolego UI
*/

UI.Element = new Class({
	Implements				: [Events, Options],
		
	options: {
		lib					: 'ui',

		component			: 'element',
		type				: 'default',
		state				: 'default',	
		
		tag					: 'div',
		
		resizable			: false,
		draggable			: false,
		selectable			: true,
		onlyCanvas			: false,	

		skin				: 'AquaGraphite',
		props				: false,
		
		styles				: {},
		
		//group id
		group				: false,
		
		// implemeted events
		onClick				: $empty,
		onMouseDown			: $empty,
		onBuild				: $empty,
		onBuildComplete		: $empty,
		onResizeStart		: $empty,
		onResize			: $empty,
		onResizeComplete	: $empty,
		onDragStart			: $empty,
		onDrag				: $empty,
		onDragComplete		: $empty
		
	},

	/* 
		Method: initialize
		
			Construtor
	 */
	
	initialize: function(options){
		this.setOptions(options);
		if (!this.controller) this.controller = UI.controller;

		this.setClassName();
		this.setSkin();
		
       	this.build();

		this.setBehavior();
	},
	
	toElement : function(){
		return this.element;
	},

	/* 
		Method: build
		
			Instanciate an element Native Mootols
	*/
	
	build : function(){
		this.fireEvent('build');

		this.element = new Element(this.options.tag, {
			'class' : this.className,
			styles	: this.props.styles,
			events	: this.options.events,
			id		: this.options.id,
			name	: this.options.name,
			html	: this.options.html,
			'for'	: this.options['for']
		});
		
		//this.element.setStyle('visibility', 'hidden');
		if (!this.options.selectable) this.element.disableSelect();
		this.element.ui = true;
		this.state = this.options.state;
		this.dragHandlers = [];
	},

	/* 
		Method: setSkin
		
			Define the className according the component name, type and state
	 */
	
	setClassName : function() {
		if (this.options.className) {
			this.className = this.options.className;
		} else {
			this.className = this.options.lib + '-' + this.options.component;
			
			if (this.options.type != 'default') 
				this.className = this.className + '-' + this.options.type;
			if (this.options.state != 'default') 
				this.className = this.className + '-' + this.options.state;
		}
	},
	
	/* 
		Method: setSkin
		
			Get the skin for the current component
	 */
	
	setSkin: function(){
		UI.skin = new UI.Skin(this.options.skin);
		
		this.skin = UI.skin.get(this);
		
		this.props = this.skin[this.options.state];
		this.props.layers = new Hash(this.props.layers);
	},
	
	/* 
		Method: setCanvas
		
			Draw the canvas
	*/
	
	setCanvas : function(){
		if (this.canvas || (this.props && !this.props.layers) || (this.props && this.props.layers && this.props.layers.getLength() <= 2))
			return false;

		this.canvas = new UI.Canvas({
			props 			: this.props,
			width			: this.element.x,
			height			: this.element.y
		}).inject(this.element);
		
		this.addEvent('setCanvasSize', function(state){
			if (!state)	var props = this.props;
			else var props = this.skin[state] || this.props;
			this.canvas.setSize(this.element.x,this.element.y, props);
		});
	},

	/* 
		Method: setState
			Set the button state
	*/
	setState : function(state, size){
		if (this.skin[state]) {
			this.state = state;
			if (this.skin[state].styles) this.setStyles(this.skin[state].styles);
			
			if ($defined(size))
				this.setSize(size.width, size.height, state);
			else
				this.fireEvent('setCanvasSize', state);
		}
		return this;
	},
	
	/*
	 * 	Function: setSize
	 * 		Set size of the element and its canvas
	 */
	
	setSize : function(width, height, state){
		this.element.x = width || this.options.width || this.props.width || this.element.getSize().x;
		this.element.y = height || this.options.height || this.props.height || this.element.getSize().y;
		if (this.element.x) this.element.setStyle('width', this.element.x);
		if (this.element.y) this.element.setStyle('height', this.element.y);
		this.fireEvent('setCanvasSize', state);

		return this;
	},


	/*
	    Function: setLocation
			Set element location 
	*/
	
	setLocation	: function(left,top,morph) {
		this.element.left = left || this.options.left || this.props.defaultLeft || this.element.getCoordinates().x - this.props.shadowMagnify * 2;
		this.element.top = top || this.options.top || this.props.defaultTop || this.element.getCoordinates().y - this.props.shadowMagnify * 2;
		
		this.element[morph ? 'morph' : 'setStyles']({
			top	: this.element.top,
			left : this.element.left
		});
	},

	
	/*
	    Function: setBehavior
			Set element behavior
	*/

	setBehavior : function() {
		
		if (this.options.draggable)  { this.enableDrag(); }
		if (this.options.resizable) { this.enableResize(); }
		
		this.element.addEvents({
			click 		: this.fireEvent.bind(this, 'click'),
			mousedown 	: this.fireEvent.bind(this, 'mousedown'),
			mouseover 	: this.fireEvent.bind(this, 'mouseover'),
			mouseenter 	: this.fireEvent.bind(this, 'mouseenter'),
			mouseOut 	: this.fireEvent.bind(this, 'mouseOut'),
			mouseup 	: this.fireEvent.bind(this, 'mouseup')
		});
	},


	/*
		Function: enableDrag
			Add draggable capabilities for the element.
	*/
	
	enableDrag :function() {
		
		if (this.dragHandlers.length == 0) {
			this.dragHandlers = null;
		}
		
		this.dragHandler = new Drag(this.element, {
			handle 		: this.dragHandlers,
			limit 		: { x: this.options.dragLimitX, y: this.options.dragLimitY },
			
			onStart 	: this.fireEvent.bind(this, 'onDragStart'),
			onDrag 		: this.fireEvent.bind(this, 'onDrag'),
			onComplete 	: this.fireEvent.bind(this, 'onDragComplete')
		});
		
		this.addEvents({
			onDragComplete 	: this.adaptLocation.bind(this)
		});
		
		return this;
	},	

	/*
	  	Function: enableDrag
			Remove draggable capabilities for the element.
	*/
		
	disableDrag	: function() {
		if (this.dragHandler) this.dragHandler.stop();
		return this;
	},
	
	
	/*
	    Function: enableResize
	    	Add resizable capabilities for the element.
	*/
	
	enableResize : function() {
		this.element.makeResizable({
			handle			: this.resize,
			limit			: { 
				x			: this.options.resizeLimitX,
				y			: this.options.resizeLimitX 
			},
			onStart 		: function() { this.fireEvent('onResizeStart'); }.bind(this),
			onDrag 			: function() { this.fireEvent('onResizeDrag'); }.bind(this),
			onComplete		: function() { this.fireEvent("onResizeComplete"); }.bind(this)
		});
		
		this.addEvents({
			onResizeDrag 	: function(){
				this.setSize(this.element.getSize().x,this.element.getSize().y);
			}
		});
		
		return this;
	},
	
	/*
	    Function: setLocation
			Set element location 
	*/
	
	getCenterLocation: function() {
		var location = {};
		
		location.top = (window.getHeight() - this.options.height.toInt()) / 2,
		location.left = (window.getWidth() - this.options.width.toInt()) / 2
		
		return location;
	},


	/*
	    Function: adaptLocation
	      Adapt location if window is dragged out of its boundaries
	*/
	
	adaptLocation : function() {
		var location = {};
		var needed = false;
		var coordinates = this.element.getCoordinates();
		
		

		if (coordinates.top.toInt() > window.getHeight()-53) {
			location.top = window.getHeight()-$random(25,75)
			needed = true;
		}
		
		if (coordinates.left.toInt() + this.element.getStyle('width').toInt() < 0) {
			location.left = $random(25,75)-this.element.getStyle('width').toInt();
			needed = true;
		}
		
		if (this.element.getStyle('left').toInt() > window.getWidth()) {
			location.left = window.getWidth()-$random(25,75);
			needed = true;
		}
		
		if (needed) {
			if (this.props.fx && this.props.fx.adaptLocation)  {
				if (!this.reposFx) this.reposFx = new Fx.Morph(this.element, this.props.fx.adaptLocation);
				
				this.reposFx.start(location) ;
			} else {
				
				
			}
		}
	},
		
	/*
   		reImpelement some Native Mootools Element needed methods
	*/
	
	
	/*
	    Function: show
	    	Set display block to the view element
	*/
	
	show: function() {
		this.fireEvent('show');
		this.element.setStyle('opacity', 1);
		this.element.show();

		return this;
	},

	/*
    	Function: hide
    		Set display none to the view element

	*/
	
	hide: function() {
		this.element.hide();
		
		return this;
	},
	
		
	/*
    Function: inject
    	Inject the element element into container
    	
    Argument: 
    	View Container

	*/
	
	inject: function (container, position){
		this.fireEvent('inject');

		this.element.inject(container, position);
		this.element.setStyle('visibility', 'visible');
		this.setSize();
		this.setCanvas();
		this.controller.register(this);
		this.fireEvent('injected');
		return this;		
	},
	
	/*
    Function: addopt
    	Inject the element element into container
    	
    Argument: 
    	View Container

	*/
	
	adopt: function (element){
		this.element.adopt(element);
		this.setSize();
		return this;		
	}

});


/*
	Script: UI.Element.Native.js
	  Contains methods to work with size, scroll, or positioning of Elements and the window object.
	 
	License:
	  MIT-style license.
	 
	Credits:
	  - Element positioning based on the [qooxdoo](http://qooxdoo.org/) code and smart browser fixes, [LGPL License](http://www.gnu.org/licenses/lgpl.html).
	  - Viewport dimensions based on [YUI](http://developer.yahoo.com/yui/) code, [BSD License](http://developer.yahoo.com/yui/license.html).
*/


/*
	Bindings to the native mootools element functions

	Discussion: 
		should be implemented automaticaly
 */


UI.Element.implement({

	/*
	 * Function: setStyle
	 * 	implement setStyle from de wrappwr
	 */
	
	setStyle: function(style, value) {
		this.element.setStyle(style, value);
		
		return this;	
	},

	/*
	 * Function: setStyles
	 * 	implement setStyles from element
	 */
	
	setStyles: function(styles) {
		this.element.setStyles(styles);
		
		return this;	
	},
	
	/*
	 * Function: setStyles
	 * 	implement setStyles from element
	 */
	
	getStyle: function(style) {
		return this.element.getStyle(style);;	
	},
	
	/*
	 * Function: addClass
	 * 	implement addClass from de wrapper
	 */
	
	addClass: function(className) {
		this.element.addClass(className);
		
		return this;	
	},
	
	/*
	 * Function: addClass
	 * 	implement element set method
	 */
	
	set: function(property, value) {
		this.element.set(property, value);
		return this;	
	},
	
	/*
	 * Function: get
	 * 	implement element get method
	 */
	
	get: function(property) {
		return this.element.get(property);	
	},
	
	/*
	 * Function: getSize
	 * 	implement element getSize method
	 */
	
	getSize: function() {
		return this.element.getSize();	
	},
	
	/*
	 * Function: getCoordinates
	 * 	implement element getCoordinates method
	 */
	
	getCoordinates: function(ref) {
		return this.element.getCoordinates(ref);
	},

	
	/*
    Function: destroy
    
    	Destroy the view element

	*/

	destroy: function() {
		/*
		//we get inner element
		if (this.element.elements) {
			//get component
			this.element.elements.each(function(component){
				component.each(function(elementClass){
					console.log('destroy : ' + elementClass.options.component);
					elementClass.destroy();
					delete elementClass;
				});
			});
		}
		*/
		
		this.element.destroy();

		return;
	}
});


/*
Script: Extension.Element.js
        Extends the Element class with some needed methods.

License: MIT
        
*/

Element.implement({
	disableSelect: function(){
		if (typeof this.onselectstart != "undefined") 
			this.onselectstart = function(){
				return false
			}
		else 
			if (typeof this.style.MozUserSelect != 'undefined') 
				this.style.MozUserSelect = 'none'
			else 
				this.onmousedown = function(){
					return false
				}
				
		this.style.cursor = 'default'
		
		return this;
	},
	
	enableSelect: function(){
	
		if (this.onselectstart) 
			this.onselectstart = '' // for the badboy
		else 
			if ($type(this.style.MozUserSelect) == "none") 
				this.style.MozUserSelect = '' // for Firefox 
			else 
				this.onmousedown = function(){
					return true
				} //finaly the others (opera, not sure for safari)
				
		this.style.cursor = "default";
		
		return this;
	},
	
	/*
	 Script: Element.Shortcuts.js
	 Extends the Element native object to include some shortcut methods.
	 
	 License:
	 http://clientside.cnet.com/wiki/cnet-libraries#license
	 */
	
	isVisible: function(){
		return this.getStyle('display') != 'none';
	},
	
	toggle: function(){
		return this[this.isVisible() ? 'hide' : 'show']();
	},
	
	hide: function(){
		var d;
		try {
			//IE fails here if the element is not in the dom
			d = this.getStyle('display');
		} 
		catch (e) {
		}
		this.store('originalDisplay', d || 'block');
		this.setStyle('display', 'none');
		return this;
	},
	
	show: function(display){
		original = this.retrieve('originalDisplay') ? this.retrieve('originalDisplay') : this.get('originalDisplay');
		this.setStyle('display', (display || original || 'block'));
		return this;
	},
	
	swapClass: function(remove, add){
		return this.removeClass(remove).addClass(add);
	},
	
	log: function(text, args){
		if (window.console) 
			console.log(text.substitute(args ||
			{}));
	}
});


/*
	Class: UI.Box
		UI.Box is used to make a skinnable container
	
	Arguments:
		options
		
	Options:
		tag - (string) element tag, by default 'span'
		html - (string) label text, by default Label
	
	Returns:
		Box element
		
	Example:
		(start code)
		var box = new UI.Box({
			html	: 'Hello world!',
		}).inject(this.element);
		(end)
	
	Discussion:
	
*/

UI.Box = new Class({
	Extends					: UI.Element,
		
	options: {
		component			: 'box',
		
		tag					: 'div',
		html				: 'Box',
		
		emboss				: false,
		
		selectable			: false
	},

	/* 
	Function: build
		private function
		
		Call UI.Element build
	*/
	
	build: function(options){
		this.parent(options);
	}
});/*
	Class: UI.Bubble
		Creates Bubble and let you attach events action
	
	Extend:
		UI.Element
	
	Arguments:
		options
	
	Options: 
		label - (string) bubble content
		target - (string / element) Can be either an element id either a UI.Element instance (a native element also?)
	
	Example:
		(start code)
			var Bubble = new UI.Bubble({
				target : 'myElement',
				label : 'This bubble says Hello world!'
			});
		(end)
*/

UI.Bubble = new Class({
	Extends				: UI.Element,
	
	options				: {
		component		: 'bubble',
		
		// default options
		label			: 'Bubble',
		target			: 'element',
		resetPosition	: true,
		zIndex			: 1000
	},
	
	/* 
	Constructor: initialize
		Construtor
	
	Arguments:
		options - (object) options
	*/
	
	initialize: function(options) {
		this.parent(options);
		this.inject(document.body);
		this.setLocation();
		this.fade(1);
	},

	/* 
	Function: build
		private function
		
		Make a  Label and set the fade Fx
	
	Return:
		(void)
	*/
	
	build : function(){
		this.parent();
		this.control = this.element;
		//we create a span for text
		if(this.options.label) {
			this.label = new UI.Label({
				html : this.options.label,
				styles : this.props.components.label.styles
			}).inject(this.element);
		}
		
		
		// fx should be defined in skin sheet or not
		// and an option can should be add to use effect on build on not
		
		this.fx = new Fx.Tween(this.element, {
			wait : false,
			onStart : function(){
				this.element.show();
			},
			onComplete : function(){
				if(!this.element.getStyle('opacity')) {
					this.element.hide();
				}
			}
		});
	},
	
	/* 
	Function: setBehavior
		private function
		
		Add a click event to close the bubble
	*/
	
	setBehavior : function(){
		this.parent();
		
		this.element.addEvents({
			'click' : function(){
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
	
	setLocation : function(){
		var coord = this.getLocation();
		this.element.setStyles({
			left 	: coord.left,
			top 	: coord.top
		});
		
		if (this.options.resetPosition) {
			this.posFx = new Fx.Morph(this.element, {
				wait : false
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
				resize			: this.reposition,
				setTipsPosition : this.reposition
			});
		}
	},
	
	/* 
	Function: getLocation
		Set an input in the control element
	
	Return:
		(object) Object containing top and left values
	*/
	
	getLocation : function(){
		var bubbleCoord = this.element.getCoordinates();
		var coord = this.options.target.getCoordinates();
		
		if (this.options.type == 'default') {
			var left = coord.right - 40;
			var top = coord.top - bubbleCoord.height - 10;
		} else if (this.options.type == 'bottom') {
			var left =  coord.right - 40;
			var top = coord.top + coord.height + 10;
		};
		
		return {
			top : top,
			left: left
		}
	},

	/* 
		Method: setSize
		
			Set the size of the bubble from the label
	*/
	
	setSize : function(width,height){
		if (this.label) {
			this.options.width = width || this.options.width || this.props.width || this.label.getSize().x;
			this.options.height = height || this.options.height || this.props.height || this.label.getSize().y;
		};
		
		this.parent();
	},
		
	/* 
	Function: fade
		Fade the tip to provided opacity
	
	Arguments:
		way - (float) The destination opacity
		
	Return:
		this
	*/
	
	fade : function(way){
		this.fx.start('opacity', way);
		return this;
	},
	
	/* 
		Method: destroy
		
			Destroy the element, and remove the event on window
		
		Return:
			(void)
	*/
	
	destroy : function(){
		window.removeEvent('resize', this.reposition);
		this.parent();
	}
});/*
	Class: UI.Label
		UI.Label is used to make text element with css skin
	
	Arguments:
		options
		
	Options:
		tag - (string) element tag, by default 'span'
		html - (string) label text, by default Label
		emboss - (boolean) duplicate the text to create an emboss effect
		selectable - (boolean) Define if the text is selectable or not
	
	Returns:
		Label element
		
	Example:
		(start code)
		var label = new UI.Label({
			html	: 'Hello world!',
		}).inject(this.element);
		(end)
	
	Discussion:
	
*/

UI.Label = new Class({
	Extends					: UI.Element,
		
	options: {
		component			: 'label',
		
		tag					: 'span',
		html				: 'Label',
		
		emboss				: false,
		
		selectable			: false
	},

	/* 
	Function: build
		private function
		
		Call UI.Element build
	*/
	
	build: function(options){
		this.parent(options);
		/*
		if (this.options.emboss) {
			this.addEvent('injected', function(){
				this.emboss = this.element.clone().inject(this.element, 'top');
				if (this.props.components && this.props.components.emboss.styles) {
					this.emboss.setStyles(this.props.components.emboss.styles);
				}
			});
		}
		*/
	}
});/*
Class: UI.Scrollbar
	Manage scrolls for menus.
	
Require:
	UI/Scrolling/Scrolling.js

Credits: 
	based on Valerio's Mootools scrollbar plugin.

*/


UI.Scrollbar = new Class({
	Extends				: UI.Element,

	options: {
		component		: 'scrollbar',
		type			: 'track',
		
		width			: 15,
		
		maxThumbSize	: 32,
		wheel			: 32	
	},

	initialize: function(options){
		this.parent(options);
		
		this.bound = {
			'start': this.start.bind(this),
			'end': this.end.bind(this),
			'drag': this.drag.bind(this),
			'wheel': this.wheel.bind(this),
			'page': this.page.bind(this)
		};

		this.position = {};
		this.mouse = {};
		this.update();
		this.attach();
	},
	
	build: function() {
		this.parent();
		
		this.inject(this.options.container,'before')
		
		this.thumb = new UI.Element({
			skin 			: this.options.skin,
			component		: this.options.component,
			type			: 'thumb'
		}).inject(this.element);
	},
	
	update: function(){
		this.containerSize = this.options.container.getSize().y;
		this.setSize(this.options.width.toInt(),this.containerSize);
		this.containerScrollSize = this.options.container.scrollHeight;
		if(this.containerScrollSize == 0) return;

		this.isVisible() ?	this.thumb.element.setStyle('visibility','visible') : this.thumb.element.setStyle('visibility','hidden');
		
		this.trackSize = this.element.offsetHeight.toInt();
		this.containerRatio = this.containerSize / this.containerScrollSize;
		this.thumbSize = (this.trackSize * this.containerRatio).limit(this.options.maxThumbSize.toInt(), this.trackSize);
		this.scrollRatio = this.containerScrollSize / this.trackSize;
		this.thumb.setSize(this.options.width, this.thumbSize);
			
		this.updateThumbFromContentScroll();
		this.updateContentFromThumbPosition();
		
	},

	updateContentFromThumbPosition: function(){
		this.options.container.scrollTop = this.position.now * this.scrollRatio;
	},

	updateThumbFromContentScroll: function(){
		this.position.now = (this.options.container.scrollTop / this.scrollRatio).limit(0, (this.trackSize - this.thumbSize));
		this.thumb.setStyle('top', this.position.now);
	},

	attach: function(){
		this.thumb.element.addEvent('mousedown', this.bound.start);
		//this.thumb.element.addEvent('whileclick', this.bound.start);
		if (this.options.wheel) 
			this.options.container.addEvent('mousewheel', this.bound.wheel);
		this.element.addEvent('mouseup', this.bound.page);
	},

	wheel: function(event){
		this.options.container.scrollTop -= event.wheel * this.options.wheel;
		this.updateThumbFromContentScroll();
		event.stop();
	},

	page: function(event){
		if (event.page.y > this.thumb.element.getPosition().y) this.options.container.scrollTop += this.options.container.offsetHeight;
		else this.options.container.scrollTop -= this.options.container.offsetHeight;
		this.updateThumbFromContentScroll();
		event.stop();
	},

	start: function(event){
		this.mouse.start = event.page.y;
		this.position.start = this.thumb.element.getStyle('top').toInt();
		document.addEvent('mousemove', this.bound.drag);
		document.addEvent('mouseup', this.bound.end);
		this.thumb.element.addEvent('mouseup', this.bound.end);
		event.stop();
	},

	end: function(event){
		document.removeEvent('mousemove', this.bound.drag);
		document.removeEvent('mouseup', this.bound.end);
		this.thumb.element.removeEvent('mouseup', this.bound.end);
		event.stop();
	},

	drag: function(event){
		this.mouse.now = event.page.y;
		this.position.now = (this.position.start + (this.mouse.now - this.mouse.start)).limit(0, (this.trackSize - this.thumbSize));
		this.updateContentFromThumbPosition();
		this.updateThumbFromContentScroll();
		event.stop();
	},
	
	isVisible: function() {

		if (this.containerSize < this.containerScrollSize) {
			return true;
		} else {
			return false;	
		}
	}

});/*
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
		this.groups = {};
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
			window.fireEvent('setTipsPosition');
		}
		
		//set z-index
		if (elementClass.element.getStyle('zIndex') == 'auto' || elementClass.element.getStyle('zIndex') == 0)
			elementClass.element.setStyle('zIndex', elementClass.options.zIndex || this.zIndex++);
			
		//add element to the group if needed
		//this.group(elementClass);
	},
	
	/*
	  Function: group
	  
	   Group elements in a group
	   
	  Arguments: element class instance
	  
	 */
	
	group : function(elementClass) {
		if (elementClass.options.group) {
			//we check if the group exist, else we create it
			this.groups[elementClass.options.group] = this.groups[elementClass.options.group] || [];
			this.groups[elementClass.options.group].push(elementClass);
		}
	},
	
	/*
	  Function: serialize
	  
	   Serialize values of elements' group provided and return them 
	   
	  Arguments: group id
	  
	 */
	
	serialize : function(groupID) {
		if (!this.groups[groupID]) return false;
		//we get all elements
		var string = [];
		this.groups[groupID].each(function(eC){
			if (eC.value) string.push(eC.options.name + '=' + eC.value);
		});
		console.log(string.join('&'));
	}
});

UI.controller = new UI.Controller();
/*
	Class: UI.Control
		UI.Control is the root class of most control elements of moolego UI. It can't be used alone.
		
	Extend:
		UI.Element
		
	Arguments:
		options
	
	Returns:
		Canvas object.
	
	Discussion:
	
*/



UI.Control = new Class({
	Extends					: UI.Element,
		
	options: {},

	/* 
	Constructor: initialize
		Construtor
	
	Arguments:
		options - (object) options
	*/
	
	initialize: function(options){
		this.parent(options);
	},
	
	/* 
	Function: build
		private function
		
		Call UI.Element build and set the control element
	*/
	
	build: function() {
		this.parent();
		this.control = this.element;
	},
	
	/* 
	Function: setSize
		Set the size of an element, defined by the label size in most case and relay it to parent method.
	
	Arguments:
		width - (integer) New element width
		height - (integer) New element height
		state - (string) (optional) Can be specified to draw a new state too
	*/
	
	setSize : function(width,height, state){
		if (this.textLabel) {
			var twidth = width || this.options.width || this.props.width || this.textLabel.getSize().x;
			var theight = height || this.options.height || this.props.height || this.textLabel.getSize().y;
		}else if (this.input && this.input.getProperty('type') != 'hidden') {
			var twidth = width || this.options.width || this.props.width || this.input.getSize().x;
			var theight = height || this.options.height || this.props.height || this.input.getSize().y;
		}
		
		this.parent(twidth, theight, state);
	},
	
	/* 
	Function: setInput
		private function
		
		Set an input in the control element
	
	Arguments:
		type - (string) The input type. Could be hidden, text, ...
		tag - (string) The input tag. Could be input or textarea
		
	Return:
		(void)
	
	Discussion:
		As we want to remove input from control, this method should no longer exist.
	*/
	
	setInput : function(type, tag){
		if (!$defined(tag)) tag	= 'input';
		if (!$defined(type)) type = 'hidden';

		if (type) {
			this.input = new Element(tag, {
				type		: type,
				name 		: this.options.name
			}).inject(this.control);
		} else {
			this.input = new Element(tag, {
				name 		: this.options.name
			}).inject(this.control);
		}
		
		switch (tag) {
			case 'input' :
				this.input.set('value', this.options.value);
				break;
			case 'textarea' :
				this.input.set('html', this.options.value);
				break;
		}
		if (type != 'hidden') {
			this.input.set(this.props.components.input);
		}
	},
	
	/* 
	Function: getForm
		Get the form element containing this element
		
	Return:
		(element) the form element
	
	Discussion:
		As we want to remove input from control, this method shoul no longer exist.
		We will use instead the group and serialize method of the UI.Controller
	*/
	
	getForm : function(){
		if (this.control) {
			var element = this.control.getParent();
			while (element.get('tag') != 'form') {
				element = element.getParent();
			}
			return element;
		}
		return false;
	},
	
	/* 
	Function: setBehavior
		private function
		
		Set control relative behavior (blur and focus)
	
	Return:
		(void)
	*/
	
	setBehavior : function(){
		this.parent();
		if (this.input) {
			this.input.addEvents({
				blur	: this.fireEvent.bind(this, 'blur'),
				focus	: this.fireEvent.bind(this, 'focus')
			});
		}
	},
	
	/* 
	Function: set
		Intercept set method to pass the html to textLabel instead of element
	
	Return:
		(void)
	*/

	set : function(property, value){
		if (property == 'html') {
			if (this.textLabel) this.textLabel.set(property, value);
			this.setSize();
		} else {
			this.element.set(property, value);
		}
	}
});/*
Class: UI.Input
	Create a skinnable input element

Arguments:
	options

Options: 
	name - (string) name for the input element
	value - (string) value
	component - (string) component name

Example:
	(start code)
	var button = new UI.Button({
		name: 'myInput',
		value: 'Hello world'
	}).inject(document.body);
	(end)
*/

UI.Input = new Class({
	Extends				: UI.Control,
	
	options				: {
		component		: 'input',
		
		// default options
		name			: 'ui-input',
		value			: ''
	},
	
	/* 
	Constructor: initialize
		Constructor
	
	Arguments:
		options - (object)
	*/
	
	initialize: function(options) {
		this.parent(options);
	},
	
	/* 
	Function: build
		private function
		
		Create a div and a hidden input to receive the selected value
	
	Return:
		(void)
	*/
	
	build : function(){
		//create a new div as input element
		this.parent();
		
		//create input
		this.setInput('text');
		this.input.setStyle('width', this.props.width - this.input.getStyle('paddingLeft').toInt() - this.input.getStyle('paddingRight').toInt());
	},
	
	/* 
	Function: setState
		Set element state
	
	Arguments:
		state - (string) State name
		
	Return:
		(void)
	*/
	
	setState : function(state){
		this.parent(state);
		if (this.skin[state]) this.input.set(this.skin[state].components.input.styles);
	},
	
	/* 
	Function: setBehavior
		private function
		
		Set control relative behavior (blur and focus)
	
	Return:
		(void)
	*/
	
	setBehavior : function() {
		this.parent();
		this.input.addEvents({
			blur	: function(){
				this.setState('default');
			},
			focus	: this.setState.bind(this, 'focus')
		})
	}
});
/*
Class: UI.Button
	Creates button and let you attach events action

Arguments:
	options

Options: 
	label - (string) Text to show in button
	submit - (boolean) Set to true if you want your button act as a submit button

Example:
	(start code)
		var button = new UI.Button({
			label		: 'i am a new UI.Button',
			onClick		: { alert('click') }
		}).inject(document.body);
	(end)
*/

UI.Button = new Class({
	Extends				: UI.Control,
	
	options				: {
		component		: 'button',
		
		// default options
		label			: 'Button',
		submit			: false
	},
	
	/* 
	Constructor: initialize
		Construtor
	
	Arguments:
		options - (object) options
	*/
	
	initialize: function(options) {
		this.parent(options);
	},
	
	/* 
	Function: build
		private function
		
		Create a textLabel and call parent method
	*/
	
	build : function(){
		this.parent();
		if(this.options.label) {
			this.textLabel = new UI.Label({
				skin : this.options.skin,
				html : this.options.label,
				styles : this.props.components.label.styles
			}).inject(this.element);
		}
	},
	
	/* 
	Function: setState
		Set the button state
	
	Arguments:
		state - (string) State name
		
	Return:
		(void)
	*/
	
	setState : function(state){
		if (this.textLabel) {
			this.textLabel.setStyles(this.skin[state].components.label.styles);
		}
		this.parent(state);
	},
	
	/* 
	Function: setBehavior
		private function
		
		Set behavior relative to button (mouseenter, mousedown, mouseup, mouseleave)
	
	Return:
		(void)
	*/
	
	setBehavior : function() {
		this.parent();
		//we add mouse event
		this.element.addEvents({
			mouseenter	: this.setState.bind(this, 'over'),
			mousedown	: function(e) {
				this.setState('down');
				new Event(e).stop();
			}.bind(this),
			mouseleave: function(){
				this.setState(this.options.state);
			}.bind(this),	
			mouseup		: function(){
				if (this.options.submit) this.submit();
				this.setState('over');
			}.bind(this)
		});
	},
	
	/* 
	Function: submit
		Submit the form containing this button
	
	Return:
		(void)
		
	Discussion:
		As we want to remove hidden input, we must instead serialize the group of this button than submitting an unecessary form
	*/
	
	submit : function() {
		this.getForm().submit();
	}
});/*
Class: UI.Textarea
	Create a skinnable textarea element

Arguments:
	options

Options: 
	name - (string) name of hidden input
	value - (string) value to set on initialize

Example:
	(start code)
		var textarea = new UI.Textarea({
			name : 'myTextarea',
			value : 'Hello world!'
		}).inject(document.body);
	(end)
*/

UI.Textarea = new Class({
	Extends				: UI.Control,
	
	options				: {
		component		: 'textarea',
		
		// default options
		name			: 'ui-input',
		value			: ''
	},
	
	/* 
	Constructor: initialize
		Construtor
	
	Arguments:
		options - (object) options
	*/
	
	initialize: function(options) {
		this.parent(options);
	},
	
	/* 
	Function: build
		private function
		
		Call UI.Element build and make a textarea element
		
	Return:
		(void)
	*/
	
	build : function(){
		//create a new div as input element
		this.parent();
		
				
		//create input
		this.setInput(false, 'textarea');
		this.input.set({
			styles : {
				width		: this.props.width - this.input.getStyle('paddingLeft').toInt() - this.input.getStyle('paddingRight').toInt(),
				height		: this.props.height - this.input.getStyle('paddingTop').toInt() - this.input.getStyle('paddingBottom').toInt(),
				overflow	: 'hidden'
			}
		});
	},
	
	/* 
		Method: setState
		
			Set the button state
		
		Arguments:
			state - (string)
			
		Return:
			(void)
	*/
	
	setState : function(state){
		this.parent(state);
		return this;
	},
	
	/* 
		Method: setBehavior
			private function
		
			Set behavior
		
		Return:
			(void)
	*/
	
	setBehavior : function() {
		this.parent();
		this.input.addEvents({
			blur	: this.setState.bind(this, 'default'),
			focus	: this.setState.bind(this, 'focus')
		})
	}
});/*
Class: UI.Checkbox
	Creates checkbox control

Arguments:
	options	

Options: 
	label - (string) checkbox label
	name - (string) input element name
	value - (string) checkbox's value
	checked - (boolean) set to true to check on initialize

Example:
	(start code)
		var checkbox = new UI.Checkbox({
			name		: 'myCheckbox'
			value		: 'check',
			label		: 'Hello world!'			
		}).inject(document.body);
	(end)
*/

UI.Checkbox = new Class({
	Extends				: UI.Control,
	
	options				: {
		// default options
		label			: false,
		name			: 'checkbox-input',
		value			: 'default',
		checked			: false,
		
		// styles
		component		: 'checkbox'
	},
	
	/* 
	Constructor: initialize
		Construtor
	
	Arguments:
		options - (object) options
	*/
	
	initialize: function(options) {
		this.parent(options);
	},
	
	/*
	Function: build
		private function
		
		Call UI.Element build, set an input and a textLabel
	*/
	
	build : function() {
		this.parent();
		this.setInput();

		if (this.options.label) {
			this.textLabel = new UI.Label({
				'for'		: this.options.name,
				skin 		: this.options.skin,
				html 		: this.options.label,
				styles 		: this.props.labelStyles
			}).inject(this.element);
			delete this.props.width;
			delete this.props.height;
		}
		this.control.store('value', this.options.value);
		if (this.options.checked) this.toggleValue();
	},	
	
	/* 
	Function: toggleValue
		Toggle the value of the checkbox
	
	Return:
		this
	*/
	
	toggleValue : function(){
		
		if (this.state == 'checked') {
			this.setState('default');
			this.state = 'default';
			this.input.value = '';
			this.value = undefined;
		} else {
			this.setState('checked');
			this.state = 'checked';
			this.input.value = this.control.retrieve('value');
			this.value = this.control.retrieve('value');
		}
		
		return this;
	},

	/* 
	Function: setBehavior
		private function
		
		Set control relative behavior (blur and focus)
	
	Return:
		(void)
	*/
	
	setBehavior : function() {
		this.parent();
		this.element.addEvents({
			click : function(e){
				new Event(e).stop();
				this.toggleValue()
			}.bind(this)
		});
	}
});/*
	Class: UI.RadiosGroup
		Create a radios group able to make radio
	
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
		component		: 'radio',
	},
	
	/*
	Constructor: initialize
		Constructor
		
	Arguments:
		options - (object) options
	*/
	
	initialize: function(options) {
		this.parent(options);
		
		this.radios = [];
		this.selectedRadio = false;
		
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
		
		radio.addEvent('setCanvasSize', function(){
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
});/*
	Class: UI.Select
		Create <select> like element
		
	Require:
		UI/Control/Control.js
		UI/Menu/Menu.js
		UI/Menu/Scroller.js
	
	Arguments:
			options
			
	Options: 
		scrollToSelected - (boolean) Set to true if you want the menu position remember last position when you reopen it
		list - (object) the menu list
	
	Example:
		(start code)
		new UI.Control.Select({
			name			: 'testselect',
			list			: [{
				text		: 'Montagne',
				value		: 'mntgn'
			},{ 
				text		: 'Plage',
				value		: 'plg'
			},{ 
				text		: 'Sport',
				value		: 'sprt'
			},{ 
				text		: 'Nuit',
				value		: 'nt'
			},{ 
				text		: 'Glace',
				value		: 'glc'
			}]
		}).inject(this.content);
		(end)
*/


UI.Select = new Class({
	Extends					: UI.Control,
	
	options : {
		component			: 'select',

		scrollToSelected	: true,
		list				: {}
	},
	
	/* 
	Constructor: initialize
		Construtor
	
	Arguments:
		options - (object) options
	*/
	
	initialize: function(options){
		this.parent(options);
	},
	
	/* 
	Function: build
		private function
		
		Call UI.Element build, then create a hidden input , a textLabel and create a menu
	*/
	
	build : function(){
		//we create a new div as button element
		this.parent();
		this.setInput();
		this.addMenuActions(this.options.list);
		
		//we create a menu
		this.menu = new UI.Menu({
			width				: this.options.width,
			skin				: this.options.skin,
			position 			: 'over',
			target				: this.element,
			menu				: this.options.list,
			scrollToSelected 	: this.options.scrollToSelected
		}).inject(document.body);
		
		//we create a span for text
		var width = this.menu.content.getFirst().getSize().x;
		width -=  this.menu.content.getFirst().getStyle('paddingRight').toInt();
		width -=  this.menu.content.getFirst().getStyle('paddingLeft').toInt();
		this.menu.setStyle('display', 'none');
		
		this.textLabel = new UI.Label({
			width	: width,
			skin	: this.options.skin,
			styles	: this.props.components.label.styles,
			html	: this.options.list[0].text
		}).inject(this.element);
	},

	/*
		Method: setBehavior
			private function
			
			Add events on element
		
		Return:
			(void)
	*/

	setBehavior : function() {
		this.parent();

		//we add events on select
		this.element.addEvents({
			mousedown : function(e){
				this.menu.show(this.element);
			}.bind(this)
		});
	},
	
	/* 
	Function: addMenuActions
		private function
		
		Add a setValue action to menu list's entries
	
	Return:
		(void)
	*/
	

	addMenuActions : function(list) {
		list.each(function(el){
			if (!el.menu && el.text != 'separator') {
				el.action = function(){
					this.input.value = (el.value) ? el.value : el.text;
					this.textLabel.set('html', el.text);
				}.bind(this);
			} else if (el.menu) {
				this.addMenuActions(el.menu);
			}
		}, this)
	}
});

/*
Class: UI.Slider
	Creates slider and let you attach events action

Requires:
	Mootools Slider Plugins

Arguments:
	options

Options: 
	className - (string) css classname for the given button
	buttonType - ()

Example:
	(start code)
		var button = new UI.Button({
			onClick		: {},
			onMouseOver	: {},
			onDblClick	: {}
		});
	(end)
*/

UI.Slider = new Class({
	Extends				: UI.Element,
	
	options				: {
		
		// default options
		className		: 'slider',
		name			: 'ui-slider',
		
		component		: 'slider',
		type			: 'horizontal',
		state			: 'default',
		
		// implemented events
		onStart			: $empty,
		onChange		: $empty,
		onComplete		: $empty,
		onTick			: $empty,
		
		// mootools slider default settings
		snap			: false,
		offset			: 0,
		range			: false,
		wheel			: false,
		steps			: 100
	},
	
	initialize: function(options) {
		this.parent(options);
	},
	
	/* 
		Method: build
		
			Create a div and a hidden input to receive the selected value
	*/
	
	build : function(){
		this.parent();
		
		this.handler = new UI.Element({
			skin				: this.options.skin,
			component			: 'slider',
			type				: 'knob'
		}).inject(this.element);

	},
	
	inject : function(target, position) {
		this.parent(target, position);
		this.slider = new Slider(this.canvas.canvas, this.handler.element, {
			snap 		: this.options.snap,
			offset		: this.options.offset,
			range		: this.options.range,
			wheel		: this.options.wheel,
			steps		: this.options.steps,
			mode		: this.options.type,
			onStart		: function(step){this.fireEvent('start', step)}.bind(this),
			onTick		: function(position){
				if(this.options.snap) position = this.toPosition(this.step);
				this.knob.setStyle(this.property, position);
			},
			onChange	: function(step){this.fireEvent('change', step)}.bind(this),
			onComplete	: function(step){this.fireEvent('complete', step)}.bind(this)
		});
		return this;
	},
	
	setBehavior : function(){
		this.parent();
		this.addEvent('complete', function(step){
			this.value = step;
		});
	},
	
	set : function(value){
		this.slider.set(value);
		return this;
	}
});
 /*
Class: UI.Menu
	Creates a new menu, manages submenus and positionning.
	
Require:
	UI/Scrolling/Scrolling.Menu.js
	UI/View/View.js

Arguments:
		options
		
Options: 
		className			: 'ui-menu',
		menu				: [],
		useUnderlay			: true,
		scrollToSelected	: false,
		zIndex				: 10500,
		position			: 'relative',	// can be 'relative', 'bottom', 'over'
		contentTag			: 'div',
		itemTag				: 'div',
		onHide				: $empty,
		ondisplay			: $empty


Returns:
	void
	
Example:
	(start code)
	var submenu = new UI.Menu({
		container : this.view.element,
		underlay : this.options.underlay,
		zIndex : 1
	});
	(end)

*/


UI.Menu = new Class({
	Extends					: UI.Element,
	
	options: {
		component			: 'menu',

		zIndex				: 3000,
		contentTag			: 'div',
		itemTag				: 'div',

		position			: 'normal',
		scrollToSelected	: false,
		scrollMargin		: 20,
		menu				: [],
		underlay			: false,
		
		styles			: {
			position	: 'absolute'
		}
	},

	/* 
		Method: initialize
		
			Construtor
	 */

	initialize: function(options) {
		this.parent(options);
	},

	/* 
		Method: build
		
			Construtor
			
		Discussion:
		
			the zIndex should be set by the ui.element
	 */
	
	build: function(menu) {
		this.parent();
		this.content = new Element(this.options.contentTag,{
			styles : {
				zIndex		: 2,
				position	: 'relative',
				padding		: this.props.components.wrapper.styles.padding,
				margin		: 0,
				listStyle	: 'none',
				lineHeight	: '1em'
			}
		}).inject(this.element);
		
		this.setMenu();
		
		this.element.setStyles({
			zIndex	: this.options.zIndex
		});
	},
	
	/* 
		Method: setMenu
		
			Set the content of the menu
	 */
	
	setMenu: function(menu) {
		this.empty();
		var list = (menu) ? menu : this.options.menu;
		list.each(function(item){
			if (item.text == 'separator') {
				var menuItem = new UI.Label({
					skin		: this.options.skin,
					tag			: this.options.itemTag,
					html		: '',
					styles		: this.props.components.separator.styles
				}).inject(this.content);
				menuItem.separator = true;
			} else {
				var menuItem = new UI.Label({
					skin		: this.options.skin,
					tag			: this.options.itemTag,
					html		: item.text,
					props		: UI.skin.getComponentProps(this.skin, 'menuItem')
				}).set(item.options);
				
				if (item.action) menuItem.element.addEvent('action', item.action);
				
				menuItem.inject(this.content);
			}
			this.addSubmenuEvents(item, menuItem);
		},this);
		return this;
	},
	
	/* 
		Method: addSubmenuEvents
		
			Attach actions and / or submenu to menu elements
	 */
	
	addSubmenuEvents : function(item, menuItem){
		if(item.menu) {
			menuItem.addEvents({
				'mouseenter' : function(){
					if (this.activeItem && this.activeItem.submenu && this.activeItem != menuItem) this.activeItem.submenu.hide();
					if (this.activeItem != menuItem) this.addSubmenu(item, menuItem, 'normal');
					this.moveRollover(menuItem);
				}.bind(this)
			});
			this.addSubmenuArrow(menuItem);
		} else {
			menuItem.addEvents({
				'mouseenter' : function(){
					this.removeSubmenu();
					(menuItem.separator) ? this.removeRollover() : this.moveRollover(menuItem);
				}.bind(this)
			});
		}
		
		menuItem.element.addEvents({
			'mouseleave': function(){
				$clear(this.menuActionDelay);
			}.bind(this),
			'mouseup' : function(){
				this.mouseUpAction(menuItem);
			}.bind(this),
			'mousedown' : function(){
				if (!menuItem.separator) this.fireEvent('change');
			}.bind(this)
		});
	},
	
	addSubmenu : function(item, menuItem, position) {
		this.menuWithAction = false;
		$clear(this.menuActionDelay);
		
		this.menuActionDelay = (function(){
			if (!menuItem.submenu) {
				menuItem.submenu = new UI.Menu({
					skin			: this.options.skin,
					target			: menuItem,
					underlay		: this.underlay,
					menu			: item.menu,
					openOnRollover	: this.options.openOnRollover,
					closeOnRollout	: this.options.closeOnRollout,
					position		: position,
					zIndex			: this.options.component == 'toolbar' ? --this.options.zIndex : ++this.options.zIndex,
					events			: {
						hide		: this.removeSubmenu
					}
				}).inject(document.body);
			} else {
				menuItem.submenu.underlay = this.underlay;
				menuItem.submenu.show(menuItem);
			}
		}.bind(this)).delay(this.props.showDelay);
	},
	
	/* 
		Method: addSubmenuArrow
		
			Add an arrow on the right side of the element
	*/
	
	addSubmenuArrow : function(menuItem){
		//we add the arrow
		menuItem.arrow = new UI.Element({
			skin		: this.options.skin,
			component 	: 'element',
			type		: 'menuRightArrow',
			styles 		: {
				'padding'	: 0,
				'position'	: 'absolute',
				right		: 8,
				display		: 'block',
				margin	: '4px 0 0 0'
			}
		}).inject(menuItem.element, 'top');
		menuItem.element.addEvents({
			'mouseenter': function(){
				menuItem.arrow.setState('over');
			},
			'defaultArrow': function(){
				menuItem.arrow.setState('default');
			}
		});
	},
	
	/* 
		Method: mouseUpAction
		
			Do the element action and close the menu
	*/
	
	mouseUpAction : function(menuItem){
		if ($time() - this.time > 300 && this.rollover) {
			// effect!!
			new Fx.Tween(this.rollover.element, {
				duration	: 100,
				onComplete	: function(){
					if (this.selected) this.selected.selected = false;
					this.selected = menuItem.element;
					menuItem.element.selected = true;
					this.underlay.fireEvent('click');
					menuItem.element.fireEvent('action');
				}.bind(this)
			}).start('opacity', 0, 1);
		}
	},
	
	/* 
		Method: setRollover
		
			set a canvas to draw menu elements
	 */
	
	setRollover : function(){
		this.rollover = new UI.Element({
			skin			: this.options.skin,
			type			: 'menuRollover',
			styles			: {
				position 	: 'absolute',
				zIndex 		: 1
			}
		}).inject(this.element);
	},
	
	/* 
		Method: moveRollover
		
			set the rollover to a new element
	 */
	
	moveRollover : function(menuItem){
		var coord = menuItem.getCoordinates(this.element);
		if (!this.rollover) this.setRollover();
		
		if (this.activeItem) {
			this.activeItem.element.fireEvent('defaultArrow');
			
			this.activeItem.setState('default');
		}
		
		this.rollover
		.setSize(coord.width, coord.height)
		.setStyles({
			display : 'block',
			top : coord.top,
			left : coord.left
		});
		menuItem.setState('over');

		this.activeItem = menuItem;
	},
	
	/* 
		Method: removeRollover
		
			Remove the rollover
	 */
	
	removeRollover : function(){
		if (this.rollover) {
			this.rollover.destroy();
			delete this.rollover;
			
			this.activeItem.element.fireEvent('defaultArrow');
			this.activeItem.setState('default');
		}
		
		this.activeItem = false;
	},
	
	/* 
		Method: removeSubmenu
		
			Remove the current submenu if needed
	 */
	
	removeSubmenu : function(){
		if(this.activeItem && this.activeItem.submenu) {
			this.activeItem.element.fireEvent('defaultArrow');
			this.activeItem.submenu.hide(this.props.hideFxDuration);
		}
	},
	
	/* 
		Method: setPosition
		
			Set the position of the menu
	 */
	
	setPosition: function(el) {
		var elCoordinates 	= el.getCoordinates();
		var menuCoordinates = this.element.getCoordinates();
		this.element.setStyle('height', menuCoordinates.height);

		if (this.options.position == 'bottom') {
			this.setCorners([0,0,4,4]);
			this.element.setStyles({
				left : elCoordinates.left,
				top : elCoordinates.bottom
			});
			menuCoordinates = this.element.getCoordinates();
			if(menuCoordinates.bottom + this.options.scrollMargin > (Window.getHeight()) || menuCoordinates.top < this.options.scrollMargin) {
				this.addScrolls();
			}
		
		} else if (this.options.position == 'over') {
			this.setCorners([4,4,4,4]);
			var selected = false;
			if (this.options.scrollToSelected) {
				//we set the position to selected element
				this.content.getElements(this.options.itemTag).each(function(menuItem){
					if (menuItem.selected) selected = menuItem;
				});
			}
			var top = (!selected) ? 
				elCoordinates.top - this.content.getStyle('paddingTop').toInt() :
				elCoordinates.top - selected.getCoordinates(this.element).top;
			
			this.element.setStyles({
				'top': top,
				'left': elCoordinates.left
			});
			windowScroll = Window.getScroll();
			menuCoordinates = this.element.getCoordinates();
			menuCoordinates.top -= windowScroll.y;
			menuCoordinates.bottom -= windowScroll.y;
			
			if(menuCoordinates.bottom + this.options.scrollMargin > (Window.getHeight()) || menuCoordinates.top < this.options.scrollMargin) {
				this.addScrolls();
			}

		//default location
		} else {
			var corners = [4,4,4,4];

			//determine if menu position is left or right
			if (menuCoordinates.width > (Window.getWidth() - elCoordinates.right)) {
				// menu on left
				var left = elCoordinates.left - menuCoordinates.width+2;
				corners[1] = 0;
			} else {
				// menu on right
				var left = elCoordinates.right-2;
				corners[0] = 0;
			}
			if (menuCoordinates.height < (Window.getHeight() - elCoordinates.top + Window.getScroll().y)) {
				// menu is under
				var top = elCoordinates.top - this.content.getStyle('paddingTop').toInt();
			} else if(menuCoordinates.height < (elCoordinates.top - Window.getScroll().y)) {
				// menu is over
				var top = elCoordinates.bottom - menuCoordinates.height + this.content.getStyle('paddingTop').toInt();
				corners = [4,4,corners[1],corners[0]]
			} else {
				// menu is on side
				corners = [4,4,4,4];
				top = elCoordinates.top - this.content.getStyle('paddingTop').toInt();
				this.element.setStyles({
					'top': top,
					'left': left
				});
				this.addScrolls();
			}
			this.setCorners(corners);
			this.element.setStyles({
				'top': top,
				'left': left
			});
		}
	},

	/*
    Method: setCorners

      Set corners radius for canvas draw
	  
	Discussion:
	
		is really needed anymore? 
	*/
	
	setCorners: function(corners) {
		this.props.layers['default'].radius = corners;
	},
	
	/* 
		Method: addScrolls
		
			Add scrolls to menu
	*/
	
	addScrolls : function() {
		this.scrolls = new UI.MenuScroller({
			skin			: this.options.skin,
			element			: this.element,
			content 		: this.content,
			margin			: this.options.scrollMargin,
			props	: this.props,
			onScroll 		: function(){
				this.removeSubmenu();
				this.removeRollover();
			}.bind(this),		
			onResize 		: function(){
				var size = this.element.getSize();
				this.setSize(size.x, size.y);
			}.bind(this)
		});
		this.addEvent('removeScrolls', function(){
			this.scrolls.removeScrolls();
			this.removeEvents('removeScrolls');
		}.bind(this));
	},
	
	/* 
		Method: addUnderlay
		
			Add an underlay to the page, to prevent clicks and scroll on page
	 */
	
	addUnderlay: function(underlay){
		if (!this.underlay) {
			if (this.options.underlay) {
				this.underlay = this.options.underlay;
			} else {
				this.underlay = new Element('div', {
					'class' : 'menu-underlay',
					styles: {
						position: 'fixed',
						width: '100%',
						height: '100%',
						background	: '#FFF',
						opacity: 0.000001,
						top: 0,
						left: 0,
						zIndex: this.options.zIndex-50
					},
					events : {
						'click' : function(){
							this.hide(300);
							this.removeUnderlay();
						}.bind(this),
						'contextmenu' : function(e){
							new Event(e).stop();
							this.hide();
							this.removeUnderlay();
						}.bind(this),
						'mousewheel' : function(e){
							new Event(e).stop()
						}
					}
				}).inject(document.body);
				this.removeUnderlayEvent = function(e){
					if (this.underlay) this.underlay.fireEvent('click');
					window.removeEvent('resize', this.removeUnderlayEvent);
				}.bind(this);
				window.addEvent('resize', this.removeUnderlayEvent.bindWithEvent());
			}
		}
	},
	
	/* 
		Method: removeUnderlay
		
			Remove the underlay
	 */
	
	removeUnderlay: function(){
		if (this.underlay && !this.options.underlay) {
			window.removeEvent('resize', this.removeOverlayEvent);
			this.underlay.destroy();
			delete this.underlay;
		}
		return this;
	},
	
	/* 
		Method: inject
		
			inject the menu and draw the canvas. Overwrite the inject method of UI.Element
	 */
	
	inject : function(element, target){
		this.time = $time();
		this.fireEvent('inject');
		
		this.element.inject(element, target);
		
		this.setSize();
		
		if (this.options.position != 'over') {
			this.options.target ? this.setPosition(this.options.target) : this.setPosition(element);
			this.setCanvas();
			this.setStyle('visibility', 'visible');
			this.addUnderlay();
		} else {
			this.setCanvas();
		}

		if (this.options.closeOnRollout)
		this.canvas.canvas.addEvent('mouseleave', function(){
			if (this.activeItem) this.underlay.fireEvent('click');
		}.bind(this));
		
		return this;
	},
	
	/* 
		Method: show
		
			Show the menu
	 */
	
	show : function(parent, x, y) {
		this.time = $time();
		this.element.setStyle('display', 'block');
		
		this.setPosition(parent);
		this.setSize(x, y);
		this.parent();
		this.addUnderlay();
		return this;
	},
	
	/* 
		Method: hide
		
			Remove the submenu and clean the dom
	 */
	
	hide: function(duration){
		
		if (!$defined(duration)) duration = this.props.hideFxDuration;
		
		this.fireEvent('hide');
		this.removeSubmenu();
			
		if (!duration) {
			this.setStyle('display', 'none');
			this.removeRollover();
			this.fireEvent('removeScrolls');
		} else {
			new Fx.Tween(this.element, {
				duration: duration,
				onComplete: function(){
					this.setStyle('display', 'none');
					this.removeRollover();
					this.fireEvent('removeScrolls');
				}.bind(this)
			}).start('opacity', 0);
		}
		
	
		
		return this;
	},
	
	/* 
		Method: empty
		
			Empty the menu content
	 */
	
	empty: function(){
		this.content.empty();
	}
});/*
Class: UI.Toolbar
	Create a dropdown menubar
	
Require:
	UI/Menu/Menu.js

Arguments:
		options
		
Options: 
	options				: {
		zIndex			: 10000,
		presentation	: 'textIcons',  // text, button, icons, textIcons, textButton
		menus			: []
	}

Example:
	(start code)
	this.toolbar = new UI.Menu.Toolbar({
			className	: 'ui-menu-dropdown',
			container	: this.main.content,
			menu		: [
			{
				text : 'Floor App',
				options	: {	'class' : 'ui-dd-floor'	},
				menu : [{
					text : 'About',
					action : function() { this.test('about'); alert('click')}.bind(this)
				}]
			}
		]						
	});
	(end)

*/

UI.Toolbar = new Class({
	Extends				: UI.Menu,
	
	options				: {
		// default options	
		menus			: [],
		zIndex			: 4000,
		openOnRollover	: false,
		closeOnRollout	: false,
		
		// styles
		component		: 'toolbar'
	},
	
	/* 
		Method: initialize
		
			Construtor
	*/

	initialize: function(options) {
		this.parent(options);
	},
	
	/* 
		Method: build
		
			Overwrite the build method of UI.Menu
	*/
	
	build: function() {
		this.addItemStyles();
		this.parent();
		
		this.element.setStyles({
			position	: 'relative',
			width		: '100%'
		});
	},
	
	inject : function(element, target){
		this.element.inject(element, target);
		this.setSize();
		this.setCanvas();
		this.setStyle('visibility', 'visible');
		window.addEvent('resize', function(){
			this.setSize(this.element.getParent().getSize().x);
		}.bind(this));
		
		return this;
	},
	
	addItemStyles : function(){
		this.options.menu.each(function(item){
			item.options = item.options || {};
			item.options.styles = {
				'float'	: 'left',
				color	: this.props.fontColor
			}
		}, this);
	},
	
	/* 
		Method: addSubmenuEvents
		
			Overwrite the addSubmenuEvents method of UI.Menu to manage mousedown events, ...
	*/
	
	addSubmenuEvents : function(item, menuItem){
		if(item.menu) {
			menuItem.addEvents({
				'mousedown' : function(e){
					if (this.activeItem != menuItem) {
						this.time = $time();
						this.addUnderlay();
						if (!item.action) {
							this.addSubmenu(item, menuItem, 'bottom');
							this.moveRollover(menuItem);
						} else {
							// first push icon, then manage action with delay
							this.menuWithAction = (function(){
								if (this.activeItem.submenu) this.activeItem.submenu.hide(0);
								this.moveRollover(menuItem);
								this.addSubmenu(item, menuItem, 'bottom');
								this.menuWithAction = false;
							}).delay(this.props.delay, this);
						}
					}
				}.bind(this),
				'mouseup' : function(){
					if ($time() - this.time > 800 && this.underlay) {
						this.underlay.fireEvent('click');
					}
				}.bind(this),
				'mouseenter': function(){
					if (this.activeItem && this.activeItem != menuItem && !item.action) {
						if (this.activeItem.submenu) {
							this.activeItem.submenu.hide(0);
						}
						this.addUnderlay();
						this.addSubmenu(item, menuItem, 'bottom');
						this.moveRollover(menuItem);
					} else if (this.options.openOnRollover) {
						menuItem.fireEvent('mousedown');
					}
				}.bind(this),
				'hideSubmenu' : function(){
					if (!menuItem.submenu) return;
					this.hideFx = new Fx.Tween(menuItem.submenu.element, {
						duration	: this.props.hideFxDuration,
						onComplete	: function(){
							this.removeRollover();
							if (this.underlay) this.underlay.fireEvent('click');
							this.removeSubmenu();
						}.bind(this)
					}).start('opacity', 0);
				}.bind(this)
			})
		}
		menuItem.addEvents({
			'mousedown' : function(){
				if (!item.menu && this.activeItem) this.activeItem.fireEvent('hideSubmenu');
				menuItem.down = true;
			}.bind(this),
			'mouseleave' : function(){menuItem.down = false},
			'mouseup' : function(){
				if (this.menuWithAction || !item.menu) {
					this.removeSubmenu();
				}
				if (this.menuWithAction) {
					$clear(this.menuWithAction);
					delete this.menuWithAction;
				}
				if (menuItem.down && (!menuItem.submenu || (menuItem.submenu && menuItem.submenu.element.getStyle('visibility') == 'hidden'))) {
					menuItem.element.fireEvent('action');
				}
				menuItem.down = false;
			}.bind(this)
		});
	},
	
	/* 
		Method: setRollover
		
			set a canvas to draw menu elements
	 */
	
	setRollover : function(){
		this.rollover = new UI.Element({
			skin			: this.options.skin,
			type			: 'toolbarRollover',
			styles			: {
				position 	: 'absolute',
				zIndex 		: 1
			}
		}).inject(this.element);
	},
	
	/* 
		Method: addUnderlay
		
			Overwrite the addUnderlay method of UI.Menu to keep the toolbar
	*/
	
	addUnderlay : function(){
		this.parent();
		this.underlay.removeEvents();
		this.underlay.addEvents({
			'click' : function(){
				this.removeSubmenu();
				(function(){this.removeRollover()}.bind(this)).delay(this.props.hideFxDuration)
				this.removeUnderlay();
			}.bind(this),
			'contextmenu' : function(e){
				new Event(e).stop();
				this.underlay.fireEvent('click');
			}.bind(this),
			'mousewheel' : function(e){new Event(e).stop()}
		});
	}
});	/*
Class: UI.Context
	Create a context menu
	
Require:
	UI/Menu/Menu.js

Arguments:
		options
		
Options: 
	options				: {
		contexts		: []
	}

Example:
	(start code)
	this.context = new UI.Menu.Context({
		contexts : [
			{
				name : 'workspace',
				selector	: '.app-workspace',
				menu		: [
					{ text		: 'Workspace menu'},
					{ text		: 'separator' },
					{
						text 	: 'editCategory',
						action	: function(){ this.test('dorpdown') }.bind(this)
					}
					{ text		: 'viewSource'},
					{ text		: 'separator' },
					{ text		: 'deleteCategory'}
				]
			},
			{
				name : 'pageinfo',
				selector	: '[id^=pageinfo]',
				menu		: [
					{
						text 	: 'editCategory',
						action	: function(){ this.test('dorpdown') }.bind(this)
					},
					{ text 		: 'editCategoryApparence'}
				]
			}
		]
	});
	(end)

*/


UI.Context = new Class({
	Extends : UI.Menu,
	
	options: {
		className		: 'ui-menu-context',
		contexts		: [],
		type			: 'context'
	},
	
	/* 
		Method: initialize
		
			Construtor
	*/

	initialize: function(options) {
		this.parent(options);
		this.addContexts(this.options.contexts);
		this.element.setStyle('display', 'none');
		this.element.inject(document.body);
	},
	
	/* 
		Method: addContexts
		
			Attach context to elements (provided by options.contexts.selector)
	*/
	
	addContexts : function(contexts) {
		contexts.each(function(context){
			document.body.getElements(context.selector).each(function(el){
				el.addEvent('contextmenu', function(e){
					new Event(e).stop();
					this.setMenu(context.menu);
					this.show(e);
				}.bind(this));
				this.element.addEvent('contextmenu', function(e){
					new Event(e).stop();
				});
			},this);
		},this);
	},
	
	/* 
		Method: removeContexts
		
			Remove context to elements (provided by selector)
	*/
	
	removeContexts : function(selector) {
		document.body.getElements(selector).each(function(el){
			el.removeEvents('contextmenu');
		},this);
	},	
	
	/* 
		Method: setPosition
		
			Overwrite the setPosition method of UI.Menu to use mouse coordinates
	*/
	
	setPosition: function(x,y) {
		if (!$defined(x) || !$defined(y)) return;
		
		var coordinates = this.element.getCoordinates();
		var top = y+Window.getScrollTop();
		var left = x+Window.getScrollLeft();
		
		if ((x + coordinates.width + 20) > Window.getWidth()) left = left - coordinates.width;
		if ((y + coordinates.height + 20) > Window.getHeight())	top = top - coordinates.height;
		
		this.element.setStyles({
			'top' : top,
			'left' : left
		});
	},
	
	/* 
		Method: show
		
			Overwrite the show method of UI.Menu to use mouse coordinates
	*/
	
	show: function(e) {
		var coord = this.content.getSize();
		this.parent(false, coord.x, coord.y);
		this.setPosition(e.client.x,e.client.y);
		this.setCanvas();
	}
});
/*
Class: UI.Scroller.Menu
	Manage scrolls for menus.
	
Require:
	UI/Scrolling/Scrolling.js

Arguments:
		parent - the menu to attach scrolls
		options - a hash
		
Options: 
	options: {
		className		: 'ui-menu',
		wheel			: 8,
		speed			: 12,yx
		margin			: 5,
		onScroll		: $empty(),
		onResize		: $empty()
	},

Returns:
	void
	
Example:
	(start code)
	this.scrolls = new UI.Scrolling.Menu(this.view, {
		onScroll : function(){
			this.removeSubmenu();
		}.bind(this),
		onResize : function(){
			this.view.canvas.draw();
			if (this.shadow) this.shadow.show(this.container);
		}.bind(this)
	});
	(end)

*/

UI.MenuScroller = new Class({
	Implements: [Events, Options],

	options: {
		className		: 'ui-scrollbar',
		wheel			: 8,
		speed			: 12,
		margin			: 20,
		target			: 'element',
		wrapper			: false,
		props	: {},
		onScroll		: $empty,
		onResize		: $empty
	},
	
	/* 
		Method: initialize
		
			Construtor
	 */

	initialize: function(options){
		this.setOptions(options);
		
		this.props = this.options.props;
		this.element = this.options.element,
		this.content = this.options.content;
		this.margin  = this.options.margin;

		this.resetSize();
		this.setWrapper();
		this.setBehavior();
	},
	
	/* 
		Method: setNewSize
		
			Determine the menu position, his size and scrolls direction
	*/
	
	resetSize : function(){
		var windowScroll = Window.getScroll();
		var elementCoordinates = this.element.getCoordinates();
		elementCoordinates.top -= windowScroll.y;
		elementCoordinates.bottom -= windowScroll.y;
		var arrows = [0,0];
		this.element.setStyle('display', 'none');
		var windowHeight = Window.getHeight();
		if (elementCoordinates.top <= this.margin && elementCoordinates.bottom > windowHeight - this.margin) {
			//stick out on both sides (top and bottom)
			this.content.setStyles({
				'top' :  elementCoordinates.top - this.margin
			});
			this.element.setStyles({
				'top': this.margin,
				'height' : windowHeight - this.margin * 2
			});
			arrows = [1,1];
		} else if (elementCoordinates.bottom > windowHeight - this.margin) {
			//stick out on bottom
			this.element.setStyles({
				'height' : windowHeight - elementCoordinates.top - this.margin
			});
			arrows[1] = 1;
		} else if (elementCoordinates.top <= this.margin) {
			//stick out on top
			this.content.setStyles({
				'top' : elementCoordinates.top - this.margin
			});
			this.element.setStyles({
				'top': this.margin + windowScroll.y,
				'height' : elementCoordinates.bottom - this.margin
			});
			arrows[0] = 1;
		}
		this.element.setStyle('display', 'block');
		if(arrows[0]) this.addUpArrow();
		if(arrows[1]) this.addDownArrow();
	},
	
	/* 
		Method: addWrapper
		
			Add a element to the menu content to allow overflow
	*/
	
	setWrapper : function(){
		var elementCoordinates = this.element.getCoordinates();
		this.paddingTop = this.content.getStyle('paddingTop').toInt();
		this.paddingBottom = this.content.getStyle('paddingBottom').toInt();
		this.paddingTB = this.paddingTop + this.paddingBottom;
		this.wrapper = new Element('div', {
			'class': 'menu-overflow-wrapper',
			styles: {
				overflow: 'hidden',
				position: 'relative',
				width: elementCoordinates.width,
				height: elementCoordinates.height - this.paddingTB,
				marginTop: this.paddingTop,
				marginBottom: this.paddingBottom,
				zIndex: 2
			}
		}).inject(this.element, 'top').grab(this.content);
		this.content.setStyles({
			paddingTop : 0,
			paddingBottom : 0
		});
	},
	
	/* 
		Method: setBehavior
		
			Add event on the mousewheel
	*/
	
	setBehavior : function(){
		this.element.addEvent('mousewheel', function(e){
			new Event(e).stop();
			if(e.wheel > 0) {
				this.scrollUp(e.wheel);
			} else {
				this.scrollDown(e.wheel);
			};
		}.bind(this));
	},
	
	/* 
		Method: removeScrolls
		
			Remove scrolls
	*/
	
	removeScrolls : function(){
		this.content.setStyles({
			'top': 0,
			paddingTop : this.paddingTop,
			paddingBottom : this.paddingBottom
		});
		this.element
		.setStyles({
			height: 'auto',
			top: 'auto'
		})
		.grab(this.content)
		.removeEvents('mousewheel');
		this.wrapper.destroy();
		this.fireEvent('destroyArrows');
	},
	
	/* 
		Method: addUpArrow
		
			Add the up arrow
	*/
	
	addUpArrow : function(){
		var windowScroll = Window.getScroll();
		var elementCoord = this.element.getCoordinates();
		elementCoord.top -= windowScroll.y;
		elementCoord.bottom -= windowScroll.y;
		
		this.arrowUp = new Element('div', {'class' : 'ui-menu-arrow-up'}).setStyles({
			position	: 'absolute',
			width 		: elementCoord.width,
			height		: elementCoord.top + 25,
			top			: - elementCoord.top,
			left		: 0,
			zIndex		: 2
		}).inject(this.element, 'bottom');
		
		// new element to inject
		this.arrowUp.canvas = new UI.Element({
			width			: elementCoord.width,
			height			: 25,
			skin			: this.options.skin,
			type			: 'menuArrow',
			state			: 'up'
		}).setStyles({
			position : 'absolute',
			bottom : 0,
			zIndex : -1
		}).inject(this.arrowUp);

		this.arrowUp.addEvents({
			'mouseover': function(){
				this.scroller = this.scrollUp.periodical(30, this, 1);
			}.bind(this),
			'mouseout' : function(){
				$clear(this.scroller);
			}.bind(this)
		});
		
		this.addEvent('destroyArrows', function(){
			if (this.arrowUp) {
				this.arrowUp.destroy();
				this.arrowUp = false;
			}
		});
	},
	
	/* 
		Method: addDownArrow
		
			Add the down arrow
	*/
	
	addDownArrow : function(){
		var windowScroll = Window.getScroll();
		var elementCoord = this.element.getCoordinates();
		elementCoord.top -= windowScroll.y;
		elementCoord.bottom -= windowScroll.y;
		
		this.arrowDown = new Element('div', {'class' : 'ui-menu-arrow-down'}).setStyles({
			position	: 'absolute',
			width 		: elementCoord.width,
			height		: window.getHeight() - elementCoord.bottom + 25,
			bottom		: elementCoord.bottom - window.getHeight(),
			left		: 0,
			zIndex		: 2
		}).inject(this.element, 'bottom');
		
		// new shape to inject
		this.arrowDown.canvas = new UI.Element({
			width			: elementCoord.width,
			height			: 25,
			skin			: this.options.skin,
			type			: 'menuArrow',
			state			: 'down'
		}).setStyles({
			position : 'absolute',
			top : 0,
			zIndex : -1
		}).inject(this.arrowDown);
		
		this.arrowDown.addEvents({
			'mouseover': function(){
				this.scroller = this.scrollDown.periodical(30, this, -1);
			}.bind(this),
			'mouseout' : function(){
				$clear(this.scroller);
			}.bind(this)
		});
		
		this.addEvent('destroyArrows', function(){
			if (this.arrowDown) {
				this.arrowDown.destroy();
				this.arrowDown = false;
			}
		});
	},
	
	/* 
		Method: scrollDown
		
			scroll the menu down
	*/
	
	scrollDown : function(e){
		this.fireEvent('scroll');
		var elementCoordinates = this.element.getCoordinates();
		var wrapperCoordinates = this.wrapper.getCoordinates();
		var contentCoordinates = this.content.getCoordinates();

		if (contentCoordinates.bottom > wrapperCoordinates.bottom) {
			// we can extend (up) the element to fit the window
			if (elementCoordinates.top - Window.getScroll().y - this.options.speed > this.margin) {
				this.element.setStyles({
					top: this.element.getStyle('top').toInt() - this.options.speed,
					height: elementCoordinates.height + this.options.speed
				});
				this.wrapper.setStyle('height', wrapperCoordinates.height + this.options.speed);
				this.fireEvent('resize');
			// we just need to scroll
			} else {
				if (!this.arrowUp) this.addUpArrow();
				this.content.setStyle('top', this.content.getStyle('top').toInt() - this.options.speed * (-e));
			}
		} else if(this.arrowDown) {
			if (!this.arrowUp) {
				this.wrapper.setStyle('height', contentCoordinates.height + this.paddingTB);
				this.element.setStyle('height', contentCoordinates.height + this.paddingTB);
				this.element.setStyle('top', this.element.getStyle('top').toInt() + this.paddingTB);
				this.fireEvent('resize');
			} else {
				this.content.setStyle('top', elementCoordinates.height - contentCoordinates.height - this.paddingTB);
			}
			$clear(this.scroller);
			this.arrowDown.destroy();
			this.arrowDown = false;
		}
	},
	
	/* 
		Method: scrollUp
		
			scroll the menu up
	*/
	
	scrollUp : function(e){
		this.fireEvent('scroll');
		var elementCoordinates = this.element.getCoordinates();
		var wrapperCoordinates = this.wrapper.getCoordinates();
		var contentCoordinates = this.content.getCoordinates();

		if (contentCoordinates.top < wrapperCoordinates.top) {
			// we can extend the element to fit the window
			if (elementCoordinates.bottom + this.margin < Window.getHeight() + Window.getScroll().y) {
				this.element.setStyle('height', elementCoordinates.height + this.options.speed);
				this.wrapper.setStyle('height', wrapperCoordinates.height + this.options.speed);
				this.content.setStyle('top', this.content.getStyle('top').toInt() + this.options.speed);
				this.fireEvent('resize');
			// we just need to scroll
			} else {
				if (!this.arrowDown) this.addDownArrow();
				this.content.setStyle('top', this.content.getStyle('top').toInt() + this.options.speed * e);
			}
		} else if(this.arrowUp) {
			this.content.setStyle('top', 0);
			if (!this.arrowDown) {
				this.wrapper.setStyle('height', contentCoordinates.height + this.paddingTB);
				this.element.setStyle('height', contentCoordinates.height + this.paddingTB);
				this.fireEvent('resize');
			}
			$clear(this.scroller);
			this.arrowUp.destroy();
			this.arrowUp = false;
		}
	}
});/*
Class: UI.View
	The UI.View class defines objects that manage the views use by several object like windows, menus.

Require:
	UI.Core Classes
	UI.Element Classes
	UI.ScrollBar
	
Arguments:
	options
	
Options:
	className - (String) css class apply to the wrapper
	width - (number) Width of the view wrapper in px
	height - (number) Height  of the view wrapper in px
	overflow - (collection) hidden, scrollbar or menu
	tag - (string) define the tag to use for the content view
	contentTag - (string) define the tag to use for the content view
	wrapper - (object) wrapper element properties
	content - (object) content element properties (in case of) 
	addClass - (string) additionnal class
	useCanvas - (boolean) false

Returns:
	View object.
	
Example:
	(start code)
	var view = new UI.View({
		width			: 260,
		height			: 400,
		overflow		: 'scrollbar' 
	}).setContent('content','content view');
	(end)

Discussion:
	
*/

UI.View = new Class({
	Extends					: UI.Element,
		
	options: {
		component			: 'view',
		
		width				: '100%',
		height				: '100%',

		overflow			: 'scrollbar',		// hide, scrollbar or scrollmenu

		tag					: 'div',
		contentTag			: 'div',			// 

		content				: {},

		// implemented events		
		onLoadComplete		: $empty
	},

	/*
	    Method: initialize
	    Constructor
	
	*/
 	  
	initialize: function(options){
		this.parent(options);
	},

	/*
    Method: build

      Creates html structure and inject it to the dom. The view is build with two elements: the wrapper and the content. 
      If the option overflow is set to true, it will also add the scrollbar object

    Returns:
      this
	*/

	build: function() {
		this.parent();
		
		this.setOverflow();
		this.show();
	},
 	
	/* 
		Function: setOverlay
			create a new overlay object 
	*/

	buildOverlay: function() {
		
		//console.log('show overlay');
		this.overlay = new Element('div',this.props.components.overlay)
		 .inject(this.view.element);

		this.addEvents({
			'onBlur' : function() { console.log('blur');this.overlay.show(); },
			'onFocus' : function() { this.overlay.hide(); },
			'onResizeStart' : function() { this.overlay.show(); },
			'onResizeComplete' : function() { this.overlay.hide(); },
			'onDragStart' : function() { this.overlay.show(); },
			'onDragComplete' : function() { this.overlay.hide(); }
		});
	},


	/* 
	 * Method: setBehaviors
	 * 
	 * 
	 */

	setBehavior: function() {
		this.parent();
	},

	/*
    Method: setOverflow

		Manage overflow and set scrololbar if needed or requested
	*/

	setOverflow: function() {
		if ( this.options.overflow != 'hidden') { 
			this.content = new Element( this.options.contentTag,  this.options.content )
			 .setStyles( {
				height :'100%',
				position : 'relative'
			}).inject(this.element);

			if (this.options.overflow == 'hidden') {
				this.content.setStyle('overflow','hidden');	
			}
			
			if (this.options.overflow == 'scrollbar') {
				this.content.setStyle('overflow','hidden');
				this.buildScrollbar();
			}
			
			this.content.addEvents({
				onInject : function(){
					this.updateSize()
				}.bind(this)
			});
		} else { this.content = this.element }
	},
	
	/*
    Method: setScrollbar

      Creates a new scrollbar object

	*/
	
	buildScrollbar : function() {
		this.scrollbar = new UI.Scrollbar({
			container	: this.content
		});
				 
		this.addEvents({
			'ondLoadCompplete' : function() { this.scrollbar.update() },
			'onResize' : function() { this.scrollbar.update() }
		 });  
	},
	

	/*
	 * 	Function: setSize
	 * 		Set size of the element and its canvas
	 */
	
	setSize : function(width, height, state){
		this.parent();
		this.fireEvent('onResize');
	},

	/*
    	Function: setContent
    
    		Set Content of the Container
	*/
	
	setContent: function(method,source,options){
		switch (method) {
			case 'ajax' || 'xhr':
				this.setAjaxContent(method,source,options);
				break;
			case 'ajaxnu' :
				this.setAjaxNuContent(method,source,options)
				break;
			case 'json':
				this.setJsonContent(method,source,options);
				break;
			case 'content' || 'html':
				this.setHtmlContent(method,source,options);
				break;
			case 'iframe':
				this.setIFrameContent(method,source,options);
				break;
			default:		
		};
	},

	setHtmlContent: function(method,source,options) {
		this.content.set('html',source);
		this.fireEvent('onLoadComplete');
		this.fireEvent('onResize');
		return this;
	},
	
	setAjaxContent: function(method,source,options) {
		new Request.HTML({
			url 		: source,
			update		: this.content,
			method		: 'get',
			onComplete: function(response){
				this.fireEvent('onLoadComplete');
				this.fireEvent('onResize');
			}.bind(this)
		}).send();
		
		return this;
	},
	
	setAjaxNuContent: function(method,source,options) {
		new Request.HTML({
			url : source,
			method : 'get',
			onComplete : function(responseTree,responseElements,responseHTML,responseJS){
				this.fireEvent('onLoadComplete',new Array(responseHTML,responseTree,responseElements,responseJS));
				this.fireEvent('onResize');
			}.bind(this)
		}).send();
		
		return this;
	},
	
	setJsonContent: function(method,source,options) {
		new Request.JSON({
			url : source,
			onComplete : function(response){
				this.fireEvent('onLoadComplete',new Array(response));
				this.fireEvent('onResize');
			}.bind(this)
		}).get();
		
		return this;
	},
	
	setIFrameContent : function(method,source,options) {
		if (!this.iframe) {
			this.element.empty();
			this.iframe = new Element('iframe',this.props.components.iframe).inject(this.element);
		};
		
		this.iframe.set('src',source)
		 .addEvent('load',function(){ 
		 	this.fireEvent('loadComplete');
			this.fireEvent('onResize');
		});
		
		return this;
	}
});

/*
Class: UI.ListView
	The UI.ListView class defines objects that manage the list.

Require:
	UI.Canvas
	UI.Skin
	UI.Element
	UI.View
	UI.ScrollBar
	
Arguments:
	options
	
Options:
	className - (String) css class apply to the wrapper
	width - (number) Width of the view wrapper in px
	height - (number) Height  of the view wrapper in px
	overflow - (collection) hidden, scrollbar or menu
	contentTag - (string) define the tag to use for the content view
	wrapperTag - (string) define the tag to use for the content view
	wrapper - (object) wrapper element properties
	content - (object) content element properties (in case of) 
	addClass - (string) additionnal class
	useCanvas - (boolean) false

Returns:
	View object.
	
Example:
	(start code)
	var listview = new UI.ListView({
		width			: 260,
		height			: 400,
		scroll			: true 
	}).setContent('content','content view');
	(end)

Discussion:
	
*/

UI.ListView = new Class({
	Extends					: UI.View,
		
	options: {
		component			: 'listview',
		
		data				: [],
		
		
		component			: 'Button',
		
		item				: {
			component		: 'itemList',
			type			: 'default'
		},
		
		width				: '100%',
		height				: '100%',

		overflow			: 'scrollbar',		// hide, scrollbar or scrollmenu

		// implemented events		
		onLoadComplete		: $empty
	},

	build : function() {
		this.parent();
		
		this.getData(this.options.url);
	},

	/*
	Function: getData
		if the url options is give 
	
	Arguments:
		data - data to be used during template interpolation
	*/

	getData : function ( url, options) {
		if (this.options.url) {
			 new Request.JSON({
				url : url,
		        onComplete:function(response) {
					this.processList(response);
		        }.bind(this)
		    }).get();
			
		} else {

			this.addEvent('injected', function(){
				this.processList(this.options.data);
			}.bind(this));
		}
	},

	/*
	Function: processList
		Used internally. Parse data and inject in view content.
	
	Arguments:
		data - data to be used during template interpolation
	*/

	processList : function(data){
		data.each(function(element){
			
			console.log(this.options.item);
			
			var item = new UI[this.options.component].(this.options.item)
			.inject(this.content);
			
			$H(element).erase('type').each(function(el){
				new UI.Element({
					html : el,
					styles : {
						padding:'15px 0 0 5px',
						height:'14px',
						color:'#fff'
					}
				}).inject(item.element);
				this.fireEvent('onResize');
			}, this)
		}, this);
	}
});

/*
Class: UI.PanelView
	Creates a panelView Object that let you browse inner views(panels) 

*/

UI.PanelView = new Class({
	Extends					: UI.View,
	
	options: {
		className			: 'ui-panelview',
		buildType			: 'div',
		properties			: {},
		styles				: {
			width			:'100%',
			height			:'100%'
		},
		direction			: 'horizontal',
		transitionType		: 'scroll',
		transitionFx		: {
    		duration		: 1600,
    		wait			: false
		},
		panel				: {
			className		: 'ui-panelview-panel',
			styles 			: {
				width			: '300px',
				height			: '100%'
			}
		},
		onLoad				: $empty,
		onComlete			: $empty,
		onTransition		: $empty,
		onResize			: $empty
	},

/*
    Function: initialize
   
    	Constructor

*/
	
	initialize: function(options){
		this.setOptions(options);
		this.list = new Array();
		this.fireEvent("onResize");
		this.build();
		
		this.transitionFx = new Fx.Scroll(this.element.element, this.options.transitionFx);
	},

/*
    Function: build
   
    	Create mainview

*/

 	build: function (){
		this.element = new UI.View({
			overflow			: 'hidden',
			styles				: {
				height: '100%',
			    margin: '0',
			    overflow: 'hidden',
			    padding: '0',
			    backgroundColor: '#FFF'
			}
		});
	},

	/*
    Function: add
   
    	Add panel(subview), intect it in the container, resize container and return it

	*/
	
	add: function() {
		var panel = new UI.View(this.options.panel);
		panel.element.inject(this.element.content);
		this.list.push(panel);
		
		//console.log('create panel: '+this.list.indexOf(panel));
		this.resize();	
		return panel;
	},

	/*
    Function: applyTransition
   
    	Set the given panel as active and move to it 

	*/


	applyTransition: function(panel) {
		this.panel = panel;
		this.transitionFx.toElement(panel.element);
	},


	/*
    Function: next
   
    	Find the next panel from the list and move to it if exist

	*/

	next: function() {
		var next = this.list.indexOf(this.panel)+1;
				
		if (this.list[next]) {
			this.applyTransition(this.list[next]);		
		}
	},

	/*
    Function: previous
   
    	Find the previous panel from the list and move to it if exist

	*/

	previous: function() {
		var prev = this.list.indexOf(this.panel)-1;
		if (this.list[prev]) {
			this.applyTransition(this.list[prev]);		
		}
	},

	/*
    Function: updateScrollBar
   
    	Update scrollbars of all subviews
    	
    Note:
    	Should be attach as event when creating subviews

	*/

	updateScrollBar : function(){
		this.list.each(function(panel,index) {
			panel.scrollbar.update();			  
		},this);
	},

	/*
    Function: resize
   
    	Resize main view content to fit its components (to enbable slide)
    
    Note: maybe can be accomplish using css but dont know how yet

	*/
	
	resize : function() {
		var size = 0;
		
		this.list.each(function(panel,index) {
			size = size + panel.element.getSize().x;				  
		});

		//this.element.content.setStyle('width',size+'px');
	},

	/*
    Function: inject
   
    	Inject the main view element into its container

	*/

	inject: function(container) {
		this.element.inject(container);
	},


	/*
    Function: remove
   
    	Destroy the main element view 

	*/

	remove: function(element) {
		
		element.destroy();
	},

	/*
    Function: removePanel
   
    	Destroy the given wrapper panel 
    	
    Note: it seems that the pop function that remove the panel from the list doesn't work

	*/
	
	removeAllNext: function(panel) {
		var next = this.list.indexOf(panel) + 1;
		var last = this.list.indexOf(this.list.getLast());
		
		if (next > last)  { return  } 
		
		for (var i = next; i <= last; i++) {
			//console.log('remove panel:'+i);
			var panel = this.list[i];
			if (panel) {
				this.list.pop(panel);
				panel.destroy();
			}
		}
	}
});
/*
Class: UI.TabView
	Creates a panels container that let you manage inner panels.

*/

UI.TabView = new Class({
	Extends: UI.View,
	
	options: {
		component: 'tabview',
		overflow : 'hidden'
	},
	
	/*
	 Method: initialize
	 Constructor
	 
	 */
	initialize: function(options){
		this.tabs = new Array();
		
		this.parent(options);
		
		
	},
	
	/*
	 Function: build
	 
	 Creates html structure and inject it to the dom.
	 
	 */
	build: function(){
		this.parent();
		this.buildTabs();
	},
	
	/*
	 Function: add
	 
	 Create tabbar and add tabs
	 
	 */
	buildTabs: function(){
		if (this.options.container) {
			var container = this.options.container
		} else {
			var container = this.element
		}
		
		this.tabbar = new UI.Element(this.props.components.tabbar)
		.addEvents({
			onClick : function() {
				this.element.setStyle('height','21px')			
			} 
		})
		.inject(container);
		
		this.options.tabs.each(function(tab){
			this.add(tab);
		}.bind(this));
	},
	
	/*
	 Function: add
	 
	 Create tab and its related view and addEvent
	 
	 */
	add: function(props){
		var view = new UI.View({ 
			height : this.options.height - 21,
			type : 'tab'
		})
		.setStyle('height',this.options.height - 21)
		.inject(this.content).hide();
		
		var tab = new UI.Button({
			type: 'tab',
			label: props.name,
			onClick: function() { 
				if (tab == this.tab) return;
			
				if (props.url) 
					view.setContent('ajax',props.url);
				
				view.show();
				
				if (this.view) this.view.hide();
				tab.options.state = 'active';
				
				if (this.tab) {
					this.tab.options.state = 'default';
					this.tab.setState('default');
				}
								
				this.tab = tab;
				this.view = view; 
			}.bind(this)
		});
		
		if (props.selected) this.selected = tab;
		
		this.tabs.push(tab);		
	},
	
	/*
    	Function: setContent
    
    		Set Content of the current view (tab)
	*/		
	
	setContent: function(method,source,options) {
		this.view.setContent(method,source,options);
	},
	
	setBehavior : function() {
		this.parent();
		
		this.addEvent('injected', function(){
			var item = this.selected || this.tabs[0];
			item.options.state = 'active';
			this.tabs.each(function(tab){
				tab.inject(this.tabbar);
			}.bind(this));
			item.setState('active');
			item.fireEvent('click');
		});
	},
	
	/*
    	Function: setActiveTab
    
    		Set wich tab should be activated
	*/
	
	setActiveTab: function(num) {
		if (num > 0 && num <= this.tabs.length) {
			this.tabs[--num].setState('active');
			this.tabs[num].fireEvent('click');
		}
	}
	
	
});
// JavaScript Document

/*
Class: UI.Layout.App
	The Layout.App class of the <http://iframework.org> iframework.
	Creates a new Layout.App

Arguments:
		
*/

UI.SplitView = new Class({
	Extends					: UI.View,
	
	options : {
		component	: 'splitview',
		overflow	: 'hidden',
		minSize		: 160
	},
	
	initialize: function(options){
		this.parent(options);
	},

	build: function(){
		this.parent();
		
		this.addEvent('injected', function(){
			this.size = this.getSize(); 
						
			this.buildViews();
			this.buildHandler();
		
		}.bind(this));
	},
	
	/*
		buildViews
		
		
		
	 */
	
	buildViews: function() {
		this.views = [];
		
		console.log(this.props);
		console.log(this.props.views);
		
		this.props.views.each( function(view){
			this.views.push(new UI.View(view)
			 .inject(this.element))
		});

		var mainSize = this.size.x - this.side.element.getSize().x;
	},
	
	buildSplitter : function() {
		this.draglimit = {
			x	: [-this.options.minSize,  this.width - this.options.minSize],
			y	: [0, 0]
		}
		
		this.handler = new Element('div',this.props.components.splitter)
		 .setStyles({  
		 	marginLeft	: this.side.element.getSize().x - 2,
			height	: this.side.element.getSize().y,
			backgroundColor : '#000',
			position: 'abolute'
		}).inject(this.views[1].element);
		 
		this.handler.makeDraggable({
			limit				: this.draglimit,
			//onStart				: function() { this.fireEvent('onResizeStart') }.bind(this),
			onDrag				: function() { this.resize() }.bind(this),
			//onComplete			: function() { this.fireEvent('onResizeEnd') }.bind(this)
		});
	},

	resize: function() {

		this.side.element.setStyle('width', this.handler.getCoordinates().left - this.element.getCoordinates().left + 3);
		this.main.element.setStyle('width', this.element.getSize().x - this.side.element.getSize().x);
		this.fireEvent('onResize');
	},
	
	inject: function(container,position) {
		this.parent(container,position);
		
		//this.side.setStyles('width','160px');
		//this.resize();
		
	}
});/*

Class: UI.Window
	The UI.Window class defines objects that manage and coordinate the windows an application displays on the screen.

Require:
	<UI.Element>, <UI.Canvas>, <UI.Skin>, <UI.Button>, <UI.View>.

Inherits from:
	UI.Element - As window container.

Arguments:
	Options
	
Options: 
	title - (string) title displayed in the head titlebar.
	type - (string) define the type of the window (default, transparent).
	location - ('custom','center','cascade')  override top and left options if defined - default to custom.
	width - (number) Width of the container wrapper in px.
	height - (number) Height  of the container wrapper in px.
	top	- (number) Height  of the container wrapper in px.
	left - (number) Height  of the container wrapper in px.
	state - ('normalized','maximized','normalized') Define the initial state - default to normalized.
	useEffects - (boolean) Define if effects should be implemented.
	resizable - (boolean) Define if the window is resizable.
	draggable - (boolean) Define if the window is draggable.
	scrollbar - (boolean) Define if the container should use scrollbar.
	register - (bollean) Define if the window should be handle by the window manager.
	status - (bollean) Define if the window should use a statusbar.
	url	- (string) Define the url from the window content.

Example:
	(start code)
	var win = new UI.Window({
		width 	: 260,
		height	: 400,
		title	: 'bonjour',
	}).setContent('iframe','http://www.iframework.org');
	(end)
*/

UI.Window = new Class({
	Extends						: UI.Element,
	options						: {
		component				: 'window',
		
		title					: 'Window',

		// Size options
		width					: 640,
		height					: 480,

		// location options
		location				: 'cascade',
		top						: 0,
		left					: 0,	
		zIndex					: 'auto',   // to get zIndex from themanager or an Int as zIndex
		
		tag						: 'div',
		
		// Components Options
		head					: true,
		view					: true,
		foot					: true,

		// 		
		controls				: ['close','minimize','maximize'],
	
		// Not Implemented should be able to enable/disable effects
		useEffects				: false,
		
		// Drag options
		draggable				: true,
		dragLimitX				: [-1000, window.getWidth() + 1000],
		dragLimitY				: [50, window.getHeight() + 1000],
		dragHandlers			: ['head','foot'],
		
		// Resize options
		resizable				: true,
		resizeLimitX			: [200, window.getWidth()],
		resizeLimitY			: [200, window.getHeight()],
		resizeOnDragIfMaximized	: false,
		
		// Implemented events
		onMinimize			: $empty,
		onMaximize			: $empty,
		onRestore			: $empty,
		onLoad				: $empty,
		onBlur				: $empty,
		onFocus				: $empty,
		onClose				: $empty
	},

	/*
	    Function: initialize
	    	Constructor
	*/
	
	initialize: function(options) {
		// handle window manager singleton class
		this.controller = new UI.Controller.Window();
		
		// call parent constructor
		this.parent(options);
		
		// set windnow position
		var location = this.getInitialLocation();
		this.options.top = location.top;
		this.options.left = location.left;
		this.element.setStyles(location);

		this.controller.focus(this);
	},

	/*
	    Function: build
	
	      Creates html structure and inject it to the dom.
	*/
	
	build: function() {	
		// call parent builder
		this.parent()

		this.buildHead();
		this.buildView();
		this.buildFoot();
		this.buildOverlay();
		
		this.inject(this.options.container || document.body);
		
		this.canvas.canvas.addEvent('click', function(e){this.controller.propagateUnderShadow(e)}.bind(this));
	},

	/* 
		Function: setHead
			Create a new head element, set class and styles and inject
	*/	

	buildHead : function() {
		this.head = new Element('div', this.props.components.head)
		.inject(this.element);
	
		this.dragHandlers.push(this.head);
		this.head.disableSelect();	
		this.buildControls();
		this.title = new UI.Label(this.props.components.title)
		.inject(this.head);
		
		this.setTitle(this.options.title);
		
		var width = this.controls.getSize().x;
		width = 70;
		
		if (this.props.components.controls.styles['float'] == 'right') { 
			this.title.element.setStyle('paddingLeft',width); 
		} else { 
			this.title.element.setStyle('paddingRight',width) 
		}
	},

	/*
	    Function: setControls
	      Create window controls that allow window close, maximize and minimize
	*/
	
	buildControls: function() {
		if (!this.options.controls) { return }
		
		var controllist = new Array();

		this.controls = new Element('div',this.props.components.controls)
		.addEvents({
			mouseenter	: function() {
				controllist.each(function(button) {
					button.setState('show');
				})
			},
			mouseover	: function() {
				controllist.each(function(button) {
					button.setState('show');
				})
			},
			mouseleave	: function() {
				controllist.each(function(button) {
					button.setState('default');					
				})
			}
		})
		.inject(this.head);
		
		this.options.controls.each(function(action){
			this.props.components.control.type = action;

			var button = new UI.Button(this.props.components.control)
			.addEvent('onClick', this.control.bind(this, action))
			.inject(this.controls);	
			
			controllist.push(button);
		},this);
		
		this.addEvents({
			'onMinimize': function() { this.controls.hide() },
			'onNormalize': function() { this.controls.show() }
		});
	},
	
	/*
	    Function: setToolbar
			Sets the window's toolbar. and attach related events
			
		Note: 	it should be passed as options when the application instanciates its window
	*/
	
	buildToolbar: function(toolbar) {
		this.toolbar = new UI.Toolbar(toolbar).inject(this.head);

		// not really nice because related to a specific layer ... 
		this.props.layers.underlay.size[1] = this.head.getSize().y;
		this.updateSize();
		
		this.addEvents({
			onMinimize 			: function() { this.toolbar.hide() },
			onNormalize 		: function() { this.toolbar.show() }
		});
		
		new UI.Button(this.props.components.toggle)
		.addEvent('onClick', this.toggleToolbar.bind(this))
		.inject(this.head);	
		
		return this;
	},

	/* 
		Function: setView
			Create a new view of the define type and attach related window events
	*/	

	buildView : function() {
		if (this.options.tabView) {
			var options = this.options.tabView;
			
			this.options.tabView.container = this.element;
			
			this.view = new UI.TabView(this.options.tabView)
			.setStyles({
				position	: 'absolute',
				top 		: this.props.borderSize,
				left 		: this.props.borderSize
			}).inject(this.element);
			
			this.view.tabbar.setStyles({
				width 	: this.options.width - this.props.borderSize
			});
			
		} else {
			// should be merge depending on certain conditions 
			
			if (!this.options.view.type) 
			 this.options.view.type = this.props.components.view.type;
			 
			if (this.options.viewOverflow) 
			 this.options.view.overflow = this.options.viewOverflow;

			var props = $merge(this.props.components.view,this.options.view);
			
			this.view = new UI.View(props)
			.inject(this.element);
			
			this.addEvents({
				'injected'		: function() { this.view.fireEvent('onResize'); },
				onMinimize 		: function() { this.view.hide(); },
				onNormalize 	: function() { this.foot.show(); this.view.show(); this.setSize(); }
			});
		}

		this.content = this.view.content;
	},

	/* 
		Function: setOverlay
			create a new overlay object 
	*/

	buildOverlay: function() {
		
		//console.log('show overlay');
		this.overlay = new Element('div',this.props.components.overlay)
		 .inject(this.view.element);

		this.addEvents({
			'onBlur' : function() { this.overlay.show(); },
			'onFocus' : function() { this.overlay.hide(); },
			'onResizeStart' : function() { this.overlay.show(); },
			'onResizeComplete' : function() { this.overlay.hide(); },
			'onDragStart' : function() { this.overlay.show(); },
			'onDragComplete' : function() { this.overlay.hide(); }
		});
	},

	/* 
		Function: setFoot
			Create a new foot container and inject resize handler and statusbar in it
	*/

	buildFoot: function() {
		if (!this.options.foot || this.foot) { return };
		
		this.foot = new Element('div', this.props.components.foot)
		.inject(this.element);

		this.foot.disableSelect();
		
		if (this.options.resizable) {
			this.buildResizeHandler();	
		}
			
		this.status = new Element('div',this.props.components.status)
		.inject(this.foot);
		
		this.dragHandlers.push(this.status);
		
		this.setStatus();
		
		this.addEvents({
			'onMinimize' : function() { this.foot.hide(); },
			'onNormalize' : function() { this.foot.show(); }
		});
	},

	/*
		Function: buildResizeHandler
			Create a new element as resize handler
		
	 */
	
	buildResizeHandler : function() {
		this.resize = new UI.Element({
			component		: 'element',
			type			: 'resizeHandler'
		}).inject(this.foot);
	},

	/*
		Method: toggleToolbar
			The action method for the "Hide Toolbar" menu item (which alternates with "Show Toolbar").
		
		Note:   it should be passed as options when the application instanciates its window
	*/
	
	toggleToolbar: function() {
		if (this.toolbar.element.getStyle('display') == 'block') {
			this.props.layers.underlay.size[1] = this.head.getSize().y;
			this.toolbar.element.hide();
		} else {
			this.toolbar.element.show();
			this.props.layers.underlay.size[1] = this.head.getSize().y;
		}
		
		this.updateSize();
		this.fireEvent('setCanvasSize', this.state);
	},


	/*
	    Function: setBeahaviours
	    	Define the spcific window behaviours
	*/
	
	setBehavior: function(){
		this.parent();

		this.addEvents({
			mousedown : this.focus.bind(this),
			resizeComplete: function(){
				this.maximized = false;
				var coord = this.element.getCoordinates();
				this.options.width = coord.width;
				this.options.height = coord.height;
			}.bind(this)
		});
	},

	/*
		Function: enableDrag
				Add draggable capabilities for the window.
	*/

	enableDrag :function() {
		this.parent();
		this.addEvents({
			onDragComplete 	: function() {
				this.options.location = 'custom';
				this.maximized = false;
				var coord = this.element.getCoordinates();
				this.options.top = coord.top;
				this.options.left = coord.left;
				this.options.width = coord.width;
				this.options.height = coord.height;
			}.bind(this)
		});
		
		this.element.setStyle('position','absolute');
	},	


	/*
	    Function: focus
	      If minimize normalize and fireEvent OnFocus
	*/
	
	focus: function() {
		if (this.minimized) {
			this.normalize();
			this.controller.resetMinimizedLocation();
		} else if (this.maximized && this.options.resizeOnDragIfMaximized) {
			this.normalize();
		} else {
			this.controller.focus(this);
		}
		
		if (this.state != 'default') this.setState('default');
	},

	/*

    Function: minimize
		This action method displays the minimized window
	*/

	minimize : function() {
		this.fireEvent('onMinimize');
		this.maximized = false;
		this.minimized = true;

		var size = {
			width : this.skin['minimized'].width,
			height : this.skin['minimized'].height
		};
		this.setState('minimized', size);
		var coord = this.controller.getMinimizedLocation();
		this.setLocation(coord[0], coord[1], 'morph');
		this.controller.focus();
	},

	/*
	    Function: maximize
	      This action method set the size to fit the window container
	*/

	maximize : function() {
		if(this.maximized) {
			this.normalize();
		} else {
			this.setSize(window.getWidth(),window.getHeight()-this.options.dragLimitY[0]);
			var coord = this.getCoordinates();
			this.options.top = coord.top;
			this.options.left = coord.left;
			this.element.setStyles({
				top : this.options.dragLimitY[0],
				left : 0
			})
			this.minimized = false;
			this.maximized = true;
			this.fireEvent('onMaximize');
		}
	},

	/*
		Function: normalize
			Normalize the current window
	*/

	normalize : function() {
		this.controller.focus(this);
		
		var size = {
			width : false,
			height : false
		};
		this.setState('default', size);
		this.setLocation(false, false, 'morph');
		
		this.maximized = false;
		this.minimized = false;
		
		this.fireEvent('onNormalize');
	},		

	/*
		Function: getInitialLocation
			Return the initial location depending on location options
	*/

	getInitialLocation: function() {
		if (this.options.location == 'center') {
			return this.getCenterLocation();
		} else if (this.options.location == 'cascade') {
			var c = this.controller.getCascadeLocation(this)
			return { top : c.top, left : c.left };
		} else {
			return { top : this.options.top, left: this.options.left };
		}
	},

	
	/*
	    Function: updateSize
	      Update size and position of the window inner components
	*/

	updateSize : function() {
		var element = this.element.getSize();
		
		var bs = this.props.borderSize;
		var borderOffset = bs*2;
		
		var offsetHeight = 0;
		var topView = 0;
		
		if (this.options.head) { 
			offsetHeight = offsetHeight + this.head.getSize().y;
			topView = this.head.getSize().y;
		}

		if (this.options.foot) { 
			offsetHeight = offsetHeight + this.foot.getSize().y;
		}

		if (this.options.tabView) { 
			var height = this.view.tabbar.getSize().y;
			offsetHeight = offsetHeight + height;
			topView = topView + height;
			this.view.tabbar.setStyle('width', element.x - borderOffset);
		}

		var viewHeight = element.y - offsetHeight;
		
		if (this.options.head) {
			this.head.setStyles({
				width: element.x - borderOffset
			});
		}
		
		this.props.layers.underlay.size[1] = this.head.getSize().y;
		this.skin['inactive'].layers.underlay.size[1] = this.head.getSize().y;
	
		this.view.element.setStyles({ 
			top		: bs + topView,
			width	: element.x - borderOffset,	
			height	: viewHeight -  borderOffset
		});
		
		if (this.options.foot) {
			this.foot.setStyles({
				bottom	: -bs,
				width	: element.x - borderOffset
			});
		}
		
		this.view.fireEvent('onResize');
	},

	
	 /*
		Function: setSize
			Set window's frame size and updateSize
			
	*/  
	 
	setSize: function(width,height, state) {
		this.parent(width,height, state);
		this.updateSize();
	},	
	
	/* 
		Function: setTitle
			set title html 
			
	 */
	
	setTitle : function(html) {
		this.title.set('html',html);
		return this;
	},

	/*
	    Function: setContent
	    	Set Content of the Window View
	*/
	
	setContent: function(method,source,options){
		this.view.setContent(method,source,options);
		return this;
	},

	/*
	    Function: setStatus
	    	Set Status of the Window foot
	*/

	setStatus : function(html) {
		this.status.set('html',html);
		return this;		
	},

	/*
	    Function: control
	      Toggle state 
	      
		Arguments:
			actions - (minimize,maximize,close)
	*/	

	control : function(action) {
		switch (action) {
			case 'minimize' :
				this.minimize();
				break;
			case 'maximize' : 
				this.maximize();
				break;
			case 'close' : 
				this.close();
				break;
		}
	},

	/*
	    Function: close
			Close window
	      
		Arguments:
			actions - (minimize,maximize,close)
	*/	
	
	close : function() {
		this.controller.close(this);
	}
});
/*
Class: UI.Controller
	base class for controllers.

License:
	MIT-style license.

Require:
	UI/Windows.js

*/

UI.Controller = {};

/*
Class: UI.Window.Controller
	The window controller class of the <http://app.floor.ch> floor apps framework
	Creates a new window controller

License:
	MIT-style license.

Require:
	UI/Windows.js

*/

UI.Controller.Window = new Class({
	Singleton			: true,
	//Extends			: UI.Controller,
	Implements 			: [Events, Options],
	
	options: {
		className		: 'ui-winman',
		version			: '0.1a',
		zBase			: 2000,
		zStep			: 10,
		cascade			: {
			start		: {
				x		: 51,
				y		: 101
			},
			step: {
				x		: 20,
				y		: 20
			}
		},
		stack			: {
			offsetWidth : 4,		
			offsetHeight: 4			
		}
	},
	
	initialize: function(options){
		this.setOptions();
		
		UI.elements.window = new Array();

		this.zIndex = this.options.zBase;
		
		window.addEvent('resize', function(){ 	this.resizeMaximizedWindow(); }.bind(this));
	},


	/*
	  Function: register
	  
	   	Add passing window to the manage list
	   
	  Arguments: window Object
	  
	 */	
	
	register: function(win) {
		UI.elements.window.push(win);
		win.element.setStyle('zIndex', this.zIndex);
		this.zIndex += this.options.zStep;
	},
	
	/*
	  Function: close
	  
	   Destroy the window class instance
	   
	  Arguments: window Object
	  
	 */	
	
	close: function(elementClass) {
		elementClass.hide();
		elementClass.fireEvent('onClose');
		for (var i = UI.elements.window.length - 1; i >= 0; i--) {
			if (UI.elements.window[i] == elementClass) {
				elementClass.destroy();
				delete UI.elements.window[i];
				UI.elements.window = UI.elements.window.clean();
			}
		}
		this.focus();
	},
	
	/*
	  Function: focus
	  
	   	Increment max z-index and blur active window
	   
	  Arguments: window Object
	  
	 */	
	
	focus: function(win) {
		if (!$defined(win)) {
			//make next highest window focus
			var zIndex = 0;
			var window;
			for (var i = UI.elements.window.length - 1; i >= 0; i--) {
				var windowZIndex = UI.elements.window[i].element.getStyle('zIndex');
				if (windowZIndex >= zIndex && !UI.elements.window[i].minimized) {
					window = UI.elements.window[i];
					zIndex = windowZIndex;
				}
			}
			if (window) window.focus();
		} else if (win && this.active != win) {
			if (this.active && !this.active.minimized) this.blur(this.active);
			
			this.zIndex += this.options.zStep;
			win.element.style.zIndex = this.zIndex;
			
			this.active = win;
			win.fireEvent('focus');
		}
	},
	
	/*
	  Function: blur
	  
	   	blur active window
	   
	  Arguments: window Object
	  
	 */	
	
	blur: function(win) {
		if ($defined(win) && !win.minimized) {
			win.setState('inactive');
			win.fireEvent('onBlur');
		} else if (this.active) {
			this.blur(this.active);
		}
	},

	
	/*
	  Function: getMinimizedLocation
	  
	   	Return the position of next minimized window
	  
	 */	
	 	
	getMinimizedLocation: function() {
		var x = -150;
		var y = window.getHeight()-35;
		
		UI.elements.window.each(function(w,i) {
			if (w.state == 'minimized') {
				x += w.getStyle('width').toInt() + 4;
			}
		});
		
		return [x, y];
	},
	
	/*
	  Function: resetMinimizedLocation
	  
		Replace minimized windows
	  
	 */	
	
	resetMinimizedLocation : function(){
		var x = -150;
		var y = window.getHeight()-35;
		UI.elements.window.each(function(win) {
			if (win.state == 'minimized') {
				x += win.getStyle('width').toInt() + 4;
				win.setLocation(x, y);
			}
		});
	},

	/*
	  Function: resizeMaximizedWindow
	  
	   	Set new maximized size for all mamimized window 
	  
	 */	
	
	resizeMaximizedWindow: function() {
		UI.elements.window.each(function(win) {
			if (win.state == 'maximized') {
				win.setSize({
					height	: window.getHeight()-53,
					width	: window.getWidth()
				});
			}
		});
	},

	/*
	  Function: getCascadeLocation
	  
	   	Calculate the location of the window in the cascade
	  
	  Arguments : window Object
	  
	  Return
	  		Hash of location coordinates { left : 100, top : 100 }
	  
	*/

	
	getCascadeLocation: function(win) {
		var location = {
			left : this.options.cascade.start.x.toInt(),
			top : this.options.cascade.start.y.toInt()
		}
		UI.elements.window.each(function(w,i) {
			if (w.state != 'minimized' && w.options.location == 'cascade') {
				location.left += this.options.cascade.step.x;
				location.top += this.options.cascade.step.y;
			}
		},this);
		
		return location;
	},
	
	
	/*
	  Function: propagateUnderShadow
	  
	   	Propagate click from shadow offset to the back window 
	  
	 */
	
	propagateUnderShadow : function(e) {
		//console.log('propagate');
		
		var x = e.client.x;
		var y = e.client.y;
		var z = 0;
		var s = '';
		UI.elements.window.each(function(w,i) {
			c = w.element.getCoordinates();
			if ( c.left <= x && x <= c.left + c.width && c.top <= y && y < c.top + c.height) {
				if ( w.element.getStyle('z-index') > z ) {
					z = w.element.getStyle('z-index');
					s = w;
				}
				s.focus();
			}
		});
	},


	/*
	  Function: resetCascade
	  
	   	Reset all window location and set a cascade
	  
	 */
	
	resetCascade: function() {
		UI.elements.window.each(function(w,i) {
			console.log(w.state);
			
			if (w.state == 'normalized') {
				w.setStyles(getCascadePosition(w));
				w.location = 'cascade';
			}
		});
	}
	
});/*
About:
	http://www.nwhite.net/2008/10/10/mootools-singleton-class-mutator/
	
Example:
	Counter = new Class({
		Singleton : true,
		counter : 0,
		initialize : function(){
			console.debug('counter initialized');
		},
		count : function(){
			this.counter++;
			console.debug(this.counter);
		}
	});
	
	testA = new Counter(); //output = 'counter initialized'
	testB = new Counter();
	
	testA.count(); // output = 1
	testB.count(); // output = 2
*/

Class.Mutators.Singleton = function(self,flag){
	if(!flag) return;
	self.constructor.__instance = undefined;
	if($defined(self.initialize) && $type(self.initialize) == 'function') var init = self.initialize;
	self.initialize = function(){
		if(!$defined(this.constructor.__instance)){
			if($defined(init) && $type(init) == 'function') init.apply(this,arguments);
			this.constructor.__instance = this;
		}
		return this.constructor.__instance;
	}
}//MooCanvas, My Object Oriented Canvas Element. Copyright (c) 2008 Olmo Maldonado, <http://ibolmo.com/>, MIT Style License.
/*
Script: Canvas.js
	Contains the Canvas class.

Dependencies:
	MooTools, <http://mootools.net/>
		Element, and its dependencies

Author:
	Olmo Maldonado, <http://ibolmo.com/>

Credits:
	Lightly based from Ralph Sommerer's work: <http://blogs.msdn.com/sompost/archive/2006/02/22/536967.aspx>
	Moderately based from excanvas: <http://excanvas.sourceforge.net/>
	Great thanks to Inviz, <http://inviz.ru/>, for his optimizing help.

License:
	MIT License, <http://en.wikipedia.org/wiki/MIT_License>
*/

/*
Class: Canvas
	Creates the element <canvas> and extends the element with getContext if not defined.

Syntax:
	>var myCanvas = new Canvas([el,][ props]);

Arguments:
	el    - (element, optional) An unextended canvas Element to extend if necessary.
	props - (object, optional) All the particular properties for an Element. 

Returns:
	(element) A new Canvas Element extended with getContext if necessary.

Example:
	[javascript]
		var cv = new Canvas();
		var ctx = cv.getContext('2d');
		$(document.body).adopt(cv);
	[/javascript]
*/

if (Browser.Engine.trident){
	Element.Constructors.canvas = function(props){
		return new Canvas(props);
	};	
	document.createStyleSheet().cssText = 
		'canvas {text-align:left;display:inline-block;}' +
		'canvas div, canvas div * {position:absolute;overflow:hidden}' +
		'canvas div * {width:10px;height:10px;}' +
		'v\\:*, o\\:*{behavior:url(#default#VML)}';
}

var Canvas = new Class({

	initialize: function(){
		var params = Array.link(arguments, {properties: Object.type, element: $defined});
		var props = $extend({width: 300, height: 150}, params.properties);
		var el = (params.element || document.newElement('canvas')).set(props);
		if (el.getContext) return el;
		el.attachEvent('onpropertychange', this.changeproperty);
		el.attachEvent('onresize', this.resize);
		el.getContext = function(){
			return this.context = this.context || new CanvasRenderingContext2D(el);
		};
		return el.setStyles({
			width: props.width,
			height: props.height
		});
	},

	changeproperty: function(e){
		var property = e.propertyName;
		if (property == 'width' || property == 'height'){
			e = e.srcElement;
			e.style[property] = e[property];
			e.getContext().clearRect();
		}
	},

	resize: function(e){
		e = e.srcElement;
		var efC = e.firstChild;
		if (efC){
			efC.style.width = e.width;
			efC.style.height = e.height;
		}
	}

});

/*
Private Class: CanvasRenderingContext2D
	Context2D class with all the Context methods specified by the WHATWG, <http://www.whatwg.org/specs/web-apps/current-work/#the-canvas>

Arguments:
	el - (element) An Element requesting the context2d.
*/
var CanvasRenderingContext2D = new Class({

	initialize: function(el){
		this.element = new Element('div').setStyles({
			width: el.clientWidth,
			height: el.clientHeight
		}).inject(el);

		this.m = [
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1]
		];
		this.l = 0;
		this.rot = 0;
		this.state = [];
		this.path = [];

		// from excanvas, subpixel rendering.
		this.Z = 10;
		this.Z2 = this.Z / 2;
		this.miterLimit = this.Z * 1;
	},
    
	arcScaleX: 1,
	arcScaleY: 1,
	currentX: 0,
	currentY: 0,
	lineWidth: 1,
	strokeStyle: '#000',
	fillStyle: '#fff',
	globalAlpha: 1,
	globalCompositeOperation: 'source-over',
	lineCap: 'butt',
	lineJoin: 'miter',
	shadowBlur: 0,
	shadowColor: '#000',
	shadowOffsetX: 0,
	shadowOffsetY: 0,

	getCoords: function(x,y){
		var m = this.m, Z = this.Z, Z2 = this.Z2,
		coord = {
			x: Z * (x * m[0][0] + y * m[1][0] + m[2][0]) - Z2,
			y: Z * (x * m[0][1] + y * m[1][1] + m[2][1]) - Z2
		};
		coord.toString = function(){ return this.x.round() + ',' + this.y.round() };
		return coord;
	}

});

/*
Script: Path.js

Dependencies:
	Canvas.js

Author:
	Olmo Maldonado, <http://ibolmo.com/>

Credits:
	Lightly based from Ralph Sommerer's work: <http://blogs.msdn.com/sompost/archive/2006/02/22/536967.aspx>
	Moderately based from excanvas: <http://excanvas.sourceforge.net/>
	Great thanks to Inviz, <http://inviz.ru/>, for his optimizing help.

License:
	MIT License, <http://en.wikipedia.org/wiki/MIT_License>
*/

CanvasRenderingContext2D.implement({

	/*
		A path has a list of zero or more subpaths.
		Each subpath consists of a list of one or more points,
		connected by straight or curved lines, and a flag indicating whether
		the subpath is closed or not. A closed subpath is one where the
		last point of the subpath is connected to the first point of
		the subpath by a straight line. Subpaths with fewer than two
		points are ignored when painting the path.
	*/

	/*
	Property:
		Empties the list of subpaths so that the context once again has zero
		subpaths.
	*/
	beginPath: function(){
		this.l = 0;
		this.path.length = 0;
	},

	/*
	Property:
		Creates a new subpath with the specified point as its first
		(and only) point.
	*/
	moveTo: function(x, y){
		this.path[this.l++] = 'm';
		this.path[this.l++] = this.getCoords(x, y);
		this.currentX = x;
		this.currentY = y;
	},

	/*
	Property:
		Does nothing if the context has no subpaths.
		Otherwise, marks the last subpath as closed, create a new
		subpath whose first point is the same as the previous
		subpath's first point, and finally add this new subpath to the
		path.
	*/
	closePath: function(){
		this.path[this.l++] = 'x';
	},

	/*
	Property:
		Method must do nothing if the context has no subpaths. Otherwise,
		it must connect the last point in the subpath to the given point
		(x, y) using a straight line, and must then add the given point
		(x, y) to the subpath.
	*/
	lineTo: function(x, y){
		this.path[this.l++] = 'l';
		this.path[this.l++] = this.getCoords(x,y);
		this.currentX = x;
		this.currentY = y;
	},

	/*
	Property:
		Method must do nothing if the context has no subpaths. Otherwise,
		it must connect the last point in the subpath to the given point
		(x, y) using a straight line, and must then add the given point
		(x, y) to the subpath.
	*/
	quadraticCurveTo: function(cpx, cpy, x, y){
		var cx = 2 * cpx,
			cy = 2 * cpy;

		this.bezierCurveTo(
			(cx + this.currentX) / 3,
			(cy + this.currentY) / 3,
			(cx + x) / 3,
			(cy + y) / 3,
			x,
			y
		);
	},

	/*
	Property:
		Method must do nothing if the context has no subpaths. Otherwise,
		it must connect the last point in the subpath to the given point
		(x, y) using a bezier curve with control points (cp1x, cp1y) and
		(cp2x, cp2y). Then, it must add the point (x, y) to the subpath.
	*/
	bezierCurveTo: function(cp0x, cp0y, cp1x, cp1y, x, y){
		this.path[this.l++] = ' c ' + [
			this.getCoords(cp0x, cp0y),
			this.getCoords(cp1x, cp1y),
			this.getCoords(x,y)
		].join(',');

		this.currentX = x;
		this.currentY = y;
	},

	/*
	Property:
		Method must do nothing if the context has no subpaths. If the context
		does have a subpath, then the behaviour depends on the arguments and
		the last point in the subpath.

		Let the point (x0, y0) be the last point in the subpath. Let The Arc
		be the shortest arc given by circumference of the circle that has one
		point tangent to the line defined by the points (x0, y0) and (x1, y1),
		another point tangent to the line defined by the points (x1, y1) and
		(x2, y2), and that has radius radius. The points at which this circle
		touches these two lines are called the start and end tangent points
		respectively.

		If the point (x2, y2) is on the line defined by the points (x0, y0)
		and (x1, y1) then the method must do nothing, as no arc would satisfy
		the above constraints.

		Otherwise, the method must connect the point (x0, y0) to the start
		tangent point by a straight line, then connect the start tangent point
		to the end tangent point by The Arc, and finally add the start and end
		tangent points to the subpath.

		Negative or zero values for radius must cause the implementation to
		raise an INDEX_SIZE_ERR exception.
	*/
	arcTo: Function.empty,

	/*
	Property:
		Method draws an arc. If the context has any subpaths, then the method
		must add a straight line from the last point in the subpath to the
		start point of the arc. In any case, it must draw the arc between the
		start point of the arc and the end point of the arc, and add the start
		and end points of the arc to the subpath. The arc and its start and
		end points are defined as follows:

		Consider a circle that has its origin at (x, y) and that has radius
		radius. The points at startAngle and endAngle along the circle's
		circumference, measured in radians clockwise from the positive x-axis,
		are the start and end points respectively. The arc is the path along
		the circumference of this circle from the start point to the end point,
		going anti-clockwise if the anticlockwise argument is true, and
		clockwise otherwise.

		Negative or zero values for radius must cause the implementation to
		raise an INDEX_SIZE_ERR exception.
	*/
	arc: function(x, y, rad, a0, a1, cw){
		rad *= this.Z;

		var x0 = a0.cos() * rad, y0 = a0.sin() * rad,
			x1 = a1.cos() * rad, y1 = a1.sin() * rad;

		if (x0 == x1 && !cw) x0 += 0.125;
		
        var Z2 = this.Z2,
            c = this.getCoords(x, y),
			aSXr = this.arcScaleX * rad,
			aSYr = this.arcScaleY * rad;
			
		x -= Z2;
		y -= Z2;

		this.path[this.l++] = [
			cw ? 'at ' : 'wa ',
			(c.x - aSXr).round() + ',' + (c.y - aSYr).round(), ' ',
			(c.x + aSXr).round() + ',' + (c.y + aSYr).round(), ' ',
			this.getCoords(x0 + x, y0 + y), ' ',
			this.getCoords(x1 + x, y1 + y),
		].join('');
	},

	/*
	Property:
		method must create a new subpath containing just the four points
		(x, y), (x+w, y), (x+w, y+h), (x, y+h), with those four points
		connected by straight lines, and must then mark the subpath as
		closed. It must then create a new subpath with the point (x, y)
		as the only point in the subpath.

		Negative values for w and h must cause the implementation to raise
		an INDEX_SIZE_ERR exception.
	*/
	rect: function(x, y, w, h){
		this.moveTo(x, y);
		this.lineTo(x + w, y);
		this.lineTo(x + w, y + h);
		this.lineTo(x, y + h);
		this.closePath();
	},

	/*
	Property:
		Method must fill each subpath of the current path in turn, using
		fillStyle, and using the non-zero winding number rule. Open subpaths
		must be implicitly closed when being filled (without affecting the
		actual subpaths).
	*/
	fill: function(){
		this.stroke(true);
	},


	/*
	Property:
		Method must stroke each subpath of the current path in turn, using
		the strokeStyle, lineWidth, lineJoin, and (if appropriate) miterLimit
		attributes.

		Paths, when filled or stroked, must be painted without affecting the
		current path, and must be subject to transformations, shadow effects,
		global alpha, clipping paths, and global composition operators.

		The transformation is applied to the path when it is drawn, not when
		the path is constructed. Thus, a single path can be constructed and
		then drawn according to different transformations without recreating
		the path.
	*/

	stroke: function(fill){
		if(!this.path.length) return;

		var size = this.Z * 10,
			fS = this.fillStyle,
			rgb = String.type(fS),
			color = this.processColor(fill && rgb ? fS : this.strokeStyle),
			a = (fill) ?
				['filled="true" stroked="',
				['<v:fill', !rgb ? this.processColorObject(fS) : 'color="' + color.color + '" opacity="' + color.opacity, '"></v:fill>']]
			:
				['strokeweight=' + 0.8 * this.lineWidth * this.m[0][0] + ' filled="',
				['<v:stroke',
					'endcap=', (this.lineCap == 'butt') ? 'flat' : this.lineCap,
					'joinstyle=', this.lineJoin,
					'color=', color.color,
					'opacity="', color.opacity, '" />']];
		this.element.insertAdjacentHTML('beforeEnd', [
			'<v:shape path="', this.path.join(''), '" coordorigin="0 0" coordsize="' + 100 + ' ' + 100 + '" ', a[0], 'false">',
				a[1].join(' '),
			'</v:shape>'
		].join(''));
		if (fill && fS.img) {
			this.element.getLast().fill = this.element.getLast().fill || {};
			this.element.getLast().fill.alignshape = false; // not sure why this has to be called explicitly
		}

		this.beginPath();
	},

	/*
	Property:
		Method must create a new clipping path by calculating the intersection
		of the current clipping path and the area described by the current path
		(after applying the current transformation), using the non-zero winding
		number rule. Open subpaths must be implicitly closed when computing the
		clipping path, without affecting the actual subpaths.

		When the context is created, the initial clipping path is the rectangle
		with the top left corner at (0,0) and the width and height of the
		coordinate space.
	*/
	clip: Function.empty,

	/*
	Property:
		Method must return true if the point given by the x and y coordinates
		passed to the method, when treated as coordinates in the canvas'
		coordinate space unaffected by the current transformation, is within
		the area of the canvas that is inside the current path; and must
		return false otherwise.
	*/
	isPointInPath: Function.empty,

	processColor: function(col){
		var a = this.globalAlpha;
		if (col.substr(0, 3) == 'rgb'){
			if (col.charAt(3) == "a") a *= col.match(/([\d.]*)\)$/)[1];
			col = col.rgbToHex();
		}
		return {
			color: col,
			opacity: a
		};
	},

	/*
		If a gradient has no stops defined, then the gradient must be treated as a
		solid transparent black. Gradients are, naturally, only painted where the
		stroking or filling effect requires that they be drawn.
		
		* in gradients stops are not implict. 0 0.5 (stop) 1, 1 will break if not set, normally you'd expect 0.5 to propagate to 1.
	*/
	processColorObject: function(obj){
		var correction = Math.abs(obj.angle * Math.sin(obj.angle * 2) * Math.abs(1 - this.ratio));
		
		if (this.ratio > 1) correction *= -0.5;
		if (this.angle >= Math.PI/2) correction *= -1;
		
		obj.angle = (3 * Math.PI / 2 - this.angle + correction);

		var ret = '';
		if(obj.addColorStop){
			var oc0 = obj.col0, oc1 = obj.col1, stops = '';
			if (obj.stops) {
				for (var i = 0, j = obj.stops.length; i < j; i++) {
					stops += (100 * obj.stops[i][0]).round() + '% ' + obj.stops[i][1] + ', ';
				}
				stops = stops.substr(0, stops.length - 2);
			}
			ret += ((obj.r0) ?
				'type=gradientradial focusposition="0.2,0.2" focussize="0.2,0.2"'
			:
				'type=gradient method=sigma angle=' + 180 * obj.angle / Math.PI + ' '
			) + [
				'color="' + oc0.color,
				'opacity="' + oc0.opacity,
				'color2="' + oc1.color,
				'o:opacity2="' + oc1.opacity,
				'colors="' + stops
			].join('" ');
		}

		return (obj.img) ?  'type="tile" src="' + obj.img.src : ret;
	}
	
});

/*
Script: Rects.js

Dependencies:
	Canvas.js, Path.js

Author:
	Olmo Maldonado, <http://ibolmo.com/>

Credits:
	Lightly based from Ralph Sommerer's work: <http://blogs.msdn.com/sompost/archive/2006/02/22/536967.aspx>
	Moderately based from excanvas: <http://excanvas.sourceforge.net/>
	Great thanks to Inviz, <http://inviz.ru/>, for his optimizing help.

License:
	MIT License, <http://en.wikipedia.org/wiki/MIT_License>
*/

CanvasRenderingContext2D.implement({

	/*
	Property: clearRect
		Clears the pixels in the specified rectangle.
		If height or width are zero has no effect.

		If no arguments, clears all of the canvas

		Currently, clearRect clears all of the canvas.
	 */
	clearRect: function(x, y, w, h){
		this.element.innerHTML = '';
		this.m = [
			[1, 0 ,0],
			[0, 1, 0],
			[0, 0, 1]
		];
	},

	/*
	Property: fillRect
		Paints the specified rectangle using fillStyle.
		If height or width are zero, this method has no effect.
	 */
	fillRect: function(x, y, w, h){
		this.rect(x, y, w, h);
		this.fill();
	},

	/*
		Draws a rectangular outline of the specified size.
		If width or height are zero: ??
	 */
	strokeRect: function(x, y, w, h){
		this.rect(x, y, w, h);
		this.stroke();
	}

});
/*
Script: Transform.js

Dependencies:
	Canvas.js

Author:
	Olmo Maldonado, <http://ibolmo.com/>

Credits:
	Lightly based from Ralph Sommerer's work: <http://blogs.msdn.com/sompost/archive/2006/02/22/536967.aspx>
	Moderately based from excanvas: <http://excanvas.sourceforge.net/>
	Great thanks to Inviz, <http://inviz.ru/>, for his optimizing help.

License:
	MIT License, <http://en.wikipedia.org/wiki/MIT_License>
*/

CanvasRenderingContext2D.implement({
	/*
		The transformation matrix is applied to all drawing operations prior
		to their being rendered. It is also applied when creating the clip region.
		
		The transformations must be performed in reverse order. For instance,
		if a scale transformation that doubles the width is applied, followed
		by a rotation transformation that rotates drawing operations by a
		quarter turn, and a rectangle twice as wide as it is tall is then
		drawn on the canvas, the actual result will be a square.
	*/

  	/*
  	Property: scale
		Method must add the scaling transformation described by the arguments
		to the transformation matrix. The x argument represents the scale factor
		in the horizontal direction and the y argument represents the scale
		factor in the vertical direction. The factors are multiples.
	*/
	scale: function(x,y){
		this.arcScaleX *= x;
		this.arcScaleY *= y;

		this.matMult([
			[x, 0, 0],
			[0, y, 0],
			[0, 0, 1]
		]);
	},

  	/*
  	Property: rotate
		Method must add the rotation transformation described by the argument
		to the transformation matrix. The angle argument represents a clockwise
		rotation angle expressed in radians.
	*/
	rotate: function(ang){
		this.rot += ang;
		var c = ang.cos(),
			s = ang.sin();
			
		this.matMult([
			[ c, s, 0],
			[-s, c, 0],
			[ 0, 0, 1]
		]);
	},

  	/*
  	Property: translate
		Method must add the translation transformation described by the arguments
		to the transformation matrix. The x argument represents the translation
		distance in the horizontal direction and the y argument represents the
		translation distance in the vertical direction. The arguments are in
		coordinate space units.
	*/
	translate: function(x, y){
		this.matMult([
			[1, 0, 0],
			[0, 1, 0],
			[x, y, 1]
		]);
	},

  	/*
  	Property: transform
		Method must multiply the current transformation matrix with the matrix described
		by the inputs.
	*/
 	transform: function(m11, m12, m21, m22, dx, dy){
		this.matMult([
			[m11, m21, dx],
			[m12, m22, dy],
			[  0,   0,  1]
		]);
	},

  	/*
  	Property: setTransform
  		Method must reset the current transform to the identity matrix, and then invoke
  		the transform method with the same arguments.
  	*/
	setTransform: function(){
		this.m = [
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1]
		];

		this.transform.apply(this, arguments);
	},

	/*
		Property: matMult
			Method to multiply 3x3 matrice. Currently takes input and multiplies against
			the transform matrix and saves the result to the transform matrix.

			This is an optimized multiplication method. Will only multiply if the input
			value is not zero. Thus, minimizing multiplications and additions.
	*/
	matMult: function(b){
		var m = this.m,
			o = [[0, 0, 0],
				 [0, 0, 0],
				 [0, 0, 0]];

		for (var i = 3; i--;){
			var b0 = b[0][i], b1 = b[1][i], b2 = b[2][i];
			if (b0) this.sum(o[0], this.dotmult(b0, m[i]));
			if (b1) this.sum(o[1], this.dotmult(b1, m[i]));
			if (b2) this.sum(o[2], this.dotmult(b2, m[i]));
		}

		this.m = o;
	},

	dotmult: function(x,y){
		return y.map(function(val){ return x * val; });
	},

	sum: function(o,v){
		o[0] += v[0];
		o[1] += v[1];
		o[2] += v[2];
	}

});
/*
Script: Image.js

Dependencies:
	Canvas.js

Author:
	Olmo Maldonado, <http://ibolmo.com/>

Credits:
	Lightly based from Ralph Sommerer's work: <http://blogs.msdn.com/sompost/archive/2006/02/22/536967.aspx>
	Moderately based from excanvas: <http://excanvas.sourceforge.net/>
	Great thanks to Inviz, <http://inviz.ru/>, for his optimizing help.

License:
	MIT License, <http://en.wikipedia.org/wiki/MIT_License>
*/

CanvasRenderingContext2D.implement({
	/*
	Property: drawImage
		This method is overloaded with three variants: drawImage(image, dx, dy),
		drawImage(image, dx, dy, dw, dh), and drawImage(image, sx, sy, sw, sh,
		dx, dy, dw, dh). (Actually it is overloaded with six; each of those three
		can take either an HTMLImageElement or an HTMLCanvasElement for the image
		argument.) If not specified, the dw and dh arguments default to the values
		of sw and sh, interpreted such that one CSS pixel in the image is treated
		as one unit in the canvas coordinate space. If the sx, sy, sw, and sh
		arguments are omitted, they default to 0, 0, the image's intrinsic width
		in image pixels, and the image's intrinsic height in image pixels,
		respectively.

		If the image is of the wrong type, the implementation must raise a
		TYPE_MISMATCH_ERR exception. If one of the sy, sw, sw, and sh arguments
		is outside the size of the image, or if one of the dw and dh arguments
		is negative, the implementation must raise an INDEX_SIZE_ERR  exception.

		The specified region of the image specified by the source rectangle
		(sx, sy, sw, sh) must be painted on the region of the canvas specified
		by the destination rectangle (dx, dy, dw, dh).

		Images are painted without affecting the current path, and are subject to
		transformations, shadow effects, global alpha, clipping paths, and global
		composition operators.
	*/
	drawImage: function (image){
		var args = arguments, length = args.length, off = (length == 9) ? 4 : 0;

		var irS = image.runtimeStyle, w0 = irS.width, h0 = irS.height;
		irS.width = 'auto';
		irS.height = 'auto';

		var w = image.width, h = image.height;
		irS.width = w0;
		irS.height = h0;

		var sx = 0, sy = 0, 
			sw = w, sh = h,
			dx = args[++off], dy = args[++off],
			dw = args[++off] || w, dh = args[++off] || h;

		if (length == 9){
			sx = args[1]; sy = args[2];
			sw = args[3]; sh = args[4];
		}

		var syh = sy / h, sxw = sx / w,
			m = this.m,
			Z = this.Z,
			d = $H(this.getCoords(dx, dy)).map(function(val){ return (val / Z).round(); });
		var props = (!m[0][1] && m[0][0] == 1) ?
			'top:' + d.y + ';left:' + d.x : [
			'filter:progid:DXImageTransform.Microsoft.Matrix(',
				'M11=', m[0][0], 'M12=', m[1][0],
				'M21=', m[0][1], 'M22=', m[1][1],
				'Dx=', d.x, 'Dy=', d.y, 
			')'
		].join(' ');
				
		this.element.insertAdjacentHTML('beforeEnd', [
			'<v:group style="', props, '" coordsize="', Z * 10, ',', Z * 10, '">',[
				'<v:image',
					'src=', image.src, 'style=width:' + Z * dw + ';height:' + Z * dh,
					'croptop=', syh,
					'cropright=', 1 - sxw - sw/w,
					'cropbottom=', 1 - syh - sh/h,
					'cropleft=', sxw,
				'/>'].join(' '),
			'</v:group>'
		].join(' '));
	},

	drawImageFromRect: Function.empty,

	/*
	Property: getImageData
		Method must return an ImageData object representing the underlying
		pixel data for the area of the canvas denoted by the rectangle which
		has one corner at the (sx, sy) coordinate, and that has width sw and
		height sh. Pixels outside the canvas must be returned as transparent
		black.
	*/
	getImageData: Function.empty,

	/*
	Property: putImageData
		Method must take the given ImageData structure, and draw it at the
		specified location dx,dy in the canvas coordinate space, mapping each
		pixel represented by the ImageData structure into one device pixel.
	*/
	putImageData: Function.empty

});
/*
Script: State.js

Dependencies:
	Canvas.js

Author:
	Olmo Maldonado, <http://ibolmo.com/>

Credits:
	Lightly based from Ralph Sommerer's work: <http://blogs.msdn.com/sompost/archive/2006/02/22/536967.aspx>
	Moderately based from excanvas: <http://excanvas.sourceforge.net/>
	Great thanks to Inviz, <http://inviz.ru/>, for his optimizing help.

License:
	MIT License, <http://en.wikipedia.org/wiki/MIT_License>
*/

CanvasRenderingContext2D.implement({
	/*
	Property: states
		Each context maintains a stack of drawing states.
		Drawing states consist of:
			The current transformation matrix.
			The current clip region.
			The current values of the 'states'
	*/
	states: [
	    'arcScaleX',
	    'arcScaleY',
	    'currentX',
	    'currentY',
	    
		'strokeStyle',
		'fillStyle',
		'globalAlpha',
		'lineWidth',
		'lineCap',
		'lineJoin',
		'miterLimit',
		'shadowOffsetX',
		'shadowOffsetY',
		'shadowBlur',
		'shadowColor',
		'globalCompositeOperation'
	],

	/*
	Property: save
		Method pushes a copy of the current drawing state onto the drawing
		state stack.
	*/
	save: function(){
		var copy = {};
		this.states.each(function(prop){
			copy[prop] = this[prop];
		}, this);
		this.dStack.push(copy);
		this.mStack.push(this.m);
	},

	/*
	Property: restore
		Method pops the top entry in the drawing state stack, and resets
		the drawing state it describes. If there is no saved state, the method
		does nothing.
	*/
	restore: function(){
		var saved = this.dStack.pop();
		this.states.each(function(prop){
			this[prop] = saved[prop];
		}, this);
		this.m = this.mStack.pop();
	},

	mStack: [],
	dStack: []
});
/*
Script: Gradient.js

Dependencies:
	Canvas.js

Author:
	Olmo Maldonado, <http://ibolmo.com/>

Credits:
	Lightly based from Ralph Sommerer's work: <http://blogs.msdn.com/sompost/archive/2006/02/22/536967.aspx>
	Moderately based from excanvas: <http://excanvas.sourceforge.net/>
	Many thanks to Inviz, <http://inviz.ru/>, for his optimizing help.

License:
	MIT License, <http://en.wikipedia.org/wiki/MIT_License>
*/

CanvasRenderingContext2D.implement({
	/*
	Property: createLinearGradient
		Method takes four arguments, representing the start point (x0, y0)
		and end point (x1, y1) of the gradient, in coordinate space units,
		and must return a linear CanvasGradient initialised with that line.

		Linear gradients must be rendered such that at the starting point
		on the canvas the color at offset 0 is used, that at the ending point
		the color at offset 1 is used, that all points on a line perpendicular
		to the line between the start and end points have the color at the point
		where those two lines cross (interpolation happening as described above),
		and that any points beyond the start or end points are a transparent black.
	*/
	createLinearGradient: function(x0, y0, x1, y1){
		return new CanvasGradient(x0, y0, x1, y1, this);
	},

	/*
	Property: createRadialGradient
		Method takes six arguments, the first three representing the start circle
		with origin (x0, y0) and radius r0, and the last three representing the
		end circle with origin (x1, y1) and radius r1. The values are in coordinate
		space units. The method must return a radial CanvasGradient initialised with
		those two circles.

		Radial gradients must be rendered such that a cone is created from the two
		circles, so that at the circumference of the starting circle the color at
		offset 0 is used, that at the circumference around the ending circle the
		color at offset 1 is used, that the circumference of a circle drawn a certain
		fraction of the way along the line between the two origins with a radius the
		same fraction of the way between the two radii has the color at that offset
		(interpolation happening as described above), that the end circle appear to
		be above the start circle when the end circle is not completely enclosed by
		the start circle, that the end circle be filled by the color at offset 1, and
		that any points not described by the gradient are a transparent black.
	*/
	createRadialGradient: function(x0, y0, r0, x1, y1, r1){
		return $extend(new CanvasGradient(x0, y0, x1, y1, this), {
			r0: r0,
			r1: r1
		});
	}

});

/*
Private Class: CanvasGradient
	CanvasGradient class for the gradients. Defines stops.

Arguments:
	x0  - (number) Coordinate "from" x-point
	y0  - (number) Coordinate "from" y-point
	x1  - (number) Coordinate "to" x-point
	y1  - (number) Coordinate "to" y-point
	ctx - (number) Context object to reference (for the processColor dependency). Temporary until proper color processing is implemented.
*/
var CanvasGradient = new Class({

	initialize: function(x0, y0, x1, y1, ctx){
		//this.angle = ((y1 - y0) / ((x1 - x0).pow(2) + (y1 - y0).pow(2)).sqrt()).acos();
		this.angle = ((y1-y0) / (x1-x0)).atan();
		//alert(this.angle);
		this.ctx = ctx;
	},

	/*
	Property: addColorStop
		Method adds a new stop to a gradient. If the offset is less than
		0 or greater than 1 then an INDEX_SIZE_ERR exception must be raised.
		If the color cannot be parsed as a CSS color, then a SYNTAX_ERR
		exception must be raised. Otherwise, the gradient must be updated
		with the new stop information.
	*/
	addColorStop: function(off, col){
		col = this.processColor(col);

		if (off == 1 || off == 0){
			this['col' + off] = col;
		} else {
			if(!this.stops) this.stops = [];
			this.stops.push([off, col.color]);
		}
	},

	processColor: function(col){ //path
		var a = this.ctx.globalAlpha || 1;
		if (col.substr(0, 3) == 'rgb'){
			if (col.charAt(3) == "a") a*= col.match(/([\d.]*)\)$/)[1];
			col = col.rgbToHex();
		}
		return {
			color: col,
			opacity: a
		};
	}

});

/*
Script: Pattern.js

Dependencies:
	Canvas.js

Author:
	Olmo Maldonado, <http://ibolmo.com/>

Credits:
	Lightly based from Ralph Sommerer's work: <http://blogs.msdn.com/sompost/archive/2006/02/22/536967.aspx>
	Moderately based from excanvas: <http://excanvas.sourceforge.net/>
	Great thanks to Inviz, <http://inviz.ru/>, for his optimizing help.

License:
	MIT License, <http://en.wikipedia.org/wiki/MIT_License>
*/

CanvasRenderingContext2D.implement({

	/*
	Property: createPattern
		The first argument gives the image to use as the pattern (either
		an HTMLImageElement or an HTMLCanvasElement). Modifying this image
		after calling the createPattern() method must not affect the pattern.
		The second argument must be a string with one of the following values:
		repeat, repeat-x, repeat-y, no-repeat. If the empty string or null is
		specified, repeat must be assumed. If an unrecognised value is given,
		then the user agent must raise a SYNTAX_ERR exception. User agents
		must recognise the four values described above exactly (e.g. they must
		not do case folding). The method must return a CanvasPattern object
		suitably initialised.
	 */
	createPattern: function(img, rep){
		return new CanvasPattern(img, rep);
	}

});

/*
Class: CanvasPattern
	Patterns must be painted so that the top left of the first image is
	anchored at the origin of the coordinate space, and images are then
	repeated horizontally to the left and right (if the repeat-x  string
	was specified) or vertically up and down (if the repeat-y string was
	specified) or in all four directions all over the canvas (if the repeat
	string was specified). The images are not be scaled by this process;
	one CSS pixel of the image must be painted on one coordinate space unit.
	Of course, patterns must only actually painted where the stroking or
	filling effect requires that they be drawn, and are affected by the
	current transformation matrix.
*/
var CanvasPattern = new Class({

	initialize: function(img, rep){
		this.img = img;
		this.rep = rep;
	}

});
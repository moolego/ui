/*
---
description: a User Interface Toolkit built on MooTools.

authors: [moolego,r2d2]

requires:
- core:1.2.1: '*'
- mooCanvas

provides: [UI]
 
...
*/
/*
Object: UI
  MooLego UI - a User Interface Library built on MooTools.
 
license:
  MIT-style license.
 
Copyright:
  Copyright (c) 2007-2010 [Jerome Vial](http://ui.moolego.org/).
 
Code & Documentation:
  [The MooLego Team](http://moolego.net/developers/).
 
Inspiration:
  - Love inspired by [MooTools](http://www.mootools.net) Copyright (c) 2006-2008, [MIT-style license](http://opensource.org/licenses/mit-license.php)
*/

var UI = {
  props		: {}
};

var ui = {
	'version': '0.2',
 	'build': '%build%',
	'defaultSkin': 'AquaGraphite'
};

ui.controller = {};
/*
 ---
 description: Canvas Adapter. Contains basic drawing functions.
 authors: [moolego,r2d2]
 requires:
 - core:1.2.1: '*'
 - mooCanvas
 provides: [UI.Paint]
 
 ...
 */
/*
 Class: UI.Paint
 Contains drawing functions.
 
 Require:
 mooCanvas
 
 Arguments:
 options
 
 Options:
 - props - (object) All the stuff needed to draw the canvas (layers, shadows, ...). These properties are generated from a skin sheet.
 - className - (string) The class name set to the canvas element
 - width - (integer) Canvas width
 - height - (integer) Canvas height
 Events:
 
 - onComplete - (function) - function to fire when the canvas is drawn
 Returns:
 Canvas object.
 
 Example:
 (start code)
 var canvas = new UI.Paint({
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
 draw, drawShadows, drawShadowsCalled,
 drawShape, each, endCircle, fill, fillStyle, fireEvent, getContext,
 getProperties, globalCompositeOperation, gradient, height, hexToRgb,
 image, initialize, inject, join, layers, left, length, line, lineTo,
 lineWidth, magnify, match, moveTo, offset, offsetX, offsetY, onComplete,
 onload, opacity, options, pattern, position, pow, props,
 quadraticCurveTo, radius, ratio, relSize, def, restore, rotate,
 rotation, roundedRect, save, scale, setColor, setImage, setOffset,
 setOptions, setProperties, setSize, setStyles, setTransformation,
 shadow, shadowMagnify, shadowOffset, shadowSet, shadowSize,
 shadowThickness, shape, sin, size, sqrt, src, startCircle, stop, stroke,
 styles, test, toInt, top, trace, translate, triangle, trident, type,
 url, width, zIndex
 
 Discussion:
 
 
 */
UI.Paint = new Class({

    Implements: [Events, Options],
    
    options: {
        props: {},
        width: 300,
        height: 150,
        
        zIndex: -1,
        context: '2d',
        
        debug: false,
        onComplete: $empty
    },
    
    /*
     Constructor: initialize
     Constructor
     Create a new canvas object and draw it
     
     Arguments:
     - options - (object) options
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
        
        this.ctx = this.canvas.getContext(this.options.context);
    },
    
    /* 
     Function : setSize
     set size of the canvas object handling the shadow, then draw it.
     
     Arguments:
     - width - (integer) Width of the canvas without shadow offsets
     - height - (integer) Width of the canvas without shadow offsets
     - props - (object) Skin properties. If not set, will get props passed on initialize
     
     Return:
     (void)
     */
    setSize: function(width, height, props){
        if (props) this.props = props;
        
        if (this.props.layers.base && this.props.layers.base.shadow && this.props.layers.base.shadow) {
            this.shadowSize = this.props.layers.base.shadow.size;
            if (!this.props.layers.base.shadow.offsetX) {
                this.props.layers.base.shadow.offsetX = 0;
            }
            if (!this.props.layers.base.shadow.offsetY) {
                this.props.layers.base.shadow.offsetY = 0;
            }
            this.shadowOffset = [this.props.layers.base.shadow.offsetX, this.props.layers.base.shadow.offsetY];
        }
        else {
            this.shadowSize = 0;
            this.shadowOffset = [0, 0];
        }
        
        this.canvasSize = [(width || this.options.width) + this.shadowSize * 2 + Math.abs(this.shadowOffset[0]), (height || this.options.height) + this.shadowSize * 2 + Math.abs(this.shadowOffset[1])];
        
        this.canvas.setProperties({
            width: this.canvasSize[0],
            height: this.canvasSize[1]
        });
        
        this.canvas.setStyles({
            top: -this.shadowSize,
            left: -this.shadowSize,
            width: this.canvasSize[0],
            height: this.canvasSize[1]
        });
        
        this.absSize = [this.canvasSize[0] - this.shadowSize * 2 - Math.abs(this.shadowOffset[0]), this.canvasSize[1] - this.shadowSize * 2 - Math.abs(this.shadowOffset[1])];
        
        this.relSize = this.absSize;
        this.offset = [this.shadowSize, this.shadowSize];
        
        if (width && height) {
            this.draw();
        }
    },
    
    /*
     Function: draw
     Draw layers defined in props
     
     Arguments:
     - props - (object) draw properties
     
     Returns:
     (void)
     */
    draw: function(props){
    	this.processLayers(props);
        this.offset = [this.shadowSize, this.shadowSize];
        this.relSize = [this.canvasSize[0] - this.shadowSize * 2 - Math.abs(this.shadowOffset[0]), this.canvasSize[1] - this.shadowSize * 2 - Math.abs(this.shadowOffset[1])];
        this.fireEvent('complete');
    },
    
    /*
     Function: draw
     Draw layers defined in props
     
     Arguments:
     - props - (object) draw properties
     
     Returns:
     (void)
     */
	processLayers: function() {
		
        var layers = new Hash(this.props.layers);
        if (this.props.layers.def) {
            this.props.layers.def.each(function(key){
            	this.trace(key);
            }, this);
        }
        else {
            layers.each(function(layer, key){
            	this.trace(key);
            }, this);
        }
        
	
	},
	
    /*
     Function: trace
     private function
     draw the shape depending on the skin component props definition
     
     Arguments:
     - key - (string) key
     
     Return
     (void)
     */
    trace: function(key){
		if (key != 'default' && key != 'def' && key != 'shadow') {
		
			var properties = this.getProperties(key);
			
			if (this.options.debug) {
				console.log(key + ':', properties);
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
		}
    },
    
    
    
    /*
     Function: convert2Px
     private function
     
     draw the shape depending on the skin component props definition
     
     Arguments:
     - value - (string/integer/float) value
     - direction - (string) Direction. Could be either 'x' or 'y'
     - absolute - (boolean) Determine if the position is relative to previous element or absolute (relative to canvas)
     
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
     - value - (array) Array with three entries to determine offset
     - position - (string) Determine if the position is relative to previous element or absolute (relative to the canvas)
     - size - (array) Array containing layer's width and height. Could be either a number or 'auto' to determine it from its offset
     
     Return:
     offset - (array) An array with x and y start point coordinates, as well as width and height
     */
    setOffset: function(value, position, size){
        var absolute = (position == 'relative') ? false : true;
        value = [this.convert2Px(value[0], 'y', absolute), this.convert2Px(value[1], 'x', absolute), this.convert2Px(value[2], 'y', absolute), this.convert2Px(value[3], 'x', absolute)];
        // check size
        if (size) { // automatic width
            if ($type(size) == 'array' && size[1] && size[0] == 'auto' && size[1] != 'auto') {
                size[1] = this.convert2Px(size[1], 'y', absolute);
            } // automatic height
            else 
                if ($type(size) == 'array' && size[1] && size[0] != 'auto' && size[1] == 'auto') {
                    size[0] = this.convert2Px(size[0], 'x', absolute);
                } // both width and height specified
                else 
                    if ($type(size) == 'array' && size[1] && size[0] != 'auto' && size[1] != 'auto') {
                        size[0] = this.convert2Px(size[0], 'x', absolute);
                        size[1] = this.convert2Px(size[1], 'y', absolute);
                    } // both auto => error
                    else 
                        if ($type(size) == 'array' && size[1] && size[0] == 'auto' && size[1] == 'auto') {
                            size = false;
                        } // just one value is specified
                        else 
                            if (size != 'auto') {
                                size = [this.convert2Px(size, 'x', absolute), this.convert2Px(size, 'y', absolute)];
                            }
        }
        
        // calculate size from offsets
        
        var offsetX, offsetY, width, height;
        
        if (!size) {
            if (absolute) {
                offsetX = value[3] + this.shadowSize;
                offsetY = value[0] + this.shadowSize;
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
                        offsetX = value[3] + this.shadowSize;
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
                        offsetX = this.absSize[0] - width - value[1] + this.shadowSize;
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
                        offsetX = (this.absSize[0] - width) / 2 + this.shadowSize;
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
                        offsetY = value[0] + this.shadowSize;
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
                        offsetY = this.absSize[1] - height - value[2] + this.shadowSize;
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
                        offsetY = (this.absSize[1] - height) / 2 + this.shadowSize;
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
            baseSize: $pick(this.props.layers[key].baseSize, this.props.layers['default'].baseSize),
            shadow: $pick(this.props.layers[key].shadow, this.props.layers['default'].shadow)
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
            }
            else {
                //set translation correction
                cx = props.size[0] / 2;
                cy = props.size[1] / 2;
                
                var x0, y0, r0;
                
                //set startCircle, if not defined, set center and size 0
                if (props[p].startCircle) {
                    x0 = this.convert2Px(props[p].startCircle[0], 'x') - cx;
                    y0 = this.convert2Px(props[p].startCircle[1], 'y') - cy;
                    r0 = this.convert2Px(props[p].startCircle[2], 'x');
                }
                else {
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
                }
                else {
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
            
            // plain color management
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
        if (props.shadow) {
            this.setShadow(props.shadow);
        }
        
        if (props.image) {
            this.setImage(props);
        }
      
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
     Function: setShadow
     private function
     
     Set Shadow Options
     
     Arguments:
     props - (object) The shadow properties.
     
     Return:
     (void)
     */
    setShadow: function(shadow){
        var opacity = shadow.opacity || 1;
        var color = shadow.color || '#000000';
        var coloralpha = 'rgba(' + color.hexToRgb(true).join(',') + ', ' + opacity + ')';
        
        this.ctx.shadowColor = coloralpha;
        this.ctx.shadowOffsetX = shadow.offsetX || 0;
        this.ctx.shadowOffsetY = shadow.offsetY || 0;
        this.ctx.shadowBlur = shadow.blur || 0;
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
            var ptrn = that.ctx.createPattern(img, props.image.pattern);
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
     - props - (object) The layer properties.
     
     Example:
     (start code)
     layers: {
     roundRect: {
     offset: 1,
     color: ['#494949', '#5f5f5f'],
     opacity: 1,
     radius: 4
     }
     }
     (end)
     
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
     - props - (object) The layer properties.
     
     Example:
     (start code)
     layers: {
     circle: {
     shape: 'circle',
     position: 'absolute',
     size: [10, 10],
     opacity: 1,
     offset: 0
     }
     }
     (end)
     
     
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
     - props - (object) The layer properties.
     
     Props:
     - shape - (string)lineUp/lineDown
     - width -
     - opacity - (float)
     - color - (string)
     - offset - (float/array)
     Example:
     (start code)
     layers: {
     line: {
     position: 'absolute',
     shape: 'lineUp',
     opacity: 1,
     width: 1,
     color: '#000'
     }
     }
     (end)
     
     Discussion:
     
     
     Return:
     (void)
     */
    line: function(props){
        // prepare datas
        props.stroke = props.stroke ||
        {
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
     - props - (object) The layer properties.
     
     Example:
     (start code)
     layers: {
     triangle: {
     shape: 'triangle',
     radius: [8, 8, 8, 8],
     position: 'abolute',
     offset: 13,
     color: '#fff'
     }
     }
     (end)
     
     
     
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
     Function: complex
     private function
     
     to draw complex shapes
     
     Arguments:
     - props - (object) The layer properties.
     
     Example of a layer using complex shape:
     (start code)
     layers: {
     complex: {
     shape: 'complex',
     baseSize: [150, 150],
     def: [
     ['moveTo', 75, 25],
     ['quadraticCurveTo', 25, 25, 25, 62.5],
     ['quadraticCurveTo', 25, 100, 50, 100],
     ['quadraticCurveTo', 50, 120, 30, 125],
     ['quadraticCurveTo', 60, 120, 65, 100],
     ['quadraticCurveTo', 125, 100, 125, 62.5],
     ['quadraticCurveTo', 125, 25, 75, 25]
     ]
     }
     }
     (end)
     
     Return:
     (void)
     
     Discussion:
     This method is an experiment
     
     */
    complex: function(props){
        var ctx = this.ctx;
        
        var ratioX = props.size[0] / props.baseSize[0] || 100;
        var ratioY = props.size[1] / props.baseSize[1] || 100;
        
        ctx.beginPath();
        
        props.def.each(function(list){
            var p = [];
            var j = 0;
            var command;
            
            list.each(function(val){
                if (j === 0) {
                    command = val;
                }
                else {
                    if ((j % 2) === 0) {
                        if (command != 'arc') {
                            p[j] = val * ratioY;
                        }
                        else {
                            p[j] = val;
                        }
                    }
                    else {
                        if (command != 'arc') {
                            p[j] = val * ratioX;
                        }
                        else {
                            p[j] = val;
                            
                        }
                    }
                }
                j++;
            });
            
            switch (command) {
                case 'moveTo':
                    ctx.moveTo(p[1], p[2]);
                    break;
                case 'lineTo':
                    ctx.moveTo(p[1], p[2]);
                    break;
                case 'arc':
                    p[1] = p[1] * ratioX;
                    p[2] = p[2] * ratioY;
                    p[3] = p[3] * (ratioY + ratioX) / 2;
                    ctx.arc(p[1], p[2], p[3], p[4], p[5], p[6]);
                    break;
                case 'quadraticCurveTo':
                    ctx.quadraticCurveTo(p[1], p[2], p[3], p[4]);
                    break;
                case 'bezierCurveTo':
                    ctx.bezierCurveTo(p[1], p[2], p[3], p[4], p[5], p[6]);
                    break;
            }
        });
        
        ctx.closePath();
    },
    
    /*
     Function: inject
     inject canvas then return class instance
     
     Arguments:
     - target		: (element) - the target dom element
     - position	: (string - optional) the position were to inject
     
     Returns:
     this
     */
    inject: function(target, position){
        this.canvas.inject(target, position);
        return this;
    }
});
/*
---
description: The UI.Skin class defines object that handle skins.

authors: [moolego,r2d2]

requires:
- core:1.2.1: '*'
- mooCanvas

provides: [UI.Skin]
 
...
*/
/*
	Class: UI.Skin
		The UI.Skin class defines a singleton object that handle skins.
	
	Arguments:
		Options
		
	Options: 
		- skin - (string) skin name defined in skins. ie: AquaGraphite
	
	Example:
		(start code)
		UI.skin = new UI.Skin('AquaGraphite');
		(end)

	Implied global:
		- MooLego -UI
		- MooTools - $H,$type,$unlink,Class,Events,Options
	
	Members:
		Implements, Skin, component, components, default, defaultSkin, 
	    each, get, getComponentProps, initialize, layers, length, merge, 
	    options, preprocessed, processSkin, props, setOptions, shadow, shadows, 
	    shortcuts, size, skin, styles, type

 */

UI.Skin = new Class({
	
 	Implements: [Events, Options],
	
	options: {
		skin: 'AquaGraphite'
	},
	
	/*
	Constructor: initialize
		Constructor

		Set the default skin
		
	Arguments:
		- options - (object) options
	
	Returns:
		this
	*/
 	
	initialize : function(options) {
		this.setOptions(options);
		this.defaultSkin = this.options.skin;
		
		return this;
	},
	
	/* 
	Function : processSkin
		private function
	
		Merge what can be merged on the skin sheet the first time it's called so it will be faster for next calls.
		
	Arguments:
		- skinName - (string) the name of the skin who should be preprocessed.
	
	Return:
		(void)
	*/

	processSkin: function(skinName) {
		
		var cKey,
			tKey,
			sKey,
			props;
		
		//we merge syles for each states of each type of components
		for (cKey in UI.props[skinName]) {
			if (cKey != 'default') {
				for (tKey in UI.props[skinName][cKey]) {
					for (sKey in  UI.props[skinName][cKey][tKey]) {
						if (sKey != 'shortcuts') {
							props = UI.props[skinName]['default'];
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
		- className - (object) A UI.Element (or a child class) instance.
		
	className: (object)
		the get method will use in the provided instance following options :
			options.skin
			options.component
			option.type
			options.props
			options.style
		It will also check for other options, as defined in skin sheet as shortkeys
		
	Return:
		- properties - (object) An object containing skin properties for current type, merged with optional provided custom properties.
	 */
	
	get: function(className){
		var
			skin = className.options.skin ? className.options.skin : this.defaultSkin,
			cKey = className.options.component,
			tKey = className.options.type,
			props = className.options.props,
			styles = className.options.styles;
		
		//check if it was already preprocessed
		if (!UI.props[skin].preprocessed) {
			this.processSkin(skin);
		}
		
		var type;
		
		//get properties for provided type
		if (UI.props[skin][cKey][tKey]) {
			type = $unlink(UI.props[skin][cKey][tKey]);
		} else if (UI.props[skin][cKey]['default']) {
			type = $unlink(UI.props[skin][cKey]['default']);
		} else {
			type = {
				'default': $unlink(UI.props[skin]['default'])
			};
		}
		//add custom states
		for (var csKey in props) {
			if (!type[csKey]) {
				type[csKey] = props[csKey];
			}
		}
		
		for (var sKey in type) {
			//bind shortcuts
			if(type[sKey].shortcuts) {
				for (var scKey in type[sKey].shortcuts) {
					if (className.options[scKey]) {
						// eval is evil..					
						eval('type[\'' + sKey + '\'].' + type[sKey].shortcuts[scKey] + ' = this.merge(type[\'' + sKey + '\'].' + type[sKey].shortcuts[scKey] + ',className.options.' + scKey + ')');
					}
				}
			}

			//merge custom properties
			if (props) {
				type[sKey] = this.merge(type[sKey], props['default'], props[sKey]);
			}
			
			//merge custom styles
			type[sKey].styles = this.merge(type[sKey].styles, styles);
		}
		
		//remove shadows if not used
		//if (type['default'].layers.base.shadow.size === 0) {
		//	delete type['default'].shadows;
		//}
		
		return type;
	},
	
	/*
	Function: getComponentProps
		get skin definition for specified component (inside an other element)
		
	Properties:
		- component - (string) the name of the component
		
	Return:
		- properties - (object) Object containing component properties
	*/
	
	getComponentProps: function(skin, component){
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
		
	See also:
		mootools merge function	
	*/	
	
	merge: function() {
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
	 UI.Element is the root class of most class of Moolego UI. It is used by :
	 - <UI.View>
	 - <UI.Window>
	 - <UI.Menu> (also <UI.Context>)
	 - Most Controls elements (<UI.Button>, ...)
	 
	 Arguments:
	 Options
	 
	 Options:
	 - lib - (string) The prefix used for element class
	 - component - (string) Component name, used for skinning
	 - type - (string) Type name, used for skinning
	 - state - (string) Default state applied on initialize
	 
	 - className - (string) If this is defined, UI.Element will use this as element class name instead of generating one with options.lib, component and type
	 - tag - (string) The element tag. By default it is 'div'
	 
	 - resizable - (boolean) Define if the element will be resizable. By default set to false
	 - draggable - (boolean) Define if the element will be draggable. By default set to false
	 - selectable - (boolean) Define if element content is selectable
	 
	 - skin - (string) The skin name to use by default for components
	 - props - (object) Skin properties that will overwrite properties defined in skin sheet
	 
	 - style - (object) Element styles properties that will overwrite styles defined in skin sheet
	 
	 Events:
	 - onClick - (function) A function who will be fired on element click
	 - onMouseDown - (function) A function who will be fired on element mousedown
	 - onBuild - (function) A function who will be fired on element build start
	 - onBuildComplete - (function) A function who will be fired on element build complete
	 - onResizeStart - (function) A function who will be fired on element resize start
	 - onResize - (function) A function who will be fired on element resize
	 - onResizeComplete - (function) A function who will be fired on element complete
	 - onDragStart - (function) A function who will be fired on element drag start
	 - onDrag - (function) A function who will be fired on element drag
	 - onDragComplete - (function) A function who will be fired on element drag complete
	 
	 Example:
	 (start code)
	 var element = new UI.Element({
	 html : 'Hello World'
	 }).inject(document.body);
	 (end)
	 Implied global:
	 window,UI,ui,
	 Browser,Class,Drag,Element,Event,Events,Fx,Options,
	 $H,$defined,$empty,$random,$type
	 
	 Members:
	 Canvas, Element, Engine, Implements, Morph, MozUserSelect,
	 Skin, adaptLocation, addClass, addEvent, addEvents, adopt, bind, build,
	 buildResizer, canvas, class, className, click, closeMenu, component,
	 controller, cursor, debug, defaultLeft, defaultTop, destroy,
	 disableDrag, disableSelect, dragHandler, dragHandlers, dragLimitX,
	 dragLimitY, draggable, element, enableDrag, enableResize, enableSelect,
	 events, fireEvent, for, fx, get, getCenterLocation, getCoordinates,
	 getHeight, getLength, getSize, getStyle, getWidth, group, handle,
	 height, hide, html, id, implement, initialize, inject, label, layers,
	 left, length, lib, limit, makeResizable, mouseOut, mousedown,
	 mouseenter, mouseleave, mouseover, mouseup, name, onBuild,
	 onBuildComplete, onClick, onComplete, onDrag, onDragComplete,
	 onDragStart, onHide, onMouseDown, onResize, onResizeComplete,
	 onResizeStart, onShow, onStart, onmousedown, onselectstart, options,
	 props, register, reorder, reposFx, resizable, resizeDrag, resizeLimitX,
	 resizeLimitY, resizer, selectable, set, setBehavior, setCanvas,
	 setClassName, setLocation, setOptions, setSize, setSkin, setState,
	 setStyle, setStyles, shadowMagnify, show, skin, start, state, stop,
	 style, styles, tag, toElement, toInt, top, trident, type, ui,
	 useAutoClass, width, x, y, zIndex
	 Discussion:
	 Why don't we extend Mootools native Element or refactor...
 
 */
UI.Element = new Class({

    Implements: [Events, Options],
    
    options: {
        lib: 'ui',
        
        // component options
        component: 'element',
        type: 'default',
        state: 'default',
        
        props: false,
        skin: false,
        styles: {},
        
        // group id
        group: false,
        
        // classname options
        
        className: false,
        useAutoClass: true,
        
        tag: 'span',
        
        selectable: true,
        
        // Drag options
        draggable: false,
        dragLimitX: false,
        dragLimitY: false,
        
        // Resize options
        resizable: false,
        resizeLimitX: [100, Window.getWidth()],
        resizeLimitY: [100, Window.getHeight()]
    
        // implemeted events
    
        /*
         onClick: $empty,
         onMouseDown: $empty,
         onBuild: $empty,
         onBuildComplete: $empty,
         onResizeStart: $empty,
         onResize: $empty,
         onResizeComplete: $empty,
         onDragStart: $empty,
         onDrag: $empty,
         onDragComplete: $empty,
         
         onShow: $empty,
         onHide: $empty*/
    },
    
    /* 
     Constructor: initialize
     Construtor
     
     Arguments:
     options - (object) options
     */
    initialize: function(options){
        this.setOptions(options);
        this.state = this.options.state;
        this.dragHandlers = [];
        
        this.setClassName();
        this.setSkin();
        this.build();
        this.setBehavior();
    },
    
    /* 
     Function: toElement
     This method allows to get the DOM element built with <UI.Element> in this way :
     (start code)
     var myElement = new UI.Element({
     html : 'Hello World'
     }).inject(document.body);
     var coord = $(myElement).getCoordinates();
     (end)
     It will actually return myElement.element.
     
     But as most used mootools functions are directly reimplemented in <UI.Element>, you can most of time simply do :
     (start code)
     var myElement = new UI.Element({
     html : 'Hello World'
     }).inject(document.body);
     var coord = myElement.getCoordinates();
     (end)
     
     Return:
     this.element - (element) The DOM element
     */
    toElement: function(){
        return this.element;
    },
    
    /* 
     Function: build
     private function
     
     Create a native element
     
     Return:
     (void)
     */
    build: function(){
        this.fireEvent('build');
        
        this.element = new Element(this.options.tag, {
            'class': this.className,
            styles: this.props.styles,
            events: this.options.events,
            id: this.options.id,
            name: this.options.name,
            html: this.options.html,
            'for': this.options['for']
        });
        
        if (!this.options.selectable) {
            this.element.disableSelect();
        }
        if (this.options.resizable) {
            this.buildResizer();
        }
    },
    
    /*
     Function: buildResizeHandler
     private function
     
     Create a new element as resize handler
     
     Returns:
     (void)
     */
    buildResizer: function(){
        this.resizer = new UI.Element({
            skin: this.options.skin,
            component: 'element',
            type: 'resizer',
            styles: {
                zIndex: '1000000',
                bottom: this.element.getComputedSize().computedBottom,
                right: this.element.getComputedSize().computedRight
            }
        }).inject(this.element, 'bottom');
        
        this.resizer.element.addEvent('click', function(e){
            var ev = new Event(e).stop();
        });
    },
    
    /*
     Function: setClassName
     private function
     
     define class name from this.options.lib, component and type or with className if defined
     
     Return:
     (void)
     */
    setClassName: function(){
        if (this.options.className) {
            this.className = this.options.className;
        }
        else 
            if (this.options.useAutoClass) {
                this.className = this.options.lib + '-' + this.options.component;
                
                if (this.options.type != 'default') {
                    this.className = this.className + '-' + this.options.type;
                }
                
                if (this.options.state != 'default') {
                    this.className = this.className + '-' + this.options.state;
                }
            }
    },
    
    /* 
     Method: setSkin
     private function
     
     Get the skin for the current component and set this props with default properties
     
     Return:
     (void)
     */
    setSkin: function(){
        this.options.skin = this.options.skin ? this.options.skin : ui.defaultSkin;
        UI.skin = new UI.Skin(this.options.skin);
        this.skin = UI.skin.get(this);
        this.props = this.skin[this.options.state];
    },
    
    
    /* 
     Method: setState
     Set the element state
     
     Arguments:
     state - (string) the name of new state to set and draw
     size - (object) Optional - An object containing width and height to set a new size while changing state
     
     Return:
     this
     */
    setState: function(state, size){
        if (this.skin[state]) {
            this.state = state;
            if (this.skin[state].styles) {
                this.setStyles(this.skin[state].styles);
            }
            
            this.fireEvent('render', state);
        }
        return this;
    },
    
    /* 
     Method: setCanvas
     private function
     
     Create a canvas element inject it and add a redraw event
     */
    setCanvas: function(){
        if (this.paint || (this.props && !this.props.layers) || (this.props && this.props.layers && $H(this.props.layers).getLength() <= 2) || ($defined(this.props.layers.def) && !this.props.layers.def.length)) {
            return false;
        }

        if (this.element.getComputedSize()) {
            var size = this.element.getComputedSize();
            this.computedSize = size;
        }
        else {
        
        
        }
        
        var offsetWidth = (size.computedLeft + size.computedRight);
        var offsetHeight = (size.computedTop + size.computedBottom);
        
        this.paint = new UI.Paint({
            props: this.props,
            width: this.element.x + offsetWidth,
            height: this.element.y + offsetHeight,
            debug: this.options.debug,
            element: this.element,
            skin: this.options.skin,
            component: this.options.component,
            type: this.options.type,
            state: this.options.state
        }).inject(this.element).addEvent('click', function(){
            alert('click on canvas')
        });
        
        this.addEvent('render', function(state){
            var props;
            if (!state) {
                props = this.props;
            }
            else {
                props = this.skin[state] || this.props;
            }
            
            this.paint.setSize(this.element.x + offsetWidth, this.element.y + offsetHeight, props);
        });
    },
    
    
    /* 
     Method: setSize
     Set the element size and optionaly a new state
     
     Arguments:
     width - (integer) new element width
     height - (integer) new element height
     state - (string) (optional) state to draw
     
     Return:
     this
     */
    setSize: function(width, height, state, target){
        this.fireEvent('resize');
        
        this.element.x = width || this.options.width || this.props.width || this.element.getSize().x;
        this.element.y = height || this.options.height || this.props.height || this.element.getSize().y;
        if (this.element.x) {
            this.element.setStyle('width', this.element.x);
        }
        if (this.element.y) {
            this.element.setStyle('height', this.element.y);
        }
        
        this.fireEvent('render', state);
        return this;
    },
    
    /* 
     Method: setLocation
     Set the element location
     
     Arguments:
     left - (integer) new element left position
     top - (integer) new element top position
     moprh - (string) (optional) If specified, a morph transition will be done to new location
     
     Return:
     this
     
     Example:
     (start code)
     var myWindow = new UI.Window();
     var coord = myWindow.getCenterLocation();
     myWindow.setLocation(coord.left, coord.top, 'morph');
     (end)
     
     Discussion:
     
     */
    setLocation: function(left, top, morph){
        this.element.left = left || this.options.left || this.props.defaultLeft || this.element.getCoordinates().x - this.props.shadowMagnify * 2;
        this.element.top = top || this.options.top || this.props.defaultTop || this.element.getCoordinates().y - this.props.shadowMagnify * 2;
        
        this.element[morph ? 'morph' : 'setStyles']({
            top: this.element.top,
            left: this.element.left
        });
        
        return this;
    },
    
    /*
     Function: setBehavior
     private function
     
     Set default element behavior, addind general events (mouse events)
     
     Return:
     (void)
     
     Discussion:
     onClick event is fired on mouse up because of Explorer. Sometimes it doesn't fire onClick event (f.e. if a button has no label).
     */
    setBehavior: function(){
    
        var self = this;
        
        if (this.options.draggable) {
            this.enableDrag();
        }
        if (this.options.resizable) {
            this.enableResize();
        }
        
        this.element.addEvents({
            mousedown: function(e){
                if (self.options.component != 'label') {
                    ui.controller.element.closeMenu(e);
                }
                self.fireEvent('mousedown');
            },
            click: function(){
                if (!Browser.Engine.trident) {
                    self.fireEvent('click');
                }
            },
            mouseup: function(){
                if (Browser.Engine.trident) {
                    self.fireEvent('click');
                }
                self.fireEvent('mouseup');
            },
            
            mouseenter: this.fireEvent.bind(this, 'mouseenter'),
            mouseleave: this.fireEvent.bind(this, 'mouseleave'),
            mouseover: this.fireEvent.bind(this, 'mouseover'),
            mouseOut: this.fireEvent.bind(this, 'mouseOut')
        });
    },
    
    /*
     Function: enableDrag
     Add draggable capabilities for the element.
     */
    enableDrag: function(){
        if (this.dragHandlers.length === 0) {
            this.dragHandlers = null;
        }
        
        this.dragHandler = new Drag(this.element, {
            handle: this.dragHandlers,
            limit: {
                x: this.options.dragLimitX,
                y: this.options.dragLimitY
            },
            
            onStart: this.fireEvent.bind(this, 'onDragStart'),
            onDrag: this.fireEvent.bind(this, 'onDrag'),
            onComplete: this.fireEvent.bind(this, 'onDragComplete')
        });
        
        this.addEvents({
            onDragComplete: this.adaptLocation.bind(this)
        });
        
        return this;
    },
    
    /*
     Function: enableDrag
     Remove draggable capabilities for the element.
     */
    disableDrag: function(){
        if (this.dragHandler) {
            this.dragHandler.stop();
        }
        
        return this;
    },
    
    /*
     Function: enableResize
     Add resizable capabilities for the element.
     */
    enableResize: function(){
		var that = this;
		
        if (!this.options.resizeLimitX) {
            this.options.resizeLimitX = 10;
        }
        
        if (!this.options.resizeLimitY) {
            this.options.resizeLimitY = 10;
        }
        
        this.element.makeResizable({
            handle: this.resizer,
            limit: {
                x: that.options.resizeLimitX,
                y: that.options.resizeLimitY
            },
            onStart: function(){
                that.fireEvent('resizeStart');
            },
            onDrag: function(){
                that.fireEvent('resizeDrag');
            } ,
            onComplete: function(){
                that.fireEvent('resizeComplete');
            }.bind(this)
        });
        
        this.addEvents({
            resizeDrag: function(){
                this.setSize(this.element.getComputedSize().width, this.element.getComputedSize().height);
                this.fireEvent('redraw', 'button')
            },
            resizeComplete: function(){
                this.setSize(this.element.getComputedSize().width, this.element.getComputedSize().height);
                
            }
        });
        
        return this;
    },
    
    /* 
     Method: getCenterLocation
     Get the coordinates to place the element at center's window
     
     Return:
     location - (object) An object containing top and left properties.
     */
    getCenterLocation: function(){
        var location = {};
        
        location.top = (window.getHeight() - this.options.height.toInt()) / 2;
        location.left = (window.getWidth() - this.options.width.toInt()) / 2;
        
        return location;
    },
    
    /*
     Function: adaptLocation
     Adapt element location if it is dragged out of its boundaries
     
     Return:
     (void)
     */
    adaptLocation: function(){
        var location = {};
        var needed = false;
        var coordinates = this.element.getCoordinates();
        
        if (coordinates.top.toInt() > window.getHeight()) {
            location.top = window.getHeight() - $random(25, 75);
            needed = true;
        }
        
        if (coordinates.top.toInt() < 0) {
            location.top = 50;
            needed = true;
        }
        
        if (coordinates.left.toInt() + this.element.getStyle('width').toInt() < 0) {
            location.left = $random(25, 75) - this.element.getStyle('width').toInt();
            needed = true;
        }
        
        if (this.element.getStyle('left').toInt() > window.getWidth()) {
            location.left = window.getWidth() - $random(25, 75);
            needed = true;
        }
        
        if (needed) {
            if (this.props.fx && this.props.fx.adaptLocation) {
                if (!this.reposFx) {
                    this.reposFx = new Fx.Morph(this.element, this.props.fx.adaptLocation);
                }
                this.reposFx.start(location);
            }
        }
    },
    
    /*
     Function: show
     Fire the onShow event, and set display block and full opacity to element
     
     Return:
     this
     */
    show: function(){
        this.fireEvent('show');
        this.element.setStyle('opacity', 1);
        this.element.show();
        
        return this;
    },
    
    /*
     Function: hide
     Fire the onHide Event, and set display none to element
     
     Return:
     this
     */
    hide: function(){
        this.fireEvent('hide');
        this.element.hide();
        
        return this;
    },
    
    /*
     Native Mootools Element:
     Bind some native mootools element methods to element, so we can chain methods as in mootools
     
     Example:
     (start code)
     var element = new UI.Element({
     html : 'Hello World'
     }).inject(document.body).setStyle('border', '1px solid black).addClass('customElement');
     (end)
     */
    /*
     Function: setStyle
     See mootools setStyle documentation
     
     Return:
     this
     */
    setStyle: function(style, value){
        this.element.setStyle(style, value);
        
        return this;
    },
    
    /*
     Function: setStyles
     See mootools setStyles documentation
     
     Return:
     this
     */
    setStyles: function(styles){
        this.element.setStyles(styles);
        
        return this;
    },
    
    /*
     Function: getStyle
     See mootools getStyle documentation
     
     Return:
     this.element style
     */
    getStyle: function(style){
        return this.element.getStyle(style);
    },
    
    /*
     Function: inject
     Inject the element element into container, fire an inject event at beginning and an injected event at the end
     
     Argument:
     container - see mootools inject documentation
     position - see mootools inject documentation
     
     Return:
     this
     */
    inject: function(container, position){
        this.fireEvent('inject');
		
        this.element.inject(container, position);
        this.element.setStyle('visibility', 'visible');
        this.setSize('', '', '', container);
        this.setCanvas();
        ui.controller.element.register(this);
        
        this.fireEvent('injected');
        return this;
    },
    
    /*
     Function: adopt
     See mootools adopt documentation
     
     Return:
     this
     */
    adopt: function(element){
        this.element.adopt(element);
        this.setSize();
        return this;
    },
    
    /*
     Function: addClass
     See mootools addClas documentation
     
     Return:
     this
     */
    addClass: function(className){
        this.element.addClass(className);
        
        return this;
    },
    
    /*
     Function: set
     See mootools set documentation
     
     Return:
     this
     */
    set: function(property, value){
        if (property == 'html' && this.label) {
            this.label.set(property, value);
            this.setSize();
        }
        else 
            if (property == 'morph') {
                var self = this;
                this.element.set(property, value);
                this.element.get('morph').addEvents({
                    onMorph: function(){
                        var size = this.element.getSize();
                        self.setSize(size.x, size.y);
                    }
                });
            }
            else {
                this.element.set(property, value);
            }
        return this;
    },
    
    /*
     Function: get
     See mootools get documentation
     
     Return:
     this.element properties
     */
    get: function(property){
        return this.element.get(property);
    },
    
    /*
     Function: getSize
     See mootools getSize documentation
     
     Return:
     this.element size
     */
    getSize: function(){
        return this.element.getSize();
    },
	
	/*
     Function: morph
     See mootools morph documentation
     
     Return:
     this.element moprh
     */
    morph: function(props){
        return this.element.morph(props);
    },
    
    /*
     Function: getComputedSize
     See mootools more getComputedSize documentation
     
     Return:
     this.element size
     */
    getComputedSize: function(){
        return this.element.getComputedSize();
    },
    
    /*
     Function: set
     See mootools getCoordinates documentation
     
     Return:
     this.element coordinates
     */
    getCoordinates: function(ref){
        return this.element.getCoordinates(ref);
    },
    
    /*
     Function: destroy
     See mootools getCoordinates documentation
     
     Return:
     (void)
     */
    destroy: function(){
        this.element.destroy();
        return;
    }
});

/*
 Some usefull method for element
 
 */
Element.implement({

    /*
     Function: disableSelect
     Disable the ability to select element content text
     
     Return:
     this
     */
    disableSelect: function(){
        if (typeof this.onselectstart != "undefined") {
            this.onselectstart = function(){
                return false;
            };
        }
        else {
            if (typeof this.style.MozUserSelect != 'undefined') {
                this.style.MozUserSelect = 'none';
            }
            else {
                this.onmousedown = function(){
                    return false;
                };
            }
        }
        this.style.cursor = 'default';
        return this;
    },
    
    /*
     Function: enableSelect
     Enable the ability to select element content
     
     Return:
     this
     */
    enableSelect: function(){
        if (this.onselectstart) {
            this.onselectstart = ''; // for ie
        }
        else {
            if ($type(this.style.MozUserSelect) == "none") {
                this.style.MozUserSelect = ''; // for Firefox 
            }
            else {
                this.onmousedown = function(){
                    return true;
                }; // finaly the others (opera, perfectible on safari and chrome)
            }
        }
        this.style.cursor = 'default';
        return this;
    }
});



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


/*
---
description: UI.Box is used to make a skinnable container

authors: [moolego,r2d2]

requires:
- core:1.2.1: '*'
- mooCanvas

provides: [UI.Canvas]
 
...
*/
/*
	Class: UI.Box
		UI.Box is used to make a skinnable container
	
	Arguments:
		options
		
	Options:
		- tag - (string) element tag, by default 'span'
		- html - (string) label text, by default Label
	
	Returns:
		Box element
		
	Example:
		(start code)
		var box = new UI.Box({
			html	: 'Hello world!',
		}).inject(this.element);
		(end)

	Implied global:
		- MooLego - UI
		- MooTools - Class
		
	Members:
		Box, Element, Extends, build, component, emboss, html, options, 
    	parent, selectable, tag
    
    Discussion:
	
*/

UI.Box = new Class({
	Extends: UI.Element,
		
	options: {
		component: 'box',
		title: 'box'
	},

	/* 
	Function: build
		private function
		
		Call UI.Element build
	*/
	
	build: function(options){
		this.parent(options);
		
		/*this.title = new UI.Label(this.props.components.title)
		 .inject(this.head);*/
		
	}
	
});/*
---
description: Creates Bubble and let you attach events action

authors: [moolego,r2d2]

requires:
- core:1.2.1: '*'
- mooCanvas

provides: [UI.Canvas]
 
...
*/
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
});/*
---
description: UI.Label is used to make text element with css skin

authors: [moolego,r2d2]

requires:
- core:1.2.1: '*'
- mooCanvas

provides: [UI.Canvas]
 
...
*/
/*
	Class: UI.Label
		UI.Label is used to make text element with css skin
	
	Extends:
		<UI.Element>
	
	Arguments:
		options
		
	Options:
		- tag - (string) element tag, by default 'span'
		- html - (string) label text, by default Label
		- emboss - (boolean) duplicate the text to create an emboss effect
		- selectable - (boolean) Define if the text is selectable or not
	
	Returns:
		Image element
		
	Example:
		(start code)
		var label = new UI.Label({
			html	: 'Hello world!',
		}).inject(this.element);
		(end)
	
	Implied global: 
		- MooLego - UI
		- MooTools - $merge, Class, Element
	
	Members:
		Element, Extends, Label, bind, build, buildImage, component, 
	    components, element, emboss, events, fireEvent, html, image, inject, 
	    load, options, parent, props, selectable, src, tag
	
	Discussion:
	
*/

UI.Label = new Class({
	
	Extends: UI.Element,
		
	options: {
		component: 'label',
		tag: 'span',
		html: 'Label',
		emboss: false,
		selectable: false
	},
	/* 
	Method: build
		private method
	 
	Make a  Label and set the fade Fx
	 
	 Return:
	 (void)
	 
	 See also:
	 <UI.Element::build>
	 */	
	build: function(){
		this.parent();
		if (this.options.image) {
			this.buildImage();
		}
	},
	/* 
	Method: buildImage
	 	private method
	 
		Define image props form element
	 
	Return:
	 	(void)
	*/		
	buildImage: function(){
		this.image = new Element('img', $merge(
			this.props.components.image,
			{
				src : this.options.image,
				events : {
					load : this.fireEvent.bind(this, 'onImageLoad')	
				}
			}
		)).inject(this.element, 'top');
	}
});/*
---
description: The UI.ProgressBar act as a progressbar.

authors: [moolego,r2d2]

requires:
- core:1.2.1: '*'
- mooCanvas

provides: [UI.Canvas]
 
...
*/
/*
	Class: UI.ProgressBar
		The UI.ProgressBar act as a progressbar.
	

	Extends:
		<UI.Element>
	
	Require:
		<UI>
		<UI.Element>
		
	Arguments:
		options
		
	Options:
		- width - (integer/string) Width of the progressbar wrapper in px or percent
		- height - (integer/string) Height  of the progressbar wrapper in px or percent
		- fx - 
		
	Returns:
		ProgressBar object.
		
	Example:
		(start code)
		var progressbar = new UI.ProgressBar({
			width			: 260,
			height			: 17
		}).inject(document.body).reach(50);
		(end)
		
	Implied global: 
		UI,
		Class,Element
*/

UI.ProgressBar = new Class({
	Extends: UI.Element,

	//options
	options: {
		component: 'progressbar',
		tag: 'div',
		
		width: 200,
		height: 18,

		speed: 2000,
		fx: Fx.Transitions.Quad.easeOut
	},

	build: function() {
		this.parent();
		this.progress = new UI.Element({
			component: 'progressbar',
			height: this.options.height,
			width:1,
			type: this.options.type,
			state: 'progress'
		}).inject(this.element);
		
		//this.progress.show();
	},

	reach: function(percentage) {
		this.progress.show()
		var zero = 0;
		if (percentage == 0) {
			zero = 1;
			percentage = 1;
		}
		var width = this.element.getSize().x * percentage / 100;
		var that = this;
		
		this.progress.set('morph',{
			duration: this.options.speed,
			transition: this.options.fx,
			onComplete: function() {
				if (zero) {
					that.fireEvent('render');
					that.progress.hide()
				}
				else {
					that.progress.setSize(width.toInt(),this.options.height)
					that.fireEvent('render');
				}
			}
		}).morph({
			width: width.toInt()
		});
		
		return this;
	}	
});/*
 ---
 description: Canvas Adapter. Contains basic drawing functions.
 authors: [moolego,r2d2]
 requires:
 - core:1.2.1: '*'
 - mooCanvas
 provides: [UI.Canvas]
 
 ...
 */
/*
 Class: UI.Scrollbar
 Manage scrolls for views.
 
 Extend:
 <UI.Element>
 
 Arguments:
 options
 
 Options:
 - width - (integer) The scollbar track width
 - maxThumbSize - (integer)
 - wheel - (integer) The scroll increment
 
 Example:
 (start code)
 var scrollbar = new UI.Scrollbar({
 container	: this.content
 });
 (end)
 
 Implied global:
 - MooLego - UI
 - MooTools -Class
 - Javascript - document
 
 Credits:
 based on Valerio's Mootools scrollbar plugin.
 found in upload folder of mootools website
 */
UI.Scrollbar = new Class({

    Extends: UI.Element,
    
    options: {
        component: 'scrollbar',
        type: 'track',
        
        // direction: 'horizontal',
        direction: 'vertical',
        
        maxThumbSize: 32,
        wheel: 16
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
        this.bound = {
            'start': this.start.bind(this),
            'end': this.end.bind(this),
            'drag': this.drag.bind(this),
            'wheel': this.wheel.bind(this),
            'page': this.page.bind(this)
        };
        
        this.container = this.options.container;
        this.position = {};
        this.mouse = {};
        this.update();
        this.attach();
    },
    /* 
     Method: build
     private method
     
     Make a  Label and set the fade Fx
     
     Return:
     (void)
     
     See also:
     <UI.Element::build>
     */
    build: function(){
        if (this.options.direction == 'vertical') {
            if (!this.options.size) {
                this.options.width = this.props.size;
            }
        }
        else 
            if (!this.options.size) {
                this.options.height = this.props.size;
            }
        
        this.parent();
        
        this.inject(this.options.container, 'before');
        
        this.thumb = new UI.Element({
            skin: this.options.skin,
            component: this.options.component,
            type: 'thumb'
        }).inject(this.element);
        
        //this.canvas.canvas.setStyle('position','');
    },
    
    update: function(){
        if (this.options.direction == 'vertical') {
            this.containerSize = this.options.container.getComputedSize().totalHeight;
            this.setSize(this.options.width.toInt(), this.containerSize);
            this.containerScrollSize = this.options.container.scrollHeight;
            this.trackSize = this.element.offsetHeight.toInt();
        }
        else {
            this.containerSize = this.options.container.getComputedSize().totalWidth;
            this.setSize(this.containerSize, this.options.height.toInt());
            this.containerScrollSize = this.options.container.scrollWidth;
            this.trackSize = this.element.offsetWidth.toInt();
        }
        
        if (this.containerScrollSize === 0) {
            return;
        }
        
        if (this.isVisible()) {
            this.thumb.element.setStyle('visibility', 'visible');
        }
        else {
            this.thumb.element.setStyle('visibility', 'hidden');
        }
        
        
        this.containerRatio = this.containerSize / this.containerScrollSize;
        this.thumbSize = this.trackSize * this.containerRatio;
        
        var offset;
        
        if (this.thumbSize < this.options.maxThumbSize.toInt()) {
            this.thumbSize = this.options.maxThumbSize.toInt();
            offset = this.trackSize - this.thumbSize;
        }
        else 
            if (this.thumbSize > this.trackSize) {
                this.thumbSize = this.options.maxThumbSize.toInt();
            }
            else {
                offset = this.trackSize;
            }
        this.scrollRatio = this.containerScrollSize / offset;
        
        if (this.options.direction == 'vertical') {
            this.thumb.setSize(this.options.width, this.thumbSize);
        }
        else {
            this.thumb.setSize(this.thumbSize, this.options.height);
        }
        
        this.updateThumbFromContentScroll();
        this.updateContentFromThumbPosition();
    },
    
    updateContentFromThumbPosition: function(){
        if (this.options.direction == 'vertical') {
            this.options.container.scrollTop = this.position.now * this.scrollRatio;
        }
        else {
            this.options.container.scrollLeft = this.position.now * this.scrollRatio;
        }
    },
    
    updateThumbFromContentScroll: function(){
        if (this.options.direction == 'vertical') {
            this.position.now = (this.options.container.scrollTop / this.scrollRatio).limit(0, (this.trackSize));
            this.thumb.setStyle('top', this.position.now + 'px');
        }
        else {
            this.position.now = (this.options.container.scrollLeft / this.scrollRatio).limit((this.trackSize), 0);
            //console.log(this.position.now + 'px');
            this.thumb.setStyle(this.position.now + 'px', 'left');
            
        }
    },
    
    attach: function(){
        this.thumb.element.addEvent('mousedown', this.bound.start);
        if (this.options.wheel) {
            this.options.container.addEvent('mousewheel', this.bound.wheel);
        }
        this.element.addEvent('mouseup', this.bound.page);
    },
    
    wheel: function(event){
        if (this.options.direction == 'vertical') {
            this.options.container.scrollTop -= event.wheel * this.options.wheel;
        }
        else {
            this.options.container.scrollLeft -= event.wheel * this.options.wheel;
        }
        this.updateThumbFromContentScroll();
        event.stop();
    },
    
    page: function(event){
        if (this.options.direction == 'vertical') {
            if (event.page.y > this.thumb.element.getPosition().y) {
                this.options.container.scrollTop += this.options.container.offsetHeight;
            }
            else {
                this.options.container.scrollTop -= this.options.container.offsetHeight;
            }
        }
        else {
            if (event.page.x > this.thumb.element.getPosition().x) {
                this.options.container.scrollLeft += this.options.container.offsetWidth;
            }
            else {
                this.options.container.scrollLeft -= this.options.container.offsetWidth;
            }
        }
        
        this.updateThumbFromContentScroll();
        event.stop();
    },
    
    start: function(event){
        if (this.options.direction == 'vertical') {
            this.mouse.start = event.page.y;
            this.position.start = this.thumb.element.getStyle('top').toInt();
        }
        else {
            this.mouse.start = event.page.x;
            this.position.start = this.thumb.element.getStyle('left').toInt();
        }
        
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
        if (this.options.direction == 'vertical') {
            this.mouse.now = event.page.y;
        }
        else {
            this.mouse.now = event.page.x;
        }
        this.position.now = (this.position.start + (this.mouse.now - this.mouse.start)).limit(0, (this.trackSize - this.thumbSize));
        this.updateContentFromThumbPosition();
        this.updateThumbFromContentScroll();
        event.stop();
    },
    
    isVisible: function(){
        if (this.containerSize < this.containerScrollSize) {
            return true;
        }
        else {
            return false;
        }
    }
});
/*
	Class: UI.Control
		UI.Control is the root class of most control elements of moolego UI. It can't be used alone.
		
	Extends:
		<UI.Element>
		
	Arguments:
		options
	
	Returns:
		Canvas object.
		
	Implied global: 
		$defined 
		Class, Element, UI
		
	Members: 
		Control, Element, Extends, addEvents, bind, blur, build, 
	    components, control, element, fireEvent, focus, get, getForm, getParent, 
	    getProperty, getSize, height, inject, input, label, name, options, 
	    parent, props, set, setBehavior, setInput, setSize, type, value, width, 
	    x, y
	
	Discussion:
	
*/

UI.Control = new Class({
	
	Extends: UI.Element,
		
	options: {},

	/* 
	Function: build
		private function
		
		Call UI.Element build and set the control element
	
	See also:
		<UI.Element::build>
	*/
	
	build: function(){
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
	
	See also:
		<UI.Element::setSize>
	*/
	
	setSize: function(width, height, state){
		var twidth,theight;
		
		if (this.label) {
			twidth = width || this.options.width || this.props.width || this.label.getSize().x;
			theight = height || this.options.height || this.props.height || this.label.getSize().y;
		} else if (this.input && this.input.getProperty('type') != 'hidden') {
			twidth = width || this.options.width || this.props.width || this.input.getSize().x;
			theight = height || this.options.height || this.props.height || this.input.getSize().y;
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
	
	setInput: function(type, tag){
		if (!$defined(tag)) { tag	= 'input'; }
		if (!$defined(type)) { type = 'hidden'; }

		if (type) {
			this.input = new Element(tag, {
				type: type,
				name: this.options.name
			}).inject(this.control);
		} else {
			this.input = new Element(tag, {
				name: this.options.name
			}).inject(this.control);
		}
		
		switch (tag){
			case 'input':
				this.input.set('value', this.options.value);
				break;
			case 'textarea':
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
	
	getForm: function(){
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
	
	See also:
		<UI.Element::setBehavior>
	*/
	
	setBehavior : function(){
		this.parent();
		if (this.input) {
			this.input.addEvents({
				blur: this.fireEvent.bind(this, 'blur'),
				focus: this.fireEvent.bind(this, 'focus')
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
			if (this.label) {
				this.label.set(property, value);
			}
			this.setSize();
		} else {
			this.element.set(property, value);
		}
	}
	
});
/*
	Class: UI.Input
		Create a skinnable input element
	
	Extends:
		<UI.Control>
	
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
		
	Implied global: 
		Class - 25
		UI - 25 27
		
	Members:
		Control, Extends, Input, addEvents, bind, blur, component, 
    	focus, name, options, parent, setBehavior, setState, value
*/

UI.Input = new Class({
	
	Extends: UI.Control,
	
	options: {
		component: 'input',
		
		// default options
		name: 'ui-input',
		value: ''
	},
	
/* 
	Function: build
		private function
		
		Create a div and a hidden input to receive the selected value
	
	Return:
		(void)
	
	See also:
		<UI.Control::build>
		<UI.Element::build>
	*/
	
	build: function(){
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
	
	See also:
		<UI.Element::setState>
	*/
	
	setState: function(state){
		this.parent(state);
		if (this.skin[state]) this.input.set(this.skin[state].components.input.styles);
	},
	
	/* 
	Function: setBehavior
		private function
		
		Set control relative behavior (blur and focus)
	
	Return:
		(void)
	
	See also:
		<UI.Control::setBehavior>
		<UI.Element::setBehavior>
	*/
	
	setBehavior: function() {
		this.parent();
		this.addEvents({
			blur: this.setState.bind(this, 'default'),
			focus: this.setState.bind(this, 'focus')
		});
	}
	
});
/*
	Class: UI.Button
		Creates button and let you attach events action
		
	Extend:
		<UI.Control>
	
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
	
	
	Implied global:
		UI, 
		Class,Event 

	Members:
		Button, Control, Extends, Label, addEvents, bind, build, 
	    component, components, element, getForm, html, image, inject, label, 
	    mousedown, mouseenter, mouseleave, mouseup, onImageLoad, options, 
	    parent, props, setBehavior, setSize, setState, setStyles, skin, state, 
	    stop, styles, submit
*/

UI.Button = new Class({
	
	Extends: UI.Control,
	
	options: {
		component: 'button',
		
		// default options
		label: 'Button',
		submit: false
	},
	
	/* 
	Function: build
		private function
		
		Create a textLabel and call parent method
	
	Returns:
		(void)
		
	See also:
		<UI.Control::build>
		<UI.Element::build>
	*/
	
	build: function(){
		this.parent();
		if(this.options.label) {
			this.label = new UI.Label({
				skin : this.options.skin,
				html : this.options.label,
				styles : this.props.components.label.styles,
				image : this.options.image,
				onImageLoad : function(){
					this.setSize();
				}.bind(this)
			}).inject(this.element);
		}
	},
	
	/* 
	Function: setState
		Set the button state
	
	Arguments:
		state - (string) State name
		
	Returns:
		(void)
	
	See also:
		<UI.Element::setState>
	*/
	
	setState: function(state){
		if (this.label && this.skin[state]) {
			this.label.setStyles(this.skin[state].components.label.styles);
		}
		this.parent(state);
	},
	
	/* 
	Function: setBehavior
		private function
		
		Set behavior relative to button (mouseenter, mousedown, mouseup, mouseleave)
	
	Returns:
		(void)
	
	See also:
		<UI.Control::setBehavior>
		<UI.Element::setBehavior>
	*/
	
	setBehavior: function(){
		this.parent();

		this.element.addEvents({
			mouseenter: this.setState.bind(this, 'over'),
			mousedown: function(e) {
				this.setState('down');
				new Event(e).stop();
			}.bind(this),
			mouseleave: function(){
				this.setState(this.options.state);
			}.bind(this),	
			mouseup: function(){
				if (this.options.submit) {
					this.submit();
				}
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
	
	submit: function(){
		this.getForm().submit();
	}
});

/*
	Class: UI.Textarea
		Create a skinnable textarea element
	
	Extends:
		<UI.Control>
	
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
	
	Extends: UI.Control,
	
	options: {
		component: 'textarea',
		
		// default options
		name: 'ui-input',
		value: ''
	},
	
	/* 
	Function: build
		private function
		
		Call <UI.Control::build> and make a textarea element
		
	Return:
		(void)
	
	See also:
		<UI.Control::buil(state);
		<UI.Element::build>
	*/
	
	
	build: function(){
		//create a new div as input element
		this.parent();
				
		//create input
		this.setInput(false, 'textarea');
		this.input.set({
			styles: {
				width: this.props.width - this.input.getStyle('paddingLeft').toInt() - this.input.getStyle('paddingRight').toInt(),
				height: this.props.height - this.input.getStyle('paddingTop').toInt() - this.input.getStyle('paddingBottom').toInt(),
				overflow: 'hidden',
				margin: 0
			}
		});
	},
	
	/* 
		Method: setBehavior
			private function
		
			Set behavior
		
		Return:
			(void)
		
		See also:
			<UI.Control::setBehavior>
			<UI.Element::setBehavior>
	*/
	
	setBehavior: function(){
		this.parent();
		this.addEvents({
			blur: this.setState.bind(this, 'default'),
			focus: this.setState.bind(this, 'focus')
		});
	}
});
/*
	Class: UI.Checkbox
		Creates checkbox control
	
	Extends:
		<UI.Control>
	
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
		
		
	Implied global: 
		Class - 27
		Event - 118
		UI - 27 29 61
*/

UI.Checkbox = new Class({

	Extends: UI.Control,
	
	options: {
		// default options
		label: false,
		name: 'checkbox-input',
		value: 'default',
		checked: false,
		
		// styles
		component: 'checkbox'
	},
	
	/*
	Function: build
		private function
		
		Call UI.Element build, set an input and a textLabel
	
	Returns:
		(void)
	
	See also:
		<UI.Control::build>
		<UI.Element::build>
	*/
	
	build: function(){
		this.parent();
		this.setInput();

		if (this.options.label) {
			this.label = new UI.Label({
				'for': this.options.name,
				skin: this.options.skin,
				html: this.options.label,
				styles: this.props.labelStyles
			}).inject(this.element);
			delete this.props.width;
			delete this.props.height;
		}
		this.control.store('value', this.options.value);
		if (this.options.checked) {
			this.toggleValue();
		}
	},	
	
	/* 
	Function: toggleValue
		Toggle the value of the checkbox
	
	Return:
		this
	*/
	
	toggleValue: function(){
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
	
	See also:
		<UI.Control::setBehavior>
		<UI.Element::setBehavior>
	*/
	
	setBehavior : function(){
		this.parent();
		this.element.addEvents({
			click: function(e){
				var ev = new Event(e).stop();
				this.toggleValue();
			}.bind(this)
		});
	}
});/*
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
	
	Implied global: 
		$merge, 
		Class, Element, UI
	
	Members:
		Canvas, Control, Extends, Label, RadiosGroup, addEvent, 
	    addEvents, addRadioAction, bind, canvas, class, click, component, 
	    control, display, draw, element, for, height, html, initialize, inject, 
	    input, label, layers, length, name, newRadio, options, parent, position, 
	    props, push, radios, retrieve, selected, selectedRadio, setCanvas, 
	    setInput, setSize, setState, setStyle, skin, store, styles, value, 
	    width, x, y, zIndex
		
	Discussion:
		Should use UI.Controller group instead of a radiogroup, then create a UI.Radio class
*/

UI.RadiosGroup = new Class({
	
	Extends				: UI.Control,
	
	options: {
		// default options
		name: 'radiosgroup',
		component: 'radio'
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
	
	initialize: function(options){
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
	
	newRadio: function(opt){
		var radio = new Element('span',{
			'class': 'ui-radio',
			styles: $merge({
				position: 'relative',
				display: 'inline-block',
				height: 15,
				zIndex: this.radios.length+1
			}, opt.styles)
		}).store('value', opt.value);
		
		this.radios.push(radio);
		if(!this.radios[1]) {
			this.control = radio;
			this.setInput();	
		}
		
		if (opt.label) {
			var label = new UI.Label({
				skin: this.options.skin,
				'for': this.options.name,
				html: opt.label,
				styles: this.props.styles
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
	
	addRadioAction: function(radio){
		radio.addEvents({
			'click': function(){
				if (this.selectedRadio) {
					this.setState(this.selectedRadio, 'default');
				}
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
	
	setCanvas: function(radio){
		if (radio.canvas || (this.props && !this.props.layers) || (this.props && this.props.layers && this.props.layers.length === 0)) {
			return false;
		}
			
		radio.paint = new UI.Paint({
			props: this.props,
			width: this.props.width,
			height: this.props.height
		}).inject(radio);
		
		radio.addEvent('drawCanvas', function(){
			this.paint.setSize(this.element.x,this.element.y, this.props);
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
	
	setState: function(radio, state){
		radio.paint.draw(this.skin[state]);
	}
	
});
/*
	Class: UI.Select
		Create <select> like element
	
	Extends:
		<UI.Control>
		
	Require:
		<UI.Control>
		<UI.Menu>
		<UI.Menu.Scroller>
	
	Arguments:
			options
			
	Options: 
		scrollToSelected - (boolean) Set to true if you want the menu position remember last position when you reopen it
		list - (object) the menu list
	
	Example:
		(start code)
		new UI.Select({
			name			: 'formular',
			list			: [{
				text		: 'Button',
				value		: 'bttn'
			},{ 
				text		: 'Checkbox',
				value		: 'ckbx'
			},{ 
				text		: 'Input',
				value		: 'inpt'
			},{ 
				text		: 'Select',
				value		: 'slct'
			},{ 
				text		: 'Slider',
				value		: 'sldr'
			},{ 
				text		: 'Textarea',
				value		: 'txtr'
			}]
		}).inject(this.content);
		(end)
	
	Implied global: 
		UI, ui
		Class, Event
		document
		
	Members Control, Extends, Label, Menu, Select, action, addEvents, 
	    addMenuActions, bind, body, build, closeMenu, component, components, 
	    content, controller, each, element, getFirst, getSize, getStyle, html, 
	    inject, input, label, list, menu, mousedown, options, parent, position, 
	    props, scrollToSelected, set, setBehavior, setInput, setStyle, show, 
	    skin, stop, styles, target, text, toInt, value, width, x
		
*/


UI.Select = new Class({

	Extends: UI.Control,
	
	options: {
		component: 'select',
		
		scrollToSelected: true,
		list: {}
	},
	
	/* 
	Function: build
		private function
		
		Call UI.Element build, then create a hidden input , a textLabel and create a menu
	
	Returns:
		(void)
	
	See also:
		<UI.Control::build>
		<UI.Element::build>
	*/
	
	build: function(){
		//Create new div as button element
		this.parent();
		this.setInput();
		this.addMenuActions(this.options.list);
		
		// Create a menu
		this.menu = new UI.Menu({
			width: this.options.width,
			skin: this.options.skin,
			position: 'over',
			target: this.element,
			menu: this.options.list,
			scrollToSelected: this.options.scrollToSelected
		}).inject(document.body);
		
		// Create a label for the selected item
		var width = this.menu.content.getFirst().getSize().x;
		width -=  this.menu.content.getFirst().getStyle('paddingRight').toInt();
		width -=  this.menu.content.getFirst().getStyle('paddingLeft').toInt();
		this.menu.setStyle('display', 'none');
		
		this.label = new UI.Label({
			width: width,
			skin: this.options.skin,
			styles: this.props.components.label.styles,
			html: this.options.list[0].text
		}).inject(this.element);
	},

	/*
		Method: setBehavior
			private function
			
			Add events on element
		
		Return:
			(void)
		
		See also:
			<UI.Control::setBehavior>
			<UI.Element::setBehavior>
	*/

	setBehavior: function(){
		this.parent();

		//we add events on select
		this.element.addEvents({
			mousedown: function(e){
				ui.controller.element.closeMenu();
				this.menu.show(this.element);
				var ev = new Event(e).stop();
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
	

	addMenuActions: function(list){
		list.each(function(el){
			if (!el.menu && el.text != 'separator') {
				el.action = function(){
					this.input.value = (el.value) ? el.value : el.text;
					this.label.set('html', el.text);
				}.bind(this);
			} else if (el.menu) {
				this.addMenuActions(el.menu);
			}
		}, this);
	}
	
});
/*
	Class: UI.Slider
		Creates slider and let you attach events action.
		Additionnaly to UI.Element and UI.Control methods and events, it handle all the properties of the mootools slider.
		
	Extend:
		<UI.Element>
	
	Requires:
		Mootools Slider plugin
	
	Arguments:
		options
	
	Options:
		type - (string) 'horizontal' or 'vertical'
		
		onStart - (function) see mootools slider plugin doc
		onChange - (function) see mootools slider plugin doc
		onComplete - (function) see mootools slider plugin doc
		onTick - (function) see mootools slider plugin doc
		
		snap - (boolean) see mootools slider plugin doc
		offset - (boolean) see mootools slider plugin doc
		range - (boolean) see mootools slider plugin doc
		wheel - (boolean) see mootools slider plugin doc
		steps - (boolean) see mootools slider plugin doc
		
	Implied global: 
		UI, ui,
		$empty, 
		Class, Slider
		
		
	Members:
		Element, Extends, Slider, addEvent, build, canvas, component, 
	    controller, element, fireEvent, handler, initialize, inject, knob, mode, 
	    offset, onChange, onComplete, onStart, onTick, options, parent, 
	    property, range, register, set, setBehavior, setCanvas, setSize, 
	    setStyle, skin, slider, snap, step, steps, toPosition, type, value, 
	    wheel
	
	Example:
		(start code)
		var step;
		new UI.Slider({
			range				: [0, 255],
			wheel				: true,
			onChange: function(step){
				step = step;
			}
		}).inject(form);
		(end)
*/

UI.Slider = new Class({
	
	Extends: UI.Element,
	
	options:{
		
		// default options
		component: 'slider',
		type: 'horizontal',
		
		// implemented events
		onStart: $empty,
		onChange: $empty,
		onComplete: $empty,
		onTick: $empty,
		
		// mootools slider default settings
		snap: false,
		offset: 0,
		range: false,
		wheel: false,
		steps: 100
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
		
		Call parent method and create a skinned knob element
	
	Return:
		(void)
	*/
	
	build : function(){
		this.parent();
		
		this.handler = new UI.Element({
			skin: this.options.skin,
			component: 'slider',
			type: 'knob'
		}).inject(this.element);
	},
	
	/* 
	Function: inject
		Create the slider and inject it
	
	Arguments:
		target - (mix) See mootools doc
		position - (string) See mootools doc
		
	Return:
		this
	*/
	
	inject: function(target, position){
		this.fireEvent('inject');
		
		var self = this;
		
		this.element.inject(target, position);
		this.element.setStyle('visibility', 'visible');
		this.setSize();
		this.setCanvas();
		ui.controller.element.register(this);

		this.slider = new Slider(this.paint.canvas, this.handler.element, {
			snap: this.options.snap,
			offset: this.options.offset,
			range: this.options.range,
			wheel: this.options.wheel,
			steps: this.options.steps,
			mode: this.options.type,
			
			onStart: function(step){
				self.fireEvent('start', step);
			},
			onTick: function(position){
				if(this.options.snap) { position = this.toPosition(this.step); }
				this.knob.setStyle(this.property, position);
			},
			onChange: function(step){
				self.fireEvent('change', step);
			},
			onComplete: function(step){
				self.fireEvent('complete', step);
			}
		});
		this.fireEvent('injected');
		
		return this;
	},
	
	/* 
	Function: setBehavior
		private function
		
		Set behavior relative to slider (complete)
	
	Return:
		(void)
	*/
	
	setBehavior: function(){
		this.parent();
		this.addEvent('complete', function(step){
			this.value = step;
		});
	},
	
	/* 
	Function: set
		Set the slider value
		
	Arguments:
		value - (integer) The value to set
	
	Return:
		this
	*/
	
	set: function(value){
		return this.slider.set(value);
	}
	
});

 /*
	Class: UI.Menu
		Creates a new menu, manages submenus and positionning as well as scrolling thru <UI.Menu.Scroller>
		
	Extends:
		<UI.Element>
	
	Arguments:
		options
			
	Options: 
		- zIndex - (integer) Base z-index for menu element (submenu's z-index will be incremented)
		- contentTag - (string) Tag name for menu elements wrapper
		- itemTag - (string) Tag name for menu elements
		
		- position - (string) Specify where the new menu must be positionned.
			It could be normal (element will be positionned on parent's side),
			over (element will be positionned over the parent element, used for <UI.Select>),
			bottom (element will be positionned on bottom of parent element, used for <UI.Toolbar>)
		
		- scrollToSelected - (boolean) Determine if a menu (specifically a <UI.Select>) should remember last item selected
		- scrollMargin - (integer) Determine remaining margin on top and bottom when a menu is too large to feet in window
		- menu - (array) Array containing menu definition
		
	Example:
		(start code)
		var submenu = new UI.Menu({
			container : this.view.element,
			underlay : this.options.underlay,
			zIndex : 1
		});
		(end)
	
	Implied global: 
		- MooLego - UI,ui,
		- MooTools - $clear, $defined, $empty, $time, Class, Element, Event, Fx, Window
		- Javascript - document
		
	Members:
		Element, Extends, Label, Menu, MenuScroller, Tween, action, 
	    activeItem, addEvent, addEvents, addScrolls, addSubmenu, 
	    addSubmenuArrow, addSubmenuEvents, arrow, bind, body, bottom, build, 
	    buildMenu, canvas, closeMenu, closeOnRollout, component, components, 
	    content, contentTag, controller, currentIndex, default, defaultArrow, 
	    delay, destroy, display, duration, each, element, empty, fireEvent, 
	    getComponentProps, getCoordinates, getElements, getHeight, getScroll, 
	    getSize, getStyle, getWidth, goDown, goUp, height, hide, hideFxDuration, 
	    html, image, inject, itemTag, items, layers, left, listStyle, margin, 
	    menu, menuActionDelay, menuWithAction, mouseUpAction, mousedown, 
	    mouseenter, mouseleave, mouseup, moveRollover, onComplete, onResize, 
	    onScroll, openOnRollover, options, padding, parent, position, props, 
	    push, radius, removeEvents, removeRollover, removeScrolls, 
	    removeSubmenu, right, rollover, rolloverType, scrollMargin, 
	    scrollToSelected, scrolls, selected, separator, set, setBehavior, 
	    setCanvas, setCorners, setPosition, setRollover, setSize, setState, 
	    setStyle, setStyles, show, showDelay, skin, start, stop, styles, 
	    submenu, tag, target, text, time, toInt, top, type, width, wrapper, x, 
	    y, zIndex

	Discussion
		Should use listView
	
*/


UI.Menu = new Class({
	
	Extends: UI.Element,
	
	options: {
		component: 'menu',
		rolloverType: 'menuRollover',
		
		zIndex: 3000,
		contentTag: 'div',
		itemTag: 'div',
		
		position: 'normal',
		scrollToSelected: false,
		scrollMargin: 20,
		menu: []
	},

	/*
	Function: build
		private function
		
		Call UI.Element build, then create a menu wrapper
	
	Return:
		(void)
	
	See also:
		<UI.Element::build>
	*/
	
	build: function(menu) {
		this.parent();
		this.content = new Element(this.options.contentTag,{
			styles: {
				zIndex: 2,
				position: 'relative',
				padding: this.props.components.wrapper.styles.padding,
				margin: 0,
				listStyle: 'none'
			}
		}).inject(this.element);
		
		this.buildMenu();
		
		this.element.setStyles({
			zIndex	: this.options.zIndex
		});
	},
	
	
	
	
	/* 
	Method: buildMenu
		Build the content of the menu or change menu content
	
	Arguments:
		menu - (array) Array containing menu definition
	
	Return:
		this
	 */
	
	buildMenu : function(menu) {
		this.empty();
		var list = (menu) ? menu : this.options.menu;
		var menuItem;
		this.items = [];
		this.currentIndex = 0;
		
		list.each(function(item){
			if (item.text == 'separator') {
				menuItem = new UI.Label({
					skin: this.options.skin,
					tag: this.options.itemTag,
					html: '',
					styles: this.props.components.separator.styles
				}).inject(this.content);
				menuItem.separator = true;
			} else {
				menuItem = new UI.Label({
					skin: this.options.skin,
					tag: this.options.itemTag,
					html: item.text,
					props: UI.skin.getComponentProps(this.skin, 'menuItem'),
					image: item.image
				}).set(item.options);
				
				this.items.push(menuItem);
				
				if (item.action) {
					menuItem.element.addEvent('action', item.action);
				}
				menuItem.inject(this.content);
			}
			this.addSubmenuEvents(item, menuItem);
		},this);
		return this;
	},


	/*
	Function: setBehavior
		private function
		
		Call UI.Element build, then create a menu wrapper
	
	Return:
		(void)
	
	See also:
		<UI.Element::build>
	*/

	setBehavior : function(){
		this.parent();
		if (!this.options.closeMenu) {
			this.addEvent('onCloseMenu', function(e){
				ui.controller.element.closeMenu = $empty;
				this.hide(300);
			}.bind(this));
		} else { 
			this.addEvent('onCloseMenu', function(){
				this.options.closeMenu();
			}.bind(this));
		}
	},
		
	/* 
	Method: addSubmenuEvents
		private function
	
		Attach actions and / or submenu to menu elements
	
	Arguments:
		item - (object) Object containing element properties
		menuItem - (element) Menu item where events will be attached
	
	Return:
		(void)
	 */
	
	addSubmenuEvents: function(item, menuItem){
		
		var self = this;
		
		if(item.menu) {
			menuItem.addEvents({
				'mouseenter': function(){
					if (self.activeItem && self.activeItem.submenu && self.activeItem != menuItem) {
						self.activeItem.submenu.hide();
					}
					if (self.activeItem != menuItem) {
						self.addSubmenu(item, menuItem, 'normal');
					}
					self.moveRollover(menuItem);
				}
			});
			self.addSubmenuArrow(menuItem);
		} else {
			menuItem.addEvents({
				'mouseenter': function(){
					self.removeSubmenu();
					if (menuItem.separator) {
						self.removeRollover();
					}
					else {
						self.moveRollover(menuItem);
					}
				}
			});
		}
		
		menuItem.element.addEvents({
			'mouseleave': function(){
				$clear(self.menuActionDelay);
			},
			'mouseup': function(){
				self.mouseUpAction(menuItem);
			},
			'mousedown': function(e){
				var ev = new Event(e).stop();
				if (!menuItem.separator) {
					self.fireEvent('change');
				}
			}
		});
	},
	
	/* 
	Method: addSubmenu
		private function
		
		Attach a submenu to a menu item if needed
	
	Arguments:
		item - (object) Object containing element properties
		menuItem - (element) Menu item where submenu will be attached
	
	Return:
		(void)
	 */
	
	addSubmenu: function(item, menuItem, position){
		this.menuWithAction = false;
		$clear(this.menuActionDelay);
		this.menuActionDelay = (function(){
			if (!menuItem.submenu) {
				menuItem.submenu = new UI.Menu({
					skin: this.options.skin,
					target: menuItem,
					menu: item.menu,
					closeMenu: this.fireEvent.bind(this, 'closeMenu'),
					openOnRollover: this.options.openOnRollover,
					closeOnRollout: this.options.closeOnRollout,
					position: position,
					zIndex: this.options.component == 'toolbar' ? --this.options.zIndex : ++this.options.zIndex
				}).inject(document.body);
				ui.controller.element.closeMenu = this.fireEvent.bind(this, 'closeMenu');
			} else {
				menuItem.submenu.show(menuItem);
			}
		}.bind(this)).delay(this.props.showDelay);
	},
	
	/* 
	Method: addSubmenuArrow
		private function
		
		Add an arrow on the right side of the element
	
	Arguments:
		menuItem - (element) Menu item where arrow will be attached
	
	Discussion:
		should be drawn on the menuItem, probably
	
	Return:
		(void)
	 */
	
	
	addSubmenuArrow: function(menuItem){
		this.addEvent('addArrows', function(){
			// add arrow
			menuItem.arrow = new UI.Element({
				skin: this.options.skin,
				component: 'element',
				type: 'menuRightArrow',
				styles: {
					height:'10',
					width:'20',
					'padding': 0,
					'position': 'absolute',
					right: 8,
					display: 'block'
				}
			}).inject(menuItem, 'top');
			menuItem.arrow.setStyle('top', (menuItem.element.getHeight() - menuItem.arrow.element.getHeight()) / 2);
			menuItem.element.addEvents({
				'mouseenter': function(){
					menuItem.arrow.setState('over');
				},
				'defaultArrow': function(){
					menuItem.arrow.setState('default');
				}
			});
		});
	},
	
	/* 
	Method: mouseUpAction
		private function
		
		Execute the menu item action and close the menu (as well as submenu if needed)
	
	Arguments:
		menuItem - (element) Menu item with attached action to fire
	
	Return:
		(void)
	 */
	
	mouseUpAction : function(menuItem){
		if ($time() - this.time > 300 && this.rollover) {

			var fx = new Fx.Tween(this.rollover.element, {
				duration: 100,
				onComplete: function(){
					if (this.selected) {
						this.selected.selected = false;
					}
					this.selected = menuItem.element;
					menuItem.element.selected = true;
					this.fireEvent('closeMenu');
					menuItem.element.fireEvent('action');
				}.bind(this)
			}).start('opacity', 0, 1);
		}
	},
	
	/* 
	Method: setRollover
		private function
		
		Create a new rollover element in menu if it doesn't exist
	
	Return:
		(void)
	 */
	
	setRollover: function(){
		if (this.rollover) {
			return;
		}
		this.rollover = new UI.Element({
			skin: this.options.skin,
			type: this.options.rolloverType,
			styles: {
				position: 'absolute',
				zIndex: 1
			}
		}).inject(this.element);
	},
	
	/* 
	Method: moveRollover
		private function
		
		Move the rollover to a new location (menu item)
	
	Arguments:
		menuItem - (element) Rollover will be moved to this menu item position
	
	Return:
		(void)
	 */
	
	moveRollover: function(menuItem){
		var coord = menuItem.getCoordinates(this.element);
		 this.setRollover();
		
		if (this.activeItem) {
			this.activeItem.element.fireEvent('defaultArrow');
			this.activeItem.setState('default');
		}
		
		this.rollover
		.setSize(coord.width, coord.height)
		.setStyles({
			display: 'block',
			top: coord.top,
			left: coord.left
		});
		menuItem.setState('over');

		this.activeItem = menuItem;
	},
	
	/* 
	Method: removeRollover
		private function
	
		Remove the rollover from menu and destroy it
	
	Return:
		(void)
	 */
	
	removeRollover: function(){
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
		private function
	
		Remove the current submenu as well as submenus if needed
	
	Return:
		(void)
	 */
	
	removeSubmenu: function(){
		if(this.activeItem && this.activeItem.submenu) {
			this.activeItem.element.fireEvent('defaultArrow');
			this.activeItem.submenu.hide(this.props.hideFxDuration);
		}
	},
	
	/* 
	Method: setPosition
		private function
		
		Set the menu position relatively to parent element. Parent could be a menu element or any dom element
	
	Arguments:
		el - (element) Parent element who will define menu position
	
	Return:
		(void)
	 */
	
	setPosition: function(el){
		var elCoordinates 	= el.getCoordinates();
		var menuCoordinates = this.element.getCoordinates();
		this.element.setStyle('height', menuCoordinates.height);
		
		var left,
			top;
		
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
					if (menuItem.selected) {
						selected = menuItem;
					}
				});
			}
			top = (!selected) ? 
				elCoordinates.top - this.content.getStyle('paddingTop').toInt() :
				elCoordinates.top - selected.getCoordinates(this.element).top;
			
			this.element.setStyles({
				'top': top + 1,
				'left': elCoordinates.left - 1
			});
			var windowScroll = Window.getScroll();
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
				left = elCoordinates.left - menuCoordinates.width+2;
				corners[1] = 0;
			} else {
				// menu on right
				left = elCoordinates.right-2;
				corners[0] = 0;
			}
			if (menuCoordinates.height < (Window.getHeight() - elCoordinates.top + Window.getScroll().y)) {
				// menu is under
				top = elCoordinates.top - this.content.getStyle('paddingTop').toInt();
			} else if(menuCoordinates.height < (elCoordinates.top - Window.getScroll().y)) {
				// menu is over
				top = elCoordinates.bottom - menuCoordinates.height + this.content.getStyle('paddingTop').toInt();
				corners = [4,4,corners[1],corners[0]];
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
    	private function

		Set corners radius for canvas draw
	
	Return:
		(void)
	  
	Discussion:
		is really needed anymore?
	*/
	
	setCorners: function(corners){
		this.props.layers['default'].radius = corners;
	},
	
	/* 
	Method: addScrolls
		private function
	
		Add scrolls to menu
	
	Return:
		(void)
	*/
	
	addScrolls: function(){
		this.scrolls = new UI.MenuScroller({
			skin: this.options.skin,
			element: this.element,
			content: this.content,
			margin: this.options.scrollMargin,
			props: this.props,
			onScroll: function(){
				this.removeSubmenu();
				this.removeRollover();
			}.bind(this)			,
			onResize: function(){
				var size = this.element.getSize();
				this.setSize(size.x, size.y);
			}.bind(this)
		});
		
		this.addEvent('removeScrolls', function(){
			this.scrolls.removeScrolls();
			this.removeEvents('removeScrolls');
		}.bind(this));
	},
	
	goDown : function(){
		this.moveRollover(this.items[++this.currentIndex]);
	},
	
	goUp : function(){
		this.moveRollover(this.items[--this.currentIndex]);
	},
	
	/* 
	Method: inject
		inject the menu and draw the canvas. Overwrite the inject method of <UI.Element>
	
	Arguments:
		element - (element) Injection target
		target - (string) Determine where to inject.
	
	Return:
		this
	 */
	
	inject: function(element, target){
		this.time = $time();
		this.fireEvent('inject');
		
		this.element.inject(element, target);
		this.setSize();
		
		if (this.options.position != 'over') {
			if (this.options.target) {
				this.setPosition(this.options.target);
			}
			else {
				this.setPosition(element);
			}
			this.setCanvas();
			this.setStyle('visibility', 'visible');
		} else {
			this.setCanvas();
		}
		
		this.fireEvent('addArrows');
		
		if (this.options.closeOnRollout) {
			this.paint.canvas.addEvent('mouseleave', function(){
				this.fireEvent('closeMenu');
			}.bind(this));
		}
		
		return this;
	},
	
	/* 
	Method: show
		Show the menu
	
	Arguments:
		parent - (element) Menu location will be determine relatively to this element
		x - (integer) (optional) new menu width
		y - (integer) (optional) new menu height
	
	Return:
		this
	
	See also:
		<UI.Element::show>
	 */
	
	show : function(parent, x, y) {
		ui.controller.element.closeMenu = this.fireEvent.bind(this, 'closeMenu');
		ui.controller.element.menu = this;
		this.time = $time();
		this.element.setStyle('display', 'block');
		this.setPosition(parent);
		this.setSize(x, y);
		this.parent();
		return this;
	},
	
	/* 
	Method: hide
		Hide the submenu, and clean it (remove rollover, remove scrolls, ...)
	
	Arguments:
		duration - (integer) Fade out duration, in milliseconds
	
	Return:
		this		
	 */
	
	hide: function(duration){
		if (!$defined(duration)) {
			duration = this.props.hideFxDuration;
		}
		
		ui.controller.element.menu = false;
		this.fireEvent('hide');
		this.removeSubmenu();
			
		if (!duration){
			this.setStyle('display', 'none');
			this.removeRollover();
			this.fireEvent('removeScrolls');
		} else {
			var fx = new Fx.Tween(this.element, {
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
		Clear menu content
	
	Return:
		this
	 */
	
	empty: function(){
		this.content.empty();
		return this;
	}
	
});/*
	Class: UI.Toolbar
		Create a dropdown menubar to create menu bar or window's toolbar
		
	Extends:
		<UI.Menu>
	
	Arguments:
			options
			
	Options:
		menu - (array) Menu definition, same as in <UI.Menu>
		openOnRollover - (boolean) When set to true, toolbar's elements will react on mouse over
		closeOnRollout - (boolean) When set to true, toolbars's submenu will react on mouse leave to close themself
	
	Example:
		(start code)
		var toolbar = new UI.Toolbar({
				container: this.main.content,
				menu: [{
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
		
	Implied global:
		UI,ui,
		$,$clear,$empty,$time,
		Class,Event,Fx,
		window
		
	Members:
		Extends, Menu, Toolbar, Tween, action, actionDelay, activeItem, 
	    addEvent, addEvents, addItemStyles, addSubmenu, addSubmenuEvents, bind, 
	    build, closeMenu, closeOnRollout, color, component, controller, delay, 
	    down, duration, each, element, fireEvent, float, fontColor, getParent, 
	    getSize, getStyle, getWidth, hide, hideFx, hideFxDuration, hideSubmenu, 
	    initialize, inject, menu, menuWithAction, menus, mousedown, mouseenter, 
	    mouseleave, mouseup, moveRollover, onComplete, openOnRollover, options, 
	    overflow, parent, position, props, register, removeRollover, 
	    removeSubmenu, rolloverType, setBehavior, setCanvas, setSize, setStyle, 
	    setStyles, start, stop, styles, submenu, tag, time, width, x, zIndex
*/

UI.Toolbar = new Class({
	
	Extends: UI.Menu,
	
	options: {
		// default options
		tag: 'div',
		menus: [],
		zIndex: 4000,
		openOnRollover: false,
		closeOnRollout: false,
		
		// styles
		rolloverType: 'toolbarRollover',
		component: 'toolbar'
	},

 	initialize: function(options){
        this.parent(options); //will call initalize of UI.ELEMENT
    },
	
	/*
	Function: build
		private function
		
		Overwrite <UI.Menu::build> to set custom toolbar's style
	
	Return:
		(void)
	
	See also:
		<UI.Menu::build>
		<UI.Element::build>
	*/
	
	build: function(){
		
		this.addItemStyles();
		this.parent();
		
		this.element.setStyles({
			position: 'relative',
			width: '100%',
			overflow: 'hidden'
		});
	},
	
	setBehavior: function(){

		this.addEvent('onCloseMenu', function(){
			this.removeSubmenu();
			(function(){this.removeRollover();}.bind(this)).delay(this.props.hideFxDuration);
			ui.controller.element.closeMenu = $empty;
		}.bind(this));
	},
	
	/* 
	Method: inject
		inject the toolbar and draw the canvas. Overwrite the inject method of <UI.Menu>
	
	Arguments:
		element - (element) Injection target
		target - (string) Determine where to inject.
	
	Return:
		this
	 */
	
	inject: function(element, target){
		this.fireEvent('inject');
		this.setStyle('visibility', 'visible');
		this.element.inject(element, target);
		this.setSize($(element).getWidth(), false);
		this.setCanvas();
		ui.controller.element.register(this);
		this.fireEvent('injected');
		
		window.addEvent('resize', function(){
			this.setSize(this.element.getParent().getSize().x);
		}.bind(this));
		
		return this;
	},
	
	
	/* 
	Method: addItemStyles
		set Styles for each item
	
	Arguments:
	
	Return:
		this
		
	Discussion: 
		not really nice...
	 */
	
	
	addItemStyles : function(){			
		this.options.menu.each(function(item){
			item.options = item.options || {};
			item.options.styles = {
				'float': 'left',
				color: this.props.fontColor
			};
		}, this);
	},
	
	/* 
	Method: addSubmenuEvents
		private function
	
		Overwrite the addSubmenuEvents method of UI.Menu to manage mousedown events, ...
	
	Arguments:
		item - (object) Object containing element properties
		menuItem - (element) Menu item where events will be attached
	
	Return:
		(void)
		
	See also:
		<UI.Menu::addSubmenuEvents>
	*/
	
	addSubmenuEvents: function(item, menuItem){
		if(item.menu) {
			menuItem.element.addEvents({
				'mousedown' : function(e){
					ui.controller.element.closeMenu(e);
					if (this.activeItem != menuItem) {
						this.time = $time();
						if (!item.action) {
							this.addSubmenu(item, menuItem, 'bottom');
							this.moveRollover(menuItem);
						} else {
							// first push icon, then manage action with delay
							this.menuWithAction = (function(){
								if (this.activeItem && this.activeItem.submenu) {
									this.activeItem.submenu.hide(0);
								}
								this.moveRollover(menuItem);
								this.addSubmenu(item, menuItem, 'bottom');
								this.menuWithAction = false;
							}).delay(this.props.actionDelay, this);
						}
					}
					var ev = new Event(e).stop();
				}.bind(this),
				'mouseup' : function(){
					if ($time() - this.time > 800) {
						this.fireEvent('closeMenu');
					}
				}.bind(this),
				'mouseenter': function(){
					if (this.activeItem && this.activeItem != menuItem && !item.action) {
						if (this.activeItem.submenu) {
							this.activeItem.submenu.hide(0);
						}
						this.addSubmenu(item, menuItem, 'bottom');
						this.moveRollover(menuItem);
					} else if (this.options.openOnRollover) {
						menuItem.element.fireEvent('mousedown');
					}
				}.bind(this),
				'hideSubmenu' : function(){
					if (!menuItem.submenu) {
						return;
					}
					this.hideFx = new Fx.Tween(menuItem.submenu.element, {
						duration	: this.props.hideFxDuration,
						onComplete	: function(){
							this.removeRollover();
							this.fireEvent('closeMenu');
							this.removeSubmenu();
						}.bind(this)
					}).start('opacity', 0);
				}.bind(this)
			});
		}
		
		menuItem.element.addEvents({
			'mousedown' : function(e){
				if (!item.menu && this.activeItem) {
					this.activeItem.fireEvent('hideSubmenu');
				}
				menuItem.down = true;
				var ev = new Event(e).stop();
			}.bind(this),
			'mouseleave' : function(){menuItem.down = false;},
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
	}
	
});	/*
	Class: UI.Context
		Create a context menu
		
	Extends:
		<UI.Menu>		
	
	Arguments:
		options

	Options: 
		contexts - (array) An array containing contexts definition. A context definition is an object composed of following keys :
			a name key, who is the context name,
			a target key, who define on wich elements the context menu will be attached. It could be a CSS3 target as well.
			a menu key, who is a menu list as defined in <UI.Menu>.

	Discussion:
		We must still add methods to set dynamically new contexts, ...
	
	Example:
		(start code)
		var context = new UI.Context({
			contexts : [
				{
					name : 'workspace',
					target	: '.app-workspace',
					menu		: [
						{ text		: 'Workspace menu'},
						{ text		: 'separator' },
						{
							text 	: 'Hello world...',
							action	: function(){ alert('Hello world!') }
						}
						{ text		: 'viewSource'},
						{ text		: 'separator' },
						{ text		: 'deleteCategory'}
					]
				},
				{
					name : 'pageinfo',
					target	: '[id^=pageinfo]',
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
		
	Implied global:
		UI,ui,
		$,$defined,$empty,
		Class,Event,	Window, 
		document
		
	Members:
		Context, Extends, Menu, addContexts, addEvent, bind, body, 
	    buildMenu, className, client, closeMenu, content, contexts, controller, 
	    each, element, event, getCoordinates, getElements, getHeight, 
	    getScrollLeft, getScrollTop, getWidth, height, hide, initialize, inject, 
	    left, menu, options, parent, removeContexts, removeEvents, rightClick, 
	    setCanvas, setPosition, setSize, setStyles, show, stop, target, top, 
	    trigger, type, width, x, y
*/


UI.Context = new Class({
	
	Extends: UI.Menu,
	
	options:{
		className: 'ui-menu-context',
		contexts: [],
		scope:$(document.body),
		container:$(document.body),
		trigger: 'contextmenu',
		type: 'context'
	},
	
	/* 
	Constructor: initialize
		Construtor
	
	Arguments:
		options - (object) options
	
	See also:
		<UI.Menu::initialize>
		<UI.Element::initialize>
	*/

	initialize: function(options){
		this.parent(options);
		if (!this.options.container) {
			this.options.container = $(document.body);
			//console.log(this.options.container)
		};
		this.addContexts(this.options.contexts,this.options.container);
		this.element.hide();
		this.element.inject(this.options.container);
	},
	
	/* 
	Method: addContexts
		Attach context to elements (provided by contexts.target)
	
	Arguments:
		contexts - (array) an array containing contexts definition. See above in class' options for more details
	
	Return:
		this
	*/
	
	addContexts: function(contexts,container){
		contexts.each(function(context){
			container.getElements(context.target).each(function(el){
				el.addEvent(this.options.trigger, function(e){
					new Event(e).stop();
					this.hide(0);
					this.buildMenu(context.menu);
					this.show(e);
				}.bind(this));
				this.element.addEvent('contextmenu', function(e){
					new Event(e).stop();
				});
			},this);
		},this);
		
		return this;
	},
	
	/* 
	Method: removeContexts
		Remove context to elements (defined by target)
	
	Arguments:
		target - (string) target defining elements where context will be detached
	
	Return:
		this
	*/
	
	removeContexts: function(target){
		document.body.getElements(target).each(function(el){
			el.removeEvents('contextmenu');
		},this);
		
		return this;
	},	
	
	/* 
	Method: setPosition
		private function
		
		Overwrite the setPosition method of UI.Menu to use mouse coordinates to set menu location
	
	Arguments:
		x - (integer) X mouse's coordinates
		y - (integer) Y mouse's coordinates
	
	Return:
		(void)
	
	See also:
		<UI.Menu::setPosition>
		
	*/
	
	setPosition: function(x,y){
		if (!$defined(x) || !$defined(y)) {
			return;
		}
				
		var coordinates = this.element.getCoordinates();
		var top = y+this.options.container.getScrollTop();
		var left = x+this.options.container.getScrollLeft();
		
		if ((x + coordinates.width + 20) > this.options.container.getWidth()) {left =  left - coordinates.width;}
		if ((y + coordinates.height + 20) > this.options.container.getHeight())	{top =  top - coordinates.height;}
		
		this.element.setStyles({
			'top' : top,
			'left' : left
		});
	},
	
	/* 
		Method: show
			private function
			
			Overwrite the show method of UI.Menu to use mouse coordinates
		
		Arguments:
			e - (event) Event who provide cursor's position
		
		Return:
			this
		
		See also:
			<UI.Menu::show>
			<UI.Element::show>
	*/
	
	show: function(e){
		this.parent();
		
		ui.controller.element.closeMenu = function(event){
			if (event.rightClick || this.options.event != 'contextmenu') {
				ui.controller.element.closeMenu = $empty;
				this.hide(0);
			} else {
				ui.controller.element.closeMenu = $empty;
				this.hide(300);
			}
			
		}.bind(this);
		
		//ui.controller.element.closeMenu = this.fireEvent.bind(this, 'closeMenu');
		var coord = this.content.getCoordinates();
		this.setSize(coord.width, coord.height);
		this.setPosition(e.client.x,e.client.y);
		this.setCanvas();

	}

});
/*
	Class: UI.Menu.Scroller
		Manage scrolls for menus. Calls to this class are transparently handled by <UI.Menu>
	
	Arguments:
			options
			
	Options: 
		wheel - (integer) Scroll increment when wheel is used
		speed - (integer) A speed increase factor, by default set to 12
		margin - (integer) Determine remaining margin on top and bottom when a menu is too large to feet in window
		target - (element) Menu element where scrolls will be attached
		onScroll - (function) function to fire on menu scrolling
		onResize - (function) function to fire on menu resizing
	
	Returns:
		void
		
	Example:
		(start code)
		this.scrolls = new UI.Scrolling.Menu({
			target : this.view,
			onScroll : function(){
				this.removeSubmenu();
			}.bind(this),
			onResize : function(){
				this.view.canvas.draw();
				if (this.shadow) this.shadow.show(this.container);
			}.bind(this)
		});
		(end)
		
	Implied global: 
		$clear 273 329 388 436, 
		$empty 68 69, 
		Class 58, 
		Element 164 242 300, 
		Event 194, 
		Events 60, 
		Options 60, 
		UI 58 254 312, 
		Window 101 107 237 295 361 414, 
		window 305 306
		
	Members:
		Element, Implements, MenuScroller, addDownArrow, addEvent, 
	    addEvents, addUpArrow, arrowDown, arrowUp, bind, bottom, canvas, class, 
	    className, content, destroy, element, fireEvent, getCoordinates, 
	    getHeight, getScroll, getStyle, grab, height, initialize, inject, left, 
	    margin, marginBottom, marginTop, mouseout, mouseover, onResize, 
	    onScroll, options, overflow, paddingBottom, paddingTB, paddingTop, 
	    periodical, position, removeEvents, removeScrolls, resetSize, 
	    scrollDown, scrollUp, scroller, setBehavior, setOptions, setStyle, 
	    setStyles, setWrapper, skin, speed, state, stop, styles, target, toInt, 
	    top, type, wheel, width, wrapper, y, zIndex
*/

UI.MenuScroller = new Class({

	Implements: [Events, Options],
	
	options: {
		className: 'ui-scrollbar',
		wheel: 8,
		speed: 12,
		margin: 20,
		target: 'element',
		onScroll: $empty,
		onResize: $empty
	},
	
	/* 
	 Constructor: initialize
	 Construtor
	 
	 Arguments:
	 options - (object) options
	 */
	initialize: function(options){
		this.setOptions(options);
		
		this.element = this.options.element;
		this.content = this.options.content;
		this.margin = this.options.margin;
		
		this.resetSize();
		this.setWrapper();
		this.setBehavior();
	},
	
	/* 
	 Method: setNewSize
	 private function
	 
	 Determine the menu position, it size and scrolls direction
	 
	 Return:
	 (void)
	 */
	resetSize: function(){
		var windowScroll = Window.getScroll();
		var elementCoordinates = this.element.getCoordinates();
		elementCoordinates.top -= windowScroll.y;
		elementCoordinates.bottom -= windowScroll.y;
		var arrows = [0, 0];
		this.element.setStyle('display', 'none');
		var windowHeight = Window.getHeight();
		
		if (elementCoordinates.top <= this.margin && elementCoordinates.bottom > windowHeight - this.margin) {
			//stick out on both sides (top and bottom)
			this.content.setStyles({
				'top': elementCoordinates.top - this.margin
			});
			this.element.setStyles({
				'top': this.margin,
				'height': windowHeight - this.margin * 2
			});
			arrows = [1, 1];
		}
		else 
			if (elementCoordinates.bottom > windowHeight - this.margin) {
				//stick out on bottom
				this.element.setStyles({
					'height': windowHeight - elementCoordinates.top - this.margin
				});
				arrows[1] = 1;
			}
			else 
				if (elementCoordinates.top <= this.margin) {
					//stick out on top
					this.content.setStyles({
						'top': elementCoordinates.top - this.margin
					});
					this.element.setStyles({
						'top': this.margin + windowScroll.y,
						'height': elementCoordinates.bottom - this.margin
					});
					arrows[0] = 1;
				}
		this.element.setStyle('display', 'block');
		if (arrows[0]) {
			this.addUpArrow();
		}
		if (arrows[1]) {
			this.addDownArrow();
		}
	},
	
	/* 
	 Method: addWrapper
	 private function
	 
	 Add a wrapper to the menu content to allow overflow
	 
	 Return:
	 (void)
	 */
	setWrapper: function(){
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
			paddingTop: 0,
			paddingBottom: 0
		});
	},
	
	/* 
	 Method: setBehavior
	 private function
	 
	 Add mousewheel event
	 
	 Return:
	 (void)
	 */
	setBehavior: function(){
		this.element.addEvent('mousewheel', function(e){
			var ev = new Event(e).stop();
			if (e.wheel > 0) {
				this.scrollUp(e.wheel);
			}
			else {
				this.scrollDown(e.wheel);
			}
		}.bind(this));
	},
	
	/* 
	 Method: removeScrolls
	 private function
	 
	 Remove scrolls and scrolls events
	 
	 Return:
	 (void)
	 */
	removeScrolls: function(){
		this.content.setStyles({
			'top': 0,
			paddingTop: this.paddingTop,
			paddingBottom: this.paddingBottom
		});
		this.element.setStyles({
			height: 'auto',
			top: 'auto'
		}).grab(this.content).removeEvents('mousewheel');
		this.wrapper.destroy();
		this.fireEvent('destroyArrows');
	},
	
	/* 
	 Method: addUpArrow
	 private function
	 
	 Add the up arrow element and events to manage it
	 
	 Return:
	 (void)
	 */
	addUpArrow: function(){
		var windowScroll = Window.getScroll();
		var elementCoord = this.element.getCoordinates();
		elementCoord.top -= windowScroll.y;
		elementCoord.bottom -= windowScroll.y;
		
		this.arrowUp = new Element('div', {
			'class': 'ui-menu-arrow-up'
		}).setStyles({
			position: 'absolute',
			width: elementCoord.width,
			height: elementCoord.top + 20,
			top: -elementCoord.top,
			left: 0,
			zIndex: 2
		}).inject(this.element, 'bottom');
		
		// new element to inject
		this.arrowUp.canvas = new UI.Element({
			width: elementCoord.width,
			height: 20,
			skin: this.options.skin,
			type: 'menuArrow',
			state: 'up'
		}).setStyles({
			position: 'absolute',
			bottom: 0,
			zIndex: -1
		}).inject(this.arrowUp);
		
		var self = this;
		
		this.arrowUp.addEvents({
			'mouseover': function(){
				self.scroller = self.scrollUp.periodical(30, self, 2);
			},
			'mouseout': function(){
				$clear(self.scroller);
			}
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
	 private function
	 
	 Add the down arrow element and events to manage it
	 
	 Return:
	 (void)
	 */
	addDownArrow: function(){
		var windowScroll = Window.getScroll();
		var elementCoord = this.element.getCoordinates();
		elementCoord.top -= windowScroll.y;
		elementCoord.bottom -= windowScroll.y;
		
		this.arrowDown = new Element('div', {
			'class': 'ui-menu-arrow-down'
		}).setStyles({
			position: 'absolute',
			width: elementCoord.width,
			height: window.getHeight() - elementCoord.bottom + 20,
			bottom: elementCoord.bottom - window.getHeight(),
			left: 0,
			zIndex: 2
		}).inject(this.element, 'bottom');
		
		// new shape to inject
		this.arrowDown.canvas = new UI.Element({
			width: elementCoord.width,
			height: 20,
			skin: this.options.skin,
			type: 'menuArrow',
			state: 'down'
		}).setStyles({
			position: 'absolute',
			top: 0,
			zIndex: -1
		}).inject(this.arrowDown);
		
		this.arrowDown.addEvents({
			'mouseover': function(){
				this.scroller = this.scrollDown.periodical(30, this, -2);
			}.bind(this)			,
			'mouseout': function(){
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
	 private function
	 
	 Scroll the menu down
	 
	 Arguments:
	 e - (event) Event handling mousewheel
	 
	 Return:
	 (void)
	 */
	scrollDown: function(e){
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
			}
			else {
				if (!this.arrowUp) {
					this.addUpArrow();
				}
				this.content.setStyle('top', this.content.getStyle('top').toInt() - this.options.speed * (-e));
			}
		}
		else 
			if (this.arrowDown) {
				if (!this.arrowUp) {
					this.wrapper.setStyle('height', contentCoordinates.height + this.paddingTB);
					this.element.setStyle('height', contentCoordinates.height + this.paddingTB);
					this.element.setStyle('top', this.element.getStyle('top').toInt() + this.paddingTB);
					this.fireEvent('resize');
				}
				else {
					this.content.setStyle('top', elementCoordinates.height - contentCoordinates.height - this.paddingTB);
				}
				$clear(this.scroller);
				this.arrowDown.destroy();
				this.arrowDown = false;
			}
	},
	
	/* 
	 Method: scrollUp
	 private function
	 
	 Scroll the menu up
	 
	 Arguments:
	 e - (event) Event handling mousewheel
	 
	 Return:
	 (void)
	 */
	scrollUp: function(e){
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
			}
			else {
				if (!this.arrowDown) {
					this.addDownArrow();
				}
				this.content.setStyle('top', this.content.getStyle('top').toInt() + this.options.speed * e);
			}
		}
		else 
			if (this.arrowUp) {
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
	

	Extends:
		<UI.Element>
	
	Require:
		<UI>
		<UI.Element>
		<UI.Scrollbar>
		
	Arguments:
		options
		
	Options:
		- width - (integer/string) Width of the view wrapper in px or percent
		- height - (integer/string) Height  of the view wrapper in px or percent
		- overflow - (string) hidden, scrollbar or menu
		- tag - (string) Element's tag
		- contentTag - (string) Content's tag
		
		- content - (object) Object containing content element's options
		- onLoadComplete - (function) Function to fire on list load complete
	
	Returns:
		View object.
		
	Example:
		(start code)
		var view = new UI.View({
			width			: 260,
			height			: 400,
			scroll			: true 
		}).setContent('content','content view');
		(end)
		
		
	Implied global: 
		UI,
		Class,Element,Request,Scroller
		
	Members:
		Element, Extends, HTML, JSON, Scrollbar, View, _setOverflow, 
	    addEvent, addEvents, bind, build, buildOverlay, buildScrollbar, 
	    component, components, container, content, contentTag, destroy, element, 
	    fireEvent, get, height, hide, iframe, inject, loadCompplete, method, 
	    onChange, onComplete, onInject, onLoadComplete, options, overflow, 
	    overlay, parent, position, props, resize, scrollbar, scroller, send, 
	    set, setAjaxContent, setAjaxNuContent, setContent, setHtmlContent, 
	    setIFrameContent, setJsonContent, setProperties, setScrollbar, 
	    setScroller, setStyle, setStyles, show, skin, start, tag, update, 
	    updateSize, url, useOverlay, width
*/

UI.View = new Class({

	Extends: UI.Element,
		
	options: {
		component: 'view',
		
		width: '100%',
		height: '100%',
		
		overflow: 'scrollbar', // hide, scrollbar or scrollmenu
		tag: 'span',
		contentTag: 'div', // 
		content: {},
		useOverlay: true,
		scrollbar: {}
		
		// implemented events		
		/*
		onLoadComplete: $empty,
		onResize: $empty
		*/
	},

	/*
	Method: build
		private function
		
		Creates html structure and inject it to the dom. The view is build with two elements: the wrapper and the content. 
		If the option overflow is set to true, it will also add the scrollbar object

	Returns:
		(void)
	
	See also:
		<UI.Element::build>
	*/

	build: function() {
		this.parent();
		
		this._setOverflow();
		
		this.show();
	},
 	
	/*
	Method: buildOverlay
		private function
		
		create an overlay displayed when view is disabled (when moved or resized)
	
	Returns:
		(void)
	 */

	buildOverlay: function() {
		this.overlay = new Element('div',this.props.components.overlay)
		 .inject(this.element);

		this.addEvents({
			'onLoadComplete' : function() { 
				this.overlay.hide(); 
			}
		});
		 
	},

	/*
    Method: setOverflow
    	private function

		Manage overflow and set scrololbar if needed or requested
	
	Returns:
		(void)
	*/

	_setOverflow: function() {
		if (this.options.overflow != 'hidden') { 
			this.content = new Element( this.options.contentTag,  this.options.content )
			 .setStyles( {
				height :'100%',
				position : 'relative',
				overflow:'hidden',
				margin:'0'
			}).inject(this.element);

			if (this.options.overflow == 'hidden') {
				this.content.setStyle('overflow','hidden');	
			}
			
			if (this.options.overflow == 'scrollbar') {
				this.setScrollbar();
			}
			
			if (this.options.overflow == 'scroller') {
				this.buildScrollbar();
			}
			
			this.content.addEvents({
				onInject : function(){
					this.updateSize();
				}.bind(this)
			});
		} else { 
			this.content = this.element; 
		}
	},
	
	/*
	Method: buildScrollbar
		private function
		
		Creates a new scrollbar object attached to the view
	
	Returns:
		(void)
	*/
	
	setScrollbar: function(){
		if (this.options.skin) {
			this.options.scrollbar.skin = this.options.skin;
		}
		this.options.scrollbar.container = this.content;
		
		this.scrollbar = new UI.Scrollbar(this.options.scrollbar);
				 
		this.addEvents({
			'loadCompplete': function() { this.scrollbar.update(); },
			'resize': function() { 	this.scrollbar.update(); }
		 });
	},
	
	
	/*
	Method: buildScrollbar
		private function
		
		Creates a new scrollbar object attached to the view
	
	Returns:
		(void)
	*/
	
	setScroller : function() {
		this.scroller = new Scroller(this.content, this.options.scroller)
		 .addEvents({
		 	onChange : function(x,y) {	
				this.scrollbar.update();
			}.bind(this)
		});
			
		this.scroller.start();
	},
	

	/*
	Function: setContent
		Set Content of the Container (really basic)
	
	Arguments:
		method - (string) ajax, ajaxnu, json, content, html or iframe
		source - (string) source's url
	
	Returns:
		(void)
	*/
	
	setContent: function(method,source){
		switch (method) {
			case 'ajax' || 'xhr':
				this.setAjaxContent(source);
				break;
			case 'ajaxnu':
				this.setAjaxNuContent(source);
				break;
			case 'json':
				this.setJsonContent(source);
				break;
			case 'content' || 'html':
				this.setHtmlContent(source);
				break;
			case 'iframe':
				this.setIFrameContent(source);
				break;	
		}
		
		return this;
	},
	
	/*
	Function: setHtmlContent
		Set html Content
	
	Arguments:
		source - (string) source's html
	
	Returns:
		this
	*/

	setHtmlContent: function(source){
		this.content.set('html',source);
		this.fireEvent('loadComplete');
		this.fireEvent('resize');
		return this;
	},
	
	/*
	Function: setAjaxContent
		Set ajax Content
	
	Arguments:
		source - (string) source's url
	
	Returns:
		this
	*/
	
	setAjaxContent: function(source){
		if (this.iframe) {
			this.iframe.destroy();
		}
		
		var request = new Request.HTML({
			url: source,
			update: this.content,
			method: 'get',
			onComplete: function(){
				this.fireEvent('loadComplete');
				this.fireEvent('resize');
			}.bind(this)
		}).send();
		
		return this;
	},
	
	/*
	Function: setAjaxContent
		Set ajax content
	
	Arguments:
		source - (string) source's url
	
	Returns:
		this
	*/
	
	setAjaxNuContent: function(source) {
		var self = this;
		
		var request = new Request.HTML({
			url: source,
			method: 'get',
			onComplete: function(responseTree,responseElements,responseHTML,responseJS){
				var list = [responseHTML,responseTree,responseElements,responseJS];
				self.fireEvent('onLoadComplete',list);
				self.fireEvent('resize');
			}
		}).send();
		
		return this;
	},
	
	/*
	Function: setJsonContent
		Set JSON content
	
	Arguments:
		source - (string) source's url
	
	Returns:
		this
	*/
	
	setJsonContent: function(source) {
		var request = new Request.JSON({
			url: source,
			onComplete : function(response){
				this.fireEvent('loadComplete',new Array(response));
				this.fireEvent('resize');
			}.bind(this)
		}).get();
		
		return this;
	},
	
	/*
	Function: setIFrameContent
		Set ajax content
	
	Arguments:
		source - (string) iFrame's url
	
	Returns:
		this
	*/
	
	setIFrameContent: function(source) {		
		if (!this.iframe) {
			if (this.content) {
				this.content.destroy();
			}
			if (this.scrollbar) {
				this.scrollbar.destroy();
			}
			
			this.iframe = new IFrame(this.props.components.iframe)
			.setStyles({
				height:'100%',
				width:'100%',
				margin:0,
				padding:0,
				border:0
			})
			.setProperties({height:'100%',width:'100%'})
			.inject(this.element);
		}
		
		this.iframe.set('src',source)
		 .addEvent('load',function(){
		 	this.fireEvent('loadComplete');
			this.fireEvent('resize');
		}.bind(this));
		
		if (this.options.useOverlay) {
			this.buildOverlay();
		}

		return this;
	}
});

/*
	Class: UI.ListView
		The UI.ListView class defines objects that manage the list.
	
	Extends:
		<UI.View>
	
	Require:
		<UI.Canvas>
		<UI.Skin>
		<UI.Element>
		<UI.View>
		<UI.Scrollbar>
		
	Arguments:
		options
		
	Options:
		itemType - (string)
		scroll - (boolean) react on scrollwheel if set to true
		data - (array)
	
	Returns:
		Listview object.
		
	Example:
		(start code)
		var listview = new UI.ListView({
			url: 'data.php?id=42',
			width: 260,
			height: 400,
			scroll: true 
		}).inject(this.content);
		(end)	

	Implied global:
		UI,
		$H,
		Class,Request 

	Members: 
		Element, Extends, JSON, ListView, View, addEvent, addItems, 
	    bind, build, component, components, content, data, each, element, erase, 
	    fireEvent, get, getData, height, html, inject, item, itemObject, 
	    itemType, items, label, onSuccess, options, parent, props, scroller, 
	    setScroller, skin, styles, type, url, width
*/

UI.ListView = new Class({

	Extends: UI.View,
		
	options: {
		component: 'listview',
		
		data: [],
		
		itemObject: 'Button',
		
		item: {
			component: 'itemList',
			type: 'default',
			label: false
		},
		
		scroller : false,
		
		/*{
			area:  40,
			velocity: 2,
			fps:50
		},*/
		
		width: '100%',
		height: '100%',
		itemType: 'itemList'
	},
	
	/*
	Method: build
		private function
	
		call <UI.View::build>, get listview's data then process list

	Returns:
		(void)

	See also:
		<UI.View::build>
	*/

	build: function() {
		this.parent();
		
		this.getData(this.options.url);
		
		if (this.options.scroller) {
			this.setScroller(this.options.scroller);
		}
	},
	
	
	
	
	/*
	Method: getData
		private function
	
		get data by doing an ajax request if url is defined, or using data set in options
	
	Arguments:
		url - (string) Url where to get data
		options - (object) class options

	Returns:
		(void)
	*/

	getData: function(url, options){
		if (this.options.url) {
			var request = new Request.JSON({
				url: url,
				onSuccess: function(response,text){
					this.addItems(response);
				}.bind(this)
			}).get();
			
		}
		else {
			this.addEvent('injected', function(){
				this.addItems(this.options.items);
			}.bind(this));
		}
	},

	/*
	Function: processList
		private function
		
		Parse datas and inject them in view content.
	
	Arguments:
		data - (object) data to be used during template interpolation
	
	Return:
		this
	*/

	addItems: function(items){
		
		if (this.options.skin) {
			this.options.item.skin = this.options.skin;
		}
			
		items.each(function(object){
			var item = new UI[this.options.itemObject](this.options.item)
			.inject(this.content);
			
			$H(object).erase('type').each(function(value,key){
				var o = new UI.Element({
					html: value,
					styles: this.props.components[key].styles
				}).inject(item.element);
				this.fireEvent('resize');
			}, this);
		}, this);
	}
});
/*
	Class: UI.PaneView
		Creates a paneView Object that let you browse inner views(panes)
	
	Extends:
		<UI.View>
		
	Arguments:
		options
		
	Options:
		see <UI.View>
		
	Returns:
		Paneview object.
		
	Example:
		(start code)
		new UI.PaneView({
			url				: 'data.php?id=42',
			width			: 260,
			height			: 400,
		}).inject(this.content);
		(end)
	
	Discussion:
		Need to make some more cleaning in this class
		
	Implied global: 
		UI,
		$empty,
		Class,Fx
		
	Members:
		Extends, PaneView, Quad, Scroll, Transitions, View, add, 
	    addEvent, applyTransition, build, className, component, content, 
	    destroy, direction, duration, each, easeOut, element, erase, float, 
	    getLast, getSize, height, indexOf, inject, list, next, onTransition, 
	    options, overflow, pane, parent, previous, properties, push, remove, 
	    removeAllNext, resize, scrollbar, setBehaviour, setStyle, styles, 
	    toElement, transition, transitionFx, transitionType, update, wait, 
	    width, x
		
	*/

UI.PaneView = new Class({
	
	Extends: UI.View,
	
	options: {
		className: 'ui-paneview',
		component: 'view',
		properties: {},
		styles: {
			width: '100%',
			height: '100%',
			overflow:'hidden'
		},
		overflow:'slide',
		direction: 'horizontal',
		transitionType: 'scroll',
		transitionFx: {
			transition: Fx.Transitions.Quad.easeOut,
			duration: 300,
			wait: false
		},
		pane: {
			className: 'ui-paneview-pane',
			styles: {
				'float': 'left',
				width: '200px',
				height: '100%'
			}
		},
		onTransition: $empty
	},

	/*
	Method: build
		private function
		
		Overwrite <UI.View::build>. Create mainview

	Returns:
		(void)
	*/

 	build: function (){
		this.list = [];
		this.parent();
		this.setBehaviour();
		
		
	},
	/*
    Function: setBehaviour
   
    	Add pane(subview), intect it in the container, resize container and return it

	*/
	
	setBehaviour : function(){
		this.transitionFx = new Fx.Scroll(this.element, this.options.transitionFx);
	},

	/*
    Function: add
   
    	Add pane(subview), intect it in the container, resize container and return it

	*/
	
	add: function(){
		var pane = new UI.View(this.options.pane)
		 .inject(this.content);
		
		this.list.push(pane);
		
		this.addEvent('resize',function(){
			pane.scrollbar.update();
			
		});

		this.resize();	
		return pane;
	},

	/*
    Function: applyTransition
   
    	Set the given pane as active and move to it 

	*/


	applyTransition: function(pane){
		this.pane = pane;
		
		if (this.element.getSize().x < this.content.getSize().x) {

			this.transitionFx.toElement(pane);
		} else {
			//if (pane.element.getPrevious())
			//	this.transitionFx.toElement(pane.element.getPrevious());
		}
	},


	/*
    Function: next
   
    	Find the next pane from the list and move to it if exist

	*/

	next: function(){
		var next = this.list.indexOf(this.pane)+1;
				
		if (this.list[next]) {
			this.applyTransition(this.list[next]);		
		}
	},

	/*
    Function: previous
   
    	Find the previous pane from the list and move to it if exist

	*/

	previous: function(){
		var prev = this.list.indexOf(this.pane)-1;
		if (this.list[prev]) {
			this.applyTransition(this.list[prev]);		
		}
	},

	/*
    Function: resize
   
    	Resize main view content to fit its components (to enbable slide)
    
    Note: maybe can be accomplish using css but dont know how yet

	*/
	
	resize: function(){
		var size = 0;
		
		this.list.each(function(pane,index) {
			size = size + pane.element.getSize().x;			  
		});

		this.content.setStyle('width',size+'px');
	},

	/*
    Function: inject
   
    	Inject the main view element into its container

	*/

	inject: function(container){
		this.element.inject(container);
		return this;
	},


	/*
    Function: remove
   
    	Destroy the main element view 

	*/

	remove: function(element){
		element.destroy();
	},

	/*
    Function: removePane
   
    	Destroy the given wrapper pane 
    	
    Note: it seems that the pop function that remove the pane from the list doesn't work

	*/
	
	removeAllNext: function(pane) {
		var last = this.list.getLast();
		while (last != pane) {
			this.list.erase(last);
			last.destroy();
			last = this.list.getLast();
		}
	}
	
	
	
});
/*
 Class: UI.TabView
 Creates a tabbar that let you manage inner view.
 
 Extends:
 <UI.View>
 
 Example:
 (start code)
 var tabview = new UI.TabView({
 resizable: true,
 tabs : [
 {
 name : 'Mootools',
 url	: 'assets/pulp1.json'
 },
 {
 name : 'MooLego',
 url	: 'assets/pulp2.json',
 selected : true
 }
 ]
 }).inject(document.body);)
 (end)
 Implied global:
 - MooLego - UI,
 - MooTools - Class -
 
 
 Members:
 Button, Element, Extends, TabView, View, add, addEvent,
 addEvents, bind, build, buildTabs, component, components, container,
 content, each, element, fireEvent, height, hide, initialize, inject,
 label, length, name, onClick, options, overflow, parent, props, push,
 scrollbar, selected, setActiveTab, setBehavior, setContent, setState,
 setStyle, show, state, tab, tabbar, tabs, type, update, url, view
 */
UI.TabView = new Class({

    Extends: UI.View,
    
    options: {
        component: 'tabview',
        overflow: 'hidden'
    },
    
    /*
     Function: build
     private function
     
     Creates html structure and inject it to the dom.
     
     See also:
     <UI.View::build>
     <UI.Element::build>
     */
    build: function(){
        this.list = [];
        
        this.parent();
        this.buildTabs();
        this.buildView();
        
        this.options.tabs.each(function(tab){
            this.add(tab);
        }.bind(this));
    },
    
    
    /*
     Function: add
     
     Create tabbar and add tabs
     */
    buildTabs: function(){
        var container = '';
        if (this.options.container) {
            container = this.options.container;
        }
        else {
            container = this.element;
        }

        this.tabbar = new UI.Element(this.props.components.tabbar).inject(container);
    },
    
    /* 
     Function: buildView
     private function
     
     Create a new view of the define type and attach related window events
     
     Returns:
     (void)
     
     Discussion:
     We should setup a better switch to build view according its type
     */
    buildView: function(){
        this.tabview = new UI.View({
            overflow: 'hidden',
            styles: {}
        }).inject(this.content);
        
        this.addEvents({
            injected: function(){
                this.updateSize();
                this.tabview.fireEvent('onResize');
            }
        });
    },
    /*
     Function: add
     
     Create tab and its related view and addEvent
     */
    add: function(props){
        var view = new UI.View({
            type: 'tab'
        }).inject(this.tabview).hide();
        
        var tab = new UI.Button({
            type: 'tab',
            label: props.name,
            onClick: function(){
                if (tab == this.tab) {
                    return;
                }
                
                // to be continued...
                
                if (props.url && !view.element.retrieve('loaded')) {
                    view.setContent('ajax', props.url);
                    view.element.store('loaded', true);
                }
                
                view.show();
                view.scrollbar.update();
                
                if (this.view) 
                    this.view.hide();
                
                
                tab.options.state = 'active';
                
                
                if (this.tab) {
                    this.tab.options.state = 'default';
                    this.tab.setState('default');
                }
                
                this.tab = tab;
                this.view = view;
            }
.bind(this)
        });
        
        this.addEvent('resize', function(){
            view.scrollbar.update();
        });
        
        if (props.selected) {
            this.selected = tab;
        }
        
        this.list.push(tab);
        
        tab.index = this.list.indexOf(tab);
    },
    
    /*
     Function: setContent
     
     Set Content of the current view (tab)
     */
    setContent: function(method, source, options){
        this.active.setContent(method, source, options);
    },
    
    /*
     Function: setBehavior
     
     Set some behaviours
     */
    setBehavior: function(){
        this.parent();
        
        this.addEvent('injected', function(){
            var item = this.selected || this.list[0];
            item.options.state = 'active';
            this.list.each(function(tab){
                tab.inject(this.tabbar);
            }
.bind(this));
            item.setState('active');
            item.fireEvent('click');
        });
    },
    
    
    /*
     Function: setSize
     Set window's frame size and updateSize
     
     Returns:
     this
     
     See also:
     <UI.Element::setSize>
     */
    setSize: function(width, height, state){
        this.parent(width, height, state);
        this.updateSize();
        
        return this;
    },
    
    /*
     Function: updateSize
     Update size and position of the window inner components
     
     Returns:
     (void)
     */
    updateSize: function(){
        element = this.element.getComputedSize();
        
        // hummm...
        
        this.tabbarHeight = this.tabbar.getComputedSize().totalHeight;
        //this.tabbar.setSize(element.width,'21');
        var view = this.tabview.getComputedSize();
        
        var viewHeight = element.height - this.tabbarHeight - (view.computedBottom + view.computedTop);
        this.tabview.setStyle('height', viewHeight);
        this.fireEvent('onResize');
    },
    
    /*
     Function: setActiveTab
     
     Set wich tab should be activated
     */
    setActiveTab: function(num){
        if (num > 0 && num <= this.list.length) {
            this.list[--num].setState('active');
            this.list[num].fireEvent('click');
        }
    },
    
    /*
     Function: next
     
     Set next tab active. nothing if last.
     */
    next: function(num){
        if (num > 0 && num <= this.list.length) {
            this.list[--num].setState('active');
            this.list[num].fireEvent('click');
        }
    }
    
});
/*
	Class: UI.SplitView
		The UI.SplitView class splits views.
	
	Extends:
		<UI.View>
	
	Require:
		<UI.Canvas>
		<UI.Skin>
		<UI.Element>
		<UI.View>
		<UI.Scrollbar>
		
	Arguments:
		options
		
	Options:
	
	Returns:
		Listview object.
		
	Example:
		(start code)
		var splitview = new UI.SplitView({
			width			: 260,
			height			: 400,
		}).inject(document.body);
		
		splitview.views[0].setContent('ajax','side.php');
		splitview.views[1].setContent('ajax','content.php');
		
		(end)
		
		
	Implied global: 
		UI,
		Class,Element,Hash
	
	Members:
		Extends, SplitView, View, addEvent, bind, build, buildSplitter, 
	    buildViews, component, components, draglimit, each, element, fireEvent, 
	    getCoordinates, getSize, inject, left, limit, makeDraggable, minSize, 
	    onDrag, options, overflow, parent, props, push, setStyle, size, 
	    splitter, updateSize, view, views, x, y
	*/

UI.SplitView = new Class({
	
	Extends: UI.View,
	
	options: {
		component: 'splitview',
		
		overflow: 'hidden',
		minSize: 20,
		
		splitter: true
	},
	
	build: function(){
		this.parent();

		this.addEvent('injected', function(){
			this.size = this.getSize();
							
			this.buildViews();
			if (this.options.splitter) {
				this.buildSplitter();
			}
		
		}.bind(this));
	},
	
	/*
		function : buildViews
		
			Get Information from components skin and build views

	 */
	
	buildViews: function() {
		this.view = [];
		var list = new Hash(this.props.views);
		
		list.each( function(props,name){
			var view = new UI.View(props)
			 .inject(this.element);	 
			this.view.push(view);
			this[name] = view;
		},this);

		this.view[1].element.setStyle('width', this.size.x - this.view[0].getSize().x);
	},

	/*
		function : buildSplitter
		
			Build splitter element depending on skin def
		
		
	 */

	buildSplitter: function() {
		var props = this.props.components.splitter;
		
		this.draglimit = {
			x: [this.options.minSize,  this.size.x-this.options.minSize],
			y: [0, 0]
		};
		
		this.splitter = new Element('div',props)
		.inject(this.element);
		
		this.splitter.makeDraggable({
			limit: this.draglimit,
			onDrag: this.updateSize.bind(this)
		});
		
		this.splitter.setStyle('left',this.view[0].getSize().x);
	},

	/*
		function : resize
		
			resize 
		
		
	 */

	updateSize: function() {
		this.view[0].element.setStyle('width', this.splitter.getCoordinates().left - this.element.getCoordinates().left);
		this.view[1].element.setStyle('width', this.size.x - this.view[0].element.getSize().x);
		
		this.fireEvent('resize');
	}
	
});/*
	Class: UI.Window
		The UI.Window class defines objects that manage and coordinate the windows an application displays on the screen.
	
	Require:
		<UI.Element>
		<UI.Canvas>
		<UI.Skin>
		<UI.Button>
		<UI.Control>
		<UI.View>
	
	Extends:
		<UI.Element>
	
	Arguments:
		Options
		
	Options: 
		- title - (string) title displayed in the head titlebar.
		- type - (string) define the type of the window (default, transparent).
		- location - (string)  Could be either 'custom','center' or 'cascade'. Override top and left options if defined - default to custom.
		- width - (number) Width of the container wrapper in px.
		- height - (number) Height  of the container wrapper in px.
		- top	- (number) Position of the container wrapper in px from the top.
		- left - (number) Position of the container wrapper in px from the left.
		- right - (number) Position of the container wrapper in px from the right.
		- bottom - (number) Position of the container wrapper in px from the bottom.
		- position - (string) Define if position is "fixed". Default to 'absolute.
		- state - ('normalized','maximized','normalized') Define the initial state - default to normalized.
		- useEffects - (boolean) Define if effects should be implemented.
		- resizable - (boolean) Define if the window is resizable.
		- draggable - (boolean) Define if the window is draggable.
		- scrollbar - (boolean) Define if the container should use scrollbar.
		- register - (bolean) Define if the window should be handle by the window manager.
		- status - (bollean) Define if the window should use a statusbar.
		- url	- (string) Define the url from the window content.
	
	Example:
		(start code)
		var win = new UI.Window({
			width 	: 760,
			height	: 600,
			title	: 'a moolego window',
		}).setContent('iframe','http://ui.moolego.org');
		(end)
	
	
	Implied global:
		- Moolego - UI
		- Mootools - $, $empty, $merge, Class, Element, Window
		- Javascript - document
	
	Members:
		Button, Element, Extends, Label, TabView, Toolbar, View, 
	    Window, adaptLocation, addEvent, addEvents, bind, body, borderSize, 
	    bottom, build, buildControls, buildFoot, buildHead, buildResizer, 
	    buildToolbar, buildView, canvas, close, component, components, 
	    container, content, control, controller, controls, disableSelect, 
	    display, dragHandlers, dragLimitX, dragLimitY, draggable, each, element, 
	    enableDrag, fireEvent, focus, foot, getCascadeLocation, 
	    getCenterLocation, getCoordinates, getHeight, getInitialLocation, 
	    getMinimizedLocation, getSize, getStyle, getWidth, head, height, hide, 
	    inactive, initialize, inject, injected, layers, left, location, 
	    maximize, maximized, minimize, minimized, mousedown, mouseenter, 
	    mouseleave, mouseover, normalize, onBlur, onClose, onDragComplete, 
	    onDragStart, onFocus, onLoad, onMaximize, onMinimize, onNormalize, 
	    onResizeComplete, onResizeStart, onRestore, opacity, options, overflow, 
	    overlay, parent, position, propagateUnderShadow, props, push, register, 
	    resetMinimizedLocation, resizable, resizeComplete, resizeLimitX, 
	    resizeLimitY, resizeOnDragIfMaximized, resizer, right, scrollbar, set, 
	    setBehavior, setContent, setLocation, setSize, setState, setStatus, 
	    setStyle, setStyles, setTitle, show, size, skin, state, status, styles, 
	    tabView, tabbar, tag, title, toggle, toggleInterface, toolbar, top, 
	    type, updateSize, useEffects, view, visibility, width, window, 
	    x, y, zIndex
	
	Discussion:
		Effects still need to be implemented as option
*/

UI.Window = new Class({
	Extends: UI.Element,
	
	options: {
		component: 'window',
		title: 'Window',
		
		// Size options
		width: 640,
		height: 480,
		
		// location options
		location: 'cascade',
		position: 'fixed',
		top: false,
		left: false,
		right: false,
		bottom: false,
		zIndex: 'auto', // to get zIndex from skin or an Int as zIndex
		tag: 'div',
		
		// Components Options
		head: true,
		view: {},
		foot: true,
		
		// 		
		controls: ['close', 'minimize', 'maximize'],
		scrollbar: true,
		
		// Not Implemented should be able to enable/disable effects
		useEffects: false,
		
		// Drag options
		draggable: true,
		dragLimitX: [-1000, window.getWidth() + 1000],
		dragLimitY: [51, window.getHeight() + 1000],
		dragHandlers: ['head', 'foot'],
		hideOnDrag : false,
		
		// Resize options
		resizable: true,
		resizeLimitX: [200, Window.getWidth()],
		resizeLimitY: [200, Window.getHeight()],
		resizeOnDragIfMaximized: false,
		
		onMinimize: $empty,
		onMaximize: $empty,
		onRestore: $empty,
		onLoad: $empty,
		onBlur: $empty,
		onFocus: $empty,
		onClose: $empty
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
		// call parent constructor
		this.parent(options);
		
		// set window position
		var location = this.getInitialLocation();
		this.options.top = location.top;
		this.options.left = location.left;
		this.element.setStyles(location);
		this.adaptLocation();

		//set the position (absolute or fixed)
		if (this.options.position == 'fixed'){
			this.props.styles.position = 'fixed';
			this.element.setStyle('position', 'fixed');
		}

		ui.controller.window.register(this);
		ui.controller.window.focus(this);
	},
	
	/* 
	Function: build
		private function
		
		Creates html structure and inject it in the dom.
	
	Return:
		(void)
	
	See also:
		<UI.Element::build>
	*/
	build: function() {	
		this.parent();

		this.buildHead();
		this.buildView();
		this.buildFoot();
		
		this.inject(this.options.container || $(document.body));
		
		if (this.paint) {
			this.paint.canvas.addEvent('click', function(e){
				ui.controller.window.propagateUnderShadow(e);
			});
		}
	},

	/* 
	Function: buildHead
		private function
		
		Create a new head element, set class and styles and inject
	
	Returns:
		(void)
	*/	
	buildHead: function(){
		// create new dom element as head of the window
		this.head = new Element('div', this.props.components.head)
		.inject(this.element);
		
		//
		this.dragHandlers.push(this.head);
		this.head.disableSelect();	
		
		
		if (this.options.skin) {
			this.props.components.title.skin = this.options.skin;
		}
		
		this.props.components.title.skin = this.options.skin;
		
		this.title = new UI.Label(this.props.components.title)
		 .inject(this.head);
		
		this.setTitle(this.options.title);
		this.buildControls(this.options.controls);
		
	},

	/*
	Function: buildControls
		private function
		
		Create window controls that allow window close, maximize and minimize
	
	Returns:
		(void)
	*/
	buildControls: function(){
		if (!this.options.controls) { return; }
			
		var controllist = [];
		this.controls = new Element('div',this.props.components.controls)
		.addEvent('click',function(e) { e.stop(); })
		.inject(this.head);
		
		this.options.controls.each(function(action){
			this.props.components.control.type = action;
			this.props.components.control.skin = this.options.skin;
			
			var button = new UI.Button(this.props.components.control)
			.addEvent('onClick', this.control.bind(this, action))
			.inject(this.controls);	
			
			controllist.push(button);
		},this);
		
		this.addEvents({
			'onMinimize': function() { this.controls.hide(); },
			'onNormalize': function() { this.controls.show(); }
		});
	},
	
	/*
    Function: buildToolbar
    	Build the window's toolbar. and attach related events
    
    Arguments:
    	toolbar - (object) Toolbar's options object. See <UI.Toolbar>
    
    Returns:
    	this
		
	Discussion:
		it should be passed as options when the application instanciates its window
	*/
	buildToolbar: function(toolbar){
		toolbar.skin = this.options.skin;
		
		this.toolbar = new UI.Toolbar(toolbar).inject(this.head);

		// not really nice because related to a specific layer ... 
		if (this.paint) {
			this.props.layers.head.size[1] = this.head.getSize().y;
		}
		
		this.props.components.toggle.skin = this.options.skin;
		
		var toggle = new UI.Button(this.props.components.toggle)
		.addEvent('onClick', this.toggleInterface.bind(this))
		.inject(this.head);	
		
		this.addEvents({
			onMinimize: function() { 
				this.toolbar.element.hide() ;
				toggle.hide();
			},
			onNormalize: function() {
				this.toolbar.element.show();
				toggle.show();
			}
		});
		
		this.updateSize();
		this.fireEvent('render', this.state);
		
		return this;
	},

	/* 
	Function: buildView
		private function
		
		Create a new view of the define type and attach related window events
	
	Returns:
		(void)
		
	Discussion:
		We should setup a better switch to build view according its type
	*/
	buildView : function() {
		if (this.options.tabView) {
			this.buildTabview();
		} else {
			// should be merge depending on certain conditions 
			if (this.options.skin) 
				this.options.view.skin = this.options.skin;
			
			if (!this.options.view.type)
				this.options.view.type = this.props.components.view.type;
			
			this.options.view.overflow = this.options.overflow;
			var props = $merge(this.props.components.view,this.options.view);
			props.skin = this.options.skin;
			this.view = new UI.View(props)
			.inject(this.element);
		}
		
		this.addEvents({
			injected: function() { this.view.fireEvent('onResize'); },
			onMinimize: function() { this.view.hide(); },
			onNormalize: function() { this.view.show(); this.setSize(); }
		});
		
		this.content = this.view.content;
	},
	/* 
	Function: buildTabview
		private function
		
		Create a new tabview of the define type
	
	Returns:
		(void)
	*/
	buildTabview: function() {
		var options = this.options.tabView;
		this.options.tabView.container = this.element;
		this.options.tabView.skin = this.options.skin;
			
		this.view = new UI.TabView(this.options.tabView)
		.inject(this.element);
	},

	/* 
	Function: buildFoot
		private function
		
		Create a new foot container and inject resize handler and statusbar in it
	
	Returns:
		(void)
	*/
	buildFoot: function() {
		if (!this.options.foot || this.foot) { return; }
		
		this.foot = new Element('div', this.props.components.foot)
		.inject(this.element);

		this.foot.disableSelect();
			
		this.status = new Element('div',this.props.components.status)
		.inject(this.foot);
		
		this.dragHandlers.push(this.status);
		
		this.setStatus();
		
		this.addEvents({
			'onMinimize': function() { this.foot.hide(); },
			'onNormalize': function() { this.foot.show(); }
		});
	},

	/*
	Function: buildResizeHandler
		private function
		
		Add specific events  for resizer in window
	
	See also:
		<UI.Element::buildResizer>
	
	Returns:
		(void)
	*/
	buildResizer: function() {
		this.parent();
		
		this.addEvents({
			'minimize': function() { this.resizer.hide(); },
			'normalize': function() { this.resizer.show(); }
		});
	},
	
	/*
	Method: toggleInterface
		The action method for the "Hide Toolbar" menu item (which alternates with "Show Toolbar").
	
	Returns:
		this
	*/
	toggleInterface: function() {
		if (this.toolbar.element.getStyle('display') == 'block') {
			
			// newt line is vorbidden
			
			if (this.paint) {
				this.props.layers.head.size[1] = this.head.getSize().y;
			}
			this.toolbar.element.hide();
		} else {
			this.toolbar.element.setStyles({
				opacity: 1,
				visibility: 'visible',
				display: 'block'
			});
			
			// next line is vorbidden
			if (this.paint) {
				this.props.layers.head.size[1] = this.head.getSize().y;
			}
		}
		
		if (this.foot) {
			if (this.foot.getStyle('display') == 'block') {
				this.foot.hide();
			}
			else {
				this.foot.setStyles({
					opacity: 1,
					visibility: 'visible',
					display: 'block'
				});
			}
		}
		
		this.updateSize();
		this.setSize(this.element.x,this.element.y);
		this.fireEvent('onResizeDrag');
		this.fireEvent('render', this.state);
		
		return this;
	},

	/*
	    Function: setBehavior
	    	private function
	    	
	    	Define the specific window behavior
	    
	    Returns:
	    	(void)
	    
	    See also:
	    	<UI.Element::setBehavior>
	*/
	setBehavior: function(){
		this.parent();
		
		// bizarre bizarre...
		this.setStyle('position','fixed');
		
		this.addEvents({
			mousedown : this.focus.bind(this),
			resizeComplete: function(){
				this.maximized = false;
				var coord = this.element.getCoordinates();
				this.options.width = coord.width;
				this.options.height = coord.height;
			}.bind(this)
		});

		this.addEvents({
			'onBlur': function(){
				if (this.view.iframe) this.view.overlay.show();
				this.controls.setStyle('opacity', '.49');
			},
			'onFocus': function(){
				if (this.view.iframe) this.view.overlay.hide();
				if (this.controls) {
					this.controls.setStyle('opacity', '.99')
				}
			},
			'onResizeStart': function(){
				if (this.view.iframe) this.view.overlay.show();
			},
			'onResizeComplete': function(){
				if (this.view.iframe) this.view.overlay.hide();
			},
			'onDragStart': function(){
				if (this.options.hideOnDrag) {
					this.view.hide();
				} else if (this.view.iframe) {
					this.view.overlay.show();
				}
			},
			'onDragComplete': function(){
				if (this.options.hideOnDrag) {
					this.view.show();
				}
				else 
					if (this.view.iframe) {
						this.view.overlay.hide();
					}
			}
		});
	},

	/*
	Function: enableDrag
		private function
		
		Add draggable capabilities for the window.
	
	Returns:
		(void)
	
	See also:
		<UI.Element::enableDrag>
	*/
	enableDrag: function(){
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
	
	Returns:
		(void)
	*/
	focus: function(){
		if (this.minimized){
			this.normalize();
			ui.controller.window.resetMinimizedLocation();
		} else if (this.maximized && this.options.resizeOnDragIfMaximized) {
			this.normalize();
		} else {
			ui.controller.window.focus(this);
		}
		
		if (this.state != 'default') {
			this.setState('default');
		}
	},

	/*
    Function: minimize
		This action method displays the minimized window
	
	Returns:
		(void)
	*/
	minimize : function() {
		this.fireEvent('onMinimize');
		this.maximized = false;
		this.minimized = true;

		var size = {
			width: this.skin.minimized.width,
			height: this.skin.minimized.height
		};
		
		this.setSize(size.width,size.height,'minimized');
		
		this.setState('minimized', size);
		var coord = ui.controller.window.getMinimizedLocation();

		this.setLocation(coord[0], coord[1]);
		this.setStyle('position', 'fixed');
		ui.controller.window.focus();
	},

	/*
	Function: maximize
		private function
		
		This action method set the size to fit the window container
	
	Returns:
		(void)
	*/
	maximize: function(){
		if(this.maximized) {
			this.normalize();
		} else {
			var width = Window.getWidth() - this.computedSize.computedLeft - this.computedSize.computedRight;
			var height = Window.getHeight() - this.options.dragLimitY[0] - this.computedSize.computedBottom - this.computedSize.computedTop;
			
			this.setSize(width,height);
			var coord = this.getCoordinates();
			
			this.computedSize.computedLeft
			
			this.options.top = coord.top;
			this.options.left = coord.left - this.computedSize.computedLeft;
			this.element.setStyles({
				top: this.options.dragLimitY[0],
				left: 0
			});
			
			this.minimized = false;
			this.maximized = true;
			this.fireEvent('onMaximize');
			this.fireEvent('onResizeDrag');
		}
	},

	/*
	Function: normalize
		Normalize window
	
	Returns:
		(void)
	*/
	normalize: function(){
		this.fireEvent('onNormalize');
		
		var size = {
			width: false,
			height: false
		};
		
		this.updateSize();
		this.setState('default', size);
		
		this.setLocation();
		
		ui.controller.window.focus(this);
		
		this.maximized = false;
		this.minimized = false;
		this.fireEvent('onResizeDrag');
	},		

	/*
	Function: getInitialLocation
		private function
		
		Return the initial location depending on location options and window's size
	
	Returns:
		coordinates - (object) Object containing top and left properties
	*/
	getInitialLocation: function(){
		if (this.options.top || this.options.right || this.options.bottom || this.options.left) {
			//right || left
			var left = (this.options.right && !this.options.left) ? 
				Window.getWidth() - this.options.right - this.options.width : 
				this.options.left;
			
			//top || bottom
			var top = (this.options.bottom && !this.options.top) ? 
				Window.getHeight() - this.options.bottom - this.options.height : 
				this.options.top;
			
			return { 
				top: top, 
				left: left
			};
		} else if (this.options.location == 'center') {
			return this.getCenterLocation();
		} else {
			var c = ui.controller.window.getCascadeLocation(this);
			return { 
				top: c.top, 
				left: c.left 
			};
		}
	},

	
	/*
	Function: updateSize
		Update size and position of the window inner components
	
	Returns:
		(void)
	*/
	updateSize: function(){
		element = this.element.getComputedSize();

		if (this.options.head && !this.headSize) {
			this.headHeight = this.head.getComputedSize().totalHeight;
		}
		if (this.options.foot && !this.footSize) { 
			this.footHeight = this.foot.getComputedSize().totalHeight;
		}
		if (this.options.tabView) { 
			this.view.tabbar.setStyle('width', element.x);
		}
		if (this.paint && this.props.layers.head.size) {
			this.props.layers.head.size[1] = this.head.getSize().y;
			this.skin.inactive.layers.head.size[1] = this.head.getSize().y;
		}
		var view = this.view.element.getComputedSize();
		var viewHeight = element.height - this.headHeight - this.footHeight - (view.computedBottom + view.computedTop);
		this.view.setStyle('height', viewHeight);
		this.view.fireEvent('onResize');
	},

	/*
	Function: setSize
		Set window's frame size and updateSize
	
	Returns:
		this
	
	See also:
		<UI.Element::setSize>			
	*/  

	setSize: function(width, height, state){
		this.parent(width, height, state);
		this.updateSize();
		
		return this;
	},	
	
	/* 
	Function: setTitle
		set title html
	
	Arguments:
		html - (string) html formatted title
	
	Returns:
		this
	*/
	setTitle: function(html){
		return this.title.set('html',html);

	},

	/*
    Function: setContent
    	Set Content of the Window View. See <UI.View::setContent> for arguments details
    
    Arguments:
    	method - (string)
    	source - (string)
    	options - (object)
    
    Returns:
    	this
	*/
	
	setContent: function(method,source,options){
		return this.view.setContent(method,source,options);
	},
	
	/*
    Function: setStatus
    	Set Status of the Window foot
    
    Arguments:
    	html - (string) html formatted new status
    
    Returns:
    	this
	*/
	setStatus: function(html){
		this.status.set('html',html);
		return this;		
	},

	/*
	Function: control
		handle window controls' actions
      
	Arguments:
		actions - (string) minimize,maximize,close
	
	Returns:
		this
	*/	
	control: function(action){
		this[action]();
		return this;
	},
	
	/*
    Function: close
		Close window
      
	Returns:
		(void)
	*/	
	close: function(){
		ui.controller.window.close(this);
		
		this.fireEvent('onClose');
	}
});

/*
	Object: ui.controller.window
		Window controller. It handles windows cascading position, minimize position, focusing, ...
	
	Arguments:
		options - (object)
	
	Options:
		zBase - (integer)
		zStep - (integer)
		cascade - (object)
		stack - (object)
	
	Requires:
		<UI.Window>
	
	
	Implied global:
		ui,
		$defined,
		window

	Members:
		active, addEvent, bind, blur, cascade, clean, client, close, 
	    closeAll, controller, destroy, each, element, fireEvent, focus, 
	    getCascadeLocation, getCoordinates, getHeight, getMinimizedLocation, 
	    getStyle, getWidth, height, hide, left, length, list, location, log, 
	    minimized, morph, offsetHeight, offsetWidth, options, 
	    propagateUnderShadow, push, register, resetMinimizedLocation, 
	    resizeMaximizedWindow, s, setLocation, setSize, setState, setStyle, 
	    stack, start, state, step, style, toInt, top, version, width, window, x, 
	    y, zBase, zIndex, zStep
	
	Discussion:
		Stacks should be better implemented
		
*/

ui.controller.window = {
	options: {
		version: '0.1a',
		zBase: 2000,
		zStep: 1,
		cascade: {
			start: {
				x: 51,
				y: 101
			},
			step: {
				x: 20,
				y: 20
			},
			offset : [170,50]
		},
		stack: {
			offsetWidth: 4,
			offsetHeight: 4
		}
	},
	
	/* 
	Constructor: initialize
		Construtor
	
	Arguments:
		options - (object) options
	
	Returns:
		(void)
	*/
	
	start: function(){
		this.list = [];
		this.zIndex = this.options.zBase;
		
		window.addEvent('resize', function(){ this.resizeMaximizedWindow(); }.bind(this));
	},
	/*
	Function: register
		Add passing window to the manage list

	Arguments:
		win - (object) the window class instance to register
	
	Returns:
		(void)
	*/
	
	register: function(win) {
		this.list.push(win);
		if (win.options.zIndex == 'auto') {
			win.element.setStyle('zIndex', this.zIndex);
		}
		else {
			win.element.setStyle('zIndex', win.options.zIndex);
		}
		this.zIndex += this.options.zStep;
	},
	/*
	Function: close
		Destroy the provided window and focus to next one

	Arguments:
		win - (object) the window class instance to close and destroy
	
	Returns:
		(void)
	*/
	close: function(win) {
		win = win || this.active; 
		win.hide();
		win.fireEvent('onClose');
		for (var i = this.list.length - 1; i >= 0; i--) {
			if (this.list[i] == win) {
				win.destroy();
				delete this.list[i];
				this.list = this.list.clean();
			}
		}
		this.focus();
	},
	
	/*
	Function: focus
		Increment max z-index and focus provided window

	Arguments:
		win - (object) the window class instance to focus
	
	Returns:
		(void)
	*/
	focus: function(win) {
		
		if (!$defined(win)) {
			//make next highest window focus
			var zIndex = 0;
			var window;
			for (var i = this.list.length - 1; i >= 0; i--) {
				var windowZIndex = this.list[i].element.getStyle('zIndex');
				if (windowZIndex >= zIndex && !this.list[i].minimized) {
					window = this.list[i];
					zIndex = windowZIndex;
				}
			}
			
			if (window) {
				window.focus();
			}
			
			return;
		} else if (win && this.active != win) {
			if (this.active && !this.active.minimized) {
				this.blur(this.active);
			}
			
			this.zIndex += this.options.zStep;
			win.element.style.zIndex = this.zIndex;
			
			this.active = win;
			win.fireEvent('focus');
			return;
		}
	},
	
	/*
	Function: blur
		Blur active window

	Arguments:
		win - (object) the window class instance to blur
	
	Returns:
		(void)
	*/
	blur: function(win) {
		if ($defined(win) && !win.minimized) {
			win.setState('inactive');
			win.fireEvent('onBlur');
		} else if (this.active) {
			this.blur(this.active);
		}
	},
	
	minimize: function() {
		this.active.minimize();
	},
	
	/*
	Function: getMinimizedLocation
		Return the position of next minimized window
	
	Returns:
		location - (array) Array containing left and top position	  
	 */	
	getMinimizedLocation: function() {
		var x = -150;
		var y = window.getHeight()-35;
		
		this.list.each(function(w,i) {
			if (w.state == 'minimized') {
				x += w.getStyle('width').toInt() + 8;
			}
		});
		
		return [x, y];
	},
	
	/*
	Function: resetMinimizedLocation
		Replace minimized windows
	
	Returns:
		(void)
	*/
	resetMinimizedLocation : function(){
		var x = -150;
		var y = window.getHeight()-35;
		this.list.each(function(win) {
			if (win.state == 'minimized') {
				x += win.getStyle('width').toInt() + 4;
				win.setLocation(x, y);
			}
		});
	},

	/*
	Function: resizeMaximizedWindow
		Set new maximized size for all mamimized window 
	
	Returns:
		(void)
	*/	
	resizeMaximizedWindow: function(){
		this.list.each(function(win) {
			if (win.state == 'maximized') {
				win.setSize({
					height: window.getHeight()-53,
					width: window.getWidth()
				});
			}
		});
	},

	/*
	Function: getCascadeLocation
		Calculate the location of the window in the cascade

	Arguments:
		win - (object) the window class instance to get location

	Returns:
		location - (object) location coordinates { left : 100, top : 100 }
	*/
	getCascadeLocation: function(win){
		var location = {
			left : 71,
			top : 121
		};
		
		this.list.each(function(w,i) {
			if (w.state != 'minimized' && w.options.location == 'cascade') {
				location.left += this.options.cascade.step.x;
				location.top += this.options.cascade.step.y;
			}
		},this);
		return location;
	},
	/*
	Function: propagateUnderShadow
		private function
		
		Propagate click from shadow offset to the back window
	
	Arguments:
		e - (event) Event handling click
	
	Returns:
		(void)
		
	*/
	propagateUnderShadow : function(e){
		var x = e.client.x;
		var y = e.client.y;
		var z = 0;
		var s = '';
		this.list.each(function(win,i) {
			var c = win.element.getCoordinates();
			if ( c.left <= x && x <= c.left + c.width && c.top <= y && y < c.top + c.height) {
				if ( win.element.getStyle('z-index') > z ) {
					z = win.element.getStyle('z-index');
					s = win;
				}
				s.focus();
			}
		});
	},

	/*
	Function: cascade
		Move every windows to its position in the cascade
	
	Returns:
		(void)
	*/
	cascade: function(group){
		var start = [51,101];
		var offset = [20,20];
		var zIndex = this.zIndex;
		var last;
		
		this.list.each(function(win){
			if (win.state != 'minimized') {
				
				win.element.style.zIndex = zIndex++;
				
				start[0] += offset[0];
				start[1] += offset[1];
				
				win.element.morph({
					'left': start[0],
					'top': start[1]
				});
				
				win.location = 'cascade';
				last = win;
			}
		});
		
		this.zIndex = zIndex;
	},
	
	closeAll: function(){
		this.list.each(function(win){
			this.close(win);			
		},this);
	}
};

ui.controller.window.start();


/*
	Class: UI.Dialog
		The UI.Dialog class defines objects that manage and coordinate the dialog an application displays on the screen.
	
	Arguments
		options
	
	Options:
			width
			height
	
	Example:
		(start code)
		var dialog = new UI.Dialog({
			width': 		'260',
			height': 		'400',
		});
		(end)
	
	Discussion:
		Still we need this class? yes
	
	Implied global: 
		UI,
		$, 
		Class,Element,
		document
	
	Members 
		Button, Dialog, Extends, Window, addEvent, backgroundColor, 
	    bind, body, build, buildButtons, buildMessage, buildUnderlay, buttons, 
	    center, components, content, control, controls, destroy, each, element, 
	    foot, head, height, inject, left, location, log, message, opacity, 
	    options, padding, parent, position, props, resizable, scrollbar, set, 
	    setStyle, setStyles, styles, title, top, type, underlay, view, width, 
	    zIndex
	
*/

UI.Dialog = new Class({
	Extends		:	UI.Window,
	
	options: {
		center: true,
		title: 'Dialog',
		
		// Default size
		width: 480,
		height: 200,
		
		// Components Options
		head: true,
		controls: ['close'],
		view: {},
		foot: false,
		message : 'message',
		location: 'center',
		scrollbar: false,
		
		resizable: false,
		
		buttons: []
	},
	
	
	build:function(){
		this.buildUnderlay();
		
		this.parent();
		
		// should be handle by the conroller!
		this.element.setStyle('zIndex','1000');
		
		this.buildMessage();
		this.buildButtons();
		
	},
	
	buildUnderlay: function() {
		
		// and that by the skin!		
		this.underlay = new Element('div',{
			styles: {
				position: 'absolute',
				top:'0',
				left:'0',
				width: '100%',
				height: '100%',
				opacity: '.2',
				backgroundColor: '#000',
				zIndex: '999'
			}
		}).inject($(document.body));
		
		this.addEvent('onClose',function(){ this.underlay.destroy(); });
		
	},
	
	buildMessage: function() {
		this.message = new Element('div')
		.setStyles({
			padding:'20px'
			
		}).set('html',this.options.message)
		.inject(this.content);
		
	},
	
	buildButtons: function() {
		
		this.buttons = new Element('div',this.props.components.controls);
		
		this.options.buttons.each(function(action){
			this.props.components.control.type = action;

			var button = new UI.Button(this.props.components.control)
			.addEvent('onClick', this.control.bind(this, action))
			.inject(this.controls);	

		},this);
	}
});/*

	Class: UI.Panel
		Build UI.Window component.
	
	Arguments:
		className - (string) css class apply to the wrapper - default 'ui-win'.
		title - (string) title dissplayed in the header titlebar.
		type - ('default''modal') define the type of the panel.
		position - ('custom','center','cascade')  override top and left options if defined - default to custom.
		width - (number) Width of the container wrapper in px.
		height - (number) Height  of the container wrapper in px.
		top	- (number) Height  of the container wrapper in px.
		left - (number) Height  of the container wrapper in px.
		state - ('normalized','maximized','normalized') Define the initial state - default to normalized.
		useEffects - (boolean) Define if effects should be implemented.
		resizable - (boolean) Define if the panel is resizable.
		draggable - (boolean) Define if the panel is draggable.
		shadow -	(boolean) Define if the panel should use a shadow.
		scrollbar - (boolean) Define if the container should use scrollbar.
		register - (bollean) Define if the panel should be handle by the panel manager.
		status - (bollean) Define if the panel should use a statusbar.
		url	- (string) Define the url from the panel content.
	
	Example:
		(start code)
		var win = new UI.panel({
			width 	: 260,
			height	: 400,
			title	: 'bonjour'
		});
		(end)
		
	Implied global:
		UI, 
		Class,
		window

	Members: 
		Extends, Panel, Window, borderSize, bottom, component, 
	    controls, dragHandlers, dragLimitX, dragLimitY, draggable, drawCanvas, 
	    foot, frame, getHeight, getSize, getWidth, head, height, left, location, 
	    options, resizable, resizeLimitX, resizeLimitY, scrollbar, setStyles, 
	    styles, tag, title, top, type, updateInnerSize, url, useEffects, 
	    useFoot, useHead, view, viewOverflow, width, wrapper, x, y, zIndex
*/

UI.Panel = new Class({
	Extends: UI.Window,
	options: {
		component: 'window',
		type: 'panel',
		title: 'Panel',
		
		// Size options
		width: 280,
		height: 400,
		
		// see UI.VIew.setContent() for information about loading window's content.
		url: false,
		
		// location options
		location: 'cascade',
		top: 0,
		left: 0,
		zIndex: 'auto', // to get zIndex from themanager or an Int as zIndex
		tag: 'div',
		
		// Components Options
		head: true,
		view: true,
		foot: false,
		
		// 		
		controls: ['close', 'minimize', 'maximize'],
		
		// Not Implemented should be able to enable/disable effects
		useEffects: false,
		viewOverflow: 'hidden',
		scrollbar: false,
		// Drag options
		draggable: true,
		dragLimitX: [-1000, window.getWidth() + 1000],
		dragLimitY: [0, window.getHeight() + 1000],
		dragHandlers: ['head'],
		
		// Resize options
		resizable: true,
		resizeLimitX: [200, window.getWidth()],
		resizeLimitY: [200, window.getHeight()]
	},
	
	build: function() {	
		this.parent();

	},

	
	/*
	 Function: updateInnerSize
	 Update size of the window inner components
	 */
	updatecInnerSize: function(){
		var wrapper = this.frame.getSize();
		var bs = this.options.borderSize;
		var borderOffset = bs * 2;
		
		var offsetHeight = 0;
		if (this.options.useHead) {
			offsetHeight = offsetHeight + this.options.styles.head.height;
		}
		if (this.options.useFoot) {
			offsetHeight = offsetHeight + this.options.styles.foot.height;
		}
		
		var bodyHeight = wrapper.y - offsetHeight;
		
		if (this.options.useHead) {
			this.head.setStyles({
				width: wrapper.x - borderOffset
			});
		}
		
		this.view.wrapper.setStyles({
			width: wrapper.x - borderOffset,
			height: bodyHeight - borderOffset
		});
		
		if (this.options.useFoot) {
			this.foot.setStyles({
				bottom: bs,
				width: wrapper.x - borderOffset
			});
		}
		
		this.drawCanvas();
		
		//this.view.updateSize();
	}
});




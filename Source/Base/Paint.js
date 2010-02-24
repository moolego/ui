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

    initialize: function(options){
        this.setOptions(options);
        this.props = this.options.props;
        
        this.build();
        this.setSize();
        
        this.draw();
    },
 
    build: function(){
        this.canvas = new Element('canvas', {
            styles: {
                position: 'absolute',
                zIndex: this.options.zIndex
            }
        });
        
        this.ctx = this.canvas.getContext(this.options.context);
    },

    setSize: function(width, height, props){
        if (props) 
            this.props = props;
        
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

    draw: function(props){
        this.processLayers(props);
        this.offset = [this.shadowSize, this.shadowSize];
        this.relSize = [this.canvasSize[0] - this.shadowSize * 2 - Math.abs(this.shadowOffset[0]), this.canvasSize[1] - this.shadowSize * 2 - Math.abs(this.shadowOffset[1])];
        this.fireEvent('complete');
    },

    processLayers: function(){
    
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

    setShadow: function(shadow){
        var opacity = shadow.opacity || 1;
        var color = shadow.color || '#000000';
        var coloralpha = 'rgba(' + color.hexToRgb(true).join(',') + ', ' + opacity + ')';
        
        this.ctx.shadowColor = coloralpha;
        this.ctx.shadowOffsetX = shadow.offsetX || 0;
        this.ctx.shadowOffsetY = shadow.offsetY || 0;
        this.ctx.shadowBlur = shadow.blur || 0;
    },

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
 
    roundedRect: function(props){
        // preparing data before drawing
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

    inject: function(target, position){
        this.canvas.inject(target, position);
        return this;
    }
});

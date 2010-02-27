
/*
 ---
 description: Draw. Contains basic drawing functions.
 
 authors: [moolego,r2d2]
 
 requires:
 - core:1.2.1: '*'
 - mooCanvas
 
 provides: [UI.Draw]
 
 ...
 */

UI.Draw = new Class({

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
	
	
    shadow: function(shadow){
        var opacity = shadow.opacity || 1;
        var color = shadow.color || '#000000';
        var coloralpha = 'rgba(' + color.hexToRgb(true).join(',') + ', ' + opacity + ')';
        
        this.ctx.shadowColor = coloralpha;
        this.ctx.shadowOffsetX = shadow.offsetX || 0;
        this.ctx.shadowOffsetY = shadow.offsetY || 0;
        this.ctx.shadowBlur = shadow.blur || 0;
    },
});
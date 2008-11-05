/*
Class: UI.Canvas.Draw
	Contains basic drawing functions

Require:
	UI.Canvas

		
*/

UI.Canvas.implement({
	/*
	Function: roundedRect
	
		Draw a rounded rectangle
		
	Arguments: this.ctx, options
	
	Options: 
		width : (integer) 
		height : (integer) 
		top : (integer)
		left :  (integer)
		radius : (integer/array for shema)
		color : (string/array) composed of two elements the top and the bottom color in hexadecimal
		opacity : (float (or array of) the opacity level in percentage. ie: 0.7  or for top and bottom opacity [0.3,1]
		pattern : not implemented  
		stroke : not implemented		
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
	
		Draw a rounded circle
		
	Arguments: props
	
	Properties: 
		left :  (integer)
		top : (integer)
		width : (integer) 
		height : (integer) 
		radius : (integer/array for shema)
		color : (string/array) composed of two elements the top and the bottom color in hexadecimal
		opacity : (float (or array of) the opacity level in percentage. ie: 0.7  or for top and bottom opacity [0.3,1]
		pattern : not implemented  
		stroke : not implemented		
	*/
	
	circle: function(props){
		//set custom transformers
		this.ctx.scale(props.size[0]/props.size[1], 1);
		
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
	
		Draw a line
		
	Arguments: this.ctx, options
	
	Options: 
		from : (array)
		to :  (array)
		width : (integer) 
		color : (string)
		opacity : (float) the opacity level in percentage. ie: 0.7
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
	
		Draw a triangle
		
	Arguments: this.ctx, options
	
	Options: 
		direction : (string) predefined must be top, right, bottom or left
		width : (integer)
		height :  (integer)
		left : (integer)
		top : (integer)
		opacity : (float) the opacity level in percentage. ie: 0.7
		color : (string)
		gradient : (array of strings) composed of two elements the top and the bottom color in hexadecimal
	*/
	
	triangle : function(props) {
		this.ctx.beginPath();
		this.ctx.moveTo(-props.size[0]/2, props.size[1]/2);
		this.ctx.lineTo( props.size[0]/2, props.size[1]/2);
		this.ctx.lineTo( 0, -props.size[1]/2);
		this.ctx.closePath();
	}	
});

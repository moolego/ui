//MooCanvas, My Object Oriented Canvas Element. Copyright (c) 2008 Olmo Maldonado, <http://ibolmo.com/>, MIT Style License.
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
Class: Utility.Canvas
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
		'canvas div, canvas div * {position:absolute;overflow:hidden;}' +
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
		this.arcScaleX = 1;
		this.arcScaleY = 1;
		this.currentX = 0;
		this.currentY = 0;
		this.miterLimit = this.Z * 1;
	},

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
		var m = this.m, Z = this.Z, Z2 = this.Z2;
		return [
			Z * (x * m[0][0] + y * m[1][0] + m[2][0]) - Z2,
			Z * (x * m[0][1] + y * m[1][1] + m[2][1]) - Z2
		];
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
		this.path[this.l++] = this.coord(x, y);
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
		this.path[this.l++] = this.coord(x,y);
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
			this.coord(cp0x, cp0y),
			this.coord(cp1x, cp1y),
			this.coord(x,y)
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
		if (this.rot === 0) rad *= this.Z;

		var x0 = a0.cos() * rad, y0 = a0.sin() * rad,
			x1 = a1.cos() * rad, y1 = a1.sin() * rad;

		if (this.rot !== 0){
			var PI = Math.PI, da = PI / 24, n = (cw) ? -1 : 1;
			if (n*a1 < a0) (cw) ? a0 += 2 * PI : a1 += 2 * PI;

			this.lineTo(x0 + x, y0 + y);
			while (n*a0 + da < a1) this.lineTo(x + (a0 += n*da).cos() * rad, y + a0.sin() * rad);
			this.lineTo(x1 + x, y1 + y);
			return;
		}

		if (x0 == x1 && !cw) x0 += 0.125;

		var Z2 = this.Z2,
			c = this.getCoords(x, y),
			aSXr = this.arcScaleX * rad,
			aSYr = this.arcScaleY * rad;

		this.path[this.l++] = [
			cw ? 'at ' : 'wa ',
			(c[0] - aSXr).round() + ',' + (c[1] - aSYr).round() +  ' ',
			(c[0] + aSXr).round() + ',' + (c[1] + aSYr).round() +  ' ',
			this.coord(x0 + x - Z2, y0 + y - Z2) + ' ',
			this.coord(x1 + x - Z2, y1 + y - Z2),
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
				['stroked=',
				['<v:fill ', !rgb ? this.processColorObject(fS) : 'color=' + color.color + ' opacity="' + color.opacity, '"></v:fill>']]
			:
				['strokeweight=' + 0.8 * this.lineWidth * this.m[0][0] + ' filled=',
				['<v:stroke',
					'endcap=', (this.lineCap == 'butt') ? 'flat' : this.lineCap,
					'joinstyle=', this.lineJoin,
					'color=', color.color,
					'opacity="', color.opacity, '" />']];

		this.element.insertAdjacentHTML('beforeEnd', [
			'<v:shape path="', this.path.join(''), 'e" coordsize="' + size + ',' + size + '" ', a[0], 'false">',
				a[1].join(' '),
			'</v:shape>'
		].join(''));

		if(fill && fS.img) this.element.getLast().fill.alignshape = false; // not sure why this has to be called explicitly

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
		var ret = '';
		if(obj.addColorStop){
			var oc0 = obj.col0, oc1 = obj.col1, stops = '';
			if(obj.stops) for (var i = 0, j = obj.stops.length; i < j; i++) stops += (100 * obj.stops[i][0]).round() + '% ' + obj.stops[i][1];
			ret += ((obj.r0) ?
				'type=gradientradial focusposition="0.2,0.2" focussize="0.2,0.2"'
			:
				'type=gradient method=linear focus=0 angle=' + 180 * (1 + obj.angle / Math.PI) + ' '
			) + [
				'color="' + oc0.color,
				'opacity="' + oc0.opacity * 100 + '%',
				'color2="' + oc1.color,
				'o:opacity2="' + oc1.opacity * 100 + '%',
				'colors="' + stops
			].join('" ');
		}

		return (obj.img) ?  'type="tile" src="' + obj.img.src : ret;
	},

	coord: function(x, y){
		var m = this.m, Z = this.Z, Z2 = this.Z2;
		return (Z * (x * m[0][0] + y * m[1][0] + m[2][0]) - Z2).round() + ',' + (Z * (x * m[0][1] + y * m[1][1] + m[2][1]) - Z2).round();
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
			d = this.getCoords(dx, dy).map(function(val){ return (val / Z).round(); });
		var props = (!m[0][1] && m[0][0] == 1) ?
			'top:' + d[1] + ';left:' + d[0] : [
			'filter:progid:DXImageTransform.Microsoft.Matrix(',
				'M11=', m[0][0], 'M12=', m[1][0],
				'M21=', m[0][1], 'M22=', m[1][1],
				'Dx=', d[0], 'Dy=', d[1], 
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
		this.angle = ((y1 - y0) / ((x1 - x0).pow(2) + (y1 - y0).pow(2)).sqrt()).acos();
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
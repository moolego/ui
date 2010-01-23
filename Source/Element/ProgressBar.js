/*
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
});
/*
Script: IframeShim.js
	Defines IframeShim, a class for obscuring select lists and flash objects in IE.

License:
	http://clientside.cnet.com/wiki/cnet-libraries#license
*/	
var IframeShim = new Class({
	Implements: [Options, Events],
	options: {
		name: '',
		className:'iframeShim',
		display:false,
		browsers: (Browser.Engine.trident4 || (Browser.Engine.gecko && !Browser.Engine.gecko19 && Browser.Platform.mac))
	},
	initialize: function (element, options){
		this.setOptions(options);
		//legacy

		this.element = $(element);
		this.makeShim();
		
		this.shim.setStyles({
			top : this.element.getStyle('top').toInt(),
			left : this.element.getStyle('left').toInt(),
			width : '100%',
			height : '100%'
		})
		return;
	},
	makeShim: function(){
		this.shim = new Element('iframe');
		this.id = this.options.name || new Date().getTime() + "_shim";
		
		var z = this.element.getStyle('z-Index')-1 || 0;
		
		if($chk(this.options.zindex) && 
			 this.element.getStyle('z-Index').toInt() > this.options.zindex)
			 z = this.options.zindex;

		this.shim.setStyles({
			'position': 'absolute',
			'zIndex': z,
			'border': 'none',
			'filter': 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'
		}).setProperties({
			'src':'javascript:void(0);',
			'frameborder':'0',
			'scrolling':'no',
			'id':this.id
		}).addClass(this.options.className);
		
		this.element.store('shim', this);

		var inject = function(){
			this.shim.inject(this.element, 'after');
			if(this.options.display) this.show();
			else this.hide();
			this.fireEvent('onInject');
		};
		if(this.options.browsers){
			if(Browser.Engine.trident && !IframeShim.ready) {
				window.addEvent('load', inject.bind(this));
			} else {
				inject.run(null, this);
			}
		}
	},
	position: function(shim){
		if(!this.options.browsers || !IframeShim.ready) return this;
		var before = this.element.getStyles('display', 'visibility', 'position');
		this.element.setStyles({
			display: 'block',
			position: 'absolute',
			visibility: 'hidden'
		});
		var size = this.element.getSize();
		this.element.setStyles(before);
		if($type(this.options.margin)){
			size.x = size.x-(this.options.margin*2);
			size.y = size.y-(this.options.margin*2);
			this.options.offset.x += this.options.margin; 
			this.options.offset.y += this.options.margin;
		}
 		this.shim.setStyles({
			'width': size.x,
			'height': size.y
		});
		return this;
	},
	hide: function(){
		if(this.options.browsers) this.shim.setStyle('display','none');
		return this;
	},
	show: function(){
		if(!this.options.browsers) return this;
		this.shim.setStyle('display','block');
		return this.position();
	},
	dispose: function(){
		if(this.options.browsers) this.shim.dispose();
		return this;
	}
});
window.addEvent('load', function(){
	IframeShim.ready = true;
});
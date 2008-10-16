/*
 *	class: UI.Styles
 * 
 * 		A class that builds stylesheets dynamically.
 * 
 * 	license:
 * 
 * 		MIT-style license.
 * 
 * 	author:
 * 
 * 		Marat A. Denenberg, <marat at revnode dot com>
 * 
 * 	copyright:
 * 
 * 		copyright (c) 2008 revnode, <http://www.revnode.com/>
 * 
 * 	inspiration:
 * 
 * 		horseweapon on the mootools forum, <http://forum.mootools.net/viewtopic.php?id=6635>
 * 

 */
UI.Styles = new Class({
	
	Implements : Options,
	
	options:
	{
		self:				'CSS',
		limited:			[],
		_rule:				'',
		_style:				null,
		rules:				{}
	},
	
	initialize : function(options) {
		this.setOptions(options);
		this.local = this.options;
	},
	
	destroy : function() {
		if(this.local._style) this.local._style.destroy();
	},
	
	refresh : function() {
		var text = '';
		Hash.each(this.local.rules, function(rule, selector) {
			this.local._rule = '';
			Hash.each(rule, this.glue, this);
			text += (this.local._rule == '' ? '' : selector + '{' + this.local._rule + '}');
		}, this);
		
		this.destroy();
		this.local._style = new Element('style').set('type', 'text/css').inject(document.head);
		
		switch(Browser.Engine.name)
		{
			case 'trident':
				this.local._style.styleSheet.cssText = text;
				break;
			
			default:
				this.local._style.grab(document.createTextNode(text));
				break;
		}
		
		return this;
	},
	
	glue : function(value, property) {
		if(this[Browser.Engine.name + '_' + property])
		{
			var pair = this[Browser.Engine.name + '_' + property](value, property);
			this.local._rule += pair[0] + ':' + pair[1] + ';';
		}
		else if(!this.local.limited.contains(property))
		{
			this.local._rule += property + ':' + value + ';';
		}
	},
	
	
	addRule : function(selector, properties) {
		var rules = {}; rules[selector] = properties;
		return this.addRules(rules);
	},
	
	addRules : function(rules) {
		this.local.rules = $merge(this.local.rules, rules);
		return this;
	}

	
});
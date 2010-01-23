/*
---
description: Default element debugger.

authors: [moolego,legoman,r2d2]

requires:
- core:1.2.1: '*'
- mooCanvas

provides: [ui.debug]
 
...
*/
/*
Class: ui.debugger
	Default element debugger.
	
Discussion
*/

ui.debug = {
	start: function() {
		console.log('start debugger');
	},
	
	trace: function(properties){
		for (var id in properties) {
			if (properties[id] == 'NaN') {
				return;
			}
			if ($type(properties[id]) == 'array' || $type(properties[id]) == 'object') {
				for (var val in properties[id]) {
					if (properties[id][val] == 'NaN') {
						console.log(						//this.options.element,  ": ",
						val + ' , Nan', "(" + this.options.skin + "=>" + this.options.component + "=>" + this.options.type + "=>" + this.options.state + ")");
						return;
					}
				}
			}
		}
		if (properties.size && !properties.size[0] && !properties.size[1]) {
			console.log(			//this.options.element,  ": ",
			key + ' , size is null', "(" + this.options.skin + "=>" + this.options.component + "=>" + this.options.type + "=>" + this.options.state + ")");
			return;
		}
	}
}

ui.debug.start();
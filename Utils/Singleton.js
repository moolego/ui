/*
About:
	Singleton.js v.1.0 for mootools v1.1
	by nwhite (http://forum.mootools.net/viewtopic.php?pid=31909)
	
Example:
	Counter = new Class({
		counter : 0,              initialize : function(){
		console.debug('counter initialized');
	},
	count : function(){
		this.counter++;
		console.debug(this.counter);
		}
	});
	
	Counter.toSingleton(); // Make class a singleton
	
	testA = new Counter(); //output = 'counter initialized'
	testB = new Counter();
	
	testA.count(); // output = 1
	testB.count(); // output = 2
*/

Class.prototype.toSingleton = function(){
	var p = this.prototype;
	var instance = undefined;
	if($defined(p.initialize) && $type(p.initialize) == 'function') var init = p.initialize;
	p.initialize = function(){
		if(!$defined(instance)){
			if($defined(init) && $type(init) == 'function') init.apply(this,arguments);
			instance = this;
		}
	return instance;      
	}
};

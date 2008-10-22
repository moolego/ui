/*
About:
	http://www.nwhite.net/2008/10/10/mootools-singleton-class-mutator/
	
Example:
	Counter = new Class({
		Singleton : true,
		counter : 0,
		initialize : function(){
			console.debug('counter initialized');
		},
		count : function(){
			this.counter++;
			console.debug(this.counter);
		}
	});
	
	testA = new Counter(); //output = 'counter initialized'
	testB = new Counter();
	
	testA.count(); // output = 1
	testB.count(); // output = 2
*/

Class.Mutators.Singleton = function(self,flag){
	if(!flag) return;
	self.constructor.__instance = undefined;
	if($defined(self.initialize) && $type(self.initialize) == 'function') var init = self.initialize;
	self.initialize = function(){
		if(!$defined(this.constructor.__instance)){
			if($defined(init) && $type(init) == 'function') init.apply(this,arguments);
			this.constructor.__instance = this;
		}
		return this.constructor.__instance;
	}
}
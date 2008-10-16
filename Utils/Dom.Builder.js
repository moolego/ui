/*
*
Script: Builder.js
  Class for creating a dom object from json string or javascript object source
 
License:
  MIT-style license.


Class: UI.Dom.Builder 1.0
	A minimimalist Dom Builder class
	Return or inject a dom object from json string or javascript object source

Arguments:
	source	: the json or javascript source
	options : 
		container : the container where to inject the new dom object
	
Example : 
	
	// this example inject inside this.wrapper the json_string
	
	var json_string = '["table",{ class : "mytable"}, ["tr", { class : "row1" },["td",{ class : "col1" },"bonjour","td",{ class : "col2" }]],["tr", { class : "row2" },["td",{ class : "col1"},"td",{ class : "col2" }]],["tr", { class : "row3" },["td",{ class : "col1"},"td",{ class : "col2" }]]]'
	
	this.dom = new UI.Dom.Builder(json_string)
	 .inject(this.container);
	 
*/

Dom = window.Dom || {};

Dom.Builder = new Class({
	Implements: [Events, Options],
	
	options: {
		onBuild 	: $empty,
		onStart		: $empty
	},
	
	initialize: function(source,options){
		this.setOptions(options);
		
		$type(source) == "string" ? this.object = JSON.decode(source) : this.object = source;

		this.build(this.object);
		
		return this.dom || '';
	},
	
	build: function(object,container){		
		var dom, tag, func, next = '';

		object.each( function(o,i) {
			if ($type(o) == "string") {
				($type(object[i+1]) == "object") ? tag = o : dom.set("html",o);
			} else if ($type(o) == "object") {
				dom = new Element(tag, o)
				container ? dom.inject(container) : this.dom = dom;
			} else if ($type(o) == "array") {
				this.build(o, dom);
			} else if ($type(o) == "function") {
				this.dom.addEvent('click',function() { o() });
			}
		},this)
	},
	
	test: function(string) {
		console.log('builder: '+string);
		
	}
});


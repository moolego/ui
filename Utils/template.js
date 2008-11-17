/*
    Javascript Template Engine
    (C) Zoltan Vrana, 2008
    MIT style licence
*/

/*
Function: fillTemplate
        Used internally. Fills the template contained in $('target') in-place. Should always be invoced on a copy.

Arguments:
        target - location of the template to be filled
		data - data to be used during template interpolation
*/
function fillTemplate(target, data) {
    var target = $(target);
    for(var key in data) {
        var tmpEls = target.getElements('.' + key);
        var obj = data[key];
        if ($type(obj) == 'object') {
            // descend
            fillTemplate(tmpEls[0], obj);
        } else
        if ($type(obj) == 'array') {
            // clone array of 'el'
            for(var i=0;i<obj.length;i++) {
		var tmpEl = tmpEls[i%tmpEls.length];
                var a = tmpEl.clone(true);
		tmpEl.getParent().adopt(a);
                if (($type(obj[i]) == 'array') || ($type(obj[i]) == 'object')) {
                    fillTemplate(a, obj[i]);
                } else {
                    a.setText(obj[i]);
                }
            }
	    tmpEls.each(function(el) {el.remove(); });
        } else {
            // set text of el to obj
            tmpEls[0].setText(obj);
        }
    }
}

/*
Function: expandTemplate
        Expands a copy of a template with readily available data.

Arguments:
		template - element that contains the template as its children
		target - target element for receiving the expanded template
		data - data for the template to be expanded with

Example:
        >html:
		><div id="template">
		>	<div class="title"></div>
		>	<ul>
		>		<li class="item" />
		>		<li class="item alt" />
		>	</ul>
		></div>
		><div id="target"></div>
		>js:
		>var data={
		>	title:"List of some primes",
		>	item:[2,3,5,7,11,13,17,19]
		>};
		>expandTemplate('template', 'target', data);
		>resulting html:
		><div id="template">
		>	<div class="title">List of some primes</div>
		>	<ul>
		>		<li class="item">2</li>
		>		<li class="item alt">3</li>
		>		<li class="item">5</li>
		>		<li class="item alt">7</li>
		>		<li class="item">11</li>
		>		<li class="item alt">13</li>
		>		<li class="item">17</li>
		>		<li class="item alt">19</li>
		>	</ul>
		></div>
        >//template is unaltered
*/
function expandTemplate(template, target, data) {
    var template = $(template);
    var target = $(target);
    target.empty();
    template.getChildren().each(function(item) {
        target.adopt(item.clone());
    });
    fillTemplate(target, data);
}

/*
Function: tmpl
        Shortcut method that receives data from an ajax request and expands a template.

Arguments:
		template - element that contains the template as its children
        target - location of the template to be filled
		data - url of the Ajax request
		options - any additional options for the Ajax request

Example:
        >html:
		><div id="template">
		>	<div class="title"></div>
		>	<ul>
		>		<li class="item" />
		>		<li class="item alt" />
		>	</ul>
		></div>
		><div id="target"></div>
		>js:
		>tmpl('template', 'target', 'primes.php', {
		>	data: {
		>		from:2,
		>		to:20
		>	}
		>});
		>resulting html:
		><div id="template">
		>	<div class="title">List of some primes</div>
		>	<ul>
		>		<li class="item">2</li>
		>		<li class="item alt">3</li>
		>		<li class="item">5</li>
		>		<li class="item alt">7</li>
		>		<li class="item">11</li>
		>		<li class="item alt">13</li>
		>		<li class="item">17</li>
		>		<li class="item alt">19</li>
		>	</ul>
        >//template is unaltered
*/
function tmpl(template, target, url, options) {
    var template = $(template);
    var target = $(target);
    var ajax = new Ajax(url, {
        onSuccess:function() {
            var res = Json.evaluate(this.response.text);
            expandTemplate(template, target, res);
        }
    });
	ajax.setOptions(options);
    ajax.request();
}

window.addEvent('loadx', function() {
	
	
	new UI.Select({
		list : [
			{
				text : 'View',
				action : function() { location.href = 'button.html' }
			},
			{
				text : 'Window',
				action : function() { location.href = 'slider01.html' }
			},
			{
				text : 'Button',
				action : function() { location.href = 'view.html' }
			},
			{
				text : 'Window',
				action : function() { location.href = 'splitview.html' }
			},
			{
				text : 'Window',
				action : function() { location.href = 'window01.html' }
			},
			{
				text : 'Window',
				action : function() { location.href = 'window.js' }
			},
			{
				text : 'Slider',
				action : function() { location.href = 'meltingpot.js' }
			}
			
		],
		styles : {
			position : 'absolute',
			right : '20px', 
			top : '35px'
		}
	}).inject(document.body);
	//console.log('exxamples');
});

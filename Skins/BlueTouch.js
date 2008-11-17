/*
Object: UI.Skin.GreyGlass
	Define 
	
Implement:
	UI.Skin

Arguments:
		no

*/

UI.props.BlueTouch = {
	'default': {
		/* css properties */
		styles: {
			fontSize: '12px'
		},
		fx: {},
		
		/* layers properties */
		layers: {
			'default': {
				position: 'relative',
				shape: 'roundedRect',
				offset: 1,
				color: '#fff',
				opacity: 1,
				radius: 0,
				direction: 'horizontal'
			},
			shadow: {
				size: 0,
				magnify: 0,
				offsetX: 0,
				offsetY: 0
			}
		}
	},
	
	slider: {
		'default': {
			'default': {
				width: 200,
				height: 12,
				
				/* element css properties */
				styles: {
					position: 'relative',
					display: 'inline-block'
				},
				
				/* layers properties */
				layers: {
					reorder: ['border', 'front', 'fakeShadow', 'reflect'],
					
					border: {
						offset: ['0px', '0px', '0px', '0px'],
						color: ['#093889', '#5289d7'],
						opacity: 1,
						radius: 5
					},
					front: {
						position: 'absolute',
						offset: 1,
						color: ['#3672dc', '#4085ec'],
						opacity: 1,
						radius: [4, 4, 4, 4]
					},
					fakeShadow: {
						position: 'absolute',
						offset: ['1px', '1px', '23px'],
						color: ['#000', '#000'],
						opacity: [.2, 0],
						radius: [5, 5, 0, 0]
					},
					reflect: {
						position: 'absolute',
						offset: ['50%', '1px', '1px'],
						color: ['#FFF', '#FFF'],
						opacity: [.05, .3],
						radius: [4, 4, 4, 4]
					}
				}
			}
		},
		horizontal: {
			'default': {}
		},
		vertical: {
			'default': {
				width: 10,
				height: 300
			}
		},
		'knob': {
			'default': {
				width: 20,
				//	height 		: 10,
				
				styles: {
					position: 'relative',
					zIndex: 1,
					display: 'block'
				},
				
				layers: {
					reorder: ['checkBg', 'check', 'checkFront'],
					
					checkBg: {
						position: 'absolute',
						offset: 0,
						color: '#000',
						opacity: 0.25,
						radius: 5
					},
					check: {
						position: 'absolute',
						offset: 1,
						color: ['#FFF', '#FFF'],
						opacity: 1,
						radius: 4
					},
					checkFront: {
						position: 'absolute',
						offset: [2, 2, 1, 1],
						color: ['#000', '#000'],
						opacity: [.18, .02],
						radius: 4
					}
				}
			}
		}
	}
};

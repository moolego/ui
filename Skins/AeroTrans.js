/*
Object: UI.Skin.AeroTrans
	Define 
	
Implement :
	UI.Skin

Arguments :
		no

*/

UI.props.AeroTrans = {
	'default': {
		/* css properties */
		styles: {
			fontFamily: 'Helvetica, Arial, sans-serif',
			fontSize: '12px',
			position: 'relative'
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
	
	button: {
		'default': {
			'default': {
				/* components properties */
				components: {
					label: {
						styles: {
							zIndex: 1,
							fontWeight: 'normal',
							position: 'absolute',
							cursor: 'pointer',
							top: 0,
							left: 0,
							padding: '3px 16px 3px',
							whiteSpace: 'nowrap',
							lineHeight: '16px'
						}
					}
				},
				
				/* shortcuts */
				shortcuts: {
					labelStyles: 'components.label.styles'
				},
				
				/* element css properties */
				styles: {
					display: 'inline-block',
					cursor: 'pointer'
				},
				
				/* layers properties */
				layers: {
					littleshadow: {
						offset: ['0px', '0px', '0px', '0px'],
						color: ['#000', '#000'],
						radius: 11,
						opacity: .1,
						radius: 12
					},
					background: {
						offset: ['0px', '1px', '1px', '1px'],
						color: ['#494949', '#5f5f5f'],
						opacity: 1,
						radius: 11
					},
					main: {
						color: ['#d4d4d4', '#e5e5e5'],
						radius: 10
					},
					reflect: {
						offset: ['0px', '3px', '65%'],
						color: ['#FFF', '#FFF'],
						opacity: [.8, .3],
						radius: [7, 7, 4, 4]
					},
					light: {
						position: 'absolute',
						offset: ['50%', '5px', '2px'],
						color: ['#FFF', '#FFF'],
						opacity: [0, 1],
						radius: [4, 4, 7, 7]
					}
				}
			},
			over: {},
			'down': {
				layers: {
					main: {
						color: ['#7b8997', '#7b8997']
					},
					background: {
						color: ['#494949', '#5f5f5f']
					}
				}
			}
		}
	}
}
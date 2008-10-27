/*
Object: UI.Skin.GreyGlass
	Define 
	
Implement:
	UI.Skin

Arguments:
		no

*/

UI.props.demo = {
	'default': {
		/* css properties */
		styles: {},
		
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
		},
		
		/* shadows properties */
		shadows: ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEqSURBVHja7JZRjsMwCEQzmNz/yKm0UlYOZTCwXvWnkVBaO848D5gW13Udn7zk+PD1BVA7AGDHe9EG+A+RaJ1uFkV1nW4QRvAcdjiAgiiS82mASNy+GM78Cq5dAyDCIGMUXAu7z4iyoDDa2LknLuRzBJMGYOKeKLtTEC3az8TnAPleAmBQcKyfYzhjoRuaFD0W4mO6DwLjQnSKUAJxXUCIhdBN9s/iM4QH83BCk6IHER9G9AxAXIiOAxJAeGEhHqnQRgeMIG6QMwnR7oQIilAdiHvOFia0IcxOAkvFaWriUQva3D07CRaCpeJ3XeXX0BakLCA8R95q4S99wEKMxKloAaDYkDyYQTqlaCLv7O8VEulgaSmnYJWKDkQLYAUkhfiBkE27XzlD4yXAAD9iBzTvoIgoAAAAAElFTkSuQmCC', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAAAAAgCAYAAABNcNVmAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEpSURBVHja7NzZCcQwEAVB3978E9Yy4CiaKpgE3mcjtK+1NgAAAACg6TABAAAAAHQJgAAAAAAQJgACAAAAQNj+HQAAAAAQdG0CIAAAAABkCYAAAAAAEDYB0D+AAAAAABA1AfA0AwAAAAA0CYAAAAAAECYAAgAAAEDY9R0AAAAAEDTx7zYDAAAAADQJgAAAAAAQJgACAAAAQNgEwMcMAAAAANA0AfA1AwAAAAA0CYAAAAAAECYAAgAAAEDYBMCfGQAAAACgyQtAAAAAAAgTAAEAAAAgTAAEAAAAgLAJgI8ZAAAAAKBpAuBtBgAAAABoEgABAAAAIEwABAAAAICw6zsAAAAAIGji32kGAAAAAGgSAAEAAAAgTAAEAAAAgLAJgIcZAAAAAKDpL8AAARYD73dGJasAAAAASUVORK5CYII=', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAF5SURBVHja7JfhigMxCISju9f2/Z/3okchC4NMotk76J8LSLYldT5dY1Jx9/bJoe3D4x9AhlXHrwsm1txJADwB/lM4BiAFp57A+Q6ALpxLweEKxu8AxB/6hkMnIJ4BHBMnEcLBoYTvWvi+DHEO8wWAk2cPzhlcuQbODVFm7DUIqSW/A8DMwvOsVqRahF8FYYNZ4HMja7YgMgAUtrFjEKLBrAGs9BreAI9C1GisG9rdZjQDYOIdZtaWjQCk/eMN8CTiRsR1zNnhZbtF+JxE3oviHiKW3Vb8SsQv+x4gsmjDCOGVmsAMsLSjOIvMw/ZUAlF+BTvimC0FYQ9r062IuwDFj5ByIRHbWBf7g1RPQgZwiXdIaSPiR2hOSiCkeho+QkSdRN6COK7TILqVhasVY/pnwiiuQVyTC256GtokfSz1CrMsMiDVVswAonAn4ln6WwXiupLNovZQmJpEzv5vLG9KGYBtiG+lngGgsCZ2W3B1LfcJgNy00vgRYACL8w5ybY12GwAAAABJRU5ErkJggg==', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAUACAYAAAAm7lBlAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK/SURBVHja7M5RCoAgEEVRNbP2v2GboI9hNtDPeXARQeT0vXfL67H3+BrRkZrRmVrRlbrLfZX3s/w3Rvt5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjwADAIpiDX1mjkx5AAAAAElFTkSuQmCC', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAUACAYAAAAm7lBlAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALASURBVHja7M5LDoAgDEXR6r7dtwJ+yqxhA07OS+6AhDRni4gje7K7NLJeatlVOpd3W/6P5d68/87momyPnwcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAJMABDdij96G+pIAAAAABJRU5ErkJggg==', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGBSURBVHja7FbRbsQgDEuAu+3/v3eFXSd6slwCSe+0vQzJalWR2jEkoK01waGPsT86Ukd+oABuHfeOj45PeL8DbhCbAamIf7SLqARMUCICPKKqA0/yPaa8SMjkLGLrVm9E/PxXmRBpfyLxLHMPuVsAi5k5wKRMntj2jhTZhB7bkXzHl5W1V0CjYP6JZfsGmSdDQI040AL2c/Yj4mN5fsQVB7k6yu3I2LL+cOu0NyJ7QAwRM3Kem3l5imPtRy4cDQVFKK05zs1ge1oJWFVBBUFILg7yDCKXArD+LQesuOohf8cekEmp8h5JVJphAUrEsnAgY71z5l4BjZaASSyXkoc84sDoTBDDjeYkl5kAqxSZAEVwm61W1h4Bs6NZqRKUvieIqRZxRMBMBLZahe8WaUjArCNac12k2F+uXMl00J51IJoPpJEA0cG1nElHjUYX7+qYK95b8ehi0i72j5OIaCvWRX/wxLUrAqwDyiumveqABDNXb9xpE/72SPLH41/AtwADALAKC3T3TSsYAAAAAElFTkSuQmCC', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAAgCAYAAACCTsnkAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADQSURBVHja7N3JEYAgFERBUNM2b3ckjj/dVSQwp1ccoLfW9gYAQIxtns8MAABZAfiaAQBAAAIAIAABAKgSgI8ZAACyAvA2AwCAAAQAQAACAFAlAC8zAABkBeBpBgAAAQgAgAAEAKBKAB5mAADICkA3gAAAAhAAAAEIAECZAPQOIABAWAD6CQQAQAACACAAAQAoE4CPGQAAsgLwNQMAgAAEAEAAAgBQJQA/MwAA5Fjn6WYAAMgKQAAAgvQxhhUAAIIsJgAAEIAAAAhAAACq+AUYAMtHHHQzZaVqAAAAAElFTkSuQmCC', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFUSURBVHja7JfrDoIwDIWr8al9coFtFRJImtrLKRr9Y5MTIdL129pucCGi+6qxqgu1XcuqWWja9RDXx3/LribU97E38abNSNhVPOCJTwqym6JEdSoYAtCVhgHIwMp8DKAKcZi8178vAC0B0BAdqBGKgqIAzahoDZGlA0rBomakAbwV8dJhGUcAsxhEzvAIvjgwSBqgFEgACdGSVHSwPbkKkNVCcwqyPPsDYDIAIghrBRiE4AzAqoWuasLqiggiXYGHcMggNEgH0sBZF0zqweGkYxgQ6IZEFQC9Eh7ECDqhVISzQz+AFUFaEG5DAiEYfGegylbsAVgg7FT9SA4iRgEoOeuHc83BUZyehh5ABvNWcAuAijDoywdnABQAREE48YNfyaLzmwG4aKZpGw7AgUHAUnAPABkgG7i0D/BZ50/43YqOb32EWHZRn2pftyv92P4ATwEGAPKrBc7jFIudAAAAAElFTkSuQmCC']
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
							padding: '4px 16px',
							whiteSpace: 'nowrap'
						}
					}
				},
				
				/* shortcuts */
				shortcuts: {
					labelStyles: 'components.label.styles'
				},
				
				/* element css properties */
				styles: {
					position: 'relative',
					display: 'inline-block',
					cursor: 'pointer'
				},
				
				/* layers properties */
				layers: {
					'default': {
						radius: 10
					},
					littleshadow: {
						offset: ['0px', '0px', '0px', '0px'],
						color: ['#000', '#000'],
						radius: 11,
						opacity: .1,
						radius: 11
					},
					background: {
						offset: ['0px', '1px', '1px', '1px'],
						color: ['#494949', '#5f5f5f'],
						opacity: 1,
						radius: 11
					},
					main: {
						color: ['#d4d4d4', '#e5e5e5']
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
			over: {
				layers: {
					main: {
						color: ['#a1a1a1', '#d5d5d5']
					}
				}
			},
			down: {
				layers: {
					main: {
						color: ['#7b8997', '#7b8997']
					},
					background: {
						color: ['#494949', '#5f5f5f']
					}
				}
			}
		},
		'jgood': {
			'default': {
				components: {
					label: {
						styles: {
							fontSize: '11px',
							fontWeight: 'bold',
							fontFamily: 'Arial, Helvetica',
							opacity: '.7', 
							padding: '10px 16px',
							color: '#333',
							width: '70px'
						}
					}
				},
				
				styles : {					
					margin	: '3px'
				},
				
				layers: {
					reorder: ['emboss', 'front', 'reflect'],

					emboss: {
						offset: '0px',
						color: '#000',
						opacity: .17,
						radius: 7
					},
					
					front: {
						offset: 2,
						opacity: 1,
						radius: 5
					},
					reflect: {
						offset: ['2px', '2px', '35%'],
						color: ['#FFF', '#FFF'],
						opacity: [.9, .1],
						radius: [3, 3, 3, 3]
					}
				}
			},
			over: {
				components: {
					label: {
						styles: {
							opacity: 1
						}
					}
				}
			},
			down: {
				components: {
					label: {
						styles: {
							color: '#FFF'
						}
					}
				}
			}
		}
	},
	
	input: {
		'default' : {
			'default' : {
				width				: 200,
				components			: {
					input			: {
						styles		: {
							padding			: '4px',
							zIndex			: 1,
							position		: 'absolute',
							top				: 0,
							left			: 0,
							background		: 'transparent',
							resize			: 'none',
							whiteSpace		:'nowrap',
							border			: 'none'
						}
					}
				},
				
				/* element css properties */
				styles				: {
					position		: 'relative',
					display			: 'inline-block'
				},
                   
				/* layers properties */
				layers				: {
					'default'		: {
						radius		: 0
					},
					emboss			: {
						offset		: [0,1],
	                    color		: '#000',
	                    opacity		: 0.5
					},
					border			: {
						offset		: [1,0,0, 1],
	                    color		: '#dbdbdb'
					},
					main			: {
						offset		: 1,
						color		: '#FFF'
					}
				}
			},
			focus : {
				layers				: {
					main			: {
						color		: ['#F4F4F4','#FFF']
					}
				}
			}
		},
		'moz' : {
			'default' : {
				width				: 200,
				components			: {
					input			: {
						styles		: {
							padding			: '4px 10px 4px 24px',
							zIndex			: 1,
							position		: 'absolute',
							top				: 0,
							left			: 0,
							background		: 'transparent',
							resize			: 'none',
							whiteSpace		:'nowrap',
							border			: 'none'
						}
					}
				},
				
				/* element css properties */
				styles				: {
					position		: 'relative',
					display			: 'inline-block'
				},
                   
				/* layers properties */
				layers				: {
					
					
					
					'default'		: {
						radius		: 12,
						position	: 'abolute'
					},
					emboss			: {
						position	: 'abolute',
						offset		: [0,0,0,0],
	                    color		: ['#000','#000'],
	                    opacity		: [.6,0]
					},
					border			: {
						radius		: 11,
						position	: 'abolute',
						offset		: [1,1,0,1],
	                    color		: ['#cacaca','#dbdbdb'],
						opacity		: 1
					},
					main			: {
						radius		: 10,
						position	: 'abolute',
						offset		: [2,2,1,2],
						color		: '#FFF'
					},
					button			: {
						shape		: 'circle',
						radius		: [7,7,7,8],
						position	: 'abolute',
						offset		: 11,
						color		: '#ff7c0a'
					},
					arrow			: {
						shape		: 'triangle',
						radius		: [8,8,8,8],
						position	: 'abolute',
						offset		: 13,
						color		: '#fff'
					}
					
				}
			},
			focus : {
				layers				: {
					main			: {
						color		: ['#F4F4F4','#FFF']
					}
				}
			}
		}
	},
	
	// needed for button
	label: {
		'default': {
			'default': {}
		}
	}
}
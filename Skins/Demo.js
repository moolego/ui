/*
Object: UI.Skin.Demo
	Defines css styles, layers information drawn by the canvas and specific properties of each component, type and state.
	Skin Sheet

Information:
	Because UI.props.Demo define speciffically for the Examples directory of moolego project. 
	It is not representative of a complete moolego skin sheet object

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
		'hardest': {
			'default'				: {
				layers				: {
					reorder			: ['emboss','front','reflect'],
					
					emboss			: {
						offset		: 0,
						color		: '#000',
						opacity		: .17,
						radius		: 9
					},
					front			: {
						offset		: 3,
						color		: ['#cc0033','#000'],
					 	opacity		: 1,
						radius		: 7
					},
					reflect			: {
						offset		: ['2px', '2px', '65%'],
						color		: ['#FFF', '#FFF'],
						opacity		: [.8, .0],
						radius		: [5,5,6,6]
					}
				}
			},
			over					: {
				layers				: {
					emboss			: {
						color		: '#00CC00'
					}
				}
			},
			down					: {
				components			: {
					label			: {
						styles		: { color : '#ccc' }
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
						color : '#500',
						radius: 5
					},
					reflect: {
						offset: ['2px', '2px', '35%'],
						
						gradient	: {
							color: ['#FFF', '#FFF'],
							opacity: [.9, .1]
						},
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
		},
		'calc': {
			'default': {
				components: {
					label: {
						styles: {
							fontSize: '20px',
							fontWeight: 'bold',
							fontFamily: 'Arial, Helvetica',
							opacity: '.7', 
							color: '#fff',
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
						color : '#000',
						radius: 5
					},
					reflect: {
						offset: ['2px', '2px', '35%'],
						
						gradient	: {
							color: ['#FFF', '#FFF'],
							opacity: [.9, .1]
						},
						radius: [3, 3, 3, 3]
					}
				}
			},
			over: {
				components: {
					label: {
						styles: {
							fontSize: '20px',
							fontWeight: 'bold',
							fontFamily: 'Arial, Helvetica',
							opacity: '.7', 
							color: '#fff',
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
				},
				layers			: {
					front		: {
						color : '#000'
					}
				}
			}
		},
		tube: {
			'default'				: {
				layers				: {
					reorder			: ['front', 'light', 'reflect'],
					
					front			: {
						position	: 'absolute',
						offset		: 0,
						color		: '#fe3333',
						radius		: 8
					},
					light			: {
						position	: 'absolute',
						offset		: [2, 2, '40%'],
						gradient	: {
							color	: ['#FFF', '#fe3333', '#fe3333'],
							angle	: 110
						},
						radius		: [0,8,0,0]
					},
					reflect			: {
						position	: 'absolute',
						offset		: 0,
						gradient	: {
							color	: ['#fe3333','#c32222'],
							opacity	: [0, 1]
						},
						radius		: 8
					}
				}
			},
			over					: {
				components			: {
					label			: {
						styles		: {
							opacity : .8
						}
					}
				}
			},
			down					: {
				components			: {
					label			: {
						styles		: {
							color 	: '#ccc'
						}
					}
				}
			}
		}
	},
	
	bubble: {
		'default' : {
			'default' : {
				components			: {
					label			: {
						styles		: {
							zIndex			: 1,
							position		: 'absolute',
							top				: 0,
							left			: 0,
							cursor			: 'default',
							color			: '#FFF',
							padding			: '8px 10px 18px',
							fontSize		: '10px',
							whiteSpace:'nowrap'
						}
					}
				},
				
				shortcuts			: {
					labelStyles		: 'components.label.styles'
				},
				
				styles				: {
					display			: 'block',
					position		: 'absolute',
					opacity			: 0		
				},
				
				layers				: {
					'default'		: {
						position	: 'absolute',
						color		: '#000',
						radius		: 5,
						offset		: 0,
						opacity		: .8
					},
					background		: {
						offset		: [0,0,8],
						radius		: 5
					},
					arrow			: {
						shape		: 'triangle',
						rotation	: 180,
						size		: [18,8],
						offset		: ['auto', 20,0]
					},
					reflect			: {
						color		: ['#FFFFFF','#FFFFFF'],
						radius		: 4,
						opacity		: [0.4, 0.1],
						offset		: [1,1,'55%']
					}
				}
			}
		},
		green: {
			'default': {
				layers: {
					background: {
						offset: [0, 0, 4],
						color: ['#33cc33', '#000']
					},
					arrow: {
						size: [9, 4],
						offset: ['auto', 9, 0]
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

	slider : {
		'default' : {
			'default' : {
				width				: 300,
				height				: 40,
				
				/* element css properties */
				styles				: {
					position		: 'relative',
					display			: 'inline-block'
				},
				
				/* layers properties */
				layers				: {
					reorder			: ['border','front','fakeShadow','reflect'],
					
					border			: {
						offset		: ['0px', '0px', '0px','0px'],
						color		: ['#093889','#5289d7'],
						opacity		: 1,
						radius		: 5
					},
					front			: {
						position	: 'absolute',
						offset		: 1,
						color		: ['#3672dc','#4085ec'],
					 	opacity		: 1,
						radius		: [4,4,4,4]
					},
					fakeShadow		: {
						position	: 'absolute',
						offset		: ['1px', '1px', '23px'],
						color		: ['#000','#000'],
					 	opacity		: [.2,0],
						radius		: [5,5,0,0]
					},
					reflect			: {
						position	: 'absolute',
						offset		: ['50%', '1px', '1px'],
						color		: ['#FFF', '#FFF'],
						opacity		: [.05, .3],
						radius		: [4,4,4,4]
					}
				}
			}
		},
		horizontal					: {
			'default'				: {}
		},
		vertical					: {
			'default'				: {
				width				: 10,
				height				: 300
			}
		},
		'knob' : {
			'default': {
				width 		: 40,
			//	height 		: 10,
				
				styles		: {
					position		: 'relative',
					zIndex			: 1,
					display			: 'block'
				},
						
				layers				: {
					reorder			: ['checkBg','check','checkFront'],
					
					checkBg			: {
						position	: 'absolute',
						offset		: 0,
						color		: '#000',
						opacity		: 0.25,
						radius		: 5
					},
					check			: {
						position	: 'absolute',
						offset		: 1,
						color		: ['#FFF', '#FFF'],
						opacity		: 1,
						radius		: 4
					},
					checkFront		: {
						position	: 'absolute',
						offset		: [2, 2, 1, 1],
						color		: ['#000', '#000'],
						opacity		: [.18,.02],
						radius		: 4
					}
				}
			}
		}
	},
	
	checkbox : {
		'default' : {
			'default' : {
					
				width				: 94,
				height				: 27,
				
				styles			: {
					position	: 'relative',
					display		: 'inline-block'
				},
				
				layers				: {
					reorder			: ['border','front','fakeShadow','on','on1','reflect','checkShadow','checkShadow2','checkBg','check','checkFront'],
					
					border			: {
						offset		: ['0px', '0px', '0px','1px'],
						color		: ['#093889','#5289d7'],
						opacity		: 1,
						radius		: 4
					},
					front			: {
						position	: 'absolute',
						offset		: 1,
						color		: ['#3672dc','#4085ec'],
					 	opacity		: 1,
						radius		: [4,4,4,4]
					},
					fakeShadow		: {
						position	: 'absolute',
						offset		: ['1px', '1px', '23px'],
						color		: ['#000','#000'],
					 	opacity		: [.2,0],
						radius		: [5,5,0,0]
					},
					on				: {
						position	: 'absolute',
						shape		: 'circle',
						offset		: [5, 'auto', '1px',58],
						color		: '#FFF',
						opacity		: 1,
						size		: 18
					},
					on1				: {
						position	: 'absolute',
						shape		: 'circle',
						offset		: [7.5, 'auto', '1px',60.5],
						color		: '#407ee3',
						opacity		: 1,
						size		: 13
					},
					reflect			: {
						position	: 'absolute',
						offset		: ['50%', '1px', '1px'],
						color		: ['#FFF', '#FFF'],
						opacity		: [.05, .3],
						radius		: [4,4,4,4]
					},
					checkShadow		: {
						position	: 'absolute',
						offset		: ['0px', '52px', '0px','0px'],
						color		: ['#000', '#000'],
						opacity		: 0.1,
						radius		: [5,5,5,5]
					},
					checkShadow2	: {
						position	: 'absolute',
						offset		: ['0px', '53px', '0px','0px'],
						color		: ['#000', '#000'],
						opacity		: 0.1,
						radius		: [5,5,5,5]
					},
					checkBg			: {
						position	: 'absolute',
						offset		: ['0px', '54px', '0px','0px'],
						color		: ['#919191', '#979797'],
						opacity		: 1,
						radius		: [5,5,5,5]
					},
					check			: {
						position	: 'absolute',
						offset		: ['1px', '54px', '1px','1px'],
						color		: ['#FFF', '#FFF'],
						opacity		: 1,
						radius		: [4,4,4,4]
					},
					checkFront		: {
						position	: 'absolute',
						offset		: ['2px', '54px', '1px','1px'],
						color		: ['#000', '#000'],
						opacity		: [.18,.02],
						radius		: [4,4,4,4]
					}
				}
			},
			'checked' : {
				layers				: {
					reorder			: ['border','front','fakeShadow','off','reflect','checkShadow','checkShadow2','checkBg','check','checkFront'],
					
					border			: {
						offset		: ['0px', '1px', '0px','0px']
					},
					off				: {
						position	: 'absolute',  
						shape		: 'roundedRect',
						offset		: ['5px', '65px', '5px','26px'],
						color		: '#FFF',
						opacity		: 1,
						radius		: 2
					},
					checkShadow		: {
						offset		: ['0px', '0px', '0px','52px']
					},
					checkShadow2	: {
						offset		: ['0px', '0px', '0px','53px']
					},
					checkBg			: {
						offset		: ['0px', '0px', '0px','54px']
					},
					check			: {
						offset		: ['1px', '1px', '1px','54px']
					},
					checkFront		: {
						offset		: ['2px', '1px', '1px','54px']
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
	},
	
	element : {
		line : {
			'default' : {
				styles : {
					border : '1px solid black',
					position : 'relative'
				},
				layers : {
					'default' : {
						position: 'absolute'
					},
					bg : {
						shape : 'roundedRect',
						gradient : {
							color : ['#F0F', '#0F0', '#FF0'],
							angle : 45,
							opacity : [1,1,1],
							stop : [0,.5,1]
						},
						stroke : {
							color : '#F0F',
							width : 6
						},
						offset: [100, 'auto'],
						radius: 20,
						opacity: 1,
						size : ['50%', '50%']
					},
					circle : {
						shape : 'circle',
						color : '#000',
						offset: 150,
						composite : 'lighter',
						opacity: 0.5,
						angle: [150, 30],
						stroke : {
							color : '#111',
							width : 20,
							opacity : 1
						}
					},
					line01 : {
						shape : 'lineUp',
						color : '#F00',
						opacity : 1,
						offset: [50, 'auto'],
						size : ['100%', 1]
					},
					line02 : {
						shape : 'lineUp',
						stroke : {
							color : '#000',
							width: 9
						},
						offset: ['auto', 50],
						size : [1, '100%']
					},
					line03 : {
						shape : 'line',
						color : '#00F',
						opacity : 1,
						width : 2,
						offset: ['auto', 'auto', 50.5],
						size : ['100%', 1]
					},
					line04 : {
						shape : 'line',
						color : '#00F',
						opacity : 1,
						offset: [0, 50, 0, 'auto'],
						size : [1, '100%']
					}
				}
			}
		}
	}
}
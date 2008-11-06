/*
Object: UI.Skin.GreyGlass
	Define 
	
Implement:
	UI.Skin

Arguments:
		no

*/

UI.props.GreyGlass = {
	'default' : {
		/* css properties */
		styles : {
		},

		/* layers properties */
		layers				: {
			'default'		: {
				position	: 'relative',
				shape		: 'roundedRect',
				offset		: 1,
				color		: '#fff',
				opacity		: 1,
				radius		: 0,
				direction	: 'horizontal'
			},
			shadow			: {
				size		: 0,
				magnify		: 0,
				offsetX		: 0,
				offsetY		: 0
			}
		},
		
		/* shadows properties */
		shadows : [
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEqSURBVHja7JZRjsMwCEQzmNz/yKm0UlYOZTCwXvWnkVBaO848D5gW13Udn7zk+PD1BVA7AGDHe9EG+A+RaJ1uFkV1nW4QRvAcdjiAgiiS82mASNy+GM78Cq5dAyDCIGMUXAu7z4iyoDDa2LknLuRzBJMGYOKeKLtTEC3az8TnAPleAmBQcKyfYzhjoRuaFD0W4mO6DwLjQnSKUAJxXUCIhdBN9s/iM4QH83BCk6IHER9G9AxAXIiOAxJAeGEhHqnQRgeMIG6QMwnR7oQIilAdiHvOFia0IcxOAkvFaWriUQva3D07CRaCpeJ3XeXX0BakLCA8R95q4S99wEKMxKloAaDYkDyYQTqlaCLv7O8VEulgaSmnYJWKDkQLYAUkhfiBkE27XzlD4yXAAD9iBzTvoIgoAAAAAElFTkSuQmCC',
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAAAAAgCAYAAABNcNVmAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEpSURBVHja7NzZCcQwEAVB3978E9Yy4CiaKpgE3mcjtK+1NgAAAACg6TABAAAAAHQJgAAAAAAQJgACAAAAQNj+HQAAAAAQdG0CIAAAAABkCYAAAAAAEDYB0D+AAAAAABA1AfA0AwAAAAA0CYAAAAAAECYAAgAAAEDY9R0AAAAAEDTx7zYDAAAAADQJgAAAAAAQJgACAAAAQNgEwMcMAAAAANA0AfA1AwAAAAA0CYAAAAAAECYAAgAAAEDYBMCfGQAAAACgyQtAAAAAAAgTAAEAAAAgTAAEAAAAgLAJgI8ZAAAAAKBpAuBtBgAAAABoEgABAAAAIEwABAAAAICw6zsAAAAAIGji32kGAAAAAGgSAAEAAAAgTAAEAAAAgLAJgIcZAAAAAKDpL8AAARYD73dGJasAAAAASUVORK5CYII=',
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAF5SURBVHja7JfhigMxCISju9f2/Z/3okchC4NMotk76J8LSLYldT5dY1Jx9/bJoe3D4x9AhlXHrwsm1txJADwB/lM4BiAFp57A+Q6ALpxLweEKxu8AxB/6hkMnIJ4BHBMnEcLBoYTvWvi+DHEO8wWAk2cPzhlcuQbODVFm7DUIqSW/A8DMwvOsVqRahF8FYYNZ4HMja7YgMgAUtrFjEKLBrAGs9BreAI9C1GisG9rdZjQDYOIdZtaWjQCk/eMN8CTiRsR1zNnhZbtF+JxE3oviHiKW3Vb8SsQv+x4gsmjDCOGVmsAMsLSjOIvMw/ZUAlF+BTvimC0FYQ9r062IuwDFj5ByIRHbWBf7g1RPQgZwiXdIaSPiR2hOSiCkeho+QkSdRN6COK7TILqVhasVY/pnwiiuQVyTC256GtokfSz1CrMsMiDVVswAonAn4ln6WwXiupLNovZQmJpEzv5vLG9KGYBtiG+lngGgsCZ2W3B1LfcJgNy00vgRYACL8w5ybY12GwAAAABJRU5ErkJggg==',
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAUACAYAAAAm7lBlAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK/SURBVHja7M5RCoAgEEVRNbP2v2GboI9hNtDPeXARQeT0vXfL67H3+BrRkZrRmVrRlbrLfZX3s/w3Rvt5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjwADAIpiDX1mjkx5AAAAAElFTkSuQmCC',
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAUACAYAAAAm7lBlAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALASURBVHja7M5LDoAgDEXR6r7dtwJ+yqxhA07OS+6AhDRni4gje7K7NLJeatlVOpd3W/6P5d68/87momyPnwcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAJMABDdij96G+pIAAAAABJRU5ErkJggg==',
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGBSURBVHja7FbRbsQgDEuAu+3/v3eFXSd6slwCSe+0vQzJalWR2jEkoK01waGPsT86Ukd+oABuHfeOj45PeL8DbhCbAamIf7SLqARMUCICPKKqA0/yPaa8SMjkLGLrVm9E/PxXmRBpfyLxLHMPuVsAi5k5wKRMntj2jhTZhB7bkXzHl5W1V0CjYP6JZfsGmSdDQI040AL2c/Yj4mN5fsQVB7k6yu3I2LL+cOu0NyJ7QAwRM3Kem3l5imPtRy4cDQVFKK05zs1ge1oJWFVBBUFILg7yDCKXArD+LQesuOohf8cekEmp8h5JVJphAUrEsnAgY71z5l4BjZaASSyXkoc84sDoTBDDjeYkl5kAqxSZAEVwm61W1h4Bs6NZqRKUvieIqRZxRMBMBLZahe8WaUjArCNac12k2F+uXMl00J51IJoPpJEA0cG1nElHjUYX7+qYK95b8ehi0i72j5OIaCvWRX/wxLUrAqwDyiumveqABDNXb9xpE/72SPLH41/AtwADALAKC3T3TSsYAAAAAElFTkSuQmCC',
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAAgCAYAAACCTsnkAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADQSURBVHja7N3JEYAgFERBUNM2b3ckjj/dVSQwp1ccoLfW9gYAQIxtns8MAABZAfiaAQBAAAIAIAABAKgSgI8ZAACyAvA2AwCAAAQAQAACAFAlAC8zAABkBeBpBgAAAQgAgAAEAKBKAB5mAADICkA3gAAAAhAAAAEIAECZAPQOIABAWAD6CQQAQAACACAAAQAoE4CPGQAAsgLwNQMAgAAEAEAAAgBQJQA/MwAA5Fjn6WYAAMgKQAAAgvQxhhUAAIIsJgAAEIAAAAhAAACq+AUYAMtHHHQzZaVqAAAAAElFTkSuQmCC',
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFUSURBVHja7JfrDoIwDIWr8al9coFtFRJImtrLKRr9Y5MTIdL129pucCGi+6qxqgu1XcuqWWja9RDXx3/LribU97E38abNSNhVPOCJTwqym6JEdSoYAtCVhgHIwMp8DKAKcZi8178vAC0B0BAdqBGKgqIAzahoDZGlA0rBomakAbwV8dJhGUcAsxhEzvAIvjgwSBqgFEgACdGSVHSwPbkKkNVCcwqyPPsDYDIAIghrBRiE4AzAqoWuasLqiggiXYGHcMggNEgH0sBZF0zqweGkYxgQ6IZEFQC9Eh7ECDqhVISzQz+AFUFaEG5DAiEYfGegylbsAVgg7FT9SA4iRgEoOeuHc83BUZyehh5ABvNWcAuAijDoywdnABQAREE48YNfyaLzmwG4aKZpGw7AgUHAUnAPABkgG7i0D/BZ50/43YqOb32EWHZRn2pftyv92P4ATwEGAPKrBc7jFIudAAAAAElFTkSuQmCC'
		]
	},
	
	button : {
		'default' : {
			'default' : {
				/* components properties */
				components : {
					label : {
						styles : {
							zIndex		: 1,
							fontWeight	: 'normal',
							position	: 'absolute',
							cursor		: 'pointer',
							top			: 0,
							left		: 0,
							padding		: '3px 16px 4px',
							whiteSpace	:'nowrap'
						}
					}
				},
				
				/* shortcuts */
				shortcuts			: {
					labelStyles		: 'components.label.styles'
				},
				
				/* element css properties */
				styles				: {
					position		: 'relative',
					display			: 'inline-block',
					cursor			: 'pointer'
				},
				
				/* layers properties */
				layers				: {
					'default'		: {
						radius		: 10
					},
					littleshadow	: {
						offset		: ['0px', '0px', '0px','0px'],
						color		: ['#000','#000'],
						radius		: 11,
						opacity		: .1,
						radius		: 11
					},
					background		: {
						offset		: ['0px', '1px', '1px','1px'],
						color		: ['#494949','#5f5f5f'],
						opacity		: 1,
						radius		: 11
					},
					main			: {
						color		: ['#d4d4d4','#e5e5e5']
					},
					reflect			: {
						offset		: ['0px', '3px', '65%'],
						color		: ['#FFF', '#FFF'],
						opacity		: [.8, .3],
						radius		: [7, 7, 4, 4]
					},
					light			: {
						position	: 'absolute',
						offset		: ['50%', '5px', '2px'],
						color		: ['#FFF', '#FFF'],
						opacity		: [0, 1],
						radius		: [4, 4, 7, 7]
					}
				}
			},
			over : {
				layers				: {
					main			: {
						color		: ['#a1a1a1','#d5d5d5']
					}
				}
			},
			'down' : {
				layers				: {
					main			: {
						color		: ['#7b8997','#7b8997']
					},
					background		: {
						color		: ['#494949','#5f5f5f']
					}
				}
			}
		},
		'recessed' : {
			'default' : {
				/* components properties */
				components : {
					label : {
						styles : {
							padding		: '2px 16px 2px',
							fontSize	: '12px'
						}
					}
				},
				/* shortcuts */
				shortcuts			: {
					labelStyles		: 'components.label.styles'
				},
				
				/* element css properties */
				styles				: {
					position		: 'relative',
					display			: 'inline-block',
					cursor			: 'pointer',
					color			: '#fff'
				},
				
				/* layers properties */
				layers				: {
					'default'		: {
						radius		: 7
					},
					reorder			: ['background','main'],
					background		: {
						offset		: '0px',
						color		: ['#666666','#f2f2f2'],
						opacity		: 1,
						radius		: 9
					},
					main			: {
						position	: 'absolute',
						color		: '#979797',
						offset		: [1.5,1,1,1],
						radius		: 8
					}
				}
			},
			over : {
				layers				: {
					reorder			: ['background','main']
				}
			},
			'down' : {
				layers				: {
					reorder			: ['background','main'],
					main			: {
						color		: '#787878'
						
					}
				}
			}
		},
		'roundtextured' : {
			'default' : {
				/* components properties */
				components : {
					label : {
						styles : {
							padding		: '4px 16px 4px'
						}
					}
				},
				
				/* shortcuts */
				shortcuts			: {
					labelStyles		: 'components.label.styles'
				},
				
				/* element css properties */
				styles				: {
					position		: 'relative',
					display			: 'inline-block',
					cursor			: 'pointer'
				},
				
				/* layers properties */
				layers				: {
					'default'		: {
						radius		: 7
					},
					reorder			: ['emboss','border','main'],
					emboss		: {
						offset		: '0px',
						color		: '#fff',
						opacity		: .5,
						radius		: 5
					},
					border		: {
						position	: 'absolute',
						offset		: [0,0,1,0],
						color		: '#686868',
						opacity		: 1,
						radius		: 4
					},
					main			: {
						position	: 'absolute',
						color		: ['#fff','a9a9a9'],
						offset		: [1,1,2,1],
						radius		: 3
					}
				}
			},
			over : {
				layers				: {
					reorder			: ['emboss','border','main']
				}
			},
			'down' : {
				layers				: {
					reorder			: ['emboss','border','inner1','inner2','inner3','inner4','main'],
					inner1			: {
						position	: 'absolute',
						color		: ['#393939','#686868'],
						offset		: [1,1,2,1],
						radius		: 3
					},
					inner2			: {
						position	: 'absolute',
						color		: ['#6e6e6e','#797979'],
						offset		: [2,2,3,2],
						radius		: 3
					},
					inner3			: {
						position	: 'absolute',
						color		: ['#8c8c8c','#848484'],
						offset		: [3,3,4,3],
						radius		: 3
					},
					inner4			: {
						position	: 'absolute',
						color		: ['#a1a1a1','#8a8a8a'],
						offset		: [4,4,5,4],
						radius		: 3
					},
					main			: {
						color		: ['#afafaf','#8e8e8e'],
						offset		: [5,5,6,5],
						radius		: 2
						
					}
				}
			}
		},
		window : {
			'default' : {
				layers				: {
					
					reorder			: ['emboss', 'background', 'main', 'reflect', 'cache'],
					
					'default'		: {
						position	: 'absolute',
						shape		: 'circle',
						size		: [14, 14],
						opacity		: 1,
						offset		: 0
					},
					emboss			: {
						offset		: ['auto', 1, 0],
						size		: [14, 14],
						color		: '#FFF',
						opacity		: .4
					},
					background		: {
						gradient	: {
							color		: ['#2e323d','#848995']
						},
						size		: [14, 14]
					},
					main			: {
						size		: [11, 11],
						offset		: [2, 2.5],
						gradient	: {
							color	: ['#fff','#fff'],
							opacity	: [.2,.8]
						}
					},
					reflect			: {
						size		: 3,
						offset		: [1.5, 6.5],
						gradient	: {
							color		: ['#fff','#fff'],
							opacity		: [1, .5]
						}	
					},
					cache			: {
						shape		: 'roundedRect',
						size		: [2,1],
						radius		: 0,
						offset		: [1, 7],
						color		: '#545861',
						opacity		: 1
					}
				}
			}
		},
		transparent : {
			'default' : {
				layers : {
					reorder			: ['main','line','line2'],
					
					'default'		: {
						position	: 'absolute',
						shape		: 'circle',
						radius		: 7,
						opacity		: 1
					},
					main			: {
						radius		: 6.5,
						offset		: [6.5, 7.5],
						color		: '#fff',
						opacity		: .7
					},
					line			: {
						position	: 'absolute',
						shape		: 'line',
						width		: 1.5,
						color		: '#000',
						offset		: [3.5,4.5],
						opacity		: .8,
						size		: [6,6]
					},
					line2			: {
						position	: 'absolute',
						shape		: 'lineUp',
						width		: 1.5,
						color		: '#000',
						offset		: [3.5,4.5],
						opacity		: .8,
						size		: [6,6]
					}
				}
			},
			over : {
				layers : {
					main			: {
						opacity		: .8
					}
				}
				
			}
		},
		'small' : {	
			'default': {				
				width 				: 20,
				height				: 11,

				styles				: {
					position		: 'absolute',
					top				: 0,
					right			: 0,
					margin			: '5px 7px 0 3px'
				},
				
				layers				: {
					'default'		: {
						position	: 'absolute',
						shape		: 'circle',
						size		: 8
					},
					emboss			: {
						offset		: [3, 3],
						color		: '#FFF',
						opacity		: .27
					},
					background		: {
						offset		: [0, 1],
						size		: 8,
						color		: ['#3b424d','#9ba0ab']
					},
					main			: {
						size		: 3,
						offset		: [1, 0],
						color		: ['#616975','#e8e8e8']
					},
					reflect			: {
						size		: 2,
						offset		: [0, 1],
						color		: ['#fff','#fff'],
						opacity		: [1, .5]
					}
				}
			},
			over 					: {
				layers				: {
					main			: {
						color		: ['#cf652a','#fee776']
					}
				}
			},
			down 					: {
				layers				: {
					main			: {
						color		: ['#cf652a','#fee776']
					}
				}
			}
		},
		toggleToolbar : {
			'default' : {
				width		: 20,
				height		: 11,
				
				/* css properties */
				styles				: {
					padding				: '2px 16px 4px 16px',
					position			: 'absolute',
					top					: '10px',
					right				: 0,
					margin				: '5px 7px 0 3px'
				},
				
				/* layers properties */
				layers				: {
					
					reorder			: ['emboss','background','main','reflect','light'],
					
					'default'		: {
						radius		: 6
					},
					emboss			: {
						offset		: 0,
						color		: '#fff',
						radius		: 5
					},
					background		: {
						offset		: ['0px', '0px', '1px','0px'],
						color		: ['#494949','#666666'],
						radius		: 5
					},
					main			: {
						offset		: 1,
						radius		: 4,
						color		: ['#b2b2b2','#eee']
					},
					reflect			: {
						offset		: ['0px', '3px', '65%'],
						color		: ['#FFF', '#FFF'],
						opacity		: [.8, .3],
						radius		: 2
					},
					light			: {
						position	: 'absolute',
						offset		: ['65%', '5px', '2px'],
						color		: ['#FFF', '#FFF'],
						opacity		: [.1, .7],
						radius		: [2, 2, 3, 3]
					}
				}
			},
			'down' : {
				layers				: {
					main			: {
						color		: ['#5b697e','#a9b5c2']
					}
				}
			}
		}
	},
	
	input : {
		'default' : {
			'default' : {
				width				: 200,
				
				components			: {
					input			: {
						styles		: {
							padding			: '4px 4px 3px',
							border			: 'none',

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
				
				/* shortcuts */
				shortcuts			: {
					inputStyles		: 'components.input.styles'
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
						color		: '#FFF'
					}
				}
			}
		},
		'round' : {
			'default' : {
				components			: {
					input			: {
						styles		: {
							padding			: '4px 10px',
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
					}
				}
			}
		}
	},
	
	textarea : {
		'default' : {
			'default' : {
				width				: 300,
				height				: 150,
				
				components			: {
					input			: {
						styles		: {
							padding		: '4px 4px 3px',
							border		: 0,
							zIndex		: 1,
							position	: 'absolute',
							top			: 0,
							left		: 0,
							background	: 'transparent',
							resize		: 'none',
							whiteSpace	:'nowrap'
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
						color		: ['#F4F4FF','#FFF']
					}
				}
			}
		}
	},

	checkbox : {
		'default' : {
			'default'				: {
				width				: 16,
				height				: 17,
				styles				: {
					position		: 'relative',
					display			: 'inline-block'
				},
				
				labelStyles			: {
					zIndex			: 1,
					position		: 'absolute',
					top				: 0,
					left			: 0,
					whiteSpace		:'nowrap',
					padding			: '2px 0 1px 20px'
				},
				
				layers: {
					'default': {
						radius		: 2,
						position	: 'absolute'
					},
					littleshadow	: {
						size		: [16,15],
						offset		: [2,0,0,0],
						color		: ['#000', '#000'],
						opacity		: [0.05,.1],
						radius		: [5,5,5,5]
					},
					
					border		: {
						size		: [14,14],
						position	: 'absolute',
						offset		: [2,2,2,1],
						color		: ['#494949', '#777777'],
						opacity		: 1,
						radius		: 2
					},
					main: {
						position	: 'absolute',
						size		: [12,12],
						color		: ['#d4d4d4', '#e5e5e5'],
						offset		: [3,2]
					},
					reflect: {
						position	: 'absolute',
						size		: [10,5],
						offset		: [3, 3, '60%'],
						color		: ['#FFF', '#FFF'],
						opacity		: [.8, .5],
						radius		: 0
					},
					reflectdown: {
						position	: 'absolute',
						size		: [10,6],
						offset		: [9,3, 2],
						color		: ['#FFF', '#FFF'],
						opacity		: [.1, 1],
						radius		: 0
					},
					light: {
						position	: 'absolute',
						size		: [14,10],
						offset		: [4, 1, 4],
						color		: ['#FFF', '#FFF'],
						opacity		: [0.05, .5],
						radius		: 0
					}
				}
			},
			'checked' : {
				layers				: {
					tick1			: {
						position	: 'absolute',
						shape		: 'line',
						width		: 2,
						color		: '#333',
						offset		: [6.3,4],
						size		: [5,6]
					},
					tick2			: {
						position	: 'absolute',
						shape		: 'lineUp',
						width		: 2.2,
						color		: '#333',
						offset		: [0,8],
						size		: [7,11]
					},
					main			: {
						color		: ['#7b8997','#7b8997']
					},
					border		: {
						color		: ['#455a70', '#777777']
					}
				}
			}
		}
	},
	
	radio : {
		'default' : {
			'default' : {
				width				: 14,
				height				: 14,
				
				styles				: {
					padding			: '0 0 0 20px',
					position		: 'absolute'
				},
				
				/* layers properties */
				layers				: {
					'default'		: {
						position	: 'absolute',
						shape		: 'circle',
						offset		: 0,
						color		: '#000',
						size		: 14
					},
					background		: {
						opacity		: .7
					},
					main			: {
						color		: ['#c3c3c3','#d4d4d4'],
						offset		: 1,
						size		: 12
					},
					reflect			: {
						size		: 8,
						color		: ['#FFF', '#FFF'],
						opacity		: [0.8, 0.2],
						offset		: [1, 3]
					}
				}
			},
			'selected'		: {
				layers				: {
					dot				: {
						offset		: 4,
						size		: 6,
						opacity		: .7
					}
				}
			}
		}
	},
	
	select : {
		'default' : {
			'default' : {
				/* components properties */
				components			: {
					label			: {
						styles		: {
							zIndex			: 1,
							position		: 'absolute',
							left			: 0,
							padding			: '4px 39px 4px 16px',
							whiteSpace		:'nowrap'
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
						radius		: 4,
						position	: 'absolute'
					},
					littleshadow	: {
						offset		: ['0px', '0px', '0px','0px'],
						opacity		: [.1,.1],
						color		: ['#000','#000'],
						radius		: [8,8,8,8],
						position	: 'relative'
					},
					background		: {
						offset		: ['0px', '1px', '1px','1px'],
						opacity		: [1,1],
						color		: ['#5d5d5d','#5e5e5e'],
						radius		: [5,10,5,5],
						position	: 'relative'
					},
					main			: {
						offset		: [1, 22, 2, 2],
						color		: ['#c3c3c3','#d4d4d4'],
						radius		: [4, 0, 0, 4]
					},
					backButton			: {
						size		: [21, 'auto'],
						offset		: [0, 1, 3, 'auto'],
						color		: ['#3b3b55','#798491'],
						radius		: [0, 5, 5, 0]
					},
					button			: {
						size		: [19, 'auto'],
						offset		: [1, 2, 2, 'auto'],
						color		: ['#7b8997','#7b8997'],
						radius		: [0, 4, 4, 0]
					},
					
					reflect			: {
						color		: ['#FFF', '#FFF'],
						size		: ['auto', '36%'],
						opacity		: [.5, .3],
						offset		: [1, 3, 'auto', 3],
						radius		: [3, 3, 4, 4]
					},
					light			: {
						offset		: ['45%', '2px', '2px'],
						color		: ['#FFF', '#FFF'],
						opacity		: [0, 0.9],
						radius		: [5, 5, 4, 4]
					},
					arrowUp			: {
						shape		: 'triangle',
						color		: '#000',
						size		: [5, 4],
						offset		: ['auto', 10, '65%', 'auto']
					},
					arrowDown		: {
						shape		: 'triangle',
						rotation	: 180,
						color		: '#000',
						size		: [5, 4],
						offset		: ['55%', 10, 'auto', 'auto']
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
	
	label 		: {
		'default' : {
			'default' : {}
		},
		
		windowTitle : {
			'default' : {
				/* css properties */
				styles			: {
					overflow		: 'hidden',
					cursor			: 'default',
					color			: '#000000',
					display			: 'block',
					padding			: '0px 70px 0px 2px',
					textAlign		: 'center',
					textTransform	: 'capitalize',
					fontWeight		: 'normal',
					fontSize		: '13px',
					lineHeight		: '20px',
					height			: '20px'
				}
			}
		},
		transparentTitle : {
			'default' : {
				/* css properties */
				styles			: {
					overflow		: 'hidden',
					cursor			: 'default',
					color			: '#fff',
					display			: 'block',
					padding			: '0px 70px 0px 2px',
					textAlign		: 'center',
					textTransform	: 'capitalize',
					fontWeight		: 'normal',
					fontSize		: '12px',
					lineHeight		: '20px',
					height			: '20px'
				}
			}
		}
	},
	
	window : {
		'default' : {
			'default' : {
				/* components */
				components			: {
					controls		: {
						padding		: '3px 2px 0px 4px'
					},
					control			: {
						type		: 'window',
						width		: 15,
						height		: 15,
						styles		: {
							margin	: '0 2px 0 0'
						}
					},
					title			: {
						type		: 'windowTitle' 
					},
					view			: {
						type		: 'defaultWindow'
					}
				},
				
				borderSize			: 1,
				
				/* layers properties */
				layers				: {
					'default'		: {
						position	: 'relative',
						shape		: 'roundedRect',
						offset		: 1,
						color		: '#FFFFFF',
						opacity		: 1,
						radius		: 5
					},
					shadow			: {
						size		: 42,
						offsetY		: 10
					},
					background		: {
						offset		: 0,
						color		: '#000',
						opacity		: .20,
						radius		: 5
					},
					underlay		: {
						color		: ['#dcdcdc','#404040'],
						offset		: [1, 1, 'auto'],
						size		: ['auto', 20],
						radius		: [4,4,0,0]
					},
					head			: {
						color		: ['#C4C4C4','#989898'], 
						offset		: [1, 0],
						radius		: [4,4,0,0]
					},
					footline		: {
						position	: 'absolute',
						size		: ['auto', 20],
						color		: '#333',
						offset		: ['auto', 1, 3],
						radius		: 0
					},
					footback		: {
						position	: 'absolute',
						size		: ['auto', 20],
						color		: ['#fff','#404040'],
						offset		: ['auto', 1, 2],
						radius		: [0,0,4,4]
					},
					foot			: {
						position	: 'absolute',
						size		: ['auto', 20],
						color		: ['#C2C2C2','#989898'],
						offset		: ['auto', 1, 1],
						radius		: [0,0,4,4]
					}
				}
			},
			inactive				: {
				layers				: {
					shadow			: {
						offsetY		: 8,
						magnify		: -5
					},
					background		: {
						opacity		: 0.17
					},
					underlay		: {
						color		: ['#f1f1f1','#878787']
					},
					head			: {
						color		: ['#e8e8e8','#d0d0d0']
					},
					foot			: {
						color		: ['#e8e8e8','#d0d0d0']
					}
				}
			},
			minimized				: {
				layers				: {
					head			: {
						color		: ['#CACACA','#CFCFCF']
					},
					foot			: {
						color		: ['#CACACA','#CFCFCF']
					}
				}
			}
		},
		transparent : {
			'default' : {
				/* components */
				components			: {
					controls		: {
						padding		: '2px 2px 1px 2px'
					},
					control			: {
						type		: 'transparent',
						width		: 15,
						height		: 15,
						styles		: {
							margin	: '0 2px 0 0'
						}
					},
					title			: {
						type		: 'transparentTitle' 
					},
					view			: {
						type		: 'transparent'
					}
				},
				
				borderSize			: 1,
				
				/* layers properties */
				layers				: {
					reorder			: ['shadow','background','head','reflect'],
					'default'		: {
						position	: 'relative',
						shape		: 'roundedRect',
						offset		: 1,
						color		: '#FFF',
						opacity		: 1,
						radius		: 5
					},
					shadow			: {
						size		: 16,
						offsetY		: 5
					},
					background		: {
						offset		: 0,
						color		: '#000',
						opacity		: .50,
						radius		: 7
					},
					head			: {
						color		: '#fff', 
						offset		: [1, 1, 'auto'],
						opacity		: .1,
						radius		: [5,5,0,0],
						size		: ['auto', 18]
					},
					reflect		: {
						color		: '#fff',
						offset		: [0, 0, 'auto'],
						size		: ['auto', 9],
						opacity		: .05,
						radius		: [5,5,0,0]
					}
				}
			},
			inactive				: {
				layers				: {
					reorder			: ['shadow','background'],
					shadow			: {
						offsetY		: 2,
						size		: 20,
						
						magnify		: 0
					}
				}
			},
			minimized				: {
				layers				: {
					head			: {
						color		: ['#CACACA','#CFCFCF']
					},
					foot			: {
						color		: ['#CACACA','#CFCFCF']
					}
				}
			}
		}
	},
	
	/*
	panel : {
		'default' : {
			'default' : {

				titleFontColor		: '#000000',
				titleFontFamily		: 'arial, helvetica, verdana ,sans-serif',
				titlePadding		: '0px 70px 0px 2px',
				titleTextAlign		: 'center',
				titleTextTransform	: 'capitalize',
				titleFontWeight		: 'normal',
				titleOpacity		: '1',
				titleFontSize		: '10px',
				titleLineHeight		: '15px',
				titleHeight			: '12px',
				
				borderSize			: 1,
				shadowSize			: 32,
				shadowOffsetX		: 0, 
				shadowOffsetY		: 10, 

				

				defaultPosition		: 'relative',
				defaultShape		: 'roundedRect',
				defaultOffset		: 1,
				defaultColor		: '#FFFFFF',
				defaultOpacity		: 1,
				defaultRadius		: 0,
				
				layers				: ['background', 'underlay', 'head', 'footback', 'foot'],
				
				backgroundOffset	: 0,
				backgroundColor		: '#000',
				backgroundOpacity	: .27,
				backgroundRadius	: 0,
				
				underlayColor		: ['#dcdcdc','#404040'],
				underlayOffset		: [1, 1, 'auto'],
				underlaySize		: ['auto', 20],
				underlayRadius		: 0,
				
				headColor			: ['#C4C4C4','#989898'], 
				headOffset			: [1, 0],
				headRadius			: 0,
			
				footbackPosition	: 'absolute',
				footbackSize		: ['auto', 21],
				footbackColor		: ['#fff','#404040'],
				footbackOffset		: ['auto', 1, 2],
				footbackRadius		: 0,
				
				
				footPosition		: 'absolute',
				footSize			: ['auto', 21],
				footColor			: ['#C2C2C2','#989898'],
				footOffset			: ['auto', 1, 1],
				footRadius			: 0,
				
				

				controlType			: 'smallRound',
				controlSize			: [10,10],
				controlPadding		: '0px 2px 0px 5px'
			},
			inactive	: {
				shadowSize			: 32,
				shadowOffsetX		: 0, 
				shadowOffsetY		: 8, 
				
				backgroundOpacity	: 0.17,
				headColor			: ['#e8e8e8','#d0d0d0'],
				footColor			: ['#e8e8e8','#d0d0d0'],
				underlayColor		: ['#f1f1f1','#878787'],
			},
			minimized				: {
				headColor			: ['#CACACA','#CFCFCF'],
				footColor			: ['#CACACA','#CFCFCF']
			}
		},
		transparent : {
			'default' : {
				
			},
			minimized : {
				headColor			: ['#CACACA','#989898'],
				footColor			: ['#C2C2C2','#989898']
			},
			active : { }
		}
	},
	*/
	
	view : {
		'default' : {
			'default' : {}
		},
		transparent : {
			'default' : {
				styles				: {
					color			: 'transparent'
				}
			}
		},
		login : {
			'default' : {}
		},
		small : {
			'default': {
				styles				: {
					color			: 'transparent'
				},
				iconSize: 32
			}
		},
		defaultWindow	: {
			'default' : {
				styles			: {
					position		: 'relative',
					zIndex			: 1,
					backgroundColor : '#fff'
				}
			}
		}
	},
	menu : {
		'default' : {
			'default' : {
				/* sortcuts */
				shortcuts			: {
					itemStyles		: 'components.menuItem.styles'
				},
				
				/* components properties */
				components			: {
					wrapper			: {
						styles		: {
							padding	: '6px 1px'
						}
					},
					menuItem		: {
						styles		: {
							color		: '#000',
							padding		: '4px 40px 5px 16px',
							whiteSpace	: 'nowrap',
							display		: 'block'
						}
					},
					separator		: {
						styles		: {
							paddingBottom 	: '5px',
							fontSize		: 1,
							borderBottom 	: '1px solid #e4e4e4',
							margin 			: '0 1px 5px',
							display			: 'block',
							height			: 0
						}
					}
				},
				
				/* css properties */
				styles				: {},

				/* effects settings */
				hideFxDuration		: 100,
				showDelay			: 100,
				
				/* layers properties */
				layers				: {
					'default'		: {
						radius		: 4
					},
					shadow			: {
						size		: 32,
						offsetY		: 10
					},
					background		: {
						color		: '#000',
						offset		: 0,
						opacity		: .27
					},
					main			: {}
				}
			},
			over : {
				/* components properties */
				components			: {
					menuItem		: {
						styles		: {
							color	: '#ddd'
						}
					}
				}
			}
		},
		context: {
			'default': {
				layers				: {
					'default'		: {
						radius		: 4
					}
				}
			}
		}
	},
		
	toolbar : {
		'default' : {
			'default' : {
				/* sortcuts */
				shortcuts			: {
					itemStyles		: 'components.menuItem.styles'
				},
				
				/* components properties */
				components			: {
					wrapper			: {
						styles		: {
							padding	: '0 0 0 10px'
						}
					},
					menuItem		: {
						styles		: {
							padding		: '30px 10px 5px',
							lineHeight	: '1em',
							whiteSpace	: 'nowrap'
						}
					},
					separator		: {
						styles		: {
							display: 'none'
						}
					}
				},
				
				styles				: {
					padding			: '2px 0 0 0'
				},
				
				
				/* others properties */
				height				: 51,
				presentation		: 'both',
				hideFxDuration		: 200,
				showDelay			: 0,
				delay				: 500,
				
				/* layers properties */
				layers				: {
					'default'		: {
						position	: 'absolute',
						color		: ['#C4C4C4','#989898'],
						offset		: [0,0,1]
					},
					background		: {
						position	: 'relative',
						color		: ['#FFF', '#000'],
						offset		: 0
					},
					main			: {}
				}
			}
		},
		window : {
			'default' : {
				height				: 48,
				layers				: {
					reorder			: []
				},
				itemPadding			: 0,
				presentation		: 'icon',
				padding				: '5px 0 4px 8px'
			},
			layers 					: {
				reorder				: []
			}
		}
	},
	splitview: {
		shared: {
			shared: {
								
			}
		},
		'default': {
			active: {}
		},
		'app': {
			active: {
				'float'				: 'left',
				overflow			: 'hidden'
			},
			main: {
				'float'				: 'left',
				overflow			: 'hidden'
			},
			side: {
				'float'				: 'left',
				overflow			: 'hidden',
				backgroundColor		: '#d6dde5',
				borderRight			: '1px solid #8b8b8b'
			},
			splitter: {
				width:'7px',
				opacity:'.3'
			}
		}
	},
	element : {
		'default' : {
			'default' : {}
		},
		menuRollover : {
			'default' : {
				/* layers properties */
				layers				: {
					background		: {
						color		: ['#606971','444f5a'],
						offset		: 0
					},
					main			: {
						color		: ['#6b737b','#555e69'],
						offset		: [1, 0]
					}
				}
			}
		},
		toolbarRollover : {
			'default' : {
				/* layers properties */
				layers				: {
					'default'		: {
						offset		: [3,0,1],
						color		: '#fff',
						radius		: 6
					},
					background		: {
						color		: ['#606971','444f5a']
					},
					main			: {
						color		: ['#6b737b','#555e69'],
						offset		: [1, 0]
					},
					reflect			: {
						color		: ['#fff','#fff'],
						offset		: [1,2,'35%'],
						opacity		: [.1,0],
						radius		: [5,5,0,0]
					}
				}
			}
		},
		menuRightArrow : {
			'default' : {
				width		: 9,
				height		: 10,
				
				/* layers properties */
				layers				: {
					main			: {
						shape		: 'triangle',
						rotation	: 90,
						color		: '#333'
					}
				}
			},
			'over' : {
				layers				: {
					main			: {
						color		: '#FFF'
					}
				}
			}
		},
		menuArrow : {
			'default' : {
				/* layers properties */
				layers				: {
					background		: {
						color		: '#FFF',
						radius		: [4,4,0,0]
					},
					arrow			: {
						shape		: 'triangle',
						size		: [10, 9],
						color		: '#333',
						offset		: ['30%', '46%']
					}
				}
				
				
			},
			up : {},
			
			down : {
				layers				: {
					background		: {
						radius		: [0,0,4,4]
					},
					arrow			: {
						shape		: 'triangle',
						rotation	: 180
					}
				}
			}
		}
	},
	bubble : {
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
		'bottom' : {
			'default' : {
				components			: {
					label			: {
						styles		: {
							padding	: '13px 8px 6px'
						}
					}
				},
				
				layers				: {
					background		: {
						offset		: [8,0,0]
					},
					arrow			: {
						shape		: 'triangle',
						rotation	: 0,
						offset		: [0,0,'auto',20]
					}
				}
			}
		}
	},
	box : {
		'default' : {
			'default': {
				/* css properties */
				padding: '2px 16px 4px 16px',
				
				/* layers properties */
				
				layers: {
					background	: {
						offset: ['0px', '1px', '1px', '1px'],
						color: '#cccccc',
						opacity: 1,
						radius: 8
					},
					main: {
						mainOffset: ['1px', '1px', '4px', '1px'],
						mainColor: '#FFF',
						mainOpacity: 1,
						mainRadius: 7
					},
					reflect: {
						size: ['auto', 30],
						offset: ['2px', '0px', 'auto'],
						color: ['#F1F1F1', '#FFF'],
						opacity: 1,
						radius: [7, 7, 0, 0]
					}
				}
			}
		}
	},
	scrollbar						: {
		track						: {
			'default'					: {
				styles                                          : {
					'float'                                 : 'right',
					height                                  : '100%',
					position                                : 'relative',
					zIndex                                  : '10000'
				},
				layers				: {
					reorder			: ['back', 'main', 'side'],
					'default'		: {
						position	: 'absolute'
					},
					back			: {
						offset		: [0,0,0,0],
						color		: '#fff'
					},
					main			: {
						offset		: [0,'40%',0,0],
						
						gradient	: {
							color	: ['#c5c5c5','#fcfcfc'],
							angle	: 0
						}
					},
					side			: {
						offset		: [0,0,0,'80%'],
						gradient	: {
							angle	: 0,
							color	: ['#fcfcfc','#efefef']
						}
					}
				}
			}
		},
		thumb						: {
			'default'				: {
				styles 				: {
					position		: 'relative',
					margin			: '5px 0'
				},
				layers				: {
					'default'		: {
						direction	: 'vertical'
					},
					emboss			: {
						offset		: [1,0,1,0],
						color		: '#000',
						radius		: 9,
						opacity		: .3
					},
					main			: {
						gradient	: {
							color	: ['#091d38','#5c5c5c'],
							angle	: 0
						},
						radius		: 7
					},
					light			: {
						gradient	: {
							color	: ['#fff','#fff'],
							opacity	: [.1,.9],
							angle	: 0
						},
						radius		: 6
					},
					reflect			: {
						gradient	: {
							color	: ['#fff','#fff'],
							opacity	: [.8,.5],
							angle	: 0
						},
						offset		: [4,'65%',3,0],
						radius		: [3,2,2,3]
					}
				}
			}
		}
	}
}
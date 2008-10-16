/*
Object: UI.Skin.GreyGlass
	Define 
	
Implement:
	UI.Skin

Arguments:
		no

*/

UI.Skin.implement({
	GreyGlass : {		
		'default'				: {
			/* css properties */
			styles				: {
				color			: '#1d1d1d',
				fontFamily		: 'Helvetica, Lucida Grande, Verdana, Arial, sans-serif',
				fontSize		: '14px',
				fontWeight		: 'normal',
				lineHeight		: '1.2em'
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
			shadows				: [
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
					components		: {
						label		: {
							styles	: {
								zIndex		: 1,
								fontWeight	: 'normal',
								position	: 'absolute',
								cursor		: 'pointer',
								top			: 0,
								left		: 0,
								padding		: '5px 16px',
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
						background		: {
							offset		: ['0px', '1px', '1px','1px'],
							color		: ['#494949','#666666'],
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
							offset		: ['65%', '5px', '2px'],
							color		: ['#FFF', '#FFF'],
							opacity		: [.1, .7],
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
							color		: ['#3e8ddc','#3e8ddc']
						}
					}
				}
			},
			round : {
				'default' : {
					layers				: {
						'default'		: {
							position	: 'absolute',
							shape		: 'circle',
							radius		: 7
						},
						emboss			: {
							offset		: [8, 8],
							color		: '#FFF',
							opacity		: .4
						},
						background		: {
							offset		: [7, 8],
							radius		: 7,
							color		: ['#2e323d','#848995']
						},
						main			: {
							radius		: 5.5,
							offset		: [7.5, 8],
							color		: ['#fff','#fff'],
							opacity		: [.2,.8]
						},
						reflect			: {
							radius		: 1.5,
							offset		: [3, 8],
							color		: ['#fff','#fff'],
							opacity		: [1, .5]
						},
						light			: {
							shape		: 'roundedRect',
							size		: [2,1],
							radius		: 0,
							offset		: [1, 7],
							color		: '#545861',
							opacity		: 1
						}
					}
				},
				'small' : {					
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
							radius		: 4
						},
						emboss			: {
							offset		: [3, 3],
							color		: '#FFF',
							opacity		: .27
						},
						background		: {
							offset		: [2, 3],
							radius		: 4,
							color		: ['#3b424d','#9ba0ab']
						},
						main			: {
							radius		: 3,
							offset		: [2, 3],
							color		: ['#616975','#e8e8e8']
						},
						reflect			: {
							radius		: 1,
							offset		: [1, 3],
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
							radius		: [3, 3, 2, 2]
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
								zIndex			: 1,
								position		: 'absolute',
								top				: 0,
								left			: 0,
								background		: 'transparent',
								resize			: 'none',
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
							radius		: 4
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
							color		: ['#F4F4F4','#FFF']
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
		
		textarea : {
			'default' : {
				'default' : {
					width				: 300,
					height				: 150,
					
					components			: {
						input			: {
							styles		: {
								padding		: '4px 4px 3px',
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
							radius		: 4
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
							color		: ['#F4F4F4','#FFF']
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
				'default' : {
					styles			: {
						position	: 'relative',
						display		: 'inline-block'
					},
					
					labelStyles			: {
						zIndex			: 1,
						position		: 'absolute',
						top				: 0,
						left			: 0,
						whiteSpace		:'nowrap',
						padding			: '1px 0 1px 18px'
					},
					
					/* layers properties */
					layers				: {
						'default'		: {
							offset		: 1,
							radius		: 4
						},
						background		: {
							size		: 14,
							offset		: '0px',
							color		: '#000',
							opacity		: .7
						},
						main			: {
							radius		: 3,
							color		: ['#c3c3c3','#d4d4d4']
						},
						reflect			: {
							color		: ['#FFF', '#FFF'],
							opacity		: [0.8, 0.2],
							offset		: [0, 0, '50%']
						}
					}
				},
				'checked' : {
					layers				: {
						tick1			: {
							position	: 'absolute',
							shape		: 'line',
							stroke		: 2,
							color		: '#333',
							offset		: [4,3],
							size		: [4,6]
						},
						tick2			: {
							position	: 'absolute',
							shape		: 'lineUp',
							stroke		: 2,
							color		: '#333',
							offset		: [0,7],
							size		: [7,9]
						}
					}
				}
			},
			'touch' : {
				'default' : {
					width				: 14,
					height				: 14,
					
					/* layers properties */
					layers				: {
						'default'		: {
							shape		: 'roundedRect',
							offset		: 1,
							color		: '#000',
							opacity		: 1,
							radius		: 4
						},
						background		: {
							offset		: 0,
							opacity		: .7
						},
						main			: {
							radius		: 3
						},
						reflect			: {
							color		: ['#FFF', '#FFF'],
							opacity		: [0.8, 0.2],
							offset		: [0, 0, '50%']
						}
					}
				},
				'checked' : {}
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
							offset		: 7,
							color		: '#000',
							radius		: 7,
							size		: 14
						},
						background		: {
							opacity		: .7
						},
						main			: {
							color		: ['#c3c3c3','#d4d4d4'],
							radius		: 6
						},
						reflect			: {
							radius		: 4,
							color		: ['#FFF', '#FFF'],
							opacity		: [0.8, 0.2],
							offset		: [5, 7]
						}
					}
				},
				'selected'		: {
					layers				: {
						dot				: {
							radius		: 3,
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
								padding			: '3px 25px 3px 16px',
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
						background		: {
							offset		: ['0px', '1px', '1px','1px'],
							opacity		: [1,1],
							color		: ['#5d5d5d','#5e5e5e'],
							radius		: 5,
							position	: 'relative'
						},
						main			: {
							offset		: [1, 22, 2, 2],
							color		: ['#c3c3c3','#d4d4d4'],
							radius		: [4, 0, 0, 4]
						},
						button			: {
							size		: [19, 'auto'],
							offset		: [1, 2, 2, 'auto'],
							color		: ['#3e8ddc','#3e8ddc'],
							radius		: [0, 4, 4, 0]
						},
						reflect			: {
							color		: ['#FFF', '#FFF'],
							size		: ['auto', '36%'],
							opacity		: [.8, .2],
							offset		: [1, 3, 'auto', 3],
							radius		: [3, 3, 4, 4]
						},
						light			: {
							offset		: ['65%', '2px', '2px'],
							color		: ['#FFF', '#FFF'],
							opacity		: [.1, .5],
							radius		: [4, 4, 4, 4]
						},
						arrowUp			: {
							shape		: 'triangleUp',
							color		: '#000',
							size		: [5, 4],
							offset		: ['auto', 10, '63%', 'auto']
						},
						arrowDown		: {
							shape		: 'triangleDown',
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
					/* components properties */
					components			: {
						knob			: {
							styles		: {
								position		: 'relative',
								marginTop		: '1px',
								zIndex			: 1,
								display			: 'block'
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
						background		: {
							color		: '#000',
							offset		: 0,
							opacity		: .5,
							radius		: 12
						},
						main			: {
							offset		: 1,
							color		: ['#c5c5c5','#fafafa'],
							radius		: 11
						}
					}
				}
			},
			'knob' : {
				'default' : {}
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
			}
		},
		
		window : {
			'default' : {
				'default' : {
					/* components */
					components			: {
						controls		: {
							padding		: '3px 2px 0px 5px'
						},
						control			: {
							type		: 'round',
							width		: 15,
							height		: 15,
							styles		: {
								margin	: '0 2px 0 0'
							}
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
							radius		: 4
						},
						shadow			: {
							size		: 64,
							offsetY		: 10
						},
						background		: {
							offset		: 0,
							color		: '#000',
							opacity		: .27,
							radius		: 4
						},
						underlay		: {
							color		: ['#dcdcdc','#404040'],
							offset		: [1, 1, 'auto'],
							size		: ['auto', 20],
							radius		: [3,3,0,0]
						},
						head			: {
							color		: ['#C4C4C4','#989898'], 
							offset		: [1, 0],
							radius		: [3,3,0,0]
						},
						footback		: {
							position	: 'absolute',
							size		: ['auto', 21],
							color		: ['#fff','#404040'],
							offset		: ['auto', 1, 2],
							radius		: [0,0,3,3]
						},
						foot			: {
							position	: 'absolute',
							size		: ['auto', 21],
							color		: ['#C2C2C2','#989898'],
							offset		: ['auto', 1, 1],
							radius		: [0,0,3,3]
						}
					}
				},
				inactive				: {
					layers				: {
						shadow			: {
							size		: 8,
							offsetX		: 0, 
							offsetY		: 8
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
				'default' : {},
				minimized : {
					layers				: {
						head			: {
							color		: ['#CACACA','#989898']
						},
						foot			: {
							color		: ['#C2C2C2','#989898']
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
					/* components properties */
					components			: {
						menuItem		: {
							styles		: {
								padding		: '2px 40px 2px 16px',
								lineHeight	: '1em',
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
					padding				: '6px 1px',

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
					},
					
					/* others */
					selectFontColor		: '#ddd',
					selectBorderSize	: 1,
					selectBorderColor	: '#000'
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
					/* components properties */
					components			: {
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
					
					/* css properties */
					padding				: '0 0 0 10px',

					styles				: {
						padding			: '2px 0 4px 0'
					},
					
					
					/* others properties */
					height				: 51,
					presentation		: 'both',
					hideFxDuration		: 100,
					showDelay			: 0,
					iconSize			: 25,
					iconPadding			: '5px 0 0 0',
					iconPosition		: 'top',
					selectFontColor		: '#ddd',
					delay				: 500,
					
					/* layers properties */
					layers				: {
						'default'		: {
							position	: 'absolute',
							color		: ['#C4C4C4','#989898'],
							offset		: [1,0]
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
					height				: 32,
					layers				: {
						reorder			: []
					},
					itemPadding			: 0,
					presentation		: 'icon',
					padding				: '5px 0 4px 8px'
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
							shape		: 'triangleRight',
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
							shape		: 'triangleUp',
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
							shape		: 'triangleDown'
						}
					}
				}
			}
		},
		tip : {
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
							shape		: 'triangleDown',
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
							shape		: 'triangleUp',
							offset		: [0,0,'auto',20]
						}
					}
				}
			}
		},
		box : {
			'default' : {
				'default' : {
					/* css properties */
					padding				: '2px 16px 4px 16px',
					
					/* layers properties */
					layers				: ['background','main','reflect'],
					
					defaultRadius		: 10,
					
					backgroundOffset	: ['0px', '1px', '1px','1px'],
					backgroundColor		: '#cccccc',
					backgroundOpacity	: 1,
					backgroundRadius	: 8,
					
					mainOffset			: ['1px', '1px', '4px','1px'],
					mainColor			: '#FFF',
					mainOpacity			: 1,
					mainRadius			: 7,
					
					reflectSize			: ['auto',30],
					reflectOffset		: ['2px', '0px', 'auto'],
					reflectColor		: ['#F1F1F1', '#FFF'],
					reflectOpacity		: 1,
					reflectRadius		: [7, 7, 0, 0]
				}
			}
		},
		scrollbar						: {
			track						: {
				'default'					: {
					layers				: {
						'default'		: {
							position	: 'absolute',
							direction	: 'vertical'
						},
						back			: {
							offset		: [0,0,0,0],
							color		: '#fff'
						},
						main			: {
							offset		: [0,'40%',0,0],
							color		: ['#c5c5c5','#fcfcfc']
						},
						side			: {
							offset		: [0,0,0,'80%'],
							color		: ['#fcfcfc','#efefef']
						}
					}
				}
			},
			thumb						: {
				'default'				: {
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
							color		: ['#091d38','#5c5c5c'],
							radius		: 7
						},
						light			: {
							color		: ['#fff','#fff'],
							radius		: 6,
							opacity		: [.1,.9]
						},
						reflect			: {
							offset		: [4,'65%',3,0],
							color		: ['#fff','#fff'],
							radius		: [3,2,2,3],
							opacity		: [.8,.5]
						}
					}
				}
			}
		}
	}
 });

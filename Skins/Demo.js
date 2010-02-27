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
		styles: {
			fontFamily: 'Helvetica, Arial, sans-serif'
		},
		
		/* layers properties */
		layers: {
			'default': {
				position: 'relative',
				shape: 'roundedRect',
				offset: 1,
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

	label: {
		'default': {
			'default': {
				components: {
					emboss: {
						styles: {
							position: 'absolute',
							margin: '0',
							color: '#fff',
							top: '1px',
							opacity: '0.8',
							zIndex: '-1'
						}
					},
					image: {
						styles: {
							'float': 'left',
							margin: '-2px 5px 0 0'
						}
					}
				}
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
						opacity: 0.1
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
						opacity: [0.8, 0.3],
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

		hardest: {
			'default': {
				components: {
					label: {
						styles: {
							fontSize: '16px',
							fontWeight: 'bold',
							opacity: '.7',
							padding: '18px 26px',
							color: '#fff'
						}
					}
				},
				layers: {
					def: ['emboss', 'front', 'reflect'],
					
					emboss: {
						offset: 0,
						color: '#000',
						opacity: 0.17,
						radius: 9
					},
					front: {
						offset: 3,
						color: ['#cc0033', '#000'],
						opacity: 1,
						radius: 7
					},
					reflect: {
						offset: ['2px', '2px', '65%'],
						color: ['#FFF', '#FFF'],
						opacity: [0.8, 0.0],
						radius: [5, 5, 6, 6]
					}
				}
			},
			over: {
				layers: {
					emboss: {
						color: '#00CC00'
					}
				}
			},
			down: {
				components: {
					label: {
						styles: {
							color: '#ccc'
						}
					}
				}
			}
		},
		
		widget: {
			'default': {
				components: {
					label: {
						styles: {
							fontSize: '32px',
							fontWeight: 'bold',
							opacity: '.7',
							padding: '24px 26px',
							color: '#fff'
						}
					}
				},
				
				layers: {
					def: ['emboss', 'front', 'reflect', 'reflect2'],
					'default': {
						rotation: 3
					},
					
					emboss: {
						offset: 5,
						color: ['#000', '#fff'],
						opacity: 0.3,
						radius: 9
					},
					front: {
						offset: 2,
						color: ['#b11a23', '#000'],
						opacity: 1,
						radius: 7
					},
					reflect: {
						offset: [1, 0, '60%', 2],
						color: ['#FFF', '#FFF'],
						opacity: [0.6, 0.1],
						radius: [5, 5, 9, 9]
					},
					reflect2: {
						offset: [1, 1, 2],
						color: ['#000', '#000'],
						opacity: [0.1, 0],
						radius: [7, 7, 9, 9]
					}
				}
			},
			over: {
				components: {
					label: {
						styles: {
							opacity: 0.8
						}
					}
				},
				layers: {
					emboss: {
						color: '#00CC00'
					}
				}
			},
			down: {
				components: {
					label: {
						styles: {
							color: '#ccc'
						}
					}
				}
			}
		},
		
		
		jgood: {
			'default': {
				components: {
					label: {
						styles: {
							fontSize: '11px',
							fontWeight: 'bold',
							fontFamily: 'Arial, Helvetica',
							opacity: 1,
							padding: '10px 16px',
							color: '#fff',
							display:'block'
						}
					}
				},
				
				shortcuts: {
					color: 'layers.front.color'
				},
				
				styles: {
					margin: '1px 3px 0px'
				},
				
				layers: {
					def: ['emboss', 'background', 'front', 'reflect'],
					
					emboss: {
						offset: '0px',
						color: '#000',
						opacity: 0.17,
						radius: 7
					},
					background: {
						offset: 2,
						color: ['#2a5179', '#2a5179'],
						opacity: 1,
						radius: 6
					},
					front: {
						offset: 1,
						color: ['#6094cf', '#1d5591'],
						opacity: 1,
						radius: 5
					},
					reflect: {
						offset: ['1px', '1px', '35%'],
						color: ['#FFF', '#FFF'],
						opacity: [0.1, 0],
						radius: [4, 4, 4, 4]
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
				},
				layers: {
					reflect: {
						gradient: {
							color: ['#FFF', '#FFF'],
							opacity: [0.2, 0]
						}
					}
				}
			},
			down: {
				styles: {
				
					color: '#000'
				},
				layers: {
					reflect: {
						gradient: {
							color: ['#FFF', '#FFF'],
							opacity: [0, 0]
						}
					}
				}
			}
		},
		
		rose: {
			'default': {
				layers: {
					def: ['emboss', 'front', 'reflect', 'dark'],
					
					emboss: {
						offset: 0,
						color: '#cc0033',
						opacity: 0.17,
						radius: 9
					},
					front: {
						offset: 3,
						color: ['#cc0033', '#cc0033'],
						opacity: 1,
						radius: 7
					},
					reflect: {
						offset: ['1px', '1px', '65%'],
						color: ['#FFF', '#FFF'],
						opacity: [0.8, 0.0],
						radius: [5, 5, 14, 14]
					},
					dark: {
						position: 'absolute',
						size: ['auto', '20px'],
						offset: ['auto', 4, 4],
						color: ['#fff', '#fff'],
						opacity: [0, 0.5],
						radius: [14, 14, 5, 5]
					}
				}
			},
			over: {
				components: {
					label: {
						styles: {
							opacity: 0.5
						}
					}
				},
				layers: {
					emboss: {
						color: '#00AA00'
					}
				}
			},
			down: {
				components: {
					label: {
						styles: {
							opacity: 0.5,
							color: '#000'
						}
					}
				},
				layers: {
					emboss: {
						color: '#00AA00'
					}
				}
			}
		},
		
		
		'speedtest': {
			'default': {}
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
							color: '#fff'
						}
					}
				},
				/* shortcuts */
				shortcuts: {
					color: 'layers.front.color'
				},
				
				styles: {
					margin: '3px'
				},
				
				layers: {
					def: ['emboss', 'front', 'reflect'],
					
					emboss: {
						offset: '0px',
						color: '#000',
						opacity: 0.17,
						radius: 7
					},
					
					front: {
						offset: 2,
						opacity: 1,
						color: '#000',
						radius: 5
					},
					reflect: {
						offset: ['2px', '2px', '35%'],
						
						gradient: {
							color: ['#FFF', '#FFF'],
							opacity: [0.9, 0.1]
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
							opacity: '0.7',
							color: '#fff'
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
				layers: {
					front: {
						color: '#000'
					}
				}
			}
		},
		tube: {
			'default': {
				components: {
					label: {
						styles: {
							opacity: 1,
							color: '#FFF'
						}
					}
				},
				styles: {
					color: '#FFF',
					opacity: 1
				},
				layers: {
					def: ['shadow', 'front', 'light', 'reflect'],
					
					shadow: {
						color: '#000',
						size: 4,
						offsetX: 0,
						offsetY: 0,
						opacity: 0.4,
						magnify: 1
					},
					
					front: {
						position: 'absolute',
						offset: '0px',
						color: '#fe3333',
						radius: 10
					},
					light: {
						position: 'absolute',
						offset: [2, 2, '40%'],
						gradient: {
							color: ['#FFF', '#fe3333', '#fe3333'],
							angle: 110
						},
						radius: [8, 8, 8, 8]
					},
					reflect: {
						position: 'absolute',
						offset: 0,
						gradient: {
							color: ['#fe3333', '#c32222'],
							opacity: [0, 1]
						},
						radius: 8
					}
				}
			},
			over: {
				components: {
					label: {
						styles: {
							opacity: 0.8
						}
					}
				}
			},
			down: {
				components: {
					label: {
						styles: {
							opacity: 0.8,
							color: '#ccc'
						}
					}
				}
			}
		}
	},
	
	bubble: {
		'default': {
			'default': {
				styles: {
					display: 'block',
					position: 'absolute',
					opacity: 0
				},
				
				components: {
					label: {
						styles: {
							zIndex: 1,
							position: 'absolute',
							top: 0,
							left: 0,
							cursor: 'default',
							color: '#FFF',
							padding: '6px 8px 4px',
							fontSize: '12px',
							fontWeight: 'bold',
							whiteSpace: 'nowrap'
						}
					}
				},
				
				layers: {
					def: ['shadow', 'border', 'base', 'reflect'],
					'default': {
						radius: 11,
						shape: 'roundedRect'
					},
					
					border: {
						offset: 0,
						color: '#fff',
						opacity: 1,
						radius: 11
					},
					shadow: {
						size:8,
						blur: 8,
						opacity: 1,
						color: '#000'
					},
					base: {
						offset: 2,
						color: ['#e8010d', '#a60000'],
						opacity: 1,
						radius: 10,
						shadow: {
							size:20,
							blur: 4,
							opacity: 0.8,
							color: '#000'
						}
					},
					
					reflect: {
						position: 'absolute',
						color: ['#FFFFFF', '#FFFFFF'],
						radius: [11, 11, 4, 4],
						opacity: [0.4, 0.1],
						offset: [1, 1, '55%']
					}
				},
				shortcuts: {
					labelStyles: 'components.label.styles'
				}
			}
		},
		'green': {
			'default': {
				components: {
					label: {
						styles: {
							zIndex: 1,
							position: 'absolute',
							top: 0,
							left: 0,
							cursor: 'default',
							color: '#FFF',
							padding: '8px 10px 18px',
							fontSize: '14px',
							whiteSpace: 'nowrap'
						}
					}
				},
				
				shortcuts: {
					labelStyles: 'components.label.styles'
				},
				
				styles: {
					display: 'block',
					position: 'absolute',
					opacity: 0
				},
				
				layers: {
				
					def: ['shadow', 'border', 'background', 'arrowborder', 'arrow', 'reflect'],
					
					'default': {
						position: 'absolute'
					},
					shadow: {
						size: 3,
						offsetY: 2,
						opacity: 1
					},
					border: {
						offset: [0, 0, 5, 0],
						color: '#fff',
						opacity: 1,
						radius: 5
					},
					
					background: {
						position: 'relative',
						offset: [2, 2, 7, 2],
						color: ['#33cc33', '#000'],
						opacity: 1,
						radius: 3
					},
					arrowborder: {
						position: 'absolute',
						shape: 'triangle',
						rotation: 180,
						size: [14, 7],
						offset: ['auto', 5, 0],
						opacity: 1,
						color: '#fff'
					},
					arrow: {
						position: 'absolute',
						shape: 'triangle',
						rotation: 180,
						size: [10, 5],
						offset: ['auto', 7, 3],
						opacity: 1,
						color: '#000'
					},
					reflect: {
						position: 'absolute',
						color: ['#FFFFFF', '#FFFFFF'],
						radius: [4, 4, 4, 4],
						opacity: [0.3, 0.05],
						offset: [1, 1, '55%']
					}
				}
			}
		},
		
		'bottom': {
			'default': {
				components: {
					label: {
						styles: {
							padding: '13px 8px 6px'
						}
					}
				},
				
				layers: {
					background: {
						offset: [8, 0, 0]
					},
					arrow: {
						shape: 'triangle',
						rotation: 0,
						offset: [0, 0, 'auto', 20]
					}
				}
			}
		}
	},
	
	input: {
		'default': {
			'default': {
				width: 200,
				components: {
					input: {
						styles: {
							padding: '4px',
							zIndex: 1,
							position: 'absolute',
							top: 0,
							left: 0,
							background: 'transparent',
							resize: 'none',
							whiteSpace: 'nowrap',
							border: 'none'
						}
					}
				},
				
				/* element css properties */
				styles: {
					position: 'relative',
					display: 'inline-block'
				},
				
				/* layers properties */
				layers: {
					'default': {
						radius: 0
					},
					emboss: {
						offset: [0, 1],
						color: '#000',
						opacity: 0.5
					},
					border: {
						offset: [1, 0, 0, 1],
						color: '#dbdbdb'
					},
					main: {
						offset: 1,
						color: '#FFF'
					}
				}
			},
			focus: {
				layers: {
					main: {
						color: ['#F4F4F4', '#FFF']
					}
				}
			}
		},
		'moz': {
			'default': {
				width: 200,
				components: {
					input: {
						styles: {
							padding: '4px 10px 4px 24px',
							zIndex: 1,
							position: 'absolute',
							top: 0,
							left: 0,
							background: 'transparent',
							resize: 'none',
							whiteSpace: 'nowrap',
							border: 'none'
						}
					}
				},
				
				/* element css properties */
				styles: {
					position: 'relative',
					display: 'inline-block'
				},
				
				/* layers properties */
				layers: {
				
				
				
					'default': {
						radius: 12,
						position: 'abolute'
					},
					emboss: {
						position: 'abolute',
						offset: [0, 0, 0, 0],
						color: ['#000', '#000'],
						opacity: [0.6, 0]
					},
					border: {
						radius: 11,
						position: 'abolute',
						offset: [1, 1, 0, 1],
						color: ['#cacaca', '#dbdbdb'],
						opacity: 1
					},
					main: {
						radius: 10,
						position: 'abolute',
						offset: [2, 2, 1, 2],
						color: '#FFF'
					},
					button: {
						shape: 'circle',
						radius: [7, 7, 7, 8],
						position: 'abolute',
						offset: 11,
						color: '#ff7c0a'
					},
					arrow: {
						shape: 'triangle',
						radius: [8, 8, 8, 8],
						position: 'abolute',
						offset: 13,
						color: '#fff'
					}
				
				}
			},
			focus: {
				layers: {
					main: {
						color: ['#F4F4F4', '#FFF']
					}
				}
			}
		}
	},
	
	slider: {
		'default': {
			'default': {
				width: 300,
				height: 40,
				
				/* element css properties */
				styles: {
					position: 'relative',
					display: 'inline-block'
				},
				
				/* layers properties */
				layers: {
					def: ['border', 'front', 'fakeShadow', 'reflect'],
					
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
						opacity: [0.2, 0],
						radius: [5, 5, 0, 0]
					},
					reflect: {
						position: 'absolute',
						offset: ['50%', '1px', '1px'],
						color: ['#FFF', '#FFF'],
						opacity: [0.05, 0.3],
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
				width: 40,
				//	height 		: 10,
				
				styles: {
					position: 'relative',
					zIndex: 1,
					display: 'block'
				},
				
				layers: {
					def: ['checkBg', 'check', 'checkFront'],
					
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
						opacity: [0.18, 0.02],
						radius: 4
					}
				}
			}
		}
	},
	
	checkbox: {
		'default': {
			'default': {
			
				width: 94,
				height: 27,
				
				styles: {
					position: 'relative',
					display: 'inline-block'
				},
				
				layers: {
					def: ['border', 'front', 'fakeShadow', 'on', 'on1', 'reflect', 'checkShadow', 'checkShadow2', 'checkBg', 'check', 'checkFront'],
					
					border: {
						offset: ['0px', '0px', '0px', '1px'],
						color: ['#093889', '#5289d7'],
						opacity: 1,
						radius: 4
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
						opacity: [0.2, 0],
						radius: [5, 5, 0, 0]
					},
					on: {
						position: 'absolute',
						shape: 'circle',
						offset: [5, 'auto', '1px', 58],
						color: '#FFF',
						opacity: 1,
						size: 18
					},
					on1: {
						position: 'absolute',
						shape: 'circle',
						offset: [7.5, 'auto', '1px', 60.5],
						color: '#407ee3',
						opacity: 1,
						size: 13
					},
					reflect: {
						position: 'absolute',
						offset: ['50%', '1px', '1px'],
						color: ['#FFF', '#FFF'],
						opacity: [0.05, 0.3],
						radius: [4, 4, 4, 4]
					},
					checkShadow: {
						position: 'absolute',
						offset: ['0px', '52px', '0px', '0px'],
						color: ['#000', '#000'],
						opacity: 0.1,
						radius: [5, 5, 5, 5]
					},
					checkShadow2: {
						position: 'absolute',
						offset: ['0px', '53px', '0px', '0px'],
						color: ['#000', '#000'],
						opacity: 0.1,
						radius: [5, 5, 5, 5]
					},
					checkBg: {
						position: 'absolute',
						offset: ['0px', '54px', '0px', '0px'],
						color: ['#919191', '#979797'],
						opacity: 1,
						radius: [5, 5, 5, 5]
					},
					check: {
						position: 'absolute',
						offset: ['1px', '54px', '1px', '1px'],
						color: ['#FFF', '#FFF'],
						opacity: 1,
						radius: [4, 4, 4, 4]
					},
					checkFront: {
						position: 'absolute',
						offset: ['2px', '54px', '1px', '1px'],
						color: ['#000', '#000'],
						opacity: [0.18, 0.02],
						radius: [4, 4, 4, 4]
					}
				}
			},
			'checked': {
				layers: {
					def: ['border', 'front', 'fakeShadow', 'off', 'reflect', 'checkShadow', 'checkShadow2', 'checkBg', 'check', 'checkFront'],
					
					border: {
						offset: ['0px', '1px', '0px', '0px']
					},
					off: {
						position: 'absolute',
						shape: 'roundedRect',
						offset: ['5px', '65px', '5px', '26px'],
						color: '#FFF',
						opacity: 1,
						radius: 2
					},
					checkShadow: {
						offset: ['0px', '0px', '0px', '52px']
					},
					checkShadow2: {
						offset: ['0px', '0px', '0px', '53px']
					},
					checkBg: {
						offset: ['0px', '0px', '0px', '54px']
					},
					check: {
						offset: ['1px', '1px', '1px', '54px']
					},
					checkFront: {
						offset: ['2px', '1px', '1px', '54px']
					}
				}
			}
		}
	},
	
	
	listview: {
		'default': {
			'default': {
				styles: {
					'float': 'left',
					overflow: 'hidden',
					height: '600px'
				},
				
				components: {
					item: {
						component: 'label'
					}
				}
			}
		}
	},
	
	itemList: {
		'default': {
			'default': {
			
				height: 40,
				
				components: {
					label: {
						styles: {
							zIndex: 1,
							fontWeight: 'normal',
							cursor: 'pointer',
							padding: '15px 16px 4px',
							display: 'block',
							whiteSpace: 'nowrap',
							lineHeight: '1em'
						}
					}
				},
				
				/* shortcuts */
				shortcuts: {
					labelStyles: 'components.label.styles'
				},
				
				/* layers properties */
				styles: {
					position: 'relative',
					display: 'block',
					fontSize: '.7em',
					width: '100%',
					padding: '0',
					margin: '0',
					top: '0px',
					left: '0px',
					overflow: 'hidden'
				},
				layers: {
					def: ['shadow', 'front', 'light', 'reflect'],
					
					shadow: {
						color: '#000',
						size: 4,
						offsetX: 0,
						offsetY: 0,
						opacity: 0.4,
						magnify: 1
					},
					
					front: {
						position: 'absolute',
						offset: '0px',
						color: '#fe3333',
						radius: 0
					},
					light: {
						position: 'absolute',
						offset: [2, 2, '40%'],
						gradient: {
							color: ['#FFF', '#fe3333', '#fe3333'],
							angle: 110
						},
						radius: 0
					},
					reflect: {
						position: 'absolute',
						offset: 0,
						gradient: {
							color: ['#fe3333', '#c32222'],
							opacity: [0, 1]
						},
						radius: 0
					}
				}
			},
			over: {}
		}
	},
	
	element: {
		'default': {
			'default': {
				styles: {
					display: 'inline-block'
				}
			}
		},


		complex: {
			'default': {
				height:150,
				width:150,
				
				
				/* element css properties */
				styles: {
					position: 'relative',
					display: 'inline-block',
					cursor: 'pointer'
				},
				
				/* layers properties */
				layers: {
					'def' : ['base','yes'],
					'default': {
						shape: 'complex',
						baseSize: [150, 150],
						def: [
							['moveTo', 75, 25], 
							['quadraticCurveTo', 25, 25, 25, 62.5], 
							['quadraticCurveTo', 25, 100, 50, 100], 
							['quadraticCurveTo', 50, 120, 30, 125], 
							['quadraticCurveTo', 60, 120, 65, 100], 
							['quadraticCurveTo', 125, 100, 125, 62.5], 
							['quadraticCurveTo', 125, 25, 75, 25]
						]
					},
					base: {
						color: ['#d4d4d4', '#000'],
						shadow: {
							size:16,
							blur: 32,
							offsetY: 2,
							opacity: 0.5,
							color: '#000'
						}
					},
					yes: {
						shape: 'complex',
						offset: -10,
						opacity: [0.6,0.1],
						position:'absolute',
						color: ['#fff', '#fff'],
						baseSize: [200, 200],
						def: [
							['moveTo', 75, 25], 
							['quadraticCurveTo', 25, 25, 25, 62.5], 
							['quadraticCurveTo', 25, 100, 50, 100], 
							['quadraticCurveTo', 125, 100, 125, 62.5], 
							['quadraticCurveTo', 125, 25, 75, 25]
						],
						stroke: {
							width: 1,
							opacity: 0.5,
							color: '#000'
						}
					}
				}
			},
			over: {
				layers: {
					main: {
					color: ['#d4d4d4', '#000']
					}
				}
			},
			down: {
				layers: {
					main: {
						color: ['#d4d4d4', '#000']
					}
				}
			}
		},
		heart: {
			'default': {
				height:150,
				width:150,
				
				/* element css properties */
				styles: {
					position: 'relative',
					display: 'inline-block',
					cursor: 'pointer'
				},
				
				/* layers properties */
				layers: {
					'def': ['base'],
					'default': {
						shape: 'complex',
						baseSize: [150, 150],
						def: [
							['moveTo', 75, 40], 
							['bezierCurveTo', 75, 37, 70, 25, 50, 25], 
							['bezierCurveTo', 20, 25, 20, 62.5, 20, 62.5], 
							['bezierCurveTo', 20, 80, 40, 102, 75, 120], 
							['bezierCurveTo', 110, 102, 130, 80, 130, 62.5], 
							['bezierCurveTo', 130, 62.5, 130, 25, 100, 25], 
							['bezierCurveTo', 85, 25, 75, 37, 75, 40]
						]
					},
					
					base: {
						opacity:'.8',
						color: ['#C00', '#600'],
						shadow: {
							size:16,
							blur: 132,
							offsetY: 0,
							opacity: 0.8,
							color: '#000'
						}
						//rotation: 100
					}
				}
			}
		},
		pacman: {
			'default': {
				height: 150,
				width: 150,
				
				/* element css properties */
				styles: {
					position: 'relative',
					display: 'inline-block',
					cursor: 'pointer'
				},
				
				/* layers properties */
				layers: {
					'def': ['main'],
					'default': {
						shape: 'complex',
						baseSize: [150, 150],
						def: [['arc', 37, 37, 13, Math.PI / 7, -Math.PI / 7, false], ['lineTo', 34, 37]]
					},
					
					main: {
						color:'#000'
					}
				}
			}
		},
		
		smiley: {
			'default': {
				height:150,
				width:150,
				
				/* element css properties */
				styles: {
					position: 'relative',
					display: 'inline-block',
					cursor: 'pointer'
				},
				/* layers properties */
				layers: {
					'def': ['main'],
					'default': {
						shape: 'complex',
						baseSize: [150, 150],
						def: [
							['arc',75,75,50,0,Math.PI*2,true], 
							['moveTo',110,75],
							['arc',75,75,35,0,Math.PI,false],   // Mouth (clockwise)
							['moveTo',65,65],
							['arc',60,65,5,0,Math.PI*2,true],  // Left eye
							['moveTo',95,65],
							['arc',90,65,5,0,Math.PI*2,true]  // Right eye
						]
					},
					
					main: {
						stroke: {
							width: 5,
							color:'#000'
						}
					}
				}
			}
		},	
			
		resizer: {
			'default': {
				width: 20,
				height: 20,
				styles: {
					position: 'absolute',
					right: 0,
					marginBottom: 0,
					bottom: 0,
					width: '24px',
					height: '24px',
					opacity: '.5',
					marginRight: '1px'
				},
				/* layers properties */
				layers: {
					'default': {
						position: 'absolute',
						shape: 'lineUp',
						opacity: 0.05,
						width: 1,
						color: '#000'
					},
					
					first: {
						offset: [6, 6],
						size: [11, 11]
					},
					second: {
						color: '#fff',
						offset: [7, 7],
						size: [10, 10]
					},
					third: {
						offset: [10, 10],
						size: [7, 7]
					},
					four: {
						color: '#fff',
						offset: [11, 11],
						size: [6, 6]
					},
					five: {
						offset: [14, 14],
						size: [3, 3]
					},
					six: {
						color: '#fff',
						offset: [15, 15],
						size: [2, 2]
					}
				}
			}
		},
		
		
		shape01: {
			'default': {
				styles: {
					border: '1px solid black',
					position: 'relative'
				},
				layers: {
					'default': {
						position: 'absolute'
					},
					bg: {
						shape: 'roundedRect',
						gradient: {
							color: ['#F0F', '#0F0', '#FF0'],
							angle: 45,
							opacity: [1, 1, 1],
							stop: [0, 0.5, 1]
						},
						stroke: {
							color: '#F0F',
							width: 6
						},
						offset: [100, 'auto'],
						radius: 20,
						opacity: 1,
						size: ['50%', '50%']
					},
					circle: {
						shape: 'circle',
						color: '#000',
						offset: 150,
						composite: 'lighter',
						opacity: 0.5,
						angle: [150, 30],
						stroke: {
							color: '#111',
							width: 20,
							opacity: 1
						}
					},
					line01: {
						shape: 'lineUp',
						color: '#F00',
						opacity: 1,
						offset: [50, 'auto'],
						size: ['100%', 1]
					},
					line02: {
						shape: 'lineUp',
						stroke: {
							color: '#000',
							width: 9
						},
						offset: ['auto', 50],
						size: [1, '100%']
					},
					line03: {
						shape: 'line',
						color: '#00F',
						opacity: 1,
						width: 2,
						offset: ['auto', 'auto', 50.5],
						size: ['100%', 1]
					},
					line04: {
						shape: 'line',
						color: '#00F',
						opacity: 1,
						offset: [0, 50, 0, 'auto'],
						size: [1, '100%']
					}
				}
			}
		},
		shape02: {
			'default': {
				styles: {
					border: '1px solid black',
					position: 'relative'
				},
				layers: {
					big: {
						position: 'absolute',
						offset: 50,
						rotation: 10,
						image: {
							url: 'assets/images.jpg'
						}
					}
				}
			}
		},
		shape02b: {
			'default': {
				styles: {
					position: 'relative'
				},
				layers: {
					base: {
						position: 'absolute',
						offset: 10,
						
						image: {
							url: 'assets/metal.jpg'
						}
					},
					frame: {
						position: 'absolute',
						offset: 0,
						image: {
							url: 'assets/frame.png'
						}
					}
				}
			}
		},
		shape03: {
			'default': {
				styles: {
					position: 'relative'
				},
				layers: {
					base: {
						offset: 0,
						color: '#ccc',
						opacity: 1,
						radius: 10,
						shadow: {
							size:32,
							blur: 64,
							offsetY: 0,
							opacity: 1,
							color: '#33ff00'
						}
					},
					first: {
						offset: 3,
						color: '#ccc',
						opacity: 0.5,
						radius: 10
					}
				}
			},
			down: {
				styles: {
					position: 'relative'
				},
				layers: {
					base: {
						offset: 0,
						color: '#ccc',
						opacity: 1,
						radius: 10,
						shadow: {
							size:32,
							blur: 512,
							offsetY: 0,
							opacity: 1,
							color: '#000'
						}
					},
					first: {
						offset: 3,
						color: '#ccc',
						opacity: 0.5,
						radius: 10
					}
				}
			}
		},
		gradient: {
			'default': {},
			'linear': {
				styles: {
					position: 'relative'
				},
				layers: {
					border: {
						color: '#000',
						offset: 0,
						radius: 20
					},
					big: {
						color: '#EFEFEF',
						opacity: 1,
						radius: 18,
						offset: 2
					},
					radial: {
						gradient: {
							color: ['#F0F', '#0F0', '#FF0'],
							stop: [0, 0.9, 1],
							angle: 110
						},
						offset: 20
					
					}
				}
			},
			'linear2': {
				styles: {
					position: 'relative'
				},
				layers: {
					border: {
						color: '#000',
						offset: 0,
						radius: 20
					},
					big: {
						color: '#EFEFEF',
						opacity: 1,
						radius: 18,
						offset: 2
					},
					radial: {
						gradient: {
							color: ['#F0F', '#0F0', '#FF0'],
							startPoint: []
						},
						offset: 20,
						radius: 0
					}
				}
			},
			'radial': {
				styles: {
					position: 'relative'
				},
				layers: {
					border: {
						color: '#000',
						offset: 0,
						radius: 20
					},
					big: {
						color: '#EFEFEF',
						opacity: 1,
						radius: 18,
						offset: 2
					},
					radial: {
						gradient: {
							type: 'radial',
							color: ['#F0F', '#0F0', '#FF0', '#000', '#AF0'],
							startCircle: ['2%', '50%', 0],
							endCircle: ['60%', '50%', '120%']
						},
						offset: 20,
						radius: 0
					}
				}
			},
			'radial2': {
				styles: {
					position: 'relative'
				},
				layers: {
				
					halo: {
						gradient: {
							type: 'radial',
							color: ['#3174cf', '#14396e'],
							startCircle: ['0%', '50%', 0],
							endCircle: ['60%', '50%', '180%']
						},
						offset: 0,
						radius: 0
					}
				}
			},
			'button': {
				
				styles: {
					position: 'relative'
				},
				layers: {
					'default':{
						position:'absolute'
						
					},
					
					border: {
						position:'absolute',
						size: ['96%', '96%'],
						opacity:[1,'.6'],
						shape:'circle',
						color: ['#6d2c2d','#fff'],
						offset: [0,0]
					},
					base: {
						size: ['88%', '88%'],
						position:'absolute',
						shape:'circle',
						color: '#f53b3a',
						offset: ['4%','4%','4%','4%']
					},
					
					light: {
						size: ['60%', '60%'],
						shape:'circle',
						opacity: [1,1],
						gradient: {
							type: 'radial',
							color: ['#fff', '#f53b3a'],
							startCircle: ['10%', '90%', 0],
							endCircle: ['40%', '60%', '100%']
						},
						offset: ['auto','auto','8%']
					},
					reflect: {
						position:'absolute',
						size: ['50%', '50%'],
						shape:'circle',
						opacity: [1,0],
						gradient: {
							type: 'radial',
							opacity: [1,0.1],
							color: ['#fff', '#f53b3a'],
							startCircle: ['26%', '16%', '1%','10%'],
							endCircle: ['38%', '36%', '120%']
						},
						offset: ['2%','auto','auto']
					}
				}
			}
		},
		
		shadows: {
			'default': {
				styles: {
					position: 'relative'
				},
				layers: {
					border: {
						color: '#000',
						opacity: 0.3,
						radius: 9
					},
					base: {
						color: '#fff',
						opacity: 1,
						radius: 7,
						offset: 2,
						shadow: {
							color: '#fff',
							size: 30,
							blur:164,
							offsetY: 8,
							opacity: 0.7
						}
					}
				}
			}
		}
	},
	
	box: {
		'default': {
			'default': {
				/* css properties */
				
				
				/* layers properties */
				
				layers: {
					background: {
						offset: [0, 1, 1, 1],
						color: '#cccccc',
						opacity: 1,
						radius: 8
					},
					main: {
						offset: [1, 1, 4, 1],
						color: '#FFF',
						opacity: 1,
						radius: 7
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
		},
		touchfoot : {
			'default': {
				/* css properties */
				
				
				/* layers properties */
				
				layers: {
					background: {
						offset: [0, 1, 1, 1],
						color: '#cccccc',
						opacity: 1,
						radius: 8
					},
					main: {
						offset: [1, 1, 4, 1],
						color: '#FFF',
						opacity: 1,
						radius: 7
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
	}
};
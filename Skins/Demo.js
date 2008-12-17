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
			fontFamily : 'Helvetica, Arial, sans-serif'
		},
		
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
							color: '#fff',
							width: '70px'
						}
					}
				},
				
				styles : {					
					margin	: '1px 3px 0px'
				},
				
				layers: {
					reorder: ['emboss', 'front', 'reflect'],

					emboss: {
						offset: '0px',
						color: '#000',
						opacity: .17,
						radius: 8
					},
					
					front: {
						offset: 2,
						opacity: 1,
						color : '#500',
						radius: 6
					},
					reflect: {
						offset: ['2px', '2px', '40%'],
						
						gradient	: {
							color: ['#FFF', '#FFF'],
							opacity: [.4, .03]
						},
						radius: [4,4, 4, 4]
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
					reflect : {
						gradient	: {
							color: ['#FFF', '#FFF'],
							opacity: [.6, .04]
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
				layers			: {
					front		: {
						color : '#000'
					}
				}
			}
		},
		tube: {
			'default'				: {
				components			: {
					label			: {
						styles		: {
							opacity : 1,
							color	: '#FFF'
						}
					}
				},
				styles				: {
					color 	: '#FFF',
					opacity : 1
				},
				layers				: {
					reorder			: ['shadow', 'front', 'light', 'reflect'],
					
					shadow : {
						color : '#000',
						size : 4,
						offsetX : 0,
						offsetY : 0,
						opacity : .4,
						magnify: 1
					},
					
					front			: {
						position	: 'absolute',
						offset		: '0px',
						color		: '#fe3333',
						radius		: 10
					},
					light			: {
						position	: 'absolute',
						offset		: [2, 2, '40%'],
						gradient	: {
							color	: ['#FFF', '#fe3333', '#fe3333'],
							angle	: 110
						},
						radius		: [8,8,8,8]
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
							opacity : .8,
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
						component : 'label'
					}
				}
			}
		}
	},	
	
	itemList : {
		'default' : {
			'default': {
				
				height: 40,
				
				components: {
					label: {
						styles: {
							zIndex: 1,
							fontWeight: 'normal',
							cursor: 'pointer',
							padding: '15px 16px 4px',
							display:'block',
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
					reorder			: ['shadow', 'front', 'light', 'reflect'],
					
					shadow : {
						color : '#000',
						size : 4,
						offsetX : 0,
						offsetY : 0,
						opacity : .4,
						magnify: 1
					},
					
					front			: {
						position	: 'absolute',
						offset		: '0px',
						color		: '#fe3333',
						radius		: 0
					},
					light			: {
						position	: 'absolute',
						offset		: [2, 2, '40%'],
						gradient	: {
							color	: ['#FFF', '#fe3333', '#fe3333'],
							angle	: 110
						},
						radius		: 0
					},
					reflect			: {
						position	: 'absolute',
						offset		: 0,
						gradient	: {
							color	: ['#fe3333','#c32222'],
							opacity	: [0, 1]
						},
						radius		: 0
					}
				}
			},
			over: {
			
				
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
		'default' : {
			'default' : {
				styles : {
					display : 'inline-block'
				}
			}
		},
		shape01 : {
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
		},
		shape02 : {
			'default' : {
				styles : {
					border : '1px solid black',
					position : 'relative'
				},
				layers : {
					big : {
						position : 'absolute',
						offset : 50,
						rotation : 10,
						image : {
							url : 'http://www.google.com/images/nav_logo3.png'
						}
					}
				}
			}
		},
		shape03 : {
			'default' : {
				styles : {
					position : 'relative'
				},
				layers : {
					shadow : {
						color : '#0F0',
						size : 16,
						offsetX : 0,
						offsetY : 0,
						opacity : .5
					},
					big : {
						color : '#222',
						opacity : 1,
						radius : 20,
						offset : 0
					}
				}
			}
		},
		gradient : {
			'default' : {},
			'linear' : {
				styles : {
					position : 'relative'
				},
				layers : {
					border : {
						color : '#000',
						offset : 0,
						radius : 20
					},
					big : {
						color : '#EFEFEF',
						opacity : 1,
						radius : 18,
						offset : 2
					},
					radial : {
						gradient : {
							color : ['#F0F', '#0F0', '#FF0'],
							startPoint : []
						},
						offset : 20,
						radius : 0
					}
				}
			},
			'linear2' : {
				styles : {
					position : 'relative'
				},
				layers : {
					border : {
						color : '#000',
						offset : 0,
						radius : 20
					},
					big : {
						color : '#EFEFEF',
						opacity : 1,
						radius : 18,
						offset : 2
					},
					radial : {
						gradient : {
							color : ['#F0F', '#0F0', '#FF0'],
							startPoint : []
						},
						offset : 20,
						radius : 0
					}
				}
			},
			'radial' : {
				styles : {
					position : 'relative'
				},
				layers : {
					border : {
						color : '#000',
						offset : 0,
						radius : 20
					},
					big : {
						color : '#EFEFEF',
						opacity : 1,
						radius : 18,
						offset : 2
					},
					radial : {
						gradient : {
							color : ['#F0F', '#0F0', '#FF0'],
							startPoint : []
						},
						offset : 20,
						radius : 0
					}
				}
			}
		},
		shadows : {
			'default' : {
				styles : {
					position : 'relative'
				},
				layers : {
					shadow : {
						color : '#000',
						size : 16,
						offsetX : 0,
						offsetY : 5,
						opacity : .5
					},
					shape : {
						color : '#FFF',
						opacity : 1,
						radius : 10,
						offset : 0
					}
				}
			},
			letter : {
				styles : {
					position : 'relative'
				},
				layers : {
					shadow : {
						color : '#000',
						size : 16,
						magnify : 0,
						offsetX : 0,
						offsetY : 0,
						opacity : 1
					},
					shape : {
						color : '#600',
						radius : 150,
						offset : 0,
						opacity : 1
					},
					hole : {
						scale : [.7, .95],
						color : '#FFF',
						radius : 150,
						offset : 0,
						opacity : 1
					}
				}
			}
		}
	}
}
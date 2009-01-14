/*
Object: UI.Skin.GreyGlass
	Define 
	
Implement:
	UI.Skin

Arguments:
		no

*/

UI.props.TouchBlue = {
	'default': {
		/* css properties */
		styles : {
			fontFamily : 'Helvetica, Arial, sans-serif',
			fontSize : '12px',
			position : 'relative'
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
	
	button : {
		'default': {
			'default' : {
				/* components properties */
				components: {
					label: {
						styles: {
							fontSize: '20px',
							fontWeight: 'bold',
							opacity: '1',
							color: '#fff',
							padding: '10px 26px'
						}
					}
				},
				
				/* shortcuts */
				shortcuts : {
					labelStyles : 'components.label.styles'
				},
				
				/* element css properties */
				styles : {
					display : 'inline-block',
					cursor : 'pointer'
				},

				/* layers */
				layers: {
					emboss: {
						offset: 0,
						color: '#4b5461',
						opacity: 1,
						radius: 12
					},
					underlay: {
						offset: [3, 3, 2, 3],
						color: ['#eeb7bf', '#262c32']
					},
					front: {
						offset: [1, 0],
						color: ['#c4020e', '#f81e0f'],
						opacity: 1,
						radius: [9, 9, 8, 8]
					},
					reflect: {
						offset: ['0px', '0px', '50%'],
						color: ['#FFF', '#FFF'],
						opacity: [.5, .2],
						radius: [8, 8, 0, 0]
					}
				}
			},
			over: {
				components: {
					label: {
						styles: {
							opacity: .8
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
		}
	},
	
	checkbox : {
		'default' : {
			'default' : {
				
			}
		}
	},
	
	slider : {
		'default' : {
			'default' : {
				width : 200,
				height : 16,
				
				/* element css properties */
				styles : {
					display : 'inline-block'
				},
				
				/* layers properties */
				layers : {
					reorder : ['border', 'front', 'fakeShadow', 'reflect'],
					
					border : {
						offset : ['0px', '0px', '0px', '0px'],
						color : ['#093889', '#5289d7'],
						opacity : 1,
						radius : 5
					},
					front : {
						position : 'absolute',
						offset : 1,
						color : ['#3672dc', '#4085ec'],
						opacity : 1,
						radius : [4, 4, 4, 4]
					},
					fakeShadow : {
						position : 'absolute',
						offset : ['1px', '1px', '23px'],
						color : ['#000', '#000'],
						opacity : [.2, 0],
						radius : [5, 5, 0, 0]
					},
					reflect : {
						position : 'absolute',
						offset : ['50%', '1px', '1px'],
						color : ['#FFF', '#FFF'],
						opacity : [.05, .3],
						radius : [4, 4, 4, 4]
					}
				}
			}
		},
		horizontal : {
			'default' : {}
		},
		vertical : {
			'default' : {
				width : 16,
				height : 300,
				layers : {
					front : {
						gradient : {
							color : ['#3672dc', '#4085ec'],
							angle : 0
						}
					},
					reflect : {
						offset : [1, 1, 1, '50%'],
						gradient : {
							color : ['#FFF', '#FFF'],
							opacity : [.05, .3],
							angle : 0
						}
					}
				}
			}
		},
		'knob' : {
			'default' : {
				width : 16,
				//	height 		 : 10,
				
				styles : {
					zIndex : 1,
					display : 'block'
				},
				
				layers : {
					reorder : ['checkBg', 'check', 'checkFront'],
					
					checkBg : {
						position : 'absolute',
						offset : 0,
						color : '#000',
						opacity : 0.25,
						radius : 5
					},
					check : {
						position : 'absolute',
						offset : 1,
						color : ['#FFF', '#FFF'],
						opacity : 1,
						radius : 4
					},
					checkFront : {
						position : 'absolute',
						offset : [2, 2, 1, 1],
						color : ['#000', '#000'],
						opacity : [.18, .02],
						radius : 4
					}
				}
			}
		}
	},
	
	scrollbar : {
		track : {
			'default' : {
				width : 8,
				
				styles : {
					height : '100%',
					'float':'right',
					position : 'relative',
					zIndex : '10000'
				},
				layers : {
					reorder : ['back'],
					'default' : {
						position : 'absolute'
					},
					back : {
						offset : [0, 0, 0, 0],
						color : '#fff'
					}
				}
			}
		},
		thumb : {
			'default' : {
				styles : {
					position : 'relative',
					margin : '0'
				},
				layers : {
					reorder : ['main'],
					
					'default' : {
						direction : 'vertical'
					},
					main : {
						offset : [3,2],
						color : '#000',
						opacity: 0.2,
						radius : 3
					}
				}
			}
		}
	},
	
	// View

	view: {
		'default': {
			'default': {
				backgroundColor: '#d6d6d6',
				components: {
					overlay : {
						styles : {
							backgroundColor : '#fff',
							opacity : .05,
							position : 'absolute',
							height : '100%',
							width : '100%',
							top :0,
							left :0,
							zIndex : '100000'
						}
					}
				},
				styles : {
					position: 'relative'
				}
			}
		},
		transparent : {
			'default' : {
				styles : {
					position : 'relative',
					zIndex : 1,
					backgroundColor : 'transparent'
				}
			}
		},
		login : {
			'default' : {}
		},
		small : {
			'default' : {
				styles : {
					color : 'transparent'
				},
				iconSize : 32
			}
		},
		window : {
			'default' : {
				components : {
					iframe : {
						width :'100%',
						height :'100%',
						styles : {
							margin :'0',
							padding :'0',
						 	border :'0',
							overflow :'auto'
						}
					}
				},
				
				styles : {
					position : 'relative',
					zIndex : 1,
					backgroundColor : '#fff'
				}
			}
		},
		tab : {
			'default' : {
				styles : {
					position : 'absolute'
				}
			
			}
		}
	},
	

	
	listview : {
		'default' : {
			'default' : {
				styles : {
					'float' : 'left',
					overflow : 'hidden',
					height : '600px'
				},
				
				components : {
					item : {
						component : 'label'
					},
					title : {
						styles : {
							display:'block',
							padding:'8px 0 0 15px',
							height:'8px',
							fontWeight : 'bold'
						}
					},
					desc : {
						styles : {
							display:'block',
							padding:'0 0 0 15px',
							height:'10px',
							fontSize : '11px',
							color:'#333'
						}
					}
				}
			}
		}
	},
	
	itemList : {
		'default' : {
			'default' : {
				
				height : 42,
				
				components : {
					label : {
						styles : {
							zIndex : 1,
							fontWeight : 'normal',
							cursor : 'pointer',
							padding : '5px 16px 4px',
							display :'block',
							whiteSpace : 'nowrap',
							lineHeight : '1em'
						}
					}
				},
				
				/* shortcuts */
				shortcuts : {
					labelStyles : 'components.label.styles'
				},
				
				/* layers properties */
				styles : {
					position : 'relative',
					display : 'block',
					fontSize : '.7em',
					width : '100%',
					padding : '0',
					margin : '0',
					top : '0px',
					left : '0px',
					overflow : 'hidden',
					backgroundColor : '#fff'
				},
				layers : {
					'default' : {
						position : 'absolute',
						opacity : 1
						
					},
					light : {
						size : ['auto',1],
						color : '#fff',
						offset : [0,0,'auto'],
						opacity : 0.1
					},
					dark : {
						size : ['auto',1],
						color : '#000',
						offset : ['auto',0,0],
						opacity : 0.1
					},
					line : {
						position : 'absolute',
						shape : 'line',
						width : 2.5,
						color : '#808080',
						offset : [14, 6.5,'auto','auto'],
						opacity : 1,
						size : [7, 7]
					},
					line2 : {
						position : 'absolute',
						shape : 'lineUp',
						width : 2.5,
						color : '#808080',
						offset : [19, 6.5,'auto','auto'],
						opacity : 1,
						size : [7, 7]
					}
				}
			},
			over : {
				styles : {
					backgroundColor : '#e0e0e0'
				},
				layers : {
					reorder : ['light','dark','line','line2'],
					
					light : {
						size : ['auto',1],
						color : '#fff',
						offset : [0,0,'auto'],
						opacity : 0.1
					},
					dark : {
						size : ['auto',1],
						color : '#000',
						offset : ['auto',0,0],
						opacity : 0.1
					}
				}
			}
		}
	},
		
	
	window: {
		'default': {
			'default': {
				fx: {
					adaptLocation: {
						'duration': 300,
						//	'transition' : Fx.Transitions.Elastic.easeOut,
						'wait': true
					}
				},
				/* components */
				components: {
					head: {
						styles: {
							top: '1px',
							left: '1px',
							position: 'relative',
							overflow: 'hidden',
							width: '100%',
							zIndex: 1,
							height: '44px'
						}
					},
					controls: {
						styles: {
							'float': 'left',
							padding: '1px 3px 1px',
							margin: '1px 0px 0px 1px',
							height: 18
						}
					},
					control: {
						component: 'windowButton',
						label: false,
						width: 16,
						height: 16,
						styles: {
							margin: '2px 3px 2px 2px'
						}
					},
					toggle: {
						type: 'toggleToolbar',
						label: false,
						styles: {
							position: 'absolute',
							top: 5,
							right: 10,
							margin: 0,
							padding: 0
						}
					},
					title: {
						type: 'windowTitle',
						emboss: true
					},
					view: {
						type: 'window',
						overflow: 'scrollbar',
						styles: {
							position: 'absolute',
							top: '51px',
							left: '1px',
							overflow: 'hidden'
						}
					},
					foot: {
						styles: {
							height: 50,
							zIndex: 10,
							position: 'absolute',
							right: '0',
							width: '100%'
						}
					},
					status: {
						styles: {
							fontSize: '1em',
							padding: '3px 16px',
							height: '16px'
						}
					},
					resize: {
						styles: {
							position: 'absolute',
							right: 0,
							marginBottom: 0,
							width: '24px',
							height: '24px'
						}
					}
				},
				
				
				borderSize: 1,
				
				/* layers properties */
				layers: {
					'default': {
						position: 'relative',
						shape: 'roundedRect',
						offset: '0px',
						color: '#FFFFFF',
						opacity: 1,
						radius: 0
					},/*
					shadow: {
						size: 0,
						offsetY: 1,
						diffusion : 4.4,
						magnify: 0.6,
						opacity: .3
					},*/
					background: {
						offset: 0,
						color: '#000',
						opacity: .2,
						radius: 0
					},
					underlay: {
						color: ['#cdd5df', '#2d3642'],
						offset: [1, 1, 'auto'],
						size: ['auto', 20],
						radius: 0
					},
					head: {
						color: ['#9babbf', '#546c8b'],
						offset: [1, 0],
						radius: 0
					},
					reflect: {
						offset: [0, 0],
						size : ['auto',22],
						gradient	: {
							color: ['#FFF', '#FFF'],
							opacity: [.2, .05]
						},
						radius: 0
					},
					footbase: {
						position: 'absolute',
						size: ['auto', 50],
						color: ['#000', '#000'],
						offset: ['auto', 1, 1],
						opacity: .4
					},
					footline: {
						position: 'absolute',
						size: ['auto', .5],
						color: '#434343',
						offset: ['auto', 1, 49],
						radius: 0
					},
					footreflect: {
						position: 'absolute',
						size: ['auto', 24],
						gradient	: {
							color: ['#FFF', '#FFF'],
							opacity: [.2, .05]
						},
						offset: ['auto', 1, 25],
						radius: 0
					}
				}
			},
			inactive: {
				layers: {
					shadow: {
						size: 8,
						offsetY: 3,
						opacity: .22
					},
					background: {
						opacity: 0.17
					},
					underlay: {
						color: ['#f1f1f1', '#878787']
					},
					head: {
						color: ['#e8e8e8', '#d0d0d0']
					},
					foot: {
						color: ['#e8e8e8', '#d0d0d0']
					}
				}
			},
			minimized: {
				width: 160,
				height: 25,
				layers: {
					reorder: ['shadow', 'background', 'underlay', 'head'],
					shadow: {
						size: 6,
						offsetY: 3,
						opacity: .20
					},
					head: {
						position: 'absolute',
						color: ['#CACACA', '#CFCFCF'],
						offset: [2, 1, 1],
						radius: 4
					}
				}
			}
		}
	}
};
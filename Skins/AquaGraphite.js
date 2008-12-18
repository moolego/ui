/*
Object: UI.Skin.GreyGlass
	Define 
	
Implement :
	UI.Skin

Arguments :
		no

*/

UI.props.AquaGraphite = {
	'default' : {
		/* css properties */
		styles : {
			fontFamily : 'Helvetica, Arial, sans-serif',
			fontSize : '12px'
		},
		fx : {},
		
		/* layers properties */
		layers : {
			'default' : {
				position : 'relative',
				shape : 'roundedRect',
				offset : 1,
				color : '#fff',
				opacity : 1,
				radius : 0,
				direction : 'horizontal'
			},
			shadow : {
				size : 0,
				magnify : 0,
				offsetX : 0,
				offsetY : 0
			}
		}
	},
	
	button : {
		'default' : {
			'default' : {
				/* components properties */
				components : {
					label : {
						styles : {
							zIndex : 1,
							fontWeight : 'normal',
							position : 'absolute',
							cursor : 'pointer',
							top : 0,
							left : 0,
							padding : '3px 16px 3px',
							whiteSpace : 'nowrap',
							lineHeight : '16px'
						}
					}
				},
				
				/* shortcuts */
				shortcuts : {
					labelStyles : 'components.label.styles'
				},
				
				/* element css properties */
				styles : {
					position : 'relative',
					display : 'inline-block',
					cursor : 'pointer'
				},
				
				/* layers properties */
				layers : {
					littleshadow : {
						offset : ['0px', '0px', '0px', '0px'],
						color : ['#000', '#000'],
						radius : 11,
						opacity : .1,
						radius : 12
					},
					background : {
						offset : ['0px', '1px', '1px', '1px'],
						color : ['#494949', '#5f5f5f'],
						opacity : 1,
						radius : 11
					},
					main : {
						color: ['#d4d4d4', '#e5e5e5'],
						radius : 10
					},
					reflect : {
						offset : ['0px', '3px', '65%'],
						color : ['#FFF', '#FFF'],
						opacity : [.8, .3],
						radius : [7, 7, 4, 4]
					},
					light : {
						position : 'absolute',
						offset : ['50%', '5px', '2px'],
						color : ['#FFF', '#FFF'],
						opacity : [0, 1],
						radius : [4, 4, 7, 7]
					}
				}
			},
			over : {},
			'down' : {
				layers : {
					main : {
						color : ['#7b8997', '#7b8997']
					},
					background : {
						color : ['#494949', '#5f5f5f']
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
							padding : '2px 16px 2px',
							fontSize : '12px'
						}
					}
				},
				/* shortcuts */
				shortcuts : {
					labelStyles : 'components.label.styles'
				},
				
				/* element css properties */
				styles : {
					position : 'relative',
					display : 'inline-block',
					cursor : 'pointer',
					color : '#fff'
				},
				
				/* layers properties */
				layers : {
					'default' : {
						radius : 7
					},
					reorder : ['background', 'main'],
					background : {
						offset : '0px',
						color : ['#666666', '#f2f2f2'],
						opacity : 1,
						radius : 9
					},
					main : {
						position : 'absolute',
						color : '#979797',
						offset : [1.5, 1, 1, 1],
						radius : 8
					}
				}
			},
			over : {
				layers : {
					reorder : ['background', 'main']
				}
			},
			'down' : {
				layers : {
					reorder : ['background', 'main'],
					main : {
						color : '#787878'
					
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
							padding : '2px 16px 2px',
							lineHeight : '18px',
							margin : '0'
						}
					}
				},
				
				/* shortcuts */
				shortcuts : {
					labelStyles : 'components.label.styles'
				},
				
				/* element css properties */
				styles : {
					position : 'relative',
					display : 'inline-block',
					cursor : 'pointer'
				},
				
				/* layers properties */
				layers : {
					'default' : {
						radius : 7
					},
					reorder : ['emboss', 'border', 'main'],
					emboss : {
						offset : '0px',
						color : '#fff',
						opacity : .5,
						radius : 5
					},
					border : {
						position : 'absolute',
						offset : [0, 0, 1, 0],
						color : '#686868',
						opacity : 1,
						radius : 4
					},
					main : {
						position : 'absolute',
						color : ['#fff', 'a9a9a9'],
						offset : [1, 1, 2, 1],
						radius : 3
					}
				}
			},

			over : {
				layers		 : {
					reorder	 : ['emboss','border','main']
				}
			},
			'down' : {
				layers : {
					reorder : ['emboss','border','inner1','inner2','inner3','inner4','main'],
					inner1 : {
						position : 'absolute',
						color : ['#393939','#686868'],
						offset : [1,1,2,1],
						radius : 3
					},
					inner2 : {
						position : 'absolute',
						color : ['#6e6e6e','#797979'],
						offset : [2,2,3,2],
						radius : 3
					},
					inner3 : {
						position : 'absolute',
						color : ['#8c8c8c','#848484'],
						offset : [3,3,4,3],
						radius : 3
					},
					inner4 : {
						position : 'absolute',
						color : ['#a1a1a1','#8a8a8a'],
						offset : [4,4,5,4],
						radius : 3
					},
					main : {
						color : ['#afafaf','#8e8e8e'],
						offset : [5,5,6,5],
						radius : 2
						
					}
				}
			}
		},
		window : {
			'default' : {
				layers : {
					reorder : ['emboss', 'background', 'main', 'reflect', 'cache'],
					
					'default' : {
						position : 'absolute',
						shape : 'circle',
						size : [14, 14],
						opacity : 1,
						offset : 0
					},
					emboss : {
						offset : ['auto', 1, 0],
						size : [14, 14],
						color : '#FFF',
						opacity : .4
					},
					background : {
						gradient : {
							color : ['#2e323d','#848995']
						},
						size : [14, 14]
					},
					main : {
						size : [11, 11],
						offset : [2, 2.5],
						gradient : {
							color : ['#fff','#fff'],
							opacity : [.2,.8]
						}
					},
					reflect : {
						size : 3,
						offset : [1.5, 6.5],
						gradient : {
							color : ['#fff','#fff'],
							opacity : [1, .5]
						}	
					},
					cache : {
						shape : 'roundedRect',
						size : [2,1],
						radius : 0,
						offset : [1, 7],
						color : '#545861',
						opacity : 1
					}
				}
			},
			'down' : {
				layers : {
					reorder : ['emboss', 'border', 'inner1', 'inner2', 'inner3', 'inner4', 'main'],
					inner1 : {
						position : 'absolute',
						color : ['#393939', '#686868'],
						offset : [1, 1, 2, 1],
						radius : 3
					},
					inner2 : {
						position : 'absolute',
						color : ['#6e6e6e', '#797979'],
						offset : [2, 2, 3, 2],
						radius : 3
					},
					inner3 : {
						position : 'absolute',
						color : ['#8c8c8c', '#848484'],
						offset : [3, 3, 4, 3],
						radius : 3
					},
					inner4 : {
						position : 'absolute',
						color : ['#a1a1a1', '#8a8a8a'],
						offset : [4, 4, 5, 4],
						radius : 3
					},
					main : {
						color : ['#afafaf', '#8e8e8e'],
						offset : [5, 5, 6, 5],
						radius : 2
					
					}
				}
			}
		},

		'small' : {
			'default' : {
				width : 20,
				height : 11,
				
				styles : {
					position : 'absolute',
					top : 0,
					right : 0,
					margin : '5px 7px 0 3px'
				},
				
				layers : {
					'default' : {
						position : 'absolute',
						shape : 'circle',
						size : 8
					},
					emboss : {
						offset : [3, 3],
						color : '#FFF',
						opacity : .27
					},
					background : {
						offset : [0, 1],
						size : 8,
						color : ['#3b424d', '#9ba0ab']
					},
					main : {
						size : 3,
						offset : [1, 0],
						color : ['#616975', '#e8e8e8']
					},
					reflect : {
						size : 2,
						offset : [0, 1],
						color : ['#fff', '#fff'],
						opacity : [1, .5]
					}
				}
			},
			over : {
				layers : {
					main : {
						color : ['#cf652a', '#fee776']
					}
				}
			},
			down : {
				layers : {
					main : {
						color : ['#cf652a', '#fee776']
					}
				}
			}
		},
		
		toggleToolbar : {
			'default' : {
				width : 20,
				height : 11,
				
				/* css properties */
				styles : {
					padding : '2px 16px 4px 16px',
					position : 'absolute',
					top : '10px',
					right : 0,
					margin : '5px 7px 0 3px'
				},
				
				/* layers properties */
				layers : {
				
					reorder : ['emboss', 'background', 'main', 'reflect', 'light'],
					
					'default' : {
						radius : 6
					},
					emboss : {
						offset : 0,
						color : '#fff',
						radius : 5
					},
					background : {
						offset : ['0px', '0px', '1px', '0px'],
						color : ['#494949', '#666666'],
						radius : 5
					},
					main : {
						offset : 1,
						radius : 4,
						color : ['#b2b2b2', '#eee']
					},
					reflect : {
						offset : ['0px', '3px', '65%'],
						color : ['#FFF', '#FFF'],
						opacity : [.8, .3],
						radius : 2
					},
					light : {
						position : 'absolute',
						offset : ['65%', '5px', '2px'],
						color : ['#FFF', '#FFF'],
						opacity : [.1, .7],
						radius : [2, 2, 3, 3]
					}
				}
			},
			'down' : {
				layers : {
					main : {
						color : ['#5b697e', '#a9b5c2']
					}
				}
			}
		},
		tab : {
			'default' : {
				
				//width : 100,
				height : 17,
				/* css properties */
				
				components : {
					label : {
						styles : {
							padding : '0px 12px 0px 12px',
							position : 'relative',
							'float' : 'left',
							margin : '0',
							fontWeight : 'bold',
							fontSize : '0.75em',
							lineHeight : '2em'
						}
					}
				},
				
				/* shortcuts */
				shortcuts : {
					labelStyles : 'components.label.styles'
				},
				
				/* layers properties */
				layers : {
					reorder : ['background', 'main'],
					
					background : {
						offset : 0,
						color : ['#6c6c6c', '#6c6c6c'],
						radius : 0
					},
					main : {
						offset : [0, 1, 1, 0],
						radius : 0,
						color : ['#9a9a9a', '#828282']
					}
				}
			},
			'over' : {
				layers : {
					main : {
						color : ['#aeaeae', '#9a9a9a'],
						offset : [0, 1, 0, 0]
					}
				}
			},
			'down' : {
				layers : {
					main : {
						color : ['#bfbfbf', '#d1d1d1'],
						offset : [0, 1, 0, 0]
					}
				}
			},
			'active' : {
				layers : {
					main : {
						color : ['#eaeaea', '#dedede'],
						offset : [0, 1, 0, 0]
					}
				}
			}
		},
		tabselected : {
			'default' : {
			
				/* css properties */
				
				components : {
					label : {
						styles : {
							padding : '4px 8px 6px 8px',
							position : 'relative',
							
							margin : '0',
							textTransform : 'uppercase',
							fontWeight : 'bold',
							fontSize : '1em'
						}
					}
				},
				
				/* shortcuts */
				shortcuts : {
					labelStyles : 'components.label.styles'
				},
				
				labelStyles : {},
				
				/* layers properties */
				layers : {
				
					reorder : ['background', 'main'],
					
					'default' : {
						radius : 0
					},
					
					background : {
						offset : 0,
						color : ['#6c6c6c', '#6c6c6c'],
						radius : 0
					},
					main : {
						offset : [0, 1, 3, 0],
						radius : 0,
						color : ['#eaeaea', '#dedede']
					}
				}
			},
			'over' : {
				layers : {
					main : {
						color : ['#5b697e', '#a9b5c2']
					}
				}
			},
			'down' : {
				layers : {
					main : {
						color : ['#eaeaea', '#dedede']
					
					}
				}
			},
			'selected' : {
				layers : {
					main : {
						color : ['#eaeaea', '#dedede']
					
					}
				}
			}
		}
	},
	
	input : {
		'default' : {
			'default' : {
				width : 200,
				components : {
					input : {
						styles : {
							padding : '4px 4px 3px',
							border : 'none',
							
							zIndex : 1,
							position : 'absolute',
							top : 0,
							left : 0,
							background : 'transparent',
							resize : 'none',
							whiteSpace : 'nowrap',
							border : 'none'
						}
					}
				},
				
				/* shortcuts */
				shortcuts : {
					inputStyles : 'components.input.styles'
				},
				
				
				/* element css properties */
				styles : {
					position : 'relative',
					display : 'inline-block'
				},
				
				/* layers properties */
				layers : {
					'default' : {
						radius : 0
					},
					emboss : {
						offset : [0, 1],
						color : '#000',
						opacity : 0.5
					},
					border : {
						offset : [1, 0, 0, 1],
						color : '#dbdbdb'
					},
					main : {
						offset : 1,
						color : '#FFF'
					}
				}
			},
			focus : {
				layers : {
					main : {
						color : '#FFF'
					}
				}
			}
		},

		'round' : {
			'default' : {
				components : {
					input : {
						styles : {
							padding : '4px 10px',
							zIndex : 1,
							position : 'absolute',
							top : 0,
							left : 0,
							background : 'transparent',
							resize : 'none',
							whiteSpace : 'nowrap',
							border : 'none'

						}
					}
				},
				
				/* element css properties */
				styles : {
					position : 'relative',
					display : 'inline-block'
				},
				
				/* layers properties */
				layers : {
					'default' : {
						radius : 12,
						position : 'abolute'
					},
					emboss : {
						position : 'abolute',
						offset : [0, 0, 0, 0],
						color : ['#000', '#000'],
						opacity : [.6, 0]
					},
					border : {
						radius : 11,
						position : 'abolute',
						offset : [1, 1, 0, 1],
						color : ['#cacaca', '#dbdbdb'],
						opacity : 1
					},
					main : {
						radius : 10,
						position : 'abolute',
						offset : [2, 2, 1, 2],
						color : '#FFF'
					}
				}
			}
		}
	},
	
	textarea : {
		'default' : {
			'default' : {
				width : 300,
				height : 150,
				
				components : {
					input : {
						styles : {
							padding : '4px 4px 3px',
							border : 0,
							zIndex : 1,
							position : 'absolute',
							top : 0,
							left : 0,
							background : 'transparent',
							resize : 'none',
							whiteSpace : 'nowrap'
						}
					}
				},
				
				/* element css properties */
				styles : {
					position : 'relative',
					display : 'inline-block'
				},
				
				
				
				/* layers properties */
				
				layers : {
					'default' : {
						radius : 0
					},
					emboss : {
						offset : [0, 1],
						color : '#000',
						opacity : 0.5
					},
					border : {
						offset : [1, 0, 0, 1],
						color : '#dbdbdb'
					},
					main : {
						offset : 1,
						color : '#FFF'
					}
				}
			},
			focus : {
				layers : {
					main : {
						color : ['#F4F4FF', '#FFF']
					}
				}
			}
		}
	},
	
	checkbox : {
		'default' : {
			'default' : {
				width : 16,
				height : 17,
				styles : {
					position : 'relative',
					display : 'inline-block'
				},
				
				labelStyles : {
					zIndex : 1,
					position : 'absolute',
					top : 0,
					left : 0,
					whiteSpace : 'nowrap',
					padding : '2px 0 1px 20px'
				},
				
				layers : {
					'default' : {
						radius : 2,
						position : 'absolute'
					},
					littleshadow : {
						size : [16, 15],
						offset : [2, 0, 0, 0],
						color : ['#000', '#000'],
						opacity : [0.05, .1],
						radius : [5, 5, 5, 5]
					},
					
					border : {
						size : [14, 14],
						position : 'absolute',
						offset : [2, 2, 2, 1],
						color : ['#494949', '#777777'],
						opacity : 1,
						radius : 2
					},
					main : {
						position : 'absolute',
						size : [12, 12],
						color : ['#d4d4d4', '#e5e5e5'],
						offset : [3, 2]
					},
					reflect : {
						position : 'absolute',
						size : [10, 5],
						offset : [3, 3, '60%'],
						color : ['#FFF', '#FFF'],
						opacity : [.8, .5],
						radius : 0
					},
					reflectdown : {
						position : 'absolute',
						size : [10, 6],
						offset : [9, 3, 2],
						color : ['#FFF', '#FFF'],
						opacity : [.1, 1],
						radius : 0
					},
					light : {
						position : 'absolute',
						size : [14, 10],
						offset : [4, 1, 4],
						color : ['#FFF', '#FFF'],
						opacity : [0.05, .5],
						radius : 0
					}
				}
			},
			'checked' : {
				layers : {
					tick1 : {
						position : 'absolute',
						shape : 'line',
						width : 2,
						color : '#333',
						offset : [6.3, 4],
						size : [5, 6]
					},
					tick2 : {
						position : 'absolute',
						shape : 'lineUp',
						width : 2.2,
						color : '#333',
						offset : [0, 8],
						size : [7, 11]
					},
					main : {
						color : ['#7b8997', '#7b8997']
					},
					border : {
						color : ['#455a70', '#777777']
					}
				}
			}
		}
	},
	
	radio : {
		'default' : {
			'default' : {
				width : 16,
				height : 16,
				
				styles : {
					padding : '2px 2px 2px 20px',
					position : 'absolute'
				},
				
				/* layers properties */
				layers : {
					'default' : {
						position : 'absolute',
						shape : 'circle',
						offset : 0,
						color : '#000'
					},
					littleshadow : {
						offset : [1,0,0,0],
						color : ['#000', '#000'],
						opacity : .1
					},
					background : {
						offset : [0,1,1,1],
						color : ['#494949', '#5f5f5f'],
						opacity : 1
					},
					main : {
						offset : [1,2,2,2],
						color : ['#d4d4d4', '#e5e5e5']
					},
					reflect : {
						offset : [1,1,'40%'],
						color : ['#FFF', '#FFF'],
						opacity : [1, 0]
					},
					light : {
						position : 'absolute',
						offset : ['40%', 1, 2],
						color : ['#FFF', '#FFF'],
						opacity : [0, 1]
					}
				}
			},
			'selected' : {
				layers : {
					dot : {
						offset : [5,5.5],
						size : 5,
						opacity : .7
					},
					background : {
						offset : [0,1,1,1],
						color : ['#393b49', '#a1a5a9'],
						opacity : 1
					},
					main : {
						color : ['#a8aeb5', '#a8aeb5']
					}
				}
			}
		}
	},
	
	select : {
		'default' : {
			'default' : {
				/* components properties */
				components : {
					label : {
						styles : {
							zIndex : 1,
							position : 'absolute',
							left : 0,
							padding : '4px 39px 4px 16px',
							whiteSpace : 'nowrap',
							lineHeight : '13px'
						}
					}
				},
				
				/* element css properties */
				styles : {
					position : 'relative',
					display : 'inline-block'
				},
				
				/* layers properties */
				layers : {
					'default' : {
						radius : 4,
						position : 'absolute'
					},
					littleshadow : {
						offset : ['0px', '0px', '0px', '0px'],
						opacity : [.1, .1],
						color : ['#000', '#000'],
						radius : [8, 8, 8, 8],
						position : 'relative'
					},
					background : {
						offset : ['0px', '1px', '1px', '1px'],
						opacity : [1, 1],
						color : ['#5d5d5d', '#5e5e5e'],
						radius : [5, 10, 5, 5],
						position : 'relative'
					},
					main : {
						offset : [1, 22, 2, 2],
						color : ['#c3c3c3', '#d4d4d4'],
						radius : [4, 0, 0, 4]
					},
					backButton : {
						size : [21, 'auto'],
						offset : [0, 1, 3, 'auto'],
						color : ['#3b3b55', '#798491'],
						radius : [0, 5, 5, 0]
					},
					button : {
						size : [19, 'auto'],
						offset : [1, 2, 2, 'auto'],
						color : ['#7b8997', '#7b8997'],
						radius : [0, 4, 4, 0]
					},
					
					reflect : {
						color : ['#FFF', '#FFF'],
						size : ['auto', '36%'],
						opacity : [.5, .3],
						offset : [1, 3, 'auto', 3],
						radius : [3, 3, 4, 4]
					},
					light : {
						offset : ['45%', '2px', '2px'],
						color : ['#FFF', '#FFF'],
						opacity : [0, 0.9],
						radius : [5, 5, 4, 4]
					},
					arrowUp : {
						shape : 'triangle',
						color : '#000',
						size : [5, 4],
						offset : ['auto', 10, '65%', 'auto']
					},
					arrowDown : {
						shape : 'triangle',
						rotation : 180,
						color : '#000',
						size : [5, 4],
						offset : ['55%', 10, 'auto', 'auto']
					}
				}
			}
		}
	},
	
	slider : {
		'default' : {
			'default' : {
				width : 300,
				height : 40,
				
				/* element css properties */
				styles : {
					position : 'relative',
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
				width : 10,
				height : 300
			}
		},
		'knob' : {
			'default' : {
				width : 40,
				//	height 		 : 10,
				
				styles : {
					position : 'relative',
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
	
	label : {
		'default' : {
			'default' : {
				components : {
					emboss : {
						styles : {
							position : 'absolute',
							margin : '0',
							color : '#fff',
							top : '1px',
							opacity : '.8',
							zIndex : '-1'
						}
					}
				}
			}
		},
		
		windowTitle : {
			'default' : {
				components : {
					emboss : {
						styles : {
							position : 'absolute',
							margin : '0',
							color : '#fff',
							top : '1px',
							opacity : '1',
							zIndex : '-2'
						}
					}
				},
				/* css properties */
				styles : {
					overflow : 'hidden',
					cursor : 'default',
					color : '#000000',
					display : 'block',
					margin : '1px 0 1px 0',
					padding : '0',
					textAlign : 'center',
					textTransform : 'capitalize',
					fontWeight : 'normal',
					fontSize : '13px',
					lineHeight : '20px',
					height : '20px'
				}
			}
		},
		
		transparentTitle : {
			'default' : {
				/* css properties */
				styles : {
					overflow : 'hidden',
					cursor : 'default',
					color : '#fff',
					display : 'block',
					padding : '0px 70px 0px 2px',
					textAlign : 'center',
					textTransform : 'capitalize',
					fontWeight : 'normal',
					fontSize : '12px',
					lineHeight : '17px',
					height : '17px'
				}
			}
		}
	},
	
	
	menu : {
		'default' : {
			'default' : {
				/* sortcuts */
				shortcuts : {
					itemStyles : 'components.menuItem.styles'
				},
				
				/* components properties */
				components : {
					wrapper : {
						styles : {
							padding : '6px 1px'
						}
					},
					menuItem : {
						styles : {
							color : '#000',
							padding : '4px 40px 5px 16px',
							whiteSpace : 'nowrap',
							display : 'block',
							position : 'relative'
						}
					},
					separator : {
						styles : {
							paddingBottom : '5px',
							fontSize : 1,
							borderBottom : '1px solid #e4e4e4',
							margin : '0 1px 5px',
							display : 'block',
							height : 0
						}
					}
				},
				
				/* css properties */

				styles: {
					position	: 'absolute'
				},
				
				/* effects settings */
				hideFxDuration : 100,
				showDelay : 100,
				
				/* layers properties */
				layers : {
					'default' : {
						radius : 4
					},
					shadow : {
						size : 10,
						offsetY : 5,
						opacity : 0.3
					},
					background : {
						color : '#000',
						offset : 0,
						opacity : .27
					},
					main : {}
				}
			},
			over : {
				/* components properties */
				components : {
					menuItem : {
						styles : {
							color : '#ddd'
						}
					}
				}
			}
		},
		context : {
			'default' : {
				layers : {
					'default' : {
						radius : 4
					}
				}
			}
		}
	},
	
	toolbar : {
		'default' : {
			'default' : {
				/* sortcuts */
				shortcuts : {
					itemStyles : 'components.menuItem.styles'
				},
				
				/* components properties */
				components : {
					wrapper : {
						styles : {
							padding : '0 0 0 10px'
						}
					},
					menuItem : {
						styles : {
							padding : '30px 10px 5px',
							lineHeight : '1em',
							whiteSpace : 'nowrap'
						}
					},
					separator : {
						styles : {
							display : 'none'
						}
					}
				},
				
				styles : {
					padding : '0 0 0 0'
				},
				
				
				/* others properties */
				height : 50,
				presentation : 'both',
				hideFxDuration : 100,
				showDelay : 0,
				actionDelay : 300,
				
				/* layers properties */
				layers : {
					'default' : {
						position : 'absolute',
						color : ['#C4C4C4', '#989898'],
						offset : [1, 0]
					},
					background : {
						opacity : 1,
						position : 'relative',
						color : ['#FFF', '#000'],
						offset : 0
					},
					main : {}
				}
			}
		},
		window : {
			'default' : {
				height : 48,
				layers : {
					reorder : []
				},
				itemPadding : 0,
				presentation : 'icon',
				padding : '5px 0 4px 8px'
			},
			layers : {
				reorder : []
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
							backgroundColor : '#000',
							opacity : 0,
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
	
	tabview : {
		'default' : {
			'default' : {
				styles : {
					overflow : 'hidden',
					position : 'relative',
					left : '0px',
					top : '0px'
				},
				
				components : {
					tabbar : {
						component : 'element',
						type : 'tabbar'
					}
				}
			}
		}
	},
	
	splitview : {
		'default' : {
			'default' : {
				styles : {
					'float' : 'left',
					overflow : 'hidden',
					height : '600px'
				},
				components : {
					splitter : {
						styles : {
							//height : '100%',
							cursor : 'e-resize',
							width : '7px',
							opacity : '.3'
						}
					}
				},
				views : {
					side : {
						width : 160,
						overflow : 'hidden',
						styles : {
							'float' : 'left',
							overflow : 'hidden',
							backgroundColor : '#d6dde5',
							borderRight : '1px solid #8b8b8b',
							position :'relative'
						}
					},
					main: {
						overflow: 'hidden',
						styles: {
							'float': 'left',
							overflow: 'hidden',
							position: 'relative'
						}
					}
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
					height : '600px',
					position : 'relative'
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
					color:'#000'
				},
				layers : {
					'default' : {
						position: 'absolute'
						
					},
					background : {
						gradient : {
							color : ['#d6d6d6', '#d6d6d6']
						},
						offset : 0
					},
					emboss : {
						gradient : {
							color : ['#5d5d5d', '#5d5d5d']
						},
						offset : [1, 0, 0, 0]
					},
					main : {
						opacity : 1,
						gradient : {
							color : ['#9c9c9c', '#888888']
						},
						offset : [1, 0, 1, 0]
					},
					line : {
						position : 'absolute',
						shape : 'line',
						width : 2,
						color : '#414755',
						offset : [14, 4.5,'auto','auto'],
						opacity : 1,
						size : [6, 6]
					},
					line2 : {
						position : 'absolute',
						shape : 'lineUp',
						width : 2,
						color : '#414755',
						offset : [20, 4.5,'auto','auto'],
						opacity : 1,
						size : [6, 6]
					}
				}
			},
			over : {
			
				layers : {
					reorder : ['base','line','line2'],
					
					base : {
						gradient : {
							color : ['#FFF', '#FFF']
						},
						offset : 0
					},
					background : {
						gradient : {
							color : ['#d6d6d6', '#d6d6d6']
						},
						offset : 0
					},
					emboss : {
						gradient : {
							color : ['#5d5d5d', '#5d5d5d']
						},
						offset : [0, 0, 1, 0]
					},
					main : {
						opacity : 1,
						gradient : {
							color : ['#9c9c9c', '#888888']
						},
						offset : [0, 0, 1, 0]
					}
				}
			}
		}
	},
	
	scrollbar : {
		track : {
			'default' : {
				width : 15,
				styles : {
					'float' : 'right',
					height : '100%',
					position : 'relative',
					zIndex : '10000'
				},
				layers : {
					reorder : ['back', 'main', 'side'],
					'default' : {
						position : 'absolute'
					},
					back : {
						offset : [0, 0, 0, 0],
						color : '#fff'
					},
					main : {
						offset : [0, '40%', 0, 0],
						
						gradient : {
							color : ['#c5c5c5', '#fcfcfc'],
							angle : 0
						}
					},
					side : {
						offset : [0, 0, 0, '80%'],
						gradient : {
							angle : 0,
							color : ['#fcfcfc', '#efefef']
						}
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
					'default' : {
						direction : 'vertical'
					},
					emboss : {
						offset : [1, 0, 1, 0],
						color : '#000',
						radius : 9,
						opacity : .3
					},
					main : {
						gradient : {
							color : ['#091d38', '#5c5c5c'],
							angle : 0
						},
						radius : 7
					},
					light : {
						gradient : {
							color : ['#fff', '#fff'],
							opacity : [.1, .9],
							angle : 0
						},
						radius : 6
					},
					reflect : {
						gradient : {
							color : ['#fff', '#fff'],
							opacity : [.8, .5],
							angle : 0
						},
						offset : [4, '65%', 3, 0],
						radius : [3, 2, 2, 3]
					}
				}
			}
		}
	},
	
	window : {
		'default' : {
			'default' : {
				fx : {
					adaptLocation : {
						'duration' : 300,
					//	'transition' : Fx.Transitions.Elastic.easeOut,
						'wait' : true
					}
				},
				/* components */
				components : {
					head : {
						styles : {
							top : '1px',
							left : '1px',
							position : 'relative',
							overflow : 'hidden',
							width : '100%',
							zIndex : 1
						}
					},
					controls : {
						styles : {
							'float' : 'left',
							padding : '1px 3px 1px',
							margin : '1px 0px 0px 1px',
							height : 18
						}
					},
					control : {
						component : 'windowButton',
						label : false,
						width : 16,
						height : 16,
						styles : {
							margin : '2px 3px 2px 2px'
						}
					},
					toggle : {
						type : 'toggleToolbar',
						label : false,
						styles : {
							position : 'absolute',
							top : 5,
							right : 10,
							margin : 0,
							padding : 0
						}
					},
					title : {
						type : 'windowTitle',
						emboss : true
					},
					view : {
						type : 'window',
						overflow : 'scrollbar',
						styles : {
							position : 'absolute',
							top : '51px',
							left : '1px',
							overflow : 'hidden'
						}
					},
					foot : {
						styles : {
						
							zIndex : 10,
							position : 'absolute',
							right : '0',
							width : '100%'
						}
					},
					status : {
						styles : {
							fontSize : '1em',
							padding : '3px 16px',
							height : '16px'
						}
					},
					resize : {
						styles : {
							position : 'absolute',
							right : 0,
							marginBottom : 0,
							width : '24px',
							height : '24px'
						}
					}
				},
				
				
				borderSize : 1,
				
				/* layers properties */
				layers : {
					'default' : {
						position : 'relative',
						shape : 'roundedRect',
						offset : '0px',
						color : '#FFFFFF',
						opacity : 1,
						radius : 5
					},
					shadow : {
						size : 16,
						offsetY : 8,
						opacity : .5
					},
					background : {
						offset : 0,
						color : '#000',
						opacity : .2,
						radius : 5
					},
					underlay : {
						color : ['#dcdcdc', '#404040'],
						offset : [1, 1, 'auto'],
						size : ['auto', 20],
						radius : [4, 4, 0, 0]
					},
					head : {
						color : ['#C4C4C4', '#989898'],
						offset : [1, 0],
						radius : [4, 4, 0, 0]
					},
					footline : {
						position : 'absolute',
						size : ['auto', 13],
						color : '#333',
						offset : ['auto', 1, 10],
						radius : 0
					},
					footback : {
						position : 'absolute',
						size : ['auto', 20],
						color : ['#fff', '#404040'],
						offset : ['auto', 1, 2],
						radius : [0, 0, 4, 4]
					},
					foot : {
						position : 'absolute',
						size : ['auto', 20],
						color : ['#C2C2C2', '#989898'],
						offset : ['auto', 1, 1],
						radius : [0, 0, 4, 4]
					}
				}
			},
			inactive : {
				layers : {
					shadow : {
						size : 8,
						offsetY : 3,
						opacity : .22
					},
					background : {
						opacity : 0.17
					},
					underlay : {
						color : ['#f1f1f1', '#878787']
					},
					head : {
						color : ['#e8e8e8', '#d0d0d0']
					},
					foot : {
						color : ['#e8e8e8', '#d0d0d0']
					}
				}
			},
			minimized : {
				width : 160,
				height : 25,
				layers : {
					reorder : ['shadow', 'background', 'underlay', 'head'],
					shadow : {
						size : 6,
						offsetY : 3,
						opacity : .20
					},
					head : {
						position : 'absolute',
						color : ['#CACACA', '#CFCFCF'],
						offset : [2, 1, 1],
						radius : 4
					}
				}
			}
		},
		transparent : {
			'default' : {
				/* components */
				components : {
					controls : {
						styles : {
							'float' : 'left',
							padding : '1px 3px 1px',
							margin : '1px 0px 0px 1px',
							height : 16
						}
					},
					control : {
						component : 'transparentWindowButton',
						label : false,
						width : 16,
						height : 16,
						styles : {
							margin : '0px'
						}
					},
					title : {
						type : 'transparentTitle'
					},
					view : {
						type : 'transparent',
						overflow : 'scrollbar',
						styles : {
							position : 'absolute',
							top : '51px',
							left : '1px',
							overflow : 'hidden'
						}
					}
				},
				
				borderSize : 1,
				
				/* layers properties */
				layers : {
					reorder : ['shadow', 'background', 'head', 'reflect'],
					'default' : {
						position : 'relative',
						shape : 'roundedRect',
						offset : 1,
						color : '#FFF',
						opacity : 1,
						radius : 5
					},
					shadow : {
						size : 5,
						offsetY : 2,
						opacity : 0.5
					},
					background : {
						offset : 0,
						color : '#000',
						opacity : .7,
						radius : 7
					},
					head : {
						color : '#fff',
						offset : [1, 1, 'auto'],
						opacity : .1,
						radius : [5, 5, 0, 0],
						size : ['auto', 18]
					},
					reflect : {
						color : '#fff',
						offset : [0, 0, 'auto'],
						size : ['auto', 9],
						opacity : .05,
						radius : [5, 5, 0, 0]
					}
				}
			},
			inactive : {
				layers : {
					reorder : ['shadow', 'background', 'head']
				}
			},
			minimized : {
				layers : {
					head : {
						color : ['#CACACA', '#CFCFCF']
					},
					foot : {
						color : ['#CACACA', '#CFCFCF']
					}
				}
			}
		}
	},
	
	windowButton : {
		'default' : {
			'default' : {
				styles : {
					position : 'relative',
					display : 'inline-block',
					cursor : 'pointer'
				},
				
				
				layers : {
					reorder : ['emboss', 'background', 'main', 'reflect', 'cache'],
					
					'default' : {
						position : 'absolute',
						shape : 'circle',
						size : [14, 14],
						opacity : 1,
						offset : 0
					},
					emboss : {
						offset : ['1px','1px','0px','1px'],
						color : '#FFF',
						opacity : .4
					},
					background : {
						offset : ['0px','1px','1px','1px'],
						gradient : {
							color : ['#2e323d', '#848995']
						}
					},
					main : {
						size : [11, 11],
						offset : [2, 2.5],
						gradient : {
							color : ['#fff', '#fff'],
							opacity : [.2, .8]
						}
					},
					reflect : {
						size : 3,
						offset : [1.5, 6.5],
						gradient : {
							color : ['#fff', '#fff'],
							opacity : [1, .5]
						}
					},
					cache : {
						shape : 'roundedRect',
						size : [2, 1],
						radius : 0,
						offset : [1, 7],
						color : '#545861',
						opacity : 1
					}
				}
			}
		},
		close : {
			'default' : {
				
				
			},

			over : {
				layers : {
					reorder : ['emboss', 'background', 'main', 'reflect', 'cache', 'line', 'line2'],
					line : {
						position : 'absolute',
						shape : 'line',
						width : 1.5,
						color : '#414755',
						offset : [3.5, 4.5],
						opacity : 1,
						size : [7, 7]
					},
					line2 : {
						position : 'absolute',
						shape : 'lineUp',
						width : 1.5,
						color : '#414755',
						offset : [3.5, 4.5],
						opacity : 1,
						size : [7, 7]
					}
				}
			}
		},
		minimize : {
			'default' : {},
			over : {
				layers : {
					reorder : ['emboss', 'background', 'main', 'reflect', 'cache', 'line'],
					line : {
						position : 'absolute',
						shape : 'lineUp',
						width : 1.5,
						color : '#414755',
						offset : [3.5, 4.5],
						opacity : 1,
						size : [7, 7],
						rotation : 45
					}
				}
			}
		},
		maximize : {
			'default' : {
				
				
			},

			over : {
				layers : {
					reorder : ['emboss', 'background', 'main', 'reflect', 'cache', 'line', 'line2'],
					line : {
						position : 'absolute',
						shape : 'lineUp',
						width : 1.5,
						color : '#414755',
						offset : [3.5, 4.5],
						opacity : 1,
						size : [7, 7],
						rotation : 45
					},
					line2 : {
						position : 'absolute',
						shape : 'line',
						width : 1.5,
						color : '#414755',
						offset : [3.5, 4.5],
						opacity : 1,
						size : [7, 7],
						rotation : 45

					}
				}
			}
		}
	},

	transparentWindowButton : {
		'default' : {
			'default' : {
				styles : {
					position : 'relative',
					display : 'inline-block',
					cursor : 'pointer'
				},

				layers : {
					reorder : ['main', 'line', 'line2'],
					
					'default' : {
						position : 'absolute',
						shape : 'circle'
					},
					main : {
						size : [13, 13],
						offset : [0, 1],
						color : '#fff',
						opacity : .7
					}
				}
			}
		},
		close : {
			'default' : {
				layers : {
					reorder : ['main', 'line', 'line2'],
					line : {
						position : 'absolute',
						shape : 'line',
						width : 1.5,
						color : '#000',
						offset : [3, 4],
						opacity : .8,
						size : [7, 7]
					},
					line2 : {
						position : 'absolute',
						shape : 'lineUp',
						width : 1.5,
						color : '#000',
						offset : [3, 4],
						opacity : .8,
						size : [7, 7]
					}
				}
			}
		},
		minimize : {
			'default' : {
				layers : {
					reorder : ['main', 'line'],
					line : {
						position : 'absolute',
						shape : 'lineUp',
						width : 1.5,
						color : '#000',
						offset : [3.5, 4.5],
						opacity : .8,
						size : [6, 6],
						rotation : 45
					}
				}
			}
		},
		maximize : {
			'default' : {
				layers : {
					reorder : ['main','line', 'line2'],
					
					line : {
						position : 'absolute',
						shape : 'lineUp',
						width : 1.5,
						color : '#000',
						offset : [3.5, 4.5],
						opacity : 1,
						size : [6, 6],
						rotation : 45
					},
					line2 : {
						position : 'absolute',
						shape : 'line',
						width : 1.5,
						color : '#000',
						offset : [3.5, 4.5],
						opacity : 1,
						size : [6, 6],
						rotation : 45
					}
				}
			}
		}
	},		
		
	panel : {
		'default' : {
			'default' : {
				fx : {
						adaptLocation : {
						'duration' : 1000,
						'transition' : Fx.Transitions.Elastic.easeOut,
						'wait' : true
					}
				},	
				/* components */
				components : {
					head : {
						styles : {
							top : '1px',
							left : '1px',
							position : 'relative',
							overflow : 'hidden',
							width : '100%',
						 	zIndex : 1
						}
					},
					controls : {
						styles : {
							'float' : 'left',
							padding : '1px 3px 1px',
							margin : '1px 0px 0px 1px',
							height : 18
						}
					},
					control : {
						type : 'window',
						label : false,
						width : 15,
						height : 15,
						styles : {
							margin : '2px 3px'
						}
					},
					toggle :{
						type : 'toggleToolbar',
						label : false,
						styles : {
							position : 'absolute',
							top : 5,
							right : 10,
							margin : 0,
							padding : 0
						}
					},
					title : {
						type : 'windowTitle',
						emboss : true
					},
					view : {
						type  : 'defaultWindow',
						overflow : 'scrollbar',
						styles : {
							position : 'absolute',
							top : '51px',
							left : '1px',
							overflow : 'hidden'
						}
					},
					foot : {
						styles : {
							
							zIndex :10,
							position : 'absolute',
						    right : '0',
						   	width : '100%'
						}  
					},
					status : {
						styles : {
							fontSize : '1em',
							padding : '3px 16px',
							height : '16px'
						}
					},
					resize : {
						styles : {
							position : 'absolute',
							right : 0,
							marginBottom : 0,
							width : '24px',
							height : '24px'
						}
					},
					overlay : { 
						styles : {
							backgroundColor : '#fff',
							opacity :'.5',
						    position : 'absolute',
						    height : '100%',
						    width : '100%',
							zIndex : '100000'
						}
					}
				},

		
				borderSize	 : 1,
				
				/* layers properties */
				layers		 : {
					'default' : {
						position : 'relative',
						shape : 'roundedRect',
						offset : 1,
						color : '#FFFFFF',
						opacity : 1,
						radius : 0
					},
				/*	shadow : {
						size : 42,
						offsetY : 10
					},*/
					background : {
						offset : '0px',
						color : '#000',
						opacity : .20,
						radius : 0
					},
					underlay : {
						color : ['#dcdcdc','#404040'],
						offset : [1, 1, 'auto'],
						size : ['auto', 20]
					},
					head : {
						color : ['#C4C4C4','#989898'], 
						offset : [1, 0],
						radius : 0
					},
					footline : {
						position : 'absolute',
						size : ['auto', 20],
						color : '#333',
						offset : ['auto', 1, 3],
						radius : 0
					},
					footback : {
						position : 'absolute',
						size : ['auto', 20],
						color : ['#fff','#404040'],
						offset : ['auto', 1, 2]
					},
					foot : {
						position : 'absolute',
						size : ['auto', 20],
						color : ['#C2C2C2','#989898'],
						offset : ['auto', 1, 1]
					}
				}
			},
			inactive : {
				layers : {
					shadow : {
						offsetY : 8,
						magnify : -5
					},
					background : {
						opacity : 0.17
					},
					underlay : {
						color : ['#f1f1f1','#878787']
					},
					head : {
						color : ['#e8e8e8','#d0d0d0']
					},
					foot : {
						color : ['#e8e8e8','#d0d0d0']
					}
				}
			},
			minimized : {
				layers : {
					head : {
						color : ['#CACACA','#CFCFCF']
					},
					foot : {
						color : ['#CACACA','#CFCFCF']
					}
				}
			}
		},
		transparent : {
			'default' : {
				/* components */
				components : {
					controls : {
						padding : '2px 2px 1px 2px'
					},
					control : {
						type : 'transparent',
						width : 15,
						height : 15,
						styles : {
							margin : '0 2px 0 0'
						}
					},
					title : {
						type : 'transparentTitle' 
					},
					view : {
						type : 'transparent'
					}
				},
				
				borderSize	 : 1,
				
				/* layers properties */
				layers : {
					reorder	 : ['shadow','background','head','reflect'],
					'default' : {
						position : 'relative',
						shape : 'roundedRect',
						offset : 1,
						color : '#FFF',
						opacity : 1,
						radius : 5
					},
					shadow : {
						size : 16,
						offsetY : 5
					},
					background : {
						offset : 0,
						color : '#000',
						opacity : .50,
						radius : 7
					},
					head : {
						color : '#fff', 
						offset : [1, 1, 'auto'],
						opacity : .1,
						radius : [5,5,0,0],
						size : ['auto', 18]
					},
					reflect : {
						color : '#fff',
						offset : [0, 0, 'auto'],
						size : ['auto', 9],
						opacity : .05,
						radius : [5,5,0,0]
					}
				}
			},
			inactive		 : {
				layers		 : {
					reorder	 : ['shadow','background'],
					shadow	 : {
						offsetY : 2,
						size : 20,
						
						magnify : 0
					}
				}
			},
			minimized		 : {
				layers		 : {
					head	 : {
						color : ['#CACACA','#CFCFCF']
					},
					foot	 : {
						color : ['#CACACA','#CFCFCF']
					}
				}
			}
		}
	},
	

	element : {
		'default' : {
			'default' : {}
		},

		resizeHandler : {
			'default' : {
				width		 : 20,
				height		 : 20,
				styles : {
					height	 : '20px',
					width	 : '20px',
					position : 'absolute',
					right	 : 0,
					marginBottom : 0,
					width	 : '24px',
					height	 : '24px',
					opacity	 : '.5',
					marginRight : '1px'
				},
				/* layers properties */
				layers		 : {
					'default'	 : {
						position : 'absolute',
						shape : 'lineUp',
						opacity : .05,
						width : 1,
						color : '#000'
					},
					
					first	 : {
						offset : [6,6],
						size : [11,11]
					},
					second	 : {
						color : '#fff',
						offset : [7,7],
						size : [10,10]
					},
					third	 : {
						offset : [10,10],
						size : [7,7]
					},
					four	 : {
						color : '#fff',
						offset : [11,11],
						size : [6,6]
					},					
					five	 : {
						offset : [14,14],
						size : [3,3]
					},
					six		 : {
						color : '#fff',
						offset : [15,15],
						size : [2,2]
					}
				}
			}
		},
		
		menuRollover : {
			'default' : {
				/* layers properties */
				layers		 : {
					background : {
						color : ['#606971','444f5a'],
						offset : [1, 0]
					},
					main	 : {
						color : ['#6b737b','#555e69'],
						offset : [2, 0]
					}
				}
			}
		},
		toolbarRollover : {
			'default' : {
				/* layers properties */
				layers		 : {
					'default' : {
						offset : [3,0,1],
						color : '#fff',
						radius : 6
					},
					background : {
						color : ['#606971','444f5a']
					},
					main	 : {
						color : ['#6b737b','#555e69'],
						offset : [1, 0]
					},
					reflect	 : {
						color : ['#fff','#fff'],
						offset : [1,2,'35%'],
						opacity : [.1,0],
						radius : [5,5,0,0]
					}
				}
			}
		},
		menuRightArrow : {
			'default' : {
				width : 10,
				height : 9,
				
				/* layers properties */
				layers		 : {
					main	 : {
						shape : 'triangle',
						rotation : 90,
						color : '#333'
					}
				}
			},
			'over' : {
				layers		 : {
					main	 : {
						color : '#FFF'
					}
				}
			}
		},
		menuArrow : {
			'default' : {
				/* layers properties */
				layers		 : {
					background : {
						color : '#FFF',
						radius : [4,4,0,0]
					},
					arrow	 : {
						shape : 'triangle',
						size : [10, 9],
						color : '#333',
						offset : ['30%', '46%']
					}
				}
				
				
			},
			up : {},
			
			down : {
				layers		 : {
					background : {
						radius : [0,0,4,4]
					},
					arrow	 : {
						shape : 'triangle',
						rotation : 180
					}
				}
			}
		},
		tabbar : {
			'default' : {
				
				height		 : 21,
				width		 : 1000,
				
				/* layers properties */
				styles : {
					position : 'relative',
					display	 : 'block',
					fontSize : '.7em',
					height	 : '24px',
					width	 : '100%',
					padding	 : '0',
					margin	 : '0',
					top		 :'0px',
					left	 : '0px',
					overflow : 'hidden'
				},
				layers		 : {
					reorder	 : ['base','background','emboss','main'],
					
					base : {
						gradient : {
							color :	['#d6d6d6','#e8e8e8']
						},
						offset : 0
					},
					background : {
						gradient : {
							color :	['#d6d6d6','#d6d6d6']
						},
						offset : 0
					},
					emboss	 : {
						gradient : {
							color :	['#5d5d5d','#5d5d5d']
						},
						offset : [0,0,4,0]
					},
					main	 : {
						opacity :1,
						gradient : {
							color :	['#9c9c9c','#888888']
						},
						offset : [0,1,1,0]
					}
				}
			}
		}
	},
	bubble : {
		'default' : {
			'default' : {
				components	 : {
					label	 : {
						styles : {
							zIndex : 1,
							position : 'absolute',
							top : 0,
							left : 0,
							cursor : 'default',
							color : '#FFF',
							padding : '8px 10px 18px',
							fontSize : '10px',
							whiteSpace :'nowrap'
						}
					}
				},
				
				shortcuts	 : {
					labelStyles : 'components.label.styles'
				},
				
				styles		 : {
					display	 : 'block',
					position : 'absolute',
					opacity	 : 0		
				},
				
				layers		 : {
					'default' : {
						position : 'absolute',
						color : '#000',
						radius : 5,
						offset : 0,
						opacity : .8
					},
					background : {
						offset : [0,0,8],
						radius : 5
					},
					arrow : {
						shape : 'triangle',
						rotation : 180,
						size : [18,8],
						offset : ['auto', 20,0]
					},
					reflect	 : {
						color : ['#FFFFFF','#FFFFFF'],
						radius : 4,
						opacity : [0.4, 0.1],
						offset : [1,1,'55%']
					}
				}
			}
		},
		
		'bottom' : {
			'default' : {
				components : {
					label : {
						styles : {
							padding : '13px 8px 6px'
						}
					}
				},
				
				layers : {
					background : {
						offset : [8,0,0]
					},
					arrow : {
						shape : 'triangle',
						rotation : 0,
						offset : [0,0,'auto',20]
					}
				}
			}
		}
	},
	
	
	fieldset : {
		'default' : {
			'default' : {
				/* css properties */
				styles : {
					position : 'relative',
					display : 'inline-block',
					paddingBottom : '100' 
				},
				
				/* layers properties */
				
				layers : {
					'default' : {
						position : 'relative',
						shape : 'roundedRect',
						offset : '0px',
						color : ['#FFF','#000'],
						opacity : 1,
						radius : 8
					},
					background : {
						offset : [0,0,50,0],
						gradient : {
							color : ['#000','#333'],
							angle : 110,
							opacity : .8
						},
						
						radius : 8
					},
					reflection : {
						position : 'bottom',
						height: 50,
						offset : [0,0,0,0],
						gradient : {
							color : ['#000','#fff'],
							angle : 10,
							opacity : .8
						},
						radius : [8,8,8,8]
					}
				}
			}
		}
	},
	
	box : {
		'default' : {
			'default' : {
				/* css properties */
				padding : '2px 16px 4px 16px',
				
				/* layers properties */
				
				layers : {
					background : {
						offset : ['0px', '1px', '1px', '1px'],
						color : '#cccccc',
						opacity : 1,
						radius : 8
					},
					main : {
						mainOffset : ['1px', '1px', '4px', '1px'],
						mainColor : '#FFF',
						mainOpacity : 1,
						mainRadius : 7
					},
					reflect : {
						size : ['auto', 30],
						offset : ['2px', '0px', 'auto'],
						color : ['#F1F1F1', '#FFF'],
						opacity : 1,
						radius : [7, 7, 0, 0]
					}
				}
			}
		}
	}
}
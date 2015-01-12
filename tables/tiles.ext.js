var mirrors = [
	'http://www.imageup.ru/img279/'
];

var tiles = { // описание типов тайлов
	base: {
		blue: {
			numbers: 1, // длинна массива (возможно ненужна, не знаю array.lenght насколько медленнее
			list: [
				{ width:128, height:142, center: { x:64, y:64 }, url:'2000833/baseblue.png' , loaded: 0}
			]
		},
		gray: {
			numbers: 1,
			list: [
				{ width:128, height:142, center: { x:64, y:64 }, url:'2000836/basegray.png' , loaded: 0}
			]
		},
		elow: {
			numbers: 1,
			list: [
				{ width:128, height:142, center: { x:64, y:64 }, url:'2000835/baseelow.png' , loaded: 0}
			]
		},
		ice: {
			numbers: 1,
			list: [
				{ width:128, height:142, center: { x:64, y:64 }, url:'2000838/basesnow.png' , loaded: 0}
			]
		},
		snow: {
			numbers: 4,
			list: [
				{ width:148, height:171, center: { x:77, y:92 }, url:'2000842/snow00.png' , loaded: 0},
				{ width:150, height:167, center: { x:73, y:88 }, url:'2000843/snow01.png' , loaded: 0},
				{ width:148, height:169, center: { x:71, y:92 }, url:'2000844/snow02.jpg' , loaded: 0},
				{ width:149, height:170, center: { x:76, y:91 }, url:'2000846/snow03.png' , loaded: 0}
			]
		}
	},
	grass: {
		usual: {
			numbers: 4,
			list: [
				{ width:174, height:171, center: { x:85, y:92 }, url:'2000848/grassusual00.png' , loaded: 0},
				{ width:162, height:179, center: { x:72, y:100 }, url:'2000851/grassusual01.png' , loaded: 0},
				{ width:174, height:179, center: { x:89, y:102 }, url:'2000853/grassusual02.png' , loaded: 0},
				{ width:161, height:177, center: { x:89, y:98 }, url:'2000855/grassusual03.jpg' , loaded: 0}
			]
		},
		dry0: {
			numbers: 4,
			list: [
				{ width:174, height:198, center: { x:85, y:119 }, url:'2000856/grassdryv000.png' , loaded: 0},
				{ width:174, height:197, center: { x:85, y:118 }, url:'2000857/grassdryv001.png' , loaded: 0},
				{ width:174, height:191, center: { x:85, y:114 }, url:'2000858/grassdryv002.png' , loaded: 0},
				{ width:174, height:192, center: { x:85, y:113 }, url:'2000860/grassdryv003.png' , loaded: 0}
			]
		},
		dry1: {
			numbers: 4,
			list: [
				{ width:174, height:207, center: { x:85, y:130 }, url:'tiles/grass/grass.dry.v1.00.png' , loaded: 0},
				{ width:174, height:208, center: { x:85, y:129 }, url:'tiles/grass/grass.dry.v1.01.png' , loaded: 0},
				{ width:174, height:209, center: { x:85, y:130 }, url:'tiles/grass/grass.dry.v1.02.png' , loaded: 0},
				{ width:174, height:214, center: { x:85, y:135 }, url:'tiles/grass/grass.dry.v1.03.png' , loaded: 0}
			]
		},
		dry2: {
			numbers: 4,
			list: [
				{ width:174, height:201, center: { x:85, y:122 }, url:'tiles/grass/grass.dry.v2.00.png' , loaded: 0},
				{ width:174, height:210, center: { x:85, y:131 }, url:'tiles/grass/grass.dry.v2.01.png' , loaded: 0},
				{ width:174, height:203, center: { x:85, y:126 }, url:'tiles/grass/grass.dry.v2.02.png' , loaded: 0},
				{ width:174, height:199, center: { x:85, y:120 }, url:'tiles/grass/grass.dry.v2.03.png' , loaded: 0}
			]
		},
		dry3: {
			numbers: 4,
			list: [
				{ width:174, height:195, center: { x:85, y:116 }, url:'tiles/grass/grass.dry.v3.00.png' , loaded: 0},
				{ width:162, height:198, center: { x:72, y:119 }, url:'tiles/grass/grass.dry.v3.01.png' , loaded: 0},
				{ width:174, height:193, center: { x:89, y:114 }, url:'tiles/grass/grass.dry.v3.02.png' , loaded: 0},
				{ width:161, height:195, center: { x:89, y:117 }, url:'tiles/grass/grass.dry.v3.03.png' , loaded: 0}
			]
		},
		dry4: {
			numbers: 4,
			list: [
				{ width:174, height:198, center: { x:85, y:119 }, url:'tiles/grass/grass.dry.v4.00.png' , loaded: 0},
				{ width:163, height:202, center: { x:72, y:123 }, url:'tiles/grass/grass.dry.v4.01.png' , loaded: 0},
				{ width:175, height:202, center: { x:90, y:123 }, url:'tiles/grass/grass.dry.v4.02.png' , loaded: 0},
				{ width:163, height:196, center: { x:91, y:118 }, url:'tiles/grass/grass.dry.v4.03.png' , loaded: 0}
			]
		},
		flowers0: {
			numbers: 4,
			list: [
				{ width:175, height:171, center: { x:85, y:92 }, url:'tiles/grass/grass.flowers.v0.00.png' , loaded: 0},
				{ width:163, height:180, center: { x:72, y:101 }, url:'tiles/grass/grass.flowers.v0.01.png' , loaded: 0},
				{ width:175, height:182, center: { x:90, y:103 }, url:'tiles/grass/grass.flowers.v0.02.png' , loaded: 0},
				{ width:163, height:177, center: { x:91, y:98 }, url:'tiles/grass/grass.flowers.v0.03.png' , loaded: 0}
			]
		},
		flowers1: {
			numbers: 4,
			list: [
				{ width:175, height:171, center: { x:85, y:92 }, url:'tiles/grass/grass.flowers.v1.00.png' , loaded: 0},
				{ width:163, height:180, center: { x:72, y:101 }, url:'tiles/grass/grass.flowers.v1.01.png' , loaded: 0},
				{ width:175, height:182, center: { x:90, y:103 }, url:'tiles/grass/grass.flowers.v1.02.png' , loaded: 0},
				{ width:163, height:177, center: { x:91, y:98 }, url:'tiles/grass/grass.flowers.v1.03.png' , loaded: 0}
			]
		},
		flowers2: {
			numbers: 4,
			list: [
				{ width:175, height:204, center: { x:85, y:125 }, url:'tiles/grass/grass.flowers.v2.00.png' , loaded: 0},
				{ width:163, height:194, center: { x:72, y:115 }, url:'tiles/grass/grass.flowers.v2.01.png' , loaded: 0},
				{ width:175, height:195, center: { x:90, y:116 }, url:'tiles/grass/grass.flowers.v2.02.png' , loaded: 0},
				{ width:163, height:202, center: { x:91, y:123 }, url:'tiles/grass/grass.flowers.v2.03.png' , loaded: 0}
			]
		}
	},
	sand: {
		sand: {
			numbers: 4,
			list: [
				{ width:132, height:138, center: { x:66, y:61 }, url:'tiles/sand/sand.00.png' , loaded: 0},
				{ width:132, height:138, center: { x:66, y:61 }, url:'tiles/sand/sand.01.png' , loaded: 0},
				{ width:132, height:138, center: { x:66, y:61 }, url:'tiles/sand/sand.02.png' , loaded: 0},
				{ width:132, height:138, center: { x:66, y:61 }, url:'tiles/sand/sand.03.png' , loaded: 0}
			]
		},
		dry: {
			numbers: 4,
			list: [
				{ width:132, height:169, center: { x:66, y:92 }, url:'tiles/sand/sand.grass.v0.00.png' , loaded: 0},
				{ width:132, height:170, center: { x:66, y:93 }, url:'tiles/sand/sand.grass.v0.01.png' , loaded: 0},
				{ width:132, height:177, center: { x:66, y:100 }, url:'tiles/sand/sand.grass.v0.02.png' , loaded: 0},
				{ width:132, height:182, center: { x:66, y:105 }, url:'tiles/sand/sand.grass.v0.03.png' , loaded: 0}
			]
		},
		grass: {
			numbers: 4,
			list: [
				{ width:132, height:158, center: { x:66, y:81 }, url:'tiles/sand/sand.grass.v1.00.png' , loaded: 0},
				{ width:132, height:162, center: { x:66, y:85 }, url:'tiles/sand/sand.grass.v1.01.png' , loaded: 0},
				{ width:132, height:167, center: { x:66, y:90 }, url:'tiles/sand/sand.grass.v1.02.png' , loaded: 0},
				{ width:132, height:169, center: { x:66, y:92 }, url:'tiles/sand/sand.grass.v1.03.png' , loaded: 0}
			]
		},
		snow_sand: {
			numbers: 4,
			list: [
				{ width:149, height:165, center: { x:74, y:88 }, url:'tiles/sand/snow.sand.00.png' , loaded: 0},
				{ width:148, height:168, center: { x:71, y:91 }, url:'tiles/sand/snow.sand.01.png' , loaded: 0},
				{ width:149, height:168, center: { x:75, y:91 }, url:'tiles/sand/snow.sand.02.png' , loaded: 0},
				{ width:148, height:170, center: { x:77, y:93 }, url:'tiles/sand/snow.sand.03.png' , loaded: 0}
			]
		},
		snow_dry: {
			numbers: 4,
			list: [
				{ width:149, height:169, center: { x:74, y:92 }, url:'tiles/sand/snow.sand.grass.v0.00.png' , loaded: 0},
				{ width:148, height:170, center: { x:71, y:93 }, url:'tiles/sand/snow.sand.grass.v0.01.png' , loaded: 0},
				{ width:149, height:177, center: { x:75, y:100 }, url:'tiles/sand/snow.sand.grass.v0.02.png' , loaded: 0},
				{ width:148, height:182, center: { x:77, y:105 }, url:'tiles/sand/snow.sand.grass.v0.03.png' , loaded: 0}
			]
		},
	},
	water: {
		water: {
			numbers: 1,
			list: [
				{ width:130, height:67, center: { x:65, y:65 }, url:'tiles/water/usual/water.00.png' , loaded: 0}
			]			
		},
		ice: {
			numbers: 1,
			list: [
				{ width:128, height:107, center: { x:64, y:77 }, url:'tiles/water/usual/water.ice.00.png' , loaded: 0}
			]			
		}
	},
	snow: {
		snow: {
			numbers: 4,
			list: [
				{ width:148, height:171, center: { x:77, y:92 }, url:'tiles/grass/snow.00.png' , loaded: 0},
				{ width:150, height:167, center: { x:73, y:88 }, url:'tiles/grass/snow.01.png' , loaded: 0},
				{ width:148, height:169, center: { x:71, y:92 }, url:'tiles/grass/snow.02.png' , loaded: 0},
				{ width:149, height:170, center: { x:76, y:91 }, url:'tiles/grass/snow.03.png' , loaded: 0}
			]			
		},
		grass: {
			numbers: 4,
			list: [
				{ width:148, height:171, center: { x:77, y:92 }, url:'tiles/grass/snow.00.png' , loaded: 0},
				{ width:150, height:167, center: { x:73, y:88 }, url:'tiles/grass/snow.01.png' , loaded: 0},
				{ width:148, height:169, center: { x:71, y:92 }, url:'tiles/grass/snow.02.png' , loaded: 0},
				{ width:149, height:170, center: { x:76, y:91 }, url:'tiles/grass/snow.03.png' , loaded: 0}
			]
		},
		dry0: {
			numbers: 4,
			list: [
				{ width:148, height:198, center: { x:77, y:119 }, url:'tiles/grass/snow.grass.dry.v0.00.png' , loaded: 0},
				{ width:150, height:197, center: { x:73, y:118 }, url:'tiles/grass/snow.grass.dry.v0.01.png' , loaded: 0},
				{ width:148, height:191, center: { x:71, y:114 }, url:'tiles/grass/snow.grass.dry.v0.02.png' , loaded: 0},
				{ width:149, height:192, center: { x:76, y:113 }, url:'tiles/grass/snow.grass.dry.v0.03.png' , loaded: 0}
			]
		},
		dry1: {
			numbers: 4,
			list: [
				{ width:148, height:207, center: { x:71, y:130 }, url:'tiles/grass/snow.grass.dry.v1.00.png' , loaded: 0},
				{ width:149, height:208, center: { x:76, y:129 }, url:'tiles/grass/snow.grass.dry.v1.01.png' , loaded: 0},
				{ width:148, height:209, center: { x:77, y:130 }, url:'tiles/grass/snow.grass.dry.v1.02.png' , loaded: 0},
				{ width:150, height:214, center: { x:73, y:135 }, url:'tiles/grass/snow.grass.dry.v1.03.png' , loaded: 0}
			]
		},
		dry2: {
			numbers: 4,
			list: [
				{ width:148, height:201, center: { x:77, y:122 }, url:'tiles/grass/snow.grass.dry.v2.00.png' , loaded: 0},
				{ width:150, height:210, center: { x:73, y:131 }, url:'tiles/grass/snow.grass.dry.v2.01.png' , loaded: 0},
				{ width:148, height:203, center: { x:71, y:126 }, url:'tiles/grass/snow.grass.dry.v2.02.png' , loaded: 0},
				{ width:149, height:199, center: { x:76, y:120 }, url:'tiles/grass/snow.grass.dry.v2.03.png' , loaded: 0}
			]
		},
		dry3: {
			numbers: 4,
			list: [
				{ width:148, height:195, center: { x:71, y:116 }, url:'tiles/grass/snow.grass.dry.v3.00.png' , loaded: 0},
				{ width:149, height:198, center: { x:76, y:119 }, url:'tiles/grass/snow.grass.dry.v3.01.png' , loaded: 0},
				{ width:148, height:193, center: { x:77, y:114 }, url:'tiles/grass/snow.grass.dry.v3.02.png' , loaded: 0},
				{ width:150, height:195, center: { x:73, y:117 }, url:'tiles/grass/snow.grass.dry.v3.03.png' , loaded: 0}
			]
		},
		dry4: {
			numbers: 4,
			list: [
				{ width:148, height:198, center: { x:71, y:119 }, url:'tiles/grass/snow.grass.dry.v4.00.png' , loaded: 0},
				{ width:149, height:202, center: { x:76, y:123 }, url:'tiles/grass/snow.grass.dry.v4.01.png' , loaded: 0},
				{ width:148, height:202, center: { x:77, y:123 }, url:'tiles/grass/snow.grass.dry.v4.02.png' , loaded: 0},
				{ width:150, height:196, center: { x:73, y:118 }, url:'tiles/grass/snow.grass.dry.v4.03.png' , loaded: 0}
			]
		}	
	}
}

var tiles_mix = { // описание МИКСОВ собранных из различных типов тайлов
	field: {
		sun: [
			{ tiles:tiles.grass.dry0, procent:1 },
			{ tiles:tiles.grass.dry1, procent:1 },
			{ tiles:tiles.grass.dry2, procent:1 },
			{ tiles:tiles.grass.dry3, procent:1 },
			{ tiles:tiles.grass.dry4, procent:1 },
			{ tiles:tiles.grass.flowers0, procent:20 },
			{ tiles:tiles.grass.flowers1, procent:20 },
			{ tiles:tiles.grass.flowers2, procent:5 },
			{ tiles:tiles.grass.usual, procent:50 }
		],
		snow: [
			{ tiles:tiles.snow.dry0, procent:1 },
			{ tiles:tiles.snow.dry1, procent:1 },
			{ tiles:tiles.snow.dry2, procent:1 },
			{ tiles:tiles.snow.dry3, procent:1 },
			{ tiles:tiles.snow.dry4, procent:1 },
			{ tiles:tiles.snow.grass, procent:95 }
		]
	},
	steppe: {
		sun: [
			{ tiles:tiles.grass.dry0, procent:10 },
			{ tiles:tiles.grass.dry1, procent:10 },
			{ tiles:tiles.grass.dry2, procent:10 },
			{ tiles:tiles.grass.dry3, procent:10 },
			{ tiles:tiles.grass.dry4, procent:10 },
			{ tiles:tiles.grass.flowers0, procent:13 },
			{ tiles:tiles.grass.flowers1, procent:13 },
			{ tiles:tiles.grass.flowers2, procent:4 },
			{ tiles:tiles.grass.usual, procent:20 }
		],
		snow: [
			{ tiles:tiles.snow.dry0, procent:10 },
			{ tiles:tiles.snow.dry1, procent:10 },
			{ tiles:tiles.snow.dry2, procent:10 },
			{ tiles:tiles.snow.dry3, procent:10 },
			{ tiles:tiles.snow.dry4, procent:10 },
			{ tiles:tiles.snow.grass, procent:50 }
		]
	},
	duna: {
		sun: [
			{ tiles:tiles.grass.usual, procent:10 },
			{ tiles:tiles.sand.sand, procent:40 },			
			{ tiles:tiles.sand.dry, procent:25 },			
			{ tiles:tiles.sand.grass, procent:25 }
		],
		snow: [
			{ tiles:tiles.snow.grass, procent:10 },
			{ tiles:tiles.sand.snow_sand, procent:40 },
			{ tiles:tiles.sand.snow_dry, procent:25 },
			{ tiles:tiles.sand.snow_sand, procent:25 },
		]
	},
	bich: {
		sun: [
			{ tiles:tiles.sand.sand, procent:100 }
		],
		snow: [
			{ tiles:tiles.sand.snow_sand, procent:100 }
		]
	},
	water: {
		sun: [
			{ tiles:tiles.water.water, procent:100 }
		],
		snow: [
			{ tiles:tiles.water.ice, procent:100 }
		]
	},
	stoun: {
		sun: [
			{ tiles:tiles.base.gray, procent:100 }
		],
		snow: [
			{ tiles:tiles.snow.snow, procent:100 }
		]
	},
};


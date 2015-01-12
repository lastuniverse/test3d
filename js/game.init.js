function worldInit(){
	world.map.levels.water = getIntValueById('waterlevel',0,65535);	
	world.map.levels.sand = getIntValueById('sandlevel',0,65535);	
	world.map.levels.stoun = getIntValueById('stounlevel',0,65535);	
	world.map.levels.ice = getIntValueById('icelevel',0,65535);
	world.map.date.day = getIntValueById('day',0,365);
	world.map.temper.thdivider = getIntValueById('thdivider',0,20);
	world.map.temper.tddivider = getIntValueById('tddivider',0,20);
	
	world.map.layers.map.on = getCheckedById('map_check');
	world.map.layers.map.alpha = getIntValueById('a_map_check',0,255);	

	world.map.layers.sun.on = getCheckedById('sun_check');
	world.map.layers.sun.alpha = getIntValueById('a_sun_check',0,255);	

	world.map.layers.temp.on = getCheckedById('temp_check');
	world.map.layers.temp.alpha = getIntValueById('a_temp_check',0,255);
	
	world.map.layers.press.on = getCheckedById('press_check');
	world.map.layers.press.alpha = getIntValueById('a_press_check',0,255);	

	world.map.layers.ice.on = getCheckedById('ice_check');
	world.map.layers.ice.alpha = getIntValueById('a_ice_check',0,255);	
	
	world.map.layers.seasons.on = getCheckedById('seasons_check');
	world.map.layers.seasons.alpha = getIntValueById('a_seasons_check',0,255);

	world.map.layers.addsh.on = getCheckedById('addsh_check');
	world.map.layers.addsh.alpha = getIntValueById('a_addsh_check',0,255);

	world.map.geo.loops = getIntValueById('loops',1,8);
	world.map.geo.numbers = getIntValueById('numbers',1,20);
	world.map.geo.edivider = getIntValueById('divider',0,10);

	world.map.geo.hdivider = getIntValueById('hdivider',0,256);
	world.map.geo.degree = getIntValueById('degree',world.map.geo.loops+1,25);
	world.loader.recalcWORLD();
	//world.map.geo.base = 2<<(world.map.geo.degree-1);
	//world.map.geo.height = world.map.geo.base;
	//world.map.geo.width = world.map.geo.height<<1;
	setValueById('base',world.map.geo.base);
	setValueById('height',world.map.geo.height);
	setValueById('width',world.map.geo.width);
}

function worldRestore(){
	setValueById('waterlevel',world.map.levels.water);
	setValueById('sandlevel',world.map.levels.sand);
	setValueById('stounlevel',world.map.levels.stoun);
	setValueById('icelevel',world.map.levels.ice);
	setValueById('day',world.map.date.day);
	setValueById('thdivider',world.map.temper.thdivider);
	setValueById('tddivider',world.map.temper.tddivider);

	setCheckedById('map_check',world.map.layers.map.on);
	setValueById('a_map_check',world.map.layers.map.alpha);
	setCheckedById('sun_check',world.map.layers.sun.on);
	setValueById('a_sun_check',world.map.layers.sun.alpha);
	setCheckedById('temp_check',world.map.layers.temp.on);
	setValueById('a_temp_check',world.map.layers.temp.alpha);
	setCheckedById('press_check',world.map.layers.press.on);
	setValueById('a_press_check',world.map.layers.press.alpha);

	setCheckedById('ice_check',world.map.layers.ice.on);
	setValueById('a_ice_check',world.map.layers.ice.alpha);
	setCheckedById('seasons_check',world.map.layers.seasons.on);
	setValueById('a_seasons_check',world.map.layers.seasons.alpha);
	setCheckedById('addsh_check',world.map.layers.addsh.on);
	setValueById('a_addsh_check',world.map.layers.addsh.alpha);

	setValueById('loops',world.map.geo.loops);
	setValueById('numbers',world.map.geo.numbers);
	setValueById('divider',world.map.geo.edivider);


	setValueById('degree',world.map.geo.degree);
	setValueById('base',world.map.geo.base);
	setValueById('width',world.map.geo.width);
	setValueById('height',world.map.geo.height);
	setValueById('hdivider',world.map.geo.hdivider);
}


var geometry = {};
function geometryInit(){
	geometry.elements = {game:{},map:{},canvas:{},edit:{},'text':{},console:{},inf:{},infcanvas:{}};

	geometry.window = {};
	geometry.window.width = getClientWidth();
	geometry.window.height = getClientHeight();
	
   geometry.elements.map = document.getElementById('map_container');
	geometry.elements.map.width = 500;
	geometry.elements.map.height = 250;
	geometry.elements.map.style.width = geometry.elements.map.width;
	geometry.elements.map.style.height = geometry.elements.map.height;
	geometry.elements.map.style.left = (geometry.window.width - geometry.elements.map.width) - 14;;
	geometry.elements.map.style.top = 7;
	
	geometry.elements.canvas = document.getElementById('map_canvas');
	geometry.elements.canvas.width = geometry.elements.map.width;
	geometry.elements.canvas.height = geometry.elements.map.height;
	geometry.elements.canvas.style.width = geometry.elements.map.width;
	geometry.elements.canvas.style.height = geometry.elements.map.height;

	geometry.elements.edit = document.getElementById('edit_container');
	geometry.elements.edit.width = geometry.elements.map.width;
	geometry.elements.edit.height = geometry.elements.map.height;
	geometry.elements.edit.style.width = geometry.elements.edit.width;
	geometry.elements.edit.style.height = (geometry.window.height - geometry.elements.map.height) - 30;
	geometry.elements.edit.style.left = (geometry.window.width - geometry.elements.edit.width) - 14;
	geometry.elements.edit.style.top = geometry.elements.map.height + 20;
	
	geometry.elements.game = document.getElementById('game_container');
	geometry.elements.game.width = (geometry.window.width - geometry.elements.edit.width) - 37;
	geometry.elements.game.height = geometry.window.height - 200;	
	geometry.elements.game.style.width = geometry.elements.game.width;
	geometry.elements.game.style.height = geometry.elements.game.height;
	geometry.elements.game.style.left = 7;
	geometry.elements.game.style.top = 7;
	
	geometry.elements.shadow = document.getElementById('game_shadow');
	geometry.elements.shadow.width = geometry.elements.game.width;
	geometry.elements.shadow.height = geometry.elements.game.height;	
	geometry.elements.shadow.style.width = geometry.elements.game.style.width;
	geometry.elements.shadow.style.height = geometry.elements.game.style.height;
	geometry.elements.shadow.style.left = geometry.elements.game.style.left;
	geometry.elements.shadow.style.top = geometry.elements.game.style.top;	
	
	geometry.elements.gcanvas = document.getElementById('game_canvas');
	geometry.elements.gcanvas.width = geometry.elements.game.width;
	geometry.elements.gcanvas.height = geometry.elements.game.height;	
	geometry.elements.gcanvas.style.width = geometry.elements.game.style.width;
	geometry.elements.gcanvas.style.height = geometry.elements.game.style.height;
	geometry.elements.gcanvas.style.left = geometry.elements.game.style.left;
	geometry.elements.gcanvas.style.top = geometry.elements.game.style.top;	

  geometry.elements.console = document.getElementById('console_container');
	geometry.elements.console.width = geometry.elements.game.width;
	geometry.elements.console.height = (geometry.window.height - geometry.elements.game.height) - 30;	
	geometry.elements.console.style.width = geometry.elements.console.width;
	geometry.elements.console.style.height = geometry.elements.console.height;
	geometry.elements.console.style.left = 7;
	geometry.elements.console.style.top = geometry.elements.game.height + 20;	

	geometry.elements.text = document.getElementById('edit_textarea');
	geometry.elements.text.width = geometry.elements.console.width;
	geometry.elements.text.height = geometry.elements.console.height;	
	geometry.elements.text.style.width = geometry.elements.text.width;
	geometry.elements.text.style.height = geometry.elements.text.height;
}
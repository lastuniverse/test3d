// Файл устарел его функционал перенесен в класс WORLD
/*function point_pressure(x,y,d,p){
	// x, y - текущие координаты на карте
	// d - текущий день в игровом году (0-365)
	// p - объект содержащий результаты предидущих вычислений
	//p.x 	//текущие координаты на карте
	//p.x		//текущие координаты на карте
	//p.day 	//текущий день в игровом году (0-365)
	//p.h 	//вычисленная генератором высот высота высота в точке (0-65535 условных едениц)
	//p.lh   //вычисленная генератором высот высота высота над уровнем моря  в точке(0-65535 условных едениц)
	//p.t		//вычисленная генератором температур температура в точке (-70 +60 градусов цельсия)
	p.p = p.t*15 // сюда занести результат вычисления атмосферного давления в мм.рт.ст
}*/

//----- температура в секторе --------------------------------------------------//
function point_temperature(x,y,d,p){
	//var sw = 2<<world.maps.opts.divider;
	//var sh = 1<<world.maps.opts.divider;
	var sh = world.geo.height;
	//var ss = world.geo.height>>world.maps.opts.divider;
	var ss = 1;
	//var sd = world.geo.degree-world.maps.opts.divider;
	var sd = 0;
	
	var sx = x>>sd;
	var sy = y>>sd;

	var height = p.h;
	var wl = world.lvls.water;
	//var h = world.maps.height[sy][sx] - wl;
	var h = (height - wl)>>3;

	var st = 0;
	p.deviation = world.maps.opts.deviation * Math.cos(d*2*3.14/365);
	p.sun = (world.geo.height * (90+p.deviation))/180;
	if( h >= -100 ){
		var fo = p.deviation;
		var fomax = 90 + world.maps.opts.deviation;
		var dt = world.maps.opts.tempmax - world.maps.opts.tempmin;
		var fu = fo - (180*y/world.geo.height) + 90;
		var ft = world.maps.opts.tempmax - (Math.abs(fu)*dt/fomax);
		//var dt = ((h*60)>>world.maps.opts.thdivider);
		var dt = ((h*60)/(1<<world.maps.opts.thdivider));
		st = ft - dt;
	}else{
		for(var i=0; i<365; i+=20){
			var cd = d-365+i;
			if( cd<0 ){ cd+=365; }
			var fo = world.maps.opts.deviation * Math.cos(cd*2*3.14/365);
			var fomax = 90 + world.maps.opts.deviation;
			var dt = world.maps.opts.tempmax - world.maps.opts.tempmin;
			var fu = fo - (180*y/world.geo.height) + 90;
			var ft = world.maps.opts.tempmax - (Math.abs(fu)*dt/fomax);
			//var dt = ((-h*20)>>world.maps.opts.tddivider);
			//var dt = ((-h*20)/(1<<world.maps.opts.tddivider));
			//ft = (ft/2)+dt;
			if( i == 0 ){ st = ft; }
			var mt = (ft-st)*30/(-h);
			st += mt;
		}
	}
	/*
	if( h >= 0 ){
		//var dt = ((h*60)>>world.maps.opts.thdivider);
		var dt = ((h*60)/(1<<world.maps.opts.thdivider));
		ft = ft - dt;
	}else{
		//var dt = ((-h*20)>>world.maps.opts.tddivider);
		var dt = ((-h*20)/(1<<world.maps.opts.tddivider));
		//if( ft>5 ){
		//	ft = (ft>>1)-dt;
		//}else if( ft<5 ){
			//ft = (ft>>1)+dt;
			ft = (ft/2)+dt;
		//}
	}*/
	p.t = Math.floor(st);
}

function temperature_map_create(d){
	var sw = 2<<world.maps.opts.divider;
	var sh = 1<<world.maps.opts.divider;
	var ss = world.geo.height>>world.maps.opts.divider;

	var fo = world.maps.opts.deviation * Math.cos(d*2*3.14/365);
	var fomax = 90 + world.maps.opts.deviation;
	var dt = world.maps.opts.tempmax - world.maps.opts.tempmin;
//Fo(D ) = U*cos(D*2*Pi/365)
//Fu(D,Ny) = Fo(D)+(180*Ny/128)-90
//Ft(D,Ny) = Tmax-abs(Fu(D,Ny))*(Tmax-Tmin)/(90+U)

	for( var y=0; y<sh; y++ ){
		say("ty:["+y+"]");
		var fu = fo + (180*y/sh) - 90;
		var ft = world.maps.opts.tempmax - Math.abs(fu) * dt / fomax;
		
		for( var x=0; x<sw; x++ ){
			//world.maps.height.mean[y][x]
			//world.maps.height.max[y][x]
			//world.maps.height.min[y][x]
			world.maps.temperature[y][x] = Math.floor(ft);
		}
	}
	say("Сгенерированна карта температур\nмаксимальная допустимая температура: ["+world.maps.opts.tempmax+"]\nминимальная допустимая температура: ["+world.maps.opts.tempmin+"]\nотклонение оси вращения мира (градусы): ["+world.maps.opts.deviation+"]");
}

 
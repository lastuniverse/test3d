/*****************************************************************************************************/
/* описание подкласса generators класса _WORLD. Отвечает за генерацию данных о мире                  */
/*****************************************************************************************************/

WORLD.calculators = function(scope) {
    this.scope = scope;
};

// выполнить расчеты по всем калькуляторам
WORLD.calculators.prototype.all = function(x, y, day, time) {
    var point = {
        x: x,
        y: y,
        day: day,
        time: time
    };

    this.pointHeight(point);
    this.pointSun(point);
    this.pointPressure(point);
    this.pointWind(point);
    this.pointСlimatic(point);
    this.pointRiver(point);
    this.pointSettlement(point);
    return point;
};

// Расчитывает высоту в точке
WORLD.calculators.prototype.pointHeight = function(point) {
    var map = this.scope.map;
    point.m = 2;
    point.h = 2;
    for (var i = 0; i < map.geo.loops; i++) {
        var sector_divider = map.geo.degree - i;
        var sectors_w = map.geo.width >> sector_divider;
        var sectors_h = map.geo.height >> sector_divider;
        var csx = point.x >> sector_divider;
        var csy = point.y >> sector_divider;
        for (var sy = -1; sy < 2; sy++) {
            var cy = csy + sy;
            if (cy >= 0 && cy < sectors_h) {
                for (var sx = -1; sx < 2; sx++) {
                    var cx = csx + sx;
                    if (i > 0) {
                        if (cx < 0) {
                            cx = sectors_w - 1;
                        }
                        if (cx > sectors_w - 1) {
                            cx = 0;
                        }
                    }
                    if (cx >= 0 && cx < sectors_w) {
                        for (var n = 0; n < map.geo.numbers; n++) {
                            var temp_height = map.data.height[i][cy][cx][n];
                            var dist = this.calcDistance(point, temp_height);
                            if (dist < temp_height.r) {
                                point.h += this.calcRelief(dist, temp_height);
                            }


                            if (n < map.mounts.numbers) {
                                if (i >= map.mounts.loopstart && i <= map.mounts.loopend) {
                                    var temp_mounts = map.data.mounts[i][cy][cx][n];
                                    dist = this.calcDistance(point, temp_mounts);
                                    if (dist < temp_mounts.r) {
                                        point.m += (this.calcRelief(dist, temp_mounts) << map.mounts.multipler);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    this.pointNormalize(point);
}

// Расчитывает:
// среднесуточную температуру в точке
// текущую температуру в точке
// текущую сезон в точке
WORLD.calculators.prototype.pointSun = function(point) {
    // point.day - дата измерения
    // point.time - время измерения

    var map = this.scope.map;

    var Pi = 3.14;
    var Pi_double = Pi * 2;
    var Pi_half = Pi / 2;

    // время в сутках от дневного равноденствия (22 марта) до даты съемки
    var F_day = point.day - 81;
    F_day = F_day < 0 ? F_day + 365 : F_day;
    //F_day = 0;  // для теста
    // время суток в секундах в 0 долготе 
    var F_time = point.time; //пока предполагаю что время будет сразу в секундах

    // девиация в радианах 
    var F_deviation = map.temper.deviation * Pi_double / 360;

    // Склонение солнца	в радианах
    var φdev = F_deviation * Math.sin(F_day * Pi_double / 365);

    // расчет сферических координат запрашиваемой точки
    // длгота 
    var λ1 = (Pi_double * point.x / map.geo.width);
    // широта 
    var φ1 = (Pi * point.y / map.geo.height) - Pi_half;

    // расчет сферических координат точки в которую свет падает перпендикулярно в это время года и дня
    // длгота 
    F_time += 3600 * 1; // для теста
    var λ2 = (F_time * Pi_double / 86400);
    // широта 
    var φ2 = φdev * Math.sin(λ2);


    // угловое расстояние между первой и второй точкой
    //cos(a) = sin(φλ )*sin(φ2)+cos(φλ )*cos(φ2)*cos(λ1 - λ2)
    //Второй закон освещенности: освещенность поверхности прямо пропорциональна косинусу угла падения лучей:
    var Angle = Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ1) * Math.cos(λ1 - λ2);

    // угол падения солнечных лучей в точку в полдень в радианах (используется для расчета среднесуточной температуры)
    //var F_average_illuminance = Pi_half - Math.abs(φdev + φ1);

    var temp = 1 - Math.pow(1 - Angle, 3);
    point.illuminance_bool = temp < 0 ? 1 : 0; // день или ночь
    point.illuminance = temp < 0 ? temp : 0; // освещенность 
    point.heat = temp * (map.temper.tempmax - map.temper.tempmin) + map.temper.tempmin; // текущее количество теплоты (подгон, типа учитываются теплопотери:)
    //point.average_heat		= ???;	// среднесуточное количество теплоты
    //point.average_temperature	=	???;	// среднесуточная температура, надо учесть влияние среднесуточного количества теплоты, высоты местности, наличие вод и их глубины
    //point.temperature			=	???;	// текущая температура, надо учесть влияние текущего и среднесуточного количества теплоты, высоты местности, наличие вод и их глубины


    // эти пересчеты между прямоугольными и сферическими координатами а также расчет углов - выели мне весь мозг :))) 
};

WORLD.calculators.prototype.pointWeather = function(point) {

    // Тропическим поясом называется часть земной поверхности (между широтами φ=23°27'N и 23°27'S), в которой Солнце ежесуточно восходит и заходит и в течение года два раза бывает в зените. Тропический пояс занимает 40% всей земной поверхности.
    // Умеренным поясом называется часть земной поверхности, в которой Солнце ежесуточно восходит и заходит, но никогда не бывает в зените. Существуют два умеренных пояса. В северном полушарии между широтами φ = 23°27'N и φ = 66°33'N, а в южном — между широтами φ=23°27'S и φ = 66°33'S. Умеренные пояса занимают 50% земной поверхности.
    // Полярным поясом называется часть земной поверхности, в которой наблюдаются полярные дни и ночи. Существуют два полярных пояса. Северный полярный пояс распространяется от широты φ = 66°33'N до северного полюса, а южный — от φ = 66°33'S до южного полюса. Они занимают 10% земной поверхности. 	

    /*	var map = this.scope.map;
	var sh = map.geo.height;
	//var ss = map.geo.height>>map.temper.divider;
	var ss = 1;
	//var sd = map.geo.degree-map.temper.divider;
	var sd = 0;
	
	var sx = x>>sd;
	var sy = y>>sd;

	var height = p.h;
	var wl = map.levels.water;
	var h = (height - wl)>>3;
	var st = 0;

	if( h >= -100 ){
		
		st = ft - dt;
	}else{
		for(var i=0; i<365; i+=20){
			var cd = d-365+i;
			if( cd<0 ){ cd+=365; }
			
			var fo = map.temper.deviation * Math.cos(cd*2*3.14/365);
			var fomax = 90 + map.temper.deviation;
			var dt = map.temper.tempmax - map.temper.tempmin;
			var fu = fo - (180*y/map.geo.height) + 90;
			var ft = map.temper.tempmax - (Math.abs(fu)*dt/fomax);
			if( i == 0 ){ st = ft; }
			var mt = (ft-st)*30/(-h);
			st += mt;
		}
	}
//	if( h >= 0 ){
//		//var dt = ((h*60)>>world.maps.opts.thdivider);
//		var dt = ((h*60)/(1<<world.maps.opts.thdivider));
//		ft = ft - dt;
//	}else{
//		//var dt = ((-h*20)>>world.maps.opts.tddivider);
//		var dt = ((-h*20)/(1<<world.maps.opts.tddivider));
//		//if( ft>5 ){
//		//	ft = (ft>>1)-dt;
//		//}else if( ft<5 ){
//			//ft = (ft>>1)+dt;
//			ft = (ft/2)+dt;
//		//}
//	}
	p.t = Math.floor(st);*/
}

// Расчитывает давление в точке
WORLD.calculators.prototype.pointPressure = function(point) {

}

// Расчитывает силу и направление ветра в точке
WORLD.calculators.prototype.pointWind = function(point) {

}

// Расчитывает:
// климатическую зону в точке
// факторы влияющие на выбор типа грунтов и распределение растительности в точке
WORLD.calculators.prototype.pointСlimatic = function(point) {

}

// Расчитывает наличие рек и/или озер в точке
WORLD.calculators.prototype.pointRiver = function(point) {

}

// Расчитывает наличие объектов в точке для автогенерированных городов и поселений
WORLD.calculators.prototype.pointSettlement = function(point) {

}


// Расчитывает дистанцию
WORLD.calculators.prototype.calcDistance = function(point1, point2) {
    var dx = Math.abs(point1.x - point2.x);
    var dy = Math.abs(point1.y - point2.y);
    var map = this.scope.map;
    if (dx > (map.geo.width >> 1)) {
        dx = map.geo.width - dx;
    }
    return dx + dy;
}

// Расчитывает высоту фигуры на расстоянии dist от центра фигуры
WORLD.calculators.prototype.calcRelief = function(dist, point) {
    if (dist < point.r) {
        return (point.r - dist);
    } else {
        return 0;
    }
}

// Нормализует высоту
WORLD.calculators.prototype.pointNormalize = function(point) {
    var map = this.scope.map;
    point.h = point.h >> map.geo.hdivider;
    if (point.h >= map.levels.water) {
        point.m = point.m << 1;
        point.h += point.m;
    } else {
        point.m = 0;
    }
    var mh = 65535;
    if (point.h < 0) {
        point.h = 0;
    }
    if (point.h > mh) {
        point.h = mh;
    }
    point.lh = point.h - map.levels.water;

}

// вычисляет псевдо рандомное значение
WORLD.calculators.prototype.getPseudoRandom = function(wx, wy, offset, max) {
    var randoms = this.scope.map.data.randoms;
    var x = Math.abs(Math.floor(wx + offset)) % 256;
    var y = Math.abs(Math.floor(wy)) % 256;
    var rnd = randoms[x][y];
    return ((rnd * max) >> 8);
}

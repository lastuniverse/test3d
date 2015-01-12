var gmap = {
	zoom: {
		step: 2,
		zoom:0,
		ox:0,
		oy:0,
		wx:0,
		wy:0,
		zx:0,
		zy:0,
		zw:0,
		zh:0
	},
	canvas: {
		cw:0,
		ch:0
	}
};

function zoomCalc(cx,cy,zoomed){
	// вычисляет параметры нового уровня зума
	var msg = 'расчитаны параметры зума\n';
	msg += 'координаты курсора внутри области отображения (точки): сx['+cx+'] сy['+cy+']\n';
	if( zoomed == 0 ){
		gmap.zoom.zoom = 0; // зум
		gmap.zoom.ox = 0; // смещение по X от края мира до края зума в метрах
		gmap.zoom.oy = 0; // смещение по Y от края мира до края зума в метрах
	}
	if( zoomed==0 || zoomed==1 || zoomed==2 ){
		gmap.zoom.zw = world.map.geo.width>>gmap.zoom.zoom;		// ширина области зума в метрах
		gmap.zoom.zh = world.map.geo.height>>gmap.zoom.zoom;	// высота области зума в метрах
		gmap.zoom.zx = Math.floor(gmap.zoom.zw*cx/gmap.canvas.cw);	// смещение по X от края видимой области в метрах
		gmap.zoom.zy = Math.floor(gmap.zoom.zh*cy/gmap.canvas.ch);	// смещение по Y от края видимой области в метрах
		gmap.zoom.wx = gmap.zoom.ox+gmap.zoom.zx;	// смещение по X от края мира в метрах
		gmap.zoom.wy = gmap.zoom.oy+gmap.zoom.zy;	// смещение по Y от края мира в метрах
		msg += 'координаты курсора внутри области отображения (метры): zx['+gmap.zoom.zx+'] zy['+gmap.zoom.zy+']\n';
		msg += 'старая область отображения (метры): zw['+gmap.zoom.zw+'] zh['+gmap.zoom.zh+']\n';
		msg += 'курсор внутри мира (метры): wx['+gmap.zoom.wx+'] wy['+gmap.zoom.wy+']\n';
	}
	if( zoomed==2 ){
		gmap.zoom.zoom = gmap.zoom.zoom + gmap.zoom.step;	// увеличиваем зум
		gmap.zoom.zw = world.map.geo.width>>gmap.zoom.zoom;		// ширина области нового зума в метрах
		gmap.zoom.zh = world.map.geo.height>>gmap.zoom.zoom;	// высота области нового зума в метрах
		gmap.zoom.ox = gmap.zoom.wx-(gmap.zoom.zw>>1); // смещение по X от края мира до края зума в метрах
		gmap.zoom.oy = gmap.zoom.wy-(gmap.zoom.zh>>1); // смещение по Y от края мира до края зума в метрах
		if( gmap.zoom.ox<0 ){ gmap.zoom.ox=0; }
		if( gmap.zoom.ox>(world.map.geo.width-gmap.zoom.zw) ){ gmap.zoom.ox=(world.map.geo.width-gmap.zoom.zw); }
		if( gmap.zoom.oy<0 ){ gmap.zoom.oy=0; }
		if( gmap.zoom.oy>(world.map.geo.height-gmap.zoom.zh) ){ gmap.zoom.oy=(world.map.geo.height-gmap.zoom.zh); }		
		msg += 'значение нового зума: zoom['+gmap.zoom.zoom+']\n';
		msg += 'новая область отображения (метры): zw['+gmap.zoom.zw+'] zh['+gmap.zoom.zh+']\n';
		msg += 'смещение новой области отображения (метры): ox['+gmap.zoom.ox+'] oy['+gmap.zoom.oy+']';
	}
	say(msg);
}

function point_generator_for_canvas(cx,cy){
	var mx = Math.floor(gmap.zoom.ox+gmap.zoom.zw*cx/gmap.canvas.cw);
	var my = Math.floor(gmap.zoom.oy+gmap.zoom.zh*cy/gmap.canvas.ch);
	return world.calculators.all(mx,my,0,0);
}


function calcCoord(sx,sy,dsx,dsy,dwx,dwy){
	var coord = {};
	coord.sx = sx+dsx;
	coord.sy = sy+dsy;
	coord.wx=dwx+(((coord.sx>>1)-coord.sy)>>6);
	coord.wy=dwy+(((coord.sx>>1)+coord.sy)>>6);	
	return coord;
}
function showTest(){
	var canvas = document.getElementById('map_canvas');
	gmap.canvas.cw = canvas.width;
	gmap.canvas.ch = canvas.height;
	var ctx = canvas.getContext('2d');
	var img = ctx.createImageData(gmap.canvas.cw, gmap.canvas.ch);
	for(var y=0; y<gmap.canvas.ch; y++){
	for(var x=0; x<gmap.canvas.cw; x++){
		var coord = calcCoord(x,y,0,0,0,0);
		var cr = (coord.wx%2)<<5;
		var cg = (coord.wy%2)<<5;
			drawPixel(img, x, y, cr, cg, 0, 255);
	}}
	for(var y=0; y<gmap.canvas.ch; y+=32){
	for(var x=0; x<gmap.canvas.cw; x+=128){
		var coord = calcCoord(x,y,0,0,0,0);
		say('x:['+coord.wx+'] y:['+coord.wy+']');
			drawPixel(img, x, y, 255, 255, 0, 255);
	}}
	ctx.putImageData(img, 0, 0);
}


function showMap(cx,cy,zoomed){
	var canvas = document.getElementById('map_canvas');
	gmap.canvas.cw = canvas.width;
	gmap.canvas.ch = canvas.height;
	zoomCalc(cx,cy,zoomed);

	var ctx = canvas.getContext('2d');
	var img = ctx.createImageData(gmap.canvas.cw, gmap.canvas.ch);
   worldInit();
	for(var y=0; y<gmap.canvas.ch; y++){
	for(var x=0; x<gmap.canvas.cw; x++){
			var p = point_generator_for_canvas(x,y);
			mapDrawPixel(img,x,y,p);
	}}
	ctx.putImageData(img, 0, 0);
	say(map_str);
}

//---------------------------------------------------------------
function mapDrawPixel(img,x,y,p){
	if( world.map.layers.map.on!=1 ){ drawPixel(img, x, y, 0, 0, 0, 255); }
	if( world.map.layers.map.on==1 ){ draw_map_layer(img,x,y,p); }
	if( world.map.layers.sun.on==1 ){ draw_sun_layer(img,x,y,p); }
//	if( world.map.layers.addsh.on==1 ){	draw_addsh_layer(img,x,y,p); }
//	if( world.map.layers.temp.on==1 ){ draw_temp_layer(img,x,y,p); }
//	if( world.map.layers.press.on==1 ){ draw_press_layer(img,x,y,p); }
//	if( world.map.layers.ice.on==1 ){ draw_ice_layer(img,x,y,p); }
//	if( world.map.layers.seasons.on==1 ){ draw_seasons_layer(img,x,y,p); }
}
//---------------------------------------------------------------
function draw_map_layer(img,x,y,p){
	// отображаем слой географической карты
	var wl = world.map.levels.water>>8;
	var c=p.h>>8;
	if( p.h < world.map.levels.water ){
		drawPixel(img, x, y, 0, (wl+c)>>1, (wl>>1)+c<<1, 255);
	}else if( p.h < world.map.levels.sand ){
		drawPixel(img, x, y, 192, 192, 96, 255);
	}else if( p.h < world.map.levels.stoun ){
		var r = Math.pow(c-(wl>>1),2)>>8;
		if( r>255 ){ r=255; }
		drawPixel(img, x, y, r, c>>1, r>>1, 255);
	}else if( p.h < world.map.levels.ice ){
		drawPixel(img, x, y, c, c, c, 255);
	}else{
		var cc = 128+(c>>1);
		if( cc>255){ cc=255; }
		drawPixel(img, x, y, cc, cc, cc, 255);
	}
}

function draw_addsh_layer(img,x,y,p){
	// отображаем слой карты оледенения
	if( p.m>0 ){
		addPixel(img, x, y, 255, 0, 0, world.map.layers.addsh.alpha);
	}
}

function draw_temp_layer(img,x,y,p){
	// отображаем слой температурной карты
	var r = 0;
	var g = 0;
	var b = 0;
	if( p.t == 0 ){
		g = 255;
	}else if( p.t > 0 ){
		r = Math.floor(p.t*255/60)
		g = (255-r*2);
	}else if( p.t < 0 ){
		b = Math.floor(-p.t*255/70)
		g = (255-b*2);
	}
	if( g<0 ){ g=0; }
	addPixel(img, x, y, r, g, b, world.map.layers.temp.alpha);
}

function draw_press_layer(img,x,y,p){
	// отображаем слой температурной карты
	var r = 0;
	var g = 0;
	var b = 0;
	var pp = p.p-300;
	r = Math.floor(pp*255/516);
	if( pp>516 ){
		r = 0;
		g = 255;		 
	}
	if( pp<0 ){
		r = 0;
		b = 255;		 
	}
	addPixel(img, x, y, r, g, b, world.map.layers.press.alpha);
}

function draw_sun_layer(img,x,y,p){
	// отображаем слой карты освещенности
	var c = Math.floor(p.illuminance_bool*255);
	var a = Math.floor(world.map.layers.sun.alpha*c/256);
	var r = c;
	var g = c;
	var b = 0;
	addPixel(img, x, y, r, g, b, a);
}
	


function draw_ice_layer(img,x,y,p){
	// отображаем слой карты оледенения
	var r = 0;
	var g = 0;
	var b = 0;
	if( p.t < 0 ){
		r=255;
		g=255;
		b=255;
	}
	addPixel(img, x, y, r, g, b, world.map.layers.ice.alpha);
}

function draw_seasons_layer(img,x,y,p){
	// отображаем слой карты оледенения
	var r = 0;
	var g = 0;
	var b = 0;
	if( p.t < 3 ){
		r=255;
		g=255;
		b=255;
	}else if( p.t < 35 ){
		r=64;
		g=200;
		b=0;
		var wy = y*world.geo.height/250;
		if( (p.day<183 && wy<p.sun) || (p.day>182 && wy>=p.sun) ){
			r=0; g=255;	b=128;			
		}else if( (p.day>182 && wy<p.sun) || (p.day<183 && wy>=p.sun) ){
			r=255; g=200; b=0;	
		}

	}else{
		r=64;
		g=200;
		b=0;
	}
	addPixel(img, x, y, r, g, b, world.map.layers.seasons.alpha);
}

//---------------------------------------------------------------
function drawPixel(img,x,y,r,g,b,a){
	var o = (y*img.width+x)*4;
    img.data[o+0]=r; // красный
    img.data[o+1]=g; // зеленый
    img.data[o+2]=b; // синий
    img.data[o+3]=a; // прозрачность
}

function addPixel(img,x,y,r,g,b,a){
	var o = (y*img.width+x)*4;
    img.data[o+0]=(r*a + img.data[o+0]*(255-a))>>8; // красный
    img.data[o+1]=(g*a + img.data[o+1]*(255-a))>>8; // зеленый
    img.data[o+2]=(b*a + img.data[o+2]*(255-a))>>8; // синий
    //img.data[o+3]=a; // прозрачность
}

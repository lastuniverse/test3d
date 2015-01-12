// сворачивающиеся блоки
function swch(block_id) {
  if (document.getElementById('block'+block_id).style.display=='block') {
    document.getElementById('block'+block_id).style.display = 'none';
    document.getElementById('block'+block_id+'_swch').innerHTML = '[+]';
  } else {
    document.getElementById('block'+block_id).style.display = 'block';
    document.getElementById('block'+block_id+'_swch').innerHTML = '[x]';
  }
  return false;
}

// установить прозрачность слоя над картой
function opacity(){
	var i = document.getElementById("opacity").value;
 	//var o = document.getElementById("game_shadow").style.opacity = i/100;
}

// при нажатии на карту 
function zoom(e){
	if(!e) e = event;
	e.returnValue=false;
	e.cancelBubble=true;

	var o = document.getElementById('map_container');
	var x = e.clientX-(parseInt(o.style.left)+4);
	var y = e.clientY-(parseInt(o.style.top)+4);
	if( e.button == 0 ){
		showMap(x,y,2);
	}else{
		zoomCalc(x,y,1);
	}
	gscreen.ox=gmap.zoom.wx;
	gscreen.oy=gmap.zoom.wy;
	//showScreen(gscreen.ox,gscreen.oy);
	say('wx:['+gscreen.ox+'] wy:['+gscreen.oy+']');
	screenShow(gscreen.ox,gscreen.oy);
	return false;
}
	

function show_screen(e){
	if(!e) e = event;
	if( e.button == 0 ){
		var container = document.getElementById('game_container');
		var x = e.clientX-(parseInt(container.style.left)+4);
		var y = e.clientY-(parseInt(container.style.top)+4);
		var center = calcOrtoCoord(gscreen.obj.screen.width>>1,gscreen.obj.screen.height>>1,gscreen.ox,gscreen.oy);
		var offset = calcOrtoCoord(x,y,gscreen.ox,gscreen.oy);
		var dx = offset.swx-center.swx;
		var dy = offset.swy-center.swy;
		gscreen.ox+=dx;
		gscreen.oy+=dy;
		say('wx:['+gscreen.ox+'] wy:['+gscreen.oy+']\ndx:['+dx+'] dy:['+dy+']\ncx:['+center.swx+'] cy:['+center.swy+']\nox:['+offset.swx+'] oy:['+offset.swy+']');
		//showScreen(gscreen.ox,gscreen.oy);
		screenShow(gscreen.ox,gscreen.oy);
	}
}
	

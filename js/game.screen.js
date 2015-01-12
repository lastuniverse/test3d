// некая структура данных в которой содержатся временные(рабочие)
// переменные и сохраняются результаты нижеприведенных функций
var gscreen = {
    ox: 134023, // координаты отображаемые в игровом окне при обновлении страницы
    oy: 116049,
    cellsize: { // описание размеров ячейки 
        w: 128, // шаг игрового окна по горизонтали
        h: 32, // шаг игрового окна по вертикали
        half: {
            w: 64,
            h: 16
        }
    },
    id: { // id элементов в которые происходит отображение
        screen: 'game_container',
        canvas: 'game_canvas',
        shadow: 'game_shadow'
    },
    obj: { // сюда запоминаются указатели на элементы с ID указанными выше
        screen: {},
        canvas: {},
        ctx: {},
        shadow: {}
    },
    screen: { // вычисленные размеры игровой области
        w: 0,
        h: 0,
        half: {
            w: 0,
            h: 0
        },
        cells: [] // тут хранятся указатели на div-ы с тайлами
    }
};

function screenInit() {
    // Предварительная инициализация переменных и формирование необходимых для работы текущей реализации данных
    loadImage(tiles.base.gray.list[0]);
    gscreen.obj.screen = document.getElementById(gscreen.id.screen);
    gscreen.obj.canvas = document.getElementById(gscreen.id.canvas);
    gscreen.obj.ctx = gscreen.obj.canvas.getContext('2d');
    gscreen.obj.shadow = document.getElementById(gscreen.id.shadow);
    screenCalc();
    screenCreate();
}


function screenCalc() {
    // рассчитываются параметры экрана и буфера
    gscreen.screen.pw = parseInt(gscreen.obj.screen.width);
    gscreen.screen.ph = parseInt(gscreen.obj.screen.height)
    gscreen.screen.w = Math.floor(parseInt(gscreen.obj.screen.width) / gscreen.cellsize.w) + 1;
    gscreen.screen.h = Math.floor(parseInt(gscreen.obj.screen.height) / gscreen.cellsize.h) + 5;
    gscreen.screen.half.w = gscreen.screen.w >> 1;
    gscreen.screen.half.h = gscreen.screen.h >> 1;
    gscreen.screen.half.pw = gscreen.screen.pw >> 1;
    gscreen.screen.half.ph = gscreen.screen.ph >> 1;

    //say('расчитанны параметры игровой области\nширина буфера: ['+gscreen.obj.screen.width+'] высота буфера: ['+gscreen.obj.screen.height+']');
    //say('расчитанны параметры игровой области\nширина буфера: ['+gscreen.buffer.w+'] высота буфера: ['+gscreen.buffer.h+']');
}

function screenCreate() {
    // создается необходимое количество div-ов используемых для отображения тайлов
    for (var y = 0; y < gscreen.screen.h; y++) {
        gscreen.screen.cells[y] = [];
        for (var x = 0; x < gscreen.screen.w; x++) {
            gscreen.screen.cells[y][x] = cellCreate();
        }
    }
}

function loadImage(tile) {
    var mirror = 0;
    if (!tile.loaded) {
        tile.img = new Image(); // Новый объект
        tile.img.onload = function() { // Событие которое будет исполнено в момент когда изображение будет полностью загружено
            tile.loaded = 2;
        }
        tile.loaded = 1;
        tile.img.src = mirrors[mirror] + tile.url;
    }
}

function drawImage(x, y, tile) {
    //if( h < 64 ){ h=tile.height; }
    if (tile.loaded == 2) {
        var w = tile.img.width;
        var h = tile.img.height; //-64;
        //if( h<64 ){ h=tile.img.height; }
        //gscreen.obj.ctx.drawImage(tile.img, x, y);
        //gscreen.obj.ctx.drawImage(tile.img, x, y, w, h);
        //say('w:['+tile.width+'] h:'+h+' x:['+x+'] y:['+y+']');
        gscreen.obj.ctx.drawImage(tile.img, 0, 0, w, h, x, y, w, h);
    } else if (tile.loaded == 1) {
        //var img = tiles.base.gray.list[0].img;
        //gscreen.obj.ctx.drawImage(img, x, y);
    } else {
        loadImage(tile);
        //var img = tiles.base.gray.list[0].img;
        //gscreen.obj.ctx.drawImage(img, x, y);
    }
}

function cellCreate() {
    // создается div элемент и добавляется в элемент с ID указанным в gscreen.id.screen
    var newdiv = document.createElement('div');
    newdiv.style.width = '0px';
    newdiv.style.height = '0px';
    newdiv.style.position = 'absolute';
    gscreen.obj.screen.appendChild(newdiv);
    return newdiv;
}


function calcOrtoCoord(sx, sy, wx, wy) {
    // пересчет системы координат используемой в карте в систему координат используемую в игровом окне 
    var coord = {};
    coord.swx = (((sx >> 1) - sy) >> 6);
    coord.swy = (((sx >> 1) + sy) >> 6);
    coord.wx = wx + coord.swx;
    coord.wy = wy + coord.swy;
    return coord;
}

function screenShow(wx, wy) {
		wx -= 200;
    wy -= 200;
    // отобразить игровой экран так чтобы координаты мира wx и wy оказались в центре игрового экрана
    for (var sy = 0; sy < (gscreen.screen.ph + 128); sy += 32) {
        var csy = sy - gscreen.screen.half.ph;
        var csdx = (((sy >> 5) % 2) << 6);
        //csdx=(sy&1)<<6;
        for (var sx = 0; sx < gscreen.screen.pw; sx += 128) {
            var csx = sx - gscreen.screen.half.pw;
            var coord = calcOrtoCoord(csx + csdx, csy, wx, wy);
            var pb = world.calculators.all(coord.wx, coord.wy, 0, 0);
            cellShow(sx >> 7, sy >> 5, pb, sx + csdx, sy, coord);
        }
    }
    wx += 200;
    wy += 200;
    for (var sy = 0; sy < (gscreen.screen.ph + 128); sy += 32) {
        var csy = sy - gscreen.screen.half.ph;
        var csdx = (((sy >> 5) % 2) << 6);
        //csdx=(sy&1)<<6;
        for (var sx = 0; sx < gscreen.screen.pw; sx += 128) {
            var csx = sx - gscreen.screen.half.pw;
            var coord = calcOrtoCoord(csx + csdx, csy, wx, wy);

            var pb = world.calculators.all(coord.wx, coord.wy);
            cellShow(sx >> 7, sy >> 5, pb, sx + csdx, sy, coord);
        }
    }
}

function cellShow(sx, sy, p, csx, csy, coord) {
    // подготовка и отображение тайла на игровой экран
    // требуется переделка
    var mix;
    var mix_water;
    var level = gscreen.cellsize.half.h-64;
    var rl = world.calculators.getPseudoRandom(coord.wx, coord.wy, 2, 64);
    var ttype = 'snow';
    if (p.t < 0) {
        rl = rl >> 2;
    } else {
        rl = rl - (rl >> 2);
        ttype = 'sun';
    }
    if (p.h < world.map.levels.water) {
        mix = tiles_mix.water[ttype];
        mix_under_water = tiles_mix.bich[ttype];;

    } else if (p.h < world.map.levels.sand - 2) {
        mix = tiles_mix.bich[ttype];
        level -= (rl >> 1) + 10;
    } else if (p.h < world.map.levels.sand + 4) {
        mix = tiles_mix.duna[ttype];
        level -= (rl >> 1) + 20;
    } else if (p.h < world.map.levels.sand + 16) {
        mix = tiles_mix.field[ttype];
        level -= rl;
    } else if (p.h < world.map.levels.stoun) {
        mix = tiles_mix.steppe[ttype];
        level -= rl;
    } else if (p.h < world.map.levels.ice) {
        mix = tiles_mix.stoun[ttype];
        level -= rl;
    } else {
        mix = tiles_mix.stoun.snow;
        level -= rl;
    }

    if (p.h < world.map.levels.water) {
        var num = randomTile(mix_under_water, coord);
        var tile = mix_under_water[num].tiles;
        var rand = world.calculators.getPseudoRandom(coord.wx, coord.wy, 0, tile.numbers);
        var cur = tile.list[rand];
        var mirror = 0;
        var dy = cur.center.y - 128;
        var x = csx - cur.center.x
        var under_level = level + rl + 5;
        var y = csy - (gscreen.cellsize.h << 1) - gscreen.cellsize.h + under_level - dy;
        drawImage(x, y, cur);
    }

    var num = randomTile(mix, coord);
    var tile = mix[num].tiles;
    var rand = world.calculators.getPseudoRandom(coord.wx, coord.wy, 0, tile.numbers);
    var cur = tile.list[rand];
    var mirror = 0;
    var dy = cur.center.y - 128;
    var x = csx - cur.center.x
    var y = csy - (gscreen.cellsize.h << 1) - gscreen.cellsize.h + level - dy;
    drawImage(x, y, cur);
}

// -------------------------------------------

function gameDraw() {
    // вызывается при обновлении страницы
    screenInit();
    screenShow(gscreen.ox, gscreen.oy);
}


function randomTile(mix, coord) {
    // псевторандомный выбор типа тайлов внутри микса 
    //var rand = Math.floor(Math.random() * 100);
    var rand = world.calculators.getPseudoRandom(coord.wx, coord.wy, 1, 100);
    var min = 0;
    var max = 0;
    var ret = 0;
    for (var i = 0; i < mix.length; i++) {
        max = min + mix[i].procent;
        if (rand >= min && rand < max) {
            ret = i;
            break;
        }
        min = max;
    }
    return ret;
}

function randomInt(n) {
    // упрощение вызова Math.random()
    var rand = Math.floor(Math.random() * n);
    return rand;
}

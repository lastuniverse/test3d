/*****************************************************************************************************/
/* описание подкласса loader класса _WORLD. Отвечает за загрузку и/или данных о мира                 */
/*****************************************************************************************************/

WORLD.loader = function(scope) {
    this.scope = scope; // внутренности объектов созданных от класса WORLD будут доступны через scope
};

// загружает мир (JSON файл по URL)
WORLD.loader.prototype.openWORLD = function(url, callback) {
    var scope = this;
    
    var request = new AJAX(url,
	  function(str) {
        scope.scope.map = JSON.parse(str);
        scope.scope.url = url;
        scope.recalcWORLD();
        callback();
        say("[openWORLD] Завершена загрузка по адресу [" + url + "]");
    });
    request.onLoadStart = function(url) {
        say("[openWORLD] Запускаю загрузку по адресу [" + url + "]");
    };
    request.onLoadError = function(errmsg) {
        say("[openWORLD] Ошибка загрузки по адресу [" + url + "] [" + errmsg + "]");
    };
    request.onLoadProgress = function(staus) {
        say(staus.procentage);
    };
};


// устанавливает значение параметров генерации и отображения (создает новый мир либо заменяет старый)
WORLD.loader.prototype.recalcWORLD = function() {
    var map = this.scope.map;
    map.geo.base = 1 << map.geo.degree;
    map.geo.width = map.geo.base << 1;
    map.geo.height = map.geo.base;
    if (map.geo.loops >= map.geo.degree) map.geo.loops = map.geo.degree - 1;
    if (map.mounts.loopend >= map.geo.loops) map.mounts.loopend = map.geo.loops - 1;
    if (map.mounts.loopstart > map.mounts.loopend) map.mounts.loopstart = map.mounts.loopend - 1;
    if (map.mounts.loopstart < 0) map.mounts.loopstart = map.geo.degree - 2;
    if (map.mounts.loopend < map.mounts.loopstart) map.mounts.loopend = map.mounts.loopstart + 1;
}


// устанавливает значение параметров генерации и отображения (создает новый мир либо заменяет старый)
WORLD.loader.prototype.resetWORLD = function(params) {
    // params.geo			Объект содержащий данные для генерации базовой карты высот
    // params.geo.degree		указывает размер генерируемой карты [17]
    // 		width=2^(degree+1)
    //		height=base=2^degree
    // params.geo.loops			Количество вложенных циклов разбиения на сектора. (1-7) [6]
    // params.geo.numbers		Количество элементов в секторе.(1-20) [5]
    // params.geo.edivider	Уменьшитель размера элемента. (size=base/(2^divider)) [1]
    // ??? params.geo.hdivider				уменшитель высоты [1]

    // params.mounts			Объект содержащий надстройки над рельефом
    // params.mounts.loopstart			с какой итерации цикла loops создавать надстройки [4]		
    // params.mounts.loopend				по какую итерацию цикла loops создавать надстройки [5]	
    // params.mounts.numbers				количество надстроек в секторе [1]
    // ??? params.mounts.multiplier			увеличитель высоты надстроек (увеличено будет на 2^multiplier) [3]

    // params.levels		Объект содержащий параметры интерпретации данных о высоте
    // params.levels.water			Уровень воды. (0-65535)	[11200]
    // params.levels.sand				Уровень песка у воды. (0-65535)	[11220]
    // params.levels.stoun			Уровень выше которого растительности нет. (0-65535)	[28500]
    // params.levels.ice				Уровень оледенения гор. (0-65535)	[35500]

    // params.layers		Объект содержащий параметры отображения слоев
    // params.layers.map				параметры слоя географической карты
    // params.layers.temp				параметры слоя географической карты
    // params.layers.ice				параметры слоя географической карты
    // params.layers.seasons		параметры слоя географической карты
    // params.layers.press			параметры слоя географической карты
    // 		все слои имеют следующие параметры:
    // 		on			если не 0 - слой отобрадается
    // 		alpha		прозрачность (0-255)

    // params.temper		Объект содержащий параметры для расчета температур
    // params.temper.divider
    // params.temper.deviation	отклонение земной оси []
    // params.temper.tempmin		минимальная возможная температура []
    // params.temper.tempmax		максиимальная возможная температура []
    // params.temper.thdivider	
    // params.temper.tddivider

    // params.date		Объект содержащий параметры даты
    // params.date.day					текущий день в году
    // params.date.time					текущий текущее время суток*/
    this.scope.map = {
        "geo": {
            "degree": 17,
            "base": 131072,
            "width": 262144,
            "height": 131072,
            "loops": 6,
            "numbers": 5,
            "edivider": 1,
            "hdivider": 1
        },
        "mounts": {
            "loopstart": 4,
            "loopend": 5,
            "numbers": 1,
            "multiplier": 3
        },
        "layers": {
            "map": {
                "on": 1,
                "alpha": 255,
                "info": "отображать географическую карту."
            },
            "addsh": {
                "on": 0,
                "alpha": 64,
                "info": "отображать места наложения высот."
            },
            "sun": {
                "on": 1,
                "alpha": 160,
                "info": "отображать карту освещенности."
            },
            "mtemp": {
                "on": 0,
                "alpha": 160,
                "info": "отображать карту среднесуточных температур."
            },
            "temp": {
                "on": 0,
                "alpha": 160,
                "info": "отображать карту температур."
            },
            "ice": {
                "on": 0,
                "alpha": 64,
                "info": "отображать карту оледенения."
            },
            "seasons": {
                "on": 0,
                "alpha": 64,
                "info": "отображать карту сезонов."
            },
            "press": {
                "on": 0,
                "alpha": 64,
                "info": "отображать карту давлений."
            }
        },
        "levels": {
            "water": 11200,
            "sand": 11220,
            "stoun": 28500,
            "ice": 35500
        },
        "temper": {
            "divider": 7,
            "deviation": 23.5,
            "tempmin": -70,
            "tempmax": 60,
            "thdivider": 13,
            "tddivider": 13
        },
        "date": {
            "day": 0,
            "time": 0
        },
        "data": {
            "height": [],
            "mounts": [],
            "randoms": []
        }
    };
    copyObject(params, this.scope.map);
};

// преобразует мир (JSON объект) в строку и выводит ее в элемент с указанным id
WORLD.loader.prototype.showWorldTables = function(id) {
    var map = this.scope.map;
    var console = document.getElementById(id);
    console.innerHTML = JSON.stringify(map);
};

// добавляет/заменяет данные из srcobj в dstobj

function copyObject(srcobj, dstobj) {
    if (typeof(srcobj) != "object") {
        dstobj = srcobj;
    } else {
        if (typeof(srcobj) != typeof(dstobj)) dstobj = srcobj.constructor();
    }
    for (objectItem in srcobj) {
        if (!dstobj[objectItem]) dstobj[objectItem] = 0;
        copyObject(srcobj[objectItem], dstobj[objectItem]);
    }
}

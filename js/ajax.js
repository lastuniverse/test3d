// Идея реализации взята тут https://github.com/mrdoob/three.js/blob/master/src/loaders/Loader.js
// загрузка данных из интернета.
// Сделал объектом с расчетом на будущее расширение функционала
// Переделал объект сразу возникла куча потенциальных проблем с callback-ами, даже незнаю что лучше - вернуть все назад или продолжить так ...
// На данный момент НЕ РЕКОМЕНДУЕТСЯ использование отдельно взятого созданного объекта более 1 раза по причине отсутствия в объекте 
// функционала отслеживающего окончание обработки предыдущего запроса. Возможно можно както вывернуться замкнув url, xmlhttp и callback-и но пока правильных мыслей нет :) 


AJAX = function(url,callback) {
    this.url = url;
    this.request = this.getXmlHttp();
    this.onLoadStart = function() {};
    this.onLoadError = function() {};
    this.onLoadProgress = function() {};
    this.onLoadComplete = function() {};
    if (url) {
        this.getUrlData(url,callback);
    }
};


AJAX.prototype.getXmlHttp = function() {
    var request;
    try {
        request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            request = false;
        }
    }
    if (!this.xmlhttp && typeof XMLHttpRequest != 'undefined') {
        request = new XMLHttpRequest();
    }
    return request;
};

AJAX.prototype.getUrlData = function(url,callback) {
    // асинхронная загрузка данных
    var ajax = this;
    ajax.url = url;
    ajax.request.open('GET', url, true);
    ajax.onLoadStart(url);
    ajax.request.onreadystatechange = function() {
        var request = ajax.request;
        if (request.readyState === request.DONE) {
            if (request.status === 200 || request.status === 0) {
                if (request.responseText) {
                    ajax.onLoadComplete(request.responseText);
                    callback(request.responseText);
                } else {
                    ajax.onLoadError("[" + url + "] seems to be unreachable or file there is empty");
                }
            } else {
                ajax.onLoadError("Couldn't load [" + url + "] [" + request.status + "]. Error [" + request.statusText + "]");
            }
        } else if (request.readyState === request.LOADING) {
            if (length === 0) {
                length = request.getResponseHeader("Content-Length");
            }
            var pocentage = request.responseText.length * 100 / length;
            ajax.onLoadProgress({
                total: length,
                loaded: request.responseText.length,
                pocentage: pocentage
            });

        } else if (request.readyState === request.HEADERS_RECEIVED) {
            length = request.getResponseHeader("Content-Length");
        }
    }
    ajax.request.send(null);
};

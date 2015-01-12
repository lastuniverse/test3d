//test

function getClientWidth() {
    return document.compatMode == 'CSS1Compat' && !window.opera ? document.documentElement.clientWidth : document.body.clientWidth;
}

function getClientHeight() {
    return document.compatMode == 'CSS1Compat' && !window.opera ? document.documentElement.clientHeight : document.body.clientHeight;
}

function getIntValueById(id, minvalue, maxvalue) {
    var a = document.getElementById(id);
    var b = parseInt(a.value);
    if (b < minvalue) {
        b = minvalue;
        a.value = b;
    }
    if (b > maxvalue) {
        b = maxvalue;
        a.value = b;
    }
    return b;
}

function getCheckedById(id) {
    var a = document.getElementById(id);
    var r = 0;
    if (a.checked) {
        r = 1;
    }
    return r;
}

function setCheckedById(id, value) {
    var a = document.getElementById(id);
    if (value) {
        a.checked = 'on';
    } else {
        a.checked = '';
    }
}

function setValueById(id, value) {
    var a = document.getElementById(id);
    a.value = value;
}

function say(str) {
    var console = document.getElementById('edit_textarea');
    console.innerHTML = str + "\n--------------------------------\n" + console.innerHTML;
}
function echo(str) {
    map_str += "\n" + str;
}

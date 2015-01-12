/*****************************************************************************************************/
/* описание класса _WORLD. Класс и его подклассы отвечает за загрузку и/или генерацию данных о мира, */
/* расчеты по этим данным, а также за отображение этих данных в окне карты и игровом окне            */
/*****************************************************************************************************/

WORLD = function(url,callback) {
    this.url = url;
    this.map = {};
    // объекты подклассов
    //this.subclass	=	new WORLD.subclass(this);
    this.loader = new WORLD.loader(this);
    this.generators = new WORLD.generators(this);
    this.calculators = new WORLD.calculators(this);

    if( url && callback ){
    	this.loader.openWORLD(url,callback);
    }

};


WORLD.prototype.method = function() {
    say("WORLD.prototype.method() url: [" + this.subclass.url + "]");
    //this.subclass.method.call(this);
    //this.subclass.url = this.url;
};

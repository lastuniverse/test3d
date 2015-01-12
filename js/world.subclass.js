WORLD.subclass = function(scope){
	this.scope = scope;
};


// пример объявления функции в прототипе
WORLD.subclass.prototype.method = function(){
		say("WORLD.subclass.prototype.method() url: ["+this.scope.url+"]");
};



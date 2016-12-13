'use strict';

var Utils = function () {

    this.executeInternally  = function(route,request,callback){
        request.server.inject(route,callback);
    };

    this.parseDataValues = function(array){
        var length = array.length;
        var obj = [];
        for(var i = 0; i < length; i++ ){
            obj.push(array[i].dataValues);
        }
        return obj;
    };

};

module.exports = new Utils();
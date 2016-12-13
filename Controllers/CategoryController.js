var models = require('../Models');
var resp = require('../lib/response');


var CategoryComtroller = function () {


    this.all = function(request,response){
        models.Category.all()
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },
    this.byId = function(request,response) {
        models.Category.byId(request.params.id)
              .then(resp.jsonReply(response))
              .catch(resp.jsonErrorReply(response))
              .done();
    },
    this.add = function(request,response){
        models.Category.add(request.payload.name)
              .then(resp.jsonReply(response))
              .catch(resp.jsonErrorReply(response))
              .done();
    },
    this.remove = function(request,response) {
        models.Category.remove(request.payload.id)
              .then(resp.jsonReply(response))
              .catch(resp.jsonErrorReply(response))
              .done();
    },
    this.update = function(request,response){
        models.Category.updateCategory(request.payload.name,request.payload.id)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
    },
    this.allCategories = function(request,response){
        models.Category.allCategories()
                .then(function(result){
                    var dict = {}
                    for(var i = 0;i < result.length;i++){
                        if(!dict.hasOwnProperty(result[i].cat_name)){
                            dict[result[i].cat_name] = {};
                            dict[result[i].cat_name].name =result[i].cat_name;
                            dict[result[i].cat_name].id = result[i].cat_id;
                            dict[result[i].cat_name].sub = [];
                            if(result[i].id){
                                dict[result[i].cat_name].sub.push({ "id": result[i].id, "name" : result[i].name });
                            }
                        }else{
                            dict[result[i].cat_name].id = result[i].cat_id;
                            dict[result[i].cat_name].sub.push({ "id": result[i].id, "name" : result[i].name });
                        }
                    }
                    var ret = [];
                    for(var key in dict){
                        ret.push(dict[key]);
                    }
                    response(ret);
                })
                .catch(resp.jsonErrorReply(response))
                .done();
    }
}

module.exports = new CategoryComtroller();
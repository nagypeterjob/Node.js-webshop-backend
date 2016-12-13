var models = require('../Models');
var resp = require('../lib/response');


var SubcategoryComtroller = function () {

    this.add = function (request, response) {
        models.SubCategory.add(request.payload.name, request.payload.cat_id)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },
    this.remove = function (request, response) {
        models.SubCategory.remove(request.payload.id)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
    },
    this.list = function (request, response) {
        models.SubCategory.list(request.params.cat_id)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
    },   

    this.get = function (request, response) {
        models.SubCategory.get(request.params.id)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
    },

    this.updateSub = function(request,response){
        models.SubCategory.updateSub(request.payload.id,request.payload.name,request.payload.cat_id)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },
    this.unused = function(request,response){
        models.SubCategory.unused()
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    }

};

module.exports = new SubcategoryComtroller();
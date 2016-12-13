var models = require('../Models');
var resp = require('../lib/response');

var MaterialController = function () {
    
    this.add = function (request,response) {
       models.Material.add(request.payload.name,request.payload.image_path)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },
    this.remove = function (request,response) {
        models.Material.remove(request.payload.id)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },
    this.update = function  (request,response) {
        models.Material.updateMaterial(request.payload.name,request.payload.image_path,request.payload.id)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },
    this.all = function  (request,response) {
        models.Material.list()
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },
    this.insert = function (request,response) {
         models.Material.insert(request.payload.ProductId,request.payload.MaterialId)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },

    this.get = function(request,response){
        models.Material.get(request.params.ProductId)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    }

    this.removeForProduct = function(request,response){
        models.Material.removeForProduct(request.payload.ProductId)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    }
};

module.exports = new MaterialController();
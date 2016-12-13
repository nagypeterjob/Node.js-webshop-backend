var models = require('../Models');
var resp = require('../lib/response');


var CollectionComtroller = function () {


    this.all = function(request,response){
        models.Collection.all()
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },
    this.byId = function(request,response) {
        models.Collection.byId(request.params.id)
              .then(resp.jsonReply(response))
              .catch(resp.jsonErrorReply(response))
              .done();
    },
    this.add = function(request,response){
        models.Collection.add(request.payload)
              .then(resp.jsonReply(response))
              .catch(resp.jsonErrorReply(response))
              .done();
    },
    this.remove = function(request,response) {
        models.Collection.remove(request.payload.id)
              .then(resp.jsonReply(response))
              .catch(resp.jsonErrorReply(response))
              .done();
    },
    this.update = function(request,response){
        models.Collection.updateCollection(request.payload)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
    }
    this.list = function(request,response){
        models.Collection.listProductsForCollection(request.params.id)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
    },
    this.prodcutsWithDiscount = function(request,response){
        models.Collection.prodcutsWithDiscount(request.params.id)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
    }

}

module.exports = new CollectionComtroller();
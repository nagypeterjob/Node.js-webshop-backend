var models = require('../Models');
var resp = require('../lib/response');

var ProductComtroller = function () {
    
    this.add = function (request,response) {
         models.Product.add(request)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },
    this.update = function (request,response) {
            models.Product.updateProduct(request)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
    },

    this.list = function (request,response) {
            models.Product.list(request.params.cat_id)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
    },

    this.material = function (request,response) {
        models.Product.material(request.params.id)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
    },

    this.one = function (request,response) {
       models.Product.one(request.params.id)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
    },
    this.remove = function (request,response) {
      models.Product.remove(request.payload.id)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
    },
    this.search = function(request,response){
        models.Product.search(request.params.text)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
    },
    this.allByGroup = function(request,response){
        models.Product.allByGroup()
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
    },
    

    this.newProducts = function(request,response){
        models.Product.newProducts()
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
    },

    this.nocollection = function(request,response){
        models.Product.nocollection()
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
    }
};


module.exports = new ProductComtroller();
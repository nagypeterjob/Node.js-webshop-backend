var models = require('../Models');
var resp = require('../lib/response');


var StockComtroller = function () {
    
    this.add = function (request,response) {
        models.Stock.add(request)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },
    this.update = function (request,response) {
          models.Stock.updateStock(request)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },
    this.remove = function (request,response) {
         models.Stock.remove(request.payload.id)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },
    this.list = function (request,response) {
         models.Stock.list(request.params.product_id)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    }
};

module.exports = new StockComtroller();
var models = require('../Models');
var resp = require('../lib/response');

var sequelize = models.Discount.options.sequelize;

var DiscountComtroller = function () {

    this.add = function (request,response) {
        models.Discount.add(request.payload.name,request.payload.percentage)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },

    this.addProduct = function (request,response) {
        models.Discount.addProduct(request.payload.ProductId,request.payload.DiscountId)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },

    this.read = function (request,response) {
       models.Discount.read(request.params.ProductId)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },

    this.remove = function (request,response) {
        models.Discount.remove(request.payload.ProductId,request.payload.DiscountId)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },

    this.removeOne = function (request,response) {
        models.Discount.removeOne(request.payload.ProductId)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },

    this.all = function (request,response) {
        models.Discount.all(request.params.DiscountId)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },

    this.list = function (request,response) {
        models.Discount.list()
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },
    this.one = function (request,response) {
        models.Discount.one(request.params.DiscountId)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    }

};

module.exports = new DiscountComtroller();
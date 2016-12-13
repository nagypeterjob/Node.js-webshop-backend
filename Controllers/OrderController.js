var models = require('../Models');
var resp = require('../lib/response');

var OrderController = function () {

    this.add = function (request, response) {
        models.Orders.add(request)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },

    this.close = function(request, response) {
        models.Orders.close(request.payload)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },
    this.remove = function(request, response) {
        models.Orders.remove(request.payload)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    }

};

module.exports = new OrderController();
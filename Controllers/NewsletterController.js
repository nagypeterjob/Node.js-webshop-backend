var models = require('../Models');
var resp = require('../lib/response');

var NewsletterController = function () {

    this.add = function (request, response) {
        models.Newsletter.add(request)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },

    this.remove = function (request, response) {
            models.Newsletter.remove(request.payload.id)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
    },
    this.all = function (request, response) {
            models.Newsletter.all()
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
    }

};

module.exports = new NewsletterController();
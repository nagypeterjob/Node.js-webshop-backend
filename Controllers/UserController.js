var models = require('../Models');
var resp = require('../lib/response');

var UserComtroller = function () {

    this.add = function (request, response) {
        models.User.add(request)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },
        this.update = function (request, response) {
            models.User.upadateUser(request)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
        },
        this.remove = function (request, response) {
            models.User.remove(request.payload.id)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
        },
        this.read = function (request, response) {
            models.User.read(request.params.id)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
        },
        this.all = function (request, response) {
            models.User.all()
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
        }


};

module.exports = new UserComtroller();
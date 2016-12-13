'use strict';

var Response = function () {
    var self = this;

    this.jsonReply = function (reply) {
        return function (responseContent) {
            return reply(JSON.stringify(self.success(responseContent)))
                .type('text/json')
                .code(200);
        };
    };

    this.jsonErrorReply = function (reply) {

        return function (msg) {
            var output = {
                error: true,
                errorCode: parseInt(msg.errorCode),
                errorMessage: msg.errorMessage,
                response: null
            };
            return reply(output)
                .type('text/json')
                .code(203);
        };
    };

    this.success = function (response) {
        return {
            response: response
        };
    };

    this.error = function (message) {
        return {
            error: true,
            errorCode: 500,
            errorMessage: message
        };
    };

    this.error404 = function (message) {
        var response = self.error(message);
        response.errorCode = 404;
        return response;
    };
};

module.exports = new Response();
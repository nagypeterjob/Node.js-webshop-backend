var Hapi = require('hapi');
var Path = require('path');
var Hoek = require('hoek');
var handlebars = require('handlebars');

var models = require('./models');
var resp = require('./lib/response');
var env = require('dotenv').load();
var jwt = require('jsonwebtoken');

var pp = require('./paypal');


var server = new Hapi.Server();
server.connection({ port: process.env.PORT, routes: { cors: { origin: ['*'], additionalHeaders: ['cache-control', 'x-requested-with', 'Pragma', 'Origin', 'Authorization', 'Content-Type', 'X-Requested-With'] } } });

global.server = server;

var validate = function (request, decoded, callback) {

    var error, credentials =  { id: decoded.id } || {};

    if (credentials) {
        return callback(error, true, credentials);
    }

    return callback(error, false, credentials);
};


server.register([require('hapi-auth-jwt'), require('hapi-auth-cookie'), require('vision'), require('inert')], (err) => {
    if (err) {
        throw err;
    }

    Hoek.assert(!err, err);

    server.auth.strategy('session', 'cookie', {
        password: "uVXw_@W_wK'F+U3\QWwT#zG^tayH))N-",
        cookie: 'session',
        ttl: 3 * 24 * 60 * 60 * 1000,
        isSecure: false,
        redirectTo: '/login'
    });

    server.auth.strategy('token', 'jwt', {
        key: process.env.SECRET,
        validateFunc: validate,
        verifyOptions: { algorithms: ['HS256'] }
    });

    server.views({
        engines: {
            html: handlebars
        },
        layout: true,
        relativeTo: __dirname,
        path: './templates',
        layoutPath: './templates/layout',
        helpersPath: './templates/helpers'
    });

    handlebars.registerHelper('list', function (items, options) {
        var out = "<ul>";

        for (var i = 0, l = items.length; i < l; i++) {
            out = out + "<li>" + options.fn(items[i]) + "</li>";
        }

        return out + "</ul>";
    });

    //PAYPAL INITIALIZATION
    pp.init();
});

server.route(require('./lib/routes'));
if (!module.parent) {
    models.sequelize.sync({ logging: false }).then(function () {
            server.start(function () {
            });
    });
}

module.exports = server;
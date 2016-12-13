var Lab = require('lab');
var lab = exports.lab = Lab.script();
var Hapi = require("hapi");
var code = require('code');

var server = require('../index');


lab.experiment('Users',() => {
    
    lab.test('List of all users json response', done => {
        
        var options = {
            method: 'GET',
            url: '/users/all'
        };
        server.inject(options, response => {
            var result = JSON.parse(response.result).response;
            code.expect(response.statusCode).to.equal(200);
            code.expect(result).to.be.instanceof(Array);
            code.expect(result).to.have.length(1);
            done();
        });
    });

    lab.test('Get specific user', done => {
        
        var options = {
            method: 'GET',
            url: '/users/1'
        };
        server.inject(options, response => {
            var result = JSON.parse(response.result).response;
            code.expect(response.statusCode).to.equal(200);
            code.expect(result).to.be.instanceof(Object);
            done();
        });
    });

    lab.test('Update user', done => {
        
        var options = {
            method: 'PUT',
            url: '/users/update',
            payload: {
                id: 1,
                grant: 2
            }
        };
        server.inject(options, response => {
            var result = JSON.parse(response.result).response;

            code.expect(response.statusCode).to.equal(200);
            code.expect(result[0]).to.equal(1);
            done();
        });
    });

});


var models = require('../Models');
var resp = require('../lib/response');
var fs = require('fs');
var Hapi = require('hapi');

var ImageComtroller = function () {


    this.add = function (request, response) {
        models.Image.add(request)
            .then(resp.jsonReply(response))
            .catch(resp.jsonErrorReply(response))
            .done();
    },
        this.remove = function (request, response) {
            models.Image.remove(request.payload.id)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
        },

        this.feature = function (request, response) {
            models.Image.feature(request.payload.feature, request.payload.id)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
        },
        this.unfeature = function (request, response) {
            models.Image.unfeature(request.payload.ProductId)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
        },
        this.list = function (request, response) {
            models.Image.list(request.params.product_id)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
        },

        this.get = function (request, response) {
            response.file('/Applications/XAMPP/xamppfiles/htdocs/hapijs backend/assets/images/' + request.params.name, { confine: '/Applications/XAMPP/xamppfiles/htdocs/hapijs backend/assets/images/' });
        },

        this.featured = function (request, response) {
            models.Image.featured(request.params.product_id)
                .then(resp.jsonReply(response))
                .catch(resp.jsonErrorReply(response))
                .done();
        },

        this.upload = function (request, response) {
            var data = request.payload;
            var images = [];
            for (var i = 0; i < Object.keys(data).length; i++) {
                if (data.hasOwnProperty('img' + i)) {
                    var key = 'img' + i;
                    var extension = data[key].hapi.filename.split('.')[1].toLowerCase();
                    if ((extension == 'png') || (extension == 'jpg')) {
                        var name = new Date().getTime().toString();
                        var path = __dirname + '/../assets/images/' + name + '.' + extension;
                        var file = fs.createWriteStream(path);

                        file.on('error', function (err) {
                            console.log(err);
                        });

                        data[key].pipe(file);
                        data[key].on('end', function (err) {
                            console.log(err);
                        });
                        images.push(name + '.' + extension);
                    } else {
                        response({ response: { message: 'Wrong file format!' } });
                    }
                }
            }
            response({ response: { message: 'Image(s) successfully uploaded!', images: images } });
        },

        this.unlink = function (request, response) {
            var filename = request.payload.name;
            var path = __dirname + '/../assets/images/' + filename;
            fs.unlink(path, (err) => {
                if (err) response({ response: { message: "Couldn't delete image from server!", image: filename } })
                response({ response: { message: "Image deleted from server!", image: filename } });
            });
        }
};



module.exports = new ImageComtroller();
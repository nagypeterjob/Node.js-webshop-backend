'use strict';

var Q = require('q');
var response = require('../lib/response');

module.exports = function (sequelize, DataTypes) {
  var model = sequelize.define('Image', {
    path: DataTypes.STRING,
    title: DataTypes.STRING,
    featured: DataTypes.INTEGER
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    });

  model.add = function (request) {
    var deferred = Q.defer();

    model.create({
      path: request.payload.path,
      title: request.payload.title,
      featured: request.payload.featured,
      ProductId: request.payload.ProductId
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't add image")
        );
      }
    });
    return deferred.promise;
  };

  model.remove = function (id) {
    var deferred = Q.defer();

    model.destroy({
      where: {
        id: id
      }
    }).then(function (img) {
      if (img) {
        deferred.resolve(img);
      } else {
        deferred.reject(
          new response.error("Couldn't remove image")
        );
      }
    });
    return deferred.promise;
  };

  model.feature = function (feature, id) {
    var deferred = Q.defer();
    model.update({
      featured: feature
    }, {
        where: {
          id: id
        }
      }).then(function (img) {
        if (img) {
          deferred.resolve(img);
        } else {
          deferred.reject(
            new response.error("Couldn't feature image")
          );
        }
      });
    return deferred.promise;
  };

  model.unfeature = function (ProductId) {
    var deferred = Q.defer();
    model.update({
      featured: 0
    }, {
        where: {
          ProductId: ProductId
        }
      }).then(function (img) {
        if (img) {
          deferred.resolve(img);
        } else {
          deferred.reject(
            new response.error("Couldn't unfeature images")
          );
        }
      });
    return deferred.promise;
  };


  model.list = function (product_id) {
    var deferred = Q.defer();
    model.findAll({
      where: {
        ProductId: product_id
      }
    }).then(function (img) {
      if (img) {
        deferred.resolve(img);
      } else {
        deferred.reject(
          new response.error("Couldn't feature image")
        );
      }
    });
    return deferred.promise;
  };

  model.featured = function(product_id){
    var deferred = Q.defer();

    model.findOne({
      where:{
        featured: 1,
        ProductId: product_id
      }
    }).then(function(img){
      if(img){
        deferred.resolve(img);
      }else{
        deferred.reject(
          new response.error("Couldn't find image")
        );
      }
    });

    return deferred.promise;
  }

  return model;
};
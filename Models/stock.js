'use strict';

var Q = require('q');
var response = require('../lib/response');

module.exports = function (sequelize, DataTypes) {
  var model = sequelize.define('Stock', {
    num_xs: DataTypes.INTEGER,
    num_s: DataTypes.INTEGER,
    num_m: DataTypes.INTEGER,
    num_l: DataTypes.INTEGER,
    num_xl: DataTypes.INTEGER
  }, {
      classMethods: {
        associate: function (models) {
          model.belongsTo(models.Product);
        }
      }
    });

  model.add = function (request) {
    var deferred = Q.defer();

    model.create({
      num_xs: request.payload.num_xs,
      num_s: request.payload.num_s,
      num_m: request.payload.num_m,
      num_l: request.payload.num_l,
      num_xl: request.payload.num_xl,
      ProductId: request.payload.product_id
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't create stock")
        );
      }
    });
    return deferred.promise;
  };



  model.updateStock = function (request) {
    var deferred = Q.defer();

    model.update({
      num_xs: request.payload.num_xs,
      num_s: request.payload.num_s,
      num_m: request.payload.num_m,
      num_l: request.payload.num_l,
      num_xl: request.payload.num_xl,
      ProductId: request.payload.product_id
    }, {
        where: {
          id: request.payload.id
        }
      }).then(function (result) {
        if (result) {
          deferred.resolve(result);
        } else {
          deferred.reject(
            new response.error("Couldn't update stock")
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
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't remove stock")
        );
      }
    });
    return deferred.promise;
  };

  model.list = function (product_id) {
    var deferred = Q.defer();

    model.findOne({
      where: {
        ProductId: product_id
      }
    }).then(function name(result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't list stock")
        );
      }
    });

    return deferred.promise;
  };

  return model;
};
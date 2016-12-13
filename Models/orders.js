'use strict';

var Q = require('q');
var response = require('../lib/response');

module.exports = function (sequelize, DataTypes) {

  var model = sequelize.define('Orders', {
    items_list: DataTypes.STRING,
    amounts: DataTypes.STRING,
    order_id: DataTypes.INTEGER,
    cart: DataTypes.STRING,
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    payer_id: DataTypes.INTEGER,
    shipping_address: DataTypes.STRING,
    country_code: DataTypes.STRING,
    create_time: DataTypes.STRING,
    closed: DataTypes.INTEGER
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
      items_list: request.payload.items_list,
      amounts: request.payload.amounts,
      order_id: request.payload.order_id,
      cart: request.payload.cart,
      email: request.payload.email,
      first_name: request.payload.first_name,
      last_name: request.payload.last_name,
      payer_id: request.payload.payer_id,
      shipping_address: request.payload.shipping_address,
      country_code: request.payload.country_code,
      transactions: request.payload.transactions,
      amount: request.payload.amount,
      payee: request.payload.payee,
      create_time: request.payload.create_time,
      closed: 0
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't create order")
        );
      }
    });
    return deferred.promise;
  };

  model.close = function (request) {
    var deferred = Q.defer();
    model.update({
      closed: request.payload.close
    }, {
        where: {
          id: request.payload.id
        }
      }).then(function (result) {
        if (result) {
          deferred.resolve(result);
        } else {
          deferred.reject(
            new response.error("Couldn't update order")
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
          new response.error404("Couldn't find order to delete")
        );
      }
    });
    return deferred.promise;
  };

  return model;
};
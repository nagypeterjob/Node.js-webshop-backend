'use strict';
var Q = require('q');
var response = require('../lib/response');

module.exports = function(sequelize, DataTypes) {


  var model = sequelize.define('TokenStore', {
    token: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });

  model.validate = function (token) {
    var deferred = Q.defer();

    model.findOne({
      token: token
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't find any valid token")
        );
      }
    });
    return deferred.promise;
  };

  model.add = function (token) {
    var deferred = Q.defer();

    model.create({
      token: token,
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't create token")
        );
      }
    });
    return deferred.promise;
  };

  return model;
};



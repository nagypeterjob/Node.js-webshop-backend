'use strict';

var Q = require('q');
var response = require('../lib/response');

module.exports = function (sequelize, DataTypes) {

  var fields = {
    grant: {
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    }
  }
  var model = sequelize.define('User', fields);

  model.add = function (request) {
    var deferred = Q.defer();

    model.create({
      grant: request.payload.grant,
      email: request.payload.email,
      password: request.payload.password,
      phone: request.payload.phone
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't create")
        );
      }
    });
    return deferred.promise;
  };

  model.upadateUser = function (request) {
    var deferred = Q.defer();
    model.update({
      grant: request.payload.grant,
      email: request.payload.email,
      password: request.payload.password,
      phone: request.payload.phone
    }, {
        where: {
          id: request.payload.id
        }
      }).then(function (result) {
        if (result) {
          deferred.resolve(result);
        } else {
          deferred.reject(
            new response.error("Couldn't update")
          );
        }
      });
    return deferred.promise;
  };

  model.remove = function (user_id) {
    var deferred = Q.defer();
    model.destroy({
      where: {
        id: user_id
      }
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error404("Couldn't find user to delete")
        );
      }
    });
    return deferred.promise;
  };

  model.read = function (user_id) {
    var deferred = Q.defer();
    model.findOne({
      where: {
        id: user_id
      }
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error404("Couldn't find user")
        );
      }
    });
    return deferred.promise;
  };


  model.all = function () {
    var deferred = Q.defer();
    model.findAll().
      then(function (result) {
        if (result) {
          deferred.resolve(result);
        } else {
          deferred.reject(
            new response.error("No result")
          );
        }
      });
    return deferred.promise;
  };

  model.checkUser = function(payload){
    var deferred = Q.defer();
    
    model.findOne({
      where: {
        email: payload.username,
        password: payload.password
      }
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.jsonErrorReply("Couldn't find user")
        );
      }
    });

    return deferred.promise;
  }


  return model;
};
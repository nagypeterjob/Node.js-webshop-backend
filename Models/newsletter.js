'use strict';
var Q = require('q');

module.exports = function(sequelize, DataTypes) {

  var model = sequelize.define('Newsletter', {
    email: DataTypes.STRING,
    date_added: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
       
      }
    }
  });

model.add = function (request) {
    var deferred = Q.defer();

    model.findOne({
      where:{
        email: request.payload.email
      }
    }).then(function(result){

        if(result != null){
              deferred.resolve(JSON.parse('{"message":"Email already exists"}'));
        }else{
          model.create({
            email: request.payload.email,
            date_added: new Date()

          }).then(function (result) {
            if (result) {
              deferred.resolve("callback("+result+")");
            } else {
              deferred.reject(
                new response.error("Couldn't create newsletter")
              );
            }
          });
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
          new response.error404("Couldn't find newsletter to delete")
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

  return model;
};
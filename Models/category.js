'use strict';

var Q = require('q');
var response = require('../lib/response');

module.exports = function (sequelize, DataTypes) {

  var fields = {
    name: {
      type: DataTypes.STRING
    }
  }

  var model = sequelize.define('Category', fields, {
    classMethods: {
      associate: function (models) {
        model.hasMany(models.SubCategory);
      }
    }
  });

  model.all = function () {
    var deferred = Q.defer();
    model.findAll().then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("No results")
        );
      }
    });
    return deferred.promise;
  };

  model.allCategories = function () {
    var deferred = Q.defer();

    sequelize.query('SELECT Categories.id AS cat_id,Categories.name AS cat_name,SubCategories.id,SubCategories.name FROM Categories LEFT JOIN SubCategories ON SubCategories.CategoryId = Categories.id ORDER BY Categories.order')
      .spread(function (result, meta) {
        if (result) {
          deferred.resolve(result);
        } else {
          deferred.reject(
            new response.error("Couldn't get categories")
          );
        }
      });
    return deferred.promise;
  };



  model.byId = function (cat_id) {
    var deferred = Q.defer();

    model.findOne({
      where: {
        id: cat_id
      }
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("No results")
        );
      }
    })
    return deferred.promise;
  };

  model.add = function (cat_name) {
    var deferred = Q.defer();
    model.create({
      name: cat_name
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

  model.remove = function (cat_id) {
    var deferred = Q.defer();

    model.destroy({
      where: {
        id: cat_id
      }
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't remove")
        );
      }
    });
    return deferred.promise;

  };

  model.updateCategory = function (cat_name, cat_id) {
    var deferred = Q.defer();

    model.update({
      name: cat_name
    }, {
        where: {
          id: cat_id
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


  return model;
};
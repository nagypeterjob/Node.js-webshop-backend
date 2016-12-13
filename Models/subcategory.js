'use strict';

var Q = require('q');
var response = require('../lib/response');

module.exports = function (sequelize, DataTypes) {

  var model = sequelize.define('SubCategory', {
    name: DataTypes.STRING
  }, {
      classMethods: {
        associate: function (models) {
          model.hasMany(models.Product);
        }
      }
    });


  model.add = function (name, cat_id) {
    var deferred = Q.defer();

    model.create({
      name: name,
      CategoryId: cat_id
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't create SubCategory")
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
          new response.error("Couldn't remove SubCategory")
        );
      }
    });
    return deferred.promise;
  };

  model.list = function (cat_id) {
    var deferred = Q.defer();

    model.findAll({
      where: {
        CategoryId: cat_id
      }
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't list SubCategory")
        );
      }
    });
    return deferred.promise;
  };

  model.get = function (id) {
    var deferred = Q.defer();

    model.findOne({
      where: {
        id: id
      }
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't find SubCategory")
        );
      }
    });
    return deferred.promise;
  };

  model.updateSub = function (id, name,cat_id) {
    var deferred = Q.defer();
    
    model.update(
      {
        name: name,
        CategoryId: cat_id
      }, {
        where: {
          id: id
        }
      }
    ).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't update SubCategory")
        );
      }
    });
    return deferred.promise;
  };

  model.unused = function (cat_id) {
    var deferred = Q.defer();

    sequelize.query('SELECT id,name FROM SubCategories WHERE CategoryId IS NULL')
      .spread(function (result, meta) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't list SubCategory")
        );
      }
    });
    return deferred.promise;
  };

  return model;
};


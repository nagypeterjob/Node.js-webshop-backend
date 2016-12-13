'use strict';

var Q = require('q');
var response = require('../lib/response');

module.exports = function (sequelize, DataTypes) {
  var model = sequelize.define('Material', {
    name: DataTypes.STRING,
    image_path: DataTypes.STRING
  }, {
      classMethods: {
        associate: function (models) {
          model.hasMany(models.Product);
        }
      }
    });


  model.add = function (name, image_path) {
    var deferred = Q.defer();

    model.create({
      name: name,
      image_path: image_path,
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't create material")
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
          new response.error("Couldn't remove material")
        );
      }
    });
    return deferred.promise;

  };

  model.updateMaterial = function (name, image_path, id) {
    var deferred = Q.defer();

    model.update({
      name: name,
      image_path: image_path
    }, {
        where: {
          id: id
        }
      }).then(function (result) {
        if (result) {
          deferred.resolve(result);
        } else {
          deferred.reject(
            new response.error("Couldn't update material")
          );
        }
      });
    return deferred.promise;
  };

  model.list = function () {
    var deferred = Q.defer();
    model.findAll()
      .then(function (result) {
        if (result) {
          deferred.resolve(result);
        } else {
          deferred.reject(
            new response.error("Couldn't list material")
          );
        }
      });
    return deferred.promise;
  };


  model.insert = function (ProductId, MaterialId) {
    var deferred = Q.defer();

    sequelize.query('INSERT INTO MaterialsProducts (ProductId, MaterialId) VALUES ( ?, ?)', {
      replacements: [ProductId, MaterialId]
    })
      .spread(function (result, meta) {
        if (result) {
          deferred.resolve(result);
        } else {
          deferred.reject(
            new response.error("Couldn't insert material")
          );
        }
      });
    return deferred.promise;
  }

  model.get = function (ProductId) {
    var deferred = Q.defer();

    sequelize.query('SELECT ProductId,MaterialId,Id,name,image_path FROM `MaterialsProducts` LEFT JOIN Materials ON Materials.id = MaterialId WHERE ProductId = ?', {
      replacements: [ProductId]
    })
      .spread(function (result, meta) {
        if (result) {
          deferred.resolve(result);
        } else {
          deferred.reject(
            new response.error("Couldn't get material for product")
          );
        }
      });
    return deferred.promise;
  }

  model.removeForProduct = function (id) {
    var deferred = Q.defer();
    
    sequelize.query('DELETE FROM `MaterialsProducts` WHERE `ProductId` =  ?', {
      replacements: [id]
    })
      .spread(function (result, meta) {
        if (result) {
          deferred.resolve(result);
        } else {
          deferred.reject(
            new response.error("Couldn't remove materials")
          );
        }
      });
    return deferred.promise;

  };

  return model;
};
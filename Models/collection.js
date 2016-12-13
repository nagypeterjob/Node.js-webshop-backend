'use strict';

var Q = require('q');
var response = require('../lib/response');

module.exports = function (sequelize, DataTypes) {
  var model = sequelize.define('Collection', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    story: DataTypes.STRING,
    debut: DataTypes.DATE,
    season: DataTypes.STRING
  }, {
      classMethods: {
        associate: function (models) {
          model.hasMany(models.Product);
        }
      }
    });

  model.all = function () {
    var deferred = Q.defer();
    model.findAll()
      .then(function (result) {
        if (result) {
          deferred.resolve(result);
        } else {
          deferred.reject(
            new response.error("Couldn't list collections")
          );
        }
      });
    return deferred.promise;
  };

  model.byId = function (id) {
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
          new response.error("No results (collection)")
        );
      }
    })
    return deferred.promise;
  }

  model.add = function (payload) {
    var deferred = Q.defer();
    model.create({
      name: payload.name,
      description: payload.description,
      story: payload.story,
      debut: payload.debut,
      season: payload.season
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't create collection")
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
          new response.error("Couldn't remove collection")
        );
      }
    });
    return deferred.promise;

  };

  model.updateCollection = function (payload) {
    var deferred = Q.defer();

    model.update({
      name: payload.name,
      description: payload.description,
      story: payload.story,
      debut: payload.debut,
      season: payload.season
    }, {
        where: {
          id: payload.id
        }
      }).then(function (result) {
        if (result) {
          deferred.resolve(result);
        } else {
          deferred.reject(
            new response.error("Couldn't update collection")
          );
        }
      });
    return deferred.promise;
  };

  model.listProductsForCollection = function (id) {
    var deferred = Q.defer();

    sequelize.query("SELECT Products.id,Products.name,Products.description,date_added,price,CollectionId,CollectionId FROM Products LEFT JOIN Collections ON Products.CollectionId = Collections.id WHERE Collections.id = ?", {
      replacements: [id]
    }).spread(function (result, meta) {
      if (result.length) {
        deferred.resolve(result);
      } else {
        new response.error("Couldn't find any product for collection")
      }
    });
    return deferred.promise;
  };
  model.prodcutsWithDiscount = function (id) {
    var deferred = Q.defer();

    sequelize.query("SELECT Products.id,Products.name,Products.description,Products.date_added,Products.price,Products.CollectionId,Products.SubCategoryId, Discounts.id AS DiscountId,Discounts.name AS DiscountName,Discounts.percentage AS DiscountPercentage FROM Products LEFT JOIN DiscountsProducts ON DiscountsProducts.ProductId = Products.id LEFT JOIN Discounts ON DiscountsProducts.DiscountId = Discounts.id WHERE CollectionId =  ?", {
      replacements: [id]
    }).spread(function (result, meta) {
      if (result.length) {
        deferred.resolve(result);
      } else {
        new response.error("Couldn't find any product for collection")
      }
    });
    return deferred.promise;
  };

  return model;
};
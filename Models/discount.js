'use strict';

var Q = require('q');
var response = require('../lib/response');

module.exports = function (sequelize, DataTypes) {


  var model = sequelize.define('Discount', {
    name: DataTypes.STRING,
    percentage: DataTypes.STRING
  }, {
      classMethods: {
        associate: function (models) {
          model.hasMany(models.Product);
        }
      }
    });

  model.add = function (name, percentage) {
    var deferred = Q.defer();
    model.create({
      name: name,
      percentage: percentage
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

  model.addProduct = function (ProductId, DiscountId) {
    var deferred = Q.defer();

    sequelize.query('INSERT INTO DiscountsProducts (ProductId, DiscountId) VALUES (?,?)',
      {
        replacements: [ProductId, DiscountId]
      })
      .spread(function (result, meta) {
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

  model.read = function (ProductId) {
    var deferred = Q.defer();
    sequelize.query('SELECT  Discounts.name,percentage FROM Discounts LEFT JOIN DiscountsProducts ON DiscountsProducts.DiscountId = id LEFT JOIN Products ON DiscountsProducts.ProductId = Products.id WHERE Products.id = ? ORDER BY Discounts.percentage DESC LIMIT 1 ',
      {
        replacements: [ProductId]
      })
      .spread(function (result, meta) {
        if (result) {
          deferred.resolve(result);
        } else {
          deferred.reject(
            new response.error("Couldn't read")
          );
        }
      });
    return deferred.promise;
  };

  model.remove = function (ProductId, DiscountId) {
    var deferred = Q.defer();

    sequelize.query('DELETE FROM `DiscountsProducts` WHERE ProductId = ? AND DiscountId = ?',
      {
        replacements: [ProductId, DiscountId]
      })
      .spread(function (result, meta) {
        if (result) {
          deferred.resolve(result);
        } else {
          deferred.reject(
            new response.error("Couldn't read")
          );
        }
      });
    return deferred.promise;

  };

  model.removeOne = function (ProductId) {
    var deferred = Q.defer();

    model.destroy({
      where: {
        id: ProductId
      }
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error404("Couldn't remove")
        );
      }
    });
    return deferred.promise;

  };

  model.all = function (DiscountId) {
    var deferred = Q.defer();

    sequelize.query('SELECT Products.* FROM DiscountsProducts LEFT JOIN Discounts ON Discounts.id = DiscountId LEFT JOIN Products ON Products.id = ProductId WHERE Discounts.id =  ?',
      {
        replacements: [DiscountId]
      })
      .spread(function (result, meta) {
        if (result) {
          deferred.resolve(result);
        } else {
          deferred.reject(
            new response.error("Couldn't list all")
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
          new response.error("Couldn't list discounts")
        );
      }
    });
    return deferred.promise;

  };

  model.one = function (id) {
    var deferred = Q.defer();

    model.findOne({
      where:{
        id: id
      }
    })
      .then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't find discount")
        );
      }
    });
    return deferred.promise;

  };

  return model;
};

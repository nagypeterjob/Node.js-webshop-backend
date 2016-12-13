'use strict';

var Q = require('q');
var response = require('../lib/response');

module.exports = function (sequelize, DataTypes) {
  var model = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    date_added: DataTypes.DATE,
    price: DataTypes.INTEGER
  }, {
      classMethods: {
        associate: function (models) {
          model.hasOne(models.Stock);
          model.hasMany(models.Material);
          model.hasMany(models.Image);
          model.hasMany(models.Discount);
        }
      }
    });

  model.add = function (request) {
    var deferred = Q.defer();
    model.create({
      name: request.payload.name,
      description: request.payload.description,
      date_added: new Date(),
      price: request.payload.price,
      SubCategoryId: request.payload.cat_id
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't create product")
        );
      }
    });
    return deferred.promise;
  };

  model.updateProduct = function (request) {
    var deferred = Q.defer();

    model.update({
      name: request.payload.name,
      description: request.payload.description,
      price: request.payload.price,
      SubCategoryId: request.payload.cat_id,
      CollectionId: (request.payload.CollectionId == '' ? null : request.payload.CollectionId)
    }, {
        where: {
          id: request.payload.id
        }
      }).then(function (result) {
        if (result) {
          deferred.resolve(result);
        } else {
          deferred.reject(
            new response.error("Couldn't update product")
          );
        }
      });
    return deferred.promise;
  };

  model.list = function (cat_id) {
    var deferred = Q.defer();

    sequelize.query('SELECT * FROM Products WHERE (NOT EXISTS (SELECT * FROM DiscountsProducts WHERE DiscountsProducts.ProductId = Products.id)) AND Products.SubCategoryId = ?', {
      replacements: [cat_id]
    }).spread(function (result, meta) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't list products")
        );
      }
    });
    return deferred.promise;
  };

  model.material = function (id) {
    var deferred = Q.defer();

    sequelize.query('SELECT Materials.id,Materials.name,image_path FROM `Materials` LEFT JOIN MaterialsProducts ON MaterialsProducts.MaterialId = id LEFT JOIN Products ON MaterialsProducts.ProductId = Products.id WHERE Products.id = ?', {
      replacements: [id]
    }).spread(function (result, meta) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't select materials")
        );
      }
    });
    return deferred.promise;
  };

  model.one = function (id) {
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
          new response.error("Couldn't find product")
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
          new response.error("Couldn't remove product")
        );
      }
    });
    return deferred.promise;
  };

  model.search = function (text) {
    var deferred = Q.defer();

    sequelize.query("SELECT * FROM products LEFT JOIN SubCategories ON SubCategoryId = SubCategories.id  WHERE (products.name LIKE ?) OR ( products.description LIKE ?) OR (SubCategories.name LIKE ?)  ORDER BY date_added DESC", {
      replacements: ['%' + text + '%', '%' + text + '%','%' + text + '%']
    }).spread(function (result, meta) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't search product")
        );
      }
    });
    return deferred.promise;
  };
 
  model.allByGroup = function (text) {
    var deferred = Q.defer();

    sequelize.query("SELECT products.id,products.name,description,date_added,price,CollectionId,SubCategoryId,SubCategories.name as catname FROM products LEFT JOIN SubCategories ON SubCategoryId = SubCategories.id ORDER BY SubCategories.name ASC", {
    }).spread(function (result, meta) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't query all products by group")
        );
      }
    });
    return deferred.promise;
  };

 

  model.newProducts = function () {
    var deferred = Q.defer();
    var d = new Date();
    d.setMonth(d.getMonth() - 1);
    model.findAll({
      where: {
        date_added: {
          $gte: d
        }
      }
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't query product")
        );
      }
    });
    return deferred.promise;
  };

  model.nocollection = function () {
    var deferred = Q.defer();
    model.findAll({
      attributes: ['id','name'],
      where: {
        CollectionId: {
          $eq : null  
        }
      }
    }).then(function (result) {
      if (result) {
        deferred.resolve(result);
      } else {
        deferred.reject(
          new response.error("Couldn't query products")
        );
      }
    });
    return deferred.promise;
  };

  return model;
};
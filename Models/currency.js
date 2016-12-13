'use strict';
module.exports = function(sequelize, DataTypes) {
  var currency = sequelize.define('Currency', {
    name: DataTypes.STRING,
    percent: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return currency;
};
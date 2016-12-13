'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      items_list: {
        type: Sequelize.STRING
      },
      amounts: {
        type: Sequelize.NUMBER
      },
      order_id: {
        type: Sequelize.NUMBER
      },
      cart: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      payer_id: {
        type: Sequelize.NUMBER
      },
      shipping_address: {
        type: Sequelize.STRING
      },
      country_code: {
        type: Sequelize.STRING
      },
      transactions: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.NUMBER
      },
      payee: {
        type: Sequelize.STRING
      },
      create_time: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Orders');
  }
};
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  price: {
    type: DataTypes.FLOAT,
  } 
}, {
  indexes: [
    {
      unique: true,
      fields: ['OrderId', 'ProductId']
    }
  ]
});

module.exports = OrderItem;
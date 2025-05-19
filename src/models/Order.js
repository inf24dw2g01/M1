const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const User = require('./User')
const OrderItem = require('./OrderItem')

const Order = sequelize.define('Order', {

  date: {
    type : DataTypes.DATEONLY,
  },

  CustomerID:{
    type: DataTypes.INTEGER,
    references: {
        model: 'Users',
        key: 'id'
    }
  }

});

User.hasMany(Order, { foreignKey: 'CustomerID' });
Order.belongsTo(User, { foreignKey: 'CustomerID' });

module.exports = Order;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  name:{
    type : DataTypes.STRING
  },
  description:{
    type : DataTypes.STRING
  },

  price: {
    type : DataTypes.FLOAT,
  },

});

module.exports = Product;

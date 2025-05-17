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

  id: {
    type : DataTypes.STRING,
    primaryKey : true,
  },

});


module.exports = Product;

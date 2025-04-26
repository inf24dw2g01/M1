const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');

const User = sequelize.define('User', {
  name:{
    type : DataTypes.STRING,
    allowNull : 'false',
  },
  email: {
    type: DataTypes.STRING,
    unique : true,
  },
  password: {
    type: DataTypes.STRING,
  }
  
});

module.exports = User;


/*Customer.beforeCreate(async (customer) => {
    if(user.password){
        const salt = await bcrypt.genSalt(10); //generates a random string to add to the password for security
        customer.password = await bcrypt.hash(customer.password,salt); // hashes the password + the salt
    
});*/
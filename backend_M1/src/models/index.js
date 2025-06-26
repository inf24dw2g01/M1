const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const sequelize = require('../config/database');

// Define associations with CASCADE delete
User.hasMany(Order, { 
  foreignKey: 'CustomerID',
  onDelete: 'CASCADE' // This ensures orders are deleted when a user is deleted
});
Order.belongsTo(User, { 
  foreignKey: 'CustomerID'
});

// Direct associations for easier querying with CASCADE delete
Order.hasMany(OrderItem, { 
  foreignKey: 'OrderId',
  onDelete: 'CASCADE' // This ensures order items are deleted when an order is deleted
});
OrderItem.belongsTo(Order, { 
  foreignKey: 'OrderId'
});

OrderItem.belongsTo(Product, { 
  foreignKey: 'ProductId'
});
Product.hasMany(OrderItem, { 
  foreignKey: 'ProductId'
});

// Many-to-many relationship through the join table
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

module.exports = {
  User,
  Product,
  Order,
  OrderItem,
  sequelize
};
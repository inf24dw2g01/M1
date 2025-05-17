const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const sequelize = require('../config/database');

// Define associations
User.hasMany(Order, { foreignKey: 'CustomerID' });
Order.belongsTo(User, { foreignKey: 'CustomerID' });

// Direct associations for easier querying
Order.hasMany(OrderItem, { foreignKey: 'OrderId' });
OrderItem.belongsTo(Order, { foreignKey: 'OrderId' });

OrderItem.belongsTo(Product, { foreignKey: 'ProductId' });
Product.hasMany(OrderItem, { foreignKey: 'ProductId' });

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
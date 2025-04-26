const sequelize = require('./config/database');
const User = require('./models/User')
const Product = require('./models/Product')
const Order = require('./models/Order')
const OrderItem = require('./models/OrderItem')


sequelize.sync({ force: true }).then(async () => 
    console.log("Database synced!"));
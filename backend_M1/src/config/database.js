const { Sequelize } = require('sequelize');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const sequelize = new Sequelize(
    process.env.DB_NAME,
    'root',
    process.env.MYSQL_ROOT_PASSWORD,
    {
    host : 'mysql',
    dialect : 'mysql',
    logging: console.log // Enable logging to debug connection issues
}
);

// Test the connection
sequelize
.authenticate()
.then(() => console.log('Database connection established successfully.'))
.catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;


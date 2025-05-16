const express = require('express');
const sequelize = require('./config/database');
const app = express();
const session = require('express-session');
const passport = require('./config/passport');


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));


app.use(express.json());
app.use(passport.initialize());
app.use(passport.session()); 


app.use('/auth', require('./routes/authRoute'));

app.use('/api-docs',require('./routes/docsRoute'))


app.use('/products', require('./routes/productsRoute'));

app.listen(3000, () => console.log('Server is running on port 3000'))

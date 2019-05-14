const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const usersRouter   = require('./api/routes/users');
const productsRouter = require('./api/routes/product')
const searchRouter  = require('./api/routes/search');
const productRouter = require('./api/routes/product');
const cartRouter    = require('./api/routes/cart');
const cmsRouter     = require('./api/routes/cms');
var cors = require('cors')
const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization");

  next();
});

// set up view engine .ejs
app.set("view engine", "ejs");

// expose the public folder
app.use(express.static(__dirname + '/public'));

// error page handler

/*---------- route ----------*/
app.use('/', cmsRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
// app.use('/search', searchRouter);
app.use('/carts', cartRouter);
app.use('/compare', usersRouter);
app.use('/comment', usersRouter);
app.use('/order', usersRouter);

// error page handler
app.use(function (req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

module.exports = app;

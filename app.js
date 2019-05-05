const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*---------- route ----------*/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', usersRouter);
app.use('/search', usersRouter);
app.use('/compare', usersRouter);
app.use('/compare', usersRouter);
app.use('/comment', usersRouter);
app.use('/order', usersRouter);

module.exports = app;

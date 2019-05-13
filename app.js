const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const usersRouter   = require('./api/routes/users');
const productRouter = require('./api/routes/products');
const productRouter = require('./api/routes/search');
const app           = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


/*---------- route ----------*/
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/search', searchRouter);
app.use('/compare', usersRouter);
app.use('/compare', usersRouter);
app.use('/comment', usersRouter);
app.use('/order', usersRouter);

//Handling error
app.use((req, res, next) =>{
	const error = new Error('Not found');
	error.status = 404
	next(error);
})

app.use((error, rep, res, next) =>{
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;

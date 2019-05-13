const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const usersRouter   = require('./api/routes/users');

const app           = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*---------- route ----------*/
app.use('/users', usersRouter);

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

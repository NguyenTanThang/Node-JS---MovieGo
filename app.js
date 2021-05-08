var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var {connectDB} = require("./config/db");
connectDB();
var cors = require("cors");

var indexRouter = require('./routes/index');
var customersRouter = require('./routes/customers');
var genresRouter = require('./routes/genres');
var imagesRouter = require('./routes/images');
var moviesRouter = require('./routes/movies');
var ratesRouter = require('./routes/rates');
var viewsRouter = require('./routes/views');
var watchLatersRouter = require('./routes/watch-laters');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/customers', customersRouter);
app.use('/genres', genresRouter);
app.use('/images', imagesRouter);
app.use('/movies', moviesRouter);
app.use('/rates', ratesRouter);
app.use('/views', viewsRouter);
app.use('/watch-laters', watchLatersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;

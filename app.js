var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import your API routes
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var apiRouter = require('./app_api/routes/index');  // Correctly import the API routes

var handlebars = require('hbs');

// Bring in the database connection
require('./app_api/models/db');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Register Handlebars partials
handlebars.registerPartials(__dirname + '/app_server/views/partials');
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);

// Use the API router for /api routes
app.use('/api', apiRouter);  // This line routes /api to the apiRouter

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

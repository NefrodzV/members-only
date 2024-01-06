const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const membersOnlyRouter = require('./routes/members_only');
const Auth = require('./Auth')
const session = require('express-session')
require('dotenv').config()

const DB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ya3dsnp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(DB_URI)

const db = mongoose.connection
db.on('error', console.error.bind(console, "mongo connection failed!"))

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({secret:'cats', resave:false, saveUninitialized:true}))
app.use(Auth.instance.initialize())
app.use(Auth.instance.session())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/members-only', membersOnlyRouter)

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
  res.render('error');
});

module.exports = app;

const createError  = require('http-errors');
const path         = require('path');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');
const mongoose     = require('mongoose');
const express      = require('express');
const app = express();

// Me conecto a la base de datos 
mongoose.connect('mongodb+srv://tigre:tigre123@cluster0-tdpmm.mongodb.net/DBNovedad?retryWrites=true',
       { useNewUrlParser: true });

const indexRouter = require('./routes/index');
const novedadRouter = require('./routes/novedad');
const usuariosRouter = require('./routes/usuarios');
const authRouter = require('./routes/auth');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Crear variables globales
app.use('/', indexRouter);
app.use('/novedad', novedadRouter);
app.use('/usuarios', usuariosRouter);
app.use('/auth', authRouter); 

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

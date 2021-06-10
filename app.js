var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var loginRouter = require('./routes/loginRoutes');
var fotografiasRouter = require("./routes/fotografiaRoutes")
var utilizadorRouter = require("./routes/utilizadorRoutes")

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/auth', loginRouter);
app.use('/api/carregarFotos', fotografiasRouter);
app.use('/api/utilizador', utilizadorRouter);

module.exports = app;

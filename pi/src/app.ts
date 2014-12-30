/// <reference path="../scripts/typings/node/node.d.ts" />
/// <reference path="../scripts/typings/morgan/morgan.d.ts" />
/// <reference path="../scripts/typings/express-/express.d.ts" />

import express = require('express');
import path = require('path');
var favicon = require('serve-favicon');
import logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

import configAll = require('./config');
import config = configAll.web;

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


// Setup router
app.use('/', require('./route/index'));

// Start web app server
app.listen(80, () => {
    console.log('server started');
});

module.exports = app;

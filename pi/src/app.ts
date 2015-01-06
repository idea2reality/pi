/// <reference path="../scripts/typings/node/node.d.ts" />
/// <reference path="../scripts/typings/morgan/morgan.d.ts" />
/// <reference path="../scripts/typings/express-/express.d.ts" />
/// <reference path="../scripts/typings/mongodb/mongodb.d.ts" />
/// <reference path="../scripts/typings/async/async.d.ts" />

import express = require('express');
import path = require('path');
var favicon = require('serve-favicon');
import logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

import configAll = require('./config');
import config = configAll.web;
import mongo = require('./mongo/index');
import async = require('async');
import pi = require('./pi/index');

var ping = require('ping');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


// Setup router
app.use('/', require('./route/index'));

// Load modules, and start web server
async.parallel({
    mongo: (callback) => {
        mongo.connect((err) => {
            callback(err, null);
        });
    },
    pi: (callback) => {
        // Check pi is alive
        ping.sys.probe(configAll.pi.ip, (isAlive: boolean) => {
            if (isAlive) {
                console.log('+++ Raspberry Pi is alive');
                // Connect pi
                pi.connect(() => {
                    callback(null, null);
                });
            } else {
                console.log('--- Raspberry Pi is dead');
                callback(null, null);
            }
        });
    }
},
    (err, results) => {
        // Start web app server
        app.listen(config.port, () => {
            console.log('+++ Web app server is listening on port ' + config.port);
        });
    });


module.exports = app;

/// <reference path="../scripts/_references.ts" />

import express = require('express');
import path = require('path');
var favicon = require('serve-favicon');
import logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
import async = require('async');

import configAll = require('./config');
import config = configAll.web;
import mongo = require('./mongo/index');
import tcp = require('./pi/tcp');

var ping = require('ping');

var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


// Load modules, and start web server
async.parallel({
        mongo: (callback) => {
            mongo.connect((err) => {
                callback(err, null);
            });
        },
        tcpServer: (callback)=> {
            tcp.startServer(()=> {
                callback(null, null);
            })
        }
    },
    (err, results) => {
        /**
         * Router has to be set here after mongodb connected.
         * Because of lazy loading of collection modules.
         *
         * <require process>
         * [connect mongodb]
         * ->[get db object]: now we can get collections
         * ->[set router]: require modules that require db object
         * ->[load collection modules]
         */

            // Set router.
        app.use('/', require('./route/index'));
        // Start web app server
        app.listen(config.port, () => {
            console.log('+++ Web app server is listening on port ' + config.port);
        });
    });

export = app;

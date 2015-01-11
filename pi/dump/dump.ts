﻿/// <reference path="../scripts/_references.ts" />

var numOfSwitch = 2;

import async = require('async');

import mongo = require('../src/mongo/index');
import pi = require('../src/mongo/pi/switch/index');
import schema = require('../src/mongo/pi/schema');
import Switch = schema.Switch;
import ISwConData = schema.ISwConData;

/**
 * Execute dump tasks as series
 */
async.series([
    function (callback) {
        /**
         * Connect mongodb
         */
        mongo.connect((err) => {
            callback(err);
        });
    },
    function (callback) {
        /**
         * Drop "switch" collection
         */
        console.log('=== Drop collection "switch"');
        pi.drop((err) => {
            callback(err);
        });
    },
    function (callback) {
        /**
         * Insert siwtches into db
         */
        console.log('=== Insert switches');

        var sw1 = new Switch({
            name: 'Switch 1',
            gid: 1,
            did: 250,
            tcp: {
                on: 1,
                off: 3
            }
        });

        var sw2 = new Switch({
            name: 'Switch 2',
            gid: 2,
            did: 250,
            tcp: {
                on: 2,
                off: 4
            }
        });

        // Insert each switch as series task
        async.eachSeries([sw1, sw2],
            function (sw, callback) {
                pi.insert(sw, (err) => {
                    callback(err);
                });
            },
            function (err) {
                callback(err);
            });
    },
    function (callback) {
        /**
         * Show inserted switches so that I can check switches inserted correctly
         */
        pi.list((err, sws) => {
            if (err) return callback(err);
            console.log('=== List of inserted siwtches');
            console.log(sws);
            callback(null);
        });
    }
],
    (err, results) => {
        console.log('Dump finish');
    });
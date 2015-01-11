import express = require('express');
import async = require('async');
import swDb = require('../../mongo/pi/switch/index');
import ResForm = require('../../util/resForm');

var router = express.Router();
router

    .get('/', (req, res, next) => {
        swDb.list((err, sws) => {
            if (err) return;
            res.json(new ResForm(err, sws));
        });
    })

    .param('id', (req, res, next, id) => {
        /**
         * FIX HERE:
         *  Find siwtch doc in mongodb
         */
        req['id'] = id;

        next();
    })

    .use('/:id', require('./id/index'))

export = router;
import express = require('express');

var router = express.Router();
router

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
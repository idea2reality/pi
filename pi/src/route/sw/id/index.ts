import express = require('express');
import pi = require('../../../pi/index');

var router = express.Router();
router

    .post('/control', (req, res, next) => {
        var value = req.body['value'];

        pi.write(new Buffer([0x01]), (err) => {
            if (err)
                res.json({
                    err: 1,
                    id: req['id']
                });
            else
                res.json({
                    err: 0,
                    id: req['id'],
                    value: value
                });
        });

    });

export = router;
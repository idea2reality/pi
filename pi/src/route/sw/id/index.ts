import swDb = require('../../../mongo/pi/switch/index');
import Switch = swDb.Switch;
import express = require('express');
import pi = require('../../../pi/index');
import resForm = require('../../../util/resForm');


var router = express.Router();
router

    .get('/', (req, res, next) => {
        var sw: Switch = req['sw'];
        res.json(new resForm(null, sw));
    })

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
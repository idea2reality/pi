import swDb = require('../../../mongo/pi/switch/index');
import Switch = swDb.Switch;
import express = require('express');
import pi = require('../../../pi/index');
import ResForm = require('../../../util/resForm');


var router = express.Router();
router

    .get('/', (req, res, next) => {
        var sw: Switch = req['sw'];

        res.json(new ResForm(null, sw));
    })

    .post('/control', (req, res, next) => {
        var sw: Switch = req['sw'];
        var value = req.body['value'];

        // Buffer which will be sent to raspberry pi
        var buff;
        if (value)
            buff = new Buffer([sw.tcp.on]);
        else
            buff = new Buffer([sw.tcp.off]);
        // Send buffer to raspberry pi
        pi.write(buff, (err) => {
            // Send response to client
            if (err)
                res.json(new ResForm(err,
                    {
                        _id: sw._id,
                        value: value,
                        msg: err.message
                    }));
            else
                res.json(new ResForm(null,
                    {
                        _id: sw._id,
                        value: value
                    }));
        });

    });

export = router;
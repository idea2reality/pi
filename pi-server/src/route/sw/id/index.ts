import swDb = require('../../../mongo/pi/switch/index');
import swLogDb = require('../../../mongo/pi/swLog/index');
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
        var newVal = req.body['value'];

        // Buffer which will be sent to raspberry pi
        var buff;

        if (newVal)
            buff = new Buffer([sw.tcp.on]);
        else
            buff = new Buffer([sw.tcp.off]);

        // Send buffer to raspberry pi
        pi.write(buff, (err) => {
            // Send response to client, and insert a log
            if (err)
                res.json(new ResForm(err,
                    {
                        _id: sw._id,
                        value: newVal,
                        msg: err.message
                    }));
            else {
                res.json(new ResForm(null,
                    {
                        _id: sw._id,
                        value: newVal
                    }));
                // Insert a log
                swLogDb.insert(new swLogDb.Log(sw._id, !newVal, newVal), (err) => {
                    console.log('+++ One switch log inserted - ' + sw._id + ': ' + !newVal + ' -> ' + newVal);
                });
            }
        });

    });

export = router;
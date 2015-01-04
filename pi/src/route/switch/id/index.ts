import express = require('express');

var router = express.Router();
router

    .post('/control', (req, res, next) => {
        var value = req.body['value'];


    });

export = router;
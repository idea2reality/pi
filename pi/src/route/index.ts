import express = require('express');
import configAll = require('../config');
import config = configAll.web;

var router = express.Router();
router

    .use('/', express.static(config.distFolder))

    .use('/bower', express.static(config.bowerFolder))

    .use('/sw', require('./sw/index'))

export = router;
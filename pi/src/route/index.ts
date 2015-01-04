import express = require('express');
import configAll = require('../config');
import config = configAll.web;

var router = express.Router();
router

    .use('/', express.static(config.distFolder))

    .use('/bower', express.static(config.bowerFolder))

    .use('/switch', require('./switch/index'))

export = router;
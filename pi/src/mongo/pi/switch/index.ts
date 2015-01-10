/**
 * Handle general switch actions
 */

import mongodb = require('mongodb');
import pi = require('../index');

var db: mongodb.Db;
export var coll: mongodb.Collection;

export function startUp(_db: mongodb.Db, callback: (err: Error) => void) {
    db = _db;

    db.collection('switch', (err, _coll) => {
        if (err) return callback(err);

        coll = _coll;
        console.log('+++ Collection "switch" is ready');
        //switchFns.

        callback(null);
    });
}

export function insert(data: Object, callback) {

}


import switchFns = require('./switch');
export var sw = switchFns;
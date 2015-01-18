/**
 * Handle single switch actions
 */
import mongodb = require('mongodb');
import ObjectID = mongodb.ObjectID;
import Db = mongodb.Db;
import Collection = mongodb.Collection;
import pi = require('../index');
import schema = require('../schema');
import Switch = schema.Switch;

var db: Db = pi.db;
var coll: Collection = db.collection('switch');
console.log('+++ Collection "switch" switch module loaded');



export function insertLog() {

}



export function findOne(_id: string, callback: (err: Error, sw: Switch) => void)
export function findOne(_id: ObjectID, callback: (err: Error, sw: Switch) => void)
export function findOne(_id: any, callback: (err: Error, sw: Switch) => void) {
    if (typeof _id == 'string')
        _id = new ObjectID(_id);

    coll.findOne({ _id: _id }, (err, result) => {
        if (err) return callback(err, null);

        callback(null, result);
    });
}

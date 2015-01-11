/**
 * Handle single switch actions
 */
import mongodb = require('mongodb');
import Db = mongodb.Db;
import Collection = mongodb.Collection;
import main = require('./index');
import pi = require('../index');

var db: Db = pi.db;
var coll: Collection = db.collection('switch');
console.log('+++ Collection "switch" switch module loaded');



export function insertLog() {

}

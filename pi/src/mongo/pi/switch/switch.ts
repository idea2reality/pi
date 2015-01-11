/**
 * Handle single switch actions
 */
import mongodb = require('mongodb');
import Db = mongodb.Db;
import Collection = mongodb.Collection;
import index = require('./index');

var coll: Collection;



export function insertLog() {

}



// Get collection
index.getCollection((_coll) => {
    coll = _coll;
    console.log('+++ Collection "switch" module "switch" is ready');
});
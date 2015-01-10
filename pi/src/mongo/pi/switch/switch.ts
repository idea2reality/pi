/**
 * Handle single switch actions
 */

export function insertLog() {

}

import index = require('./index');
var coll = index.coll;
console.log(coll);
setTimeout(() => {
    console.log('safsad');
    console.log(coll);
}, 500);

console.log('+++ Switch collection module');
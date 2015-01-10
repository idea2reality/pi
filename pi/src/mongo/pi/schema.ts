import extend = require('extend');
import mongodb = require('mongodb');
import ObjectID = mongodb.ObjectID;

export class Switch {
    _id: ObjectID;                      // auto-created mongo db object id
    name: string;                       // name of switch
    gid: number;                        // LED group id
    did: number;                        // LED device id
    tcp: { on: number; off: number; };  // tcp protocol which will be sent to raspberry pi

    constructor(data) {

    }
}

export class Log {
    _id: ObjectID;              // references Switch._id
    date: Date;
    oldValue: boolean;
    newValue: boolean;

    constructor(data: Object)
    constructor(_id: string, oldValue: boolean, newValue: boolean)
    constructor(_id: ObjectID, oldValue: boolean, newValue: boolean)
    constructor(...args: any[]) {
        var data;

        var _id;
        var oldValue;
        var newValue;
        var date = new Date();

        // If number of arguments is 1
        if (args.length == 1) {
            if (typeof args[0] == 'object') {
                data = args[0];
                extend(this, data);
            }
        }
        // If number of arguments is 3
        else if (args.length == 3) {
            var err: Error;

            // Check _id
            if (typeof args[0] == 'string')
                _id = new ObjectID(args[0]);
            else if (typeof args[0] == 'object')
                _id = args[0];
            else
                err = new Error('Log constructor: _id should be string or ObjectID');

            // Check oldValue
            if (typeof args[1] == 'boolean')
                oldValue = args[1];
            else
                err = new Error('Log constructor: oldValue should be boolean');

            // Check newValue
            if (typeof args[2] == 'boolean')
                newValue = args[2];
            else
                err = new Error('Log constructor: newValue should be boolean');

            if (err)
                throw err;
        }
        // Otherwise throw error
        else {
            throw new Error('Log constructor: Invalid number of arguments');
        }
    }
}
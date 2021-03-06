﻿import extend = require('extend');
import mongodb = require('mongodb');
import ObjectID = mongodb.ObjectID;

export interface ISwConData {
    name: string;
    gid: number;
    did: number;
    tcp: { on: number; off: number; };
}

export class Switch {
    _id: ObjectID;                      // auto-created mongo db object id
    name: string;                       // name of switch
    gid: number;                        // LED group id
    did: number;                        // LED device id
    tcp: { on: number; off: number; };  // tcp protocol which will be sent to raspberry pi

    constructor(data: ISwConData) {
        extend(this, data);
        this._id = new ObjectID();
    }
}

export interface ILogConData {
    _id: any;           // string or ObjectID
    oldValue: boolean;
    newValue: boolean;
}

export class Log {
    _id: Date;
    swId: ObjectID;              // references Switch._id
    oldValue: boolean;
    newValue: boolean;

    constructor(data: ILogConData)
    constructor(swId: string, oldValue: boolean, newValue: boolean)
    constructor(swId: ObjectID, oldValue: boolean, newValue: boolean)
    constructor(...args: any[]) {
        var errHeader = 'Log contructor: ';

        var data: ILogConData;

        // Properties which will be stored in mongodb
        var swId;
        var oldValue;
        var newValue;
        var date = new Date();

        // If number of arguments is 1
        if (args.length == 1) {
            if (typeof args[0] == 'object') {
                data = args[0];

                // Check _id
                if (typeof data._id == 'string')
                    data._id = new ObjectID(data._id);

                // Date should be current date
                data['date'] = date;

                // Merge
                extend(this, data);
            }
        }
        // If number of arguments is 3
        else if (args.length == 3) {
            var err: Error;

            // Check _id
            if (typeof args[0] == 'string')
                swId = new ObjectID(args[0]);
            else if (typeof args[0] == 'object')
                swId = args[0];
            else
                err = new Error(errHeader + '_id should be string or ObjectID');

            // Check oldValue
            if (typeof args[1] == 'boolean')
                oldValue = args[1];
            else
                err = new Error(errHeader + 'oldValue should be boolean');

            // Check newValue
            if (typeof args[2] == 'boolean')
                newValue = args[2];
            else
                err = new Error(errHeader + 'newValue should be boolean');

            if (err)
                throw err;

            // Write properties
            this.swId = swId;
            this._id = date;
            this.oldValue = oldValue;
            this.newValue = newValue;
        }
        // Otherwise throw error
        else {
            throw new Error(errHeader + 'Invalid number of arguments');
        }
    }
}
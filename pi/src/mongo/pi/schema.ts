import mongodb = require('mongodb');
import ObjectID = mongodb.ObjectID;

export class Switch {
    _id: ObjectID;
    name: string;
    logs: Log[];

    constructor(data) {

    }
}

export class Log {
    date: Date;
    oldValue: boolean;
    newValue: boolean;
}
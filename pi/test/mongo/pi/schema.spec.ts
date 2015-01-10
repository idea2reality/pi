/// <reference path="../../../scripts/typings/should/should.d.ts" />
/// <reference path="../../../scripts/typings/mocha/mocha.d.ts" />

import mongodb = require('mongodb');
import ObjectID = mongodb.ObjectID;
import should = require('should');
import schema = require('../../../src/mongo/pi/schema');
import Log = schema.Log;
import LogConstructorData = schema.LogConstructorData;

describe('MongoDB pi schema', () => {
    describe('Class Log', () => {
        it('should create object with data', () => {
            var data: LogConstructorData = {
                _id: new ObjectID(),
                oldValue: true,
                newValue: false
            }

            var log = new Log(data);

            should(log)
                .have.properties('_id', 'date', 'oldValue', 'newValue');
        });

        it('should create object with specific arguments', () => {
            var oldValue = true;
            var newValue = false;

            var log = new Log(new ObjectID(), oldValue, newValue);

            should(log)
                .have.properties('_id', 'date', 'oldValue', 'newValue');

            log.oldValue.should.equal(oldValue);
            log.newValue.should.equal(newValue);
        });
    });
});
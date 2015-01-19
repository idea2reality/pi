/// <reference path="../../../scripts/typings/should/should.d.ts" />
/// <reference path="../../../scripts/typings/mocha/mocha.d.ts" />
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var should = require('should');
var schema = require('../../../src/mongo/pi/schema');
var Log = schema.Log;
describe('MongoDB pi schema', function () {
    describe('Class Log', function () {
        it('should create object with data', function () {
            var data = {
                _id: new ObjectID(),
                oldValue: true,
                newValue: false
            };
            var log = new Log(data);
            should(log).have.properties('_id', 'date', 'oldValue', 'newValue');
        });
        it('should create object with specific arguments', function () {
            var oldValue = true;
            var newValue = false;
            var log = new Log(new ObjectID(), oldValue, newValue);
            should(log).have.properties('_id', 'date', 'oldValue', 'newValue');
            log.oldValue.should.equal(oldValue);
            log.newValue.should.equal(newValue);
        });
    });
});
//# sourceMappingURL=schema.spec.js.map
import async = require('async');
import pi = require('./pi/index');

export function connect(callback: (err) => void) {
    async.parallel({
        pi: (callback) => {
            pi.connect((err) => {
                callback(err);
            });
        }
    },
        (err, results) => {
            console.log('+++ Mongodb connected');
            callback(err);
        });
}
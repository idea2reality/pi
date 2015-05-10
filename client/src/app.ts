/// <reference path="../scripts/_references.d.ts" />

// Parse command line arguments
require('./argv');

import tcp = require('./tcp/main');
import serial = require('./serial/main');
import chromium = require('./chromium/main');

tcp.connect();
tcp.onData((data)=>serial.write(data, (err)=> {
        if (err)
            tcp.write(new Buffer([1]));
        else
            tcp.write(new Buffer([0]));
    })
);

tcp.onConnect(()=>{
    chromium.run();
});

serial.open();

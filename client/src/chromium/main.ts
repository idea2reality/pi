/// <reference path="../../scripts/_references.d.ts" />
import childProc = require('child_process');

export function run() {
    childProc.exec('chromium --kiosk --incognito --display=:0 http://ktj7147.iptime.org', (err, stdout, stderr)=> {
        if (err)
            return console.log(err);

        console.log('+++ Chromium started');
    });
}
import net = require('net');

var client = new net.Socket();
client.connect(9090, '172.30.1.53', function () {
    console.log('Connected');

    var buff = new Buffer([0x04]);
    client.write(buff);
    console.log('write complete');

    client.destroy();
    console.log('client destroy');
});

client.on('data', function (data) {
    console.log('Received: ' + data);
    client.destroy(); // kill client after server's response
});

client.on('close', function () {
    console.log('Connection closed');
});
use pi

db.switch.drop();

var sw1 = {
    name: '안방',
    gid: 1,
    did: 250,
    tcp: {
        on: [2, 1, 1, 0x10, 100, 100, 100, 84, 3],
        off: [2, 1, 1, 0x10, 0, 0, 0, 84, 3]
    }
};


var sw2 = {
    name: '거실',
    gid: 1,
    did: 250,
    tcp: {
        on: [2, 1, 1, 0x10, 100, 100, 100, 84, 3],
        off: [2, 1, 1, 0x10, 0, 0, 0, 84, 3]
    }
};


var sw3 = {
    name: '주방',
    gid: 1,
    did: 250,
    tcp: {
        on: [2, 1, 1, 0x10, 100, 100, 100, 84, 3],
        off: [2, 1, 1, 0x10, 0, 0, 0, 84, 3]
    }
};


var sw4 = {
    name: '현관',
    gid: 1,
    did: 250,
    tcp: {
        on: [2, 1, 1, 0x10, 100, 100, 100, 84, 3],
        off: [2, 1, 1, 0x10, 0, 0, 0, 84, 3]
    }
};


db.switch.insert(sw1);
db.switch.insert(sw2);
db.switch.insert(sw3);
db.switch.insert(sw4);

db.switch.find().pretty();

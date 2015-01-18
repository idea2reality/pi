use pi

db.switch.drop();

var sw1 = {
    name: 'Switch 1',
    gid: 1,
    did: 250,
    tcp: {
        on: 1,
        off: 3
    }
};

var sw2 = {
    name: 'Switch 2',
    gid: 2,
    did: 250,
    tcp: {
        on: 2,
        off: 4
    }
};

db.switch.insert(sw1);
db.switch.insert(sw2);

db.switch.find().pretty();

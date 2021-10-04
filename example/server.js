'use strict';

const { RpcServer } = require('../').server;
const { ZookeeperRegistry } = require('../').registry;
const logger = console;

const registry = new ZookeeperRegistry({
    logger,
    address: '119.45.31.41:2181',
});

const server = new RpcServer({
    logger,
    registry,
    port: 12200,
});

server.addService(
    {
        interfaceName: 'com.nodejs.test.TestService',
    },
    {
        async plus(a, b) {
            return a + b;
        },
    }
);

server.start().then(() => {
    server.publish();
    setInterval(() => {
        console.log(process.memoryUsage().heapUsed);
    }, 50000);
});

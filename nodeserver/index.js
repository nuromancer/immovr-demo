var server = require("./server"); // import module server.js
var router = require("./router"); // import module router.js

server.start(router.route);


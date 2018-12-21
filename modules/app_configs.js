const fs = require("fs");
let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
exports.Config = config;
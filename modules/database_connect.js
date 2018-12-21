const mySql = require('mysql');
const config = require('./app_configs').Config;

exports.connection_settings = {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
};

const con = mySql.createConnection(exports.connection_settings);
exports.connection = con;
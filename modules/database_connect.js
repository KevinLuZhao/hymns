const mySql = require('mysql');

exports.connection_settings = {
    host: "localhost",
    user: "zlu",
    password: "Jacob2007",
    database: "hymns"
};

const con = mySql.createConnection(exports.connection_settings);
exports.connection = con;
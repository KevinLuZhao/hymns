const mySql = require('mysql');
const con = mySql.createConnection({
    host: "localhost",
    user: "zlu",
    password: "Jacob2007",
    database: "hymns"
});


//const exports = module.exports;
exports.connection = con;
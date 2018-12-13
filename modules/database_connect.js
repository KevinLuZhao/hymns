const mySql = require('mysql');
const con = mySql.createConnection({
    host: "localhost",
    user: "zlu",
    password: "Jacob2007",
    database: "hymns"
});

con.connect((err)=>{
    if (err) console.log(err);
})
//const exports = module.exports;
exports.connection = con;
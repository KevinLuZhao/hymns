//const mySql = require('mysql');
const db = require('./database_connect');
//const exports = module.exports;

var con = db.connection;
con.connect((err)=>{
    if (err) console.log(err);
})
con.query('SELECT * FROM hymns.category', (err, rows, fields)=>{
    con.end();
    //console.log(rows);
    exports.Categories = rows;
});
const db = require('./database_connect');
var con = db.connection;
con.connect((err)=>{
    if (err) console.log(err);
})
con.query('SELECT * FROM hymns.category_list', (err, rows, fields)=>{
    con.end();
    exports.Categories = rows;
});
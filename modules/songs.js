const db = require('./database_connect');
var con = db.connection;
let input ='aa';
let query = `SELECT * FROM hymns.songs WHERE name like '%${input}%'`;
con.query(query, (err, rows, fields)=>{
    console.log(rows);
    //ret = rows;
});

const GetSongList = function(input){
    //con.connect();
    //let query = `SELECT * FROM hymns.songs WHERE name like '%${input}%'`;
    let query = 'SELECT * FROM hymns.songs';
    let ret;
    console.log(query)
    con.query('SELECT * FROM hymns.category', (err, rows, fields)=>{
        console.log(rows);
        ret = rows;
    });
    //con.end();
    return ret;
}

exports.GetSongList=GetSongList;

//https://hk.saowen.com/a/50b9f161376d7900a19a0baefb0e378907b1c1ba07bffb21c7d1c4034683db16

//https://KevinLuZhao:Jacob2007@github.com/KevinLuZhao/hymns.git 
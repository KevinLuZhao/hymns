const db = require('./database_connect');
//var con = db.connection;
const mySql = require('mysql');
const GetSongList = function(input){
    console.log("Into GetSongList function.")
    return new Promise(function (resolve, reject) {
        const con = mySql.createConnection({
            host: "localhost",
            user: "zlu",
            password: "Jacob2007",
            database: "hymns"
        });

        let query = `SELECT * FROM hymns.songs WHERE name like '%${input}%'`;
        let ret;
        con.query(query, (err, rows, fields)=>{
            if (err) {
                console.log(err);
                reject(err);
            }
            else if(rows){
                //console.log(rows);
                resolve(rows);
            }
            //con.end();
        });
    });
}
exports.GetSongList=GetSongList;

//https://hk.saowen.com/a/50b9f161376d7900a19a0baefb0e378907b1c1ba07bffb21c7d1c4034683db16

//https://KevinLuZhao:Jacob2007@github.com/KevinLuZhao/hymns.git 
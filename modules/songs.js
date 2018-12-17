const db = require('./database_connect');
const mySql = require('mysql');

const SearchSongs = function(id, term){
    return new Promise(function (resolve, reject) {
        const con = mySql.createConnection(db.connection_settings);
        let query;
        if (id>0){
            query = `SELECT name FROM hymns.songs WHERE category_id=${id} AND name LIKE '%${term}%'`;
        }
        else{
            query = `SELECT name FROM hymns.songs WHERE name LIKE '%${term}%'`;
        }
        let ret;
        con.query(query, (err, rows, fields)=>{
            if (err) {
                console.log(err);
                reject(err);
            }
            else if(rows){
                let arr = [];
                rows.forEach(row => {
                    arr.push(row.name);
                });
                resolve(arr);
            }
            con.end();
        });
    });
}

const GetSongByName = function(name){
    return new Promise(function (resolve, reject) {
        const con = mySql.createConnection(db.connection_settings);

        let query = `SELECT name, content FROM hymns.songs WHERE name = '${name}'`;
        let ret;
        con.query(query, (err, rows, fields)=>{
            if (err) {
                console.log(err);
                reject(err);
            }
            else if(rows){
                resolve(rows[0]);
            }
            con.end();
        });
    });
}
exports.GetSongList=SearchSongs;
exports.GetSongByName=GetSongByName;

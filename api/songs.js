const db = require('./database_connect');
const mySql = require('mysql');

const SearchSongs = function(id, term){
    return new Promise(function (resolve, reject) {
        const con = mySql.createConnection(db.connection_settings);
        let query;
        if (id>0){
            query = `SELECT CONCAT(song_code, ':', (CASE WHEN TitleCN IS NULL THEN '' ELSE TitleCN END), (CASE WHEN TitleEN IS NULL THEN '' ELSE concat(' ',TitleEN) END)) name FROM hymns.song_list WHERE category_id=${id} AND (song_code LIKE '%${term}%' OR TitleCN LIKE '%${term}%' OR TitleEN LIKE '%${term}%')`;
        }
        else{
            query = `SELECT CONCAT(song_code, ':', (CASE WHEN TitleCN IS NULL THEN '' ELSE TitleCN END), (CASE WHEN TitleEN IS NULL THEN '' ELSE concat(' ',TitleEN) END)) name FROM hymns.song_list WHERE song_code LIKE '%${term}%' OR TitleCN LIKE '%${term}%' OR TitleEN LIKE '%${term}%'`;
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

        let query = `SELECT * FROM hymns.song_list WHERE name = '${name}'`;
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

const GetSong = function(songCode){
    return new Promise(function (resolve, reject) {
        try{
            var promiseSong = new Promise(function (resolve, reject) {
                const con = mySql.createConnection(db.connection_settings);
                let query = `SELECT *, CONCAT(c.NameCN, ' ', c.NameEN) category FROM hymns.song_list s INNER JOIN hymns.category_list c ON s.category_id=c.id WHERE song_code = '${songCode}'`;
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
            var song;
            promiseSong.then((result)=>{
                song = {
                    SongCode: result.song_code,
                    Category: result.category,
                    TitleCN: result.TitleCN,
                    TitleEN: result.TitleEN,
                    Content: []
                }
        
                var promiseSongContents = new Promise(function(resolve,reject){
                    const con = mySql.createConnection(db.connection_settings);
                    let query = `SELECT * FROM song_content WHERE song_code = '${songCode}'`
                    con.query(query, (err, rows, fields)=>{
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        else if(rows){
                            resolve(rows);
                        }
                        con.end();
                    });
                });
                promiseSongContents.then((rows)=>{
                    let currentChapter = 0;
                    var arrChapterNum = rows.map(o=>o.chapter).unique();
                    arrChapterNum.forEach((chapterNo)=>{
                        let chapter={
                            ChapterNo: chapterNo,
                            VerseRows: [],
                            ChorusRows: []
                        }
        
                        verseRows = rows.filter(o=>(o.chapter==chapterNo)&&(o.type=='Verse')); 
                        verseRows.forEach((row)=>{
                            let contentRow ={
                                RowNo: row.row_num,
                                Content_CN: row.content_cn,
                                Content_EN: row.content_en
                            }
                            chapter.VerseRows.push(contentRow);
                        });
        
                        chorusRows = rows.filter(o=>(o.chapter==chapterNo)&&(o.type=='Chorus')); 
                        chorusRows.forEach((row)=>{
                            let contentRow ={
                                RowNo: row.row_num,
                                Content_CN: row.content_cn,
                                Content_EN: row.content_en
                            }
                            chapter.ChorusRows.push(contentRow);
                        });
        
                        song.Content.push(chapter);
                    })
                    
                    resolve(song);          
                });
            });
        
            Array.prototype.unique = function() {
                return this.filter(function (value, index, self) { 
                  return self.indexOf(value) === index;
                });
            }
        }
        catch(err){
            reject(err);
        }
    });
}

exports.GetSongList=SearchSongs;
exports.GetSongByName=GetSongByName;
exports.GetSong=GetSong;

const db = require('./database_connect');
const mySql = require('mysql');

const SearchSongs = function(id, term){
    return new Promise(function (resolve, reject) {
        const con = mySql.createConnection(db.connection_settings);
        let query;
        if (term == null){
            //Now just consider get all songs list with category 1
            query = `SELECT CONCAT(SongID, ':', (CASE WHEN TitleCN IS NULL THEN '' ELSE TitleCN END), (CASE WHEN TitleEN IS NULL THEN '' ELSE concat(' ',TitleEN) END)) name FROM hymns.song_titles WHERE category_id=${id}`;
        }
        if (id>0){
            query = `SELECT CONCAT(SongID, ':', (CASE WHEN TitleCN IS NULL THEN '' ELSE TitleCN END), (CASE WHEN TitleEN IS NULL THEN '' ELSE concat(' ',TitleEN) END)) name FROM hymns.song_titles WHERE category_id=${id} AND (SongID LIKE '%${term}%' OR TitleCN LIKE '%${term}%' OR TitleEN LIKE '%${term}%')`;
        }
        else{
            query = `SELECT CONCAT(SongID, ':', (CASE WHEN TitleCN IS NULL THEN '' ELSE TitleCN END), (CASE WHEN TitleEN IS NULL THEN '' ELSE concat(' ',TitleEN) END)) name FROM hymns.song_titles WHERE SongID LIKE '%${term}%' OR TitleCN LIKE '%${term}%' OR TitleEN LIKE '%${term}%'`;
        }
        //let ret;
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

const AdvancedSearchSongs = function(term){
    return new Promise(function(resolve, reject){
        const con = mySql.createConnection(db.connection_settings);
        let query;
        if (term != null){
            /*query = `SELECT DISTINCT t.SongID, (CASE WHEN TitleCN IS NULL THEN '' ELSE TitleCN END) TitleCN, (CASE WHEN TitleEN IS NULL THEN '' ELSE TitleEN END) TitleEN, ContentCN, ContentEN
            FROM    hymns.song_titles t INNER JOIN hymns.song_contents c ON t.SongID=c.SongID
            WHERE   TitleCN LIKE '%${term}%' OR TitleEN LIKE '%${term}%' 
                    OR ContentCN LIKE '%${term}%' OR ContentEN LIKE '%${term}%'`;*/
            query = `SELECT DISTINCT t.SongID, (CASE WHEN TitleCN IS NULL THEN '' ELSE TitleCN END) TitleCN, (CASE WHEN TitleEN IS NULL THEN '' ELSE TitleEN END) TitleEN, '' AS ContentCN, '' AS ContentEN
                    FROM    hymns.song_titles t INNER JOIN hymns.song_contents c ON t.SongID=c.SongID
                    WHERE   TitleCN LIKE '%${term}%' OR TitleEN LIKE '%${term}%' 
                    UNION
                    SELECT DISTINCT t.SongID, (CASE WHEN TitleCN IS NULL THEN '' ELSE TitleCN END) TitleCN, (CASE WHEN TitleEN IS NULL THEN '' ELSE TitleEN END) TitleEN, ContentCN, ContentEN
                    FROM    hymns.song_titles t INNER JOIN hymns.song_contents c ON t.SongID=c.SongID
                    WHERE   ContentCN LIKE '%${term}%' OR ContentEN LIKE '%${term}%'`;
            //console.log(query);
            con.query(query, (err, rows, fields)=>{
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else if(rows){
                    let results = [];
                    var result;
                    rows.forEach(row=>{
                        let resultExists = false;
                        results.forEach(result=> {
                            if (result.SongCode == row.SongID){
                                resultExists = true;
                                if (row.ContentCN!='')
                                    result.ContentCNItems.push(row.ContentCN);

                                if (row.ContentEN!='')
                                    result.ContentCNItems.push(row.ContentEN);
                            }
                        });
                        if (!resultExists){
                            result = {
                                SongCode: row.SongID,
                                Category: row.category,
                                TitleCN: row.TitleCN,
                                TitleEN: row.TitleEN,
                                ContentCNItems: [],
                                ContentENItems: []
                            }
                            if (row.ContentCN!='')
                                result.ContentCNItems.push(row.ContentCN);

                            if (row.ContentEN!='')
                                result.ContentCNItems.push(row.ContentEN);

                            results.push(result);
                        }                       
                    });
                    resolve(results);
                }
            });
            con.end();
        }
    });
}

const GetSong = function(songCode){
    return new Promise(function (resolve, reject) {
        try{
            var promiseSong = new Promise(function (resolve, reject) {
                const con = mySql.createConnection(db.connection_settings);
                let query = `SELECT *, CONCAT(c.NameCN, ' ', c.NameEN) category FROM hymns.song_titles s INNER JOIN hymns.category_list c ON s.category_id=c.id WHERE SongID = '${songCode}'`;
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
                    SongCode: result.SongID,
                    Category: result.category,
                    TitleCN: result.TitleCN,
                    TitleEN: result.TitleEN,
                    Content: []
                }
        
                var promiseSongContents = new Promise(function(resolve,reject){
                    const con = mySql.createConnection(db.connection_settings);
                    let query = `SELECT * FROM hymns.song_contents WHERE SongID = '${songCode}'`
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
                    var arrChapterNum = rows.map(o=>o.Chapter).unique();
                    arrChapterNum.forEach((chapterNo)=>{
                        let chapter={
                            ChapterNo: chapterNo,
                            VerseRows: [],
                            ChorusRows: []
                        }
        
                        verseRows = rows.filter(o=>(o.Chapter==chapterNo)&&(o.Type=='Verse')); 
                        verseRows.forEach((row)=>{
                            let contentRow ={
                                RowNo: row.row_num,
                                ContentCN: row.ContentCN,
                                ContentEN: row.ContentEN
                            }
                            chapter.VerseRows.push(contentRow);
                        });
        
                        chorusRows = rows.filter(o=>(o.Chapter==chapterNo)&&(o.Type=='Chorus')); 
                        chorusRows.forEach((row)=>{
                            let contentRow ={
                                RowNo: row.row_num,
                                ContentCN: row.ContentCN,
                                ContentEN: row.ContentEN
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
exports.GetSong=GetSong;
exports.GetAdvancedSearchResult=AdvancedSearchSongs;

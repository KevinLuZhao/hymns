/*currentChapterNo=1;
currentRowsType='Verse';
let CurrentSong;
const maxPageRows=4;*/

function SongLoader(song){
    SongContentPages = [];
    CurrentPageNo=0;
    maxPageRows=4;

    Song = song;
    //Rows that will show in one page, usually one chapter, if the chapter's row is less than maxPageRows
    buildSongContentPages(song) ;
    //}

    this.LoadTitle = function(){
        $("#divTitleLeft").html('<div>'+song.TitleCN+'</div>'+'<div>'+song.TitleEN+'</div>');
        $("#divTitleRight").html('<div>'+song.Category+'</div>'+'<div>'+song.SongCode+'</div>');
    }

    this.LoadContent = function(pageNo){
        let content="";
        page = SongContentPages.find(o=>o.PageNo==pageNo);
        page.Rows.forEach((row) => {
            if (row.Content_CN){
                content+='<div>'+row.Content_CN+'</div>'
            }
            if (row.Content_EN){
                content+='<div>'+row.Content_EN+'</div>'
            }
        });
        $("#divContent").html(content);
        $("#divFoot").html(page.ChapterNo);
        CurrentPageNo=pageNo;
    }

    this.LoadNextPageContent=function(){
        if (CurrentPageNo<SongContentPages.length-1){
            pageNo=CurrentPageNo+1;
        }
        else{
            pageNo=0;
        }
        this.LoadContent(pageNo);
    }

    this.LoadPrevPageContent=function(){
        if (CurrentPageNo>0){
            pageNo=CurrentPageNo-1;
        }
        else{
            pageNo=SongContentPages.length-1;
        }
        this.LoadContent(pageNo);
    }

    function buildSongContentPages(song) {
        let chapters=song.Content;
        let pageCounter = 0;
        let arrRowGroups=[];
        chapters.forEach((chapter)=>{
            arrRowGroups=arrRowGroups.concat(splitRowsToPageSizeGroup(chapter.VerseRows, chapter.ChapterNo));
            if (chapter.ChorusRows){
                arrRowGroups=arrRowGroups.concat(splitRowsToPageSizeGroup(chapter.ChorusRows, chapter.ChapterNo));
            }
        });
        arrRowGroups.forEach((pageRows)=>{
            page={
                ChapterNo:pageRows.ChapterNo,
                PageNo:pageCounter,
                Rows:pageRows.Rows
            };
            SongContentPages.push(page);
            pageCounter++;
        });
    }

    function splitRowsToPageSizeGroup(rows, chapterNo){
        let arrRowGroups=[];
        let arrRows=[];
        rowCounter=0;
        rows.forEach((row)=>{
            arrRows[rowCounter]=row;
            rowCounter++;
            
            if (arrRows.length==maxPageRows){
                pageRows={
                    ChapterNo:chapterNo,
                    Rows:arrRows
                };
                arrRowGroups.push(pageRows);
                arrRows=[];
                rowCounter=0;
            }
        });
        if(arrRows.length>0){
            pageRows={
                ChapterNo:chapterNo,
                Rows:arrRows
            };
            arrRowGroups.push(pageRows);
        }
        return arrRowGroups;
    }
}

exports=SongLoader;

/*LoadTitle = function(song){
    $("#divTitleLeft").html('<div>'+song.TitleCN+'</div>'+'<div>'+song.TitleEN+'</div>');
    $("#divTitleRight").html('<div>'+song.Category+'</div>'+'<div>'+song.SongCode+'</div>');
}

LoadNextPageContent=function(song){
    let currentChapter=song.Content.find(o=>o.ChapterNo==currentChapterNo);
    if (currentRowsType=='Verse' && currentChapter.ChorusRows){
        LoadContent(song, 'Chorus', currentChapterNo);
    }
    else{
        LoadContent(song, 'Verse', getNextChapterNo(song));
    }
}

LoadPrevPageContent=function(song){
    let currentChapter=song.Content.find(o=>o.ChapterNo==currentChapterNo);
    if (currentRowsType=='Chorus'){
        LoadContent(song, 'Verse', currentChapterNo);
    }
    else{
        if (currentChapter.ChorusRows){
            LoadContent(song, 'Chorus', getPrevChapterNo(song));
        }
        else{
            LoadContent(song, 'Verse', getPrevChapterNo(song));
        }
    }
}

LoadContent = function(song, rowsType, chapterNo){
    let chapter = song.Content.find(o=>o.ChapterNo==chapterNo);
    let rows;
    if (rowsType=='Verse'){
        rows=chapter.VerseRows;
    }
    else{
        rows=chapter.ChorusRows;
    }
    let content='';
    rows.sort((a,b)=>a.RowNo>b.RowNo);
    rows.forEach(row => {
        if (row.Content_CN){
            content+='<div>'+row.Content_CN+'</div>'
        }
        if (row.Content_EN){
            content+='<div>'+row.Content_EN+'</div>'
        }
    });
    $("#divContent").html(content);
    $("#divFoot").html(chapter.ChapterNo);
    currentChapterNo=chapterNo;
    currentRowsType=rowsType;
}

function getNextChapterNo(song){
    let maxNo = Math.max.apply(Math, song.Content.map(o=>o.ChapterNo));
    if (currentChapterNo<maxNo){
        return currentChapterNo+1;
    }
    else{
        return 1;
    }
}

function getPrevChapterNo(song){
    let maxNo = Math.max.apply(Math, song.Content.map(o=>o.ChapterNo));
    if (currentChapterNo>1){
        return currentChapterNo-1;
    }
    else{
        return maxNo;
    }
}*/
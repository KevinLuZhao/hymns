currentChapterNo=1;
currentRowsType='Verse';

LoadTitle = function(song){
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
}
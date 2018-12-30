function SongLoader(song){
    SongContentPages = [];
    CurrentPageNo=0;
    //maxPageRows=4;
    Song = song;
    buildSongContentPages(song) ;

    this.LoadTitle = function(){
        $("#divTitleLeft").html('<div>'+(song.TitleCN==null?'':song.TitleCN)+'</div>'+'<div>'+(song.TitleEN==null?'':song.TitleEN)+'</div>');
        $("#divTitleRight").html('<div>'+song.Category+'</div>'+'<div class="SongNo">'+song.SongCode.substring(1)+'</div>');
        $("#divHr").html('<hr class="thick"/>');
    }

    this.LoadContent = function(pageNo){
        let content="<center><table>";
        page = SongContentPages.find(o=>o.PageNo==pageNo);
        page.Rows.forEach((row) => {
            if (row.Content_CN){
                content+='<tr><td class="ChineseContent">'+row.Content_CN+'</td></tr>'
            }
            if (row.Content_EN){
                content+='<tr><td class="EnglishContent">'+row.Content_EN+'</td></tr>'
            }
            if (row==page.Rows[page.Rows.length-1]){
                content+='<tr><td><hr class="thick"></td></tr>'
            }
            else{
                content+='<tr><td><hr class="thin"></td></tr>'
            }
        });
        content+='</table></center>'
        $("#divContent").html(content);
        let maxChapterNo = Math.max.apply(Math, song.Content.map(o=>o.ChapterNo));
        $("#divContentRight").html('<p class="SongNo">'+page.ChapterNo+"/"+maxChapterNo+"</p>");
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
            if (chapter.ChorusRows&&chapter.ChorusRows.length>0){
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
        maxPageRows=4;
        if((rows[0].Content_CN==null)||(rows[0].Content_EN==null))
            maxPageRows=6;
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
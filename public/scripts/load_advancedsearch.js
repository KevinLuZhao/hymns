AdvancedSearchLoader = function(term){
    $.ajax({
        url: "http://localhost:3002/api/advancedsearch",
        type: 'post',
        dataType: 'JSON',
        data:{
            term: term
        },
        success: function( data ) {
            let result='';
            if (data.length==0){
                $("#divAdvancedSearchResult").html("<br/><br/><p>No song with '"+term+"' was found.</p>");
                return;
            }
            data.forEach(song => {
                if (song.TitleEN==null)
                { 
                    console.log('null');
                }
                let titleCn = song.TitleCN;
                if (titleCn=="NULL"){
                    titleCn='';
                }
                else{
                    titleCn=titleCn.replace(term, '<span style="color:red;">'+term+'</span>');
                }

                let titleEn = song.TitleEN;
                if (titleEn=="NULL"){
                    titleEn='';
                }
                else{
                    titleEn=titleEn.replace(term, '<span style="color:red;">'+term+'</span>');
                }

                result+='<p class="song_title">'+titleCn+'  '+(song.TitleEN=="NULL"?"":song.TitleEN)+' --- '+song.SongCode+'</p>';
                song.ContentCNItems.forEach(item=>{
                    if (item != "NULL"){
                        item = item.replace(term, '<span style="color:red;">'+term+'</span>');
                        result+='<p>'+item+'</p>';
                    }
                });
                song.ContentENItems.forEach(item=>{
                    if (item != "NULL"){
                        item = item.replace(term, '<span style="color:red;">'+term+'</span>');
                        result+='<p>'+item+'</p>';
                    }
                });
            });
            $("#divAdvancedSearchResult").html(result);             
        }
    });
}
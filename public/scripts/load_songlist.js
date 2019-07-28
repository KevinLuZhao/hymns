SongListLoader = function(rows){
    let content = '<table>'
    rows.forEach(row => {
        let songCode = row.substring(0, row.indexOf(':'));
        content += '<tr><td><a onclick=selectSong("'+songCode+'") >' + row +'</td></tr>';
    });
    content += '</table>'
    $("#divSongListContent").html(content);
}

function selectSong(songCode){
    $.ajax({
        url: "http://localhost:3002/api/song",
        type: 'post',
        dataType: 'JSON',
        data:{
            name: songCode
        },
        success: function( data ) {
            $("#divSearch").hide();
            $("#divMain").show();
            $("#divSongList").hide();
            songLoader = new SongLoader(data);
            songLoader.LoadTitle();
            songLoader.LoadContent(0);                   
        }
    });
}
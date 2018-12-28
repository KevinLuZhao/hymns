LoadDocument=function(){
    $.getJSON("http://localhost:3002/api/categories", {
        tags: "mount rainier",
        tagmode: "any",
        format: "json"
    }).done((data)=>{
        $("#ddlCategories").append("<option value=0 selected>All Songs</option>");
        $.each(data, function(key, value) {
            $("#ddlCategories").append("<option value="+value.id+">" + value.name + "</option>");
        });
    });

    $("#ddlCategories").focus();

    //ALT + h
    $(document).keydown(function(e) {
        if(e.altKey && e.keyCode == 72)
            $("#divSearch").hide("slow");
    });

    //ALT + s
    $(document).keydown(function(e) {
        if(e.altKey && e.keyCode == 83)
            $("#divSearch").show("slow");
    });

    $("#ddlCategories").change(()=>{
        let id = $("#ddlCategories").val();
        $("#ddlCategories option[value="+id+"]").attr('selected', 'selected');
    });

    $( "#txtName").keypress((e)=>{
        if (e.which == 13){
            let fullName = $('#txtName').val();
            let songCode = fullName.substring(0, fullName.indexOf(':'));
            $.ajax({
                url: "http://localhost:3002/api/song",
                type: 'post',
                dataType: 'JSON',
                data:{
                    name: songCode
                },
                success: function( data ) {
                    //$("#ddlCategories").focus();
                    /*LoadTitle(data);
                    LoadContent(data, 'Verse', 1)*/
                    $('#txtName').val("");
                    $("#divSearch").hide("slow");

                    //var clsSongLoader = require(".\load_song.js");
                    var songLoader = new SongLoader(data);
                    songLoader.LoadTitle();
                    songLoader.LoadContent(0);

                    $(document).keydown(function(e) {
                        if(e.keyCode == 33)
                            songLoader.LoadPrevPageContent();
                        if(e.keyCode == 34)
                            songLoader.LoadNextPageContent();
                    });
                }
            });
        }
    });
}
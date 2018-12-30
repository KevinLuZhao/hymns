LoadDocument=function(){
    let songLoader=null;
    $.getJSON("http://localhost:3002/api/categories", {
        tags: "mount rainier",
        tagmode: "any",
        format: "json"
    }).done((data)=>{
        $("#ddlCategories").append("<option value=0 selected>All Songs</option>");
        $.each(data, function(key, value) {
            $("#ddlCategories").append("<option value="+value.id+">" + value.NameEN + "</option>");
        });
    });

    $("#txtName").focus();

    $(document).keydown(function(e) {
        //ALT + h
        if(e.altKey && e.keyCode == 72){
            $("#divSearch").hide("slow");
        }
        //ALT + s
        if(e.altKey && e.keyCode == 83){
            $("#divSearch").show("slow");
            $("#txtName").focus();
        }
        //PageUp
        if(e.keyCode == 33 && songLoader){
            songLoader.LoadPrevPageContent();
        }
        //PageDown
        if(e.keyCode == 34 && songLoader)
            songLoader.LoadNextPageContent();
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
                    $("#txtName").focus();
                    $('#txtName').val("");
                    $("#divSearch").hide("slow");
                    songLoader = new SongLoader(data);
                    songLoader.LoadTitle();
                    songLoader.LoadContent(0);                   
                }
            });
        }
    });
}
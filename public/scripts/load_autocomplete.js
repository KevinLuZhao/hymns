LoadAutoComplete= function(){
    $( "#txtName").autocomplete({
        minLength: 2,
        source: function( request, response ) {
            $.ajax({
                url: "http://localhost:3002/api/songs",
                type: 'post',
                dataType: 'JSON',
                data:{
                    id: $('#ddlCategories option:selected').val(),
                    term: $('#txtName').val()
                },
                success: function( data ) {
                    response( data );
                }
            });
        },
        select: function (event, ui) {
            $('#txtName').val(ui.item.label); 
            return false;
        }
    });
}
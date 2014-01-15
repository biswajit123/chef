jQuery(document).ready(function($){
    $('#zipcode').val('');
    $('.addnew').on('click',function(){
        $(this).val("Please wait!");
        var data = {
            action: 'new_zip',
            zipcode: $('#zipcode').val()      // We pass php values differently!
        };
        // We can also pass the url value separately from ajaxurl for front end AJAX implementations
        jQuery.post(ajax_object.ajax_url, data, function(response) {
            //$('.zipupdate').val("Add it to availablity");
            alert(response);
            window.location.reload();

        });
    });

    $('.zipupdate').on('click',function(){
        $(this).val("Please wait!");
        var data = {
            action: 'update_zip',
            id: this.id ,     // We pass php values differently!
			zipValue: $(this).attr('zip')
        };
        // We can also pass the url value separately from ajaxurl for front end AJAX implementations
        jQuery.post(ajax_object.ajax_url, data, function(response) {
            //$('.zipupdate').val("Add it to availablity");
            alert(response);
            window.location.reload();

        });
    });

    $('.zipdelete').on('click',function(){
        $(this).val("Please wait!");
        var data = {
            action: 'delete_zip',
            id: this.id,      // We pass php values differently!
			zipValue: $(this).attr('zip')
        };
        // We can also pass the url value separately from ajaxurl for front end AJAX implementations
        jQuery.post(ajax_object.ajax_url, data, function(response) {
            alert(response);
            window.location.reload();

        });
    });
});
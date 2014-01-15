jQuery(document).ready(function($){
    var send_to_editor_backup = window.send_to_editor;
    var uploadfield = '';

    $('.upload_button').live('click', function() {
        uploadfield = $('.upload_field', $(this).parent());
        tb_show('Upload', 'media-upload.php?type=image&TB_iframe=true', false);

        return false;
    });

    window.send_to_editor = function(html) {
        if(uploadfield) {
            var image_url = $('img', html).attr('src');
            $(uploadfield).val(image_url);
            tb_remove();
        } else {
            window.send_to_editor = send_to_editor_backup(html);
        }
    }

   $('#TB_window').bind('tb_unload', function () {
        window.send_to_editor = send_to_editor_backup;
    });
});
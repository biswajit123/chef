<?php
add_action('init', 'mbpro_add_button_to_tinymce');
function mbpro_add_button_to_tinymce() {
	if (!current_user_can('edit_posts') && !current_user_can('edit_pages')) {
		return;
	}
	
	// Add only in rich editor mode (the Visual tab)
	if (get_user_option('rich_editing') == 'true') {
		add_filter('mce_external_plugins', 'mbpro_mce_external_plugins');
		add_filter('mce_buttons', 'mbpro_mce_buttons');
	}
}

function mbpro_mce_external_plugins($plugin_array) {
	$plugin_array['MaxButtons'] = MAXBUTTONS_PRO_PLUGIN_URL . '/tinymce/plugin.js';
	return $plugin_array;
}

function mbpro_mce_buttons($buttons) {
	array_push($buttons, '|', 'MaxButtons');
	return $buttons;
}
?>
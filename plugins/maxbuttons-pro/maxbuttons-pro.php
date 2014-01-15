<?php
/*
Plugin Name: MaxButtons Pro
Plugin URI: http://maxbuttons.com
Description: The ultimate WordPress button generator. If you have the free version, you should deactivate it when running the Pro version.
Version: 2.3.5
Author: Max Foundry
Author URI: http://maxfoundry.com

Copyright 2014 Max Foundry, LLC (http://maxfoundry.com)
*/

mbpro_set_global_paths();
mbpro_check_for_update();
mbpro_set_activation_hooks();

$mbpro_installed_version = get_option('MAXBUTTONS_PRO_VERSION_KEY');

function mbpro_set_global_paths() {
	$uploads = wp_upload_dir();
	
	define('MAXBUTTONS_PRO_VERSION_KEY', 'maxbuttons_pro_version');
	define('MAXBUTTONS_PRO_VERSION_NUM', '2.3.5');
	define('MAXBUTTONS_PRO_LICENSE_KEY', 'maxbuttons_pro_license_key');
	define('MAXBUTTONS_PRO_LICENSE_ACTIVATED', 'maxbuttons_pro_license_activated');
	define('MAXBUTTONS_PRO_PLUGIN_NAME', trim(dirname(plugin_basename(__FILE__)), '/'));
	define('MAXBUTTONS_PRO_PLUGIN_DIR', trim(plugin_dir_path(__FILE__), '/'));
	define('MAXBUTTONS_PRO_PLUGIN_URL', plugins_url() . '/' . MAXBUTTONS_PRO_PLUGIN_NAME);
	define('MAXBUTTONS_PRO_PACKS_DIR', $uploads['basedir'] . '/maxbuttons-pro/packs');
	define('MAXBUTTONS_PRO_PACKS_URL', $uploads['baseurl'] . '/maxbuttons-pro/packs');
	define('MAXBUTTONS_PRO_EXPORTS_DIR', $uploads['basedir'] . '/maxbuttons-pro/exports');
	define('MAXBUTTONS_PRO_EXPORTS_URL', $uploads['baseurl'] . '/maxbuttons-pro/exports');
}

function mbpro_check_for_update() {
	if (get_option(MAXBUTTONS_PRO_LICENSE_ACTIVATED) == 'yes') {
		if (get_option(MAXBUTTONS_PRO_LICENSE_KEY) != '') {
			require_once('wp-updates-plugin.php');
			new WPUpdatesPluginUpdater('http://wp-updates.com/api/1/plugin', 112, plugin_basename(__FILE__));
		}
	}
}

function mbpro_set_activation_hooks() {
	register_activation_hook(__FILE__, 'mbpro_register_activation_hook');
	register_deactivation_hook(__FILE__, 'mbpro_register_deactivation_hook');
}

function mbpro_register_activation_hook($network_wide) {	
	if ($network_wide) {
		mbpro_call_function_for_each_site('mbpro_activate');
	}
	else {
		mbpro_activate();
	}
}

function mbpro_activate() {
	mbpro_create_database_table();
	mbpro_create_packs_and_exports_folders();
	
	// This is to handle how button packs were stored in version 1.9.1 and earlier
	$old_packs_folder = MAXBUTTONS_PRO_PLUGIN_DIR . '/packs';
	$new_packs_folder = MAXBUTTONS_PRO_PACKS_DIR;
	mbpro_copy_existing_packs_to_uploads($old_packs_folder, $new_packs_folder);
	
	update_option(MAXBUTTONS_PRO_VERSION_KEY, MAXBUTTONS_PRO_VERSION_NUM);
}

function mbpro_register_deactivation_hook($network_wide) {	
	if ($network_wide) {
		mbpro_call_function_for_each_site('mbpro_deactivate');
	}
	else {
		mbpro_deactivate();
	}
}

function mbpro_deactivate() {
	delete_option(MAXBUTTONS_PRO_VERSION_KEY);
}

function mbpro_call_function_for_each_site($function) {
	global $wpdb;
	
	// Hold this so we can switch back to it
	$root_blog = $wpdb->blogid;
	
	// Get all the blogs/sites in the network and invoke the function for each one
	$blog_ids = $wpdb->get_col("SELECT blog_id FROM $wpdb->blogs");
	foreach ($blog_ids as $blog_id) {
		switch_to_blog($blog_id);
		call_user_func($function);
	}
	
	// Now switch back to the root blog
	switch_to_blog($root_blog);
}

add_action('init', 'mbpro_load_textdomain');
function mbpro_load_textdomain() {
	load_plugin_textdomain('maxbuttons-pro', false, dirname(plugin_basename(__FILE__)) . '/languages/');
}

add_filter('plugin_action_links', 'mbpro_plugin_action_links', 10, 2);
function mbpro_plugin_action_links($links, $file) {
	static $this_plugin;
	
	if (!$this_plugin) {
		$this_plugin = plugin_basename(__FILE__);
	}
	
	if ($file == $this_plugin) {
		$packs_label = __('Packs', 'maxbuttons-pro');
		$packs_link = '<a href="' . admin_url() . 'admin.php?page=maxbuttons-packs">' . $packs_label . '</a>';
		array_unshift($links, $packs_link);
		
		$buttons_label = __('Buttons', 'maxbuttons-pro');
		$buttons_link = '<a href="' . admin_url() . 'admin.php?page=maxbuttons-controller&action=buttons">' . $buttons_label . '</a>';
		array_unshift($links, $buttons_link);
	}

	return $links;
}

add_action('admin_menu', 'mbpro_admin_menu');
function mbpro_admin_menu() {
	$admin_pages = array();
	
	$page_title = __('MaxButtons Pro : Buttons', 'maxbuttons-pro');
	$menu_title = __('Buttons', 'maxbuttons-pro');
	$capability = 'manage_options';
	$menu_slug = 'maxbuttons-controller';
	$function = 'mbpro_controller';
	$icon_url = MAXBUTTONS_PRO_PLUGIN_URL . '/images/mb-16.png';
	add_menu_page($page_title, $menu_title, $capability, $menu_slug, $function, $icon_url);
	
	// We add this submenu page with the same slug as the parent to ensure we don't get duplicates
	$sub_menu_title = __('Buttons', 'maxbuttons-pro');
	$admin_pages[] = add_submenu_page($menu_slug, $page_title, $sub_menu_title, $capability, $menu_slug, $function);

	// Now add the submenu page for the Add New page
	$submenu_page_title = __('MaxButtons Pro : Add/Edit Button', 'maxbuttons-pro');
	$submenu_title = __('Add New', 'maxbuttons-pro');
	$submenu_slug = 'maxbuttons-button';
	$submenu_function = 'mbpro_button';
	$admin_pages[] = add_submenu_page($menu_slug, $submenu_page_title, $submenu_title, $capability, $submenu_slug, $submenu_function);
	
	// Now add the submenu page for the Packs page
	$submenu_page_title = __('MaxButtons Pro : Packs', 'maxbuttons-pro');
	$submenu_title = __('Packs', 'maxbuttons-pro');
	$submenu_slug = 'maxbuttons-packs';
	$submenu_function = 'mbpro_packs';
	$admin_pages[] = add_submenu_page($menu_slug, $submenu_page_title, $submenu_title, $capability, $submenu_slug, $submenu_function);
	
	// Now add the submenu page for the Export page
	$submenu_page_title = __('MaxButtons Pro : Export', 'maxbuttons-pro');
	$submenu_title = __('Export', 'maxbuttons-pro');
	$submenu_slug = 'maxbuttons-export';
	$submenu_function = 'mbpro_export';
	$admin_pages[] = add_submenu_page($menu_slug, $submenu_page_title, $submenu_title, $capability, $submenu_slug, $submenu_function);
	
	// Now add the submenu page for the Support page
	$submenu_page_title = __('MaxButtons Pro : Support', 'maxbuttons-pro');
	$submenu_title = __('Support', 'maxbuttons-pro');
	$submenu_slug = 'maxbuttons-support';
	$submenu_function = 'mbpro_support';
	$admin_pages[] = add_submenu_page($menu_slug, $submenu_page_title, $submenu_title, $capability, $submenu_slug, $submenu_function);
	
	// Now add the submenu page for the License page
	$submenu_page_title = __('MaxButtons Pro : License', 'maxbuttons-pro');
	$submenu_title = __('License', 'maxbuttons-pro');
	$submenu_slug = 'maxbuttons-license';
	$submenu_function = 'mbpro_license';
	$admin_pages[] = add_submenu_page($menu_slug, $submenu_page_title, $submenu_title, $capability, $submenu_slug, $submenu_function);
	
	foreach ($admin_pages as $admin_page) {
		add_action("admin_print_styles-{$admin_page}", 'mbpro_add_admin_styles');
		add_action("admin_print_scripts-{$admin_page}", 'mbpro_add_admin_scripts');
	}
}

function mbpro_controller() {
	include_once 'maxbuttons-controller.php';
}

function mbpro_button() {
	include_once 'maxbuttons-button.php';
}

function mbpro_packs() {
	include_once 'maxbuttons-packs.php';
}

function mbpro_export() {
	include_once 'maxbuttons-export.php';
}

function mbpro_support() {
	include_once 'maxbuttons-support.php';
}

function mbpro_license() {
	include_once 'maxbuttons-license.php';
}

function mbpro_add_admin_styles() {		
	wp_enqueue_style('thickbox');
	wp_enqueue_style('maxbuttons-css', MAXBUTTONS_PRO_PLUGIN_URL . '/styles.css');
	wp_enqueue_style('maxbuttons-colorpicker-css', MAXBUTTONS_PRO_PLUGIN_URL . '/js/colorpicker/css/colorpicker.css');
}

function mbpro_add_admin_scripts() {
	wp_enqueue_script('media-upload');
	wp_enqueue_script('jquery-ui-draggable');
	wp_enqueue_script('maxbuttons-colorpicker-js', MAXBUTTONS_PRO_PLUGIN_URL . '/js/colorpicker/colorpicker.js', array('jquery'));
	wp_enqueue_script('maxbuttons-modal', MAXBUTTONS_PRO_PLUGIN_URL . '/js/leanModal/jquery.leanModal.min.js', array('jquery'));
}

add_action('wp_print_scripts', 'mbpro_add_frontend_scripts');
function mbpro_add_frontend_scripts() {
	wp_enqueue_script('maxbuttons-js', MAXBUTTONS_PRO_PLUGIN_URL . '/js/maxbuttons.js', array('jquery'));
}

add_filter('upload_mimes', 'mbpro_upload_mimes');
function mbpro_upload_mimes($existing_mimes=array()) {
	$existing_mimes['zip'] = 'application/zip';
	return $existing_mimes;
}

function mbpro_create_database_table() {
	global $mbpro_installed_version;
	
	$table_name = mbpro_get_buttons_table_name();
	
	// IMPORTANT: There MUST be two spaces between the PRIMARY KEY keywords
	// and the column name, and the column name MUST be in parenthesis.
	$sql = "CREATE TABLE " . $table_name . " (
				id INT NOT NULL AUTO_INCREMENT,
				name VARCHAR(100) NULL,
				description VARCHAR(500) NULL,
				url VARCHAR(250) NULL,
				text VARCHAR(100) NULL,
				text_font_family VARCHAR(50) NULL,
				text_font_size VARCHAR(5) NULL,
				text_font_style VARCHAR(10) NULL,
				text_font_weight VARCHAR(10) NULL,
				text_align VARCHAR(10) NULL,
				text_padding_top VARCHAR(5) NULL,
				text_padding_bottom VARCHAR(5) NULL,
				text_padding_left VARCHAR(5) NULL,
				text_padding_right VARCHAR(5) NULL,
				text2 VARCHAR(100) NULL,
				text2_font_family VARCHAR(50) NULL,
				text2_font_size VARCHAR(5) NULL,
				text2_font_style VARCHAR(10) NULL,
				text2_font_weight VARCHAR(10) NULL,
				text2_align VARCHAR(10) NULL,
				text2_padding_top VARCHAR(5) NULL,
				text2_padding_bottom VARCHAR(5) NULL,
				text2_padding_left VARCHAR(5) NULL,
				text2_padding_right VARCHAR(5) NULL,
				text_color VARCHAR(10) NULL,
				text_color_hover VARCHAR(10) NULL,
				text_shadow_offset_left VARCHAR(5) NULL,
				text_shadow_offset_top VARCHAR(5) NULL,
				text_shadow_width VARCHAR(5) NULL,
				text_shadow_color VARCHAR(10) NULL,
				text_shadow_color_hover VARCHAR(10) NULL,
				border_radius_top_left VARCHAR(5) NULL,
				border_radius_top_right VARCHAR(5) NULL,
				border_radius_bottom_left VARCHAR(5) NULL,
				border_radius_bottom_right VARCHAR(5) NULL,
				border_style VARCHAR(10) NULL,
				border_width VARCHAR(5) NULL,
				border_color VARCHAR(10) NULL,
				border_color_hover VARCHAR(10) NULL,
				box_shadow_offset_left VARCHAR(5) NULL,
				box_shadow_offset_top VARCHAR(5) NULL,
				box_shadow_width VARCHAR(5) NULL,
				box_shadow_color VARCHAR(10) NULL,
				box_shadow_color_hover VARCHAR(10) NULL,
				gradient_start_color VARCHAR(10) NULL,
				gradient_start_color_hover VARCHAR(10) NULL,
				gradient_end_color VARCHAR(10) NULL,
				gradient_end_color_hover VARCHAR(10) NULL,
				gradient_stop VARCHAR(2) NULL,
				gradient_start_opacity VARCHAR(3) NULL,
				gradient_end_opacity VARCHAR(3) NULL,
				gradient_start_opacity_hover VARCHAR(3),
				gradient_end_opacity_hover VARCHAR(3),
				new_window VARCHAR(5) NULL,
				width VARCHAR(10) NULL,
				height VARCHAR(10) NULL,
				icon_url VARCHAR(250) NULL,
				icon_position VARCHAR(10) NULL,
				icon_padding_top VARCHAR(5) NULL,
				icon_padding_bottom VARCHAR(5) NULL,
				icon_padding_left VARCHAR(5) NULL,
				icon_padding_right VARCHAR(5) NULL,
				icon_width VARCHAR(5) NULL,
				icon_alt VARCHAR(50) NULL,
				container_enabled VARCHAR(5) NULL,
				container_width VARCHAR(5) NULL,
				container_margin_top VARCHAR(5) NULL,
				container_margin_right VARCHAR(5) NULL,
				container_margin_bottom VARCHAR(5) NULL,
				container_margin_left VARCHAR(5) NULL,
				container_alignment VARCHAR(25) NULL,
				container_center_div_wrap_enabled VARCHAR(5) NULL,
				nofollow VARCHAR(5) NULL,
				status VARCHAR(10) DEFAULT 'publish' NOT NULL,
				external_css VARCHAR(5) NULL,
				important_css VARCHAR(5) NULL,
				PRIMARY KEY  (id)
			);";

	if (!mbpro_database_table_exists($table_name)) {
		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		dbDelta($sql);
	}
	
	if (mbpro_database_table_exists($table_name) && $mbpro_installed_version != MAXBUTTONS_PRO_VERSION_NUM) {
		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		dbDelta($sql);
	}
}

function mbpro_get_buttons_table_name() {
	global $wpdb;
	return $wpdb->prefix . 'maxbuttons_buttons';
}

function mbpro_database_table_exists($table_name) {
	global $wpdb;
	return strtolower($wpdb->get_var("SHOW TABLES LIKE '$table_name'")) == strtolower($table_name);
}

function mbpro_strip_px($value) {
	return rtrim($value, 'px');
}

function mbpro_strip_zip_extension($value) {
	return rtrim($value, '.zip');
}

function mbpro_starts_with($haystack, $needle) {
	$length = strlen($needle);
	return (substr($haystack, 0, $length) === $needle);
}

function mbpro_string_contains($haystack, $needle) {
	// Notice the use of the === operator
	if (strpos($haystack, $needle) === false) {
		return false;
	}
	
	return true;
}

function mbpro_get_api_url() {
	if (mbpro_url_contains('localhost')) {
		return 'http://localhost/maxbuttons/api/api.php';
	}
	
	return 'http://maxbuttons.com/api/api.php';
}

function mbpro_get_cart_url() {
	if (mbpro_url_contains('localhost')) {
		return 'http://localhost/maxbuttons/shop/cart/';
	}
	
	return 'http://maxbuttons.com/shop/cart/';
}

function mbpro_url_contains($string) {
	$url = mbpro_get_url();
	return mbpro_string_contains($url, $string);
}

function mbpro_get_url() {
	$url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://';
	$url .= $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];	
	return $url;
}

function mbpro_get_button($id) {
	global $wpdb;
	return $wpdb->get_row($wpdb->prepare("SELECT * FROM " . mbpro_get_buttons_table_name() . " WHERE id = %d", $id));
}

function mbpro_get_published_buttons() {
	global $wpdb;
	return $wpdb->get_results("SELECT * FROM " . mbpro_get_buttons_table_name() . " WHERE status <> 'trash'");
}

function mbpro_get_published_buttons_count() {
	global $wpdb;
	return $wpdb->get_var("SELECT COUNT(*) FROM " . mbpro_get_buttons_table_name() . " WHERE status <> 'trash'");
}

function mbpro_get_trashed_buttons() {
	global $wpdb;
	return $wpdb->get_results("SELECT * FROM " . mbpro_get_buttons_table_name() . " WHERE status = 'trash'");
}

function mbpro_get_trashed_buttons_count() {
	global $wpdb;
	return $wpdb->get_var("SELECT COUNT(*) FROM " . mbpro_get_buttons_table_name() . " WHERE status = 'trash'");
}

function mbpro_button_restore($id) {
	global $wpdb;
	$wpdb->query($wpdb->prepare("UPDATE " . mbpro_get_buttons_table_name() . " SET status = 'publish' WHERE id = %d", $id));
}

function mbpro_button_move_to_trash($id) {
	global $wpdb;
	$wpdb->query($wpdb->prepare("UPDATE " . mbpro_get_buttons_table_name() . " SET status = 'trash' WHERE id = %d", $id));
}

function mbpro_button_delete_permanently($id) {
	global $wpdb;
	$wpdb->query($wpdb->prepare("DELETE FROM " . mbpro_get_buttons_table_name() . " WHERE id = %d", $id));
}

function mbpro_update_button_icon_width($id, $icon_width) {
	global $wpdb;
	$wpdb->query($wpdb->prepare("UPDATE " . mbpro_get_buttons_table_name() . " SET icon_width = %s WHERE id = %d", $icon_width, $id));
}

function mbpro_get_image_width_from_url($image_url) {
	$size = getimagesize($image_url);
	$width = $size[0] . 'px';
	return $width;
}

function mbpro_create_packs_and_exports_folders() {
	$uploads = wp_upload_dir();
	
	$maxbuttons_pro_dir = $uploads['basedir'] . '/maxbuttons-pro';
	$packs_dir = $maxbuttons_pro_dir . '/packs';
	$exports_dir = $maxbuttons_pro_dir . '/exports';
	
	// Check to create the maxbuttons-pro folder in the uploads directory
	if (!file_exists($maxbuttons_pro_dir) and !is_dir($maxbuttons_pro_dir)) {
		mkdir($maxbuttons_pro_dir);         
	}
	
	// Check to create the packs folder in the maxbuttons-pro uploads folder
	if (!file_exists($packs_dir) and !is_dir($packs_dir)) {
		mkdir($packs_dir);         
	}
	
	// Check to create the exports folder in the maxbuttons-pro uploads folder
	if (!file_exists($exports_dir) and !is_dir($exports_dir)) {
		mkdir($exports_dir);         
	}
}

function mbpro_copy_existing_packs_to_uploads($old_packs_folder, $new_packs_folder) { 	
	// Only continue if the old packs folder exists
	if (file_exists($old_packs_folder) and is_dir($old_packs_folder)) {
		$dir = opendir($old_packs_folder);
		@mkdir($new_packs_folder);

		while (($file = readdir($dir)) !== false) {
			if (($file != '.') && ($file != '..')) {
				if (is_dir($old_packs_folder . '/' . $file)) {
					// Recursive call
					mbpro_copy_existing_packs_to_uploads($old_packs_folder . '/' . $file, $new_packs_folder . '/' . $file);
				}
				else {
					copy($old_packs_folder . '/' . $file, $new_packs_folder . '/' . $file);
				}
			}
		}
		
		closedir($dir);
	}
} 

function mbpro_log_me($message) {
    if (WP_DEBUG === true) {
        if (is_array($message) || is_object($message)) {
            error_log(print_r($message, true));
        } else {
            error_log($message);
        }
    }
}

function mbpro_hex2rgba($color, $opacity) {
	// Grab the hex color and remove #
	$hex = str_replace("#", "", $color);

	// Convert hex to rgb
	if(strlen($color) == 3) {
		// If in the #fff variety
		$r = hexdec(substr($hex, 0, 1).substr($hex, 0, 1));
		$g = hexdec(substr($hex, 1, 1).substr($hex, 1, 1));
		$b = hexdec(substr($hex, 2, 1).substr($hex, 2, 1));
	} else {
		// If in the #ffffff variety
		$r = hexdec(substr($hex, 0, 2));
		$g = hexdec(substr($hex, 2, 2));
		$b = hexdec(substr($hex, 4, 2));
	}
	
	// The array of rgb values
	$rgb_array = array($r, $g, $b);
	
	// Catch for opacity when the button has not been saved
	if($opacity == '') {
		$alpha = 1;
	} else {
		// Alpha value in decimal when an opacity has been set
		$alpha = $opacity / 100;
	}

	// The rgb values separated by commas
	$rgb = implode(", ", $rgb_array);
	
	// Spits out rgba(0, 0, 0, 0.5) format
	return 'rgba(' . $rgb . ', ' . $alpha . ')';
}

$mbpro_nonce_activate_license = array(
	'action' => 'mbpro_activate_license',
	'name' => 'mbpro_activate_license'
);

$mbpro_nonce_all_in_one_offer = array(
	'action' => 'mbpro_all_in_one_offer',
	'name' => 'mbpro_all_in_one_offer'
);

add_action('wp_ajax_mbpro_activate_license', 'mbpro_activate_license');
add_action('wp_ajax_nopriv_mbpro_activate_license', 'mbpro_activate_license');
function mbpro_activate_license() {
	global $mbpro_nonce_activate_license;
	
	$result = '';
	
	if (isset($_POST) && check_admin_referer($mbpro_nonce_activate_license['action'], $mbpro_nonce_activate_license['name'])) {
		$api_action = $_POST['api_action'];
		$license_key = $_POST['license_key'];
		$license_url = $_POST['license_url'];
		
		$api_url = mbpro_get_api_url();
		
		$params = array(
			'body' => array(
				'api_action' => $api_action,
				'license_key' => $license_key,
				'license_url' => $license_url
			)
		);
		
		$response = wp_remote_post($api_url, $params);
		
		if (is_wp_error($response) || $response['response']['code'] != 200) {
			$result = 'error';
		}
		else {
			$contents = wp_remote_retrieve_body($response);
			$data = json_decode($contents, true);
			
			if ($data['result'] == 1) {
				update_option(MAXBUTTONS_PRO_LICENSE_KEY, $data['license_key']);
				update_option(MAXBUTTONS_PRO_LICENSE_ACTIVATED, 'yes');
				$result = 'success';
			}
			else {
				$result = 'error';
			}
		}

		echo $result;
		die();
	}
}

add_action('wp_ajax_mbpro_all_in_one_offer', 'mbpro_all_in_one_offer');
add_action('wp_ajax_nopriv_mbpro_all_in_one_offer', 'mbpro_all_in_one_offer');
function mbpro_all_in_one_offer() {
	global $mbpro_nonce_all_in_one_offer;
	
	$result = '';
	
	if (isset($_POST) && check_admin_referer($mbpro_nonce_all_in_one_offer['action'], $mbpro_nonce_all_in_one_offer['name'])) {
		$api_action = $_POST['api_action'];
		
		$api_url = mbpro_get_api_url();
		
		$params = array(
			'body' => array(
				'api_action' => $api_action
			)
		);
		
		$response = wp_remote_post($api_url, $params);
		
		if (is_wp_error($response) || $response['response']['code'] != 200) {
			$result = 'error';
		}
		else {
			$result = wp_remote_retrieve_body($response);
		}

		echo $result;
		die();
	}
}

add_filter('widget_text', 'do_shortcode');
include_once 'maxbuttons-shortcode.php';
include_once 'maxbuttons-shopp.php';
include_once 'maxbuttons-tinymce.php';

?>
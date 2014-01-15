<?php
require('../../../wp-load.php');
require('../../../wp-admin/includes/image.php');
require('../../../wp-admin/includes/media.php');

if (!function_exists('download_url')) {
	require('../../../wp-admin/includes/file.php');
}

global $wpdb;

if ($_POST) {
	$pack_name = stripslashes($_POST['pack_name']);
	$pack_description = stripslashes($_POST['pack_description']);
	$pack_author = stripslashes($_POST['pack_author']);
	$pack_author_url = stripslashes($_POST['pack_author_url']);
	
	// Build the WHERE clause to get the buttons
	$where = '';	
	foreach ($_POST as $key => $value) {
		if (mbpro_starts_with($key, 'maxbutton_')) {
			$where .= 'id = ' . $value . ' OR ';
		}
	}
	
	if ($where != '') {
		// Remove the last 4 chars, which is the trailing ' OR '
		$where = substr($where, 0, -4);
		
		// Get the buttons
		$export_buttons = $wpdb->get_results("SELECT * FROM " . mbpro_get_buttons_table_name() . " WHERE " . $where);
	}
	
	// Get the pack name by replacing spaces with dashes and stripping out any
	// special chars by only accepting letters, numbers, underscores, and dashes
	$pack_name = str_replace(' ', '-', $pack_name);
	$pack_name = preg_replace('/[^a-zA-Z0-9_-]/s', '', $pack_name);
	$pack_name = strtolower($pack_name);
	
	// Create the pack folder in the exports folder
	$pack_folder = MAXBUTTONS_PRO_EXPORTS_DIR . '/' . $pack_name . '/';
	mkdir($pack_folder);
	
	// The root node
	$xml = '<maxbuttons>';
	
	// Pack element and attributes
	$xml .= '<pack ';
	$xml .= 'name="' . stripslashes($_POST['pack_name']) . '" ';
	$xml .= 'description="' . $pack_description . '" ';
	$xml .= 'author="' . $pack_author . '" ';
	$xml .= 'author_url="' . $pack_author_url . '" ';
	$xml .= '/>';
	
	// Build elements and attributes for each button
	foreach ($export_buttons as $b) {
		$xml .= '<maxbutton ';
		$xml .= 'name="' . htmlspecialchars($b->name) . '" ';
		$xml .= 'description="' . htmlspecialchars($b->description) . '" ';
		$xml .= 'url="' . htmlspecialchars($b->url) . '" ';
		$xml .= 'width="' . $b->width . '" ';
		$xml .= 'height="' . $b->height . '" ';
		
		if ($b->icon_url != '') {
			// Download temp file and remove its extension
			$temp_file = download_url($b->icon_url);
			
			// If the result of download_url() is an object, then we know it's the WP_Error object most likely
			// caused by an HTTP 404 error when trying to download the icon. If that happens, we just ignore it.
			if (!is_object($temp_file)) {
				$temp_file_no_ext = substr($temp_file, 0, -3);
				
				// Rename temp file with extension from icon
				$icon_ext = substr($b->icon_url, -3, 3);
				$temp_file_new = $temp_file_no_ext . $icon_ext;
				rename($temp_file, $temp_file_new);
				
				// Copy the file into the pack folder and delete the original
				copy($temp_file_new, $pack_folder . basename($temp_file_new));
				unlink($temp_file_new);
				
				// Put the basename of the file into the XML
				$xml .= 'icon_url="' . basename($temp_file_new) . '" ';
			}
		}
		else {
			$xml .= 'icon_url="' . $b->icon_url . '" ';
		}
		
		$xml .= 'icon_position="' . $b->icon_position . '" ';
		$xml .= 'icon_padding_top="' . $b->icon_padding_top . '" ';
		$xml .= 'icon_padding_bottom="' . $b->icon_padding_bottom . '" ';
		$xml .= 'icon_padding_left="' . $b->icon_padding_left . '" ';
		$xml .= 'icon_padding_right="' . $b->icon_padding_right . '" ';
		$xml .= 'icon_alt="' . htmlspecialchars($b->icon_alt) . '" ';
		$xml .= 'text="' . htmlspecialchars($b->text) . '" ';
		$xml .= 'text_font_family="' . $b->text_font_family . '" ';
		$xml .= 'text_font_size="' . $b->text_font_size . '" ';
		$xml .= 'text_font_style="' . $b->text_font_style . '" ';
		$xml .= 'text_font_weight="' . $b->text_font_weight . '" ';
		$xml .= 'text_align="' . $b->text_align . '" ';
		$xml .= 'text_padding_top="' . $b->text_padding_top . '" ';
		$xml .= 'text_padding_bottom="' . $b->text_padding_bottom . '" ';
		$xml .= 'text_padding_left="' . $b->text_padding_left . '" ';
		$xml .= 'text_padding_right="' . $b->text_padding_right . '" ';
		$xml .= 'text2="' . htmlspecialchars($b->text2) . '" ';
		$xml .= 'text2_font_family="' . $b->text2_font_family . '" ';
		$xml .= 'text2_font_size="' . $b->text2_font_size . '" ';
		$xml .= 'text2_font_style="' . $b->text2_font_style . '" ';
		$xml .= 'text2_font_weight="' . $b->text2_font_weight . '" ';
		$xml .= 'text2_align="' . $b->text2_align . '" ';
		$xml .= 'text2_padding_top="' . $b->text2_padding_top . '" ';
		$xml .= 'text2_padding_bottom="' . $b->text2_padding_bottom . '" ';
		$xml .= 'text2_padding_left="' . $b->text2_padding_left . '" ';
		$xml .= 'text2_padding_right="' . $b->text2_padding_right . '" ';
		$xml .= 'text_color="' . $b->text_color . '" ';
		$xml .= 'text_color_hover="' . $b->text_color_hover . '" ';
		$xml .= 'text_shadow_offset_left="' . $b->text_shadow_offset_left . '" ';
		$xml .= 'text_shadow_offset_top="' . $b->text_shadow_offset_top . '" ';
		$xml .= 'text_shadow_width="' . $b->text_shadow_width . '" ';
		$xml .= 'text_shadow_color="' . $b->text_shadow_color . '" ';
		$xml .= 'text_shadow_color_hover="' . $b->text_shadow_color_hover . '" ';
		$xml .= 'border_radius_top_left="' . $b->border_radius_top_left . '" ';
		$xml .= 'border_radius_top_right="' . $b->border_radius_top_right . '" ';
		$xml .= 'border_radius_bottom_left="' . $b->border_radius_bottom_left . '" ';
		$xml .= 'border_radius_bottom_right="' . $b->border_radius_bottom_right . '" ';
		$xml .= 'border_style="' . $b->border_style . '" ';
		$xml .= 'border_width="' . $b->border_width . '" ';
		$xml .= 'border_color="' . $b->border_color . '" ';
		$xml .= 'border_color_hover="' . $b->border_color_hover . '" ';
		$xml .= 'box_shadow_offset_left="' . $b->box_shadow_offset_left . '" ';
		$xml .= 'box_shadow_offset_top="' . $b->box_shadow_offset_top . '" ';
		$xml .= 'box_shadow_width="' . $b->box_shadow_width . '" ';
		$xml .= 'box_shadow_color="' . $b->box_shadow_color . '" ';
		$xml .= 'box_shadow_color_hover="' . $b->box_shadow_color_hover . '" ';
		$xml .= 'gradient_start_color="' . $b->gradient_start_color . '" ';
		$xml .= 'gradient_start_color_hover="' . $b->gradient_start_color_hover . '" ';
		$xml .= 'gradient_end_color="' . $b->gradient_end_color . '" ';
		$xml .= 'gradient_end_color_hover="' . $b->gradient_end_color_hover . '" ';
		$xml .= 'gradient_start_opacity="' . $b->gradient_start_opacity . '" '; 
		$xml .= 'gradient_end_opacity="' . $b->gradient_end_opacity . '" ';
		$xml .= 'gradient_start_opacity_hover="' . $b->gradient_start_opacity_hover . '" '; 
		$xml .= 'gradient_end_opacity_hover="' . $b->gradient_end_opacity_hover . '" '; 
		$xml .= 'gradient_stop="' . $b->gradient_stop . '" ';
		$xml .= 'new_window="' . $b->new_window . '" ';
		$xml .= 'nofollow="' . $b->nofollow . '" ';
		$xml .= 'container_enabled="' . $b->container_enabled . '" ';
		$xml .= 'container_width="' . $b->container_width . '" ';
		$xml .= 'container_margin_top="' . $b->container_margin_top . '" ';
		$xml .= 'container_margin_right="' . $b->container_margin_right . '" ';
		$xml .= 'container_margin_bottom="' . $b->container_margin_bottom . '" ';
		$xml .= 'container_margin_left="' . $b->container_margin_left . '" ';
		$xml .= 'container_alignment="' . $b->container_alignment . '" ';
		$xml .= 'container_center_div_wrap_enabled="' . $b->container_center_div_wrap_enabled . '" ';
		$xml .= '/>';
	}
	
	// Close the root node
	$xml .= '</maxbuttons>';
	
	// Write xml to file
	$file_name = $pack_name . '.xml';
	$file_path = $pack_folder . $file_name;
	$file_handle = fopen($file_path, 'w');
	fwrite($file_handle, $xml);
	fclose($file_handle);
	
	// Start creating the zip file
	$zip = new ZipArchive();
	$zip_overwrite = 1;
	$zip_archive = MAXBUTTONS_PRO_EXPORTS_DIR . '/' . $pack_name . '.zip';
	$zip_archive_url = MAXBUTTONS_PRO_EXPORTS_URL . '/' . $pack_name . '.zip';
	
	if($zip->open($zip_archive, $zip_overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) === true)
	{
		// This is the root folder inside the zip archive
		$zip_root_folder = $pack_name . '/';
		$zip->addEmptyDir($zip_root_folder);
		
		// Get files recursively
		$files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($pack_folder));

		// Add each file to the zip archive in the root folder
		foreach ($files as $file) {
			$file = str_replace('\\', '/', realpath($file));
			if (is_file($file) === true) {
				if ($file != '.' && $file != '..') {
					$zip->addFile($file, $zip_root_folder . basename($file));
				}
			}
		}

		$zip->close();
	}
	
	// Now delete the folder
	mbpro_delete_folder($pack_folder);
	
	// And finally set the zip file for download
	header('Content-type: application/zip');
	header('Content-disposition: attachment; filename="' . $pack_name . '.zip"');
	readfile($zip_archive_url);
}

function mbpro_delete_folder($dir) {
	if (is_dir($dir)) {
		$objects = scandir($dir);
		foreach ($objects as $object) {
			if ($object != '.' && $object != '..') {
				if (filetype($dir . '/' . $object) == 'dir') {
					// Recursive call to delete the folder
					mbpro_delete_folder($dir . '/' . $object);
				}
				else {
					// Delete the file
					unlink($dir . '/' . $object);
				}
			}
		}
		
		reset($objects);
		rmdir($dir);
	}
}
?>
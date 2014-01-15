<?php
include_once 'maxbuttons-constants.php';
?>

<script type="text/javascript">
	function showButtonCount(count) {
		jQuery("#maxbuttons h3.button-count").html("Buttons (" + count + ")");
	}
	
	function showMessage() {
		jQuery("#maxbuttons .message").show();
	}
	
	function copyButton(buttonId) {
		// Copy the form values to the fields that will be picked up by the action page
		jQuery("#<?php echo $maxbutton_name_key ?>").val(jQuery("#maxbutton_name_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_description_key ?>").val(jQuery("#maxbutton_description_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_url_key ?>").val(jQuery("#maxbutton_url_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_new_window_key ?>").val(jQuery("#maxbutton_new_window_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_nofollow_key ?>").val(jQuery("#maxbutton_nofollow_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_width_key ?>").val(jQuery("#maxbutton_width_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_height_key ?>").val(jQuery("#maxbutton_height_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_icon_url_key ?>").val(jQuery("#maxbutton_icon_url_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_icon_position_key ?>").val(jQuery("#maxbutton_icon_position_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_icon_padding_top_key ?>").val(jQuery("#maxbutton_icon_padding_top_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_icon_padding_bottom_key ?>").val(jQuery("#maxbutton_icon_padding_bottom_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_icon_padding_left_key ?>").val(jQuery("#maxbutton_icon_padding_left_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_icon_padding_right_key ?>").val(jQuery("#maxbutton_icon_padding_right_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_icon_alt_key ?>").val(jQuery("#maxbutton_icon_alt_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text_key ?>").val(jQuery("#maxbutton_text_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text_font_family_key ?>").val(jQuery("#maxbutton_text_font_family_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text_font_size_key ?>").val(jQuery("#maxbutton_text_font_size_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text_font_style_key ?>").val(jQuery("#maxbutton_text_font_style_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text_font_weight_key ?>").val(jQuery("#maxbutton_text_font_weight_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text_align_key ?>").val(jQuery("#maxbutton_text_align_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text_padding_top_key ?>").val(jQuery("#maxbutton_text_padding_top_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text_padding_bottom_key ?>").val(jQuery("#maxbutton_text_padding_bottom_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text_padding_left_key ?>").val(jQuery("#maxbutton_text_padding_left_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text_padding_right_key ?>").val(jQuery("#maxbutton_text_padding_right_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text2_key ?>").val(jQuery("#maxbutton_text2_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text2_font_family_key ?>").val(jQuery("#maxbutton_text2_font_family_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text2_font_size_key ?>").val(jQuery("#maxbutton_text2_font_size_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text2_font_style_key ?>").val(jQuery("#maxbutton_text2_font_style_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text2_font_weight_key ?>").val(jQuery("#maxbutton_text2_font_weight_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text2_align_key ?>").val(jQuery("#maxbutton_text2_align_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text2_padding_top_key ?>").val(jQuery("#maxbutton_text2_padding_top_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text2_padding_bottom_key ?>").val(jQuery("#maxbutton_text2_padding_bottom_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text2_padding_left_key ?>").val(jQuery("#maxbutton_text2_padding_left_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text2_padding_right_key ?>").val(jQuery("#maxbutton_text2_padding_right_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text_shadow_offset_left_key ?>").val(jQuery("#maxbutton_text_shadow_offset_left_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text_shadow_offset_top_key ?>").val(jQuery("#maxbutton_text_shadow_offset_top_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text_shadow_width_key ?>").val(jQuery("#maxbutton_text_shadow_width_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_border_radius_top_left_key ?>").val(jQuery("#maxbutton_border_radius_top_left_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_border_radius_top_right_key ?>").val(jQuery("#maxbutton_border_radius_top_right_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_border_radius_bottom_left_key ?>").val(jQuery("#maxbutton_border_radius_bottom_left_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_border_radius_bottom_right_key ?>").val(jQuery("#maxbutton_border_radius_bottom_right_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_border_style_key ?>").val(jQuery("#maxbutton_border_style_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_border_width_key ?>").val(jQuery("#maxbutton_border_width_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_box_shadow_offset_left_key ?>").val(jQuery("#maxbutton_box_shadow_offset_left_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_box_shadow_offset_top_key ?>").val(jQuery("#maxbutton_box_shadow_offset_top_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_box_shadow_width_key ?>").val(jQuery("#maxbutton_box_shadow_width_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_gradient_stop_key ?>").val(jQuery("#maxbutton_gradient_stop_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text_color_key ?>").val(jQuery("#maxbutton_text_color_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text_color_hover_key ?>").val(jQuery("#maxbutton_text_color_hover_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text_shadow_color_key ?>").val(jQuery("#maxbutton_text_shadow_color_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_text_shadow_color_hover_key ?>").val(jQuery("#maxbutton_text_shadow_color_hover_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_gradient_start_color_key ?>").val(jQuery("#maxbutton_gradient_start_color_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_gradient_start_color_hover_key ?>").val(jQuery("#maxbutton_gradient_start_color_hover_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_gradient_end_color_key ?>").val(jQuery("#maxbutton_gradient_end_color_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_gradient_end_color_hover_key ?>").val(jQuery("#maxbutton_gradient_end_color_hover_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_gradient_start_opacity_key ?>").val(jQuery("#maxbutton_gradient_start_opacity_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_gradient_end_opacity_key ?>").val(jQuery("#maxbutton_gradient_end_opacity_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_gradient_start_opacity_hover_key ?>").val(jQuery("#maxbutton_gradient_start_opacity_hover_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_gradient_end_opacity_hover_key ?>").val(jQuery("#maxbutton_gradient_end_opacity_hover_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_border_color_key ?>").val(jQuery("#maxbutton_border_color_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_border_color_hover_key ?>").val(jQuery("#maxbutton_border_color_hover_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_box_shadow_color_key ?>").val(jQuery("#maxbutton_box_shadow_color_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_box_shadow_color_hover_key ?>").val(jQuery("#maxbutton_box_shadow_color_hover_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_container_enabled_key ?>").val(jQuery("#maxbutton_container_enabled_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_container_width_key ?>").val(jQuery("#maxbutton_container_width_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_container_margin_top_key ?>").val(jQuery("#maxbutton_container_margin_top_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_container_margin_right_key ?>").val(jQuery("#maxbutton_container_margin_right_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_container_margin_bottom_key ?>").val(jQuery("#maxbutton_container_margin_bottom_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_container_margin_left_key ?>").val(jQuery("#maxbutton_container_margin_left_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_container_alignment_key ?>").val(jQuery("#maxbutton_container_alignment_" + buttonId).val());
		jQuery("#<?php echo $maxbutton_container_center_div_wrap_enabled_key ?>").val(jQuery("#maxbutton_container_center_div_wrap_enabled_" + buttonId).val());
		
		// Now submit the form
		jQuery("#pack-form").submit();
	}
</script>

<div id="maxbuttons">
	<div class="wrap">
		<div class="icon32">
			<a href="http://maxbuttons.com" target="_blank"><img src="<?php echo MAXBUTTONS_PRO_PLUGIN_URL ?>/images/mb-32.png" alt="MaxButtons" /></a>
		</div>
		
		<h2 class="title"><?php _e('MaxButtons Pro: Button Pack', 'maxbuttons-pro') ?></h2>
		
		<div class="logo">
			<?php _e('Brought to you by', 'maxbuttons-pro') ?>
			<a href="http://maxfoundry.com" target="_blank"><img src="<?php echo MAXBUTTONS_PRO_PLUGIN_URL ?>/images/max-foundry.png" alt="Max Foundry" /></a>
			<?php printf(__('makers of %sMaxGalleria%s and %sMaxInbound%s', 'maxbuttons-pro'), '<a href="http://maxgalleria.com/?ref=mbpro" target="_blank">', '</a>', '<a href="http://maxinbound.com/?ref=mbpro" target="_blank">', '</a>') ?>
		</div>
		
		<div class="clear"></div>
		
		<div class="main">
			<h2 class="tabs">
				<span class="spacer"></span>
				<a class="nav-tab nav-tab-active" href=""><?php _e('Button Pack', 'maxbuttons-pro') ?></a>
			</h2>

			<form id="pack-form" method="post" action="<?php echo admin_url() ?>admin.php?page=maxbuttons-controller&action=button">
				<?php
				if (isset($_GET['id']) && $_GET['id'] != '') {
					$pack = $_GET['id'];
					
					if (is_dir(MAXBUTTONS_PRO_PACKS_DIR . '/' . $pack)) {
						$pack_file = MAXBUTTONS_PRO_PACKS_DIR . '/' . $pack . '/' . $pack . '.xml';
						$pack_img_file = MAXBUTTONS_PRO_PACKS_DIR . '/' . $pack . '/pack.png';
						$pack_img_url = MAXBUTTONS_PRO_PACKS_URL . '/' . $pack . '/pack.png';
						$default_img_url = MAXBUTTONS_PRO_PLUGIN_URL . '/images/default-pack.png';

						if (file_exists($pack_file)) {
							// Load the pack xml file
							$xml = simplexml_load_file($pack_file);
							
							echo '<div class="pack-meta">';
							
							// Show the title image
							if (file_exists($pack_img_file)) {
								echo '<img src="' . $pack_img_url . '" alt="" width="120" height="90" />';
							}
							else {
								echo '<img src="' . $default_img_url . '" alt="" width="120" height="90" />';
							}
							
							// Show the pack name, author, description
							foreach ($xml->pack as $p) {

								printf(__('%sName: %s', 'maxbuttons-pro'), '<strong>', $p['name'] . '</strong>');

								if ($p['author'] != '') {
									$author = '<h4>By: ';
									
									if ($p['author_url'] != '') {
										$author .= '<a href="' . $p['author_url'] . '" target="_blank">' . $p['author'] . '</a>';
									}
									else {
										$author .= $p['author'];
									}
									
									$author .= '</h4>';
									echo $author;
								}
								
								echo '<p>' . $p['description'] . '</p>';
								printf(__('%sDelete This Pack%s', 'maxbuttons-pro'), '<p><a href="' . admin_url() . 'admin.php?page=maxbuttons-controller&action=pack-delete&id=' . $pack . '">', '</a></p>');
							}
							
							echo '</div>';
							echo '<div class="clear"></div>';
							
							printf(__('%sButtons%s', 'maxbuttons-pro'), '<h3 class="button-count">', '</h3>');
							
							// Show the buttons in the pack
							echo '<div class="button-list">';
							echo '<table cellpadding="0" cellspacing="0" width="100%">';
							echo '<tr>';
							printf(__('%sButton%s', 'maxbuttons-pro'), '<th>', '</th>');
							printf(__('%sName and Description%s', 'maxbuttons-pro'), '<th>', '</th>');
							printf(__('%sActions%s', 'maxbuttons-pro'), '<th>', '</th>');
							echo '</tr>';
							
							$counter = 1;
							
							foreach ($xml->maxbutton as $button) {
								$icon_url = '';
								$icon_width = '';
								
								if ($button['icon_url'] != '') {
									$icon_url = MAXBUTTONS_PRO_PACKS_URL . '/' . $pack . '/' . $button['icon_url'];
									$icon_width = mbpro_get_image_width_from_url($icon_url);
								}
								
								if ($button['gradient_stop'] != '') {
									$gradient_stop = strlen($button['gradient_stop']) == 1 ? '0' . $button['gradient_stop'] : $button['gradient_stop'];
								} else {
									$gradient_stop = '45'; // Default
								}
								
								$css_id = 'a.maxbutton-' . $counter;
								$css_id_hover = 'a.maxbutton-' . $counter . ':hover';
								$element_id = 'maxbutton-' . $counter;
								
								echo '<tr>';
								echo '<td>';
								echo '<script type="text/javascript">';
								echo 'mbpro_loadFontFamilyStylesheet("' . $button['text_font_family'] . '");';
								echo 'mbpro_loadFontFamilyStylesheet("' . $button['text2_font_family'] . '");';
								echo '</script>';
								echo '<style type="text/css">' . "\n";
								echo $css_id . ' { text-decoration: none; }' . "\n";
								echo $css_id . ' { color: ' . $button['text_color'] . '; }' . "\n";
								echo $css_id . ' .maxbutton { width: ' . $button['width'] . '; }' . "\n";
								echo $css_id . ' .maxbutton { height: ' . $button['height'] . '; }' . "\n";
								echo $css_id . ' .maxbutton { background-color: ' . $button['gradient_start_color'] . '; }' . "\n";
								//echo $css_id . ' .maxbutton { background: linear-gradient(' . $button['gradient_start_color'] . ' ' . $gradient_stop . '%, ' . $button['gradient_end_color'] . '); }' . "\n";
								//echo $css_id . ' .maxbutton { background: -moz-linear-gradient(' . $button['gradient_start_color'] . ' ' . $gradient_stop . '%, ' . $button['gradient_end_color'] . '); }' . "\n";
								//echo $css_id . ' .maxbutton { background: -o-linear-gradient(' . $button['gradient_start_color'] . ' ' . $gradient_stop . '%, ' . $button['gradient_end_color'] . '); }' . "\n";
								//echo $css_id . ' .maxbutton { background: -webkit-gradient(linear, left top, left bottom, color-stop(.' . $gradient_stop . ', ' . $button['gradient_start_color'] . '), color-stop(1, ' . $button['gradient_end_color'] . ')); }' . "\n";

								// Gradients
								$gradient_start_color = mbpro_hex2rgba($button['gradient_start_color'], $button['gradient_start_opacity']);
								$gradient_end_color = mbpro_hex2rgba($button['gradient_end_color'], $button['gradient_end_opacity']);

								echo $css_id . ' .maxbutton { background: linear-gradient(' . $gradient_start_color . ' ' . $gradient_stop . '%, ' . $gradient_end_color . '); }' . "\n";
								echo $css_id . ' .maxbutton { background: -moz-linear-gradient(' . $gradient_start_color . ' ' . $gradient_stop . '%, ' . $gradient_end_color . '); }' . "\n";
								echo $css_id . ' .maxbutton { background: -o-linear-gradient(' . $gradient_start_color . ' ' . $gradient_stop . '%, ' . $gradient_end_color . '); }' . "\n";
								echo $css_id . ' .maxbutton { background: -webkit-gradient(linear, left top, left bottom, color-stop(.' . $gradient_stop . ', ' . $gradient_start_color . '), color-stop(1, ' . $gradient_end_color . ')); }' . "\n";

								//echo $css_id . ' .maxbutton { filter: progid:DXImageTransform.Microsoft.gradient(startColorStr="' . $button['gradient_start_color'] . '", endColorStr="' . $button['gradient_end_color'] . '"); }' . "\n";
								//echo $css_id . ' .maxbutton { -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorStr="' . $button['gradient_start_color'] . '", endColorStr="' . $button['gradient_end_color'] . '"); }' . "\n";

								echo $css_id . ' .maxbutton { border-style: ' . $button['border_style'] . '; }' . "\n";
								echo $css_id . ' .maxbutton { border-width: ' . $button['border_width'] . '; }' . "\n";
								echo $css_id . ' .maxbutton { border-color: ' . $button['border_color'] . '; }' . "\n";
								echo $css_id . ' .maxbutton { border-top-left-radius: ' . $button['border_radius_top_left'] . '; }' . "\n";
								echo $css_id . ' .maxbutton { border-top-right-radius: ' . $button['border_radius_top_right'] . '; }' . "\n";
								echo $css_id . ' .maxbutton { border-bottom-left-radius: ' . $button['border_radius_bottom_left'] . '; }' . "\n";
								echo $css_id . ' .maxbutton { border-bottom-right-radius: ' . $button['border_radius_bottom_right'] . '; }' . "\n";
								echo $css_id . ' .maxbutton { -moz-border-radius-topleft: ' . $button['border_radius_top_left'] . '; }' . "\n";
								echo $css_id . ' .maxbutton { -moz-border-radius-topright: ' . $button['border_radius_top_right'] . '; }' . "\n";
								echo $css_id . ' .maxbutton { -moz-border-radius-bottomleft: ' . $button['border_radius_bottom_left'] . '; }' . "\n";
								echo $css_id . ' .maxbutton { -moz-border-radius-bottomright: ' . $button['border_radius_bottom_right'] . '; }' . "\n";
								echo $css_id . ' .maxbutton { -webkit-border-top-left-radius: ' . $button['border_radius_top_left'] . '; }' . "\n";
								echo $css_id . ' .maxbutton { -webkit-border-top-right-radius: ' . $button['border_radius_top_right'] . '; }' . "\n";
								echo $css_id . ' .maxbutton { -webkit-border-bottom-left-radius: ' . $button['border_radius_bottom_left'] . '; }' . "\n";
								echo $css_id . ' .maxbutton { -webkit-border-bottom-right-radius: ' . $button['border_radius_bottom_right'] . '; }' . "\n";
								echo $css_id . ' .maxbutton { text-shadow: ' . $button['text_shadow_offset_left'] . ' ' . $button['text_shadow_offset_top'] . ' ' . $button['text_shadow_width'] . ' ' . $button['text_shadow_color'] . '; }' . "\n";
								echo $css_id . ' .maxbutton { box-shadow: ' . $button['box_shadow_offset_left'] . ' ' . $button['box_shadow_offset_top'] . ' ' . $button['box_shadow_width'] . ' ' . $button['box_shadow_color'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-icon { padding-top: ' . $button['icon_padding_top'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-icon { padding-bottom: ' . $button['icon_padding_bottom'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-icon { padding-left: ' . $button['icon_padding_left'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-icon { padding-right: ' . $button['icon_padding_right'] . '; }' . "\n";
								
								if ($icon_width != '') {
									echo $css_id . ' .maxbutton .mb-icon { width: ' . $icon_width . '; }' . "\n";
								}
								
								echo $css_id . ' .maxbutton .mb-icon.mb-left { float: left; }' . "\n";
								echo $css_id . ' .maxbutton .mb-icon.mb-right { float: right; }' . "\n";
								echo $css_id . ' .maxbutton .mb-icon.mb-top { text-align: center; }' . "\n";
								echo $css_id . ' .maxbutton .mb-icon.mb-bottom { text-align: center; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text { color: ' . $button['text_color'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text { font-family: ' . $button['text_font_family'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text { font-size: ' . $button['text_font_size'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text { font-style: ' . $button['text_font_style'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text { font-weight: ' . $button['text_font_weight'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text { text-align: ' . $button['text_align'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text { padding-top: ' . $button['text_padding_top'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text { padding-bottom: ' . $button['text_padding_bottom'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text { padding-left: ' . $button['text_padding_left'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text { padding-right: ' . $button['text_padding_right'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text { line-height: 1.0em; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text { width: 100%; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text2 { color: ' . $button['text_color'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text2 { font-family: ' . $button['text2_font_family'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text2 { font-size: ' . $button['text2_font_size'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text2 { font-style: ' . $button['text2_font_style'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text2 { font-weight: ' . $button['text2_font_weight'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text2 { text-align: ' . $button['text2_align'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text2 { padding-top: ' . $button['text2_padding_top'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text2 { padding-bottom: ' . $button['text2_padding_bottom'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text2 { padding-left: ' . $button['text2_padding_left'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text2 { padding-right: ' . $button['text2_padding_right'] . '; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text2 { line-height: 1.0em; }' . "\n";
								echo $css_id . ' .maxbutton .mb-text2 { width: 100%; }' . "\n";
								echo $css_id_hover . ' { color: ' . $button['text_color_hover'] . '; }' . "\n";
								
								// Hover gradients
								$gradient_start_color_hover = mbpro_hex2rgba($button['gradient_start_color_hover'], $button['gradient_start_opacity_hover']);
								$gradient_end_color_hover = mbpro_hex2rgba($button['gradient_end_color_hover'], $button['gradient_end_opacity_hover']);

								echo $css_id_hover . ' .maxbutton { background-color: ' . $button['gradient_start_color_hover'] . '; }' . "\n";
								echo $css_id_hover . ' .maxbutton { background: linear-gradient(' . $gradient_start_color_hover . ' ' . $gradient_stop . '%, ' . $gradient_end_color_hover . '); }' . "\n";
								echo $css_id_hover . ' .maxbutton { background: -moz-linear-gradient(' . $gradient_start_color_hover . ' ' . $gradient_stop . '%, ' . $gradient_end_color_hover . '); }' . "\n";
								echo $css_id_hover . ' .maxbutton { background: -o-linear-gradient(' . $gradient_start_color_hover . ' ' . $gradient_stop . '%, ' . $gradient_end_color_hover . '); }' . "\n";
								echo $css_id_hover . ' .maxbutton { background: -webkit-gradient(linear, left top, left bottom, color-stop(.' . $gradient_stop . ', ' . $gradient_start_color_hover . '), color-stop(1, ' . $gradient_end_color_hover . ')); }' . "\n";
								//echo $css_id_hover . ' .maxbutton { filter: progid:DXImageTransform.Microsoft.gradient(startColorStr="' . $button['gradient_start_color_hover'] . '", endColorStr="' . $button['gradient_end_color_hover'] . '"); }' . "\n";
								//echo $css_id_hover . ' .maxbutton { -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorStr="' . $button['gradient_start_color_hover'] . '", endColorStr="' . $button['gradient_end_color_hover'] . '"); }' . "\n";
								echo $css_id_hover . ' .maxbutton { border-color: ' . $button['border_color_hover'] . '; }' . "\n";
								echo $css_id_hover . ' .maxbutton { text-shadow: ' . $button['text_shadow_offset_left'] . ' ' . $button['text_shadow_offset_top'] . ' ' . $button['text_shadow_width'] . ' ' . $button['text_shadow_color_hover'] . '; }' . "\n";
								echo $css_id_hover . ' .maxbutton { box-shadow: ' . $button['box_shadow_offset_left'] . ' ' . $button['box_shadow_offset_top'] . ' ' . $button['box_shadow_width'] . ' ' . $button['box_shadow_color_hover'] . '; }' . "\n";
								echo $css_id_hover . ' .maxbutton .mb-text { color: ' . $button['text_color_hover'] . '; }' . "\n";
								echo $css_id_hover . ' .maxbutton .mb-text2 { color: ' . $button['text_color_hover'] . '; }' . "\n";
								echo '</style>' . "\n";
								echo '<a class="' . $element_id . '" href="' . $button['url'] . '">';
								echo '<div class="maxbutton">';
								
								if ($button['icon_url'] != '' && $button['icon_position'] == 'left') {
									echo '<div class="mb-icon mb-left"><img src="' . $icon_url . '" alt="' . $button['icon_alt'] . '" border="0" /></div>';
								}

								if ($button['icon_url'] != '' && $button['icon_position'] == 'right') {
									echo '<div class="mb-icon mb-right"><img src="' . $icon_url . '" alt="' . $button['icon_alt'] . '" border="0" /></div>';
								}
								
								if ($button['icon_url'] != '' && $button['icon_position'] == 'top') {
									echo '<div class="mb-icon mb-top"><img src="' . $icon_url . '" alt="' . $button['icon_alt'] . '" border="0" /></div>';
								}
								
								if ($button['text'] != '') {
									echo '<div class="mb-text">' . $button['text'] . '</div>';
								}

								if ($button['text2'] != '') {
									echo '<div class="mb-text2">' . $button['text2'] . '</div>';
								}
								
								if ($button['icon_url'] != '' && $button['icon_position'] == 'bottom') {
									echo '<div class="mb-icon mb-bottom"><img src="' . $icon_url . '" alt="' . $button['icon_alt'] . '" border="0" /></div>';
								}
								
								echo '<div style="clear: both;"></div>';
								echo '</div>';
								echo '</a>';
								echo '</td>';
								
								echo '<td>';
								echo '	<strong>' . $button['name'] . '</strong>';
								echo '	<br />';
								echo '	<p>' . $button['description'] . '</p>';
								echo '	<input type="hidden" id="maxbutton_name_' . $counter . '" value="' . $button['name'] . '" />';
								echo '	<input type="hidden" id="maxbutton_description_' . $counter . '" value="' . $button['description'] . '" />';
								echo '	<input type="hidden" id="maxbutton_url_' . $counter . '" value="' . $button['url'] . '" />';
								echo '	<input type="hidden" id="maxbutton_new_window_' . $counter . '" value="' . $button['new_window'] . '" />';
								echo '	<input type="hidden" id="maxbutton_nofollow_' . $counter . '" value="' . $button['nofollow'] . '" />';
								echo '	<input type="hidden" id="maxbutton_width_' . $counter . '" value="' . mbpro_strip_px($button['width']) . '" />';
								echo '	<input type="hidden" id="maxbutton_height_' . $counter . '" value="' . mbpro_strip_px($button['height']) . '" />';
								echo '	<input type="hidden" id="maxbutton_icon_url_' . $counter . '" value="' . $icon_url . '" />';
								echo '	<input type="hidden" id="maxbutton_icon_position_' . $counter . '" value="' . $button['icon_position'] . '" />';
								echo '	<input type="hidden" id="maxbutton_icon_padding_top_' . $counter . '" value="' . mbpro_strip_px($button['icon_padding_top']) . '" />';
								echo '	<input type="hidden" id="maxbutton_icon_padding_bottom_' . $counter . '" value="' . mbpro_strip_px($button['icon_padding_bottom']) . '" />';
								echo '	<input type="hidden" id="maxbutton_icon_padding_left_' . $counter . '" value="' . mbpro_strip_px($button['icon_padding_left']) . '" />';
								echo '	<input type="hidden" id="maxbutton_icon_padding_right_' . $counter . '" value="' . mbpro_strip_px($button['icon_padding_right']) . '" />';
								echo '	<input type="hidden" id="maxbutton_icon_alt_' . $counter . '" value="' . $button['icon_alt'] . '" />';
								echo '	<input type="hidden" id="maxbutton_text_' . $counter . '" value="' . $button['text'] . '" />';
								echo '	<input type="hidden" id="maxbutton_text_font_family_' . $counter . '" value="' . $button['text_font_family'] . '" />';
								echo '	<input type="hidden" id="maxbutton_text_font_size_' . $counter . '" value="' . $button['text_font_size'] . '" />';
								echo '	<input type="hidden" id="maxbutton_text_font_style_' . $counter . '" value="' . $button['text_font_style'] . '" />';
								echo '	<input type="hidden" id="maxbutton_text_font_weight_' . $counter . '" value="' . $button['text_font_weight'] . '" />';
								echo '	<input type="hidden" id="maxbutton_text_align_' . $counter . '" value="' . $button['text_align'] . '" />';
								echo '	<input type="hidden" id="maxbutton_text_padding_top_' . $counter . '" value="' . mbpro_strip_px($button['text_padding_top']) . '" />';
								echo '	<input type="hidden" id="maxbutton_text_padding_bottom_' . $counter . '" value="' . mbpro_strip_px($button['text_padding_bottom']) . '" />';
								echo '	<input type="hidden" id="maxbutton_text_padding_left_' . $counter . '" value="' . mbpro_strip_px($button['text_padding_left']) . '" />';
								echo '	<input type="hidden" id="maxbutton_text_padding_right_' . $counter . '" value="' . mbpro_strip_px($button['text_padding_right']) . '" />';
								echo '	<input type="hidden" id="maxbutton_text2_' . $counter . '" value="' . $button['text2'] . '" />';
								echo '	<input type="hidden" id="maxbutton_text2_font_family_' . $counter . '" value="' . $button['text2_font_family'] . '" />';
								echo '	<input type="hidden" id="maxbutton_text2_font_size_' . $counter . '" value="' . $button['text2_font_size'] . '" />';
								echo '	<input type="hidden" id="maxbutton_text2_font_style_' . $counter . '" value="' . $button['text2_font_style'] . '" />';
								echo '	<input type="hidden" id="maxbutton_text2_font_weight_' . $counter . '" value="' . $button['text2_font_weight'] . '" />';
								echo '	<input type="hidden" id="maxbutton_text2_align_' . $counter . '" value="' . $button['text2_align'] . '" />';
								echo '	<input type="hidden" id="maxbutton_text2_padding_top_' . $counter . '" value="' . mbpro_strip_px($button['text2_padding_top']) . '" />';
								echo '	<input type="hidden" id="maxbutton_text2_padding_bottom_' . $counter . '" value="' . mbpro_strip_px($button['text2_padding_bottom']) . '" />';
								echo '	<input type="hidden" id="maxbutton_text2_padding_left_' . $counter . '" value="' . mbpro_strip_px($button['text2_padding_left']) . '" />';
								echo '	<input type="hidden" id="maxbutton_text2_padding_right_' . $counter . '" value="' . mbpro_strip_px($button['text2_padding_right']) . '" />';
								echo '	<input type="hidden" id="maxbutton_text_shadow_offset_left_' . $counter . '" value="' . mbpro_strip_px($button['text_shadow_offset_left']) . '" />';
								echo '	<input type="hidden" id="maxbutton_text_shadow_offset_top_' . $counter . '" value="' . mbpro_strip_px($button['text_shadow_offset_top']) . '" />';
								echo '	<input type="hidden" id="maxbutton_text_shadow_width_' . $counter . '" value="' . mbpro_strip_px($button['text_shadow_width']) . '" />';
								echo '	<input type="hidden" id="maxbutton_border_radius_top_left_' . $counter . '" value="' . mbpro_strip_px($button['border_radius_top_left']) . '" />';
								echo '	<input type="hidden" id="maxbutton_border_radius_top_right_' . $counter . '" value="' . mbpro_strip_px($button['border_radius_top_right']) . '" />';
								echo '	<input type="hidden" id="maxbutton_border_radius_bottom_left_' . $counter . '" value="' . mbpro_strip_px($button['border_radius_bottom_left']) . '" />';
								echo '	<input type="hidden" id="maxbutton_border_radius_bottom_right_' . $counter . '" value="' . mbpro_strip_px($button['border_radius_bottom_right']) . '" />';
								echo '	<input type="hidden" id="maxbutton_border_style_' . $counter . '" value="' . $button['border_style'] . '" />';
								echo '	<input type="hidden" id="maxbutton_border_width_' . $counter . '" value="' . mbpro_strip_px($button['border_width']) . '" />';
								echo '	<input type="hidden" id="maxbutton_box_shadow_offset_left_' . $counter . '" value="' . mbpro_strip_px($button['box_shadow_offset_left']) . '" />';
								echo '	<input type="hidden" id="maxbutton_box_shadow_offset_top_' . $counter . '" value="' . mbpro_strip_px($button['box_shadow_offset_top']) . '" />';
								echo '	<input type="hidden" id="maxbutton_box_shadow_width_' . $counter . '" value="' . mbpro_strip_px($button['box_shadow_width']) . '" />';
								echo '	<input type="hidden" id="maxbutton_gradient_stop_' . $counter . '" value="' . $button['gradient_stop'] . '" />';
								echo '	<input type="hidden" id="maxbutton_text_color_' . $counter . '" value="' . $button['text_color'] . '" />';
								echo '	<input type="hidden" id="maxbutton_text_color_hover_' . $counter . '" value="' . $button['text_color_hover'] . '" />';
								echo '	<input type="hidden" id="maxbutton_text_shadow_color_' . $counter . '" value="' . $button['text_shadow_color'] . '" />';
								echo '	<input type="hidden" id="maxbutton_text_shadow_color_hover_' . $counter . '" value="' . $button['text_shadow_color_hover'] . '" />';
								echo '	<input type="hidden" id="maxbutton_gradient_start_color_' . $counter . '" value="' . $button['gradient_start_color'] . '" />';
								echo '	<input type="hidden" id="maxbutton_gradient_start_color_hover_' . $counter . '" value="' . $button['gradient_start_color_hover'] . '" />';
								echo '	<input type="hidden" id="maxbutton_gradient_end_color_' . $counter . '" value="' . $button['gradient_end_color'] . '" />';
								echo '	<input type="hidden" id="maxbutton_gradient_end_color_hover_' . $counter . '" value="' . $button['gradient_end_color_hover'] . '" />';
								echo '	<input type="hidden" id="maxbutton_gradient_start_opacity_' . $counter . '" value="' . $button['gradient_start_opacity'] . '" />';
								echo '	<input type="hidden" id="maxbutton_gradient_start_opacity_hover_' . $counter . '" value="' . $button['gradient_start_opacity_hover'] . '" />';
								echo '	<input type="hidden" id="maxbutton_gradient_end_opacity_' . $counter . '" value="' . $button['gradient_end_opacity'] . '" />';
								echo '	<input type="hidden" id="maxbutton_gradient_end_opacity_hover_' . $counter . '" value="' . $button['gradient_end_opacity_hover'] . '" />';
								echo '	<input type="hidden" id="maxbutton_border_color_' . $counter . '" value="' . $button['border_color'] . '" />';
								echo '	<input type="hidden" id="maxbutton_border_color_hover_' . $counter . '" value="' . $button['border_color_hover'] . '" />';
								echo '	<input type="hidden" id="maxbutton_box_shadow_color_' . $counter . '" value="' . $button['box_shadow_color'] . '" />';
								echo '	<input type="hidden" id="maxbutton_box_shadow_color_hover_' . $counter . '" value="' . $button['box_shadow_color_hover'] . '" />';
								echo '	<input type="hidden" id="maxbutton_container_enabled_' . $counter . '" value="' . $button['container_enabled'] . '" />';
								echo '	<input type="hidden" id="maxbutton_container_width_' . $counter . '" value="' . mbpro_strip_px($button['container_width']) . '" />';
								echo '	<input type="hidden" id="maxbutton_container_margin_top_' . $counter . '" value="' . mbpro_strip_px($button['container_margin_top']) . '" />';
								echo '	<input type="hidden" id="maxbutton_container_margin_right_' . $counter . '" value="' . mbpro_strip_px($button['container_margin_right']) . '" />';
								echo '	<input type="hidden" id="maxbutton_container_margin_bottom_' . $counter . '" value="' . mbpro_strip_px($button['container_margin_bottom']) . '" />';
								echo '	<input type="hidden" id="maxbutton_container_margin_left_' . $counter . '" value="' . mbpro_strip_px($button['container_margin_left']) . '" />';
								echo '	<input type="hidden" id="maxbutton_container_alignment_' . $counter . '" value="' . $button['container_alignment'] . '" />';
								echo '	<input type="hidden" id="maxbutton_container_center_div_wrap_enabled_' . $counter . '" value="' . $button['container_center_div_wrap_enabled'] . '" />';
								echo '</td>';
								
								echo '<td>';
								printf(__('%sCopy This Button%s', 'maxbuttons-pro'), '<a href="#" onclick="copyButton(' . $counter . ')">', '</a>');
								echo '</td>';
								echo '</tr>';
								
								$counter += 1;
							}
							
							echo '</table>';
							echo '</div>';
							
							$counter -= 1; // Otherwise it will be off by 1
							echo '<script type="text/javascript">showButtonCount(' . $counter . ');</script>';
						}
						else {
							echo '<div class="message">';
							printf(__('There is no %s%s%s', 'maxbuttons-pro'), '<strong>', $pack, '.xml</strong> file for this button pack.');
							echo '</div>';
							echo '<script type="text/javascript">showMessage();</script>';
						}
					}
				}
				?>

				<input type="hidden" id="<?php echo $maxbutton_name_key ?>" name="<?php echo $maxbutton_name_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_description_key ?>" name="<?php echo $maxbutton_description_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_url_key ?>" name="<?php echo $maxbutton_url_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_new_window_key ?>" name="<?php echo $maxbutton_new_window_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_nofollow_key ?>" name="<?php echo $maxbutton_nofollow_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_width_key ?>" name="<?php echo $maxbutton_width_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_height_key ?>" name="<?php echo $maxbutton_height_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_icon_url_key ?>" name="<?php echo $maxbutton_icon_url_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_icon_position_key ?>" name="<?php echo $maxbutton_icon_position_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_icon_padding_top_key ?>" name="<?php echo $maxbutton_icon_padding_top_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_icon_padding_bottom_key ?>" name="<?php echo $maxbutton_icon_padding_bottom_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_icon_padding_left_key ?>" name="<?php echo $maxbutton_icon_padding_left_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_icon_padding_right_key ?>" name="<?php echo $maxbutton_icon_padding_right_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_icon_alt_key ?>" name="<?php echo $maxbutton_icon_alt_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text_key ?>" name="<?php echo $maxbutton_text_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text_font_family_key ?>" name="<?php echo $maxbutton_text_font_family_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text_font_size_key ?>" name="<?php echo $maxbutton_text_font_size_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text_font_style_key ?>" name="<?php echo $maxbutton_text_font_style_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text_font_weight_key ?>" name="<?php echo $maxbutton_text_font_weight_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text_align_key ?>" name="<?php echo $maxbutton_text_align_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text_padding_top_key ?>" name="<?php echo $maxbutton_text_padding_top_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text_padding_bottom_key ?>" name="<?php echo $maxbutton_text_padding_bottom_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text_padding_left_key ?>" name="<?php echo $maxbutton_text_padding_left_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text_padding_right_key ?>" name="<?php echo $maxbutton_text_padding_right_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text2_key ?>" name="<?php echo $maxbutton_text2_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text2_font_family_key ?>" name="<?php echo $maxbutton_text2_font_family_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text2_font_size_key ?>" name="<?php echo $maxbutton_text2_font_size_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text2_font_style_key ?>" name="<?php echo $maxbutton_text2_font_style_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text2_font_weight_key ?>" name="<?php echo $maxbutton_text2_font_weight_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text2_align_key ?>" name="<?php echo $maxbutton_text2_align_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text2_padding_top_key ?>" name="<?php echo $maxbutton_text2_padding_top_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text2_padding_bottom_key ?>" name="<?php echo $maxbutton_text2_padding_bottom_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text2_padding_left_key ?>" name="<?php echo $maxbutton_text2_padding_left_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text2_padding_right_key ?>" name="<?php echo $maxbutton_text2_padding_right_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text_shadow_offset_left_key ?>" name="<?php echo $maxbutton_text_shadow_offset_left_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text_shadow_offset_top_key ?>" name="<?php echo $maxbutton_text_shadow_offset_top_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text_shadow_width_key ?>" name="<?php echo $maxbutton_text_shadow_width_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_border_radius_top_left_key ?>" name="<?php echo $maxbutton_border_radius_top_left_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_border_radius_top_right_key ?>" name="<?php echo $maxbutton_border_radius_top_right_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_border_radius_bottom_left_key ?>" name="<?php echo $maxbutton_border_radius_bottom_left_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_border_radius_bottom_right_key ?>" name="<?php echo $maxbutton_border_radius_bottom_right_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_border_style_key ?>" name="<?php echo $maxbutton_border_style_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_border_width_key ?>" name="<?php echo $maxbutton_border_width_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_box_shadow_offset_left_key ?>" name="<?php echo $maxbutton_box_shadow_offset_left_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_box_shadow_offset_top_key ?>" name="<?php echo $maxbutton_box_shadow_offset_top_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_box_shadow_width_key ?>" name="<?php echo $maxbutton_box_shadow_width_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_gradient_stop_key ?>" name="<?php echo $maxbutton_gradient_stop_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text_color_key ?>" name="<?php echo $maxbutton_text_color_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text_color_hover_key ?>" name="<?php echo $maxbutton_text_color_hover_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text_shadow_color_key ?>" name="<?php echo $maxbutton_text_shadow_color_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_text_shadow_color_hover_key ?>" name="<?php echo $maxbutton_text_shadow_color_hover_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_gradient_start_color_key ?>" name="<?php echo $maxbutton_gradient_start_color_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_gradient_start_color_hover_key ?>" name="<?php echo $maxbutton_gradient_start_color_hover_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_gradient_end_color_key ?>" name="<?php echo $maxbutton_gradient_end_color_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_gradient_end_color_hover_key ?>" name="<?php echo $maxbutton_gradient_end_color_hover_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_gradient_start_opacity_key ?>" name="<?php echo $maxbutton_gradient_start_opacity_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_gradient_start_opacity_hover_key ?>" name="<?php echo $maxbutton_gradient_start_opacity_hover_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_gradient_end_opacity_key ?>" name="<?php echo $maxbutton_gradient_end_opacity_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_gradient_end_opacity_hover_key ?>" name="<?php echo $maxbutton_gradient_end_opacity_hover_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_border_color_key ?>" name="<?php echo $maxbutton_border_color_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_border_color_hover_key ?>" name="<?php echo $maxbutton_border_color_hover_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_box_shadow_color_key ?>" name="<?php echo $maxbutton_box_shadow_color_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_box_shadow_color_hover_key ?>" name="<?php echo $maxbutton_box_shadow_color_hover_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_container_enabled_key ?>" name="<?php echo $maxbutton_container_enabled_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_container_width_key ?>" name="<?php echo $maxbutton_container_width_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_container_margin_top_key ?>" name="<?php echo $maxbutton_container_margin_top_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_container_margin_right_key ?>" name="<?php echo $maxbutton_container_margin_right_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_container_margin_bottom_key ?>" name="<?php echo $maxbutton_container_margin_bottom_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_container_margin_left_key ?>" name="<?php echo $maxbutton_container_margin_left_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_container_alignment_key ?>" name="<?php echo $maxbutton_container_alignment_key ?>" />
				<input type="hidden" id="<?php echo $maxbutton_container_center_div_wrap_enabled_key ?>" name="<?php echo $maxbutton_container_center_div_wrap_enabled_key ?>" />
			</form>
		</div>
		
		<div class="offers">
			<?php include 'maxbuttons-offers.php' ?>
		</div>
	</div>
</div>

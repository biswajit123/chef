<?php
add_shortcode('maxbutton', 'mbpro_button_shortcode');

function mbpro_button_shortcode($atts) {
	extract(shortcode_atts(array(
		'id' => '',
		'text' => '',
		'text2' => '',
		'url' => '',
		'window' => '',
		'nofollow' => '',
		'externalcss' => '',
		'externalcsspreview' => '',		// Only used in maxbuttons-button-css.php
		'ignorecontainer' => '',		// Internal use only on button list pages and the TinyMCE dialog
		'exclude' => ''
	), $atts));
	
	// Get button ID
	$button_id = "{$id}";

	if ($button_id != '') {
		$button = mbpro_get_button($button_id);
		
		if (isset($button)) {
			// Get the vars
			$button_text = "{$text}" != '' ? "{$text}" : $button->text;
			$button_text2 = "{$text2}" != '' ? "{$text2}" : $button->text2;
			$button_url = "{$url}" != '' ? "{$url}" : $button->url;
			$button_window = '';
			$button_nofollow = '';
			
			// If we're not in the admin and the button is in the trash, just return nothing
			if (!is_admin() && $button->status == 'trash') {
				return '';
			}
			
			// Check to handle excludes
			if ("{$exclude}" != '') {
				global $post;
				
				// Don't render the button if excluded from the current post/page
				$exclude = explode(',', "{$exclude}");
				if (in_array($post->ID, $exclude)) {
					return '';
				}
			}
			
			if ($button->gradient_stop != '') {
				$gradient_stop = strlen($button->gradient_stop) == 1 ? '0' . $button->gradient_stop : $button->gradient_stop;
			} else {
				$gradient_stop = '45'; // Default
			}
			
			$external_css = false;
			if ("{$externalcss}" != '') {
				if ("{$externalcss}" == 'true') {
					$external_css = true;
				}
			} else {
				if ($button->external_css == 'on') {
					$external_css = true;
				}
			}
			
			// Check to exit early with external css preview
			$external_css_preview = false;
			if ("{$externalcsspreview}" != '') {
				if ("{$externalcsspreview}" == 'true') {
					$external_css_preview = true;
				}
			}
			
			// Check to ignore container
			$ignore_container = false;
			if ("{$ignorecontainer}" != '') {
				if ("{$ignorecontainer}" == 'true') {
					$ignore_container = true;
				}
			}
			
			$show_icon = false;
			if ($button->icon_url != '') {
				$show_icon = true;
			}
			
			// Check to set !important
			$important = '';
			if ($button->important_css == 'on') {
				$important = ' !important';
			}
			
			// Initialize the css
			$css = '';
			
			if (!$external_css && !$external_css_preview) {
				// Add the opening <style> tag
				$css .= '<style type="text/css">';
			}
			
			// The container style
			if ($button->container_enabled == 'on') {
				$css .= 'div.maxbutton-' . $button->id . '-container { ';

				if ($button->container_alignment != '') {
					$css .= $button->container_alignment . $important . '; ';
				}
				
				if ($button->container_width != '') {
					$css .= 'width: ' . $button->container_width . $important . '; ';
				}
				
				if ($button->container_margin_top != '') {
					$css .= 'margin-top: ' . $button->container_margin_top . $important . '; ';
				}

				if ($button->container_margin_right != '') {
					$css .= 'margin-right: ' . $button->container_margin_right . $important . '; ';
				}
				
				if ($button->container_margin_bottom != '') {
					$css .= 'margin-bottom: ' . $button->container_margin_bottom . $important . '; ';
				}
				
				if ($button->container_margin_left != '') {
					$css .= 'margin-left: ' . $button->container_margin_left . $important . '; ';
				}
				
				$css .= '} ';
			}

			// Gradients
			$gradient_start_color = mbpro_hex2rgba($button->gradient_start_color, $button->gradient_start_opacity);
			$gradient_end_color = mbpro_hex2rgba($button->gradient_end_color, $button->gradient_end_opacity);
			
			// The button style
			$css .= 'a.maxbutton-' . $button->id . ' { ';
			$css .= 'text-decoration: none' . $important . '; ';
			$css .= 'color: ' . $button->text_color . $important . '; ';
			$css .= '} ';
			$css .= 'a.maxbutton-' . $button->id . ' .maxbutton { ';
			$css .= ($button->width != '') ? 'width: ' . $button->width . $important . '; ' : '';
			$css .= ($button->height != '') ? 'height: ' . $button->height . $important . '; ' : '';
			$css .= 'background-color: ' . $button->gradient_start_color . $important . '; ';
			$css .= 'background: linear-gradient(' . $gradient_start_color . ' ' . $gradient_stop . '%, ' . $gradient_end_color . '); ';
			$css .= 'background: -moz-linear-gradient(' . $gradient_start_color . ' ' . $gradient_stop . '%, ' . $gradient_end_color . '); ';
			$css .= 'background: -o-linear-gradient(' . $gradient_start_color . ' ' . $gradient_stop . '%, ' . $gradient_end_color . '); ';
			$css .= 'background: -webkit-gradient(linear, left top, left bottom, color-stop(.' . $gradient_stop . ', ' . $gradient_start_color . '), color-stop(1, ' . $gradient_end_color . ')); ';
			$css .= 'border-style: ' . $button->border_style . $important . '; ';
			$css .= 'border-width: ' . $button->border_width . $important . '; ';
			$css .= 'border-color: ' . $button->border_color . $important . '; ';
			
			if (mbpro_border_radius_values_are_equal($button->border_radius_top_left, $button->border_radius_top_right, $button->border_radius_bottom_left, $button->border_radius_bottom_right)) {
				$css .= 'border-radius: ' . $button->border_radius_top_left . $important . '; ';
				$css .= '-moz-border-radius: ' . $button->border_radius_top_left . $important . '; ';
				$css .= '-webkit-border-radius: ' . $button->border_radius_top_left . $important . '; ';
			}
			else {
				$css .= 'border-top-left-radius: ' . $button->border_radius_top_left . $important . '; ';
				$css .= 'border-top-right-radius: ' . $button->border_radius_top_right . $important . '; ';
				$css .= 'border-bottom-left-radius: ' . $button->border_radius_bottom_left . $important . '; ';
				$css .= 'border-bottom-right-radius: ' . $button->border_radius_bottom_right . $important . '; ';
				$css .= '-moz-border-radius-topleft: ' . $button->border_radius_top_left . $important . '; ';
				$css .= '-moz-border-radius-topright: ' . $button->border_radius_top_right . $important . '; ';
				$css .= '-moz-border-radius-bottomleft: ' . $button->border_radius_bottom_left . $important . '; ';
				$css .= '-moz-border-radius-bottomright: ' . $button->border_radius_bottom_right . $important . '; ';
				$css .= '-webkit-border-top-left-radius: ' . $button->border_radius_top_left . $important . '; ';
				$css .= '-webkit-border-top-right-radius: ' . $button->border_radius_top_right . $important . '; ';
				$css .= '-webkit-border-bottom-left-radius: ' . $button->border_radius_bottom_left . $important . '; ';
				$css .= '-webkit-border-bottom-right-radius: ' . $button->border_radius_bottom_right . $important . '; ';
			}
			
			$css .= 'text-shadow: ' . $button->text_shadow_offset_left . ' ' . $button->text_shadow_offset_top . ' ' . $button->text_shadow_width . ' ' . $button->text_shadow_color . $important . '; ';
			$css .= 'box-shadow: ' . $button->box_shadow_offset_left . ' ' . $button->box_shadow_offset_top . ' ' . $button->box_shadow_width . ' ' . $button->box_shadow_color . $important . '; ';
			
			// PIE
			$css .= '-pie-background: linear-gradient(' . $gradient_start_color . ' ' . $gradient_stop . '%, ' . $gradient_end_color . '); ';
			$css .= 'position: relative' . $important . '; ' ;
			$css .= 'behavior: url("' . MAXBUTTONS_PRO_PLUGIN_URL . '/pie/PIE.htc"); ';
			$css .= '} ';
			
			$css .= 'a.maxbutton-' . $button->id . ' .maxbutton .mb-text { ';
			$css .= 'color: ' . $button->text_color . $important . '; ';
			$css .= 'font-family: ' . $button->text_font_family . $important . '; ';
			$css .= 'font-size: ' . $button->text_font_size . $important . '; ';
			$css .= 'font-style: ' . $button->text_font_style . $important . '; ';
			$css .= 'font-weight: ' . $button->text_font_weight . $important . '; ';
			$css .= 'text-align: ' . $button->text_align . $important . '; ';
			$css .= 'padding-top: ' . $button->text_padding_top . $important . '; ';
			$css .= 'padding-right: ' . $button->text_padding_right . $important . '; ';
			$css .= 'padding-bottom: ' . $button->text_padding_bottom . $important . '; ';
			$css .= 'padding-left: ' . $button->text_padding_left . $important . '; ';
			$css .= 'line-height: 1.0em' . $important . '; ';
			$css .= 'width: 100%' . $important . '; ';
			$css .= '} ';
			$css .= 'a.maxbutton-' . $button->id . ' .maxbutton .mb-text2 { ';
			$css .= 'color: ' . $button->text_color . $important . '; ';
			$css .= 'font-family: ' . $button->text2_font_family . $important . '; ';
			$css .= 'font-size: ' . $button->text2_font_size . $important . '; ';
			$css .= 'font-style: ' . $button->text2_font_style . $important . '; ';
			$css .= 'font-weight: ' . $button->text2_font_weight . $important . '; ';
			$css .= 'text-align: ' . $button->text2_align . $important . '; ';
			$css .= 'padding-top: ' . $button->text2_padding_top . $important . '; ';
			$css .= 'padding-right: ' . $button->text2_padding_right . $important . '; ';
			$css .= 'padding-bottom: ' . $button->text2_padding_bottom . $important . '; ';
			$css .= 'padding-left: ' . $button->text2_padding_left . $important . '; ';
			$css .= 'line-height: 1.0em' . $important . '; ';
			$css .= 'width: 100%' . $important . '; ';
			$css .= '} ';
			
			if ($show_icon) {
				// Check how to handle the icon width
				$icon_width = $button->icon_width;
				if (!isset($icon_width) || $icon_width == '') {
					// Get the icon width from the icon url and then save it to the
					// database so that getimagesize runs at most once per button
					$icon_width = mbpro_get_image_width_from_url($button->icon_url);
					mbpro_update_button_icon_width($button->id, $icon_width);
				}
				
				$css .= 'a.maxbutton-' . $button->id . ' .maxbutton .mb-icon { ';
				$css .= 'padding-top: ' . $button->icon_padding_top . $important . '; ';
				$css .= 'padding-right: ' . $button->icon_padding_right . $important . '; ';
				$css .= 'padding-bottom: ' . $button->icon_padding_bottom . $important . '; ';
				$css .= 'padding-left: ' . $button->icon_padding_left . $important . '; ';
				$css .= 'width: ' . $icon_width . $important . '; ';
				$css .= '} ';

				// These help avoid theme image styles from creeping into the button
				$css .= 'a.maxbutton-' . $button->id . ' .maxbutton .mb-icon img { ';
				$css .= 'background: none' . $important . '; ';
				$css .= 'padding: 0px' . $important . '; ';
				$css .= 'margin: 0px' . $important . '; ';
				$css .= 'border: none' . $important . '; ';
				$css .= 'border-radius: 0px' . $important . '; ';
				$css .= '-moz-border-radius: 0px' . $important . '; ';
				$css .= '-webkit-border-radius: 0px' . $important . '; ';
				$css .= 'box-shadow: none' . $important . '; ';
				$css .= '} ';
				
				if ($button->icon_position == 'left') {
					$css .= 'a.maxbutton-' . $button->id . ' .maxbutton .mb-icon.mb-left { ';
					$css .= 'float: left' . $important . '; ';
					$css .= 'text-align: left' . $important . '; ';
					$css .= '} ';
				}
				
				if ($button->icon_position == 'right') {
					$css .= 'a.maxbutton-' . $button->id . ' .maxbutton .mb-icon.mb-right { ';
					$css .= 'float: right' . $important . '; ';
					$css .= 'text-align: right' . $important . '; ';
					$css .= '} ';
				}
				
				if ($button->icon_position == 'top') {
					$css .= 'a.maxbutton-' . $button->id . ' .maxbutton .mb-icon.mb-top { ';
					$css .= 'text-align: center' . $important . '; ';
					$css .= '} ';
				}
				
				if ($button->icon_position == 'bottom') {
					$css .= 'a.maxbutton-' . $button->id . ' .maxbutton .mb-icon.mb-bottom { ';
					$css .= 'text-align: center' . $important . '; ';
					$css .= '} ';
				}
			}
			
			// The button style - visited
			$css .= 'a.maxbutton-' . $button->id . ':visited { ';
			$css .= 'text-decoration: none' . $important . '; ';
			$css .= 'color: ' . $button->text_color . $important . '; ';
			$css .= '} ';

			// Only render the hover styles if button has a url
			if ($button_url != '') {
				// Hover gradients
				$gradient_start_color_hover = mbpro_hex2rgba($button->gradient_start_color_hover, $button->gradient_start_opacity_hover);
				$gradient_end_color_hover = mbpro_hex2rgba($button->gradient_end_color_hover, $button->gradient_end_opacity_hover);

				// The button style - hover
				$css .= 'a.maxbutton-' . $button->id . ':hover { ';
				$css .= 'text-decoration: none' . $important . '; ';
				$css .= 'color: ' . $button->text_color_hover . $important . '; ';
				$css .= '} ';
				$css .= 'a.maxbutton-' . $button->id . ':hover .maxbutton { ';
				$css .= 'background-color: ' . $button->gradient_start_color_hover . $important . '; ';
				$css .= 'background: linear-gradient(' . $gradient_start_color_hover . ' ' . $gradient_stop . '%, ' . $gradient_end_color_hover . '); ';
				$css .= 'background: -moz-linear-gradient(' . $gradient_start_color_hover . ' ' . $gradient_stop . '%, ' . $gradient_end_color_hover . '); ';
				$css .= 'background: -o-linear-gradient(' . $gradient_start_color_hover . ' ' . $gradient_stop . '%, ' . $gradient_end_color_hover . '); ';
				$css .= 'background: -webkit-gradient(linear, left top, left bottom, color-stop(.' . $gradient_stop . ', ' . $gradient_start_color_hover . '), color-stop(1, ' . $gradient_end_color_hover . ')); ';
				$css .= 'border-color: ' . $button->border_color_hover . $important . '; ';
				$css .= 'text-shadow: ' . $button->text_shadow_offset_left . ' ' . $button->text_shadow_offset_top . ' ' . $button->text_shadow_width . ' ' . $button->text_shadow_color_hover . $important . '; ';
				$css .= 'box-shadow: ' . $button->box_shadow_offset_left . ' ' . $button->box_shadow_offset_top . ' ' . $button->box_shadow_width . ' ' . $button->box_shadow_color_hover . $important . '; ';
				
				// PIE
				$css .= '-pie-background: linear-gradient(' . $gradient_start_color_hover . ' ' . $gradient_stop . '%, ' . $gradient_end_color_hover . '); ';
				$css .= 'position: relative' . $important . '; ' ;
				$css .= 'behavior: url("' . MAXBUTTONS_PRO_PLUGIN_URL . '/pie/PIE.htc"); ';
				$css .= '} ';
				
				$css .= 'a.maxbutton-' . $button->id . ':hover .maxbutton .mb-text { ';
				$css .= 'color: ' . $button->text_color_hover . $important . '; ';
				$css .= '} ';
				$css .= 'a.maxbutton-' . $button->id . ':hover .maxbutton .mb-text2 { ';
				$css .= 'color: ' . $button->text_color_hover . $important . '; ';
				$css .= '} ';
			}
			
			if (!$external_css && !$external_css_preview) {
				// Close the style element
				$css .= '</style>';
			}
			
			if ($external_css_preview) {
				return $css;
			}
			
			// Check to open the link in a new window
			if ("{$window}" != '') {
				if ("{$window}" == 'new') {
					$button_window = 'target="_blank"';
				}
			} else {
				if ($button->new_window == 'on') {
					$button_window = 'target="_blank"';
				}
			}
			
			// Check to add rel="nofollow" to the link
			if ("{$nofollow}" != '') {
				if ("{$nofollow}" == 'true') {
					$button_nofollow = 'rel="nofollow"';
				}
			} else {
				if ($button->nofollow == 'on') {
					$button_nofollow = 'rel="nofollow"';
				}
			}
			
			// Initialize the output
			$output = '';
			
			// Check to add the css
			if (!$external_css) {
				$output .= $css;
			}
			
			// Check to load the font family script
			if ($button_text != '' || $button_text2 != '') {
				$output .= '<script type="text/javascript">';
				$output .= ($button_text != '') ? 'mbpro_loadFontFamilyStylesheet("' . $button->text_font_family . '");' : '';
				$output .= ($button_text2 != '') ? 'mbpro_loadFontFamilyStylesheet("' . $button->text2_font_family . '");' : '';
				$output .= '</script>';
			}
			
			if (!$ignore_container) {
				// Check to add the center div wrapper
				if ($button->container_center_div_wrap_enabled == 'on') {				
					$output .= '<div align="center">';
				}
				
				// Check to add the container
				if ($button->container_enabled == 'on') {				
					$output .= '<div class="maxbutton-' . $button->id . '-container">';
				}
			}
			
			// If no button url then don't output the href
			if ($button_url == '') {
				$output .= '<a class="maxbutton-' . $button->id . '">';
			} else {
				$output .= '<a class="maxbutton-' . $button->id . '" href="' . $button_url . '" ' . $button_window . ' ' . $button_nofollow . '>';
			}
			
			$output .= '<div class="maxbutton">';
			
			if ($show_icon && $button->icon_position == 'left') {
				$output .= '<div class="mb-icon mb-left"><img src="' . $button->icon_url . '" alt="' . $button->icon_alt . '" border="0" /></div>';
			}

			if ($show_icon && $button->icon_position == 'right') {
				$output .= '<div class="mb-icon mb-right"><img src="' . $button->icon_url . '" alt="' . $button->icon_alt . '" border="0" /></div>';
			}
			
			if ($show_icon && $button->icon_position == 'top') {
				$output .= '<div class="mb-icon mb-top"><img src="' . $button->icon_url . '" alt="' . $button->icon_alt . '" border="0" /></div>';
			}
			
			if ($button_text != '') {
				$output .= '<div class="mb-text">' . $button_text . '</div>';
			}
			
			if ($button_text2 != '') {
				$output .= '<div class="mb-text2">' . $button_text2 . '</div>';
			}
			
			if ($show_icon && $button->icon_position == 'bottom') {
				$output .= '<div class="mb-icon mb-bottom"><img src="' . $button->icon_url . '" alt="' . $button->icon_alt . '" border="0" /></div>';
			}
			
			if ($show_icon) {
				// This clear div is only needed if an icon is present
				$output .= '<div style="clear: both;"></div>';			
			}
			
			$output .= '</div>';
			$output .= '</a>';
			
			if (!$ignore_container) {
				// Check to close the container
				if ($button->container_enabled == 'on') {
					$output .= '</div>';
					
					// Might need to clear the float
					if ($button->container_alignment == 'float: right' || $button->container_alignment == 'float: left') {
						$output .= '<div style="clear: both;"></div>';
					}
				}
				
				// Check to close the center div wrapper
				if ($button->container_center_div_wrap_enabled == 'on') {				
					$output .= '</div>';
				}
			}
			
			return $output;
		}
	}
}

function mbpro_border_radius_values_are_equal($top_left, $top_right, $bottom_left, $bottom_right) {
	if ($top_left == $top_right && $top_left == $bottom_left && $top_left == $bottom_right &&
		$top_right == $top_left && $top_right == $bottom_left && $top_right == $bottom_right &&
		$bottom_left == $top_left && $bottom_left == $top_right && $bottom_left == $bottom_right &&
		$bottom_right == $top_left && $bottom_right == $top_right && $bottom_right == $bottom_left) {
		return true;
	}
	
	// Otherwise
	return false;
}
?>
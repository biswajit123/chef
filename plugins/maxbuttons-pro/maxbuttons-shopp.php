<?php
// Shopp filter for MaxButtons integration
add_filter('shopp_ml_t', 'mbpro_shopp_maxbuttons', 10, 4);

/*
 * Replaces Shopp standard markup buttons with MaxButtons
 *
 * @param string $result The current output from the Shopp Theme API
 * @param array $options The options passed to the Shopp Theme API tag call
 * @param string $tag The tag name used for Shopp
 * @param object $Object The contextual Shopp object for the specified Shopp Theme API call
 * @return string The rendered MaxButton added to the standard Shopp output
 */
function mbpro_shopp_maxbuttons($result, $options, $tag, $Object) {	
	// Only handle Shopp buttons with a maxbutton option
	if (!isset($options['maxbutton'])) {
		return $result;
	}
	
	// Only handle known button types
	$button_type = mbpro_shopp_get_button_type($result);
	if ($button_type == '') {
		return $result;
	}
	
	$is_submit_login = false;
	$is_submit_order = false;
	
	// The value of the maxbutton option is the maxbutton id
	$id = $options['maxbutton'];
	$shortcode_output = mbpro_button_shortcode(array('id' => $id));
	
	if ($button_type == 'input-submit' || $button_type == 'input-button') {		
		// Turn the Shopp input submit/button to hidden input
		preg_match('/<input.*?type="(submit|button)".*?>/', $result, $matches);
		list($input_html, $input_type) = $matches;
		$result = str_replace('type="' . $input_type . '"', 'type="hidden"', $result);
		
		// Check to see if this is the submit login or submit order button
		if (mbpro_string_contains($result, 'id="submit-login-checkout"')) { $is_submit_login = true; }
		if (mbpro_string_contains($result, 'id="checkout-button"')) { $is_submit_order = true; }
	}

	if ($button_type == 'button') {
		// Turn the Shopp button to an hidden input element
		preg_match('/<button.*?type="submit".*?>(.*?)<\/button>/', $result, $matches);
		list($button_html, $button_text) = $matches;
		$result = str_replace($button_text, '', $result);
		$result = str_replace('<button', '<input', $result);
		$result = str_replace('type="submit"', 'type="hidden"', $result);
		$result = str_replace('</button>', '</input>', $result);
	}
	
	if ($button_type == 'anchor') {
		// Add a display: none style to the Shopp anchor element
		preg_match('/<a.*?href="(.*?)".*?>/', $result, $matches);
		list($anchor_html, $anchor_href) = $matches;
		$result = str_replace('href=', 'style="display: none;" href=', $result);

		// Pass the anchor href to the url of the maxbutton
		$shortcode_output = mbpro_button_shortcode(array('id' => $id, 'url' => $anchor_href));
	}
	
	// Add the maxbutton output
	if ($is_submit_order) {
		// The submit order button is a little different in that it's wrapped in a <span>. We need to put the
		// maxbutton inside its <span> and then change the <span> to a <div> so that the HTML markup is proper.
		$result = str_replace('<span class="payoption-button payoption-0">', '<span class="payoption-button payoption-0">' . $shortcode_output, $result);
		$result = str_replace('<span class="payoption-button payoption-0">', '<div class="payoption-button payoption-0">', $result);
		$result = str_replace('<span class="payoption-button payoption-paypal">', '<div class="payoption-button payoption-paypal">', $result);
		$result = str_replace('</span>', '</div>', $result);
	}
	else {
		// If it's not a submit order button, simply append the maxbutton
		$result .= $shortcode_output;
	}
	
	if ($button_type != 'anchor') {
		// Need to tack on the object id to the maxbutton id to guarantee button uniqueness for the javascript events
		$result = str_replace('maxbutton-' . $id, 'maxbutton-' . $id . '-' . $Object->id, $result);
		
		// Make the maxbutton click behavior submit the Shopp form
		$result .= '<script type="text/javascript">';
		$result .= '(function($) {';
		$result .= '	$(".maxbutton-' . $id . '-' . $Object->id . '").click(function(e) {';
		$result .= '		e.preventDefault();';
		
		// Even though it is now hidden, the Shopp login submit button requires a call to its click event
		if ($is_submit_login) {
			$result .= '	$("#submit-login-checkout").click();';
		}
		
		// If this is the submit order button, we must disable the submit login button so that it's value
		// doesn't get posted back to Shopp; otherwise, Shopp will try to perform an account login action
		if ($is_submit_order) {
			$result .= '	$("#submit-login-checkout").attr("disabled", "disabled");';
		}
		
		$result .= '		$(this).parents("form").submit();';
		$result .= '		return false;';
		$result .= '	});';
		$result .= '})(jQuery);';
		$result .= '</script>';
	}
	
	return $result;
}

function mbpro_shopp_get_button_type($shopp_result) {
	if (preg_match('/<input.*?type="(submit)".*?>/', $shopp_result)) return 'input-submit';
	if (preg_match('/<input.*?type="(button)".*?>/', $shopp_result)) return 'input-button';
	if (preg_match('/<button.*?type="(submit)".*?>/', $shopp_result)) return 'button';
	if (preg_match('/<a.*?>/', $shopp_result)) return 'anchor';
	
	return '';
}
?>
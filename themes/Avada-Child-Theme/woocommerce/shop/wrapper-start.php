<?php
/**
 * Content wrappers
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $post;

$template = get_option('template');

if(is_shop()) {
	$pageID = get_option('woocommerce_shop_page_id'); 
} else {
	$pageID = $post->ID;
}

$custom_fields = get_post_custom_values('_wp_page_template', $pageID);
if(is_array($custom_fields) && !empty($custom_fields)) {
	$page_template = $custom_fields[0];
} else {
	$page_template = '';
}

if(get_post_meta($pageID, 'pyre_full_width', true) == 'yes' || $page_template == 'full-width.php' || is_product_category() || is_product_tag()) {
	$content_css = 'width:100%';
	$sidebar_css = 'display:none';
}
elseif(get_post_meta($pageID, 'pyre_sidebar_position', true) == 'left') {
	$content_css = 'float:right;';
	$sidebar_css = 'float:left;';
} elseif(get_post_meta($pageID, 'pyre_sidebar_position', true) == 'right') {
	$content_css = 'float:left;';
	$sidebar_css = 'float:right;';
} elseif(get_post_meta($pageID, 'pyre_sidebar_position', true) == 'default') {
	if($data['default_sidebar_pos'] == 'Left') {
		$content_css = 'float:right;';
		$sidebar_css = 'float:left;';
	} elseif($data['default_sidebar_pos'] == 'Right') {
		$content_css = 'float:left;';
		$sidebar_css = 'float:right;';
	}
}

switch( $template ) {
	case 'twentyeleven' :
		echo '<div id="primary"><div id="content" role="main">';
		break;
	case 'twentytwelve' :
		echo '<div id="primary" class="site-content"><div id="content" role="main">';
		break;
	case 'twentythirteen' :
		echo '<div id="primary" class="site-content"><div id="content" role="main" class="entry-content twentythirteen">';
		break;
	case 'Avada' :
		echo '<div class="woocommerce-container"><div id="content" style="'.$content_css.'">';
		break;
	default :
		echo '<div class="woocommerce-container"><div id="content" style="'.$content_css.'">';
		break;
}
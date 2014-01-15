<?php
/**
 * Sidebar
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly ?>
<?php
global $post;

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
?>
<div id="sidebar" style="<?php echo $sidebar_css; ?>">
	<?php
	wp_reset_query();
	if(is_product()) {
		generated_dynamic_sidebar();
	} else {
		$shop_page_id = get_option('woocommerce_shop_page_id');
		$name = get_post_meta($shop_page_id, 'sbg_selected_sidebar_replacement', true);
		if($name) {
			generated_dynamic_sidebar($name[0]);
		}	
	}
	?>
</div>
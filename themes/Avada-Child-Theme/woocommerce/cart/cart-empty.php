<?php
/**
 * Empty cart page
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

?>

<div class="woocommerce-message woocommerce-success-message clearfix empty-cart-message">
	<div class="msg"><?php _e( 'Your cart is currently empty.', 'woocommerce' ) ?><a class="button" href="<?php echo get_permalink(woocommerce_get_page_id('shop')); ?>"><?php _e( 'Return To Shop', 'woocommerce' ) ?></a></div>
</div>

<?php do_action('woocommerce_cart_is_empty'); ?>
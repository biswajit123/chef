<?php
/**
 * Show error messages
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if ( ! $errors ) return;
?>
<?php foreach ( $errors as $error ) : ?>
	<div class="alert error woocommerce-message">
		<div class="msg"><?php echo wp_kses_post( $error ); ?></div>
		<a href="#" class="toggle-alert">Toggle</a>
	</div>
<?php endforeach; ?>
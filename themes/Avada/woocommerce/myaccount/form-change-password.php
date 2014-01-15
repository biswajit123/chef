<?php
/**
 * Change password form
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $woocommerce;
?>

<?php woocommerce_get_template('user-welcome.php'); ?>

<?php woocommerce_get_template('myaccount-nav.php'); ?>

<div class="woocommerce-content-box">

<h2 class="page-info"><?php _e('Change Password', 'Avada'); ?></h2>

<p><?php _e('Enter the following fields to change the password on your account', 'Avada'); ?></p>

<?php $woocommerce->show_messages(); ?>

<form action="<?php echo esc_url( get_permalink(woocommerce_get_page_id('change_password')) ); ?>" method="post">

	<p class="form-row form-row-first">
		<input type="password" class="input-text" name="password_1" id="password_1" placeholder="<?php _e( 'New password', 'woocommerce' ); ?>" size="20" />
	</p>
	<p class="form-row form-row-last">
		<input type="password" class="input-text" name="password_2" id="password_2" placeholder="<?php _e( 'Re-enter new password', 'woocommerce' ); ?>" size="20" />
	</p>
	<div class="clear"></div>

	<p><input type="submit" class="button comment-submit small" name="change_password" value="<?php _e( 'Save', 'woocommerce' ); ?>" /></p>

	<?php $woocommerce->nonce_field('change_password')?>
	<input type="hidden" name="action" value="change_password" />

</form>

</div>
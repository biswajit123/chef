<?php
/**
 * Checkout Form
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $woocommerce;

$woocommerce->show_messages(); ?>

<?php woocommerce_get_template('user-welcome.php'); ?>

<?php do_action( 'woocommerce_before_checkout_form', $checkout );

// If checkout registration is disabled and not logged in, the user cannot checkout
if ( ! $checkout->enable_signup && ! $checkout->enable_guest_checkout && ! is_user_logged_in() ) {
	echo apply_filters( 'woocommerce_checkout_must_be_logged_in_message', __( 'You must be logged in to checkout.', 'woocommerce' ) );
	return;
}

?>

<ul class="woocommerce-side-nav woocommerce-checkout-nav">
	<li class="active">
		<a href="#billing">
			<?php _e('Billing Address' , 'Avada'); ?>
		</a>
	</li>
	<li>
		<a href="#shipping">
			<?php _e('Shipping Address' , 'Avada'); ?>
		</a>
	</li>
	<li>
		<a href="#payment-container">
			<?php _e('Review &amp; Payment' , 'Avada'); ?>
		</a>
	</li>
</ul>

<?php
// filter hook for include new pages inside the payment method
$get_checkout_url = apply_filters( 'woocommerce_get_checkout_url', $woocommerce->cart->get_checkout_url() ); ?>

<form name="checkout" method="post" class="checkout woocommerce-content-box" action="<?php echo esc_url( $get_checkout_url ); ?>">

	<?php if ( sizeof( $checkout->checkout_fields ) > 0 ) : ?>

		<?php do_action( 'woocommerce_checkout_before_customer_details' ); ?>

		<div class="" id="customer_details">

			<div class="col-1" id="billing">

				<?php do_action( 'woocommerce_checkout_billing' ); ?>

				<a href="#shipping" class="default button small continue-checkout"><?php _e('Continue', 'Avada'); ?></a>

			</div>

			<div class="col-2" id="shipping">

				<?php do_action( 'woocommerce_checkout_shipping' ); ?>

				<a href="#payment-container" class="default button small continue-checkout"><?php _e('Continue', 'Avada'); ?></a>

			</div>

		</div>

		<?php do_action( 'woocommerce_checkout_after_customer_details' ); ?>

	<?php endif; ?>

	<div id="payment-container">
		<h2 id="order_review_heading"><?php _e( 'Review &amp Payment', 'Avada' ); ?></h2>

		<?php do_action( 'woocommerce_checkout_order_review' ); ?>
	</div>

</form>

<?php do_action( 'woocommerce_after_checkout_form', $checkout ); ?>
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

<?php // woocommerce_get_template('user-welcome.php'); ?>

<?php do_action( 'woocommerce_before_checkout_form', $checkout );

// If checkout registration is disabled and not logged in, the user cannot checkout
if ( ! $checkout->enable_signup && ! $checkout->enable_guest_checkout && ! is_user_logged_in() ) {
	echo apply_filters( 'woocommerce_checkout_must_be_logged_in_message', __( 'You must be logged in to checkout.', 'woocommerce' ) );
	return;
}

/** Get Cart details Here **/

$cardDetails = $woocommerce->cart->get_cart();
foreach($cardDetails as $cDK => $cDV){
	$pType = $cDV['data']->parent->product_type;
	break;
}

/****/

?>
<ul class="woocommerceHelper woocommerce-checkout-nav">
    <?php  $cls = "active_tab";
    if(!is_user_logged_in() && 'variable-subscription' == $pType) { ?>
	 <style>
            #main #sidebar {
                display:none !important;
            }
			 #main #content {
                width: 100% !important;
            }
        </style>
    <li class="active <?php echo $cls; ?>">
        <a href="#regis_signin">
            <?php _e('Sign Up' , 'Avada'); ?>
        </a>
    </li>
    <?php $cls = 'inactive_tab'; } ?>
	<li class="active <?php echo $cls; ?>">
        <a href="#billing">
			<?php _e('Order and Payment' , 'Avada'); ?>
        </a>
	</li>
	<!--<li>
        <a href="#payment-container">
			<?php _e('Review &amp; Payment' , 'Avada'); ?>
        </a>
	</li>-->
    <div class="clear"></div>
</ul>
<?php 
 
?>
<div class="alert error woocommerce-message in_chk" style="display: none;">
    <div class="msg"></div>
    <a href="#" class="toggle-alert">Toggle</a>
</div>
<?php if(!is_user_logged_in()  && 'variable-subscription' == $pType) { ?>

    <div class="regis_signin" id="regis_signin">
        <?php // echo do_shortcode('[woocommerce_my_account]'); ?>
        <?php if (get_option('woocommerce_enable_myaccount_registration')=='yes') : ?>

<div class="col2-set" id="customer_login">

	<div class="one_half" id="customer_login_box">

        <h2><?php _e( 'Register An Account', 'Avada' ); ?></h2>
        <div class="sep-double"></div>
        <form method="post" class="register">

            <p class="form-row form-row-first">
                <input type="text" class="input-text" name="first_name" id="first_name" value="<?php if (isset($_POST['first_name'])) echo esc_attr($_POST['first_name']); ?>" placeholder="<?php _e( 'First Name', 'Avada' ); ?>" />
            </p>
            <p class="form-row form-row-first">
                <input type="text" class="input-text" name="last_name" id="last_name" value="<?php if (isset($_POST['last_name'])) echo esc_attr($_POST['last_name']); ?>" placeholder="<?php _e( 'Last Name', 'Avada' ); ?>" />
            </p>

            <?php if ( get_option( 'woocommerce_registration_email_for_username' ) == 'no' ) : ?>


            <p class="form-row form-row-first">
                <input type="text" class="input-text" name="username" id="reg_username" value="<?php if (isset($_POST['username'])) echo esc_attr($_POST['username']); ?>" placeholder="<?php _e( 'Username', 'Avada' ); ?>" />
            </p>

				<p class="form-row form-row-last">

			<?php else : ?>

				<p class="form-row form-row-wide">

			<?php endif; ?>

            <input type="email" class="input-text" name="email" id="reg_email" value="<?php if (isset($_POST['email'])) echo esc_attr($_POST['email']); ?>" placeholder="<?php _e( 'Email', 'Avada' ); ?>" />
        </p>

            <div class="clear"></div>

            <p class="form-row form-row-first">
                <input type="password" class="input-text" name="password" id="reg_password" value="<?php if (isset($_POST['password'])) echo esc_attr($_POST['password']); ?>" placeholder="<?php _e( 'Password', 'Avada' ); ?>" />
            </p>
            <!--
            <p class="form-row form-row-last">
                <input type="password" class="input-text" name="password2" id="reg_password2" value="<?php if (isset($_POST['password2'])) echo esc_attr($_POST['password2']); ?>" placeholder="<?php _e( 'Re-enter password', 'Avada' ); ?>" />
            </p>
            -->
            <div class="clear"></div>

            <p class="form-row form-row-first">
                <input type="text" class="input-text" name="zipcode" id="zipcode" value="<?php if (isset($_POST['zipcode'])) echo esc_attr($_POST['zipcode']); ?>" placeholder="<?php _e( 'Zipcode (shipping)', 'Avada' ); ?>" />
            </p>
            <!-- Spam Trap -->
            <div style="left:-999em; position:absolute;"><label for="trap">Anti-spam</label><input type="text" name="email_2" id="trap" tabindex="-1" /></div>

            <?php do_action( 'register_form' ); ?>

            <p class="form-row">
                <?php $woocommerce->nonce_field('register', 'register') ?>
                <input type="hidden" value="<?php the_permalink(); ?>" name="redirect">
                <input type="submit" class="button comment-submit small" name="register" value="<?php _e( 'Register', 'woocommerce' ); ?>" />
            </p>

        </form>

    </div>

    <div class="one_half last" id="customer_login_box">

<?php endif; ?>

        <h2><?php _e('I\'m a Returning Customer', 'Avada'); ?></h2>
        <div class="sep-double"></div>

        <form method="post" class="login_custom">
            <p class="form-row form-row-first">
                <input type="text" class="input-text" name="username" id="username" placeholder="<?php _e('Username or Email Address', 'Avada'); ?>" />
            </p>
            <p class="form-row form-row-last">
                <input class="input-text" type="password" name="password" id="password"  placeholder="<?php _e('Password', 'Avada'); ?>" />
            </p>
            <div class="clear"></div>

            <p class="form-row">
                <?php $woocommerce->nonce_field('login', 'login') ?>
                <input type="hidden" value="<?php the_permalink(); ?>" name="redirect">
                <input type="submit" class="button comment-submit small" name="login" value="<?php _e( 'Login', 'Avada' ); ?>" />

                <span class="remember-box"><label for="rememberme"><input name="rememberme" type="checkbox" id="rememberme" value="forever"><?php _e('Remember Me', 'Avada'); ?></label></span>

                  <a class="lost_password" href="<?php echo home_url() . '/lost-password/'; ?>"><?php _e( 'Lost Password?', 'Avada' ); ?></a>
            </p>
        </form>

        <?php if (get_option('woocommerce_enable_myaccount_registration')=='yes') : ?>

	</div>

</div>
<?php endif; ?>
    </div>

<?php  } else { ?>

<?php
// filter hook for include new pages inside the payment method
$get_checkout_url = apply_filters( 'woocommerce_get_checkout_url', $woocommerce->cart->get_checkout_url() ); ?>

<form name="checkout" method="post" class="checkout woocommerce-content-box" action="<?php echo esc_url( $get_checkout_url ); ?>">

	<?php if ( sizeof( $checkout->checkout_fields ) > 0 ) : ?>

		<?php do_action( 'woocommerce_checkout_before_customer_details' ); ?>

		<div class="" id="customer_details">
			<div class="col-1" id="billing">
                <?php
                     do_action( 'woocommerce_checkout_billing' );
                     do_action( 'woocommerce_checkout_shipping' );
                     do_action( 'woocommerce_checkout_order_review' );
                 ?>
                <!-- <a href="#payment-container" class="default button small continue-checkout"><?php _e('Continue', 'Avada'); ?></a>-->
			</div>
            <!-- <div id="payment-container">
                <h2 id="order_review_heading"><?php _e( 'Review &amp Payment', 'Avada' ); ?></h2>
                <?php do_action( 'woocommerce_checkout_order_review' ); ?>
            </div>  -->
		</div>
<div style="margin-top: -46px;">
<!-- GeoTrust QuickSSL [tm] Smart  Icon tag. Do not edit. -->
<script language="javascript" type="text/javascript" src="//smarticon.geotrust.com/si.js"></script>
<!-- end  GeoTrust Smart Icon tag -->
</div>
		<?php do_action( 'woocommerce_checkout_after_customer_details' ); ?>

	<?php endif; ?>

</form>
<?php } ?>
<?php do_action( 'woocommerce_after_checkout_form', $checkout ); ?>

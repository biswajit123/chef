<?php
/**
 * Login Form
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $woocommerce; ?>

<?php $woocommerce->show_messages(); ?>

<?php do_action('woocommerce_before_customer_login_form'); ?>

<?php if (get_option('woocommerce_enable_myaccount_registration')=='yes') : ?>

<div class="col2-set" id="customer_login">

	<div class="one_half" id="customer_login_box">

<?php endif; ?>

		<h2><?php _e('I\'m a Returning Customer', 'Avada'); ?></h2>
		<div class="sep-double"></div>

		<form method="post" class="login">
			<p class="form-row form-row-first">
				<input type="text" class="input-text" name="username" id="username" placeholder="<?php _e('Username or Email Address', 'Avada'); ?>" />
			</p>
			<p class="form-row form-row-last">
				<input class="input-text" type="password" name="password" id="password"  placeholder="<?php _e('Password', 'Avada'); ?>" />
			</p>
			<div class="clear"></div>

			<p class="form-row">
				<?php $woocommerce->nonce_field('login', 'login') ?>
				<input type="submit" class="button comment-submit small" name="login" value="<?php _e( 'Login', 'Avada' ); ?>" />
				
				<span class="remember-box"><label for="rememberme"><input name="rememberme" type="checkbox" id="rememberme" value="forever"><?php _e('Remember Me', 'Avada'); ?></label></span>

				<a class="lost_password" href="<?php

				$lost_password_page_id = woocommerce_get_page_id( 'lost_password' );

				if ( $lost_password_page_id )
					echo esc_url( get_permalink( $lost_password_page_id ) );
				else
					echo esc_url( wp_lostpassword_url( home_url() ) );

				?>"><?php _e( 'Lost Password?', 'Avada' ); ?></a>
			</p>
		</form>

<?php if (get_option('woocommerce_enable_myaccount_registration')=='yes') : ?>

	</div>

	<div class="one_half last" id="customer_login_box">

		<h2><?php _e( 'Register An Account', 'Avada' ); ?></h2>
		<div class="sep-double"></div>
		<form method="post" class="register">

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
			<p class="form-row form-row-last">
				<input type="password" class="input-text" name="password2" id="reg_password2" value="<?php if (isset($_POST['password2'])) echo esc_attr($_POST['password2']); ?>" placeholder="<?php _e( 'Re-enter password', 'Avada' ); ?>" />
			</p>
			<div class="clear"></div>

			<!-- Spam Trap -->
			<div style="left:-999em; position:absolute;"><label for="trap">Anti-spam</label><input type="text" name="email_2" id="trap" tabindex="-1" /></div>

			<?php do_action( 'register_form' ); ?>

			<p class="form-row">
				<?php $woocommerce->nonce_field('register', 'register') ?>
				<input type="submit" class="button comment-submit small" name="register" value="<?php _e( 'Register', 'woocommerce' ); ?>" />
			</p>

		</form>

	</div>

</div>
<?php endif; ?>

<?php do_action('woocommerce_after_customer_login_form'); ?>
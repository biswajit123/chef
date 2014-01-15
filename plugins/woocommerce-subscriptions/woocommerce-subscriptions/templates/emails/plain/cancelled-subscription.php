<?php
/**
 * Cancelled Subscription email (plain text)
 *
 * @author	Brent Shepherd
 * @package WooCommerce_Subscriptions/Templates/Emails/Plain
 * @version 1.4
 */
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

echo $email_heading . "\n\n";

printf( __( 'A subscription belonging to %s %s has been cancelled. Their subscription\'s details are as follows:', WC_Subscriptions::$text_domain ), $order->billing_first_name, $order->billing_last_name );

echo "\n\n****************************************************\n";

echo sprintf( __( 'Order number: %s', WC_Subscriptions::$text_domain), $order->get_order_number() ) . "\n";
echo sprintf( __( 'Order date: %s', WC_Subscriptions::$text_domain), date_i18n( __( 'jS F Y', WC_Subscriptions::$text_domain ), strtotime( $order->order_date ) ) ) . "\n";
echo "\n" . sprintf( __( 'Subscription: %s', WC_Subscriptions::$text_domain ), $item_name );
echo "\n" . sprintf( __( 'Price: %s', WC_Subscriptions::$text_domain ), $recurring_total );
echo "\n" . sprintf( __( 'Last Payment: %s', WC_Subscriptions::$text_domain ), $last_payment );
if ( $end_of_prepaid_term ) {
	echo "\n" . sprintf( __( 'End of Prepaid Term: %s', WC_Subscriptions::$text_domain ), $end_of_prepaid_term );
}

do_action( 'woocommerce_email_order_meta', $order, true, true );

echo "\n\n****************************************************\n\n";

_e( 'Customer details', WC_Subscriptions::$text_domain );

if ( $order->billing_email )
	echo __( 'Email:', WC_Subscriptions::$text_domain ); echo $order->billing_email. "\n";

if ( $order->billing_phone )
	echo __( 'Tel:', WC_Subscriptions::$text_domain ); ?> <?php echo $order->billing_phone. "\n";

woocommerce_get_template( 'emails/plain/email-addresses.php', array( 'order' => $order ) );

echo "\n****************************************************\n\n";

echo apply_filters( 'woocommerce_email_footer_text', get_option( 'woocommerce_email_footer_text' ) );
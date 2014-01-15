<?php
/**
 * Cart Page
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $woocommerce; ?>

<?php $woocommerce->show_messages(); ?>

<?php do_action( 'woocommerce_before_cart' ); ?>
<div class="alert error woocommerce-message in_chk" style="display: none;">
    <div class="msg"></div>
    <a href="#" class="toggle-alert">Toggle</a>
</div>
<form action="<?php echo esc_url( $woocommerce->cart->get_cart_url() ); ?>" method="post" class="clearfix">

<div class="woocommerce-content-box full-width no-bottom-space clearfix">

<h2><?php echo sprintf(__('You Have %d items In Your Cart', 'Avada'), $woocommerce->cart->cart_contents_count); ?></h2>

<?php do_action( 'woocommerce_before_cart_table' ); ?>

<table class="shop_table cart" cellspacing="0">
	<thead>
		<tr>
			<th class="product-name"><?php _e( 'Item', 'woocommerce' ); ?></th>
			<th class="product-price"><?php _e( 'Price', 'woocommerce' ); ?></th>
			<th class="product-quantity"><?php _e( 'Quantity', 'woocommerce' ); ?></th>
			<th class="product-subtotal"><?php _e( 'Total', 'woocommerce' ); ?></th>
			<th class="product-remove">&nbsp;</th>
		</tr>
	</thead>
	<tbody>
		<?php do_action( 'woocommerce_before_cart_contents' ); ?>

		<?php
		if ( sizeof( $woocommerce->cart->get_cart() ) > 0 ) {
			foreach ( $woocommerce->cart->get_cart() as $cart_item_key => $values ) {
				$_product = $values['data'];
				if ( $_product->exists() && $values['quantity'] > 0 ) {
					?>
					<tr class = "<?php echo esc_attr( apply_filters('woocommerce_cart_table_item_class', 'cart_table_item', $values, $cart_item_key ) ); ?>">

						<!-- The thumbnail -->
						<td class="product-thumbnail">
							<?php
								$thumbnail = apply_filters( 'woocommerce_in_cart_product_thumbnail', $_product->get_image(), $values, $cart_item_key );

								if ( ! $_product->is_visible() || ( ! empty( $_product->variation_id ) && ! $_product->parent_is_visible() ) )
									echo $thumbnail;
								else
									printf('<a href="%s">%s</a>', esc_url( get_permalink( apply_filters('woocommerce_in_cart_product_id', $values['product_id'] ) ) ), $thumbnail );
							?>
							<div class="product-info">
							<?php
								if ( ! $_product->is_visible() || ( ! empty( $_product->variation_id ) && ! $_product->parent_is_visible() ) )
									echo apply_filters( 'woocommerce_in_cart_product_title', $_product->get_title(), $values, $cart_item_key );
								else
									printf('<a class="product-title" href="%s">%s</a>', esc_url( get_permalink( apply_filters('woocommerce_in_cart_product_id', $values['product_id'] ) ) ), apply_filters('woocommerce_in_cart_product_title', $_product->get_title(), $values, $cart_item_key ) );

								// Meta data
								echo $woocommerce->cart->get_item_data( $values );

                   				// Backorder notification
                   				if ( $_product->backorders_require_notification() && $_product->is_on_backorder( $values['quantity'] ) )
                   					echo '<p class="backorder_notification">' . __( 'Available on backorder', 'woocommerce' ) . '</p>';
							?>
						</div>
						</td>

						<!-- Product price -->
						<td class="product-price">
							<?php
								$product_price = get_option('woocommerce_tax_display_cart') == 'excl' ? $_product->get_price_excluding_tax() : $_product->get_price_including_tax();

								echo apply_filters('woocommerce_cart_item_price_html', woocommerce_price( $product_price ), $values, $cart_item_key );
							?>
						</td>

						<!-- Quantity inputs -->
						<td class="product-quantity">
							<?php
								if ( $_product->is_sold_individually() ) {
									$product_quantity = sprintf( '1 <input type="hidden" name="cart[%s][qty]" value="1" />', $cart_item_key );
								} else {

									$step	= apply_filters( 'woocommerce_quantity_input_step', '1', $_product );
									$min 	= apply_filters( 'woocommerce_quantity_input_min', '', $_product );
									$max 	= apply_filters( 'woocommerce_quantity_input_max', $_product->backorders_allowed() ? '' : $_product->get_stock_quantity(), $_product );

									$product_quantity = sprintf( '<div class="quantity"><input type="number" name="cart[%s][qty]" step="%s" min="%s" max="%s" value="%s" size="4" title="' . _x( 'Qty', 'Product quantity input tooltip', 'woocommerce' ) . '" class="input-text qty text" maxlength="12" /></div>', $cart_item_key, $step, $min, $max, esc_attr( $values['quantity'] ) );
								}

								echo apply_filters( 'woocommerce_cart_item_quantity', $product_quantity, $cart_item_key );
							?>
						</td>

						<!-- Product subtotal -->
						<td class="product-subtotal">
							<?php
								echo apply_filters( 'woocommerce_cart_item_subtotal', $woocommerce->cart->get_product_subtotal( $_product, $values['quantity'] ), $values, $cart_item_key );
							?>
						</td>

						<!-- Remove from cart link -->
						<td class="product-remove">
							<?php
								echo apply_filters( 'woocommerce_cart_item_remove_link', sprintf('<a href="%s" class="remove" title="%s">&times;</a>', esc_url( $woocommerce->cart->get_remove_url( $cart_item_key ) ), __( 'Remove this item', 'woocommerce' ) ), $cart_item_key );
							?>
						</td>
					</tr>
					<?php
				}
			}
		}

		do_action( 'woocommerce_cart_contents' );
		?>

		<?php do_action( 'woocommerce_after_cart_contents' ); ?>
	</tbody>
</table>

<?php do_action( 'woocommerce_after_cart_table' ); ?>

</div>

<div class="cart-collaterals clearfix">

	<?php do_action('woocommerce_cart_collaterals'); ?>

	<div class="one_half">

		<div class="woocommerce-content-box full-width">

			<strong>Delivery Date</strong>: <?php echo get_delivery_date(); ?>

			<?php //woocommerce_shipping_calculator(); ?>

		</div>

		<?php if ( $woocommerce->cart->coupons_enabled() ) { ?>

	 <div class="woocommerce-content-box full-width">

		<h2><?php _e( 'Have A Coupon Code?', 'woocommerce' ); ?></h2>
			<div class="coupon">

				<input name="coupon_code" class="input-text" id="coupon_code" value="" /> <input type="submit" class="button comment-submit small" name="apply_coupon" value="<?php _e( 'Apply', 'woocommerce' ); ?>" />

				<?php do_action('woocommerce_cart_coupon'); ?>

			</div>

		</div> 

		<!-- <div class="woocommerce-content-box full-width">

                        <h2>Have A Promotional Code?</h2>
                       
							<div class="pcode">
								<input type="radio" name="test1" value="ref" checked="checked" onclick="changeRef()">Referral Code
								<div class="clear"></div>
							</div>
							<div class="pcode">
								<input type="radio" name="test1" value="pro" onclick="changeRef()">Coupon Code
								<div class="clear"></div>
							</div>
							<div class="clear"></div>
						
						<div class="coupon">													
							<div id="coupon" style="display:none">
								<input name="coupon_code" class="input-text" id="coupon_code" value="" st=""> <input type="submit" class="button comment-submit small" id="coupon_code_submit" name="apply_coupon" value="Apply">

							</div>                           
							<div id="ref" style="display:block">
								
									<input name="ref_code" class="input-text" id="ref_code" value="" st=""> <input type="submit" id="ref_code_submit" class="button comment-submit small" value="Apply">
								
							</div>
						</div>
                    </div> -->

		<?php } ?>

	</div>

	<div class="woocommerce-content-box one_half last cart-totals-container">
		<?php woocommerce_cart_totals(); ?>

		<!-- <input type="submit" class="comment-submit small button" name="update_cart" value="<?php _e( 'Update Shopping Cart', 'woocommerce' ); ?>" /> --> <input type="submit" class="comment-submit small checkout-button button alt" name="proceed" value="<?php _e( 'Proceed to Checkout', 'woocommerce' ); ?>" />
	</div>

</div>

<?php do_action('woocommerce_proceed_to_checkout'); ?>

<?php $woocommerce->nonce_field('cart') ?>

</form>

<?php do_action( 'woocommerce_after_cart' ); ?>
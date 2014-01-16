<?php
/**
 * My Account page
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $data, $woocommerce, $wpdb; ?>

<?php //  woocommerce_get_template('user-welcome.php'); ?>

<?php // do_action( 'woocommerce_before_my_account' ); ?>

<?php woocommerce_get_template('myaccount-nav.php'); ?>

<div class="woocommerce-content-box">

<?php $woocommerce->show_messages(); ?>

<?php woocommerce_get_template( 'myaccount/my-downloads.php'); ?>

<?php
$customer_orders = get_posts( array(
    'numberposts' => 1,
    'meta_key'    => '_customer_user',
    'meta_value'  => get_current_user_id(),
    'post_type'   => 'shop_order',
    'post_status' => 'publish'
) );

$cu = '';
$odr = $customer_orders[0]->ID;
/* Fetch Oder Details */
$srOW = $wpdb->get_row("select * FROM wp_woocommerce_order_items WHERE order_id = " . $odr);
$mealOrder = woocommerce_get_order_item_meta($srOW->order_item_id, 'Servings:', true);
$mealType = woocommerce_get_order_item_meta($srOW->order_item_id, '_subscription_period', true);
$mealTotal = woocommerce_get_order_item_meta($srOW->order_item_id, '_recurring_line_subtotal', true);
$vari_ID = woocommerce_get_order_item_meta($srOW->order_item_id, '_variation_id', true);
/**/


global $current_user;
get_currentuserinfo();
$user_id = get_current_user_id();

/* Get Saved Card */
$card_details = get_user_meta( get_current_user_id(), '_stripe_customer_id', true );
 $current_subscription = WC_Subscriptions_Manager::get_users_subscriptions(get_current_user_id()) ;
$p = get_product(woocommerce_get_order_item_meta($srOW->order_item_id, '_product_id', true));
$v = $p->get_available_variations();
foreach($current_subscription as $key => $value){
	$current_subscription = $value;
	break;
}

$odr = $current_subscription['order_id'];

$dd = explode(' ', get_post_meta($odr, 'Delivery Date', true));
$dd = explode('/',$dd[0]);
$dd[2] = '20'. $dd[2];
$temp = $dd[0]; $dd[0] = $dd[2]; $dd[2] = $temp;
$temp = $dd[1]; $dd[1] = $dd[2]; $dd[2] = $temp;
$dd = implode('', $dd);

?>
<?php if ( $current_subscription ) : ?>
<table class="my_account">
    <tr>
         <td>
            <h2 class="header_title"><?php echo _e( 'My Plan', 'woocommerce' ) ; ?>
			<?php
				$curDay = date_i18n('l');
				$checkDay = array("Thursday");				
			?>
			<?php if($dd < date_i18n('Ymd') && !in_array($curDay, $checkDay)) { $clas = "plan_edit"; } else if($dd > date_i18n('Ymd')) { $clas = "show_message_not_change"; } else { $clas = "show_message_not_change_on_thrusday";  } ?>
				<span class="<?php echo $clas; ?>">Edit</span>			
			</h2>
            <div class="plan_information">
                <?php
                        
                        $_product = get_product( $current_subscription['product_id'] );

                        
                        /* Fetch Oder Details */
                        $srOW = $wpdb->get_row("select * FROM wp_woocommerce_order_items WHERE order_id = " . $odr);
                        $mealOrder = woocommerce_get_order_item_meta($srOW->order_item_id, 'Servings:', true);
                        $mealType = woocommerce_get_order_item_meta($srOW->order_item_id, '_subscription_period', true);
                        $mealTotal = woocommerce_get_order_item_meta($srOW->order_item_id, '_recurring_line_subtotal', true);
                        $vari_ID = woocommerce_get_order_item_meta($srOW->order_item_id, '_variation_id', true);                /**/

                $args = array( 'post_type' => 'product', 'post_status' => 'publish' );
                $loop = new WP_Query( $args );$_var= array();
                $i=0;
                if ( $loop->have_posts() ) {
                    while ( $loop->have_posts() ) : $loop->the_post();	
						$p = get_product(get_the_ID());
						if($p->product_type == 'variable-subscription' && $_product->product_type == 'variable-subscription')
                        $_var[get_the_ID()] = $_product->get_available_variations();
                    endwhile;
                }
                wp_reset_query();
				

                ?>
                <div class="info_heading">Meal Plan</div>
                <div class="info_values">
                    <p><?php echo $_product->post->post_title; ?></p>
                </div>
                <div class="info_heading">Subscription</div>
                <div class="info_values">
                    <p>
                        <?php foreach($_var as $_k => $_variations) {

                            foreach($_variations as $_vk => $_vv){
                                if($_vv['variation_id'] ==  $vari_ID){
                                    $variation_name = $_vv['attributes']['attribute_servings'];				
									$p = strip_tags($_vv['price_html']);
								}

                            }
                           } echo $variation_name; ?>
                    </p>
                </div>
                <div class="info_heading">Price</div>
                <div class="info_values">
                    <p><?php echo $p; ?></p>
                </div>
            </div>
			<div class="show_edit_plan_popup">
			<span class="button b-close"><span>X</span></span>
			<h3>Changes to My Plan may only be made following receipt of your first delivery.</h3>
			</div>
			<div class="show_edit_plan_popup1 not_on_thrusday">
			<span class="button b-close"><span>X</span></span>
			<h3>Sorry for the inconvenience but changes to My Plan are not possible on Thursdays.</h3>
			</div>
            <div class="Plan_info editmc Plan_info_edit">
                <span class="button b-close"><span>X</span></span>
                <h2 class="header_title"><?php echo _e( 'My Plan', 'woocommerce' ) ; ?></h2>
                <form class="plan_info_edit_form" id="plan_info_edit_form">
                    <div class="info_heading">Meal Plan</div>
                    <div class="info_values">
                        <select class="meal_main_type" id="meal_plan" name="meal_plan">
                            <?php
                                $args = array( 'post_type' => 'product', 'post_status' => 'publish' );
                                $loop = new WP_Query( $args );
                                $i=0;
                                if ( $loop->have_posts() ) {
                                while ( $loop->have_posts() ) : $loop->the_post();
								$p = get_product(get_the_ID());
								if($p->product_type == 'variable-subscription' ) {
                                       ?><option da=<?php echo $i++; ?> value="<?php the_ID(); ?>" <?php echo (get_the_ID() ==  $current_subscription['product_id']) ? "selected=selected" : ''; ?> ><?php echo the_title(); ?></option><?php
                                    $_product = get_product(get_the_ID());
                                    $_var[get_the_ID()] = $_product->get_available_variations();
								}
                                endwhile;
                                }
                                wp_reset_query();
                            ?>
                        </select>
                        <input type="hidden" name="meal_plan_parent" value="<?php echo ($srOW->order_item_id)?$srOW->order_item_id:0; ?>" id="meal_plan_parent">

                    </div>
                    <div class="info_heading">Subscription</div>
                    <div class="info_values">
                        <?php foreach($_var as $_k => $_variations) { ?>
                            <?php if($current_subscription['product_id']==$_k){ $str = 'display:block;'; $name = "meal_plan_type"; } else { $str = 'display:none;'; $name=""; } ?>
                            <select id="meal_plan" class="mpc meal_plan_<?php echo $_k; ?>" name="<?php echo $name; ?>" style="<?php echo $str; ?>">
                            <?php
                                foreach($_variations as $_vk => $_vv){		
									
                                    if($_vv['variation_id'] ==  $vari_ID) {
                                        $name_va = $_vv['attributes']['attribute_servings'];
										$f_price = strip_tags($_vv['price_html']);
									}
                                    ?><option pricehtml="<?php echo strip_tags($_vv['price_html']); ?>" name_va="<?php echo $_vv['attributes']['attribute_servings']; ?>" value="<?php echo $_vv['variation_id']; ?>" <?php echo ($_vv['variation_id'] ==  $vari_ID) ? "selected=selected" : ''; ?> ><?php echo $_vv['attributes']['attribute_servings']; ?></option><?php
                                }
                            ?>
                            </select>
                        <?php } ?>
                    </div>
                    <div class="info_heading">Price</div>
                    <div class="info_values price_html">
                        <?php echo $f_price; ?>
                    </div>
                    <div class="info_values">
                        <input type="submit" value="Update Plan" id="plan_update_btn">
                    </div>
                </form>
            </div>
        </td>       
        <td>
            <h2 class="header_title"><?php echo _e( 'Delivery Information', 'woocommerce' ) ; ?><span class="delivery_edit">Edit</span></h2>
            <div class="delivery_information">
                <div class="info_heading">Name & Address</div>
                <div class="info_values">
                    <script type="text/javascript">
                        jQuery(function($){
                            $.load_delivery_info();
                        });
                    </script>
                </div>
            </div>
            <div class="delivery_info editmc delivery_info_edit">
                <span class="button b-close"><span>X</span></span>
                <h2 class="header_title"><?php echo _e( 'Delivery Information(shipping)', 'woocommerce' ) ; ?></h2>
                <form class="delivery_info_edit_form" id="delivery_info_edit_form">
                    <div class="info_heading">First Name</div>
                    <div class="info_values">
                        <input type="text" required="true" value="<?php echo get_user_meta(get_current_user_id(), 'shipping_first_name', true); ?>" id="delivery_first_name" name="delivery_first_name">
                    </div>
                    <div class="info_heading">Last Name</div>
                    <div class="info_values">
                        <input type="text" required="true" value="<?php echo get_user_meta(get_current_user_id(), 'shipping_last_name', true); ?>" id="delivery_last_name" name="delivery_last_name">
                    </div>
                    <div class="info_heading">Address</div>
                    <div class="info_values">
                        <input type="text" required="true" value="<?php  echo get_user_meta(get_current_user_id(), 'shipping_address_1', true); ?>" id="delivery_address" name="delivery_address">
                    </div>
                    <div class="info_heading">City</div>
                    <div class="info_values">
                        <input type="text" required="true" value="<?php  echo get_user_meta(get_current_user_id(), 'shipping_city', true); ?>" id="delivery_city" name="delivery_city">
                    </div>
                    <div class="info_heading">State</div>
                    <div class="info_values">
                        <input type="text" required="true" value="<?php  echo get_user_meta(get_current_user_id(), 'shipping_state', true); ?>" id="delivery_state" name="delivery_state">
                    </div>
                    <div class="info_heading">Postal Code</div>
                    <div class="info_values">
                        <input type="text" required="true" value="<?php  echo get_user_meta(get_current_user_id(), 'shipping_postcode', true) ?>" id="delivery_postcode" name="delivery_postcode">
                    </div>
                    <div class="info_heading">Phone</div>
                    <div class="info_values">
                        <input type="text" required="true" value="<?php  echo get_user_meta(get_current_user_id(), 'billing_phone', true); ?>" id="delivery_phone" name="delivery_phone">
                    </div>
                    <div class="info_values">
                        <input type="submit" value="Update Delivery" id="delivery_update_btn">
                    </div>
                </form>
            </div>
        </td>
    </tr>
    <tr>
        <td>
            <h2 class="header_title_last"><?php echo _e( 'Account Information', 'woocommerce' ) ; ?><span class="account_edit">Edit</span></h2>
            <div class="account_information">
                <script type="text/javascript">
                     jQuery(function($){
                        $.load_account_info();
                    });
                </script>
            </div>
            <div class="Account_info editmc account_info_edit">
                <span class="button b-close"><span>X</span></span>
                <h2 class="header_title"><?php echo _e( 'Account Information', 'woocommerce' ) ; ?></h2>
                <form class="account_info_edit_form" id="account_info_edit_form">
                    <div class="info_heading">First Name</div>
                    <div class="info_values">
                        <input type="text" value="<?php echo get_user_meta($user_id, 'first_name', true) ; ?>" name="user_first_name" id="user_first_name">
                    </div>
                    <div class="info_heading">Last Name</div>
                    <div class="info_values">
                        <input type="text" value="<?php echo get_user_meta($user_id, 'last_name', true); ?>" name="user_last_name" id="user_last_name">
                    </div>
                    <div class="info_heading">Email</div>
                    <div class="info_values">
                        <input type="text" value="<?php  echo $current_user->user_email; ?>" name="user_email" id="user_email">
                    </div>
					<div class="info_heading">Current Password</div>
                    <div class="info_values">
                        <input type="text" value="******" id="user_current_password" name="user_current_password">
                    </div>
                    <div class="info_heading">New Password</div>
                    <div class="info_values">
                        <input type="password" value="" char="1"  id="user_password" name="user_password" placeholder="**********">
                    </div>
                    <div class="info_heading">Re-Enter New Password</div>
                    <div class="info_values">
                        <input type="password" value="" id="user_password2" placeholder="**********">
                    </div>
                    <div class="info_values">
                        <input type="submit" value="Update Account" id="account_update_btn">
                    </div>
                </form>
            </div>
        </td>
        <td>
            <h2 class="header_title_last"><?php echo _e( 'Payment Information', 'woocommerce' ) ; ?><span class="payment_edit">Edit</span></h2>
            <div class="payment_information">
                <div class="info_heading">Name On Card</div>
                <div class="info_values">
                    <p><?php echo ($card_details['name_on_card'])?$card_details['name_on_card'] : get_user_meta(get_current_user_id(),'first_name', TRUE) . " " . get_user_meta(get_current_user_id(),'last_name', TRUE); ?></p>
                </div>
                <div class="info_heading">Card Number</div>
                <div class="info_values">
                    <p><?php  echo ($card_details['active_card'])?"Ending in ".$card_details['active_card']:'NA' ; ?></p>
                </div>
                <div class="info_heading">Expiration</div>
                <div class="info_values">
                    <p><?php echo ($card_details['exp_year'])?$card_details['exp_month']."/".$card_details['exp_year']:'NA' ; ?></p>
                </div>
            </div>
            <div class="Payment_info editmc payment_info_edit">
                <span class="button b-close"><span>X</span></span>
                <h2 class="header_title"><?php echo _e( 'Payment Information', 'woocommerce' ) ; ?></h2>
                <form class="paymenty_info_edit_form" id="paymenty_info_edit_form">
                    <div class="info_heading">Name On Card</div>
                    <div class="info_values">
                        <input type="text" name="full_name" value="<?php echo ($card_details['name_on_card'])?$card_details['name_on_card'] : get_user_meta(get_current_user_id(),'first_name', TRUE) . " " . get_user_meta(get_current_user_id(),'last_name', TRUE); ?>" id="name_on_card">
                    </div>
                    <div class="info_heading">Card Number</div>
                    <div class="info_values">
                        <input type="text" name="card_number" value="<?php echo ($card_details['active_card'])?"************".$card_details['active_card']:'' ; ?>" id="active_card_number">
                    </div>
                    <div class="info_heading">Expiration Month</div>
                    <div class="info_values">
                        <input type="text" name="exp_month" value="<?php  echo ($card_details['exp_month'])?$card_details['exp_month']:''; ?>" id="card_exp_month">
                    </div>
                    <div class="info_heading">Expiration Year</div>
                    <div class="info_values">
                        <input type="text" name="exp_year" value="<?php  echo ($card_details['exp_year'])?$card_details['exp_year']:''; ?>" id="card_exp_year">
                    </div>
                    <div class="info_heading">CVC Code</div>
                    <div class="info_values">
                        <input type="text" value="***" id="card_cvc" name="cvc">
                    </div>
                    <div class="info_values">
                        <input type="submit" value="Update Account" id="payment_update_btn">
                    </div>
                </form>
            </div>
        </td>
    </tr>
</table>
    <?php endif; ?>
</div>

<?php // do_action( 'woocommerce_after_my_account' ); ?>
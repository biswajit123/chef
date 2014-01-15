<?php

/**
 * Proper way to enqueue scripts and styles
 */
function avada_wooc_scripts() {
	
    //wp_enqueue_style('wooHelper_style', get_stylesheet_directory_uri());
    wp_enqueue_script('poping_script', get_template_directory_uri() . '/../Avada-Child-Theme/js/bp.min.js');
    wp_enqueue_script('wooHelper_script', get_template_directory_uri() . '/../Avada-Child-Theme/js/checkoutpage.js');
}

add_action( 'wp_enqueue_scripts', 'avada_wooc_scripts',100 );

function checkout_page_registration_redirect($redirect){
    global $wpdb, $woocommerce;
    /*  Code for add user meta while registering in the site  */
    update_user_meta(get_current_user_id(), 'first_name', $_REQUEST['first_name']);     // For User First Name
    update_user_meta(get_current_user_id(), 'last_name', $_REQUEST['last_name']);     // For User Last Name
    update_user_meta(get_current_user_id(), 'postalcode', $_REQUEST['zipcode']);     // For User Postal Code

    update_user_meta(get_current_user_id(), 'billing_first_name', $_REQUEST['first_name']);     // For User billing First Name
    update_user_meta(get_current_user_id(), 'billing_last_name', $_REQUEST['last_name']);     // For User billing Last Name
    update_user_meta(get_current_user_id(), 'billing_postcode', $_REQUEST['zipcode']);     // For User billing Postal Code
	update_user_meta(get_current_user_id(), 'shipping_postcode', $_REQUEST['zipcode']);

    /* Check for New Zip oe existing Zip Code */
    $check_zipcode=$wpdb->get_row("select * from `wp_zipcode` where `zipcode`='".$_REQUEST['zipcode']."'");
    if(!empty($check_zipcode)){
        if("active" != $check_zipcode->status){
            $woocommerce->add_error (__("Sorry !! we are not able to provide your order in that area."));
            $woocommerce->set_messages();
        }
    } else {
        $table='wp_zipcode';

        $data=array(
            'zipcode'=>$_REQUEST['zipcode'],
            'status'=>'inactive'
        );

        if($wpdb->insert( $table, $data))
            $woocommerce->add_error (__("Sorry !! we are not able to provide your order in that area."));
        $woocommerce->set_messages();
    }
    /*****/
    /*****/
    if(!empty($_REQUEST['redirect'])){
        return $_REQUEST['redirect'];
    } else {
        return $redirect;
    }
}
add_filter('woocommerce_registration_redirect', 'checkout_page_registration_redirect');
function validate_zipCode($zc){
    global $wpdb;
    $check_zipcode=$wpdb->get_row("select * from `wp_zipcode` where `zipcode`='".$zc."' and status='active'");
    if(!empty($check_zipcode)){
      return true;
    }
    return false;
}
function cZc(){

    $arr = array();
    $arr['status'] = 'error';
    $arr['message'] = "Sorry !! we are not able to provide your order in that area.";

    if(check_zip_using_param($_REQUEST['zipcode'])){
            $arr['status'] = 'success';
            $arr['message'] = "we are able to provide your order in that area, Thanks.";
    }
    echo json_decode($arr);
    exit;
}

add_action('wp_ajax_checkZipCode', 'cZc');
add_action('wp_ajax_nopriv_checkZipCode', 'cZc');

function check_zip_using_param($param){
    global $wpdb;
    $check_zipcode=$wpdb->get_row("select * from `wp_zipcode` where `zipcode`='".$param."'");
    if(!empty($check_zipcode)){
        if("active" == $check_zipcode->status){
            return true;
        }
    }
    return false;
}
remove_action('init','woocommerce_process_registration');
add_action('init','woocommerce_process2_registration');
function woocommerce_process2_registration() {

    global $woocommerce, $current_user;

    if ( ! empty( $_POST['register'] ) ) {

        $woocommerce->verify_nonce( 'register' );

        // Get fields
        $fName = isset( $_POST['first_name'] ) ? trim( $_POST['first_name'] ) : '';
        $lName = isset( $_POST['last_name'] ) ? trim( $_POST['last_name'] ) : '';
        $user_email = isset( $_POST['email'] ) ? trim( $_POST['email'] ) : '';
        $password   = isset( $_POST['password'] ) ? trim( $_POST['password'] ) : '';
        $password2  = isset( $_POST['password2'] ) ? trim( $_POST['password2'] ) : '';
        $user_email = apply_filters( 'user_registration_email', $user_email );
        $zipCode = isset( $_POST['zipcode'] ) ? trim( $_POST['zipcode'] ) : '';

        // Check First Name and Last name
        if ( ! $fName ) $woocommerce->add_error( __( 'First name is required.', 'woocommerce' ) );
        if ( ! $lName ) $woocommerce->add_error( __( 'Last name is required.', 'woocommerce' ) );

        if ( get_option( 'woocommerce_registration_email_for_username' ) == 'no' ) {

            $username 				= isset( $_POST['username'] ) ? trim( $_POST['username'] ) : '';
            $sanitized_user_login 	= sanitize_user( $username );

            // Check the username
            if ( $sanitized_user_login == '' ) {
                $woocommerce->add_error( '<strong>' . __( 'ERROR', 'woocommerce' ) . '</strong>: ' . __( 'Please enter a username.', 'woocommerce' ) );
            } elseif ( ! validate_username( $username ) ) {
                $woocommerce->add_error( '<strong>' . __( 'ERROR', 'woocommerce' ) . '</strong>: ' . __( 'This username is invalid because it uses illegal characters. Please enter a valid username.', 'woocommerce' ) );
                $sanitized_user_login = '';
            } elseif ( username_exists( $sanitized_user_login ) ) {
                $woocommerce->add_error( '<strong>' . __( 'ERROR', 'woocommerce' ) . '</strong>: ' . __( 'This username is already registered, please choose another one.', 'woocommerce' ) );
            }

        } else {

            $username 				= $user_email;
            $sanitized_user_login 	= sanitize_user( $username );

        }

        // Check the e-mail address
        if ( $user_email == '' ) {
            $woocommerce->add_error( '<strong>' . __( 'ERROR', 'woocommerce' ) . '</strong>: ' . __( 'Please type your e-mail address.', 'woocommerce' ) );
        } elseif ( ! is_email( $user_email ) ) {
            $woocommerce->add_error( '<strong>' . __( 'ERROR', 'woocommerce' ) . '</strong>: ' . __( 'The email address isn&#8217;t correct.', 'woocommerce' ) );
            $user_email = '';
        } elseif ( email_exists( $user_email ) ) {
            $woocommerce->add_error( '<strong>' . __( 'ERROR', 'woocommerce' ) . '</strong>: ' . __( 'This email is already registered, please choose another one.', 'woocommerce' ) );
        }

        // Password
        if ( ! $password ) $woocommerce->add_error( __( 'Password is required.', 'woocommerce' ) );
      /*  if ( ! $password2 ) $woocommerce->add_error( __( 'Re-enter your password.', 'woocommerce' ) );
        if ( $password != $password2 ) $woocommerce->add_error( __( 'Passwords do not match.', 'woocommerce' ) );*/
        if( !$zipCode ) $woocommerce->add_error('Zip code is required.');

        // Spam trap
        if ( ! empty( $_POST['email_2'] ) )
            $woocommerce->add_error( __( 'Anti-spam field was filled in.', 'woocommerce' ) );

        // More error checking
        $reg_errors = new WP_Error();
        do_action( 'register_post', $sanitized_user_login, $user_email, $reg_errors );
        $reg_errors = apply_filters( 'registration_errors', $reg_errors, $sanitized_user_login, $user_email );

        if ( $reg_errors->get_error_code() ) {
            $woocommerce->add_error( $reg_errors->get_error_message() );
            return;
        }

        if ( $woocommerce->error_count() == 0 ) {

            $new_customer_data = array(
                'user_login' => $sanitized_user_login,
                'user_pass'  => $password,
                'user_email' => $user_email,
                'role'       => 'customer'
            );

            $user_id = wp_insert_user( apply_filters( 'woocommerce_new_customer_data', $new_customer_data ) );

			update_user_meta($user_id, 'shipping_first_name', $fName);
			update_user_meta($user_id, 'shipping_last_name', $lName);

            if ( is_wp_error($user_id) ) {
                $woocommerce->add_error( '<strong>' . __( 'ERROR', 'woocommerce' ) . '</strong>: ' . __( 'Couldn&#8217;t register you&hellip; please contact us if you continue to have problems.', 'woocommerce' ) );
                return;
            }

            // Get user
            $current_user = get_user_by( 'id', $user_id );

            // Action
            do_action( 'woocommerce_created_customer', $user_id );

            // send the user a confirmation and their login details
            $mailer = $woocommerce->mailer();
            $mailer->customer_new_account( $user_id, $password );

            // set the WP login cookie
            $secure_cookie = is_ssl() ? true : false;
            wp_set_auth_cookie($user_id, true, $secure_cookie);

            // Redirect
            if ( wp_get_referer() ) {
                $redirect = esc_url( wp_get_referer() );
            } else {
                $redirect = esc_url( get_permalink( woocommerce_get_page_id( 'myaccount' ) ) );
            }

            wp_redirect( apply_filters( 'woocommerce_registration_redirect', $redirect ) );
            exit;
        }

    }
}
//remove_action( 'template_redirect', 'woocommerce_save_address' );

add_action( 'woocommerce_before_checkout_process', 'woocommerce_save_address_with_checking' );

function woocommerce_save_address_with_checking() {
    global $woocommerce;
	
	    /* Street Api Integration Here */
    // Customize this (get ID/token values in your SmartyStreets account)
    $authId = "0b28d70e-5574-4e9e-b2e0-9e27a1356394";
    $authToken = "A2OwR42/BGX/ZnI6uuagfLf2NzvFHZFUxMDae17w8Gmr0P02iEPbxpd9BbcKJlSyCGRDEvzXEA0lW8BaCNomeQ==";

// Input. You can fill out any combination of the 3 values (except city only) and leave any blank
    $street = $_POST['billing_address_1'];
    $city = $_POST['billing_city'];
    $state = $_POST['billing_state'];
    $postal_code = $zipcode = $_POST['billing_postcode'];

	if(!empty($_POST['shipping_city']) && !empty($_POST['shipping_address_1']))
		$postal_code = $_POST['shipping_postcode'];

	$js = array();
	$js[0]['street'] = $street;
	$js[0]['city'] = $city;
	$js[0]['state'] = $state;
	$js[0]['zipCode'] = $zipcode;
	$json_input = json_encode($js);
		// Initialize cURL
		$ch = curl_init();

		// Configure the cURL command
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		//curl_setopt($ch, CURLOPT_HTTPHEADER, array('x-standardize-only: true'));    // Enable this line if you want to only standardize addresses that are "good enough"
		curl_setopt($ch, CURLOPT_VERBOSE, 0);
		// Use the next line if you prefer to use your Javascript API token rather than your REST API token.
		//curl_setopt($ch, CURLOPT_REFERER, "http://YOUR-AUTHORIZED-DOMAIN-HERE");
		curl_setopt($ch, CURLOPT_URL, "https://api.smartystreets.com/street-address/?auth-id={$authId}&auth-token={$authToken}");
		curl_setopt($ch, CURLOPT_POSTFIELDS, $json_input);

		// Output comes back as a JSON string.
		$json_output = curl_exec($ch);
		$json_output = json_decode($json_output);
    if(empty($json_output)){        
        $woocommerce->add_error( __( 'Invalid street for given city and state.', 'woocommerce' ) );
    }
    /****/


    /* Code to Check Valid Zip Code */
   if( !validate_zipCode( $postal_code ) ) :
        $woocommerce->add_error( __( 'We are unable to provide order in this postcode/ZIP area.', 'woocommerce' ) );
    endif;


}


//Add delivery date to checkout

/*add_action('woocommerce_after_checkout_billing_form', 'my_custom_checkout_field');

function my_custom_checkout_field( $checkout ) {


    $deliverydate=get_delivery_date();

    echo '<div id="my_custom_checkout_field">';

    woocommerce_form_field( 'e_deliverydate', array(

            'type'              => 'text',
            'label'             =>  __('Delivery Date'),
            'placeholder'       => __('Delivery Date'),
            'maxlength'         => false,
            'required'          => true,
            'class'             => array(),
            'label_class'       => array(),
            'return'            => false,
            'options'           => array(),
            'custom_attributes' => array('readonly'=>'readonly'),
            'validate'          => array(),
            'default'           => ''),

        //$checkout->get_value( 'e_deliverydate' ));
        $deliverydate);
    echo "<div style='clear: both;'></div>";
    echo "*Delivery Date means at that time the order placed will reach to the billing address. We deliver only on Tuesday";
    echo '</div>';

}
*/
add_action('woocommerce_checkout_update_order_meta', 'my_custom_checkout_field_update_order_meta');
function my_custom_checkout_field_update_order_meta( $order_id ) {

    //update_post_meta( $order_id, 'Delivery Date', esc_attr($_POST['e_deliverydate']));
    update_post_meta( $order_id, 'Delivery Date', get_delivery_date());

}

function get_delivery_date(){
    /*date_default_timezone_set('America/New_York');*/
    $today=date('d-m-Y');
    $now = strtotime($today);
    $nextTuesday = strtotime('next tuesday');

    $datediff = $nextTuesday-$now;
    $days= floor($datediff/(60*60*24));
    $deliverydate="";

    if($days<6)
    {
        $date = strtotime("+7 day", $nextTuesday);
        return $deliverydate= date('m/d/y', $date)." (".date('l', $date).")";
    }else{
        return $deliverydate= date('m/d/y', $nextTuesday)." (".date('l', $nextTuesday).")";
    }
}


//Delivery date end

function woocommerce_ajax_cart_update(){
    global $woocommerce;
    $product_id = $_REQUEST['product_id'];
    $variation_id = $_REQUEST['variation_id'];
    $variations = $_REQUEST['variation_name'];
	if(!session_id())
		session_start();
	if(isset($_SESSION['flagCheck']))
	unset($_SESSION['flagCheck']);

	$woocommerce->cart->remove_coupons(1);
    woocommerce_empty_cart();
	
    $woocommerce->cart->add_to_cart( $product_id, 1, $variation_id, $variations );
    echo "Done";
    exit;
}

function upd_uinfo() {
    $user_id = get_current_user_id();

    foreach( $_REQUEST['fields'] as $key => $field )
        if(!empty($field))
            update_user_meta( $user_id, $key, woocommerce_clean( $field ) );

    echo 'done';
    /**/
}
add_action('wp_ajax_updateAjaxCart', 'woocommerce_ajax_cart_update');
add_action('wp_ajax_upd_user_info', 'upd_uinfo');



function populate_cart_if_empty($p_id){
    global $woocommerce, $wp_query, $product;
	$woocommerce->cart->remove_coupons(1); 
	if(!session_id())
		session_start();
	if(isset($_SESSION['flagCheck']))
	unset($_SESSION['flagCheck']);

    woocommerce_empty_cart();
    return $p_id;

}
add_filter('woocommerce_add_to_cart_product_id', 'populate_cart_if_empty', 0);

/** wooocommerce second project **/

function upd_subscription_of_current_holder(){
    global $woocommerce, $wpdb;
    // Define a array
        $message = array();
    $refCode = $_REQUEST['ref_code'];
    if(empty($refCode)){
        $message['status'] = 'error';
        $message['message'] = 'Please enter a value.';
        echo json_encode($message);
        exit;
    }
    /** Check For wallet balance **/

    $user_id = get_current_user_id();
    // Get The Subscription
    $subscriptionDetails = WC_Subscriptions_Manager::get_users_subscriptions( $user_id );

    foreach($subscriptionDetails as $p => $v){                
				 $productID = $v['product_id'];
                $orderID = $v['order_id'];
				break;
    }


    $wallet_Balance = get_user_meta($user_id, 'wallet', true);
    if(empty($wallet_Balance)){
        $message['status'] = 'error';
        $message['message'] = 'You have zero funds in your wallet.';
        echo json_encode($message);
        exit;
    }
    if($refCode > $wallet_Balance || $wallet_Balance == 0){
        $message['status'] = 'error';
        $message['message'] = 'You have no sufficient funds in your wallet.';
        echo json_encode($message);
        exit;
    }

    /***/
    $recurringBilling = get_post_meta($orderID, '_order_recurring_total', true);
    $deductBalance = $recurringBilling - $refCode;

    if($deductBalance < 0){
        $message['status'] = 'error';
        $message['message'] = 'You have enter getter than subscription price.'.$orderID;
        echo json_encode($message);
        exit;
    }
    /* store duplicate recurring Price */
    
    update_post_meta($orderID, '_order_recurring_total', $deductBalance);       // update the subscription
   
    /* Update wallet */
    $remaining_wallet_Balance = $wallet_Balance - $refCode;
    update_user_meta($user_id, 'wallet', $remaining_wallet_Balance);


    $user_deduction['date']=date('Y-m-d');
    $user_deduction['amount']=$refCode;

    $existing_amount = get_user_meta($user_id, 'user_used_amount_details', ture);
    if(!is_array($existing_amount))
        $existing_amount = array();
    $existing_amount =  array_merge($existing_amount, array($user_deduction));

    update_user_meta($user_id, 'user_used_amount_details', $existing_amount);

    /***/
    $message['status'] = 'success';
    $message['message'] = 'Your subscription has been successfully updated.';
    echo json_encode($message);
    exit;
}

add_action('wp_ajax_upd_subscription', 'upd_subscription_of_current_holder');


function ref_code_template(){
    global $woocommerce;

    $woocommerce->show_messages();

    woocommerce_get_template( 'myaccount/form-ref-details.php', array() );
}
function add_ref_page(){
    add_shortcode( 'woocommerce_ref_code', 'ref_code_template'  );
}
add_action('init', 'add_ref_page');

/***/

/**
 * Adds Summary_Widget widget.
 */
class CO_Summary_Shower extends WP_Widget {

    /**
     * Register widget with WordPress.
     */
    function __construct() {
        parent::__construct(
            'co_summary_shower', // Base ID
            'Checkout Summary Shower', // Name
            array( 'description' => __( 'Checkout Summary Shower', 'text_domain' ), ) // Args
        );
    }

    /**
     * Front-end display of widget.
     *
     * @see WP_Widget::widget()
     *
     * @param array $args     Widget arguments.
     * @param array $instance Saved values from database.
     */
    public function widget( $args, $instance ) {


        ?>
    <div class="checkout_summary">
        <div class="before_widget">
            <?php  echo $args['before_widget']; ?>
        </div>
        <div class="before_title">
            <?php  echo $args['before_title']; ?>
        </div>
        <div class="summary_title">
            <?php  echo $instance['title']; ?>
        </div>
        <div class="after_title">
            <?php  echo $args['after_title']; ?>
        </div>
        <div class="csw_content">

            <!-- Widget content start from here -->
            <?php
            global $woocommerce, $current_user, $product, $post;

            if ( sizeof( $woocommerce->cart->get_cart() ) > 0 ) {
                foreach ( $woocommerce->cart->get_cart() as $cart_item_key => $values ) {
                    $product = $values['data'];
                    //   $attributes = $product->get_attributes();
                    //   $attributes= array_map( 'trim', explode( '|', $attributes['servings']['value'] ) );

                    //show thumbnail
                    $thumbnail = apply_filters( 'woocommerce_in_cart_product_thumbnail', $product->get_image(), $values, $cart_item_key );

                    if ( ! $product->is_visible() || ( ! empty( $product->variation_id ) && ! $product->parent_is_visible() ) )
                        echo $thumbnail;
                    else
                        printf('<a href="%s">%s</a>', esc_url( get_permalink( apply_filters('woocommerce_in_cart_product_id', $values['product_id'] ) ) ), $thumbnail );
                    //end Thumbnail
                    if ( ! $product->is_visible() || ( ! empty( $product->variation_id ) && ! $product->parent_is_visible() ) )
                        echo apply_filters( 'woocommerce_in_cart_product_title', $product->get_title(), $values, $cart_item_key );
                    else
                        printf('<a class="product-title" href="%s">%s</a>', esc_url( get_permalink( apply_filters('woocommerce_in_cart_product_id', $values['product_id'] ) ) ), apply_filters('woocommerce_in_cart_product_title', $product->get_title(), $values, $cart_item_key ) );

                    $product_id = ($product->parent->id) ? $product->parent->id : $product->id;

                    $object = new WC_Product_Variable($product_id);
					$cardDetails = $woocommerce->cart->get_cart();
						foreach($cardDetails as $cDK => $cDV){
							$pType = ($cDV['data']->parent->product_type)?$cDV['data']->parent->product_type:$cDV['data']->product_type;
							break;
						}
					
	                    $attributes = $object->get_available_variations();
					

                    foreach ( $attributes as $name => $option ) {
						if('variable-subscription' == $pType) {
							echo '<div class="plan_content">';
							echo '<div class="plan_option">';
						}

                        $checked = "";
						$single_f_vari = $product->variation_data['attribute_servings'];
                        $html = strip_tags($option['price_html']);						
                        if($product->variation_data['attribute_servings'] == $option['attributes']['attribute_servings']){
                            $checked="checked=\"checked\"";
                        }
						if('variable-subscription' == $pType) {
							echo '<input type="radio" '.$checked.' vari_id="'. $option["variation_id"] .'" vari_name="'. $option["attributes"]["attribute_servings"] .'" prod_id="'. $product_id .'"  class="choose_plan" id="'.$html.'" value="'.$html. '" />' .  apply_filters( 'woocommerce_variation_option_name', $option["attributes"]["attribute_servings"] ) . '' ;


							echo '</div>';
							echo '<div class="plan_price">';
							echo strip_tags($option['price_html']);
							echo '</div>';
							echo '</div>';
						}


                    }
                }

				if ( 'variable-subscription' == $pType) {
					//for subscription
					echo '<div class="delivery_date_view">';
					echo '<h3>First Delivery</h3>';
					echo get_delivery_date();
					echo '</div>';
				} else {
					//for single delivery
					echo '<div class="delivery_date_view">';
					echo '<h3 style="float: left;">Delivery Date</h3>';
					echo '<div style="margin: 20px 0 0 160px;">'.get_delivery_date().'</div>';
					echo '<div style="clear: both;"></div>';
					echo '</div>';
					echo '<div class="delivery_date_view" style="margin-top: -40px;">';
					echo '<h3 style="float: left;margin-top: 2px;">Servings</h3>';
					echo '<div style="margin: 4px 0 0 160px;font-weight: bold;">'.$single_f_vari.'</div>';
					echo '<div style="clear: both;"></div>';
					echo '</div>';
				}

                if ( $woocommerce->cart->coupons_enabled() && 'variable-subscription' == $pType) { ?>
				<script> 
function changeRef(){
	if(document.getElementById('ref').style.display=="block"){
	document.getElementById('ref').style.display="none";
	document.getElementById('coupon').style.display="block";
	}else{
		document.getElementById('ref').style.display="block";
		document.getElementById('coupon').style.display="none";
		}
	
}</script>
     <div class="woocommerce-content-box full-width">

                        <h2><?php _e( 'Have A Promotional Code?', 'woocommerce' ); ?></h2>
                        <form action="">
						<div class="pcode">
                        <input type="radio" name="test1" value="ref" checked="checked" onclick="changeRef()">Referral Code
						<div class="clear"></div>
						</div>
						<div class="pcode">
						<input type="radio" name="test1" value="pro" onclick="changeRef()">Coupon Code
						<div class="clear"></div>
						</div>
						<div class="clear"></div>

</form><br>
                        <div class="coupon">
                        
<div id="coupon" style="display:none">
                            <input name="coupon_code" class="input-text" id="coupon_code" value="" st/> <input type="submit" class="button comment-submit small" id="coupon_code_submit" name="apply_coupon" value="<?php _e( 'Apply', 'woocommerce' ); ?>" />

                            <?php do_action('woocommerce_cart_coupon'); ?>
 </div>                           
<div id="ref" style="display:block">
<form>
                            <input name="ref_code" class="input-text" id="ref_code" value="<?php echo $_REQUEST['ref_code'];?>" st/> <input type="submit" id="ref_code_submit" class="button comment-submit small"  value="Apply" />
</form>
</div>
                        </div>

                    </div>

                    <?php } else {
						echo '<div style="border-top:1px solid #e0dede !important;"><!-- &nbsp; --></div>';
					}



                echo '<div class="total_contain">';

                    echo '<div class="total_left">';
                    echo 'Cart Subtotal';
                    echo '</div>';
                    echo '<div class="total_right">';
                    echo remove_text_from_amount($woocommerce->cart->get_cart_subtotal());
                    echo '</div>';
                    echo '<div  class="clear"></div>';

                echo '<div class="total_left">';
                echo 'Shipping';
                echo '</div>';
                echo '<div class="total_right">';
                $available_methods = $woocommerce->shipping->get_available_shipping_methods();
                echo woocommerce_get_template( 'cart/shipping-methods.php', array( 'available_methods' => $available_methods ) );
                echo '</div>';

                    echo '<div  class="clear"></div>';

				if ( $woocommerce->cart->get_discounts_before_tax() ) :
						echo '<div class="total_left">';?>
						<?php _e( 'Order Discount', 'woocommerce' ); ?> <!--<a href="<?php echo add_query_arg( 'remove_discounts', '2', $woocommerce->cart->get_cart_url() ) ?>"><?php _e( '[Remove]', 'woocommerce' ); ?></a>-->
						<?php echo '</div>';
						echo '<div class="total_right">';
						echo remove_text_from_amount($woocommerce->cart->get_discounts_before_tax());
						echo '</div>';
						echo '<div  class="clear"></div>';
				endif; 

				if ( $woocommerce->cart->get_discounts_after_tax() ) :
						echo '<div class="total_left">';?>
						<?php _e( 'Order Discount', 'woocommerce' ); ?> <!--<a href="<?php echo add_query_arg( 'remove_discounts', '2', $woocommerce->cart->get_cart_url() ) ?>"><?php _e( '[Remove]', 'woocommerce' ); ?></a>-->
						<?php echo '</div>';
						echo '<div class="total_right">';
						echo remove_text_from_amount($woocommerce->cart->get_discounts_after_tax());
						echo '</div>';
						echo '<div  class="clear"></div>';
				endif; 


                    echo '<div class="total_left">';
                    echo 'Total';
                    echo '</div>';
                    echo '<div class="total_right">';
                    echo remove_text_from_amount($woocommerce->cart->get_total());
                    echo '</div>';
                    echo '<div  class="clear"></div>';
					if('variable-subscription' == $pType) {
						$post = get_post(4964, ARRAY_A);
						echo $content = $post['post_content'];
					}
					echo '<div  class="clear"></div>';
                echo '</div>';

            }
            ?>
            <!-- Widget content end -->

        </div>
        <div class="after_widget">
            <?php  echo $args['after_widget']; ?>
        </div>
    </div>
    <?php
    }

    /**
     * Back-end widget form.
     *
     * @see WP_Widget::form()
     *
     * @param array $instance Previously saved values from database.
     */
    public function form( $instance ) {
        if ( isset( $instance[ 'title' ] ) ) {
            $title = $instance[ 'title' ];
        }
        else {
            $title = __( 'Checkout Summary', 'text_domain' );
        }
        ?>
    <p>
        <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label>
        <input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
    </p>
    <?php
    }

    /**
     * Sanitize widget form values as they are saved.
     *
     * @see WP_Widget::update()
     *
     * @param array $new_instance Values just sent to be saved.
     * @param array $old_instance Previously saved values from database.
     *
     * @return array Updated safe values to be saved.
     */
    public function update( $new_instance, $old_instance ) {
        $instance = array();
        $instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';

        return $instance;
    }

} // class Foo_Widget

// register Foo_Widget widget
function register_foo_widget() {
  
        register_widget( 'CO_Summary_Shower' );
  
}
add_action( 'widgets_init', 'register_foo_widget' );

/*&Discount Code Apply From Checkout Page*/

function app_disc_code(){
    global $woocommerce;

    if ( ! empty( $_REQUEST['apply_coupon'] ) ) {

        if ( ! empty( $_REQUEST['coupon_code'] ) ) {
            if($woocommerce->cart->add_discount( sanitize_text_field( $_REQUEST['coupon_code'] ) ))
                echo '1';
            else
                echo '-1';
        } else {
            $woocommerce->set_messages();
            $woocommerce->add_error( WC_Coupon::get_generic_coupon_error( WC_Coupon::E_WC_COUPON_PLEASE_ENTER ) );
            echo '-1';
        }

        // Remove Coupon Codes
    }
    exit;
}

add_action('wp_ajax_appdisc', 'app_disc_code');
add_action('wp_ajax_nopriv_appdisc', 'app_disc_code');
/*****/

/*&Discount Code Apply From Checkout Page*/

function app_ref_code(){
	if(!session_id())
		session_start();
    global $woocommerce, $wpdb;

		if($_REQUEST['coupon_code']!=""){
	
	/* Checdk ref code is valid or not */
	$query_to_ck = 'SELECT user_id FROM wp_usermeta WHERE meta_key = "genRefKey" and meta_value = "'.$_REQUEST['coupon_code'].'"';
	$result_to_ck = mysql_query($query_to_ck);
	$array_to_check = mysql_fetch_array($result_to_ck);

	if(!empty($array_to_check)){
	/****/


		$user_id = get_current_user_id();
		$query = 'SELECT user_id FROM wp_usermeta WHERE meta_key = "refKeyID" and meta_value = "'.$_REQUEST['coupon_code'].'" and user_id='.$user_id.'';
		$result = mysql_query($query);
		$array = mysql_fetch_array($result);
	if((isset($_SESSION['flagCheck']) && in_array($_REQUEST['coupon_code'], $_SESSION['flagCheck']))){
		 echo '-3';
		 exit;
	}
	if(empty($array)) {
		update_user_meta( $user_id, "temp", $_REQUEST['coupon_code']);
			$_SESSION['flagCheck'][] = $_REQUEST['coupon_code'];
			if ( ! empty( $_REQUEST['coupon_code'] ) ) {
				$time = time();
				$p = array(
					'post_title' => $time,
					'post_content' => '',
					'post_name' => $time,
					'post_status' => 'publish',
					'post_type' => 'shop_coupon',
					'post_author' => 1
				);
				if($id = wp_insert_post($p))
				{
					// Add metadata to post
					update_post_meta($id, 'coupon_amount', get_user_meta(1, "rewordBonus",true));
					update_post_meta($id, 'discount_type', 'fixed_cart');

					update_user_meta(get_current_user_id(), 'temp', $_REQUEST['coupon_code']);
					update_user_meta(get_current_user_id(), 'applied_coupon_id_track', $id);
				}
				$p_i = get_post($id);

				if($woocommerce->cart->add_discount( sanitize_text_field( $p_i->post_title ) ))
					echo '1';
				else
					echo '-2';
			} else {
				$woocommerce->set_messages();
				$woocommerce->add_error( WC_Coupon::get_generic_coupon_error( WC_Coupon::E_WC_COUPON_PLEASE_ENTER ) );
				echo '-6';
			}
		}else{
			 echo '-3';
		} 

	}else {
		echo '-3';
	}
}

        /*    */
    exit;
}

add_action('wp_ajax_addRef', 'app_ref_code');
add_action('wp_ajax_nopriv_addRef', 'app_ref_code');
/*****/

//added by soumya for customizing button for order
function customize_cart_button(){

    global  $product;
    woocommerce_variable_add_to_cart();

}
add_filter('woocommerce_loop_add_to_cart_link','customize_cart_button');


function remove_text_from_amount($amt){

	if(strpos($amt,'now then') && strpos($amt,'/')){
		$str=explode('now then',$amt);
		$amount=$str[0];
	}else if(!strpos($amt,'now then') && strpos($amt,'/')){
		$str=explode('/ ',$amt);
		$amount=$str[0];
	}else{
		$amount=$amt;
	}
	return $amount;
}

//ajax login
function ajax_function() {
    $creds = array();
    $creds['user_login'] = $_REQUEST['log'];
    $creds['user_password'] = $_REQUEST['pwd'];
    $creds['remember'] = $_REQUEST['remember'];
    $user = wp_signon( $creds, false );

    if ( is_wp_error($user) )
        echo '-1';
    else
        echo '1';

    exit;
}
add_action('wp_ajax_ajax_login', 'ajax_function');
add_action('wp_ajax_nopriv_ajax_login', 'ajax_function');
add_action('wp_ajax_admin_ajax_login', 'ajax_function');

/* Delivery section in ajax */
function save_ma_delivery_information(){
    parse_str($_POST['form_data'], $d);
    $mess = array();
    $mess['act'] = 'success';
    $mess['message'] = 'Thanks !';

    if(!check_zip_using_param($d['delivery_postcode'])){
        $mess['act'] = 'error';
        $mess['message'] = 'We are not able to provide this area now';
    }

	$cur_user_subscription = WC_Subscriptions_Manager::get_users_subscriptions(get_current_user_id()) ;
    /* $current_subscription To Cancel all users previous subscription */
    foreach($cur_user_subscription as $suk => $suv){
        $orderID = $suv['order_id'];  
		break;
    }


    if(is_user_logged_in()){
        update_post_meta($orderID, '_billing_first_name', $d['delivery_first_name']);
        update_post_meta($orderID, '_billing_last_name', $d['delivery_last_name']);
        update_post_meta($orderID, '_billing_address_1', $d['delivery_address']);
        update_post_meta($orderID, '_billing_city', $d['delivery_city']);
        update_post_meta($orderID, '_billing_postcode', $d['delivery_postcode']);
        update_post_meta($orderID, '_billing_state', $d['delivery_state']);
        update_post_meta($orderID, '_billing_phone', $d['delivery_phone']);

		/* Update Order Delivery */
		update_post_meta($orderID, '_shipping_first_name', $d['delivery_first_name']);
        update_post_meta($orderID, '_shipping_last_name', $d['delivery_last_name']);
        update_post_meta($orderID, '_shipping_address_1', $d['delivery_address']);
        update_post_meta($orderID, '_shipping_city', $d['delivery_city']);
        update_post_meta($orderID, '_shipping_postcode', $d['delivery_postcode']);
        update_post_meta($orderID, '_shipping_state', $d['delivery_state']);
        update_post_meta($orderID, '_shipping_postcode', $d['delivery_phone']);

		update_user_meta(get_current_user_id(), 'shipping_first_name', $d['delivery_first_name']);
        update_user_meta(get_current_user_id(), 'shipping_last_name', $d['delivery_last_name']);
        update_user_meta(get_current_user_id(), 'shipping_address_1', $d['delivery_address']);
        update_user_meta(get_current_user_id(), 'shipping_city', $d['delivery_city']);
        update_user_meta(get_current_user_id(), 'shipping_postcode', $d['delivery_postcode']);
        update_user_meta(get_current_user_id(), 'shipping_state', $d['delivery_state']);
        update_user_meta(get_current_user_id(), 'billing_phone', $d['delivery_phone']);
		/***/

    } else {
        $mess['act'] = 'error';
        $mess['message'] = 'You can\'t edit this now';
    }
    echo json_encode($mess);
    exit;
}
add_action('wp_ajax_save_ma_delivery_info', 'save_ma_delivery_information');

function load_delivery_info() {
    ?>
    <p><?php echo get_user_meta(get_current_user_id(), 'shipping_first_name', true) . " " . get_user_meta(get_current_user_id(), 'shipping_last_name', true); ?></p>
    <p><?php echo get_user_meta(get_current_user_id(), 'shipping_address_1', true); ?></p>
    <p><?php echo get_user_meta(get_current_user_id(), 'shipping_city', true) . ", " . get_user_meta(get_current_user_id(), 'shipping_state', true) . " - " . get_user_meta(get_current_user_id(), 'shipping_postcode', true); ?></p>
    <p><?php echo get_user_meta(get_current_user_id(), 'billing_phone', true); ?></p>
<?php
    exit;
}
add_action('wp_ajax_load-delivery-info', 'load_delivery_info');
/* End Delivery */
/** Account information ajax section **/
function load_my_account(){
    global $current_user;
    get_currentuserinfo();
    $user_id = get_current_user_id();
    ?>
        <div class="info_heading">Name</div>
        <div class="info_values">
            <p><?php echo get_user_meta($user_id, 'first_name', true) . " " . get_user_meta($user_id, 'last_name', true); ; ?></p>
        </div>
        <div class="info_heading">Email</div>
        <div class="info_values">
            <p><?php echo $current_user->user_email; ; ?></p>
        </div>
        <div class="info_heading">Password</div>
        <div class="info_values">
            <p><?php echo "***********"; ; ?></p>
        </div>
    <?php
    exit;
}
add_action('wp_ajax_load_my_account_info', 'load_my_account');

function save_ma_account_info(){
    $mess = array();
    $mess['act'] = 'success';
    $mess['message'] = 'Thanks !';

    global $current_user;
    get_currentuserinfo();
	parse_str($_POST['form_data'], $_fd);

	$user = get_user_by( 'login', $_fd['user_email'] );

	if(!empty($_fd['user_current_password']) && !wp_check_password($_fd['user_current_password'], $user->data->user_pass, $user->ID)) {		
		$mess['act'] = 'error';
		$mess['message'] = 'Current Password not match';
		echo json_encode($mess);
		exit;
	}
    
    $user_id = get_current_user_id();
    $first_name = $_fd['user_first_name'];
    $last_name = $_fd['user_last_name'];
    $email = $_fd['user_email'];
    $password = $_fd['user_password'];
    update_user_meta($user_id, 'first_name', $first_name);  //Update First Name
    update_user_meta($user_id, 'last_name', $last_name);    // Update last name
    if(empty($password))
        wp_update_user( array ( 'ID' => $user_id, 'user_email' => $email ) );
    else
        wp_update_user( array ( 'ID' => $user_id, 'user_email' => $email, 'user_pass' => $password ) ) ;
    $creds = array();
    $creds['user_login'] = $current_user->user_login;
    $creds['user_password'] = $password;
    $creds['remember'] = false;
    wp_signon( $creds, false );
    echo json_encode($mess);
    exit;
}
add_action('wp_ajax_save_ma_account_info', 'save_ma_account_info');
/** End Account **/

function chk_zip_in_home(){
    $mess = array();
    if(!check_zip_using_param($_REQUEST['zipC'])){
        $mess['act'] = 'error1';
        $mess['message'] = 'We don\'t offer delivery to your area yet but we will soon. Please enter your email below to be notified when we expand.';
        $html = '
            <form action="" id="delivery_area_emailForm">
                <input type="email" required="true" id="email_save" ><input type="submit" value="Send Email" id="emailForm">
            </form>
        ';
        $mess['message'] .= $html;
    } else {
        $mess['act'] = 'success1';
        $mess['message'] = '<h1>Congratulations!</h1> We deliver to your area! <a href="'.home_url().'/order/">Click Here</a> to place your order now!';
    }
    echo json_encode($mess);
    exit;
}
add_action('wp_ajax_check_zip_in_home', 'chk_zip_in_home');
add_action('wp_ajax_nopriv_check_zip_in_home', 'chk_zip_in_home');

function send_main_to_friend(){
    parse_str($_POST['form_data'], $d);
    global $current_user;
    get_currentuserinfo();
	$flag = 'done';
	$ref=mysql_query("select * from `socialmsg`");
	$ref_array = array('[referral_bonus]', '[reward_bonus]', '[referral_code]');
		$replace_arr = array('$'.get_user_meta(1, "refBonus",true), '$'.get_user_meta(1, "rewordBonus",true), get_user_meta( get_current_user_id(), "genRefKey",true));

		while ($row = mysql_fetch_array($ref)) {
				$s=$row['type']."s";
				$m=$row['type']."m";								
				$subject  = str_replace($ref_array, $replace_arr, $row['subject']);
				$message  = str_replace($ref_array, $replace_arr, $row['msg']);
				$$s= $subject;
				$$m= $message;	
		}


    for($i=0; $i<5; $i++){	
		

		
        if(!empty($d['ReferrerEmailForm']['email_'.$i])){
            $name = ($d['ReferrerEmailForm']['name_'.$i])?$d['ReferrerEmailForm']['name_'.$i]:'Dude';
            $to      = $d['ReferrerEmailForm']['email_'.$i];
            $subject = $emailm;
            $message = 'Hello '. $name.',<br /> <br />' . $emails;
				$headers = 'From: '.$current_user->user_email . "\r\n" .
				$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
                'Reply-To: info@chefami.com' . "\r\n" .
                'X-Mailer: PHP/' . phpversion();

            if(!mail($to, $subject, $message, $headers))
				$flag = 'not_done';
        } else if($i == 0) {
			$flag = 'not_done';		
		}
    }
	if($flag == 'done'){
	    $mess['act'] = 'success';
	    $mess['message'] = 'Successfully Shared!.';
	} else {
		$mess['act'] = 'error';
	    $mess['message'] = 'Action failed!';
	}
    echo json_encode($mess);
    exit;
}
add_action('wp_ajax_send_Email_to_my_friend', 'send_main_to_friend');

/*** Code to load Calerdar Schedule ***/

function skip_order_han(){
    add_user_meta(get_current_user_id(), 'suspended', $_REQUEST['o_ID']);

	$nxtTues =  date('Ymd', strtotime('next tuesday'));
	$currDate = date('Ymd');

//	if($currDate + 6 > $nxtTues)
//		$nxtTues = $nxtTues + 7;

    if($nxtTues == $_REQUEST['o_ID']){

        $userID = get_current_user_id();
        $cur_user_subscription = get_user_meta($userID,'wp_woocommerce_subscriptions', true);
        foreach($cur_user_subscription as $suk => $suv){
            $subscriptionID = $suv['order_id'] . '_' . $suv['product_id'];
            break;      /* use because one time subscription */
        }

        $wsm = new WC_Subscriptions_Manager();
        $wsm->put_subscription_on_hold($userID,$subscriptionID);
        /* $wsm->reactivate_subscription($userID, $subscriptionID); */
    }

    $curTime = $_REQUEST['o_ID'];
     if($curTime - 5 < date('Ymd')) {
      $html = "
            <div class='info-col-in skipped'>
                <h4>". date('l, F jS',strtotime($curTime))."</h4>
                <p class='skipper'>Skipped</p>
                <p>
                    Oh no! You have skipped your ". date('F jS',strtotime($curTime))." delivery.
                </p>
            </div>
            <script>
                //<![CDATA[
                // Fix for ie10
                if ($.browser.msie && $.browser.version == 10) {
                    $(\".modal\").removeClass(\"fade\");
                }
                //]]>
            </script>

        ";
         } else {
         $html ="
                <div class='info-col-in skipped'>
                    <h4>". date('l, F jS',strtotime($curTime))."</h4>
                    <p class='skipper'>Skipped</p>
                    <p>
                        Oh no! You have chosen to skip your ". date('F jS',strtotime($curTime)) ." delivery. If you change your mind you have until midnight (ET) on ". date('F jS',strtotime($curTime."-6 days")) ." to unskip and receive your delicious recipes and fresh ingredients!
                    </p>
                    <a class='unskip btn' data-order_id='". $curTime."' href='#'>Unskip</a>
                </div>
                <script>
                    //<![CDATA[
                    // Fix for ie10
                    if ($.browser.msie && $.browser.version == 10) {
                        $(\".modal\").removeClass(\"fade\");
                    }
                    //]]>
                </script>

            ";
 }


    $message = array('html' => $html, 'status' => 'Suspended');
    echo json_encode($message);
    exit;
}

add_action('wp_ajax_skip_order', 'skip_order_han');

function resume_order_han(){
    delete_user_meta(get_current_user_id(), 'suspended', $_REQUEST['o_ID']);
    global $wpdb;
	
	$nxtTues =  date('Ymd', strtotime('next tuesday'));
	$currDate = date('Ymd');

//	if($currDate + 6 > $nxtTues)
//		$nxtTues = $nxtTues + 7;
	
    if($nxtTues == $_REQUEST['o_ID']){

        $userID = get_current_user_id();
        $cur_user_subscription = get_user_meta($userID,'wp_woocommerce_subscriptions', true);
        foreach($cur_user_subscription as $suk => $suv){
            $subscriptionID = $suv['order_id'] . '_' . $suv['product_id'];
            break;      /* use because one time subscription */
        }

        $wsm = new WC_Subscriptions_Manager();
        /* $wsm->put_subscription_on_hold($userID,$subscriptionID); */
         $wsm->reactivate_subscription($userID, $subscriptionID);

    }

    $sql = "DELETE FROM wp_usermeta WHERE user_id =".get_current_user_id()." AND meta_key =  'suspended' AND meta_value =  '".$_REQUEST['o_ID']."'";
    $wpdb->query($sql);
    $curTime = $_REQUEST['o_ID'];
    $html = "<div class='info-col-in sched'>
                        <h4>". date('l, F jS',strtotime($curTime))."</h4>
                        <p class='scheduled'>Scheduled</p>
                        <p class='lbl'>We're still cookin' - Recipes coming soon!</p>
                        <div class='clearfix'>
                            
                        </div>
                        <a class='skip-link' data-toggle='modal' href='#schedule-skip'>I would like to skip this week</a>
                    </div>
                    <script>
                        //<![CDATA[
                        // Fix for ie10
                        if ($.browser.msie && $.browser.version == 10) {
                            $(\".modal\").removeClass(\"fade\");
                        }
                        //]]>
                    </script>";
    $message = array('html' => $html, 'status' => 'Scheduled');
    echo json_encode($message);
    exit;
}

add_action('wp_ajax_resume_order', 'resume_order_han');
/****/
/** Template redirect for user can't see order page **/
function hide_oder_page_for_member(){
	 global $woocommerce, $current_user, $product, $post;

         
    $card_details = get_user_meta( get_current_user_id(), '_stripe_customer_id', true );
    if(empty($card_details) && is_page(get_option('woocommerce_myaccount_page_id'))){
		$woocommerce->add_error (__("Please purchase a product first."));
        $woocommerce->set_messages();
        wp_redirect(home_url().'/order/');
        exit;
    }
	
    if(!empty($card_details) && is_user_logged_in() && is_page( 4539 )) {
        wp_redirect(get_permalink(get_option('woocommerce_myaccount_page_id')));
        exit;
    }

	if(!empty($card_details) && is_user_logged_in() && is_page( 4883 )) {
        wp_redirect(get_permalink(get_option('woocommerce_myaccount_page_id')));
        exit;
    }

	if(is_page( 4537 )) {
		   if ( sizeof( $woocommerce->cart->get_cart() ) == 0 ) {			    
				wp_redirect(home_url().'/order/');		   
				exit;
		   }
    }
	
}
add_action( 'template_redirect', 'hide_oder_page_for_member' );

/** Update Member Plan **/
function upd_mem_plan(){
    global $current_user,  $woocommerce, $wpdb;
    $mess = array();
    $mess['act'] = 'success';

    parse_str($_POST['form_data'], $d);

    get_currentuserinfo();
    $product_id = $d['meal_plan_type'];
    $arr = array();
    $cur_user_subscription = WC_Subscriptions_Manager::get_users_subscriptions(get_current_user_id()) ;
    /* $current_subscription To Cancel all users previous subscription */

    foreach($cur_user_subscription as $suk => $suv){
        $orderID = $suv['order_id'];
        $suv['product_id'] = $d['meal_plan'];
        $arr[$suv['order_id'] . '_' . $d['meal_plan']] = $suv;
        update_user_meta(get_current_user_id(), 'wp_woocommerce_subscriptions', $arr);
		break;
    }

    // Create Order (send cart variable so we can record items and reduce inventory). Only create if this is a new order, not if the payment was rejected.

    $product_id = $d['meal_plan_type'];
    $_product = new WC_Product($product_id);

     // Set values
    $item = array();

    // Add line item

    $srOW = $wpdb->get_row("select * FROM wp_woocommerce_order_items WHERE order_id = " . $orderID);
    $item_id = $srOW->order_item_id;

    $args = array( 'post_type' => 'product', 'post_status' => 'publish' );
    $loop = new WP_Query( $args );
    $i=0;
    if ( $loop->have_posts() ) {
        while ( $loop->have_posts() ) : $loop->the_post();
            $____product = get_product(get_the_ID());
            $_var[get_the_ID()] = $____product->get_available_variations();
        endwhile;
    }
    wp_reset_query();

    foreach($_var as $_k => $_variations) {

        foreach($_variations as $_vk => $_vv){
            if($_vv['variation_id'] ==  $product_id){
                $variation_name = $_vv['attributes']['attribute_servings'];
				$p = strip_tags($_vv['price_html']);
			}

        }
    }


    // update post meta for pricing
    update_post_meta($orderID, '_order_total', get_post_meta($product_id,'_price', true ));
    update_post_meta($orderID, '_order_recurring_total', get_post_meta($product_id,'_subscription_price', true ));

    // Add subscription details so order state persists even when a product is changed
    $period       =  WC_Subscriptions_Product::get_period( $product_id );
    $interval     =  WC_Subscriptions_Product::get_interval( $product_id );
    $length       =  WC_Subscriptions_Product::get_length( $product_id );
    $trial_length =  WC_Subscriptions_Product::get_trial_length( $product_id );
    $trial_period =  WC_Subscriptions_Product::get_trial_period( $product_id );
    $sign_up_fee  =  WC_Subscriptions_Product::get_sign_up_fee( $product_id );

    woocommerce_update_order_item_meta( $item_id, '_qty', 1 );
    woocommerce_update_order_item_meta( $item_id, '_tax_class', '' );
    woocommerce_update_order_item_meta( $item_id, '_product_id', $d['meal_plan'] );
    woocommerce_update_order_item_meta( $item_id, '_variation_id', $product_id );
    woocommerce_update_order_item_meta( $item_id, '_line_subtotal', get_post_meta($product_id,'_price', true ) );
    woocommerce_update_order_item_meta( $item_id, '_line_total', get_post_meta($product_id,'_subscription_price', true )); // WC_Subscriptions_Product::get_price() would return a price without filters applied
    woocommerce_update_order_item_meta( $item_id, '_line_tax', 0 );
    woocommerce_update_order_item_meta( $item_id, '_line_subtotal_tax', 0); // WC_Subscriptions_Product::get_price() would return a price without filters applied
    woocommerce_update_order_item_meta( $item_id, 'Servings:', $variation_name );


    woocommerce_update_order_item_meta( $item_id, '_subscription_period', $period );
    woocommerce_update_order_item_meta( $item_id, '_subscription_interval', $interval );
    woocommerce_update_order_item_meta( $item_id, '_subscription_length', $length );
    woocommerce_update_order_item_meta( $item_id, '_subscription_trial_length', $trial_length );
    woocommerce_update_order_item_meta( $item_id, '_subscription_trial_period', $trial_period );
    woocommerce_update_order_item_meta( $item_id, '_subscription_recurring_amount', get_post_meta($product_id,'_subscription_price', true )); // WC_Subscriptions_Product::get_price() would return a price without filters applied
    woocommerce_update_order_item_meta( $item_id, '_subscription_sign_up_fee', $sign_up_fee );

    // Calculated recurring amounts for the item
    woocommerce_update_order_item_meta( $item_id, '_recurring_line_total', number_format( (double) get_post_meta($product_id,'_price', true ), 2, '.', '' ) );
    woocommerce_update_order_item_meta( $item_id, '_recurring_line_tax', '' );
    woocommerce_update_order_item_meta( $item_id, '_recurring_line_subtotal', number_format( (double) get_post_meta($product_id,'_regular_price', true ), 2, '.', '' ) );
    woocommerce_update_order_item_meta( $item_id, '_recurring_line_subtotal_tax', '' );

    $odr = $orderID;
    /* Fetch Oder Details */



    //if(($_vv['variation_id'] ==  $vari_ID))
    $mealOrder = woocommerce_get_order_item_meta($srOW->order_item_id, 'Servings:', true);
    $mealType = woocommerce_get_order_item_meta($srOW->order_item_id, '_subscription_period', true);
    $mealTotal = woocommerce_get_order_item_meta($srOW->order_item_id, '_recurring_line_subtotal', true);
    $vari_ID = woocommerce_get_order_item_meta($srOW->order_item_id, '_variation_id', true);
    $_product = get_product($product_id);
	$srOW = $wpdb->get_row("UPDATE wp_woocommerce_order_items SET order_item_name = '".$_product->post->post_title."' WHERE order_item_id=" . $item_id);
    $html = '<div class="info_heading">Meal Plan</div>
                <div class="info_values">
                    <p>'. $_product->post->post_title.'</p>
                </div>
                <div class="info_heading">Subscriptions Type</div>
                <div class="info_values">
                    <p>'.$variation_name.'</p>
                </div>
                <div class="info_heading">Price</div>
                <div class="info_values">
                    <p>'. $p .'</p>
                </div>';

    $mess['message'] = $html;

    echo json_encode($mess);
    exit;
}
add_action('wp_ajax_update_member_plan', 'upd_mem_plan');
/****/

/* Account update php code */
function user_upd_account_card(){
    $mess = array();
    $mess['act'] = 'success';

    parse_str($_POST['form_data'], $d);

    $stripeDetails = get_user_meta(get_current_user_id(), '_stripe_customer_id', true);

    require_once '../wp-content/plugins/wp-stripe/stripe-php/lib/Stripe.php';
    $obj = new WC_Gateway_Stripe();
    Stripe::setApiKey($obj->secret_key);
    try{
        $cu = Stripe_Customer::retrieve($stripeDetails['customer_id']);
    } catch(Stripe_Error $e){
        $mess['act'] = 'error';
        $mess['message'] = $e->getMessage();
        echo json_encode($mess);
        exit;
    }

    /** Create a Stripe Token **/
    try{
        $tok = Stripe_Token::create(array(
            "card" => array(
                "number" => $d['card_number'],
                "exp_month" => $d['exp_month'],
                "exp_year" => $d['exp_year'],
                "cvc" => $d['cvc'],
                "name" => $d['full_name']
            )
        ));
    }
    catch(Stripe_Error $e){
        $mess['act'] = 'error';
        $mess['message'] = $e->getMessage();
        echo json_encode($mess);
        exit;
    }

    /****/

     $cu->card = $tok->id; // obtained with Stripe.js
     $cu->save();


    $meta= array(
        'customer_id' => $stripeDetails['customer_id'],
        'active_card' => $cu->cards['data'][0]->last4,
        'exp_year' => $cu->cards['data'][0]->exp_year,
        'exp_month' => $cu->cards['data'][0]->exp_month,
        'name_on_card' => $cu->cards['data'][0]->name
    );
    update_user_meta(get_current_user_id(), '_stripe_customer_id', $meta);

    $card_details = get_user_meta( get_current_user_id(), '_stripe_customer_id', true );
    $html = "<div class=\"info_heading\">Name On Card</div>
                <div class=\"info_values\">
                    <p>".$card_details['name_on_card']."</p>
                </div>
                <div class=\"info_heading\">Card Number</div>
                <div class=\"info_values\">
                    <p>".$card_details['active_card']."</p>
                </div>
                <div class=\"info_heading\">Expiration</div>
                <div class=\"info_values\">
                    <p>".$card_details['exp_month']."/".$card_details['exp_year']."</p>
                </div>";
    $mess['message'] = $html;
    echo json_encode($mess);
    exit;
exit;

}
add_action ('wp_ajax_update_account', 'user_upd_account_card');
/***/
class Order_Widget extends WP_Widget {

	/**
	 * Register widget with WordPress.
	 */
	function __construct() {
		parent::__construct(
			'Order_widget', // Base ID
			__('Widget Title', 'text_domain'), // Name
			array( 'description' => __( 'A Order Widget', 'text_domain' ), ) // Args
		);
	}

	/**
	 * Front-end display of widget.
	 *
	 * @see WP_Widget::widget()
	 *
	 * @param array $args     Widget arguments.
	 * @param array $instance Saved values from database.
	 */
	public function widget( $args, $instance ) {
		global $post;
		?>
			<div class="product-archive-right">
					<div class="product-archive-right">			
						<div class="textwidget">
							<img src="<?php echo get_post_meta($post->ID, 'sidebar_image_for_discount', true); ?>" alt="">
						</div>
					</div> 
					 <div style="margin: 10px 0;font-family: "Montaga", Arial, Helvetica, sans-serif !important;font-size: 18px !important;line-height: 23px;" class="next-delivery-widget">
						<?php echo get_post_meta($post->ID, 'sidebar_description_for_discount', true); ?>
					</div>  		
					<div class="next-delivery-widget">
						<span style="font-size:23px;font-weight:bold;">Next Delivery:</span>
						<?php $date = get_delivery_date(); $date = explode(' ', $date); $date = date('l M dS', strtotime($date[0])); ?>
							<div style="margin-top:5px;"><?php echo $date; ?>&nbsp;</div>					
					</div>				   
				</div>
		<?php
	}

	/**
	 * Back-end widget form.
	 *
	 * @see WP_Widget::form()
	 *
	 * @param array $instance Previously saved values from database.
	 */
	public function form( $instance ) {
		if ( isset( $instance[ 'title' ] ) ) {
			$title = $instance[ 'title' ];
		}
		else {
			$title = __( 'New title', 'text_domain' );
		}
		?>
		<p>
		<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label> 
		<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
		</p>
		<?php 
	}

	/**
	 * Sanitize widget form values as they are saved.
	 *
	 * @see WP_Widget::update()
	 *
	 * @param array $new_instance Values just sent to be saved.
	 * @param array $old_instance Previously saved values from database.
	 *
	 * @return array Updated safe values to be saved.
	 */
	public function update( $new_instance, $old_instance ) {
		$instance = array();
		$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';

		return $instance;
	}

}


function register_Order_widget() {
    register_widget( 'Order_Widget' );
}
add_action( 'widgets_init', 'register_Order_widget' );

/** Corn to set user Payment Date **/
add_action( 'wp', 'payment_date_scheduler' );
/**
 * On an early action hook, check if the hook is scheduled - if not, schedule it.
 */
function payment_date_scheduler() {
	if ( ! wp_next_scheduled( 'payment_date_scheduler_hook' ) ) {
		wp_clear_scheduled_hook( 'payment_date_scheduler_hook' );	
		wp_schedule_event( strtotime('12 / 26 / 2013 @ 00:01:11 UTC'), 'weekly', 'payment_date_scheduler_hook');	
	/*	wp_schedule_event( strtotime('12 / 26 / 2013 @ 00:01:11 UTC'), 'daily', 'payment_date_scheduler_hook');*/
	}
}

add_action( 'payment_date_scheduler_hook', 'ps_do_this_daily' );
/**
 * On the scheduled action hook, run the function.
 */
function ps_do_this_daily() {
    global $wpdb;	
//    if(date('l') == "Saturday") {        // Cron run daily but execute only in sunday
        $allUser = $wpdb->get_results('SELECT * FROM wp_users WHERE 1;');
//		if(date('l') != "Tuesday" || date('l') != "Wednesday")
	        $nxtTues =  date('Ymd', strtotime('next tuesday'));         // Get the Next Tuesday to run cron
/*		else 
			$nxtTues =  date('Ymd', strtotime('next tuesday'));         // Get the Next Tuesday to run cron*/
		
		//$nxtTues = $nxtTues + 7;

        $wsm = new WC_Subscriptions_Manager();
        foreach($allUser as $auK => $auV){
            $userID = $auV->ID;
			$parmanent_cancel_delivery = get_user_meta($userID, 'permanent_pause', true);
			if(empty($parmanent_cancel_delivery)){
				$susPendedData = get_user_meta($userID, 'suspended', false);
				$cur_user_subscription = get_user_meta($userID,'wp_woocommerce_subscriptions', true);
					foreach($cur_user_subscription as $suk => $suv){
						//$subscriptionID = $suv['order_id'] . '_' . $suv['product_id'];
						$subscriptionID = $suk;
						break;      /* use because one time subscription */
					}
				if(in_array($nxtTues, $susPendedData)){					
						$wsm->put_subscription_on_hold($userID,$subscriptionID);
				} else {
					$s = WC_Subscriptions_Manager::get_subscription($subscriptionID, $userID);
					if(!empty($s['status']) && $s['status'] == 'on-hold')
						$wsm->reactivate_subscription($userID, $subscriptionID);

				}
				wp_mail( 'biswajitghosh.mail@gmail.com', 'The subject', 'nxtTues=>'.$nxtTues."susPendedData=>".json_encode($cur_user_subscription) . "u=>". $userID );
			}
        }
 //   }

}


/***/


/** Add Short for zip code checker **/
function zCc( $atts ){

   $html = '<div class="zipCodeChecker">
        <form action="" class="postalCodeCheck">
            <div class="status_message">Please wait...</div>
            <input type="text" id="zip_code" value="" placeholder="Postal Code">
            <input type="submit" id="zip_code_checker_button" value="CHECK">
        </form>
    </div>';
    return $html;

}
add_shortcode( 'zip_code_checker', 'zCc' );

function add_user_zipCode(){
    global $wpdb;
    $email = $_REQUEST['user_email'];
    $zip = $_REQUEST['user_zip'];
    $id = $wpdb->insert(
            'wp_zipcode',
            array(
                'email' => $email,
                'zipcode' => $zip,
                'status' => 'inactive'
            )
        );
    echo "<h1>Thank You!</h1>";
    exit;
}
add_action('wp_ajax_add_user_zip_code', 'add_user_zipCode');
add_action('wp_ajax_nopriv_add_user_zip_code', 'add_user_zipCode');
add_action('wp_ajax_admin_add_user_zip_code', 'add_user_zipCode');
/*****/

add_filter( 'default_checkout_state', 'change_default_checkout_state' );
  
function change_default_checkout_state() {
  return 'FL'; // state code
}

/* Phone No Save in Checkout */

function woocommerce_update_order_review_function_phone_no(){
	 if ( isset( $_POST['billing_phone'] ) )
		update_user_meta(get_current_user_id(), 'billing_phone', $_POST['billing_phone'] );

	 exit;
}
add_action('wp_ajax_woocommerce_update_order_review_phone_no', 'woocommerce_update_order_review_function_phone_no');
/****/

function putSubscriptionON_action(){
	$action = $_REQUEST['user_action'];

	$userID = get_current_user_id();
        $cur_user_subscription = get_user_meta($userID,'wp_woocommerce_subscriptions', true);
        foreach($cur_user_subscription as $suk => $suv){
            $subscriptionID = $suv['order_id'] . '_' . $suv['product_id'];           
        }
        $wsm = new WC_Subscriptions_Manager();

	if($action == 'pause'){
		$wsm->put_subscription_on_hold($userID,$subscriptionID); 
		update_user_meta($userID, 'permanent_pause', 'active');
	} else if($action == 'resume'){ 	    
		
		$nxtTues =  date('Ymd', strtotime('next tuesday'));
		$currDate = date('Ymd');

		if($currDate + 6 > $nxtTues)
			$nxtTues = $nxtTues + 7;

			delete_user_meta( $userID, 'suspended', $nxtTues );
         $wsm->reactivate_subscription($userID, $subscriptionID);
		  delete_user_meta( $userID, 'permanent_pause', 'active');
	}
	echo '-1';
	exit;
}
add_action('wp_ajax_putSubscriptionON', 'putSubscriptionON_action');

/////////////////////////////////////////////
function load_css_for_logged_in_user(){
	if(is_user_logged_in()){
	?>
		<style type="text/css">
			ul#nav > li:last-child{
				display:none !important;
				opacity:0 !important;
			}
		</style>
	<?php
	}
}
add_action('wp_head', 'load_css_for_logged_in_user');

function my_woocommerce_add_error( $error ) {
    if( 'Coupon does not exist!' == $error ) {
        $error = 'Invalid Coupon Code, please try again.  If you have a Referral Code please note it is only valid for new subscriptions, not for Single Deliveries.';
    }
    return $error;
}
add_filter( 'woocommerce_add_error', 'my_woocommerce_add_error' );


//remove ver from js and css
function _remove_script_version( $src ){
    $parts = explode( '?ver', $src );
        return $parts[0];
}
add_filter( 'script_loader_src', '_remove_script_version', 15, 1 );
add_filter( 'style_loader_src', '_remove_script_version', 15, 1 );

/* check box handler in checkout page */
function check_box_handler(){
	$status = get_user_meta(get_current_user_id(), 'is_check_box_checked', true);
	if(empty($status) || $status == 'active'){
		return 1;
	} else {
		return 0;
	}

	return 1;
}
add_filter('woocommerce_shiptobilling_default', 'check_box_handler');

/**/
?>
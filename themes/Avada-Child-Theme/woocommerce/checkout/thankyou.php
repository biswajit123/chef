<?php
/**
 * Thankyou page
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $woocommerce, $data, $wpdb; ?>

<?php
$user_id = get_current_user_id();
$currentRate= get_user_meta(1, "refBonus",true);
$rewordBonus= get_user_meta(1, "rewordBonus",true);

if(empty($currentRate))
    $currentRate = 0;
if(empty($rewordBonus))
    $rewordBonus = 0;

$exe_ref_id = get_user_meta( $user_id, "genRefKey", true);
if(is_user_logged_in() && empty($exe_ref_id)) {
$refKey= $user_id.mt_rand();
//$ranStr = md5(microtime());
$refKey = substr($refKey, 0, 5);
$ref_code=get_user_meta($user_id,'temp',true);
update_user_meta( $user_id, "temp", "");

$pID = get_user_meta(get_current_user_id(), 'applied_coupon_id_track', true);		// Get the Tracking ID

// Delete The Coupon Code
if(!empty($pID)){
    $wpdb->query(
        $wpdb->prepare("DELETE  FROM wp_posts where ID='%s'", $pID)
    );
}

update_user_meta( $user_id, "genRefKey", $refKey);
$query = 'SELECT user_id FROM wp_usermeta WHERE meta_key = "genRefKey" and meta_value = "'.$ref_code.'"';
$result = mysql_query($query);
$array = mysql_fetch_array($result);
$bonus =$array['user_id'];
if($user_id!=$bonus){
    if($bonus!=""){

        $prevBalance= get_user_meta($user_id, "wallet",true);
        $currentRate= get_user_meta(1, "refBonus",true);
        $balance=(int)$prevBalance+$currentRate;
        update_user_meta( $bonus, "wallet", $balance);
        $prevwalletTotal= get_user_meta($user_id, "walletTotal",true);
        $balanceT=(int)$prevwalletTotal+$currentRate;

        update_user_meta( $bonus, "walletTotal", $balanceT);

        add_user_meta( $bonus, "refKey", $ref_code);

        add_user_meta( $bonus, "refKey", $user_id);
        add_user_meta( $user_id, "refKeyID", $ref_code);


    }
}else{
    echo"you can not use your own referral code";
}
}
?>

<?php if ( $order ) : ?>

	<div class="woocommerce-content-box full-width" id="thank-you-box">

	<?php if ( in_array( $order->status, array( 'failed' ) ) ) : ?>

		<p><?php _e( 'Unfortunately your order cannot be processed as the originating bank/merchant has declined your transaction.', 'woocommerce' ); ?></p>

		<p><?php
			if ( is_user_logged_in() )
				_e( 'Please attempt your purchase again or go to your account page.', 'woocommerce' );
			else
				_e( 'Please attempt your purchase again.', 'woocommerce' );

		?></p>

		<p>
			<a href="<?php echo esc_url( $order->get_checkout_payment_url() ); ?>" class="button pay"><?php _e( 'Pay', 'woocommerce' ) ?></a>
			<?php if ( is_user_logged_in() ) : ?>
			<a href="<?php echo esc_url( get_permalink( woocommerce_get_page_id( 'myaccount' ) ) ); ?>" class="button pay"><?php _e( 'My Account', 'woocommerce' ); ?></a>
			<?php endif; ?>
		</p>

	<?php else : ?>

		<h2><?php _e( 'Thank you. Your order has been received.', 'woocommerce' ); ?></h2>

		<?php $iconcolor = strtolower($data['checklist_icons_color']); ?>
		<ul class="list-icon circle-yes list-icon-check list-icon-color-<?php echo $iconcolor; ?>">
			<li class="order">
				<?php _e( 'Order:', 'woocommerce' ); ?>
				<strong><?php echo $order->get_order_number(); ?></strong>
			</li>
			<li class="date">
				<?php _e( 'Date:', 'woocommerce' ); ?>
				<strong><?php echo date_i18n( get_option( 'date_format' ), strtotime( $order->order_date ) ); ?></strong>
			</li>
			<li class="total">
				<?php _e( 'Total:', 'woocommerce' ); ?>
				<strong><?php echo $order->get_formatted_order_total(); ?></strong>
			</li>
			<?php if ( $order->payment_method_title ) : ?>
			<li class="method">
				<?php _e( 'Payment method:', 'woocommerce' ); ?>
				<strong><?php echo $order->payment_method_title; ?></strong>
			</li>
			<?php endif; ?>
            <!--Added by Soumya-->
            <li class="delivery_date">
                <?php _e( 'Delivery date:', 'woocommerce' ); ?>
                <strong><?php echo $order->order_custom_fields['Delivery Date'][0]; ?></strong>
            </li>
            <?php if(is_user_logged_in()) { $ref_Code = get_user_meta(get_current_user_id(), 'genRefKey', true); ?>
                <li class="ref_code">
                    <?php _e( 'Referral Code:', 'woocommerce' ); ?>
                    <strong><?php echo $ref_Code; ?></strong>
                </li>
            <?php } ?>
            <!--Ended by Soumya-->
		</ul>
		<div class="clear"></div>

	<?php endif; ?>

	<?php  do_action( 'woocommerce_thankyou_' . $order->payment_method, $order->id ); ?>

	</div>
    <?php if(is_user_logged_in()) { ?>

        <div class="clear"></div>
        <div class="share_ref_code_section">
            <h1 class="share_headline">Share a meal with friends, and recieve a discount of $<?php echo $currentRate; ?>!</h1>
            <!-- <p class="share_description">Recommend us and we give your friend $<?php echo $rewordBonus; ?> discount in the first chefAmi box!</p> -->
            <p class="share_description">Recommend us to your friends and you both benefit!</p>
            <div class="share_code_section">
                <div class="images_holder1 imgHolder">
                    <p class="ref_code_description">Share this code with your friends</p>
                    <P class="ref_code_shower"><?php echo $ref_Code; ?></P>
                </div>
                <div class="images_holder2 imgHolder">
                    <p class="ref_code_description"> Your friends will receive $<?php echo $rewordBonus; ?>  off their first order.</p>
                </div>
                <div class="images_holder3 imgHolder">
                    <p class="ref_code_description">You receive a discount of $<?php echo $currentRate; ?> for each friend that purchases!</p>
                </div>
                <span class="clear"></span>
            </div>

        </div>

        <div class="share_with_social_plugin">
            <div class="social-shares">
                <div  style="width:100%;">
                    <table  style="width: 60%;margin: 0 auto;">
                        <tr>
                            <td style="width:33%;height: 70px;"><a style="text-decoration:none;" href="#" class="email_invitation"><img src="http://chefami.com/wp-content/uploads/email.png" style=" float:left;"> Share code with <br> &nbsp;<span style="color:#94bf01;">Email</span></a></td>
                            
							<td style="width:33%;height: 70px;">
							<!-- Dynamic code for facebook -->
							<?php 
								$ref=mysql_query("select * from `socialmsg`");
								$ref_array = array('[referral_bonus]', '[reward_bonus]', '[referral_code]');
								$replace_arr = array('$'.get_user_meta(1, "refBonus",true), '$'.get_user_meta(1, "rewordBonus",true), get_user_meta( $user_id, "genRefKey",true));
									while ($row = mysql_fetch_array($ref)) {
										$s=$row['type']."s";
										$m=$row['type']."m";								
										$subject  = str_replace($ref_array, $replace_arr, $row['subject']);
										$message  = str_replace($ref_array, $replace_arr, $row['msg']);
										$$s= $subject;
										$$m= $message;	
								}
							?>
							<!-- -->
							
							<a style="text-decoration:none;" href="http://www.facebook.com/sharer/sharer.php?s=100&p[title]=<?php echo $facebookm; ?>&p[summary]=<?php echo $facebooks; ?>&&p[url]=http://www.chefami.com/&p[images][0]=http://chefami.com/wp-content/uploads/2013/09/ChefAmilogo-220x71.png"   onclick="window.open(this.href,'targetWindow','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=650,height=350'); return false;"/><img src="http://chefami.com/wp-content/uploads/facebook.png" style=" float:left;">Share code with <br> &nbsp;<span style="color:#94bf01;">Facebook Friends</span></a>
							
							</td>
                            <td style="width:34%;height: 70px;"><a style="text-decoration:none;"  href="http://twitter.com/share?url=http://chefami.com/&amp;text=<?php echo $twitters; ?>&amp;via=codepo8"   onclick="window.open(this.href,'targetWindow','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=650,height=450'); return false;" /"><img src="http://chefami.com/wp-content/uploads/twitter.png" style=" float:left;">Share code with <br> &nbsp;<span style="color:#94bf01;">Twitter</span></a></td>
                        </tr>
                    </table>
                </div>

                <!-- Email Sending Code -->
                <div class="invitation_form">
					<span class="button b-close"><span>X</span></span>
                    <form id="invitationform" action="" method="post">
                        <b>I want to send my referral code to the following friends</b>
                        <br><br>
                           <input type="hidden" name="ref_code_holder" id="ref_code" value="<?php echo $ref_Code; ?>">
                        <table>
                            <tbody>
                            <tr>
                                <td class="numberCell">1.</td>
                                <td class="inputCell">
                                    <input class="ui-inputText" required="true" placeholder="Name" name="ReferrerEmailForm[name_0]" id="ReferrerEmailForm_name_0" type="text">
                                </td>
                                <td class="inputCell">
                                    <input class="ui-inputText" required="true" placeholder="Email" name="ReferrerEmailForm[email_0]" id="ReferrerEmailForm_email_0" type="email">
                                </td>
                            </tr>
                            <tr>
                                <td class="numberCell">2.</td>
                                <td class="inputCell">
                                    <input class="ui-inputText" placeholder="Name" name="ReferrerEmailForm[name_1]" id="ReferrerEmailForm_name_1" type="text">
                                </td>
                                <td class="inputCell">
                                    <input class="ui-inputText" placeholder="Email" name="ReferrerEmailForm[email_1]" id="ReferrerEmailForm_email_1" type="text">
                                </td>
                            </tr>
                            <tr>
                                <td class="numberCell">3.</td>
                                <td class="inputCell">
                                    <input class="ui-inputText" placeholder="Name" name="ReferrerEmailForm[name_2]" id="ReferrerEmailForm_name_2" type="text">
                                </td>
                                <td class="inputCell">
                                    <input class="ui-inputText" placeholder="Email" name="ReferrerEmailForm[email_2]" id="ReferrerEmailForm_email_2" type="text">
                                </td>
                            </tr>
                            <tr>
                                <td class="numberCell">4.</td>
                                <td class="inputCell">
                                    <input class="ui-inputText" placeholder="Name" name="ReferrerEmailForm[name_3]" id="ReferrerEmailForm_name_3" type="text">
                                </td>
                                <td class="inputCell">
                                    <input class="ui-inputText" placeholder="Email" name="ReferrerEmailForm[email_3]" id="ReferrerEmailForm_email_3" type="text">
                                </td>
                            </tr>
                            <tr>
                                <td class="numberCell">5.</td>
                                <td class="inputCell">
                                    <input class="ui-inputText" placeholder="Name" name="ReferrerEmailForm[name_4]" id="ReferrerEmailForm_name_4" type="text">
                                </td>
                                <td class="inputCell">
                                    <input class="ui-inputText" placeholder="Email" name="ReferrerEmailForm[email_4]" id="ReferrerEmailForm_email_4" type="text">
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <input id="invitationformReplaceSubmitButton" class="orangeButton makeItGreen small-button" type="submit" name="replacesubmit" value="Send">
                    </form>
                </div>
                <!-- Email sending code end -->

            </div>


    <?php } ?>

	<?php   do_action( 'woocommerce_thankyou', $order->id ); ?>

<?php else : ?>

	<div class="woocommerce-content-box full-width" id="thank-you-box">

	<p><?php // _e( 'Thank you. Your order has been received.', 'woocommerce' ); ?></p>

	</div>

<?php endif; ?>
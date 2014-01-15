<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>New Document</title>
 <META HTTP-EQUIV="CONTENT-TYPE" CONTENT="text/html; charset=windows-1252">
 <TITLE></TITLE>
 <META NAME="GENERATOR" CONTENT="OpenOffice.org 3.1  (Win32)">
 <META NAME="AUTHOR" CONTENT="Chefami">
 <META NAME="CREATED" CONTENT="20130706;15150000">
 <META NAME="CHANGED" CONTENT="20130706;17254000">
 <META NAME="AppVersion" CONTENT="12.0000">
 <META NAME="DocSecurity" CONTENT="0">
 <META NAME="HyperlinksChanged" CONTENT="false">
 <META NAME="LinksUpToDate" CONTENT="false">
 <META NAME="ScaleCrop" CONTENT="false">
 <META NAME="ShareDoc" CONTENT="false">
<meta name="Generator" content="EditPlus">
<meta name="Author" content="">
<meta name="Keywords" content="">
<meta name="Description" content="">
</head>

<?php 
global $current_user,  $wpdb;
      get_currentuserinfo();
$userid = $current_user->ID;
$refBonus= get_user_meta(1, "refBonus",true);
$rewordBonus= get_user_meta(1, "rewordBonus",true);


        if (sizeof($order->get_items())>0) {
            foreach($order->get_items() as $item) {
                $product = get_product( $item['variation_id'] ? $item['variation_id'] : $item['product_id'] );
                break;
            }
        }
	  ?>

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
<body>
	<table border="0" cellpadding="0" cellspacing="0" height="100%"
		width="100%">
		<tbody>
			<tr>
				<td align="center" valign="top">
					<p style="margin-top: 0">
						<!--<img src="http://chefami.com/wp-content/uploads/2013/09/emailbackground.png" alt="Chef Ami" style="display:inline;border:none;font-size:14px;font-weight:bold;min-height:auto;line-height:100%;outline:none;text-decoration:none;text-transform:capitalize">-->
					</p>
					<table border="0" cellpadding="0" cellspacing="0" width="800"
						style="border-radius: 6px !important; background-color: #fdfdfd; border: 1px solid #dcdcdc; border-radius: 6px !important">
						<tbody>
							<tr>
								<td align="center" valign="top">
							</tr>
							<tr>
								<td align="center" valign="top">

									<table border="0" cellpadding="0" cellspacing="0" width="850">
										<tbody>
											<tr>
												<td valign="top"
													style="background-color: #fdfdfd; border-radius: 6px !important">

													<table border="0" cellpadding="20" cellspacing="0"
														width="100%">
														<tbody>
															<tr>
																<td valign="top">
																	<div><img style="width: 100%; border: 1px solid rgb(204, 204, 204); box-shadow: 0px 0px 5px rgb(204, 204, 204);" src="http://chefami.com/wp-content/uploads/2013/10/emailheader.png"></div>
																	<div style="color: #737373; font-family: Arial; font-size: 14px; line-height: 150%; text-align: left">
																		<p style="float:left;padding: 10px 0;">Hello <?php echo $current_user->user_firstname;?>,</p>
																		
																		<p style="float:right;padding: 10px 0;"><?php echo date('l, M d, Y')?></p>
																		<p style="clear:both;"></p>
																		<p> Welcome to Chef Ami! We are excited to begin cooking with you, and delivering the freshest local ingredients to you every week!</p>
																		
																		<div style="clear:both;"></div>
																		<img src="http://chefami.com/wp-content/uploads/horizental.png" style="width:100%;">
																		<div style="clear:both;"></div>

																		<h4 style="color: #505050; display: block; font-family: Arial; font-size: 15px; font-weight: bold; margin-top: 10px; margin-right: 0; margin-bottom: 10px; margin-left: 0; text-align: left; line-height: 150%">
																			Here is your order confirmation and details : 
																		</h4>
																		<h4>Your order number: <?php echo $order->get_order_number();?></h4>

																		<table cellspacing="0" cellpadding="6"
																			style="width: 100%; border: none;"
																			border="0">
																			<thead>
																				<tr>
																					<th scope="col"	style="width:30%;text-align: left; ">Your Box</th>
																					<th scope="col"	style="width:40%;text-align: left;">Price</th>
																					<th scope="col"	style="width:30%;text-align: left; ">First Delivery</th>
																				</tr>
																			</thead>
																			<tbody>
																				<tr>
																					<td	style="font-weight:bold;width:30%;text-align: left; vertical-align: middle; word-wrap: break-word"><?php echo $product->post->post_title;?><br>
																						<small>Servings: <?php echo $product->variation_data['attribute_servings'];?></small>
																					</td>
																					<td	style="width:40%;text-align: left; vertical-align: middle; ">$<?php echo $order->order_custom_fields['_order_recurring_total'][0];?></td>
																					<td	style="width:30%;text-align: left; vertical-align: middle; ">
																					<?php   $date =$order->order_custom_fields['Delivery Date'][0]; 
																					$date=explode(" ",$date);
																					echo date('l, M d, Y',strtotime($date[0]));
																					
																					?></tr>
																				<tr>																					
																					<td	style="font-weight:bold;width:40%;text-align: left; vertical-align: middle; " colspan="3"></td>
																				</tr>
																				<tr>
																					<td	style="font-weight:bold;width:30%;text-align: left; vertical-align: middle; word-wrap: break-word">Sum:</td>
																					<td	style="width:40%;text-align: left; vertical-align: middle; " colspan="2">$<?php echo $order->order_custom_fields['_order_recurring_total'][0];?></td>
																				</tr>
																				<?php
																					if(empty($order->order_custom_fields['_cart_discount'][0]))
																						$order->order_custom_fields['_cart_discount'][0] = 0;
																				?>
																				<tr>
																					<td	style="font-weight:bold;width:30%;text-align: left; vertical-align: middle; word-wrap: break-word">Your voucher:</td>
																					<td	style="width:40%;text-align: left; vertical-align: middle; " colspan="2">-<?php echo $order->order_custom_fields['_cart_discount'][0];?></td>
																				</tr>
																				<tr>
																					<td	style="font-weight:bold;width:30%;text-align: left; vertical-align: middle; word-wrap: break-word">Your total price:</td>
																					<td	style="width:40%;text-align: left; vertical-align: middle; " colspan="2">$<?php
																					echo $data = $order->order_custom_fields['_order_recurring_total'][0] - $order->order_custom_fields['_cart_discount'][0];
																					?></td>
																				</tr>																				
																				<tr>
																					<td	style="font-weight:bold;width:30%;text-align: left; vertical-align: middle; word-wrap: break-word">Delivery Address:</td>
																					<td	style="width:40%;text-align: left; vertical-align: middle; " colspan="2"><?php echo $order->shipping_first_name." ".$order->shipping_last_name;?> <br><?php echo $order->shipping_address_1." ".$order->shipping_address_2." ,".$order->billing_city.",zip -".$order->billing_postcode;?></td>
																				</tr>
																				<tr>																					
																					<td	style="width:40%;text-align: left; vertical-align: middle; " colspan="3"></td>
																				</tr>
																				<tr>
																					<td	style="width:40%;text-align: left; vertical-align: middle; " colspan="3">For following deliveries your account will be charged the Thursday before your scheduled delivery</td>
																				</tr>
																			</tbody>																			
																		</table>
																		
																		<div style="clear:both;"></div>
																			<img src="http://chefami.com/wp-content/uploads/horizental.png" style="width:100%;">
																		<div style="clear:both;"></div>
																		
																		<div style="display:table; width:100%; margin:0 auto;">
																			<p style="font-weight:bold;">Your personal referral code is found below and can be shared with as many friends as you like! You can earn<span style="color:#C6E295">$<?php echo $refBonus;?></span> towards your next box and your friends will get <span style="color:#C6E295">$<?php echo $rewordBonus;?></span> off too!</p>
																			<div style="display:table; width:100%; margin:0 auto;">
																				<div class="share_code_section" style="display: table;margin: 50px auto 0;">
																					<div class="images_holder1 imgHolder" style="background-size: 100% auto;float: left;height: 250px;width: 250px; background: url('http://chefami.com/wp-content/themes/Avada-Child-Theme/images/scFirstImage.png') no-repeat scroll 0 0 rgba(0, 0, 0, 0);">
																						<p class="ref_code_description" style="color: #333333;font-family: arial;font-size: 15px;font-weight: bold;margin: 32px 0 0 62px;width: 165px;">Share this code with your friends</p>
																						<p class="ref_code_shower" style="color: #FFFFFF;font-size: 40px;font-weight: bold;margin-left: 80px;margin-top: 54px;"><?php echo get_user_meta(get_current_user_id(), 'genRefKey', true); ?></p>
																					</div>
																					<div class="images_holder2 imgHolder" style="background-size: 100% auto;float: left;height: 250px;width: 250px; background: url('http://chefami.com/wp-content/themes/Avada-Child-Theme/images/scSecondImage.png') no-repeat scroll 0 0 rgba(0, 0, 0, 0);">
																						<p class="ref_code_description" style="color: #333333;font-family: arial;font-size: 15px;font-weight: bold;margin: 32px 0 0 74px;width: 163px;">Your friends will receive on the first box $<?php echo $rewordBonus;?> discount*</p>
																					</div>
																					<div class="images_holder3 imgHolder" style="background-size: 100% auto;float: left;height: 250px;width: 250px; background: url('http://chefami.com/wp-content/themes/Avada-Child-Theme/images/scThirdImage.png') no-repeat scroll 0 0 rgba(0, 0, 0, 0);">
																						<p class="ref_code_description" style="color: #333333;font-family: arial; font-size: 15px;font-weight: bold;margin: 32px 0 0 62px;width: 165px;">We are writing to $<?php echo $refBonus;?> for each successful well!</p>
																					</div>
																					<span class="clear"></span>
																				</div>
																			</div>		
																		</div>
																		
																		<div style="clear:both;"></div>
																		<img src="http://chefami.com/wp-content/uploads/horizental.png" style="width:100%;">
																		<div style="clear:both;"></div>
																		
																		<div  style="width:100%;">
																			<p style="padding: 10px 0;">Stay in touch with us for the latest news, tips, and tricks from Chef Ami!</p>
																			<table  style="width:100%;">
																				<tr>
																					<td style="width:50%;height: 70px;"><img src="http://chefami.com/wp-content/uploads/facebook.png" style=" float:left;">    Like us on <br>    <a style="text-decoration:none;" href="http://www.facebook.com/chefamimeals"><span style="color:#94bf01;">Facebook</span></a></td>
																					<td style="width:50%;height: 70px;"><img src="http://chefami.com/wp-content/uploads/pin.png" style=" float:left;">    Follow us on <br>    <a style="text-decoration:none;" href="http://www.pinterest.com/chefamimeals"><span style="color:#94bf01;">pin</span></a></td>
																				</tr>
																				<tr>
																					<td style="width:50%;height: 70px;"><img src="http://chefami.com/wp-content/uploads/twitter.png" style=" float:left;">   Follow us on <br>    <a style="text-decoration:none;" href="http://www.twitter.com/chefamimeals"><span style="color:#94bf01;">twitter</span></a></td>
																					<td style="width:50%;height: 70px;"><img src="http://chefami.com/wp-content/uploads/yelp.png" style=" float:left;">    Check our blog <br>    <a style="text-decoration:none;" href="http://www.yelp.com/biz/chef-ami-gainesville"><span style="color:#94bf01;">yelp</span></a></td>
																				</tr>
																			</table>
																		</div>	
																		
																		<div style="clear:both;"></div>
																		<img src="http://chefami.com/wp-content/uploads/horizental.png" style="width:100%;">
																		<div style="clear:both;"></div>
																		
																		<div style="">
																		<p>To check or manage your order details on our website simply <a href="<?php echo get_permalink(woocommerce_get_page_id( 'myaccount' )); ?>">Click Here</a> to login to your account.</p>
																		<p></p>
																		<p>If you have questions at all don't hesitate to reach us at service@chefami.com</p>
                                                                                                                                                <p></p>
                                                                                                                                                <p>We thank you for choosing to cook with Chef Ami and can't wait to get cooking together!</p>
                                                                                                                                                <p></p>
                                                                                                                                                <p>Happy Cooking</p>
                                                                                                                                                <p></p>
                                                                                                                                                <p>Your Chef Ami Team</p>
																		</div>																	
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr>
								<td align="center" valign="top">

									<table border="0" cellpadding="10" cellspacing="0" width="800"
										style="border-top: 0">
										<tbody>
											<tr>
												<td valign="top">
													<table border="0" cellpadding="10" cellspacing="0"
														width="100%">
														<tbody>
															<tr>
																<td colspan="2" valign="middle"
																	style="border: 0; color: #c6e295; font-family: Arial; font-size: 12px; line-height: 125%; text-align: center">
																	<p>Chef Ami � Fresh Ingredients Delivered</p>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>
</body>
</html>

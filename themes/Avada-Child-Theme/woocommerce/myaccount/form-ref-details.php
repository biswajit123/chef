<?php
/**
 * Change password form
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $woocommerce, $wpdb, $post;
?>

<!--  -->
<!--  -->
<?php
$user_id = get_current_user_id();
$currentRate= get_user_meta(1, "refBonus",true);
$rewordBonus= get_user_meta(1, "rewordBonus",true);
 $ref_code = get_user_meta( $user_id, "genRefKey",true);
?>

       <div class="clear"></div>
        <div class="share_ref_code_section">
            <h1 class="share_headline">Share a meal with friends, and recieve a discount of $<?php echo $currentRate; ?>!</h1>
            <!-- <p class="share_description">Recommend us and we give your friend $<?php echo $rewordBonus; ?> discount in the first chefAmi box!</p> -->
            <p class="share_description">Recommend us to your friends and you both benefit!</p>
            <div class="share_code_section">
                <div class="images_holder1 imgHolder">
                    <p class="ref_code_description">Share this code with your friends</p>
                    <P class="ref_code_shower"><?php echo get_user_meta( $user_id, "genRefKey",true); ?></P>
                </div>
                <div class="images_holder2 imgHolder">
                    <p class="ref_code_description"> Your friends will receive $<?php echo $rewordBonus; ?>  off their first order.</p>
                </div>
                <div class="images_holder3 imgHolder">
                    <p class="ref_code_description">You receive a credit of $<?php echo $currentRate; ?> for each friend that purchases!</p>
                </div>
                <span class="clear"></span>
            </div>

        </div>

        <div class="share_with_social_plugin">
            <div class="social-shares">
                <div  style="width:100%;">
                    <table  style="width: 66%;margin: 0 auto;">
                        <tr>
                            <td style="width:33%;height: 70px;">
							
							<a style="text-decoration:none;" href="#" class="email_invitation"><img src="http://chefami.com/wp-content/uploads/email.png" style=" float:left;">Share code with <br> &nbsp;<span style="color:#94bf01;">Email</span></a>
							
							</td>
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
                           <input type="hidden" name="ref_code_holder" id="ref_code" value="<?php echo get_user_meta( $user_id, "genRefKey",true );?>">
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
		</div>
	</div>

<!--  -->
<!--  -->









<?php // woocommerce_get_template('user-welcome.php'); ?>

<?php woocommerce_get_template('myaccount-nav.php'); ?>
<?php 
  $user_id = get_current_user_id();
  $refKey= get_user_meta($user_id, "genRefKey",true); 
  $walCount= get_user_meta($user_id, "wallet",true);
  $walletTotal = get_user_meta($user_id, "walletTotal",true);
  $walletTotal =$walletTotal-$walCount;
 if($walCount==""){
 	$walCount="0";
 }
  
?>
<div class="woocommerce-content-box">
<div class="upperSection">
    <h2 class="page-info"><?php _e('Referral Overview', 'Avada'); ?></h2>

    <p class="form-row form-row-first">Available Credit : $<?php  echo $walCount;?></p>
    <p class="form-row form-row-first">Redeemed Credit: $<?php  echo $walletTotal;?></p>
    <p class="form-row form-row-first">Referral Code :<?php echo $refKey; ?></p>
    <?php if($walCount > 0) { ?>
    <br>
        <h2 class="page-info"><?php _e('Use your wallet balance', 'Avada'); ?></h2>
        <form name="update_subscription" id="update_subscription" action="">
            <input type="text" class="ref_code_redim" id="ref_code_redim" value="">
            <input type="submit" id="ref_code_submit_btn_redim" value="Update Subscription">
        </form>
    <?php } ?>
        <br>
    </div>
    <div class="lowerSection">
    	<h2 class="page-info"><?php _e('Referred By You', 'Avada'); ?></h2>
    	<?php $array= get_user_meta($user_id, "refKey");
    	if(count($array)>0){
    	?>
    	<table border=0 cellpadding="10" cellspacing="10" style="border:0px solid #808080 ">
    	<tr><th style="text-align:left;">Name</th><th style="text-align:left;">Email</th></tr>
    	 <?php 
    	
		  
		foreach ($array as $user_id) {
			
				$user_name_arr=get_userdata($user_id);
				$user_email = $user_name_arr->user_email;
				$user_name = get_user_meta($user_id, "first_name",true)." ".$walletTotal = get_user_meta($user_id, "last_name",true);
			?>
			<tr ><th><?php echo $user_name;?></th><th><?php echo $user_email;?></th></tr>
			<?php 	
	
		}
		?>
		</table>
		<?php }else{
			echo "<b>No user details Found</b>";
			
		}
		
		?>
    </div>
    <div class="clear"></div>
</div>
<div class="clear"></div>
<div class="share_ref_code_section_faq">
	<h2 class="rf_faq_heading">FAQ</h2>
	<?php
		$question = $wpdb->get_row("select count(*) count from wp_postmeta where meta_key like '%question_%'");
		for($i=1; $i<=$question->count; $i++) {
	?>
	<div class="faq-item about-boxes " style="display: block; float:none;">
		<h5 class="toggle"><a href="#"><span class="arrow"></span><span class="toggle-title"><?php echo get_post_meta($post->ID, 'question_'.$i, true); ?></span></a></h5>
		<div class="toggle-content post-content" style="display: none;">
			<p><?php echo get_post_meta($post->ID, 'answer_'.$i, true); ?></p>
		</div>
	</div>	
	<?php } ?>
</div>
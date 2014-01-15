<?php
/*
    Plugin name: Add referal availability
    Plugin URI:
    Description: Zip code availability in area
    Author: samit
    Version: 0.1
*/

add_action('admin_menu','refcode');

    function refcode()
    {
        add_menu_page('referal','Referal','administrator','referal','referal');
    }

    function referal(){
    	
    if(count($_POST)>0){
    	$ref=$_POST['ref'];
    	$rew=$_POST['rew'];
    	update_user_meta(1, "refBonus", $ref);
    	update_user_meta(1, "rewordBonus", $rew);
    	echo'<div id="message" class="updated"><p>Referral Settings Saved successfully </p></div>';
    	
    }
    $ref=get_user_meta(1,"refBonus",yes);
    $rew=get_user_meta(1,"rewordBonus",yes);
    
    
    	?>
    	<h3>Referral Settings</h3>
    	<form method="post">
    	Referral Bonus : <input type="text" name="ref" value="<?php echo $ref;?>"><br>
    	Reward Bonus : <input type="text" name="rew" value="<?php echo $rew;?>"><br>
    	<input type="submit" value="Save">
    	</form>
    	<br>
    	<table border=0 cellpadding="10" cellspacing="10" style="border:4px solid ">
    	<tr><th>User Name</th><th>Wallet Balance</th><th>Total Used</th></tr>
    	 <?php 
    	 $query = 'SELECT user_id,meta_value FROM wp_usermeta WHERE meta_key = "wallet" and meta_value!=""';
		 $result = mysql_query($query);
		 $walletTotal=0;
		 $usedTotal=0;
		while($array = mysql_fetch_array($result)){
				$user_id =$array['user_id'];
				$user_name_arr=get_userdata($user_id);
				$user_name = $user_name_arr->user_email;
				$wallet=$array['meta_value'];
				$total=get_user_meta($user_id,"walletTotal",yes);
				$used=(int)$total-$wallet;
				$walletTotal=$walletTotal+$wallet;
				$usedTotal=$usedTotal+$used;
			?>
			<tr ><th><?php echo $user_name;?></th><th><?php echo $wallet;?></th><th><?php echo $used;?></th></tr>
			<?php 	
	
		}
		?>
		<tr><th style="border-top:2px solid">Total</th><th style="border-top:2px solid"><?php echo $walletTotal;?></th><th style="border-top:2px solid"><?php echo $usedTotal;?></th></tr>
    	</table>
    	
    	<?php 
    	
    }

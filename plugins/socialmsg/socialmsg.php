<?php
/*
    Plugin name: Add social msg 
    Plugin URI:
    Description: Add social msg
    Author: samit
    Version: 0.1
*/

add_action('admin_menu','socialmsg');

    function socialmsg()
    {
        add_menu_page('mysocial','Social Msg','administrator','mysocial','mysocial');
    }

    function mysocial(){
    	
		$create="CREATE TABLE IF NOT EXISTS `socialmsg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `subject` longtext NOT NULL,
  `msg` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;";
   $sat=mysql_query($create);
//   if($sat===true){

//	$insert = "INSERT INTO  `chefami`.`socialmsg` (`type` ,`subject` ,`msg`)VALUES ('facebook',  '',  ''), ('twitter',  '',  ''),('email',  '',  '');";
//	 mysql_query($insert); 
 //   }
    if(count($_POST)>0){
    	
    	
		$subject1=$_POST['subject1'];
		$subject2=$_POST['subject2'];
		$subject3=$_POST['subject3'];
		
		$msg1=$_POST['msg1'];
		$msg2=$_POST['msg2'];
		$msg3=$_POST['msg3'];

    	mysql_query("TRUNCATE socialmsg");
		$insert = "INSERT INTO `socialmsg` (`type` ,`subject` ,`msg`)VALUES ('facebook',  '$subject1',  '$msg1'), ('twitter',  '$subject2',  '$msg2'),('email',  '$subject3',  '$msg3');";
    	if(mysql_query($insert)){?>
            <div class="updated fade"><p>Successfully updated</p></div>
        <?php }else{?>
            <div class="error"><p>Error while saving</p></div>
        <?php }
    	
    }
    $ref=mysql_query("select * from `socialmsg`");
    while ($row = mysql_fetch_array($ref)) {
		$s=$row['type']."s";
        $m=$row['type']."m";
    $$s= $row['subject'];
    $$m=  $row['msg'];
    
    
}
    
    	?>
        <style>
            h3{
                text-align: center;
            }
             input[type="text"]{
                width: 78%;
            }
            textarea{

                max-width: 78%;
                min-width: 78%;
            }
        </style>
    	<h1>Message Center</h1>
        <div style="float:left;width:30%">
            <form method="post">
            <h3>Facebook</h3>
            <hr><br>
             Subject &nbsp; &nbsp;: <input type="text" name="msg1" value="<?php echo $facebookm;?>"><br>
             Message : <textarea  name="subject1" cols="26" rows="5"> <?php echo $facebooks;?></textarea>
         </div>
         <div style="float:left;width:30%">
            <h3>Twitter</h3>
            <hr><br>
             Subject &nbsp; &nbsp;: <input type="text" name="msg2" value="<?php echo $twitterm;?>"><br>
             Message : <textarea  name="subject2" cols="26" rows="5"> <?php echo $twitters;?></textarea>
         </div>
        <div style="float:left;width:30%">
            <h3>Email</h3>
            <hr><br>
             Subject &nbsp; &nbsp;: <input type="text" name="msg3" value="<?php echo $emailm;?>"><br>
             Message : <textarea  name="subject3" cols="26" rows="5"> <?php echo $emails;?></textarea>
        </div>
        <div style="clear:both"></div>
    	<div style="float: left;margin-top: 20px;"><input type="submit" value="Save"></div>
    	</form>


		<br>
		<br><br><br>
		Note:
		Short codes: <br>
		
		[referral_code] -six digit code for every users<br>
		[referral_bonus] - The bonus,after the user get discount by using six digit code<br>
		[reward_bonus] - The bonus, recieved by the user whose code is used<br>
   
    	
    	<?php 
    	
    }

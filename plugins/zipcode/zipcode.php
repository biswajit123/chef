<?php
/*
    Plugin name: Add zipcode availability
    Plugin URI:
    Description: Zip code availability in area
    Author: Soumya
    Version: 1.0
*/

add_action('admin_menu','zipcode');

    function zipcode()
    {
        add_menu_page('Zipcode availability','Add zipcode','administrator','zipcode','newform');
    }

    function newform(){
        global $wpdb;
        wp_register_script( 'my-custom', plugins_url('js/my-custom.js', __FILE__) );
        wp_enqueue_script( 'my-custom' );

        wp_localize_script( 'my-custom', 'ajax_object',
            array( 'ajax_url' => admin_url( 'admin-ajax.php' )) );
        ?>
        <style>
            .td-block{
                background: #A0CE4E;
                border:none;
                padding: 10px;
                color:#333;
            }
            .td-newblock{
                background: #ff2222;
                border:none;
                padding: 10px;
                color:#333;
            }
            .zip_content{
                /*overflow-y: scroll;
                width: 40%;
                min-height: 500px;
                max-height: 500px;*/
            }
        </style>

        <?php
        //$wpdb->query("drop table `wp_zipcode`");
        $wpdb->query("CREATE TABLE IF NOT EXISTS `wp_zipcode` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT,`zipcode` varchar(10),`status` varchar(10), PRIMARY KEY (`id`)) ;");

        $inactive_zipcode=$wpdb->get_results("select * from `wp_zipcode` where `status`='inactive'");
        $active_zipcode=$wpdb->get_results("select * from `wp_zipcode` where `status`='active'");

        ?>
        <div>
            <h1>Add Zip code</h1>

                <input type="text" name="zipcode" id="zipcode" placeholder="Zipcode Please!">
                <input type="button" value="Add" class="addnew">

        </div>

        <div style="width: 50%;float:left;">
            <h1>Zip code Available</h1>
            <div class="zip_content">
            <table>
                <!--<tr>
                    <th>Zipcode</th><th>Actions</th>
                </tr>-->

        <?php
                if(!empty($active_zipcode)){

                    foreach($active_zipcode as $k=>$v){
                        echo "<tr>";
                        echo "<td class='td-block'>".$v->zipcode."</td>";
                        ?>
                        <td>
                            <input type="button" value="Delete" class="zipdelete" zip="<?php echo $v->zipcode; ?>" id="<?php echo $v->id;?>">
                        </td>
                        <?php
                        echo "</tr>";

                    }
                }else{
                    echo "No zipcodes available.";
                }
                ?>


            </table>
            </div>
        </div>



        <div style="width: 50%;float:left;">
            <h1>New Zip code</h1>
            <div class="zip_content">
            <table>
                <!--<tr>
                    <th>Zipcode</th><th>Actions</th>
                </tr>-->

        <?php
            if(!empty($inactive_zipcode)){

                    foreach($inactive_zipcode as $k=>$v){
                       
                        $email = ($v->email)?$v->email:'';
                        echo "<tr>";
                        echo "<td class='td-newblock'>".$v->zipcode."   (".$email.")</td>";
                        ?>
                        <td>
                            <input type="button" value="Add it to availablity" class="zipupdate" zip="<?php echo $v->zipcode; ?>" id="<?php echo $v->id;?>">
							 <input type="button" value="Delete" class="zipdelete" zip="<?php echo $v->zipcode; ?>" id="<?php echo $v->id;?>">
                        </td>
                        <?php
                        echo "</tr>";

                    }
            }else{
                    echo "Oops! No new zipcodes.";
            }
                    ?>


            </table>
            </div>
        </div>
    <?php

    }

add_action('wp_ajax_new_zip', 'new_zip');
add_action('wp_ajax_nopriv_new_zip', 'new_zip');
function new_zip(){
    global $wpdb;
    $zipcode = $_POST['zipcode'];

    $check_zipcode=$wpdb->get_row("select * from `wp_zipcode` where `zipcode`='".$zipcode."'");
        if(empty($check_zipcode)){
            $table='wp_zipcode';

            $data=array(
                'zipcode'=>$zipcode,
                'status'=>'active'
            );

            if($wpdb->insert( $table, $data))
                echo "New zipcode added";

            else
                echo "Error! Please try again";
        }else{
            echo "Zip code already exist";
        }

exit;
}

add_action('wp_ajax_update_zip', 'update_zip');
add_action('wp_ajax_nopriv_update_zip', 'update_zip');

function update_zip(){
    global $wpdb;
    $table='wp_zipcode';
    $id = $_POST['id'];
	$zip = $_POST['zipValue'];
    
    $data['status']='active';

    $where=array(
        'id'=>$id
    );

    if($wpdb->update( $table, $data, $where, $format = null, $where_format = null )) {
		$where=array(
			'zipcode'=>$zip,
			'status' => 'inactive'
		);
		$wpdb->delete( $table, $where, $where_format = null );
        echo "Zip code updated";
	} else {
        echo "Error! Please try again";
	}
    exit;
}

add_action('wp_ajax_delete_zip', 'delete_zip');
add_action('wp_ajax_nopriv_delete_zip', 'delete_zip');

function delete_zip(){
    global $wpdb;
    $table='wp_zipcode';
    $id = $_POST['id'];
	$zip = $_POST['zipValue'];
    $where=array(
        'zipcode'=>$zip
    );
    if($wpdb->delete( $table, $where, $where_format = null ))
        echo "Zip code deleted";
    else
        echo "Error! Please try again";

    exit;
}

add_action('wp_ajax_check_zip_exist', 'check_zip_exist');
add_action('wp_ajax_nopriv_check_zip_exist', 'check_zip_exist');
function check_zip_exist(){
    global $wpdb;
    $zipcode = $_REQUEST['zipcode'];

    $check_zipcode=$wpdb->get_row("select * from `wp_zipcode` where `zipcode`='".$zipcode."' && `status`='active'");

    if(!empty($check_zipcode)){
         echo "1";
    }else{
        echo "0";
    }
    exit;
}

function abcd(){
//update_option( 'woocommerce_lost_password_page_id', 255 );
}
//add_action('init', 'abcd');
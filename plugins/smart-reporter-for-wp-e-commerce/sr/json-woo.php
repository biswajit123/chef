<?php
include_once ('../../../../wp-load.php');
include_once ('../../../../wp-includes/wp-db.php');
include_once (ABSPATH . WPINC . '/functions.php');
include_once ('reporter-console.php'); // Included for using the sr_number_format function

// =============================================================================
// Code For SR Beta
// =============================================================================

	$del = 3;
	$result  = array ();
	$encoded = array ();
	$months  = array ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' );
	$cat_rev = array ();

	global $wpdb;

	if (isset ( $_GET ['start'] ))
	    $offset = $_GET ['start'];
	else
	    $offset = 0;

	if (isset ( $_GET ['limit'] ))
	    $limit = $_GET ['limit'];

	// For pro version check if the required file exists
	if (file_exists ( '../pro/sr-woo.php' )){
	    define ( 'SRPRO', true );
	} else {
	    define ( 'SRPRO', false );
	}

	//Function for sorting and getting the top 5 values
	function usort_callback($a, $b)
	{
	  if ( $a['calc_total'] == $b['calc_total'] )
	    return 0;

	  return ( $a['calc_total'] > $b['calc_total'] ) ? -1 : 1;
	}

	//Cummulative sales Query function
	function sr_query_sales($start_date,$end_date_query,$date_series,$select,$group_by,$select_top_prod,$select_top_abandoned_prod,$terms_post,$post) {

	    global $wpdb;
	    $monthly_sales = array();
	    $cumm_top_prod_graph_data = array();
	    $results_top_prod = array();
	    $top_prod_ids = array();
	    $top_prod_graph_data = array();
	    $top_gateway_graph_data = array();

	    $sr_currency_symbol = isset($post['SR_CURRENCY_SYMBOL']) ? $post['SR_CURRENCY_SYMBOL'] : '';
	    $sr_decimal_places = isset($post['SR_DECIMAL_PLACES']) ? $post['SR_DECIMAL_PLACES'] : '';

	    //Query for getting the cumm sales

	    $query_monthly_sales = "SELECT SUM( postmeta.meta_value ) AS todays_sales,
	    						COUNT(posts.ID) AS total_orders,
	    						$select
		                        FROM `{$wpdb->prefix}postmeta` AS postmeta
		                        LEFT JOIN {$wpdb->prefix}posts AS posts ON ( posts.ID = postmeta.post_id )
		                        WHERE postmeta.meta_key IN ('_order_total')
		                            AND posts.post_date BETWEEN '$start_date' AND '$end_date_query'
		                            AND posts.ID IN ($terms_post)
	                            GROUP BY $group_by";
        $results_monthly_sales    = $wpdb->get_results ( $query_monthly_sales, 'ARRAY_A' );
	    $rows_monthly_sales 	  =  $wpdb->num_rows;

	    

	    //Query for Top 5 Customers

	    //Reg Customers
	    $query_reg_cumm = "SELECT ID FROM `$wpdb->users` 
	                        WHERE user_registered BETWEEN '$start_date' AND '$end_date_query'";
	    $reg_cumm_ids   = $wpdb->get_col ( $query_reg_cumm );
	    $rows_reg_cumm_ids =  $wpdb->num_rows;


	    $query_cumm_top_cust_guest ="SELECT postmeta1.meta_value AS billing_email,
	                                GROUP_CONCAT(DISTINCT postmeta2.post_id
	                                                             ORDER BY postmeta2.meta_id DESC SEPARATOR ',' ) AS post_id,
	                                MAX(postmeta2.post_id) AS post_id_max,
	                                SUM(postmeta2.meta_value) as total
	                            
	                                FROM {$wpdb->prefix}postmeta AS postmeta1
	                                    JOIN {$wpdb->prefix}posts AS posts ON (posts.ID = postmeta1.post_id)
	                                    INNER JOIN {$wpdb->prefix}postmeta AS postmeta2
	                                       ON (postmeta2.post_ID = postmeta1.post_ID AND postmeta2.meta_key IN ('_order_total'))
	                                WHERE postmeta1.meta_key IN ('_billing_email')
	                                    AND posts.post_date BETWEEN '$start_date' AND '$end_date_query'
	                                    AND posts.id IN (SELECT post_id FROM {$wpdb->prefix}postmeta
	                                                        WHERE meta_key IN ('_customer_user')
	                                                            AND meta_value = 0
	                                                            AND post_id IN ($terms_post))
	                                GROUP BY postmeta1.meta_value
	                                ORDER BY total DESC
	                                LIMIT 5";

	    $results_cumm_top_cust_guest   =  $wpdb->get_results ( $query_cumm_top_cust_guest, 'ARRAY_A' );    
	    $rows_cumm_top_cust_guest    =  $wpdb->num_rows;

	    if($rows_cumm_top_cust_guest > 0) {

	        $post_id = array();
	        $results_cumm_top_cust = array();

	        foreach ($results_cumm_top_cust_guest as $results_cumm_top_cust_guest1) {
	            $post_id[] = $results_cumm_top_cust_guest1 ['post_id_max'];
	        }

	        $post_id_imploded = implode(",",$post_id);

	        $query_cumm_top_cust_guest_detail = "SELECT postmeta.post_id as post_id,
	                                                GROUP_CONCAT(postmeta.meta_key
	                                                             ORDER BY postmeta.meta_id DESC SEPARATOR '###' ) AS meta_key,
	                                                GROUP_CONCAT(postmeta.meta_value
	                                                             ORDER BY postmeta.meta_id DESC SEPARATOR '###' ) AS meta_value
	                                            FROM {$wpdb->prefix}postmeta AS postmeta
	                                            WHERE postmeta.post_id IN ($post_id_imploded)
	                                                AND postmeta.meta_key IN ('_billing_first_name' , '_billing_last_name')
	                                            GROUP BY postmeta.post_id
	                                            ORDER BY FIND_IN_SET(postmeta.post_id,'$post_id_imploded')";

	        $results_cumm_top_cust_guest_detail   =  $wpdb->get_results ( $query_cumm_top_cust_guest_detail, 'ARRAY_A' );    

	        for ($i=0; $i<sizeof($results_cumm_top_cust_guest_detail); $i++) {

	            $results_cumm_top_cust[$i] = array();

	            $guest_meta_values = explode('###', $results_cumm_top_cust_guest_detail[$i]['meta_value']);
	            $guest_meta_key = explode('###', $results_cumm_top_cust_guest_detail[$i]['meta_key']);
	            if (count($guest_meta_values) != count($guest_meta_key))
	                continue;
	            unset($results_cumm_top_cust_guest_detail[$i]['meta_value']);
	            unset($results_cumm_top_cust_guest_detail[$i]['meta_key']);
	            $guest_meta_key_values = array_combine($guest_meta_key, $guest_meta_values);

	            $results_cumm_top_cust [$i]['total'] = $sr_currency_symbol . sr_number_format($results_cumm_top_cust_guest[$i]['total'],$sr_decimal_places);
	            $results_cumm_top_cust [$i]['calc_total'] = floatval($results_cumm_top_cust_guest[$i]['total']); // value used only for sorting purpose
	            $results_cumm_top_cust [$i]['name'] = $guest_meta_key_values['_billing_first_name'] . " " . $guest_meta_key_values['_billing_last_name'];
	            $results_cumm_top_cust [$i]['billing_email'] = $results_cumm_top_cust_guest [$i]['billing_email'];
	            $results_cumm_top_cust [$i]['post_ids'] = json_encode($results_cumm_top_cust_guest [$i]['post_id']);
	        }

	    }



	    $query_cumm_top_cust_reg ="SELECT postmeta1.meta_value AS user_id,
	                                GROUP_CONCAT(DISTINCT postmeta1.post_id
	                                                             ORDER BY postmeta1.meta_id DESC SEPARATOR ',' ) AS post_id,
	                               SUM(postmeta2.meta_value) as total
	                            
	                                FROM {$wpdb->prefix}postmeta AS postmeta1
	                                    JOIN {$wpdb->prefix}posts AS posts ON (posts.ID = postmeta1.post_id)
	                                    INNER JOIN {$wpdb->prefix}postmeta AS postmeta2
	                                       ON (postmeta2.post_ID = postmeta1.post_ID AND postmeta2.meta_key IN ('_order_total'))
	                                WHERE postmeta1.meta_key IN ('_customer_user')
	                                    AND posts.post_date BETWEEN '$start_date' AND '$end_date_query'
	                                    AND posts.id IN (SELECT post_id FROM {$wpdb->prefix}postmeta
	                                                        WHERE meta_key IN ('_customer_user')
	                                                            AND meta_value > 0
	                                                            AND post_id IN ($terms_post))
	                                GROUP BY postmeta1.meta_value
	                                ORDER BY total DESC
	                                LIMIT 5";

	    $results_cumm_top_cust_reg   =  $wpdb->get_results ( $query_cumm_top_cust_reg, 'ARRAY_A' );    
	    $rows_cumm_top_cust_reg    =  $wpdb->num_rows;

	    if ($rows_cumm_top_cust_reg > 0) {

	        foreach ($results_cumm_top_cust_reg as $results_cumm_top_cust_reg1) {
	            $user_id[] = $results_cumm_top_cust_reg1 ['user_id'];
	        }

	        if(!empty($user_id)) {
	        	$user_ids_imploded = implode(",",$user_id);	
	        }
	        

	        $query_reg_details = "SELECT users.ID as cust_id,
	                                users.user_email as email,
	                                GROUP_CONCAT(usermeta.meta_key
	                                             ORDER BY usermeta.umeta_id DESC SEPARATOR '###' ) AS meta_key,
	                                GROUP_CONCAT(usermeta.meta_value
	                                             ORDER BY usermeta.umeta_id DESC SEPARATOR '###' ) AS meta_value
	                              FROM $wpdb->users as users
	                                    JOIN $wpdb->usermeta as usermeta ON (users.ID = usermeta.user_id)
	                              WHERE users.ID IN ($user_ids_imploded)
	                                    AND usermeta.meta_key IN ('first_name','last_name')
	                              GROUP BY users.ID
	                              ORDER BY FIND_IN_SET('users.ID','$user_ids_imploded')";
	        $results_reg_details =  $wpdb->get_results ( $query_reg_details, 'ARRAY_A' );

	        for ($i=sizeof($results_cumm_top_cust), $j=0; $j<sizeof($results_reg_details); $i++, $j++) {

	            $results_cumm_top_cust[$i] = array();

	            $reg_meta_values = explode('###', $results_reg_details [$j]['meta_value']);
	            $reg_meta_key = explode('###', $results_reg_details [$j]['meta_key']);
	            if (count($reg_meta_values) != count($reg_meta_key))
	                continue;
	            unset($results_reg_details [$j]['meta_value']);
	            unset($results_reg_details [$j]['meta_key']);
	            $reg_meta_key_values = array_combine($reg_meta_key, $reg_meta_values);

	            $results_cumm_top_cust [$i]['total'] = $sr_currency_symbol . sr_number_format($results_cumm_top_cust_reg[$j]['total'],$sr_decimal_places);
	            $results_cumm_top_cust [$i]['calc_total'] = floatval($results_cumm_top_cust_reg[$j]['total']); // value used only for sorting purpose
	            $results_cumm_top_cust [$i]['name'] = $reg_meta_key_values['first_name'] . " " . $reg_meta_key_values['last_name'];
	            $results_cumm_top_cust [$i]['billing_email'] = $results_reg_details [$j]['email'];
	            $results_cumm_top_cust [$i]['post_ids'] = json_encode($results_cumm_top_cust_reg [$j]['post_id']);
	        }

	    }

	    if(!empty($results_cumm_top_cust)) {
	        usort($results_cumm_top_cust, 'usort_callback');
	        $results_cumm_top_cust = array_slice($results_cumm_top_cust, 0, 5);    
	    }
	    else {
	        $results_cumm_top_cust = "";
	    }

	    //Top 5 Products

	    //Query to get the Top 5 Products

	    $query_top_prod      		= "SELECT order_item.product_id as product_id,
	                                    order_item.product_name as product_name,
	                                    SUM( order_item.sales ) AS product_sales ,
	                                    SUM( order_item.quantity ) AS product_qty
	                                    FROM `{$wpdb->prefix}sr_woo_order_items` AS order_item
	                                        LEFT JOIN {$wpdb->prefix}posts AS posts ON ( posts.ID = order_item.order_id )
	                                    WHERE posts.post_date BETWEEN '$start_date' AND '$end_date_query'
	                                        AND posts.id IN ($terms_post)
	                                    GROUP BY order_item.product_id
	                                    ORDER BY product_sales DESC
	                                    LIMIT 5";
	    $results_top_prod    		= $wpdb->get_results ( $query_top_prod, 'ARRAY_A' );
	    $rows_top_prod   		  	= $wpdb->num_rows;

	    if($rows_top_prod > 0) {
	        foreach (array_keys($results_top_prod) as $results_top_prod1) {
	            $top_prod_ids[] = $results_top_prod [$results_top_prod1]['product_id'];
	        
	            if (isset($post['top_prod_option'])) {
                    $results_top_prod [$results_top_prod1]['product_sales_display'] = $sr_currency_symbol . sr_number_format($results_top_prod [$results_top_prod1]['product_sales'],$sr_decimal_places);
	            }

	        }

	        if (!empty($top_prod_ids)) {
	        	$top_prod_ids1 = implode(",", $top_prod_ids);	
	        }
	        

	        //Query to get the Top 5 Products graph related data

	        $query_top_prod_graph   = "SELECT order_item.product_id as product_id,
	                                        SUM( order_item.sales ) AS product_sales,
	                                        SUM( order_item.quantity ) AS product_qty,
	                                        $select
	                                    FROM `{$wpdb->prefix}sr_woo_order_items` AS order_item
	                                        LEFT JOIN {$wpdb->prefix}posts AS posts ON ( posts.ID = order_item.order_id )
	                                    WHERE posts.post_date BETWEEN '$start_date' AND '$end_date_query'
	                                        AND order_item.product_id IN ($top_prod_ids1)
	                                    GROUP BY order_item.product_id,$group_by
	                                    ORDER BY FIND_IN_SET(order_item.product_id,'$top_prod_ids1')";

	        $results_top_prod_graph = $wpdb->get_results ( $query_top_prod_graph, 'ARRAY_A' );
	        $rows_top_prod_graph	= $wpdb->num_rows;

	        if($rows_top_prod_graph > 0) {
	        	foreach ($results_top_prod_graph as $results_top_prod_graph1) {
		            $top_prod_graph_temp [] = $results_top_prod_graph1['product_id'];
		        }



		        for ($i=0, $j=0, $k=0; $i<sizeof($results_top_prod_graph);$i++) {

		            if ($i>0) {

		                if ($results_top_prod_graph [$i]['product_id'] == $prod_id) {
		                    $j++;

		                    $top_prod_graph_data [$k][$j]['product_sales'] = $results_top_prod_graph [$i]['product_sales'];
		                    $top_prod_graph_data [$k][$j]['product_qty'] = $results_top_prod_graph [$i]['product_qty'];
		                    $top_prod_graph_data [$k][$j][$group_by] = $results_top_prod_graph [$i][$group_by];    

		                    if($group_by == "display_date_time") {
		                        $top_prod_graph_data [$k][$j]['display_time'] = $results_top_prod_graph [$i]['display_time'];
		                        $top_prod_graph_data [$k][$j]['comp_time'] = $results_top_prod_graph [$i]['comp_time'];
		                    } 

		                    $prod_id = $results_top_prod_graph [$i]['product_id'];


		                }
		                else {

		                    $k++;
		                    $j=0;
		                    $top_prod_graph_data [$k] = array();

		                    $top_prod_graph_data [$k][$j]['product_sales'] = $results_top_prod_graph [$i]['product_sales'];
		                    $top_prod_graph_data [$k][$j]['product_qty'] = $results_top_prod_graph [$i]['product_qty'];
		                    $top_prod_graph_data [$k][$j][$group_by] = $results_top_prod_graph [$i][$group_by];
		                    if($group_by == "display_date_time") {
		                        $top_prod_graph_data [$k][$j]['display_time'] = $results_top_prod_graph [$i]['display_time'];
		                        $top_prod_graph_data [$k][$j]['comp_time'] = $results_top_prod_graph [$i]['comp_time'];
		                    }

		                    $prod_id = $results_top_prod_graph [$i]['product_id'];
		                }
		            }
		            else {

		                $top_prod_graph_data [$k] = array();
		                $top_prod_graph_data [$k][$j]['product_sales'] = $results_top_prod_graph [$i]['product_sales'];
		                $top_prod_graph_data [$k][$j]['product_qty'] = $results_top_prod_graph [$i]['product_qty'];
		                $top_prod_graph_data [$k][$j][$group_by] = $results_top_prod_graph [$i][$group_by];
		                if($group_by == "display_date_time") {
		                    $top_prod_graph_data [$k][$j]['display_time'] = $results_top_prod_graph [$i]['display_time'];
		                    $top_prod_graph_data [$k][$j]['comp_time'] = $results_top_prod_graph [$i]['comp_time'];
		                }
		                
		                $prod_id = $results_top_prod_graph [$i]['product_id'];
		            }
		        }
	        }
	        

	    }


	    $monthly_sales_temp = $date_series;
	    $max_sales = 0;
	    $total_monthly_sales = 0;
	    $tot_cumm_orders = 0;
	    $tot_cumm_orders_qty = 0;
	    $total_orders = 0;

	    if ($rows_monthly_sales > 0) {
	        foreach ( $results_monthly_sales as $results_monthly_sale ) {
	            if($group_by == "display_date_time") {
	                    $monthly_sales_temp[$results_monthly_sale['comp_time']]['post_date'] = date ("Y-m-d", strtotime($start_date)) .' '. $results_monthly_sale['display_time'];
	                    $monthly_sales_temp[$results_monthly_sale['comp_time']]['sales'] = floatval($results_monthly_sale['todays_sales']); 
	            }
	            else {
	                $monthly_sales_temp[$results_monthly_sale[$group_by]]['sales'] = floatval($results_monthly_sale['todays_sales']); 
	            }

	            if ($max_sales < $results_monthly_sale['todays_sales']) {
	                $max_sales = $results_monthly_sale['todays_sales'];
	            }

	            $total_monthly_sales = $total_monthly_sales + $results_monthly_sale['todays_sales'];
	            $total_orders = $total_orders + $results_monthly_sale['total_orders'];
	        }

	        foreach ( $monthly_sales_temp as $monthly_sales_temp1 ) {
	            $monthly_sales[] = $monthly_sales_temp1;
	        }
	    }

	    //Top 5 Products Graph

	    $cumm_top_prod_graph_data = array();

	    $index = 0;
	    $max_values = array();

	    if(!empty($top_prod_graph_data)) {
	        foreach ( $top_prod_graph_data as $results_top_prod_graph1 ) {
	            $cumm_top_prod_graph_data[$index] = array();
	            $temp = array();
	            $cumm_date = $date_series;

	            $max=0;

	            for ( $j=0;$j<sizeof($results_top_prod_graph1);$j++ ) {

	                if($group_by == "display_date_time") {
	                    $cumm_date[$results_top_prod_graph1[$j]['comp_time']]['post_date'] = date ("Y-m-d", strtotime($start_date)) .' '. $results_top_prod_graph1[$j]['display_time'];
	                }


	                if (isset($post['top_prod_option'])) {
	                    if ($post['top_prod_option'] == 'sr_opt_top_prod_price') {

	                        if($results_top_prod_graph1[$j]['product_sales'] > $max) {
	                            $max = floatval($results_top_prod_graph1[$j]['product_sales']);
	                        }

	                        if($group_by == "display_date_time") {
	                            $cumm_date[$results_top_prod_graph1[$j]['comp_time']]['sales'] = floatval($results_top_prod_graph1[$j]['product_sales']);
	                        }
	                        else {
	                            $cumm_date[$results_top_prod_graph1[$j][$group_by]]['sales'] = floatval($results_top_prod_graph1[$j]['product_sales']);    
	                        }
	                        
	                    }
	                    else if($post['top_prod_option'] == 'sr_opt_top_prod_qty') {
	                        
	                        if($results_top_prod_graph1[$j]['product_qty'] > $max) {
	                            $max = intval($results_top_prod_graph1[$j]['product_qty']);
	                        }

	                        if($group_by == "display_date_time") {
	                            $cumm_date[$results_top_prod_graph1[$j]['comp_time']]['sales'] = intval($results_top_prod_graph1[$j]['product_qty']);
	                        }
	                        else {
	                            $cumm_date[$results_top_prod_graph1[$j][$group_by]]['sales'] = intval($results_top_prod_graph1[$j]['product_qty']);
	                        }
	                        
	                    }
	                }
	                else {



	                    if($results_top_prod_graph1[$j]['product_sales'] > $max) {
	                        $max = floatval($results_top_prod_graph1[$j]['product_sales']);
	                    }

	                    $cumm_date[$results_top_prod_graph1[$j][$group_by]]['sales'] = floatval($results_top_prod_graph1[$j]['product_sales']);
	                }

	                $product_sales_display = $results_top_prod_graph1[$j]['product_sales'];

	            }

	            foreach ($cumm_date as $cumm_date1) {
	                $temp [] = $cumm_date1;
	            }



	            if (isset($post['option'])) { // Condition to handle the change of graph on option select
	                $cumm_top_prod_graph_data[$index]['graph_data'] = $temp;
	                $cumm_top_prod_graph_data[$index]['max_value'] = $max;
	            }
	            else {
	                $results_top_prod[$index]['graph_data'] = $temp;    
	                $results_top_prod[$index]['max_value'] = $max;
	            }
	            $index++;
	        }    
	    }

	    //Query for Avg. Items Per Customer

	    $query_cumm_reg_cust_count 	="SELECT COUNT(DISTINCT postmeta.meta_value) AS cust_orders
		                                FROM {$wpdb->prefix}postmeta AS postmeta
		                                    JOIN {$wpdb->prefix}posts AS posts ON (posts.ID = postmeta.post_id)
		                                WHERE postmeta.meta_key IN ('_customer_user')
		                                    AND postmeta.meta_value > 0
		                                    AND posts.post_date BETWEEN '$start_date' AND '$end_date_query'
		                                    AND posts.id IN ($terms_post)
		                                GROUP BY postmeta.meta_value";

	    $results_cumm_reg_cust_count = $wpdb->get_col ( $query_cumm_reg_cust_count );
	    $rows_cumm_reg_cust_count	 = $wpdb->num_rows;

	    if($rows_cumm_reg_cust_count > 0) {
	        $reg_cust_count = $results_cumm_reg_cust_count[0];
	    }
	    else {
	        $reg_cust_count = 0;
	    }


	    $query_cumm_guest_cust_count 	="SELECT COUNT(DISTINCT postmeta1.meta_value) AS cust_orders
		                                    FROM {$wpdb->prefix}postmeta AS postmeta1
		                                        JOIN {$wpdb->prefix}posts AS posts ON (posts.ID = postmeta1.post_id)
		                                        INNER JOIN {$wpdb->prefix}postmeta AS postmeta2 
		                                            ON (postmeta2.post_ID = postmeta1.post_ID AND postmeta2.meta_key IN ('_customer_user'))
		                                    WHERE postmeta1.meta_key IN ('_billing_email')
		                                        AND postmeta2.meta_value = 0
		                                        AND posts.post_date BETWEEN '$start_date' AND '$end_date_query'
		                                        AND posts.id IN ($terms_post)
		                                    GROUP BY postmeta1.meta_value";

	    $results_cumm_guest_cust_count 	=  $wpdb->get_col ( $query_cumm_guest_cust_count );
	    $rows_cumm_guest_cust_count	 	= $wpdb->num_rows;

	    if($rows_cumm_guest_cust_count > 0) {
	        $guest_cust_count = $results_cumm_guest_cust_count[0];
	    }
	    else {
	        $guest_cust_count = 0;
	    }

	    $total_cumm_cust_count = $reg_cust_count + $guest_cust_count;


	    //Query for Avg. Order Total and Avg. Order Items

	    $query_cumm_avg_order_tot_items      = "SELECT COUNT(DISTINCT order_item.order_id) as no_orders,
				                                    SUM( order_item.quantity ) AS cumm_quantity
			                                    FROM `{$wpdb->prefix}sr_woo_order_items` AS order_item
			                                        LEFT JOIN {$wpdb->prefix}posts AS posts ON ( posts.ID = order_item.order_id )
			                                    WHERE posts.post_date BETWEEN '$start_date' AND '$end_date_query'
			                                    	AND posts.ID IN ($terms_post)";
	    $results_cumm_avg_order_tot_items    = $wpdb->get_results ( $query_cumm_avg_order_tot_items, 'ARRAY_A' );
	    $rows_cumm_avg_order_tot_items 	     = $wpdb->num_rows;

	    if ($rows_cumm_avg_order_tot_items > 0) {
			$tot_cumm_orders 	 = $results_cumm_avg_order_tot_items [0]['no_orders'];
			$tot_cumm_orders_qty = $results_cumm_avg_order_tot_items [0]['cumm_quantity'];	    	
	    }
	    else {
	    	$tot_cumm_orders 	 = 0;
			$tot_cumm_orders_qty = 0;
	    }

	    //Total Discount Sales Widget 

	    $query_cumm_discount_sales = "SELECT SUM( postmeta.meta_value ) AS discount_sales,
	    						$select
		                        FROM `{$wpdb->prefix}postmeta` AS postmeta
		                        LEFT JOIN {$wpdb->prefix}posts AS posts ON ( posts.ID = postmeta.post_id )
		                        WHERE postmeta.meta_key IN ('_order_discount','_cart_discount')
		                            AND posts.post_date BETWEEN '$start_date' AND '$end_date_query'
		                            AND posts.ID IN ($terms_post)
	                            GROUP BY $group_by";
        $results_cumm_discount_sales    = $wpdb->get_results ( $query_cumm_discount_sales, 'ARRAY_A' );
	    $rows_cumm_discount_sales 	  =  $wpdb->num_rows;



	    $cumm_discount_sales_temp = $date_series;
	    $cumm_discount_sales = array();
	    $max_discount_total = 0;
	    $total_discount_sales = 0;

	    if ($rows_cumm_discount_sales > 0) {
	        foreach ( $results_cumm_discount_sales as $results_cumm_discount_sale ) {
	            if($group_by == "display_date_time") {
	                    $cumm_discount_sales_temp[$results_cumm_discount_sale['comp_time']]['post_date'] = date ("Y-m-d", strtotime($start_date)) .' '. $results_cumm_discount_sale['display_time'];
	                    $cumm_discount_sales_temp[$results_cumm_discount_sale['comp_time']]['sales'] = floatval($results_cumm_discount_sale['discount_sales']); 
	            }
	            else {
	                $cumm_discount_sales_temp[$results_cumm_discount_sale[$group_by]]['sales'] = floatval($results_cumm_discount_sale['discount_sales']); 
	            }

	            if ($max_discount_total < $results_cumm_discount_sale['discount_sales']) {
	                $max_discount_total = $results_cumm_discount_sale['discount_sales'];
	            }

	            $total_discount_sales = $total_discount_sales + $results_cumm_discount_sale['discount_sales'];
	        }

	        foreach ( $cumm_discount_sales_temp as $cumm_discount_sales_temp1 ) {
	            $cumm_discount_sales[] = $cumm_discount_sales_temp1;
	        }
	    }


	    //Top Coupons Widget

	    $query_cumm_coupon_count = "SELECT COUNT( order_items.order_item_name ) AS coupon_count,
	    							SUM(order_itemmeta.meta_value) AS coupon_amount,
	    							order_items.order_item_name AS coupon_name,
	    							GROUP_CONCAT(DISTINCT order_items.order_id
	                                                             ORDER BY order_items.order_item_id DESC SEPARATOR ',' ) AS order_ids
		                        FROM `{$wpdb->prefix}posts` AS posts
		                        	JOIN {$wpdb->prefix}woocommerce_order_items as order_items ON ( posts.ID = order_items.order_id )
		                        	JOIN {$wpdb->prefix}woocommerce_order_itemmeta as order_itemmeta 
		                        		ON (order_items.order_item_id = order_itemmeta.order_item_id 
		                        				AND order_itemmeta.meta_key IN ('discount_amount') )
		                        WHERE posts.post_date BETWEEN '$start_date' AND '$end_date_query'
		                            AND posts.ID IN ($terms_post)
		                            AND order_items.order_item_type IN ('coupon')
	                            GROUP BY order_items.order_item_name
	                            ORDER BY coupon_count DESC, coupon_amount DESC
	                            LIMIT 5";

        $results_cumm_coupon_count    = $wpdb->get_results ( $query_cumm_coupon_count, 'ARRAY_A' );
	    $rows_cumm_coupon_count	  =  $wpdb->num_rows;

	    foreach ($results_cumm_coupon_count as &$results_cumm_coupon_count1) {
	    	$results_cumm_coupon_count1['coupon_amount'] = $sr_currency_symbol . sr_number_format($results_cumm_coupon_count1['coupon_amount'],$sr_decimal_places);
	    	$results_cumm_coupon_count1['coupon_count'] = sr_number_format($results_cumm_coupon_count1['coupon_count'],$sr_decimal_places);
	    }

	    // % Orders Containing Coupons

	    $sr_per_order_containing_coupons = 0;

	    $query_cumm_orders_coupon_count 	= "SELECT COUNT( posts.ID ) AS total_coupon_orders
		    									FROM `{$wpdb->prefix}posts` AS posts
			                        				JOIN {$wpdb->prefix}woocommerce_order_items as order_items ON ( posts.ID = order_items.order_id )
			                        			WHERE posts.post_date BETWEEN '$start_date' AND '$end_date_query'
						                            AND posts.ID IN ($terms_post)
					                            	AND order_items.order_item_type IN ('coupon')";
		$results_cumm_orders_coupon_count 	= $wpdb->get_col ( $query_cumm_orders_coupon_count );
	    $rows_cumm_orders_coupon_count	  	= $wpdb->num_rows;		

	    if ($rows_cumm_orders_coupon_count > 0 && $total_orders > 0) {
	    	$sr_per_order_containing_coupons = ($results_cumm_orders_coupon_count[0] / $total_orders) * 100 ;	
	    }


	    //Orders By Payment Gateways

	    $query_top_payment_gateway = "SELECT postmeta1.meta_value AS payment_method,
		    							SUM(postmeta2.meta_value) AS sales_total,
		    							COUNT(posts.ID) AS sales_count,
		    							GROUP_CONCAT(posts.ID ORDER BY posts.ID DESC SEPARATOR ',' ) AS order_ids
				                        FROM {$wpdb->prefix}posts AS posts 
				                        LEFT JOIN `{$wpdb->prefix}postmeta` AS postmeta1 ON ( posts.ID = postmeta1.post_id )
				                        LEFT JOIN `{$wpdb->prefix}postmeta` AS postmeta2 ON ( posts.ID = postmeta2.post_id )
				                        WHERE postmeta1.meta_key IN ('_payment_method')
				                        	AND postmeta2.meta_key IN ('_order_total')
				                            AND posts.post_date BETWEEN '$start_date' AND '$end_date_query'
				                            AND posts.ID IN ($terms_post)
			                            GROUP BY payment_method
			                            ORDER BY sales_total DESC
			                            LIMIT 5";
        $results_top_payment_gateway  = $wpdb->get_results ( $query_top_payment_gateway, 'ARRAY_A' );
	    $rows_top_payment_gateway 	  =  $wpdb->num_rows;

	    if ($rows_top_payment_gateway > 0) {
	    	foreach ($results_top_payment_gateway as &$results_top_payment_gateway1) {
	            $top_payment_gateway[] = $results_top_payment_gateway1 ['payment_method'];
	        
	            if (isset($post['top_prod_option'])) {
                    $results_top_payment_gateway1 ['gateway_sales_display'] = $sr_currency_symbol . sr_number_format($results_top_payment_gateway1 ['sales_total'],$sr_decimal_places);
                    $results_top_payment_gateway1 ['gateway_sales_percent'] = sr_number_format((($results_top_payment_gateway1 ['sales_total'] / $total_monthly_sales) * 100),$sr_decimal_places) . '%';
	            }

	        }

	        if (!empty($top_payment_gateway)) {
	        	$top_payment_gateway_imploded = "'".implode("','", $top_payment_gateway)."'";
	        }
	    }

        //Query to get the Top 5 Products graph related data

        $query_top_gateways_graph   = "SELECT postmeta1.meta_value AS payment_method,
	    							SUM(postmeta2.meta_value) AS sales_total,
	    							COUNT(posts.ID) AS sales_count,
	    							$select
			                        FROM {$wpdb->prefix}posts AS posts 
			                        LEFT JOIN `{$wpdb->prefix}postmeta` AS postmeta1 ON ( posts.ID = postmeta1.post_id )
			                        LEFT JOIN `{$wpdb->prefix}postmeta` AS postmeta2 ON ( posts.ID = postmeta2.post_id )
			                        WHERE postmeta1.meta_key IN ('_payment_method')
			                        	AND postmeta2.meta_key IN ('_order_total')
			                            AND posts.post_date BETWEEN '$start_date' AND '$end_date_query'
			                            AND posts.ID IN ($terms_post)
			                            AND postmeta1.meta_value IN ($top_payment_gateway_imploded)
		                            GROUP BY payment_method, $group_by
		                            ORDER BY FIND_IN_SET(postmeta1.meta_value,'".implode(",",$top_payment_gateway)."')";

        $results_top_gateways_graph = $wpdb->get_results ( $query_top_gateways_graph, 'ARRAY_A' );
        $rows_top_gateways_graph	= $wpdb->num_rows;

	    $cumm_payment_gateway_temp = $date_series;
	    $cumm_payment_gateway_sales = array();

		if($rows_top_gateways_graph > 0) {

	        for ($i=0, $j=0, $k=0; $i<sizeof($results_top_gateways_graph);$i++) {

	            if ($i>0) {

	                if ($results_top_gateways_graph [$i]['payment_method'] == $payment_method) {
	                    $j++;

	                    $top_gateway_graph_data [$k][$j]['gateway_sales_amt'] = $results_top_gateways_graph [$i]['sales_total'];
	                    $top_gateway_graph_data [$k][$j]['gateway_sales_count'] = $results_top_gateways_graph [$i]['sales_count'];
	                    $top_gateway_graph_data [$k][$j][$group_by] = $results_top_gateways_graph [$i][$group_by];    

	                    if($group_by == "display_date_time") {
	                        $top_gateway_graph_data [$k][$j]['display_time'] = $results_top_gateways_graph [$i]['display_time'];
	                        $top_gateway_graph_data [$k][$j]['comp_time'] = $results_top_gateways_graph [$i]['comp_time'];
	                    } 

	                    $payment_method = $results_top_gateways_graph [$i]['payment_method'];


	                }
	                else {

	                    $k++;
	                    $j=0;
	                    $top_gateway_graph_data [$k] = array();

	                    $top_gateway_graph_data [$k][$j]['gateway_sales_amt'] = $results_top_gateways_graph [$i]['sales_total'];
	                    $top_gateway_graph_data [$k][$j]['gateway_sales_count'] = $results_top_gateways_graph [$i]['sales_count'];
	                    $top_gateway_graph_data [$k][$j][$group_by] = $results_top_gateways_graph [$i][$group_by];
	                    if($group_by == "display_date_time") {
	                        $top_gateway_graph_data [$k][$j]['display_time'] = $results_top_gateways_graph [$i]['display_time'];
	                        $top_gateway_graph_data [$k][$j]['comp_time'] = $results_top_gateways_graph [$i]['comp_time'];
	                    }

	                    $payment_method = $results_top_gateways_graph [$i]['payment_method'];
	                }
	            }
	            else {

	                $top_gateway_graph_data [$k] = array();
	                $top_gateway_graph_data [$k][$j]['gateway_sales_amt'] = $results_top_gateways_graph [$i]['sales_total'];
	                $top_gateway_graph_data [$k][$j]['gateway_sales_count'] = $results_top_gateways_graph [$i]['sales_count'];
	                $top_gateway_graph_data [$k][$j][$group_by] = $results_top_gateways_graph [$i][$group_by];
	                if($group_by == "display_date_time") {
	                    $top_gateway_graph_data [$k][$j]['display_time'] = $results_top_gateways_graph [$i]['display_time'];
	                    $top_gateway_graph_data [$k][$j]['comp_time'] = $results_top_gateways_graph [$i]['comp_time'];
	                }
	                
	                $payment_method = $results_top_gateways_graph [$i]['payment_method'];
	            }
	        }
        }

        //Query to get the Payment Gateway Title

        $query_gateway_title = "SELECT DISTINCT postmeta1.meta_value as gateway_title,
        							postmeta2.meta_value as gateway_method
	    						FROM `{$wpdb->prefix}postmeta` AS postmeta1
	    							JOIN `{$wpdb->prefix}postmeta` AS postmeta2 ON ( postmeta1.post_id = postmeta2.post_id )
    							WHERE postmeta1.meta_key IN ('_payment_method_title')
    								AND postmeta2.meta_key IN ('_payment_method')
    								AND postmeta2.meta_value IN ($top_payment_gateway_imploded)
    							ORDER BY FIND_IN_SET(postmeta1.meta_value,'".implode(",",$top_payment_gateway)."')";
    	$result_gateway_title = $wpdb->get_results ( $query_gateway_title, 'ARRAY_A' );

    	$gateway_title = array();

    	foreach($result_gateway_title as $result_gateway_title1) {
    		$gateway_title[$result_gateway_title1['gateway_method']] = $result_gateway_title1['gateway_title'];
    	}

        //Top 5 Products Graph

	    $cumm_top_gateway_graph_data = array();

	    $index = 0;
	    $max_values = array();

	    if(!empty($top_gateway_graph_data)) {
	        foreach ( $top_gateway_graph_data as $top_gateway_graph_data1 ) {
	            $cumm_top_gateway_amt_graph_data[$index] = array();
	            $temp_gateway_sales_amt = array();
	            $temp_gateway_sales_count = array();
	            $cumm_date_amt = $date_series;
	            $cumm_date_count = $date_series;

	            $max_amt=0;
	            $max_count=0;

	            for ( $j=0;$j<sizeof($top_gateway_graph_data1);$j++ ) {

	                if($group_by == "display_date_time") {
	                    $cumm_date_amt[$top_gateway_graph_data1[$j]['comp_time']]['post_date'] = date ("Y-m-d", strtotime($start_date)) .' '. $top_gateway_graph_data1[$j]['display_time'];
	                    $cumm_date_count[$top_gateway_graph_data1[$j]['comp_time']]['post_date'] = date ("Y-m-d", strtotime($start_date)) .' '. $top_gateway_graph_data1[$j]['display_time'];

	                    $cumm_date_amt[$top_gateway_graph_data1[$j]['comp_time']]['sales'] = floatval($top_gateway_graph_data1[$j]['gateway_sales_amt']);
	                	$cumm_date_count[$top_gateway_graph_data1[$j]['comp_time']]['sales'] = floatval($top_gateway_graph_data1[$j]['gateway_sales_count']);
	                }
	                else {
	                	$cumm_date_amt[$top_gateway_graph_data1[$j][$group_by]]['sales'] = floatval($top_gateway_graph_data1[$j]['gateway_sales_amt']);
	                	$cumm_date_count[$top_gateway_graph_data1[$j][$group_by]]['sales'] = floatval($top_gateway_graph_data1[$j]['gateway_sales_count']);
	                }

	                //Payment Gateways Sales Amt

                    if($top_gateway_graph_data1[$j]['gateway_sales_amt'] > $max_amt) {
                        $max_amt = floatval($top_gateway_graph_data1[$j]['gateway_sales_amt']);
                    }

                   //Payment Gateways Sales Count

                    if($top_gateway_graph_data1[$j]['gateway_sales_count'] > $max_count) {
                        $max_count = floatval($top_gateway_graph_data1[$j]['gateway_sales_count']);
                    }

	            }

	            foreach ($cumm_date_amt as $cumm_date_amt1) {
	                $temp_gateway_sales_amt [] = $cumm_date_amt1;
	            }

	            foreach ($cumm_date_count as $cumm_date_count1) {
	                $temp_gateway_sales_count [] = $cumm_date_count1;
	            }

                $results_top_payment_gateway[$index]['graph_data_sales_amt'] = $temp_gateway_sales_amt;    
                $results_top_payment_gateway[$index]['max_value_sales_amt'] = $max_amt;

                $results_top_payment_gateway[$index]['graph_data_sales_count'] = $temp_gateway_sales_count;    
                $results_top_payment_gateway[$index]['max_value_sales_count'] = $max_count;

                $results_top_payment_gateway[$index]['payment_method'] = $gateway_title[$results_top_payment_gateway[$index]['payment_method']];

	            $index++;
	        }    
	    }
	    

	    //Query for getting the cumm taxes

	    $query_cumm_taxes = "SELECT GROUP_CONCAT(postmeta.meta_key order by postmeta.meta_id SEPARATOR '###') AS prod_othermeta_key,
									GROUP_CONCAT(postmeta.meta_value order by postmeta.meta_id SEPARATOR '###') AS prod_othermeta_value
		                        FROM `{$wpdb->prefix}postmeta` AS postmeta
		                        LEFT JOIN {$wpdb->prefix}posts AS posts ON ( posts.ID = postmeta.post_id )
		                        WHERE postmeta.meta_key IN ('_order_total','_order_shipping','_order_shipping_tax','_order_tax')
		                            AND posts.post_date BETWEEN '$start_date' AND '$end_date_query'
		                            AND posts.ID IN ($terms_post)
		                        GROUP BY posts.ID";
        $results_cumm_taxes    = $wpdb->get_results ( $query_cumm_taxes, 'ARRAY_A' );
	    $rows_cumm_taxes 	  =  $wpdb->num_rows;

	    if ($rows_cumm_taxes > 0) {

	    	$tax = 0;
	    	$shipping_tax = 0;
	    	$shipping = 0;
	    	$order_total = 0;

	    	foreach($results_cumm_taxes as $results_cumm_tax) {
	    		$prod_meta_values = explode('###', $results_cumm_tax['prod_othermeta_value']);
                $prod_meta_key = explode('###', $results_cumm_tax['prod_othermeta_key']);

                if (count($prod_meta_values) != count($prod_meta_key))
                    continue;
                
                $prod_meta_key_values = array_combine($prod_meta_key, $prod_meta_values);

                $tax = $tax + $prod_meta_key_values['_order_tax'];
                $shipping_tax = $shipping_tax + $prod_meta_key_values['_order_shipping_tax'];
                $shipping = $shipping + $prod_meta_key_values['_order_shipping'];
                $order_total = $order_total + $prod_meta_key_values['_order_total'];

	    	}

	    	$tax_data['tax'] = $tax;
	    	$tax_data['shipping_tax'] = $shipping_tax;
	    	$tax_data['shipping'] = $shipping;
	    	$tax_data['net_sales'] = $order_total - ($tax + $shipping_tax + $shipping);
	    	$tax_data['total_sales'] = $order_total;
	    }




	    //Query to get Top Abandoned Products

	    $current_time = current_time('timestamp');
		$cut_off_time = (get_option('sr_abandoned_cutoff_time')) ? get_option('sr_abandoned_cutoff_time') : 0;
		$cart_cut_off_time = $cut_off_time * 60;
		$compare_time = $current_time - $cart_cut_off_time;

		//Query to update the abandoned product status
	    $query_abandoned_status = "UPDATE {$wpdb->prefix}sr_woo_abandoned_items
	    							SET product_abandoned = 1
	    							WHERE order_id IS NULL
	    								AND abandoned_cart_time < ". $compare_time;

		$wpdb->query ( $query_abandoned_status );

		//Query to get the Top Abandoned Products

		$query_top_abandoned_products = "SELECT SUM(quantity) as abondoned_qty,
											GROUP_CONCAT(quantity order by id SEPARATOR '###') AS abandoned_quantity,
											product_id as id,
											$select_top_abandoned_prod
										FROM {$wpdb->prefix}sr_woo_abandoned_items
										WHERE order_id IS NULL                            
											AND product_abandoned = 1
											AND abandoned_cart_time BETWEEN '".strtotime($start_date)."' AND '". strtotime($end_date_query)."'
										GROUP BY product_id
										ORDER BY abondoned_qty DESC
										LIMIT 5";

		$results_top_abandoned_products    = $wpdb->get_results ( $query_top_abandoned_products, 'ARRAY_A' );
	    $rows_top_abandoned_products 	  =  $wpdb->num_rows;


	    if ($rows_top_abandoned_products > 0) {

	    	$prod_id = array();

			foreach ($results_top_abandoned_products as $results_top_abandoned_product) {
				$prod_id[] = $results_top_abandoned_product['id'];
			}	    	

			$prod_id = implode(",", $prod_id);

			$query_prod_abandoned_rate = "SELECT SUM(quantity) as abondoned_rate
											FROM {$wpdb->prefix}sr_woo_abandoned_items
											WHERE product_abandoned = 1
												AND abandoned_cart_time BETWEEN '".strtotime($start_date)."' AND '". strtotime($end_date_query)."'
												AND product_id IN (". $prod_id .")
											GROUP BY product_id
											ORDER BY FIND_IN_SET(product_id,'$prod_id') ";

			$results_prod_abandoned_rate    = $wpdb->get_col ( $query_prod_abandoned_rate );
		    $rows_prod_abandoned_rate 	  =  $wpdb->num_rows;

		    $j = 0;

		    $total_prod_abandoned_qty = 0;
		    $total_prod_qty = 0;


		    //Query to get the variation Attributes in a formatted manner

		    $query_attributes = "SELECT post_id,
		    							GROUP_CONCAT(meta_key order by meta_id SEPARATOR '###') AS meta_key,
		    							GROUP_CONCAT(meta_value order by meta_id SEPARATOR '###') AS meta_value
				    			FROM {$wpdb->prefix}postmeta
				    			WHERE meta_key like 'attribute_%'
				    				AND post_id IN ($prod_id)
				    			GROUP BY post_id";
		   	$results_attributes    = $wpdb->get_results ( $query_attributes, 'ARRAY_A' );
		    $rows_attributes 	  =  $wpdb->num_rows; 

		    $variation_attributes = array();

		    foreach ($results_attributes as $results_attribute) {
		    	$meta_key = explode('###', $results_attribute['meta_key']);
                $meta_value = explode('###', $results_attribute['meta_value']);

                if (count($meta_key) != count($meta_value))
                    continue;

                $variation_attributes[$results_attribute['post_id']] = woocommerce_get_formatted_variation( array_combine($meta_key,$meta_value), true );
                
		    }


	    	foreach ($results_top_abandoned_products as &$results_top_abandoned_product) {
	    		$abandoned_quantity = explode('###', $results_top_abandoned_product['abandoned_quantity']);
                $abandoned_dates = explode('###', $results_top_abandoned_product['abandoned_dates']);

                if ($group_by == "display_date_time") {
					$abandoned_dates_comp = explode('###', $results_top_abandoned_product['comp_time']);                	
                }

                if (count($abandoned_quantity) != count($abandoned_dates))
                    continue;

                unset($results_top_abandoned_product['abandoned_quantity']);
                unset($results_top_abandoned_product['abandoned_dates']);

                if ($group_by == "display_date_time") {
                	unset($results_top_abandoned_product['comp_time']);
                }

                $abandoned_date_series = $date_series;

                if ($group_by == "display_date_time") {

                	for ($i=0; $i<sizeof($abandoned_dates_comp); $i++) {
                		$abandoned_date_series[$abandoned_dates_comp[$i]]['post_date'] = $abandoned_dates[$i];
						$abandoned_date_series[$abandoned_dates_comp[$i]]['sales'] = $abandoned_date_series[$abandoned_dates_comp[$i]]['sales'] + $abandoned_quantity[$i];
	                }

                } else {
                	for ($i=0; $i<sizeof($abandoned_dates); $i++) {
						$abandoned_date_series[$abandoned_dates[$i]]['sales'] = $abandoned_date_series[$abandoned_dates[$i]]['sales'] + $abandoned_quantity[$i];
	                }	
                }

                $results_top_abandoned_product ['graph_data'] = array();

                foreach ($abandoned_date_series as $abandoned_date_series1) {
                	$results_top_abandoned_product['graph_data'][] = $abandoned_date_series1;
                }

                $results_top_abandoned_product['price'] = get_post_meta($results_top_abandoned_product['id'],'_price',true) * $results_top_abandoned_product['abondoned_qty'];

                $results_top_abandoned_product['abondoned_qty'] = floatval($results_top_abandoned_product['abondoned_qty']);

                $abandoned_rate = ($results_top_abandoned_product['abondoned_qty']/$results_prod_abandoned_rate[$j])*100;

                $results_top_abandoned_product['abandoned_rate'] = round($abandoned_rate,get_option( 'woocommerce_price_num_decimals' )) . "%";

                //Code for formatting the product name


                $post_parent = wp_get_post_parent_id($results_top_abandoned_product['id']);

                if ($post_parent  > 0) {
                	$results_top_abandoned_product ['prod_name'] = get_the_title($post_parent) . " (". $variation_attributes[$results_top_abandoned_product['id']] .")";

                } else {
                	$results_top_abandoned_product ['prod_name'] = get_the_title($results_top_abandoned_product['id']);
                }

                $total_prod_abandoned_qty = $total_prod_abandoned_qty + $results_top_abandoned_product['abondoned_qty'];
                $total_prod_qty = $total_prod_qty + $results_prod_abandoned_rate[$j];

                $j++; 

	    	}

	    }

	    $query_min_abandoned_date = "SELECT MIN(abandoned_cart_time) AS min_abandoned_date
	    							FROM {$wpdb->prefix}sr_woo_abandoned_items";
		$results_min_abandoned_date = $wpdb->get_col ( $query_min_abandoned_date );
		$rows_min_abandoned_date   = $wpdb->num_rows;

		$min_abandoned_date = '';

		if ($results_min_abandoned_date[0] != '') {
			$min_abandoned_date = date('Y-m-d',(int)$results_min_abandoned_date[0]);
		}
		
	    //Cumm Cart Abandonment Rate

	    $query_total_cart = "SELECT COUNT(DISTINCT cart_id) as total_cart_count
			    			FROM {$wpdb->prefix}sr_woo_abandoned_items
			    			WHERE abandoned_cart_time >= ".strtotime($start_date)." AND abandoned_cart_time <=". strtotime($end_date_query);
		$total_cart_count    = $wpdb->get_col ( $query_total_cart );
		$rows_total_cart 	 = $wpdb->num_rows; 

		$query_total_abandoned_cart = "SELECT COUNT(DISTINCT cart_id) as total_cart_abandoned_count
						    			FROM {$wpdb->prefix}sr_woo_abandoned_items
						    			WHERE abandoned_cart_time >= ".strtotime($start_date)." AND abandoned_cart_time <=". strtotime($end_date_query)."
						    				AND product_abandoned = 1
						    				AND order_id IS NULL";
		$total_abandoned_cart_count    = $wpdb->get_col ( $query_total_abandoned_cart );
		$rows_total_abandoned_cart 	 = $wpdb->num_rows; 

	    if ( $rows_total_abandoned_cart > 0) {
	    	$cumm_cart_abandoned_rate = round(($total_abandoned_cart_count[0]/$total_cart_count[0])*100, get_option( 'woocommerce_price_num_decimals' )); 		
	    } else {
	    	$cumm_cart_abandoned_rate = 0;
	    }


	    //Sales Funnel

	    $cumm_sales_funnel = array();

	    //Query to get the total products added to cart

	    if ($rows_total_cart > 0) {
	    	$query_products_added_cart = "SELECT SUM(quantity) as total_prod_added_cart
						    			FROM {$wpdb->prefix}sr_woo_abandoned_items
						    			WHERE abandoned_cart_time BETWEEN '".strtotime($start_date)."' AND '". strtotime($end_date_query)."'";
			$total_products_added_cart  = $wpdb->get_col ( $query_products_added_cart );
			
			$cumm_sales_funnel['total_cart_count'] = floatval($total_cart_count[0]);
			$cumm_sales_funnel['total_products_added_cart'] = floatval($total_products_added_cart[0]);
	    } else {
	    	$cumm_sales_funnel['total_cart_count'] = 0;
	    	$cumm_sales_funnel['total_products_added_cart'] = 0;
	    }
	    

	    //Query to get the placed order ids
	    $query_orders_placed = "SELECT DISTINCT id as completed_order_ids
	    							FROM {$wpdb->prefix}posts AS posts
	                                JOIN {$wpdb->prefix}term_relationships AS term_relationships 
	                                                            ON term_relationships.object_id = posts.ID 
	                                            JOIN {$wpdb->prefix}term_taxonomy AS term_taxonomy 
	                                                            ON term_taxonomy.term_taxonomy_id = term_relationships.term_taxonomy_id 
	                                            JOIN {$wpdb->prefix}terms AS terms 
	                                                            ON term_taxonomy.term_id = terms.term_id
		                            WHERE posts.post_status IN ('publish')
		                                AND posts.post_type IN ('shop_order')
		                                AND (posts.post_date BETWEEN '$start_date' AND '$end_date_query')";
	                  
	    $results_orders_placed = $wpdb->get_col($query_orders_placed);
	    $rows_orders_placed =  $wpdb->num_rows;	    

	    if ($rows_orders_placed > 0) {
	    	
	    	$cumm_sales_funnel['orders_placed_count'] = floatval(sizeof($results_orders_placed));

	    	//Query to get the count of the products purchased
	    	
	    	$query_products_purchased = "SELECT SUM(quantity) as query_products_sold
	    							FROM {$wpdb->prefix}sr_woo_order_items
	    							WHERE order_id IN (". implode(",",$results_orders_placed) .")";
			$results_products_purchased = $wpdb->get_col($query_products_purchased);
	    	$rows_products_purchased =  $wpdb->num_rows;

	    	$cumm_sales_funnel['products_purchased_count'] = floatval($results_products_purchased[0]);

	    } else {
			$cumm_sales_funnel['orders_placed_count'] = 0;
			$cumm_sales_funnel['products_purchased_count'] = 0;
	    }


	    //Query to get the completed order ids
	    $query_orders_completed = "SELECT DISTINCT id as completed_order_ids
	    							FROM {$wpdb->prefix}posts AS posts
	                                JOIN {$wpdb->prefix}term_relationships AS term_relationships 
	                                                            ON term_relationships.object_id = posts.ID 
	                                            JOIN {$wpdb->prefix}term_taxonomy AS term_taxonomy 
	                                                            ON term_taxonomy.term_taxonomy_id = term_relationships.term_taxonomy_id 
	                                            JOIN {$wpdb->prefix}terms AS terms 
	                                                            ON term_taxonomy.term_id = terms.term_id
		                            WHERE terms.name IN ('completed')
		                                AND posts.post_status IN ('publish')
		                                AND posts.post_type IN ('shop_order')
		                                AND (posts.post_date BETWEEN '$start_date' AND '$end_date_query')";
	                  
	    $results_orders_completed = $wpdb->get_col($query_orders_completed);
	    $rows_orders_completed =  $wpdb->num_rows;	    

	    if ($rows_orders_completed > 0) {
	    	
	    	$cumm_sales_funnel['orders_completed_count'] = floatval(sizeof($results_orders_completed));

	    	//Query to get the count of the products sold
	    	
	    	$query_products_sold = "SELECT SUM(quantity) as query_products_sold
	    							FROM {$wpdb->prefix}sr_woo_order_items
	    							WHERE order_id IN (". implode(",",$results_orders_completed) .")";
			$results_products_sold = $wpdb->get_col($query_products_sold);
	    	$rows_products_sold =  $wpdb->num_rows;

	    	$cumm_sales_funnel['products_sold_count'] = floatval($results_products_sold[0]);

	    } else {
			$cumm_sales_funnel['orders_completed_count'] = 0;
			$cumm_sales_funnel['products_sold_count'] = 0;
	    }
	    

	    if (isset($post['option'])) { // Condition to get the data when the Top Products Toggle button is clicked
	        $results [0] = $cumm_top_prod_graph_data;
	    }
	    else {
	        $results [0] = $monthly_sales;
	        $results [1] = $total_monthly_sales;
	        $results [2] = $results_top_prod;
	        $results [3] = $results_cumm_top_cust;

	        if($total_monthly_sales == 0) {
	            $results [4] = floatval(0);             
	        }
	        else {
	            if ($tot_cumm_orders == 0) {
	                $results [] = floatval($total_monthly_sales);       
	            }
	            else {
	                $results [4] = floatval($total_monthly_sales/$tot_cumm_orders);
	            }
	        }

	        if($tot_cumm_orders_qty == 0) {
	            $results [5] = floatval(0);             
	        }
	        else {
	            if ($total_cumm_cust_count == 0) {
	                $results [5] = floatval($tot_cumm_orders_qty);       
	            }
	            else {
	                $results [5] = floatval($tot_cumm_orders_qty/$total_cumm_cust_count);
	            }
	        }

	        $results [6] = floatval($max_sales+100);

	        if($total_discount_sales > 0) {
	        	$results [7] = $cumm_discount_sales;
	        	$results [8] = $total_discount_sales;
	        }
	        else{
	        	$results [7] = '';
	        	$results [8] = '';
	        }
	        
	        $results [9] = $results_cumm_coupon_count;
	        $results [10] = floatval($max_discount_total+100);

	        $results [11] = $sr_per_order_containing_coupons;

	        $results [12] = $results_top_payment_gateway;

	        $results [13] = $tax_data;

	        $results [14] = $results_top_abandoned_products;
	        
	        $results [15] = ($min_abandoned_date != '' && $min_abandoned_date <= $start_date ) ? $cumm_cart_abandoned_rate : '';

	        $results [16] = ($min_abandoned_date != '' && $min_abandoned_date <= $start_date ) ? $cumm_sales_funnel : '';

	    }

	    return $results;
	}

	//Monthly widgets

	function sr_get_sales($start_date,$end_date,$diff_dates,$post) {
	    global $wpdb;



	    $cumm_sales = array();

	    $date_new = date ("Y-m-d", strtotime($start_date));
	    
	    if ($diff_dates > 0 && $diff_dates <= 30) {
	        $date_series[$date_new]['post_date'] = $date_new;
	        $date_series[$date_new]['sales'] = 0;
	        for ($i = 1;$i<=$diff_dates;$i++ ) {
	                $date_new = date ("Y-m-d", strtotime($date_new .' +1 day'));
	                $date_series[$date_new]['post_date'] = $date_new;
	                $date_series[$date_new]['sales'] = 0;
	        }

	        $end_date_query = $end_date;

	        //Dates for handling the proper Rendering of the JQplot graph
	        $min_date_sales = date('Y-m-d', strtotime($start_date .' -2 day'));
	        $max_date_sales = date('Y-m-d', strtotime($end_date_query .' +2 day'));
	        
	    }
	    else if ($diff_dates > 30 && $diff_dates <= 365) {
	        $month = array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
	        $date_mn = "2012-01-01";
	        $date_mn_initial = $date_mn;
	        for ($i = 0;$i<12;$i++ ) {
	            if ($i > 0) {
	                $date_series[$month[$i]]['post_date'] = date('Y-m-d', strtotime($date_mn .' +1 month'));
	                $date_mn = $date_series[$month[$i]]['post_date'];
	            }
	            else {
	                $date_series[$month[$i]]['post_date'] = $date_mn;
	            }
	            
	            $date_series[$month[$i]]['sales'] = 0;
	        }

	        $end_date_query = $end_date;

	        //Dates for handling the proper Rendering of the JQplot graph
	        $min_date_sales = date('Y-m-d', strtotime($date_mn_initial .' -2 month'));
	        $max_date_sales = date('Y-m-d', strtotime($date_mn .' +2 month'));
	    }
	    else if ($diff_dates > 365) {
	        $year_strt = substr($start_date, 0,4);
	        $year_end = substr($end_date, 0,4);

	        $year_tmp[0] = $year_strt;

	        for ($i = 1;$i<=($year_end - $year_strt);$i++ ) {
	             $year_tmp [$i] = $year_tmp [$i-1] + 1;          
	        }

	        for ($i = 0;$i<sizeof($year_tmp);$i++ ) {
	            $date_series[$year_tmp[$i]]['post_date'] = $year_tmp[$i]."-01-01";
	            $date_series[$year_tmp[$i]]['sales'] = 0;
	        }

	        $end_date_query = $end_date;

	        //Dates for handling the proper Rendering of the JQplot graph
	        $min_date_sales = $year_strt - 1 . "-01-01";
	        $max_date_sales = $year_end + 1 . "-01-01";
	    }

	    else {
	        $date_series[0]['post_date'] = date ("Y-m-d", strtotime($start_date)) .' '. "00:00:00";
	        $date_series[0]['sales'] = 0;
	        for ($i = 1;$i<24;$i++ ) {
	            $date_new = date ("Y-m-d H:i:s ", strtotime($date_new .' +1 hours'));
	            $date_series[$i]['post_date'] = $date_new;
	            $date_series[$i]['sales'] = 0; 
	        }

	        $end_date_query = $end_date;
	 
	        $min_date_sales = date ("Y-m-d H:i:s", strtotime($start_date .' -2 hours'));
	        $max_date_sales = date ("Y-m-d", strtotime($start_date .' +1 day')) .' '."01:00:00";

	    }
	    
	    $total_monthly_sales = 0;
	    $tot_cumm_orders = 0;
	    $tot_cumm_orders_qty = 0;

	    //Query to get the relevant order ids
	    $query_terms = "SELECT id FROM {$wpdb->prefix}posts AS posts
	                                JOIN {$wpdb->prefix}term_relationships AS term_relationships 
	                                                            ON term_relationships.object_id = posts.ID 
	                                            JOIN {$wpdb->prefix}term_taxonomy AS term_taxonomy 
	                                                            ON term_taxonomy.term_taxonomy_id = term_relationships.term_taxonomy_id 
	                                            JOIN {$wpdb->prefix}terms AS terms 
	                                                            ON term_taxonomy.term_id = terms.term_id
	                            WHERE terms.name IN ('completed','processing','on-hold','pending')
	                                AND posts.post_status IN ('publish')";
	                  
	    $terms_post = $wpdb->get_col($query_terms);
	    $rows_terms_post =  $wpdb->num_rows;

	    if ($rows_terms_post > 0) {
	    	$terms_post = implode(",",$terms_post);
	    }


	    if ($diff_dates > 0 && $diff_dates <= 30) {
	        $select = "DATE_FORMAT(posts.`post_date`, '%Y-%m-%d') AS display_date";

	        $select_top_prod = "GROUP_CONCAT(order_item.sales order by order_item.order_id SEPARATOR '###') AS sales_details,
	                            GROUP_CONCAT(order_item.quantity order by order_item.order_id SEPARATOR '###') AS quantity_details,
	                            GROUP_CONCAT(DATE_FORMAT(posts.`post_date`, '%Y-%m-%d') by posts.id SEPARATOR '###') AS order_dates";

	        $select_top_abandoned_prod = "GROUP_CONCAT(FROM_UNIXTIME(abandoned_cart_time, '%Y-%m-%d') order by id SEPARATOR '###') AS abandoned_dates";

        	$results =  sr_query_sales($start_date,$end_date_query,$date_series,$select,"display_date",$select_top_prod,$select_top_abandoned_prod,$terms_post,$post);

	    }
	    else if ($diff_dates > 30 && $diff_dates <= 365) {
	        $select = "DATE_FORMAT(MAX(posts.`post_date`), '%Y-%m-%d') AS display_date,
	                    DATE_FORMAT(posts.`post_date`, '%b') AS month_nm";

	        $select_top_prod = "GROUP_CONCAT(order_item.sales order by order_item.order_id SEPARATOR '###') AS sales_details,
	                            GROUP_CONCAT(order_item.quantity order by order_item.order_id SEPARATOR '###') AS quantity_details,
	                            GROUP_CONCAT(DATE_FORMAT(posts.`post_date`, '%b') by posts.id SEPARATOR '###') AS order_dates";

	        $select_top_abandoned_prod = "GROUP_CONCAT(FROM_UNIXTIME(abandoned_cart_time, '%b') order by id SEPARATOR '###') AS abandoned_dates";

        	$results =  sr_query_sales($start_date,$end_date_query,$date_series,$select,"month_nm",$select_top_prod,$select_top_abandoned_prod,$terms_post,$post);
	    }
	    else if ($diff_dates > 365) {
	        $select = "DATE_FORMAT(MAX(posts.`post_date`), '%Y-%m-%d') AS display_date,
	                    DATE_FORMAT(posts.`post_date`, '%Y') AS year_nm";

	        $select_top_prod = "GROUP_CONCAT(order_item.sales order by order_item.order_id SEPARATOR '###') AS sales_details,
	                            GROUP_CONCAT(order_item.quantity order by order_item.order_id SEPARATOR '###') AS quantity_details,
	                            GROUP_CONCAT(DATE_FORMAT(posts.`post_date`, '%Y') by posts.id SEPARATOR '###') AS order_dates";

	        $select_top_abandoned_prod = "GROUP_CONCAT(FROM_UNIXTIME(abandoned_cart_time, '%Y') order by id SEPARATOR '###') AS abandoned_dates";
	        
        	$results =  sr_query_sales($start_date,$end_date_query,$date_series,$select,"year_nm",$select_top_prod,$select_top_abandoned_prod,$terms_post,$post);  
	    }
	    else {
	        $select = "DATE_FORMAT(posts.`post_date`, '%Y/%m/%d') AS display_date_time,
	                    DATE_FORMAT(MAX(posts.`post_date`), '%H:%i:%s') AS display_time,
	                    DATE_FORMAT(posts.`post_date`, '%k') AS comp_time";
	        
	        $select_top_prod = "GROUP_CONCAT(order_item.sales order by order_item.order_id SEPARATOR '###') AS sales_details,
	                            GROUP_CONCAT(order_item.quantity order by order_item.order_id SEPARATOR '###') AS quantity_details,
	                            GROUP_CONCAT(DATE_FORMAT(posts.`post_date`, '%H:%i:%s') by posts.id SEPARATOR '###') AS display_time,
	                            GROUP_CONCAT(DATE_FORMAT(posts.`post_date`, '%k') by posts.id SEPARATOR '###') AS comp_time";

	        $select_top_abandoned_prod = "GROUP_CONCAT(FROM_UNIXTIME(abandoned_cart_time, '%Y/%m/%d %H:%i:%s') order by id SEPARATOR '###') AS abandoned_dates,
	        							  GROUP_CONCAT(FROM_UNIXTIME(abandoned_cart_time, '%k') order by id SEPARATOR '###') AS comp_time";
	                    
	        // $end_date_query = date('Y-m-d', strtotime($end_date_query .' +1 day'));

        	$results =  sr_query_sales($start_date,$end_date_query,$date_series,$select,"display_date_time",$select_top_prod,$select_top_abandoned_prod,$terms_post,$post);  
	    }

	    if (isset($post['option'])) {
	        $results[1] = $min_date_sales;
	        $results[2] = $max_date_sales;
	    }
	    else {
	        $results[17] = $min_date_sales;
	        $results[18] = $max_date_sales;
	    }

	    return $results;
	}

	if (isset ( $_POST ['cmd'] ) && (($_POST ['cmd'] == 'monthly') )) {



	//Sales	    
	    $sr_currency_symbol = isset($_POST['SR_CURRENCY_SYMBOL']) ? $_POST['SR_CURRENCY_SYMBOL'] : '';
	    $sr_decimal_places = isset($_POST['SR_DECIMAL_PLACES']) ? $_POST['SR_DECIMAL_PLACES'] : '';
	    
	    $start_date = date('Y-m-d H:i:s',(int)strtotime($_POST['start_date']));
	    
	    $date_convert = 0;



	    if (!empty($_POST['end_date']) || $_POST['end_date'] != "") {

	        if ($_POST['end_date'] == date('Y-m-d')) {

	        	$end_date = $_POST['end_date'];
	        	$date_convert = 1;

	        } else {
	        	$end_date = $_POST['end_date'] . " 23:59:59";
	        	$end_date_org = $end_date;
	        }


	    }
	    else {
	        // $end_date = date('Y-m-d', strtotime($_POST['start_date'] .' +1 month'));
	        $end_date = date('Y-m-d H:i:s');
	        $_POST['end_date'] = $end_date;
	        $date_convert = 1;
	    }


	    if ($date_convert == 1) {
	    	$date = date('Y-m-d',(int)strtotime($end_date));
		    $curr_time_gmt = date('H:i:s',time()- date("Z"));
		    $new_date = $date ." " . $curr_time_gmt;
		    $end_date = date('Y-m-d H:i:s',((int)strtotime($new_date)) + ( get_option( 'gmt_offset' ) * HOUR_IN_SECONDS )) ;	
	    }


	    $strtotime_start = strtotime($start_date);
	    $strtotime_end = strtotime($end_date);
	   
	    $diff_dates = (strtotime($_POST['end_date']) - strtotime($_POST['start_date']))/(60*60*24); 

	    if ($diff_dates > 0) {
	        $comparison_end_date = date('Y-m-d H:i:s', strtotime($start_date .' -1 day'));
	        $comparison_start_date = date('Y-m-d H:i:s', strtotime($comparison_end_date) - ($diff_dates*60*60*24));
	    }
	    else {
	        $comparison_start_date = date('Y-m-d', strtotime($_POST['start_date'] .' -1 day'));
	        $comparison_end_date = $comparison_start_date . " 23:59:59";  
	        $comparison_start_date .=" 00:00:00";  
	    }
	    
	    $comparison_diff_dates = (strtotime($comparison_end_date) - strtotime($comparison_start_date))/(60*60*24);

	    $actual_cumm_sales = sr_get_sales ($start_date,$end_date,$diff_dates,$_POST);

	    if (isset($_POST['option'])) { // Condition to handle the change of graph on option select
	        $encoded['graph_data'] = $actual_cumm_sales[0];
	        $encoded['cumm_sales_min_date'] = $actual_cumm_sales[1];
	        $encoded['cumm_sales_max_date'] = $actual_cumm_sales[2];
	    } 
	    else {
	        $comparison_cumm_sales = sr_get_sales ($comparison_start_date,$comparison_end_date,$comparison_diff_dates,$_POST);

	        //Code for handling the Monthly Sales Widget

	        if ($comparison_cumm_sales[1] < $actual_cumm_sales[1]) {
	            $imgurl_cumm_sales = $_POST['SR_IMG_UP_GREEN'];
	        }
	        else {
	            $imgurl_cumm_sales = $_POST['SR_IMG_DOWN_RED'];
	        }

	        if ($comparison_cumm_sales[1] == 0) {
	            $diff_cumm_sales = round($actual_cumm_sales[1],get_option( 'woocommerce_price_num_decimals' ));
	        }
	        else {
	            $diff_cumm_sales = round(((($actual_cumm_sales[1] - $comparison_cumm_sales[1])/$comparison_cumm_sales[1]) * 100),get_option( 'woocommerce_price_num_decimals' ));
	        }
	        
	        //Code for handling the Avg Order Total Widget

	        if ($comparison_cumm_sales[4] < $actual_cumm_sales[4]) {
	            $imgurl_cumm_avg_order_tot = $_POST['SR_IMG_UP_GREEN'];
	        }
	        else {
	            $imgurl_cumm_avg_order_tot = $_POST['SR_IMG_DOWN_RED'];
	        }
	        if ($comparison_cumm_sales[4] == 0) {
	            $diff_cumm_avg_order_tot = round($actual_cumm_sales[4],get_option( 'woocommerce_price_num_decimals' ));
	        }
	        else {
	            $diff_cumm_avg_order_tot = round(((($actual_cumm_sales[4] - $comparison_cumm_sales[4])/$comparison_cumm_sales[4]) * 100),get_option( 'woocommerce_price_num_decimals' ));
	        }

	        //Code for handling the Avg Order Items Per Customer Widget

	        if ($comparison_cumm_sales[5] < $actual_cumm_sales[5]) {
	            $imgurl_cumm_avg_order_items = $_POST['SR_IMG_UP_GREEN'];
	        }
	        else {
	            $imgurl_cumm_avg_order_items = $_POST['SR_IMG_DOWN_RED'];
	        }
	        if ($comparison_cumm_sales[5] == 0) {
	            $diff_cumm_avg_order_items = round($actual_cumm_sales[5],get_option( 'woocommerce_price_num_decimals' ));
	        }
	        else {
	            $diff_cumm_avg_order_items = $actual_cumm_sales[5] - $comparison_cumm_sales[5];
	        }

	        //Code for handling the Cumm Discount Sales Widget

	        if ($comparison_cumm_sales[8] < $actual_cumm_sales[8]) {
	            $imgurl_cumm_discount_sales = $_POST['SR_IMG_UP_GREEN'];
	        }
	        else {
	            $imgurl_cumm_discount_sales = $_POST['SR_IMG_DOWN_RED'];
	        }

	        if ($comparison_cumm_sales[1] == 0) {
	            $diff_discount_cumm_sales = round($actual_cumm_sales[8],get_option( 'woocommerce_price_num_decimals' ));
	        }
	        else {
	            $diff_discount_cumm_sales = round(((($actual_cumm_sales[8] - $comparison_cumm_sales[8])/$comparison_cumm_sales[8]) * 100),get_option( 'woocommerce_price_num_decimals' ));
	        }


	        //Code for handling the % Order Containing Coupons Widget

	        if ($comparison_cumm_sales[11] < $actual_cumm_sales[11]) {
	            $imgurl_cumm_per_order_coupons = $_POST['SR_IMG_UP_GREEN'];
	        }
	        else {
	            $imgurl_cumm_per_order_coupons = $_POST['SR_IMG_DOWN_RED'];
	        }
	        if ($comparison_cumm_sales[11] == 0) {
	            $diff_cumm_per_order_coupons = round($actual_cumm_sales[11],get_option( 'woocommerce_price_num_decimals' ));
	        }
	        else {
	            $diff_cumm_per_order_coupons = $actual_cumm_sales[11] - $comparison_cumm_sales[11];
	        }


	        // //Code for handling the Cumm Abandonment Rate Widget

	        if ($comparison_cumm_sales[15] < $actual_cumm_sales[15]) {
	            $imgurl_cumm_abandonment_rate = $_POST['SR_IMG_UP_GREEN'];
	        }
	        else {
	            $imgurl_cumm_abandonment_rate = $_POST['SR_IMG_DOWN_RED'];
	        }
	        if ($comparison_cumm_sales[15] == 0) {
	            $diff_cumm_abandonment_rate = round($actual_cumm_sales[15],get_option( 'woocommerce_price_num_decimals' ));
	        }
	        else {
	            $diff_cumm_abandonment_rate = $actual_cumm_sales[15] - $comparison_cumm_sales[15];
	        }

	        $encoded['result_monthly_sales'] = $actual_cumm_sales[0];
	        $encoded['total_monthly_sales'] = $sr_currency_symbol . sr_number_format($actual_cumm_sales[1],$sr_decimal_places);
	        $encoded['img_cumm_sales'] = $imgurl_cumm_sales;
	        $encoded['diff_cumm_sales'] = sr_number_format(abs($diff_cumm_sales),$sr_decimal_places);
	        $encoded['currency_symbol'] = $sr_currency_symbol;
	        $encoded['decimal_places'] = $sr_decimal_places;
	        $encoded['top_prod_data'] = $actual_cumm_sales[2];
	        $encoded['top_cust_data'] = $actual_cumm_sales[3];


	        $encoded['avg_order_total'] = $sr_currency_symbol . sr_number_format($actual_cumm_sales[4],$sr_decimal_places);
	        $encoded['img_cumm_avg_order_tot'] = $imgurl_cumm_avg_order_tot;
	        $encoded['diff_cumm_avg_order_tot'] = sr_number_format(abs($diff_cumm_avg_order_tot),$sr_decimal_places);


	        $encoded['avg_order_items'] = sr_number_format($actual_cumm_sales[5],$sr_decimal_places);
	        $encoded['img_cumm_avg_order_items'] = $imgurl_cumm_avg_order_items;
	        $encoded['diff_cumm_avg_order_items'] = sr_number_format(abs($diff_cumm_avg_order_items),$sr_decimal_places);

	        $encoded['cumm_max_sales'] = $actual_cumm_sales[6];

	        $encoded['graph_cumm_discount_sales'] = $actual_cumm_sales[7];
	        $encoded['cumm_discount_sales_total'] = $sr_currency_symbol . sr_number_format($actual_cumm_sales[8],$sr_decimal_places);
	        $encoded['img_cumm_discount_sales_total'] = $imgurl_cumm_avg_order_tot;
	        $encoded['diff_cumm_discount_sales_total'] = sr_number_format(abs($diff_cumm_avg_order_tot),$sr_decimal_places);

	        $encoded['top_coupon_data'] = $actual_cumm_sales[9];

	        $encoded['cumm_max_discount_total'] = $actual_cumm_sales[10];

	        $encoded['cumm_per_order_coupons'] = sr_number_format($actual_cumm_sales[11],$sr_decimal_places);
	        $encoded['img_cumm_per_order_coupons'] = $imgurl_cumm_per_order_coupons;
	        $encoded['diff_cumm_per_order_coupons'] = sr_number_format(abs($diff_cumm_per_order_coupons),$sr_decimal_places);

	        $encoded['top_gateway_data'] = $actual_cumm_sales[12];

	        $encoded['cumm_taxes'] = $actual_cumm_sales[13];

	        $encoded['cumm_top_abandoned_products'] = $actual_cumm_sales[14];

	        if ($actual_cumm_sales[15] != "") {
	        	$encoded['cumm_abandoned_rate'] = sr_number_format($actual_cumm_sales[15],$sr_decimal_places);
		        $encoded['img_cumm_abandoned_rate'] = $imgurl_cumm_abandonment_rate;
		        $encoded['diff_cumm_abandoned_rate'] = sr_number_format(abs($diff_cumm_abandonment_rate),$sr_decimal_places);	
	        } else {
	        	$encoded['cumm_abandoned_rate'] = '';
		        $encoded['img_cumm_abandoned_rate'] = '';
		        $encoded['diff_cumm_abandoned_rate'] = '';
	        }

	        

	        $encoded['cumm_sales_funnel'] = $actual_cumm_sales[16];

	        $encoded['cumm_sales_min_date'] = $actual_cumm_sales[17];
	        $encoded['cumm_sales_max_date'] = $actual_cumm_sales[18];

	        $encoded['siteurl'] = get_option('siteurl');
	        
	    }
	    
	    if ($diff_dates > 0 && $diff_dates <= 30) {
	        $encoded['tick_format'] = "%#d/%b/%Y";
	    }
	    else if ($diff_dates > 30 && $diff_dates <= 365) {
	        $encoded['tick_format'] = "%b";
	    }
	    else if ($diff_dates > 365) {
	        $encoded['tick_format'] = "%Y";
	    }
	    else {
	        $encoded['tick_format'] = "%H:%M:%S";
	    }

	    echo json_encode ( $encoded );
	    unset($encoded);
	    
	}

//=================================
//OLD SR CODE
//=================================

	$del = 3;
	$result  = array ();
	$encoded = array ();
	$months  = array ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' );
	$cat_rev = array ();

	global $wpdb;

	if (isset ( $_GET ['start'] ))
		$offset = $_GET ['start'];
	else
		$offset = 0;

	if (isset ( $_GET ['limit'] ))
		$limit = $_GET ['limit'];

	// For pro version check if the required file exists
	if (file_exists ( '../pro/sr-woo.php' )){
		define ( 'SRPRO', true );
	} else {
		define ( 'SRPRO', false );
	}

	function arr_init($arr_start, $arr_end, $category = '') {
		global $cat_rev, $months, $order_arr;

		for($i = $arr_start; $i <= $arr_end; $i ++) {
			$key = ($category == 'month') ? $months [$i - 1] : $i;
			$cat_rev [$key] = 0;
		}
	}

	function get_grid_data( $select, $from, $where, $where_date, $group_by, $search_condn, $order_by ) {
		global $wpdb, $cat_rev, $months, $order_arr;
			
			$woo_default_image = WP_PLUGIN_URL . '/smart-reporter-for-wp-e-commerce/resources/themes/images/woo_default_image.png';
			$query = "$select $from $where $where_date $group_by $search_condn $order_by ";
			$results 	= $wpdb->get_results ( $query, 'ARRAY_A' );

			$num_rows   = $wpdb->num_rows;
			$no_records = $num_rows;

			if ($no_records == 0) {
				$encoded ['gridItems'] 		= '';
				$encoded ['gridTotalCount'] = '';
				$encoded ['msg']			= 'No records found';
			} else {
				$count = 0 ;
				$grid_data = array();
					$grid_data [$count] ['sales']    = '';
					$grid_data [$count] ['discount'] = '';
					$grid_data [$count] ['products'] = 'All Products';
					$grid_data [$count] ['period']   = 'selected period';
					$grid_data [$count] ['category'] = 'All Categories';
					$grid_data [$count] ['id'] 	     = '';
					$grid_data [$count] ['quantity'] = 0;
					$grid_data [$count] ['image'] = $woo_default_image;		//../wp-content/plugins/wp-e-commerce/wpsc-theme/wpsc-images/noimage.png

					foreach ( $results as $result ) {
						$grid_data [$count] ['quantity'] = $grid_data[$count] ['quantity'] + $result ['quantity'];
						$grid_data [$count] ['sales'] = $grid_data[$count] ['sales'] + $result ['sales'];
						$grid_data [$count] ['discount'] = $grid_data[$count] ['discount'] + $result ['discount'];
					}
					$count++;
				
				foreach ( $results as $result ) {
					$grid_data [$count] ['products'] = $result ['products'];
					$grid_data [$count] ['period']   = $result ['period'];
					$grid_data [$count] ['sales']    = $result ['sales'];
					$grid_data [$count] ['discount'] = $result ['discount'];
					$grid_data [$count] ['category'] = $result ['category'];
					$grid_data [$count] ['id'] 	 	 = $result ['id'];
					$grid_data [$count] ['quantity'] = $result ['quantity'];
					$thumbnail = isset( $result ['thumbnail'] ) ? wp_get_attachment_image_src( $result ['thumbnail'], 'admin-product-thumbnails' ) : '';
					$grid_data [$count] ['image']    = ( $thumbnail[0] != '' ) ? $thumbnail[0] : $woo_default_image;
					$count++;
				}
					
				$encoded ['gridItems']      = $grid_data;
				$encoded ['period_div'] 	= $parts ['category'];
				$encoded ['gridTotalCount'] = count($grid_data);
			}

		return $encoded;
	}

	function get_graph_data( $product_id, $where_date, $parts ) {
		global $wpdb, $cat_rev, $months, $order_arr;
		
	        $cat_rev1 = array();
		
		$encoded = get_last_few_order_details( $product_id, $where_date );

	                $time = '';
	                if(isset($parts['day']) && $parts['day'] == 'today' ) {
	                    $time = ",DATE_FORMAT(max(posts.`post_date`), '%H:%i:%s') AS time";
	                    for ($i=0;$i<24;$i++) {
	                        $cat_rev1[$i] = 1;
	                    }
	                }
	        
	                
			$select  = "SELECT SUM( order_item.sales ) AS sales,
						DATE_FORMAT(posts.`post_date`, '{$parts ['abbr']}') AS period
	                                        $time    
					   ";
			
			$from = " FROM {$wpdb->prefix}sr_woo_order_items AS order_item
				  	  LEFT JOIN {$wpdb->prefix}posts AS posts ON ( posts.ID = order_item.order_id )
					";
			
			$where = ' WHERE 1 ';
			
			$group_by = " GROUP BY period";
		
			if ( isset ( $product_id ) && $product_id != 0 ) {
				$where 	   .= " AND order_item.product_id = $product_id ";
			}
			
			$query = "$select $from $where $where_date $group_by ";
			
			$results 	= $wpdb->get_results ( $query, 'ARRAY_A' );
			$num_rows   = $wpdb->num_rows;
			$no_records = ($num_rows != 0) ? count ( $cat_rev ) : 0;

			if ($no_records != 0) {
				foreach ( $results as $result ) { // put within condition
					$cat_rev [$result['period']]  = $result ['sales'];
	                                if(isset($parts['day']) && $parts['day'] == 'today' ) {
	                                    $cat_rev1 [$result['period']]  = $result ['time'];
				}
	                        }
				
	                        $i = 0;
	                        
				foreach ( $cat_rev as $mon => $rev ) {
					$record ['period'] = $mon;
					$record ['sales'] = $rev;
	                                
	                                if(isset($parts['day']) && $parts['day'] == 'today' ) {
	                                    $record ['time'] = $cat_rev1[$i];
	                                }
					$records [] = $record;
	                                $i++;
				}
			}
			
			if ($no_records == 0) {
				$encoded ['graph'] ['items'] = '';
				$encoded ['graph'] ['totalCount'] = 0;
			} else {
				$encoded ['graph'] ['items'] = $records;
				$encoded ['graph'] ['totalCount'] = count($cat_rev);
			}
		
		return $encoded;
	}

	function get_last_few_order_details( $product_id, $where_date ) {
		global $wpdb, $cat_rev, $months, $order_arr;
			
			$select = "SELECT order_item.order_id AS order_id,
							  posts.post_date AS date,
							  GROUP_CONCAT( distinct postmeta.meta_value
									ORDER BY postmeta.meta_id 
									SEPARATOR ' ' ) AS cname,
							  ( SELECT post_meta.meta_value FROM {$wpdb->prefix}postmeta AS post_meta WHERE post_meta.post_id = order_item.order_id AND post_meta.meta_key = '_order_total' ) AS totalprice
					  ";
			
			$from = " FROM {$wpdb->prefix}sr_woo_order_items AS order_item
				  	  LEFT JOIN {$wpdb->prefix}posts AS posts ON ( posts.ID = order_item.order_id )
				  	  LEFT JOIN {$wpdb->prefix}postmeta AS postmeta ON ( order_item.order_id = postmeta.post_id AND postmeta.meta_key IN ( '_billing_first_name', '_billing_last_name' ) )
					";
			
			$where = ' WHERE 1 ';
			
			$order_by = "ORDER BY date DESC";
			
			$limit = "limit 0,5";
			
			if ( isset( $product_id ) ) $group_by  = "GROUP BY order_id";
			
			if ( isset ( $product_id ) && $product_id != 0 ) {
				$where 	   .= " AND order_item.product_id = $product_id ";
			}
			
			$query = "$select $from $where $where_date $group_by $order_by $limit";
			$results 	= $wpdb->get_results ( $query, 'ARRAY_A' );
			$num_rows   = $wpdb->num_rows;
			$no_records = $num_rows;
				
			if ($no_records == 0) {
				$encoded ['orderDetails'] ['order'] 		= '';
				$encoded ['orderDetails'] ['orderTotalCount'] = 0;
			}  else {			
				$cnt = 0;
				$order_data = array();
				foreach ( $results as $result ) { // put within condition	
					$order_data [$cnt] ['purchaseid'] = $result ['order_id'];
					$order_data [$cnt] ['date']       = date( "d-M-Y",strtotime( $result ['date'] ) ); 
					$order_data [$cnt] ['totalprice'] = woocommerce_price( $result ['totalprice'] );
					$order_data [$cnt] ['cname']      = $result ['cname'];
					$orders [] = $order_data [$cnt];				
					$cnt++;
				}	
			
				$encoded ['orderDetails'] ['order'] = $orders;
				$encoded ['orderDetails'] ['orderTotalCount'] = count($orders);
			}
			
		return $encoded;
	}

	if (isset ( $_GET ['cmd'] ) && (($_GET ['cmd'] == 'getData') || ($_GET ['cmd'] == 'gridGetData'))) {
		
	        if (SRPRO == true) {
	            if ( WPSC_RUNNING === true ) {
			if ( file_exists ( SR_PLUGIN_DIR_ABSPATH. '/pro/sr.php' ) ) include( SR_PLUGIN_DIR_ABSPATH. '/pro/sr.php' );
	            } else {
	                if ( file_exists ( SR_PLUGIN_DIR_ABSPATH. '/pro/sr-woo.php' ) ) include_once( SR_PLUGIN_DIR_ABSPATH. '/pro/sr-woo.php' );
	            }
	        }
	    
		if (isset ( $_GET ['fromDate'] )) {
			$from ['date'] = strtotime ( $_GET ['fromDate'] );
			$to ['date'] = strtotime ( $_GET ['toDate'] );
		 
			if ($to ['date'] == 0) {
				$to ['date'] = strtotime ( 'today' );
			}
			// move it forward till the end of day
			$to ['date'] += 86399;

			// Swap the two dates if to_date is less than from_date
			if ($to ['date'] < $from ['date']) {
				$temp = $to ['date'];
				$to ['date'] = $from ['date'];
				$from ['date'] = $temp;
			}
			// date('Y-m-d H:i:s',(int)strtotime($_POST ['fromDate']))		$from ['date']		$to['date']
			if (SRPRO == true){
				$where_date = " AND (posts.`post_date` between '" . date('Y-m-d H:i:s',$from ['date']) . "' AND '" . date('Y-m-d H:i:s',$to['date']) . "')";
			}else{
				$diff = 86400 * 7;
				if ( (( $from ['date'] - $to ['date'] ) <= $diff ) )
				$where_date = " AND (posts.`post_date` between '" . date('Y-m-d H:i:s',$from ['date']) . "' AND '" . date('Y-m-d H:i:s',$to['date']) . "')";
			}

			//BOF bar graph calc

			$frm ['yr'] = date ( "Y", $from ['date'] );
			$to ['yr'] = date ( "Y", $to ['date'] );

			$frm ['mon'] = date ( "n", $from ['date'] );
			$to ['mon'] = date ( "n", $to ['date'] );

			$frm ['week'] = date ( "W", $from ['date'] );
			$to ['week'] = date ( "W", $to ['date'] );

			$frm ['day'] = date ( "j", $from ['date'] );
			$to ['day'] = date ( "j", $to ['date'] );

			$parts ['category'] = '';
			$parts ['no'] = 0;

			if ($frm ['yr'] == $to ['yr']) {
				if ($frm ['mon'] == $to ['mon']) {

					if ($frm ['week'] == $to ['week']) {
						if ($frm ['day'] == $to ['day']) {
							$diff = $to ['date'] - $from ['date'];
							$parts ['category'] = 'hr';
							$parts ['no'] = 23;
							$parts ['abbr'] = '%k';
	                                                $parts ['day'] = 'today';

							arr_init ( 0, $parts ['no'],'hr' );
						} else {
							$parts ['category'] = 'day';
							$parts ['no'] = date ( 't', $from ['date'] );
							$parts ['abbr'] = '%e';

							arr_init ( 1, $parts ['no'] );
						}
					} else {
						$parts ['category'] = 'day';
						$parts ['no'] = date ( 't', $from ['date'] );
						$parts ['abbr'] = '%e';

						arr_init ( 1, $parts ['no'] );
					}
				} else {
					$parts ['category'] = 'month';
					$parts ['no'] = $to ['mon'] - $frm ['mon'];
					$parts ['abbr'] = '%b';

					arr_init ( $frm ['mon'], $to ['mon'], $parts ['category'] );
				}
			} else {
				$parts ['category'] = 'year';
				$parts ['no'] = $to ['yr'] - $frm ['yr'];
				$parts ['abbr'] = '%Y';

				arr_init ( $frm ['yr'], $to ['yr'] );
			}
			// EOF
		}
		
		$static_select = "SELECT order_item.product_id AS id,
						 order_item.product_name AS products,
						 category,
						 SUM( order_item.quantity ) AS quantity,
						 SUM( order_item.sales ) AS sales,
						 SUM( order_item.discount ) AS discount,
						 image_postmeta.meta_value AS thumbnail
						";
			
		$from = " FROM {$wpdb->prefix}sr_woo_order_items AS order_item
				  LEFT JOIN {$wpdb->prefix}posts AS products ON ( products.id = order_item.product_id )
				  LEFT JOIN ( SELECT GROUP_CONCAT(wt.name SEPARATOR ', ') AS category, wtr.object_id
						FROM  {$wpdb->prefix}term_relationships AS wtr  	 
						JOIN {$wpdb->prefix}term_taxonomy AS wtt ON (wtr.term_taxonomy_id = wtt.term_taxonomy_id and taxonomy = 'product_cat')
						JOIN {$wpdb->prefix}terms AS wt ON (wtt.term_id = wt.term_id)
						GROUP BY wtr.object_id) AS prod_categories on (products.id = prod_categories.object_id OR products.post_parent = prod_categories.object_id)
				  LEFT JOIN {$wpdb->prefix}postmeta as image_postmeta ON (products.ID = image_postmeta.post_id 
						AND image_postmeta.meta_key = '_thumbnail_id')
				  LEFT JOIN {$wpdb->prefix}posts as posts ON ( posts.ID = order_item.order_id )
				  ";
			
		$where = " WHERE products.post_type IN ('product', 'product_variation') ";
			
		$group_by = " GROUP BY order_item.product_id ";
			
		$order_by = " ORDER BY sales DESC ";
		
		if (isset ( $_GET ['searchText'] ) && $_GET ['searchText'] != '') {
			$search_on = $wpdb->_real_escape ( trim ( $_GET ['searchText'] ) );
			$search_ons = explode( ' ', $search_on );
			if ( is_array( $search_ons ) ) {	
				$search_condn = " HAVING ";
				foreach ( $search_ons as $search_on ) {
					$search_condn .= " order_item.product_name LIKE '%$search_on%' 
									   OR prod_categories.category LIKE '%$search_on%' 
									   OR order_item.product_id LIKE '%$search_on%'
									   OR";
				}
				$search_condn = substr( $search_condn, 0, -2 );
			} else {
				$search_condn = " HAVING order_item.product_name LIKE '%$search_on%' 
									   OR prod_categories.category LIKE '%$search_on%' 
									   OR order_item.product_id LIKE '%$search_on%'
							";
			}
			
		}
		
		if ($_GET ['cmd'] == 'gridGetData') {
			
			$encoded = get_grid_data( $static_select, $from, $where, $where_date, $group_by, $search_condn, $order_by );
			
		} else if ($_GET ['cmd'] == 'getData') {

			$encoded = get_graph_data( $_GET ['id'], $where_date, $parts );
			
		}

		echo json_encode ( $encoded );
	}

?>
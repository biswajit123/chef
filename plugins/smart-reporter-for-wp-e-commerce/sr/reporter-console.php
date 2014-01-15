<?php 
global $wpdb;

// to set javascript variable of file exists
    $fileExists = (SRPRO === true) ? 1 : 0;

//Function to convert the Sales Figures
function sr_number_format($input, $places)
{

    $suffixes = array('', 'k', 'm', 'g', 't');
    $suffixIndex = 0;
    $mult = pow(10, $places);

    while(abs($input) >= 1000 && $suffixIndex < sizeof($suffixes))
    {
        $suffixIndex++;
        $input /= 1000;
    }

    return (
        $input > 0
            // precision of 3 decimal places
            
            ? floor($input * $mult) / $mult
            : ceil($input * $mult) / $mult
        )
        . $suffixes[$suffixIndex];
}

?>

<?php

// ================================================
// Code for SR Beta
// ================================================

if(defined(SR_BETA) && SR_BETA == "true") {

?>

<div id="smart_reporter_beta" syle="width:99%;">

<?php


    global $wpdb;

// to set javascript variable of file exists
$fileExists = (defined('SRPRO') && SRPRO === true) ? 1 : 0;
$selectedDateValue = (defined('SRPRO') && SRPRO === true) ? 'THIS_MONTH' : 'LAST_SEVEN_DAYS';

//Global Variables
$sr_currency_symbol = defined('SR_CURRENCY_SYMBOL') ? SR_CURRENCY_SYMBOL : '';
$sr_decimal_places = defined('SR_DECIMAL_PLACES') ? SR_DECIMAL_PLACES : '';
$sr_img_up_green = defined('SR_IMG_UP_GREEN') ? SR_IMG_UP_GREEN : '';
$sr_img_up_red = defined('SR_IMG_UP_RED') ? SR_IMG_UP_RED : '';
$sr_img_down_red = defined('SR_IMG_DOWN_RED') ? SR_IMG_DOWN_RED : '';

if (defined('WPSC_RUNNING') && WPSC_RUNNING === true) {
    $currency_type = get_option( 'currency_type' );   //Maybe
    $wpsc_currency_data = $wpdb->get_row( "SELECT `symbol`, `symbol_html`, `code` FROM `" . WPSC_TABLE_CURRENCY_LIST . "` WHERE `id` = '" . $currency_type . "' LIMIT 1", ARRAY_A );
    $currency_sign = $wpsc_currency_data['symbol'];   //Currency Symbol in Html
    if ( IS_WPSC388 )   
        $orders_details_url = ADMIN_URL . "index.php?page=wpsc-purchase-logs&c=item_details&id=";
    else
        $orders_details_url = ADMIN_URL . "index.php?page=wpsc-sales-logs&purchaselog_id=";
}

$today_arr          = getdate();

$curr_time_gmt = date('H:i:s',time()- date("Z"));
$new_date = date('Y-m-d') ." " . $curr_time_gmt;
$today = date('Y-m-d',((int)strtotime($new_date)) + ( get_option( 'gmt_offset' ) * HOUR_IN_SECONDS )) ;
$yesterday = date('Y-m-d', strtotime($today .' -1 day'));

// ================================================
// DAILY WIDGETS
// ================================================

//Query to get the relevant order ids
$query_terms     = "SELECT id FROM {$wpdb->prefix}posts AS posts
                        JOIN {$wpdb->prefix}term_relationships AS term_relationships 
                                                    ON term_relationships.object_id = posts.ID 
                                    JOIN {$wpdb->prefix}term_taxonomy AS term_taxonomy 
                                                    ON term_taxonomy.term_taxonomy_id = term_relationships.term_taxonomy_id 
                                    JOIN {$wpdb->prefix}terms AS terms 
                                                    ON term_taxonomy.term_id = terms.term_id
                    WHERE terms.name IN ('completed','processing','on-hold','pending')
                        AND posts.post_status IN ('publish')";
          
$terms_post      = $wpdb->get_col($query_terms);
$rows_terms_post = $wpdb->num_rows;

if ($rows_terms_post > 0) {
    $terms_post = implode(",",$terms_post);
}

// ================================================
// Todays Sales
// ================================================

$query_today        = "SELECT SUM( postmeta.meta_value ) AS todays_sales 
                    FROM `{$wpdb->prefix}postmeta` AS postmeta
                    LEFT JOIN {$wpdb->prefix}posts AS posts ON ( posts.ID = postmeta.post_id )
                    WHERE postmeta.meta_key IN ('_order_total')
                        AND posts.post_date LIKE '$today%'
                        AND posts.ID IN ($terms_post)";
$results_today      = $wpdb->get_col ( $query_today );
$rows_results_today = $wpdb->num_rows;

if ($rows_results_today > 0) {
$sales_today = $results_today[0];
}
else {
$sales_today = 0;
}

$query_yest        = "SELECT SUM( postmeta.meta_value ) AS yesterdays_sales 
                    FROM `{$wpdb->prefix}postmeta` AS postmeta
                    LEFT JOIN {$wpdb->prefix}posts AS posts ON ( posts.ID = postmeta.post_id )
                    WHERE postmeta.meta_key IN ('_order_total')
                        AND posts.post_date LIKE '$yesterday%'
                        AND posts.ID IN ($terms_post)";
$results_yest       = $wpdb->get_col ( $query_yest );
$rows_results_yest  = $wpdb->num_rows;

if ($rows_results_yest > 0) {
$sales_yest = $results_yest[0];
}
else {
$sales_yest = 0;
}

if ($sales_yest == 0) {
$diff_daily_sales = round($sales_today,2);
}
else {
$diff_daily_sales = abs(round(((($sales_today - $sales_yest)/$sales_yest) * 100),2));
}

if ($diff_daily_sales != 0) {
if ($sales_yest < $sales_today) {
    $imgurl_daily_sales = $sr_img_up_green;
}
else {
    $imgurl_daily_sales = $sr_img_down_red;
}    
}
else {
$diff_daily_sales = "";
$imgurl_daily_sales = "";
}



// ================================================
// Todays Customers
// ================================================


$result_guest_today_email1 = array();
$result_guest_yest_email1 = array();
$reg_today_count = 0;
$reg_yest_count = 0;


//Reg Customers
$query_reg_today    = "SELECT ID FROM `$wpdb->users` 
                    WHERE user_registered LIKE  '$today%'";
$reg_today_ids      = $wpdb->get_col ( $query_reg_today );
$rows_reg_today_ids = $wpdb->num_rows;

if ($rows_reg_today_ids > 0) {
    $query_reg_today_count  ="SELECT COUNT(*)
                               FROM {$wpdb->prefix}postmeta AS postmeta
                                        JOIN {$wpdb->prefix}posts AS posts ON (posts.ID = postmeta.post_id)
                               WHERE postmeta.meta_key IN ('_customer_user')
                                     AND postmeta.meta_value IN (".implode(",",$reg_today_ids).")
                                     AND posts.post_date LIKE  '$today%'
                                     AND posts.ID IN ($terms_post)
                               GROUP BY postmeta.meta_value";

    $reg_today              = $wpdb->get_col ( $query_reg_today_count ); 
    $rows_reg_today         = $wpdb->num_rows;   

    if($rows_reg_today > 0) {
        $reg_today_count = $reg_today[0];
    }
}


$query_reg_yest      = "SELECT ID FROM `$wpdb->users` 
                     WHERE user_registered LIKE  '$yesterday%'";
$reg_yest_ids        = $wpdb->get_col ( $query_reg_yest );
$rows_reg_yest_ids   = $wpdb->num_rows;

if ($rows_reg_yest_ids > 0) {
    $query_reg_today_count  ="SELECT COUNT(*)
                               FROM {$wpdb->prefix}postmeta AS postmeta
                                        JOIN {$wpdb->prefix}posts AS posts ON (posts.ID = postmeta.post_id)
                               WHERE postmeta.meta_key IN ('_customer_user')
                                     AND postmeta.meta_value IN (".implode(",",$reg_yest_ids).")
                                     AND posts.post_date LIKE  '$yesterday%'
                                     AND posts.ID IN ($terms_post)
                               GROUP BY postmeta.meta_value";

    $reg_yest               = $wpdb->get_col ( $query_reg_today_count );  
    $rows_reg_yest          = $wpdb->num_rows;   

    if($rows_reg_yest > 0) {
        $reg_yest_count = $reg_yest[0];
    }

}

//Guest Customers

$query_guest_today_email    = "SELECT postmeta1.meta_value
                       FROM {$wpdb->prefix}postmeta AS postmeta1
                                JOIN {$wpdb->prefix}posts AS posts ON (posts.ID = postmeta1.post_id)
                                INNER JOIN {$wpdb->prefix}postmeta AS postmeta2
                                               ON (postmeta2.post_ID = postmeta1.post_ID AND postmeta2.meta_key IN ('_customer_user'))
                       WHERE postmeta1.meta_key IN ('_billing_email')
                             AND postmeta2.meta_value = 0
                             AND posts.post_date LIKE  '$today%'
                             AND posts.ID IN ($terms_post)
                       GROUP BY postmeta1.meta_value";

$result_guest_today_email   = $wpdb->get_col ( $query_guest_today_email );
$rows_guest_today_email     = $wpdb->num_rows;

if ($rows_guest_today_email > 0) {
    $result_guest_today_email1   = array_flip($result_guest_today_email);    

    $query_guest_today          = "SELECT DISTINCT postmeta.meta_value
                               FROM {$wpdb->prefix}postmeta AS postmeta
                                        JOIN {$wpdb->prefix}posts AS posts ON (posts.ID = postmeta.post_id)
                               WHERE postmeta.meta_key IN ('_billing_email')
                                     AND postmeta.meta_value IN ('". implode("','",$result_guest_today_email) ."')
                                         AND posts.post_date NOT LIKE  '$today%'
                               GROUP BY posts.ID";

    $result_guest_today         = $wpdb->get_col ( $query_guest_today );

    for($i=0; $i<sizeof($result_guest_today);$i++) {
        if (isset($result_guest_today_email1[$result_guest_today[$i]])) {
            unset($result_guest_today_email1[$result_guest_today[$i]]);
        }        
    }



}

$today_count_cust = 0;

$today_count_cust = sizeof($result_guest_today_email1) + $reg_today_count;    

$query_guest_yest_email    ="SELECT postmeta1.meta_value
                           FROM {$wpdb->prefix}postmeta AS postmeta1
                                    JOIN {$wpdb->prefix}posts AS posts ON (posts.ID = postmeta1.post_id)
                                    INNER JOIN {$wpdb->prefix}postmeta AS postmeta2
                                                   ON (postmeta2.post_ID = postmeta1.post_ID AND postmeta2.meta_key IN ('_customer_user'))
                           WHERE postmeta1.meta_key IN ('_billing_email')
                                 AND postmeta2.meta_value = 0
                                 AND posts.post_date LIKE  '$yesterday%'
                                 AND posts.ID IN ($terms_post)
                           GROUP BY postmeta1.meta_value";

$result_guest_yest_email   =  $wpdb->get_col ( $query_guest_yest_email );
$rows_guest_yest_email     = $wpdb->num_rows;

if ($rows_guest_yest_email > 0) {
$result_guest_yest_email1   = array_flip($result_guest_yest_email);

$query_guest_yest   = "SELECT DISTINCT postmeta.meta_value
                       FROM {$wpdb->prefix}postmeta AS postmeta
                                JOIN {$wpdb->prefix}posts AS posts ON (posts.ID = postmeta.post_id)
                       WHERE postmeta.meta_key IN ('_billing_email')
                             AND postmeta.meta_value IN ('". implode("','",$result_guest_yest_email) ."')
                             AND posts.post_date NOT LIKE  '$yesterday%'
                                 AND posts.post_date NOT LIKE  '$today%'
                       GROUP BY posts.ID";

$result_guest_yest   =  $wpdb->get_col ( $query_guest_yest );

for($i=0; $i<sizeof($result_guest_yest);$i++) {
    if (isset($result_guest_yest_email1[$result_guest_yest[$i]])) {
        unset($result_guest_yest_email1[$result_guest_yest[$i]]);
    }
}    
}

$yest_count_cust = 0;

$yest_count_cust = sizeof($result_guest_yest_email1) + $reg_yest_count;    

$diff_daily_cust = abs($today_count_cust - $yest_count_cust);

if($diff_daily_cust != 0) {
if ($yest_count_cust < $today_count_cust) {
    $imgurl_daily_cust = $sr_img_up_green;
}
else {
    $imgurl_daily_cust = $sr_img_down_red;
}    
}
else {
$diff_daily_cust = "";
$imgurl_daily_cust = "";
}



// ================================================
// Todays Returns
// ================================================

$query_terms_refund         = "SELECT id FROM {$wpdb->prefix}posts AS posts
                            JOIN {$wpdb->prefix}term_relationships AS term_relationships 
                                                        ON term_relationships.object_id = posts.ID 
                                        JOIN {$wpdb->prefix}term_taxonomy AS term_taxonomy 
                                                        ON term_taxonomy.term_taxonomy_id = term_relationships.term_taxonomy_id 
                                        JOIN {$wpdb->prefix}terms AS terms 
                                                        ON term_taxonomy.term_id = terms.term_id
                            WHERE terms.name IN ('refunded')
                            AND posts.post_status IN ('publish')";

$terms_refund_post          = $wpdb->get_col($query_terms_refund);
$rows_terms_refund_post     = $wpdb->num_rows;

if ($rows_terms_refund_post > 0) {
$terms_refund_post = implode(",",$terms_refund_post);

$query_today_refund     = "SELECT SUM(postmeta.meta_value) as todays_refund
                           FROM {$wpdb->prefix}postmeta AS postmeta
                                    JOIN {$wpdb->prefix}posts AS posts ON (posts.ID = postmeta.post_id)
                           WHERE postmeta.meta_key IN ('_order_total')
                                 AND posts.post_modified LIKE '$today%'
                                 AND posts.ID IN ($terms_refund_post)";

$result_today_refund    = $wpdb->get_col ( $query_today_refund ); 

$query_yest_refund      = "SELECT SUM(postmeta.meta_value) as yest_refund
                           FROM {$wpdb->prefix}postmeta AS postmeta
                                    JOIN {$wpdb->prefix}posts AS posts ON (posts.ID = postmeta.post_id)
                           WHERE postmeta.meta_key IN ('_order_total')
                                 AND posts.post_modified LIKE '$yesterday%'
                                 AND posts.ID IN ($terms_refund_post)";

$result_yest_refund     = $wpdb->get_col ( $query_yest_refund );

}
else {
$rows_today_refund = 0;
$rows_yest_refund = 0;
}


if (!empty($result_today_refund[0])) {
$today_refund   = $result_today_refund[0];
}
else {
$today_refund   = "0";
}

if (!empty($result_yest_refund[0])) {
$yest_refund   = $result_yest_refund[0];
}
else {
$yest_refund   = "0";
}


if ($yest_refund == "0") {
$diff_daily_refund = round($today_refund,2);
}
else {
$diff_daily_refund = abs(round(((($today_refund - $yest_refund)/$yest_refund) * 100),2));
}

if ($diff_daily_refund != 0) {
if ($yest_refund < $today_refund) {
    $imgurl_daily_refund = $sr_img_up_red;
}
else {
    $imgurl_daily_refund = $sr_img_up_green;
}    
}
else {
$diff_daily_refund = "";
$imgurl_daily_refund = "";
}

// ================================================
// Orders Unfulfillment
// ================================================

$query_shipping_status  = "SELECT option_value FROM {$wpdb->prefix}options
                        WHERE option_name LIKE 'woocommerce_calc_shipping'";
$result_shipping_status = $wpdb->get_col ( $query_shipping_status );

$query_physical_prod  = "SELECT post_id
                       FROM {$wpdb->prefix}postmeta
                       WHERE (meta_key LIKE '_downloadable' AND meta_value LIKE 'no')
                             OR (meta_key LIKE '_virtual' AND meta_value LIKE 'no')";

$result_physical_prod = $wpdb->get_col ( $query_physical_prod ); 
$rows_physical_prod   = $wpdb->num_rows;

$query_order_fulfillment_today  = "SELECT count(id) FROM {$wpdb->prefix}posts AS posts
                                JOIN {$wpdb->prefix}term_relationships AS term_relationships 
                                                            ON term_relationships.object_id = posts.ID 
                                            JOIN {$wpdb->prefix}term_taxonomy AS term_taxonomy 
                                                            ON term_taxonomy.term_taxonomy_id = term_relationships.term_taxonomy_id 
                                            JOIN {$wpdb->prefix}terms AS terms 
                                                            ON term_taxonomy.term_id = terms.term_id
                                WHERE terms.name IN ('processing')
                                    AND posts.post_status IN ('publish')
                                    AND (posts.post_modified LIKE '$today%'
                                        OR posts.post_date LIKE '$today%')";
          
$result_order_fulfillment_today = $wpdb->get_col($query_order_fulfillment_today);
$rows_order_fulfillment_today   = $wpdb->num_rows;

if($rows_order_fulfillment_today > 0) {
$count_order_fulfillment_today = $result_order_fulfillment_today[0];
}
else {
$count_order_fulfillment_today = 0;
}

$query_order_fulfillment_yest   = "SELECT count(id) FROM {$wpdb->prefix}posts AS posts
                                JOIN {$wpdb->prefix}term_relationships AS term_relationships 
                                                            ON term_relationships.object_id = posts.ID 
                                            JOIN {$wpdb->prefix}term_taxonomy AS term_taxonomy 
                                                            ON term_taxonomy.term_taxonomy_id = term_relationships.term_taxonomy_id 
                                            JOIN {$wpdb->prefix}terms AS terms 
                                                            ON term_taxonomy.term_id = terms.term_id
                                WHERE terms.name IN ('processing')
                                    AND posts.post_status IN ('publish')
                                    AND (posts.post_modified LIKE '$yesterday%'
                                        OR posts.post_date LIKE '$yesterday%')";
          
$result_order_fulfillment_yest   = $wpdb->get_col($query_order_fulfillment_yest);
$rows_order_fulfillment_yest    = $wpdb->num_rows;

if($rows_order_fulfillment_yest > 0) {
$count_order_fulfillment_yest = $result_order_fulfillment_yest[0];
}
else {
$count_order_fulfillment_yest = 0;
}

$diff_order_fulfillment = abs($count_order_fulfillment_today - $count_order_fulfillment_yest);

if ($diff_order_fulfillment != 0) {
if ($count_order_fulfillment_today > $count_order_fulfillment_yest) {
    $imgurl_order_fulfillment = $sr_img_up_red;
}
else {
    $imgurl_order_fulfillment = $sr_img_up_green;
}    
}
else {
$diff_order_fulfillment = "";
$imgurl_order_fulfillment = "";
}

?>

<!-- 
// ================================================
// Display Part Of Daily Widgets
// ================================================
-->
<div>
    <div class="row">
    <div>
            <div id = "daily_widget_1" class = "daily_widget first daily_widget_today_sales">
                <script type="text/javascript">
                    $(function(){
                        $("#daily_widget_1").hover(
                            function() { $(this).css('border', '0.2em solid #12B41F');},
                            function() { $(this).css('border', '0.2em solid #e8e8e8'); }
                        );
                    });
                </script>

                <div class = "daily_widgets_icon"> 
                    <i class = "icon-signal daily_widgets_icon1 daily_widget_1_color">   </i>
                </div>

                <div class="daily_widgets_data">
                        <?php $sales_today_formatted = $sr_currency_symbol . sr_number_format($sales_today,$sr_decimal_places);?>
                        <span class = "daily_widgets_price daily_widget_1_color"> <?php echo $sales_today_formatted; ?>   <i class="<?php echo $imgurl_daily_sales; ?>" ></i>   <span class = "daily_widgets_comp_price daily_widget_1_color"> <?php $diff = (!empty($diff_daily_sales)) ? sr_number_format($diff_daily_sales, $sr_decimal_places) . '%' : ""; echo $diff;?></span> </span>
                        <p class="daily_widgets_text"> Sales Today </p>
                </div>
            </div>
    </div>
    <div>
            <div id = "daily_widget_2" class="daily_widget second">
              <script type="text/javascript">
                    $(function() {
                        $("#daily_widget_2").hover(
                            function() { $(this).css('border', '0.2em solid #12ADC2');},
                            function() { $(this).css('border', '0.2em solid #e8e8e8'); }
                        );
                    });
                </script>
              <div class="daily_widgets_icon">
                <i class = "icon-user daily_widgets_icon1 daily_widget_2_color"> </i>     
              </div>

              <div class="daily_widgets_data">
                <span class = "daily_widgets_price daily_widget_2_color"> <?php echo sr_number_format($today_count_cust,$sr_decimal_places); ?>   <i class="<?php echo $imgurl_daily_cust; ?>"></i>  <span class = "daily_widgets_comp_price daily_widget_2_color"> <?php $diff = (!empty($diff_daily_cust)) ? sr_number_format($diff_daily_cust,$sr_decimal_places) :""; echo $diff;?> </span> </span>
                <p class="daily_widgets_text"> New Customers Today </p>
              </div>

            </div>
    </div>

    <div>
            <div id = "daily_widget_3" class="daily_widget third">

               <script type="text/javascript">
                    $(function(){
                        $("#daily_widget_3").hover(
                            function() { $(this).css('border', '0.2em solid #f26645');},
                            function() { $(this).css('border', '0.2em solid #e8e8e8'); }
                        );
                    });
                </script>
              <div class="daily_widgets_icon">
                <i class = "icon-thumbs-down daily_widgets_icon1 daily_widget_3_color"> </i>   
              </div>
              <div class="daily_widgets_data">
                <?php $today_refund_formatted = $sr_currency_symbol . sr_number_format($today_refund,$sr_decimal_places);?>
                <span class = "daily_widgets_price daily_widget_3_color"> <?php echo $today_refund_formatted; ?>   <i class="<?php echo $imgurl_daily_refund; ?>"></i>  <span class = "daily_widgets_comp_price daily_widget_3_color"> <?php $diff = (!empty($diff_daily_refund)) ? sr_number_format($diff_daily_refund,$sr_decimal_places) . '%' : ""; echo $diff;?></span> </span>
                <p class="daily_widgets_text"> Refund Today </p>
              </div>

            </div>
    </div>

    <?php if($rows_physical_prod > 0 && $result_shipping_status[0] == "yes") {?>
    <div>
            <div id = "daily_widget_4" class="daily_widget daily_widget_order_fulfill fourth">
                <script type="text/javascript">
                    $(function() {
                        $("#daily_widget_4").hover(
                            function() { $(this).css('border', '0.2em solid #15295c');},
                            function() { $(this).css('border', '0.2em solid #e8e8e8'); }
                        );
                    });
                </script>
                <div class="daily_widgets_icon">
                  <i class = "icon-truck daily_widgets_icon1 daily_widget_4_color"> </i>   
                </div>
                <div class="daily_widgets_data">
                  <span class = "daily_widgets_price daily_widget_4_color"> <?php echo sr_number_format($count_order_fulfillment_today[0],$sr_decimal_places); ?>   <i class="<?php echo $imgurl_order_fulfillment; ?>"></i>   <span class = "daily_widgets_comp_price daily_widget_4_color"> <?php $diff = (!empty($diff_order_fulfillment)) ? sr_number_format($diff_order_fulfillment,$sr_decimal_places) : ""; echo $diff;?> </span> </span>
                  <p class="daily_widgets_text"> Orders To Fulfill </p>
                </div>
            </div>
    </div>
    <?php }?>
    </div>
</div>

<!-- 
// ================================================
// Cumm Widgets
// ================================================
 -->

<!-- 
// ================================================
// Cumm Sales Widget
// ================================================
 -->

<div id="container">

 <div id="sr_cumm_total_discount" class="cumm_widget">

    <div id="sr_cumm_total_discount_value" style="height:60px;width:100%;">
          <div class="cumm_header">
              <i class="icon-location-arrow icon_cumm_widgets" ></i>
              <!-- <i class="icon-rocket icon_cumm_widgets" ></i> -->
              Discounts
          </div>
          <div id="sr_cumm_total_discount_total" class="cumm_total">
              <span id ="sr_cumm_total_discount_actual"> </span>  <i id="sr_cumm_total_discount_indicator" ></i> <span id ="diff_cumm_total_discount" style="font-size : 0.5em;"></span>
          </div>    
    </div>
    
    <div id="sr_cumm_total_discount_graph" class="sr_cumm_sales_graph ">  </div>   

</div>

 <div id="sr_cumm_sales" class="cumm_widget">

    <div id="sr_cumm_sales_value" style="height:60px;width:100%;">
          <div class="cumm_header">
              <i class="icon-bar-chart icon_cumm_widgets" ></i>
              Sales
          </div>
          <div id="sr_cumm_sales_total" class="cumm_total">
              <span id ="sr_cumm_sales_actual"> </span>  <i id="sr_cumm_sales_indicator" ></i> <span id ="diff_cumm_sales" style="font-size : 0.5em;"></span>
          </div>    
    </div>
    
    <div id="sr_cumm_sales_graph" class="sr_cumm_sales_graph ">
    <script type="text/javascript"> 
        
        // ================================================================================
        // Code to override the Jqplot Functionality to display only one marker
        // ================================================================================

        $.jqplot.LineRenderer.prototype.draw = function(ctx, gd, options, plot) {
        var i;
        // get a copy of the options, so we don't modify the original object.
        var opts = $.extend(true, {}, options);
        var shadow = (opts.shadow != undefined) ? opts.shadow : this.shadow;
        var showLine = (opts.showLine != undefined) ? opts.showLine : this.showLine;
        var fill = (opts.fill != undefined) ? opts.fill : this.fill;
        var fillAndStroke = (opts.fillAndStroke != undefined) ? opts.fillAndStroke : this.fillAndStroke;
        var xmin, ymin, xmax, ymax;
        ctx.save();
        if (gd.length) {
            if (showLine) {
                // if we fill, we'll have to add points to close the curve.
                if (fill) {
                    if (this.fillToZero) { 
                        // have to break line up into shapes at axis crossings
                        var negativeColor = this.negativeColor;
                        if (! this.useNegativeColors) {
                            negativeColor = opts.fillStyle;
                        }
                        var isnegative = false;
                        var posfs = opts.fillStyle;
                    
                        // if stoking line as well as filling, get a copy of line data.
                        if (fillAndStroke) {
                            var fasgd = gd.slice(0);
                        }
                        // if not stacked, fill down to axis
                        if (this.index == 0 || !this._stack) {
                        
                            var tempgd = [];
                            var pd = (this.renderer.smooth) ? this.renderer._smoothedPlotData : this._plotData;
                            this._areaPoints = [];
                            var pyzero = this._yaxis.series_u2p(this.fillToValue);
                            var pxzero = this._xaxis.series_u2p(this.fillToValue);

                            opts.closePath = true;
                            
                            if (this.fillAxis == 'y') {
                                tempgd.push([gd[0][0], pyzero]);
                                this._areaPoints.push([gd[0][0], pyzero]);
                                
                                for (var i=0; i<gd.length-1; i++) {
                                    tempgd.push(gd[i]);
                                    this._areaPoints.push(gd[i]);
                                    // do we have an axis crossing?
                                    if (pd[i][1] * pd[i+1][1] < 0) {
                                        if (pd[i][1] < 0) {
                                            isnegative = true;
                                            opts.fillStyle = negativeColor;
                                        }
                                        else {
                                            isnegative = false;
                                            opts.fillStyle = posfs;
                                        }
                                        
                                        var xintercept = gd[i][0] + (gd[i+1][0] - gd[i][0]) * (pyzero-gd[i][1])/(gd[i+1][1] - gd[i][1]);
                                        tempgd.push([xintercept, pyzero]);
                                        this._areaPoints.push([xintercept, pyzero]);
                                        // now draw this shape and shadow.
                                        if (shadow) {
                                            this.renderer.shadowRenderer.draw(ctx, tempgd, opts);
                                        }
                                        this.renderer.shapeRenderer.draw(ctx, tempgd, opts);
                                        // now empty temp array and continue
                                        tempgd = [[xintercept, pyzero]];
                                        // this._areaPoints = [[xintercept, pyzero]];
                                    }   
                                }
                                if (pd[gd.length-1][1] < 0) {
                                    isnegative = true;
                                    opts.fillStyle = negativeColor;
                                }
                                else {
                                    isnegative = false;
                                    opts.fillStyle = posfs;
                                }
                                tempgd.push(gd[gd.length-1]);
                                this._areaPoints.push(gd[gd.length-1]);
                                tempgd.push([gd[gd.length-1][0], pyzero]); 
                                this._areaPoints.push([gd[gd.length-1][0], pyzero]); 
                            }
                            // now draw the last area.
                            if (shadow) {
                                this.renderer.shadowRenderer.draw(ctx, tempgd, opts);
                            }
                            this.renderer.shapeRenderer.draw(ctx, tempgd, opts);
                            
                            
                            // var gridymin = this._yaxis.series_u2p(0);
                            // // IE doesn't return new length on unshift
                            // gd.unshift([gd[0][0], gridymin]);
                            // len = gd.length;
                            // gd.push([gd[len - 1][0], gridymin]);                   
                        }
                        // if stacked, fill to line below 
                        else {
                            var prev = this._prevGridData;
                            for (var i=prev.length; i>0; i--) {
                                gd.push(prev[i-1]);
                                // this._areaPoints.push(prev[i-1]);
                            }
                            if (shadow) {
                                this.renderer.shadowRenderer.draw(ctx, gd, opts);
                            }
                            this._areaPoints = gd;
                            this.renderer.shapeRenderer.draw(ctx, gd, opts);
                        }
                    }
                    /////////////////////////
                    // Not filled to zero
                    ////////////////////////
                    else {                    
                        // if stoking line as well as filling, get a copy of line data.
                        if (fillAndStroke) {
                            var fasgd = gd.slice(0);
                        }
                        // if not stacked, fill down to axis
                        if (this.index == 0 || !this._stack) {
                            // var gridymin = this._yaxis.series_u2p(this._yaxis.min) - this.gridBorderWidth / 2;
                            var gridymin = ctx.canvas.height;
                            // IE doesn't return new length on unshift
                            gd.unshift([gd[0][0], gridymin]);
                            var len = gd.length;
                            gd.push([gd[len - 1][0], gridymin]);                   
                        }
                        // if stacked, fill to line below 
                        else {
                            var prev = this._prevGridData;
                            for (var i=prev.length; i>0; i--) {
                                gd.push(prev[i-1]);
                            }
                        }
                        this._areaPoints = gd;
                        
                        if (shadow) {
                            this.renderer.shadowRenderer.draw(ctx, gd, opts);
                        }
            
                        this.renderer.shapeRenderer.draw(ctx, gd, opts);                        
                    }
                    if (fillAndStroke) {
                        var fasopts = $.extend(true, {}, opts, {fill:false, closePath:false});
                        this.renderer.shapeRenderer.draw(ctx, fasgd, fasopts);
                        //////////
                        // TODO: figure out some way to do shadows nicely
                        // if (shadow) {
                        //     this.renderer.shadowRenderer.draw(ctx, fasgd, fasopts);
                        // }
                        // now draw the markers
                        if (this.markerRenderer.show) {
                            if (this.renderer.smooth) {
                                fasgd = this.gridData;
                            }
                              var i1= fasgd.length - 1;
                              this.markerRenderer.draw(fasgd[i1][0], fasgd[i1][1], ctx, opts.markerOptions);
                            
                        }
                    }
                }
                else {

                    if (this.renderer.bands.show) {
                        var bdat;
                        var bopts = $.extend(true, {}, opts);
                        if (this.renderer.bands.showLines) {
                            bdat = (this.renderer.smooth) ? this.renderer._hiBandSmoothedData : this.renderer._hiBandGridData;
                            this.renderer.shapeRenderer.draw(ctx, bdat, opts);
                            bdat = (this.renderer.smooth) ? this.renderer._lowBandSmoothedData : this.renderer._lowBandGridData;
                            this.renderer.shapeRenderer.draw(ctx, bdat, bopts);
                        }

                        if (this.renderer.bands.fill) {
                            if (this.renderer.smooth) {
                                bdat = this.renderer._hiBandSmoothedData.concat(this.renderer._lowBandSmoothedData.reverse());
                            }
                            else {
                                bdat = this.renderer._hiBandGridData.concat(this.renderer._lowBandGridData.reverse());
                            }
                            this._areaPoints = bdat;
                            bopts.closePath = true;
                            bopts.fill = true;
                            bopts.fillStyle = this.renderer.bands.fillColor;
                            this.renderer.shapeRenderer.draw(ctx, bdat, bopts);
                        }
                    }

                    if (shadow) {
                        this.renderer.shadowRenderer.draw(ctx, gd, opts);
                    }
    
                    this.renderer.shapeRenderer.draw(ctx, gd, opts);
                }
            }
            // calculate the bounding box
            var xmin = xmax = ymin = ymax = null;
            for (i=0; i<this._areaPoints.length; i++) {
                var p = this._areaPoints[i];
                if (xmin > p[0] || xmin == null) {
                    xmin = p[0];
                }
                if (ymax < p[1] || ymax == null) {
                    ymax = p[1];
                }
                if (xmax < p[0] || xmax == null) {
                    xmax = p[0];
                }
                if (ymin > p[1] || ymin == null) {
                    ymin = p[1];
                }
            }

            if (this.type === 'line' && this.renderer.bands.show) {
                ymax = this._yaxis.series_u2p(this.renderer.bands._min);
                ymin = this._yaxis.series_u2p(this.renderer.bands._max);
            }

            this._boundingBox = [[xmin, ymax], [xmax, ymin]];
        
            // now draw the markers
            if (this.markerRenderer.show && !fill) {
                if (this.renderer.smooth) {
                    gd = this.gridData;
                }
                    var i1= gd.length - 1;
                    this.markerRenderer.draw(gd[i1][0], gd[i1][1], ctx, opts.markerOptions);

            }
        }
        
        ctx.restore();
    };
    
    // ================================================================================


    var sales_trend = new Array();
    var sales_trend1 = "1";   

    //Function to handle the css of the widgets on window resize

    var widget_resize = function () {
        var docHeight = $(document).height();
        var scroll    = $(window).height() ;//+ $(window).scrollTop();
        if (docHeight > scroll) {
            //Date Picker

            $('#sr_cumm_date').css('width','98.35%');

            //Daily Widgets

            $("#daily_widget_1").css('margin-left','0em');
            $("#daily_widget_1").css('margin-top','0em');
            $("#daily_widget_1").css('margin-right','1.55em');

            $("#daily_widget_2").css('margin-top','0em');
            $("#daily_widget_2").css('margin-right','1.55em');

            $("#daily_widget_3").css('margin-top','0em');
            $("#daily_widget_3").css('margin-right','1.55em');

            $("#daily_widget_4").css('margin-top','0em');
            $("#daily_widget_4").css('margin-right','1.55em');

            //Cumm Widgets

            $("#sr_cumm_sales").css('margin-right','1.5em');
            $("#sr_cumm_sales").css('margin-left','0em');
            $("#sr_cumm_top_prod").css('margin-right','1.5em');
            $("#sr_cumm_top_prod").css('margin-left','0em');

        }
        else {
            
            //Date Picker

            $('#sr_cumm_date').css('width','97.85%');

            //Daily Widgets

            $("#daily_widget_1").css('margin-left','0.25em');
            $("#daily_widget_1").css('margin-top','0.29em');
            $("#daily_widget_1").css('margin-right','1.8em');

            $("#daily_widget_2").css('margin-top','0.29em');
            $("#daily_widget_2").css('margin-right','1.8em');

            $("#daily_widget_3").css('margin-top','0.29em');
            $("#daily_widget_3").css('margin-right','1.8em');

            $("#daily_widget_4").css('margin-top','0.29em');
            $("#daily_widget_4").css('margin-right','1.8em');

            //Cumm Widgets

            $("#sr_cumm_sales").css('margin-right','1.8em');
            $("#sr_cumm_sales").css('margin-left','0.35em');
            $("#sr_cumm_top_prod").css('margin-right','1.8em');
            $("#sr_cumm_top_prod").css('margin-left','0.35em');
            
        }
    };


    var jqplot_flag = 0; // Flag to handle jqplot margin settings

    $(document).ready(function() {
        jqplot_flag = 1;
    });

    var font_size_default = $('body').css('font-size');

    if ( !$(document.body).hasClass('folded') ) {

        jqplot_flag = 2;

        $('#sr_cumm_date1').css('width','21em');
        $('#sr_cumm_sales_graph, #sr_cumm_total_discount_graph').removeClass('sr_cumm_sales_graph_collapsed');
        $('#sr_cumm_sales_graph, #sr_cumm_total_discount_graph').addClass('sr_cumm_sales_graph_not_collapsed');

        if(screen.width >= 1001 && screen.width <= 1150) {
            $('body').css('font-size','0.655em');    
        }
        else if(screen.width >= 1151 && screen.width <= 1300) {

        }
        else if(screen.width >= 1301) {
            $('body').css('font-size','1.1em');       
        }
    }
    else {

        jqplot_flag = 2;

        $('#sr_cumm_sales_graph, #sr_cumm_total_discount_graph').css("margin-top","-0.95em");
        $('#sr_cumm_date1').css('width','20.8em');
        $('#sr_cumm_sales_graph, #sr_cumm_total_discount_graph').removeClass('sr_cumm_sales_graph_not_collapsed');
        $('#sr_cumm_sales_graph, #sr_cumm_total_discount_graph').addClass('sr_cumm_sales_graph_collapsed');

        if(screen.width >= 1001 && screen.width <= 1150) {
            $('body').css('font-size','0.745em');
        }
        else if(screen.width >= 1151 && screen.width <= 1300) {
            $('body').css('font-size','0.88em');
        }
        else if(screen.width >= 1301) {
            $('body').css('font-size','1.2em');       
        }
    }

    //Code to handle the resizing of the widgets on folding and unfolding of the wordpress menu
    $(function(){
        $('#collapse-menu').click(function(){

            jqplot_flag = 0;

            if ( $(document.body).hasClass('folded') ) {

                // $('#sr_cumm_sales_graph, #sr_cumm_total_discount_graph').removeClass('folded_height');
                $('#sr_cumm_sales_graph, #sr_cumm_total_discount_graph').removeAttr('style');
                $('#sr_cumm_sales_graph, #sr_cumm_total_discount_graph').css("margin-top","-2.75em");
                $('#sr_cumm_sales_graph, #sr_cumm_total_discount_graph').removeClass('sr_cumm_sales_graph_collapsed');
                $('#sr_cumm_sales_graph, #sr_cumm_total_discount_graph').addClass('sr_cumm_sales_graph_not_collapsed');
                $('#sr_cumm_date1').css('width','21em');

                if(screen.width >= 1001 && screen.width <= 1150) {
                    $('body').css('font-size','0.655em');    
                }
                else if(screen.width >= 1151 && screen.width <= 1300) {

                }
                else if(screen.width >= 1301) {
                    $('body').css('font-size','1.1em');       
                }
                
            }
            else {            

                $('#sr_cumm_sales_graph, #sr_cumm_total_discount_graph').removeAttr('style');
                $('#sr_cumm_sales_graph, #sr_cumm_total_discount_graph').removeClass('sr_cumm_sales_graph_not_collapsed');
                $('#sr_cumm_sales_graph, #sr_cumm_total_discount_graph').addClass('sr_cumm_sales_graph_collapsed');
                $('#sr_cumm_date1').css('width','20.8em');

                if(screen.width >= 1001 && screen.width <= 1150) {
                    $('body').css('font-size','0.745em');
                }
                else if(screen.width >= 1151 && screen.width <= 1300) {
                    $('body').css('font-size','0.88em');
                }
                else if(screen.width >= 1301) {
                    $('body').css('font-size','1.2em');       
                }
                
            }

            //Code to replot the jqPlot graphs
            monthly_display(myJsonObj);
            top_prod_display(myJsonObj);
            sr_cumm_total_discount_display(myJsonObj);
        });
    });
       

    //Javascript function to handles Sales Figures
    var sr_cumm_number_format = function (number) {

        var decPlaces = <?php echo $sr_decimal_places;?>;
        // 2 decimal places => 100, 3 => 1000, etc
        decPlaces = Math.pow(10,decPlaces);

        // Enumerate number abbreviations
        var abbrev = [ "k", "m", "b", "t" ];

        // Go through the array backwards, so we do the largest first
        for (var i=abbrev.length-1; i>=0; i--) {

            // Convert array index to "1000", "1000000", etc
            var size = Math.pow(10,(i+1)*3);

            // If the number is bigger or equal do the abbreviation
            if(size <= number) {
                 // Here, we multiply by decPlaces, round, and then divide by decPlaces.
                 // This gives us nice rounding to a particular decimal place.
                 number = Math.round(number*decPlaces/size)/decPlaces;

                 // Handle special case where we round up to the next abbreviation
                 if((number == 1000) && (i < abbrev.length - 1)) {
                     number = 1;
                     i++;
                 }

                 // Add the letter for the abbreviation
                 number += abbrev[i];

                 // We are done... stop
                 break;
            }
        }

        return number;

    }

    //Function to handle the tooltip formatting for the Cumm Sales Widget
    var tickFormatter = function (format , number) {
        var currency_symbol = '<?php echo $sr_currency_symbol;?>';
        number = sr_cumm_number_format(number);
        return currency_symbol + number;
    };

    //Function to handle the tooltip formatting for the Top gateway widget count graph
    var tickFormatter_top_gateway_sales_count = function (format , number) {
        number = sr_cumm_number_format(number);
        return 'No. of Orders: ' + number;
    };


    //Function to handle the tooltip formatting for the Top Abandoned Products widget graph
    var tickFormatter_top_abandoned_prod_graph = function (format , number) {
        number = sr_cumm_number_format(number);
        return 'Count: ' + number;
    };

    //Function to handle the tooltip formatting for the Top 5 Products Widget
    var tickFormatter_top_prod = function (format , number) {
        var currency_stmbol = '<?php echo $sr_currency_symbol;?>';

        number = sr_cumm_number_format(number);
        
        if($('#sr_opt_top_prod_qty').is(':checked')) {
            return 'Qty: ' + number;
        }
        else {
            return currency_stmbol + number;
        }
    };
     
    var monthly_display = function(resp) {

        var sales_trend = new Array();
        
        var tick_format = resp['tick_format'];
        var currency_symbol = resp['currency_symbol'];
        
        jQuery('#sr_cumm_sales_graph').empty();

        if(resp['result_monthly_sales'].length > 0) {

            if ( (!$(document.body).hasClass('folded')) && jqplot_flag == 1) {                
                $('#sr_cumm_sales_graph, #sr_cumm_total_discount_graph').removeAttr('style');
                $('#sr_cumm_sales_graph, #sr_cumm_total_discount_graph').css("margin-top","-2.75em");
            }
            else if (($(document.body).hasClass('folded')) && jqplot_flag == 1) {
                $('#sr_cumm_sales_graph, #sr_cumm_total_discount_graph').removeAttr('style');
            }

            $('#sr_cumm_sales_graph').removeClass().addClass('sr_cumm_sales_graph_not_collapsed sr_cumm_sales_graph');

            for(var i = 0, len = resp['result_monthly_sales'].length; i < len; i++) {
                sales_trend[i] = new Array();
                sales_trend[i][0] = resp['result_monthly_sales'][i].post_date;
                sales_trend[i][1] = resp['result_monthly_sales'][i].sales;
            }

            jQuery.jqplot('sr_cumm_sales_graph',  [sales_trend], {
            axes: {
                 yaxis: {  
                      tickOptions: {
                      formatter: tickFormatter,
                    },
                     showTicks: false,
                     min:-resp['cumm_max_sales']/4,
                     max: resp['cumm_max_sales'] + resp['cumm_max_sales']/4
                 } ,
                xaxis: {                    
                    renderer:$.jqplot.DateAxisRenderer, 
                    tickOptions:{formatString:tick_format},
                    showTicks: false,
                    min: resp['cumm_sales_min_date'],
                    max: resp['cumm_sales_max_date']
                }
            },
            axesDefaults: {
                rendererOptions: {
                    baselineWidth: 1.5,
                    drawBaseline: false // property to hide the axes from the graph
                }
                  
            },
            // actual grid outside the graph
            grid: {
                drawGridlines: false,
                backgroundColor: 'transparent',
                borderWidth: 0,
                shadow: false

            },
            
            highlighter: {
                show: true,
                sizeAdjust: 0.8,
                tooltipLocation: 'ne'
            },
            cursor: {
              show: false
            },
            series: [
                    { markerOptions: { style:"filledCircle" } },

            ],
            animate: true,
            animateReplot : true,
            seriesDefaults: {
                showTooltip:true,
                rendererOptions: {smooth: true},
                lineWidth: 2,
                color : '#368ee0',
                fillToZero: true,
                useNegativeColors: false,
                fillAndStroke: true,
                fillColor: '#85D1F9',
                showMarker:true,
                showLine: true // shows the graph trend line
            }
        }
        );
        }

        else {
            $('#sr_cumm_sales_graph').removeClass();            
            $('#sr_cumm_sales_graph').text('No Data');
            $('#sr_cumm_sales_graph').addClass('no_data_text');
            $('#sr_cumm_sales_graph').css('margin-top','5.4em');
        }
    }

    //Code to handle the display of the tooltips
    $(function() {
        $('#sr_cumm_sales_graph').on('jqplotMouseMove', 
            function (ev, seriesIndex, pointIndex, data) {
              if( data ) {
                $('#sr_cumm_sales_graph .jqplot-highlight-canvas').css('display','block');
                $('#sr_cumm_sales_graph .jqplot-highlighter-tooltip').css('display','block');
                $('#sr_cumm_sales_graph .jqplot-highlighter-tooltip').css('background','#E0DCDC');
                $('#sr_cumm_sales_graph .jqplot-highlighter-tooltip').css('border','1px solid #E0DCDC');
                $('#sr_cumm_sales_graph .jqplot-highlighter-tooltip').css('font-size','1.1em');
                $('#sr_cumm_sales_graph .jqplot-highlighter-tooltip').css('font-weight','500');

              }
              else {
                $('#sr_cumm_sales_graph .jqplot-highlight-canvas').css('display','none');
                $('#sr_cumm_sales_graph .jqplot-highlighter-tooltip').css('display','none'); 
              }
            }
        );

        $('#sr_cumm_sales_graph').on('jqplotMouseLeave', 
           function (ev, seriesIndex, pointIndex, data) {
              $('#sr_cumm_sales_graph .jqplot-highlight-canvas').css('display','none');
              $('#sr_cumm_sales_graph .jqplot-highlighter-tooltip').css('display','none');
           }
        );

    });
    
     </script>
</div>
</div>

<!-- 
// ================================================
// Top Customer & Coupons Widget
// ================================================
 -->

<!-- <div id="sr_cumm_top_cust_coupons" class="cumm_widget"> -->

    <!-- 
    // ================================================
    // Top Customer Widget
    // ================================================
     -->

    <!-- <div id="sr_cumm_top_cust" class="cumm_widget_top_cust">     -->

<div id = "sr_cumm_top_cust_coupons" class="cumm_widget_top_cust_coupons">


    <!-- 
// ================================================
// Avg. Order Total & Avg. Order Items Widget
// ================================================
 -->
    
    <div id="sr_cumm_avg_order_tot" class = "sr_cumm_small_widget">
        <div id="sr_cumm_avg_order_tot_value" class="average_order_total_amt">
            <div id="sr_cumm_avg_order_tot_content" class="sr_cumm_small_widget_content"></div>
            <p id="average_order_tot_title" class="average_order_total_text"> Avg Order Total </p>
        </div>
    </div>


    <div id="sr_cumm_avg_order_count" class = "sr_cumm_small_widget">
        <div id="sr_cumm_avg_order_items_value" class="average_order_total_amt">
            <div id="sr_cumm_avg_order_items_content" class="sr_cumm_small_widget_content"> </div>
            <p id="average_order_items_title" class="average_order_items_text"> Avg Items Per Customer </p>
        </div>
    </div>

    <!-- 
// ================================================
// Cart Abandonment Rate
// ================================================
 -->

    <div id="sr_cumm_cart_abandanment" class = "sr_cumm_small_widget" style = "margin-right: 1.68em;">
        <div id="sr_cumm_cart_abandanment_rate" class="average_order_total_amt">
            <div id="sr_cumm_cart_abandanment_content" class="sr_cumm_small_widget_content"></div>
            <p id="sr_cumm_cart_abandanment_title" class="average_order_items_text"> Cart Abandanment Rate </p>
        </div>
    </div>

<!-- 
// ================================================
// % Of Orders Containing Coupons
// ================================================
 -->

    <div id="sr_cumm_order_coupons_count" class = "sr_cumm_small_widget" style = "margin-right: 1.64em">
        <div id="sr_cumm_order_coupons_value" class="average_order_total_amt">
            <div id="sr_cumm_order_coupons_content" class="sr_cumm_small_widget_content"></div>
            <p id="average_order_items_title" class="average_order_items_text"> Sales with Coupons </p>
        </div>
    </div>


<!-- 
// ================================================
// % Top Customers Widget
// ================================================
 -->

    <div id="sr_cumm_top_cust" class="cumm_widget" style="height: 12.5em;" >    
          <!-- <div class="cumm_header_top_cust_coupons" style="width: 55%; margin-top: 0.25em" > -->
          <div class="cumm_header">
              <i class = "icon-group icon_cumm_widgets"> </i>     

              Top Customers
          
          </div>

          <div id = "top_cust_data" class= "cumm_widget_table_data" >

          </div>
    </div>

        <script type="text/javascript">

        var display_orders = function (ids) {
            var post_ids = ids.split(",");
            document.cookie = "post_ids=" + post_ids;
        }


        var top_cust_display = function(resp) {
            var table_html = '<tr><th style="text-align:left;width:70%;"></th><th style="text-align:right;width:30%;"></th></tr> ';
            // var table_html = "";
            for (var i = 0; i < resp['top_cust_data'].length; i++) {
              var span_id = "span_top_cust_" + i;
              var link_id = "link_" + i;
              var cust_name = '';
              var cust_name_trimmed = "";
              var site_url = resp['siteurl'] + "/wp-admin/edit.php?s="+resp['top_cust_data'][i].billing_email+"&source=sr&post_status=all&post_type=shop_order&action=-1&m=0&shop_order_status&_customer_user&paged=1&mode=list&action2=-1";

              if (resp['top_cust_data'][i].name) {
                 cust_name = resp['top_cust_data'][i].name;
                 cust_name = cust_name.replace(/^\s+|\s+$/g,""); // Code for trimming the name  
              }
              
              if( cust_name ) {
                    cust_name = resp['top_cust_data'][i].name;
              }
              else {
                    cust_name = resp['top_cust_data'][i].billing_email;
              }

              if (cust_name.length >= 35) {
                  cust_name_trimmed = cust_name.substring(0,34) + "...";
              }
              else {
                  cust_name_trimmed = cust_name;
              }

              if (resp['top_cust_data'][i].name != " ") {
                  table_html += '<tr><td title = "'+ resp['top_cust_data'][i].name +'\n('+ resp['top_cust_data'][i].billing_email +')">'+ cust_name_trimmed +'</td><td align="right"><a id="'+link_id+'" href="'+site_url+'" target="_blank" onClick=display_orders('+resp['top_cust_data'][i].post_ids+')>'+resp['top_cust_data'][i].total+'</a></td></tr>';  
              }
              else {
                  table_html += '<tr><td title = "'+ resp['top_cust_data'][i].name +'('+ resp['top_cust_data'][i].billing_email +')">'+ cust_name_trimmed +'</td><td align="right"><a id="'+link_id+'" href="'+site_url+'" target="_blank" onClick=display_orders('+resp['top_cust_data'][i].post_ids+')>'+resp['top_cust_data'][i].total+'</a></td></tr>';  
              }

            };


            if(resp['top_cust_data'].length > 0 ) {
                $('#top_cust_data').removeAttr('style');
                $('#top_cust_data').removeClass('no_data_text');
                $('#top_cust_data').addClass('cumm_widget_table_data');
                $('#top_cust_data').html('<table id = "top_cust_table"  class = "cumm_widget_table_body" width = "100%">');
                jQuery('#top_cust_table').html(table_html);

            }
            else {
                $('#top_cust_data').text('No Data');
                $('#top_cust_data').removeClass('cumm_widget_table_data');
                $('#top_cust_data').addClass('no_data_text');
                $('#top_cust_data').css('margin-top','3.2em');
            }

          }

          </script>
        
        <!-- 
        // ================================================
        // Top Coupons Widget
        // ================================================
         -->

        <!-- <div id="sr_cumm_top_coupons" class="cumm_widget" style="margin-left:26.9em;height: 12.5em;margin-top: -12.8em;"> -->
        <div id="sr_cumm_top_coupons" class="cumm_widget" style="height: 12.5em;">

            <div class="cumm_header">
              <i class = "icon-tags icon_cumm_widgets"> </i>     
              Top Coupons
            </div>
            <div id = "sr_cumm_top_coupons_data" class= "cumm_widget_table_data" > </div>
        </div> 

        <script type = "text/javascript">

        var sr_top_coupons_display = function(resp) {
            var table_html = '<tr><th style="text-align:left;width:60%;"></th><th style="text-align:right;width:20%;"></th><th style="text-align:right;width:20%;"></th></tr> ';
            for (var i = 0; i < resp['top_coupon_data'].length; i++) {
              var span_id = "span_top_coupon_" + i;
              var link_id = "link_" + i;
              var coupon_name = '';
              var coupon_name_trimmed = "";
              var site_url = resp['siteurl'] + "/wp-admin/edit.php?s="+resp['top_coupon_data'][i].coupon_name+"&source=sr&post_status=all&post_type=shop_order&action=-1&m=0&shop_order_status&_customer_user&paged=1&mode=list&action2=-1";

              if (resp['top_coupon_data'][i].coupon_name) {
                 coupon_name = resp['top_coupon_data'][i].coupon_name;
                 coupon_name = coupon_name.replace(/^\s+|\s+$/g,""); // Code for trimming the name  
              }
              
              if (coupon_name.length >= 35) {
                  coupon_name_trimmed = coupon_name.substring(0,34) + "...";
              }
              else {
                  coupon_name_trimmed = coupon_name;
              }

              if (resp['top_coupon_data'][i].coupon_name != " ") {
                  table_html += '<tr><td title = "'+ resp['top_coupon_data'][i].coupon_name +'">'+ coupon_name_trimmed +'</td><td align="right">'+ resp['top_coupon_data'][i].coupon_amount +'</td><td align="right"><a id="'+link_id+'" href="'+site_url+'" target="_blank" onClick=display_orders('+resp['top_coupon_data'][i].order_ids+')>'+resp['top_coupon_data'][i].coupon_count+'</a></td></tr>';  
              }
              else {
                  table_html += '<tr><td title = "'+ resp['top_coupon_data'][i].coupon_name +'">'+ coupon_name_trimmed +'</td><td align="right">'+ resp['top_coupon_data'][i].coupon_amount +'</td><td align="right"><a id="'+link_id+'" href="'+site_url+'" target="_blank" onClick=display_orders('+resp['top_coupon_data'][i].order_ids+')>'+resp['top_coupon_data'][i].coupon_count+'</a></td></tr>';  
              }

            };


            if(resp['top_coupon_data'].length > 0 ) {
                $('#sr_cumm_top_coupons_data').removeAttr('style');
                $('#sr_cumm_top_coupons_data').removeClass('no_data_text');
                $('#sr_cumm_top_coupons_data').addClass('cumm_widget_table_data');
                $('#sr_cumm_top_coupons_data').html('<table id = "top_coupon_table"  class = "cumm_widget_table_body" width="100%">');
                jQuery('#top_coupon_table').html(table_html);

            }
            else {
                $('#sr_cumm_top_coupons_data').text('No Data');
                $('#sr_cumm_top_coupons_data').removeClass('cumm_widget_table_data');
                $('#sr_cumm_top_coupons_data').addClass('no_data_text');
                $('#sr_cumm_top_coupons_data').css('margin-top','3.2em');
            }

          }

        </script>
</div>
<!-- 
// ================================================
// Top Products Widget
// ================================================
 -->

<div id="sr_cumm_top_prod" class="cumm_widget">    
    <div id="sr_cumm_top_prod_check" style="height:100%;width:100%;">
      <script type="text/javascript">

        //Funciton to handle the graph display part for Top Products Widget
        var top_prod_graph_display = function (display_data,tick_format,tick_format_yaxis,top_prod_data,min_date,max_date,plot_nm) {

            for(var i = 0, len = display_data.length; i < len; i++){

                  var plot = plot_nm + i;

                  jQuery('#'+plot+'').empty(); // Making the plot as empty

                  jQuery.jqplot(plot,  [display_data[i]], {
                      axes: {
                           yaxis: {
                               tickOptions: {
                                formatter: tick_format_yaxis
                               },
                               showTicks: false,
                               min: -top_prod_data[i]/3,
                               max: top_prod_data[i] + top_prod_data[i]/3
                           } ,
                          xaxis: {
                              renderer:$.jqplot.DateAxisRenderer, 
                              tickOptions:{formatString:tick_format},
                              showTicks: false,
                              min: min_date,
                              max: max_date
                          }
                      },
                      axesDefaults: {
                          rendererOptions: {
                              baselineWidth: 1.5,
                              drawBaseline: false // property to hide the axes from the graph
                          }
                      },
                      // actual grid outside the graph
                      grid: {
                          drawGridlines: false,
                          backgroundColor: 'transparent',
                          borderWidth: 0,
                          shadow: false
                      },
                      
                      highlighter: {
                          show: true,
                          sizeAdjust: 0.01,
                          lineWidthAdjust : 0.1,
                          tooltipLocation: 'ne'
                      },
                      cursor: {
                        show: false
                      },
                      series: [
                              { markerOptions: { style:"filledCircle" } },

                      ],
                      animate: true,
                      animateReplot : true,
                      seriesDefaults: {
                          showTooltip:true,
                          rendererOptions: {smooth: true},
                          lineWidth:  1.5,
                          color : '#368ee0',
                          fillAndStroke: true,
                          fillColor: '#85D1F9',
                          fillToZero: true,
                          useNegativeColors: false,
                          showMarker:false,
                          showLine: true // shows the graph trend line
                      }
                  }
                  );
              }
          }

        //Function to sending the AJAX request on click of the Toggle Button
        var get_top_prod_graph_data = function (opt_id) {

              $.ajax({
                    type : 'POST',
                    url : '<?php echo WP_PLUGIN_URL.'/smart-reporter-for-wp-e-commerce/sr/json-woo.php'; ?>',
                    dataType:"text",
                    async: false,
                    action: 'get_monthly_sales',
                    data: {
                                cmd: 'monthly',
                                top_prod_option: opt_id,
                                option : 1,
                                start_date : $("#startdate").val(),
                                end_date : $("#enddate").val(),
                                
                    },
                    success: function(response) {
                        var myJsonObj    = $.parseJSON(response);
                        var top_prod_graph_data = new Array();
                        var tick_format_yaxis;
                        var top_prod_data = new Array();

                        if (opt_id == 'sr_opt_top_prod_price') {
                          tick_format_yaxis = '<?php echo $sr_currency_symbol;?>%s';
                        }
                        else {
                          tick_format_yaxis = 'Qty: %s';
                        }

                        for(var i = 0; i < myJsonObj['graph_data'].length; i++) { 
                            var len = myJsonObj['graph_data'][i]['graph_data'].length;
                            var graph_data = new Array();
                            for(var j = 0; j < len; j++){
                                graph_data[j] = new Array();
                                graph_data[j][0] = myJsonObj['graph_data'][i]['graph_data'][j].post_date;
                                graph_data[j][1] = myJsonObj['graph_data'][i]['graph_data'][j].sales;
                            }
                            top_prod_graph_data[i] = graph_data;
                            top_prod_data[i] = myJsonObj['graph_data'][i]['max_value'];
                        }
                        
                        if(top_prod_graph_data.length > 0) {
                            top_prod_graph_display(top_prod_graph_data,myJsonObj.tick_format,tickFormatter_top_prod,top_prod_data,myJsonObj['cumm_sales_min_date'],myJsonObj['cumm_sales_max_date'],'span_top_prod_');
                        }
                        else {
                            $('#top_prod_data').text('No Data');
                            $('#top_prod_data').addClass('no_data_text');
                            $('#top_prod_data').css('margin-top','6.7em');
                        }
                    }
                });
          }


          //Code to handle the display of the tooltips for the Top Products Widget

          // #sr_cumm_taxes_data,
          $(function() {
              $("div[id^='span_top_prod_'], div[id^='span_top_gateway_sales_amt_'], div[id^='span_top_gateway_sales_count_'], div[id^='span_top_abandoned_prod_']").live('jqplotMouseMove', 
                  function (ev, seriesIndex, pointIndex, data) {

                    var plot1 = '#' + this.id + ' .jqplot-highlight-canvas';
                    var plot2 = '#' + this.id + ' .jqplot-highlighter-tooltip';  

                    if (data) {
                        $( plot1 ).css('display','block');
                        $( plot2 ).css('display','block');  
                        $( plot2 ).css('background','#E0DCDC');
                        $( plot2 ).css('border','1px solid #E0DCDC');
                        $( plot2 ).css('font-size','1.1em');
                        $( plot2 ).css('font-weight','500');
                    }
                    else {
                        $( plot1 ).css('display','none');
                        $( plot2 ).css('display','none');
                    }

                  }
              );

              
                $("div[id^='span_top_prod_'], div[id^='span_top_gateway_sales_amt_'], div[id^='span_top_gateway_sales_count_'], div[id^='span_top_abandoned_prod_']").live('jqplotMouseLeave', 
                 function (ev, seriesIndex, pointIndex, data) {

                    var plot1 = '#' + this.id + ' .jqplot-highlight-canvas';
                    var plot2 = '#' + this.id + ' .jqplot-highlighter-tooltip';

                    $( plot1 ).css('display','none');
                    $( plot2 ).css('display','none');
                 }
              );
            


            //Code to handle the click events of the Toggle Button
            $("#sr_opt_top_prod_price").on( "click", function() {

                if ($("#sr_opt_top_prod_price").is(":checked")) {

                    if (!($('#sr_opt_top_prod_price_label').hasClass('switch-label-on'))) {

                        $('#sr_opt_top_prod_price_label').addClass('switch-label-on');
                        $('#sr_opt_top_prod_price_label').removeClass('switch-label-off');

                        $('#sr_opt_top_prod_qty_label').removeClass('switch-label-on');
                        $('#sr_opt_top_prod_qty_label').addClass('switch-label-off');

                        $("#top_prod_selection_toggle").css('left','0em');

                        $("#sr_opt_top_prod_qty").prop("checked",false);
                        $("#sr_opt_top_prod_price").prop("checked",true);

                        get_top_prod_graph_data('sr_opt_top_prod_price');
                    }
                    else {

                        $('#sr_opt_top_prod_price_label').addClass('switch-label-off');
                        $('#sr_opt_top_prod_price_label').removeClass('switch-label-on');

                        $('#sr_opt_top_prod_qty_label').removeClass('switch-label-off');
                        $('#sr_opt_top_prod_qty_label').addClass('switch-label-on');


                        $("#sr_opt_top_prod_qty").prop("checked",true);
                        $("#sr_opt_top_prod_price").prop("checked",false);

                        $("#top_prod_selection_toggle").css('left','2.0em');

                        get_top_prod_graph_data('sr_opt_top_prod_qty');
                    }

                    $('#sr_opt_top_prod_price_label').removeClass('switch-label_price');

                }

              });


              $("#sr_opt_top_prod_qty").click( function() {

                if ($("#sr_opt_top_prod_qty").is(":checked")) {
                    
                    if (!($('#sr_opt_top_prod_qty_label').hasClass('switch-label-on'))) {

                        $('#sr_opt_top_prod_qty_label').addClass('switch-label-on');
                        $('#sr_opt_top_prod_qty_label').removeClass('switch-label-off');

                        $('#sr_opt_top_prod_price_label').removeClass('switch-label-on');
                        $('#sr_opt_top_prod_price_label').addClass('switch-label-off');

                        $("#top_prod_selection_toggle").css('left','2.0em');

                        $("#sr_opt_top_prod_qty").prop("checked",true);
                        $("#sr_opt_top_prod_price").prop("checked",false);

                        get_top_prod_graph_data('sr_opt_top_prod_qty');
                    }
                    else {

                        $('#sr_opt_top_prod_qty_label').removeClass('switch-label-on');
                        $('#sr_opt_top_prod_qty_label').removeClass('switch-input:checked');

                        $('#sr_opt_top_prod_price_label').removeClass('switch-label-off');
                        $('#sr_opt_top_prod_price_label').addClass('switch-label-on');

                        $("#sr_opt_top_prod_qty").prop("checked",false);
                        $("#sr_opt_top_prod_price").prop("checked",true);

                        $("#top_prod_selection_toggle").css('left','0em');

                        get_top_prod_graph_data('sr_opt_top_prod_price');
                    }

                    $('#sr_opt_top_prod_price_label').removeClass('switch-label_price');

                }

              });

            });

        </script>

        <div class="cumm_header">
    
            <i class = "icon-star icon_cumm_widgets"> </i>     

            Top Products

                <div class="switch switch-blue">
                  <input type="radio" class="switch-input" name="top_prod_toggle_price_option_nm" value="sr_opt_top_prod_price" id="sr_opt_top_prod_price">
                  <label id="sr_opt_top_prod_price_label" for="sr_opt_top_prod_price" class="switch-label switch-label_price switch-label-on">Price</label>
                  <input type="radio" class="switch-input" name="top_prod_toggle_price_option_nm" value="sr_opt_top_prod_qty" id="sr_opt_top_prod_qty">
                  <label id="sr_opt_top_prod_qty_label" for="sr_opt_top_prod_qty" class="switch-label switch-label-off">Qty</label>
                  <span id="top_prod_selection_toggle" class="switch-selection"></span>
                </div>

        </div>

        <div id = "top_prod_data">
            
        </div>

    </div>

  <script type="text/javascript">

    //Function to handle the display part of the Top Products Widget
    var top_prod_display = function(resp) {
        var table_html = '<tr><th width=45%></th><th width=55%></th></tr> ';

        var tick_format = resp['tick_format'];
        var currency_symbol = resp['currency_symbol'];

        var tick_format_yaxis = "";

        if (jQuery('#sr_opt_top_prod_price').is(':checked') === true) {
          tick_format_yaxis = '<?php echo $sr_currency_symbol;?>%s';
        }
        else {
          tick_format_yaxis = 'Qty: %s';
        }

        var top_prod_graph_data = new Array();
        var top_prod_data = new Array();

        for (var i = 0; i < resp['top_prod_data'].length; i++) {
          var span_id = "span_top_prod_" + i;
          var prod_name = resp['top_prod_data'][i].product_name;
          var prod_name_trimmed = "";

          if (prod_name.length >= 25) {
              prod_name_trimmed = prod_name.substring(0,24) + "...";
          }
          else {
              prod_name_trimmed = prod_name;
          }

          table_html += '<tr><td><div id="'+span_id+'" class="sr_cumm_top_prod_graph"></div></td><td title = "'+prod_name+'"><b>'+prod_name_trimmed+'</b><br>'+resp['top_prod_data'][i].product_sales_display+'</td></tr> ';

          var graph_data = new Array();
          var len = resp['top_prod_data'][i].graph_data.length;

          for(var j = 0; j < len; j++){
              graph_data[j] = new Array();
              graph_data[j][0] = resp['top_prod_data'][i].graph_data[j].post_date;
              graph_data[j][1] = resp['top_prod_data'][i].graph_data[j].sales;
          }

          top_prod_graph_data[i] = graph_data;
          top_prod_data[i] = resp['top_prod_data'][i].max_value;

        };


        if(top_prod_graph_data.length > 0) {
            $('#top_prod_data').removeClass('no_data_text');
            $('#top_prod_data').removeAttr('style');
            $('#top_prod_data').html('<table id="top_prod_table" style="margin-top: 0.05em; width: 100%"> </table>');
            $('#top_prod_table').html(table_html);
            top_prod_graph_display(top_prod_graph_data,tick_format,tickFormatter_top_prod,top_prod_data,resp['cumm_sales_min_date'],resp['cumm_sales_max_date'],'span_top_prod_');    
        }
        else {
            $('#top_prod_data').text('No Data');
            $('#top_prod_data').addClass('no_data_text');
            $('#top_prod_data').css('margin-top','6.7em');
        }
        
      }
    
  </script>

</div>



<!-- 
// ================================================
// Total Discount Widget
// ================================================
 -->

<script type="text/javascript">

    var sr_cumm_total_discount_display = function(resp) {

        var discount_trend = new Array();
        
        var tick_format = resp['tick_format'];
        var currency_symbol = resp['currency_symbol'];

        jQuery('#sr_cumm_total_discount_graph').empty();

        if(resp['graph_cumm_discount_sales'].length > 0) {

            if ( (!$(document.body).hasClass('folded')) && jqplot_flag == 1) {
                $('#sr_cumm_sales_graph, #sr_cumm_total_discount_graph').removeAttr('style');
                $('#sr_cumm_sales_graph, #sr_cumm_total_discount_graph').css("margin-top","-2.75em");
            }
            else if (($(document.body).hasClass('folded')) && jqplot_flag == 1) {
                $('#sr_cumm_sales_graph, #sr_cumm_total_discount_graph').removeAttr('style');
            }
            else if(jqplot_flag != 2) {
                jqplot_flag = 1;
            }

            $('#sr_cumm_total_discount_graph').removeClass().addClass('sr_cumm_sales_graph_not_collapsed sr_cumm_sales_graph');

            for(var i = 0, len = resp['graph_cumm_discount_sales'].length; i < len; i++) {
                discount_trend[i] = new Array();
                discount_trend[i][0] = resp['graph_cumm_discount_sales'][i].post_date;
                discount_trend[i][1] = resp['graph_cumm_discount_sales'][i].sales;
            }

            jQuery.jqplot('sr_cumm_total_discount_graph',  [discount_trend], {
            axes: {
                 yaxis: {  
                      tickOptions: {
                      formatter: tickFormatter,
                    },
                     showTicks: false,
                     min:-resp['cumm_max_discount_total']/4,
                     max: resp['cumm_max_discount_total'] + resp['cumm_max_discount_total']/4
                 } ,
                xaxis: {                    
                    renderer:$.jqplot.DateAxisRenderer, 
                    tickOptions:{formatString:tick_format},
                    showTicks: false,
                    min: resp['cumm_sales_min_date'],
                    max: resp['cumm_sales_max_date']
                }
            },
            axesDefaults: {
                rendererOptions: {
                    baselineWidth: 1.5,
                    drawBaseline: false // property to hide the axes from the graph
                }
                  
            },
            // actual grid outside the graph
            grid: {
                drawGridlines: false,
                backgroundColor: 'transparent',
                borderWidth: 0,
                shadow: false

            },
            
            highlighter: {
                show: true,
                sizeAdjust: 0.8,
                tooltipLocation: 'ne'
            },
            cursor: {
              show: false
            },
            series: [
                    { markerOptions: { style:"filledCircle" } },

            ],
            animate: true,
            animateReplot : true,
            seriesDefaults: {
                showTooltip:true,
                rendererOptions: {smooth: true},
                lineWidth: 2,
                color : '#368ee0',
                fillToZero: true,
                useNegativeColors: false,
                fillAndStroke: true,
                fillColor: '#85D1F9',
                showMarker:true,
                showLine: true // shows the graph trend line
            }
        }
        );
        }

        else {
            $('#sr_cumm_total_discount_graph').removeClass();            
            $('#sr_cumm_total_discount_graph').text('No Data');
            $('#sr_cumm_total_discount_graph').addClass('no_data_text');
            $('#sr_cumm_total_discount_graph').css('margin-top','5.4em');
        }
    }

</script>

<!-- 
// ================================================
// Top Payment gateway Widget
// ================================================
 -->

<div id="sr_cumm_order_by_gateways" class="cumm_widget">    
    <div class="cumm_header">
      <i class="icon-credit-card icon_cumm_widgets" ></i>
      Payment Gateways
    </div>

    <div id = "sr_cumm_order_by_gateways_data">
            
    </div>

    <script type="text/javascript">

    //Function to handle the display part of the Top Gateway Widget
    var top_gateway_display = function(resp) {
        var table_html = '<tr><th width=25% class="top_gateways_header">Sales</th><th width=25% class="top_gateways_header">Qty</th><th width=50% class="top_gateways_header"></th></tr> ';

        var tick_format = resp['tick_format'];
        var currency_symbol = resp['currency_symbol'];

        var tick_format_yaxis_sales_amt_graph ='<?php echo $sr_currency_symbol;?>%s';
        var tick_format_yaxis_sales_count_graph = 'No. of Orders: %s';

        var top_gateway_graph_sales_amt_data = new Array();
        var top_gateway_graph_sales_count_data = new Array();

        var top_gateway_sales_amt_data  = new Array();
        var top_gateway_sales_count_data  = new Array();

        for (var i = 0; i < resp['top_gateway_data'].length; i++) {
          var span_id_sales_amt = "span_top_gateway_sales_amt_" + i;
          var span_id_sales_count = "span_top_gateway_sales_count_" + i;
          var gateway_name = resp['top_gateway_data'][i].payment_method;

          var link_id = "link_" + i;
          var site_url = resp['siteurl'] + "/wp-admin/edit.php?s="+resp['top_gateway_data'][i].payment_method+"&source=sr&post_status=all&post_type=shop_order&action=-1&m=0&shop_order_status&_customer_user&paged=1&mode=list&action2=-1";

          var gateway_name_trimmed = "";
          var gateway_sales_display = resp['top_gateway_data'][i].gateway_sales_display + ' • '
                                      + resp['top_gateway_data'][i].gateway_sales_percent + ' • '
                                      + '<a id="'+link_id+'" href="'+site_url+'" target="_blank" onClick=display_orders("'+resp['top_gateway_data'][i].order_ids+'")>' + resp['top_gateway_data'][i].sales_count + '</a>';
                                      

          if (gateway_name.length >= 25) {
              gateway_name_trimmed = gateway_name.substring(0,24) + "...";
          }
          else {
              gateway_name_trimmed = gateway_name;
          }

          table_html += '<tr><td><div id="'+span_id_sales_amt+'" class="sr_cumm_top_prod_graph"></div></td><td><div id="'+span_id_sales_count+'" class="sr_cumm_top_prod_graph"></div></td><td title = "'+gateway_name+'"><b>'+gateway_name_trimmed+'</b><br>'+gateway_sales_display+'</td></tr> ';

          var sales_amt_graph_data = new Array();
          var sales_count_graph_data = new Array();

          var sales_amt_len = resp['top_gateway_data'][i].graph_data_sales_amt.length;
          var sales_count_len = resp['top_gateway_data'][i].graph_data_sales_count.length;


          //Array for gateway sales amt.

          for(var j = 0; j < sales_amt_len; j++){
              sales_amt_graph_data[j] = new Array();
              sales_amt_graph_data[j][0] = resp['top_gateway_data'][i].graph_data_sales_amt[j].post_date;
              sales_amt_graph_data[j][1] = resp['top_gateway_data'][i].graph_data_sales_amt[j].sales;
          }
          
          //Array for gateway sales count
          for(var j = 0; j < sales_count_len; j++){
              sales_count_graph_data[j] = new Array();
              sales_count_graph_data[j][0] = resp['top_gateway_data'][i].graph_data_sales_count[j].post_date;
              sales_count_graph_data[j][1] = resp['top_gateway_data'][i].graph_data_sales_count[j].sales;
          }

          top_gateway_graph_sales_amt_data[i] = sales_amt_graph_data;
          top_gateway_graph_sales_count_data[i] = sales_count_graph_data;

          top_gateway_sales_amt_data[i] = resp['top_gateway_data'][i].max_value_sales_amt;
          top_gateway_sales_count_data[i] = resp['top_gateway_data'][i].max_value_sales_count;

        };


        if(top_gateway_graph_sales_amt_data.length > 0 && top_gateway_graph_sales_count_data.length > 0) {
            $('#sr_cumm_order_by_gateways_data').removeClass('no_data_text');
            $('#sr_cumm_order_by_gateways_data').removeAttr('style');
            $('#sr_cumm_order_by_gateways_data').html('<table id="top_gateway_table" style="margin-top: 0.05em; width: 100%"> </table>');
            $('#top_gateway_table').html(table_html);
            top_prod_graph_display(top_gateway_graph_sales_amt_data,tick_format,tickFormatter,top_gateway_sales_amt_data,resp['cumm_sales_min_date'],resp['cumm_sales_max_date'],'span_top_gateway_sales_amt_');    
            top_prod_graph_display(top_gateway_graph_sales_count_data,tick_format,tickFormatter_top_gateway_sales_count,top_gateway_sales_count_data,resp['cumm_sales_min_date'],resp['cumm_sales_max_date'],'span_top_gateway_sales_count_');    
        }
        else {
            $('#sr_cumm_order_by_gateways_data').text('No Data');
            $('#sr_cumm_order_by_gateways_data').addClass('no_data_text');
            $('#sr_cumm_order_by_gateways_data').css('margin-top','6.7em');
        }
        
      }
    
  </script>

</div>

<!-- 
// ================================================
// Taxes Widget
// ================================================
 -->

<div id="chartpseudotooltip"></div>

<div id="sr_cumm_taxes" class="cumm_widget">    
    <div class="cumm_header">
      <i class="icon-bolt icon_cumm_widgets" ></i>
      Taxes & Shipping
    </div>

    <!-- style="line-height: 0.75em; margin-top:2.17em;font-size:3.36em;" -->

    <!-- style="height:92%;width:100%" -->
    <!-- class="sr_cumm_sales_graph  -->


    <div id="sr_cumm_taxes_data" style="height:87%;width:100%">
      


    </div>

    <script type="text/javascript">

    //FUnction to round off the numbers
    function precise_round(num,decimals){
        return Math.round(num*Math.pow(10,decimals))/Math.pow(10,decimals);
    }

    //Function to handle the display part of the Top Gateway Widget
    var cumm_taxes_display = function(resp) {

        var taxes_data = new Array();

        jQuery('#sr_cumm_taxes_data').empty();
        

        if(resp['result_monthly_sales'].length > 0) {

            jQuery('#sr_cumm_taxes_data').empty();
            // jQuery('#sr_cumm_taxes_data').html('');
            
            // jQuery('#sr_cumm_taxes_data').css('width','100%');
            if ($('#sr_cumm_taxes_data').hasClass('no_data_text')) {
                $('#sr_cumm_taxes_data').removeClass('no_data_text');
                $('#sr_cumm_taxes_data').removeAttr('style');

                $('#sr_cumm_taxes_data').css('height' ,'87%');
                $('#sr_cumm_taxes_data').css('width' ,'100%');
            }
            
            // $('#sr_cumm_taxes_data.jqplot-table-legend').removeAttr('style');
            // $('#sr_cumm_taxes_data').css('margin-top','-6.5px');
            // $('#sr_cumm_taxes_data').removeAttr('style');

            


          taxes_data[0] = new Array();
          taxes_data[0][0] = 'Tax';
          taxes_data[0][1] = resp['cumm_taxes']['tax'];
          taxes_data[0][2] = precise_round((resp['cumm_taxes']['tax']/resp['cumm_taxes']['total_sales'])*100 , resp['decimal_places']) + '%';
    
          taxes_data[1] = new Array();
          taxes_data[1][0] = 'Shipping Tax';
          taxes_data[1][1] = resp['cumm_taxes']['shipping_tax'];
          taxes_data[1][2] = precise_round((resp['cumm_taxes']['shipping_tax']/resp['cumm_taxes']['total_sales'])*100 , resp['decimal_places']) + '%';

          taxes_data[2] = new Array();
          taxes_data[2][0] = 'Shipping';
          taxes_data[2][1] = resp['cumm_taxes']['shipping'];
          taxes_data[2][2] = precise_round((resp['cumm_taxes']['shipping']/resp['cumm_taxes']['total_sales'])*100, resp['decimal_places']) + '%';

          taxes_data[3] = new Array();
          taxes_data[3][0] = 'Net Sales';
          taxes_data[3][1] = resp['cumm_taxes']['net_sales'];
          taxes_data[3][2] = precise_round((resp['cumm_taxes']['net_sales']/resp['cumm_taxes']['total_sales'])*100 , resp['decimal_places']) + '%';


                jQuery.jqplot('sr_cumm_taxes_data',  [taxes_data], {
                    
                    grid: {
                        backgroundColor: 'transparent',
                        drawBorder: false,
                        shadow: false


                    },

                    gridPadding: {top:-6.5, bottom:47, left:0, right:0},
                    // gridPadding: {top:0, bottom:47, left:0, right:0},

                    series:[{startAngle: -90,
                          dataLabels: 'percent',
                          padding: 0, 
                          sliceMargin: 4}],


                    cursor: {
                      show: false
                    },

                    seriesDefaults: {
                        shadow: false,
                        
                        seriesColors: ['#04c0f0','#a6dba0','#e66101','#5e3c99'], // FINAL
                        
                        renderer: jQuery.jqplot.DonutRenderer,
                        rendererOptions: {
                            
                        }
                    },
                    legend: { 
                        show:true,
                        placement: 'outsideGrid',                      
                        rendererOptions: {
                            numberRows: 1
                        }, 
                        location: 's',
                        // marginTop: '-15px',
                        borderWidth: 0,
                        marginLeft: '0.8em'
                    }

                });

        } else {
            $('#sr_cumm_taxes_data').removeAttr('style');
            $('#sr_cumm_taxes_data').text('No Data');
            $('#sr_cumm_taxes_data').addClass('no_data_text');
            $('#sr_cumm_taxes_data').css('margin-top','6.7em');
        }
        
        

        $(function() {
            $('#sr_cumm_taxes_data').on('jqplotDataMouseOver', function (ev, seriesIndex, pointIndex, data) {


              var mouseX = ev.pageX - 150; //these are going to be how jquery knows where to put the div that will be our tooltip
              var mouseY = ev.pageY;
              $('#chartpseudotooltip').html( '<div>' + data[0] +': ' + resp['currency_symbol'] + data[1] + '</div> <div style:"text-align:center"> (' + data[2] + ')</div>'  );
              var cssObj = {
                  'position': 'absolute',
                  'font-weight': 'bold',
                  'left': mouseX + 'px', //usually needs more offset here
                  'top': mouseY + 'px',
                  'border' : '1px solid #6EADE7',
                  'background-color': 'white',
                  'font-size': '1.1em',
                  'font-weight': '500',
                  'z-index':'1'
              };
              $('#chartpseudotooltip').css(cssObj);
              $('#chartpseudotooltip').show();

          });

          $('#sr_cumm_taxes_data').on('jqplotDataUnhighlight', function (ev) {
              $('#chartpseudotooltip').empty().hide();
          });

      });


    }
    </script>
</div>

<!-- 
// ================================================
// Sales Funnel Widget
// ================================================
 -->

<div id="sr_cumm_sales_funnel" class="cumm_widget">    
    <div class="cumm_header">
      <i class="icon-filter icon_cumm_widgets" ></i>
      Sales Funnel
    </div>

    <!-- <div id="sr_cumm_sales_funnel_data" class="no_data_text" style="line-height: 0.75em; margin-top:2.17em;font-size:3.36em;"> -->
    <div id="sr_cumm_sales_funnel_data" style="height:87%;width:65%;margin-left:4.4em">
        
    </div>

    <script type="text/javascript">

    

    //Function to handle the display part of the Sales Funnel Widget
    var cumm_sales_funnel_display = function(resp) {

        jQuery('#sr_cumm_sales_funnel_data').empty();


        if ($('#sr_cumm_sales_funnel_data').hasClass('no_data_text')) {
            $('#sr_cumm_sales_funnel_data').removeClass('no_data_text');
            $('#sr_cumm_sales_funnel_data').removeAttr('style');

            $('#sr_cumm_sales_funnel_data').css('height' ,'87%');
            $('#sr_cumm_sales_funnel_data').css('width' ,'65%');
            $('#sr_cumm_sales_funnel_data').css('margin-left' ,'4.4em');
        }
       
        if(resp['cumm_sales_funnel'] != '') {

            jQuery('#sr_cumm_sales_funnel_data').empty();

            jQuery.jqplot('sr_cumm_sales_funnel_data',  [[['Added to Cart', resp['cumm_sales_funnel']['total_products_added_cart']],
                                                     ['Orders Placed', resp['cumm_sales_funnel']['products_purchased_count']],
                                                     ['Orders Completed',resp['cumm_sales_funnel']['products_sold_count']]]], {
                    
                    grid: {
                        backgroundColor: 'transparent',
                        drawBorder: false,
                        shadow: false
                    },

                    gridPadding: {top:-6.5, bottom:47, left:0, right:0},
                    // gridPadding: {top:0, bottom:47, left:0, right:0},

                        series:[{startAngle: -90,
                              dataLabels: 'percent',
                              padding: 0, 
                              sliceMargin: 4}],


                        cursor: {
                          show: false
                        },
                       
                       seriesDefaults: {
                           renderer: $.jqplot.FunnelRenderer,

                           shadow: false,
                        
                           seriesColors: ['#04c0f0','#a6dba0','#e69a01'], // FINAL

                             rendererOptions:{
                                     sectionMargin: 5,
                                     widthRatio: 0.3,
                                     showDataLabels: true,
                                    dataLabels: [[resp['cumm_sales_funnel']['total_cart_count']+' • '+resp['cumm_sales_funnel']['total_products_added_cart']],
                                                 [resp['cumm_sales_funnel']['orders_placed_count']+' • '+resp['cumm_sales_funnel']['products_purchased_count']],
                                                 [resp['cumm_sales_funnel']['orders_completed_count']+' • '+resp['cumm_sales_funnel']['products_sold_count']]]
                              }
                        },

                        legend: { 
                            show:true,
                            placement: 'outsideGrid',                      
                            rendererOptions: {
                                numberRows: 1,
                                
                            }, 
                            location: 's',
                            marginLeft: '-4.6em',
                            width: '31em'
                        }

                });

        } else {
            $('#sr_cumm_sales_funnel_data').removeAttr('style');
            $('#sr_cumm_sales_funnel_data').text('No Data');
            $('#sr_cumm_sales_funnel_data').addClass('no_data_text');
            $('#sr_cumm_sales_funnel_data').css('margin-top','6.7em');
        }

        


        $('.jqplot-table-legend-swatch').css({"-moz-border-radius": "50px/50px",
                                                "-webkit-border-radius": "50px 50px",
                                                "border-radius": "50px/50px",
                                                "border-width": "6px"
                                                });

        $('.jqplot-table-legend').css({"border": "0px solid #ccc"});

        var funnel_legend = ["Added to Cart","Orders Placed","Orders Completed"]; 

        $('td:contains("Added to Cart"), td:contains("Orders Placed")').css({"min-width": "7em"});
        $('td:contains("Orders Completed")').css({"min-width": "9em"});
        

        $(function(){
            $('#sr_cumm_sales_funnel_data').on('jqplotDataMouseOver', function (ev, seriesIndex, pointIndex, data) {

                    var tooltip_text_1 = "";

                    if (data[0] == "Added to Cart") {

                        tooltip_text_1 = resp['cumm_sales_funnel']['total_cart_count'] + " Carts";

                    } else if(data[0] == "Orders Placed") {

                        tooltip_text_1 = resp['cumm_sales_funnel']['orders_placed_count'] + " Orders Placed";

                    } else {

                        tooltip_text_1 = resp['cumm_sales_funnel']['orders_completed_count'] + " Orders Completed";

                    }


                  var mouseX = ev.pageX - 150; //these are going to be how jquery knows where to put the div that will be our tooltip
                  var mouseY = ev.pageY;
                  $('#chartpseudotooltip').html( '<div>' + tooltip_text_1 + '</div> <div>' + data[1] + " Products" + '</div>');
                  var cssObj = {
                      'position': 'absolute',
                      'font-weight': 'bold',
                      'left': mouseX + 'px', //usually needs more offset here
                      'top': mouseY + 'px',
                      'border' : '1px solid #6EADE7',
                      'background-color': 'white',
                      'font-size': '1.1em',
                      'font-weight': '500',
                      'z-index':'1'
                  };
                  $('#chartpseudotooltip').css(cssObj);
                  $('#chartpseudotooltip').show();

              });

              $('#sr_cumm_sales_funnel_data').on('jqplotDataUnhighlight', function (ev) {
                  $('#chartpseudotooltip').empty().hide();
              });
          });

    }

    </script>

</div>

<!-- 
// ================================================
// Top Abandoned Products Widget
// ================================================
 -->

<div id="sr_cumm_top_abandoned_products" class="cumm_widget">    
    <div class="cumm_header" style="padding:4px 0 8px 6px;">
      <i class="icon-shopping-cart"></i>
      <i class="icon-share-alt" style="vertical-align: super;margin-left:-0.7em"></i>
      Abandoned Products
    </div>

    <!-- <div id="sr_cumm_top_abandoned_products_data" class="no_data_text" style="line-height: 0.75em; margin-top:2.17em;font-size:3.36em;"> -->
    <div id = "sr_cumm_top_abandoned_products_data">
            
    </div>

    <script type="text/javascript">

    //Function to handle the display part of the Top Abandoned Products Widget
    var top_ababdoned_products_display = function(resp) {
        var table_html = '<tr><th width=40% class="top_gateways_header"></th><th width=60% class="top_gateways_header"></th></tr> ';

        var tick_format = resp['tick_format'];
        var currency_symbol = resp['currency_symbol'];

        var top_abandoned_prod_graph_data = new Array();
        var top_abandoned_prod_data = new Array();

        for (var i = 0; i < resp['cumm_top_abandoned_products'].length; i++) {
          var span_id_sales_amt = "span_top_abandoned_prod_" + i;
          var abandoned_prod_name = resp['cumm_top_abandoned_products'][i].prod_name;

          // var link_id = "link_" + i;
          // var site_url = resp['siteurl'] + "/wp-admin/edit.php?s="+resp['top_gateway_data'][i].payment_method+"&source=sr&post_status=all&post_type=shop_order&action=-1&m=0&shop_order_status&_customer_user&paged=1&mode=list&action2=-1";

          var abandoned_prod_name_trimmed = "";
          var abandoned_sales_display = resp['cumm_top_abandoned_products'][i].price + ' • '
                                      + resp['cumm_top_abandoned_products'][i].abandoned_rate + ' • '
                                      + resp['cumm_top_abandoned_products'][i].abondoned_qty;
                                      

          if (abandoned_prod_name.length >= 25) {
              abandoned_prod_name_trimmed = abandoned_prod_name.substring(0,24) + "...";
          }
          else {
              abandoned_prod_name_trimmed = abandoned_prod_name;
          }

          table_html += '<tr><td><div id="'+span_id_sales_amt+'" class="sr_cumm_top_prod_graph"></div></td><td title = "'+abandoned_prod_name+'"><b>'+abandoned_prod_name_trimmed+'</b><br>'+abandoned_sales_display+'</td></tr> ';

          var cumm_abandoned_graph_data = new Array();

          var cumm_abandoned_graph_data_len = resp['cumm_top_abandoned_products'][i].graph_data.length;


          //Array for cumm top abandoned product graph.

          for(var j = 0; j < cumm_abandoned_graph_data_len; j++){
              cumm_abandoned_graph_data[j] = new Array();
              cumm_abandoned_graph_data[j][0] = resp['cumm_top_abandoned_products'][i].graph_data[j].post_date;
              cumm_abandoned_graph_data[j][1] = resp['cumm_top_abandoned_products'][i].graph_data[j].sales;
          }
          
          top_abandoned_prod_graph_data[i] = cumm_abandoned_graph_data;

          top_abandoned_prod_data[i] = resp['cumm_top_abandoned_products'][i].abondoned_qty;

        };

        if(top_abandoned_prod_graph_data.length > 0) {
            $('#sr_cumm_top_abandoned_products_data').removeClass('no_data_text');
            $('#sr_cumm_top_abandoned_products_data').removeAttr('style');
            $('#sr_cumm_top_abandoned_products_data').html('<table id="top_abandoned_prod_table" style="margin-top: 0.05em; width: 100%"> </table>');
            $('#top_abandoned_prod_table').html(table_html);
            top_prod_graph_display(top_abandoned_prod_graph_data,tick_format,tickFormatter_top_abandoned_prod_graph,top_abandoned_prod_data,resp['cumm_sales_min_date'],resp['cumm_sales_max_date'],'span_top_abandoned_prod_');    
            
        }
        else {
            $('#sr_cumm_top_abandoned_products_data').text('No Data');
            $('#sr_cumm_top_abandoned_products_data').addClass('no_data_text');
            $('#sr_cumm_top_abandoned_products_data').css('margin-top','6.7em');
        }
        
      }
    
  </script>
</div>


<!-- 
// ================================================
// Date Picker Display
// ================================================
 -->

<div id="sr_cumm_date" style="height:2.1em;width:97.85%">
    <div id="sr_cumm_date1" class="sr_cumm_date">
        <form>
            <img id = "sr_endcal_icon" src= "<?php echo SR_IMG_DATE_PICKER?>" class = "sr_cumm_date_icon">
            <input type = "text" id="enddate_display" class = "sr_cumm_date_picker" >
            <label class = "sr_cumm_date_label"> To </label>

            <span>
               <img id = "sr_startcal_icon" src= "<?php echo SR_IMG_DATE_PICKER?>" class = "sr_cumm_date_icon">
                <input type ="text" id="startdate_display" class = "sr_cumm_date_picker" >
            </span>

            <span id ="startdate" style="padding-top: 2px;font-size : 1.4em; float:right; display: none"> </span>
            <span id ="enddate" style="padding-top: 2px;font-size : 1.4em; float:right; display: none"> </span>
            
        <script type="text/javascript">

                var myJsonObj = "";

              //Function to get the data for all the widgets on selection of any date
              var get_data = function () {
                  var opt_id;

                  if ($('#sr_opt_top_prod_price_label').hasClass('switch-label-on')) {
                      opt_id = "sr_opt_top_prod_price";
                  }
                  else {
                      opt_id = "sr_opt_top_prod_qty";
                  }

                  $.ajax({
                        type : 'POST',
                        url : '<?php echo WP_PLUGIN_URL.'/smart-reporter-for-wp-e-commerce/sr/json-woo.php'; ?>',
                        dataType:"text",
                        async: false,
                        action: 'get_monthly_sales',
                        data: {
                                    cmd: 'monthly',
                                    start_date : $("#startdate").val(),
                                    end_date : $("#enddate").val(),
                                    top_prod_option : opt_id,
                                    SR_IMG_UP_GREEN : "<?php echo $sr_img_up_green; ?>",
                                    SR_IMG_UP_RED : "<?php echo $sr_img_up_red; ?>",
                                    SR_IMG_DOWN_RED : "<?php echo $sr_img_down_red; ?>",
                                    SR_CURRENCY_SYMBOL : "<?php echo $sr_currency_symbol; ?>",
                                    SR_DECIMAL_PLACES : "<?php echo $sr_decimal_places; ?>"
                            },
                        success: function(response) {

                            myJsonObj = $.parseJSON(response);
                            
                            monthly_display(myJsonObj);
                            top_prod_display(myJsonObj);
                            top_cust_display(myJsonObj);
                            sr_cumm_total_discount_display(myJsonObj);
                            sr_top_coupons_display(myJsonObj);
                            top_gateway_display(myJsonObj);
                            cumm_taxes_display(myJsonObj);
                            top_ababdoned_products_display(myJsonObj);
                            cumm_sales_funnel_display(myJsonObj);


                            if(myJsonObj['result_monthly_sales'].length > 0) {
                                $('#sr_cumm_sales_actual').html(myJsonObj['total_monthly_sales']);
                                $('#sr_cumm_sales_indicator').removeClass();
                                $('#sr_cumm_sales_indicator').addClass(myJsonObj['img_cumm_sales']);
                                $('#diff_cumm_sales').text(myJsonObj['diff_cumm_sales']+'%');    

                                $('#sr_cumm_avg_order_tot_content, #sr_cumm_avg_order_items_content, #sr_cumm_order_coupons_content').removeClass().addClass('sr_cumm_small_widget_content');
                                $('#sr_cumm_avg_order_tot_content, #sr_cumm_avg_order_items_content, #sr_cumm_order_coupons_content').removeAttr('style');
                                $('#average_order_tot_title, #average_order_items_title, #average_order_items_title').css({'margin-top':'0em'});


                                if(myJsonObj['diff_cumm_avg_order_tot'] != 0) {
                                    $('#sr_cumm_avg_order_tot_content').html('<span id ="sr_cumm_avg_order_tot_actual" class="sr_cumm_avg_order_value">'+ myJsonObj['avg_order_total'] + '</span><br>'+
                                    '  <div class="sr_cumm_avg_tot_content"> <i id="sr_cumm_avg_order_tot_img" class="'+ myJsonObj['img_cumm_avg_order_tot'] +'" > </i>'+
                                    ' <span id ="sr_cumm_avg_order_tot_diff" style="font-size : 0.5em;">'+ myJsonObj['diff_cumm_avg_order_tot']+'%' +'</span></div>');
                                }
                                else {
                                    $('#sr_cumm_avg_order_tot_content').html('<span id ="sr_cumm_avg_order_tot_actual" class="sr_cumm_avg_order_value">'+ myJsonObj['avg_order_total'] + '</span>');
                                    $('#sr_cumm_avg_order_tot_content').css({'margin-bottom':'1.46em'});
                                }

                                
                                if(myJsonObj['diff_cumm_avg_order_items'] != 0) {
                                    $('#sr_cumm_avg_order_items_content').html('<span id ="sr_cumm_avg_order_items_actual" class="sr_cumm_avg_order_value">'+ myJsonObj['avg_order_items'] + '</span><br>'+
                                    '<div class="sr_cumm_avg_tot_content"> <i id="sr_cumm_avg_order_items_img" class="'+ myJsonObj['img_cumm_avg_order_items'] +'" > </i>'+
                                    ' <span id ="sr_cumm_avg_order_items_diff" style="font-size : 0.5em;">'+ myJsonObj['diff_cumm_avg_order_items'] +'</span></div>');
                                }
                                else {
                                    $('#sr_cumm_avg_order_items_content').html('<span id ="sr_cumm_avg_order_items_actual" class="sr_cumm_avg_order_value">'+ myJsonObj['avg_order_items'] + '</span>');     
                                    $('#sr_cumm_avg_order_items_content').css({'margin-bottom':'1.46em'});
                                }
                                

                                if(myJsonObj['diff_cumm_per_order_coupons'] != 0) {
                                    $('#sr_cumm_order_coupons_content').html('<span id ="sr_cumm_order_coupons_count_actual" class="sr_cumm_avg_order_value">'+ myJsonObj['cumm_per_order_coupons'] + '%</span><br>'+
                                    '<div class="sr_cumm_avg_tot_content"> <i id="sr_cumm_order_coupons_count_img" class="'+ myJsonObj['img_cumm_per_order_coupons'] +'" > </i>'+
                                    ' <span id ="sr_cumm_order_coupons_count_diff" style="font-size : 0.5em;">'+ myJsonObj['diff_cumm_per_order_coupons']+'%' +'</span></div>');
                                }
                                else {
                                    $('#sr_cumm_order_coupons_content').html('<span id ="sr_cumm_order_coupons_count_actual" class="sr_cumm_avg_order_value">'+ myJsonObj['cumm_per_order_coupons'] + '%</span>');
                                    $('#sr_cumm_order_coupons_content').css({'margin-bottom':'1.46em'});
                                }

                            }
                            else {
                                $('#sr_cumm_sales_actual').text(" ");
                                $('#sr_cumm_sales_indicator').removeClass();
                                $('#diff_cumm_sales').text(" "); 

                                $('#sr_cumm_avg_order_tot_content, #sr_cumm_avg_order_items_content, #sr_cumm_order_coupons_content').text('No Data');
                                $('#sr_cumm_avg_order_tot_content, #sr_cumm_avg_order_items_content, #sr_cumm_order_coupons_content').addClass('no_data_text');
                                $('#sr_cumm_avg_order_tot_content, #sr_cumm_avg_order_items_content, #sr_cumm_order_coupons_content').css({'margin-top':'2.65em', 'margin-bottom':'1.2em','font-size':'0.55em'});
                                $('#average_order_tot_title, #average_order_items_title, #average_order_items_title').css({'margin-top':'1.5em'});

                            }

                            //Code for Cart Abandanment Rate Widget
                            if(myJsonObj['cumm_abandoned_rate'] != "") {

                                $('#sr_cumm_cart_abandanment_content').removeClass().addClass('sr_cumm_small_widget_content');
                                $('#sr_cumm_cart_abandanment_content').removeAttr('style');
                                $('#sr_cumm_cart_abandanment_title').css({'margin-top':'0em'});

                                if(myJsonObj['cumm_abandoned_rate'] != 0) {
                                    $('#sr_cumm_cart_abandanment_content').html('<span id ="sr_cumm_cart_abandanment_rate_actual" class="sr_cumm_avg_order_value">'+ myJsonObj['cumm_abandoned_rate'] + '%</span><br>'+
                                    '<div class="sr_cumm_avg_tot_content"> <i id="sr_cumm_cart_abandanment_rate_img" class="'+ myJsonObj['img_cumm_abandoned_rate'] +'" > </i>'+
                                    ' <span id ="sr_cumm_cart_abandanment_rate_diff" style="font-size : 0.5em;">'+ myJsonObj['diff_cumm_abandoned_rate']+'%' +'</span></div>');
                                }
                                else {
                                    $('#sr_cumm_cart_abandanment_content').html('<span id ="sr_cumm_cart_abandanment_rate_actual" class="sr_cumm_avg_order_value">'+ myJsonObj['cumm_abandoned_rate'] + '%</span>');
                                    $('#sr_cumm_cart_abandanment_content').css({'margin-bottom':'1.46em'});
                                }
                            } else {
                                $('#sr_cumm_cart_abandanment_content').text('No Data');
                                $('#sr_cumm_cart_abandanment_content').addClass('no_data_text');
                                $('#sr_cumm_cart_abandanment_content').css({'margin-top':'2.65em', 'margin-bottom':'1.2em','font-size':'0.55em'});
                                $('#sr_cumm_cart_abandanment_title').css({'margin-top':'1.5em'});
                            }


                            //Code for Cumm Discount Widget
                            if(myJsonObj['graph_cumm_discount_sales'].length > 0) {
                                $('#sr_cumm_total_discount_actual').html(myJsonObj['cumm_discount_sales_total']);
                                $('#sr_cumm_total_discount_indicator').removeClass();
                                $('#sr_cumm_total_discount_indicator').addClass(myJsonObj['img_cumm_discount_sales_total']);
                                $('#diff_cumm_total_discount').text(myJsonObj['diff_cumm_discount_sales_total']+'%');    
                            }
                            else {
                                $('#sr_cumm_total_discount_actual').text(" ");
                                $('#sr_cumm_total_discount_indicator').removeClass();
                                $('#diff_cumm_total_discount').text(" "); 
                            }

                        }
                    });
              }
            
            
            var date_format = "<?php echo get_option('date_format'); ?>";
            
            //Code to format the date in a specific format
            date_format = date_format.replace(/(F|j|Y|m|d)/gi, function ($0){
              var index = {
                'F': 'M',
                'j': 'd',
                'Y':'yyyy',
                'y': 'yy',
                'm': 'mm',
                'd': 'dd'

              };
              return index[$0] != undefined ? index[$0] : $0;
            });

                var flag = 0;

            //Code for the display part of DatePicker

            $(function(){
                $('#startdate_display').datepick({dateFormat: date_format,
                    altField  : '#startdate',
                    altFormat : 'yyyy-mm-dd',
                    defaultDate: '-1m', // sets the defalut date to 1 month back
                    selectDefaultDate: true, // sets the default date visible in the text box
                    autoSize: true,
                    yearRange: '1900:' + new Date().getFullYear(),
                    pickerClass: 'datepick-jumps',
                    onSelect: function() {
                          var date = $("#startdate").val();
                          var strt_date;
                          var end_min_date;

                            <?php if ($fileExists) { ?>

                              if(date) {
                                    strt_date = date.split("-");
                                    end_min_date = new Date(strt_date[0], strt_date[1]-1, strt_date[2]);
                              }
                              else {
                                    var date = new Date();
                                    date.setDate(date.getDate() - 30);
                                    end_min_date = date;
                              }

                              flag = 1;

                              $('#enddate_display').datepick('option', 'minDate', end_min_date);
                              $('#startdate_display').datepick('option', 'maxDate', end_min_date);

                            <?php } else { ?>
                                end_max_date = new Date();
                                
                                var date = new Date();
                                date.setDate(date.getDate() - 30);
                                end_min_date = date;

                                $('#enddate_display').datepick('option', 'minDate', end_min_date);
                                $('#enddate_display').datepick('option', 'maxDate', end_max_date);

                                $('#startdate_display').datepick('option', 'minDate', end_min_date);
                                $('#startdate_display').datepick('option', 'maxDate', end_max_date);

                            <?php } ?>

                          get_data();
                    },
                    renderer: $.extend({}, $.datepick.defaultRenderer, 
                        {picker: $.datepick.defaultRenderer.picker. 
                            replace(/\{link:prev\}/, '{link:prevJump}{link:prev}'). 
                            replace(/\{link:next\}/, '{link:next}{link:nextJump}')})
                });


                $('#enddate_display').datepick({dateFormat: date_format,
                    altField  : '#enddate',
                    altFormat : 'yyyy-mm-dd',
                    defaultDate: '0',
                    autoSize: true,
                    yearRange: '1900:' + new Date().getFullYear(),
                    selectDefaultDate: true,
                    maxDate: 0, // sets the max date to today
                    pickerClass: 'datepick-jumps', 
                    onSelect: function() {

                          var date = $("#enddate").val();
                          var strt_date;
                          var end_min_date;

                          <?php if ($fileExists) { ?>
                              if(date) {
                                    strt_date = date.split("-");
                                    start_max_date = new Date(strt_date[0], strt_date[1]-1, strt_date[2]);
                              }
                              else {

                                    var date = new Date();
                                    date.setDate(date.getDate() - 30);
                                    start_max_date = date;
                              }

                              if(flag == 0) {
                                $('#enddate_display').datepick('option', 'minDate', start_max_date);
                                $('#enddate_display').datepick('option', 'defaultDate',  start_max_date);
                              }
                              else {
                                flag = 0;
                              }

                              $('#startdate_display').datepick('option', 'maxDate', start_max_date);
                              $('#startdate_display').datepick('option', 'defaultDate', start_max_date);

                          <?php } else { ?>
                                
                                start_max_date = new Date();

                                var date = new Date();
                                date.setDate(date.getDate() - 30);
                                start_min_date = date;

                                $('#enddate_display').datepick('option', 'minDate', start_min_date);
                                $('#enddate_display').datepick('option', 'maxDate', start_max_date);

                                $('#startdate_display').datepick('option', 'minDate', start_min_date);
                                $('#startdate_display').datepick('option', 'maxDate', start_max_date);

                                $('#startdate_display').datepick('option', 'defaultDate', start_min_date);

                          <?php } ?>

                          get_data();
                    },
                    renderer: $.extend({}, $.datepick.defaultRenderer, 
                        {picker: $.datepick.defaultRenderer.picker. 
                            replace(/\{link:prev\}/, '{link:prevJump}{link:prev}'). 
                            replace(/\{link:next\}/, '{link:next}{link:nextJump}')})});

                
                    $("#sr_endcal_icon").click(function() {
                       $("#enddate_display").focus();
                    });

                    $("#sr_startcal_icon").click(function() {
                       $("#startdate_display").focus();
                    });
                });
            
        </script>
       </form>
    </div>   
</div>
</div>

<br>

<input type="hidden" id="sr_is_auto_refresh" value="<?php echo $sr_is_auto_refresh; ?>" />
<input type="hidden" id="sr_what_to_refresh" value="<?php echo $sr_what_to_refresh; ?>" />
<input type="hidden" id="sr_refresh_duration" value="<?php echo $sr_refresh_duration; ?>" />
<script type="text/javascript"> 
    jQuery(function(){
        if ( jQuery('input#sr_is_auto_refresh').val() == 'yes' && jQuery('input#sr_what_to_refresh').val() != 'select' ) {
            var refresh_time = Number('<?php echo $sr_refresh_duration; ?>');
            var auto_refresh = setInterval(
                function() {
                    jQuery.ajax({
                        url: '<?php echo $file_url; ?>',
                        dataType: 'html',
                        success: function( response ){
                            if ( jQuery('input#sr_what_to_refresh').val() == 'dashboard' || jQuery('input#sr_what_to_refresh').val() == 'all' ) {
                                jQuery('#reload').trigger('click');
                            }
                            if ( jQuery('input#sr_what_to_refresh').val() == 'kpi' || jQuery('input#sr_what_to_refresh').val() == 'all' ) {
                                jQuery('#wrap_sr_kpi').fadeOut('slow', function(){jQuery('#wrap_sr_kpi').html(response).fadeIn("slow");});
                            }
                        }
                    });
            }, Number(refresh_time * 60 * 1000));
        }
        });
</script>


<!-- Code for rearranging all the Div Elements -->
<script type="text/javascript">

    $(function() {
        
        $(".cumm_widget, .sr_cumm_small_widget").hover(
            function() { $(this).css('border', '0.2em solid #368ee0');},
            function() { $(this).css('border', '0.2em solid #e8e8e8'); }
        );

        $("#sr_cumm_order_by_gateways").insertAfter("#sr_cumm_date");
        $("#sr_cumm_taxes").insertAfter("#sr_cumm_date");
        $("#sr_cumm_total_discount").insertAfter("#sr_cumm_date");
        

        $("#sr_cumm_top_abandoned_products").insertAfter("#sr_cumm_date");

        $("#sr_cumm_top_cust_coupons").insertAfter("#sr_cumm_date");

        $("#sr_cumm_top_prod").insertAfter("#sr_cumm_date");
        $("#sr_cumm_sales_funnel").insertAfter("#sr_cumm_date");
        $("#sr_cumm_sales").insertAfter("#sr_cumm_date");

    });
</script>   

</div> <!-- Closing the main div i.e. sr_widgets_beta -->

<?php
}

else {
    // to set javascript variable of file exists
    $fileExists = (SRPRO === true) ? 1 : 0;
    $selectedDateValue = (SRPRO === true) ? 'THIS_MONTH' : 'LAST_SEVEN_DAYS';

    if (WPSC_RUNNING === true) {
        $currency_type = get_option( 'currency_type' );   //Maybe
        $wpsc_currency_data = $wpdb->get_row( "SELECT `symbol`, `symbol_html`, `code` FROM `" . WPSC_TABLE_CURRENCY_LIST . "` WHERE `id` = '" . $currency_type . "' LIMIT 1", ARRAY_A );
        $currency_sign = $wpsc_currency_data['symbol'];   //Currency Symbol in Html
        if ( IS_WPSC388 )   
            $orders_details_url = ADMIN_URL . "index.php?page=wpsc-purchase-logs&c=item_details&id=";
        else
            $orders_details_url = ADMIN_URL . "index.php?page=wpsc-sales-logs&purchaselog_id=";
    } else {
        $currency_sign = get_woocommerce_currency_symbol();
    }

    if ($fileExists){

        if ( WPSC_RUNNING === true ) {
            $file_name =  SR_PLUGIN_DIR_ABSPATH. '/pro/sr.php';
            $file_url =  WP_PLUGIN_URL.'/smart-reporter-for-wp-e-commerce/pro/sr.php';
        } else {
            $file_name =  SR_PLUGIN_DIR_ABSPATH. '/pro/sr-woo.php';
            $file_url =  WP_PLUGIN_URL. '/smart-reporter-for-wp-e-commerce/pro/sr-woo.php';
        }

        if ( !function_exists( 'update_site_option' ) ) {
            if ( ! defined('ABSPATH') ) {
                include_once ('../../../../wp-load.php');
            }
            include_once ABSPATH . 'wp-includes/option.php';
        }
            
        $sr_is_auto_refresh = get_site_option('sr_is_auto_refresh');
        $sr_what_to_refresh = get_site_option('sr_what_to_refresh');
        $sr_refresh_duration = get_site_option('sr_refresh_duration');
        
    ?>
    <input type="hidden" id="sr_is_auto_refresh" value="<?php echo $sr_is_auto_refresh; ?>" />
    <input type="hidden" id="sr_what_to_refresh" value="<?php echo $sr_what_to_refresh; ?>" />
    <input type="hidden" id="sr_refresh_duration" value="<?php echo $sr_refresh_duration; ?>" />
    <script type="text/javascript"> 
        jQuery(function(){
            if ( jQuery('input#sr_is_auto_refresh').val() == 'yes' && jQuery('input#sr_what_to_refresh').val() != 'select' ) {
                var refresh_time = Number('<?php echo $sr_refresh_duration; ?>');
                var auto_refresh = setInterval(
                    function() {
                        jQuery.ajax({
                            url: '<?php echo $file_url; ?>',
                            dataType: 'html',
                            success: function( response ){
                                if ( jQuery('input#sr_what_to_refresh').val() == 'dashboard' || jQuery('input#sr_what_to_refresh').val() == 'all' ) {
                                    jQuery('#reload').trigger('click');
                                }
                                if ( jQuery('input#sr_what_to_refresh').val() == 'kpi' || jQuery('input#sr_what_to_refresh').val() == 'all' ) {
                                    jQuery('#wrap_sr_kpi').fadeOut('slow', function(){jQuery('#wrap_sr_kpi').html(response).fadeIn("slow");});
                                }
                            }
                        });
                }, Number(refresh_time * 60 * 1000));
            }
        });
    </script>
    <div id="wrap_sr_kpi">
    <?php if ( file_exists ( $file_name ) ) include_once( $file_name ); ?>
    </div>
    <?php
    }

    if(($_GET['post_type'] == 'wpsc-product' || $_GET['page'] == 'smart-reporter-wpsc') || (isset($_GET['tab']) && $_GET['tab'] == "smart_reporter_old") ) {

        echo "<script type='text/javascript'>
        var adminUrl             = '" .ADMIN_URL. "';
        SR                       =  new Object;";

            if ( WPSC_RUNNING === true ) {
                echo "SR.defaultCurrencySymbol = '" .$currency_sign. "';";
            } else {
                echo "SR.defaultCurrencySymbol = '" . get_woocommerce_currency_symbol() . "';";
            }   
        echo "
        var jsonURL              = '" .SR_JSON_URL. "';
        var imgURL               = '" .SR_IMG_URL . "';
        var fileExists           = '" .$fileExists. "';
        var ordersDetailsLink   = '" . $orders_details_url . "';
        var availableDays        = '" .SR_AVAIL_DAYS. "';
        var selectedDateValue    = '" .$selectedDateValue. "';
        var fileUrl      = '" .$file_url. "';
        </script>";
        ?>
        <br>
        <div id="smart-reporter"></div>

    <?php

    }

         
}

?>


<?php
/*
 * Template Name: Delivery Schedule
 */

get_header();
if(!is_user_logged_in()){
	wp_redirect(home_url());
	exit;
}
global $order;
global $data, $woocommerce; 
//ps_do_this_daily();
?>

<link rel='stylesheet' id='style-paragridma-css'  href='<?php echo  get_template_directory_uri() . '/../Avada-Child-Theme/css/deliverySchedule.css' ; ?>' type='text/css' media='all' />
<!-- Script for delivery Calendar -->
	<script type='text/javascript' src='http://chefami.com/wp-content/themes/Avada-Child-Theme/js/jquery.eventCalendar.js?ver=3.6.1'></script>
<!-- -->

<?php // woocommerce_get_template('user-welcome.php'); ?>

<?php // do_action( 'woocommerce_before_my_account' ); ?>

<?php woocommerce_get_template('myaccount-nav.php'); ?>
<style type="text/stylesheet">
div.page-title-container{
	display: none !important;
}
</style>

<div class="woocommerce-content-box">
<?php
global $woocommerce, $wpdb;

/*
$customer_orders = get_posts( array(
    'numberposts' => 1,
    'meta_key'    => '_customer_user',
    'meta_value'  => get_current_user_id(),
    'post_type'   => 'shop_order',
    'post_status' => 'publish'
) );
$odr = $customer_orders[0]->ID;
*/

$cur_user_subscription = get_user_meta(get_current_user_id(),'wp_woocommerce_subscriptions', true);
foreach($cur_user_subscription as $suk => $suv){
	//$subscriptionID = $suv['order_id'] . '_' . $suv['product_id'];
	$subscriptionID = $suk;
	$odr = $suv['order_id'];
	$f____d = date('l', strtotime($suv['start_date']));
	break;      /* use because one time subscription */
}




/* Fetch Oder Details */
 $srOW = $wpdb->get_row("select * FROM wp_woocommerce_order_items WHERE order_id = " . $odr);
$mealOrder = woocommerce_get_order_item_meta($srOW->order_item_id, 'Servings:', true);
$mealTotal = woocommerce_get_order_item_meta($srOW->order_item_id, '_recurring_line_subtotal', true);
/**/


	/* Get user Joining Information */
		global $current_user;
		get_currentuserinfo();
		$user_join_date = $current_user->user_registered ;
		$user_join_date = explode(' ', $user_join_date);
		$user_join_date = str_replace('-', '', $user_join_date[0]);	
	/***/

	$dd = explode(' ', get_post_meta($odr, 'Delivery Date', true));
	$dd = explode('/',$dd[0]);
	$dd[2] = '20'. $dd[2];
	$temp = $dd[0]; $dd[0] = $dd[2]; $dd[2] = $temp;
	$temp = $dd[1]; $dd[1] = $dd[2]; $dd[2] = $temp;
	$dd = implode('', $dd);
?>
<div class='tab-pane' id='delivery-schedule'>
<div class='my-account-section-content clearfix'>
<h3 class='section-title'>Delivery Schedule</h3>
<!-- <div class="pause_or_resume">	
	<?php
		$userID = get_current_user_id();
		if($dd < date('Ymd')){
			$cur_user_subscription = get_user_meta($userID,'wp_woocommerce_subscriptions', true);
			foreach($cur_user_subscription as $suk => $suv){
				$subscriptionID = $suv['order_id'] . '_' . $suv['product_id'];
			}	

			
			$product = get_product($suv['product_id']);
			
			if('active' == $cur_user_subscription[$subscriptionID]['status']){
				echo '<a href="#" class="pauseSubscription btn">Pause Your Subscription</a>';
			} else if('on-hold' == $cur_user_subscription[$subscriptionID]['status']){ 
				echo '<a href="#" class="resumeSubscription btn">Resume Your Subscription</a>';
			}
		}

	?>
</div> -->
<div class="clear"></div>
<p class='intro-text'>
    You can manage your deliveries for the next 8 weeks by
          clicking on the calendar below. Future delivery dates will
          appear as the date approaches. You can skip or resume any week
          with 5 days notice.
</p>
<div class='row-fluid'>
<div class='cal-col'>
    <div class='lockout hide'></div>
    <div class='deliv-cal' id='calendar'></div>
    <div class='cal-legend'>
        <div class='cl-item'>
            <div class='today'></div>
            <span>Today</span>
        </div>
        <div class='cl-item'>
            <div class='scheduled'></div>
            <span>Scheduled Delivery</span>
        </div>
        <div class='cl-item'>
            <div class='skipped'></div>
            <span>Skipped Delivery</span>
        </div>
    </div>
</div>

<div class='modal fade hide smallmodal' id='schedule-skip' tabindex='-1'>
    <div class='modal-header'>
        <button class='close' data-dismiss='modal' type='button'>x</button>
        <br>
    </div>
    <div class='modal-body'>
        <h3>Are you sure you want to skip this week's delivery?</h3>
        <!-- .btn-wrap -->
        <a class='btn choose' data-dismiss='modal' href='#'>
            Don't Skip
        </a>
        <a class='btn schedule-skip-confirm' data=''>Yes, Skip</a>
        <div class='clearfix'></div>
        <br>
    </div>
</div>
<!-- Custom Event Calendar Schedule -->
<?php

if(!empty($user_join_date) && $user_join_date+7 < $dd){
	/*$dd = $user_join_date;*/
}

if($f____d == 'Thursday' || $f____d == 'Friday' || $f____d == 'Saturday'){
	$dd_day = 13;
} else {
	$dd_day = 10;
}

$dd_day = 4;


if(!empty($dd)) {
    $curTime = $dd;
} else {
    $curTime = date('Ymd');
}
$jSon_array = array(); $desTime = date('Ymd', strtotime("+ 2 months"));$curTime = date('Ymd');$i=0;

/* fetch data from db for suspend delivery */
?>
<div class='info-col' id='schedule'>
    <img alt="Ba-animation-75" id="loader" src="//chefami.com/wp-content/themes/Avada-Child-Theme/images/31.gif" />
    <div id='upcoming_orders'></div>
    <?php
    /* Get Cancel schedule dates */
	$parmanent_cancel_delivery = get_user_meta(get_current_user_id(), 'permanent_pause', true);
    $ex_Cancel_Date = get_user_meta(get_current_user_id(), 'suspended', false);
    /*****/
    for($incTime = 1; $curTime < $desTime ; $incTime++){
        $curTime = date('Ymd', strtotime('+ '.$incTime.' days'));
        if(strtolower(date('l', strtotime('+ '.$incTime.' days'))) == 'tuesday' && ($curTime >= $dd)){
            ?>
            <!--Html for that Particular Order -->
			<?php if ($curTime == $dd) { ?>
				<div class='upcoming-order hide' id='order_<?php echo $curTime; ?>'>
					<div class='info-col-in skipped'>
						<h4><?php echo date('l, F jS',strtotime($curTime)); ?></h4>
						<p class='skipper_NO'>First Delivery</p>
						<p>
							Your first delivery has already been processed and cannot be skipped.
						</p>
					</div>
					<script>
						//<![CDATA[
						// Fix for ie10
						if ($.browser.msie && $.browser.version == 10) {
							$(".modal").removeClass("fade");
						}
						//]]>
					</script>

				</div>
			<?php } else if(!in_array($curTime, $ex_Cancel_Date) && $incTime > $dd_day && empty($parmanent_cancel_delivery)) { ?>
                <div class='upcoming-order hide' id='order_<?php echo $curTime; ?>' style="display:none;">
                    <div class='info-col-in sched'>
                        <h4><?php echo date('l, F jS',strtotime($curTime)); ?></h4>
                        <p class='scheduled'>Scheduled</p>
                        <p class='lbl'>New Recipes Coming Soon!</p>
                        <div class='clearfix'>
                            <div class='people'>
                                Plan
                                <span class='strong'><?php echo $mealOrder; ?></span>
                            </div>
                            <div class='total'>Total<span class='strong'>$<?php echo $mealTotal; ?></span>
                            </div>
                        </div>
						<?php if($dd < $curTime){ ?>
	                        <a class='skip-link' data-toggle='modal' href='#schedule-skip'>I would like to skip this week</a>
						<?php } ?>
                    </div>
                    <script>
                        //<![CDATA[
                        // Fix for ie10
                        if ($.browser.msie && $.browser.version == 10) {
                            $(".modal").removeClass("fade");
                        }
                        //]]>
                    </script>
                </div>
                <?php } else if($curTime - $dd_day <= date('Ymd') && !in_array($curTime, $ex_Cancel_Date)) { ?>			

						<div class='upcoming-order hide' id='order_<?php echo $curTime; ?>'>
							<div class='info-col-in skipped'>
								<h4><?php echo date('l, F jS',strtotime($curTime)); ?></h4>
								<p class='skipper_NO'>Processed Delivery</p>
								<p>
									This delivery has already been processed and cannot be skipped.
								</p>
							</div>
							<script>
								//<![CDATA[
								// Fix for ie10
								if ($.browser.msie && $.browser.version == 10) {
									$(".modal").removeClass("fade");
								}
								//]]>
							</script>

						</div>
					
                <?php } else if($curTime - $dd_day > date('Ymd')) { ?>
                <div class='upcoming-order hide' id='order_<?php echo $curTime; ?>'>
                    <div class='info-col-in skipped'>
                        <h4><?php echo date('l, F jS',strtotime($curTime)); ?></h4>
                        <p class='skipper'>Skipped</p>
                        <p>
                            Oh no! You have chosen to skip your <?php echo date('F jS',strtotime($curTime)); ?> delivery. If you change your mind you have until midnight (ET) on <?php echo date('F jS',strtotime($curTime."-6 days")); ?> to unskip and receive your delicious recipes and fresh ingredients! 
                        </p>
						<?php if( empty($parmanent_cancel_delivery)) { ?>
                        <a class='unskip btn' data-order_id='<?php echo $curTime; ?>' href='#'>Unskip</a>
						<?php } ?>
                    </div>
                    <script>
                        //<![CDATA[
                        // Fix for ie10
                        if ($.browser.msie && $.browser.version == 10) {
                            $(".modal").removeClass("fade");
                        }
                        //]]>
                    </script>

                </div>
                <?php } else { ?>
				<div class='upcoming-order hide' id='order_<?php echo $curTime; ?>'>
                    <div class='info-col-in skipped'>
                        <h4><?php echo date('l, F jS',strtotime($curTime)); ?></h4>
                        <p class='skipper'>Skipped</p>
                        <p>
                            Oh no! You have skip your <?php echo date('F jS',strtotime($curTime)); ?> delivery.
                        </p>						
                    </div>
                    <script>
                        //<![CDATA[
                        // Fix for ie10
                        if ($.browser.msie && $.browser.version == 10) {
                            $(".modal").removeClass("fade");
                        }
                        //]]>
                    </script>

                </div>
				<?php } ?>

            <!-- -->

            <?php
		//}
		//if(strtolower(date('l', strtotime('+ '.$incTime.' days'))) == 'tuesday' && $curTime >= $dd){

            $jSon_array[$i]['date'] = date('Y-m-d', strtotime($curTime));
            $jSon_array[$i]['order_id'] = $curTime;
            if(!in_array($curTime, $ex_Cancel_Date) && empty($parmanent_cancel_delivery)) {
                $jSon_array[$i]['status'] = 'Scheduled';
            } else {
                $jSon_array[$i]['status'] = 'Suspended';
            }
            $jSon_array[$i]['clickEvent'] = display_upcoming_order;
            $jSon_array[$i++]['selected'] = false;
        }
    }
	
    ?>
</div>
<script>
    //<![CDATA[
    $("#loader").hide();

    $(".schedule-skip-confirm").click(function() {
        $('.info-col-in.skipped').show();

        $('#schedule-skip').modal('hide');
        order_id = $(this).data('order_id');
        $("#order_" + order_id).hide();
        skip_order(order_id);
    });

    // Delivery Schedule: show unskipped state
    $(".unskip").live('click', function() {
        $(".upcoming-order").hide();
        order_id = $(this).data('order_id');
        resume_order(order_id);
        return false;
    });

    var display_upcoming_order = function() {
        $("#loader").hide();
        if ($(window).width() < 606) {
            $('html, body').animate({
                scrollTop: $("#schedule").offset().top
            }, 500);
        }
        $(".upcoming-order").hide();
        $("#order_" + this.order_id).show();
        $(".schedule-skip-confirm").data("order_id", this.order_id);

    }

    var events = JSON.parse('<?php echo json_encode($jSon_array); ?>');
    for(var k in events){
        if (events.hasOwnProperty(k)) {
            events[k].clickEvent = function() {
                $("#loader").hide();

                if ($(window).width() < 606) {
                    $('html, body').animate({
                        scrollTop: $("#schedule").offset().top
                    }, 500);
                }
                $(".upcoming-order").hide();
                $("#order_" + this.order_id).show();
                $(".schedule-skip-confirm").data("order_id", this.order_id);

            } ;

        }
    }

    // Delivery Schedule: calendar functions
    $('#calendar').Calendar({
        'events': events,
        'weekStart': 7
    });

    var skip_order = function(order_id) {
        $(".upcoming-order").hide();
        $("#loader").show();
        $(".lockout").show();
        $.ajax({
            url: ajaxurl,
            type: "POST",
            data: { action: 'skip_order', o_ID: order_id },
            success: function(response) {
                response = JSON.parse(response);
                $("#order_" + order_id).html(response.html);
                $("#order_" + order_id).show();
                if (response.status == "Suspended") {
                    $("#calendar").trigger('change_order_status', [order_id, 'Suspended']);
                }
                $("#loader").hide();
                $(".lockout").hide();

                var next_week_modal = $("#next-week .skip-modal")
                next_week_order_id = next_week_modal.data('order_id')
                if (next_week_order_id == order_id) {
                    next_week_modal.show();
                }
				/*window.location.reload();*/
            },
            error: function(response) {
                $("#error_modal").modal('show');
                $(".lockout").hide();
            },
				asyns: false
        });
    };

    var resume_order = function(order_id) {
        $(".upcoming-order").hide();
        $("#loader").show();
        $(".lockout").show();

        $.ajax({
            url: ajaxurl,
            type: "POST",
            data: { action: 'resume_order', o_ID: order_id },
            success: function(response) {
                response = JSON.parse(response);
                $("#order_" + order_id).html(response.html);
                $("#order_" + order_id).show();
                if (response.status == "Scheduled") {
                    $("#calendar").trigger('change_order_status', [order_id, 'Scheduled']);
                }
                $("#loader").hide();
                $(".lockout").hide();

                var next_week_modal = $("#next-week .skip-modal")
                next_week_order_id = next_week_modal.data('order_id')
                if (next_week_order_id == order_id) {
                    next_week_modal.hide();
                }
				/*window.location.reload();*/
            },
            error: function(response) {
                $("#error_modal").modal('show');
                $(".lockout").hide();
            },
				asyns: false
        });
    };
    //]]>
</script>

</div>
</div>
</div>
</div>
<?php get_footer(); ?>
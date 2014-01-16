/**
 * Created with Soumya Das.
 * User: Soumya
 * Date: 9/20/13
 * Time: 1:05 AM
 * To change this template use File | Settings | File Templates.
 */
jQuery(document).ready(function($) {
    $.extend({
		putSubsciptionOn : function(act){
			if(!act){
                act = 'pause';
            }

			 var data = {
                action : 'putSubscriptionON',             
                 user_action : act
            };
        
            jQuery.ajax({
                url : woocommerce_params.ajax_url,
                type : 'POST',
                data: 		data,
                success : function(x) {					
					window.location.reload();
                },
                error : function(r) {
                    jQuery('.alert.error.woocommerce-message .msg').html("Sorry !! Could not connect to server.");
                    jQuery('.alert.error.woocommerce-message').slideDown();
                }
            });
			return false;
		},
        checkZipCode : function(zipCode){
            if(!zipCode){
                return false;
            }
            $.ajax({
                type : 'POST',
                action : 'checkZipCode',
                url : ajaxurl,
                zCode : zipCode,
                success : function(x) {

                },
                error : function(r) {
                    jQuery('.alert.error.woocommerce-message .msg').html("Sorry !! Could not connect to server.");
                    jQuery('.alert.error.woocommerce-message').slideDown();
                },
                async: false
            });
        },
        addDisCode : function(discode){
            if(!discode){
                return false;
            }
            var data = {
                action : 'appdisc',
                apply_coupon : 'apply_cop_code_ph',
                coupon_code : discode
            };


            $.ajax({
                url : woocommerce_params.ajax_url,
                type : 'POST',
                data: 	data,
                success : function(x) {
                    if(x == -1){
                        jQuery('.alert.error.woocommerce-message .msg').html("Please check coupon code.");
                        jQuery('.alert.error.woocommerce-message').slideDown();
						jQuery('html, body').animate({scrollTop:0}, 'slow');
						jQuery('.csw_content').removeClass('loading');
                    } else {
                       $.upd_uInfo();
                        window.location.reload();
                    }
                },
                error : function(r) {
                    jQuery('.alert.error.woocommerce-message .msg').html("Sorry !! Could not connect to server.");
                    jQuery('.alert.error.woocommerce-message').slideDown();
					jQuery('.csw_content').removeClass('loading');
                },
                async: false
            });
        },
		addRefCode : function(discode){
            if(!discode){
                return false;
            }
            var data = {
                action : 'addRef',
                coupon_code : discode
            };


            $.ajax({
                url : woocommerce_params.ajax_url,
                type : 'POST',
                data: 	data,
                success : function(x) {
                    if(x < 1){
                        jQuery('.alert.error.woocommerce-message .msg').html("Please check your code.");
                        jQuery('.alert.error.woocommerce-message').slideDown();
						jQuery('html, body').animate({scrollTop:0}, 'slow');
						jQuery('.csw_content').removeClass('loading');
                    } else {
                       $.upd_uInfo();
                        window.location.reload();
                    }
                },
                error : function(r) {
                    jQuery('.alert.error.woocommerce-message .msg').html("Sorry !! Could not connect to server.");
                    jQuery('.alert.error.woocommerce-message').slideDown();
					jQuery('.csw_content').removeClass('loading');
                },
                async: false
            });
        },
        upd_uInfo : function () {
            if ( $('select#shipping_method').size() > 0 || $('input#shipping_method').size() > 0 )
                var method = $('#shipping_method').val();
            else
                var method = $('input[name=shipping_method]:checked').val();

            var payment_method 	= $('#order_review input[name=payment_method]:checked').val();
            var country 		= $('#billing_country').val();
            var state 			= $('#billing_state').val();
            var postcode 		= $('input#billing_postcode').val();
            var city	 		= $('input#billing_city').val();
            var address	 		= $('input#billing_address_1').val();
            var address_2	 	= $('input#billing_address_2').val();

            if ( $('#shiptobilling input').is(':checked') || $('#shiptobilling input').size() == 0 ) {
                var s_country 	= country;
                var s_state 	= state;
                var s_postcode 	= postcode;
                var s_city 		= city;
                var s_address 	= address;
                var s_address_2	= address_2;
				var s_f_n = $('input#billing_first_name').val();
				var s_l_n = $('input#billing_last_name').val();
				var checked_chbox = 'active';
            } else {
                var s_country 	= $('#shipping_country').val();
                var s_state 	= $('#shipping_state').val();
                var s_postcode 	= $('input#shipping_postcode').val();
                var s_city 		= $('input#shipping_city').val();
                var s_address 	= $('input#shipping_address_1').val();
                var s_address_2	= $('input#shipping_address_2').val();
				var s_f_n = $('input#shipping_first_name').val();
				var s_l_n = $('input#shipping_last_name').val();
				var checked_chbox = 'inactive';
            }

			
            var data = {
                action : 'upd_user_info',
                fields : {
                    payment_method:		payment_method,
                    billing_country: 			country,
                    billing_state: 				state,
                    billing_postcode: 			postcode,
                    billing_city:				city,
                    billing_address_1:			address,
                    billing_address_2:			address_2,
                    shipping_country: 			s_country,
                    shipping_state: 			s_state,
                    shipping_postcode: 		s_postcode,
                    shipping_city:				s_city,
                    shipping_address_1:			s_address,
                    shipping_address_2:		s_address_2,
					shipping_first_name:	s_f_n,
					shipping_last_name:		s_l_n,
					is_check_box_checked:		checked_chbox
                }
            };


            jQuery.ajax({
                url : woocommerce_params.ajax_url,
                type : 'POST',
                data: 		data,
                success : function(x) {

                },
                error : function(r) {

                },
                async: false
            });
        },
        load_delivery_info: function(){
            jQuery('div.delivery_information div.info_values').html("<p>Loading...</p>");
            var data = {
                action : 'load-delivery-info'
            }
            $.ajax({
                url : woocommerce_params.ajax_url,
                type : 'POST',
                data: 	data,
                success : function(x) {
                    jQuery('div.delivery_information div.info_values').html(x).fadeIn();
                },
                error : function(r) {
                    alert("Request not complete..");
                },
                async: false
            });
        },
        load_account_info: function(){
            jQuery('div.account_information').html("<p>Loading...</p>");
            var data = {
                action : 'load_my_account_info'
            }
            $.ajax({
                url : woocommerce_params.ajax_url,
                type : 'POST',
                data: 	data,
                success : function(x) {
                    jQuery('div.account_information').html(x).fadeIn();
                },
                error : function(r) {
                    alert("Request not complete..");
                },
                async: false
            });
        },
        chk_zip_in_home: function(zipCode){
            $('div.status_message').html('Please wait...').removeClass('error').removeClass('success').addClass('processing').hide();

            if(!zipCode){
                $('div.status_message').html('Please enter a valid zip code').removeClass('processing').addClass('error');
                $('input#zip_code').css('border-color', 'red');
                return false;
            }
            $('input#zip_code').css('border-color', '#ccc');
            var data = {
                action : 'check_zip_in_home',
                zipC : zipCode
            }
            $('div.status_message').bPopup();
            $.ajax({
                url : woocommerce_params.ajax_url,
                type : 'POST',
                data: 	data,
                success : function(x) {
                    var response = jQuery.parseJSON(x);
                    response.message = '<span class="button b-close"><span>X</span></span>' + response.message;
                    if(response.act == 'error'){
                        $('div.status_message').html(response.message).removeClass('processing').removeClass('success').addClass('error1');
                    } else {
                        $('div.status_message').html(response.message).removeClass('processing').removeClass('error').addClass('success1');
                    }
                },
                error : function(r) {
                    alert("Request not complete..");
                }
            });
            return false;
        },
        add_user_zip_code: function(email, zip){
            var data = {
                action : 'add_user_zip_code',
                user_email : email,
                user_zip: zip
            }
            $.ajax({
                url : woocommerce_params.ajax_url,
                type : 'POST',
                data: 	data,
                success : function(x) {
                    x = '<span class="button b-close"><span>X</span></span>' + x;
                   $('div.status_message').html(x);
                },
                error : function(r) {
                    alert("Request not complete..");
                },
                async: false
            });
        }
    });    

    jQuery('input.choose_plan').on('click', function(){

		jQuery('.csw_content').addClass('loading');
        jQuery('input.choose_plan').removeAttr('checked');
        jQuery(this).attr('checked', 'checked');

        var price = jQuery(this).val();

        var p_id = jQuery(this).attr('prod_id');
        var vari_id = jQuery(this).attr('vari_id');
        var vari_name = jQuery(this).attr('vari_name');



        var data = {
            action : 'updateAjaxCart',
            pr : price,
            'add-to-cart' : p_id,
            'variation_id' : vari_id,
            variation_name : vari_name,
            quantity:1
        };


        jQuery.ajax({
            url : woocommerce_params.ajax_url,
            type : 'POST',
            data: 		data,
            success : function(x) {
                $.upd_uInfo();
				window.location.reload();
            },
            error : function(r) {
                jQuery('.alert.error.woocommerce-message .msg').html("Sorry !! Could not connect to server.");
                jQuery('.alert.error.woocommerce-message').slideDown();
				jQuery('.csw_content').removeClass('loading');
            }
        });


    });

/* Checkout Page Discount Code Apply */
    jQuery('input#coupon_code_submit').click(function(){
    	 var dc = $('#coupon_code').val();
    	 if(dc!=""){
			jQuery('.csw_content').addClass('loading');	       
	        $.addDisCode(dc);
    	 }else{
    		 jQuery('.alert.error.woocommerce-message .msg').html("Please enter code");
    		 jQuery('.alert.error.woocommerce-message').slideDown();
    		 jQuery('html, body').animate({scrollTop:0}, 'slow');
    	 }
    });
    /* ** END ** */

	/* Checkout Page Ref Code Apply */
    jQuery('input#ref_code_submit').click(function(){
    	 var dc = $('#ref_code').val();
    	 if(dc!=""){
			jQuery('.csw_content').addClass('loading');	       
	        $.addRefCode(dc);
    	 }else{
    		 jQuery('.alert.error.woocommerce-message .msg').html("Please enter code");
    		 jQuery('.alert.error.woocommerce-message').slideDown();
    		 jQuery('html, body').animate({scrollTop:0}, 'slow');
    	 }
		 return false;
    });
    /* ** END ** */

   //** update Subscription Code ahax **//
        jQuery("form#update_subscription").submit(function(){

           var ref_CODE = jQuery("input#ref_code_redim").val();
            if(!ref_CODE){
                alert("Please enter a value.");
                return false;
            }
            $("#ref_code_submit_btn_redim").val('Please wait...');
            var data = {
                action : 'upd_subscription',
                ref_code : ref_CODE
            };

            jQuery.ajax({
                url : woocommerce_params.ajax_url,
                type : 'POST',
                data: 		data,
                success : function(x) {
                  var obj =  jQuery.parseJSON(x);
                    if(obj.status == 'error'){
                        alert("Error : " + obj.message );
                    } else {
						alert("The amount $" + ref_CODE + " will be deducted from the next payment.");
                        window.location.reload();
                    }

                    $("#ref_code_submit_btn_redim").val('Update Subscription');

                },
                error : function(r) {
                    jQuery('.alert.error.woocommerce-message .msg').html("Sorry !! Could not connect to server.");
                    jQuery('.alert.error.woocommerce-message').slideDown();
                    jQuery('.csw_content').removeClass('loading');
                }

            });

            return false;
        });
    //* End Code  *//


	//Login section
    jQuery("#loginform").submit(function(){

        if(jQuery("#id_remember").is(":checked"))
        {
            var remember=true;
        }
        else
        {
            var remember=false;
        }

        if(jQuery("#user_login").val() == ''){
            jQuery("#user_login").attr('style', 'border-color:red !important');
            jQuery("#user_login").focus();
            //jQuery(".description label").html("Please Enter User Name");
            return false;
        }
        jQuery("#user_login").css('border-color', '');
        if(jQuery("#user_pass").val() == ''){
            jQuery("#user_pass").attr('style', 'border-color:red !important');
            jQuery("#user_pass").focus();
            //jQuery(".description label").html("Please Enter Password");
            return false;
        }
        jQuery("#user_pass").css('border-color', '');
        jQuery(".description label").html("Logging in..");
        jQuery(".description label").attr('style', 'color:green !important');
        jQuery.ajax({url: woocommerce_params.ajax_url, type: "POST",data: {action: 'ajax_login',log:jQuery("#user_login").val(), pwd:jQuery("#user_pass").val(),remember:remember}, success: function(response) {
            if(response == 1){
                jQuery(".description label").html("Login Success..");
                jQuery(".description label").attr('style', 'color:green !important');
                window.location.replace("//chefami.com/my-account/");;
            } else {
                jQuery(".description label").html("Invalid Credentials");
                jQuery(".description label").attr('style', 'color:red !important');
            }
        }});
        return false;
    });
    //end login section

    /* Code for account page plan editing */
    $('h2.header_title span.plan_edit').on('click',function(){
        var div = $('div.Plan_info_edit');
        if(div.length > 0){
            div.bPopup({
                easing: 'easeOutBack', //uses jQuery easing plugin
                speed: 450,
                transition: 'slideDown'
            });
        }
    });
    /****/
    /** Code for account page delivery section **/
    $('h2.header_title span.delivery_edit').on('click',function(){
        var div = $('div.delivery_info_edit');
        if(div.length > 0){
            div.bPopup({
                easing: 'easeOutBack', //uses jQuery easing plugin
                speed: 450,
                transition: 'slideDown'
            });
        }
    });
    /****/
    /** Code for account page account section **/
    $('h2.header_title_last span.account_edit').on('click',function(){
        var div = $('div.account_info_edit');
        if(div.length > 0){
            div.bPopup({
                easing: 'easeOutBack', //uses jQuery easing plugin
                speed: 450,
                transition: 'slideDown'
            });
        }
    });
    /*****/
    /** Code for account page payment section **/
    $('h2.header_title_last span.payment_edit').on('click',function(){
        var div = $('div.payment_info_edit');
        if(div.length > 0){
            div.bPopup({
                easing: 'easeOutBack', //uses jQuery easing plugin
                speed: 450,
                transition: 'slideDown'
            });
        }
    });
    /***/
    $('form#plan_info_edit_form').submit(function(){
        $('#plan_update_btn').val('Please wait...');

        /* call ajax to save data */
        var data = {
            action : 'update_member_plan',
            form_data : $(this).serialize()
        };


        jQuery.ajax({
            url : woocommerce_params.ajax_url,
            type : 'POST',
            data: 		data,
            success : function(x) {
                var res = jQuery.parseJSON(x);
                $("#plan_update_btn").val("Update Plan");
                if(res.act == 'error'){
                    alert(res.message);
                } else {
					$("div.plan_information").html(res.message);
                    var div = $('.b-modal.__b-popup1__');
                    if(div.length > 0){
                        div.trigger('click');
                        $('div.plan_information').html(res.message);
                    }
                }
            },
            error : function(r) {
                jQuery('.alert.error.woocommerce-message .msg').html("Sorry !! Could not connect to server.");
                jQuery('.alert.error.woocommerce-message').slideDown();
                jQuery('.csw_content').removeClass('loading');
            }
        });
        return false;



    });
    /** Code for Submit Delivery Section **/
    $('form#delivery_info_edit_form').submit(function(){
        /* validation section */

        /*****/
		$("#delivery_update_btn").val("Please wait...");
        /* call ajax to save data */
        var data = {
            action : 'save_ma_delivery_info',
            form_data : $(this).serialize()
        };


        jQuery.ajax({
            url : woocommerce_params.ajax_url,
            type : 'POST',
            data: 		data,
            success : function(x) {
                var res = jQuery.parseJSON(x);
				$("#delivery_update_btn").val("Update Delivery");
                if(res.act == 'error'){
                    alert(res.message);
                } else {
                    var div = $('.b-modal.__b-popup1__');
                    if(div.length > 0){
                        div.trigger('click');
                        $.load_delivery_info();
                    }
                }
            },
            error : function(r) {
                jQuery('.alert.error.woocommerce-message .msg').html("Sorry !! Could not connect to server.");
                jQuery('.alert.error.woocommerce-message').slideDown();
                jQuery('.csw_content').removeClass('loading');
            }
        });
        return false;
    });
    /****/
    /** Code for Submit Account Section **/
    $('form#account_info_edit_form').submit(function(){
        /* validation section */
        var email = $("input#user_email").val();
        var pw1 = $("input#user_password").val();
        var pw2 = $("input#user_password2").val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!regex.test(email)){
            alert('Please enter a valid email address...');
            return false;
        }
        if(pw1 != pw2){
            alert('Confirm password could not match...');
            return false;
        }
        /*****/
        /* call ajax to save data */
		$("#account_update_btn").val("Please wait...");
        var data = {
            action : 'save_ma_account_info',
            form_data : $(this).serialize()
        };


        jQuery.ajax({
            url : woocommerce_params.ajax_url,
            type : 'POST',
            data: 		data,
            success : function(x) {
                var res = jQuery.parseJSON(x);
				$("#account_update_btn").val("Update Account");
                if(res.act == 'error'){
                    alert(res.message);
                } else {
                    var div = $('.b-modal.__b-popup1__');
                    if(div.length > 0){
                        div.trigger('click');
                        $.load_account_info();
                    }
                }
            },
            error : function(r) {
                jQuery('.alert.error.woocommerce-message .msg').html("Sorry !! Could not connect to server.");
                jQuery('.alert.error.woocommerce-message').slideDown();
                jQuery('.csw_content').removeClass('loading');
            }
        });
        return false;
    });
    /****/
    /* Stripe Card Update Form */
    $('form#paymenty_info_edit_form').submit(function(){
        $('#payment_update_btn').val('Please wait...');

        /* call ajax to save data */
        var data = {
            action : 'update_account',
            form_data : $(this).serialize()
        };


        jQuery.ajax({
            url : woocommerce_params.ajax_url,
            type : 'POST',
            data: 		data,
            success : function(x) {
                var res = jQuery.parseJSON(x);
                $("#payment_update_btn").val("Update Account");
                if(res.act == 'error'){
                    alert(res.message);
                } else {

                    var div = $('.b-modal.__b-popup1__');
                    if(div.length > 0){
                        div.trigger('click');
                        $('div.payment_information').html(res.message);
                    }
                }
            },
            error : function(r) {
                jQuery('.alert.error.woocommerce-message .msg').html("Sorry !! Could not connect to server.");
                jQuery('.alert.error.woocommerce-message').slideDown();
                jQuery('.csw_content').removeClass('loading');
            }
        });
        return false;



    });

    /** check zip code from home page **/

    $('p.zip_code_check a').live('click', function(){
        var div = $('div.zip_code_checker');
        if(div.length > 0){
            div.bPopup({
                easing: 'easeOutBack', //uses jQuery easing plugin
                speed: 450,
                transition: 'slideDown'
            });
        }
        return false;
    });

    $("form.postalCodeCheck").submit(function(){
        $('div.status_message').html('').removeClass('processing').hide();
        var zip = $('input#zip_code').val();
        $.chk_zip_in_home(zip);
        return false;
    });

    /*****/

    /** Email Invitation Code **/
    $("a.email_invitation").live('click', function(){
        var div = $('div.invitation_form');
        if(div.length > 0){
            div.bPopup({
                easing: 'easeOutBack', //uses jQuery easing plugin
                speed: 450,
                transition: 'slideDown'
            });
        }
        return false;
    });
    /****/
    /** Send Email To Users **/
    $('form#invitationform').submit(function(){
        var data = {
            action : 'send_Email_to_my_friend',
            form_data : $(this).serialize()
        };
			$("input#invitationformReplaceSubmitButton").val("Please wait...").attr('disabled', 'disabled');
        jQuery.ajax({
            url : woocommerce_params.ajax_url,
            type : 'POST',
            data: 		data,
            success : function(x) {
                var res = jQuery.parseJSON(x);
                if(res.act == 'success'){
                    alert(res.message);
					$("input#invitationformReplaceSubmitButton").val("Send").removeAttr('disabled');
					$('.button.b-close').trigger('click');
                } else {
					$("input#invitationformReplaceSubmitButton").val("Send").removeAttr('disabled');
					alert(res.message);
                }
            },
            error : function(r) {
                jQuery('.alert.error.woocommerce-message .msg').html("Sorry !! Could not connect to server.");
                jQuery('.alert.error.woocommerce-message').slideDown();
                jQuery('.csw_content').removeClass('loading');
            }
        });
        return false;
    });

    /** Save Email If nops **/
    $('form#delivery_area_emailForm').live('submit', function(){
        var email = $('input#email_save').val();
        var zip = $('input#zip_code').val();
        $.add_user_zip_code(email, zip);
        return false;
    });
    /***/
	/*** Placeholder for mail chimp input box ***/
	$("input#mc_mv_EMAIL").attr("placeholder", "Email Address");
	/* Code for Change Plan */
	$("select.meal_main_type").live('change', function(){
        $('select#meal_plan.mpc').attr('name', '').hide();
       $('select.meal_plan_'+$(this).val()).attr('name', 'meal_plan_type').show();
        $("input#variation_name").val($(this).attr('name_va'));
    });
	/**/

	$('#billing_phone').live('change',function(){
		
        var billing_phone = $('#billing_phone').val();

		var data = {
			action: 			'woocommerce_update_order_review_phone_no',
			 billing_phone:		 billing_phone
		};

		xhr = $.ajax({
			type: 		'POST',
			url: 		woocommerce_params.ajax_url,
			data: 		data,
			success: 	function( response ) {
			/*	if ( response ) {
					var order_output = $(response);
					$('#order_review').html(order_output.html());
					$('body').trigger('updated_checkout');
				}*/
			}
		});
	});

	/* Subscription pause and resume in delivery section */
	$('a.pauseSubscription.btn').live('click', function(){
		$(this).html("Please wait..");
		$.putSubsciptionOn('pause');
		$(this).html("Pause Your Subscription");
	});	

	$('a.resumeSubscription.btn').live('click', function(){
		$(this).html("Please wait..");
		$.putSubsciptionOn('resume');
		$(this).html("Resume Your Subscription");
	});	
	/****/

	$(".show_message_not_change").live('click', function(){
		var div = $('div.show_edit_plan_popup');
        if(div.length > 0){
            div.bPopup({
                easing: 'easeOutBack', //uses jQuery easing plugin
                speed: 450,
                transition: 'slideDown'
            });
        }
        return false;
	});

	$(".show_message_not_change_on_thrusday").live('click', function(){
		var div = $('div.show_edit_plan_popup1.not_on_thrusday');
        if(div.length > 0){
            div.bPopup({
                easing: 'easeOutBack', //uses jQuery easing plugin
                speed: 450,
                transition: 'slideDown'
            });
        }
        return false;
	});

	$("#meal_plan").live('change', function(){
		$('div.info_values.price_html').html($('option:selected', this).attr('pricehtml'));
	});
	
});

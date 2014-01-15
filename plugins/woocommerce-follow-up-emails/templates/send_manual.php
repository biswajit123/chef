<?php
$defaults = apply_filters( 'fue_manual_email_defaults', array(
    'type'              => $email->email_type,
    'always_send'       => $email->always_send,
    'name'              => $email->name,
    'interval'          => $email->interval_num,
    'interval_duration' => $email->interval_duration,
    'interval_type'     => $email->interval_type,
    'send_date'         => $email->send_date,
    'send_date_hour'    => $email->send_date_hour,
    'send_date_minute'  => $email->send_date_minute,
    'product_id'        => $email->product_id,
    'category_id'       => $email->category_id,
    'subject'           => $email->subject,
    'message'           => $email->message,
    'tracking_on'       => (!empty($email->tracking_code)) ? 1 : 0,
    'tracking'          => $email->tracking_code,
), $email);

// if type is date, switch columns
if ( $defaults['interval_type'] == 'date' ) {
    $defaults['interval_type'] = $defaults['interval_duration'];
    $defaults['interval_duration'] = 'date';
}

if ( isset($_POST) && !empty($_POST) ) {
    $defaults = array_merge( $defaults, $_POST );
}
?>
    <form action="admin-post.php" method="post" id="">
        <h3><?php printf(__('Send Email: %s', 'wc_followup_emails'), $email->name); ?></h3>

        <table class="form-table">
            <tbody>
                <tr valign="top" class="send_type_tr">
                    <th scope="row" class="send_type_th">
                        <label for="send_type"><?php _e('Send Email To', 'wc_followup_emails'); ?></label>
                    </th>
                    <td class="send_type_td">
                        <select name="send_type" id="send_type">
                            <option value="storewide"><?php _e('All Customers', 'wc_followup_emails'); ?></option>
                            <option value="customer"><?php _e('This Customer', 'wc_followup_emails'); ?></option>
                            <option value="email"><?php _e('This email address', 'wc_followup_emails'); ?></option>
                            <option value="product"><?php _e('Customers who bought these products', 'wc_followup_emails'); ?></option>
                            <option value="category"><?php _e('Customers who bought from these categories', 'wc_followup_emails'); ?></option>
                            <option value="timeframe"><?php _e('Customers who bought between these dates', 'wc_followup_emails'); ?></option>
                        </select>

                        <div class="send-type-customer send-type-div">
                            <select name="recipients[]" id="recipients" class="email-search-select" multiple data-placeholder="Search by customer name or email..." style="width: 600px;"></select>
                        </div>
                        <div class="send-type-email send-type-div">
                            <input type="text" name="recipient_email" id="recipients" class="email-recipients" placeholder="someone@example.com" style="width: 600px;" />
                            <!--<select name="recipients[]" id="recipients" class="email-search-select" multiple data-placeholder="Search by name or email..." style="width: 600px;"></select>-->
                        </div>
                        <div class="send-type-product send-type-div">
                            <select id="product_ids" name="product_ids[]" class="ajax_chosen_select_products_and_variations" multiple data-placeholder="<?php _e('Search for a product&hellip;', 'woocommerce'); ?>" style="width: 600px"></select>
                        </div>
                        <div class="send-type-category send-type-div">
                            <select id="category_ids" name="category_ids[]" class="chzn-select" data-placeholder="<?php _e('Search for a category&hellip;', 'wc_followup_emails'); ?>" style="width: 600px;" multiple>
                                <?php foreach ($categories as $category): ?>
                                    <option value="<?php _e($category->term_id); ?>" <?php echo ($defaults['category_id'] == $category->term_id) ? 'selected' : ''; ?>><?php echo esc_html($category->name); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>

                        <div class="send-type-timeframe send-type-div">
                            <?php _e('From:', 'wc_followup_emails'); ?>
                            <input type="text" class="" name="timeframe_from" id="timeframe_from" />

                            <?php _e('To:', 'wc_followup_emails'); ?>
                            <input type="text" class="" name="timeframe_to" id="timeframe_to" />
                        </div>
                    </td>
                </tr>

                <tr valign="top" class="send_again_tr">
                    <th scope="row">
                        <label for="send_again"><?php _e('Send now and send again', 'wc_followup_emails'); ?></label>
                    </th>
                    <td>
                        <input type="checkbox" name="send_again" id="send_again" value="1" />
                    </td>
                </tr>

                <tr valign="top" class="class_send_again send_again_interval_tr">
                    <th scope="row" class="interval_th">
                        <label for="interval_type"><?php _e('Send now and send again in:', 'wc_followup_emails'); ?></label>
                    </th>
                    <td class="interval_td">
                        <span class="hide-if-date interval_span hideable">
                            <input type="text" name="interval" id="interval" value="<?php echo esc_attr($defaults['interval']); ?>" size="2" placeholder="0" />
                        </span>
                        <select name="interval_duration" id="interval_duration" class="interval_duration hideable">
                            <?php
                            $durations = SFN_FollowUpEmails::get_durations();

                            foreach ( $durations as $key => $value ):
                                if ( $key == 'date') continue;
                            ?>
                            <option class="interval_duration_<?php echo $key; ?> hideable" value="<?php echo esc_attr($key); ?>"><?php echo $value; ?></option>
                            <?php endforeach; ?>
                        </select>

                    </td>
                </tr>

                <?php do_action( 'fue_manual_email_form_before_message', $defaults ); ?>

                <tr valign="top">
                    <th scope="row">
                        <label for="subject"><?php _e('Email Subject', 'wc_followup_emails'); ?></label>
                    </th>
                    <td>
                        <input type="text" name="email_subject" id="email_subject" value="<?php echo esc_attr($defaults['subject']); ?>" class="regular-text" />
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row">
                        <label for="message"><?php _e('Email Body', 'wc_followup_emails'); ?></label>
                        <br />
                        <span class="description">
                            <?php _e('You may use the following variables in the Email Subject and Body', 'wc_followup_emails'); ?>
                            <ul>
                                <?php do_action('fue_email_manual_variables_list'); ?>
                                <li class="var hideable var_customer_first_name"><strong>{customer_first_name}</strong> <img class="help_tip" title="<?php _e('The first name of the customer who purchased from your store.', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_customer_name"><strong>{customer_name}</strong> <img class="help_tip" title="<?php _e('The full name of the customer who purchased from your store.', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_customer_email"><strong>{customer_email}</strong> <img class="help_tip" title="<?php _e('The email address of the customer who purchased from your store.', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_link"><strong>{link url=http://...}</strong> <img class="help_tip" title="<?php _e('The URL/Address to display', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_store_url"><strong>{store_url}</strong> <img class="help_tip" title="<?php _e('The URL/Address of your store.', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_store_url_path"><strong>{store_url=path}</strong> <img class="help_tip" title="<?php _e('The URL/Address of your store with path added at the end. Ex. {store_url=/categories}', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_store_name"><strong>{store_name}</strong> <img class="help_tip" title="<?php _e('The name of your store.', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_unsubscribe_url"><strong>{unsubscribe_url}</strong> <img class="help_tip" title="<?php _e('URL where users will be able to opt-out of the email list.', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_post_id"><strong>{post_id=xx}</strong> <img class="help_tip" title="<?php _e('Include the excerpt of the specified Post ID.', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                            </ul>
                        </span>
                    </th>
                    <td>
                        <div id="poststuff">
                        <?php wp_editor($defaults['message'], 'email_message', array('textarea_rows' => 10, 'teeny' => true)); ?>
                        </div>
                    </td>
                </tr>

                <tr>
                    <th scope="row">
                        <label for="tracking_on"><?php _e('Add Google Analytics tracking to links', 'wc_followup_emails'); ?></label>
                    </th>
                    <td>
                        <input type="checkbox" name="tracking_on" id="tracking_on" value="1" <?php if ($defaults['tracking_on'] == 1) echo 'checked'; ?> />
                    </td>
                </tr>
                <tr class="tracking_on">
                    <th scope="row">
                        <label for="tracking"><?php _e('Link Tracking', 'wc_followup_emails'); ?></label>
                    </th>
                    <td>
                        <input type="text" name="tracking" id="tracking" value="<?php echo esc_attr($defaults['tracking']); ?>" placeholder="e.g. utm_campaign=Follow-up-Emails-by-75nineteen" size="40" />
                        <p class="description">
                            <?php _e('The value inserted here will be appended to all URLs in the Email Body', 'wc_followup_emails'); ?>
                        </p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="test_email"><strong>Send a test email</strong></label>
                    </th>
                    <td>
                        <input type="text" id="test_email" placeholder="Email Address" value="" />
                        <input type="button" id="test_send" value="<?php _e('Send Test', 'wc_followup_emails'); ?>" class="button" />
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="submit">
            <input type="hidden" name="action" value="sfn_followup_send_manual" />
            <input type="hidden" name="id" id="id" value="<?php echo $id; ?>" />
            <input type="submit" name="save" id="save" value="<?php _e('Send Email Now', 'wc_followup_emails'); ?>" class="button-primary" />
        </p>
    </form>
    <script type="text/javascript">
    var interval_types = <?php echo json_encode(SFN_FollowUpEmails::get_trigger_types()); ?>;
    jQuery(document).ready(function($) {
        jQuery(".send-type-div").hide();

        jQuery("#send_type").change(function() {
            jQuery(".send-type-div").hide();
            switch (jQuery(this).val()) {
                case "customer":
                    jQuery(".send-type-customer").show();
                    break;

                case "email":
                    jQuery(".send-type-email").show();
                    break;

                case "product":
                    jQuery(".send-type-product").show();
                    break;

                case "category":
                    jQuery(".send-type-category").show();
                    break;

                case "timeframe":
                    jQuery(".send-type-timeframe").show();
                    break;

                default:
                    break;

            }
        }).change();

        jQuery("select.ajax_chosen_select_products_and_variations").ajaxChosen({
            method:     'GET',
            url:        ajaxurl,
            dataType:   'json',
            afterTypeDelay: 100,
            data:       {
                action:         'woocommerce_json_search_products_and_variations',
                security:       '<?php echo wp_create_nonce("search-products"); ?>'
            }
        }, function (data) {
            var terms = {};

            jQuery.each(data, function (i, val) {
                terms[i] = val;
            });

            return terms;
        });
        jQuery("select.email-search-select").ajaxChosen({
            method:     'GET',
            url:        ajaxurl,
            dataType:   'json',
            afterTypeDelay: 100,
            data:       {
                action:         'fue_email_query'
            }
        }, function (data) {
            var terms = {};

            jQuery.each(data, function (i, val) {
                terms[i] = val;
            });

            return terms;
        });

        jQuery("select.chzn-select").chosen();

        jQuery(".help_tip").tipTip();

        jQuery("#tracking_on").change(function() {
            if (jQuery(this).attr("checked")) {
                jQuery(".tracking_on").show();
            } else {
                jQuery(".tracking_on").hide();
            }
        }).change();

        jQuery("#interval_type").change(function() {
            if (jQuery(this).val() != "cart") {
                jQuery(".not-cart").show();
            } else {
                jQuery(".not-cart").hide();
            }
        }).change();

        jQuery("#interval_duration").change(function() {
            if (jQuery(this).val() == "date") {
                jQuery(".hide-if-date").hide();
                jQuery(".show-if-date").show();
            } else {
                jQuery(".hide-if-date").show();
                jQuery(".show-if-date").hide();
            }

            jQuery("#email_type").change();
        }).change();

        jQuery(".date").datepicker();

        jQuery("#timeframe_from").datepicker({
            onClose: function( selectedDate ) {
                $( "#timeframe_to" ).datepicker( "option", "minDate", selectedDate );
            }
        });
        jQuery("#timeframe_to").datepicker();

        <?php do_action('fue_manual_email_form_script'); ?>

        jQuery("#send_again").change(function() {
            if (jQuery(this).attr("checked")) {
                jQuery(".class_send_again").show();
            } else {
                jQuery(".class_send_again").hide();
            }
        }).change();

    });
    function reset_elements() {
        jQuery(".hideable").show();

        var trigger = jQuery("#interval_type").val();

        jQuery("#interval_type option").remove();
        for (key in interval_types) {
            jQuery("#interval_type").append('<option class="interval_type_option interval_type_'+ key +'" id="interval_type_option_'+ key +'" value="'+ key +'">'+ interval_types[key] +'</option>');
        }

        if (trigger) {
            jQuery("#interval_type_option_"+trigger).attr("selected", true);
        }
    }
    </script>

<?php
$defaults = apply_filters( 'fue_new_email_defaults', array(
    'type'              => 'generic',
    'always_send'       => 0,
    'name'              => '',
    'interval'          => 1,
    'interval_duration' => 'hours',
    'interval_type'     => 'purchase',
    'send_date'         => '',
    'send_date_hour'    => '',
    'send_date_minute'  => '',
    'product_id'        => '',
    'category_id'       => '',
    'subject'           => '',
    'message'           => '',
    'tracking_on'       => 0,
    'tracking'          => '',
    'meta'              => array()
));

// if type is date, switch columns
if ( $defaults['interval_type'] == 'date' ) {
    $defaults['interval_type'] = $defaults['interval_duration'];
    $defaults['interval_duration'] = 'date';
}

if ( isset($_POST) && !empty($_POST) ) {
    $defaults = array_merge( $defaults, $_POST );
}
?>
    <form action="admin-post.php" method="post" id="sfn_form">
        <h3><?php _e('Create a New Follow-Up Email', 'wc_followup_emails'); ?></h3>

        <table class="form-table">
            <tbody>
                <tr valign="top" class="email_type_tr hideable">
                    <th scope="row" style="width:250px;" class="email_type_th">
                        <label for="email_type"><?php _e('Email Type:', 'wc_followup_emails'); ?></label>
                    </th>
                    <td class="email_type_td">
                        <select name="email_type" id="email_type" class="email_type_select hideable">
                            <?php
                            $types = SFN_FollowUpEmails::get_email_types();

                            foreach ( $types as $key => $value ):
                                $selected = ($defaults['type'] == $key) ? 'selected' : '';
                            ?>
                            <option class="email_type_option email_type_option_<?php echo $key; ?>" value="<?php echo esc_attr($key); ?>" <?php echo $selected; ?>><?php echo $value; ?></option>
                            <?php endforeach; ?>
                        </select>
                    </td>
                </tr>

                <tr valign="top" class="always_send_tr hideable non-signup generic non-reminder <?php do_action('fue_form_always_send_tr_class', $defaults); ?>">
                    <th scope="row" class="always_send_th">
                        <label for="always_send"><?php _e('Always Send', 'wc_followup_emails'); ?></label>
                    </th>
                    <td class="always_send_td">
                        <input type="checkbox" name="always_send" id="always_send" value="1" <?php if ($defaults['always_send'] == 1) echo 'checked'; ?> /> (<em>Use this setting carefully, as this setting could result in multiple emails being sent per order</em>)
                    </td>
                </tr>

                <tr valign="top" class="name_tr">
                    <th scope="row" class="name_th">
                        <label for="name"><?php _e('Name', 'wc_followup_emails'); ?></label>
                    </th>
                    <td class="name_td">
                        <input type="text" name="name" id="name" value="<?php echo esc_attr($defaults['name']); ?>" class="regular-text" />
                    </td>
                </tr>

                <tr valign="top" class="interval_tr hideable">
                    <th scope="row" class="interval_th">
                        <label for="interval_type"><?php _e('Interval', 'wc_followup_emails'); ?></label>
                    </th>
                    <td class="interval_td">
                        <span class="hide-if-date interval_span hideable">
                            <input type="text" name="interval" id="interval" value="<?php echo esc_attr($defaults['interval']); ?>" size="2" />
                        </span>
                        <select name="interval_duration" id="interval_duration" class="interval_duration hideable">
                            <?php
                            $durations = SFN_FollowUpEmails::get_durations();

                            foreach ( $durations as $key => $value ):
                                $selected = ($defaults['interval_duration'] == $key) ? 'selected' : '';
                            ?>
                            <option class="interval_duration_<?php echo $key; ?> hideable" value="<?php echo esc_attr($key); ?>" <?php echo $selected; ?>><?php echo $value; ?></option>
                            <?php endforeach; ?>
                        </select>
                        <span class="description signup signup_description hideable"><?php _e('after user signs up', 'wc_followup_emails'); ?></span>
                        <span class="hide-if-date non-signup interval_type_span hideable">
                            <!--&nbsp;
                            <span class="description interval_type_after_span hideable"><?php _e('after', 'wc_followup_emails'); ?></span>-->
                            &nbsp;
                            <select name="interval_type" id="interval_type" class="interval_type hideable">
                                <?php
                                $triggers = SFN_FollowUpEmails::get_trigger_types();

                                foreach ( $triggers as $key => $value ):
                                    $selected = ($defaults['interval_type'] == $key) ? 'selected' : '';
                                ?>
                                <option class="interval_type_option interval_type_<?php echo $key; ?> <?php if ( $key != 'purchase' && $key != 'completed' ) echo 'non-reminder'; ?> hideable <?php do_action('fue_form_interval_type', $key); ?>" value="<?php echo esc_attr($key); ?>" <?php echo $selected; ?>><?php echo $value; ?></option>
                                <?php endforeach; ?>
                            </select>
                        </span>
                        <span class="show-if-date interval_date_span hideable">
                            <input type="text" name="send_date" class="date" value="<?php echo esc_attr($defaults['send_date']); ?>" readonly />

                            <select name="send_date_hour">
                                <option value="">Hour</option>
                                <?php
                                for ( $x = 0; $x <= 23; $x++ ):
                                    $sel = ($defaults['send_date_hour'] == $x) ? 'selected' : '';
                                ?>
                                <option value="<?php echo $x; ?>" <?php echo $sel; ?>><?php echo $x; ?></option>
                                <?php endfor; ?>
                            </select>

                            <select name="send_date_minute">
                                <option value="">Minute</option>
                                <?php
                                for ( $x = 0; $x <= 55; $x+=5 ):
                                    $sel = ($defaults['send_date_minute'] == $x) ? 'selected' : '';
                                ?>
                                <option value="<?php echo $x; ?>" <?php echo $sel; ?>><?php echo $x; ?></option>
                                <?php endfor; ?>
                            </select>
                        </span>

                        <span class="show-if-order_total_above hide-if-date order_total_above_span hideable">
                            <?php echo get_woocommerce_currency_symbol(); ?>
                            <input type="text" name="meta[order_total_above]" id="order_total_above" value="<?php if (isset($defaults['meta']['order_total_above'])) echo $defaults['meta']['order_total_above']; ?>" />
                        </span>

                        <span class="show-if-order_total_below hide-if-date order_total_below_span hideable">
                            <?php echo get_woocommerce_currency_symbol(); ?>
                            <input type="text" name="meta[order_total_below]" id="order_total_below" value="<?php if (isset($defaults['meta']['order_total_below'])) echo $defaults['meta']['order_total_below']; ?>" />
                        </span>

                        <span class="show-if-total_purchases hide-if-date total_purchases_span hideable">
                            <span class="description"><?php _e('is', 'wc_followup_emails'); ?></span>
                            <select name="meta[total_purchases_mode]">
                                <option value="equal to" <?php if (isset($defaults['meta']['total_purchases_mode']) && $defaults['meta']['total_purchases_mode'] == 'equal to') echo  'selected'; ?>><?php _e('equal to', 'wc_followup_emails'); ?></option>
                                <option value="greater than" <?php if (isset($defaults['meta']['total_purchases_mode']) && $defaults['meta']['total_purchases_mode'] == 'greater than') echo  'selected'; ?>><?php _e('greater than', 'wc_followup_emails'); ?></option>
                            </select>

                            <?php echo get_woocommerce_currency_symbol(); ?>
                            <input type="text" name="meta[total_purchases]" value="<?php if (isset($defaults['meta']['total_purchases'])) echo $defaults['meta']['total_purchases']; ?>" />
                        </span>

                        <span class="show-if-total_orders hide-if-date total_orders_span hideable">
                            <span class="description"><?php _e('is', 'wc_followup_emails'); ?></span>
                            <select name="meta[total_orders_mode]">
                                <option value="equal to" <?php if (isset($defaults['meta']['total_orders_mode']) && $defaults['meta']['total_orders_mode'] == 'equal to') echo  'selected'; ?>><?php _e('equal to', 'wc_followup_emails'); ?></option>
                                <option value="greater than" <?php if (isset($defaults['meta']['total_orders_mode']) && $defaults['meta']['total_purchases_mode'] == 'greater than') echo  'selected'; ?>><?php _e('greater than', 'wc_followup_emails'); ?></option>
                            </select>

                            <input type="text" name="meta[total_orders]" value="<?php if (isset($defaults['meta']['total_orders'])) echo $defaults['meta']['total_orders']; ?>" />
                        </span>

                        <?php do_action('fue_email_form_interval_meta', $defaults); ?>
                    </td>
                </tr>

                <?php do_action('fue_new_email_form_after_interval', $defaults); ?>

                <tr valign="top" class="meta_one_time_tr" style="display:none;">
                    <th scope="row" class="meta_one_time_th">
                        <label for="meta_one_time"><?php _e('One-Time Email', 'wc_followup_emails'); ?></label>
                    </th>
                    <td class="meta_one_time_td">
                        <input type="checkbox" name="meta[one_time]" id="meta_one_time" value="yes" <?php if (isset($defaults['meta']['one_time']) && $defaults['meta']['one_time'] == 'yes') echo 'yes'; ?> />
                        <span class="description"><?php _e('Only send this email once per customer', 'wc_followup_emails'); ?></span>
                    </td>
                </tr>

                <tr valign="top" class="adjust_date_tr non-signup hideable">
                    <th scope="row" class="adjust_date_th">
                        <label for="adjust_date"><?php _e('Adjust date on duplicate', 'wc_followup_emails'); ?></label>
                    </th>
                    <td class="adjust_date_td">
                        <input type="checkbox" name="meta[adjust_date]" id="adjust_date" value="yes" <?php if (isset($defaults['meta']['adjust_date']) && $defaults['meta']['adjust_date'] == 'yes') echo 'checked'; ?> />
                        <span class="description"><?php _e('Adjust the send date of an email if the same email is already in the queue instead of sending it twice.', 'wc_followup_emails'); ?></span>
                    </td>
                </tr>

                <tr valign="top" class="non-generic non-signup hideable reminder <?php do_action('fue_form_product_description_tr_class', $defaults); ?> product_description_tr">
                    <th scope="row" colspan="2" class="product_description_th">
                    <strong><?php _e('Select the product that, when bought or added to the cart, will trigger this follow-up email.', 'wc_followup_emails'); ?></strong>
                    </th>
                </tr>

                <tr valign="top" class="non-generic non-signup hideable reminder <?php do_action('fue_form_product_tr_class', $defaults); ?> product_tr">
                    <th scope="row" class="product_th">
                        <label for="product_ids"><?php _e('Product', 'wc_followup_emails'); ?></label>
                    </th>
                    <td class="product_td">
                        <select id="product_id" name="product_id" class="ajax_chosen_select_products_and_variations" multiple data-placeholder="<?php _e('Search for a product&hellip;', 'woocommerce'); ?>" style="width: 400px">
                        <?php if ( !empty($default['product_id']) ): ?>
                            <option value="<?php echo $defaults['product_id']; ?>" selected><?php echo get_the_title($defaults['product_id']) .' #'. $defaults['product_id']; ?></option>
                        <?php endif; ?>
                        </select>
                    </td>
                </tr>

                <tr valign="top" class="non-generic non-signup hideable reminder <?php do_action('fue_form_category_tr_class', $defaults); ?> category_tr">
                    <th scope="row" class="category_th">
                        <label for="category_id"><?php _e('Category', 'wc_followup_emails'); ?></label>
                    </th>
                    <td class="category_td">
                        <select id="category_id" name="category_id" class="chzn-select" data-placeholder="<?php _e('Search for a category&hellip;', 'wc_followup_emails'); ?>" style="width: 400px;">
                            <option value="0"><?php _e('Select a category', 'wc_followup_emails'); ?></option>
                        <?php
                        foreach ($categories as $category):
                            $selected = ($category->term_id != $defaults['category_id']) ? '' : 'selected';
                        ?>
                            <option value="<?php _e($category->term_id); ?>" <?php echo $selected; ?>><?php echo esc_html($category->name); ?></option>
                        <?php endforeach; ?>
                        </select>
                    </td>
                </tr>

                <tr valign="top" class="non-generic non-signup hideable reminder <?php do_action('fue_form_custom_field_tr_class', $defaults); ?> use_custom_field_tr">
                    <th scope="row" class="use_custom_field_th">
                        <label for="use_custom_field"><?php _e('Use Custom Field', 'wc_followup_emails'); ?></label>
                    </th>
                    <td class="use_custom_field_td">
                        <input type="checkbox" name="use_custom_field" value="1" id="use_custom_field" />
                    </td>
                </tr>

                <tr valign="top" class="show-if-custom-field custom_field_tr">
                    <th scope="row" class="custom_field_th">
                        <label for="cf_product"><?php _e('Select the product and custom field to use', 'wc_followup_emails'); ?></label>
                    </th>
                    <td class="custom_field_td">
                        <div class="if-product-selected custom_field_select_div">
                            <select name="custom_fields" id="custom_fields">
                                <option><?php _e('Select a product first.', 'wc_followup_emails'); ?></option>
                            </select>
                            <span class="show-if-cf-selected"><input type="text" readonly onclick="jQuery(this).select();" value="" size="25" id="custom_field" /></span>
                        </div>
                        <div class="if-no-product-selected custom_field_error_div">
                            <p><?php _e('Please select a product first', 'wc_followup_emails'); ?></p>
                        </div>
                    </td>
                </tr>

                <?php do_action( 'fue_new_email_form_before_message', $defaults ); ?>

                <tr valign="top">
                    <th scope="row">
                        <label for="email_subject"><?php _e('Email Subject', 'wc_followup_emails'); ?></label>
                    </th>
                    <td>
                        <input type="text" name="email_subject" id="email_subject" value="<?php echo esc_attr($defaults['subject']); ?>" class="regular-text" />
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row">
                        <label for="email_message"><?php _e('Email Body', 'wc_followup_emails'); ?></label>
                        <br />
                        <span class="description">
                            <?php _e('You may use the following variables in the Email Subject and Body', 'wc_followup_emails'); ?>
                            <ul>
                                <?php do_action('fue_email_variables_list'); ?>
                                <li class="var hideable var_customer_first_name"><strong>{customer_first_name}</strong> <img class="help_tip" title="<?php _e('The first name of the customer who purchased from your store.', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_customer_name"><strong>{customer_name}</strong> <img class="help_tip" title="<?php _e('The full name of the customer who purchased from your store.', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_customer_email"><strong>{customer_email}</strong> <img class="help_tip" title="<?php _e('The email address of the customer who purchased from your store.', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_link"><strong>{link url=http://...}</strong> <img class="help_tip" title="<?php _e('The URL/Address to display', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_store_url"><strong>{store_url}</strong> <img class="help_tip" title="<?php _e('The URL/Address of your store.', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_store_url_path"><strong>{store_url=path}</strong> <img class="help_tip" title="<?php _e('The URL/Address of your store with path added at the end. Ex. {store_url=/categories}', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_store_name"><strong>{store_name}</strong> <img class="help_tip" title="<?php _e('The name of your store.', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_item_name non-generic non-signup"><strong>{item_name}</strong> <img class="help_tip" title="<?php _e('The name of the purchased item.', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_item_category non-generic non-signup"><strong>{item_category}</strong> <img class="help_tip" title="<?php _e('The list of categories where the purchased item is under.', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_item_names generic non-signup"><strong>{item_names}</strong> <img class="help_tip" title="<?php _e('Displays a list of purchased items.', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_item_categories generic non-signup"><strong>{item_categories}</strong> <img class="help_tip" title="<?php _e('The list of categories where the purchased items are under.', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_order_number not-cart non-signup"><strong>{order_number}</strong> <img class="help_tip" title="<?php _e('The generated Order Number for the puchase', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_order_datetime not-cart non-signup"><strong>{order_datetime}</strong> <img class="help_tip" title="<?php _e('The date and time that the order was made', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_unsubscribe_url"><strong>{unsubscribe_url}</strong> <img class="help_tip" title="<?php _e('URL where users will be able to opt-out of the email list.', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_post_id"><strong>{post_id=xx}</strong> <img class="help_tip" title="<?php _e('Include the excerpt of the specified Post ID.', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_dollars_spent_order var_customer"><strong>{dollars_spent_order}</strong> <img class="help_tip" title="<?php _e('The the amount spent on an order', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_dollars_spent_total var_customer"><strong>{dollars_spent_total}</strong> <img class="help_tip" title="<?php _e('Total amount spent by the customer', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_number_orders var_customer"><strong>{number_orders}</strong> <img class="help_tip" title="<?php _e('Total amount spent by the customer', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_last_purchase_date var_customer"><strong>{last_purchase_date}</strong> <img class="help_tip" title="<?php _e('The date the customer last ordered', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_first_email reminder"><strong>{first_email}...{/first_email}</strong> <img class="help_tip" title="<?php _e('The first email description...', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_quantity_email reminder"><strong>{quantity_email}...{/quantity_email}</strong> <img class="help_tip" title="<?php _e('The quantity email description...', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
                                <li class="var hideable var_final_email reminder"><strong>{final_email}...{/final_email}</strong> <img class="help_tip" title="<?php _e('The order total description...', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
								<!-- customly added by soumya -->
								<li class="var hideable var_order_total reminder"><strong>{order_total}</strong> <img class="help_tip" title="<?php _e('The order total description...', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
								<li class="var hideable var_order_delivery_date reminder"><strong>{order_delivery_date}</strong> <img class="help_tip" title="<?php _e('The order delivery date description...', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
								<li class="var hideable var_order_servings reminder"><strong>{order_servings}</strong> <img class="help_tip" title="<?php _e('The order servings description...', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
								<!-- -->
                            </ul>
                        </span>
                    </th>
                    <td>
                        <div id="poststuff">
                        <?php wp_editor($defaults['message'], 'email_message', array('textarea_rows' => 10, 'teeny' => true)); ?>
                        </div>
                    </td>
                </tr>

                <?php do_action('fue_new_email_form_after_message', $defaults); ?>

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
                        <input type="button" id="test_send" value="<?php _e('Send Email', 'wc_followup_emails'); ?>" class="button" />
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="submit">
            <input type="hidden" name="action" value="sfn_followup_new" />
            <input type="submit" id="save" name="save" class="hideable btn_save button-primary" value="<?php _e('Save Follow-Up Email', 'wc_followup_emails'); ?>" />
        </p>
    </form>
    <script type="text/javascript">
    var interval_types = <?php echo json_encode(SFN_FollowUpEmails::get_trigger_types()); ?>;
    var email_intervals = <?php echo json_encode(SFN_FollowUpEmails::get_email_type_triggers()); ?>;

    jQuery(document).ready(function() {
        <?php do_action('fue_new_email_form_script'); ?>
    });
    </script>

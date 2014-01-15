<?php

$GLOBALS['fue_subscriptions_product_link'] = 'http://www.75nineteen.com/woocommerce';

class FUE_Subscriptions {

    static $license_product = 'subscriptions';
    static $platform        = 'woocommerce';

    public function __construct() {
        if ( self::is_installed() ) {
            // subscriptions integration
            add_filter( 'fue_email_types', array($this, 'add_type') );
            add_filter( 'fue_trigger_types', array(&$this, 'add_triggers') );
            add_filter( 'fue_email_type_triggers', array($this, 'add_email_triggers') );

            add_action( 'fue_email_types_sub', array($this, 'email_list_link') );
            add_action( 'fue_email_types_section', array($this, 'email_list_table') );
            add_action( 'email_types_script', array($this, 'email_list_script') );
            add_action( 'email_types_update_priorities_script', array($this, 'email_list_update_script') );

            add_action( 'fue_email_variables_list', array(&$this, 'email_variables_list') );

            add_filter( 'fue_email_type_is_valid', array($this, 'email_type_valid'), 10, 2 );

            add_action( 'activated_subscription', array(&$this, 'subscription_activated'), 10, 2 );
            add_action( 'cancelled_subscription', array(&$this, 'subscription_cancelled'), 10, 2 );
            add_action( 'subscription_expired', array(&$this, 'subscription_expired'), 10, 2 );
            add_action( 'reactivated_subscription', array(&$this, 'reactivated_subscription'), 10, 2 );
            add_action( 'suspended_subscription', array(&$this, 'suspended_subscription'), 10, 2 );

            add_action( 'processed_subscription_payment', array($this, 'set_renewal_reminder'), 10, 2 );

            add_action( 'fue_new_email_form_script', array($this, 'add_script') );
            add_action( 'fue_edit_email_form_script', array($this, 'add_script') );

            add_filter( 'fue_send_email_subject', array(&$this, 'replace_variables'), 10, 2 );
            add_filter( 'fue_send_email_message', array(&$this, 'replace_variables'), 10, 2 );

            add_filter( 'fue_skip_email_sending', array($this, 'skip_sending_if_status_changed'), 10, 3 );
        }
    }

    public static function is_installed() {
        return ( class_exists( 'WC_Subscriptions' ) );
    }

    public function add_type( $types ) {
        $types['subscription'] = 'Subscription Email';

        return $types;
    }

    public function add_triggers( $triggers ) {
        $triggers['subs_activated']     = __('after subscription activated', 'wc_followup_emails');
        $triggers['subs_renewed']       = __('after subscription renewed', 'wc_followup_emails');
        $triggers['subs_cancelled']     = __('after subscription cancelled', 'wc_followup_emails');
        $triggers['subs_expired']       = __('after subscription expired', 'wc_followup_emails');
        $triggers['subs_suspended']     = __('after subscription suspended', 'wc_followup_emails');
        $triggers['subs_reactivated']   = __('after subscription reactivated', 'wc_followup_emails');
        $triggers['subs_before_renewal']= __('before next automatic subscription payment', 'wc_followup_emails');

        return $triggers;
    }

    public function add_email_triggers( $email_triggers ) {
        $email_triggers['subscription'] = array('subs_activated', 'subs_renewed', 'subs_cancelled', 'subs_expired', 'subs_suspended', 'subs_reactivated', 'subs_before_renewal');

        return $email_triggers;
    }

    public function email_list_link() {
        echo ' | <li><a href="#subscription_mails">'. __('Subscription Emails', 'wc_followup_emails') .'</a></li>';
    }

    public function email_list_table() {
        global $wpdb;

        $emails = $wpdb->get_results( "SELECT * FROM {$wpdb->prefix}followup_emails WHERE `email_type` = 'subscription' ORDER BY `priority` ASC, `name` ASC" );
        ?>
        <div class="section" id="subscription_mails">
            <h3><?php _e('Subscription Emails', 'wc_followup_emails'); ?></h3>

            <table class="wp-list-table widefat fixed posts subscription-table">
                <thead>
                    <tr>
                        <th scope="col" id="subscription_priority" class="manage-column column-type" style="width:50px;"><?php _e('Priority', 'wc_followup_emails'); ?></th>
                        <th scope="col" id="subscription_type" class="manage-column column-type" style=""><?php _e('Name', 'wc_followup_emails'); ?></th>
                        <th scope="col" id="subscription_interval" class="manage-column column-amount" style=""><?php _e('Interval', 'wc_followup_emails'); ?></th>
                        <th scope="col" id="subscription_usage_count" class="manage-column column-usage_count" style=""><?php _e('Used', 'wc_followup_emails'); ?></th>
                        <?php do_action( 'fue_table_customer_head' ); ?>
                    </tr>
                </thead>
                <tbody id="the_list">
                    <?php if (empty($emails)): ?>
                    <tr scope="row">
                        <th colspan="4"><?php _e('No emails available', 'wc_followup_emails'); ?></th>
                    </tr>
                    <?php
                    else:
                        $p = 0;
                        foreach ($emails as $email):
                        $p++;
                    ?>
                    <tr scope="row">
                        <td style="text-align: center; vertical-align:middle;"><span class="priority"><?php echo $p; ?></span></td>
                        <td class="post-title column-title">
                            <input type="hidden" name="generic_order[]" value="<?php echo $email->id; ?>" />
                            <strong><a class="row-title" href="admin.php?page=wc-followup-emails&tab=edit&id=<?php echo $email->id; ?>"><?php echo stripslashes($email->name); ?></a></strong>
                            <div class="row-actions">
                                <span class="edit"><a href="admin.php?page=wc-followup-emails&tab=edit&id=<?php echo $email->id; ?>"><?php _e('Edit', 'wc_followup_emails'); ?></a></span>
                                |
                                <span class="trash"><a onclick="return confirm('Really delete this entry?');" href="admin.php?page=wc-followup-emails&tab=delete&id=<?php echo $email->id; ?>"><?php _e('Delete', 'wc_followup_emails'); ?></a></span>
                            </div>
                        </td>
                        <td>
                            <?php
                            $interval_str = sprintf( __('%d %s %s'), $email->interval_num, SFN_FollowUpEmails::get_duration($email->interval_duration), SFN_FollowUpEmails::get_trigger_name($email->interval_type) );

                            echo apply_filters( 'fue_interval_str', $interval_str, $email );
                            ?>
                        </td>
                        <td>
                        <?php echo $email->usage_count; ?>
                        </td>
                        <?php do_action( 'fue_table_customer_body' ); ?>
                    </tr>
                    <?php
                        endforeach;
                    ?>
                    <?php endif; ?>
                </tbody>
            </table>
            <div class="fue_table_footer">
                <div class="order_message"></div>
            </div>
        </div>
        <?php
    }

    public function email_list_script() {
        ?>
        jQuery('table.subscription-table tbody').sortable({
            items:'tr',
            cursor:'move',
            axis:'y',
            handle: 'td',
            scrollSensitivity:40,
            helper:function(e,ui){
                ui.children().each(function(){
                    jQuery(this).width(jQuery(this).width());
                });
                ui.css('left', '0');
                return ui;
            },
            start:function(event,ui){
                ui.item.css('background-color','#f6f6f6');
            },
            stop:function(event,ui){
                ui.item.removeAttr('style');
                update_priorities();
            }
        });
        <?php
    }

    public function email_type_valid( $is_valid, $data ) {
        if ( $data['email_type'] == 'subscription' ) $is_valid = true;

        return $is_valid;
    }

    public function email_list_update_script() {
        ?>
        jQuery('.subscription-table tbody tr').each(function(x){
            jQuery(this).find('td .priority').html(x+1);
        });
        <?php
    }

    public function email_variables_list() {
        global $woocommerce;
        ?>
        <li class="var hideable var_subscriptions"><strong>{sub_renew_date}</strong> <img class="help_tip" title="<?php _e('The date that a customer\'s subscription renews', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
        <li class="var hideable var_subscriptions"><strong>{days_to_renew}</strong> <img class="help_tip" title="<?php _e('The number of days before a subscription is up for renewal', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
        <?php
    }

    public static function subscription_activated( $user_id, $subs_key ) {
        global $wpdb;

        $parts = explode('_', $subs_key);
        $order_id       = $parts[0];
        $item_id        = $parts[1];

        $subscription   = WC_Subscriptions_Manager::get_users_subscription( $user_id, $subs_key );

        if ( count($subscription['completed_payments']) > 1 ) {
            $triggers[]     = 'subs_renewed';
        } else {
            $triggers[]     = 'subs_activated';
        }

        $order          = new WC_Order($order_id);
        $items          = $order->get_items();
        $order_created  = false;


        self::create_email_orders($order_id, $triggers, $subs_key);

    }

    public static function subscription_cancelled( $user_id, $subs_key ) {
        global $wpdb;

        $parts = explode('_', $subs_key);
        $order_id       = $parts[0];
        $item_id        = $parts[1];

        $order          = new WC_Order($order_id);
        $items          = $order->get_items();
        $order_created  = false;
        $triggers[]     = 'subs_cancelled';

        self::create_email_orders($order_id, $triggers, $subs_key);
    }

    public static function subscription_expired( $user_id, $sub_key ) {
        global $wpdb;

        $parts = explode('_', $subs_key);
        $order_id       = $parts[0];
        $item_id        = $parts[1];

        $order          = new WC_Order($order_id);
        $items          = $order->get_items();
        $order_created  = false;
        $triggers[]     = 'subs_expired';

        self::create_email_orders($order_id, $triggers, $subs_key);
    }

    public static function reactivated_subscription( $user_id, $subs_key ) {
        global $wpdb;

        $parts = explode('_', $subs_key);
        $order_id       = $parts[0];
        $item_id        = $parts[1];

        $order          = new WC_Order($order_id);
        $items          = $order->get_items();
        $order_created  = false;
        $triggers[]     = 'subs_reactivated';

        self::create_email_orders($order_id, $triggers, $subs_key);
    }

    public static function suspended_subscription( $user_id, $subs_key ) {
        global $wpdb;

        $parts = explode('_', $subs_key);
        $order_id       = $parts[0];
        $item_id        = $parts[1];

        $order          = new WC_Order($order_id);
        $items          = $order->get_items();
        $order_created  = false;
        $triggers[]     = 'subs_suspended';

        self::create_email_orders($order_id, $triggers, $subs_key);

    }

    public static function create_email_orders($order_id, $triggers, $subs_key = '') {
        global $wpdb;

        $trigger = '';
        foreach ( $triggers as $t ) {
            $trigger .= "'". esc_sql($t) ."',";
        }
        $trigger = rtrim($trigger, ',');

        if ( empty($trigger) ) $trigger = "''";

        $emails = $wpdb->get_results( "SELECT * FROM {$wpdb->prefix}followup_emails WHERE `interval_type` IN ($trigger)" );

        foreach ( $emails as $email ) {
            $interval   = (int)$email->interval_num;

            $add        = FUE::get_time_to_add( $interval, $email->interval_duration );
            $send_on    = current_time('timestamp') + $add;

            $insert = array(
                'send_on'       => $send_on,
                'email_id'      => $email->id,
                'product_id'    => 0,
                'order_id'      => $order_id
            );

            if ( $subs_key ) {
                $insert['meta']['subs_key'] = $subs_key;
            }

            FUE::insert_email_order( $insert );
        }
    }

    public function skip_sending_if_status_changed( $skip, $email, $email_order ) {
        global $wpdb;

        if ( isset($email_order->meta) && !empty($email_order->meta) ) {

            $meta = maybe_unserialize($email_order->meta);

            if ( isset($meta['subs_key']) ) {
                $delete         = false;
                $subscription   = WC_Subscriptions_Manager::get_users_subscription( $email_order->user_id, $meta['subs_key'] );

                if ( $subscription ) {

                    if ( ($email->interval_type == 'subs_suspended' || $email->interval_type == 'subs_expired') && $subscription['status'] != 'on-hold' ) {
                        $delete = true;
                        $skip = true;
                    } elseif ( ($email->interval_type == 'subs_activated' || $email->interval_type == 'subs_renewed' || $email->interval_type == 'subs_reactivated') && $subscription['status'] != 'active' ) {
                        $delete = true;
                        $skip = true;
                    } elseif ( $email->interval_type == 'subs_cancelled' && $subscription['status'] != 'cancelled' ) {
                        $delete = true;
                        $skip = true;
                    }

                    if ( $delete ) {
                        $wpdb->query( $wpdb->prepare("DELETE FROM {$wpdb->prefix}followup_email_orders WHERE id = %d", $email_order->id) );
                    }

                } // if ($subscription)
            } // if ( isset($meta['subs_key']) )

        } // if ( isset($email_order->meta) && !empty($email_order->meta) )

        return $skip;

    }

    public static function set_renewal_reminder( $user_id, $subs_key ) {
        global $wpdb;

        $parts      = explode('_', $subs_key);
        $order_id   = $parts[0];
        $order      = new WC_Order( $order_id );

        if ( WC_Subscriptions_Order::order_contains_subscription($order) ) {

            // look for renewal emails
            $emails = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}followup_emails WHERE `interval_type` = 'subs_before_renewal'");

            if ( count($emails) > 0 ) {
                $item       = WC_Subscriptions_Order::get_item_by_product_id($order);
                $item_id    = WC_Subscriptions_Order::get_items_product_id($item);
                $renewal    = WC_Subscriptions_Order::get_next_payment_timestamp($order, $item_id);

                if ( 0 == $renewal ) return;

                foreach ( $emails as $email ) {
                    // add this email to the queue
                    $interval   = (int)$email->interval_num;
                    $add        = FUE::get_time_to_add( $interval, $email->interval_duration );
                    $send_on    = $renewal - $add;

                    $insert = array(
                        'send_on'       => $send_on,
                        'email_id'      => $email->id,
                        'product_id'    => 0,
                        'order_id'      => $order_id
                    );
                    FUE::insert_email_order( $insert );
                }
            }

        }
    }

    public function add_script() {
        ?>
        jQuery("body").bind("fue_email_type_changed", function(evt, type) {
            subscriptions_toggle_fields( type );
        });

        function subscriptions_toggle_fields( type ) {
            if (type == "subscription") {
                var val  = jQuery("#interval_type").val();
                var show = ['.var_subscriptions', '.interval_type_subs_activated', '.interval_type_subs_renewed', '.interval_type_subs_cancelled', '.interval_type_subs_expired', '.interval_type_subs_suspended', '.interval_type_subs_reactivated', '.interval_type_subs_before_renewal'];
                var hide = ['.interval_type_option', '.always_send_tr', '.signup_description', '.product_description_tr', '.product_tr', '.category_tr', '.use_custom_field_tr', '.custom_field_tr', '.var_item_name', '.var_item_category', '.var_item_names', '.var_item_categories', '.var_item_name', '.var_item_category', '.interval_type_after_last_purchase', '.interval_duration_date', '.var_customer'];

                for (x = 0; x < hide.length; x++) {
                    jQuery(hide[x]).hide();
                }

                for (x = 0; x < show.length; x++) {
                    jQuery(show[x]).show();
                }

                // triggers
                jQuery(".interval_type_option").remove();

                if ( email_intervals && email_intervals.subscription.length > 0 ) {
                    for (var x = 0; x < email_intervals.subscription.length; x++) {
                        var int_key = email_intervals.subscription[x];
                        jQuery("#interval_type").append('<option class="interval_type_option interval_type_'+ int_key +'" id="interval_type_option_'+ int_key +'" value="'+ int_key +'">'+ interval_types[int_key] +'</option>');
                    }

                    jQuery("#interval_type").val(val);
                }

                jQuery(".interval_duration_date").hide();

                jQuery("#interval_type").change();
            } else {
                var hide = ['.var_subscriptions', '.interval_type_subs_activated', '.interval_type_subs_renewed', '.interval_type_subs_cancelled', '.interval_type_subs_expired', '.interval_type_subs_suspended', '.interval_type_subs_reactivated', '.interval_type_subs_before_renewal'];

                for (x = 0; x < hide.length; x++) {
                    jQuery(hide[x]).hide();
                }
            }
        }

        jQuery(document).ready(function() {
            subscriptions_toggle_fields( jQuery("#email_type").val() );
        });
        <?php
    }

    public function replace_variables( $text, $email_order ) {
        $order          = new WC_Order( $email_order->order_id );

        $item       = WC_Subscriptions_Order::get_item_by_product_id($order);
        $item_id    = WC_Subscriptions_Order::get_items_product_id($item);
        $renewal    = WC_Subscriptions_Order::get_next_payment_timestamp($order, $item_id);

        $renew_date     = date( get_option('date_format'), $renewal );

        // calc days to renew
        $now    = current_time( 'timestamp' );
        $diff   = $renewal - $now;
        $days_to_renew = 0;
        if ( $diff > 0 ) {
            $days_to_renew = floor( $diff / 86400 );
        }

        $search         = array( '{subs_renew_date}', '{days_to_renew}' );
        $replacements   = array( $renew_date, $days_to_renew );

        return str_replace( $search, $replacements, $text );
    }

}

$GLOBALS['fue_subscriptions'] = new FUE_Subscriptions();

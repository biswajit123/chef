<?php

class FUE_Points_And_Rewards {

    public function __construct() {
        if (self::is_installed()) {
            add_filter( 'fue_email_types', array($this, 'add_type') );
            add_filter( 'fue_trigger_types', array(&$this, 'add_trigger') );
            add_filter( 'fue_email_type_triggers', array($this, 'add_email_triggers') );
            add_action( 'fue_email_form_interval_meta', array($this, 'add_interval_meta') );

            // reports
            add_filter( 'fue_interval_str', array($this, 'interval_string'), 10, 2 );

            add_action( 'fue_email_types_sub', array($this, 'email_list_link') );
            add_action( 'fue_email_types_section', array($this, 'email_list_table') );
            add_action( 'email_types_script', array($this, 'email_list_script') );
            add_action( 'email_types_update_priorities_script', array($this, 'email_list_update_script') );

            add_filter( 'fue_email_type_is_valid', array($this, 'email_type_valid'), 10, 2 );

            add_action( 'fue_new_email_form_script', array($this, 'add_script') );
            add_action( 'fue_edit_email_form_script', array($this, 'add_script') );

            add_action( 'wc_points_rewards_after_increase_points', array(&$this, 'after_points_increased'), 10, 5 );
            add_action( 'fue_email_variables_list', array(&$this, 'email_variables_list') );

            add_filter( 'fue_send_test_email_subject', array(&$this, 'test_replace_variables') );
            add_filter( 'fue_send_test_email_message', array(&$this, 'test_replace_variables') );

            add_filter( 'fue_send_email_subject', array(&$this, 'replace_variables'), 10, 2 );
            add_filter( 'fue_send_email_message', array(&$this, 'replace_variables'), 10, 2 );
        }
    }

    public static function is_installed() {
        return class_exists('WC_Points_Rewards');
    }

    public function add_type( $types ) {
        $types['points_and_rewards'] = 'Points and Rewards Email';

        return $types;
    }

    public function add_trigger( $triggers ) {
        $triggers['points_earned'] = __('After: Points Earned', 'wc_followup_emails');
        $triggers['points_greater_than'] = __('Earned Points is greater than', 'wc_followup_emails');
        return $triggers;
    }

    public function add_email_triggers( $email_triggers ) {
        $email_triggers['points_and_rewards'] = array('points_earned', 'points_greater_than');

        return $email_triggers;
    }

    public function add_interval_meta( $defaults ) {
        ?>
        <span class="points-greater-than-meta" style="display:none;">
            <input type="text" name="meta[points_greater_than]" value="<?php if (isset($defaults['meta']['points_greater_than'])) echo $defaults['meta']['points_greater_than']; ?>" />
        </span>
        <?php
    }

    public function email_list_link() {
        echo ' | <li><a href="#pointsrewards_mails">'. __('Points and Rewards Emails', 'wc_followup_emails') .'</a></li>';
    }

    public function email_list_table() {
        global $wpdb;

        $emails = $wpdb->get_results( "SELECT * FROM {$wpdb->prefix}followup_emails WHERE `email_type` = 'points_and_rewards' ORDER BY `priority` ASC, `name` ASC" );
        ?>
        <div class="section" id="pointsrewards_mails">
            <h3><?php _e('Points and Rewards Emails', 'wc_followup_emails'); ?></h3>

            <table class="wp-list-table widefat fixed posts pointsrewards-table">
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

                            if ($email->interval_type == "points_greater_than") {
                                $meta = maybe_unserialize( $email->meta );
                                $interval_str = sprintf( __('%d %s %s %d'), $email->interval_num, SFN_FollowUpEmails::get_duration($email->interval_duration), SFN_FollowUpEmails::get_trigger_name($email->interval_type), $meta['points_greater_than'] );
                            }

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
        jQuery('table.pointsrewards-table tbody').sortable({
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
        if ( $data['email_type'] == 'points_and_rewards' ) $is_valid = true;

        return $is_valid;
    }

    public function email_list_update_script() {
        ?>
        jQuery('.pointsrewards-table tbody tr').each(function(x){
            jQuery(this).find('td .priority').html(x+1);
        });
        <?php
    }

    public function add_script() {
        ?>
        jQuery("body").bind("fue_email_type_changed", function(evt, type) {
            points_rewards_toggle_fields( type );
        });

        function points_rewards_toggle_fields( type ) {
            if (type == "points_and_rewards") {

                var show = ['.var_points_and_rewards'];
                var hide = ['.always_send_tr', '.signup_description', '.product_description_tr', '.product_tr', '.category_tr', '.use_custom_field_tr', '.custom_field_tr', '.var_item_name', '.var_item_category', '.var_item_names', '.var_item_categories', '.var_item_name', '.var_item_category', '.interval_type_after_last_purchase', '.interval_duration_date', '.var_customer'];

                for (x = 0; x < hide.length; x++) {
                    jQuery(hide[x]).hide();
                }

                for (x = 0; x < show.length; x++) {
                    jQuery(show[x]).show();
                }

                // triggers
                jQuery(".interval_type_option").remove();

                if ( email_intervals && email_intervals.points_and_rewards.length > 0 ) {
                    for (var x = 0; x < email_intervals.points_and_rewards.length; x++) {
                        var int_key = email_intervals.points_and_rewards[x];
                        jQuery("#interval_type").append('<option class="interval_type_option interval_type_'+ int_key +'" id="interval_type_option_'+ int_key +'" value="'+ int_key +'">'+ interval_types[int_key] +'</option>');
                    }
                }

                jQuery(".interval_duration_date").hide();

                jQuery("#interval_type")
                    .val("points_earned")
                    .change();
            } else {
                var hide = ['.interval_type_points_earned', '.interval_type_points_greater_than', '.var_points_and_rewards'];

                for (x = 0; x < hide.length; x++) {
                    jQuery(hide[x]).hide();
                }
            }
        }

        jQuery(document).ready(function() {
            points_rewards_toggle_fields( jQuery("#email_type").val() );

            jQuery("#interval_type").change(function() {
                if (jQuery(this).val() == "points_greater_than") {
                    jQuery(".points-greater-than-meta").show();
                } else {
                    jQuery(".points-greater-than-meta").hide();
                }
            });
        });
        <?php
    }

    public function after_points_increased( $user_id, $points, $event_type, $data = null, $order_id = 0 ) {
        global $wpdb;

        $emails = $wpdb->get_results( "SELECT * FROM {$wpdb->prefix}followup_emails WHERE `interval_type` IN ('points_earned', 'points_greater_than')" );

        foreach ( $emails as $email ) {
            $interval   = (int)$email->interval_num;

            if ( $email->interval_type == 'points_greater_than' ) {
                $meta = maybe_unserialize( $email->meta );
                if ( $points < $meta['points_greater_than'] ) continue;
            }

            if ( $email->interval_type == 'date' ) {
                if ( !empty($email->send_date_hour) && !empty($email->send_date_minute) ) {
                    $send_on = strtotime($email->send_date .' '. $email->send_date_hour .':'. $email->send_date_minute);

                    if ( false === $send_on ) {
                        // fallback to only using the date
                        $send_on = strtotime($email->send_date);
                    }
                } else {
                    $send_on = strtotime($email->send_date);
                }
            } else {
                $add        = FUE::get_time_to_add( $interval, $email->interval_duration );
                $send_on    = current_time('timestamp') + $add;
            }

            $insert = array(
                'send_on'       => $send_on,
                'email_id'      => $email->id,
                'user_id'       => $user_id,
                'order_id'      => 0,
                'is_cart'       => 0
            );

            $email_order_id = FUE::insert_email_order( $insert );
            $data = array(
                'user_id'       => $user_id,
                'points'        => $points,
                'event_type'    => $event_type
            );
            update_option( 'fue_email_order_'. $email_order_id, $data );
        }
    }

    public function email_variables_list() {
        global $woocommerce;
        ?>
        <li class="var hideable var_points_and_rewards"><strong>{points_earned}</strong> <img class="help_tip" title="<?php _e('The number of points earned', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
        <li class="var hideable var_points_and_rewards"><strong>{reward_event_description}</strong> <img class="help_tip" title="<?php _e('The description of the action', 'wc_followup_emails'); ?>" src="<?php echo $woocommerce->plugin_url(); ?>/assets/images/help.png" width="16" height="16" /></li>
        <?php
    }

    public function replace_variables( $text, $email_order ) {
        global $wc_points_rewards;

        $event_data     = get_option( 'fue_email_order_'. $email_order->id, false );

        if (! $event_data ) {
            $event_data = array(
                'user_id'       => 0,
                'points'        => 0,
                'event_type'    => ''
            );
        }

        $points         = $event_data['points'];
        $points_label   = $wc_points_rewards->get_points_label( $points );
        $description    = WC_Points_Rewards_Manager::event_type_description($event_data['event_type']);

        $search         = array( '{points_earned}', '{reward_event_description}' );
        $replacements   = array( $points, $description );

        return str_replace( $search, $replacements, $text );
    }

    public function test_replace_variables( $text ) {
        $search         = array( '{points_earned}', '{reward_event_description}' );
        $replacements   = array( 50, 'Test Event Description' );
        return str_replace( $search, $replacements, $text );
    }

    public function interval_string( $string, $email ) {
        if ( $email->interval_type == 'points_greater_than' ) {
            $meta = maybe_unserialize( $email->meta );
            $string = sprintf( __('%d %s %s %d'), $email->interval_num, SFN_FollowUpEmails::get_duration($email->interval_duration), SFN_FollowUpEmails::get_trigger_name($email->interval_type), $meta['points_greater_than'] );
        }

        return $string;
    }

}

$GLOBALS['fue_points_and_rewards'] = new FUE_Points_And_Rewards();

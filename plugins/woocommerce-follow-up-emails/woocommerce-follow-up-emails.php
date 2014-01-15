<?php
/*
Plugin Name: WooCommerce Follow-Up Emails
Plugin URI: http://woothemes.com/woocommerce
Description: The most comprehensive email marketing tool for WooCommerce. Automate your email marketing to drive your customer engagement to a new level pre and post sale. Learn more at <a href="http://www.75nineteen.com/woocommerce/follow-up-email-autoresponder/?utm_source=WooCommerce&utm_medium=Link&utm_campaign=FUE" target="_blank">Follow-up Emails</a>.
Version: 2.5.16
Author: 75nineteen Media
Author URI: http://www.75nineteen.com/woocommerce/follow-up-email-autoresponder/

Copyright: © 2013 75nineteen Media.
License: GNU General Public License v3.0
License URI: http://www.gnu.org/licenses/gpl-3.0.html
*/

/** Path and URL constants **/
define( 'FUE_VERSION', '2.5.16' );
define( 'FUE_FILE', __FILE__ );
define( 'FUE_DIR', dirname(__FILE__) );
define( 'FUE_URL', plugins_url('', __FILE__) );
define( 'FUE_INC_DIR', FUE_DIR .'/includes' );
define( 'FUE_INC_URL', FUE_URL .'/includes' );
define( 'FUE_ADDONS_DIR', FUE_DIR .'/addons' );
define( 'FUE_ADDONS_URL', FUE_URL .'/addons' );
define( 'FUE_TEMPLATES_DIR', FUE_DIR .'/templates' );
define( 'FUE_TEMPLATES_URL', FUE_URL .'/templates' );

/**
 * Required functions
 */
if ( ! function_exists( 'woothemes_queue_update' ) )
	require_once( 'woo-includes/woo-functions.php' );

/**
 * Plugin updates
 */
woothemes_queue_update( plugin_basename( __FILE__ ), '05ece68fe94558e65278fe54d9ec84d2', '18686' );

if ( is_woocommerce_active() ) {
	/**
	 * Localisation
	 **/
	load_plugin_textdomain( 'wc_followup_emails', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

	class SFN_FollowUpEmails {

        private $db_version         = '4.22';
        public static $triggers     = array();
        public static $email_types  = array();
        public static $email_type_triggers = array();
        public static $durations    = array();
        public static $addons       = array();

	    public function __construct() {
            // required files
            require_once FUE_INC_DIR .'/fue_functions.php';
            require_once FUE_INC_DIR .'/class.fue.php';

            self::$triggers = array(
                'first_purchase'        => __('after first purchase', 'wc_followup_emails'),
                'cart'                  => __('after added to cart', 'wc_followup_emails'),
                'after_last_purchase'   => __('after last purchase', 'wc_followup_emails'),
                'order_total_above'     => __('after order total is above', 'wc_followup_emails'),
                'order_total_below'     => __('after order total is below', 'wc_followup_emails'),
                'purchase_above_one'    => __('after customer purchased more than one time', 'wc_followup_emails'),
                'total_orders'          => __('after total orders by customer', 'wc_followup_emails'),
                'total_purchases'       => __('after total purchase amount by customer', 'wc_followup_emails')
            );

            self::$email_types = array(
                'normal'        => __('Product/Category Email', 'wc_followup_emails'),
                'generic'       => __('Storewide Email', 'wc_followup_emails'),
                'signup'        => __('User Signup Email', 'wc_followup_emails'),
                'manual'        => __('Manual Email', 'wc_followup_emails'),
                'customer'      => __('Customer Email', 'wc_followup_emails'),
                'reminder'      => __('Reminder Email', 'wc_followup_emails')
            );

            self::$email_type_triggers = array(
                'normal'        => array('cart'),
                'generic'       => array('first_purchase', 'cart'),
                'signup'        => array(),
                'manual'        => array(),
                'customer'      => array(
                                        'after_last_purchase', 'order_total_above', 'order_total_below',
                                        'purchase_above_one', 'total_orders', 'total_purchases'
                                    ),
                'reminder'      => array()
            );

            self::$durations = array(
                'minutes'   => __('minutes', 'wc_followup_emails'),
                'hours'     => __('hours', 'wc_followup_emails'),
                'days'      => __('days', 'wc_followup_emails'),
                'weeks'     => __('weeks', 'wc_followup_emails'),
                'months'    => __('months', 'wc_followup_emails'),
                'years'     => __('years', 'wc_followup_emails'),
                'date'      => __('on this date', 'wc_followup_emails')
            );

            // install
	        register_activation_hook(__FILE__, array($this, 'install'));

            // uninstall
            register_deactivation_hook(__FILE__, array($this, 'uninstall'));

            // Upgrade
        	add_action( 'plugins_loaded', array( $this, 'update_db' ) );

            add_action( 'init', 'FUE::initial_order_import' );

            // menu
	        add_action('admin_menu', array($this, 'menu'), 20);

            // settings styles and scripts
	        add_action( 'admin_enqueue_scripts', array($this, 'settings_scripts'));

            // new cron event
            add_filter( 'cron_schedules', array($this, 'cron_schedules') );

            // cron action
            add_action('sfn_followup_emails', array($this, 'send_emails'));
            add_action('sfn_optimize_tables', array($this, 'optimize_tables'));

            // send manual emails
            add_action('admin_post_sfn_followup_send_manual', array($this, 'send_manual'));

            // account form
            add_shortcode( 'woocommerce_followup_optout', array($this, 'my_account') );

            // @since 2.2.1 support custom order statuses
            add_action( 'init', array($this, 'hook_statuses') );

            // after user signs up
            add_action('user_register', array($this, 'user_register') );

            // settings actions
            add_action( 'admin_post_sfn_followup_new', array($this, 'create_email'));
            add_action( 'admin_post_sfn_followup_edit', array($this, 'update_email'));
            add_action( 'admin_post_sfn_followup_save_priorities', array($this, 'update_priorities') );
            add_action( 'admin_post_sfn_followup_save_settings', array($this, 'update_settings') );
            add_action( 'admin_post_sfn_followup_activation', array($this, 'activation') );
            add_action( 'admin_post_fue_activate_addon', array($this, 'activate_addon') );
            add_action( 'admin_post_fue_deactivate_addon', array($this, 'deactivate_addon') );

            // test email
            add_action('wp_ajax_sfn_test_email', array('FUE', 'send_test_email'));

            // find dupes/similar follow-ups
            add_action('wp_ajax_sfn_fe_find_dupes', array($this, 'find_dupes'));

            // email search
            add_action('wp_ajax_fue_email_query', array($this, 'email_query'));

            // get post custom fields
            add_action('wp_ajax_fue_get_custom_fields', array($this, 'get_custom_fields'));

            // catch unsubscribe request
            add_action('template_redirect', array($this, 'unsubscribe_request'));
            add_action('template_redirect', array($this, 'update_my_account'));

            // shortcode for the unsubscribe page
            add_shortcode( 'woocommerce_followup_unsubscribe', array($this, 'unsubscribe_form') );

            // add to cart
            add_action( 'woocommerce_cart_updated', array($this, 'cart_updated') );
            add_action( 'woocommerce_cart_emptied', array($this, 'cart_emptied') );
            //add_action( 'woocommerce_before_cart_item_quantity_zero', array($this, 'cart_item_removed') );

            // load addons
            add_action( 'plugins_loaded', array($this, 'load_addons') );

            add_filter( 'woocommerce_json_search_found_products', array($this, 'found_products') );

            do_action( 'fue_init' );
	    }

        function hook_statuses() {
            $order_statuses = (array)get_terms( 'shop_order_status', array('hide_empty' => 0, 'orderby' => 'id') );
            $triggers       = self::$triggers;

            if (! isset($order_statuses['errors']) ) {
                foreach ( $order_statuses as $status ) {
                    add_action('woocommerce_order_status_'. $status->slug, array($this, 'new_order'));
                }
            }
        }

        /**
         * Load everything inside the /addons directory
         */
        function load_addons() {
            require_once FUE_INC_DIR .'/class.fue_subscriptions.php';
            require_once FUE_INC_DIR .'/class.fue_coupons.php';
            require_once FUE_INC_DIR .'/class.fue_reports.php';
            require_once FUE_INC_DIR .'/class.fue_warranty.php';
            require_once FUE_INC_DIR .'/class.fue_points_and_rewards.php';
            require_once FUE_INC_DIR .'/class.the_events_calendar.php';

            do_action( 'fue_addons_loaded' );
        }

        function update_db() {
            global $wpdb;

            if ( get_option( 'woocommerce_followup_db_version' ) == $this->db_version ) return;

            $wpdb->hide_errors();
            $collate = '';

            if ( method_exists($wpdb, 'has_cap') ) {
                if ( $wpdb->has_cap('collation') ) {
                    if( ! empty($wpdb->charset ) ) $collate .= "DEFAULT CHARACTER SET $wpdb->charset";
                    if( ! empty($wpdb->collate ) ) $collate .= " COLLATE $wpdb->collate";
                }
            } else {
                if ( $wpdb->supports_collation() ) {
                    if( ! empty($wpdb->charset ) ) $collate .= "DEFAULT CHARACTER SET $wpdb->charset";
                    if( ! empty($wpdb->collate ) ) $collate .= " COLLATE $wpdb->collate";
                }
            }

            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

            $table = $wpdb->prefix . 'followup_emails';
            $sql = "CREATE TABLE $table (
id bigint(20) NOT NULL AUTO_INCREMENT,
product_id bigint(20) NOT NULL,
category_id BIGINT(20) NOT NULL DEFAULT 0,
name varchar(100) NOT NULL,
interval_num int(3) DEFAULT 1 NOT NULL,
interval_duration VARCHAR(50) DEFAULT 'days' NOT NULL,
interval_type VARCHAR(50) DEFAULT  'purchase' NOT NULL,
send_date VARCHAR(50) DEFAULT '' NOT NULL,
send_date_hour VARCHAR(4) DEFAULT '' NOT NULL,
send_date_minute VARCHAR(4) DEFAULT '' NOT NULL,
subject VARCHAR(255) NOT NULL,
message LONGTEXT NOT NULL,
tracking_code VARCHAR(255) NOT NULL,
usage_count BIGINT(20) DEFAULT 0 NOT NULL,
date_added DATETIME DEFAULT '0000-00-00 00:00:00' NOT NULL,
email_type VARCHAR(50) DEFAULT '' NOT NULL,
priority INT(3) DEFAULT 0 NOT NULL,
always_send INT(1) DEFAULT 0 NOT NULL,
meta TEXT NOT NULL,
KEY category_id (category_id),
KEY product_id (product_id),
KEY email_type (email_type),
PRIMARY KEY  (id)
) $collate";
            dbDelta($sql);

            $table = $wpdb->prefix . 'followup_email_excludes';
            $sql = "CREATE TABLE $table (
id bigint(20) NOT NULL AUTO_INCREMENT,
email_id bigint(20) NOT NULL,
email_name varchar(255) NOT NULL,
email varchar(100) NOT NULL,
date_added DATETIME NOT NULL,
PRIMARY KEY  (id)

) $collate";
            dbDelta($sql);

            $table = $wpdb->prefix . 'followup_email_orders';
            $sql = "CREATE TABLE $table (
id bigint(20) NOT NULL AUTO_INCREMENT,
user_id bigint(20) NOT NULL,
user_email varchar(255) NOT NULL,
order_id bigint(20) NOT NULL,
product_id bigint(20) NOT NULL,
email_id varchar(100) NOT NULL,
send_on bigint(20) NOT NULL,
is_cart int(1) DEFAULT 0 NOT NULL,
is_sent int(1) DEFAULT 0 NOT NULL,
date_sent datetime NOT NULL,
email_trigger varchar(100) NOT NULL,
meta TEXT NOT NULL,
KEY user_id (user_id),
KEY user_email (user_email),
KEY order_id (order_id),
KEY is_sent (is_sent),
KEY date_sent (date_sent),
PRIMARY KEY  (id)
) $collate";
            dbDelta($sql);

            $table = $wpdb->prefix .'followup_email_coupons';
            $sql = "CREATE TABLE $table (
email_id bigint(20) NOT NULL,
send_coupon int(1) DEFAULT 0 NOT NULL,
coupon_id bigint(20) DEFAULT 0 NOT NULL,
KEY email_id (email_id)
) $collate";
            dbDelta($sql);

            $table = $wpdb->prefix .'followup_email_order_coupons';
            $sql = "CREATE TABLE $table (
email_order_id bigint(20) NOT NULL,
coupon_name varchar(100) NOT NULL,
coupon_code varchar(20) NOT NULL,
KEY emil_order_id (email_order_id)
) $collate";
            dbDelta($sql);

            $table = $wpdb->prefix . 'followup_coupon_logs';
            $sql = "CREATE TABLE $table (
id bigint(20) NOT NULL AUTO_INCREMENT,
coupon_id bigint(20) NOT NULL,
coupon_name varchar(100) NOT NULL,
email_name varchar(100) NOT NULL,
email_address varchar(255) NOT NULL,
coupon_code varchar(100) NOT NULL,
coupon_used INT(1) DEFAULT 0 NOT NULL,
date_sent datetime NOT NULL,
date_used datetime NOT NULL,
KEY coupon_id (coupon_id),
KEY date_sent (date_sent),
PRIMARY KEY  (id)
) $collate";
            dbDelta($sql);

            $table = $wpdb->prefix . 'followup_coupons';
            $sql = "CREATE TABLE $table (
id bigint(20) NOT NULL AUTO_INCREMENT,
coupon_name varchar(100) NOT NULL,
coupon_type varchar(25) default 0 NOT NULL,
coupon_prefix varchar(25) default '' NOT NULL,
amount double(12,2) default 0.00 NOT NULL,
individual int(1) default 0 NOT NULL,
before_tax int(1) default 0 NOT NULL,
free_shipping int(1) default 0 NOT NULL,
usage_count bigint(20) default 0 NOT NULL,
expiry_value varchar(3) NOT NULL DEFAULT 0,
expiry_type varchar(25) NOT NULL DEFAULT '',
product_ids varchar(255) NOT NULL DEFAULT '',
exclude_product_ids varchar(255) NOT NULL DEFAULT '',
product_categories TEXT,
exclude_product_categories TEXT,
minimum_amount varchar(50) NOT NULL DEFAULT '',
usage_limit varchar(3) NOT NULL DEFAULT '',
KEY coupon_name (coupon_name),
KEY usage_count (usage_count),
PRIMARY KEY  (id)
) $collate";
            dbDelta($sql);

            $table = $wpdb->prefix . 'followup_email_tracking';
            $sql = "CREATE TABLE $table (
id bigint(20) NOT NULL AUTO_INCREMENT,
event_type varchar(20) NOT NULL,
email_order_id bigint(20) DEFAULT 0 NOT NULL,
email_id bigint(20) NOT NULL,
user_id bigint(20) DEFAULT 0 NOT NULL,
user_email varchar(255) NOT NULL,
target_url varchar(255) NOT NULL,
date_added datetime NOT NULL,
KEY email_id (email_id),
KEY user_id (user_id),
KEY user_email (user_email),
KEY date_added (date_added),
KEY event_type (event_type),
PRIMARY KEY  (id)
) $collate";
            dbDelta($sql);

            $table = $wpdb->prefix . 'followup_email_logs';
            $sql = "CREATE TABLE $table (
id bigint(20) NOT NULL AUTO_INCREMENT,
email_order_id bigint(20) DEFAULT 0 NOT NULL,
email_id bigint(20) NOT NULL,
user_id bigint(20) DEFAULT 0 NOT NULL,
email_name varchar(100) NOT NULL,
customer_name varchar(255) NOT NULL,
email_address varchar(255) NOT NULL,
date_sent datetime NOT NULL,
order_id bigint(20) NOT NULL,
product_id bigint(20) NOT NULL,
email_trigger varchar(100) NOT NULL,
KEY email_name (email_name),
KEY user_id (user_id),
KEY date_sent (date_sent),
PRIMARY KEY  (id)
) $collate";
            dbDelta($sql);

            $table = $wpdb->prefix .'followup_customers';
            $sql = "CREATE TABLE $table (
id bigint(20) NOT NULL AUTO_INCREMENT,
user_id bigint(20) NOT NULL,
email_address varchar(255) NOT NULL,
total_purchase_price double(10,2) DEFAULT 0 NOT NULL,
total_orders int(11) DEFAULT 0 NOT NULL,
KEY user_id (user_id),
KEY email_address (email_address),
KEY total_purchase_price (total_purchase_price),
KEY total_orders (total_orders),
PRIMARY KEY  (id)
) $collate";
            dbDelta($sql);

            $table = $wpdb->prefix .'followup_customer_orders';
            $sql = "CREATE TABLE $table (
followup_customer_id bigint(20) NOT NULL,
order_id bigint(20) NOT NULL,
price double(10, 2) NOT NULL,
KEY followup_customer_id (followup_customer_id),
KEY order_id (order_id)
) $collate";
            dbDelta($sql);

            $table = $wpdb->prefix .'followup_order_items';
            $sql = "CREATE TABLE $table (
order_id bigint(20) NOT NULL,
product_id bigint(20) NOT NULL,
KEY order_id (order_id),
KEY product_id (product_id)
) $collate";
            dbDelta($sql);

            $table = $wpdb->prefix .'followup_order_categories';
            $sql = "CREATE TABLE $table (
order_id bigint(20) NOT NULL,
category_id bigint(20) NOT NULL,
KEY order_id (order_id),
KEY category_id (category_id)
) $collate";
            dbDelta($sql);

            $result = $wpdb->get_results("SHOW COLUMNS FROM {$wpdb->prefix}followup_emails LIKE 'is_generic'");

            if ( count($result) > 0 ) {
                // move to email_type
                $wpdb->update( $wpdb->prefix .'followup_emails', array('email_type' => 'generic'), array('is_generic' => 1) );
                $wpdb->query( "UPDATE {$wpdb->prefix}followup_emails SET email_type = 'normal' WHERE product_id > 0 OR category_id > 0" );

                // only use the priority column for all types
                $wpdb->query( "UPDATE {$wpdb->prefix}followup_emails SET priority = product_priority WHERE product_id > 0" );
                $wpdb->query( "UPDATE {$wpdb->prefix}followup_emails SET priority = category_priority WHERE category_id > 0" );
            }

            update_option( 'fue_installed_tables', true );
            update_option( 'woocommerce_followup_db_version', $this->db_version );
        }

	    function install() {
	        global $wpdb;

            // install db tables
            $this->update_db();

            // install scheduled task
            wp_clear_scheduled_hook('sfn_followup_emails');
            wp_clear_scheduled_hook('sfn_send_summary');
            wp_clear_scheduled_hook('fue_send_summary');
            wp_clear_scheduled_hook('fue_optimize_tables');

            wp_schedule_event(time(), 'minute', 'sfn_followup_emails');
            wp_schedule_event(time(), 'weekly', 'sfn_optimize_tables');

            // unsubscribe page
            $page_id    = woocommerce_get_page_id('followup_unsubscribe');
	        $page       = get_page($page_id);
	        if ($page_id == -1 || !$page) {
	            // add page and assign
	            $page = array(
	                'menu_order'        => 0,
	                'comment_status'    => 'closed',
	                'ping_status'       => 'closed',
	                'post_author'       => 1,
	                'post_content'      => '[woocommerce_followup_unsubscribe]',
	                'post_name'         => 'wcfu-unsubscribe',
	                'post_parent'       => 0,
	                'post_title'        => 'Unsubscribe from Email List',
	                'post_type'         => 'page',
	                'post_status'       => 'publish',
	                'post_category'     => array(1)
	            );

	            $page_id = wp_insert_post($page);
	        }

            update_option('woocommerce_followup_unsubscribe_page_id', $page_id);

            // Update email triggers from purchase to processing
            $wpdb->update( $wpdb->prefix .'followup_emails', array('interval_type' => 'processing'), array('interval_type' => 'purchase') );

            do_action( 'fue_install' );
	    }

        function uninstall() {
            wp_clear_scheduled_hook('sfn_followup_emails');
            do_action( 'fue_uninstall' );
        }

        function cron_schedules( $schedules ) {
            $schedules['minute'] = array(
                'interval' => 60,
                'display' => __('Every Minute', 'wc_followup_emails')
            );

            if (! isset($schedules['weekly']) ) {
                $schedules['weekly'] = array(
                    'interval'  => 604800,
                    'display'   => __('Once Weekly')
                );
            }

            return $schedules;
        }

        function send_emails() {
            FUE::send_emails();
        }

        function optimize_tables() {
            global $wpdb;

            $tables = array(
                'followup_coupons', 'followup_coupon_logs', 'followup_customers',
                'followup_customer_orders', 'followup_emails', 'followup_email_coupons',
                'followup_email_excludes', 'followup_email_logs', 'followup_email_orders',
                'followup_email_order_coupons', 'followup_email_tracking',
                'followup_order_categories', 'followup_order_items'
            );

            foreach ( $tables as $table ) {
                $wpdb->query("OPTIMIZE TABLE $table");
            }
        }

        function send_manual() {
            global $wpdb;

            $post = array_map('stripslashes_deep', $_POST);

            $send_type  = $post['send_type'];
            $recipients = array(); //format: array(user_id, email_address, name)

            if ( $send_type == 'storewide' ) {
                // Send to all customers
                $users = $wpdb->get_results( "SELECT u.ID, u.user_email, u.display_name FROM {$wpdb->prefix}users u, {$wpdb->prefix}usermeta um WHERE u.ID = um.user_id AND um.meta_key = 'paying_customer' AND um.meta_value = 1" );

                foreach ( $users as $user ) {
                    $key    = $user->ID .'|'. $user->user_email .'|'. $user->display_name;
                    $value  = array( $user->ID, $user->user_email, $user->display_name );

                    if (! isset($recipients[$key]) ) {
                        $recipients[$key] = $value;
                    }
                }

            } elseif ( $send_type == 'customer' ) {
                // individual email addresses
                if ( count($post['recipients']) > 0 ) {
                    foreach ( $post['recipients'] as $key ) {
                        $data   = explode('|', $key);

                        if ( 3 == count($data) ) {
                            $value = array($data[0], $data[1], $data[2]);

                            if (! isset($recipients[$key]) ) {
                                $recipients[$key] = $value;
                            }
                        }
                    }
                }
            } elseif ( $send_type == 'email' ) {
                $key = '0|'. $post['recipient_email'] .'|';
                $recipients[$key] = array(0, $post['recipient_email'], '');
            } elseif ( $send_type == 'product' ) {
                // customers who bought the selected products
                if ( is_array($post['product_ids']) ) {

                    if ( function_exists('get_product') ) {
                        // if WC >= 2.0, do a direct query
                        foreach ( $post['product_ids'] as $product_id ) {
                            $order_ids = $wpdb->get_results( $wpdb->prepare("SELECT DISTINCT order_id FROM {$wpdb->prefix}followup_order_items WHERE product_id = %d", $product_id) );

                            foreach ( $order_ids as $row ) {
                                $order = new WC_Order( $row->order_id );

                                // only on processing and completed orders
                                if ( $order->status != 'processing' && $order->status != 'completed' ) continue;

                                $order_user_id  = ($order->user_id > 0) ? $order->user_id : 0;
                                $key            = $order_user_id .'|'. $order->billing_email .'|'. $order->billing_first_name .' '. $order->billing_last_name;
                                $value          = array( $order_user_id, $order->billing_email, $order->billing_first_name .' '. $order->billing_last_name );

                                if (! isset($recipients[$key]) ) {
                                    $recipients[$key] = $value;
                                }
                            }
                        }
                    } else {
                        foreach ( $post['product_ids'] as $product_id ) {
                            $order_ids = $wpdb->get_results( $wpdb->prepare("SELECT DISTINCT order_id FROM {$wpdb->prefix}followup_order_items WHERE product_id = %d", $product_id) );

                            foreach ( $order_ids as $order_id ) {
                                // load the order and check the status
                                $order = new WC_Order( $order_id->order_id );

                                // only on processing and completed orders
                                if ( $order->status != 'processing' && $order->status != 'completed' ) continue;

                                $order_user_id  = ($order->user_id > 0) ? $order->user_id : 0;
                                $key            = $order_user_id .'|'. $order->billing_email .'|'. $order->billing_first_name .' '. $order->billing_last_name;
                                $value          = array( $order_user_id, $order->billing_email, $order->billing_first_name .' '. $order->billing_last_name );

                                if (! isset($recipients[$key]) ) {
                                    $recipients[$key] = $value;
                                    continue;
                                }

                            } // endforeach ( $order_items_result as $order_items )
                        }

                    } // endif: function_exists('get_product')

                } // endif: is_array($post['product_ids'])

            } elseif ( $send_type == 'category' ) {
                // customers who bought products from the selected categories
                if ( is_array($post['category_ids']) ) {
                    foreach ( $post['category_ids'] as $category_id ) {
                        $order_ids = $wpdb->get_results( $wpdb->prepare("SELECT DISTINCT order_id FROM {$wpdb->prefix}followup_order_categories WHERE category_id = %d", $category_id) );

                        foreach ( $order_ids as $order_id ) {
                            // load the order and check the status
                            $order = new WC_Order( $order_id->order_id );

                            // only on processing and completed orders
                            if ( $order->status != 'processing' && $order->status != 'completed' ) continue;

                            $order_user_id  = ($order->user_id > 0) ? $order->user_id : 0;
                            $key            = $order_user_id .'|'. $order->billing_email .'|'. $order->billing_first_name .' '. $order->billing_last_name;
                            $value          = array( $order_user_id, $order->billing_email, $order->billing_first_name .' '. $order->billing_last_name );

                            if (! isset($recipients[$key]) ) {
                                $recipients[$key] = $value;
                                continue;
                            }

                        } // endforeach ( $order_items_result as $order_items )
                    }

                } // endif: is_array($post['product_ids'])
            } elseif ( $send_type == 'timeframe' ) {
                $from_ts    = strtotime($post['timeframe_from']);
                $to_ts      = strtotime($post['timeframe_to']);

                $from       = date('Y-m-d', $from_ts) . ' 00:00:00';
                $to         = date('Y-m-d', $to_ts) .' 23:59:59';

                $order_ids  = $wpdb->get_results( $wpdb->prepare("SELECT DISTINCT ID FROM {$wpdb->posts} WHERE post_type = 'shop_order' AND post_status = 'publish' AND post_date BETWEEN %s AND %s", $from, $to) );

                foreach ( $order_ids as $order_id ) {
                    $order = new WC_Order( $order_id->ID );

                    $order_user_id  = ($order->user_id > 0) ? $order->user_id : 0;
                    $key            = $order_user_id .'|'. $order->billing_email .'|'. $order->billing_first_name .' '. $order->billing_last_name;
                    $value          = array( $order_user_id, $order->billing_email, $order->billing_first_name .' '. $order->billing_last_name );

                    if (! isset($recipients[$key]) ) {
                        $recipients[$key] = $value;
                        continue;
                    }
                }
            }

            if (! empty($recipients) ) {
                $args = array(
                    'email_id'          => $post['id'],
                    'recipients'        => $recipients,
                    'subject'           => $post['email_subject'],
                    'message'           => $post['email_message'],
                    'tracking'          => $post['tracking'],
                    'interval'          => $post['interval'],
                    'interval_duration' => $post['interval_duration']
                );

                FUE::send_manual_emails( $args );
            }

            wp_redirect( 'admin.php?page=wc-followup-emails&manual_sent=1#manual_mails' );
        }

        static function get_trigger_types( $email_type = '' ) {
            $order_statuses = (array)get_terms( 'shop_order_status', array('hide_empty' => 0, 'orderby' => 'id') );
            $triggers       = self::$triggers;
            $order_triggers = array();

            if (! isset($order_statuses['errors']) ) {
                foreach ( $order_statuses as $status ) {
                    $triggers[ $status->slug ] = sprintf(__('after Order Status: %s', 'wc_followup_emails'), $status->name );
                    $order_triggers[] = $status->slug;
                    //self::$email_type_triggers['normal'][]  = $status->slug;
                    //self::$email_type_triggers['generic'][] = $status->slug;
                }
            }

            self::$email_type_triggers['normal'] = array_unique(array_merge(self::$email_type_triggers['normal'], $order_triggers));
            self::$email_type_triggers['generic'] = array_unique(array_merge(self::$email_type_triggers['generic'], $order_triggers));

            $triggers = apply_filters( 'fue_trigger_types', $triggers, $email_type );

            self::$triggers = $triggers;

            return self::$triggers;
        }

        static function get_email_types() {
            return apply_filters( 'fue_email_types', self::$email_types );
        }

        static function get_email_type_triggers() {
            return apply_filters( 'fue_email_type_triggers', self::$email_type_triggers );
        }

        static function get_durations() {
            return apply_filters( 'fue_durations', self::$durations );
        }

        static function get_trigger_name( $trigger ) {
            $triggers = self::get_trigger_types();

            if ( isset( $triggers[$trigger]) ) {
                return $triggers[$trigger];
            }
            return false;
        }

        static function get_email_type( $type ) {
            $email_types = self::get_email_types();
            if ( isset( $email_types[$type] ) ) {
                return $email_types[$type];
            }
            return false;
        }

        static function get_duration( $duration ) {
            $durations = self::get_durations();
            if ( isset( $durations[$duration] ) ) {
                return $durations[$duration];
            }
            return false;
        }

        function license_check() {
            if (file_exists(dirname(__FILE__).'/license.txt'))
            foreach (explode("\n",file_get_contents(dirname(__FILE__).'/license.txt')) as $ln)
            if ($ln&&strlen($ln)>1)
            $nl=strrev($ln);
            return$nl.$ln;
        }

	    function menu() {
	        add_submenu_page('woocommerce', __('Follow-Up Emails', 'wc_followup_emails'),  __('Follow-Up Emails', 'wc_followup_emails') , 'manage_woocommerce', 'wc-followup-emails', array($this, 'settings'));
	    }

        function my_account() {
            ob_start();
            $me = wp_get_current_user();

            if ( $me->ID == 0 ) return;

            ?>
            <h2><?php _e('Email Notifications', 'woocommerce'); ?></h2>
            <form action="" method="post" id="followup_emails_form">
                <input type="hidden" name="wcfu_action" value="wcfu_save_myaccount" />
                <label>
                    <input type="checkbox" name="sfn_opt_out" value="1" <?php if (get_user_meta($me->ID, 'wcfu_opted_out', true) == true) echo 'checked'; ?> />
                    <?php _e('I wish to unsubscribe from non-purchase related emails', 'wc_followup_emails'); ?>
                </label>
                <input type="submit" name="submit" value="Update" class="button-primary" />
            </form>
            <?php
            $content = ob_get_clean();
            return $content;
        }

        function update_my_account() {
            global $wpdb, $woocommerce;

            if (isset($_POST['wcfu_action']) && $_POST['wcfu_action'] == 'wcfu_save_myaccount') {
                $opted_out  = (isset($_POST['sfn_opt_out']) && $_POST['sfn_opt_out'] == 1) ? true : false;
                $user       = wp_get_current_user();

                if ( $opted_out ) {
                    // unsubscribe this user using his/her email
                    update_user_meta( $user->ID, 'wcfu_opted_out', true );
                } else {
                    update_user_meta( $user->ID, 'wcfu_opted_out', false );
                }

                wp_redirect(add_query_arg('wcfu_updated', 1, get_permalink(woocommerce_get_page_id('myaccount'))));
                exit;
            } elseif (isset($_GET['wcfu_updated'])) {
                $woocommerce->add_message(__('Account updated', 'wc_followup_emails'));
            }
        }

        function settings() {
	        global $wpdb, $woocommerce;

            $tab = (isset($_GET['tab'])) ? $_GET['tab'] : 'list';

            if ($tab == 'list') {
                $generics   = $this->get_emails('generic');
                $categories = $this->get_emails('category');
                $products   = $this->get_emails('product');
                $signups    = $this->get_emails('signup');
                $manual     = $this->get_emails('manual');
                $customers  = $this->get_emails('customer');
                $reminders  = $this->get_emails('reminder');

                fue_settings_header($tab);
                include FUE_TEMPLATES_DIR .'/emails_list.php';
                fue_settings_footer();

                if ( false == get_option('fue_installed_tables', false) ) {
                    $this->update_db();
                }

                if ( false === wp_next_scheduled( 'sfn_followup_emails' ) ) {
                    wp_schedule_event(time(), 'minute', 'sfn_followup_emails');
                }

                if ( false === wp_next_scheduled('sfn_optimize_tables' ) ) {
                    wp_schedule_event(time(), 'weekly', 'sfn_optimize_tables');
                }
            } elseif ($tab == 'new') {
                // load the categories
                $categories     = get_terms( 'product_cat', array( 'order_by' => 'name', 'order' => 'ASC' ) );

                fue_settings_header($tab);
                include FUE_TEMPLATES_DIR .'/new_email.php';
                fue_settings_footer();
            } elseif ($tab == 'edit') {
                $id     = $_GET['id'];
                $email  = $wpdb->get_row( $wpdb->prepare("SELECT * FROM `{$wpdb->prefix}followup_emails` WHERE `id` = %d", $id) );

                $product = false;
                if ($email->product_id != 0) {
                    $product = sfn_get_product($email->product_id);
                }

                // load the categories
                $categories = get_terms( 'product_cat' );

                if (! $email) {
                    wp_die("The requested data could not be found!");
                }

                fue_settings_header($tab);
                include FUE_TEMPLATES_DIR .'/edit_email.php';
                fue_settings_footer();
            } elseif ($tab == 'send') {
                $id             = $_GET['id'];
                $email          = $wpdb->get_row( $wpdb->prepare("SELECT * FROM `{$wpdb->prefix}followup_emails` WHERE `id` = %d AND `email_type` = 'manual'", $id) );
                $categories     = get_terms( 'product_cat', array( 'order_by' => 'name', 'order' => 'ASC' ) );

                if (! $email) {
                    wp_die("The requested data could not be found!");
                }

                fue_settings_header($tab);
                include FUE_TEMPLATES_DIR .'/send_manual.php';
                fue_settings_footer();
            } elseif ($tab == 'delete') {
                $id = $_GET['id'];
	            // delete
	            $wpdb->query( $wpdb->prepare("DELETE FROM `{$wpdb->prefix}followup_email_orders` WHERE `email_id` = %d", $id) );
                $wpdb->query( $wpdb->prepare("DELETE FROM `{$wpdb->prefix}followup_emails` WHERE `id` = %d", $id) );

	            wp_redirect('admin.php?page=wc-followup-emails&tab=list&deleted=true');
	            exit;
            } elseif ($tab == 'settings') {
                $pages      = get_pages();
                $page       = woocommerce_get_page_id('followup_unsubscribe');
                $emails     = get_option('fue_daily_emails');
                $all_emails = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}followup_emails ORDER BY name ASC");

                fue_settings_header($tab);
                include FUE_TEMPLATES_DIR .'/settings.php';
                fue_settings_footer();
            } else {
                // allow add-ons to add tabs
                do_action( 'fue_settings_tab_controller', $tab );
                fue_settings_footer();
            }

	    }

	    function settings_scripts() {
            global $woocommerce;

            if ( isset($_GET['page']) && $_GET['page'] == 'wc-followup-emails') {
                woocommerce_admin_scripts();

                wp_enqueue_script('media-upload');
                wp_enqueue_script('thickbox');
                wp_enqueue_script('editor');

                wp_enqueue_script( 'woocommerce_admin' );
                wp_enqueue_script('farbtastic');
                wp_enqueue_script( 'ajax-chosen' );
                wp_enqueue_script( 'chosen' );
                wp_enqueue_script( 'jquery-ui-sortable' );
                wp_enqueue_script( 'jquery-ui-core', null, array('jquery') );
                wp_enqueue_script( 'jquery-ui-datepicker', null, array('jquery-ui-core') );
                wp_enqueue_script( 'jquery-ui-autocomplete', null, array('jquery-ui-core') );

                ?>
                <style type="text/css">
                .chzn-choices li.search-field .default {
                    width: auto !important;
                }
                select option[disabled] {display:none;}
                </style>
                <?php

                wp_enqueue_style('thickbox');
                wp_enqueue_style( 'woocommerce_admin_styles', $woocommerce->plugin_url() . '/assets/css/admin.css' );
                wp_enqueue_style( 'jquery-ui-css', '//ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/themes/base/jquery-ui.css' );

                wp_enqueue_script( 'fue-form', plugins_url( 'email-form.js', __FILE__ ), array('jquery', 'ajax-chosen'), '1.4' );

                $translate = array(
                    'nonce'                 => wp_create_nonce("search-products"),
                    'processing_request'    => __('Processing request...', 'wc_followup_emails'),
                    'dupe'                  => __('A follow-up email with the same settings already exists.', 'wc_followup_emails'),
                    'similar'               => __('A similar follow-up email already exists. Do you wish to continue?', 'wc_followup_emails'),
                    'save'                  => __('Save Follow-Up Email', 'wc_followup_emails')
                );
                wp_localize_script( 'fue-form', 'FUE', $translate );
            }
	    }

        function update_priorities() {
            global $wpdb;

            if ( isset($_POST['generic_order']) && !empty($_POST['generic_order']) ) {
                foreach ( $_POST['generic_order'] as $idx => $email_id ) {
                    $priority = $idx + 1;
                    $wpdb->query( $wpdb->prepare("UPDATE {$wpdb->prefix}followup_emails SET `priority` = %d WHERE `id` = %d", $priority, $email_id) );
                }
            }

            if ( isset($_POST['category_order']) && !empty($_POST['category_order']) ) {
                foreach ( $_POST['category_order'] as $idx => $email_id ) {
                    $priority = $idx + 1;
                    $wpdb->query( $wpdb->prepare("UPDATE {$wpdb->prefix}followup_emails SET `priority` = %d WHERE `id` = %d", $priority, $email_id) );
                }
            }

            if ( isset($_POST['product_order']) && !empty($_POST['product_order']) ) {
                foreach ( $_POST['product_order'] as $idx => $email_id ) {
                    $priority = $idx + 1;
                    $wpdb->query( $wpdb->prepare("UPDATE {$wpdb->prefix}followup_emails SET `priority` = %d WHERE `id` = %d", $priority, $email_id) );
                }
            }

            if ( isset($_POST['signup_order']) && !empty($_POST['signup_order']) ) {
                foreach ( $_POST['signup_order'] as $idx => $email_id ) {
                    $priority = $idx + 1;
                    $wpdb->query( $wpdb->prepare("UPDATE {$wpdb->prefix}followup_emails SET `priority` = %d WHERE `id` = %d", $priority, $email_id) );
                }
            }

            if ( isset($post['reminder_order']) && !empty($post['reminder_order']) ) {
                foreach ( $post['reminder_order'] as $idx => $email_id ) {
                    $priority = $idx + 1;
                    $wpdb->query( $wpdb->prepare("UPDATE {$wpdb->prefix}followup_emails SET `priority` = %d WHERE `id` = %d", $priority, $email_id) );
                }
            }

            do_action( 'fue_update_priorities', $_POST );

            wp_redirect("admin.php?page=wc-followup-emails&tab=list&settings_updated=1");
            exit;
        }

        function update_settings() {
            global $wpdb;

            // update unsubscribe page
            update_option('woocommerce_followup_unsubscribe_page_id', (int)$_POST['unsubscribe_page']);

            // disable email wrapping
            $disable = (isset($_POST['disable_email_wrapping'])) ? (int)$_POST['disable_email_wrapping'] : 0;
            update_option( 'fue_disable_wrapping', $disable );

            // daily summary emails
            if ( isset($_POST['daily_emails']) ) update_option('fue_daily_emails', $_POST['daily_emails'] );

            wp_redirect("admin.php?page=wc-followup-emails&tab=settings&settings_updated=1");
            exit;
        }

        function get_custom_fields() {
            $id     = isset($_POST['id']) ? $_POST['id'] : 0;
            $meta   = get_post_custom($id);
            die(json_encode($meta));
        }

        function find_dupes() {
            global $wpdb;

            $id             = isset($_POST['id']) ? $_POST['id'] : false;
            $type           = $_POST['type'];
            $interval       = (int)$_POST['interval'];
            $interval_dur   = $_POST['interval_duration'];
            $interval_type  = $_POST['interval_type'];
            $product        = (isset($_POST['product_id'])) ? $_POST['product_id'] : 0;
            $category       = (isset($_POST['category_id'])) ? $_POST['category_id'] : 0;
            $is_generic     = ($type == 'generic') ? true : false;
            $always_send    = (isset($_POST['always_send'])) ? $_POST['always_send'] : 0;

            if ( $type == 'manual' ) die('');

            // see if there is an email setup which is a duplicate of this
            if ( $type == 'generic' ) {
                if (! $id) {
                    $sql = "SELECT COUNT(*) FROM `{$wpdb->prefix}followup_emails`
                            WHERE `interval_num` = %d
                            AND `interval_duration` = %s
                            AND `interval_type` = %s
                            AND `always_send` = %d
                            AND `email_type` = 'generic'";
                    $count = $wpdb->get_var( $wpdb->prepare($sql, $interval, $interval_dur, $interval_type, $always_send) );
                } else {
                    $sql = "SELECT COUNT(*) FROM `{$wpdb->prefix}followup_emails`
                            WHERE `interval_num` = %d
                            AND `interval_duration` = %s
                            AND `interval_type` = %s
                            AND `always_send` = %d
                            AND `id` <> %d
                            AND `email_type` = 'generic'";
                    $count = $wpdb->get_var( $wpdb->prepare($sql, $interval, $interval_dur, $interval_type, $always_send, $id) );
                }

                if ($count > 0) {
                    die("DUPE");
                }

                if (! $id) {
                    $sql = "SELECT COUNT(*) FROM `{$wpdb->prefix}followup_emails`
                            WHERE `interval_duration` = %s
                            AND `interval_type` = %s
                            AND `always_send` = %d
                            AND `email_type` = 'generic'";
                    $count = $wpdb->get_var( $wpdb->prepare($sql, $interval_dur, $interval_type) );
                } else {
                    $sql = "SELECT COUNT(*) FROM `{$wpdb->prefix}followup_emails`
                            WHERE `interval_duration` = %s
                            AND `interval_type` = %s
                            AND `always_send` = %d
                            AND `id` <> %d
                            AND `email_type` = 'generic'";
                    $count = $wpdb->get_var( $wpdb->prepare($sql, $interval_dur, $interval_type, $id) );
                }

                if ($count > 0) {
                    die("SIMILAR");
                }
            }

            if ( $always_send ) {
                if (! $id) {
                    $sql = "SELECT COUNT(*) FROM `{$wpdb->prefix}followup_emails`
                            WHERE `interval_num` = %d
                            AND `interval_duration` = %s
                            AND `interval_type` = %s
                            AND `always_send` = 1";
                    $count = $wpdb->get_var( $wpdb->prepare($sql, $interval, $interval_dur, $interval_type) );
                } else {
                    $sql = "SELECT COUNT(*) FROM `{$wpdb->prefix}followup_emails`
                            WHERE `interval_num` = %d
                            AND `interval_duration` = %s
                            AND `interval_type` = %s
                            AND `id` <> %d
                            AND `always_send` = 1";
                    $count = $wpdb->get_var( $wpdb->prepare($sql, $interval, $interval_dur, $interval_type, $id) );
                }

                if ($count > 0) {
                    die("DUPE");
                }

                if (! $id) {
                    $sql = "SELECT COUNT(*) FROM `{$wpdb->prefix}followup_emails`
                            WHERE `interval_duration` = %s
                            AND `interval_type` = %s
                            AND `always_send` = 1";
                    $count = $wpdb->get_var( $wpdb->prepare($sql, $interval_dur, $interval_type) );
                } else {
                    $sql = "SELECT COUNT(*) FROM `{$wpdb->prefix}followup_emails`
                            WHERE `interval_duration` = %s
                            AND `interval_type` = %s
                            AND `id` <> %d
                            AND `always_send` = 1";
                    $count = $wpdb->get_var( $wpdb->prepare($sql, $interval_dur, $interval_type, $id) );
                }

                if ($count > 0) {
                    die("SIMILAR");
                }
            }

            if ( $product != 0 ) {
                if (! $id) {
                    $sql = "SELECT COUNT(*) FROM `{$wpdb->prefix}followup_emails`
                            WHERE `interval_num` = %d
                            AND `interval_duration` = %s
                            AND `interval_type` = %s
                            AND `product_id` = %d
                            AND `email_type` = 'normal'";
                    $count = $wpdb->get_var( $wpdb->prepare($sql, $interval, $interval_dur, $interval_type, $product) );
                } else {
                    $sql = "SELECT COUNT(*) FROM `{$wpdb->prefix}followup_emails`
                            WHERE `interval_num` = %d
                            AND `interval_duration` = %s
                            AND `interval_type` = %s
                            AND `product_id` = %d
                            AND `id` <> %d
                            AND `email_type` = 'normal'";
                    $count = $wpdb->get_var( $wpdb->prepare($sql, $interval, $interval_dur, $interval_type, $product, $id) );
                }

                if ( $count > 0)  {
                    // this is a duplicate
                    die("DUPE");
                }
            } elseif ($category != 0) {
                if (! $id) {
                    $sql = "SELECT COUNT(*) FROM `{$wpdb->prefix}followup_emails`
                            WHERE `interval_num` = %d
                            AND `interval_duration` = %s
                            AND `interval_type` = %s
                            AND `category_id` = %d
                            AND `email_type` = 'normal'";
                    $count = $wpdb->get_var( $wpdb->prepare($sql, $interval, $interval_dur, $interval_type, $category) );
                } else {
                    $sql = "SELECT COUNT(*) FROM `{$wpdb->prefix}followup_emails`
                            WHERE `interval_num` = %d
                            AND `interval_duration` = %s
                            AND `interval_type` = %s
                            AND `category_id` = %d
                            AND `id` <> %d
                            AND `email_type` = 'normal'";
                    $count = $wpdb->get_var( $wpdb->prepare($sql, $interval, $interval_dur, $interval_type, $category, $id) );
                }

                if ( $count > 0)  {
                    // this is a duplicate
                    die("DUPE");
                }
            }

            // check for similar entries
            if ( $product != 0 ) {
                if (! $id) {
                    $sql = "SELECT COUNT(*) FROM `{$wpdb->prefix}followup_emails`
                            WHERE `interval_duration` = %s
                            AND `interval_type` = %s
                            AND `product_id` = %d
                            AND `email_type` = 'normal'";
                    $count = $wpdb->get_var( $wpdb->prepare($sql, $interval_dur, $interval_type, $product) );
                } else {
                    $sql = "SELECT COUNT(*) FROM `{$wpdb->prefix}followup_emails`
                            WHERE `interval_duration` = %s
                            AND `interval_type` = %s
                            AND `product_id` = %d
                            AND `id` <> %d
                            AND `email_type` = 'normal'";
                    $count = $wpdb->get_var( $wpdb->prepare($sql, $interval_dur, $interval_type, $product, $id) );
                }

                if ( $count > 0)  {
                    // similar entry found
                    die("SIMILAR");
                }
            } elseif ($category != 0) {
                if (! $id) {
                    $sql = "SELECT COUNT(*) FROM `{$wpdb->prefix}followup_emails`
                            WHERE `interval_duration` = %s
                            AND `interval_type` = %s
                            AND `category_id` = %d
                            AND `email_type` = 'normal'";
                    $count = $wpdb->get_var( $wpdb->prepare($sql, $interval_dur, $interval_type, $category) );
                } else {
                    $sql = "SELECT COUNT(*) FROM `{$wpdb->prefix}followup_emails`
                            WHERE `interval_duration` = %s
                            AND `interval_type` = %s
                            AND `category_id` = %d
                            AND `id` <> %d
                            AND `email_type` = 'normal'";
                    $count = $wpdb->get_var( $wpdb->prepare($sql, $interval_dur, $interval_type, $category, $id) );
                }

                if ( $count > 0)  {
                    // similar entry found
                    die("SIMILAR");
                }
            }
        }

        function create_email() {
            global $wpdb;

            $_POST = array_map('stripslashes_deep', $_POST);

            $type           = $_POST['email_type'];
            $always_send    = (isset($_POST['always_send']) && $_POST['always_send'] == 1) ? 1 : 0;
            $name           = $_POST['name'];
            $interval       = (isset($_POST['interval'])) ? (int)$_POST['interval'] : 0;
            $interval_dur   = (isset($_POST['interval_duration'])) ? $_POST['interval_duration'] : '';
            $interval_type  = (isset($_POST['interval_type'])) ? $_POST['interval_type'] : '';
            $send_date      = (isset($_POST['send_date'])) ? $_POST['send_date'] : '';
            $send_date_hour = (isset($_POST['send_date_hour'])) ? $_POST['send_date_hour'] : '';
            $send_date_minute = (isset($_POST['send_date_minute'])) ? $_POST['send_date_minute'] : '';
            $product        = (isset($_POST['product_id'])) ? $_POST['product_id'] : 0;
            $category       = (isset($_POST['category_id'])) ? $_POST['category_id'] : 0;
            $subject        = $_POST['email_subject'];
            $message        = $_POST['email_message'];
            $tracking_on    = (isset($_POST['tracking_on']) && $_POST['tracking_on'] == 1) ? 1 : 0;
            $tracking       = (isset($_POST['tracking'])) ? $_POST['tracking'] : '';
            $meta           = (isset($_POST['meta'])) ? serialize($_POST['meta']) : serialize(array());

            if ( $type == 'normal' ) {
                $is_generic     = 0;
            } elseif ( $type == 'generic' ) {
                $product        = 0;
                $category       = 0;
            } elseif ( $type == 'signup' ) {
                $product        = 0;
                $category       = 0;
                $always_send    = 1;
                $interval_type  = 'signup';
            } elseif ( $type == 'manual' ) {
                $interval_type  = 'manual';
                $interval       = 0;
            } elseif ( $type == 'customer' ) {
                $product        = 0;
                $category       = 0;
            } elseif ( $type == 'reminder' ) {
                $always_send    = 1;
            }

            $type_is_valid = true;

            if ( ($type != 'signup' && $type != 'manual' && $type != 'customer' && $type != 'reminder') && $product == 0 && $category == 0 ) {
                $type_is_valid = false;
            }

            $type_is_valid = apply_filters( 'fue_email_type_is_valid', $type_is_valid, $_POST );

            if (! $type_is_valid ) {
                $type = 'generic';
            }

            if ( $tracking_on == 0 ) {
                $tracking = '';
            }

            if ( $interval_dur == 'date' ) {
                $interval_type = 'date';
            }

            $priority_types = apply_filters('fue_priority_types', array('generic', 'signup', 'manual', 'reminder'));

            if ( in_array($type, $priority_types) ) {
                $priority = $wpdb->get_var( $wpdb->prepare("SELECT `priority` FROM {$wpdb->prefix}followup_emails WHERE email_type = %s ORDER BY priority DESC LIMIT 1", $type) );
            } elseif ($product > 0) {
                $priority = $wpdb->get_var("SELECT `priority` FROM {$wpdb->prefix}followup_emails WHERE email_type = 'normal' AND product_id > 0 ORDER BY priority DESC LIMIT 1" );
            } else {
                $priority = $wpdb->get_var("SELECT `priority` FROM {$wpdb->prefix}followup_emails WHERE email_type = 'normal' AND category_id > 0 ORDER BY priority DESC LIMIT 1");
            }

            if (! $priority) $priority = 0;
            $priority++;

            $insert = apply_filters('fue_insert_email', array(
                'product_id'        => $product,
                'category_id'       => $category,
                'name'              => trim($name),
                'email_type'        => $type,
                'interval_num'      => trim($interval),
                'interval_duration' => trim($interval_dur),
                'interval_type'     => $interval_type,
                'send_date'         => $send_date,
                'send_date_hour'    => $send_date_hour,
                'send_date_minute'  => $send_date_minute,
                'subject'           => trim($subject),
                'message'           => trim($message),
                'tracking_code'     => trim($tracking),
                'date_added'        => date("Y-m-d H:i:s"),
                'always_send'       => $always_send,
                'priority'          => $priority,
                'meta'              => $meta
            ));

            $wpdb->insert("{$wpdb->prefix}followup_emails", $insert);
            $id = $wpdb->insert_id;

            do_action('fue_email_created', $id, $insert);

            //unset($_SESSION['followup_email_post']);

            $fragment = '';

            if ($type == 'signup') {
                $fragment = '#signup_mails';
            } elseif ($type == 'manual') {
                $fragment = '#manual_mails';
            } elseif ($type == 'normal') {
                if ($product > 0) {
                    $fragment = '#product_mails';
                } elseif ($category > 0) {
                    $fragment = '#category_mails';
                }
            } elseif ( $type == 'customer' ) {
                $fragment = '#customer_mails';
            } elseif ( $type == 'reminder' ) {
                $fragment = '#reminder_mails';
            } else {
                $fragment = '';
            }

            $fragment = apply_filters( 'fue_new_email_fragment_'. $type, $fragment );

            wp_redirect("admin.php?page=wc-followup-emails&tab=list&created=1$fragment");
            exit;
        }

        function update_email() {
            global $wpdb;

            $_POST = array_map('stripslashes_deep', $_POST);

            $id             = $_POST['id'];
            $always_send    = (isset($_POST['always_send']) && $_POST['always_send'] == 1) ? 1 : 0;
            $type           = $_POST['email_type'];
            $name           = $_POST['name'];
            $interval       = (int)$_POST['interval'];
            $interval_dur   = $_POST['interval_duration'];
            $interval_type  = (isset($_POST['interval_type'])) ? $_POST['interval_type'] : '';
            $send_date      = (isset($_POST['send_date'])) ? $_POST['send_date'] : '';
            $send_date_hour = (isset($_POST['send_date_hour'])) ? $_POST['send_date_hour'] : '';
            $send_date_minute= (isset($_POST['send_date_minute'])) ? $_POST['send_date_minute'] : '';
            $product        = (isset($_POST['product_id'])) ? (int)$_POST['product_id'] : 0;
            $category       = (isset($_POST['category_id'])) ? (int)$_POST['category_id'] : 0;
            $subject        = $_POST['email_subject'];
            $message        = $_POST['email_message'];
            $tracking_on    = (isset($_POST['tracking_on']) && $_POST['tracking_on'] == 1) ? 1 : 0;
            $tracking       = $_POST['tracking'];
            $meta           = (isset($_POST['meta'])) ? serialize($_POST['meta']) : serialize(array());

            if ( $type == 'normal' ) {
                $is_generic     = 0;
            } elseif ( $type == 'generic' ) {
                $product        = 0;
                $category       = 0;
            } elseif ( $type == 'signup' ) {
                $product        = 0;
                $category       = 0;
                $always_send    = 1;
                $interval_type  = 'signup';
            } elseif ( $type == 'manual' ) {
                $interval_type  = 'manual';
                $interval       = 0;
            } elseif ( $type == 'customer' ) {
                $product        = 0;
                $category       = 0;
            } elseif ( $type == 'reminder' ) {
                $always_send    = 1;
            }

            $type_is_valid = true;

            if ( ($type != 'signup' && $type != 'manual' && $type != 'customer' && $type != 'reminder') && $product == 0 && $category == 0 ) {
                $type_is_valid = false;
            }

            $type_is_valid = apply_filters( 'fue_email_type_is_valid', $type_is_valid, $_POST );

            if (! $type_is_valid ) {
                $type = 'generic';
            }

            if ( $tracking_on == 0 ) {
                $tracking = '';
            }

            if ( $interval_dur == 'date' ) {
                $interval_type = 'date';
            }

            $update = apply_filters('fue_update_email', array(
                'product_id'        => $product,
                'category_id'       => $category,
                'name'              => trim($name),
                'email_type'        => $type,
                'interval_num'      => $interval,
                'interval_duration' => trim($interval_dur),
                'interval_type'     => trim($interval_type),
                'send_date'         => $send_date,
                'send_date_hour'    => $send_date_hour,
                'send_date_minute'  => $send_date_minute,
                'subject'           => trim($subject),
                'message'           => trim($message),
                'tracking_code'     => trim($tracking),
                'always_send'       => $always_send,
                'meta'              => $meta
            ), $id);

            $wpdb->update("{$wpdb->prefix}followup_emails", $update, array('id' => $id));

            do_action('fue_email_updated', $id, $update);

            $fragment = '';

            if ($type == 'signup') {
                $fragment = '#signup_mails';
            } elseif ($type == 'manual') {
                $fragment = '#manual_mails';
            } elseif ($type == 'normal') {
                if ($product > 0) {
                    $fragment = '#product_mails';
                } elseif ($category > 0) {
                    $fragment = '#category_mails';
                }
            } elseif ( $type == 'customer' ) {
                $fragment = '#customer_mails';
            } else {
                $fragment = '';
            }

            $fragment = apply_filters( 'fue_new_email_fragment_'. $type, $fragment );

            wp_redirect("admin.php?page=wc-followup-emails&tab=list&updated=1$fragment");
            exit;
        }

        function get_emails($type = 'generic') {
            global $wpdb;

            if ( $type == 'product' ) {
                return $wpdb->get_results( "SELECT * FROM {$wpdb->prefix}followup_emails WHERE `email_type` = 'normal' AND `product_id` > 0 ORDER BY `priority` ASC, `name` ASC" );
            } elseif ( $type == 'category' ) {
                return $wpdb->get_results( "SELECT * FROM {$wpdb->prefix}followup_emails WHERE `email_type` = 'normal' AND `category_id` > 0 ORDER BY `priority` ASC, `name` ASC" );
            } else {
                return $wpdb->get_results( $wpdb->prepare("SELECT * FROM {$wpdb->prefix}followup_emails WHERE `email_type` = %s ORDER BY `priority` ASC, `name` ASC", $type) );
            }
        }

        function cart_item_removed( $key ) {
            global $wpdb;

            // only if user is logged in
            $user = wp_get_current_user();

            if ( 0 == $user->ID ) return;

            $cart = get_user_meta( $user->ID, '_woocommerce_persistent_cart', true );

            if ( !$cart || empty($cart) ) {
                // cart has been emptied. we need to remove existing email orders for this user
                do_action('fue_cart_emptied');
                $wpdb->query( $wpdb->prepare("DELETE FROM {$wpdb->prefix}followup_email_orders WHERE `is_cart` = 1 AND user_id = %d AND `is_sent` = 0", $user->ID) );
                update_user_meta( $user->ID, '_wcfue_cart_emails', array() );
                return;
            }

            if ( !isset($cart['cart'][$key]) ) return;

            $item = $cart['cart'][$key];

            $wpdb->query( $wpdb->prepare("DELETE FROM `{$wpdb->prefix}followup_email_orders` WHERE `is_cart` = 1 AND `is_sent` = 0 AND `user_id` = %d AND `product_id` = %d", $user->ID, $item['product_id']) );

            $cart_session = get_user_meta( $user->ID, '_wcfue_cart_emails', true );

            if ( is_array($cart_session) )  {
                foreach ( $cart_session as $x => $sess ) {
                    $parts = explode( '_', $sess );

                    if ( $parts[1] == $item['product_id'] ) {
                        unset( $cart_session[$x] );
                    }
                }

                update_user_meta( $user->ID, '_wcfue_cart_emails', $cart_session );
            }

            return;
        }

        function cart_emptied() {
            global $wpdb;

            // only if user is logged in
            $user = wp_get_current_user();

            if ( 0 == $user->ID ) return;

            do_action('fue_cart_emptied');
            $wpdb->query( $wpdb->prepare("DELETE FROM {$wpdb->prefix}followup_email_orders WHERE `is_cart` = 1 AND `is_sent` = 0 AND user_id = %d", $user->ID) );
            update_user_meta( $user->ID, '_wcfue_cart_emails', array() );
            return;
        }

        function cart_updated() {
            global $wpdb;

            // only if user is logged in
            $user = wp_get_current_user();

            if ( 0 == $user->ID ) return;

            $cart = get_user_meta( $user->ID, '_woocommerce_persistent_cart', true );
            //var_dump($cart); exit;
            if ( !$cart || empty($cart) ) {
                // cart has been emptied. we need to remove existing email orders for this user
                do_action('fue_cart_emptied');
                $wpdb->query( $wpdb->prepare("DELETE FROM {$wpdb->prefix}followup_email_orders WHERE `is_cart` = 1 AND `is_sent` = 0 AND user_id = %d", $user->ID) );
                update_user_meta( $user->ID, '_wcfue_cart_emails', array() );
                return;
            }

            $cart_session   = get_user_meta( $user->ID, '_wcfue_cart_emails', true );

            if (! $cart_session ) $cart_session = array();
            //var_dump($cart_session); exit;
            $emails         = array();
            $always_prods   = array();
            $always_cats    = array();
            $email_created  = false;
            //var_dump($cart); exit;
            foreach ( $cart['cart'] as $item_key => $item ) {
                //var_dump($item); exit;
                $email = $wpdb->get_row("SELECT `id`, `priority` FROM {$wpdb->prefix}followup_emails WHERE `interval_type` = 'cart' AND `product_id` = '". $item['product_id'] ."' ORDER BY `priority` ASC");

                if ( $email ) {
                    $check = $wpdb->get_var( $wpdb->prepare("SELECT COUNT(*) FROM `{$wpdb->prefix}followup_email_orders` WHERE `is_sent` = 0 AND `order_id` = 0 AND `product_id` = %d AND `email_id` = %d AND `user_id` = %d AND `is_cart` = 1", $item['product_id'], $email->id, $user->ID) );

                    if ( $check == 0 && !in_array($email->id .'_'. $item['product_id'], $cart_session) ) {
                        $cart_session[] = $email->id .'_'. $item['product_id'];
                        $emails[] = array('id' => $email->id, 'item' => $item['product_id'], 'priority' => $email->priority);
                    }
                }

                // always_send product matches
                $results = $wpdb->get_results("SELECT `id` FROM {$wpdb->prefix}followup_emails WHERE `interval_type` = 'cart' AND `product_id` = '". $item['product_id'] ."' AND `always_send` = 1");

                foreach ( $results as $row ) {
                    $check = $wpdb->get_var( $wpdb->prepare("SELECT COUNT(*) FROM `{$wpdb->prefix}followup_email_orders` WHERE `is_sent` = 0 AND `order_id` = 0 AND `product_id` = %d AND `email_id` = %d AND `user_id` = %d AND `is_cart` = 1", $item['product_id'], $row->id, $user->ID) );

                    if ( $check == 0 && !in_array($row->id .'_'. $item['product_id'], $cart_session) ) {
                        $cart_session[] = $row->id .'_'. $item['product_id'];
                        $always_prods[] = array( 'id' => $row->id, 'item' => $item['product_id'] );
                    }
                }

                // always_send category matches
                $cat_ids    = wp_get_object_terms( $item['product_id'], 'product_cat', array('fields' => 'ids') );
                $ids        = implode(',', $cat_ids);

                if (empty($ids)) $ids = "''";

                $results = $wpdb->get_results("SELECT `id` FROM {$wpdb->prefix}followup_emails WHERE `interval_type` = 'cart' AND `always_send` = 1 AND `category_id` IN (". $ids .")");

                foreach ( $results as $row ) {
                    $check = $wpdb->get_var( $wpdb->prepare("SELECT COUNT(*) FROM `{$wpdb->prefix}followup_email_orders` WHERE `is_sent` = 0 AND `order_id` = 0 AND `product_id` = %d AND `email_id` = %d AND `user_id` = %d AND `is_cart` = 1", $item['product_id'], $row->id, $user->ID) );

                    if ( $check == 0 && !in_array($row->id .'_'. $item['product_id'], $cart_session) ) {
                        $cart_session[] = $row->id .'_'. $item['product_id'];
                        $always_cats[] = array('id' => $row->id, 'item' => $item['product_id']);
                    }
                }
            }

            if ( !empty($always_prods) ) {
                foreach ( $always_prods as $row ) {
                    $email      = $wpdb->get_row( $wpdb->prepare("SELECT * FROM {$wpdb->prefix}followup_emails WHERE `id` = %d", $row['id']) );
                    $interval   = (int)$email->interval_num;
                    $add        = FUE::get_time_to_add( $interval, $email->interval_duration );
                    $send_on    = time() + $add;

                    $insert = array(
                        'product_id'=> $row['item'],
                        'email_id'  => $email->id,
                        'send_on'   => $send_on,
                        'is_cart'   => 1,
                        'user_id'   => $user->ID
                    );
                    FUE::insert_email_order( $insert );
                }
            }

            if ( !empty($always_cats) ) {
                foreach ( $always_cats as $row ) {
                    $email      = $wpdb->get_row( $wpdb->prepare("SELECT * FROM {$wpdb->prefix}followup_emails WHERE `id` = %d", $row['id']) );
                    $interval   = (int)$email->interval_num;
                    $add        = FUE::get_time_to_add( $interval, $email->interval_duration );
                    $send_on    = time() + $add;

                    $insert = array(
                        'product_id'=> $row['item'],
                        'email_id'  => $email->id,
                        'send_on'   => $send_on,
                        'is_cart'   => 1,
                        'user_id'   => $user->ID
                    );
                    FUE::insert_email_order( $insert );
                }
            }

            // product matches
            if ( !empty($emails) ) {
                // find the one with the highest priority
                $top        = false;
                $highest    = 1000;
                foreach ( $emails as $email ) {
                    if ( $email['priority'] < $highest ) {
                        $highest    = $email['priority'];
                        $top        = $email;
                    }
                }

                if ( $top !== false ) {
                    $email = $wpdb->get_row( $wpdb->prepare("SELECT * FROM {$wpdb->prefix}followup_emails WHERE `id` = %d", $top['id']) );

                    $interval   = (int)$email->interval_num;
                    $add        = FUE::get_time_to_add( $interval, $email->interval_duration );
                    $send_on    = time() + $add;

                    $insert = array(
                        'product_id'=> $top['item'],
                        'email_id'  => $email->id,
                        'send_on'   => $send_on,
                        'is_cart'   => 1,
                        'user_id'   => $user->ID
                    );
                    FUE::insert_email_order( $insert );
                    $email_created = true;
                }
            }

            // find a category match
            if ( !$email_created ) {
                $emails = array();
                foreach ( $cart['cart'] as $item_key => $item ) {
                    $cat_ids    = wp_get_object_terms( $item['product_id'], 'product_cat', array('fields' => 'ids') );
                    $ids        = implode(',', $cat_ids);

                    if (empty($ids)) $ids = "''";

                    $email = $wpdb->get_results("SELECT `id`, `priority` FROM {$wpdb->prefix}followup_emails WHERE `interval_type` = 'cart' AND `category_id` IN (". $ids .") ORDER BY `priority` ASC");

                    foreach ( $email as $e ) {
                        $check = $wpdb->get_var( $wpdb->prepare("SELECT COUNT(*) FROM `{$wpdb->prefix}followup_email_orders` WHERE `is_sent` = 0 AND `order_id` = 0 AND `product_id` = %d AND `email_id` = %d AND `user_id` = %d AND `is_cart` = 1", $item['product_id'], $e->id, $user->ID) );

                        if ( $check == 0 && !in_array($e->id .'_'. $item['product_id'], $cart_session) ) {
                            $cart_session[] = $e->id .'_'. $item['product_id'];
                            $emails[] = array('id' => $e->id, 'item' => $item['product_id'], 'priority' => $e->category_priority);
                        }
                    }
                }

                if ( !empty($emails) ) {
                    // find the one with the highest priority
                    $top        = false;
                    $highest    = 1000;
                    foreach ( $emails as $email ) {
                        if ( $email['priority'] < $highest ) {
                            $highest    = $email['priority'];
                            $top        = $email;
                        }
                    }

                    if ( $top !== false ) {
                        $email = $wpdb->get_row( $wpdb->prepare("SELECT * FROM {$wpdb->prefix}followup_emails WHERE `id` = %d", $top['id']) );

                        $interval   = (int)$email->interval_num;
                        $add        = FUE::get_time_to_add( $interval, $email->interval_duration );
                        $send_on    = time() + $add;

                        $insert = array(
                            'product_id'=> $top['item'],
                            'email_id'  => $email->id,
                            'send_on'   => $send_on,
                            'is_cart'   => 1,
                            'user_id'   => $user->ID
                        );
                        FUE::insert_email_order( $insert );
                        $email_created = true;
                    }
                }
            }

            if ( !$email_created ) {
                // find a generic mailer
                $emails = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}followup_emails WHERE `email_type` = 'generic' AND `interval_type` = 'cart' ORDER BY `priority` ASC");

                foreach ( $emails as $email ) {
                    $check = $wpdb->get_var( $wpdb->prepare("SELECT COUNT(*) FROM `{$wpdb->prefix}followup_email_orders` WHERE `is_sent` = 0 AND `order_id` = 0 AND `product_id` = 0 AND `email_id` = %d AND `user_id` = %d AND `is_cart` = 1", $email->id, $user->ID) );

                    if ( $check > 0 || in_array($email->id .'_0', $cart_session) ) continue;
                    $cart_session[] = $email->id .'_0';
                    $interval   = (int)$email->interval_num;
                    $add        = FUE::get_time_to_add( $interval, $email->interval_duration );
                    $send_on    = time() + $add;

                    $insert = array(
                        'email_id'  => $email->id,
                        'send_on'   => $send_on,
                        'is_cart'   => 1,
                        'user_id'   => $user->ID
                    );

                    FUE::insert_email_order( $insert );
                }
            }

            update_user_meta( $user->ID, '_wcfue_cart_emails', $cart_session );
        }

        function new_order($order_id) {
            global $wpdb;

            $order          = new WC_Order($order_id);
            $triggers       = array();

            FUE::record_order( $order );

            if ( $order->status == 'processing' ) {
                //$triggers[] = 'purchase';
                $triggers[] = 'processing';

                // add the date trigger
                $triggers[] = 'date';

                // check for order_total
                $triggers[] = 'order_total_above';
                $triggers[] = 'order_total_below';
                $triggers[] = 'total_orders';
                $triggers[] = 'total_purchases';

                // check for first time purchase
                //$triggers[] = 'first_purchase';

                // get the user's number of orders
                if ( $order->user_id > 0 ) {
                    $num_orders = $wpdb->get_var( $wpdb->prepare("SELECT total_orders FROM {$wpdb->prefix}followup_customers WHERE user_id = %d", $order->user_id) );
                } else {
                    $num_orders = $wpdb->get_var( $wpdb->prepare("SELECT total_orders FROM {$wpdb->prefix}followup_customers WHERE email_address = %s", $order->billing_email) );
                }

                if ( $num_orders == 1 ) {
                    $triggers[] = 'first_purchase';
                }

                if ( $num_orders > 1 ) {
                    $triggers[] = 'purchase_above_one';
                }

            } elseif ( $order->status == 'completed' ) {
                // if there are no order_items in the database, it's time to extract them from the order and insert into order_items
                if ( 0 == $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}followup_order_items WHERE order_id = $order_id") ) {
                    // extract items and categories
                    $order_categories = array();

                    if ( function_exists('get_product') ) {
                        $order_item_ids = $wpdb->get_results("SELECT order_item_id FROM {$wpdb->prefix}woocommerce_order_items WHERE order_id = {$order_id}");

                        foreach ( $order_item_ids as $order_item ) {
                            $product_id = $wpdb->get_var("SELECT meta_value FROM {$wpdb->prefix}woocommerce_order_itemmeta WHERE order_item_id = {$order_item->order_item_id} AND meta_key = '_product_id'");

                            if ( $product_id ) {
                                $insert = array(
                                    'order_id'      => $order_id,
                                    'product_id'    => $product_id
                                );
                                $wpdb->insert( $wpdb->prefix .'followup_order_items', $insert );

                                // get the categories
                                $cat_ids = wp_get_post_terms( $product_id, 'product_cat', array('fields' => 'ids') );

                                if ( $cat_ids ) {
                                    foreach ( $cat_ids as $cat_id ) {
                                        $order_categories[] = $cat_id;
                                    }
                                }
                            }
                        }
                    } else {
                        $order_items = get_post_meta( $order_id, '_order_items', true );

                        foreach ( $order_items as $item ) {
                            $insert = array(
                                'order_id'      => $order_id,
                                'product_id'    => $item['id']
                            );
                            $wpdb->insert( $wpdb->prefix .'followup_order_items', $insert );

                            // get the categories
                            $cat_ids = wp_get_post_terms( $item['id'], 'product_cat', array('fields' => 'ids') );

                            if ( $cat_ids ) {
                                foreach ( $cat_ids as $cat_id ) {
                                    $order_categories[] = $cat_id;
                                }
                            }
                        }
                    }

                    $order_categories = array_unique($order_categories);

                    foreach ( $order_categories as $category_id ) {
                        $insert = array(
                            'order_id'      => $order_id,
                            'category_id'   => $category_id
                        );
                        $wpdb->insert( $wpdb->prefix .'followup_order_categories', $insert );
                    }
                }

                // get the user's number of orders
                if ( $order->user_id > 0 ) {
                    $num_orders = $wpdb->get_var( $wpdb->prepare("SELECT total_orders FROM {$wpdb->prefix}followup_customers WHERE user_id = %d", $order->user_id) );
                } else {
                    $num_orders = $wpdb->get_var( $wpdb->prepare("SELECT total_orders FROM {$wpdb->prefix}followup_customers WHERE email_address = %s", $order->billing_email) );
                }

                if ( $num_orders == 1 ) {
                    $triggers[] = 'first_purchase';
                }

                if ( $num_orders > 1 ) {
                    $triggers[] = 'purchase_above_one';
                }

                $triggers[] = $order->status;
            } else {
                $triggers[] = $order->status;
            }

            $triggers = apply_filters( 'fue_new_order_triggers', $triggers, $order_id );
            //echo '<pre>'. print_r($triggers, true) .'</pre>'; exit;
            FUE::create_order_from_triggers( $order_id, $triggers );
        }

        function order_status_changed($order_id, $old_status, $new_status) {
            global $wpdb;
            /*echo $new_status; exit;
            $triggers       = array($new_status);

            $triggers = apply_filters( 'fue_status_changed_triggers', $triggers, $order_id, $old_status, $new_status );

            FUE::create_order_from_triggers( $order_id, $triggers );*/
        }

        function user_register( $user_id ) {
            global $wpdb;

            $triggers = apply_filters( 'fue_user_register_triggers', array('signup'), $user_id );

            FUE::create_order_from_signup( $user_id, $triggers );
        }

        function unsubscribe_form() {
            $email = '';
            if (isset($_GET['wcfu']) && !empty($_GET['wcfu'])) {
                $email  = $_GET['wcfu'];
                $fueid  = isset($_GET['fueid']) ? $_GET['fueid'] : '';
            }
            ?>
            <div class="wcfu-unsubscribe-form">
                <form action="" method="post">
                    <input type="hidden" name="wcfu_action" value="wcfu_unsubscribe" />
                    <input type="hidden" name="wcfu_eid" value="<?php echo esc_attr($fueid); ?>" />
                    <p>
                        <label for="wcfu_email"><?php _e('Email Address:', 'wc_followup_emails'); ?></label>
                        <input type="text" id="wcfu_email" name="wcfu_email" value="<?php echo esc_attr($email); ?>" size="25" />
                    </p>
                    <?php do_action('fue_unsubscribe_form', $email); ?>
                    <p>
                        <input type="submit" name="wcfu_submit" value="<?php _e('Unsubscribe', 'wc_followup_emails'); ?>" />
                    </p>
                </form>
            </div>
            <?php
        }

        function unsubscribe_request() {
            global $wpdb, $woocommerce;

            if (isset($_POST['wcfu_action']) && $_POST['wcfu_action'] == 'wcfu_unsubscribe') {
                $email = $_POST['wcfu_email'];

                $email_name = $wpdb->get_var( $wpdb->prepare("SELECT `name` FROM `{$wpdb->prefix}followup_emails` WHERE `id` = %d", $_POST['wcfu_eid']) );

                $wpdb->query( $wpdb->prepare("INSERT INTO `{$wpdb->prefix}followup_email_excludes` (`email_id`, `email_name`, `email`, `date_added`) VALUES (%d, %s, %s, NOW())", $_POST['wcfu_eid'], $email_name, $email) );

                do_action('fue_user_unsubscribed', $_GET['wcfu']);

                wp_redirect(add_query_arg('wcfu_unsubscribed', 1, site_url()));
                exit;
            } elseif (isset($_GET['wcfu_unsubscribed'])) {
                add_action('wp_head', array($this, 'show_messages'));
            }
        }

        function show_messages() {
            $message = apply_filters('fue_unsubscribed_message', __('Thank you. You have been unsubscribed from our list.', 'wc_followup_emails') );
            echo '<script type="text/javascript">';
            echo 'alert("'. $message .'");';
            echo '</script>';
        }

        function email_query() {
            global $wpdb;
            $term       = esc_sql(like_escape(stripslashes($_GET['term'])));
            $results    = array();
            $all_emails = array();

            // Registered users
            $email_results = $wpdb->get_results("SELECT DISTINCT ID, display_name, user_email FROM {$wpdb->prefix}users WHERE `user_email` LIKE '{$term}%' OR display_name LIKE '%{$term}%'");

            if ( $email_results ) {
                foreach ( $email_results as $result ) {
                    $all_emails[] = $result->user_email;

                    $wp_user = new WP_User( $result->ID );

                    $key = $result->ID .'|'. $result->user_email .'|'. $result->display_name;

                    $results[$key] = $result->display_name .' &lt;'. $result->user_email .'&gt;';
                }
            }

            // Full name (First Last format)
            $name_results = $wpdb->get_results("
                SELECT DISTINCT m1.user_id, u.user_email, m1.meta_value AS first_name, m2.meta_value AS last_name
                FROM {$wpdb->prefix}users u, {$wpdb->prefix}usermeta m1, {$wpdb->prefix}usermeta m2
                WHERE u.ID = m1.user_id
                AND m1.user_id = m2.user_id
                AND m1.meta_key =  'first_name'
                AND m2.meta_key =  'last_name'
                AND CONCAT_WS(  ' ', m1.meta_value, m2.meta_value ) LIKE  '%{$term}%'
            ");

            if ( $name_results ) {
                foreach ( $name_results as $result ) {
                    if ( in_array($result->user_email, $all_emails) ) continue;

                    $all_emails[] = $result->user_email;

                    $key = $result->user_id .'|'. $result->user_email .'|'. $result->first_name .' '. $result->last_name;

                    $results[$key] = $result->first_name .' '. $result->last_name .' &lt;'. $result->user_email .'&gt;';
                }
            }

            // Guest customers (billing email)
            $billing_results = $wpdb->get_results("SELECT `post_id`, `meta_value` FROM {$wpdb->prefix}postmeta WHERE meta_key = '_billing_email' AND meta_value LIKE '{$term}%'");

            if ( $billing_results ) {
                foreach ( $billing_results as $result ) {
                    if ( in_array($result->meta_value, $all_emails) ) continue;

                    $all_emails[] = $result->meta_value;

                    // get the name
                    $first_name = get_post_meta( $result->post_id, '_billing_first_name', true );
                    $last_name = get_post_meta( $result->post_id, '_billing_last_name', true );

                    $key = '0|'. $result->meta_value .'|'. $first_name .' '. $last_name;

                    $results[$key] = $first_name .' '. $last_name .' &lt;'. $result->meta_value .'&gt;';
                }
            }

            // send to guest
            /*if ( is_email( $term )) {
                $key = '0|'. $term .'|';
                $results[$key] = sprintf(__('Send to %s', 'wc_followup_emails'), $term);
            }*/

            die(json_encode($results));
        }

        function import_orders() {
            FUE::import_orders( $_POST['email_id'] );
        }

        public function found_products( $products ) {
            foreach ( $products as $id => $title ) {
                $product = sfn_get_product($id);

                if ( is_a($product, 'WC_Product_Subscription_Variation') ) {
                    $extra_data = '';
                    $identifier = '#' . $id;
                    $attributes = $product->get_variation_attributes();
                    $extra_data = ' &ndash; ' . implode( ', ', $attributes ) . ' &ndash; ' . woocommerce_price( $product->get_price() );

                    $products[$id] = sprintf( __( '%s &ndash; %s%s', 'woocommerce' ), $identifier, $product->get_title(), $extra_data );
                }

            }

            return $products;
        }

	}

	$sfnFollowUpEmails = new SFN_FollowUpEmails();
}

if (! function_exists('sfn_get_product') ) {
    function sfn_get_product( $product_id ) {
        if ( function_exists('get_product') ) {
            return get_product( $product_id );
        } else {
            return new WC_Product( $product_id );
        }
    }
}
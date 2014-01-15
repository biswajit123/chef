<?php

class FUE {

    /**
     * Create email orders after a user registers
     * @static
     * @param int $user_id
     * @param array $triggers
     */
    public static function create_order_from_signup( $user_id, $triggers = array() ) {
        global $woocommerce, $wpdb;

        $user = new WP_User( $user_id );

        if ( is_wp_error($user) ) return;

        $trigger = '';
        foreach ( $triggers as $t ) {
            $trigger .= "'". esc_sql($t) ."',";
        }
        $trigger = rtrim($trigger, ',');

        if ( empty($trigger) ) $trigger = "''";

        $emails = $wpdb->get_results( "SELECT * FROM {$wpdb->prefix}followup_emails WHERE `email_type` = 'signup' AND `interval_type` IN ($trigger)" );

        foreach ( $emails as $email ) {
            $interval   = (int)$email->interval_num;

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
                $add        = self::get_time_to_add( $interval, $email->interval_duration );
                $send_on    = current_time('timestamp') + $add;
            }

            // look for dupes
            $count = $wpdb->get_var( $wpdb->prepare("SELECT COUNT(*) FROM {$wpdb->prefix}followup_email_orders WHERE email_id = %d AND user_id = %d", $email->id, $user_id) );

            if ($count == 0) {
                $insert = array(
                    'send_on'       => $send_on,
                    'email_id'      => $email->id,
                    'user_id'       => $user_id,
                    'order_id'      => 0,
                    'is_cart'       => 0
                );
                self::insert_email_order( $insert );
                break;
            }

        }
    }

    /**
     * Create email orders from a shop order
     * @static
     * @param int $order_id
     * @param array $triggers
     */
    public static function create_order_from_triggers( $order_id = 0, $triggers = array() ) {
        global $woocommerce, $wpdb;

        $order          = ($order_id > 0) ? new WC_Order($order_id) : false;
        $items          = $order->get_items();
        $order_created  = false;
        $num_queued     = 0;

        $trigger = '';
        foreach ( $triggers as $t ) {
            $trigger .= "'". esc_sql($t) ."',";
        }
        $trigger = rtrim($trigger, ',');

        if ( empty($trigger) ) $trigger = "''";

        // find a product match
        $emails         = array();
        $always_prods   = array();
        $always_cats    = array();

        foreach ( $items as $item ) {
            $prod_id = (isset($item['id'])) ? $item['id'] : $item['product_id'];

            // variation support
            if ( isset($item['variation_id']) && $item['variation_id'] > 0 ) $prod_id = $item['variation_id'];

            $email_results = $wpdb->get_results("
                SELECT DISTINCT `id`, `priority`
                FROM {$wpdb->prefix}followup_emails
                WHERE `interval_type` IN ($trigger)
                AND `product_id` = '". $prod_id ."'
                AND `email_type` <> 'generic'
                AND `always_send` = 0
                ORDER BY `priority` ASC
            ");

            if ( $email_results ) {
                foreach ($email_results as $email) {
                    $emails[] = array('id' => $email->id, 'item' => $prod_id, 'priority' => $email->priority);
                }
            }

            // always_send product matches
            $results = $wpdb->get_results("
                SELECT DISTINCT `id`
                FROM {$wpdb->prefix}followup_emails
                WHERE `interval_type` IN ($trigger)
                AND `product_id` = '". $prod_id ."'
                AND `always_send` = 1
            ");

            foreach ( $results as $row ) {
                $always_prods[] = array( 'id' => $row->id, 'item' => $prod_id );
            }

            // always_send category matches
            $cat_ids    = wp_get_object_terms( $prod_id, 'product_cat', array('fields' => 'ids') );
            $ids        = implode(',', $cat_ids);

            if (empty($ids)) $ids = "''";

            $results = $wpdb->get_results("
                SELECT DISTINCT `id`
                FROM {$wpdb->prefix}followup_emails
                WHERE `interval_type` IN ($trigger)
                AND `always_send` = 1
                AND `category_id` IN (". $ids .")
            ");

            foreach ( $results as $row ) {
                $always_cats[] = array('id' => $row->id, 'item' => $prod_id);
            }
        }

        if ( !empty($always_prods) ) {
            foreach ( $always_prods as $row ) {
                $email              = $wpdb->get_row( $wpdb->prepare("SELECT * FROM {$wpdb->prefix}followup_emails WHERE `id` = %d", $row['id']) );
                $interval           = (int)$email->interval_num;
                $interval_duration  = $email->interval_duration;

                $reminder_count = $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}followup_email_orders WHERE `order_id` = $order_id AND `email_id` = {$row['id']}");
                if ( $reminder_count == 0 && $email->email_type == 'reminder') {

                    // get the item's quantity
                    $qty = 0;

                    foreach ( $items as $item ) {
                        $item_id = (isset($item['product_id'])) ? $item['product_id'] : $item['id'];
                        if ( $item_id == $row['item'] ) {
                            $qty = $item['qty'];
                            break;
                        }
                    }

                    if ( $qty == 1 ) {
                        // only send the first email
                        $add        = FUE::get_time_to_add( $interval, $interval_duration );
                        $send_on    = current_time('timestamp') + $add;

                        $insert = array(
                            'send_on'       => $send_on,
                            'email_id'      => $email->id,
                            'product_id'    => $row['item'],
                            'order_id'      => $order_id
                        );
                        FUE::insert_email_order( $insert );
                    } elseif ( $qty == 2 ) {
                        // only send the first and last emails
                        $add        = FUE::get_time_to_add( $interval, $interval_duration );
                        $send_on    = current_time('timestamp')+ $add;

                        $insert = array(
                            'send_on'       => $send_on,
                            'email_id'      => $email->id,
                            'product_id'    => $row['item'],
                            'order_id'      => $order_id
                        );
                        FUE::insert_email_order( $insert );

                        $last       = FUE::get_time_to_add( $interval, $interval_duration );
                        $send_on    = current_time('timestamp') + $add + $last;

                        $insert = array(
                            'send_on'       => $send_on,
                            'email_id'      => $email->id,
                            'product_id'    => $row['item'],
                            'order_id'      => $order_id
                        );
                        FUE::insert_email_order( $insert );
                    } else {
                        // send all emails
                        $add    = FUE::get_time_to_add( $interval, $interval_duration );
                        $last   = 0;
                        for ($x = 1; $x <= $qty; $x++) {
                            $send_on    = current_time('timestamp') + $add + $last;
                            $last       += $add;

                            $insert = array(
                                'send_on'       => $send_on,
                                'email_id'      => $email->id,
                                'product_id'    => $row['item'],
                                'order_id'      => $order_id
                            );
                            FUE::insert_email_order( $insert );
                        }
                    }

                    continue;
                }

                $skip = false;

                do_action('fue_create_order_always_send', $email, $order_id, $row);

                if (false == $skip ) {

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
                        $add        = self::get_time_to_add( $interval, $email->interval_duration );
                        $send_on    = current_time('timestamp') + $add;
                    }

                    $insert = array(
                        'send_on'       => $send_on,
                        'email_id'      => $email->id,
                        'product_id'    => $row['item'],
                        'order_id'      => $order_id
                    );
                    self::insert_email_order( $insert );
                    $num_queued++;

                }
            }
        }

        if ( !empty($always_cats) ) {
            foreach ( $always_cats as $row ) {
                $email      = $wpdb->get_row( $wpdb->prepare("SELECT * FROM {$wpdb->prefix}followup_emails WHERE `id` = %d", $row['id']) );
                $interval   = (int)$email->interval_num;
                $interval_duration = $email->interval_duration;

                $reminder_count = $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}followup_email_orders WHERE `order_id` = $order_id AND `email_id` = {$row['id']}");
                if ( $reminder_count == 0 && $email->email_type == 'reminder') {

                    // get the item's quantity
                    $qty = 0;

                    foreach ( $items as $item ) {
                        $item_id = (isset($item['product_id'])) ? $item['product_id'] : $item['id'];
                        if ( $item_id == $row['item'] ) {
                            $qty = $item['qty'];
                            break;
                        }
                    }
                    echo 'QTY: '. $qty .'<br/>';
                    if ( $qty == 1 ) {
                        // only send the first email
                        $add        = FUE::get_time_to_add( $interval, $interval_duration );
                        $send_on    = current_time('timestamp') + $add;

                        $insert = array(
                            'send_on'       => $send_on,
                            'email_id'      => $email->id,
                            'product_id'    => $row['item'],
                            'order_id'      => $order_id
                        );
                        FUE::insert_email_order( $insert );
                    } elseif ( $qty == 2 ) {
                        // only send the first and last emails
                        $add        = FUE::get_time_to_add( $interval, $interval_duration );
                        $send_on    = current_time('timestamp')+ $add;

                        $insert = array(
                            'send_on'       => $send_on,
                            'email_id'      => $email->id,
                            'product_id'    => $row['item'],
                            'order_id'      => $order_id
                        );
                        FUE::insert_email_order( $insert );

                        $last       = FUE::get_time_to_add( $interval, $interval_duration );
                        $send_on    = current_time('timestamp') + $add + $last;

                        $insert = array(
                            'send_on'       => $send_on,
                            'email_id'      => $email->id,
                            'product_id'    => $row['item'],
                            'order_id'      => $order_id
                        );
                        FUE::insert_email_order( $insert );
                    } else {
                        // send all emails
                        $add    = FUE::get_time_to_add( $interval, $interval_duration );
                        $last   = 0;
                        echo 'qty: '. $qty .'<br/>';
                        for ($x = 1; $x <= $qty; $x++) {
                            echo 'rev x: '. $x .'<br/>';
                            $send_on    = current_time('timestamp') + $add + $last;
                            $last       += $add;

                            $insert = array(
                                'send_on'       => $send_on,
                                'email_id'      => $email->id,
                                'product_id'    => $row['item'],
                                'order_id'      => $order_id
                            );
                            FUE::insert_email_order( $insert );
                        }
                        exit;
                    }

                    continue;
                }

                do_action('fue_create_order_always_send', $email, $order_id, $row);

                if ( false == $skip ) {
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
                        $add        = self::get_time_to_add( $interval, $email->interval_duration );
                        $send_on    = current_time('timestamp') + $add;
                    }

                    $insert = array(
                        'send_on'       => $send_on,
                        'email_id'      => $email->id,
                        'product_id'    => $row['item'],
                        'order_id'      => $order_id
                    );
                    self::insert_email_order( $insert );
                    $num_queued++;
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
                    $add        = self::get_time_to_add( $interval, $email->interval_duration );
                    $send_on    = current_time('timestamp') + $add;
                }

                $insert = array(
                    'send_on'       => $send_on,
                    'email_id'      => $email->id,
                    'product_id'    => $top['item'],
                    'order_id'      => $order_id
                );
                self::insert_email_order( $insert );
                $num_queued++;
                $order_created = true;

                // look for other emails with the same product id
                foreach ( $emails as $prod_email ) {
                    if ( $prod_email['id'] == $top['id'] ) continue;

                    if ( $prod_email['item'] == $top['item'] ) {
                        $email = $wpdb->get_row( $wpdb->prepare("SELECT * FROM {$wpdb->prefix}followup_emails WHERE `id` = %d", $prod_email['id']) );

                        $interval   = (int)$email->interval_num;

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
                            $add        = self::get_time_to_add( $interval, $email->interval_duration );
                            $send_on    = current_time('timestamp') + $add;
                        }

                        $insert = array(
                            'send_on'       => $send_on,
                            'email_id'      => $email->id,
                            'product_id'    => $prod_email['item'],
                            'order_id'      => $order_id
                        );
                        self::insert_email_order( $insert );
                        $num_queued++;
                    } else {
                        // if schedule is within 60 minutes, add to queue
                        $email      = $wpdb->get_row( $wpdb->prepare("SELECT * FROM {$wpdb->prefix}followup_emails WHERE `id` = %d", $prod_email['id']) );
                        $interval   = (int)$email->interval_num;

                        if ( $email->interval_type == 'date' ) {
                            continue;
                        } else {
                            $add = self::get_time_to_add( $interval, $email->interval_duration );

                            if ( $add > 3600 ) continue;

                            // less than 60 minutes, add to queue
                            $send_on = current_time('timestamp') + $add;
                        }

                        $insert = array(
                            'send_on'       => $send_on,
                            'email_id'      => $email->id,
                            'product_id'    => $prod_email['item'],
                            'order_id'      => $order_id
                        );
                        self::insert_email_order( $insert );
                        $num_queued++;
                    }
                }
            }
        }

        // find a category match
        if ( !$order_created ) {
            $emails = array();
            foreach ( $items as $item ) {
                $prod_id    = (isset($item['id'])) ? $item['id'] : $item['product_id'];
                $cat_ids    = wp_get_object_terms( $prod_id, 'product_cat', array('fields' => 'ids') );
                $ids        = implode(',', $cat_ids);

                if (empty($ids)) $ids = "''";

                $email = $wpdb->get_results("SELECT DISTINCT `id`, `priority` FROM {$wpdb->prefix}followup_emails WHERE `interval_type` IN ($trigger) AND `product_id` = 0 AND `category_id` > 0 AND `category_id` IN (". $ids .") AND `email_type` <> 'generic' AND `always_send` = 0 ORDER BY `priority` ASC");

                foreach ( $email as $e ) {
                    $emails[] = array('id' => $e->id, 'item' => $prod_id, 'priority' => $e->priority);
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
                        $add        = self::get_time_to_add( $interval, $email->interval_duration );
                        $send_on    = current_time('timestamp') + $add;
                    }

                    $insert = array(
                        'send_on'       => $send_on,
                        'email_id'      => $email->id,
                        'product_id'    => $top['item'],
                        'order_id'      => $order_id
                    );
                    self::insert_email_order( $insert );
                    $num_queued++;
                    $order_created = true;

                    // look for other emails with the same category id
                    foreach ( $emails as $cat_email ) {
                        if ( $cat_email['id'] == $top['id'] ) continue;

                        if ( $cat_email['item'] == $top['item'] ) {
                            $email = $wpdb->get_row( $wpdb->prepare("SELECT * FROM {$wpdb->prefix}followup_emails WHERE `id` = %d", $cat_email['id']) );

                            $interval   = (int)$email->interval_num;

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
                                $add        = self::get_time_to_add( $interval, $email->interval_duration );
                                $send_on    = current_time('timestamp') + $add;
                            }

                            $insert = array(
                                'send_on'       => $send_on,
                                'email_id'      => $email->id,
                                'product_id'    => $cat_email['item'],
                                'order_id'      => $order_id
                            );
                            self::insert_email_order( $insert );
                            $num_queued++;
                        } else {
                            // if schedule is within 60 minutes, add to queue
                            $email      = $wpdb->get_row( $wpdb->prepare("SELECT * FROM {$wpdb->prefix}followup_emails WHERE `id` = %d", $cat_email['id']) );
                            $interval   = (int)$email->interval_num;

                            if ( $email->interval_type == 'date' ) {
                                continue;
                            } else {
                                $add = self::get_time_to_add( $interval, $email->interval_duration );

                                if ( $add > 3600 ) continue;

                                // less than 60 minutes, add to queue
                                $send_on = current_time('timestamp') + $add;
                            }

                            $insert = array(
                                'send_on'       => $send_on,
                                'email_id'      => $email->id,
                                'product_id'    => $cat_email['item'],
                                'order_id'      => $order_id
                            );
                            self::insert_email_order( $insert );
                            $num_queued++;
                        }
                    }
                }
            }
        }

        if ( !$order_created ) {
            // find a generic mailer
            $emails = $wpdb->get_results("SELECT DISTINCT * FROM {$wpdb->prefix}followup_emails WHERE `email_type` = 'generic' AND `interval_type` IN ($trigger) ORDER BY `priority` ASC");

            foreach ( $emails as $email ) {
                $interval   = (int)$email->interval_num;

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
                    $add        = self::get_time_to_add( $interval, $email->interval_duration );
                    $send_on    = current_time('timestamp') + $add;
                }

                $insert = array(
                    'send_on'       => $send_on,
                    'email_id'      => $email->id,
                    'product_id'    => 0,
                    'order_id'      => $order_id
                );
                self::insert_email_order( $insert );
                $num_queued++;
            }

        }

        if ( $order !== false ) {
            // look for customer emails
            $emails = $wpdb->get_results("SELECT DISTINCT * FROM {$wpdb->prefix}followup_emails WHERE `email_type` = 'customer' AND `interval_type` IN ($trigger) ORDER BY `priority` ASC");

            foreach ( $emails as $email ) {
                $interval   = (int)$email->interval_num;
                $meta       = maybe_unserialize( $email->meta );

                // check for order total triggers first
                if ( $email->interval_type == 'order_total_above' ) {
                    if ( !isset($meta['order_total_above'])) continue;
                    if ( $order->order_total < $meta['order_total_above'] ) continue;
                } elseif ( $email->interval_type == 'order_total_below' ) {
                    if ( !isset($meta['order_total_below'])) continue;
                    if ( $order->order_total > $meta['order_total_below'] ) continue;
                } elseif ( $email->interval_type == 'total_orders' ) {
                    $mode           = $meta['total_orders_mode'];
                    $requirement    = $meta['total_orders'];

                    if ( isset($meta['one_time']) && $meta['one_time'] == 'yes' ) {
                        // get the correct email address
                        if ( $order->user_id > 0 ) {
                            $user = new WP_User( $order->user_id );
                            $user_email = $user->user_email;
                        } else {
                            $user_email = $order->billing_email;
                        }

                        $search = $wpdb->get_var( $wpdb->prepare(
                            "SELECT COUNT(*)
                            FROM {$wpdb->prefix}followup_email_orders
                            WHERE email_id = %d
                            AND user_email = %s",
                            $email->id,
                            $user_email
                        ) );

                        if ( $search > 0 ) continue;
                    }

                    // get user's total number of orders
                    if ( $order->user_id > 0 ) {
                        $num_orders = $wpdb->get_var( $wpdb->prepare("SELECT total_orders FROM {$wpdb->prefix}followup_customers WHERE user_id = %d", $order->user_id) );
                    } else {
                        $num_orders = $wpdb->get_var( $wpdb->prepare("SELECT total_orders FROM {$wpdb->prefix}followup_customers WHERE email_address = %s", $order->billing_email) );
                    }

                    if ( $mode == 'less than' && $num_orders >= $requirement ) {
                        continue;
                    } elseif ( $mode == 'equal to' && $num_orders != $requirement ) {
                        continue;
                    } elseif ( $mode == 'greater than' && $num_orders <= $requirement ) {
                        continue;
                    }
                } elseif ( $email->interval_type == 'total_purchases' ) {
                    $mode           = $meta['total_purchases_mode'];
                    $requirement    = $meta['total_purchases'];

                    if ( isset($meta['one_time']) && $meta['one_time'] == 'yes' ) {
                        // get the correct email address
                        if ( $order->user_id > 0 ) {
                            $user = new WP_User( $order->user_id );
                            $user_email = $user->user_email;
                        } else {
                            $user_email = $order->billing_email;
                        }

                        $search = $wpdb->get_var( $wpdb->prepare(
                            "SELECT COUNT(*)
                            FROM {$wpdb->prefix}followup_email_orders
                            WHERE email_id = %d
                            AND user_email = %s",
                            $email->id,
                            $user_email
                        ) );

                        if ( $search > 0 ) continue;
                    }

                    // get user's total amount of purchases
                    if ( $order->user_id > 0 ) {
                        $purchases = $wpdb->get_var( $wpdb->prepare("SELECT total_purchase_price FROM {$wpdb->prefix}followup_customers WHERE user_id = %d", $order->user_id) );
                    } else {
                        $purchases = $wpdb->get_var( $wpdb->prepare("SELECT total_purchase_price FROM {$wpdb->prefix}followup_customers WHERE email_address = %s", $order->billing_email) );
                    }

                    if ( $mode == 'less than' && $purchases >= $requirement ) {
                        continue;
                    } elseif ( $mode == 'equal to' && $purchases != $requirement ) {
                        continue;
                    } elseif ( $mode == 'greater than' && $purchases <= $requirement ) {
                        continue;
                    }
                } elseif ( $email->interval_type == 'purchase_above_one' ) {
                    // look for duplicate emails
                    if ( $order->user_id > 0 ) {
                        $wp_user = new WP_User( $order->user_id );
                        $user_email = $wp_user->user_email;
                    } else {
                        $user_email = $order->billing_email;
                    }

                    $num = $wpdb->get_var( $wpdb->prepare(
                                "SELECT COUNT(*)
                                FROM {$wpdb->prefix}followup_email_orders
                                WHERE email_id = %d
                                AND user_email = %s",
                                $email->id,
                                $user_email
                            ) );

                    if ( $num > 0 ) continue;
                }

                $add        = self::get_time_to_add( $interval, $email->interval_duration );
                $send_on    = current_time('timestamp') + $add;

                $insert = array(
                    'send_on'       => $send_on,
                    'email_id'      => $email->id,
                    'order_id'      => $order_id
                );
                self::insert_email_order( $insert );
                $num_queued++;
            }
        }

        // special trigger: last purchased
        if ( $order && ( $order->status == 'processing' || $order->status == 'completed' ) ) {
            $recipient = ($order->user_id > 0) ? $order->user_id : $order->billing_email;

            // if there are any "last purchased" emails, automatically add this order to the queue
            $emails = $wpdb->get_results("SELECT DISTINCT * FROM {$wpdb->prefix}followup_emails WHERE `email_type` = 'customer' AND `interval_type` = 'after_last_purchase' ORDER BY `priority` ASC");

            foreach ( $emails as $email ) {

                // look for unsent emails in the queue with the same email ID
                $queued = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}followup_email_orders WHERE is_sent = 0 AND email_id = {$email->id}");

                // loop through the queue and delete entries with identical customers
                foreach ( $queued as $queue ) {
                    if ( $queue->user_id > 0 && $order->user_id > 0 && $queue->user_id == $order->user_id ) {

                        $wpdb->query("DELETE FROM {$wpdb->prefix}followup_email_orders WHERE id = {$queue->id}");
                    } elseif ( $order->user_id == 0 ) {
                        // try to match the email address
                        $email = get_post_meta( $queue->order_id, '_billing_email', true );

                        if ( $email == $order->billing_email ) {
                            $wpdb->query("DELETE FROM {$wpdb->prefix}followup_email_orders WHERE id = {$queue->id}");
                        }
                    }
                }

                if ( $order->user_id > 0 ) {
                    $last_order_date    = $wpdb->get_var( $wpdb->prepare("SELECT p.post_date FROM {$wpdb->posts} p, {$wpdb->prefix}followup_customer_orders co WHERE co.followup_customer_id = %d AND co.order_id = p.ID AND p.post_status = 'publish' ORDER BY p.ID DESC LIMIT 1", $order->user_id) );
                } else {
                    $last_order_date    = $wpdb->get_var( $wpdb->prepare("SELECT p.post_date FROM {$wpdb->posts} p, {$wpdb->prefix}followup_customer_orders co WHERE co.followup_customer_id = %d AND co.order_id = p.ID AND p.post_status = 'publish' ORDER BY p.ID DESC LIMIT 1", $order->billing_email) );
                }

                // add this email to the queue
                $interval   = (int)$email->interval_num;
                $add        = self::get_time_to_add( $interval, $email->interval_duration );
                $send_on    = current_time('timestamp') + $add;

                $insert = array(
                    'send_on'       => $send_on,
                    'email_id'      => $email->id,
                    'product_id'    => 0,
                    'order_id'      => $order_id
                );
                self::insert_email_order( $insert );
                $num_queued++;
            }
        }

        return $num_queued;
    }

    public static function insert_email_order( $data ) {
        global $wpdb;

        $defaults = array(
            'user_id'       => 0,
            'user_email'    => '',
            'order_id'      => 0,
            'product_id'    => 0,
            'email_id'      => '',
            'send_on'       => 0,
            'is_cart'       => 0,
            'is_sent'       => 0,
            'date_sent'     => '',
            'email_trigger' => '',
            'meta'          => ''
        );

        $insert = array_merge( $defaults, $data );

        if ( isset($insert['meta']) && !empty($insert['meta']) ) {
            $insert['meta'] = serialize($insert['meta']);
        }

        $insert = apply_filters( 'fue_insert_email_order', $insert );

        // get the correct email address
        if ( $insert['user_id'] > 0 ) {
            $user = new WP_User( $insert['user_id'] );
            $insert['user_email'] = $user->user_email;
        } elseif ( $insert['order_id'] > 0 ) {
            $order = new WC_Order( $insert['order_id'] );
            $insert['user_email'] = $order->billing_email;
        }

        $email_meta     = $wpdb->get_var( $wpdb->prepare("SELECT meta FROM {$wpdb->prefix}followup_emails WHERE id = %d", $insert['email_id'])  );
        $adjust_date    = false;

        if ( !empty($email_meta) ) {
            $email_meta = maybe_unserialize( $email_meta );

            if ( isset($email_meta['adjust_date']) && $email_meta['adjust_date'] == 'yes' ) {
                $adjust_date = true;
            }
        }

        if ( $adjust_date ) {
            // check for similar existing and unsent email orders
            // and adjust the date to send instead of inserting a duplicate row
            $sql = "SELECT id FROM {$wpdb->prefix}followup_email_orders
                    WHERE email_id = %d
                    AND user_id = %d
                    AND product_id = %d
                    AND is_cart = %d
                    AND is_sent = 0";
            $similar_email = $wpdb->get_row( $wpdb->prepare($sql, $insert['email_id'], $insert['user_id'], $insert['product_id'], $insert['is_cart']) );

            if ( $similar_email ) {
                $update = array(
                    'send_on'   => $insert['send_on']
                );
                $wpdb->update($wpdb->prefix .'followup_email_orders', $update, array('id' => $similar_email->id));

                return $similar_email->id;
            } else {
                $wpdb->insert( $wpdb->prefix .'followup_email_orders', $insert );
                return $wpdb->insert_id;
            }
        } else {
            $wpdb->insert( $wpdb->prefix .'followup_email_orders', $insert );
            return $wpdb->insert_id;
        }

    }

    /**
     * Send emails that are in the email queue
     */
    public static function send_emails() {
        global $wpdb, $woocommerce;
        global $sfnFollowUpEmails;

        // get start and end times
        $to         = current_time('timestamp');
        $results    = $wpdb->get_results( $wpdb->prepare("SELECT * FROM `{$wpdb->prefix}followup_email_orders` WHERE `is_sent` = 0 AND `send_on` <= %s", $to) );

        foreach ($results as $email_order) {
            $sfn_report = array();
            $user_id    = 0;

            if ( !$email_order->email_id || $email_order->email_id == 0 ) {
                $wpdb->query( $wpdb->prepare("DELETE FROM {$wpdb->prefix}followup_email_orders WHERE id = %d", $email_order->id) );
                continue;
            }

            $email  = $wpdb->get_row( $wpdb->prepare("SELECT * FROM `{$wpdb->prefix}followup_emails` WHERE `id` = '%d'", $email_order->email_id) );

            // allow other extensions to "skip" sending this email
            $skip = apply_filters( 'fue_skip_email_sending', false, $email, $email_order );

            if ( $skip ) continue;

            if ( $email_order->order_id != 0 ) {
                // order
                $order      = new WC_Order($email_order->order_id);

                // if this is an "Order Status" email, make sure that the order is still
                // in the same status as the one it was originally intended for
                // e.g. Do not send "on-hold" order status emails if the order status has
                // been changed to "completed" before sending the email
                $order_statuses_array   = (array)get_terms( 'shop_order_status', array('hide_empty' => 0, 'orderby' => 'id') );
                $all_statuses           = array();
                foreach ( $order_statuses_array as $status ) {
                    $all_statuses[] = $status->slug;
                }

                if (in_array($email->interval_type, $all_statuses) && $email->interval_type !== $order->status) {
                    // order status looks to have been changed already
                    $wpdb->query( $wpdb->prepare("DELETE FROM {$wpdb->prefix}followup_email_orders WHERE id = %d AND is_sent = 0", $email_order->id) );
                    continue;
                }

                if ( isset($order->user_id) && $order->user_id > 0 ) {
                    $user_id    = $order->user_id;
                    $wp_user    = new WP_User( $order->user_id );
                    $email_to   = $wp_user->user_email;
                    $first_name = $wp_user->first_name;
                    $last_name  = $wp_user->last_name;
                    $cname      = $first_name .' '. $last_name;
                } else {
                    $email_to   = $order->billing_email;
                    $first_name = $order->billing_first_name;
                    $last_name  = $order->billing_last_name;
                }

                $cname          = $first_name .' '. $last_name;
                $order_date     = date(get_option('date_format'), strtotime($order->order_date));
                $order_datetime = date(get_option('date_format') .' '. get_option('time_format'), strtotime($order->order_date));
            } else {
                $order_date     = '';
                $order_datetime = '';

                if ( $email->email_type == 'manual' ) {
                    $meta       = maybe_unserialize( $email_order->meta );
                    $email_to   = $meta['email_address'];
                    $order      = false;
                } else {
                    $order      = false;
                    $user_id    = $email_order->user_id;
                    $wp_user    = new WP_User( $email_order->user_id );
                    $email_to   = $wp_user->user_email;
                    $first_name = $wp_user->first_name;
                    $last_name  = $wp_user->last_name;
                    $cname      = $first_name .' '. $last_name;

                    if ( empty($first_name)  && empty($last_name) ) {
                        $first_name = $wp_user->user_nicename;
                        $cname      = $wp_user->user_nicename;
                    }

                    // non-order related email. make sure user is not opted-out
                    $opt_out = get_user_meta( $email_order->user_id, 'wcfu_opted_out', true );
                    $opt_out = apply_filters( 'fue_user_opt_out', $opt_out, $email_order->user_id );

                    if ( $opt_out )  {
                        // user opted out, delete this email_order
                        $wpdb->query( $wpdb->prepare("DELETE FROM {$wpdb->prefix}followup_email_orders WHERE `id` = %d", $email_order->id) );
                        continue;
                    }
                }
            }

            // check if the email address is on the excludes list
            $sql = $wpdb->prepare( "SELECT COUNT(*) FROM `{$wpdb->prefix}followup_email_excludes` WHERE `email` = '%s'", $email_to );

            if ($wpdb->get_var( $sql ) > 0) {
                // delete and go to the next entry
                do_action( 'fue_email_excluded', $email_to, $email_order->id );
                $wpdb->query( $wpdb->prepare("DELETE FROM {$wpdb->prefix}followup_email_orders WHERE `id` = %d", $email_order->id) );
                continue;
            }

            if ( $email->email_type == 'generic' ) {
                if ( $order ) {
                    $used_cats  = array();
                    $item_list  = '<ul>';
                    $item_cats  = '<ul>';
                    $items      = $order->get_items();

                    foreach ( $items as $item ) {
                        $item_id = (isset($item['product_id'])) ? $item['product_id'] : $item['id'];
                        $item_list .= apply_filters( 'fue_email_item_list', '<li><a href="'. self::create_email_url( $email_order->id, $email->id, $user_id, $email_to, get_permalink($item_id) ) .'">'. get_the_title($item_id) .'</a></li>', $email_order->id, $item );

                        $cats   = get_the_terms($item_id, 'product_cat');

                        if ( is_array($cats) && !empty($cats) ) {
                            foreach ($cats as $cat) {
                                if (!in_array($cat->term_id, $used_cats)) {
                                    $item_cats .= apply_filters( 'fue_email_cat_list', '<li>'. $cat->name .'</li>', $email_order->id, $cat );
                                }
                            }
                        }
                    }

                    $item_list .= '</ul>';
                    $item_cats .= '</ul>';
                } else {
                    $item_list = '';
                    $item_cats = '';
                }
            } else {
                if ( !empty($email_order->product_id) ) {
                    $item   = sfn_get_product($email_order->product_id);
                    $cats   = get_the_terms($item->id, 'product_cat');

                    $categories = '';
                    if (is_array($cats) && !empty($cats)) {
                        foreach ($cats as $cat) {
                            $categories .= $cat->name .', ';
                        }
                        $categories = rtrim($categories, ', ');
                    }
                } else {

                }
            }

            // process variable replacements
            $tracking   = $email->tracking_code;
            $codes      = array();

            if ( !empty($tracking) ) {
                parse_str( $tracking, $codes );

                foreach ( $codes as $key => $val ) {
                    $codes[$key] = urlencode($val);
                }
            }

            $store_url      = home_url();
            $store_name     = get_bloginfo('name');
            $page_id        = woocommerce_get_page_id('followup_unsubscribe');
            $unsubscribe    = add_query_arg('wcfu', $email_to, get_permalink($page_id));

            // convert urls
            $store_url      = self::create_email_url( $email_order->id, $email->id, $user_id, $email_to, $store_url );
            $unsubscribe    = self::create_email_url( $email_order->id, $email->id, $user_id, $email_to, $unsubscribe );

            if (! empty($codes) ) {
                $store_url      = add_query_arg($codes, $store_url);
                $unsubscribe    = add_query_arg($codes, $unsubscribe);
            }

            $order_id = '';
            if (0 != $email_order->order_id) {
                $order_id = apply_filters( 'woocommerce_order_number', $email_order->order_id, $order );
            }

            $subject    = $email->subject;
            $message    = $email->message;

            if ( $email->email_type == 'generic' ) {
					
						/* Code by soumya */

				/* Get order Total */
				$order_t = get_post_meta($email_order->order_id, '_order_total', true);
				if(empty($order_t))
					$order_t = 0;
				$order_t = '$'.$order_t;

				/** get servings details **/
				$srOW = $wpdb->get_row("select * FROM wp_woocommerce_order_items WHERE order_id = " . $email_order->order_id);
                $mealOrder_serving = woocommerce_get_order_item_meta($srOW->order_item_id, 'Servings:', true);

				/* get delivery date */
				$order_dd = get_post_meta($email_order->order_id, 'Delivery Date', true);
				if(empty($order_dd)){
					$order_dd = '';
				}

                $vars   = array('{order_number}', '{order_date}', '{order_datetime}', '{store_url}', '{store_name}', '{customer_first_name}', '{customer_name}', '{customer_email}', '{item_names}', '{item_categories}', '{unsubscribe_url}', '{order_total}', '{order_delivery_date}', '{order_servings}');
                $reps   = array(
                    $order_id,
                    $order_date,
                    $order_datetime,
                    $store_url,
                    $store_name,
                    $first_name,
                    $first_name .' '. $last_name,
                    $email_to,
                    $item_list,
                    $item_cats,
                    $unsubscribe,
					$order_t,
					$order_dd,
					$mealOrder_serving
                );
            } elseif ( $email->email_type == 'signup' ) {
                $vars   = array('{store_url}', '{store_name}', '{customer_first_name}', '{customer_name}', '{customer_email}', '{unsubscribe_url}');
                $reps   = array(
                    $store_url,
                    $store_name,
                    $first_name,
                    $cname,
                    $email_to,
                    $unsubscribe
                );
            } elseif ( $email->email_type == 'customer' ) {
                if ( $user_id > 0 ) {
                    $customer       = $wpdb->get_row( $wpdb->prepare("SELECT * FROM {$wpdb->prefix}followup_customers WHERE user_id = %d", $user_id) );
                    $spent_order    = woocommerce_price($order->order_total);
                    $spent_total    = woocommerce_price($customer->total_purchase_price);
                    $num_orders     = $customer->total_orders;
                    $last_order_date= $wpdb->get_var( $wpdb->prepare("SELECT p.post_date FROM {$wpdb->posts} p, {$wpdb->prefix}followup_customer_orders co WHERE co.followup_customer_id = %d AND co.order_id = p.ID AND p.post_status = 'publish' ORDER BY p.ID DESC LIMIT 1", $user_id) );
                    $last_purchase  = date( get_option('date_format'), strtotime($last_order_date) );
                } else {
                    $customer       = $wpdb->get_row( $wpdb->prepare("SELECT * FROM {$wpdb->prefix}followup_customers WHERE email_address = %s", $email_to) );
                    $spent_order    = woocommerce_price($order->order_total);
                    $spent_total    = woocommerce_price($customer->total_purchase_price);
                    $num_orders     = $customer->total_orders;
                    $last_order_date= $wpdb->get_var( $wpdb->prepare("SELECT p.post_date FROM {$wpdb->posts} p, {$wpdb->postmeta} pm WHERE pm.meta_key = '_billing_email' AND pm.meta_value = %d AND pm.post_id = p.ID AND p.post_status = 'publish' ORDER BY p.ID DESC LIMIT 1", $email_to) );
                    $last_purchase  = date( get_option('date_format'), strtotime($last_order_date) );
                }

                $vars   = array('{order_number}', '{order_date}', '{order_datetime}', '{store_url}', '{store_name}', '{customer_first_name}', '{customer_name}', '{customer_email}', '{unsubscribe_url}', '{dollars_spent_order}', '{dollars_spent_total}', '{number_orders}', '{last_purchase_date}');
                $reps   = array(
                    $order_id,
                    $order_date,
                    $order_datetime,
                    $store_url,
                    $store_name,
                    $first_name,
                    $first_name .' '. $last_name,
                    $email_to,
                    $unsubscribe,
                    $spent_order,
                    $spent_total,
                    $num_orders,
                    $last_purchase
                );
            } elseif ( $email->email_type == 'manual' ) {
                $meta           = maybe_unserialize( $email_order->meta );
                $store_url      = home_url();
                $store_name     = get_bloginfo('name');
                $page_id        = woocommerce_get_page_id('followup_unsubscribe');
                $unsubscribe    = add_query_arg('wcfu', $email_to, get_permalink($page_id));

                // convert urls
                $store_url      = self::create_email_url( $email_order->id, $email->id, $user_id, $email_to, $store_url );
                $unsubscribe    = self::create_email_url( $email_order->id, $email->id, $user_id, $email_to, $unsubscribe );

                if (! empty($codes) ) {
                    $store_url      = add_query_arg($codes, $store_url);
                    $unsubscribe    = add_query_arg($codes, $unsubscribe);
                }

                $names = explode(' ', $meta['user_name']);
                $first_name = ( isset($names[0]) ) ? $names[0] : $meta['user_name'];

                $vars   = array('{store_url}', '{store_name}', '{customer_first_name}', '{customer_name}', '{customer_email}', '{unsubscribe_url}');
                $reps   = array(
                    $store_url,
                    $store_name,
                    $first_name,
                    $meta['user_name'],
                    $email_to,
                    $unsubscribe
                );

                $subject = $meta['subject'];
                $message = $meta['message'];
            } else {
                $item_url   = self::create_email_url( $email_order->id, $email->id, $user_id, $email_to, get_permalink($item->id) );

                if (! empty($codes) ) add_query_arg($codes, $item_url);

                $order_id = '';
                if (0 != $email_order->order_id) {
                    $order_id = apply_filters( 'woocommerce_order_number', $email_order->order_id, $order );
                }
					/* Code by soumya */

				/* Get order Total */
				$order_t = get_post_meta($email_order->order_id, '_order_total', true);
				if(empty($order_t))
					$order_t = 0;
				$order_t = '$'.$order_t;

				/** get servings details **/
				$srOW = $wpdb->get_row("select * FROM wp_woocommerce_order_items WHERE order_id = " . $email_order->order_id);
                $mealOrder_serving = woocommerce_get_order_item_meta($srOW->order_item_id, 'Servings:', true);

				/* get delivery date */
				$order_dd = get_post_meta($email_order->order_id, 'Delivery Date', true);
				if(empty($order_dd)){
					$order_dd = '';
				}

				$vars   = array('{order_number}', '{order_date}', '{order_datetime}', '{store_url}', '{store_name}', '{customer_first_name}', '{customer_name}', '{customer_email}', '{item_name}', '{item_category}', '{unsubscribe_url}', '{order_total}', '{order_delivery_date}', '{order_servings}');

				$reps       = array(
                    $order_id,
                    $order_date,
                    $order_datetime,
                    $store_url,
                    $store_name,
                    $first_name,
                    $first_name .' '. $last_name,
                    $email_to,
                    '<a href="'. $item_url .'">'. get_the_title($item->id) .'</a>',
                    $categories,
                    $unsubscribe,
					$order_t,
					$order_dd,
					$mealOrder_serving

                );
				/* soumya code ended */

          /*      $vars       = array('{order_number}', '{order_date}', '{order_datetime}', '{store_url}', '{store_name}', '{customer_first_name}', '{customer_name}', '{customer_email}', '{item_name}', '{item_category}', '{unsubscribe_url}');
                $reps       = array(
                    $order_id,
                    $order_date,
                    $order_datetime,
                    $store_url,
                    $store_name,
                    $first_name,
                    $first_name .' '. $last_name,
                    $email_to,
                    '<a href="'. $item_url .'">'. get_the_title($item->id) .'</a>',
                    $categories,
                    $unsubscribe
                );
			*/
            }

            //$email->message = self::url_to_links( $email->message, $email_order->id, $email->id, $user_id, $email_to );
            if ( $email_order->order_id > 0 && $email->email_type == 'reminder' ) {
                // count the total emails and the number of sent emails
                $total_emails   = $wpdb->get_var( $wpdb->prepare("SELECT COUNT(*) FROM {$wpdb->prefix}followup_email_orders WHERE order_id = %d AND email_id = %d", $email_order->order_id, $email->id) );
                $sent_emails    = $wpdb->get_var( $wpdb->prepare("SELECT COUNT(*) FROM {$wpdb->prefix}followup_email_orders WHERE order_id = %d AND email_id = %d AND is_sent = 1", $email_order->order_id, $email->id) );

                if ( $total_emails == 1 ) {
                    $messages = self::str_search('{first_email}', '{/first_email}', $message);

                    if (empty($messages)) continue;
                    $message = $messages[0];
                } elseif ( $total_emails == 2 ) {
                    if ( $sent_emails == 0 ) {
                        $messages = self::str_search('{first_email}', '{/first_email}', $message);

                        if (empty($messages)) continue;
                        $message = $messages[0];
                    } else {
                        $messages = self::str_search('{final_email}', '{/final_email}', $message);
                        if (empty($messages)) continue;
                        $message = $messages[0];
                    }
                } else {
                    if ( $sent_emails == 0 ) {
                        $messages = self::str_search('{first_email}', '{/first_email}', $message);
                        if (empty($messages)) continue;
                        $message = $messages[0];
                    } elseif ( $sent_emails == ($total_emails - 1) ) {
                        $messages = self::str_search('{final_email}', '{/final_email}', $message);
                        if (empty($messages)) continue;
                        $message = $messages[0];
                    } else {
                        $messages = self::str_search('{quantity_email}', '{/quantity_email}', $message);
                        if (empty($messages)) continue;
                        $message = $messages[0];
                    }
                }
            }

            $subject    = apply_filters('fue_email_subject', $subject, $email, $email_order);
            $message    = apply_filters('fue_email_message', $message, $email, $email_order);

            $subject    = strip_tags(str_replace($vars, $reps, $subject));
            $message    = str_replace($vars, $reps, $message);

            // hook to variable replacement
            $subject    = apply_filters( 'fue_send_email_subject', $subject, $email_order );
            $message    = apply_filters( 'fue_send_email_message', $message, $email_order );

            // look for custom fields
            $message    = preg_replace_callback('|\{cf ([0-9]+) ([^}]*)\}|', 'fue_add_custom_fields', $message);

            // look for post id
            $message    = preg_replace_callback('|\{post_id=([^}]+)\}|', 'fue_add_post', $message);

            // look for links
            $replacer   = new FUE_Link_Replacement( $email_order->id, $email->id, $user_id, $email_to );
            $message    = preg_replace_callback('|\{link url=([^}]+)\}|', array($replacer, 'replace'), $message);

            // look for store_url with path
            $sfnFollowUpEmails->link_meta = array(
                'email_order_id'    => $email_order->id,
                'email_id'          => $email->id,
                'user_id'           => $user_id,
                'user_email'        => $email_to,
                'codes'             => $codes
            );
            $message    = preg_replace_callback('|\{store_url=([^}]+)\}|', 'FUE::add_store_url', $message);

            do_action( 'fue_before_email_send', $subject, $message, $email_order );

            // send the email
            $disable_wrap   = get_option('fue_disable_wrapping', 0);
            $mailer         = $woocommerce->mailer();

            if (! $disable_wrap ) {
                $message = $mailer->wrap_message( $subject, $message );
            }

            $mailer->send($email_to, $subject, $message);

            $oid = ($order) ? $email_order->order_id : 0;

            if ( $email->email_type == 'manual' ) {
                $email_trigger = __('Manual Email', 'wc_followup_emails');
            } else {
                if ( $email->interval_type == 'date' ) {
                    $email_trigger = sprintf( __('Send on %s'), $email->send_date .' '. $email->send_date_hour .':'. $email->send_date_minute );
                } elseif ( $email->interval_type == 'signup' ) {
                    $email_trigger = sprintf( __('%d %s after user signs up', 'wc_followup_emails'), $email->interval_num, $email->interval_duration );
                } else {
                    $email_trigger = sprintf( __('%d %s %s'), $email->interval_num, $email->interval_duration, SFN_FollowUpEmails::get_trigger_name( $email->interval_type ) );
                }
            }
            $email_trigger = apply_filters( 'fue_interval_str', $email_trigger, $email );

            do_action( 'fue_after_email_sent', $subject, $message, $email_order );
            do_action( 'fue_email_sent_details', $email_order, $email_order->user_id, $email, $email_to, $cname, $email_trigger );

            // increment usage count
            $wpdb->query( $wpdb->prepare("UPDATE `{$wpdb->prefix}followup_emails` SET `usage_count` = `usage_count` + 1 WHERE `id` = %d", $email->id) );

            // update the email order
            $now = date('Y-m-d H:i:s');
            $wpdb->query( $wpdb->prepare("UPDATE `{$wpdb->prefix}followup_email_orders` SET `is_sent` = 1, `date_sent` = %s, `email_trigger` = %s WHERE `id` = %d", $now, $email_trigger, $email_order->id) );
            do_action( 'fue_email_order_sent', $email_order->id );
        }
    }

    function send_manual_emails( $args = array() ) {
        global $wpdb, $woocommerce;

        $args = wp_parse_args( $args, array(
                'email_id'          => 0,
                'recipients'        => array(),
                'subject'           => '',
                'message'           => '',
                'tracking'          => '',
                'interval'          => '',
                'interval_duration' => ''
            )
        );
        extract($args);

        if ( empty($recipients) ) return;

        // process variable replacements
        $codes      = array();

        if ( !empty($tracking) ) {
            parse_str( $tracking, $codes );

            foreach ( $codes as $key => $val ) {
                $codes[$key] = urlencode($val);
            }
        }

        $store_url      = home_url();
        $store_name     = get_bloginfo('name');
        $page_id        = woocommerce_get_page_id('followup_unsubscribe');
        $orig_message   = $message;
        $orig_subject   = $subject;
        $recipient_num  = 0;
        $send_time      = current_time( 'timestamp' );

        foreach ( $recipients as $recipient ) {
            $recipient_num++;

            // determine when to send this email
            // add 10 minutes to the send time for every 100 recipients
            if ( $recipient_num == 100 ) {
                $send_time += 600;
                $recipient_num = 0;
            }

            // create an email order
            $user_id        = $recipient[0];
            $email_address  = $recipient[1];
            $user_name      = $recipient[2];
            $unsubscribe    = add_query_arg('wcfu', $email_address, get_permalink($page_id));

            $_message        = $orig_message;
            $_subject        = $orig_subject;

            $meta = array(
                'recipient'     => $recipient,
                'user_id'       => $recipient[0],
                'email_address' => $recipient[1],
                'user_name'     => $recipient[2],
                'subject'       => $_subject,
                'message'       => $_message
            );

            $insert = array(
                'user_id'       => $user_id,
                'order_id'      => 0,
                'product_id'    => 0,
                'email_id'      => $email_id,
                'user_email'    => $email_address,
                'send_on'       => $send_time,
                'is_cart'       => 0,
                'is_sent'       => 0,
                'date_sent'     => '',
                'email_trigger' => 'Manual Email',
                'meta'          => serialize($meta)
            );
            $wpdb->insert( $wpdb->prefix .'followup_email_orders', $insert );
            $email_order_id = $wpdb->insert_id;

            if ( !empty($interval) && $interval > 0 ) {
                $now = current_time( 'timestamp' );
                $add = self::get_time_to_add( $interval, $interval_duration );

                // create an email order
                $insert = array(
                    'user_id'       => $user_id,
                    'order_id'      => 0,
                    'product_id'    => 0,
                    'email_id'      => $email_id,
                    'user_email'    => $email_address,
                    'send_on'       => $now + $add,
                    'is_cart'       => 0,
                    'is_sent'       => 0,
                    'email_trigger' => 'Manual Email'
                );
                $wpdb->insert( $wpdb->prefix .'followup_email_orders', $insert );
            }
        }

        // send the emails now
        do_action('sfn_followup_emails');

    }

    function send_test_email() {
        global $woocommerce;

        $_POST      = array_map('stripslashes_deep', $_POST);

        $type       = $_POST['type'];
        $email      = $_POST['email'];
        $subject    = $_POST['subject'];
        $message    = $_POST['message'];
        $tracking   = $_POST['tracking'];
        $codes      = array();

        if ( !empty($tracking) ) {
            parse_str( $tracking, $codes );

            foreach ( $codes as $key => $val ) {
                $codes[$key] = urlencode($val);
            }
        }

        if ( $type == 'generic' ) {
            $item_list = '<ul><li><a href="#">Item 1</a></li><li><a href="#">Item 2</a></li></ul>';
            $item_cats = '<ul><li>Category 1</li><li>Category 2</li></ul>';
        }

        // process variable replacements
        $store_url      = (empty($codes)) ? site_url() : add_query_arg($codes, site_url());
        $store_name     = get_bloginfo('name');
        $page_id        = woocommerce_get_page_id('followup_unsubscribe');
        $unsubscribe    = (empty($codes)) ? add_query_arg('wcfu', $email, get_permalink($page_id)) : add_query_arg($codes, add_query_arg('wcfu', $email, get_permalink($page_id)));
        $order_date     = date(get_option('date_format'));
        $order_datetime = date(get_option('date_format') .' '. get_option('time_format'));
        if ( $type == 'generic' ) {
            $vars   = array('{order_number}', '{order_date}', '{order_datetime}', '{store_url}', '{store_name}', '{customer_first_name}', '{customer_name}', '{customer_email}', '{item_names}', '{item_categories}', '{unsubscribe_url}');
            $reps   = array(
                '1100',
                $order_date,
                $order_datetime,
                $store_url,
                $store_name,
                'John',
                'John Doe',
                'john@example.org',
                $item_list,
                $item_cats,
                $unsubscribe
            );
        } elseif ( $type == 'signup' ) {
            $vars   = array('{store_url}', '{store_name}', '{customer_first_name}', '{customer_name}', '{customer_email}', '{unsubscribe_url}');
            $reps   = array(
                $store_url,
                $store_name,
                'John',
                'John Doe',
                'john@example.org',
                $unsubscribe
            );
        } elseif ( $type == 'customer' ) {
            $vars   = array('{order_number}', '{order_date}', '{order_datetime}', '{store_url}', '{store_name}', '{customer_first_name}', '{customer_name}', '{customer_email}', '{unsubscribe_url}', '{dollars_spent_order}', '{dollars_spent_total}', '{number_orders}', '{last_purchase_date}');
            $reps   = array(
                '1100',
                $order_date,
                $order_datetime,
                $store_url,
                $store_name,
                'John',
                'John Doe',
                'john@example.org',
                $unsubscribe,
                woocommerce_price(19.99),
                woocommerce_price(3250),
                15,
                $order_date
            );
        } elseif ( $email->email_type == 'manual' ) {
            $vars   = array('{store_url}', '{store_name}', '{customer_first_name}', '{customer_name}', '{customer_email}', '{unsubscribe_url}');
            $reps   = array(
                $store_url,
                $store_name,
                'John',
                'John Doe',
                'john@example.org',
                $unsubscribe
            );
        } else {
            $vars   = array('{order_number}', '{order_date}', '{order_datetime}', '{store_url}', '{store_name}', '{customer_first_name}', '{customer_name}', '{customer_email}', '{item_name}', '{item_category}', '{unsubscribe_url}', '{order_total}', '{order_delivery_date}', '{order_servings}');
            $reps   = array(
                '1100',
                $order_date,
                $order_datetime,
                $store_url,
                $store_name,
                'John',
                'John Doe',
                'john@example.org',
                '<a href="#">Name of Product</a>',
                'Test Category',
                $unsubscribe,
				'This is order total => $1001',
				'This is order delivery date => 12/12/2013',
				'This is oder servings'
            );
        }

        $subject    = strip_tags(str_replace($vars, $reps, $subject));
        $message    = str_replace($vars, $reps, $message);
        $message    = do_shortcode($message);

        // hook to variable replacement
        $subject    = apply_filters( 'fue_send_test_email_subject', $subject );
        $message    = apply_filters( 'fue_send_test_email_message', $message );

        // look for custom fields
        $message    = preg_replace_callback('|\{cf ([0-9]+) ([^}]*)\}|', 'fue_add_custom_fields', $message);

        // look for post id
        $message    = preg_replace_callback('|\{post_id=([^}]+)\}|', 'fue_add_post', $message);

        // look for links
        //$replacer   = new FUE_Link_Replacement( $email_order->id, $email->id, $user_id, $email_to );
        $message    = preg_replace('|\{link url=([^}]+)\}|', '$1', $message);

        do_action( 'fue_before_test_email_send', $subject, $message );

        // send the email
        $disable_wrap   = get_option('fue_disable_wrapping', 0);
        $mailer         = $woocommerce->mailer();

        if (! $disable_wrap ) {
            $message = $mailer->wrap_message( $subject, $message );
        }

        $mailer->send($email, $subject, $message);

        do_action( 'fue_after_test_email_sent', $subject, $message );
    }

    public static function add_store_url( $matches ) {
        global $sfnFollowUpEmails;

        if ( empty($matches) ) return '';

        $store_url  = home_url( $matches[1] );
        $meta       = $sfnFollowUpEmails->link_meta;

        // convert urls
        $store_url  = self::create_email_url( $meta['email_order_id'], $meta['email_id'], $meta['user_id'], $meta['user_email'], $store_url );

        if (! empty($meta['codes']) ) {
            $store_url  = add_query_arg($meta['codes'], $store_url);
        }

        return $store_url;
    }

    public function url_to_links( $text, $email_order_id, $email_id, $user_id = 0, $user_email ) {
        global $sfnFollowUpEmails;
        $sfnFollowUpEmails->link_meta = array(
            'email_order_id'    => $email_order_id,
            'email_id'          => $email_id,
            'user_id'           => $user_id,
            'user_email'        => $user_email
        );
        $text = preg_replace_callback('@(https?://([-\w\.]+[-\w])+(:\d+)?(/([\w/_\.#-]*(\?\S+)?[^\<\.\s])?)?)@', 'FUE::url_to_links_callback', $text);

        return $text;
    }

    public static function url_to_links_callback( $matches ) {
        global $sfnFollowUpEmails;
        $meta       = $sfnFollowUpEmails->link_meta;
        $encoded    = self::create_email_url( $meta['email_order_id'], $meta['email_id'], $meta['user_id'], $meta['user_email'], $matches[0] );
        return '<a href="'. $encoded .'" target="_blank">'. $matches[0] .'</a>';
    }

    public static function create_email_url( $email_order_id, $email_id, $user_id = 0, $user_email, $target_page ) {
        $args = apply_filters('fue_create_email_url', array(
            'oid'           => $email_order_id,
            'eid'           => $email_id,
            'user_id'       => $user_id,
            'user_email'    => $user_email,
            'next'          => $target_page
        ));

        $payload    = base64_encode(http_build_query($args));

        return add_query_arg( 'sfn_payload', $payload, add_query_arg( 'sfn_trk', 1, get_bloginfo( 'wpurl' ) ) );
    }

    public static function get_time_to_add( $interval, $duration ) {
        $add = 0;
        switch ($duration) {
            case 'minutes':
                $add = $interval * 60;
                break;

            case 'hours':
                $add = $interval * (60*60);
                break;

            case 'days':
                $add = $interval * 86400;
                break;

            case 'weeks':
                $add = $interval * (7 * 86400);
                break;

            case 'months':
                $add = $interval * (30 * 86400);
                break;

            case 'years':
                $add = $interval * (365 * 86400);
                break;
        }

        return apply_filters('fue_get_time_to_add', $add, $duration, $interval);
    }

    public static function initial_order_import() {
        global $wpdb;

        $tables = $wpdb->get_col("SHOW TABLES LIKE '{$wpdb->prefix}followup_order_items'");

        if ( empty($tables) ) return;
        //update_option( 'fue_orders_imported', false );
        //$wpdb->query("DELETE FROM {$wpdb->postmeta} WHERE meta_key = '_fue_recorded'");
        if ( get_option( 'fue_orders_imported', false ) == true ) return;

        //if ( 0 != $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}followup_order_items") ) return;
        // Fresh start
        $wpdb->query("DELETE FROM {$wpdb->prefix}followup_order_items");
        $wpdb->query("DELETE FROM {$wpdb->prefix}followup_customers");
        $wpdb->query("DELETE FROM {$wpdb->prefix}followup_order_categories");
        $wpdb->query("DELETE FROM {$wpdb->prefix}followup_customer_orders");

        $wc2        = (bool)function_exists('get_product');
        $results    = $wpdb->get_results("SELECT ID FROM {$wpdb->prefix}posts WHERE post_type = 'shop_order'");

        foreach ( $results as $row ) {
            $order = new WC_Order( $row->ID );
            self::record_order( $order );
        }

        update_option( 'fue_orders_imported', true );
    }

    public static function record_order($order) {
        global $woocommerce, $wpdb;

        $order_categories   = array();
        $wc2                = (bool)function_exists('get_product');
        $order_id           = $order->id;

        $recorded = get_post_meta( $order_id, '_fue_recorded', true );

        if ( $recorded == true ) return;

        if ( $order->user_id > 0 ) {
            $user_id    = $order->user_id;
            $user       = new WP_User( $user_id );
            $email      = $user->user_email;
        } else {
            $user_id    = 0;
            $email      = $order->billing_email;
        }

        $customer = $wpdb->get_row( $wpdb->prepare("SELECT * FROM {$wpdb->prefix}followup_customers WHERE user_id = %d AND email_address = %s", $user_id, $email) );

        if (! $customer ) {
            $insert = array(
                'user_id'               => $user_id,
                'email_address'         => $email,
                'total_purchase_price'  => $order->order_total,
                'total_orders'          => 1
            );

            $wpdb->insert( $wpdb->prefix .'followup_customers', $insert );
            $customer_id = $wpdb->insert_id;
            $customer = $wpdb->get_row( $wpdb->prepare("SELECT * FROM {$wpdb->prefix}followup_customers WHERE id = %d", $customer_id) );
        } else {
            $total_orders       = $customer->total_orders + 1;
            $total_purchases    = $customer->total_purchase_price + $order->order_total;

            $wpdb->update( $wpdb->prefix .'followup_customers', array('total_purchase_price' => $total_purchases, 'total_orders' => $total_orders), array('id' => $customer->id));
        }

        // record order
        $wpdb->insert( $wpdb->prefix .'followup_customer_orders', array('followup_customer_id' => $customer->id, 'order_id' => $order_id, 'price' => $order->order_total) );

        if ( $wc2 ) {
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

        update_post_meta( $order_id, '_fue_recorded', true );
    }

    public static function str_search($start, $end, $string, $borders = false) {
        $reg = "!".preg_quote ($start)."(.*?)".preg_quote ($end)."!is";
        preg_match_all ($reg, $string, $matches);
        if ($borders) {
            return $matches[0];
        } else {
            return $matches[1];
        }
    }

}

class FUE_Link_Replacement {
    private $email_order_id;
    private $email_id;
    private $user_id;
    private $user_email;
    private $target_page;

    public function __construct( $email_order_id, $email_id, $user_id = 0, $user_email ) {
        $this->email_order_id   = $email_order_id;
        $this->email_id         = $email_id;
        $this->user_id          = $user_id;
        $this->user_email       = $user_email;
    }

    public function replace( $matches ) {

        if ( empty($matches) ) return '';

        $url = $matches[1];

        return FUE::create_email_url( $this->email_order_id, $this->email_id, $this->user_id, $this->user_email, $url );
    }

}

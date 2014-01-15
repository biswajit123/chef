<?php

class FUE_Warranty {

    public function __construct() {
        if ( self::is_installed() ) {
            add_filter( 'fue_trigger_types', array(&$this, 'add_trigger') );
            add_filter( 'fue_email_type_triggers', array($this, 'add_email_triggers') );
            add_action( 'wc_warranty_status_updated', array(&$this, 'status_updated'), 10, 2 );
        }
    }

    public static function is_installed() {
        return class_exists('WC_Warranty');
    }

    public function add_trigger( $triggers ) {
        $triggers['warranty_status'] = __('after warranty status changes', 'wc_followup_emails');
        return $triggers;
    }

    public function add_email_triggers( $email_triggers ) {
        $email_triggers['generic'][] = 'warranty_status';
        $email_triggers['normal'][] = 'warranty_status';

        return $email_triggers;
    }

    public function status_updated( $request_id, $status ) {
        $order_id   = get_post_meta( $request_id, '_order_id', true );
        $triggers   = array('warranty_status');

        FUE::create_order_from_triggers( $order_id, $triggers );
    }

}

$GLOBALS['fue_warranty'] = new FUE_Warranty();

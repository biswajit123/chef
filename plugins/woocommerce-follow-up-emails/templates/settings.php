<form action="admin-post.php" method="post">
    <h3><?php _e('Remove Email WooCommerce Email Styles', 'wc_followup_emails'); ?></h3>

    <p><?php _e('Want completely customized, and the ability to fully design your emails? Simply check this box, and the default WooCommerce styling will be removed from the emails you send via Follow-up Emails.', 'wc_followup_emails'); ?></p>
    <p>
        <label for="disable_email_wrapping">
            <input type="checkbox" name="disable_email_wrapping" id="disable_email_wrapping" value="1" <?php if (1 == get_option('fue_disable_wrapping', 0)) echo 'checked'; ?> />
            <?php _e('Disable wrapping of email templates together.', 'wc_followup_emails'); ?>
        </label>
    </p>

    <h3><?php _e('Unsubscribe Page', 'wc_followup_emails'); ?></h3>

    <p>
        <label for="unsubscribe_page"><?php _e('Select Unsubscribe Page', 'wc_followup_emails'); ?></label>
        <select name="unsubscribe_page" id="unsubscribe_page">
            <?php
            foreach ($pages as $p):
                $sel = ($p->ID == $page) ? 'selected' : '';
            ?>
            <option value="<?php echo esc_attr($p->ID); ?>" <?php echo $sel; ?>><?php echo esc_html($p->post_title); ?></option>
            <?php endforeach; ?>
        </select>
        <a href="post.php?post=<?php echo $page; ?>&action=edit"><?php _e('Edit Unsubscribe Page', 'wc_followup_emails'); ?></a>
    </p>

    <h3><?php _e('Daily Emails Summary', 'wc_followup_emails'); ?></h3>

    <p>
        <label for="daily_emails"><?php _e('Email Address(es)', 'wc_followup_emails'); ?></label>
        <input type="text" name="daily_emails" id="daily_emails" value="<?php echo esc_attr( get_option('fue_daily_emails', '') ); ?>" />
        <span class="description"><?php _e('comma separated', 'wc_followup_emails'); ?></span>
    </p>

    <h3><?php _e('Documentation and Compatibility', 'wc_followup_emails'); ?></h3>

    <p><a href="http://docs.woothemes.com/document/automated-follow-up-emails/" target="_blank"><?php _e('Follow-up Emails Documentation', 'wc_followup_emails'); ?></a></p>
    <p><?php _e('Follow-up Emails is integrated with the following extensions', 'wc_followup_emails'); ?>
    <p><a href="http://www.woothemes.com/products/woocommerce-subscriptions/?utm_source=woocommerce&utm_medium=wordpress-admin&utm_campaign=followup-emails-plugin" target="_blank"><?php _e('WooCommerce Subscriptions', 'wc_followup_emails'); ?></a></p>
    <p><a href="http://tri.be/shop/wordpress-wootickets/?utm_source=woocommerce&utm_medium=wordpress-admin&utm_campaign=followup-emails-plugin" target="_blank"><?php _e('WooCommerce Tickets', 'wc_followup_emails'); ?></a></p>
    <p><a href="http://www.woothemes.com/products/woocommerce-points-and-rewards/?utm_source=woocommerce&utm_medium=wordpress-admin&utm_campaign=followup-emails-plugin" target="_blank"><?php _e('WooCommerce Points and Rewards', 'wc_followup_emails'); ?></a></p>
    <p><a href="http://wordpress.org/plugins/woocommerce-custom-statuses/?utm_source=woocommerce&utm_medium=wordpress-admin&utm_campaign=followup-emails-plugin" target="_blank"><?php _e('WooCommerce Custom Statuses', 'wc_followup_emails'); ?></a></p>

    <?php do_action('fue_settings_form'); ?>

    <p class="submit">
        <input type="hidden" name="action" value="sfn_followup_save_settings" />
        <input type="submit" name="save" value="<?php _e('Save Settings', 'wc_followup_emails'); ?>" class="button-primary" />
    </p>
</form>

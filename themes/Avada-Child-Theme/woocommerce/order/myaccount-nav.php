<?php global $woocommerce; ?>
<ul class="woocommerce-side-nav">
	<li class="<?php if(is_page(get_option('woocommerce_view_order_page_id')) || is_page(get_option('woocommerce_myaccount_page_id'))) { echo 'active'; } ?>">
		<a href="<?php echo get_permalink(get_option('woocommerce_view_order_page_id')); ?>">
			<?php _e('View Orders' , 'Avada'); ?>
		</a>
	</li>
	<li class="<?php if(is_page(5552)) { echo 'active'; } ?>">
		<a href="<?php echo get_permalink(5552); ?>">
			<?php _e('Delivery Schedule' , 'Avada'); ?>
		</a>
	</li>
	<li class="<?php if(is_page(get_option('woocommerce_edit_address_page_id'))) { echo 'active'; } ?>">
		<a href="<?php echo get_permalink(get_option('woocommerce_edit_address_page_id')); ?>">
			<?php _e('Change Address' , 'Avada'); ?>
		</a>
	</li>	
	<li class="<?php if(is_page(get_option('woocommerce_ref_code_page_id'))) { echo 'active'; } ?>">
        <a href="<?php echo get_permalink(get_option('woocommerce_ref_code_page_id')); ?>">
            <?php _e('Referral Details' , 'Avada'); ?>
        </a>
    </li>
	<?php //>>sam<<?>
	<!--<li class="<?php if(is_page(get_option('woocommerce_lost_password_page_id'))) { echo 'active'; } ?>">
		<a href="<?php echo get_permalink(get_option('woocommerce_lost_password_page_id')); ?>">
			<?php _e('Lost Password' , 'Avada'); ?>
		</a>
	</li>-->
	<li class="<?php if(is_page(get_option('woocommerce_change_password_page_id'))) { echo 'active'; } ?>">
		<a href="<?php echo get_permalink(get_option('woocommerce_change_password_page_id')); ?>">
			<?php _e('Change Password' , 'Avada'); ?>
		</a>
	</li>
</ul>

<?php global $data, $woocommerce, $current_user; ?>
<p class="myaccount_user">
	<span class="myaccount_user_container">
		<span class="username">
		<?php
		printf(
			__( 'Hello, %s:', 'Avada' ),
			$current_user->display_name
		);
		?>
		</span>
		<?php if($data['woo_acc_msg_1']): ?>
		<span class="msg">
			<?php echo $data['woo_acc_msg_1']; ?>
		</span>
		<?php endif; ?>
		<?php if($data['woo_acc_msg_2']): ?>
		<span class="msg">
			<?php echo $data['woo_acc_msg_2']; ?>
		</span>
		<?php endif; ?>
		<span class="view-cart">
			<a href="<?php echo get_permalink(get_option('woocommerce_cart_page_id')); ?>">View Cart</a>
		</span>
	</span>
</p>
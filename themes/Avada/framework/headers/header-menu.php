<?php global $woocommerce, $data; ?>
<div class='top-menu'>
	<ul id="snav" class="menu">
		<?php wp_nav_menu(array('theme_location' => 'top_navigation', 'depth' => 5, 'container' => false, 'menu_id' => 'snav', 'items_wrap' => '%3$s')); ?>
		<?php if(class_exists('Woocommerce')): ?>
		<?php if($data['woocommerce_acc_link_top_nav']): ?>
		<li class="my-account">
			<a href="<?php echo get_permalink(get_option('woocommerce_myaccount_page_id')); ?>">My Account</a>
			<?php if(!is_user_logged_in()): ?>
			<div class="login-box">
				<form action="<?php echo wp_login_url(); ?>" name="loginform" method="post">
					<p>
						<input type="text" class="input-text" name="log" id="username" value="" placeholder="<?php echo __('Username', 'Avada'); ?>" />
					</p>
					<p>
						<input type="password" class="input-text" name="pwd" id="pasword" value="" placeholder="<?php echo __('Password', 'Avada'); ?>" />
					</p>
					<p class="forgetmenot">
						<label for="rememberme"><input name="rememberme" type="checkbox" id="rememberme" value="forever"> <?php _e('Remember Me', 'Avada'); ?></label>
					</p>
						<p class="submit">
						<input type="submit" name="wp-submit" id="wp-submit" class="button small default comment-submit" value="Log In">
						<input type="hidden" name="redirect_to" value="<?php echo $_SERVER['HTTP_REFERER']; ?>">
						<input type="hidden" name="testcookie" value="1">
					</p>
					<div class="clear"></div>
				</form>
			</div>
			<?php else: ?>
			<ul class="sub-menu">
				<li><a href="<?php echo get_permalink(get_option('woocommerce_logout_page_id')); ?>"><?php _e('Logout', 'Avada'); ?></a></li>
			</ul>
			<?php endif; ?>
		</li>
		<?php endif; ?>
		<?php if($data['woocommerce_cart_link_top_nav']): ?>
		<li class="cart">
			<?php if(!$woocommerce->cart->cart_contents_count): ?>
			<a class="empty-cart" href="<?php echo get_permalink(get_option('woocommerce_cart_page_id')); ?>"><?php _e('Cart', 'Avada'); ?></a>
			<?php else: ?>
			<a href="<?php echo get_permalink(get_option('woocommerce_cart_page_id')); ?>"><?php echo $woocommerce->cart->cart_contents_count; ?> <?php _e('Item(s)', 'Avada'); ?> - <?php echo woocommerce_price($woocommerce->cart->cart_contents_total); ?></a>
			<div class="cart-contents">
				<?php foreach($woocommerce->cart->cart_contents as $cart_item): //var_dump($cart_item); ?>
				<div class="cart-content">
					<a href="<?php echo get_permalink($cart_item['product_id']); ?>">
					<?php echo get_the_post_thumbnail($cart_item['product_id'], 'recent-works-thumbnail'); ?>
					<div class="cart-desc">
						<span class="cart-title"><?php echo $cart_item['data']->post->post_title; ?></span>
						<span class="product-quantity"><?php echo $cart_item['quantity']; ?> x <?php echo $woocommerce->cart->get_product_subtotal($cart_item['data'], $cart_item['quantity']); ?></span>
					</div>
					</a>
				</div>
				<?php endforeach; ?>
				<div class="cart-checkout">
					<div class="cart-link"><a href="<?php echo get_permalink(get_option('woocommerce_cart_page_id')); ?>"><?php _e('View Cart', 'Avada'); ?></a></div>
					<div class="checkout-link"><a href="<?php echo get_permalink(get_option('woocommerce_checkout_page_id')); ?>"><?php _e('Checkout', 'Avada'); ?></a></div>
				</div>
			</div>
			<?php endif; ?>
		</li>
		<?php endif; ?>
		<?php endif; ?>
	</ul>
</div>
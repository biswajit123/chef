<?php
/**
 * Single Product tabs
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
/**
 * Filter tabs and allow third parties to add their own
 *
 * Each tab is an array containing title, callback and priority.
 * @see woocommerce_default_product_tabs()
 */
$tabs = apply_filters( 'woocommerce_product_tabs', array() );

if ( ! empty( $tabs ) ) : ?>

	<div class="woocommerce-tabs">
		<ul class="tabs">
			<?php foreach ( $tabs as $key => $tab ) : ?>

				<li class="<?php echo $key ?>_tab">
					<a href="#tab-<?php echo $key ?>"><?php echo apply_filters( 'woocommerce_product_' . $key . '_tab_title', $tab['title'], $key ) ?><div class="arrow"></div></a>
				</li>

			<?php endforeach; ?>
		</ul>
		<?php foreach ( $tabs as $key => $tab ) : ?>

			<div class="panel entry-content" id="tab-<?php echo $key ?>">
				<?php call_user_func( $tab['callback'], $key, $tab ) ?>
			</div>

		<?php endforeach; ?>
	</div>

<?php endif; ?>
<div style="clear:both;"></div>
<ul class="social-share">
	<li class="facebook">
		<a href="http://www.facebook.com/sharer.php?u=<?php the_permalink(); ?>&amp;t=<?php the_title(); ?>">
			<i class="fontawesome-icon medium circle-yes icon-facebook"></i>
			<span>Share On</span>Facebook
		</a>
	</li>
	<li class="twitter">
		<a href="http://twitter.com/home?status=<?php the_title(); ?> <?php the_permalink(); ?>">
			<i class="fontawesome-icon medium circle-yes icon-twitter"></i>
			<span>Tweet This</span>Product
		</a>
	</li>
	<li class="pinterest">
		<?php $full_image = wp_get_attachment_image_src(get_post_thumbnail_id(), 'full'); ?>
		<a href="http://pinterest.com/pin/create/button/?url=<?php echo urlencode(get_permalink()); ?>&amp;description=<?php echo urlencode($post->post_title); ?>&amp;media=<?php echo urlencode($full_image[0]); ?>">
			<i class="fontawesome-icon medium circle-yes icon-pinterest"></i>
			<span>Pin This</span>Product
		</a>
	</li>
	<li class="email">
		<a href="mailto:?subject=<?php the_title(); ?>&amp;body=<?php the_permalink(); ?>">
			<i class="fontawesome-icon medium circle-yes icon-envelope-alt"></i>
			<span>Mail This</span>Product
		</a>
	</li>
</ul>
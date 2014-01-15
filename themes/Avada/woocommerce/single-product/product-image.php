<?php
/**
 * Single Product Image
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.0.3
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

global $post, $woocommerce, $product;

?>
<div class="images">

	<!-- Place somewhere in the <body> of your page -->
	<div id="slider" class="flexslider">
		<ul class="slides">
			<?php
			if ( has_post_thumbnail() ) {

				$image       		= get_the_post_thumbnail( $post->ID, apply_filters( 'single_product_large_thumbnail_size', 'shop_single' ) );
				$image_title 		= esc_attr( get_the_title( get_post_thumbnail_id() ) );
				$image_link  		= wp_get_attachment_url( get_post_thumbnail_id() );
				$attachment_count   = count( $product->get_gallery_attachment_ids() );

				$gallery = 'woo';

				echo apply_filters( 'woocommerce_single_product_image_html', sprintf( '<li><a href="%s" itemprop="image" class="woocommerce-main-image zoom" title="%s"  rel="prettyPhoto' . $gallery . '">%s</a></li>', $image_link, $image_title, $image ), $post->ID );

			}
			$attachment_ids = $product->get_gallery_attachment_ids();
			?>
			<?php

			$loop = 0;
			//$columns = apply_filters( 'woocommerce_product_thumbnails_columns', 3 );

			foreach ( $attachment_ids as $attachment_id ) {

				$image_link = wp_get_attachment_url( $attachment_id );

				if ( ! $image_link )
					continue;

				$classes[] = 'image-'.$attachment_id;

				$image       = wp_get_attachment_image( $attachment_id, apply_filters( 'single_product_large_thumbnail_size', 'shop_single' ) );
				$image_class = esc_attr( implode( ' ', $classes ) );
				$image_title = esc_attr( get_the_title( $attachment_id ) );

				echo apply_filters( 'woocommerce_single_product_image_html', sprintf( '<li><a href="%s" itemprop="image" class="woocommerce-main-image zoom" title="%s"  rel="prettyPhoto' . $gallery . '">%s</a></li>', $image_link, $image_title, $image ), $post->ID );

				//echo apply_filters( 'woocommerce_single_product_image_thumbnail_html', sprintf( '<li><a href="%s" class="%s" title="%s">%s</a></li>', $image_link, $image_class, $image_title, $image ), $attachment_id, $post->ID, $image_class );

				$loop++;
			}

			?>
		</ul>
	</div>
	<?php
		if ( has_post_thumbnail() ) {

			$image       		= get_the_post_thumbnail( $post->ID, apply_filters( 'single_product_large_thumbnail_size', 'shop_single' ) );
			$image_title 		= esc_attr( get_the_title( get_post_thumbnail_id() ) );
			$image_link  		= wp_get_attachment_url( get_post_thumbnail_id() );
			$attachment_count   = count( $product->get_gallery_attachment_ids() );

			if ( $attachment_count > 0 ) {
				$gallery = '[product-gallery]';
			} else {
				$gallery = '';
			}

			//echo apply_filters( 'woocommerce_single_product_image_html', sprintf( '<a href="%s" itemprop="image" class="woocommerce-main-image zoom" title="%s"  rel="prettyPhoto' . $gallery . '">%s</a>', $image_link, $image_title, $image ), $post->ID );

		}
		$attachment_ids = $product->get_gallery_attachment_ids();
		if ( has_post_thumbnail() ) {
		}
	?>

	<?php do_action( 'woocommerce_product_thumbnails' ); ?>

</div>

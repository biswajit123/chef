<?php
get_header();

$portfolio_sep = false;
if($data['portfolio_archive_layout'] == 'Portfolio Two Column') {
	$portfolio_layout = 'portfolio-two';
	$portfolio_image = 'portfolio-two';
	$portfolio_content = false;
} elseif($data['portfolio_archive_layout'] == 'Portfolio Three Column') {
	$portfolio_layout = 'portfolio-three';
	$portfolio_image = 'portfolio-three';
	$portfolio_content = false;
} elseif($data['portfolio_archive_layout'] == 'Portfolio Four Column') {
	$portfolio_layout = 'portfolio-four';
	$portfolio_image = 'portfolio-four';
	$portfolio_content = false;
} elseif($data['portfolio_archive_layout'] == 'Portfolio One Column Text') {
	$portfolio_layout = 'portfolio-one portfolio-one-text';
	$portfolio_image = 'portfolio-one';
	$portfolio_content = true;
	$portfolio_sep = true;
} elseif($data['portfolio_archive_layout'] == 'Portfolio Two Column Text') {
	$portfolio_layout = 'portfolio-two portfolio-two-text';
	$portfolio_image = 'portfolio-two';
	$portfolio_content = true;
} elseif($data['portfolio_archive_layout'] == 'Portfolio Three Column Text') {
	$portfolio_layout = 'portfolio-three portfolio-three-text';
	$portfolio_image = 'portfolio-three';
	$portfolio_content = true;
} elseif($data['portfolio_archive_layout'] == 'Portfolio Four Column Text') {
	$portfolio_layout = 'portfolio-four portfolio-four-text';
	$portfolio_image = 'portfolio-four';
	$portfolio_content = true;
} elseif($data['portfolio_archive_layout'] == 'Portfolio Grid') {
	$portfolio_layout = 'portfolio-masonry';
	$portfolio_image = 'full';
	$portfolio_content = false;
	if($data['grid_pagination_type'] == 'Infinite Scroll') {
		$portfolio_layout .= ' portfolio-infinite';
	}
} else {
	$portfolio_layout = 'portfolio-one';
	$portfolio_image = 'portfolio-one';
	$portfolio_content = true;
	$portfolio_sep = true;
}
?>
	<div id="content" class="full-width portfolio <?php echo $portfolio_layout; ?>">
		<?php if(category_description()): ?>
		<div id="post-<?php the_ID(); ?>" <?php post_class('post'); ?>>
			<div class="post-content">
				<?php echo category_description(); ?>
			</div>
		</div>
		<?php endif; ?>
		<div class="portfolio-wrapper">
			<?php
			while(have_posts()): the_post();
				if(has_post_thumbnail()):
			?>
			<?php
			$item_classes = '';
			$item_cats = get_the_terms($post->ID, 'portfolio_category');
			if($item_cats):
			foreach($item_cats as $item_cat) {
				$item_classes .= $item_cat->slug . ' ';
			}
			endif;
			?>
			<div class="portfolio-item <?php echo $item_classes; ?>">
				<div class="image">
					<?php if($data['image_rollover']): ?>
					<?php the_post_thumbnail($portfolio_image); ?>
					<?php else: ?>
					<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail($portfolio_image); ?></a>
					<?php endif; ?>
					<?php
					if(get_post_meta($post->ID, 'pyre_image_rollover_icons', true) == 'link') {
						$link_icon_css = 'display:inline-block;';
						$zoom_icon_css = 'display:none;';
					} elseif(get_post_meta($post->ID, 'pyre_image_rollover_icons', true) == 'zoom') {
						$link_icon_css = 'display:none;';
						$zoom_icon_css = 'display:inline-block;';
					} elseif(get_post_meta($post->ID, 'pyre_image_rollover_icons', true) == 'no') {
						$link_icon_css = 'display:none;';
						$zoom_icon_css = 'display:none;';
					} else {
						$link_icon_css = 'display:inline-block;';
						$zoom_icon_css = 'display:inline-block;';
					}

					$icon_url_check = get_post_meta(get_the_ID(), 'pyre_link_icon_url', true); if(!empty($icon_url_check)) {
						$icon_permalink = get_post_meta($post->ID, 'pyre_link_icon_url', true);
					} else {
						$icon_permalink = get_permalink($post->ID);
					}
					?>
					<div class="image-extras">
						<div class="image-extras-content">
							<?php $full_image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'full'); ?>
							<a style="<?php echo $link_icon_css; ?>" class="icon link-icon" href="<?php echo $icon_permalink; ?>">Permalink</a>
							<a style="<?php echo $zoom_icon_css; ?>" class="icon gallery-icon" href="<?php echo $full_image[0]; ?>" rel="prettyPhoto[gallery<?php echo $post->ID; ?>]" title="<?php echo get_post_field('post_content', get_post_thumbnail_id($post->ID)); ?>"><img style="display:none;" alt="<?php echo get_post_field('post_excerpt', get_post_thumbnail_id($post->ID)); ?>" />Gallery</a>
							<h3><?php the_title(); ?></h3>
						</div>
					</div>
				</div>
				<?php if($portfolio_content == true): ?>
				<div class="portfolio-content clearfix">
					<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
					<h4><?php echo get_the_term_list($post->ID, 'portfolio_category', '', ', ', ''); ?></h4>
					<?php
					if($data['portfolio_content_length'] == 'Excerpt') {
						$stripped_content = strip_shortcodes( tf_content( $data['excerpt_length_portfolio'], $data['strip_html_excerpt'] ) );
						echo $stripped_content;
					} else {
						the_content();
					}
					?>
				</div>
				<?php endif; ?>
				<?php if($portfolio_sep == true): ?>
				<div class="demo-sep sep-double" style="margin-top:50px;"></div>
				<?php endif; ?>
			</div>
			<?php endif; endwhile; ?>
		</div>
		<?php themefusion_pagination($gallery->max_num_pages, $range = 2); ?>
	</div>
<?php get_footer(); ?>
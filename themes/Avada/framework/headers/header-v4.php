<?php global $data; ?>
<div class="header-v4">
	<div class="header-social">
		<div class="avada-row">
			<div class="alignleft">
				<?php
				if($data['header_left_content'] == 'Contact Info') {
					get_template_part('framework/headers/header-info');
				} elseif($data['header_left_content'] == 'Social Links') {
					get_template_part('framework/headers/header-social');
				} elseif($data['header_left_content'] == 'Navigation') {
					get_template_part('framework/headers/header-menu');
				}
				?>
			</div>
			<div class="alignright">
				<?php
				if($data['header_right_content'] == 'Contact Info') {
					get_template_part('framework/headers/header-info');
				} elseif($data['header_right_content'] == 'Social Links') {
					get_template_part('framework/headers/header-social');
				} elseif($data['header_right_content'] == 'Navigation') {
					get_template_part('framework/headers/header-menu');
				}
				?>
			</div>
		</div>
	</div>
	<header id="header">
		<div class="avada-row" style="margin-top:<?php echo $data['margin_header_top']; ?>;margin-bottom:<?php echo $data['margin_header_bottom']; ?>;">
			<div class="logo" style="margin-right:<?php echo $data['margin_logo_right']; ?>;margin-top:<?php echo $data['margin_logo_top']; ?>;margin-left:<?php echo $data['margin_logo_left']; ?>;margin-bottom:<?php echo $data['margin_logo_bottom']; ?>;">
				<a href="<?php bloginfo('url'); ?>">
					<img src="<?php echo $data['logo']; ?>" alt="<?php bloginfo('name'); ?>" class="normal_logo" />
					<?php if($data['logo_retina'] && $data['retina_logo_width'] && $data['retina_logo_height']): ?>
					<img src="<?php echo $data["logo_retina"]; ?>" alt="<?php bloginfo('name'); ?>" style="width:<?php echo $data["retina_logo_width"]; ?>px;height:<?php echo $data["retina_logo_height"]; ?>px;" class="retina_logo" />
					<?php endif; ?>
				</a>
			</div>
			<?php if($data['header_v4_content'] == 'Tagline + Search'): ?>
			<?php if($data['logo_alignment'] == 'Left'): ?>
				<?php get_search_form(); ?>
				<?php if($data['header_tagline']): ?>
				<h3 class="tagline"><?php echo $data['header_tagline']; ?></h3>
				<?php endif; ?>
			<?php elseif($data['logo_alignment'] == 'Right'): ?>
				<?php if($data['header_tagline']): ?>
				<h3 class="tagline"><?php echo $data['header_tagline']; ?></h3>
				<?php endif; ?>
				<?php get_search_form(); ?>
			<?php endif; ?>
			<?php elseif($data['header_v4_content'] == 'Tagline'): ?>
			<?php if($data['header_tagline']): ?>
			<h3 class="tagline"><?php echo $data['header_tagline']; ?></h3>
			<?php endif; ?>
			<?php elseif($data['header_v4_content'] == 'Search'): ?>
			<?php get_search_form(); ?>
			<?php elseif($data['header_v4_content'] == 'Banner'): ?>
			<div id="header-banner">
			<?php echo $data['header_banner_code']; ?>
			</div>
			<?php endif; ?>
		</div>
	</header>
	<div id="small-nav">
		<div class="avada-row">
			<?php if($data['ubermenu']): ?>
			<nav id="nav-uber">
			<?php else: ?>
			<nav id="nav" class="nav-holder">
			<?php endif; ?>
				<?php get_template_part('framework/headers/header-main-menu'); ?>
			</nav>
		</div>
	</div>
</div>
<?php global $data; ?>
<div class="header-v1">
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
			<?php if($data['ubermenu']): ?>
			<nav id="nav-uber">
			<?php else: ?>
			<nav id="nav" class="nav-holder">
			<?php endif; ?>
				<?php get_template_part('framework/headers/header-main-menu'); ?>
			</nav>
		</div>
	</header>
</div>
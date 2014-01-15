<?php
$published_buttons = mbpro_get_published_buttons();
?>

<script type="text/javascript">
	jQuery(document).ready(function() {
		jQuery("#export-buttons").click(function() {
			jQuery("#export-form").submit();
			return false;
		});
		
		jQuery("#select-all").click(function() {
			 jQuery("input[type='checkbox']").attr("checked", jQuery("#select-all").is(":checked")); 
		});
	});
</script>

<div id="maxbuttons">
	<div class="wrap">
		<div class="icon32">
			<a href="http://maxbuttons.com" target="_blank"><img src="<?php echo MAXBUTTONS_PRO_PLUGIN_URL ?>/images/mb-32.png" alt="MaxButtons" /></a>
		</div>
		
		<h2 class="title"><?php _e('MaxButtons Pro: Export', 'maxbuttons-pro') ?></h2>
		
		<div class="logo">
			<?php _e('Brought to you by', 'maxbuttons-pro') ?>
			<a href="http://maxfoundry.com" target="_blank"><img src="<?php echo MAXBUTTONS_PRO_PLUGIN_URL ?>/images/max-foundry.png" alt="Max Foundry" /></a>
			<?php printf(__('makers of %sMaxGalleria%s and %sMaxInbound%s', 'maxbuttons-pro'), '<a href="http://maxgalleria.com/?ref=mbpro" target="_blank">', '</a>', '<a href="http://maxinbound.com/?ref=mbpro" target="_blank">', '</a>') ?>
		</div>
		
		<div class="clear"></div>
		
		<div class="main">
			<h2 class="tabs">
				<span class="spacer"></span>
				<a class="nav-tab" href="<?php echo admin_url() ?>admin.php?page=maxbuttons-controller&action=buttons"><?php _e('Buttons', 'maxbuttons-pro') ?></a>
				<a class="nav-tab" href="<?php echo admin_url() ?>admin.php?page=maxbuttons-packs"><?php _e('Packs', 'maxbuttons-pro') ?></a>
				<a class="nav-tab nav-tab-active" href=""><?php _e('Export', 'maxbuttons-pro') ?></a>
				<a class="nav-tab" href="<?php echo admin_url() ?>admin.php?page=maxbuttons-support"><?php _e('Support', 'maxbuttons-pro') ?></a>
				<a class="nav-tab" href="<?php echo admin_url() ?>admin.php?page=maxbuttons-license"><?php _e('License', 'maxbuttons-pro') ?></a>
			</h2>
			
			<div class="form-actions">
				<a id="export-buttons" class="button-primary"><?php _e('Export Buttons', 'maxbuttons-pro') ?></a>
			</div>
			
			<p><?php _e('Exporting your buttons creates a button pack zip file. Fill out the short form below, then select which buttons to export.', 'maxbuttons-pro') ?></p>
			
			<div class="spacer"></div>
			
			<form id="export-form" method="post" action="<?php echo MAXBUTTONS_PRO_PLUGIN_URL ?>/maxbuttons-export-download.php">
				<div class="option">
					<div class="label"><?php _e('Pack Name', 'maxbuttons-pro') ?></div>
					<div class="input">
						<input type="text" id="pack_name" name="pack_name" />
					</div>
				</div>
				
				<div class="option">
					<div class="label"><?php _e('Pack<br />Description', 'maxbuttons-pro') ?></div>
					<div class="input">
						<textarea id="pack_description" name="pack_description"></textarea>
					</div>
				</div>
				
				<div class="option">
					<div class="label"><?php _e('Pack Author', 'maxbuttons-pro') ?></div>
					<div class="input">
						<input type="text" id="pack_author" name="pack_author" />
					</div>
				</div>
				
				<div class="option">
					<div class="label"><?php _e('Pack Author URL', 'maxbuttons-pro') ?></div>
					<div class="input">
						<input type="text" id="pack_author_url" name="pack_author_url" />
					</div>
				</div>
				
				<div class="button-list">		
					<table cellpadding="0" cellspacing="0" width="100%">
						<tr>
							<th><input type="checkbox" id="select-all" name="select-all" /></th>
							<th><?php _e('Button', 'maxbuttons-pro') ?></th>
							<th><?php _e('Name and Description', 'maxbuttons-pro') ?></th>
							<th><?php _e('Shortcode', 'maxbuttons-pro') ?></th>
						</tr>
						<?php foreach ($published_buttons as $b) { ?>
							<tr>
								<td>
									<input type="checkbox" id="maxbutton_<?php echo $b->id ?>" name="maxbutton_<?php echo $b->id ?>" value="<?php echo $b->id ?>" />
								</td>
								<td>
									<?php echo do_shortcode('[maxbutton id="' . $b->id . '" externalcss="false" ignorecontainer="true"]') ?>
								</td>
								<td>
									<a class="button-name" href="<?php admin_url() ?>admin.php?page=maxbuttons-controller&action=button&id=<?php echo $b->id ?>"><?php echo $b->name ?></a>
									<br />
									<p><?php echo $b->description ?></p>
								</td>
								<td>
									[maxbutton id="<?php echo $b->id ?>"]
								</td>
							</tr>
						<?php } ?>
					</table>
				</div>
			</form>
		</div>
		
		<div class="offers">
			<?php include 'maxbuttons-offers.php' ?>
		</div>
	</div>
</div>

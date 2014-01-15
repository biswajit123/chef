<?php
global $mbpro_nonce_activate_license;
$license_activated = get_option(MAXBUTTONS_PRO_LICENSE_ACTIVATED);
?>

<script type="text/javascript">	
	jQuery(document).ready(function() {
		jQuery("#activate_button").click(function() {
			jQuery("#activation_progress").show();
			jQuery("#activation_success").hide();
			jQuery("#activation_error").hide();
			
			var form_data = jQuery("#license_form").serialize();
			form_data += "&action=mbpro_activate_license";

			jQuery.ajax({
				type: "POST",
				url: "<?php echo admin_url('admin-ajax.php') ?>",
				data: form_data,
				success: function(result) {
					jQuery("#activation_progress").hide();
					
					if (result != "") {
						if (result == "error") {
							jQuery("#activation_error").show();
						}
						
						if (result == "success") {
							jQuery("#activation_success").show();
							window.setTimeout(function() {
								window.location = "<?php echo admin_url('admin.php?page=maxbuttons-license') ?>";
							}, 2000);
						}
					}
				}
			});
			
			return false;
		});
	});
</script>

<div id="maxbuttons">
	<div class="wrap">
		<div class="icon32">
			<a href="http://maxbuttons.com" target="_blank"><img src="<?php echo MAXBUTTONS_PRO_PLUGIN_URL ?>/images/mb-32.png" alt="MaxButtons" /></a>
		</div>
		
		<h2 class="title"><?php _e('MaxButtons Pro: License', 'maxbuttons-pro') ?></h2>
		
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
				<a class="nav-tab" href="<?php echo admin_url() ?>admin.php?page=maxbuttons-export"><?php _e('Export', 'maxbuttons-pro') ?></a>
				<a class="nav-tab" href="<?php echo admin_url() ?>admin.php?page=maxbuttons-support"><?php _e('Support', 'maxbuttons-pro') ?></a>
				<a class="nav-tab nav-tab-active" href=""><?php _e('License', 'maxbuttons-pro') ?></a>
			</h2>
			
			<form id="license_form">
				<?php if ($license_activated == 'yes') { ?>
					<table>
						<tr>
							<td>
								<h4 class="license-label"><?php _e('License Key:', 'maxbuttons-pro') ?></h4>
							</td>
							<td>
								<h4 class="license-data"><?php echo get_option(MAXBUTTONS_PRO_LICENSE_KEY) ?></h4>
							</td>
						</tr>
					</table>
				<?php } else { ?>				
					<div id="activation_progress" class="alert alert-info" style="display: none;">
						<table>
							<tr>
								<td valign="top" width="40">
									<img src="<?php echo MAXBUTTONS_PRO_PLUGIN_URL ?>/images/loading.gif" style="margin-top: 3px;" />
								</td>
								<td valign="middle">
									<h4><?php _e('Your license key is being activated, please wait...', 'maxbuttons-pro') ?></h4>
								</td>
							</tr>
						</table>
					</div>
					
					<div id="activation_success" class="alert alert-success" style="display: none;">
						<h4><?php _e('Your license key has been activated. Enjoy using MaxButtons Pro.', 'maxbuttons-pro') ?></h4>
					</div>
					
					<div id="activation_error" class="alert alert-error" style="display: none;">
						<h4><?php printf(__('There was an error activating your license key. Please try again or %scontact us%s so we can investigate the issue.', 'maxbuttons-pro'), '<a href="http://maxbuttons.com/contact/" target="_blank">', '</a>') ?></h4>
					</div>
					
					<h4><?php _e('MaxButtons Pro has not been activated. Activation is required to receive plugin updates and support.', 'maxbuttons-pro') ?></h4>
					<h4><?php _e('Please enter a valid license key:', 'maxbuttons-pro') ?></h4>
					
					<input type="text" id="license_key" name="license_key" value="" class="license-key" />
					<input type="hidden" id="license_url" name="license_url" value="<?php echo home_url() ?>" />
					<input type="hidden" id="api_action" name="api_action" value="activate_license" />
					<input type="button" id="activate_button" name="activate_button" class="button-primary" value="Activate" />
					<p class="license-note"><?php printf(__('Your license key can be found in your %sMaxButtons account%s.', 'maxbuttons-pro'), '<a href="http://maxbuttons.com/shop/account/" target="_blank">', '</a>') ?></p>

					<?php wp_nonce_field($mbpro_nonce_activate_license['action'], $mbpro_nonce_activate_license['name']) ?>
				<?php } ?>
			</form>
		</div>
		
		<div class="offers">
			<?php include 'maxbuttons-offers.php' ?>
		</div>
	</div>
</div>

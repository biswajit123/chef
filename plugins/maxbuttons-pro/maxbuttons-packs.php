<?php
// This filter forces WP to use the 'direct' method when working
// with the filesystem, instead of possible alternatives like FTP.
// See this post http://wpquestions.com/question/show/id/2685.
add_filter('filesystem_method', 'mbpro_filesystem_method');
function mbpro_filesystem_method() {
	return 'direct';
}

// Now instantiate WP_Filesystem and then remove the filter since
// we only want to enforce it for the import functionality.
WP_Filesystem();
remove_filter('filesystem_method', 'mbpro_filesystem_method');

// Start with an empty message
$message = '';

if ($_POST) {
	$file_name = $_FILES['pack_zip']['name'];
	
	if (!empty($file_name)) {
		// Get the type of uploaded file
		$arr_file_type = wp_check_filetype(basename($file_name));
		$uploaded_file_type = $arr_file_type['type'];
		
		// Check allowed type
		$allowed_file_types = array('application/zip');
		if (in_array($uploaded_file_type, $allowed_file_types)) {
			// Set the overrides and do the upload
			$overrides = array('test_form' => false);
			$uploaded_file = wp_handle_upload($_FILES['pack_zip'], $overrides);
			
			if (isset($uploaded_file['file'])) {				
				// Unzip the file to the packs folder
				$unzip_result = unzip_file($uploaded_file['file'], MAXBUTTONS_PRO_PACKS_DIR);
				
				if ($unzip_result == 1) {
					// Success
					$message = sprintf(__('The %s%s%s button pack file was imported successfully.', 'maxbuttons-pro'), '<strong>', $file_name, '</strong>');
				}
				else {
					// Failure
					$message = sprintf(__('The %s%s%s button pack file could not be unzipped.', 'maxbuttons-pro'), '<strong>', $file_name, '</strong>');
				}
			}
			else {
				// Something went wrong, file wasn't saved
				$message = sprintf(__('The %s%s%s button pack file could not be saved to the filesystem.', 'maxbuttons-pro'), '<strong>', $file_name, '</strong>');
			}
		}
		else {
			// Wrong file type
			$message = sprintf(__('Only %sZIP%s files are supported for importing button packs.', 'maxbuttons-pro'), '<strong>', '</strong>');
		}
	}
	else {
		// No file given
		$message = __('No file was selected.', 'maxbuttons-pro');
	}
}
?>

<script type="text/javascript">
	jQuery(document).ready(function() {		
		<?php if ($_POST) { ?>
			jQuery("#maxbuttons .import .message").show();
		<?php } ?>
		
		jQuery("#import-button").click(function() {	
			jQuery("#import-form").submit();
			return false;
		});
	});
</script>

<div id="maxbuttons">
	<div class="wrap">
		<div class="icon32">
			<a href="http://maxbuttons.com" target="_blank"><img src="<?php echo MAXBUTTONS_PRO_PLUGIN_URL ?>/images/mb-32.png" alt="MaxButtons" /></a>
		</div>
		
		<h2 class="title"><?php _e('MaxButtons Pro: Packs', 'maxbuttons-pro') ?></h2>
		
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
				<a class="nav-tab nav-tab-active" href=""><?php _e('Packs', 'maxbuttons-pro') ?></a>
				<a class="nav-tab" href="<?php echo admin_url() ?>admin.php?page=maxbuttons-export"><?php _e('Export', 'maxbuttons-pro') ?></a>
				<a class="nav-tab" href="<?php echo admin_url() ?>admin.php?page=maxbuttons-support"><?php _e('Support', 'maxbuttons-pro') ?></a>
				<a class="nav-tab" href="<?php echo admin_url() ?>admin.php?page=maxbuttons-license"><?php _e('License', 'maxbuttons-pro') ?></a>
			</h2>
			
			<div class="import">
				<?php if ($message != '') { ?>
					<div class="message"><?php echo $message ?></div>
				<?php } ?>
				
				<div style="display: inline-block; vertical-align: top;">
					<h3><?php _e('Import Button Pack', 'maxbuttons-pro') ?></h3>
					<p><?php _e('Select a button pack file to upload then click "Import".', 'maxbuttons-pro') ?></p>
					
					<form id="import-form" method="post" enctype="multipart/form-data">
						<input type="file" name="pack_zip" />
						<input type="hidden" name="dummy" />
						<a id="import-button" class="button-primary"><?php _e('Import', 'maxbuttons-pro') ?></a>
					</form>
				</div>
			</div>
			
			<h3><?php _e('Available Button Packs', 'maxbuttons-pro') ?></h3>
			
			<?php
			$packs = scandir(MAXBUTTONS_PRO_PACKS_DIR);
			foreach ($packs as $pack) {
				if ($pack != '.' && $pack != '..') {
					if (is_dir(MAXBUTTONS_PRO_PACKS_DIR . '/' . $pack)) {
						$pack_file = MAXBUTTONS_PRO_PACKS_DIR . '/' . $pack . '/' . $pack . '.xml';
						$pack_img_file = MAXBUTTONS_PRO_PACKS_DIR . '/' . $pack . '/pack.png';
						$pack_img_url = MAXBUTTONS_PRO_PACKS_URL . '/' . $pack . '/pack.png';
						$default_img_url = MAXBUTTONS_PRO_PLUGIN_URL . '/images/default-pack.png';
						
						if (file_exists($pack_file)) {
							echo '<div class="pack">';
							
							echo '<a href="' . admin_url() . 'admin.php?page=maxbuttons-controller&action=pack&id=' . $pack . '">';
							echo '<div class="image">';
							if (file_exists($pack_img_file)) {
								echo '<img src="' . $pack_img_url . '" alt="" border="0" />';
							}
							else {
								echo '<img src="' . $default_img_url . '" alt="" border="0" />';
							}
							echo '</div>';
							echo '</a>';
							
							// Load the pack xml file
							$xml = simplexml_load_file($pack_file);
							
							// Show the pack name, author, description
							foreach ($xml->pack as $p) {
								echo '<h3>';
								echo '<a href="' . admin_url() . 'admin.php?page=maxbuttons-controller&action=pack&id=' . $pack . '">' . $p['name'] . '</a>';
								echo '</h3>';
								
								if ($p['author'] != '') {
									$author = sprintf(__('%sBy: ', 'maxbuttons-pro'), '<h4>');
									
									if ($p['author_url'] != '') {
										$author .= '<a href="' . $p['author_url'] . '" target="_blank">' . $p['author'] . '</a>';
									}
									else {
										$author .= $p['author'];
									}
									
									$author .= '</h4>';
									echo $author;
								}
								
								echo '<p>' . $p['description'] . '</p>';
							}

							echo '<p><a href="' . admin_url() . 'admin.php?page=maxbuttons-controller&action=pack-delete&id=' . $pack . '">' . __('Delete', 'maxbuttons-pro') . '</a></p>';						
							echo '</div>';
						}
					}
				}
			}
			?>
			
			<div class="clear"></div>
		</div>
		
		<div class="offers">
			<?php include 'maxbuttons-offers.php' ?>
		</div>
	</div>
</div>

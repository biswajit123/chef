<?php
$theme = wp_get_theme();
$browser = mbpro_get_browser();

function mbpro_system_label($label, $value, $spaces_between) {
	$output = $label;
	
	if ($spaces_between > 0) {
		for ($i = 0; $i < $spaces_between; $i++) {
			$output .= '&nbsp;';
		}
	}
	
	return $output . $value . "\n";
}

// http://www.php.net/manual/en/function.get-browser.php#101125.
// Cleaned up a bit, but overall it's the same.
function mbpro_get_browser() {
    $user_agent = $_SERVER['HTTP_USER_AGENT'];
    $browser_name = 'Unknown';
    $platform = 'Unknown';
    $version= "";

    // First get the platform
    if (preg_match('/linux/i', $user_agent)) {
        $platform = 'Linux';
    }
    elseif (preg_match('/macintosh|mac os x/i', $user_agent)) {
        $platform = 'Mac';
    }
    elseif (preg_match('/windows|win32/i', $user_agent)) {
        $platform = 'Windows';
    }
    
    // Next get the name of the user agent yes seperately and for good reason
    if (preg_match('/MSIE/i', $user_agent) && !preg_match('/Opera/i', $user_agent)) {
		$browser_name = 'Internet Explorer';
        $browser_name_short = "MSIE";
    }
    elseif (preg_match('/Firefox/i', $user_agent)) {
        $browser_name = 'Mozilla Firefox';
        $browser_name_short = "Firefox";
    }
    elseif (preg_match('/Chrome/i', $user_agent)) {
        $browser_name = 'Google Chrome';
        $browser_name_short = "Chrome";
    }
    elseif (preg_match('/Safari/i', $user_agent)) {
        $browser_name = 'Apple Safari';
        $browser_name_short = "Safari";
    }
    elseif (preg_match('/Opera/i', $user_agent)) {
        $browser_name = 'Opera';
        $browser_name_short = "Opera";
    }
    elseif (preg_match('/Netscape/i', $user_agent)) {
        $browser_name = 'Netscape';
        $browser_name_short = "Netscape";
    }
    
    // Finally get the correct version number
    $known = array('Version', $browser_name_short, 'other');
    $pattern = '#(?<browser>' . join('|', $known) . ')[/ ]+(?<version>[0-9.|a-zA-Z.]*)#';
    if (!preg_match_all($pattern, $user_agent, $matches)) {
        // We have no matching number just continue
    }
    
    // See how many we have
    $i = count($matches['browser']);
    if ($i != 1) {
        // We will have two since we are not using 'other' argument yet
        // See if version is before or after the name
        if (strripos($user_agent, "Version") < strripos($user_agent, $browser_name_short)){
            $version= $matches['version'][0];
        }
        else {
            $version= $matches['version'][1];
        }
    }
    else {
        $version= $matches['version'][0];
    }
    
    // Check if we have a number
    if ($version == null || $version == "") { $version = "?"; }
    
    return array(
        'user_agent' => $user_agent,
        'name' => $browser_name,
        'version' => $version,
        'platform' => $platform,
        'pattern' => $pattern
    );
}
?>

<div id="maxbuttons">
	<div class="wrap">
		<div class="icon32">
			<a href="http://maxbuttons.com" target="_blank"><img src="<?php echo MAXBUTTONS_PRO_PLUGIN_URL ?>/images/mb-32.png" alt="MaxButtons" /></a>
		</div>
		
		<h2 class="title"><?php _e('MaxButtons Pro: Support', 'maxbuttons-pro') ?></h2>
		
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
				<a class="nav-tab nav-tab-active" href=""><?php _e('Support', 'maxbuttons-pro') ?></a>
				<a class="nav-tab" href="<?php echo admin_url() ?>admin.php?page=maxbuttons-license"><?php _e('License', 'maxbuttons-pro') ?></a>
			</h2>
			
			<h4><?php printf(__('All support is handled through the %sSupport Forums%s.', 'maxbuttons-pro'), '<a href="http://maxbuttons.com/forums" target="_blank">', '</a>') ?></h4>
			
			<h4><?php _e('You may be asked to provide the information below to help troubleshoot your issue.', 'maxbuttons-pro') ?></h4>

			<textarea class="system-info" readonly="readonly" wrap="off">
----- Begin System Info -----

<?php echo mbpro_system_label('WordPress Version:', get_bloginfo('version'), 7) ?>
<?php echo mbpro_system_label('PHP Version:', PHP_VERSION, 13) ?>
<?php echo mbpro_system_label('MySQL Version:', mysql_get_server_info(), 11) ?>
<?php echo mbpro_system_label('Web Server:', $_SERVER['SERVER_SOFTWARE'], 14) ?>

<?php echo mbpro_system_label('WordPress URL:', get_bloginfo('wpurl'), 11) ?>
<?php echo mbpro_system_label('Home URL:', get_bloginfo('url'), 16) ?>

<?php echo mbpro_system_label('PHP cURL Support:', function_exists('curl_init') ? 'Yes' : 'No', 8) ?>
<?php echo mbpro_system_label('PHP GD Support:', function_exists('gd_info') ? 'Yes' : 'No', 10) ?>
<?php echo mbpro_system_label('PHP Memory Limit:', ini_get('memory_limit'), 8) ?>
<?php echo mbpro_system_label('PHP Post Max Size:', ini_get('post_max_size'), 7) ?>
<?php echo mbpro_system_label('PHP Upload Max Size:', ini_get('upload_max_filesize'), 5) ?>

<?php echo mbpro_system_label('WP_DEBUG:', defined('WP_DEBUG') ? WP_DEBUG ? 'Enabled' : 'Disabled' : 'Not set', 16) ?>
<?php echo mbpro_system_label('Multi-Site Active:', is_multisite() ? 'Yes' : 'No', 7) ?>

<?php echo mbpro_system_label('Operating System:', $browser['platform'], 8) ?>
<?php echo mbpro_system_label('Browser:', $browser['name'] . ' ' . $browser['version'], 17) ?>
<?php echo mbpro_system_label('User Agent:', $browser['user_agent'], 14) ?>

Active Theme:
<?php echo mbpro_system_label('-', $theme->get('Name') . ' ' . $theme->get('Version'), 1) ?>
<?php echo mbpro_system_label('', $theme->get('ThemeURI'), 2) ?>

Active Plugins:
<?php
$plugins = get_plugins();
$active_plugins = get_option('active_plugins', array());

foreach ($plugins as $plugin_path => $plugin) {
	// Only show active plugins
	if (in_array($plugin_path, $active_plugins)) {
		echo mbpro_system_label('-', $plugin['Name'] . ' ' . $plugin['Version'], 1);
	
		if (isset($plugin['PluginURI'])) {
			echo mbpro_system_label('', $plugin['PluginURI'], 2);
		}
		
		echo "\n";
	}
}
?>
----- End System Info -----
			</textarea>
		</div>
		
		<div class="offers">
			<?php include 'maxbuttons-offers.php' ?>
		</div>
	</div>
</div>

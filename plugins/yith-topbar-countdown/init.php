<?php
/**
 * Plugin Name: YITH Topbar Countdown
 * Plugin URI: http://yithemes.com/
 * Description: YITH Topbar Countdown allows you to add a banner countdown in your header.
 * Version: 1.0.0
 * Author: Your Inspiration Themes
 * Author URI: http://yithemes.com/
 * Text Domain: yit
 * Domain Path: /languages/
 *
 * @author Your Inspiration Themes
 * @package YITH Topbar Countdown
 * @version 1.0.0
 */
/*  Copyright 2013  Your Inspiration Themes  (email : plugins@yithemes.com)
This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License, version 2, as
published by the Free Software Foundation.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

// Exit if accessed directly

if (!defined('ABSPATH')) {
    exit;
}


/* Include common functions */

if (!defined('YITH_FUNCTIONS')) {

    require_once('yit-common/google_fonts.php');
    require_once('yit-common/yit-functions.php');
    require_once('yit-common/yith-panel.php');
}

load_plugin_textdomain('yit', false, dirname(plugin_basename(__FILE__)) . '/languages/');

define('YITH_TCOUNTDOWN', true);
define('YITH_TCOUNTDOWN_URL', plugin_dir_url(__FILE__));
define('YITH_TCOUNTDOWN_DIR', plugin_dir_path(__FILE__));

// Load required classes and functions

require_once('functions.yith-tcountdown.php');
require_once('yith-tcountdown-options.php');
require_once('class.yith-tcountdown-admin.php');
require_once('class.yith-tcountdown-frontend.php');
require_once('class.yith-tcountdown.php');

// Let's start the game!

global $yith_topbar_countdown;

$yith_topbar_countdown = new YITH_Topbar_Countdown();
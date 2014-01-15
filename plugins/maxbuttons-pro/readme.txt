=======================================
MaxButtons Pro Plugin for WordPress
Copyright (c) 2014 Max Foundry, LLC
http://maxfoundry.com
=======================================

========== LICENSING ==========
All files and code for this plugin are licensed with the GNU General Public License
version 2 (GPLv2), which can be found at http://www.gnu.org/licenses/gpl-2.0.html.

========== REQUIREMENTS ==========
This plugin has been tested with the self-hosted version of WordPress 3.4 and later, which
can be downloaded from http://wordpress.org. This plugin cannot be used on WordPress.com.
For more details, see http://en.support.wordpress.com/plugins/.

========== INSTALLATION ==========
These instructions assume you already have WordPress installed or are at least familiar with
doing so. If not, see the "Installing WordPress" codex article on the official wordpress.org
site for detailed installation instructions (http://codex.wordpress.org/Installing_WordPress).

For automatic installation:

- Login to your website and go to the Plugins section of your admin panel.
- Click the Add New button.
- Under Install Plugins, click the Upload link.
- Select the plugin zip file from your computer then click the Install Now button.
- You should see a message stating that the plugin was installed successfully.
- Click the Activate Plugin link.

For manual installation:

- You should have access to the server where WordPress is installed. If you don't, see your system administrator.
- Copy the plugin zip file up to your server and unzip it somewhere on the file system.
- Copy the "maxbuttons-pro" folder into the /wp-content/plugins directory of your WordPress installation.
- Login to your website and go to the Plugins section of your admin panel.
- Look for "MaxButtons Pro" and click Activate.

========== UPGRADING ==========
For automatic upgrading:

- When new updates are available, you should see an update notice in your WordPress admin.
- Go to Dashboard > Updates to see the list of all updates available.
- Select "MaxButtons Pro" from the plugins list then click the "Update Plugins" button.
- After a moment, you should see a message stating that the plugin has been updated.

For manual upgrading:

- You must have access to the server where WordPress is installed, either directly or through FTP.
- It's always a good idea to backup your website files and database, so do that first.
- Login to your website and go to the Plugins section of your admin panel.
- Look for "MaxButtons Pro" and click Deactivate.
- Copy the updated plugin zip file up to your server and unzip it somewhere on the file system.
- Copy the "maxbuttons-pro" folder into the /wp-content/plugins directory of your WordPress installation. You want it to overwrite the plugin folder that is already there.
- Go back to the Plugins section of your admin panel.
- Click the Activate link for the "MaxButtons Pro" plugin.

========== SUPPORT ==========
Please direct all support issues and questions to http://maxbuttons.com/forums.

========== VERSION HISTORY ==========
v2.3.5: Jan 11, 2014
- Replaced separate PHP page for viewing button CSS with lean modal box.

v2.3.4: Jan 6, 2014
- Fixed vulnerability issue when viewing the button CSS page.

v2.3.3: Dec 16, 2013
- Minor UI and style changes to better support WP 3.8.

v2.3.2 : Dec 6, 2013
- Fixed issue with file.php being loaded twice when exporting button packs.

v2.3.1 : Oct 20, 2013
- Added 12 more Google Web Fonts (Bigelow Rules, Cherry Swash, Courgette, Devonshire, Grand Hotel, Karla, Lily Script One, Montserrat, Noto Sans, Questrial, Special Elite, and Tangerine).

v2.3.0 : Oct 9, 2013
- Added shortcut links in Colors section for enhanced usability.
- Updated the shortcode so that it doesn't render the HREF or the hover colors when button URL is empty.

v2.2.0 : Sep 17, 2013
- Added gradient and opacity options.
- Changed the button output window so that the button isn't clickable.

v2.1.0 : Jul 27, 2013
- Changed MAXBUTTONS_PRO_PLUGIN_URL constant to call the plugins_url() function instead of WP_PLUGIN_URL so that the proper url scheme is used.
- Changed MAXBUTTONS_PRO_PLUGIN_DIR constant to call the plugin_dir_path() function instead of WP_PLUGIN_DIR.

v2.0.0 : May 8, 2013
- Added License page and activation functionality.
- Changed storage location of button packs to /uploads/maxbuttons-pro/packs.
- Changed storage location of exports folder to /uploads/maxbuttons-pro/exports.
- Increased the TinyMCE plugin button window to 700px wide.
- Ignoring the container element on the button list pages so that the button alignment is consistent on those pages.
- Added 'exclude' parameter to shortcode to exclude button from rendering on certain posts/pages.
- Replace get_theme_data() with wp_get_theme() on the support page; forces WP 3.4 as minimum requirement.

v1.9.1 : Feb 16, 2013
- Plugin now uses updater class from WP Updates to better support update notifications and auto-updating.

v1.9.0 : Feb 1, 2013
- Fixed issue where wp-load.php couldn't be found in some cases when viewing the button CSS.
- Added TinyMCE plugin to be able to insert button shortcode from the Visual tab in the WP text editor.

v1.8.0 : Jan 24, 2013
- Added width style to .mb-text and .mb-text2 elements.
- Added icon_width column to database table so that proper width style can be set on the .mb-icon element.
- Added box-shadow and border-radius styles for the button icon image to clear those styles added by theme stylesheets.
- The "Use Container" option is now enabled by default.
- Added 10 more Google Web Fonts (Arvo, Changa One, Crafty Girls, Droid Serif, Exo, Lora, Nunito, Open Sans Condensed, Shadows Into Light, Source Sans Pro).

v1.7.1 : Jan 21, 2013
- Fixed issue where click events for buttons that were used with the Shopp plugin stopped working.

v1.7.0 : Jan 20, 2013
- Added ability to externalize the button CSS code.
- Added option to use !important on button styles.
- Added "mb-" prefix to several CSS classes to help avoid conflicts with theme styles.
- Fixed issue with Shopp integration where only the first button worked on a category list page.

v1.6.1 : Dec 17, 2012
- Minor fix for supporting the Shopp "Submit Order" button.

v1.6.0 : Dec 16, 2012
- Added support for Shopp ecommerce integration.
- Added the Support page.

v1.5.0 : Nov 14, 2012
- Added support for localization.

v1.4.1 : Aug 30, 2012
- Fixed bug where shortcode was using wrong constant for plugin URL to include PIE.htc in button hover style.

v1.4.0 : Aug 27, 2012
- Added center div wrapper option to Container section in button editor.
- Added nofollow option to button editor.
- Added 10 more Google Web Fonts (Antic Slab, Asap, Bitter, Cabin, Economica, Gudea, Josefin Slab, Krona One, Lato, Rokkitt).
- Added button font examples to show how each font looks when used in a button.
- Added status field to database table to provide ability to move buttons to trash (default = 'publish').
- Added actions for Move to Trash, Restore, and Delete Permanently.
- Added CSS3PIE for better IE support.
- Wrapped some fields with htmlspecialchars() to properly format them during the export process.

v1.3.0 : Mar 19, 2012
- Added plugin update notification mechanism.
- The container is now enabled by default.
- Fixed bug where container options weren't being set properly when a button was copied from a button pack.
- Removed the IE-specific gradient filter and -ms-filter styles from shortcode output due to issue when used with rounded corners.

v1.2.0 : Feb 20, 2012
- Added container options.

v1.1.0 : Feb 13, 2012
- Added option for the icon alt text.
- Added additional styles for icon image to help avoid theme image styles from creeping into the button.
- Added checks to only render icon elements and styles if the button actually has an icon.

v1.0.5 : Feb 3, 2012
- Added :visited style to the shortcode output.

v1.0.4 : Feb 2, 2012
- Fixed another issue with the colorpickers for gradient start/hover and gradient end/hover.

v1.0.3 : Feb 1, 2012
- Fixed issue in button editor where the colorpickers for text shadow, gradient start, gradient end, border, and box shadow changed the value of their respective hover colorpicker.

v1.0.2 : Jan 31, 2012
- Fixed issue where the button text color was being overriden by theme styles.
- Fixed issue in button editor where the text colorpicker changed the value of the text hover colorpicker.

v1.0.1 : Jan 22, 2012
- Fixed style and script loading so that they are only loaded on this plugin's admin pages, not *all* admin pages. Will help avoid theme and plugin conflicts.
- Added copy and button that links to button packs on the Packs page.
- Added filter for widget_text to recognize and execute the button shortcode.

v1.0.0 : Jan 4, 2012
- Initial version.

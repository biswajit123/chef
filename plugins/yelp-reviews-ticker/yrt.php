<?php
/*
Plugin Name:  Yelp Reviews Ticker
Plugin URI:   http://wordpress.org/extend/plugins/yelp-reviews-ticker/
Description:  This reviews ticker allows you to show your yelp reviews and also customize its display to your taste in a easy manner
Version:      1.2
Author:       Flavio Domeneck Jr
Author URI:   http://www.flaviotreeservice.com/	
License: GPL2

Copyright 2013  FDJ  (email : contactflavio@gmail.com )

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

	
class yrtWidget extends WP_Widget {
	function yrtWidget() {
		parent::__construct( 
			false, 
			'Yelp Reviews Ticker',
			array( 'description' => "Yelp Reviews Ticker shows your yelp reviews cleanly and pain free" ) 
		);

	}

	function widget( $args, $instance ) {
		extract($args);
		echo $before_widget;
		echo $before_title.$instance['title'].$after_title;
		
//
// Partially from
// http://non-diligent.com/articles/yelp-apiv2-php-example/
// https://github.com/Yelp/yelp-api/blob/master/v2/php/example.php
//

// Enter the path that the oauth library is in relation to the php file
require_once ('lib/OAuth.php');

// Set instance values
$speed = $instance['speed'];
$pause = $instance['pause'];
$showitems = $instance['showitems'];
$animation = $instance['animation'];
$mousepause = $instance['mousepause'];
$direction = $instance['direction'];
$yelp_url = $instance['yelp_url'];
$unsigned_url = $instance['unsigned_url'];
$consumer_key = $instance['consumer_key'];
$consumer_secret = $instance['consumer_secret'];
$token = $instance['token'];
$token_secret = $instance['token_secret'];

// Token object built using the OAuth library
$token = new YRTOAuthToken($token, $token_secret);

// Consumer object built using the OAuth library
$consumer = new YRTOAuthConsumer($consumer_key, $consumer_secret);

// Yelp uses HMAC SHA1 encoding
$signature_method = new YRTOAuthSignatureMethod_HMAC_SHA1();

// Build OAuth Request using the OAuth PHP library. Uses the consumer and token object created above.
$oauthrequest = YRTOAuthRequest::from_consumer_and_token($consumer, $token, 'GET', $unsigned_url);

// Sign the request
$oauthrequest->sign_request($signature_method, $consumer, $token);

// Get the signed URL
$signed_url = $oauthrequest->to_url();

// Send Yelp API Call
$ch = curl_init($signed_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
$data = curl_exec($ch); // Yelp response
curl_close($ch);

// Handle Yelp response data
$response = json_decode($data);

$arr = (array) $response;

if(is_array($arr['reviews'])){
$ratingimg = plugins_url( 'images/rating.png' , __FILE__ );
	?>
<div>
<?
echo '	<h2><a href="'. $response->url .'" title="'. $response->url .'">' . $response->name . '</a></h2>'."\n";
echo '	<i title="'. $response->rating .' star rating">'."\n";
echo '	<img style="vertical-align:middle" alt="'. $response->rating .' star rating" src="'. $ratingimg .'" class="';

if ($response->rating == "0") {echo 'yrtstars_0_l';}
if ($response->rating == "1") {echo 'yrtstars_1_l';}
if ($response->rating == "1.5") {echo 'yrtstars_1h_l';}
if ($response->rating == "2.") {echo 'yrtstars_2_l';}
if ($response->rating == "2.5") {echo 'yrtstars_2h_l';}
if ($response->rating == "3") {echo 'yrtstars_3_l';}
if ($response->rating == "3.5") {echo 'yrtstars_3h_l';}
if ($response->rating == "4") {echo 'yrtstars_4_l';}
if ($response->rating == "4.5") {echo 'yrtstars_4h_l';}
if ($response->rating == "5") {echo 'yrtstars_5_l';}

echo "\">\n";

?>
	</i>
	<? echo $response->review_count; ?> reviews
</div>
<br />
<? 
if (($response->review_count == 2) && ($showitems > 2)){
	$showitems = "2";
	}
if (($response->review_count == 1) && ($showitems > 1)){
	$showitems = "1";
	} 

?>
<!-- Start Yelp Reviews Ticker -->
<script type="text/javascript">
jQuery(function(){
	jQuery('#<? echo "ticker_", $this->id; ?>').vTicker({ 
	<?
	echo "	speed: " . $instance['speed'] . ",\n";
	echo "	pause: " . $instance['pause'] . ",\n";
	echo "	animation: '" . $instance['animation'] . "',\n";
	echo "	mousePause: " . $instance['mousepause'] . ",\n";
	echo "	direction: '" . $instance['direction'] . "',\n";
	echo "	showItems: " . $showitems . "\n";
	?>
	});
});
</script>
<!-- End Yelp Reviews Ticker -->

<div id="yrtcssmarkup">
<div id="<? echo "ticker_", $this->id; ?>">
	<ul>
<? foreach($arr['reviews'] as $review){ ?>
		<li>
            <div class="yrtTable">
                <div class="yrtRow">
                    <div class="yrtCell1">
<? echo '				<img alt="' . $review->user->name . '" src="' . $review->user->image_url . '" width="60"/>'."\n";
echo '					<br />' . $review->user->name . ' <br />'."\n";
echo '					<img alt="'. $review->rating .' star" src="' . $ratingimg . '" class="';

if ($review->rating == "0") {echo 'yrtstars_0_s';}
if ($review->rating == "1") {echo 'yrtstars_1_s';}
if ($review->rating == "1.5") {echo 'yrtstars_1h_s';}
if ($review->rating == "2") {echo 'yrtstars_2_s';}
if ($review->rating == "2.5") {echo 'yrtstars_2h_s';}
if ($review->rating == "3") {echo 'yrtstars_3_s';}
if ($review->rating == "3.5") {echo 'yrtstars_3h_s';}
if ($review->rating == "4") {echo 'yrtstars_4_s';}
if ($review->rating == "4.5") {echo 'yrtstars_4h_s';}
if ($review->rating == "5") {echo 'yrtstars_5_s';}

echo "\">\n";
?>
                   </div>
                    <div class="yrtCell2">
<? echo '				<p>' . $review->excerpt . '</p>'."\n"; 

?>
                    </div>
                </div>
            </div>
<?				echo '					<div class="yrtYelp"><a href="' . $response->url . '#hrid:' . $review->id . '" target="_blank" title="Read the review in full at Yelp.com"> ' . gmdate("m/d/Y", $review->time_created) . ' read the full review at '."\n"; 
				echo '						<img style="vertical-align:middle" alt="Yelp" src="' . plugins_url( 'images/miniMapLogo.png' , __FILE__ ) . '"/></a></div>'."\n"; ?>
        </li>
<? } ?>
	</ul>
</div>

<div class="yrtFoot">
		<a href="http://www.yelp.com" title="www.Yelp.com" target="_blank">Reviews powered by <img alt="Yelp" style="vertical-align:middle" src="<?echo  plugins_url( 'images/yelp_logo_50x25.png' , __FILE__ );?>" /></a>
</div>
</div>

<? }


echo $after_widget;

} 
// End function widget.

// Updates the settings.

	function update( $new_instance, $old_instance ) {
		return $new_instance;
	}

	function form( $instance ) { //<- set default parameters of widget
	//$title = empty($instance['title']) ? Reviews : $instance['title'];
	//title
	if (isset($instance['title'])) {
		$title = $instance['title'];
    } else {
        $title = "Reviews"; //default
    }
	//speed
	if (isset($instance['speed'])) {
		$speed = $instance['speed'];
    } else {
        $speed = "2500"; //default
    }
	//pause
	if (isset($instance['pause'])) {
		$pause = $instance['pause'];
    } else {
        $pause = "6000"; //default
    }
	//showitems
	if (isset($instance['showitems'])) {
		$showitems = $instance['showitems'];
    } else {
        $showitems = "2"; //default
    }
	//animation
	if (isset($instance['animation'])) {
		$animation = $instance['animation'];
    } else {
        $animation = "fade"; //default
    }
	//mousepause
	if (isset($instance['mousepause'])) {
		$mousepause = $instance['mousepause'];
    } else {
        $mousepause = "true"; //default
    }
	//direction
	if (isset($instance['direction'])) {
		$direction = $instance['direction'];
    } else {
        $direction = "up"; //default
    }
	//unsigned_url
	if (isset($instance['unsigned_url'])) {
		$unsigned_url = $instance['unsigned_url'];
    } else {
        $unsigned_url = "mising"; //default
    }
	//consumer_key
	if (isset($instance['consumer_key'])) {
		$consumer_key = $instance['consumer_key'];
    } else {
        $consumer_key = "mising"; //default
    }
	//consumer_secret
	if (isset($instance['consumer_secret'])) {
		$consumer_secret = $instance['consumer_secret'];
    } else {
        $consumer_secret = "mising"; //default
    }
	//$token = empty($instance['token']) ? missing : $instance['token'];
	if (isset($instance['token'])) {
		$token = $instance['token'];
    } else {
        $token = "mising"; //default
    }
	//
	if (isset($instance['token_secret'])) {
		$token_secret = $instance['token_secret'];
    } else {
        $token_secret = "mising"; //default
    }
	
	?>
		<p>
			<label for="<?php echo $this->get_field_id('title');?>">Widget Title</label><br />
			<input id="<?php echo $this->get_field_id('title');?>" name="<?php echo $this->get_field_name('title');?>" type="text" value="<?php echo $title; ?>"/>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('speed');?>">Speed</label><br />
			<input id="<?php echo $this->get_field_id('speed');?>" name="<?php echo $this->get_field_name('speed');?>" type="text" value="<?php echo $speed; ?>"/>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('pause');?>">Pause</label><br />
			<input id="<?php echo $this->get_field_id('pause');?>" name="<?php echo $this->get_field_name('pause');?>" type="text" value="<?php echo $pause; ?>"/>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('showitems');?>"># of reviews</label><br />
			1 <input id="<?php echo $this->get_field_id('showitems');?>" name="<?php echo $this->get_field_name('showitems');?>" type="radio" <?php if($showitems == '1') echo 'checked'; ?> value="1"/>
			2 <input id="<?php echo $this->get_field_id('showitems');?>" name="<?php echo $this->get_field_name('showitems');?>" type="radio" <?php if($showitems == '2') echo 'checked'; ?> value="2"/>
			3 <input id="<?php echo $this->get_field_id('showitems');?>" name="<?php echo $this->get_field_name('showitems');?>" type="radio" <?php if($showitems == '3') echo 'checked'; ?> value="3"/>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('animation');?>">Fade</label><br />
			Yes <input id="<?php echo $this->get_field_id('animation');?>" name="<?php echo $this->get_field_name('animation');?>" type="radio" <?php if($animation == 'fade') echo 'checked'; ?> value="fade"/>
			No <input id="<?php echo $this->get_field_id('animation');?>" name="<?php echo $this->get_field_name('animation');?>" type="radio" <?php if($animation == '') echo 'checked'; ?> value=""/>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('mousepause');?>">Mouse Pause</label><br />
			Yes <input id="<?php echo $this->get_field_id('mousepause');?>" name="<?php echo $this->get_field_name('mousepause');?>" type="radio" <?php if($mousepause == 'true') echo 'checked'; ?> value="true"/>
			No <input id="<?php echo $this->get_field_id('mousepause');?>" name="<?php echo $this->get_field_name('mousepause');?>" type="radio" <?php if($mousepause == 'false') echo 'checked'; ?> value="false"/>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('direction');?>">Direction</label><br />
			Up <input id="<?php echo $this->get_field_id('direction');?>" name="<?php echo $this->get_field_name('direction');?>" type="radio" <?php if($direction == 'up') echo 'checked'; ?> value="up"/>
			Down <input id="<?php echo $this->get_field_id('direction');?>" name="<?php echo $this->get_field_name('direction');?>" type="radio" <?php if($direction == 'down') echo 'checked'; ?> value="down"/>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('unsigned_url');?>">API Business URL</label><br />
			http://api.yelp.com/v2/business/...<br />
			<input id="<?php echo $this->get_field_id('unsigned_url');?>" name="<?php echo $this->get_field_name('unsigned_url');?>" type="text" value="<?php echo $unsigned_url; ?>"/>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('consumer_key');?>">Consumer Key</label><br />
			<input id="<?php echo $this->get_field_id('consumer_key');?>" name="<?php echo $this->get_field_name('consumer_key');?>" type="text" value="<?php echo $consumer_key; ?>"/>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('consumer_secret');?>">Consumer Secret</label><br />
			<input id="<?php echo $this->get_field_id('consumer_secret');?>" name="<?php echo $this->get_field_name('consumer_secret');?>" type="text" value="<?php echo $consumer_secret; ?>"/>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('token');?>">Token</label><br />
			<input id="<?php echo $this->get_field_id('token');?>" name="<?php echo $this->get_field_name('token');?>" type="text" value="<?php echo $token; ?>"/>
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('token_secret');?>">Token Secret</label><br />
			<input id="<?php echo $this->get_field_id('token_secret');?>" name="<?php echo $this->get_field_name('token_secret');?>" type="text" value="<?php echo $token_secret; ?>"/>
		</p>

    
	<?php
	} // end function form
} // end class

// Register the widget.
function yrtw_register() {
	register_widget( 'yrtWidget' );
}

// Add scripts & styling
function yrt_scripts() {
	wp_enqueue_script(
		'jquery'
	);
	// jQuery vTicker from
	// http://www.jugbit.com/jquery-vticker-vertical-news-ticker/
	wp_enqueue_script( 
		'yrt_js',
		plugins_url( 'lib/jquery.vticker-min.js' , __FILE__ )
	);
	wp_enqueue_style( 
		'yrt_style',
		plugins_url( 'css/yelprt.css', __FILE__ )
	);
	wp_enqueue_style(
		'yrtstars',
		plugins_url( 'css/yrtstars.css', __FILE__ )
	);
}    
// Load scripts & styling
add_action('wp_enqueue_scripts', 'yrt_scripts');
// Register widget
add_action( 'widgets_init', 'yrtw_register' );
?>
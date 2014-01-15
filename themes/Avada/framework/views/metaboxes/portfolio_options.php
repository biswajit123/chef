<div class='pyre_metabox'>
<h2 style="margin-top:0;">Portfolio options:</h2>
<?php
$this->select(	'width',
				'Width (Content Columns for Featured Image)',
				array('full' => 'Full Width', 'half' => 'Half Width'),
				''
			);
?>
<?php
$this->select(	'portfolio_width_100',
				'Use 100% Width Page',
				array('no' => 'No','yes' => 'Yes'),
				''
			);
?>
<?php
$this->select(	'sidebar',
				'Show Sidebar',
				array('no' => 'No','yes' => 'Yes'),
				''
			);
?>
<?php
$this->select(	'sidebar_position',
				'Page: Sidebar Position',
				array('default' => 'Default', 'right' => 'Right', 'left' => 'Left'),
				''
			);
?>
<?php
$this->select(	'project_desc_title',
				'Show Project Description Title',
				array('yes' => 'Yes', 'no' => 'No'),
				''
			);
?>
<?php
$this->select(	'project_details',
				'Show Project Details',
				array('yes' => 'Yes', 'no' => 'No'),
				''
			);
?>
<?php
$this->textarea(	'video',
				'Video Embed Code'
			);
?>
<?php
$this->text(	'video_url',
				'Youtube/Vimeo Video URL for Lightbox',
				''
			);
?>
<?php
$this->text(	'project_url',
				'Project URL',
				''
			);
?>
<?php
$this->text(	'project_url_text',
				'Project URL Text',
				''
			);
?>
<?php
$this->text(	'copy_url',
				'Copyright URL',
				''
			);
?>
<?php
$this->text(	'copy_url_text',
				'Copyright URL Text',
				''
			);
?>
<?php
$this->text(	'fimg_width',
				'Featured Image Width',
				'(in pixels or percentage, e.g.: 100% or 100px.  Or Use "auto" for automatic resizing if you added either width or height)'
			);
?>
<?php
$this->text(	'fimg_height',
				'Featured Image Height',
				'(in pixels or percentage, e.g.: 100% or 100px.  Or Use "auto" for automatic resizing if you added either width or height)'
			);
?>
<?php
$this->select(	'image_rollover_icons',
				'Image Rollover Icons',
				array('linkzoom' => 'Link + Zoom', 'link' => 'Link', 'zoom' => 'Zoom', 'no' => 'No Icons'),
				''
			);
?>
<?php
$this->text(	'link_icon_url',
				'Link Icon URL',
				'Leave blank for post URL'
			);
?>
<?php
$this->select(	'related_posts',
				'Show Related Posts',
				array('yes' => 'Show', 'no' => 'Hide'),
				''
			);
?>
<h2>Slider options:</h2>
<?php
$this->select(	'slider_type',
				'Slider Type',
				array('no' => 'No Slider', 'layer' => 'LayerSlider', 'flex' => 'FlexSlider', 'flex2' => 'ThemeFusion Slider', 'rev' => 'Revolution Slider', 'elastic' => 'Elastic Slider'),
				''
			);
?>
<?php
global $wpdb;
$slides_array[0] = 'Select a slider';
// Table name
$table_name = $wpdb->prefix . "layerslider";

// Get sliders
$sliders = $wpdb->get_results( "SELECT * FROM $table_name
									WHERE flag_hidden = '0' AND flag_deleted = '0'
									ORDER BY date_c ASC" );

if(!empty($sliders)):
foreach($sliders as $key => $item):
	$slides[$item->id] = '';
endforeach;
endif;

if($slides){
foreach($slides as $key => $val){
	$slides_array[$key] = 'LayerSlider #'.($key);
}
}
$this->select(	'slider',
				'Select LayerSlider',
				$slides_array,
				''
			);
?>
<?php
$slides_array = array();
$slides_array[0] = 'Select a slider';
$slides = get_terms('slide-page');
if($slides && !isset($slides->errors)){
$slides = is_array($slides) ? $slides : unserialize($slides);
foreach($slides as $key => $val){
	$slides_array[$val->slug] = $val->name;
}
}
$this->select(	'wooslider',
				'Select FlexSlider',
				$slides_array,
				''
			);
?>
<?php
$slides_array = array();
$slides_array[0] = 'Select a slider';
$i = 1;
$data = $this->data;
while($i <= $data['flexsliders_number']){
	$slides_array['flexslider_'.$i] = 'TFSlider'.$i;
	$i++;
}
$this->select(	'flexslider',
				'Select ThemeFusion Slider',
				$slides_array,
				''
			);
?>
<?php
global $wpdb;
$get_sliders = $wpdb->get_results('SELECT * FROM '.$wpdb->prefix.'revslider_sliders');
$revsliders[0] = 'Select a slider';
if($get_sliders) {
	foreach($get_sliders as $slider) {
		$revsliders[$slider->alias] = $slider->title;
	}
}
$this->select(	'revslider',
				'Select Revolution Slider',
				$revsliders,
				''
			);
?>
<?php
$slides_array = array();
$slides_array[0] = 'Select a slider';
$slides = get_terms('themefusion_es_groups');
if($slides && !isset($slides->errors)){
$slides = is_array($slides) ? $slides : unserialize($slides);
foreach($slides as $key => $val){
	$slides_array[$val->slug] = $val->name;
}
}
$this->select(	'elasticslider',
				'Select Elastic Slider',
				$slides_array,
				''
			);
?>
<?php $this->upload('fallback', 'Slider Fallback Image'); ?>
<h2>Background options:</h2>
<?php
$this->select(	'page_bg_layout',
				'Layout',
				array('default' => 'Default', 'wide' => 'Wide', 'boxed' => 'Boxed')
			);
?>
<h2>Following options only work in boxed mode:</h2>
<?php $this->upload('page_bg', 'Background Image'); ?>
<?php
$this->text(	'page_bg_color',
				'Background Color (Hex Code)',
				''
			);
?>
<?php
$this->select(	'page_bg_full',
				'100% Background Image',
				array('no' => 'No', 'yes' => 'Yes'),
				''
			);
?>
<?php
$this->select(	'page_bg_repeat',
				'Background Repeat',
				array('repeat' => 'Tile', 'repeat-x' => 'Tile Horizontally', 'repeat-y' => 'Tile Vertically', 'no-repeat' => 'No Repeat'),
				''
			);
?>
<h2>Following options work in boxed and wide mode:</h2>
<?php $this->upload('wide_page_bg', 'Background Image'); ?>
<?php
$this->text(	'wide_page_bg_color',
				'Background Color (Hex Code)',
				''
			);
?>
<?php
$this->select(	'wide_page_bg_full',
				'100% Background Image',
				array('no' => 'No', 'yes' => 'Yes'),
				''
			);
?>
<?php
$this->select(	'wide_page_bg_repeat',
				'Background Repeat',
				array('repeat' => 'Tile', 'repeat-x' => 'Tile Horizontally', 'repeat-y' => 'Tile Vertically', 'no-repeat' => 'No Repeat'),
				''
			);
?>
<h2>Header background options:</h2>
<?php $this->upload('header_bg', 'Background Image'); ?>
<?php
$this->text(	'header_bg_color',
				'Background Color (Hex Code)',
				''
			);
?>
<?php
$this->select(	'header_bg_full',
				'100% Background Image',
				array('no' => 'No', 'yes' => 'Yes'),
				''
			);
?>
<?php
$this->select(	'header_bg_repeat',
				'Background Repeat',
				array('repeat' => 'Tile', 'repeat-x' => 'Tile Horizontally', 'repeat-y' => 'Tile Vertically', 'no-repeat' => 'No Repeat'),
				''
			);
?>
<h2>Page title bar options:</h2>
<?php
$this->select(	'page_title',
				'Page Title Bar',
				array('yes' => 'Show', 'no' => 'Hide'),
				''
			);
?>
<?php
$this->select(	'page_title_text',
				'Page Title Bar Text',
				array('yes' => 'Show', 'no' => 'Hide'),
				''
			);
?>
<?php $this->upload('page_title_bar_bg', 'Page Title Bar Background'); ?>
<?php $this->upload('page_title_bar_bg_retina', 'Page Title Bar Background Retina'); ?>
<?php
$this->select(	'page_title_bar_bg_full',
				'100% Background Image',
				array('no' => 'No', 'yes' => 'Yes'),
				''
			);
?>
<?php
$this->text(	'page_title_bar_bg_color',
				'Page Title Bar Background Color (Hex Code)',
				''
			);
?>
</div>
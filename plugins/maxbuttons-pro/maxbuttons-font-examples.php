<?php
require('../../../wp-load.php');
require('maxbuttons-arrays.php');
?>

<html>
	<head>
		<title><?php _e('Button Font Examples', 'maxbuttons-pro') ?></title>
		<?php wp_head() ?>
		<script type="text/javascript" src="js/maxbuttons.js"></script>
		<style type="text/css">
			.maxbutton-wrapper {
				display: inline-block;
				vertical-align: top;
				padding: 7px;
			}
			.maxbutton-link {
				text-decoration: none;
				color: #ffffff;
			}
			.maxbutton-link .maxbutton {
				width: 750px;
				height: 60px;
				background-color: #2271df;
				background: linear-gradient(#2271df 10%, #12285d);
				background: -moz-linear-gradient(#2271df 10%, #12285d);
				background: -o-linear-gradient(#2271df 10%, #12285d);
				background: -webkit-gradient(linear, left top, left bottom, color-stop(.10, #2271df), color-stop(1, #12285d));
				border: solid 1px #0f2557;
				border-radius: 4px;
				-moz-border-radius: 4px;
				-webkit-border-radius: 4px;
				text-shadow: -1px -1px 0px #12285d;
				box-shadow: 0px 0px 2px #333333;
			}
			.maxbutton-link .maxbutton .mb-text {
				color: #ffffff;
				font-size: 28px;
				font-style: normal;
				font-weight: normal;
				text-align: center;
				padding: 15px 0px 0px 0px;
				line-height: 1.0em;
			}
		</style>
	</head>
	
	<body>
		<?php $count = 1; ?>
		<?php foreach ($mbpro_font_families as $name => $value) { ?>
			<?php if ($value != '') { ?>
				<script type="text/javascript">
					mbpro_loadFontFamilyStylesheet("<?php echo $value ?>");
				</script>
				<style type="text/css">
					.maxbutton-link .maxbutton .mb-text.font-<?php echo $count ?> { font-family: '<?php echo $value ?>'; }
				</style>
				
				<div class="maxbutton-wrapper">
					<a class="maxbutton-link" href="#">
						<div class="maxbutton">
							<div class="mb-text font-<?php echo $count ?>"><?php _e('This is', 'maxbuttons-pro') ?> <?php echo $name ?></div>
						</div>
					</a>
				</div>
				<?php $count++; ?>
			<?php } ?>
		<?php } ?>
	</body>
</html>

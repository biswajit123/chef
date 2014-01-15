<?php
if (isset($_GET['action']) && $_GET['action'] != '') {
	if (isset($_GET['status']) && $_GET['status'] == 'trash') {
		include_once 'maxbuttons-buttons-trash.php';
	}
	else {
		switch ($_GET['action']) {
			case 'button':
				include_once 'maxbuttons-button.php';
				break;
			case 'copy':
				include_once 'maxbuttons-copy.php';
				break;
			case 'delete':
				include_once 'maxbuttons-delete.php';
				break;
			case 'trash':
				include_once 'maxbuttons-trash.php';
				break;
			case 'restore':
				include_once 'maxbuttons-restore.php';
				break;
			case 'pack':
				include_once 'maxbuttons-pack.php';
				break;
			case 'pack-delete':
				include_once 'maxbuttons-pack-delete.php';
				break;
			default:
				include_once 'maxbuttons-buttons.php';
				break;
		}
	}
} else {
	include_once 'maxbuttons-buttons.php';
}
?>
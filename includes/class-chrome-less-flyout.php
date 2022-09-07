<?php

/**
 * Flyout Setup
 *
 * @package Chrome Less Each Person
 * @since   1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


class Chrome_Less_Flyout {

	public function __construct() {
		add_action( 'wp_enqueue_scripts',
			array( $this, 'generate_flyout_box' ) );


	}

	public function generate_flyout_box() {
		$js_dir = CEP_PLUGIN_URL . 'assets/js/';
		wp_enqueue_script( 'epoints-shop-flyout-box',
			$js_dir . 'epoints-shop-popup-flyout.js', array('jquery'), null, true );
		// echo 'Test';
	}
}
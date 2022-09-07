<?php

/**
 * Chrome Less Cart Setup
 *
 * @package Chrome Less Each Person
 * @since   1.0.0
 */


class CL_Cart {
	public function __construct() {
		add_action( 'wp_enqueue_scripts',
			array( $this, 'cart_enqueue_scripts' ) );
	}

	public function cart_enqueue_scripts() {
		$js_dir = CEP_PLUGIN_URL . 'assets/js/';

		if ( $_SERVER['HTTP_REFERER'] != 'https://qa-admin.eachperson.com/' ) {
			define( 'EDD_VERSION', '1.4.0' );
			wp_enqueue_script( 'epoints-shop-script-cl-cart',
				$js_dir
				. 'epoints-shop-popup-cart.js', array( 'jquery' ), EDD_VERSION,
				true );

		}


	}
}
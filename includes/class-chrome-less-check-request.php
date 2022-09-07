<?php

/**
 * Chrome Less setup
 *
 * @package Chrome Less Each Person
 * @since   1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
//      echo 'Initial Session';
//var_dump($_SESSION);
//if(!isset($_SESSION['epRewardView'])) { echo 'Initial Session One';   session_start();}

class Chrome_Less_Each_Person {

	private $parameters;

	public function __construct() {
		add_action( 'plugins_loaded', array( $this, 'setup_parameters_data' ) );
		add_action( 'wp_enqueue_scripts',
			array( $this, 'cep_enqueue_script_popup' ) );
	}

	public function setup_parameters_data() {
		if ( isset( $_SERVER['HTTP_REFERER'] ) ) {

			if ( $_SERVER['HTTP_REFERER']
			     == 'https://qa-admin.eachperson.com/'
			) {
				$this->parameters = array(
					'epoints'     => $_GET['epoints'],
					'uc'          => $_GET['uc'],
					'ep'          => $_GET['ep'],
					'total_limit' => $_GET['totalLimit'],
					'max_limit'   => $_GET['maxLimit'],
					'min_limit'   => $_GET['minLimit'],
					'rc'          => $_GET['rc'],
				);
			} else {
				$this->parameters = array(
					'epoints'     => '',
					'uc'          => '',
					'ep'          => '',
					'total_limit' => '',
					'max_limit'   => '',
					'min_limit'   => '',
					'rc'          => '',
				);
			}
		} else {
			$_SERVER['HTTP_REFERER'] = '';
		}

	}


	public function cep_enqueue_script_popup() {

		$js_dir = CEP_PLUGIN_URL . 'assets/js/';

		$ajax_url = admin_url( 'admin-ajax.php' );

		$request_nonce = wp_create_nonce( 'send-ep-reward-value' );
		$user_id       = get_current_user_id();

		$product = wc_get_product();

		if ( ! empty( $product ) ) {
			$id = $product->get_id();
			$name = $product->get_name();
			$price = $product->get_price();
			$product_description = $product->get_description();
			$product_category = $product->get_category_ids();
			$product_sku = $product->get_sku();
		}

		// var_dump($product->get_name());

		$product_array = (array) $product;
		
		if (has_term( $product_category, 'product_cat', $id )) {
             $gift_card = true;
		 }
		 else {
			 $gift_card = false;
		 }
		
		$sellerID = get_post_field( 'post_author', $id, true );
		$sellerInfo = dokan_get_store_info( $sellerID );
		$epointsPoundDivider = get_option('epoints')['pound'];
		$productCountryCode = get_post_meta($id, 'country-code', true);
		$redemption_item_info = array(
			'description'  => $product_description,
			'merchantName' => $sellerInfo['store_name'],
			'merchantId'   => $sellerID,
			'brand' => '',
			'imageUrl' => get_the_post_thumbnail_url($id),
			'localCurrencyValue' => 0,
			'currency' => 'GBP',
			'conversionRate' => NULL,
			'businessId' => '',
			'price' => $price,
			'megaPixels' => NULL,
			'lastModifiedInIndexDate' => 1660109709468,
			'consolidationGroupId' => '',
			'colour' => [],
			'size' => [],
			'epointsInPounds' => $price,
			'priceInEpoints' => $price * $epointsPoundDivider ,
			'descountedEpoints' => 0,
			'discountedPrice' => 0,
			'discountedPriceInEpoints' => 0,
			'rrp' => 0,
			'saving' => 0,
			'retailerUrl' => get_post_meta($id, 'url', true) ?: '',
			'productUrl' => get_post_meta($id, 'url', true) ?: '',
			'merchantDomain' => '',
			'discountedGoldPrice' => 0,
			'bonusPointsPercentage' => 0,
			'sku' => (string)($product_sku ?: $id),
			'localCurrencyCode' => $productCurrency->currency ?? 'GBP',
			'countryCode' => $productCountryCode ?: 'GB',
		);
		$redemption_item  = json_encode( $redemption_item_info ) ;
		$product_item = json_encode( $product_array ) . '<br>';

		// var_dump($product_item);

		//    $products = wc_get_products();
		define( 'EDD_VERSION', '1.4.0' );
		wp_enqueue_script( 'epoints-shop-script-custom',
			$js_dir
			. 'epoints-shop-popup.js', array(), EDD_VERSION,
			true );

		wp_localize_script( 'epoints-shop-script-custom',
			'chromeless_ajax_ajax_object',
			array(
				'ajax_url'      => $ajax_url,
				'nonce'         => $request_nonce,
				'user_id'       => $user_id,
				'host_user'     => $_SERVER['HTTP_REFERER'],
				'ep'            => $this->parameters['ep'],
				'items'         => $product_item,
				'max_limit'     => $this->parameters['max_limit'],
				'product_id'    => $id,
				'product_name'  => $name,
				'product_price' => $price,
				'gift_card'    => $gift_card,
				'redemption_items'  => $redemption_item
			)
		);

	}


}
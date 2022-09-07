<?php

/*
 * Plugin Name:      Chrome Less Each Person
 * Plugin URI:       https://bishalgc.com/chrome-less-each-person/
 * Description:      Chrome Less Each Person is a plugin that allows you to create a independent shop  for each person to reward it's employees.
 * Version:           2.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Bishal GC
 * Author URI:        https://bishalgc.com/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        #
 * Text Domain:       chrome-less-each-person
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Test to see if WooCommerce is active (including network activated).
$plugin_path = trailingslashit(WP_PLUGIN_DIR) . 'woocommerce/woocommerce.php';

if (
    in_array($plugin_path, wp_get_active_and_valid_plugins())
    || in_array($plugin_path, wp_get_active_network_plugins())
) {
    // Custom code here. WooCommerce is active, however it has not
    // necessarily initialized (when that is important, consider
    // using the `woocommerce_init` action).

    // Start the session
    session_start();

    if (!class_exists('Chrome_Less_Each_Person_Driver')):

/**
 * Main  Driver class
 */
        class Chrome_Less_Each_Person_Driver
    {

            /** Singleton *************************************************************/

            private static $instance;

            private $parameters;

            public static function instance()
        {

                if (!isset(self::$instance)
                && !(self::$instance instanceof Chrome_Less_Each_Person_Driver)
            ) {
                    self::$instance = new Chrome_Less_Each_Person_Driver();
                    self::$instance->setup_constants();
                 

                    add_action('wp_enqueue_scripts',
                        array(self::$instance, 'cep_enqueue_style'));
                    add_action('wp_enqueue_scripts',
                        array(self::$instance, 'cep_enqueue_script'));



                    self::$instance->includes();


                    self::$instance->checkrequest = new Chrome_Less_Each_Person();

                    
                    self::$instance->greenborderheader = new Chrome_Less_Header_Bar();
                    self::$instance->clcart = new CL_Cart();
                    self::$instance->clflyout = new Chrome_Less_Flyout();


                }

                return self::$instance;
            }

            private function __construct()
        {
                /* Do nothing here */
            }

            /**
             * Setup plugins constants.
             *
             * @access private
             * @return void
             * @since  1.0.0
             */
            private function setup_constants()
        {
                // Plugin version.
                if (!defined('CEP_VERSION')) {
                    define('CEP_VERSION', '1.0');
                }

                // Plugin folder Path.
                if (!defined('CEP_PLUGIN_DIR')) {
                    define('CEP_PLUGIN_DIR', plugin_dir_path(__FILE__));
                }

                // Plugin folder URL.
                if (!defined('CEP_PLUGIN_URL')) {
                    define('CEP_PLUGIN_URL', plugin_dir_url(__FILE__));
                }

                // Plugin root file.
                if (!defined('CEP_PLUGIN_FILE')) {
                    define('CEP_PLUGIN_FILE', __FILE__);
                }

                // Plugin root file.
                if (!defined('CEP_CLIENT_URL')) {
                    define('CEP_CLIENT_URL', 'https://qa-shop.eachperson.com/');
                }

            }

            /**
             * Include required files.
             *
             * @access private
             * @return void
             * @since  1.0.0
             */

            private function includes(){
                require_once CEP_PLUGIN_DIR . 'includes/class-chrome-less-check-request.php';
                require_once CEP_PLUGIN_DIR . 'includes/class-chrome-less-header-bar.php';
                require_once CEP_PLUGIN_DIR . 'includes/class-chrome-less-flyout.php';
                require_once CEP_PLUGIN_DIR . 'includes/class-chrome-less-cart.php';

            }

            public function cep_enqueue_style(){
				define( 'EDD_VERSION', '1.4.1' );
                $css_dir = CEP_PLUGIN_URL . 'assets/css/';
                wp_enqueue_style('epoints-shop-style-custom',
                    $css_dir
                    . 'epoints-shop-popup.css', true, EDD_VERSION);

            }

            /**
             * Enqueue script front-end
             *
             * @access public
             * @return void
             * @since  1.0.0
             */
            public function cep_enqueue_script(){

               

            }



            

        }

    endif;

    function run_chromeless_reward()
    {
        return Chrome_Less_Each_Person_Driver::instance();
    }

    global $cep_driver;
    $cep_driver = run_chromeless_reward();

}
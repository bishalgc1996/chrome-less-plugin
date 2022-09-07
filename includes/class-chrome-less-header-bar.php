<?php

/**
 * Header Bar Setup
 *
 * @package Chrome Less Each Person
 * @since   1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}



class Chrome_Less_Header_Bar
{

    public function __construct()
    {   

      
            
     

        add_action('wp_enqueue_scripts',
            array($this, 'generate_header_bar'));

               
    }

    public function generate_header_bar()
    {
        $js_dir = CEP_PLUGIN_URL . 'assets/js/';

       
        if ( $_SERVER['HTTP_REFERER'] === 'https://qa-admin.eachperson.com/' ) {

       
        
       
			define( 'EDD_VERSION', '1.4.0' );
            wp_enqueue_script('epoints-shop-header-bar', $js_dir . 'epoints-shop-popup-header-bar.js', array(), EDD_VERSION, true);
        }
        

        // echo 'Test';
    }
}
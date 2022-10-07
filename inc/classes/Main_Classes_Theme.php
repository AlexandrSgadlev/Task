<?php
/**
 * Main Classes Theme 
 * 
 * @since 1.0.2
*/

if ( ! defined( 'L_THEME_DIR' ) ) {
	exit( 'No direct script access allowed' );
}

class Main_Classes_Theme{

	private $register_classes = array();

	public function __construct() {


		// files include
		if ( is_admin() ) {
			$files = array(
				'admin/admin-function',
			);
			$this->register_classes = array(
				'Dashboard_Menu_Classes',
			);	
		}else{
			$files = array(
				'frontend/frontend-function',
			);
			$this->register_classes = array(
				'L_Frontend',
			);	
		}
		
		$this->register_classes();
		$this->general_files_include($files);
		
		//add_action( 'init', array( $this ), 20 );
		
	}



	private function register_classes() {
		foreach ( $this->register_classes as $class ) {
			Registry_Classes::getInstance()->$class;
		}
	}



	public function general_files_include($files = array()) {
		foreach ( $files as $file ) {
			$path = get_parent_theme_file_path( L_THEME_FRAMEWORK . '/' . $file . '.php' );
			if ( file_exists( $path ) ) {
				require_once $path;
			}
		}
	}
	
	
	

}









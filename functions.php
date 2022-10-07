<?php
/**
 * Main Theme
 *
 * @package WordPress
 * @subpackage Liquid
 * @since 1.0.2
*/





/**
 * ------------------------------------------------------------------------------------------------
 * Variables
 * ------------------------------------------------------------------------------------------------
*/


define( 'L_THEME_NAME', 'liquid' );
define( 'L_THEME_DIR', get_template_directory_uri() );
define( 'L_THEME_THEMEROOT', get_template_directory() );
define( 'L_THEME_CLASSES', L_THEME_THEMEROOT . '/inc/classes' );
define( 'L_THEME_FRAMEWORK', '/inc' );




/**
 * ------------------------------------------------------------------------------------------------
 * Load Classes
 * ------------------------------------------------------------------------------------------------
*/


if ( !( function_exists( 'lts_load_theme_classes' ) ) ) {
	function lts_load_theme_classes() {
		$classes = array(
			'Main_Classes_Theme.php',
			'Registry_Classes.php',
			'Dashboard_Menu_Classes.php',
			'Frontend.php',
		);
		


		foreach ( $classes as $class ) {
			$file_name = L_THEME_CLASSES . DIRECTORY_SEPARATOR . $class;
			if ( file_exists( $file_name ) ) {
				require $file_name;
			}
		}
	}
}

lts_load_theme_classes();
new Main_Classes_Theme;







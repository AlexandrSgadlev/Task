<?php
/**
 * Front functions
 *
 * @package WordPress
 * @since 1.0.0
 */



if ( ! defined( 'ABSPATH' ) ) {
	exit; // Direct access not allowed.
}


/**
 * ------------------------------------------------------------------------------------------------
 * Generate current header HTML structure
 * ------------------------------------------------------------------------------------------------
 */

if( ! function_exists( 'lts_get_layout_header_and_footer' ) ) {
	function lts_get_layout_header_and_footer($type_layout = '', $active_layout = null) {
		$layout = L_Frontend::get_layout_header_and_footer($type_layout, $active_layout);
		if($layout){
			
			$sections = ['top', 'main', 'bottom'];
			
			echo '<div class="lts-layout-id-'. $layout['id'] . '">';
			
			foreach ( $sections as $section ) {
				
					echo '<div class="lts-section-layout lts-section-layout-row">';
				
					foreach ( $layout[$section] as $col ) {
						
						if( isset($col['default_width']) ){
							$default_width = $col['default_width'];
						}else{
							$default_width = 3;
						}
						
						if( isset($col['custom_class']) ){
							$custom_class = $col['custom_class'];
						}else{
							$custom_class = '';
						}	
						
						echo '<div class="lts-col-'. $default_width . ' ' . $custom_class . '">';
						if( isset($col['html_content']) ){ echo $col['html_content']; }
						echo '</div>';
						
					}
					
					echo '</div>';
					
			}
			
			echo '</div>';
			
		}
	}
}



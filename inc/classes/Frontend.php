<?php
/**
 * Frontend
 *
 * @since 1.0.0
 */



if ( ! defined( 'ABSPATH' ) ) {
	exit; // Direct access not allowed.
}


class L_Frontend{
	
	static function get_layout_header_and_footer($type_layout = '', $active_layout = null){
		if(!$type_layout){return;}
		$get_option = json_decode(get_option(L_THEME_NAME . '_' . $type_layout . '_options' ), true);
		if($get_option){
			if($active_layout && $get_option['layouts'][$active_layout]){
				return $get_option['layouts'][$active_layout];
			}else{
				if($get_option['layouts'][$get_option['layout_active']]){
					return $get_option['layouts'][$get_option['layout_active']];
				}
			}
		}else{
			return false;
		}
	}





}

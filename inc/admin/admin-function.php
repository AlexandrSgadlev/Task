<?php
/**
 * Theme functions and definitions
 * * @package WordPress
 */



if ( ! defined( 'ABSPATH' ) ) {
	exit; // Direct access not allowed.
}


// Settings
if(!function_exists('add_menu_sections')){
	add_filter( 'menu_sections_setting_array', 'add_menu_sections', 10, 1 );
	function add_menu_sections($sections){
		$sections = array(
			'sections' => array(
				'main_settings' => array( 'name'=> 'Main Settings'),
				'header_builder' => array( 'name'=> 'Header builder', 
				//'child' => array(
						//'header_build_layout' => array( 'name'=> 'Header build layout', 'parent'=> 'Header'),
						//'header_other_settings' => array( 'name'=> 'Header other settings', 'parent'=> 'Header')																
						//),
				),
				'footer_builder' => array( 'name'=> 'Footer builder'),
			)
		);
		return $sections;
	}
}






// Options theme activation
add_action('after_switch_theme', 'activate_my_theme' );
function activate_my_theme( $new_name ){

	$layout_arr = ['Basic header layout' => '_header_options', 'Basic footer layout' => '_footer_options'];

	$opt = array(	'layout_active' => "basic",
		'layouts' => array(
						"basic" => array(
								'id' => "basic",
								'name' => 'Basic footer layout',
								'top' => array(
											array(
												"name" => 'Block 1',
												"default_width" => "2",
												"html_content" => '<p><span>1</span></p>',
												"custom_class" => 'ts-block-1',
											),
											array(
												"name" => 'Block 2',
												"default_width" => "5",
												"html_content" => '<p><span>2</span></p>',
												"custom_class" => 'ts-block-2',
											)	
								),
								'main' => array(
											array(
												"name" => "Block 3",
												"default_width" => '',
												"html_content" => '<p><span>3</span></p',
												"custom_class" => 'ts-block-3',
											),
											array(
												"name" => "Block 4",
												"default_width" => "7",
												"html_content" => '<p><span>4</span></p>',
												"custom_class" => 'ts-block-4',
											),
											array(
												"name" => "Block 5",
												"default_width" => "3",
												"html_content" => '',
												"custom_class" => 'ts-block-3',
											),
								),
								'bottom' => array()
						),

					),
	);


	foreach($layout_arr as $k => $v){
		$opt['layouts']['basic']['name'] = $k;
		if(get_option(L_THEME_NAME . $v ) === false){
			update_option(L_THEME_NAME . $v, json_encode($opt) );
		}
	}


}




add_action( 'admin_enqueue_scripts', 'my_scripts_method', 1 );
function my_scripts_method(){
	wp_enqueue_script( 'dashboard-sections', get_template_directory_uri() . '/inc/admin/assets/js/dashboard-sections.js', null, null, true );
	wp_enqueue_script( 'template-builder-header-and-footer', get_template_directory_uri() . '/inc/admin/assets/js/template-builder-header-and-footer.js', null, null, true );
}

add_action( 'admin_enqueue_scripts', 'load_admin_style', 2 );
function load_admin_style(){
	wp_enqueue_style( 'dashboard-style', get_template_directory_uri() . '/inc/admin/assets/css/dashboard-style.css');
	wp_enqueue_style( 'bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');
}




add_action( 'admin_footer', 'lang' );
function lang(){

	?>
		<script>

			var errore_array = {
				1: "<?php _e('Layout is missing in array'); ?>",
				2: "<?php _e('Missing items to export layout'); ?>",
				3: "<?php _e('Missing items to new layout'); ?>",
				4: "<?php _e('Missing items to import layout'); ?>",
				5: "<?php _e('Missing items to builder layout'); ?>",
				6: "<?php _e('Server error'); ?>",
				7: "<?php _e('Server error'); ?>",
			};
			var translit_arr = {
				1: "<?php _e('Saved', L_THEME_NAME); ?>",
				2: "<?php _e('Loding', L_THEME_NAME); ?>",
				3: "<?php _e('Are you sure?', L_THEME_NAME); ?>",
				6: "<?php _e('Server error'); ?>",
				7: "<?php _e('Server error'); ?>",
			};

		</script>
	<?php
};





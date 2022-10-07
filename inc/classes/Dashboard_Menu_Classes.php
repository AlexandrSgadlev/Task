<?php
/**
 * Dashboard Menu Classes
 * Create and display fields option.
 * @package WordPress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Direct access not allowed.
}


class Dashboard_Menu_Classes{

	// Init
	public function __construct() {
		// Create admin dashboard menu
		add_action( 'admin_menu', array( $this, 'admin_page' ), 4 );
		
		// Register ajax callback section
		add_action('wp_ajax_'. 'show_section_setting', array($this,'ajax_show_section'));
		// Register ajax callback update layouts header and footer
		add_action('wp_ajax_'. 'update_layouts_header_and_footer', array($this,'ajax_update_layouts_header_and_footer'));
	}

	// Create settings page
	public function admin_page(){
		add_menu_page(
			esc_html__( 'Theme Settings', L_THEME_NAME ),
			esc_html__( 'Theme Settings', L_THEME_NAME ),
			'manage_options',
			L_THEME_NAME.'-options',
			array( &$this, 'section_content_settings' ),
			'', 
			4
		);
		// For custom sections
		$sections = apply_filters( 'menu_sections_setting_array', array() );
		// Sections register
		foreach ( $sections['sections'] as $key => $section ) {
			// Checking for a top-level menu item
			if ( isset( $section['parent'] ) ) {
				continue;
			}
			add_submenu_page(
				L_THEME_NAME.'-options',
				$section['name'],
				$section['name'],
				'manage_options',
				L_THEME_NAME.'-options&tab=' . $key,
				array( &$this, 'section_content_settings' )
			);
		}
		// Remove submenu first item
		remove_submenu_page( L_THEME_NAME.'-options', L_THEME_NAME.'-options' );
	}

	// Create content section
	public function build_content_section($key, $name){
		?>
			<div class="ts-settings-section ts-active" data-id="<?php echo $key; ?>">
					<?php
						// Checking for a template in a child theme
					    if ( file_exists( get_stylesheet_directory() . '/inc/admin/dashboard-settings' . $key . '.php' ) ) {
							require_once ( get_stylesheet_directory() . '/inc/admin/dashboard-settings' . $key . '.php' );
						}else{
							$path = get_parent_theme_file_path(L_THEME_FRAMEWORK . '/admin/dashboard-settings/template-options/' . $key . '.php');
							if ( file_exists( $path ) ) {
								require_once $path;
							}
						}
					?>					
			</div>
		<?php

	}

	// Update layouts header and footer
    public function ajax_update_layouts_header_and_footer(){
		
		require_once( $_SERVER['DOCUMENT_ROOT'] . '/wp-load.php' );
		$data = json_decode(file_get_contents("php://input"), true);
		
		$errore_arr = [];	

		$layout_active = $data['layout_active'];
		$layouts = $data['layouts'];
		
		$json_layouts = [];
		
		if($_REQUEST['tab'] == 'header_builder'){
			$type_template = 'header';
		}elseif($_REQUEST['tab'] == 'footer_builder'){
			$type_template = 'footer';
		}else{
			$errore_arr[] = "Тип шаболона";
			echo (json_encode(['errore' => $errore_arr], JSON_UNESCAPED_UNICODE));
			die();
		};



		if( !(array_key_exists('basic', $layouts)) ){
			$errore_arr[] = "Массив не содержит элемент basic";
			echo (json_encode(['errore' => $errore_arr], JSON_UNESCAPED_UNICODE));
			die();
		}

		// REQUEST_URI
		parse_str($_SERVER['REQUEST_URI'], $query);

		// Get $json_options
		if( $query['function_call'] == 'name-layout' || $query['function_call'] == 'remove-layout' || $query['function_call'] == 'active-layout' ){
			$json_option = get_option(L_THEME_NAME . '_' . $type_template . '_options' );
			$option_layouts = json_decode($json_option, true);
			if( !($option_layouts) ){
				$errore_arr[] = "Отсутствуют необходимые данные";
				echo (json_encode(['errore' => $errore_arr], JSON_UNESCAPED_UNICODE));
				die();
			}
		}

		// Active layout		
		if( $query['function_call'] == 'active-layout' ){
			$option_layouts['layout_active'] = $json_layouts['layout_active'];
			$json_layouts = $option_layouts;
		}
		
		// Name
		if( $query['function_call'] == 'name-layout' ){
			if($option_layouts['layouts'][$query['curent_layout']]){
				$option_layouts['layouts'][$query['curent_layout']]['name'] = $layouts[$query['curent_layout']]['name'];
			}
			$json_layouts = $option_layouts;
		}
		
		// Remove layout
		if( $query['function_call'] == 'remove-layout' ){
			if($option_layouts['layouts'][$query['curent_layout']]){
				unset($option_layouts['layouts'][$query['curent_layout']]);
			}
			$json_layouts = $option_layouts;
		}
		
		if( $query['function_call'] == 'save-layout' || $query['function_call'] == 'new-layout'  || $query['function_call'] == 'import-layout' ){
			$sections = ['top', 'main', 'bottom'];
			foreach ( $layouts as $layout_id => $layout_activerr ) {
				// Add new layout or update
				if(!($layout_activerr['id']) || $layout_id == 'new'){
					for(;;){
						$unique_id = wp_unique_id();
						if( !(array_key_exists(($type_template . '-' . $unique_id), $layouts)) ){
							break;
						}					
					}
					$layout_id = ($type_template . '-' . $unique_id);
				}
				$json_layouts['layouts'][$layout_id]['id'] = $layout_id;

				if(!$layout_activerr['name']){
					$layout_activerr['name'] = 'Custom layout';
				}			
				
				$json_layouts['layouts'][$layout_id]['name'] = $layout_activerr['name'];
				
				foreach ( $sections as  $section ) {
					if(!$layout_activerr[$section]){
						$json_layouts['layouts'][$layout_id][$section] = [];
					}else{

						foreach ( $layout_activerr[$section] as  $col ) {
							$col_v = $layout_activerr[$section][$col];
													
							$jsone_col_v = [];
							
							if($col['name']){
								$jsone_col_v['name'] = (strip_tags($col['name']));
							}
							
							if(is_int(+$col['default_width']) && $col['default_width'] >= 1 && $col['default_width'] <= 12 ){
								$jsone_col_v['default_width'] = strip_tags($col['default_width']);
							}

							if($col['custom_class']){
								$jsone_col_v['custom_class'] = (strip_tags($col['custom_class']));
							}						

							if($col['html_content']){
								$jsone_col_v['html_content'] = $col['html_content'];
							}						
							
							$json_layouts['layouts'][$layout_id][$section][] = $jsone_col_v;
							
						}

					}
				}
				
			}
		}
		
		// if empty active layout
		if( !(array_key_exists($layout_active, $layouts)) ){
			$json_layouts['layout_active'] = 'basic';
		}else{
			$json_layouts['layout_active'] = $layout_active;
		}

		
		if(json_encode($json_layouts) == get_option( L_THEME_NAME . '_' . $type_template . '_options')){

			$update = true;

		}else{
			$update = update_option( L_THEME_NAME . '_' . $type_template . '_options', json_encode($json_layouts) );
			if(!$update){
				$errore_arr[] = "Не удалось сохранить данные в БД";
			}
		}
		
		if($errore_arr){
			echo (json_encode(['errore' => $errore_arr], JSON_UNESCAPED_UNICODE));
		}else{
			echo (json_encode($json_layouts, JSON_UNESCAPED_UNICODE));	
		}
		
		die();
    }
	
	
	// Ajax сreate content section
    public function ajax_show_section(){

		require_once( $_SERVER['DOCUMENT_ROOT'] . '/wp-load.php' );

		$data = json_decode(file_get_contents("php://input"), true);
		$section['qqqcontent'] = $data['tab'];

		ob_start();
		

		$this->build_content_section($data['tab'], $name);

		$section['content'] = ob_get_contents();
		ob_end_clean();



		if($data['tab'] == 'header_builder'){
			$layouts = get_option(L_THEME_NAME . '_header_options' );
		}
		if($data['tab'] == 'footer_builder'){
			$layouts = get_option(L_THEME_NAME . '_footer_options' );
		}

		if( isset($layouts) ){
			$section['json_layouts'] = json_decode($layouts, true);
		}



		echo (json_encode($section, JSON_UNESCAPED_UNICODE));
		die();
    }


	// Create page sections
	public function section_content_settings(){
		?>

		<div class="ts-wrap-content-settings">
			<h2><?php _e('Settings', L_THEME_NAME); ?></h2>
		</div>
		<div class="ts-settings-form">
			<div class="ts-setting-wrap">
				<div class="ts-tabs-nav">
					<ul>
					<?php 
					
					$sections = apply_filters( 'menu_sections_setting_array', array() );			

					if($sections){

						foreach ( $sections['sections'] as $key => $section ) {
							
							?>
								<li class="ts-tab-link<?php if(isset($section['child'])){ echo ' ts-nav-has-child';} ?>">
									<a href="javascript:void(0);" <?php if($_GET['tab'] === $key){ echo 'class="ts-active"';} ?> data-id="<?php echo $key; ?>">
										<span class="ts-section-icon"></span>
										<?php _e($section['name'], L_THEME_NAME); ?>
									</a>
									<?php
										if ( isset($section['child']) && !empty($section['child']) ){
											echo '<ul class="ts-list-subsection-nav">';
											foreach ( $section['child'] as $key_child => $section_child ){
												?>
												<li class="ts-tab-link">
													<a href="javascript:void(0);" <?php if($_GET['tab'] === $key_child){ echo 'class="ts-active"';} ?> data-id="<?php echo $key_child; ?>">
														<span class="ts-section-icon"></span>
														<?php _e($section_child['name'], L_THEME_NAME); ?>
													</a>										
												</li>
												<?php
											}
											echo '</ul>';
										}
									?>
								</li>
							<?php 
						}
					}

					?>
					</ul>
				</div>
				
				<div id="ts-section-active" class="ts-section">
					<?php 
					
					if($sections){
						foreach ( $sections['sections'] as $key => $section ) {
							if($_GET['tab'] === $key){
								$this->build_content_section($key, $section['name']);
								if ( isset($section['child']) && !empty($section['child']) ){
									foreach ( $section['child'] as $key_child => $section_child ){
										$this->build_content_section($key_child, $section_child['name']);
									}
								}
							}
						}
					}
					
					?>
				</div>
			</div>
		</div>
		<?php
	}	
	


}


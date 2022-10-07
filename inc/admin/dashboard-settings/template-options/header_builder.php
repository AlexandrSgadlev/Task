<?php
/**
 * Template header builder
 *
 * @package xts
 
 
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Direct access not allowed.
}



?>

<script id='json_layouts'>
	<?php
		$js_str = get_option(L_THEME_NAME . '_header_options' );
		$js_array = json_decode($js_str, true);

	?>
	var json_layouts = <?php echo (json_encode($js_array)); ?>;

	document.addEventListener('DOMContentLoaded', function(){
		let obj = new Box();
		obj.Initialization();
	});

</script>


<div class="ts-settings-section-title">
	<h3><?php _e('Header builder', L_THEME_NAME); ?></h3>
</div>

<div class="ts-settings-section-fields-wrapper">
									
	<div class="ts-field ts-settings-field ts-select-control">

		<div id="ts-layouts" class="ts-builder-row" style="display: none;">
			<div class="">
				<p class="ts-field-title"><?php _e('Choose a template', L_THEME_NAME); ?></p>
				<p class="ts-field-description"><?php _e('You can create and edit templates.', L_THEME_NAME); ?></p>
				
				<div class="ts-layouts-list-conteiner">
					<div class="ts-ajax-overflow-loader"><div class="ts-ajax-loader-icon"></div></div>
					<div id="ts-layouts-list"></div>
				</div>
				
			</div>
			
			<div class="ts-buttons-bottom-sticky">

				<div class="ts-code-status-output">
					<div class="ts-code-status-conteiner"></div>
					<div class="clear"></div>
				</div>
				
				<div class="ts-layouts-buttons">
					<button class="ts-btn ts-modal-new-layout"><span class="bi bi-plus-circle"></span><?php _e('Create', L_THEME_NAME); ?></button>
					<button class="ts-btn ts-modal-import-layout ts-btn-b1"><span class="bi bi-arrow-bar-up"></span><?php _e('Import', L_THEME_NAME); ?></button>
				</div>
			
			</div>
			
		</div>

		<div id="ts-item-builder-layout" class="ts-template-item" style="display: none;">

			<div class="ts-item-layout-settings">
			
				<div class="ts-layout-name-block ts-b-input">
					<span class="ts-set-layout-label"><?php _e('Name', L_THEME_NAME); ?></span>
					<input type="text" class="ts-input ts-i-focus-el ts-layout-name" id="ts-layout-name" value="" disabled />
					<button class="ts-btn ts-btn-label-input bi bi-pencil" data-input-id="ts-layout-name"></button>
					<button class="ts-btn ts-btn-label-input-ok bi bi-check-lg"></button>
				</div>
				
				<div class="ts-layout-options">
					<div class="ts-layout-active">
						<span class="ts-set-layout-label"><?php _e('Active', L_THEME_NAME); ?></span>
						<span class="btn_toggle_switch"><label class="ts-switch"><input class="ts-layout-active-btn" type="checkbox" value="Layout-active" name="Layout-active"><span class="ts-switch-slider ts-round"></span></label></span>
					</div>
					<div class="ts-layout-export">
						<span class="ts-set-layout-label"><?php _e('Export', L_THEME_NAME); ?></span>
						<button class="ts-btn ts-export-layout ts-btn-b1"><span class="bi bi-arrow-bar-down"></span></button>
					</div>
					
					<div class="clear"></div>
				</div>
				
				<div class="clear"></div>
			
			</div>
			
			<div class="ts-layout-sections-conteiner">
				
				<div class="ts-ajax-overflow-loader"><div class="ts-ajax-loader-icon"></div></div>
				
				<div class="ts-layout-section" id="ts-item-top-layout" data-section="top">
					<p class="ts-item-layout-title"><?php _e('Top', L_THEME_NAME); ?></p>
					<div class="ts-draggable-area ts-builders-area-for-columns ts-row">
					</div>
				</div>
				<div class="ts-layout-section" id="ts-item-main-layout" data-section="main">
					<p class="ts-item-layout-title"><?php _e('Main', L_THEME_NAME); ?></p>
					<div class="ts-draggable-area ts-builders-area-for-columns ts-row">
					</div>
				</div>
				<div class="ts-layout-section" id="ts-item-bottom-layout" data-section="bottom">
					<p class="ts-item-layout-title"><?php _e('Bottom', L_THEME_NAME); ?></p>
					<div class="ts-draggable-area ts-builders-area-for-columns ts-row">
					</div>
				</div>
			
			</div>



			<div class="ts-buttons-bottom-sticky">

				<div class="ts-code-status-output">
					<div class="ts-code-status-conteiner"></div>
					<div class="clear"></div>
				</div>


				<div class="ts-btn-layout-buttons-bottom ts-layout-buttons-edit">
					<div class="ts-btn-back-to-list">
						<button class="ts-back-to-list ts-link-btn"><span class="bi bi-arrow-return-left"></span><?php _e('Back to the list', L_THEME_NAME); ?></button>
					</div>			
					
					<div class="ts-btn-save-layout">
						<button class="ts-btn ts-save-layout"><?php _e('Save layout', L_THEME_NAME); ?></button>
					</div>
				</div>

			</div>
			
		</div>


		<div class="ts-modal ts-modal-create-layout-popup" style="display:none;">
			<div class="ts-modal-settings-col-overlay"></div>
			<div class="ts-popup">
				<div class="ts-popup-top">
					<div class="ts-modal-title">
						<span><?php _e('Create a new layout', L_THEME_NAME); ?></span>
					</div>
					<div class="ts-modal-close">
						<span class="bi bi-x-square"></span>
					</div>
					<div class="clear"></div>
				</div>
				<div class="ts-popup-area">
					<div class="ts-popup-setting">
						<label><?php _e('Enter a name for your new layout', L_THEME_NAME); ?></label>
						<input type="text" class="ts-input ts-new-layout-name ts-keyup-verification" value="" placeholder="<?php _e('Layout name', L_THEME_NAME); ?>" data-keyup-verification="ts-create-layout">
					</div>
				</div>
				<div class="ts-popup-bottom">
					<div class="ts-popup-action">
						<button class="ts-btn ts-create-layout" disabled><?php _e('Create', L_THEME_NAME); ?></button>
					</div>
				</div>
			</div>
		</div>

		<div class="ts-modal ts-modal-import-layout-popup" style="display:none;">
			<div class="ts-modal-settings-col-overlay"></div>
			<div class="ts-popup">
				<div class="ts-popup-top">
					<div class="ts-modal-title">
						<span><?php _e('Import layout', L_THEME_NAME); ?></span>
					</div>
					<div class="ts-modal-close">
						<span class="bi bi-x-square"></span>
					</div>
					<div class="clear"></div>
				</div>
				<div class="ts-popup-area">
					<div class="ts-popup-setting">
						<label><?php _e('Enter a name for your new layout', L_THEME_NAME); ?></label>
						<textarea class="ts-import-layout-text ts-keyup-verification" data-keyup-verification="ts-import-layout"></textarea>
					</div>
				</div>
				<div class="ts-popup-bottom">
					<div class="ts-popup-action">
						<button class="ts-btn ts-import-layout ts-btn-b1" disabled=""><?php _e('Import', L_THEME_NAME); ?></button>
					</div>
				</div>
			</div>
		</div>

		<div class="ts-modal ts-modal-export-layout-popup" style="display:none;">
			<div class="ts-modal-settings-col-overlay"></div>
			<div class="ts-popup">
				<div class="ts-popup-top">
					<div class="ts-modal-title">
						<span><?php _e('Export layout', L_THEME_NAME); ?></span>
					</div>
					<div class="ts-modal-close">
						<span class="bi bi-x-square"></span>
					</div>
					<div class="clear"></div>
				</div>
				<div class="ts-popup-area">
					<div class="ts-popup-setting">
						<label><?php _e('Сopy layout code', L_THEME_NAME); ?></label>
						<textarea class="ts-export-layout-text"></textarea>
					</div>
				</div>
				<div class="ts-popup-bottom">
					<div class="ts-popup-action">
					</div>
				</div>
			</div>
		</div>

		<div id="ts-modal-settings-col-popup" class="ts-modal" style="display:none;">
			<div class="ts-modal-settings-col-overlay"></div>
			<div class="ts-popup">
						
				<div class="ts-popup-top">
					<div class="ts-modal-title">
						<span><?php _e('Block settings', L_THEME_NAME); ?></span>
					</div>
						<div class="ts-modal-close">
							<span class="bi bi-x-square"></span>
						</div>
					<div class="clear"></div>
				</div>
				
				<div class="ts-popup-area">
				
				<div class="ts-popup-setting">	
				
					<div class="ts-col-editor-field ts-field-text class-set-colum row">
						
						<div class="ts-popup-setting-col-6">
							<div class="ts-custom_name">
								<label for="ts-custom_class"><?php _e('Name', L_THEME_NAME); ?></label>
								<input type="text" class="ts-input" id="ts-block-name" value="" autocomplete="off">
								<p class="ts-field-description">
									<?php _e('You can add your custom name.', L_THEME_NAME); ?>
								</p>
							</div>
						</div>
						
						<div class="ts-popup-setting-col-6">
							<div class="ts-custom_css">
								<label for="ts-custom_class"><?php _e('Custom CSS Class', L_THEME_NAME); ?></label>
								<input type="text" class="ts-input" id="ts-block-custom_class" value="" autocomplete="off">
								<p class="ts-field-description">
									<?php _e('You can add your custom classes or classes from libraries (bootstrap).', L_THEME_NAME); ?>
								</p>
							</div>
						</div>

						<div class="clear"></div>
						
					</div>
					
					<div class="ts-col-editor-field ts-field-text class-set-colum row">

						<div class="ts-popup-setting-col-12">
							<div class="ts-setting-col-inline ts-default_width">
								<label for="ts-default_width"><?php _e('Bootstrap default width', L_THEME_NAME); ?></label>
								<p class="ts-field-select">
									<span>col -</span>
									<select id="ts-block-default_width" class="ts-input" name="default_width">
										<?php
											for($i=1; $i<=12; $i++){
												echo '<option value="' . $i . '">' . $i . '</option>';
											}
										?>
									</select>
									<span><?php _e('of', L_THEME_NAME); ?> 12</span>
								</p>
								<p class="ts-field-description">
									<?php _e('This is the default column (bootstrap) width, which is set on the page if there is no other value. It also shows visualization on the admin page.', L_THEME_NAME); ?>
								</p>
							</div>
						</div>

						<div class="clear"></div>
					
					</div>
					
					<div class="ts-col-editor-field row">

						<div class="clear"></div>
		
						<div class="ts-sub-col-editor-field ts-field-textarea col-12">	
							<label for="ts-html_content"><?php _e('HTML editor', L_THEME_NAME); ?></label>
							<?php 
								wp_editor( '', 'ts-block-html_content', array(
									'wpautop'       => 1,
									'media_buttons' => 0,
									'textarea_name' => 'ts-block-html_content',
									'textarea_rows' => 4,
									'tabindex'      => null,
									'editor_css'    => '',
									'editor_class'  => '',
									'teeny'         => 1,
									'dfw'           => 0,
									'tinymce'       => 0,
									'quicktags'     => array(
										'id' => 'ts-block-html_content',
										'buttons' => 'strong,em,link,block,del,ins,img,ul,ol,li,code,more,close,fullscreen'
										),
									'drag_drop_upload' => false
								) );
							?>
							
							<p class="ts-field-description">
								<?php _e('You can add your custom classes or classes from libraries (bootstrap).', L_THEME_NAME); ?>
							</p>
							
						</div>
					
					</div>


				</div>
				
				<div class="ts-popup-bottom">
					<div class="ts-popup-action">
						<button id="ts-save-col-template" class="ts-btn save-col"><?php _e('Save', L_THEME_NAME); ?></button>
					</div>
				</div>
					
				</div>
			</div>
		</div>

	</div>
	
</div>
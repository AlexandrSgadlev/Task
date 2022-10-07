/**
 * Сontrol the construction of templates
 * @package WordPress
*/


class Box{


	debug = true;

	startTime = 0;
	
    Initialization(){

		this.FunctionPerformance('start', 'Initialization');

		// Variable main
		this.item_builder_layout = document.getElementById("ts-item-builder-layout");
		this.layouts_list = document.getElementById("ts-layouts-list");
		this.layouts_block = document.getElementById("ts-layouts");		

		this.modal_settings_popup = document.getElementById("ts-modal-settings-col-popup");
		this.layout_active_btn = document.querySelector('.ts-layout-active-btn');


		// Variable layout builder
		this.input_layout_name = document.querySelector('.ts-item-layout-settings .ts-layout-name');
		// Back to the list 
		const btns_back_to_list = document.querySelectorAll('.ts-back-to-list');
		for (var i = 0; i < btns_back_to_list.length; i++) {
			btns_back_to_list[i].addEventListener('click', event => {
				event.preventDefault();

				const url = new URL(window.location.href);
				if(url.searchParams.get('layout')){
					url.searchParams.delete('layout');
					window.history.pushState('','', url.href);
				}
				this.ShowListLayouts(json_layouts['layouts']);
				this.layouts_block.style.display = 'block';
				this.item_builder_layout.style.display = 'none';								
			});
		}	

		// Save layout
		const btns_save_layout = document.querySelectorAll('.ts-save-layout');
		for (var i = 0; i < btns_save_layout.length; i++) {
			btns_save_layout[i].addEventListener('click', event => {
				event.preventDefault();
				let s = {};
				s.target = event.target;
				let ajax_json_layouts = json_layouts;
				s.function_call = 'save-layout';
				this.UpdateLayouts(ajax_json_layouts, s);		
			});		
		}
	
		// Layout name
		const btn_input = document.querySelectorAll('.ts-btn-label-input');
		for (var i = 0; i < btn_input.length; i++) {
			btn_input[i].addEventListener('click', event => {
				var el = document.getElementById((event.target).dataset.inputId);
				if( el ){
					if(el.disabled == true ){
						el.disabled = false;
						el.focus();
					}
				}
			}, true);
		}
		const i_focus_el = document.querySelectorAll('.ts-i-focus-el');
		for (var i = 0; i < i_focus_el.length; i++) {
			i_focus_el[i].addEventListener('blur', (event) => {
				event.target.disabled = true;
				
				if(json_layouts['layouts'][this.item_builder_layout.dataset.layout_key]){
					json_layouts['layouts'][this.item_builder_layout.dataset.layout_key]['name'] = event.target.value;
				}else{
					let errore = {}; errore.type = 'element_missing'; errore.code = 1; this.ErroreFunction(errore);
				}
				
				/*
				let s = {};				
				s.curent_layout = this.item_builder_layout.dataset.layout_key;
				s.function_call = 'name-layout';				
				let ajax_json_layouts = json_layouts;
			
				if(ajax_json_layouts['layouts'][this.item_builder_layout.dataset.layout_key]){
					ajax_json_layouts['layouts'][this.item_builder_layout.dataset.layout_key]['name'] = event.target.value;
					this.UpdateLayouts(ajax_json_layouts, s);
				}else{
					let errore = {}; errore.type = 'element_missing'; errore.code = 1; this.ErroreFunction(errore);
				}
				*/
			}, false);	
		}	

		
		// Layout active 
		if(this.layout_active_btn){
			this.layout_active_btn.addEventListener('click', (event) => {
				event.preventDefault();
				let s = {};
				s.target = event.target;
				let ajax_json_layouts = json_layouts;
				if(event.target.checked){
					ajax_json_layouts['layout_active'] = this.item_builder_layout.dataset.layout_key;
				}else{
					ajax_json_layouts['layout_active'] = 'basic';
				}
				s.function_call = 'active-layout';
				this.UpdateLayouts(ajax_json_layouts, s);
				return;
			});
		}		

		// Export layout
		const export_layout_modal = document.querySelector(".ts-export-layout");
		const modal_export_layout = document.querySelector(".ts-modal-export-layout-popup");
		const export_layout_text = document.querySelector(".ts-export-layout-text");
		if( export_layout_modal && modal_export_layout && export_layout_text ){
			export_layout_modal.addEventListener('click', event => {
				export_layout_text.value = '';
				export_layout_text.value = JSON.stringify(json_layouts['layouts'][this.item_builder_layout.dataset.layout_key]);
				this.PopupDisplay(modal_export_layout,'open');
				export_layout_text.focus();
				export_layout_text.select();
				
			});
		}else{
			let errore = {}; errore.type = 'element_missing'; errore.code = 2; this.ErroreFunction(errore);
		}		
		
		

		// New layout
		const new_layout_modal = document.querySelector('.ts-modal-new-layout');
		const modal_create_layout = document.querySelector(".ts-modal-create-layout-popup");
		const new_layout_name = document.querySelector(".ts-new-layout-name");
		const new_layout_btn = document.querySelector('.ts-create-layout');
		if( new_layout_modal && modal_create_layout && new_layout_name && new_layout_btn ){
			new_layout_modal.addEventListener('click', event => {
				new_layout_name.value = "";
				new_layout_btn.disabled = true;
				this.PopupDisplay(modal_create_layout,'open');
			});
			new_layout_btn.addEventListener('click', event => {
				var s = {};
				s.function_call = 'new-layout';
				s.target = new_layout_name.value;
				var new_layout = {};
				new_layout.name = new_layout_name.value;
				let ajax_json_layouts = json_layouts;
				ajax_json_layouts['layouts']['new'] = new_layout;
				this.UpdateLayouts(ajax_json_layouts, s);
				this.PopupDisplay(modal_create_layout,'close');
			});			
		}else{
			let errore = {}; errore.type = 'element_missing'; errore.code = 3; this.ErroreFunction(errore);
		}

		// Import layout
		const import_layout_modal = document.querySelector(".ts-modal-import-layout");
		const modal_import_layout = document.querySelector(".ts-modal-import-layout-popup");
		const import_layout_btn = document.querySelector(".ts-import-layout");
		const import_layout_text = document.querySelector(".ts-import-layout-text");
		if( import_layout_modal && modal_import_layout && import_layout_btn && import_layout_text ){
			import_layout_modal.addEventListener('click', event => {
				import_layout_text.value = '';
				import_layout_btn.disabled = true;
				this.PopupDisplay(modal_import_layout,'open');
			});
			import_layout_btn.addEventListener('click', event => {
				var s = {};
				s.function_call = 'import-layout';
				s.target = import_layout_text.value;
				var new_layout = {};
				new_layout.name = new_layout_name.value;
				let ajax_json_layouts = json_layouts;
				
				// Проверка JSON.parse
				try {
					JSON.parse(import_layout_text.value);
				} catch (e) {
					console.log('errore');
					this.PopupDisplay(modal_import_layout,'close');
					return
				}				
				ajax_json_layouts['layouts']['new'] = JSON.parse(import_layout_text.value);
				this.UpdateLayouts(ajax_json_layouts, s);
				this.PopupDisplay(modal_import_layout,'close');
				

			});	
		}else{
			let errore = {}; errore.type = 'element_missing'; errore.code = 4; this.ErroreFunction(errore);
		}

		// Verification input keyup
		const input_keyup = document.querySelectorAll('.ts-keyup-verification');
		for (var i = 0; i < input_keyup.length; i++) {
			input_keyup[i].addEventListener('keyup', event => {
				var btn = document.querySelector('.' + event.target.dataset.keyupVerification);
				if(btn){
					if(event.target.value.length > 0){ 
						btn.disabled = false; 
					} else { 
						btn.disabled = true;
					}
				}
			});
		}
			
			
		// URL
		let urlParams = new URLSearchParams(window.location.search);
		let layout = urlParams.get('layout');	
		
		
		if( !this.item_builder_layout || !this.layouts_block || !this.layouts_list ){
			let errore = {}; errore.type = 'element_missing'; errore.code = 5; this.ErroreFunction(errore);
			return;
		}


		if (layout) {
			// Edit layout
			if(json_layouts['layouts'][layout] !== undefined){
				this.LayoutBuilder(json_layouts['layouts'][layout] , layout);
			}
			this.item_builder_layout.style.display = 'block';
		}else{
			// Layout list
			this.ShowListLayouts(json_layouts['layouts']);
			this.layouts_block.style.display = 'block';
		}


		// Modal close
		const modal_close = document.querySelectorAll('.ts-modal .ts-modal-close');
		for (var i = 0; i < modal_close.length; i++) {
			modal_close[i].addEventListener('click', event => {
				this.PopupDisplay((event.target).closest('.ts-modal'),'close');
			});
		}
		
		
		this.FunctionPerformance('end', 'Initialization');
		
    }



	ShowListLayouts(layouts){


		this.layouts_list.innerHTML = "";
		
		var layouts_array = document.createElement('div');

		Object.keys(layouts).forEach(layout => {
			
			layouts_array.appendChild(this.ShowLayout(layout, layouts));
			
		});
		
		this.layouts_list.innerHTML = layouts_array.innerHTML;
		
		if(document.querySelector(".ts-layout-" + json_layouts['layout_active'] + " .ts-item-active-btn")){
			document.querySelector(".ts-layout-" + json_layouts['layout_active'] + " .ts-item-active-btn").checked = true;
		}

		this.UpdateLayoutBtn();
	}

	ShowLayout(layout, layouts){

		var layout_div, list_buttons, layout_name, layout_btn, list_buttons;
	
		layout_div = document.createElement('div');
		layout_div.dataset.layout_key = layouts[layout]['id'];
		layout_div.className += 'ts-layout-item';
		layout_div.className += ' ts-layout-' + layouts[layout]['id'];

		layout_name = document.createElement('div');
		layout_name.className += 'ts-layout-item-name';	
		layout_name.innerHTML = '<a class="ts-link-btn ts-item-edit-btn" href="' + window.location + '&layout=' + layouts[layout]['id'] + '">' + layouts[layout]['name'] + '</a>';

		layout_btn = document.createElement('div');
		layout_btn.className += 'ts-layout-item-buttons';	

		list_buttons = '';
		list_buttons += '<a class="ts-item-edit-btn ts-link-btn bi-gear-fill" href="' + window.location + '&layout=' + layouts[layout]['id'] + '"></a>';
		list_buttons += '<span class="btn_toggle_switch"><label class="ts-switch"><input class="ts-item-active-btn" type="radio" value="' + layouts[layout]['name'] + '" name="active_layout"><span class="ts-switch-slider ts-round"></span></label></span>';

		if(layouts[layout]['id'] != "basic"){
			list_buttons += '<button class="ts-item-remove-btn ts-link-btn ts-link-btn-remove bi-trash-fill" href="#/' + layouts[layout]['id'] + '"></button>';										
		}		
		
		layout_btn.innerHTML = list_buttons; 
		
		layout_div.appendChild(layout_name);
		layout_div.appendChild(layout_btn);	

		if(layouts[layout]['id'] == json_layouts['layout_active']){
			layout_div.className += ' ts-active';
			layout_btn.querySelector(".ts-switch .ts-item-active-btn").checked = true; //active = 'checked';
		}

		return layout_div;
			
	}
	
	UpdateLayoutBtn(){
		var btns = document.querySelectorAll('.ts-layout-item .ts-link-btn, .ts-layout-item .ts-item-active-btn');
		for (var i = 0; i < btns.length; i++) {
			btns[i].addEventListener('click', this.UpdateLayoutBtnFunc, false);
			btns[i].class_function_name = this;
		}
	}

	UpdateLayoutBtnFunc(evt){
		
		event.preventDefault();

		var target = evt.target;
		var class_name = evt.currentTarget.class_function_name;
		

		let layout_item = target.closest('.ts-layout-item');

		if( !layout_item ){
			if( class_name.debug ) console.log('Elements for the layout of the designer are missing on the page (Update Layout Btn Func)');
		}
		
		let s = {};
		s.target = layout_item;

		let ajax_json_layouts = json_layouts;

		if(((target.className).indexOf('ts-item-active-btn')) != -1){
			if(((layout_item.className).indexOf('ts-active')) != -1){
				target.checked = true;
				return;
			}
			ajax_json_layouts['layout_active'] = layout_item.dataset.layout_key;
			s.function_call = 'active-layout';
			class_name.UpdateLayouts(ajax_json_layouts, s);
			return;
		}

		if(((target.className).indexOf('ts-item-remove-btn')) != -1){
			if( class_name.Confirm() === false ) {
				target.blur();
				return;
			}
			if(json_layouts['layouts'][(layout_item.dataset.layout_key)] !== undefined){
				s.curent_layout = layout_item.dataset.layout_key;
				delete ajax_json_layouts['layouts'][(layout_item.dataset.layout_key)];	
				s.function_call = 'remove-layout';
				class_name.UpdateLayouts(ajax_json_layouts, s);
				return;
			}
		}						

		if(((target.className).indexOf('ts-item-edit-btn')) != -1){
			s.function_call = 'edit-layout';
			if(json_layouts['layouts'][(layout_item.dataset.layout_key)] !== undefined){
				class_name.LayoutBuilder(json_layouts['layouts'][(layout_item.dataset.layout_key)] , [(layout_item.dataset.layout_key)]);
				window.history.pushState('','', ( window.location.href + '&layout=' + layout_item.dataset.layout_key ));
			}		
			return;
		}

	}



	LayoutBuilder(layout, layout_key){
		
		this.item_builder_layout.dataset.layout_key = layout_key;
		this.item_builder_layout.className = 'ts-template-item ts-layout-' + layout['id'];
		
		//this.layout_builder = json_layouts['layouts'][layout['id']];
		
		if(layout['id'] == json_layouts['layout_active']){
			if(this.layout_active_btn) this.layout_active_btn.checked = true;
		}else{
			if(this.layout_active_btn) this.layout_active_btn.checked = false;
		}
		
		if(this.input_layout_name) this.input_layout_name.value = layout['name'];

		var sections = ['top', 'main', 'bottom'];
		this.DisplaySections(sections);
		
		this.layouts_block.style.display = 'none';
		this.item_builder_layout.style.display = 'block';

		this.UpdateSectionsBtnFunc();		
	}

	DisplaySections(sections){

		let layout = json_layouts['layouts'][this.item_builder_layout.dataset.layout_key];
		
		for (var l = 0; l < sections.length; l++) {

			var field_columns = document.createElement("div");

			if(layout[sections[l]] ){
				var layout_col_arr = layout[sections[l]];
				
				for (var  i = 0; i < layout_col_arr.length; i++) {
					
					var field_column = document.createElement("div");
					
					if(layout_col_arr[i]['default_width']){
						field_column.className = "ts-draggable-field ts-field-column col-" + layout_col_arr[i]['default_width'];
					}else{
						field_column.className = "ts-draggable-field ts-field-column col-4";
					}
					
					field_column.dataset.name = layout_col_arr[i]['name'];
					field_column.dataset.position = i;
					field_column.dataset.section = sections[l];
					
					var name_item = '<div class="ts-c-field"><span class="ts-name-item-draggable">' + layout_col_arr[i]['name'] + '</span>';
					name_item += '<span class="ts-btn-col ts-link-btn ts-edit-col bi"></span><span class="ts-btn-col ts-remove-col ts-link-btn ts-link-btn-remove bi"></span></div>';

					field_column.innerHTML = name_item;
					field_columns.append(field_column);
				}
				
			}

			var add_item = document.createElement("div");
			add_item.className = "ts-btn ts-add-item ts-btn-b2 ts-col-1 bi bi-plus-lg";
			add_item.dataset.section = sections[l];
			
			
			field_columns.append(add_item);
			document.querySelector('#ts-item-' + sections[l] + '-layout .ts-draggable-area').innerHTML = field_columns.innerHTML;

		}

	}

	UpdateSectionsBtnFunc(){
		
		const removeElements = document.querySelectorAll('.ts-builders-area-for-columns .ts-remove-col');
		for (var i = 0; i < removeElements.length; i++) {
			removeElements[i].addEventListener('click', event => {
				this.RemoveColElements(event.target);
			});
		}
		
		const modal_settings_elements = document.querySelectorAll('.ts-builders-area-for-columns .ts-add-item, .ts-builders-area-for-columns .ts-edit-col');
		for (var i = 0; i < modal_settings_elements.length; i++) {
			modal_settings_elements[i].addEventListener('click', event => {
				this.SettingsColElements(event.target);
			});
		}

		document.querySelector('#ts-modal-settings-col-popup .save-col').addEventListener('click', event => {
			this.SaveColElements(event.target);
		});

		this.DivDragDropSections();
		const tasksListElement = document.querySelectorAll('div.ts-draggable-field');
		for (var i = 0; i < tasksListElement.length; i++) {
			this.UpdateSectionsDragE(tasksListElement[i]);
		};

	}

	
	UpdateSectionsDragE(el){
		
		let currentDroppable = null;
		el.class_name = this;
		el.addEventListener("mousedown", Mouse_Down_Droppable);

		function Mouse_Down_Droppable(){
			switch (event.which) {
				case 1:
				if((((event.target).className).indexOf('ts-btn-col')) != -1 ){
					return;
				}
				if(document.querySelector('.ts-active-selected-draggable')){
					return;
				}
				if(currentDroppable == true){
					return;
				}
				
				currentDroppable = true;
				
				var el_draggable = el.cloneNode(true);


				el_draggable.style.width = el.offsetWidth+'px';


				document.addEventListener('mouseup', On_Mouse_Up_Droppable);
				el_draggable.style.position = 'absolute';
				el_draggable.style.zIndex = 1000000;
				el_draggable.style.cursor = 'not-allowed';
				el_draggable.className += ' ts-active-selected-draggable';

				if(((el.className).indexOf('ts-selected')) == -1){
					el.className = el.className + ' ts-selected';
				}
				
				if(((document.body.className).indexOf('ts-draggable')) == -1){
					document.body.className = document.body.className + ' ts-draggable';
				}
				
				el.class_name.item_builder_layout.className = el.class_name.item_builder_layout.className + ' ts-drag-a';
				
				let shiftX = event.clientX - el.getBoundingClientRect().left;
				let shiftY = event.clientY - el.getBoundingClientRect().top;
				document.body.append(el_draggable);

				moveAt(event.pageX, event.pageY);
				
				function moveAt(pageX, pageY) {
					el_draggable.style.left = pageX - shiftX + 'px';
					el_draggable.style.top = pageY - shiftY + 'px';
				}

				function onMouseMove(event) {
					moveAt(event.pageX, event.pageY);

					el_draggable.hidden = true;
					let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
					el_draggable.hidden = false;

					if(elemBelow == null){
						Drop_El(el);
						return;
					};

					if (!elemBelow) {return};


					// If draggable field
					var e;
					if(((elemBelow.className).indexOf('ts-draggable-field')) != -1){
						e = elemBelow;
					}else{
						e = elemBelow.closest('.ts-draggable-field');
					}

					// If el not ts-draggable-field
					if (!e || e === null){
						el_draggable.style.cursor = 'not-allowed';
						H_Drop_Area();
						return;
					}
					
					// If el selected
					if(((e.className).indexOf('ts-selected')) != -1){
						if(document.querySelector('.ts-div-drop')){
							H_Drop_Area();
						}
						return;
					}
					
					
					if(((e.className).indexOf('ts-show-drop-a')) == -1){
						S_Drop_Area(el, e);
					}

					if(((elemBelow.className).indexOf('ts-div-drop')) != -1){
						elemBelow.className += ' ts-div-drop-hover';
						el_draggable.style.cursor = 'move';
					}else{
						var div_arr = document.querySelectorAll('.ts-div-drop');
						for (var i = 0; i < div_arr.length; i++){
							div_arr[i].className = div_arr[i].className.replace(/\ ts-div-drop-hover\b/,'');
						}
						el_draggable.style.cursor = 'not-allowed';
					}


				}


				function S_Drop_Area(activeElement, currentElement){

					if(((currentElement.className).indexOf('ts-div-drop-row')) != -1){
						return;
					}

					var curElementclass = ' ts-show-drop-a';
					
					var div_l = document.createElement("div");
					div_l.className = 'ts-div-drop ts-div-drop-1 ts-div-drop-l bi bi-box-arrow-in-left';
					var div_r = document.createElement("div");
					div_r.className = 'ts-div-drop ts-div-drop-1 ts-div-drop-r bi bi-box-arrow-in-right';
					
					if( activeElement.previousElementSibling === currentElement){
						curElementclass += ' ts-show-drop-l';
						currentElement.insertBefore(div_l, currentElement.querySelector('.ts-c-field' ));
					}
					if( activeElement.nextElementSibling === currentElement){
						curElementclass += ' ts-show-drop-r';
						currentElement.appendChild(div_r);
					}
					if( activeElement.previousElementSibling !== currentElement && activeElement.nextElementSibling !== currentElement ){
						curElementclass += ' ts-show-drop-l';
						curElementclass += ' ts-show-drop-r';
						currentElement.insertBefore(div_l, currentElement.querySelector('.ts-c-field' ));
						currentElement.appendChild(div_r);
					}
					currentElement.className += curElementclass;

				}

				function H_Drop_Area(){
					var div_arr = document.querySelectorAll('.ts-div-drop-1');
					for (var i = 0; i < div_arr.length; i++) {
						div_arr[i].remove();
					}
					var drop_e = document.querySelectorAll('.ts-show-drop-a');
					for (var i = 0; i < drop_e.length; i++){
						drop_e[i].className = drop_e[i].className.replace(/\ ts-show-drop-a\b/,'');
						drop_e[i].className = drop_e[i].className.replace(/\ ts-show-drop-l\b/,'');
						drop_e[i].className = drop_e[i].className.replace(/\ ts-show-drop-r\b/,'');
					}
					var drop_h = document.querySelectorAll('.ts-div-drop-hover');
					for (var i = 0; i < drop_h.length; i++){
						drop_h[i].className = drop_h[i].className.replace(/\ ts-div-drop-hover\b/,'');
					}
				}
				
				function Drop_El(el){
					
					el.class_name.item_builder_layout.className = el.class_name.item_builder_layout.className.replace(/\ ts-drag-a\b/,'');
					el.className = el.className.replace(/\ ts-selected\b/,'');

					document.body.className = document.body.className.replace(/\ ts-draggable\b/,'');
					
					el_draggable.style.cursor = 'default';
					el_draggable.onmouseup = null;
					el_draggable.remove();
					document.removeEventListener('mousemove', onMouseMove);
					
					document.removeEventListener('mouseup', On_Mouse_Up_Droppable);
					
					(el.class_name).DivDragDropSections();
					(el.class_name).SetColPosition();

					currentDroppable = null;

					return;
					
				}
				

				document.addEventListener('mousemove', onMouseMove);

				function On_Mouse_Up_Droppable(e){
									
					var drop_h = document.querySelector('.ts-div-drop-hover');

					let s = el.class_name.GetSettingCurCol(el);

					if(drop_h){
						
						var nextElement = drop_h.closest('.ts-draggable-field');
						var activeElement = el;
						
						if( (((drop_h.className).indexOf('ts-div-drop-l')) != -1) || (((nextElement.className).indexOf('ts-div-drop-row')) != -1) ){
							(nextElement.closest('.ts-draggable-area')).insertBefore(activeElement, nextElement);
						}
						if(((drop_h.className).indexOf('ts-div-drop-r')) != -1){
							nextElement.after(activeElement);
						}

					}
					
					

					
					H_Drop_Area();
					
					Drop_El(el);

					if(s){

						var cur_col_jsone = {};
						for (let key in json_layouts['layouts'][s.key][s.section][s.pos]) {
							cur_col_jsone[key] = json_layouts['layouts'][s.key][s.section][s.pos][key];
						}
						json_layouts['layouts'][s.key][s.section].splice([s.pos], 1);

						var k = el.class_name.GetSettingCurCol(activeElement);

						if (k === false) { return; }

						if(json_layouts['layouts'][k.key][k.section][k.pos]){
					
							var cur_s_jsone = [];
							let key;
							var i = 0;
							
							for (key in json_layouts['layouts'][k.key][k.section]) {

								if(k.pos == key){
									cur_s_jsone[i] = cur_col_jsone;
									i++;
									cur_s_jsone[i] = json_layouts['layouts'][k.key][k.section][key];
								}else{
									cur_s_jsone[i] = json_layouts['layouts'][k.key][k.section][key];
								}
								i++;
							}
							
							json_layouts['layouts'][k.key][k.section] = cur_s_jsone;

						}else{
							json_layouts['layouts'][k.key][k.section][k.pos] = cur_col_jsone;
						}

					}					
					
					
					return;

				};


			}
			

			
			

		};

	}
	
	DivDragDropSections(){
		var sections = ['top', 'main', 'bottom'];
		for (var l = 0; l < sections.length; l++) {
			var i_section = document.querySelector('#ts-item-' + sections[l] + '-layout');
			var i_arr = i_section.querySelectorAll('.ts-draggable-field');
			if( i_arr.length <= 0 ){
				var d = document.createElement("div");
				d.className = 'ts-draggable-field ts-field-column ts-div-drop-row';
				d.draggable = true;
				var div_l = document.createElement("div");
				div_l.className = 'ts-div-drop bi bi-box-arrow-in-right';
				d.appendChild(div_l);
				var draggable = document.querySelector('#ts-item-' + sections[l] + '-layout .ts-draggable-area');
				draggable.insertBefore(d, draggable.querySelector('.ts-btn' ));
				this.UpdateSectionsDragE(d);
			}else{
				if( i_arr.length != 2 ){
					continue;
				}
				for (var k = 0; k < i_arr.length; k++) {
					if( ((i_arr[k]).className.indexOf('ts-draggable-field')) != -1 ){
						if(i_section.querySelector('.ts-div-drop-row')){
							i_section.querySelector('.ts-div-drop-row').remove();
						}	
						continue;
					}
				}
		
			}
		}
	}
	
	SetColPosition(){
		var sections = ['top', 'main', 'bottom'];
		for (var i = 0; i < sections.length; i++) {
			var field = document.querySelectorAll('#ts-item-' + sections[i] + '-layout .ts-draggable-field');
			for (var l = 0; l < field.length; l++) {
				field[l].dataset.position = l;
				field[l].dataset.section = sections[i];
			}
		}
				
	}

	GetSettingCurCol(e) {

		if (!e) {
			return false;
		}

		var s = {};	
		if ( !(e.classList.contains("ts-add-item")) ) {

			s.name = e.closest('.ts-draggable-field').dataset.name;
			s.pos = e.closest('.ts-draggable-field').dataset.position;			
		}else{
			s.pos = ((e.closest('.ts-draggable-area')).querySelectorAll('div.ts-draggable-field').length);		
		}
		s.section = e.closest('.ts-layout-section').dataset.section;
		s.key = this.item_builder_layout.dataset.layout_key;	
		return s;		
	}

	RemoveColElements(e){
		if( this.Confirm() === false ) {
			target.blur();
			return;
		}
		var s = this.GetSettingCurCol(e);
		if(json_layouts['layouts'][s.key][s.section][s.pos]){
			json_layouts['layouts'][s.key][s.section].splice([s.pos], 1);
			e.closest('.ts-draggable-field').remove();
			this.SetColPosition();
		}
	}

	SettingsColElements(e){
		// Setting col
		var s = this.GetSettingCurCol(e);	
		var cur_col_jsone = json_layouts['layouts'][s.key][s.section][s.pos];

		var variable = ['name', 'default_width', 'custom_class', 'html_content'];

		for (var l = 0; l < variable.length; l++) {
			var el = document.getElementById('ts-block-' + variable[l]);
			if(el){
				
				var val = '';
				if(cur_col_jsone){
					if(cur_col_jsone[variable[l]]){
						val = cur_col_jsone[variable[l]];
					}
				}
				
				if(val == '' && variable[l] == 'default_width'){val = '4';}
				
				if(el.nodeName == 'INPUT' || el.nodeName == 'SELECT'){

					if(val == '' && variable[l] == 'name'){
						val = 'Block';
					}	

					el.value = val;				

				}
				if(el.nodeName == 'TEXTAREA'){
					//el.innerHTML = val;
					el.innerHTML = this.HtmlspecialcharsDecode(val);
				}
				
				
			}
		}

		var button_save = document.getElementById("ts-save-col-template");
		button_save.dataset.id = s.key;
		button_save.dataset.section = s.section;
		button_save.dataset.position = s.pos;

		this.PopupDisplay(this.modal_settings_popup,'open');

		return;
	}

	SaveColElements(e){

		var button_save = document.getElementById("ts-save-col-template");
		
		var id = button_save.dataset.id;
		var position = button_save.dataset.position;
		var section = button_save.dataset.section;	


		var variable = ['name', 'default_width', 'custom_class', 'html_content'];
		
		var obj_cur_position = {};
		
		for (var l = 0; l < variable.length; l++) {
			var el = document.getElementById('ts-block-' + variable[l]);
			
			if(el){
				var val = el.value;
				if(!val){val = '';}
				
				if(val == '' && variable[l] == 'name'){
					val = 'Block';
				}
							
				
				obj_cur_position[variable[l]] = val;			
			}
		}


		let s = {};
		
		let ajax_json_layouts = json_layouts;
		s.function_call = 'save-layout';	
		
		// If col in the array
		if(ajax_json_layouts['layouts'][id][section][position]){
			ajax_json_layouts['layouts'][id][section][position] = obj_cur_position;
			s.target = [section];
		}else{
			var arr_all_col_section = json_layouts['layouts'][id][section];	
			arr_all_col_section.push(obj_cur_position);
			ajax_json_layouts['layouts'][id][section] = arr_all_col_section;	
			s.target = [section];
		}
		

		this.PopupDisplay(this.modal_settings_popup,'close');
		this.UpdateLayouts(ajax_json_layouts, s);

	}




	HtmlspecialcharsDecode(string, quoteStyle){
		let optTemp = 0
		let i = 0
		let noquotes = false
		if (typeof quoteStyle === 'undefined') {
			quoteStyle = 2
		}
		string = string.toString()
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
		const OPTS = {
			ENT_NOQUOTES: 0,
			ENT_HTML_QUOTE_SINGLE: 1,
			ENT_HTML_QUOTE_DOUBLE: 2,
			ENT_COMPAT: 2,
			ENT_QUOTES: 3,
			ENT_IGNORE: 4
		}
		if (quoteStyle === 0) {
			noquotes = true
		}
		if (typeof quoteStyle !== 'number') {
			// Allow for a single string or an array of string flags
			quoteStyle = [].concat(quoteStyle)
			for (i = 0; i < quoteStyle.length; i++) {
				// Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
				if (OPTS[quoteStyle[i]] === 0) {
					noquotes = true
				} else if (OPTS[quoteStyle[i]]) {
					optTemp = optTemp | OPTS[quoteStyle[i]]
				}
			}
			quoteStyle = optTemp
		}
		if (quoteStyle & OPTS.ENT_HTML_QUOTE_SINGLE) {
			// PHP doesn't currently escape if more than one 0, but it should:
			string = string.replace(/&#0*39;/g, "'")
			// This would also be useful here, but not a part of PHP:
			// string = string.replace(/&apos;|&#x0*27;/g, "'");
		}
		if (!noquotes) {
			string = string.replace(/&quot;/g, '"')
		}
		// Put this in last place to avoid escape being double-decoded
		string = string.replace(/&amp;/g, '&')
		return string
	}

	PopupDisplay(e,action){
		const html = document.getElementsByTagName('html')[0];
		if(action == 'open'){
			html.style.overflow = "hidden";
			html.style.marginRight = "17px";
			e.style.display = 'flex';	
		}
		if(action == 'close'){
			html.style.overflow = "inherit";
			html.style.marginRight = "0px";	
			e.style.display = 'none';		
		}
	}

	UpdateLayouts(ajax_json_layouts, s){

		if(this.debug){
			console.log('Jsone ajax:');
			console.log(ajax_json_layouts);
		}


		this.FunctionPerformance('start', 'UpdateLayouts');
		
		var xhttp = new XMLHttpRequest();	

		const urlParams = new URLSearchParams(window.location.search);


		var query_o = {action: 'update_layouts_header_and_footer'};
		if(s.function_call){query_o.function_call = s.function_call;}
		if(urlParams.get('tab')){query_o.tab = urlParams.get('tab');}
		if(urlParams.get('layout')){
			query_o.curent_layout = urlParams.get('layout');
			s.curent_layout = urlParams.get('layout');
		}else{
			if(s.curent_layout){query_o.curent_layout = s.curent_layout;}
		}
		const querystring = new URLSearchParams(query_o);
		xhttp.open('POST', ajaxurl + '?' + querystring.toString(), true);

		xhttp.class_name = this;

		xhttp.class_name.AnimationFunction('loding', '2');

		xhttp.onreadystatechange = function () {
			if(xhttp.readyState == 4 && xhttp.status == 200){
				if(JSON.parse(xhttp.responseText)){
					if((JSON.parse(xhttp.responseText)).errore){
						let errore = {}; 
						errore.type = 'response'; 
						errore.code = 6; 
						errore.description = xhttp.responseText;
						xhttp.class_name.ErroreFunction(errore);
						xhttp.class_name.AnimationFunction('server-errore', 6);
					}else{
						var r = JSON.parse(xhttp.responseText);
						xhttp.class_name.AfterAjaxCallUpdateLayouts(r, s);
						xhttp.class_name.FunctionPerformance('end', 'UpdateLayouts');
						return;
					}
				}
			}else{
				if(xhttp.status == 404 || xhttp.status == 500 || xhttp.status == 400){
					let errore = {}; 
					errore.type = 'server'; 
					errore.code = 7; 
					xhttp.class_name.ErroreFunction(errore);
					xhttp.class_name.AnimationFunction('server-errore', 7);
				}
			}
		};

		xhttp.setRequestHeader("Content-type", "application/json");

		var data = JSON.stringify(ajax_json_layouts);

		xhttp.send(data);

	}

	AfterAjaxCallUpdateLayouts(r, s){

		json_layouts = r;
		
		if(this.debug){
			console.log('Jsone ajax response:');
			console.log(r);
		}
		
		if( s === undefined ){var s = {};}

		if( s.function_call == 'active-layout' ){
			
			if(s.curent_layout){
				if( s.target.checked ){
					s.target.checked = false;
				}else{
					s.target.checked = true;
				}
			}else{
				var layout_item_list = this.layouts_list.querySelectorAll(".ts-layout-item");
				for (var l = 0; l < layout_item_list.length; l++) {
					layout_item_list[l].className = layout_item_list[l].className.replace(/\ ts-active\b/, "");
					(layout_item_list[l].querySelector(".ts-switch .ts-item-active-btn")).checked = false;
				}
				s.target.className += ' ts-active'
				s.target.querySelector(".ts-switch .ts-item-active-btn").checked = true;
			}



		}
		
		if( s.function_call == 'remove-layout' ){
			var layout_item_list = this.layouts_list.querySelectorAll(".ts-layout-item");
			if( ((s.target.className).indexOf('ts-active')) != -1 ){
				if(layout_item_list.length){
					layout_item_list[0].className += ' ts-active';
					layout_item_list[0].querySelector(".ts-item-active-btn").checked = true;
				}
				
			}
			this.layouts_list.removeChild(s.target);
			this.UpdateLayoutBtn();
		}

		if( s.function_call == 'new-layout' || s.function_call == 'import-layout' ){
			let id = json_layouts['layouts'][Object.keys(json_layouts['layouts'])[Object.keys(json_layouts['layouts']).length - 1]]['id'];
			this.layouts_list.appendChild(this.ShowLayout(id, json_layouts['layouts']))
			this.UpdateLayoutBtn();
		}
		if( s.function_call == 'save-layout' ){
			this.DisplaySections(s.target);
			this.UpdateSectionsBtnFunc();
		}

		this.AnimationFunction('success', '1');

	}

	Confirm(){
		var x;
		if (confirm(translit_arr[3]) == true) {
			x = true;
		} else {
			x = false;
		}
		return x; 
	}

	AnimationFunction(tx, st){

		var p = document.createElement('p');
		p.className = 'ts-code-status-p ts-code-status-' + tx;
		p.innerHTML = '<span class="ts-code-status-description">' + translit_arr[st] + '</span><span class="ts-ajax-loader"></span>';
		
			
		const code_status = document.querySelectorAll('.ts-code-status-conteiner');
		for (var i = 0; i < code_status.length; i++) {

			if(st == 2){
				if(!(code_status[i].querySelector('.ts-code-status-loding'))){
					code_status[i].innerHTML = '';
					var p_l = p.cloneNode(true);
					code_status[i].appendChild(p_l);
					p.style.opacity = "1";
				}
			}else{
				if(code_status[i].querySelector('.ts-code-status-loding')){
					let prev_text = code_status[i];
					setTimeout(function(){
						prev_text.innerHTML = '';
						
						var p_l = p.cloneNode(true);
						prev_text.appendChild(p_l);
						
						setTimeout(function(){
							p_l.style.opacity = "0";
						}, 2500, p_l);

						setTimeout(function(){
							p_l.remove();
						}, 3000, p_l);
						
					}, 700, prev_text, p);
				}
			}
			

		}
		
	}



	ErroreFunction(e){
		if( this.debug ) console.log(e);
	}
	
	FunctionPerformance(q, f){
		if(!f){f = '';}
		if(!q){return;}
		if(q == 'start'){
			this.startTime = performance.now();
			return;
		}else{
			if( this.debug ){
				console.log('Call to "' + f + '" : ' + (performance.now() - this.startTime) + ' ms');
			}
			this.startTime = 0;
			return;
		}
	}

}












	










































































































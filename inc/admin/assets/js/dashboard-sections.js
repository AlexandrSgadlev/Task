/**
 * Swap sections
 * @package WordPress
*/

// Defines variables after loading document
document.addEventListener("DOMContentLoaded", function(event) { 
	// URL query
	const urlParams = new URLSearchParams(window.location.search);
	const query_tab = urlParams.get('tab');
	// Tab setting click. 
	var tab_link = document.querySelectorAll(".ts-tab-link a");
	for (var i = 0; i < tab_link.length; i++) {
		tab_link[i].addEventListener('click', event => {
			show_section(event.target);
		});
	}
	// Removes the following links from the console menu if we are in the menu section
	// Opens tab in the menu
	if(query_tab && urlParams.get('page')){
		var console_link = document.querySelectorAll("#toplevel_page_" + urlParams.get('page') + " a");
		for (var i = 0; i < console_link.length; i++) {
			console_link[i].addEventListener('click', event => {
				event.preventDefault();
				var link_query = new URLSearchParams(event.target.href);
				var link_query_tab = link_query.get('tab');
				if(document.querySelector(".ts-tab-link a.ts-active").getAttribute('data-id') != link_query_tab){
					for (var l = 0; l < tab_link.length; l++) {
						if(tab_link[l].getAttribute('data-id') == link_query_tab){
							show_section(tab_link[l]);
							var change_section = tab_link[l];
							break ;
						}
					}	
				}
			});
		}
	}
});


// Shows blocks with settings
function show_section(target) {
	var cur_active_tab_link = document.querySelector(".ts-tab-link a.ts-active");
	var sections = document.querySelectorAll(".ts-settings-section");
	if(((target.className).indexOf('ts-active')) != -1){
		return;
	}else{
		cur_active_tab_link.className = ((cur_active_tab_link.className).replace('ts-active', ''));
		for (var i = 0; i < sections.length; i++) {
			if(sections[i].getAttribute('data-id') == target.getAttribute('data-id')){
				var active_section = sections[i];
			}else{
				sections[i].className = (sections[i].className).replace(' ts-active', '');
			}
		}
		target.className = (target.className + "ts-active");
		// If the section is not found
		if(active_section !== undefined){
			active_section.className = (active_section.className + " ts-active");
		}else{
			// Launch ajax loading a tab
			dashboard_get_ajax(target.getAttribute('data-id'));
		}
	}
}


// Launch ajax loading a tab
function dashboard_get_ajax(tab) {

	const url_a = new URL(window.location.href);
	const urlParams = new URLSearchParams(url_a.search);

	var xhttp = new XMLHttpRequest();	

	urlParams.delete('layout');
	$url_l = (url_a.toString().replace(location.search, "")) + '?' + (urlParams.toString()).replace(urlParams.get('tab'), tab);


	xhttp.onreadystatechange = function () {
		if(this.readyState == 4 && this.status == 200){
			window.history.pushState('', '', $url_l);
			if (JSON.parse(xhttp.responseText)) {

				var content = JSON.parse(xhttp.responseText).content;

				if (content) {
					document.getElementById("ts-section-active").innerHTML = content;
				} else {

				}
				if (JSON.parse(xhttp.responseText).json_layouts) {
					json_layouts = ((JSON.parse(xhttp.responseText)).json_layouts);
				} 

				let obj = new Box();
				obj.Initialization();

			}


		}
	};
	var qvery_str = 'action=show_section_setting&tab=' + tab ;
	xhttp.open('POST', ajaxurl + '?' + qvery_str, true);
	xhttp.setRequestHeader("Content-type", "application/json");
	let data = {};
	data.tab = tab;
	xhttp.send(JSON.stringify(data));

}
	











/* *************************************************************************************** */
/* ************************** Variables globals ********************* */
/* *************************************************************************************** */
botigues="";
terminals ="";
indexTerminalsPage = 1;
isLogged = false;
username = "";
var History = window.History;
var TERMINALS_PER_PAGE = 4;
var URL_REST_GET_BOTIGUES = "http://localhost:8080/dogphone-jersey-service/botiga";
var URL_REST_GET_TERMINALS = "http://localhost:8080/dogphone-jersey-service/terminal";
var URL_REST_POST_REGISTRE = "http://localhost:8080/dogphone-jersey-service/registre";
var URL_REST_POST_LOGIN = "http://localhost:8080/dogphone-jersey-service/login";

/* *************************************************************************************** */
/* ************************** Document ready ********************* */
/* *************************************************************************************** */
$.i18n.init({
	//lng: 'ca', /*-assignar llenguatge programaticament, si no agafa el del navegador */
	ns: 'messages', /*- el ns per defecte seria 'translation' */
	// ns: { namespaces: ['ns.common', 'ns.special'], defaultNs: 'ns.special'}, /*-mes d'un namespace */
    useLocalStorage: false, /*-caching false per DEV, true per PRO */
    detectLngQS: 'lang',
    debug: true /*-true per DEV , false per PRO */
}, function() {
    $('body').i18n();
});

$(function() {
	get_botigues();
	get_terminals();
	bind_history_statechange();
	bind_header_botons();
	bind_navbar_crides_ajax();
	bind_navbar_seleccio_idioma();
	bind_modals();
	History.pushState(null, null, "inici.html");
});

var bind_elements_propis_de_la_vista = function() {
	add_botigues_al_dom(); /* index */
	bind_gmap(); /* index */
	add_terminals_al_dom(); /* terminals */
	add_terminals_pagination(); /* terminals_pagination */
	bind_terminals_pagination(); /* terminals_pagination */
	bind_accessoris_sidebar(); /* accessoris */
	bind_sim_movistar_popups(); /* sim_movistar */
	$('#content').i18n();
};

function get_botigues() {
	$.ajax( { url: URL_REST_GET_BOTIGUES, dataType: 'json', async: false, success: function(response) {
		botigues = response.botigues;
	}});
};

function get_terminals() {
	$.ajax( { url: URL_REST_GET_TERMINALS, dataType: 'json', async: false, success: function(response) {
		terminals = response.terminals;
	}});
};

function reload() { window.location.assign('index.html'); };
var login = function() {
	isLogged = true;
	$('#the-modal-login form')[0].reset();
	$('#the-modal-login').modal('hide');
	$('#the-modal-registre-form')[0].reset();
	$('#the-modal-registre-response').modal('hide');
	$("#ul_logged").show();
	$('#ul_logged #username').html(username);
	$("#ul_no_logged").hide();
};
var logout = function() {
	isLogged = false;
	$("#ul_logged").hide();
	$("#ul_no_logged").show();
};
jQuery.fn.exists = function() { return this.length>0; };

/* *************************************************************************************** */
/* * Crides AJAX per recarregar el contingut principal. jquery.history.js ********************* */
/* *************************************************************************************** */
function bind_history_statechange() {
	History.Adapter.bind(window,'statechange',function(){
		var State = History.getState();
		History.log(State.data, State.title, State.url);
		if (State.url.indexOf("index.html")!=-1) reload(); /*- url=index.html */ 
		else if (State.url.indexOf(".html")==-1 ) reload();  /*- url=/ */
		else {
			$('#content').load(State.url, null, bind_elements_propis_de_la_vista);
		}
	});
}

function bind_navbar_crides_ajax() {
	$('a.ajax').click(function(e){
		e.preventDefault();
		var old_state = History.getState().hash;
		var new_state = $(this).attr('href');
		if (old_state==new_state) return;
		History.pushState(null, null, new_state);	
		$('nav li').removeClass('active');
		$(this).parents().filter('li').addClass('active');
	});
}		

/* *************************************************************************************** */
/* ************** Dropdown de seleccio d'idioma de la navbar ************** */
/* *************************************************************************************** */
function bind_navbar_seleccio_idioma() {
	$('.a-idioma').click(function(e) {
		e.preventDefault();
		var codi_idioma = $(this).attr('id');
		window.location.href = "index.html?lang=" + codi_idioma;
	});
}

/* *************************************************************************************** */
/* ************** Botons del header: home, login, registre i logout ************** */
/* *************************************************************************************** */
function bind_header_botons() {
	$('header a.ajax').click(function(){
		$('nav #li-inici').addClass('active');
	});
	$('header .btn-login').click(function(e){
		e.preventDefault();
		$('#the-modal-login').modal('show');
	});
	$('header .btn-registre').click(function(e){
		e.preventDefault();
		$('#the-modal-registre').modal('show');
	});
	$('header .btn-logout')[0].onclick = logout;
}

/* *************************************************************************************** */
/* ************** Dialegs modals per login i registre ************** */
/* *************************************************************************************** */
function bind_modals() {
	$('#the-modal-registre .btn-registre').click(function(){
		username = $("#registre-usuari").val();
//		var password = $("#registre-password").val();
//		var confirmacio = $("#registre-confirma").val();
//		var usuari = {nom:username,password:password,confirmacio:confirmacio};
		$("#error-usuari-existent").hide();
		$("#error-usuari-confirmacio").hide();
		$.ajax({
			url:URL_REST_POST_REGISTRE, async:false,
			type:"POST",
//			contentType: "application/json",
//			data: JSON.stringify(usuari),
			data: $('#the-modal-registre-form').serialize(), /*-per defecte application/x-www-form-urlencoded*/
			statusCode: {
				409: function() {$("#error-usuari-existent").show();} ,
				401: function() {$("#error-usuari-confirmacio").show();} },				
			success:function(){
				$('#the-modal-registre').modal('hide');
				$('#the-modal-registre-response').modal('show');
			}
		});
	});
	
	$('#the-modal-login .btn-login').click(function(){
		username = $("#login-usuari").val();
		var password = $("#login-password").val();
		var usuari = {nom:username,password:password};
		$("#error-login").hide();
		$.ajax({ url:URL_REST_POST_LOGIN, async:false, type:"POST", contentType: "application/json", /*dataType: "text",*/ data: JSON.stringify(usuari),
			success:login,
			statusCode: {
				401: function() {$("#error-login").show();}
			}
		});
	});

	$('#the-modal-registre-response .btn-response')[0].onclick = login;	
}	
	
/* ************************** *********** ********************************* */
/* ***** inici: afegir botigues i enllaçar-les amb googlemap ************** */
/* http://code.google.com/p/jquery-ui-map/ */
/* ************************** *********** ********************************* */
function add_botigues_al_dom() {
	$('#dl_botigues').empty();
	var ciutat= "";
	for (var i=0; i<botigues.length; i++) { /*- per cada botiga afegim nom de ciutat (si cal) i nom de botiga ... */
		var botiga = botigues[i];
		if (botiga.ciutat != ciutat) {
			ciutat = botiga.ciutat;
			$('#dl_botigues').append('<dt class="botigues">'+ciutat+'</dt>');
		}
		$('#dl_botigues').append('<dd><a id="gmapping'+i+'" class="gmapping">'+botiga.nom+'</a></dd>');
	}
}

function bind_gmap() {
	$.each( botigues, function(i, botiga) {
		var element = $("a.gmapping").eq(i);
		$('#map_canvas').gmap( /* ... i afegim un marker al mapa ... */
			'addMarker', { 'position': new google.maps.LatLng(botiga.latitut, botiga.longitut), 'bounds': true },
			function(map,marker) { 
				$(element).click(function() { /* al clicar el link d'una botiga mostrem l'adreça completa */
					$(marker).triggerEvent('click');
				});
			}
		).click(function() { /* ... i al clicar sobre el marker del mapa apareix l'adreça completa */
			var popup_content = botiga.nom+"<br />"+botiga.adressa+"<br />"+botiga.telefon;
			$('#map_canvas').gmap(
				'openInfoWindow', { 'content': popup_content },
				this
			);
		});
	});
}

/* *************************************************************************************** */
/* ************** Terminals ************** */
/* *************************************************************************************** */
function add_terminals_al_dom() {
	if ( $("#terminals").exists()==false ) return;
	add_terminals_visibles_al_dom();
}

function add_terminals_visibles_al_dom(amb_paginacio) {
	if (typeof amb_paginacio == 'undefined') terminalsVisibles = terminals;
	else {
		var indexInicialTerminal = (indexTerminalsPage-1)*TERMINALS_PER_PAGE;
		var indexFinalTerminal = indexInicialTerminal + TERMINALS_PER_PAGE;
		if (indexFinalTerminal>=terminals.length) indexFinalTerminal = terminals.length;	
		terminalsVisibles = terminals.slice(indexInicialTerminal,indexFinalTerminal); 
	}
	
	$('#ul_terminals').empty();
	for (var i=0; i<terminalsVisibles.length;i++) {
		var html='<li class="span3"><div class="thumbnail">';
		html=html+'<img id="img_terminal'+i+'" alt="XXXx250" src="img/terminals/'+terminalsVisibles[i].imatge+'" />';
  		html=html+'<div class="caption"><h3>'+terminalsVisibles[i].nom+'</h3>';
  		html=html+'<p>'+terminalsVisibles[i].descripcio+'</p>';
  		html=html+'</div></li>';
  		$('#ul_terminals').append(html);
	};
}

/* *************************************************************************************** */
/* ************** Terminals pagination. Afegir i el paginador i enllaçar a event de mostrar terminals */
/* *************************************************************************************** */
function add_terminals_pagination() {
	if ( $("#terminals-pagination").exists()==false ) return;

	var total_pages = Math.ceil( terminals.length / TERMINALS_PER_PAGE );
	var html='<ul>';
	if (total_pages>2) html=html+'<li><a class="terminals-page-prev" href="#">&#171;</a></li>';
	for (i=1; i<=total_pages; i++) html=html+'<li><a class="terminals-page" href="#" >'+i+'</a></li>';
	if (total_pages>2) html=html+'<li><a class="terminals-page-next" href="#">&#187;</a></li>';
	html=html+'</ul>';
	$('#pagination_terminals').html(html);
	add_terminals_visibles_al_dom("amb_paginacio");
	update_paginador();
}

function bind_terminals_pagination() {
	if ( $("#terminals-pagination").exists()==false ) return;
	
	$('.terminals-page-prev').click(function(e){
		e.preventDefault();
		if (indexTerminalsPage>1) indexTerminalsPage -=1 ;
		add_terminals_visibles_al_dom("amb_paginacio");
		update_paginador();
	});
	$('.terminals-page-next').click(function(e){
		e.preventDefault();
		if (indexTerminalsPage<$('.terminals-page').length) indexTerminalsPage +=1 ;
		add_terminals_visibles_al_dom("amb_paginacio");
		update_paginador();
	});
	$('.terminals-page').click(function(e){
		e.preventDefault();
		indexTerminalsPage = parseInt($(this).text());
		add_terminals_visibles_al_dom("amb_paginacio");
		update_paginador();
	});
}

function update_paginador() {
	$('.terminals-page-prev').parent().removeClass('disabled');
	$('.terminals-page-next').parent().removeClass('disabled');
	$('.terminals-page').parent().removeClass('active');
	if(indexTerminalsPage==1) $('.terminals-page-prev').parent().addClass('disabled');
	if(indexTerminalsPage==$('.terminals-page').length) $('.terminals-page-next').parent().addClass('disabled');
	$('.terminals-page').eq(indexTerminalsPage-1).parent().addClass('active');
}

/* *************************************************************************************** */
/* ************** Accessoris . Sidebar ************** */
/* *************************************************************************************** */
function bind_accessoris_sidebar() {
	if ( $("#accessoris").exists()==false ) { return; }
	$('a.ajax-accessoris').click(function(e){
		e.preventDefault();
		$('nav#the-sidebar li').removeClass('active');
		$(this).parents().filter('li').addClass('active');
		var href = $(this).attr('href')+' #accessoris-content';
		$('#accessoris-content').load(href, function() {
			$('#accessoris-content').i18n();	
		});
	});
};

/* *************************************************************************************** */
/* ************** Popups per la pantalla de les tarifes SIM movistar ************** */
/* *************************************************************************************** */
function bind_sim_movistar_popups() {
	if ( $("#mobil-sim").exists()==false ) { return; }
	$("#sim1-popover").popover({
		placement:"bottom",
		title:$.t('sim1_pop1'),
		content:$.t('sim1_pop2')
	});
	$("#sim2-popover").popover({
		placement:"bottom",
		title:$.t('sim2_pop1'),
		content:$.t('sim2_pop2')
	});
};

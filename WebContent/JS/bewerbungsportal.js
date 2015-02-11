var main = function() {
	$('#progressbar').progressbar({
		value: 20
	});
	
	// Überprüfen, was der User für einen Status hat
	if (isEmpty(sessionStorage['User']) === true){
		alert("Sie sind nicht eingeloggt!");
	} else {
		$('.loginFenster').hide();
		$('.logoutFenster').show();
		$('.nutzerName').text(sessionStorage['User']);
		if (sessionStorage['rolle'] === "2") {
			$('.cms').show();
			$('.nonCms').hide();
			$('#in7').children('.inhaltBox').load('create_prozess.jsp');
			$('#in8').children('.inhaltBox').load('server_control.jsp');
		} else {
			$('.cms').hide();
			$('.nonCms').show();
		}
	}
	$('.iFenster').show();
	$('.iFenster1').hide();
	$('#in1').show();
	$('#prozent').text($('#progressbar').attr('aria-valuenow') + '%');
	$('.navEl').on('click', function(event) {
		$('.bewSub').hide();
		$('.navEl').removeClass('current');
		var titel = $(this).text();
		$('.navVer').children('h2').hide();
		$(this).addClass('current');
		$('.inhalt').hide();
		$('.' + titel).show();
		if (titel === "Bewerben") {
			$('.iFenster').hide();
			$('#bewPro').show();
		}
		var id = $(this).attr('id');
		id = id.substring(3, 4);
		$('#in' + id).show();
	});
	// Vertikale Navigationsleiste
	$('.Bewerben').on('click', function() {
		var id = $(this).attr('id').substring(6, 7);
		$('.navVer').children('h3');
		$('#bewSub' + id).show();
		if (id === '2') {
			$('#bewPro').hide();
		} else if (id === '1'){
			$('#bewPro').show();
			$('.iFenster').hide();
		}
	});
	$('.bewSub').on('click', function() {
		var id = $(this).attr('id').substring(6, 7);
		$('.iFenster').hide();
		$('.iF' + id).show();
		$('#bewPro').hide();
	});
	$('.nav').children('li').on('click', function() {
		$('.nav').children('li').removeClass('active');
		var id = $(this).attr('id').substring(2, 3);
		$('.iF2').attr('src', 'erfahrungsbericht' + id + '.html');
		$(this).addClass('active');
	});
	// Anzeigen der TipBox
	$('.btn').on('mouseover', function() {
		var id = $(this).attr('id');
		if (id === "btnBewSave") {
			$('#textbox').text("Wenn du noch nicht alle Felder ausgefüllt hast, kannst du so deine Daten zwischenspeichern, um später weiterzumachen.");
		} else if (id === "btnBewWeiter") {
			$('#textbox').text("Alle Felder ausgefüllt und überprüft? Super, dann geht's hier weiter.");
		}
		$('#textbox').show();
	});
	$('.btn').on('mouseout', function() {
		$('#textbox').hide();
	});
	$('.btn').on('click', function() {
		var id = $(this).attr('id');
		if (id === "btnBewWeiter") {
			// Hier muss noch rein, wie die Daten verschickt werden
			$('.iF1').attr('src', 'einschreibungsprozess.html');
		} else if (id === "btnBewSave") {
			//Hier muss rein, wie die eingegebenen Daten in die Datenbank gespeichert werden
		}
	});
	// Wenn der auf logout geklickt wird.
	$('#logout').on('click', function() {
		sessionStorage.clear();
		//Herausfinden auf welcher Seite ich mich gerade befinde
		var title = $(document).find("title").text();
		if (title === "DHBW Auslandsinfo") {
			
		} else if (title === "DHBW Auslandsportal") {
			location.replace("index.html");
		}
		$('#inName').val('');
		$('.logoutFenster').hide();
		$('.loginFenster').show();
		/*for (var i = 1; i <= 10; i++) {
			$('#'+ i + '5').addClass("hidden");
		}*/
	});
};

$(document).ready(main);

function isEmpty(str) {
	return (!str || 0 === str.length);
}
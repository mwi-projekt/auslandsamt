var imgCount = 1;
var back = 1;
var main = function() {
	loop();
	// Überprüfen ob jemand eingeloggt ist
	if (isEmpty(sessionStorage['User']) === true){
	} else {
		$('.loginFenster').hide();
		$('.logoutFenster').show();
		$('.nutzerName').text(sessionStorage['User']);
		if (sessionStorage['rolle'] === "2") {
			$('.cms').show();
			$('.nonCms').show();
		} else {
			$('.cms').hide();
			$('.nonCms').show();
		}
	}
	
	for (var i = 1; i < 10; i++) {
		$('.angCont' + i).hide();
		$('.c' + i + '1').show();
	}
	//Registrierenlink wurde angeklickt, PopUpFeld erscheint
	$('.linkReg').on('click', function() {
		$('.popUpBack').show();
		$('.popUpFeld').show();
	});
	//Schließen Kreuz im PopUpFeld wurde geklickt, PopUp wird geschlossen
	$('#close').on('click', function() {
		$('.popUpBack').hide();
		$('.popUpFeld').hide();
	});
	//Anzeigen der Auslandsangebote des Studienganges
	$('.studiengang').on('click', function() {
		$('.uni').hide();
		$(this).parent().children('.uni').toggle();
	});
	//Anzeigen des Login Fensters
	$('.loginShow').on('click', function() {
		$('.loginFenster').css('margin-top', '-5px');
	});
	$('#loginClose').on('click', function() {
		$('.loginFenster').css('margin-top', '-190px');
	});
	$('.navel').on('click', function() {
		var id = $(this).attr('id');
		var idB = id.substring(0, 1);
		var idE = id.substring(1, 2);
		for (var i = 1; i <= 5; i++) {
			$('#' + idB + i).removeClass('current');
		}
		$('.angCont' + idB).hide();
		
		$(this).addClass('current');
		$('.c' + id).show();
	});
	//Auswahl der Rolle im RegistrierenPopUp
	$('.auswahl').on('click', function() {
		if ($('.rolleWahl').val() === "Studierender") {
			$('.auslandsmitarbeiter').hide();
			$('.student').show();
		} else if ($('.rolleWahl').val() === "Auslandsmitarbeiter") {
			$('.student').hide();
			$('.auslandsmitarbeiter').show();
		}
	});
	//Click-Listener für Registrieren-Button
	$('.btnReg').on('click', function() {
		var telefon, matrikelnummer, studiengang, kurs, pw1, pw2;
		telefon = '';
		matrikelnummer = '';
		studiengang = '';
		kurs = '';
		pw1 = '';
		pw2 = '';
		var rolle = $('.rolleWahl').val();
		if (rolle === "Studierender") {
			pw1 = $('#inPwSt1').val();
			pw2 = $('#inPwSt2').val();
			matrikelnummer = $('#inMatrikel').val();
			studiengang = $('#inStudiengang').val();
			kurs = $('#inKurs').val();
		} else if (rolle === "Auslandsmitarbeiter") {
			pw1 = $('#inPwAu1').val();
			pw2 = $('#inPwAu2').val();
			alert($('#inTel').val());
			telefon = $('#inTel').val();
		}
		if (pw1 != pw2) {
			$('.falsch').html("Die Passwörter stimmen nicht überein.");
			$('.falsch').show();
		} else {
			var vorname = $('#inVorname').val();
			var nachname = $('#inNachname').val();
			var email = $('#inMail').val();
			if (rolle === 'Auslandsmitarbeiter' && email.match('dhbw-karlsruhe.de') !=  'dhbw-karlsruhe.de') {
				$('.falsch').html("Bitte wählen sie nur Auslandsmitarbeiter, wenn sie einer sind.");
			} else {
				$.ajax({
					type: "POST",
					url: "login_db",
					data: {
						action: "post_register",
						rolle: rolle,
						passwort: pw1,
						vorname: vorname,
						nachname: nachname,
						email: email,
						matrikelnummer: matrikelnummer,
						studiengang: studiengang,
						kurs: kurs,
						tel: telefon,
					},
					success: function(result) {
						$('.erfolgreich').html('Registrierung erfolgreich. <br> Bitte logge dich ein um fortzufahren. <br> Dein Nutzername lautet ' + nachname + '.' + vorname);
						$('.erfolgreich').show();
						$('.erfolgreich').fadeOut(10000);
						$('.popUpBack').hide();
						$('.popUpFeld').fadeOut();
					}, 
					error: function(result) {
						
					}
				});
			}
		}
		
	});
	//Click-Listener für Login-Button
	$('#btnLogin').on('click', function() {
		var user = $('#inName').val();
		var pw = $('#inPasswort').val();
		var name = user.split('.');
		$.ajax({
			type: "POST",
			url: "login_db",
			data: {
				action: "post_login",
				vorname: name[1],
				nachname: name[0],
				pw: pw,
			},
			success: function(data) {
				var auslesen = data.split(';');
				sessionStorage['rolle'] = auslesen[0];
				sessionStorage['User'] = name[1];
				$('.nutzerName').html(name[1]);
				if (sessionStorage['rolle'] = '2') {
					$('.cms').show();
					$('.nonCms').show();
				} else {
					$('.cms').hide();
					$('.nonCms').show();
				}
				$('.loginFenster').hide();
				$('.logoutFenster').show();
				$('.weg').css('display', 'inline');
			}, error: function(data) {
				alert("Fehler");
			}
		});			
	});
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
	$('.arrow').on('click', function() {
		var id = $(this).attr('id');
		if (id === "arrLeft") {
			id = $('.zeig').attr('id');
			id = id.substring(2, 3);
			if (id === '1') {
				for (var i = 1; $('#kb' + i).text() != ""; i++) {
					id = i;
				}
			} else {
				id = id - 1;
			}
		} else if (id === "arrRight") {
			id = $('.zeig').attr('id');
			id = id.substring(2, 3);
			var count = 0;
			for (var i = 1; $('#kb' + i).text() != ""; i++) {
				count = i;
			}
			id = parseInt(id);
			if (id === count) {
				id = 1;
			} else {
				id = id + 1;
			}
		}
		$('.kurzbericht').removeClass('zeig');
		$('#kb' + id).addClass('zeig');
	});
// -------------------------------------------------------- CMS ------------------------------------------------------------------------------
	//Click-Listener für CMS bearbeiten Buttons
	$('.cmsBtn').on('click', function() {
		var id = $(this).parent().parent().attr('id');
		switch(id) {
		case 'portalInfo': 
			$('#portalInfo').children().children('.nonCms').hide();
			$('.cmsPortal').show();
			$('#portalInfo').children('.col-md-6').children('.titel').hide();
			var titel = $('#portalInfo').children('.col-md-6').children('.titel').text();
			$('#inPortalTitel').val(titel);
			for (var i = 1; $('#li' + i).text() != ""; i++) {
				$('#inli' + i).val($('#li' + i).text());
			}
			break;
		case 'auslandsAngebote':
			$('.cmsAngebote').show();
			break;
		case 'erfahrungsBerichte':
			$('.kurzbericht').show();
			$('.erfahrungsBerichte').children().children().children('.nonCms').hide();
			$('.erfahrungsBerichte').children().children().children().children('.nonCms').hide();
			for (var i = 1; $('#kb' + i).html() != undefined; i++) {
				$('#kb' + i).children().children('textarea').text($('#kb' + i).children().children('.middle').text().trim());
			}
			$('.cmsBerichte').show();
			break;
		case 'infoMaterial':
			$('#infoMaterial').children().children('.nonCms').hide();
			$('.cmsInfo').show();
			var titel = $('#infoMaterial').children('.col-md-6').children('.titel').text();
			$('#inInfoTitel').val(titel);
			for (var i = 1; $('#infoli' + i).children('a').text() != ""; i++) {
				$('#inInfoLi' + i).val($('#infoli' + i).children('a').text());
				$('#inInfoLink' + i).val($('#infoli' + i).children('a').attr('href'));
			}
			break;
		}
	});
	//Click Listener für die Bild ändern Buttons
	$('.upload').on('click', function() {
		var id = $(this).attr('id');
		id = id.trim();
		loop1(id);
	});
	//Click-Listener für neues Infoselement in Box PortalInfo
	$('#cmsBtnInfoNeu').on('click', function() {
		var count = 0;
		for (var i = 1; $('#li' + i).text() != ""; i++) {
			count = i;
		}
		$('.inputsPortal').html($('.inputsPortal').html() + '<input class="inBox" id="inli' + (count+1) + '" value="" /><img class="small" id="delLi' + (count+1) + '" src="images/Button Delete.png" />');
		for (var i = 1; $('#li' + i).text() != ""; i++) {
			$('#inli' + i).val($('#li' + i).text());
		}
	});
	//Click-Listener für neuen Erfahrungsbericht in Box Erfahrungsbericht
	$('#cmsBtnBerichtNeu').on('click', function() {
		var count = 0;
		for (var i= 1; $('#kb' + i).html() !== undefined; i++) {
			count = i;
		}
		$('.berichte').append('<div class="row kurzbericht" id="kb' + (count+1) + '"><div class="col-md-6"><img src="images/noimg.jpg" id="imgWorld" /><label class="btn cmsBtn cmsBerichte btnBild" id="btnberichtBild' + (count+1) + '" style="float: right">Bild Ändern<input class="upload" type="file" id="berichtBild' + (count+1) + '" /></label></div><div class="col-md-6 cmsBerichte"><textarea class="inBox" style="width: 100%; height: 250px"></textarea></div>');
		$('.kurzbericht').show();
		$('.cmsBerichte').show();
	});
	//Click-Listener für neuen Link in Box InfoMaterial
	$('#cmsBtnLinkNeu').on('click', function() {
		var count = 0;
		for (var i = 1; $('#infoli' + i).text() != ""; i++) {
			count = i;
		}
		$('.inputsInfo').html($('.inputsInfo').html() + '<input class="inBox" id="inInfoLi' + (count+1) + '" value="" /><img class="small" id="delInLi' + (count+1) + '" src="images/Button Delete.png" /><br><b style="margin-right: 5px">Link</b><input class="inBox infoLink" id="inInfoLink' + (count+1) +'" value=""><img class="small" id="delLink' + (count+1) +'" src="images/Button Delete.png" />');
		for (var i = 1; $('#infoli' + i).text() != ""; i++) {
			$('#inInfoLi' + i).val($('#infoli' + i).children('a').text());
			$('#inInfoLink' + i).val($('#infoli' + i).children('a').attr('href'));
		}
	});
	//Click-Listener für alle Images mit der class small
	$('.small').on('click', function() {
		var id = $(this).attr('id');
		if (id.substring(0, 7) === "delPoLi") {
			id = id.substring(7, 8);
			$('#inli' + id).val('');
		} else if (id.substring(0, 7) === "delInLi") {
			id = id.substring (7, 8);
			$('#inInfoLi' + id).val('');
		} else if (id.substring(0, 7) === "delLink") {
			id = id.substring(7 ,8);
			$('#inInfoLink' + id).val('');
		}
	});
};

$(document).ready(main);

function loop() {
    setTimeout(function() {
    	if(back === 1) {
    		$('.imgSlider').fadeTo('slow', 0, function() {
    			$('.imgSlider').css('background-image', 'url(images/pan' + back + '.jpg)');
    		}).fadeTo('800', 0.9);	
    		back = 2;
    		loop();
    	} else if (back === 2){
    		$('.imgSlider').fadeTo('slow', 0, function() {
    			$('.imgSlider').css('background-image', 'url(images/pan' + back + '.jpg)');
    		}).fadeTo('800', 0.9);	
    		back = 3;
    		loop();
    	}  else {
    		$('.imgSlider').fadeTo('slow', 0, function() {
    			$('.imgSlider').css('background-image', 'url(images/pan' + back + '.jpg)');
    		}).fadeTo('800', 0.9);	
    		back = 1;
    		loop();
    	}
    }, 6000);
}

function loop1(id) {
	setTimeout(function() {
		if ($('#' + id).val() === "") {
			loop1(id);
		} else {
			var text = $('#btn' + id).html();
			text = text.replace('Ändern', 'Gewählt');
			$('#btn' + id).html(text);
			$('#btn' + id).css('background', 'rgb(48, 192, 192)');
		}
		
	}, 1000);
}

function isEmpty(str) {
	return (!str || 0 === str.length);
}








  $(document).ready(function() {
	
	

	
	/* $('.article').removeClass('current');
     $('.description').hide();
     
	
	 $('.article').click(function(event) {
		
	    $('.article').removeClass('current');
	    $('.description').hide();
	   
	    
	    
	   

	    $(this).addClass('current');
	  
	    $(this).children('.description').show();
	    
	    
	    var idnum= $(this).attr("id");
	    var id= idnum.substring(1,2);
	    var starsId = 's' + id ;
	  
	   
	
	   /* $('#s' + id).addClass('current');
		$('#s' + id ).show();
	    
	 
	 });
	*/
	
	// Anzahl der Sternen wählen
	$('#rating a').hover(function(){
	    $('.star_off').mouseover(function(){
	      $(this).removeClass('star_off').addClass('star_on');
	      $(this).prevAll('.star_off').removeClass('star_off').addClass('star_on');
	      $(this).nextAll('.star_on').removeClass('star_on').addClass('star_off');
	    });
	 /* }, function() {
	    $('.star_on').removeClass('star_on').addClass('star_off');*/
	});
	    
	    
	   
	    
	  //Sterne, Matrikelnummer  speichern  
	/*$('#rating a').click(function(event) {
	      event.preventDefault();
	      var rating = $(this).parent().index() + 1;
	   // alert("Sie haben diese Frage mit "+rating+" Stern(e) bewertet!!!");
	      var SternID =  $(this).parent().parent().parent().attr("id");
	      var frageID = SternID.substring(1,2);
	      
	      var matrikelnummer = $("#matrikelnummer").val();
	      //alert(SternID + ", " + frageID + ", " + matrikelnummer + ", " + rating);
	 
	      $
	      .ajax(
					{
						type : "POST",
						url : "erfahrungsberichtInhalt_db",
						data : {
							action : "post_stern",
							matrikelnummer : matrikelnummer,
							frageID : frageID,
					        stern : rating
							
						}
					})	
					.done(function(data) {
							alert("ok");
					})
			
					.fail(function(data) {
						alert( "error" + data );
					});
		  
	       }); 
	 
	*/
	 
	  /*$(".st").hover(function(){
		  $('.star').mouseover(function(event){
	    var id = $(this).parent().parent().parent().attr("id");
	    	
	    stars = $(".star").index(this)+1;
		$("#" + id).children(".col-xs-7").children(".st").children($(".star:lt("+stars+")")).removeClass("empty");
		$(".star:eq("+stars+")").addClass("empty");
		$(".star:gt("+stars+")").addClass("empty");
		
		  });
	    });*/
	   
	   
     //Frage, Antwort, FrageID, Matrikelnummer speichern
//	 $(".btn").click(function(event) {
//	    
//		var btnId = event.target.id;
//	    var id = btnId.substring(1,2);
//	    var qoustion= $("#f"+id).val();
//	    var answer = $("#t"+id).val();
//	    var matrikelnummer = $("#matrikelnummer").val();
//	    var frageID = $("#frage_"+id).val();
//	    alert(qoustion + ", " + frageID + ", " + matrikelnummer + ", " + answer);
//	    
//	  
//	    $
//	    .ajax(
//				{
//					type : "POST",
//					url : "erfahrungsberichtInhalt_db",
//					data : {
//						action : "post_dokument",
//						matrikelnummer : matrikelnummer,
//						frageID : frageID,
//						frage : qoustion,
//						antworttext :answer
//					}
//				})	
//				.done(function(data) {
//					alert("ok");
//				})
//				.fail(function() {
//					alert( "error" );
//	            });
//	  
//	  
//	  
//	  
//	  
//	  /* $(".current .st").hide();
//	  $(".current .rating").hide();
//	  
//	  $(".current .status-box").val('Danke für Ihrer Kommentar. Antworten Sie bitte auf die nächste Frage!!!');
//	  $('.current .status-box').addClass("selected");
//      $('.counter').text('140');
//      $('.btn').addClass('disabled');*/
//          
//	
//	
//	
//	
//	
//	});
	
	
	//ID der Frage, Anzahl der Sternen, Matrikelnummer, Frage,  Antwort an erfahrungsberichtInhalt_db.java übergeben
	$('.btn').on('click', function() {
		
		var id = $(this).attr('id');
		id = id.substring(1,2);
		$('#t'+id).addClass("selected");
		var rating = 0;
		matrikelnummer = $('#matrikelnummer').val();
		
		for (var i = 1; $('#s' + id).children().children('#stern' + i).attr('class') === 'star_on'; i++) {
			rating = i;
		}
		
		
		frage = $('#f' + id).text();
		antworttext = $('#t' + id).val();
		
		//alert(id + ", "+ rating +", "+ matrikelnummer+", "+ frage+ ", "+ antworttext );
		//if (rating != "0") {
		$.
			ajax(
				 {
				type: "POST",
				url: "erfahrungsberichtInhalt_db",
				data: { 
					action: "erfahrungsbericht_post",
					matrikelnummer: matrikelnummer,
					frageID: id,
					frage: frage,
					antworttext: antworttext,
					stern: rating
					
				}
					})	
					.done(function(data) {
							alert("Ihre Antwort war erfolgreich gespeichert. Antworten Sie bitte auf die naechste Frage!!!");
					})
			
					.fail(function(data) {
						alert( "error" + data );
					});
		
		
			
			
			
			
			
		//}
		
				
		
	});
   
  
   /*$('.status-box').keyup(function() {
    	
     var postLength = $(this).val().length;
     var charactersLeft = 140 - postLength;
     $('.counter').text(charactersLeft);
  
      if(charactersLeft < 0) {
         $('.btn').addClass('disabled'); 
      }
      else if(charactersLeft == 140) {
         $('.btn').addClass('disabled');
      }
      else {
         $('.btn').removeClass('disabled');
      }
      
   });
  
   $('.btn').addClass('disabled');*/
	
   
   
	
   
   
	
   
   
	
});
	
	
	
	
	
	
	
	
	
	
	
	

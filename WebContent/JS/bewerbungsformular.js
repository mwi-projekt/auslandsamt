 
var main = function() {
	
	$(".sprachnachweis").hide();
	
	$(".bu").click(function() {	
	
		var pru = $(".pr").val();
		
			if(pru>2){
			
				$(".sprachnachweis").show();
			
			};
		
		});


	


   $('#tooltip').hover(function(){
        $("#tooltip").tooltip();

   });
   
  

   $("#frmContact").submit(function(){
	   
	   var formControl = true; 
	
	   var email = $(".email").val();
	   
	    function validateEmail(email) { 
		     var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		     return re.test(email);
	  } 
   
	  if(validateEmail(email) == false) {
		  formControl = false;
		  $(".email").addClass("warning");
		  $(".email").val("Ihre Emailadresse bitte noch mal, korrekt eingeben");
		
	  }else{  $(".email").removeClass("warning"); }
      	  	  
        return false;
	       
   });
   
};



$(document).ready(main);
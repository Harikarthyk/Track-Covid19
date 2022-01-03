$(document).keydown(function(e){
    if(e.which === 123){
       return false;
    }
});
$(document).bind("contextmenu",function(e) {
 e.preventDefault();
});
$(document).ready(function() {
	
	$.getJSON("https://data.covid19india.org/state_district_wise.json",function(data){
		
		var state = localStorage.getItem('state');
		var stateDetails = data[state].districtData ;
		var stateTotal = localStorage.getItem('stateTotal') ;	
		var stateActive = localStorage.getItem('stateActive') ;
		var stateDeaths = localStorage.getItem('stateDeaths') ;
		$('.state').text( state ) ;
		$('.popup').append( "Total :  "+stateTotal+" Active :  "+stateActive+" Deaths :  "+stateDeaths  ) ;
		for (var districtName in stateDetails) {
 			
			if( districtName=="Other State" ) continue ;

 			var total = stateDetails[districtName].confirmed ;
 			total = "Total : "+total ;
 			
 			var active = stateDetails[districtName].active ;
 			var bgColorChange = active ;
 			active = "Active : " +active ;
 			
 			var recovered = stateDetails[districtName].recovered ;
			recovered = "Recovered : " + recovered ;
			
			//this line is used to remove all spaces so that while includeing in id it includes full name 
			//by using replace() method only on space are removed for multiple below statement is used
			
			tempName = districtName.split(" ").join("");
			var districtBody = "<div class=district-head >"+"<span id="+tempName+ ">"+ districtName+"</span>" +"<div class=district-total>"+ total +
			"</div><div class=district-active>"+ active +
			"</div><div class=district-cured>"+ recovered +"</div></div>" ;
			
			$('.district-body ').append( districtBody ) ;
			var id = "#"+tempName ;
			// console.log( id+" "+check ) ;
			if( bgColorChange>=50 )
				$(id).parent().css( 'background-color','#ff4f4f' );
			else if( bgColorChange>=15 )
				$(id).parent().css( 'background-color','#ffbd66' );		
			else if( bgColorChange<15 ) 
				$(id).parent().css( 'background-color','#71c650' );		
			
		}


	});

	$('.state').mouseover(function(){
		$('.popup').show();
		// alert("in") ;
	}).mouseout(function() { 
    $(".popup").hide();
	});

});
function indiaCovidDetails(){
	$.getJSON("https://api.covid19india.org/data.json",function(data){
		var allState = data.statewise;
	
		for( var i=1;i<38;i++ ) {

			var state = allState[i].state ;
			var active = allState[i].active ;
			var total = allState[i].confirmed ;
			var recovered = allState[i].recovered ;
			var deaths = allState[i].deaths ;
			var tableRow = "<tr><td>"+ i +
			"</td><td class=stateName total="+total+" active="+ active +" deaths="+deaths +">" + state + "</td><td>" + total + "</td><td>"+ active +"</td><td>"+ recovered +"</td><td>"+ deaths +"</td></tr>" ; 
			$('.table').append(tableRow) ;

		}
		
		$('td.stateName').click(function(){
			localStorage.setItem('state', $(this).text() );
			localStorage.setItem( 'stateTotal' , $(this).attr('total') ) ;
			localStorage.setItem( 'stateActive' , $(this).attr('active') ) ;
			localStorage.setItem( 'stateDeaths' , $(this).attr('deaths') ) ;
			window.location = "IndividualDistrict-India/individualDistrict.html" ;	
		});
		
	});

}
function globalCovidDetails(){
	
	$.getJSON("https://coronavirus-tracker-api.herokuapp.com/v2/locations",function(data){
	
		var total = "Total "+data.latest.confirmed ;
		var deaths = "Death "+data.latest.deaths;
		var globalContent = "<p class=global-box>" + total + "</p><p class=global-box>"+ deaths +"</p>" ;
		$('.global-content').append( globalContent ) ;
		var popupTotal = Math.round( 7800000000/data.latest.confirmed );
		popupTotal = "For Every "+popupTotal+" - 1 people gets Affected " ;
		$('.popup-total').append(popupTotal) ;
		// alert( popupTotal ) ;
		var popupDeaths = Math.round( 7800000000/data.latest.deaths ) ;
		popupDeaths = "For Every "+popupDeaths+" - 1 people dies " ;
		$('.popup-deaths').append(popupDeaths) ;
	
	
	});	

}
function globalCountryDetails( country ){
	$.getJSON( "https://coronavirus-tracker-api.herokuapp.com/v2/locations?country="+country,function(data){
		$('.country-details-head').text(country) ;
		var total = data.latest.confirmed ;
		var death = data.latest.deaths;
		$('.country-details-main1').text( "Total "+total+" Death "+death ) ;
		var affectRatio = Math.round( data.locations[0].country_population/data.latest.confirmed ) ;
		$('.country-details-main2').text( "For Every "+affectRatio+" people 1 get Affected " ) ;
		affectRatio = Math.round( data.locations[0].country_population/data.latest.deaths ) ;
		$('.country-details-main4').text( "For Every "+affectRatio+" people 1 die " ) ;
		var lastUpdated = data.locations[0].last_updated ;
		lastUpdated = lastUpdated.substring(0,10) ;
		$('.country-details-main3').text( "Last Updated : "+lastUpdated ) ;
		
	});
}
// $(document).keydown(function(e){
//     if(e.which === 123){
//        return false;
//     }
// });
// $(document).bind("contextmenu",function(e) {
//  e.preventDefault();
// });
$(document).ready(function(){
	var removeLoading = function() {
		setTimeout(function(){
			$("body").removeClass("loading");
		},3000);
	};
	removeLoading();
	$('#india').css( 'display' , 'none' ) ;	
	globalCovidDetails();	
	$('.head-india').on('click',function(){
		$('.india').show() ;
		$('#india').css( 'display' , 'flex !important' ) ;
		$('.global').hide();
		$('.india-marker').hide();
		$('.main-head').css( 'display' , 'block' ) ;
		indiaCovidDetails() ;
	});
	
	$('h1').on('click',function(){
		$('.india').hide() ;
		$('.global').show();
		// $('.main-head').hide();
		$('.main-head').css( 'display' , 'none' ) ;	
	});
	$('.global-box').mouseover(function(){
		$('.popup-total').show();
		$('.popup-deaths').show();	
	}).mouseout(function(){
		$('.popup-total').hide();
		$('.popup-deaths').hide();
	});
	$('.input').on('keyup',function(event){
		if( event.keyCode===13 ){
			var country = $('.input').val();
			$('.country-details').show();
			$('.country-details').css('display','flex') ;
			globalCountryDetails(country) ;	
		}
	});
	$('i').on( 'click',function(){
		var country = $('.input').val();
		$('.country-details').show();
		$('.country-details').css('display','flex') ;
		
		globalCountryDetails(country) ;
	}) ;
});

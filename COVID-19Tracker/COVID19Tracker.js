function indiaCovidDetails() {
	$.getJSON("https://api.rootnet.in/covid19-in/stats/latest", function (data) {
		var allState = data.data.regional;
		let formatter = Intl.NumberFormat('en', { notation: 'compact' });
		
		for (var i = 0; i < allState.length; i++) {
			
			var state = formatter.format(allState[i]?.loc);
			var active = formatter.format(allState[i].totalConfirmed - allState[i].discharged);
			var total = formatter.format(allState[i].totalConfirmed);
			var recovered = formatter.format(allState[i].discharged);
			var deaths = formatter.format(allState[i].deaths);
			var tableRow = "<tr><td>" + (i + 1) +
				"</td><td class=stateName total=" + total + " active=" + active + " deaths=" + deaths + ">" + state + "</td><td>" + total + "</td><td>" + active + "</td><td>" + recovered + "</td><td>" + deaths + "</td></tr>";
			$('.table').append(tableRow);
		}
		$('td.stateName').click(function () {
			localStorage.setItem('state', $(this).text());
			localStorage.setItem('stateTotal', $(this).attr('total'));
			localStorage.setItem('stateActive', $(this).attr('active'));
			localStorage.setItem('stateDeaths', $(this).attr('deaths'));
			window.location = "IndividualDistrict-India/individualDistrict.html";
		});
	});

}
function globalCovidDetails() {

	$.getJSON("https://coronavirus-tracker-api.herokuapp.com/v2/locations", function (data) {
		let formatter = Intl.NumberFormat('en', { notation: 'compact' });
		var total = "Total " + formatter.format(data.latest.confirmed);
		var deaths = "Death " + formatter.format(data.latest.deaths);
		var globalContent = "<p class=global-box>" + total + "</p><p class=global-box>" + deaths + "</p>";
		$('.global-content').append(globalContent);
		var popupTotal = Math.round(7800000000 / data.latest.confirmed);
		popupTotal = "For Every " + popupTotal + " - 1 people gets Affected ";
		$('.popup-total').append(popupTotal);
		// alert( popupTotal ) ;
		var popupDeaths = Math.round(7800000000 / data.latest.deaths);
		popupDeaths = "For Every " + popupDeaths + " - 1 people dies ";
		$('.popup-deaths').append(popupDeaths);
		removeLoading();
	});

}
function globalCountryDetails(country) {
	$.getJSON("https://coronavirus-tracker-api.herokuapp.com/v2/locations?country=" + country, function (data) {
		$('.country-details-head').text(country);
		let formatter = Intl.NumberFormat('en', { notation: 'compact' });
		var total = formatter.format(data.latest.confirmed);
		var death = formatter.format(data.latest.deaths);
		$('.country-details-main1').text("Total " + total + " Death " + death);
		var affectRatio = Math.round(data.locations[0].country_population / data.latest.confirmed);
		$('.country-details-main2').text("For Every " + affectRatio + " people 1 get Affected ");
		affectRatio = Math.round(data.locations[0].country_population / data.latest.deaths);
		$('.country-details-main4').text("For Every " + affectRatio + " people 1 die ");
		var lastUpdated = data.locations[0].last_updated;
		lastUpdated = lastUpdated.substring(0, 10);
		$('.country-details-main3').text("Last Updated : " + lastUpdated);

	});
}
var removeLoading = function () {
	setTimeout(function () {
		$("body").removeClass("loading");
	}, 3000);
};
$(document).ready(function () {
	
	$('#india').css('display', 'none');
	globalCovidDetails();
	$('.head-india').on('click', function () {
		$('.india').show();
		$('#india').css('display', 'flex !important');
		$('.global').hide();
		$('.india-marker').hide();
		$('.main-head').css('display', 'block');
		indiaCovidDetails();
	});

	$('h1').on('click', function () {
		$('.india').hide();
		$('.global').show();
		// $('.main-head').hide();
		$('.main-head').css('display', 'none');
	});
	$('.global-box').mouseover(function () {
		$('.popup-total').show();
		$('.popup-deaths').show();
	}).mouseout(function () {
		$('.popup-total').hide();
		$('.popup-deaths').hide();
	});
	$('.input').on('keyup', function (event) {
		if (event.keyCode === 13) {
			var country = $('.input').val();
			$('.country-details').show();
			$('.country-details').css('display', 'flex');
			globalCountryDetails(country);
		}
	});
	$('i').on('click', function () {
		var country = $('.input').val();
		$('.country-details').show();
		$('.country-details').css('display', 'flex');
		globalCountryDetails(country);
	});
});

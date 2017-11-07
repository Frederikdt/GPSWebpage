$(function(){

    var $gpsdata = $('#gpsdata');

    $.ajax({
    type: 'GET',
    url: 'https://joerha.dk/gps',
    success: function(gpsdata) {
    $.each(gpsdata, function(i, gpsdata){
        $gpsdata.append()
    });
    }
    });

});



/* $.ajax({
    url: "https://joerha.dk/climate",
    method: "GET",
    success: function (data) {
        data.data.forEach(function (t) {
            console.log(t);
        }) */
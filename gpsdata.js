$(function () {
    setInterval(getData, 500);
});


function getData() {
    $.ajax({
        type: "GET",
        url: "https://api.joerha.dk/gps/2/10",
        success: function (data) {
            updateView(data.data);
            updateMyMap(data.data)
        }
    });
}

function updateView(data) {
    var gpsRows = "";
    data.forEach(function (gpsEntry) {
        gpsRows += "<tr>" +
            "<td>" + gpsEntry.longitude + "</td>" +
            "<td>" + gpsEntry.latitude + "</td>" +
            "<td>" + gpsEntry.altitude + "</td>" +
            "<td>" + gpsEntry.heading + "</td>" +
            "<td>" + gpsEntry.speed + "</td>" +
            "<td>" + (new Date(gpsEntry.time)).toLocaleString() + "</td>" +
            "</tr>";
    });
    var tableBody = $("#tableBody");
    tableBody.html(gpsRows);
}


/*
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
*/
var map = null;
$(function () {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lng: 10.402370, lat: 55.403756}
    });
});
var currentMarkers = [];

function updateMyMap(gpsData) {
    currentMarkers.forEach(function (marker) {
        if (marker.delete) {
            marker.setMap(null);
        }
    });

    var preparedGpsData = [];
    gpsData.forEach(function (element) {
        preparedGpsData.push(new google.maps.LatLng(element.latitude, element.longitude));
    });

    currentMarkers.forEach(function (marker) {
        marker.delete = true
    });

    preparedGpsData.forEach(function (element) {
        var marker = new google.maps.Marker({
            position: element,
            map: map,
            title: 'Hello World!'
        });
        currentMarkers.push(marker);
    });

}
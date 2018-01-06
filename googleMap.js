$(function () {
    setInterval(getData, 500);
});
var map = null;

$(function () {
    var odense = new google.maps.LatLng(55.4038, 10.4024);
    var mapCanvas = document.getElementById("map");
    var mapOptions = {center: odense, zoom: 6};
    map = new google.maps.Map(mapCanvas, mapOptions);
});

var currentMarkers = [];

function placeMarker() {
    for (var i = 0; i < preparedGpsData.length; i++) {
        var marker = new google.maps.Marker({
            position: preparedGpsData[i],
            map: map
        });
        if (currentMarkers.length >= 100) {
            currentMarkers[i].setMap(null);
            currentMarkers.splice(i, 1, marker)
        } else {
            currentMarkers.splice(i, 1, marker)
        }
    }
}

function getData() {
    $.ajax({
        type: "GET",
        url: "https://api.joerha.dk/gps/2/100",
        success: function (data) {
            prepareData(data.data);
        }
    });
}

var preparedGpsData = [];

function prepareData(data) {
    data.forEach(function (gpsEntry) {
        if (preparedGpsData.length >= 100) {
            preparedGpsData.shift();
            preparedGpsData.push(new google.maps.LatLng(gpsEntry.latitude, gpsEntry.longitude));
        } else {
            preparedGpsData.push(new google.maps.LatLng(gpsEntry.latitude, gpsEntry.longitude));
        }
    });
    placeMarker()
}
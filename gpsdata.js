var map = null;
$(function () {
    if ($('#googleScript').length > 0) {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: {lng: 10.402370, lat: 55.403756}
        });
    }
    setInterval(gpsEntryList.fetch, 500);
});

var GpsEntryList = function () {
    var list = this;

    this.list = [];
    this.lastId = 0;
    this.fetchAmount = 10;
    this.setFetchAmount = function (amount) {
        list.fetchAmount = amount;
        list.lastId = 0
    };
    this.add = function (element) {
        if (element.id > list.lastId) {
            if (map !== null) {
                element.marker = createMarker(element, map);
            }
            list.lastId = element.id;
            list.list.push(element);
        }
        while (list.list.length > list.fetchAmount) {
            var shifted = list.list.shift();
            shifted.marker.setMap(null);
        }
    };
    this.fetch = function () {
        $.ajax({
            type: "GET",
            url: "https://api.joerha.dk/gps/2/" + list.fetchAmount,
            success: function (data) {
                updateView(data.data);
                var reversed = data.data.reverse();
                reversed.forEach(function (element) {
                    list.add(element)
                });
            }
        });
    };
};
var gpsEntryList = new GpsEntryList();

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

function createMarker(gpsEntry, map) {
    return new google.maps.Marker({
        position: new google.maps.LatLng(gpsEntry.latitude, gpsEntry.longitude),
        map: map
    });
}
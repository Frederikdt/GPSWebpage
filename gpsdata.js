$(function () {
    setInterval(getData, 500);
});
function getData() {
    $.ajax({
        type: "GET",
        url: "https://api.joerha.dk/gps/2/10",
        success: function (data) {
            updateView(data.data)
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
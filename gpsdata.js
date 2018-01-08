$(function () {
    setInterval(getData, 500);
});
// ajax call that takes data from api and on success calls function updateView
function getData() {
    $.ajax({
        type: "GET",
        url: "https://api.joerha.dk/gps/2/10",
        success: function (data) {
            updateView(data.data)
        }
    });
}
// Takes data from api, creates rows and moves rows to table
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

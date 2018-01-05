var position;
var stations;

//finds where your destination is (needs importing cookies)
var destination = getAllUrlParams().destination;
var line = getAllUrlParams().line;

var text1 = document.getElementById("text1");
var text2 = document.getElementById("text2");
var text3 = document.getElementById("text3");

setInterval(function() {
    $.ajax({
        url: 'http://45.76.188.63:3000/get/position',
        type: "POST",
        data: {
            busnumber: $('#busnumberSelect').val(),
            busid: $('#busidSelect').val()
        },
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Client-ID', 'f4n35oyh');
            xhr.setRequestHeader('Client-Secret', '8m4xriwFTJaALQdD1pmmnnP9hyw8hpXx');
        },
        success: (data, textStatus, request) => {
            $('#headArea').val(request.getAllResponseHeaders());
            $('#bodyArea').val(JSON.stringify(data));
            position = data;
            //console.log(position);
            $('#loadingCard').hide();
        },
        error: () => {
            alert('Timeout');
            $('#loadingCard').hide();
        }
    });
    // $.post('http://45.76.188.63:3000/get/position', function(data, textStatus, xhr){
    //     console.log(data);
    //     position = data;
    // });
    // $.post('http://45.76.188.63:3000/get/stations', function(data, textStatus, xhr){
    //     console.log(data);
    //     stations = data;
    // });
}, 2000);

$.ajax({
    url: 'http://45.76.188.63:3000/get/stations',
    type: "POST",
    data: {
        busnumber: $('#busnumberSelect').val(),
        busid: $('#busidSelect').val()
    },
    beforeSend: (xhr) => {
        xhr.setRequestHeader('Client-ID', 'f4n35oyh');
        xhr.setRequestHeader('Client-Secret', '8m4xriwFTJaALQdD1pmmnnP9hyw8hpXx');
    },
    success: (data, textStatus, request) => {
        $('#headArea').val(request.getAllResponseHeaders());
        $('#bodyArea').val(JSON.stringify(data));
        stations = data;
        //console.log(stations);
        $('#loadingCard').hide();
        //finds what your bus number is, return as String "1, 2, 4" etc.

        function showBusNumber(destination){
            var res = "";
            for(var i=1; i<=6; i++){
                if(stations.data[destination].line[i-1]!=0){
                    if(res == "") {
                        res += i;
                    } else {
                        res += ", "+i;
                    }
                }
            }
            console.log(res);
        }

        //return if the bus number can reach the destination or not
        function isBusNumber(destination,line){
            return stations.data[destination].line[line-1]!=0
        }

        //copied from https://stackoverflow.com/questions/639695/
        function measureDist(lat1, lon1, lat2, lon2){  // generally used geo measurement function
            var R = 6378.137; // Radius of earth in KM
            var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
            var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c;
            return d * 1000; // meters
        }

        //finds your position from GPS
        var yourPosX;
        var yourPosY;

        //finds where your beginning station is (by finding the closest distance)
        var station;
        function findStation(yourPosX,yourPosY){
            var min = 1000000;
            var minStation = -1;
            for(var i=0; i<stations.data.length; i++){
                var dist = stationDistance(yourPosX,yourPosY,i);
                if(dist<min){
                    min = dist;
                    minStation = i;
                }
            }
            return minStation;
        }

        //finds the distance between you and your station
        function stationDistance(yourPosX,yourPosY,station){
            return measureDist(yourPosX,yourPosY,stations.data[station].latitude,stations.data[station].longitude)
        }

        //finds where you are in the line (as an index referring to routeline array)
        //ex: line 1 [0,1,2,3,4,5,6,7,8,9,10] routelineIndex(6,1) = 6
        //ex: line 3 [0,25,1,24,26,11,8,9,10] routelineIndex(25,3) = 1, routelineIndex(10,3) = 9
        function routelineIndex(station,line){
            for(var i=0; i<routeline[line-1].length; i++){
                if(routeline[line-1][station]==i){
                    return i;
                }
            }
        }

        //checks if you are about to reach the next stop (input your position and where your next station is)
        function isNearStop(yourPosX,yourPosY,station){
            return stationDistance(yourPosX,yourPosY,station) < alertDist[station];
        }

        // * New template *

        // You are now at thisStationName()
        // Next station: nextStationName()
        // In remainingStops(), you will reach your destination.

        function thisStationName(station){
            return stations.data[station].name;
        }

        function nextStationName(station,line){
            var now = routelineIndex(station,line);
            station = routeline[line-1][(routelineIndex(station,line)+1)%routeline[line-1].length];
            return thisStationName(station);
        }

        // if(isNearStop(yourPosX,yourPosY,station+1)){
        //     now++;
        //     now = now%routeline[line-1].length;
        //     nextName = stations.data[routeline[line-1][now]].name;
        // }
        // return nextName;


        function remainingStops(station,line,destination){
            return (routelineIndex(destination,line)-routelineIndex(station,line)+routeline[line-1].length)%routeline[line-1].length;
        }

        setTimeout(getLocation(),500); //MAIN

        function getLocation() { //gets location everytime you change your position
            if (navigator.geolocation){
                navigator.geolocation.watchPosition(setPosition);
            }
        }

        function setPosition(pos) {
            yourPosX = pos.coords.latitude;
            yourPosY = pos.coords.longitude;
            station = findStation(yourPosX,yourPosY);
            //running the code
            console.log("Position "+yourPosX+" "+yourPosY);
            console.log("Are you at stop 10 (Engineering)? "+isNearStop(yourPosX,yourPosY,station));
            console.log("Nearest stop at "+10+", name = "+thisStationName(station));
            console.log("Routeline index of stop nearest stop at line 1 = "+routelineIndex(station,1));
            console.log("This station = "+thisStationName(station));
            console.log("Next station at line 1 = "+nextStationName(station,1));
            console.log("Remaining stops (from Engineering to Chaloemphao, line 1) = "+remainingStops(station,1,destination));
            text1.innerHTML = "You are now at " +thisStationName(station);
            text2.innerHTML = "Next station: " +nextStationName(station,line);
            text3.innerHTML = "In "+ remainingStops(station,line,destination)+" , you will reach your destination.";
        }


    },
    error: () => {
        alert('Timeout');
        $('#loadingCard').hide();
    }
});

var routeline = [
    [0,1,2,3,4,5,6,7,8,9,10],//line1
    [0,25,26,11,12,13,14,15,19,20,8,9,10],//line2
    [0,25,1,24,26,11,8,9,10],//line3
    [0,25,2,3,4,5,6,7,12,13,14,22,23,8,9,10]//line4
];

//when to alert, corresponding to each index of array
var alertDist = [175,170,530,160,230,300,200,180,90,150,130,190,100,180,120,190,0,0,0,160,240,0,110,100,160,50,140,0];


function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}

// You are now at thisStationName()
// Next station: nextStationName()
// In remainingStops(), you will reach your destination.

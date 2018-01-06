var position;
var stations;

//finds where your destination is (needs importing cookies)
var destination = parseInt(getAllUrlParams().destination);
var line = parseInt(getAllUrlParams().line);

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

var stations = {"status":1,"data":[
    {"name":"Salaprakeaw","latitude":13.735581,"longitude":100.531774,"line":[1,2,3,4,5,6]},
    {"name":"Faculty of Political Science","latitude":13.734346,"longitude":100.532809,"line":[1,0,3,4,0,0]},
    {"name":"Patumwan Demonstration School","latitude":13.739323,"longitude":100.534902,"line":[1,0,0,4,0,0]},
    {"name":"Faculty of Veterinary Science","latitude":13.741897,"longitude":100.535293,"line":[1,0,0,4,0,0]},
    {"name":"Chaloemphao Junction","latitude":13.744799,"longitude":100.535741,"line":[1,0,0,4,0,0]},
    {"name":"Lido","latitude":13.74582,"longitude":100.532442,"line":[1,0,0,4,0,0]},
    {"name":"MBK Center","latitude":13.7437,"longitude":100.530533,"line":[1,0,0,4,0,0]},
    {"name":"Triamudom Suksa School","latitude":13.740412,"longitude":100.530008,"line":[1,0,0,4,0,0]},
    {"name":"Faculty of Architecture","latitude":13.739439,"longitude":100.531055,"line":[1,2,3,4,5,6]},
    {"name":"Faculty of Arts","latitude":13.739039,"longitude":100.532986,"line":[1,2,3,4,5,6]},
    {"name":"Faculty of Engineering","latitude":13.737499,"longitude":100.532584,"line":[1,2,3,4,5,6]},
    {"name":"Faculty of Science","latitude":13.737706,"longitude":100.530546,"line":[0,2,3,0,5,0]},
    {"name":"Faculty of Education","latitude":13.737995,"longitude":100.528593,"line":[0,2,0,4,0,0]},
    {"name":"Sport Complex","latitude":13.738187,"longitude":100.526601,"line":[0,2,0,4,0,6]},
    {"name":"Charmchuri 9 Building","latitude":13.736445,"longitude":100.526296,"line":[0,2,0,4,5,6]},
    {"name":"CU Dharma Centre","latitude":13.739604,"longitude":100.526243,"line":[0,2,0,0,5,6]},
    {"name":"Vidhayapattana Building","latitude":13.741907,"longitude":100.52766,"line":[0,0,0,0,0,0]},
    {"name":"Metallic and Material Research Institute PetroChemical College","latitude":13.743236,"longitude":100.527311,"line":[0,0,0,0,0,0]},
    {"name":"Faculty of Sports Science","latitude":13.743887,"longitude":100.527982,"line":[0,0,0,0,0,0]},
    {"name":"CU Dormitory","latitude":13.74074,"longitude":100.527445,"line":[0,0,0,0,0,0]},
    {"name":"CU Office","latitude":13.738911,"longitude":100.52943,"line":[0,2,0,0,5,0]},
    {"name":"Pop Bus Garage","latitude":13.736331,"longitude":100.52514,"line":[0,0,0,0,0,0]},
    {"name":"U-Center","latitude":13.735313,"longitude":100.527302,"line":[0,0,0,4,0,6]},
    {"name":"Faculty of Law","latitude":13.735137,"longitude":100.5284127,"line":[0,0,0,4,0,6]},
    {"name":"Faculty of Medicine","latitude":13.7329026109075,"longitude":100.535379052162,"line":[0,0,3,0,0,0]},
    {"name":"Mahitaladhibesra Building","latitude":13.734586,"longitude":100.531329,"line":[0,2,3,0,5,0]},
    {"name":"Mahamakut Building","latitude":13.735732,"longitude":100.530825,"line":[0,2,3,0,5,0]},
    {"name":"CU Terrace","latitude":13.740985,"longitude":100.525227,"line":[0,0,0,0,5,6]}]
};

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
        if(station==routeline[line-1][i]){
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
    console.log(destination);
    console.log(station);
    console.log(line);
    console.log(routeline[line-1].length);
    console.log(routelineIndex(destination,line));
    console.log(routelineIndex(station,line));
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
    //HTML

    // You are now at thisStationName()
    // Next station: nextStationName()
    // In remainingStops(), you will reach your destination.

    text1.innerHTML = "You are now at " +thisStationName(station);
    text2.innerHTML = "Next station: " +nextStationName(station,line);
    text3.innerHTML = "In "+ remainingStops(station,line,destination)+" stops, you will reach your destination.";
}

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

var position = {"status":1,"data":[
    {"id":1,"latitude":13.745152318862104,"longitude":100.5307873518082,"line":1},
    {"id":2,"latitude":13.734617182552764,"longitude":100.53174817759265,"line":1},
    {"id":3,"latitude":13.745077846549039,"longitude":100.53576066729309,"line":1},
    {"id":4,"latitude":13.736382013554607,"longitude":100.53167937712773,"line":2},
    {"id":5,"latitude":13.744757235227604,"longitude":100.5282149254959,"line":2},
    {"id":6,"latitude":13.735581,"longitude":100.531774,"line":2},
    {"id":7,"latitude":13.734251556818318,"longitude":100.53299642975489,"line":3},
    {"id":8,"latitude":13.733799246689452,"longitude":100.53400324814501,"line":3},
    {"id":9,"latitude":13.737550105797435,"longitude":100.53168827005386,"line":3},
    {"id":10,"latitude":13.743787380511236,"longitude":100.53563575586098,"line":4},
    {"id":11,"latitude":13.738686347952365,"longitude":100.52981802113757,"line":4},
    {"id":12,"latitude":13.745640445706266,"longitude":100.53357121601128,"line":4}]
};
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
    {"name":"Faculty of Science","latitude":13.737706,"longitude":100.530546,"line":[0,2,3,0,0,0]},
    {"name":"Faculty of Education","latitude":13.737995,"longitude":100.528593,"line":[0,2,0,4,0,0]},
    {"name":"Sport Complex","latitude":13.738187,"longitude":100.526601,"line":[0,2,0,4,0,6]},
    {"name":"Charmchuri 9 Building","latitude":13.736445,"longitude":100.526296,"line":[0,2,0,4,0,6]},
    {"name":"CU Dharma Centre","latitude":13.739604,"longitude":100.526243,"line":[0,2,0,0,0,0]},
    {"name":"Vidhayapattana Building","latitude":13.741907,"longitude":100.52766,"line":[0,2,0,0,0,0]},
    {"name":"Metallic and Material Research Institute PetroChemical College","latitude":13.743236,"longitude":100.527311,"line":[0,2,0,0,0,0]},
    {"name":"Faculty of Sports Science","latitude":13.743887,"longitude":100.527982,"line":[0,2,0,0,0,0]},
    {"name":"CU Dormitory","latitude":13.74074,"longitude":100.527445,"line":[0,2,0,0,0,0]},
    {"name":"CU Office","latitude":13.738911,"longitude":100.52943,"line":[0,2,0,4,5,6]},
    {"name":"Pop Bus Garage","latitude":13.736331,"longitude":100.52514,"line":[0,2,0,0,0,0]},
    {"name":"U-Center","latitude":13.735313,"longitude":100.527302,"line":[0,0,0,4,0,6]},
    {"name":"Faculty of Law","latitude":13.735137,"longitude":100.5284127,"line":[0,0,0,4,0,6]},
    {"name":"Faculty of Medicine","latitude":13.7329026109075,"longitude":100.535379052162,"line":[0,0,3,0,0,0]},
    {"name":"Mahitaladhibesra Building","latitude":13.734586,"longitude":100.531329,"line":[0,2,0,0,0,0]},
    {"name":"Mahamakut Building","latitude":13.735732,"longitude":100.530825,"line":[0,2,0,0,0,0]},
    {"name":"CU Terrace","latitude":13.740985,"longitude":100.525227,"line":[0,0,0,0,5,6]}]
};

//copied from https://stackoverflow.com/questions/639695/
function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
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

function getLocation() {
    if (navigator.geolocation){
        navigator.geolocation.watchPosition(setPosition);
    }
}
function setPosition(position) {
    yourPosX = position.coords.latitude;
    yourPosY = position.coords.longitude;
    console.log(yourPosX+''+yourPosY)
}

getLocation();

//finds where your destination is
var destination = 5; //Lido (needs importing cookies)
var line = 4; //4th line

//finds what your bus number is, return as String "1, 2, 4" etc.
function busNumber(){
    var res = "";
    for(var i=1; i<=4; i++){
        if(stations.data[destination].line[i-1]!=0){
            if(res == "") {
                res += i;
            } else {
                res += ", "+i;
            }
        }
    }
    res += ".";
    console.log(res);
}

busNumber();

//reminds when you are near the destination
function (){

}




console.log(position.data[0].latitude);
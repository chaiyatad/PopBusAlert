
var destination = getAllUrlParams().destination;

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

var app = angular.module("test",[]);

app.controller("myCtrl",function($scope){
  $scope.showBusNumber = function(){
      var res = [];
      for(var i=1; i<=6; i++){
          if(stations.data[destination].line[i-1]!=0){
              res.push(i);
          }
      }
      console.log(res);
      if (res.length == 0){
        document.getElementById('ExitButton').style.display = 'block';
      }
      return res;
  };

  $scope.testFunction = function(i){
    location.href='../html/thirdScreen.html?destination='+destination+'&line='+i;
    // location.href='../html/.html?destination='+destination+'&line='+i;
  }

});

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

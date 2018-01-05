var destination = document.cookie;
destination = destination.substring(destination.lastIndexOf("=")+1,destination.length);
console.log(destination)
console.log(document.cookie)


var temp = document.cookie.split(";")

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
      return res;
  };

  $scope.testFunction = function(i){
    document.cookie = "busLine="+i+";";
    console.log(document.cookie);
    location.href='../html/thirdScreen.html';
  }

});

var destination;

var stops=[
  "Salaprakeaw"
  ,"Faculty of Political Science"
  ,"Patumwan Demonstration"
  ,"Faculty of Veterinary Science"
  ,"Chaloemphao Junction"
  ,"MBK Center"
  ,"Triamudom Suksa School"
  ,"Faculty of Architecture"
  ,"Faculty of Arts"
  ,"Faculty of Engineering"
  ,"Faculty of Science"
  ,"Faculty of Education"
  ,"Charmchuri 9 Building"
  ,"CU Dharma Centre"
  ,"Vidhayapattana Building"
  ,"Metallic and Material Research Institute PetroChemical College"
  ,"Faculty of Sports Science"
  ,"CU Dormitory"
  ,"CU Office"
  ,"Pop Bus Garage"
  ,"U-Center"
  ,"Faculty of Law"
  ,"Faculty of Medicine"
  ,"Mahitaladhibesra Building"
  ,"Mahamakut Building"
  ,"CU Terrace"
];

var select = document.getElementById('select');
var temp= '<option value="" disabled selected>Select your option</option>' ;
for(var i = 0;i<stops.length;i++){
  temp+='<option value='+i+'>'+stops[i]+'</option>'
}
select.innerHTML = temp

var button = document.getElementById('button');
button.onclick = function() {
  destination = select.value;
  if(destination==""){
    window.alert("Please select destination");
  }
  else{
    document.cookie = "destination="+destination+";";
    console.log(document.cookie)
    location.href='../html/secondScreen.html?destination='+destination;
  }
}

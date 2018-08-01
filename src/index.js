document.getElementById("sendMessage").onclick = function() {
  let searchVar = document.getElementById("search");
  let url =
    "https://api.data.gov/ed/collegescorecard/v1/schools?api_key=OMdhJVN0l5MVDVNw0VzHsU9TPvThmRVoqpKrqKt6&fields=school.name,school.state,school.city,school.school_url,2015.admissions.admission_rate.overall,2015.student.size&";
  var sel1 = document.getElementById("state");
  var sel2 = document.getElementById("name");
  var inpText = document.getElementById("textInput").value;
  if (sel1.checked) {
    url = url + "school.state=" + inpText;
  } else if (sel2.checked) {
    url = url + "school.name=" + inpText;
  } else {
    alert("Select field for search.");
  }
  var oReq = new XMLHttpRequest();
  oReq.onload = function(e) {
    let json = JSON.parse(this.responseText);
    let oRes = json.results;

    var Row = document.createElement("tr");
    var thname = document.createElement("th");
    var thcity = document.createElement("th");
    var thurl = document.createElement("th");
    var thenroll = document.createElement("th");
    var thadmission = document.createElement("th");
    var cell = Row.insertCell(0);
    var Name = document.createTextNode("School Name");
    var City = document.createTextNode("City");
    var Url = document.createTextNode("Url");
    var Enroll = document.createTextNode("Enrollment");
    var Admission = document.createTextNode("Admission Rate");

    thname.appendChild(Name);
    thcity.appendChild(City);
    thurl.appendChild(Url);
    thenroll.appendChild(Enroll);
    thadmission.appendChild(Admission);

    Row.appendChild(thname);
    Row.appendChild(thcity);
    Row.appendChild(thurl);
    Row.appendChild(thenroll);
    Row.appendChild(thadmission);

    //need to find out which element id needs to  be fetched for the innerHTML

    document.getElementById("tableGang").innerHTML = "";
    document.getElementById("tableGang").appendChild(Row);
    for (var i = 0; i < oRes.length; i++) {
      console.log(oRes[i]);
      var newRow = document.createElement("tr");
      var cell = newRow.insertCell(0);
      var nameData = document.createElement("td");
      var cityData = document.createElement("td");
      var urlData = document.createElement("td");

      var enrollData = document.createElement("td");
      var admissionData = document.createElement("td");
      var printName = document.createTextNode(oRes[i]["school.name"]);
      var printCity = document.createTextNode(oRes[i]["school.city"]);
      var printUrl = "http://" + oRes[i]["school.school_url"];
      var printEnroll = document.createTextNode(oRes[i]["2015.student.size"]);

      let numberadmisson =
        oRes[i]["2015.admissions.admission_rate.overall"] || "";

      let percentadmission = numberadmisson && Math.floor(numberadmisson * 100);

      var printAdmission = document.createTextNode(percentadmission);

      nameData.appendChild(printName);
      cityData.appendChild(printCity);
      //urlData.appendChild(printUrl);
      enrollData.appendChild(printEnroll);
      admissionData.appendChild(printAdmission);

      newRow.appendChild(nameData);
      newRow.appendChild(cityData);
      newRow.appendChild(urlData);
      newRow.appendChild(enrollData);
      newRow.appendChild(admissionData);

      var aTag = document.createElement("a");
      aTag.setAttribute("href", printUrl);
      aTag.setAttribute("target", "_blank");
      aTag.innerHTML = printUrl;
      urlData.appendChild(aTag);

      //need to find out which element id needs to  be fetched for the innerHTML

      document.getElementById("tableGang").appendChild(newRow);
    }
  };
  oReq.open("GET", url);
  oReq.send();
};

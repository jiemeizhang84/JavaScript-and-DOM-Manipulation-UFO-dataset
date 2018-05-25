// initiate the ufodata
var filteredUfoData = dataSet;
var $dateInput = document.querySelector("#date");
var $searchBtn = document.querySelector("#search");

$searchBtn.addEventListener("click", handleSearchButtonClick);

var $tbody = document.querySelector("tbody");

function renderTable() {
    $tbody.innerHTML = "";
    for (var i = 0; i < filteredUfoData.length; i++) {
      
      var ufo = filteredUfoData[i];
      var fields = Object.keys(ufo);
      
      var $row = $tbody.insertRow(i);
      for (var j = 0; j < fields.length; j++) {
        
        var field = fields[j];
        var $cell = $row.insertCell(j);
        $cell.innerText = ufo[field];
      }
    }
}

function handleSearchButtonClick() {
    // Format the user's search by removing leading and trailing whitespace, lowercase the string
    var filterDate = $dateInput.value.trim().toLowerCase();
  
    // Set filteredAddresses to an array of all addresses whose "state" matches the filter
    filteredUfoData = dataSet.filter(function(ufo) {
      var ufoDate = ufo.DateTime.toLowerCase();
  
      // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
      return ufoDate === filterDate;
    });
    renderTable();
  }

renderTable();

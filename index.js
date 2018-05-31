// initiate the ufodata
var filteredUfoData = dataSet;
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");

$searchBtn.addEventListener("click", handleSearchButtonClick);

var $tbody = document.querySelector("tbody");

// var result_start = 0;
// var result_end = 50;
var result_per_page = 0;
var page_num = 1;
var result_start = (page_num - 1) * result_per_page;
var result_end = page_num * result_per_page;

function paginationUpdate() {
  d3.selectAll("li").remove();
  d3.selectAll("#result_per_page").remove();
  
  var total_result = filteredUfoData.length;
  if (total_result > 500) {
    var total_page = 10;
    result_per_page = Math.ceil(total_result/total_page);
  }
  else if (total_result > 50) {
    result_per_page = 50;
    total_page = Math.ceil(total_result/result_per_page);
  }
  else {
    result_per_page = total_result;
    total_page = 1;
  }

  d3.select("ul").append("li").append("a").attr("aria-label","Previous").append("span").attr("aria-hidden","true").text("Previous");
  for (var i = 0; i < total_page; i++) {
    var $li = d3.select("ul").append("li").append("a");
    $li.text(i+1);
  }
  d3.select("ul").append("li").append("a").attr("aria-label","Next").append("span").attr("aria-hidden","true").text("Next");
  d3.select("nav").append("p").attr("id","result_per_page").attr("style","color:white").text(result_per_page + " results/page")

  
}

function renderTable() {
    $tbody.innerHTML = "";
    for (var i = 0; i < result_per_page; i++) {
      
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

function renderTable2() {
  result_start = (page_num - 1) * result_per_page;
  
  $tbody.innerHTML = "";
  for (var i = 0; i < result_per_page; i++) {
    
    var ufo = filteredUfoData[i+result_start];
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
    var filterDate = $dateInput.value.trim();
    var filterCity = $cityInput.value.trim();
    var filterState = $stateInput.value.trim();
    var filterCountry = $countryInput.value.trim();
    var filterShape = $shapeInput.value.trim();
  
    // Set filteredAddresses to an array of all addresses whose "state" matches the filter
    filteredUfoData = dataSet.filter(function(ufo) {
      var ufoDate = ufo.datetime;
      var ufoCity = ufo.city;
      var ufoState = ufo.state;
      var ufoCountry = ufo.country;
      var ufoShape = ufo.shape;
  
      // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
      return (ufoDate === filterDate || filterDate === "") && (ufoCity === filterCity || filterCity === "") && (ufoState === filterState || filterState === "") && (ufoCountry === filterCountry || filterCountry === "") && (ufoShape === filterShape || filterShape === "")   
    });
    paginationUpdate()
    renderTable();
  }
paginationUpdate()
renderTable();

d3.selectAll("li").on("click", function() {
  //  2. What will be logged out? What is `this` in this case?
  console.log("Here, this is the li");
  console.log(this.innerText);
  page_num = this.innerText;
  //  Answer: It will console log the `button` element.
  renderTable2();
});

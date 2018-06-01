// initiate the variables
var filteredUfoData = dataSet;
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $tbody = document.querySelector("tbody");

var result_per_page = 50;
var page_num = 1;
var result_start = (page_num - 1) * result_per_page;
var total_result = filteredUfoData.length;
var total_page = Math.ceil(total_result/result_per_page);

// call handleSearchButtonClick when click search button
$searchBtn.addEventListener("click", handleSearchButtonClick);


// function to update pagination
function paginationUpdate() {
  d3.selectAll("li").remove();
  
  
  if (total_page > 5) {
    d3.select("ul").append("li").append("a").attr("aria-label","Previous").append("span").attr("aria-hidden","true").text("Previous");
    for (var i = 0; i < 3; i++) {
      var $li = d3.select("ul").append("li").append("a");
      $li.text(i+1);
    }
    $li = d3.select("ul").append("li").append("a");
    $li.text("...");
    $li = d3.select("ul").append("li").append("a");
    $li.text(total_page);

    d3.select("ul").append("li").append("a").attr("aria-label","Next").append("span").attr("aria-hidden","true").text("Next");
    
  }
  else {
    d3.select("ul").append("li").append("a").attr("aria-label","Previous").append("span").attr("aria-hidden","true").text("Previous");
    for (var i = 0; i < total_page; i++) {
      var $li = d3.select("ul").append("li").append("a");
      $li.text(i+1);
    }
    d3.select("ul").append("li").append("a").attr("aria-label","Next").append("span").attr("aria-hidden","true").text("Next");
  }
  resultCount();

}

// function to intiate result count after each new search
function resultCountInit() {
  d3.select("#result-count").select("p").remove();
  console.log(total_result);
  if (total_result === 0) {
    d3.select("#result-count").append("p").attr("style","color:white").text("No resluts");
  } else {
  result_start = 0;
  var start_result = result_start + 1;
  if (total_page !==1) {    
    var end_result = result_start + 50;    
  }
  else {    
    var end_result = total_result;    
  }
  d3.select("#result-count").append("p").attr("style","color:white").text("Showing " + start_result + " to " + end_result + " of " + total_result + " results");
 }
}

// function to update result count
function resultCount() {
  d3.select("#result-count").select("p").remove();
  var start_result = result_start + 1;
  if (page_num !== total_page) {    
    var end_result = result_start + 50;    
  }
  else {    
    var end_result = total_result;    
  }
  d3.select("#result-count").append("p").attr("style","color:white").text("Showing " + start_result + " to " + end_result + " of " + total_result + " results");
}

// function to update data table
function renderTable() {
  if (total_result === 0) {
    $tbody.innerHTML = "";
  } else {
    if (total_page!==1) {
      var result_per_page_end = result_per_page;
    }
    else {
      var result_per_page_end = total_result;
      
    }
    
    $tbody.innerHTML = "";
    for (var i = 0; i < result_per_page_end; i++) {
      
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

}

function renderTable2() {
  result_start = (page_num - 1) * result_per_page;
  if (page_num !== total_page) {
    var result_per_page_end = result_per_page;
  }
  else {
    var result_per_page_end = total_result - (total_page - 1)*result_per_page;
  }
  $tbody.innerHTML = "";
  for (var i = 0; i < result_per_page_end; i++) {
    var result_per_page_start = i + result_start;
    var ufo = filteredUfoData[result_per_page_start];
    
    var fields = Object.keys(ufo);
    
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = ufo[field];
    }
  }  
}


// function to handle search button
function handleSearchButtonClick() {
    
    var filterDate = $dateInput.value.trim();
    var filterCity = $cityInput.value.trim();
    var filterState = $stateInput.value.trim();
    var filterCountry = $countryInput.value.trim();
    var filterShape = $shapeInput.value.trim();
  
    
    filteredUfoData = dataSet.filter(function(ufo) {
      var ufoDate = ufo.datetime;
      var ufoCity = ufo.city;
      var ufoState = ufo.state;
      var ufoCountry = ufo.country;
      var ufoShape = ufo.shape;
  
      
      return (ufoDate === filterDate || filterDate === "") && (ufoCity === filterCity || filterCity === "") && (ufoState === filterState || filterState === "") && (ufoCountry === filterCountry || filterCountry === "") && (ufoShape === filterShape || filterShape === "")   
    });

    total_result = filteredUfoData.length;
    total_page = Math.ceil(total_result/result_per_page);

    
    paginationUpdate();
    renderTable();
    resultCountInit();
    
    d3.selectAll("li").on("click", function() {
  
      this_content = this.innerText;
      if (this_content === "Previous"){
        page_num --;
      }
      else if (this_content === "Next"){
        page_num ++;
      }
      else {
        page_num = parseInt(this_content);
      }

      renderTable2();
      resultCount();
    });
  }

paginationUpdate();
renderTable();


// function to handle pagination button
d3.selectAll("li").on("click", function() {
  
  this_content = this.innerText;
  if (this_content === "Previous"){
    page_num --;
  }
  else if (this_content === "Next"){
    page_num ++;
  }
  else {
    page_num = parseInt(this_content);
  }

  renderTable2();
  resultCount();
});



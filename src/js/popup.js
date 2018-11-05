import "../css/popup.css";
import hello from "./popup/example";
function openOutput() {
/*
    document.getElementById("output").classList.toggle("output");
*/
    var div = document.getElementById("output");
    div.style.display = div.style.display == "block" ? "none" : "block";
} //define openOutput to toggle CSS class
// ^^^ per https://stackoverflow.com/questions/19074171/how-to-toggle-a-divs-visibility-by-using-a-button-click
document.getElementById("output-button").addEventListener('click', openOutput); //tells button to use openOutput on click
//----------------------
var queryString = localStorage.getItem('receivedQuery');

function saveQuery() {
    localStorage.setItem('receivedQuery', queryString); //This function saves the input query to a js variable in local storage
}

function getQuery() { //get query from form when submitted and store in local
    queryString = document.getElementById("query-input").value;
    if (queryString == null) {
        queryString = "Please input a search into the query section!"; //If the var queryString is empty, fill it with this
    }
    saveQuery();
    displayQuery(); //Comment out to use dispQuery()
    //dispQuery(); Commented out. Use for displaying the query for test purposes
}
document.getElementById("query-form").addEventListener('submit',function(e) { //On query submit click, retrieve, store, and display the query
    e.preventDefault()
    getQuery();
});

/* //This is for displaying the query for test purposes. To use, comment out displayQuery()
function dispQuery() {
    document.getElementById("output-paragraph").innerHTML = "Your query was: " + queryString + ".";
}
*/

function displayQuery() {
    var request = new XMLHttpRequest(); //div request-output
    request.open('GET', 'https://api.edamam.com/api/food-database/parser?ingr='+queryString+'&app_id=2f21f66d&app_key=b16d1dd962aa7f5edaef3461a748bd2f');
    //https://api.edamam.com/api/food-database/parser?ingr=3 cups chicken breast&app_id=2f21f66d&app_key=b16d1dd962aa7f5edaef3461a748bd2f
    request.onload = function() {
        var data = JSON.parse(request.responseText);
        document.getElementById("1").innerHTML = "Input text: " + data["text"];// + ", Interpretation: " + data.parsed.food.label + ", Calories: " + data.parsed.food.nutrients.ENERC_KCAL + ".";
        document.getElementById("2").innerHTML = "Interpretation: " + data["parsed"][0]["food"]["label"];// + ", Interpretation: " + data.parsed.food.label + ", Calories: " + data.parsed.food.nutrients.ENERC_KCAL + ".";
        document.getElementById("3").innerHTML = "Calories: " + data["parsed"][0]["food"]["nutrients"]["ENERC_KCAL"];// + ", Interpretation: " + data.parsed.food.label + ", Calories: " + data.parsed.food.nutrients.ENERC_KCAL + ".";
    }
    request.send();
}

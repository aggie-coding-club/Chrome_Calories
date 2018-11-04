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
    queryString = document.getElementById("query-form").value;
    if (queryString == null) {
        queryString = "Please input a search into the query section!"; //If the var queryString is empty, fill it with this
    }
    saveQuery();
    dispQuery();
}
document.getElementById("query-button").addEventListener('submit',function(e) { //On query submit click, retrieve, store, and display the query
    e.preventDefault()
    getQuery();
});

function dispQuery() {
    document.getElementById("output-paragraph").innerHTML = "Your query was: " + queryString + ".";
}



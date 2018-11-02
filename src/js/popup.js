import "../css/popup.css";
import hello from "./popup/example";
function openOutput() {
    document.getElementById("output").classList.toggle("output");
} //define openOutput to toggle CSS class
document.getElementById("output-button").addEventListener('click',openOutput); //tells button to use openOutput on click
//----------------------
var queryString;
function saveQuery() {
    localStorage.setItem('receivedQuery', queryString); //This function saves the input query to a js variable in local storage
}
var queryString = localStorage.getItem('receivedQuery'); //put the 'received query' data into the var queryString
if (queryString == null) {
    queryString = "Please input a search into the query section!"; //If the var queryString is empty, fill it with this
}
function getQuery() { //get query from form when submitted and store in local
    queryString = document.getElementById("query-form").value;
    saveQuery();
    dispQuery();
}
document.getElementById("query-form").addEventListener('submit',function(e) { //On query submit click, retrieve, store, and display the query
    e.preventDefault()
    getQuery();
});

function dispQuery() {
    document.getElementById("output-paragraph").innerHTML = "Your query was: ${queryString}.";
}



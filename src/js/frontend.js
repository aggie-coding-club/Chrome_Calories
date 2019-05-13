exports.noInput = function(){
    //code to be run when search is run with no text
    //document.getElementById("0").innerHTML = "PLEASE INPUT A FOOD INTO THE SUBMIT BOX";
    clearSearchOutput();
    document.getElementById("search-dialogue").innerHTML = "Please enter a food";
}
function clearSearchOutput(){
    //clear search content on screen
    document.getElementById("search-dialogue").innerHTML = "";
    document.getElementById("search-1").innerHTML = "";
    document.getElementById("search-2").innerHTML = "";
    document.getElementById("search-3").innerHTML = "";
    document.getElementById("search-read").innerHTML = "";
    document.getElementById("search-interpretation").innerHTML = "";
    document.getElementById("search-calories").innerHTML = "";
    document.getElementById("search-output").style.display= 'none';
}
exports.changeSearchOutput=function(input,interpretation,calorieCount){
    //display search results to the search grid
    document.getElementById("search-dialogue").innerHTML = "";
    document.getElementById("search-read").innerHTML = "input:";
    document.getElementById("search-interpretation").innerHTML = "read:";
    document.getElementById("search-calories").innerHTML = "calories:";
    document.getElementById("search-1").innerHTML = input;
    document.getElementById("search-2").innerHTML = interpretation;
    document.getElementById("search-3").innerHTML = calorieCount;
    document.getElementById("search-output").style.display='block';
}
exports.inputNotFound =function(input){
    //api comes back with no results
    clearSearchOutput();
    document.getElementById("search-dialogue").innerHTML='hmm we can\'t seem to find "'+input+'"';
    document.getElementById("search-output").style.display='block';
}
exports.credentialsNotFound = function(){
    //if credentials.js doesn't exist
    clearSearchOutput();
    document.getElementById("search-dialogue").innerHTML='We couldn\'t seem to find your credentials file';
    document.getElementById("search-output").style.display='block';
}
exports.requestFailed = function(){
    //if requst fails
    clearSearchOutput();
    document.getElementById("search-dialogue").innerHTML ='Uh oh. Request failed';
    document.getElementById("search-output").style.display='block';
}

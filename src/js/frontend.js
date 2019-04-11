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
}
exports.changeSearchOutput=function(input,interpretation,calorieCount){
    document.getElementById("search-dialogue").innerHTML = "";
    document.getElementById("search-read").innerHTML = "input";
    document.getElementById("search-interpretation").innerHTML = "interpretation";
    document.getElementById("search-calories").innerHTML = "calories:";
    document.getElementById("search-1").innerHTML = input;
    document.getElementById("search-2").innerHTML = interpretation;
    document.getElementById("search-3").innerHTML = calorieCount;
}
exports.inputNotFound =function(){
    //api comes back with no results

}

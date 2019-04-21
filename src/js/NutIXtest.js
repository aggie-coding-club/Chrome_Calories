function nutritionix(json, dataReturn) {
  var total=0;
  for (var i=0; i<json.foods.length;i++) {
    total = total + number.parseInt(json.foods.nf_calories);
    if(i+1==json.foods.length)
    {
      if(dataReturn==1) {return json.foods.food_name;}
      else {return total;}
    }
  }
}



var request2 = new XMLHttpRequest();
request2.open('POST', 'https://trackapi.nutritionix.com/v2/natural/nutrients' );
request2.setRequestHeader( 'x-app-id',Cred.x_app_id );
request2.setRequestHeader( 'x-app-key',Cred.x_app_key );
request2.setRequestHeader( 'x-remote-user-id',Cred.x_remote_user_id );
request2.setRequestHeader( 'Content-Type','application/json' );
//https://blog.garstasio.com/you-dont-need-jquery/ajax/#posting
//https://docs.google.com/document/d/1_q-K-ObMTZvO0qUEAxROrN3bwMujwAN25sLHwJzliK0/edit
//https://gist.github.com/sgnl/bd760187214681cdb6dd
var jsonData = { query: queryString };
var myJSON = JSON.stringify(jsonData);
var jsonLength =
request2.send(myJSON);
request2.onload = function() {
    try {
        var returnJSON = JSON.parse(request2.responseText);
        var nutribool = returnJSON.hasOwnProperty('message');
        if (nutribool == true)
        {
            throw error;
        }
        else
        {
            console.log("used NutritionX");//diplay results found from NutritionX api
            frontend.changeSearchOutput(queryString,nutritionix(returnJSON,1),nutritionix(returnJSON,2));
        }
    }
    catch(err) {
        frontend.inputNotFound(queryString);//diplay that nothing was found from either api

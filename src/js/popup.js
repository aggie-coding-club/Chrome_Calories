import "../css/popup.css";
import hello from "./popup/example";
//[FRONTEND]

//Creating a function to toggle a CSS rule which governs visibility
//For more info:
//https://stackoverflow.com/questions/19074171/how-to-toggle-a-divs-visibility-by-using-a-button-click
function openOutput() {
    var div = document.getElementById("output");
    div.style.display = div.style.display == "block" ? "none" : "block";
}
//Specifying the criteria by which 'openOutput()' is called with an EventListener
//In this case, when someone clicks the id="output-button" button in 'popup.html'.
document.getElementById("output-button").addEventListener('click', openOutput); //tells button to use openOutput on click
//---------------------------------------------------------------------------------------------------------------------------
//[BACKEND]
//gets ingredients list (array of each ingredient) from a webpage
//using wprm (wordpress recipe maker)
const cheerio = require('cheerio');
const request = require('request');

function getIngredients(url) {
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            //match all elements potentially containing ingredients
            const ingredientsTextEls = $('[class*="ngr"]');
            ingredients = [];
            ingredientsTextEls.each(function(i, el) {
                //separate list items if needed
                if ($(el).is("ul")) {
                    $(el).find("li").each(function() {
                        const text = $(this).text().trim();
                        if (/^[aA0-9]+ *[/0-9a-zA-Z]+/.test(text))
                            ingredients.push(text);
                    })
                }
                else {
                    const text = $(el).text().trim();
                    //ingredient quantities should start with numbers and be followed by text
                    if (/^[aA0-9]+ *[/0-9a-zA-Z]+/.test(text))
                        ingredients.push(text);
                }
            })
            ingredients = ingredients.join('\n');
            console.log(ingredients);
            return ingredients;
        }
    });
}
var currurl = 'https://www.tasteofhome.com/recipes/southwestern-casserole/';
function submitClick() {
    try {
        document.getElementById("0").innerHTML = "Hello"; //Before, when this the getIngredients threw an error, would work. Now it just is blank. The submitClick works presumably
        const ingred_list = getIngredients(currurl); //It might be an async issue, we'd need callbacks
        document.getElementById("0").innerHTML = ingred_list[0];

    }
    catch(err) {
        document.getElementById("0").innerHTML = "Error";
    }
    //console.log(ingred_list);
    //populateHTML(ingred_list);
}
document.getElementById("query-button").addEventListener('click',submitClick)

function add_ul(passtext) {
    var ul = document.getElementById("popuplist");
    var li = document.createElement(passtext);
    var children = ul.children.length + 1
    li.setAttribute("id", "element"+children)
    li.appendChild(document.createTextNode("Element "+children));
    ul.appendChild(li)
}

function populateHTML(ingred_list) {
    try {
        var count = ingred_list.length;
        for(var i = 0; i < count; i++) {
            var item = ingred_list.length[i];
            displayQuery(item);
        }
    }
    catch(err) {
        add_ul("populateHTML error")
    }
}

//Creating a larger function which does several things:
// * Creates an XMLHttpRequest for use with a 'GET' request to the Edamam API and makes that request
// * Interprets and displays the JSON data from the Edamam API
// * If the Edamam API turns up nothing:
//   - Creates an XMLHttpRequest for use with a 'POST' request to the Nutritionix API and makes that request
//   - Interprets and displays the JSON data from the Nutritionix API
// * If the Nutritionix API turns up nothing:
//   - Displays an error message
function displayQuery(queryString) {
    //'GET' Request
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.edamam.com/api/food-database/parser?ingr='+queryString+'&app_id='+Cred.app_id+'&app_key='+Cred.app_key);
    request.onload = function() {
        try {
            var data = JSON.parse(request.responseText);
            if (data["parsed"].length < 1 || data["parsed"] == undefined){
                throw "error";
            }
            add_ul(data["parsed"][0]["food"]["label"]+": "+(data["parsed"][0]["quantity"])*(data["parsed"][0]["food"]["nutrients"]["ENERC_KCAL"])+" calories")
        }
        catch(err) 
        {
            //'POST' Request
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
                        add_ul(returnJSON["foods"][0]["food_name"]+": "+returnJSON["foods"][0]["nf_calories"]+" calories");
                    }
                }
                catch(err) {
                    add_ul("Error: Error");
                }
            }
        }
    }
    request.send();
}
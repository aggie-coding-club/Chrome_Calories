//gets ingredients list (array of each ingredient) from a webpage
//using wprm (wordpress recipe maker)
const cheerio = require('cheerio');
const request = require('request');
function getIngredients(url) {
    /*try to resolve to a specific domain that runs incorrectly,
    use generic code to resolve ingredients for websites not
    accounted for*/
    //allrecipes.com
    if (url.indexOf("allrecipes.com") != -1)
        getFromAllRecipes(url);
    else if (url.indexOf("geniuskitchen.com") != -1)
        getFromGeniusKitchen(url);
    else if (url.indexOf("bettycrocker.com") != -1)
        getFromBettyCrocker(url);
    else
    getFromGenericURL(url);
}

function getFromGenericURL(url) {
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            //match all elements potentially containing ingredients
            const ingredientsTextEls = $('[class*="ngr"]');
            let ingredients = [];
            ingredientsTextEls.each(function(i, el) {
                //separate list items if needed
                if ($(el).is("ul")) {
                    $(el).find("li").each(function() {
                        const text = $(this).text().trim();
                        if (text.length > 0 && text.length < 80 && text.indexOf('ngredients') == -1) {
                            ingredients.push(text);
                        }
                    })
                }
                else {
                    const text = $(el).text().trim();
                    //ingredient quantities should start with numbers and be followed by text
                    if (text.length > 0 && text.length < 80 && text.indexOf('ngredients') == -1)
                        ingredients.push(text);
                }
            })
            console.log(ingredients);
            return ingredients;
        }
    });
}

function getFromAllRecipes(url) {
    request(url, (error, response, html) => {
        const $ = cheerio.load(html);
        let ingredients = [];
        let ingredientsTextEls = $('.recipe-ingred_txt');
        ingredientsTextEls.each(function() {
            const text = $(this).text().trim();
            //allrecipes has elements that say "add all ingredients to list"
            //with the same class name as ingrdients, so filter them out
            if (text.indexOf("Add all ingredients") == -1 && text != '')
                ingredients.push(text);
        })
        console.log(ingredients);
    });
}

function getFromGeniusKitchen(url) {
    request(url, (error, response, html) => {
        const $ = cheerio.load(html);
        let ingredients = [];
        let ingredientsTextEls = $('li[data-ingredient]');
        ingredientsTextEls.each(function() {
            const text = $(this).text().trim();
            ingredients.push(text);
        })
        console.log(ingredients);
    });
}

function getFromBettyCrocker(url) {
    request(url, (error, response, html) => {
        const $ = cheerio.load(html);
        let ingredients = [];
        let ingredientsTextEls = $('[class="recipePartIngredient"]');
        ingredientsTextEls.each(function() {
            //whoever made betty crocker's website is completely incompetent
            //everything is padded with about 100 spaces and /n's, remove them
            const text = $(this).children('[class="quantity"]').text().trim() +
            " " + $(this).children('[class="description"]').text().trim();
            ingredients.push(text);
        })
        console.log(ingredients);
    });
}

const ingredients = getIngredients('https://www.bettycrocker.com/recipes/make-ahead-creamy-spinach-lasagna/7beea4bf-5309-4e52-83b3-d204245db470');
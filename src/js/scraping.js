//gets ingredients list (array of each ingredient) from a webpage
const cheerio = require('cheerio');
const request = require('request');
async function getIngredients(url) {
    /*try to resolve to a specific domain that runs incorrectly,
    use generic code to resolve ingredients for websites not
    accounted for*/
    var ingredients;
    if (url.indexOf("allrecipes.com") != -1)
        ingredients = await getFromAllRecipes(url);
    else if (url.indexOf("geniuskitchen.com") != -1)
        ingredients = await getFromGeniusKitchen(url);
    else if (url.indexOf("bettycrocker.com") != -1)
        ingredients = await getFromBettyCrocker(url);
    else
    ingredients = await getFromGenericURL(url);
    return ingredients;
}

async function printIngredientsToConsole(url) {
    //print for debugging
    const ingredients = await getIngredients(url);
    console.log(ingredients);
}

async function getFromGenericURL(url) {
    return new Promise(function(resolve, reject) {
        request(url, {timeout: 2000}, (error, response, html) => {
            if (error) reject(error);
            if (response.statusCode != 200) reject('Status code: ' + response.statusCode);
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
            resolve(ingredients);
        });
    });
}

async function getFromAllRecipes(url) {
    return new Promise(function(resolve, reject) {
        request(url, {timeout: 2000}, (error, response, html) => {
            if (error) reject(error);
            if (response.statusCode != 200) reject('Status code: ' + response.statusCode);
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
            resolve(ingredients);
        });
    });
}

async function getFromGeniusKitchen(url) {
    return new Promise(function(resolve, reject) {
        request(url, {timeout: 2000}, (error, response, html) => {
            if (error) reject(error);
            if (response.statusCode != 200) reject('Status code: ' + response.statusCode);
            const $ = cheerio.load(html);
            let ingredients = [];
            let ingredientsTextEls = $('li[data-ingredient]');
            ingredientsTextEls.each(function() {
                const text = $(this).text().trim();
                ingredients.push(text);
            })
            resolve(ingredients);
        });
    });
}

async function getFromBettyCrocker(url) {
    return new Promise(function(resolve, reject) {
        request(url, {timeout: 2000}, (error, response, html) => {
            if (error) reject(error);
            if (response.statusCode != 200) reject('Status code: ' + response.statusCode);
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
            resolve(ingredients);
        });
    });
}

printIngredientsToConsole('https://www.bettycrocker.com/recipes/make-ahead-creamy-spinach-lasagna/7beea4bf-5309-4e52-83b3-d204245db470');
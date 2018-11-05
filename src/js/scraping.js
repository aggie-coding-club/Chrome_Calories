//gets ingredients list (array of each ingredient) from a webpage
//using wprm (wordpress recipe maker)
const cheerio = require('cheerio');
const request = require('request');
function getIngredients(url) {
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const ingredientsHeader = cheerio.load(html)('.wprm-recipe-ingredient');
            let ingredients = [];
            ingredientsHeader.each(function(i, el) {
                ingredients.push($(el).text());
            })
            console.log('inside function: ');
            console.log(ingredients);
            return ingredients;
            // for (const ingredient in ingredientsHeader.children()) {
            //     console.log(ingredient.text());
            // }
        }
    });
}
console.log('function call: ');
const ingredients = getIngredients('https://www.livewellbakeoften.com/white-cake-recipe/');
console.log(ingredients);
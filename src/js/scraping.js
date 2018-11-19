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
            let ingredients = [];
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
const ingredients = getIngredients('https://www.tasteofhome.com/recipes/southwestern-casserole/');
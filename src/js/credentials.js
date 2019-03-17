//Replace the 'xxxx' values with the correct keys by signing up to use:
//https://developer.edamam.com/food-database-api
//https://www.nutritionix.com/business/api

var Cred = {
    //Edamam
    app_id :"xxxxxxxx",
    app_key :"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    //Nutritionix
    x_app_id :"xxxxxxxx",
    x_app_key :"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    x_remote_user_id : "0"
};
exports.getCred = function() {
    return Cred;
}
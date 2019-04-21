# Chrome Calories

A Chrome extension that will recognize recipes on a page and show nutritional information for them.

### To build:

Make sure you have Node version 8 and the latest version of NPM.

$ npm install  
$ npm run build

Then:
* visit chrome://extensions in a Chrome browser
* flip developer mode to "on"
* "load unpacked" the directory that the manifest is located in (/build)

The Chrome Calories extension should now be available in the top right of the screen!

Next, generate API keys. From the /Chrome_Calories directory, run:

$ touch src/js/credentials.js

This will create a file called credentials.js in the src/js folder. Navigate to it in a text editor and fill it with these contents. This is where you will put the API keys once you have generated them.

var Cred = {  
    &nbsp;&nbsp;&nbsp;&nbsp;//Edamam  
    &nbsp;&nbsp;&nbsp;&nbsp;app_id :"xxxxxxxx",  
    &nbsp;&nbsp;&nbsp;&nbsp;app_key :"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",  
    &nbsp;&nbsp;&nbsp;&nbsp;//Nutritionix  
    &nbsp;&nbsp;&nbsp;&nbsp;x_app_id :"xxxxxxxx",  
    &nbsp;&nbsp;&nbsp;&nbsp;x_app_key :"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",  
    &nbsp;&nbsp;&nbsp;&nbsp;x_remote_user_id : "0"  
};  
exports.getCred = function() {  
    &nbsp;&nbsp;&nbsp;&nbsp;return Cred;  
}  

Edamam:
* Navigate to https://developer.edamam.com/edamam-nutrition-api and click the orange Start Now button under the Developer tier. 
* Once you have created an account, log in and click the "Get an API key now!" choice on the gray menu.
* Click the "View" button.
* You should see your Application ID and Application Keys. Open the credentials.js file. Remove each string of Xs under Edamam and copy the ID and key into those spaces.

Nutritionix:
* Navigate to https://www.nutritionix.com/business/api and scroll down to the API Pricing Plans part of the page. Click the green "Get your API Key" button underneath the Hacker tier.
* Create an account. You may have to wait a few minutes while Nutritionix verifies your email.
* Click the menu choice "View API Keys".
* You should see your Application ID and Application Keys. Open the credentials.js file. Remove each string of Xs under Nutritionix and copy the ID and key into those spaces.

### Workflow:
* Make sure you are on your own branch when you are making changes.
* Do not edit the build folder! Edit the src folder!
* To test your changes, run $ npm run build
* To see which files you have changed,  
$ git status
* To save those changes to the GitHub copy of your branch,  
$ git add &lt;filename&gt;  
$ git commit -m "message"  
$ git push origin &lt;your-branch-name&gt;
* To submit your changes to be added to master, create a pull request and add Hannah and/or Mitchell as reviewers
* Make sure that you do not publicly commit your API key to this repository

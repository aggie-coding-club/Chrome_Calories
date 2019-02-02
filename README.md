# Chrome Calories

A Chrome extension that will recognize recipes on a page and show nutritional information for them.

### To build:

Make sure you have Node version 8 and the latest version of Yarn.

$ yarn  
$ npm run build

Then:
* visit chrome://extensions in a Chrome browser
* flip developer mode to "on"
* "load unpacked" the directory that the manifest is located in (/build)

The Chrome Calories extension should now be available in the top right of the screen!

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
* Make sure that you do not publicly commit your API key to this repository (e.g. add 'credentials.js' to your .gitignore)

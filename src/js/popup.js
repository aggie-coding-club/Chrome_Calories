import "../css/popup.css";
import hello from "./popup/example";
let submit = document.getElementById('submit');

submit.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: 'console.log(color)'});
            //{code: 'document.body.style.backgroundColor = "' + color + '";'}); //Change this line... everything else should stay..?
    });
};



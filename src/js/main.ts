import { getCounter } from "./countwords";
import { getLanguage,
    setLanguage,
    getLangDirection } from "./language";

const textEl = <HTMLTextAreaElement> document.getElementById("inputfield");
const countEl = document.getElementById("wordcount");
const languageSelectEl = <HTMLSelectElement> document.getElementById("languageSelect");
const counter = getCounter(onCountUpdate);

var inputChanged = false;
var countChanged = false;
var languageChanged = false;

languageSelectEl.value = getLanguage();

textEl.addEventListener("keydown", onInputChange, false);
textEl.addEventListener("change", onInputChange, false);
languageSelectEl.addEventListener("change", function (event) {
    languageChanged = setLanguage(languageSelectEl.value);
}, false);

// flag input change on keydown and change events
// wait til next animation frame to count
function onInputChange (event) {
    inputChanged = true;
}

function onCountUpdate () {
    countChanged = true;
}

// read text if input changed
// update counter if count changed
// called once per animation frame
function applyChanges () {
    if (inputChanged) {
        let str = textEl.value;
        // if at least 1 non-space character
        if (/\S/gm.test(str)) {
            counter.count(str);
        }
        // if text box is empty but previous count > 0
        else if (counter.result) {
            counter.result = 0;
            countChanged = true;
        }
    }
    // update counter text
    if (countChanged) {
        countChanged = false;
        countEl.innerText = '' + counter.result;
    }
    if (languageChanged) {
        textEl.style.direction = getLangDirection();
    }
}

// animation loop
function mainLoop () {
    requestAnimationFrame(mainLoop);
    applyChanges();
}
requestAnimationFrame(mainLoop);
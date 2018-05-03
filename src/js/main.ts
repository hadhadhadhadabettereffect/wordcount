import {getCounter} from "./countwords";

const textEl = <HTMLTextAreaElement> document.getElementById("inputfield");
const countEl = document.getElementById("wordcount");
const counter = getCounter(onCountUpdate);

var inputChanged = false;
var countChanged = false;

textEl.addEventListener("keydown", handleInput, false);
textEl.addEventListener("change", handleInput, false);

function handleInput (event) {
    inputChanged = true;
}

function applyChanges () {
    if (inputChanged) {
        let str = textEl.value;
        if (/\w/gm.test(str)) {
            counter.count(str);
        } else if (counter.result) {
            counter.result = 0;
            countChanged = true;
        }
    }
    if (countChanged) {
        countChanged = false;
        countEl.innerText = '' + counter.result;
    }
}

function onCountUpdate () {
    countChanged = true;
}

function mainLoop () {
    requestAnimationFrame(mainLoop);
    applyChanges();
}

requestAnimationFrame(mainLoop);


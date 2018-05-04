/// <reference path="masks.d.ts"/>

import { getCounter } from "./countwords";

const textEl = <HTMLTextAreaElement> document.getElementById("inputfield");
const countEl = document.getElementById("wordcount");
const counter = getCounter(onCountUpdate);

var changes = 0;

textEl.addEventListener("keydown", onInputChange, false);
textEl.addEventListener("change", onInputChange, false);
// flag input change on keydown and change events
// wait til next animation frame to count
function onInputChange (event) {
    changes |= ChangeType.input_mask;
}

function onCountUpdate () {
    changes |= counter.changes;
}

function applyChanges () {
    if (changes) {
        // if text changed, send text string to worker
        if (changes & ChangeType.input_mask) {
            changes ^= ChangeType.input_mask;
            let str = textEl.value;
            // if at least 1 non-space character
            if (/\S/gm.test(str)) {
                counter.count(str);
            }
            // if text box is empty but previous count > 0
            else if (counter.result) {
                counter.result = 0;
                changes |= ChangeType.count_mask;
            }
        }
        // update counter text
        if (changes & ChangeType.count_mask) {
            changes ^= ChangeType.count_mask;
            countEl.innerText = '' + counter.result;
        }
        // switch writing direction if changed left-to-right or right-to-left
        if (changes & ChangeType.rtl_mask) {
            changes ^= ChangeType.rtl_mask;
            textEl.style.direction = counter.rtl ? "rtl" : "ltr";
        }
    }
}

// animation loop
function mainLoop () {
    requestAnimationFrame(mainLoop);
    applyChanges();
}
requestAnimationFrame(mainLoop);
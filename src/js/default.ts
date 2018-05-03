const inputEl = <HTMLTextAreaElement> document.getElementById("inputfield");
const buttonEl = document.getElementById("count");
const msgEl = document.getElementById("message");

// form is invalid if no text was entered in inputEl
// truth value is set when count button is clicked
var formIsValid = true;
var wordCount = 0;

buttonEl.addEventListener("click", handleButtonClick, false);

function handleButtonClick (event: MouseEvent) {
    // regex to check for at least one word char
    if (formIsValid !== /\w/gm.test(inputEl.value)) {
        formIsValid = !formIsValid;
        requestAnimationFrame(updateErrorStatus);    
    }
    if (formIsValid) countWords(inputEl.value);
}

function updateErrorStatus () {
    if (formIsValid) {
        inputEl.className = "";
        msgEl.innerText = "";
    } else {
        inputEl.className = "form-error";
        msgEl.innerText = "text input required";
    }
}

function showWordCount () {
    window.alert(`Word count: ${wordCount}`);
}

// word count function
// if workers supported, sends text to worker to count
// else just runs on main thread
var countWords = (function () {
    if (window.hasOwnProperty("Worker")) {
        let worker = new Worker("/js/worker.js");
        worker.onmessage = function (e) {
            wordCount = e.data;
            requestAnimationFrame(showWordCount);
        };
        return function (text: string) {
            worker.postMessage(text);
        };
    } else {
        return function (text: string) {
            wordCount = text.match(/\w+/gm).length;
            requestAnimationFrame(showWordCount);
        };
    }
})();
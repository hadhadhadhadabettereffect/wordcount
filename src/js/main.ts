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
    if (formIsValid) setTimeout(countWords, 0);
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

function countWords (text: string) {
    wordCount = inputEl.value.match(/\w+/g).length;
    requestAnimationFrame(showWordCount);
}

function showWordCount () {
    window.alert(`Word count: ${wordCount}`);
}
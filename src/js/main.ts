const inputEl = <HTMLTextAreaElement> document.getElementById("inputfield");
const buttonEl = document.getElementById("count");
const msgEl = document.getElementById("message");

// form is invalid if no text was entered in inputEl
// truth value is set when count button is clicked
var formIsValid = true;

buttonEl.addEventListener("click", handleClick, false);

function handleClick (event) {
    let inputText = inputEl.value;
    // regex to check for at least one non-white-space char
    if (formIsValid !== /\S/gm.test(inputText)) {
        formIsValid = !formIsValid;
        requestAnimationFrame(updateErrorStatus);    
    }
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
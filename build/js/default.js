(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const inputEl = document.getElementById("inputfield");
const buttonEl = document.getElementById("count");
const msgEl = document.getElementById("message");
// form is invalid if no text was entered in inputEl
// truth value is set when count button is clicked
var formIsValid = true;
var wordCount = 0;
buttonEl.addEventListener("click", handleButtonClick, false);
function handleButtonClick(event) {
    // regex to check for at least one word char
    if (formIsValid !== /\w/gm.test(inputEl.value)) {
        formIsValid = !formIsValid;
        requestAnimationFrame(updateErrorStatus);
    }
    if (formIsValid)
        countWords(inputEl.value);
}
function updateErrorStatus() {
    if (formIsValid) {
        inputEl.className = "";
        msgEl.innerText = "";
    }
    else {
        inputEl.className = "form-error";
        msgEl.innerText = "text input required";
    }
}
function showWordCount() {
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
        return function (text) {
            worker.postMessage(text);
        };
    }
    else {
        return function (text) {
            wordCount = text.match(/\w+/gm).length;
            requestAnimationFrame(showWordCount);
        };
    }
})();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZGVmYXVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLE1BQU0sT0FBTyxHQUF5QixRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzVFLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbEQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUVqRCxvREFBb0Q7QUFDcEQsa0RBQWtEO0FBQ2xELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztBQUN2QixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFFbEIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUU3RCwyQkFBNEIsS0FBaUI7SUFDekMsNENBQTRDO0lBQzVDLElBQUksV0FBVyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzVDLFdBQVcsR0FBRyxDQUFDLFdBQVcsQ0FBQztRQUMzQixxQkFBcUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0tBQzVDO0lBQ0QsSUFBSSxXQUFXO1FBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMvQyxDQUFDO0FBRUQ7SUFDSSxJQUFJLFdBQVcsRUFBRTtRQUNiLE9BQU8sQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0tBQ3hCO1NBQU07UUFDSCxPQUFPLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztRQUNqQyxLQUFLLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDO0tBQzNDO0FBQ0wsQ0FBQztBQUVEO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLFNBQVMsRUFBRSxDQUFDLENBQUM7QUFDN0MsQ0FBQztBQUVELHNCQUFzQjtBQUN0QixzREFBc0Q7QUFDdEQsZ0NBQWdDO0FBQ2hDLElBQUksVUFBVSxHQUFHLENBQUM7SUFDZCxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDakMsSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7WUFDMUIsU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIscUJBQXFCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDO1FBQ0YsT0FBTyxVQUFVLElBQVk7WUFDekIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUM7S0FDTDtTQUFNO1FBQ0gsT0FBTyxVQUFVLElBQVk7WUFDekIsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ3ZDLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQztLQUNMO0FBQ0wsQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGlucHV0RWwgPSA8SFRNTFRleHRBcmVhRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dGZpZWxkXCIpO1xyXG5jb25zdCBidXR0b25FbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY291bnRcIik7XHJcbmNvbnN0IG1zZ0VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXNzYWdlXCIpO1xyXG5cclxuLy8gZm9ybSBpcyBpbnZhbGlkIGlmIG5vIHRleHQgd2FzIGVudGVyZWQgaW4gaW5wdXRFbFxyXG4vLyB0cnV0aCB2YWx1ZSBpcyBzZXQgd2hlbiBjb3VudCBidXR0b24gaXMgY2xpY2tlZFxyXG52YXIgZm9ybUlzVmFsaWQgPSB0cnVlO1xyXG52YXIgd29yZENvdW50ID0gMDtcclxuXHJcbmJ1dHRvbkVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVCdXR0b25DbGljaywgZmFsc2UpO1xyXG5cclxuZnVuY3Rpb24gaGFuZGxlQnV0dG9uQ2xpY2sgKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICAvLyByZWdleCB0byBjaGVjayBmb3IgYXQgbGVhc3Qgb25lIHdvcmQgY2hhclxyXG4gICAgaWYgKGZvcm1Jc1ZhbGlkICE9PSAvXFx3L2dtLnRlc3QoaW5wdXRFbC52YWx1ZSkpIHtcclxuICAgICAgICBmb3JtSXNWYWxpZCA9ICFmb3JtSXNWYWxpZDtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlRXJyb3JTdGF0dXMpOyAgICBcclxuICAgIH1cclxuICAgIGlmIChmb3JtSXNWYWxpZCkgY291bnRXb3JkcyhpbnB1dEVsLnZhbHVlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlRXJyb3JTdGF0dXMgKCkge1xyXG4gICAgaWYgKGZvcm1Jc1ZhbGlkKSB7XHJcbiAgICAgICAgaW5wdXRFbC5jbGFzc05hbWUgPSBcIlwiO1xyXG4gICAgICAgIG1zZ0VsLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlucHV0RWwuY2xhc3NOYW1lID0gXCJmb3JtLWVycm9yXCI7XHJcbiAgICAgICAgbXNnRWwuaW5uZXJUZXh0ID0gXCJ0ZXh0IGlucHV0IHJlcXVpcmVkXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dXb3JkQ291bnQgKCkge1xyXG4gICAgd2luZG93LmFsZXJ0KGBXb3JkIGNvdW50OiAke3dvcmRDb3VudH1gKTtcclxufVxyXG5cclxuLy8gd29yZCBjb3VudCBmdW5jdGlvblxyXG4vLyBpZiB3b3JrZXJzIHN1cHBvcnRlZCwgc2VuZHMgdGV4dCB0byB3b3JrZXIgdG8gY291bnRcclxuLy8gZWxzZSBqdXN0IHJ1bnMgb24gbWFpbiB0aHJlYWRcclxudmFyIGNvdW50V29yZHMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHdpbmRvdy5oYXNPd25Qcm9wZXJ0eShcIldvcmtlclwiKSkge1xyXG4gICAgICAgIGxldCB3b3JrZXIgPSBuZXcgV29ya2VyKFwiL2pzL3dvcmtlci5qc1wiKTtcclxuICAgICAgICB3b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgd29yZENvdW50ID0gZS5kYXRhO1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvd1dvcmRDb3VudCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRleHQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2UodGV4dCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgd29yZENvdW50ID0gdGV4dC5tYXRjaCgvXFx3Ky9nbSkubGVuZ3RoO1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvd1dvcmRDb3VudCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufSkoKTsiXX0=

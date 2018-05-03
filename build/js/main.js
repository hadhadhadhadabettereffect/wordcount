(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// returns obj with word count function and count result
// if workers supported, fn sends text to worker to count
// else just runs on main thread
/**
 * @param {function} cb callback to signal when count result is ready
 * @return {Object} counter
 * @return {function(string)} counter.count - word count funtion
 * @return {number} counter.result - result of count function
 */
function getCounter(cb) {
    var counter = {
        result: 0,
        count: null
    };
    if (window.hasOwnProperty("Worker")) {
        console.log("starting worker");
        let worker = new Worker("js/worker.js");
        worker.onmessage = function (e) {
            counter.result = e.data;
            cb();
        };
        counter.count = function (text) {
            worker.postMessage(text);
        };
    }
    else {
        console.log("WebWorker not supported. Running count on main thread.");
        var str = '';
        function asyncCount() {
            counter.result = str.match(/\w+/gm).length;
            cb();
        }
        counter.count = function (text) {
            str = text;
            setTimeout(asyncCount, 0);
        };
    }
    return counter;
}
exports.getCounter = getCounter;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// navigator.language isn't standardized so checking possible values
// defaulting to English if no language detected
var language = (navigator.language ||
    navigator["userLanguage"] ||
    navigator["browserLanguage"] ||
    navigator["systemLanguage"] ||
    "en"
// only keep the first 2 letters if longer than 2 chars
).substring(0, 2);
function getLanguage() {
    return language;
}
exports.getLanguage = getLanguage;
function setLanguage(lang) {
    if (language != lang) {
        language = lang;
    }
}
exports.setLanguage = setLanguage;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const countwords_1 = require("./countwords");
const language_1 = require("./language");
const textEl = document.getElementById("inputfield");
const countEl = document.getElementById("wordcount");
const languageSelectEl = document.getElementById("languageSelect");
const counter = countwords_1.getCounter(onCountUpdate);
var inputChanged = false;
var countChanged = false;
languageSelectEl.value = language_1.getLanguage();
textEl.addEventListener("keydown", onInputChange, false);
textEl.addEventListener("change", onInputChange, false);
languageSelectEl.addEventListener("change", function (event) {
    language_1.setLanguage(languageSelectEl.value);
}, false);
// flag input change on keydown and change events
// wait til next animation frame to count
function onInputChange(event) {
    inputChanged = true;
}
function onCountUpdate() {
    countChanged = true;
}
// read text if input changed
// update counter if count changed
// called once per animation frame
function applyChanges() {
    if (inputChanged) {
        let str = textEl.value;
        // if at least 1 word character
        if (/\w/gm.test(str)) {
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
}
// animation loop
function mainLoop() {
    requestAnimationFrame(mainLoop);
    applyChanges();
}
requestAnimationFrame(mainLoop);
},{"./countwords":1,"./language":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY291bnR3b3Jkcy50cyIsInNyYy9qcy9sYW5ndWFnZS50cyIsInNyYy9qcy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSx3REFBd0Q7QUFDeEQseURBQXlEO0FBQ3pELGdDQUFnQztBQUNoQzs7Ozs7R0FLRztBQUNILG9CQUE0QixFQUFFO0lBQzFCLElBQUksT0FBTyxHQUFHO1FBQ1YsTUFBTSxFQUFFLENBQUM7UUFDVCxLQUFLLEVBQUUsSUFBSTtLQUNkLENBQUM7SUFDRixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9CLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN4QixFQUFFLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQztRQUNGLE9BQU8sQ0FBQyxLQUFLLEdBQUcsVUFBVSxJQUFZO1lBQ2xDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDO0tBQ0w7U0FBTTtRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsd0RBQXdELENBQUMsQ0FBQTtRQUNyRSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYjtZQUNJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDM0MsRUFBRSxFQUFFLENBQUM7UUFDVCxDQUFDO1FBQ0QsT0FBTyxDQUFDLEtBQUssR0FBRyxVQUFVLElBQVk7WUFDbEMsR0FBRyxHQUFHLElBQUksQ0FBQztZQUNYLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDO0tBQ0w7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBNUJELGdDQTRCQzs7OztBQ3JDRCxvRUFBb0U7QUFDcEUsZ0RBQWdEO0FBQ2hELElBQUksUUFBUSxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVE7SUFDMUIsU0FBUyxDQUFDLGNBQWMsQ0FBQztJQUN6QixTQUFTLENBQUMsaUJBQWlCLENBQUM7SUFDNUIsU0FBUyxDQUFDLGdCQUFnQixDQUFDO0lBQzNCLElBQUk7QUFDUix1REFBdUQ7Q0FDdEQsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXJCO0lBQ0ksT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQztBQUZELGtDQUVDO0FBRUQscUJBQTZCLElBQVk7SUFDckMsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO1FBQ2xCLFFBQVEsR0FBRyxJQUFJLENBQUM7S0FDbkI7QUFDTCxDQUFDO0FBSkQsa0NBSUM7Ozs7QUNsQkQsNkNBQTBDO0FBQzFDLHlDQUNvQztBQUVwQyxNQUFNLE1BQU0sR0FBeUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMzRSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JELE1BQU0sZ0JBQWdCLEdBQXVCLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN2RixNQUFNLE9BQU8sR0FBRyx1QkFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRTFDLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztBQUN6QixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7QUFFekIsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLHNCQUFXLEVBQUUsQ0FBQztBQUV2QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN6RCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN4RCxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsVUFBVSxLQUFLO0lBQ3ZELHNCQUFXLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBRVYsaURBQWlEO0FBQ2pELHlDQUF5QztBQUN6Qyx1QkFBd0IsS0FBSztJQUN6QixZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLENBQUM7QUFFRDtJQUNJLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDeEIsQ0FBQztBQUVELDZCQUE2QjtBQUM3QixrQ0FBa0M7QUFDbEMsa0NBQWtDO0FBQ2xDO0lBQ0ksSUFBSSxZQUFZLEVBQUU7UUFDZCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLCtCQUErQjtRQUMvQixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0QjtRQUNELDhDQUE4QzthQUN6QyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDckIsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDbkIsWUFBWSxHQUFHLElBQUksQ0FBQztTQUN2QjtLQUNKO0lBQ0Qsc0JBQXNCO0lBQ3RCLElBQUksWUFBWSxFQUFFO1FBQ2QsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixPQUFPLENBQUMsU0FBUyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0tBQzNDO0FBQ0wsQ0FBQztBQUVELGlCQUFpQjtBQUNqQjtJQUNJLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLFlBQVksRUFBRSxDQUFDO0FBQ25CLENBQUM7QUFDRCxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIHJldHVybnMgb2JqIHdpdGggd29yZCBjb3VudCBmdW5jdGlvbiBhbmQgY291bnQgcmVzdWx0XHJcbi8vIGlmIHdvcmtlcnMgc3VwcG9ydGVkLCBmbiBzZW5kcyB0ZXh0IHRvIHdvcmtlciB0byBjb3VudFxyXG4vLyBlbHNlIGp1c3QgcnVucyBvbiBtYWluIHRocmVhZFxyXG4vKipcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2IgY2FsbGJhY2sgdG8gc2lnbmFsIHdoZW4gY291bnQgcmVzdWx0IGlzIHJlYWR5XHJcbiAqIEByZXR1cm4ge09iamVjdH0gY291bnRlclxyXG4gKiBAcmV0dXJuIHtmdW5jdGlvbihzdHJpbmcpfSBjb3VudGVyLmNvdW50IC0gd29yZCBjb3VudCBmdW50aW9uXHJcbiAqIEByZXR1cm4ge251bWJlcn0gY291bnRlci5yZXN1bHQgLSByZXN1bHQgb2YgY291bnQgZnVuY3Rpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb3VudGVyIChjYikge1xyXG4gICAgdmFyIGNvdW50ZXIgPSB7XHJcbiAgICAgICAgcmVzdWx0OiAwLFxyXG4gICAgICAgIGNvdW50OiBudWxsXHJcbiAgICB9O1xyXG4gICAgaWYgKHdpbmRvdy5oYXNPd25Qcm9wZXJ0eShcIldvcmtlclwiKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRpbmcgd29ya2VyXCIpO1xyXG4gICAgICAgIGxldCB3b3JrZXIgPSBuZXcgV29ya2VyKFwianMvd29ya2VyLmpzXCIpO1xyXG4gICAgICAgIHdvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBjb3VudGVyLnJlc3VsdCA9IGUuZGF0YTtcclxuICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvdW50ZXIuY291bnQgPSBmdW5jdGlvbiAodGV4dDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh0ZXh0KTtcclxuICAgICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIldlYldvcmtlciBub3Qgc3VwcG9ydGVkLiBSdW5uaW5nIGNvdW50IG9uIG1haW4gdGhyZWFkLlwiKVxyXG4gICAgICAgIHZhciBzdHIgPSAnJztcclxuICAgICAgICBmdW5jdGlvbiBhc3luY0NvdW50ICgpIHtcclxuICAgICAgICAgICAgY291bnRlci5yZXN1bHQgPSBzdHIubWF0Y2goL1xcdysvZ20pLmxlbmd0aDtcclxuICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY291bnRlci5jb3VudCA9IGZ1bmN0aW9uICh0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgc3RyID0gdGV4dDtcclxuICAgICAgICAgICAgc2V0VGltZW91dChhc3luY0NvdW50LCAwKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvdW50ZXI7XHJcbn0iLCIvLyBuYXZpZ2F0b3IubGFuZ3VhZ2UgaXNuJ3Qgc3RhbmRhcmRpemVkIHNvIGNoZWNraW5nIHBvc3NpYmxlIHZhbHVlc1xyXG4vLyBkZWZhdWx0aW5nIHRvIEVuZ2xpc2ggaWYgbm8gbGFuZ3VhZ2UgZGV0ZWN0ZWRcclxudmFyIGxhbmd1YWdlID0gKG5hdmlnYXRvci5sYW5ndWFnZSB8fFxyXG4gICAgICAgIG5hdmlnYXRvcltcInVzZXJMYW5ndWFnZVwiXSB8fFxyXG4gICAgICAgIG5hdmlnYXRvcltcImJyb3dzZXJMYW5ndWFnZVwiXSB8fFxyXG4gICAgICAgIG5hdmlnYXRvcltcInN5c3RlbUxhbmd1YWdlXCJdIHx8XHJcbiAgICAgICAgXCJlblwiXHJcbiAgICAvLyBvbmx5IGtlZXAgdGhlIGZpcnN0IDIgbGV0dGVycyBpZiBsb25nZXIgdGhhbiAyIGNoYXJzXHJcbiAgICApLnN1YnN0cmluZygwLDIpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExhbmd1YWdlICgpIDogc3RyaW5nIHtcclxuICAgIHJldHVybiBsYW5ndWFnZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldExhbmd1YWdlIChsYW5nOiBzdHJpbmcpIHtcclxuICAgIGlmIChsYW5ndWFnZSAhPSBsYW5nKSB7XHJcbiAgICAgICAgbGFuZ3VhZ2UgPSBsYW5nO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgZ2V0Q291bnRlciB9IGZyb20gXCIuL2NvdW50d29yZHNcIjtcclxuaW1wb3J0IHsgZ2V0TGFuZ3VhZ2UsXHJcbiAgICBzZXRMYW5ndWFnZSB9IGZyb20gXCIuL2xhbmd1YWdlXCI7XHJcblxyXG5jb25zdCB0ZXh0RWwgPSA8SFRNTFRleHRBcmVhRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dGZpZWxkXCIpO1xyXG5jb25zdCBjb3VudEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3b3JkY291bnRcIik7XHJcbmNvbnN0IGxhbmd1YWdlU2VsZWN0RWwgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFuZ3VhZ2VTZWxlY3RcIik7XHJcbmNvbnN0IGNvdW50ZXIgPSBnZXRDb3VudGVyKG9uQ291bnRVcGRhdGUpO1xyXG5cclxudmFyIGlucHV0Q2hhbmdlZCA9IGZhbHNlO1xyXG52YXIgY291bnRDaGFuZ2VkID0gZmFsc2U7XHJcblxyXG5sYW5ndWFnZVNlbGVjdEVsLnZhbHVlID0gZ2V0TGFuZ3VhZ2UoKTtcclxuXHJcbnRleHRFbC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbklucHV0Q2hhbmdlLCBmYWxzZSk7XHJcbnRleHRFbC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uSW5wdXRDaGFuZ2UsIGZhbHNlKTtcclxubGFuZ3VhZ2VTZWxlY3RFbC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgc2V0TGFuZ3VhZ2UobGFuZ3VhZ2VTZWxlY3RFbC52YWx1ZSk7XHJcbn0sIGZhbHNlKTtcclxuXHJcbi8vIGZsYWcgaW5wdXQgY2hhbmdlIG9uIGtleWRvd24gYW5kIGNoYW5nZSBldmVudHNcclxuLy8gd2FpdCB0aWwgbmV4dCBhbmltYXRpb24gZnJhbWUgdG8gY291bnRcclxuZnVuY3Rpb24gb25JbnB1dENoYW5nZSAoZXZlbnQpIHtcclxuICAgIGlucHV0Q2hhbmdlZCA9IHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uQ291bnRVcGRhdGUgKCkge1xyXG4gICAgY291bnRDaGFuZ2VkID0gdHJ1ZTtcclxufVxyXG5cclxuLy8gcmVhZCB0ZXh0IGlmIGlucHV0IGNoYW5nZWRcclxuLy8gdXBkYXRlIGNvdW50ZXIgaWYgY291bnQgY2hhbmdlZFxyXG4vLyBjYWxsZWQgb25jZSBwZXIgYW5pbWF0aW9uIGZyYW1lXHJcbmZ1bmN0aW9uIGFwcGx5Q2hhbmdlcyAoKSB7XHJcbiAgICBpZiAoaW5wdXRDaGFuZ2VkKSB7XHJcbiAgICAgICAgbGV0IHN0ciA9IHRleHRFbC52YWx1ZTtcclxuICAgICAgICAvLyBpZiBhdCBsZWFzdCAxIHdvcmQgY2hhcmFjdGVyXHJcbiAgICAgICAgaWYgKC9cXHcvZ20udGVzdChzdHIpKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXIuY291bnQoc3RyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgdGV4dCBib3ggaXMgZW1wdHkgYnV0IHByZXZpb3VzIGNvdW50ID4gMFxyXG4gICAgICAgIGVsc2UgaWYgKGNvdW50ZXIucmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXIucmVzdWx0ID0gMDtcclxuICAgICAgICAgICAgY291bnRDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyB1cGRhdGUgY291bnRlciB0ZXh0XHJcbiAgICBpZiAoY291bnRDaGFuZ2VkKSB7XHJcbiAgICAgICAgY291bnRDaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgY291bnRFbC5pbm5lclRleHQgPSAnJyArIGNvdW50ZXIucmVzdWx0O1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBhbmltYXRpb24gbG9vcFxyXG5mdW5jdGlvbiBtYWluTG9vcCAoKSB7XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobWFpbkxvb3ApO1xyXG4gICAgYXBwbHlDaGFuZ2VzKCk7XHJcbn1cclxucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW5Mb29wKTsiXX0=

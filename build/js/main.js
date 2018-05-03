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
const countwords_1 = require("./countwords");
const textEl = document.getElementById("inputfield");
const countEl = document.getElementById("wordcount");
const counter = countwords_1.getCounter(onCountUpdate);
var inputChanged = false;
var countChanged = false;
textEl.addEventListener("keydown", handleInput, false);
textEl.addEventListener("change", handleInput, false);
function handleInput(event) {
    inputChanged = true;
}
function applyChanges() {
    if (inputChanged) {
        let str = textEl.value;
        if (/\w/gm.test(str)) {
            counter.count(str);
        }
        else if (counter.result) {
            counter.result = 0;
            countChanged = true;
        }
    }
    if (countChanged) {
        countChanged = false;
        countEl.innerText = '' + counter.result;
    }
}
function onCountUpdate() {
    countChanged = true;
}
function mainLoop() {
    requestAnimationFrame(mainLoop);
    applyChanges();
}
requestAnimationFrame(mainLoop);
},{"./countwords":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY291bnR3b3Jkcy50cyIsInNyYy9qcy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSx3REFBd0Q7QUFDeEQseURBQXlEO0FBQ3pELGdDQUFnQztBQUNoQzs7Ozs7R0FLRztBQUNILG9CQUE0QixFQUFFO0lBQzFCLElBQUksT0FBTyxHQUFHO1FBQ1YsTUFBTSxFQUFFLENBQUM7UUFDVCxLQUFLLEVBQUUsSUFBSTtLQUNkLENBQUM7SUFDRixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9CLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN4QixFQUFFLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQztRQUNGLE9BQU8sQ0FBQyxLQUFLLEdBQUcsVUFBVSxJQUFZO1lBQ2xDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDO0tBQ0w7U0FBTTtRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsd0RBQXdELENBQUMsQ0FBQTtRQUNyRSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYjtZQUNJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDM0MsRUFBRSxFQUFFLENBQUM7UUFDVCxDQUFDO1FBQ0QsT0FBTyxDQUFDLEtBQUssR0FBRyxVQUFVLElBQVk7WUFDbEMsR0FBRyxHQUFHLElBQUksQ0FBQztZQUNYLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDO0tBQ0w7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBNUJELGdDQTRCQzs7OztBQ3JDRCw2Q0FBd0M7QUFFeEMsTUFBTSxNQUFNLEdBQXlCLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDM0UsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNyRCxNQUFNLE9BQU8sR0FBRyx1QkFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRTFDLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztBQUN6QixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7QUFFekIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDdkQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFdEQscUJBQXNCLEtBQUs7SUFDdkIsWUFBWSxHQUFHLElBQUksQ0FBQztBQUN4QixDQUFDO0FBRUQ7SUFDSSxJQUFJLFlBQVksRUFBRTtRQUNkLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDdkIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdEI7YUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDdkIsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDbkIsWUFBWSxHQUFHLElBQUksQ0FBQztTQUN2QjtLQUNKO0lBQ0QsSUFBSSxZQUFZLEVBQUU7UUFDZCxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7S0FDM0M7QUFDTCxDQUFDO0FBRUQ7SUFDSSxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLENBQUM7QUFFRDtJQUNJLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLFlBQVksRUFBRSxDQUFDO0FBQ25CLENBQUM7QUFFRCxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIHJldHVybnMgb2JqIHdpdGggd29yZCBjb3VudCBmdW5jdGlvbiBhbmQgY291bnQgcmVzdWx0XHJcbi8vIGlmIHdvcmtlcnMgc3VwcG9ydGVkLCBmbiBzZW5kcyB0ZXh0IHRvIHdvcmtlciB0byBjb3VudFxyXG4vLyBlbHNlIGp1c3QgcnVucyBvbiBtYWluIHRocmVhZFxyXG4vKipcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2IgY2FsbGJhY2sgdG8gc2lnbmFsIHdoZW4gY291bnQgcmVzdWx0IGlzIHJlYWR5XHJcbiAqIEByZXR1cm4ge09iamVjdH0gY291bnRlclxyXG4gKiBAcmV0dXJuIHtmdW5jdGlvbihzdHJpbmcpfSBjb3VudGVyLmNvdW50IC0gd29yZCBjb3VudCBmdW50aW9uXHJcbiAqIEByZXR1cm4ge251bWJlcn0gY291bnRlci5yZXN1bHQgLSByZXN1bHQgb2YgY291bnQgZnVuY3Rpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb3VudGVyIChjYikge1xyXG4gICAgdmFyIGNvdW50ZXIgPSB7XHJcbiAgICAgICAgcmVzdWx0OiAwLFxyXG4gICAgICAgIGNvdW50OiBudWxsXHJcbiAgICB9O1xyXG4gICAgaWYgKHdpbmRvdy5oYXNPd25Qcm9wZXJ0eShcIldvcmtlclwiKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRpbmcgd29ya2VyXCIpO1xyXG4gICAgICAgIGxldCB3b3JrZXIgPSBuZXcgV29ya2VyKFwianMvd29ya2VyLmpzXCIpO1xyXG4gICAgICAgIHdvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBjb3VudGVyLnJlc3VsdCA9IGUuZGF0YTtcclxuICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvdW50ZXIuY291bnQgPSBmdW5jdGlvbiAodGV4dDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh0ZXh0KTtcclxuICAgICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIldlYldvcmtlciBub3Qgc3VwcG9ydGVkLiBSdW5uaW5nIGNvdW50IG9uIG1haW4gdGhyZWFkLlwiKVxyXG4gICAgICAgIHZhciBzdHIgPSAnJztcclxuICAgICAgICBmdW5jdGlvbiBhc3luY0NvdW50ICgpIHtcclxuICAgICAgICAgICAgY291bnRlci5yZXN1bHQgPSBzdHIubWF0Y2goL1xcdysvZ20pLmxlbmd0aDtcclxuICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY291bnRlci5jb3VudCA9IGZ1bmN0aW9uICh0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgc3RyID0gdGV4dDtcclxuICAgICAgICAgICAgc2V0VGltZW91dChhc3luY0NvdW50LCAwKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvdW50ZXI7XHJcbn0iLCJpbXBvcnQge2dldENvdW50ZXJ9IGZyb20gXCIuL2NvdW50d29yZHNcIjtcclxuXHJcbmNvbnN0IHRleHRFbCA9IDxIVE1MVGV4dEFyZWFFbGVtZW50PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlucHV0ZmllbGRcIik7XHJcbmNvbnN0IGNvdW50RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndvcmRjb3VudFwiKTtcclxuY29uc3QgY291bnRlciA9IGdldENvdW50ZXIob25Db3VudFVwZGF0ZSk7XHJcblxyXG52YXIgaW5wdXRDaGFuZ2VkID0gZmFsc2U7XHJcbnZhciBjb3VudENoYW5nZWQgPSBmYWxzZTtcclxuXHJcbnRleHRFbC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVJbnB1dCwgZmFsc2UpO1xyXG50ZXh0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBoYW5kbGVJbnB1dCwgZmFsc2UpO1xyXG5cclxuZnVuY3Rpb24gaGFuZGxlSW5wdXQgKGV2ZW50KSB7XHJcbiAgICBpbnB1dENoYW5nZWQgPSB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseUNoYW5nZXMgKCkge1xyXG4gICAgaWYgKGlucHV0Q2hhbmdlZCkge1xyXG4gICAgICAgIGxldCBzdHIgPSB0ZXh0RWwudmFsdWU7XHJcbiAgICAgICAgaWYgKC9cXHcvZ20udGVzdChzdHIpKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXIuY291bnQoc3RyKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvdW50ZXIucmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXIucmVzdWx0ID0gMDtcclxuICAgICAgICAgICAgY291bnRDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoY291bnRDaGFuZ2VkKSB7XHJcbiAgICAgICAgY291bnRDaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgY291bnRFbC5pbm5lclRleHQgPSAnJyArIGNvdW50ZXIucmVzdWx0O1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBvbkNvdW50VXBkYXRlICgpIHtcclxuICAgIGNvdW50Q2hhbmdlZCA9IHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1haW5Mb29wICgpIHtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShtYWluTG9vcCk7XHJcbiAgICBhcHBseUNoYW5nZXMoKTtcclxufVxyXG5cclxucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW5Mb29wKTtcclxuXHJcbiJdfQ==

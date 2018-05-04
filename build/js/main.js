(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/// <reference path="masks.d.ts"/>
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
        rtl: false,
        changes: 2 /* count_mask */,
        count: null
    };
    if (window.hasOwnProperty("Worker")) {
        console.log("starting worker");
        let worker = new Worker("js/worker.js");
        worker.onmessage = function (e) {
            counter[e.data.key] = e.data.value;
            counter.changes = e.data.flag;
            cb();
        };
        counter.count = function (text) {
            worker.postMessage(text);
        };
    }
    else {
        console.log("WebWorker not supported. Running count on main thread. Unicode support limited.");
        var str = '';
        function asyncCount() {
            counter.result = str.match(/\S+/gm).length;
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
/// <reference path="masks.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
const countwords_1 = require("./countwords");
const textEl = document.getElementById("inputfield");
const countEl = document.getElementById("wordcount");
const counter = countwords_1.getCounter(onCountUpdate);
var changes = 0;
textEl.addEventListener("keydown", onInputChange, false);
textEl.addEventListener("change", onInputChange, false);
// flag input change on keydown and change events
// wait til next animation frame to count
function onInputChange(event) {
    changes |= 1 /* input_mask */;
}
function onCountUpdate() {
    changes |= counter.changes;
}
function applyChanges() {
    if (changes) {
        // if text changed, send text string to worker
        if (changes & 1 /* input_mask */) {
            changes ^= 1 /* input_mask */;
            let str = textEl.value;
            // if at least 1 non-space character
            if (/\S/gm.test(str)) {
                counter.count(str);
            }
            // if text box is empty but previous count > 0
            else if (counter.result) {
                counter.result = 0;
                changes |= 2 /* count_mask */;
            }
        }
        // update counter text
        if (changes & 2 /* count_mask */) {
            changes ^= 2 /* count_mask */;
            countEl.innerText = '' + counter.result;
        }
        // switch writing direction if changed left-to-right or right-to-left
        if (changes & 4 /* rtl_mask */) {
            changes ^= 4 /* rtl_mask */;
            textEl.style.direction = counter.rtl ? "rtl" : "ltr";
        }
    }
}
// animation loop
function mainLoop() {
    requestAnimationFrame(mainLoop);
    applyChanges();
}
requestAnimationFrame(mainLoop);
},{"./countwords":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY291bnR3b3Jkcy50cyIsInNyYy9qcy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBLGtDQUFrQzs7QUFFbEMsd0RBQXdEO0FBQ3hELHlEQUF5RDtBQUN6RCxnQ0FBZ0M7QUFDaEM7Ozs7O0dBS0c7QUFDSCxvQkFBNEIsRUFBRTtJQUMxQixJQUFJLE9BQU8sR0FBRztRQUNWLE1BQU0sRUFBRSxDQUFDO1FBQ1QsR0FBRyxFQUFFLEtBQUs7UUFDVixPQUFPLG9CQUF1QjtRQUM5QixLQUFLLEVBQUUsSUFBSTtLQUNkLENBQUM7SUFDRixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9CLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDOUIsRUFBRSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUM7UUFDRixPQUFPLENBQUMsS0FBSyxHQUFHLFVBQVUsSUFBWTtZQUNsQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQztLQUNMO1NBQU07UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGlGQUFpRixDQUFDLENBQUE7UUFDOUYsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ1o7WUFDRyxPQUFPLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzNDLEVBQUUsRUFBRSxDQUFDO1FBQ1QsQ0FBQztRQUNELE9BQU8sQ0FBQyxLQUFLLEdBQUcsVUFBVSxJQUFZO1lBQ2xDLEdBQUcsR0FBRyxJQUFJLENBQUM7WUFDWCxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQztLQUNMO0lBQ0QsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQS9CRCxnQ0ErQkM7OztBQzFDRCxrQ0FBa0M7O0FBRWxDLDZDQUEwQztBQUUxQyxNQUFNLE1BQU0sR0FBeUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMzRSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JELE1BQU0sT0FBTyxHQUFHLHVCQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFMUMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBRWhCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3pELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3hELGlEQUFpRDtBQUNqRCx5Q0FBeUM7QUFDekMsdUJBQXdCLEtBQUs7SUFDekIsT0FBTyxzQkFBeUIsQ0FBQztBQUNyQyxDQUFDO0FBRUQ7SUFDSSxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQztBQUMvQixDQUFDO0FBRUQ7SUFDSSxJQUFJLE9BQU8sRUFBRTtRQUNULDhDQUE4QztRQUM5QyxJQUFJLE9BQU8scUJBQXdCLEVBQUU7WUFDakMsT0FBTyxzQkFBeUIsQ0FBQztZQUNqQyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ3ZCLG9DQUFvQztZQUNwQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdEI7WUFDRCw4Q0FBOEM7aUJBQ3pDLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDckIsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sc0JBQXlCLENBQUM7YUFDcEM7U0FDSjtRQUNELHNCQUFzQjtRQUN0QixJQUFJLE9BQU8scUJBQXdCLEVBQUU7WUFDakMsT0FBTyxzQkFBeUIsQ0FBQztZQUNqQyxPQUFPLENBQUMsU0FBUyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1NBQzNDO1FBQ0QscUVBQXFFO1FBQ3JFLElBQUksT0FBTyxtQkFBc0IsRUFBRTtZQUMvQixPQUFPLG9CQUF1QixDQUFDO1lBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3hEO0tBQ0o7QUFDTCxDQUFDO0FBRUQsaUJBQWlCO0FBQ2pCO0lBQ0kscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsWUFBWSxFQUFFLENBQUM7QUFDbkIsQ0FBQztBQUNELHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIm1hc2tzLmQudHNcIi8+XHJcblxyXG4vLyByZXR1cm5zIG9iaiB3aXRoIHdvcmQgY291bnQgZnVuY3Rpb24gYW5kIGNvdW50IHJlc3VsdFxyXG4vLyBpZiB3b3JrZXJzIHN1cHBvcnRlZCwgZm4gc2VuZHMgdGV4dCB0byB3b3JrZXIgdG8gY291bnRcclxuLy8gZWxzZSBqdXN0IHJ1bnMgb24gbWFpbiB0aHJlYWRcclxuLyoqXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiIGNhbGxiYWNrIHRvIHNpZ25hbCB3aGVuIGNvdW50IHJlc3VsdCBpcyByZWFkeVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9IGNvdW50ZXJcclxuICogQHJldHVybiB7ZnVuY3Rpb24oc3RyaW5nKX0gY291bnRlci5jb3VudCAtIHdvcmQgY291bnQgZnVudGlvblxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IGNvdW50ZXIucmVzdWx0IC0gcmVzdWx0IG9mIGNvdW50IGZ1bmN0aW9uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q291bnRlciAoY2IpIHtcclxuICAgIHZhciBjb3VudGVyID0ge1xyXG4gICAgICAgIHJlc3VsdDogMCxcclxuICAgICAgICBydGw6IGZhbHNlLFxyXG4gICAgICAgIGNoYW5nZXM6IENoYW5nZVR5cGUuY291bnRfbWFzayxcclxuICAgICAgICBjb3VudDogbnVsbFxyXG4gICAgfTtcclxuICAgIGlmICh3aW5kb3cuaGFzT3duUHJvcGVydHkoXCJXb3JrZXJcIikpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIHdvcmtlclwiKTtcclxuICAgICAgICBsZXQgd29ya2VyID0gbmV3IFdvcmtlcihcImpzL3dvcmtlci5qc1wiKTtcclxuICAgICAgICB3b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgY291bnRlcltlLmRhdGEua2V5XSA9IGUuZGF0YS52YWx1ZTtcclxuICAgICAgICAgICAgY291bnRlci5jaGFuZ2VzID0gZS5kYXRhLmZsYWc7XHJcbiAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb3VudGVyLmNvdW50ID0gZnVuY3Rpb24gKHRleHQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2UodGV4dCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJXZWJXb3JrZXIgbm90IHN1cHBvcnRlZC4gUnVubmluZyBjb3VudCBvbiBtYWluIHRocmVhZC4gVW5pY29kZSBzdXBwb3J0IGxpbWl0ZWQuXCIpXHJcbiAgICAgICAgdmFyIHN0ciA9ICcnO1xyXG4gICAgICAgICBmdW5jdGlvbiBhc3luY0NvdW50ICgpIHtcclxuICAgICAgICAgICAgY291bnRlci5yZXN1bHQgPSBzdHIubWF0Y2goL1xcUysvZ20pLmxlbmd0aDtcclxuICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY291bnRlci5jb3VudCA9IGZ1bmN0aW9uICh0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgc3RyID0gdGV4dDtcclxuICAgICAgICAgICAgc2V0VGltZW91dChhc3luY0NvdW50LCAwKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvdW50ZXI7XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwibWFza3MuZC50c1wiLz5cclxuXHJcbmltcG9ydCB7IGdldENvdW50ZXIgfSBmcm9tIFwiLi9jb3VudHdvcmRzXCI7XHJcblxyXG5jb25zdCB0ZXh0RWwgPSA8SFRNTFRleHRBcmVhRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dGZpZWxkXCIpO1xyXG5jb25zdCBjb3VudEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3b3JkY291bnRcIik7XHJcbmNvbnN0IGNvdW50ZXIgPSBnZXRDb3VudGVyKG9uQ291bnRVcGRhdGUpO1xyXG5cclxudmFyIGNoYW5nZXMgPSAwO1xyXG5cclxudGV4dEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uSW5wdXRDaGFuZ2UsIGZhbHNlKTtcclxudGV4dEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25JbnB1dENoYW5nZSwgZmFsc2UpO1xyXG4vLyBmbGFnIGlucHV0IGNoYW5nZSBvbiBrZXlkb3duIGFuZCBjaGFuZ2UgZXZlbnRzXHJcbi8vIHdhaXQgdGlsIG5leHQgYW5pbWF0aW9uIGZyYW1lIHRvIGNvdW50XHJcbmZ1bmN0aW9uIG9uSW5wdXRDaGFuZ2UgKGV2ZW50KSB7XHJcbiAgICBjaGFuZ2VzIHw9IENoYW5nZVR5cGUuaW5wdXRfbWFzaztcclxufVxyXG5cclxuZnVuY3Rpb24gb25Db3VudFVwZGF0ZSAoKSB7XHJcbiAgICBjaGFuZ2VzIHw9IGNvdW50ZXIuY2hhbmdlcztcclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlDaGFuZ2VzICgpIHtcclxuICAgIGlmIChjaGFuZ2VzKSB7XHJcbiAgICAgICAgLy8gaWYgdGV4dCBjaGFuZ2VkLCBzZW5kIHRleHQgc3RyaW5nIHRvIHdvcmtlclxyXG4gICAgICAgIGlmIChjaGFuZ2VzICYgQ2hhbmdlVHlwZS5pbnB1dF9tYXNrKSB7XHJcbiAgICAgICAgICAgIGNoYW5nZXMgXj0gQ2hhbmdlVHlwZS5pbnB1dF9tYXNrO1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gdGV4dEVsLnZhbHVlO1xyXG4gICAgICAgICAgICAvLyBpZiBhdCBsZWFzdCAxIG5vbi1zcGFjZSBjaGFyYWN0ZXJcclxuICAgICAgICAgICAgaWYgKC9cXFMvZ20udGVzdChzdHIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyLmNvdW50KHN0cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaWYgdGV4dCBib3ggaXMgZW1wdHkgYnV0IHByZXZpb3VzIGNvdW50ID4gMFxyXG4gICAgICAgICAgICBlbHNlIGlmIChjb3VudGVyLnJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgY291bnRlci5yZXN1bHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlcyB8PSBDaGFuZ2VUeXBlLmNvdW50X21hc2s7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdXBkYXRlIGNvdW50ZXIgdGV4dFxyXG4gICAgICAgIGlmIChjaGFuZ2VzICYgQ2hhbmdlVHlwZS5jb3VudF9tYXNrKSB7XHJcbiAgICAgICAgICAgIGNoYW5nZXMgXj0gQ2hhbmdlVHlwZS5jb3VudF9tYXNrO1xyXG4gICAgICAgICAgICBjb3VudEVsLmlubmVyVGV4dCA9ICcnICsgY291bnRlci5yZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHN3aXRjaCB3cml0aW5nIGRpcmVjdGlvbiBpZiBjaGFuZ2VkIGxlZnQtdG8tcmlnaHQgb3IgcmlnaHQtdG8tbGVmdFxyXG4gICAgICAgIGlmIChjaGFuZ2VzICYgQ2hhbmdlVHlwZS5ydGxfbWFzaykge1xyXG4gICAgICAgICAgICBjaGFuZ2VzIF49IENoYW5nZVR5cGUucnRsX21hc2s7XHJcbiAgICAgICAgICAgIHRleHRFbC5zdHlsZS5kaXJlY3Rpb24gPSBjb3VudGVyLnJ0bCA/IFwicnRsXCIgOiBcImx0clwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gYW5pbWF0aW9uIGxvb3BcclxuZnVuY3Rpb24gbWFpbkxvb3AgKCkge1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW5Mb29wKTtcclxuICAgIGFwcGx5Q2hhbmdlcygpO1xyXG59XHJcbnJlcXVlc3RBbmltYXRpb25GcmFtZShtYWluTG9vcCk7Il19

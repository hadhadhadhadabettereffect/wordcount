/// <reference path="masks.d.ts"/>

// returns obj with word count function and count result
// if workers supported, fn sends text to worker to count
// else just runs on main thread
/**
 * @param {function} cb callback to signal when count result is ready
 * @return {Object} counter
 * @return {function(string)} counter.count - word count funtion
 * @return {number} counter.result - result of count function
 */
export function getCounter (cb) {
    var counter = {
        result: 0,
        rtl: false,
        changes: ChangeType.count_mask,
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
        counter.count = function (text: string) {
            worker.postMessage(text);
        };
    } else {
        console.log("WebWorker not supported. Running count on main thread. Unicode support limited.")
        var str = '';
         function asyncCount () {
            counter.result = str.match(/\S+/gm).length;
            cb();
        }
        counter.count = function (text: string) {
            str = text;
            setTimeout(asyncCount, 0);
        };
    }
    return counter;
}
declare function postMessage(count: number);

onmessage = function(e) {
    var count = e.data.match(/\w+/g).length;
    postMessage(count);
}
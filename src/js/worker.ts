declare function postMessage(count: number);

onmessage = function(e) {
    var count = e.data.match(/\w+/mg).length;
    postMessage(count);
}
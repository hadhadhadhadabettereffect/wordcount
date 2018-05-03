import * as XRegExp from "xregexp";

declare function postMessage(count: number);

var reg = XRegExp("\\pL+", "gumx");
reg = XRegExp.globalize(reg);

onmessage = function(e) {
    var str = e.data;
    var count = 0;
    while (reg.exec(str)) ++count;
    postMessage(count);
}
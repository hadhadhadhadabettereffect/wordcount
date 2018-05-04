/// <reference path="masks.d.ts"/>
declare function postMessage(msg: any);

import * as XRegExp from "xregexp";

/**
\p{InCJK_Unified_Ideographs}
    count each ideograph as a distinct word
    e.g. 日本語 = 3 words
\pL+
    count continuous strings of unicode characters as one word
    e.g. カタカナ = 1 word
\d+\.{0,1}\d*
    count continuous strings of digits as one word.
    a single period in the middle of a string of numbers
    will be considered a decimal point
    e.g. 33.1 = 1 word
    
    TODO check client region, adjust regex to match local number notation
**/
var reg = XRegExp("\\p{InCJK_Unified_Ideographs}|\\pL+|(\\d+\\.{0,1}\\d*)", "gumx");
var reg_rtl = XRegExp(`^(
    \\p{InArabic}|
    \\p{InHebrew}|
    \\p{InSyriac}|
    \\p{InSamaritan}|
    \\p{InMandaic}|
    \\p{InThaana}|
    \\p{InNKo}
)+`, "gumx");
var rtl = false;
var text = "";

reg = XRegExp.globalize(reg);
reg_rtl = XRegExp.globalize(reg_rtl);

// check if text is in a language written from right to left
function detectRtl () {
    let checkRtl = reg_rtl.test(text);
    if (rtl !== checkRtl) {
        rtl = checkRtl;
        console.log(rtl);
        postMessage({
            flag: ChangeType.rtl_mask,
            key: "rtl",
            value: rtl
        });
    }
}

function countWords () {
    var count = 0;
    while (reg.exec(text)) ++count;
    postMessage({
        flag: ChangeType.count_mask,
        key: "result",
        value: count
    });
}

onmessage = function(e) {
    text = e.data;
    setTimeout(detectRtl, 0);
    countWords();
}
!function u(i,c,s){function a(t,e){if(!c[t]){if(!i[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(l)return l(t,!0);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}var o=c[t]={exports:{}};i[t][0].call(o.exports,function(e){return a(i[t][1][e]||e)},o,o.exports,u,i,c,s)}return c[t].exports}for(var l="function"==typeof require&&require,e=0;e<s.length;e++)a(s[e]);return a}({1:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.getCounter=function(t){var n={result:0,rtl:!1,changes:2,count:null};if(window.hasOwnProperty("Worker")){console.log("starting worker");var r=new Worker("js/worker.js");r.onmessage=function(e){n[e.data.key]=e.data.value,n.changes=e.data.flag,t()},n.count=function(e){r.postMessage(e)}}else console.log("WebWorker not supported. Running count on main thread. Unicode support limited."),n.count=function(e){n.result=e.match(/\S+/gm).length,t()};return n}},{}],2:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e("./countwords"),o=document.getElementById("inputfield"),u=document.getElementById("wordcount"),i=r.getCounter(function(){c|=i.changes}),c=0;function s(e){c|=1}o.addEventListener("keydown",s,!1),o.addEventListener("change",s,!1),requestAnimationFrame(function e(){requestAnimationFrame(e),function(){if(c){if(1&c){c^=1;var e=o.value;/\S/gm.test(e)?i.count(e):i.result&&(i.result=0,c|=2)}2&c&&(c^=2,u.innerText=""+i.result),4&c&&(c^=4,o.style.direction=i.rtl?"rtl":"ltr")}}()})},{"./countwords":1}]},{},[2]);
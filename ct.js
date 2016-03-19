/// <reference path="./typings/tsd.d.ts" />
'use strict';

var blockedUrl = ['vk.', 'kinopoisk.'];
var handler = {};

/*** vk */
function clearVkStuff (name) {
    var tempElement = document.querySelector(name);
    if (tempElement) {
        tempElement.remove();
        console.log(name + ' cleared');
    }
}

var adList = [	'#left_ads',
                `#ads_left`,
                '.ads_ads_news_wrap',
                '#feed_recommends',
                'span[class*="promoted"]',
                '#videocat_page'
];
                
// remove whatever add is there and it's further sources
function burnIt () {
    for (var i=0; i < adList.length; i++) {
        clearVkStuff(adList[i]);
    }
}

function deleteAdPosts () {
    var fr = document.querySelectorAll('.post');
    for (var i=0; i < fr.length; i++) {
        // ad post doesn't 'response' or 'comment' options, neither it has an explanation like 'added n photos'
        if (!fr[i].querySelector('a[class*="repl"]') && (!fr[i].querySelector('.explain') ||
            !fr[i].querySelector('.explain').textContent)) {
            fr[i].parentElement.remove();
        }
    }
}

handler.startvk = function () {
    console.log(`start vk`);
    burnIt();
    setInterval(burnIt, 200);
	deleteAdPosts();
	setInterval(deleteAdPosts, 1000);
}
/*** \vk */

/*** kinopoisk */
handler.startkinopoisk = function () {
    console.log(`start kinopoisk`);
    var body = document.getElementsByTagName('body')[0];
    body.style.background = '';
    body.style.position = 'relative';
    body.style.top = '-200px';
    var objs = document.getElementsByTagName('object');
    for (var k=0; k < objs.length; k++) {
        objs[k].remove();
    }
}
/*** \kinopoisk */

/*** processor */
console.log(location.href);
for (var i=0; i < blockedUrl.length; i++) {
    if (location.href.match(blockedUrl[i])) {
        handler[`start${blockedUrl[i].replace(/\./g,'')}`]();
        break;
    }
}
















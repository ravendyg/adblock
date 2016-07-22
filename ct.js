/// <reference path="./typings/tsd.d.ts" />
'use strict';

var blockedUrl = ['vk.', 'kinopoisk.', 'ngs.'];
// , `ngs.`];
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
                // '.ads_ads_news_wrap',
                // '#feed_recommends',
                // 'span[class*="promoted"]',
                // '#videocat_page'
];

// remove whatever add is there and it's further sources
function burnIt () {
    for (var i=0; i < adList.length; i++) {
        clearVkStuff(adList[i]);
    }

    var posts = document.querySelectorAll('.feed_row');
    for (var i = 0; i < posts.length; i++)
    {
      if (!!posts[i].textContent.toLowerCase().match('рекламная'))
      {
        posts[i].remove();
        console.log('vk: remove ad post');
      }
    }
}

// function deleteAdPosts () {
//     var fr = document.querySelectorAll('.post');
//     for (var i=0; i < fr.length; i++) {
//         // ad post doesn't 'response' or 'comment' options, neither it has an explanation like 'added n photos'
//         if (!fr[i].querySelector('a[class*="repl"]') && (!fr[i].querySelector('.explain') ||
//             !fr[i].querySelector('.explain').textContent)) {
//             fr[i].parentElement.remove();
//         }
//     }
// }

function deleteVkTrash ()
{
  findAndRemoveTrash( document.getElementById('video_content_catalog') );
  findAndRemoveTrash( document.getElementById('videocat_other_blocks') );
  findAndRemoveTrash( document.getElementById('video_content_catalog') );
}

handler.startvk =
 function ()
 {
   console.log(`start vk`);

   burnIt();
   deleteVkTrash();

   setInterval(
     () =>
     {
       burnIt();
       deleteVkTrash();
     }
     , 200
   );
 }
/*** \vk */

/*** kinopoisk */
handler.startkinopoisk = function () {
    console.log(`start kinopoisk`);
    if (!!document.querySelector('ul.menu')) {
        var body = document.getElementsByTagName('body')[0];
        body.style.background = '';
    }
    var objs = document.getElementsByTagName('object');
    if (document.getElementById('top').offsetTop > 0) {
        body.style.position = 'relative';
        body.style.top = `-${document.getElementById('top').offsetTop}px`;
    }
    for (var k=0; k < objs.length; k++) {
        objs[k].remove();
    }
}
/*** \kinopoisk */

/*** ngs */
handler.startngs = function () {
    findAndRemoveTrash( document.querySelector('.edition-phone-footer') );

    var popups = document.querySelectorAll(`div[class*="popup"]`);
    for (var i=0; i < popups.length; i++) {
        popups[i].remove();
    }
}
/*** /ngs */

/** processor
 *
 * start up remove tasks
 */
for (var i=0; i < blockedUrl.length; i++) {
    if (location.href.match(blockedUrl[i])) {
        handler[`start${blockedUrl[i].replace(/\./g,'')}`]();
        break;
    }
}

function findAndRemoveTrash (trash)
{
  if (trash)
  {
      trash.remove();
  }
}














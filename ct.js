/// <reference path="./typings/tsd.d.ts" />
'use strict';

var blockedUrl = ['vk.', 'kinopoisk.', 'ngs.', '2gis.'];
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

var adList =
[
  '#left_ads',
  `#ads_left`
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
handler.startkinopoisk =
  function () {
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
handler.startngs =
  function () {
    findAndRemoveTrash( document.querySelector('.edition-phone-footer') );

    removeArrSelectors(
      document.querySelectorAll(`div[class*="popup"]`)
    );

    removeArrSelectors(
      document.querySelectorAll(`div[class*="banner"]`)
    );

    removeArrSelectors(
      document.querySelectorAll(`div[id*="div-gpt-ad"]`)
    );

    var observer = new MutationObserver(
      mutations =>
      {
        console.log(mutations);
        for (var i = 0; i < mutations.length; i++)
        {
          mutations[i].target.style.overflow = '';
        }
      }
    );

    var targetBody = document.getElementsByTagName('body')[0];
    observer.observe(targetBody, { attributes : true, attributeFilter : ['style'] });
    var targetHtml = document.getElementsByTagName('html')[0];
    observer.observe(targetHtml, { attributes : true, attributeFilter : ['style'] });

  };
/*** /ngs */

/** 2gis */
handler.start2gis =
  () =>
  { // it loads later -> look for it for 5 sec
    var clear1 = false, clear2 = false, counter = 0;

    const search =
      setInterval(
        () =>
        {
          var target = document.querySelector('.dashboard__promo');
          if ( target.textContent.match('Adblock') )
          {
            target.remove();
            clear1 = true;
          }
          target = document.querySelector('.promoTooltip');
          if ( target )
          {
            target.remove();
            clear2 = true;
          }

          counter++;
          if ( (clear1 && clear2) || counter > 25)
          {
            clearInterval(search);
          }
        },
        200
      );
  };


/** /2gis */

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

/** yandex direct */
setTimeout(
  () =>
  {
    eliminateYandex(
      document.querySelectorAll('[id*="direct"]')
    );

    eliminateYandex(
      document.querySelectorAll('[class*="direct"]')
    );

    removeArrSelectors(
      document.querySelectorAll('.adv.adv_pos_top')
    );
  },
  1500
);

var elYaCount = 0;
function eliminateYandex (arr)
{
  for (var i = 0; i < arr.length; i++)
  {
    console.log('eliminate yandex: ' + (++elYaCount) );

    var cl = arr[i].getAttribute('class');
    var id = arr[i].getAttribute('id');
    if (
      cl && cl.match('yandex') ||
      id && id .match('yandex')
    )
    {
      arr[i].remove();
    }
  }
}

function removeArrSelectors (arr)
{
  for (var i = 0; i < arr.length; i++)
  {
    arr[i].remove();
  }
}


function findAndRemoveTrash (trash)
{
  if (trash)
  {
      trash.remove();
  }
}














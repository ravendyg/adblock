/// <reference path="./typings/tsd.d.ts" />
'use strict';

const blocker = {
    vk: {
        reg: /vk\./,
        cleaner() {
            console.log(`start vk`);

            burnIt();
            deleteVkTrash();

            setInterval(
                () => {
                    burnIt();
                    deleteVkTrash();
                }, 200
            );
        },
    },

    kinopoisk: {
        reg: /kinopoisk\./,
        cleaner() {
            console.log(`start kinopoisk`);
            document.querySelector('html').style.background = 'none';
            if (!!document.querySelector('ul.menu')) {
                var body = document.getElementsByTagName('body')[0];
                body.style.background = '';
            }
            var objs = document.getElementsByTagName('object');
            // if (document.getElementById('top').offsetTop > 0) {
            //   body.style.position = 'relative';
            //   body.style.top = `-${document.getElementById('top').offsetTop}px`;
            // }
            for (var k = 0; k < objs.length; k++) {
                objs[k].remove();
            }

            var bf = document.getElementById('brandingFlash');
            if (bf) { bf.remove(); }

            // shift menu to the top
            var form = document.getElementById('top_form');
            var menu = document.querySelector('ul.menu');
            var block = document.querySelector('div.png_block');
            var top = document.getElementById('top');
            if (form && menu && block) {
                form.style.top = '10px';
                menu.style.top = '10px';
                block.style.top = '10px';
                top.style.height = (block.offsetHeight + 3) + 'px';
            }
            var someBanner = document.querySelector('a[href*="https://awaps"]');
            someBanner && someBanner.parentElement.remove();
        }
    },

    ngs: {
        reg: /ngs\./,
        cleaner() {
            findAndRemoveTrash(document.querySelector('.edition-phone-footer'));

            removeArrSelectors(
                document.querySelectorAll(`div[class*="popup"]`)
            );

            removeArrSelectors(
                document.querySelectorAll(`div[class*="banner"]`)
            );

            removeArrSelectors(
                document.querySelectorAll(`div[id*="div-gpt-ad"]`)
            );

            removeArrSelectors(
                document.querySelectorAll('[src*="reklama"]')
            );

            removeArrSelectors(
                document.querySelectorAll('[href*="reklama"]')
            );

            var observer = new MutationObserver(
                mutations => {
                    console.log(mutations);
                    for (var i = 0; i < mutations.length; i++) {
                        mutations[i].target.style.overflow = '';
                    }
                }
            );

            var targetBody = document.getElementsByTagName('body')[0];
            observer.observe(targetBody, { attributes: true, attributeFilter: ['style'] });
            var targetHtml = document.getElementsByTagName('html')[0];
            observer.observe(targetHtml, { attributes: true, attributeFilter: ['style'] });
        }
    },

    gis2: {
        reg: /2gis\./,
        cleaner() {
            let
                clear1 = false,
                clear2 = false,
                counter = 0
                ;
            const search =
                setInterval(
                    () => {
                        var target = document.querySelector('.dashboard__promo');
                        if (target && target.textContent.match('Adblock')) {
                            target.remove();
                            clear1 = true;
                        }
                        target = document.querySelector('.promoTooltip');
                        if (target) {
                            target.remove();
                            clear2 = true;
                        }

                        counter++;
                        if ((clear1 && clear2) || counter > 25) {
                            clearInterval(search);
                        }
                    },
                    200
                );
        }
    },

    pogoda: {
        reg: /yandex\.ru\/pogoda/,
        cleaner() {
            // ads
            let schedule = -1;
            let attempts = 20;
            const yaClean = () => {
                console.log('try ya clean');
                const cards = Array.from(document.querySelectorAll('.card'));
                for (const card of cards) {
                    const classes = (card.getAttribute('class') || '').split(/\s/);
                    // ads has two classes: card and *
                    if ((classes.length === 2 || classes.length === 3) && classes[0] == 'card') {
                        card.remove();
                    }
                }
                attempts--;
                if (attempts <= 0) {
                    clearInterval(schedule);
                }
            };
            schedule = setInterval(yaClean, 50);
            // popup
            let el = document.querySelector('.footer');
            if (el) {
                el = el.nextElementSibling;
            }
            while (el) {
                const tmp = el;
                el = el.nextElementSibling;
                tmp.remove();
            }
            // right add
            let contentBottom = document.querySelector('.content__bottom');
            let maybeAd = contentBottom.nextElementSibling;
            const klass = maybeAd.getAttribute('class');
            if (klass.indexOf('segment') === -1) {
                maybeAd.remove();
            }
        }
    },

    quora: {
        reg: /.*quora\.com.*/,
        cleaner() {
            // remove overlay
            const signupWrapperReg = /.*signup_wall_wrapper.*/;
            const list = [...document.querySelectorAll('body>div')];
            list.forEach(div => {
                if (div && signupWrapperReg.test(div.id)) {
                    typeof div.remove === 'function' && div.remove();
                }
            });
            // remove blur
            const content = document.querySelector('.ContentWrapper');
            if (content) {
                content.style.filter = 'inherit';
                content.style.webkitFilter = 'inherit';
            }
        },
    },

}

/*** vk */
function clearVkStuff(name) {
    var tempElement = document.querySelector(name);
    if (tempElement && tempElement.innerHTML !== '') {
        tempElement.innerHTML = '';
        tempElement.style.position = 'absolute';
        tempElement.style.width = '1px';
        tempElement.style.height = '1px';
        tempElement.style.top = '-1000';
        tempElement.style.left = '-1000';
        console.log(name + ' cleared');
    }
}

var adList =
    [
        '#left_ads',
        `#ads_left`
    ];

// remove whatever add is there and it's further sources
function burnIt() {
    for (var i = 0; i < adList.length; i++) {
        clearVkStuff(adList[i]);
    }

    var posts = document.querySelectorAll('.feed_row');
    for (var i = 0; i < posts.length; i++) {
        if (!!posts[i].textContent.toLowerCase().match('рекламная')) {
            posts[i].remove();
            console.log('vk: remove ad post');
        }
        else if (/__[0-9]{1,}/.test(posts[i].getAttribute('id'))) {
            posts[i].remove();
            console.log('vk: remove "актуальные новости"');
        }
    }

    for (const it of document.querySelectorAll('.stories_feed_with_thumb')) {
        it.remove();
    }

    for (let node of document.querySelectorAll('._ads_promoted_post')) {
        node.remove();
    }
}

function deleteVkTrash() {
    findAndRemoveTrash(document.getElementById('video_content_catalog'));
    findAndRemoveTrash(document.getElementById('videocat_other_blocks'));
    findAndRemoveTrash(document.getElementById('video_content_catalog'));
}


/** processor
 *
 * start up remove tasks
 */
const doClean = () => {
    for (let key of Object.keys(blocker)) {
        if (blocker[key].reg.test(location.href)) {
            blocker[key].cleaner();
            break;
        }
    }
};

/** yandex direct */
var elYaCount = 0;
clearAllNonRepeptitiveStuff();
setTimeout(clearAllNonRepeptitiveStuff, 1500);


function eliminateParent(target) {
    let parent = target.parentElement;
    if (parent) {
        parent.remove();
    }
}


function eliminateVelumAll() {
    // found on ngs
    var arr = document.querySelectorAll('[class*="velum"]');
    for (var i = 0; i < arr.length; i++) {
        arr[i].remove();
    }
}


function eliinateYandexDirect() {
    const nodes = [...document.querySelectorAll('yatag')];
    nodes.forEach(node => node.remove());
}


function clearAllNonRepeptitiveStuff() {
    eliinateYandexDirect();
    eliminateVelumAll();
}

function removeArrSelectors(arr) {
    for (var i = 0; i < arr.length; i++) {
        (!/content/.test(arr[i].getAttribute('class'))) && arr[i].remove();
    }
}

function findAndRemoveTrash(trash) {
    if (trash) {
        trash.remove();
    }
}

doClean();

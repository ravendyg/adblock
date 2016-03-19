/// <reference path="./typings/tsd.d.ts" />
`use strict`;

var tabsHistory = {};
// var oldUrl = ``;
var curUrl = ``;

function changeUrl (url) {
    // oldUrl = curUrl;
    curUrl = url;
    // // stop the previous activity
    // for (var i=0; i < blockedUrl.length; i++) {
    //     if (oldUrl.match(blockedUrl[i])) {
    //         console.log(oldUrl);
    //         chrome.runtime.sendMessage({
    //             action: 'stop',
    //             url: oldUrl
    //         });
    //         break;
    //     }
    // }
    // // start a new one
    // for (var i=0; i < blockedUrl.length; i++) {
    //     if (url.match(blockedUrl[i])) {
    //         oldUrl = blockedUrl[i];
    //         console.log(oldUrl);
    //         chrome.runtime.sendMessage({
    //             action: 'start',
    //             url: oldUrl
    //         });
    //         break;
    //     }
    // }
}

// wait for the content request
chrome.runtime.onMessage.addListener( function(message, sender) {
console.log(message);
    if (message.action === `get url`) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log(tabs);
            chrome.tabs.sendMessage(tabs[0].id, {
                // oldUrl,
                curUrl
            });
        });
    }
});

// tab event processors
function update (tabId, changeInfo) {
    if (changeInfo.url) {
        tabsHistory[tabId] = changeInfo.url;
        changeUrl(changeInfo.url);;
    }    
}

function activate (activeInfo) {
    if (tabsHistory[activeInfo.tabId]) {
        changeUrl(tabsHistory[activeInfo.tabId]);
    }
}

function removeTab (tabId) {
    delete tabsHistory[tabId];
}

function replace (addedTab, removedTab) {
    // for some reasons not yet clear some pages (like ngs.ru), sometimes trigger replace instead of update
    delete tabsHistory[removedTab];
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
        tabsHistory[addedTab] = tabs[0].url;
        changeUrl(tabs[0].url);
    });
}

chrome.tabs.onUpdated.addListener(update);
chrome.tabs.onActivated.addListener(activate);
chrome.tabs.onRemoved.addListener(removeTab);
chrome.tabs.onReplaced.addListener(replace);;
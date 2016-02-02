Homebrew adblock for vk.com (or whatever you want to extend it for).

vk.com/js/al/aes_light.js injects ad into page after adblocks fired, but if you just block it there will be a problem with navigation.
vk works like an SPA. So far have found that disabling aes_light causes crash of "comments" link, that is handled by feed.js.
The problem is on the line 899
`cur.reposts = cur.options.reposts = '';`
solution is to block both aes_light and feed, inject slightly changed feed.js back, then remove all known ads

Adblock is still required, unless you know how to block selected scripts from downloading

## installation
https://developer.chrome.com/extensions/getstarted#unpacked

feed.js is the modified version, original is in feed_old.js
bg.js is a content script that clears DOM and injects feed.js

popup.html and popup.js are there just in case. Right now they are empty and useless.

"JavaScript error: AdsLight is not defined" will show, but didn't see it cause any problem

Enjoy.

/* the problem with vk is that in common.js they check for ads presence:

 if (elem.id === 'left_ads' && (elem.style['visibility'] || elem.style['display']) && vk.id && (vk.id % 17 < 5)) {
    //elem.setAttribute('style', elem.getAttribute('style').replace('visibility: visible;','visibility: visible !important;').replace('display: block;','display: block !important;'));
    elem.style.setProperty('visibility', 'visible', 'important');
    elem.style.setProperty('display', 'block', 'important');
  }

  * and this file will be loaded after extension script finished
  * chrome extension can access DOM, but not window (there is a walk around, by injecting script into page, but it's cumbersome
  * therefore bruteforce approach is used: remove, later check and remove again (aprx. loading time in my case 5-7 sec)
  * repeat several times
*/

/* chrome extensions are a real mess - background script can't detect page change when you click a link
 * need to use content script, but that one can't access DOM
 * it became even more terrible
 */
/*
function searchAdParent (q) {
	var z=q.parentElement;
	if (z.getAttribute('class').trim() === 'feed_row') {
		return z;
	} else {
		return searchAdParent(z);
	}
}
* */
if (location.host === 'vk.com') {
	// inject modified feed.js
	function injectScript(file, node) {
		var th = document.getElementsByTagName(node)[0];
		var s = document.createElement('script');
		s.setAttribute('type', 'text/javascript');
		s.setAttribute('src', file);
		th.appendChild(s);
	}
	injectScript( chrome.extension.getURL('/feed.js'), 'body');
	
	function clearVkStuff (name) {
		var tempElement = document.querySelector(name);
		if (tempElement) {
			tempElement.remove();
			console.log(name + ' cleared');
		}
	}
	var adList = [	'#left_ads',
					'.ads_ads_news_wrap',
					'#feed_recommends',
					'span[class*="promoted"]'];
	// remove whatever add is there and it's further sources
	for (var i=0; i<adList.length; i++) {
		clearVkStuff(adList[i]);
	}
	
/*
	setInterval(function() {
		clearVkStuff();
	}, 5000);
*/
}

//getStyle.toString().replace(/if\s\(elem\.id(.|\n[^}])*}/, '').replace(/function(.)*{/, '');
//getStyle.toString().replace(/if\s\(elem\.id(.|\n)*/, ';return ret;').replace(/function(.)*{/, '');
//getStyle = new Function('elem', 'name', 'force', getStyle.toString().replace(/if\s\(elem\.id(.|\n)*/, ';return ret;').replace(/function(.)*{/, ''));




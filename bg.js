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

function searchAdParent (q) {
	var z=q.parentElement;
	if (z.getAttribute('class').trim() === 'feed_row') {
		return z;
	} else {
		return searchAdParent(z);
	}
}
function clearVkStuff () {
	var tempElement = document.querySelector('#left_ads');
	if (tempElement) {
		tempElement.remove();
		console.log('vk cleared');
	}
	tempElement = document.querySelector('.ads_ads_news_wrap');
	if (tempElement) {
		tempElement.remove();
		console.log('vk news cleared');
	}
	tempElement = document.querySelector('#feed_recommends')
	if (tempElement) {
		tempElement.remove();
		console.log('vk recommend cleared');
	}
	tempElement = document.querySelector('span[class*="promoted"]');
	if (tempElement) {
		tempElement = searchAdParent(tempElement);
		tempElement.remove();
		console.log('vk promoted cleared');
	}
}

if (location.host === 'vk.com') {
	clearVkStuff();

	setInterval(function() {
		clearVkStuff();
	}, 5000);
}

//getStyle.toString().replace(/if\s\(elem\.id(.|\n[^}])*}/, '').replace(/function(.)*{/, '');
//getStyle.toString().replace(/if\s\(elem\.id(.|\n)*/, ';return ret;').replace(/function(.)*{/, '');
//getStyle = new Function('elem', 'name', 'force', getStyle.toString().replace(/if\s\(elem\.id(.|\n)*/, ';return ret;').replace(/function(.)*{/, ''));



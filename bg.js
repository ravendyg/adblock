if (location.host === 'vk.com') {
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
		for (var i=0; i<adList.length; i++) {
			clearVkStuff(adList[i]);
		}
	}
	
	burnIt();
	setInterval(burnIt, 200);
	
	function deleteAdPosts () {
// console.log('deleta ad posts: ' + Date.now());
		var fr = document.querySelectorAll('.post');
		for (var i=0; i<fr.length; i++) {
			// ad post doesn't 'response' or 'comment' options, neither it has an explanation like 'added n photos'
			if (!fr[i].querySelector('a[class*="repl"]') && (!fr[i].querySelector('.explain') ||
				!fr[i].querySelector('.explain').textContent)) {
console.log(fr[i].parentElement);
				fr[i].parentElement.remove();
			}
		}
	}
	
	deleteAdPosts();
	setInterval(deleteAdPosts, 2000);

}




















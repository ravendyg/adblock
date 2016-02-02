if (location.host === 'vk.com') {
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
	setInterval(function() {
		burnIt();
	}, 500);

}


var fr = document.querySelectorAll('.post');

for (var i=0; i<fr.length; i++) {
	//if (!fr[i].querySelector('.reply_link')) {
	if (!fr[i].querySelector('a[class*="repl"]') && (!fr[i].querySelector('.explain') ||
		!fr[i].querySelector('.explain').textContent)) {
		console.log(fr[i].parentElement);
	}
}

// .reply_link

for (var i=0; i<10/*fr.length*/; i++) {
	console.log(fr[i].querySelector('.explain'));
}

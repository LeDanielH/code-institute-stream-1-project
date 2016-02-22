//no-js
var elDocument = document.documentElement;
elDocument.className=elDocument.className.replace(/(^|\s)no-js(\s|$)/, '$1');

//copyright-date
var today = new Date();
var year = today.getFullYear();
var hourNow = today.getHours();
var greeting;

(function updateGreeting() {
	if (hourNow > 18) {
		greeting = 'Good evening stranger!';
	} else if (hourNow > 12) {
		greeting = 'Good afternoon stranger!';
	} else if (hourNow > 0) {
		greeting = 'Good morning stranger!';
	} else {
		greeting = 'Welcome stranger!';
	}
	var enterGreeting = document.getElementById('greeting');
	enterGreeting.textContent = greeting;
})();

(function updateCopyrightYear() {
	var enterYear = document.getElementById('copyYear');
	enterYear.innerHTML = "&copy;" + " Monkees " + year;
})();
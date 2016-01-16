//no-js
var elDocument = document.documentElement;
elDocument.className=elDocument.className.replace(/(^|\s)no-js(\s|$)/, '$1');

//copyright-date
var today = new Date();
var year = today.getFullYear();
var enterYear = document.getElementById("copyYear");
enterYear.innerHTML = "&copy;" + " Monkees " + year;
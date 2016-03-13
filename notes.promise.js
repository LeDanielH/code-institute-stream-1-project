//promisejs.org

function waitForMyVar() {
	return new Promise(function (resolve) {

		delete window.myVar;
		var timer = setInterval(function () {
			if (window.myVar !== undefined) {
				clearInterval(timer);
				resolve(window.myVar);
			}
		}, 100);
	});
}

var promise = waitForMyVar();

promise.then(function (value) {
	alert('the value is: ' + value);
});

//XHR
//https://stream-1-project-ledanielh.c9users.io/#/gigs
function getData(url) {
	return new Promise(function (resolve) {
		var request = new XMLHttpRequest();

		request.open('GET', url);

		request.onreadystatechange = function () {
			if (request.readyState === 4) {
				//end
				resolve(request.responseText);
			}
		};

		//start
		request.send(null);
	});
}


getData('/data/json/gigs.json')
.then(function(val){
	alert(val);
	val = JSON.parse(val);
	return val[0];
})
.then(function(value) {
    alert(JSON.stringify(value));
});


var dataPromise = getData('/data/json/gigs.json');
dataPromise.then(alert);
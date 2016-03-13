//promisejs.org

function waitForMyVar(returnValue){
	delete window.myVar;
	var timer = setInterval(function(){
		if(window.myVar !== undefined){
			clearInterval(timer);
			returnValue(window.myVar);
		}
	}, 100);
	
	return window.myVar;
}

function callMeWhenYouHaveTheValue(value){
	alert('the value is: '+ value);
}

waitForMyVar(callMeWhenYouHaveTheValue);

//XHR
//https://stream-1-project-ledanielh.c9users.io/#/gigs
function getData(url, returnValue){
	var request = new XMLHttpRequest();
	
	request.open('GET', url);
	
	request.onreadystatechange = function(){
		if(request.readyState === 4){
			//end
			returnValue(request.responseText);
		}
	};
	
	//start
	request.send(null);
}

function getDataSync(url){
	var request = new XMLHttpRequest();
	
	request.open('GET', url, false);
	
	//start
	request.send(null);
	
	return request.responseText;
}


// syncrounous
var response = getDataSync('/data/json/gigs.json');
alert(response);

getData('/data/json/gigs.json', function(response){
	alert(response);
});

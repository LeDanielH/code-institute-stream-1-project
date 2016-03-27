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


// PROMISES

// HARDCODED
function readJSON(filename){
  return new Promise(function (fulfill, reject){
    readFile(filename, 'utf8').done(function (res){
      try {
        fulfill(JSON.parse(res));
      } catch (ex) {
        reject(ex);
      }
    }, reject);
  });
}

// <script src="https://www.promisejs.org/polyfills/promise-done-7.0.4.min.js"></script>
// with script tag - shorter
function readJSON(filename){
  return readFile(filename, 'utf8').then(function (res){
    return JSON.parse(res);
  });
}

// even shorter
function readJSON(filename){
  return readFile(filename, 'utf8').then(JSON.parse);
}

// jQuery way
var jQueryPromise = $.ajax('/data.json');
var realPromise = Promise.resolve(jQueryPromise);

// PROPER ANGULAR WAY
$scope.maps = [];
$scope.map = null;
function load(maps){
    $scope.maps = maps;
    $scope.map = maps[0];
}
GigsDataService.maps.query().$promise.then(load);

// OTHER ANGULAR WAYS
// $http.get
// GigsHttpService.getMaps()
//    .then(load);

// GigsDataService.maps.query().$promise.then(function(maps){
//     $scope.maps = maps;
//     $scope.map = maps[0];
// });

// Promise.reject - It's best to always avoid throwing synchronous exceptions in an asychronous method.
var rejectedPromise = Promise.reject(new Error('Whatever'));

// Promise.all - The all function returns a new promise which is fulfilled with an array of fulfillment values for the passed promises or rejects with the reason of the first promise that rejects.
function readJsonFiles(filenames) {
  // N.B. passing readJSON as a function, not calling it with `()`
  return Promise.all(filenames.map(readJSON));
}
readJsonFiles(['a.json', 'b.json']).done(function (results) {
  // results is an array of the values stored in a.json and b.json
}, function (err) {
  // If any of the files fails to be read, err is the first error
});

function all(promises) {
  var accumulator = [];
  var ready = Promise.resolve(null);
  promises.forEach(function (promise) {
    ready = ready.then(function () {
      return promise;
    }).then(function (value) {
      accumulator.push(value);
    });
  });
  return ready.then(function () { return accumulator; });
}

// Promise.race makes races like this even easier to run:
function timeout(promise, time) {
  return Promise.race([promise, delay(time).then(function () {
    throw new Error('Operation timed out');
  })]);
}

//generators
function* demo() {
    var res = yield 10;
    assert(res === 32);
    return 42;
}
var d = demo();
var resA = d.next();
// => {value: 10, done: false}
var resB = d.next(32);
// => {value: 42, done: true}
//if we call d.next() again it throws an error

// deferred pattern
// $q
// var dfd = $q.defer();
function asyncGreet(name) {
  var deferred = $q.defer();

  setTimeout(function() {
    deferred.notify('About to greet ' + name + '.');

    if (okToGreet(name)) {
      deferred.resolve('Hello, ' + name + '!');
    } else {
      deferred.reject('Greeting ' + name + ' is not allowed.');
    }
  }, 1000);

  return deferred.promise;
}

var promise = asyncGreet('Robin Hood');
promise.then(function(greeting) {
  alert('Success: ' + greeting);
}, function(reason) {
  alert('Failed: ' + reason);
}, function(update) {
  alert('Got notification: ' + update);
});

// dfd.resolve
// dfd.reject()

function asyncGreet(name) {
  // perform some asynchronous operation, resolve or reject the promise when appropriate.
  return $q(function(resolve, reject) {
    setTimeout(function() {
      if (okToGreet(name)) {
        resolve('Hello, ' + name + '!');
      } else {
        reject('Greeting ' + name + ' is not allowed.');
      }
    }, 1000);
  });
}

var promise = asyncGreet('Robin Hood');
promise.then(function(greeting) {
  alert('Success: ' + greeting);
}, function(reason) {
  alert('Failed: ' + reason);
});

// new Promise(function(resolve, reject){
//   // what we use reject for
// });

// ou don’t need defer to create a simple-valued promise
// Let’s take a look at this case:

var defer;
defer = $q.defer();
defer.resolve(['detail', 'simple']);
return defer.promise;
// It’s easy to see the author just wanted to create a promise with some hard-coded value. Those 4 lines? They can just be rewritten as:
return $q.when(['detail', 'simple']);
// Same goes for this longer case or that one. $q.when() is perfect for when you want to turn a simple value into a promise.

var myFirstDeferred = $q.defer();
async(
	myFirstDeferred.resolve, 
	myFirstDeferred.reject
);

var myFirstPromise = myFirstDeferred.promise;

myFirstPromise.then(function(data) {
        console.log('My first promise succeeded', data);
    }, function(error) {
        console.log('My first promise failed', error);
});
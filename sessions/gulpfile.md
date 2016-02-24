
# Modular Coding

 - CommonJS

 - AMD (Asyn Module Definition)
 
 - JavaScript ES2015/ES6 Module pattern

Note: all of these are used to create or implement modules

## AMD
```javascript

	//app.js
	define(['jquery', 'angular'], function($, angular){
	  return {
	    start: function(){
	      console.log('Start the application');
	    }
	  };
	})

 
```
 
```javascript

	//main.js
	require(['./app'], function(app){
	  app.start();
	});

```
RequireJS

## CommonJS
```javascript
	
	//app.js
	var $ = require('jquery');
	var angular = require('angular');

	module.exports = {
		start: function(){
		  console.log('Start the application');
		}
	};
 
```
 
```javascript
	
	//main.js
	var app = require('./app);
	app.start();
	
```
```javascript

	$('')
	.append()
	.append()
	.append()
	//here
	.append();

	$('')
	.append()
	.append()
	.append()
	//here
	.append();

	function sampleGulp(){
		this.pipe = function(){
			console.log('Something');
			return this;
		};
		
		this.pipeEndProcess = function(){
			console.log('pipeEndProcess');
			return this;
		};
	}

	new sampleGulp()
	.pipe()
	.pipe()
	.pipe()
	.pipe()
	.pipeEndProcess();


	var obj = {
		name: 'Daniel',
		info: {
			email: 'example@example.com'
		}
	};

	console.log(obj.info.email);

	var key = 'info',
	  key2 = 'email';
	console.log(obj[key][key2]);

	// obj.info.email
	// obj[key][key2]

```
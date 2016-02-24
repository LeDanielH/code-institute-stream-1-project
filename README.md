## Code Institute Dublin - Stream 1 project

You can checkout my progress [here](http://ledanielh.github.io/code-institute-stream-1-project/).



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
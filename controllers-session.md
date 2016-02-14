$rootScope.a = 12;
	
	IndexController $scope.b = 15;

		HeaderController
		   {{a}}
		   {{b}}
		   
		   $scope.c = $scope.a + $scope.b;
		   
			   ng-includes: nav.html
			     {{a}} {{b}} {{c}}
			     
			   directive: makMap
			     {{a}} {{b}} {{c}}
	
		ContainerController
		
		   {{c}}==> Error
		  
		  HomeController
		      {{a}}
		  GigsController
		
		StoreItemsController
		
		
		
# Prototypal: just JavaScript

```javascript

var rootScope = {};
rootScope.a = 12;

var indexControllerScope = Object.create(rootScope);
indexControllerScope.b = 15;

var headerControllerScope = Object.create(indexControllerScope);
headerControllerScope.c = 20;

var navScope = Object.create(headerControllerScope);
navScope.d = navScope.a + navScope.b + navScope.c;

```
# ng-text-roll
An AngularJS [component](https://docs.angularjs.org/guide/component)
that highlights string changes by “rolling” characters.

[Demo Page](http://daveteply.github.io/ng-text-roll/dist)

### Install with Bower
```sh
$ bower install ng-text-roll
```

### Adding dependency to your project
Add a dependency for the `ui.ngTextRoll` AngularJS module:

```js
angular.module('myModule', ['ui.ngTextRoll']);
```

### Example usage
Add the ngTextRoll directive to your markup:
```html
<ng-text-roll target="amount" height="20px"></ng-text-roll>
```

Create a target value in your controller:
```js
angular.moddule('myApp', []).controller('myCtrl', function($scope) {
	$scope.amount = 1.23;
	$scope.buttonClick = function() {
		$scope.amount += 1;
	};
});
```

### Options

#### target
Required.  Value used to present in ngTextRoll directive when first displayed.
Example: `target="values.totalPrice"`
#### height
Element height.  If height is not provided, a warning is thrown and a default value of 1em is set.
Example: `height="12px"`
#### config
Configuration object for additional options.
##### filter
Apply an AngularJS [filter](https://docs.angularjs.org/api/ng/filter) to the `target` value.
Example:
```html
<ng-text-roll target="amount" height="20px" config="rollConfig"></ng-text-roll>
```
```js
angular.moddule('myApp', []).controller('myCtrl', function($scope) {
	// ...
	$scope.rollConfig = {
		filter: 'currency'
	};
});
```
##### filterParams
Some AngularJS filters can have extra parameters passed, like `date` can take a string formatting parameter.
Example:
```html
<ng-text-roll target="amount" height="20px" config="rollConfig"></ng-text-roll>
```
```js
angular.moddule('myApp', []).controller('myCtrl', function($scope) {
	// ...
	$scope.rollConfig = {
		filter: 'date',
		filterParams: 'MM/dd/yyyy'
	};
});
```
##### rollAll
By default, `ngTextRoll` will only roll characters that have changed.  Enabling this config option
will roll all the characters with each change.
Example:
```html
<ng-text-roll target="amount" height="20px" config="rollConfig"></ng-text-roll>
```
```js
angular.moddule('myApp', []).controller('myCtrl', function($scope) {
	// ...
	$scope.rollConfig = {
		rollAll: true
	};
});
```

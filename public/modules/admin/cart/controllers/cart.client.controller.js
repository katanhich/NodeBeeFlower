var actionTemplate = 
	'<a href="/admin/#!/cart/{{ COL_FIELD }}/edit" class="ui-grid-cell-contents">Edit</a>'+
	'<a class="ui-grid-cell-contents" ng-click="delete(\'{{ COL_FIELD }}\')">Delete</a>';

angular.module('cart').controller('CartController', function($scope, Carts) {

	$scope.find = function() {
		Carts.getList().then(function(carts) {
			$scope.gridOptions.data = carts;
		});
	};

	$scope.gridOptions = {
		enableSorting: true,
		enablePaginationControls: false,
		paginationPageSize: 10,
		columnDefs: [
		  { name:'Cart Id', field: '_id' },
		  { name:'Status', field: 'status' },
		  { name:'Date', field: 'created'},
		  { name:'Action', field: '_id', cellTemplate: actionTemplate}
		]
	};

	$scope.gridOptions.onRegisterApi = function (gridApi) {
	  $scope.gridApi = gridApi;
	}
});

angular.module('cart').factory('Carts', function(Restangular) {
	var carts = Restangular.all('cart');
	return carts;
});
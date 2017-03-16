'use strict';

productApp.controller('ProductController',
    function ProductController($scope, $http) {

        $http.get("http://localhost:3000/products/")
            .then(function onProductComplete(response) {
                $scope.product = response.data;
            });

        $scope.removeProduct = function (products) {
            var index = $scope.product.indexOf(products);
            $http.delete("http://localhost:3000/products/" + products.id)
                .then(function onProductDelete(response) {
                    $scope.product.splice(index, 1);
                });
        };

        $scope.name = null;
        $scope.desc = null;
        $scope.cost = null;
        $scope.postData = function (productName, productDesc, productCost) {
            var data = {
                name: productName,
                desc: productDesc,
                cost: productCost
            };
            $http.post('http://localhost:3000/products', JSON.stringify(data))
                .then(function (response) {
                    $scope.product.push(response.data);
                });
        };
    });


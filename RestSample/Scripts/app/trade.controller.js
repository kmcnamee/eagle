eagleRest.controller('TradeCtrl',
    ['$scope', '$http', '$rootScope',
    function ($scope, $http, $rootScope) {
        $scope.gridOptions = {
            rowHeight: 30, // set row height, this is default size
            enableSorting: true,
            columnDefs: [
            ]
        };

        $scope.dataLoading = false;
        $scope.startDate = "CURRENT";
        $scope.endDate = "CURRENT";

        $scope.queryName = "TRADES";

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.openDates = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.datesOpened = true;
        };

        $scope.getTableHeight = function () {
            return {
                height: window.innerHeight - 175 + "px"
            };
        };

        $scope.run = function () {
            $scope.dataLoading = true;
            $http.get($rootScope.baseUrl + 'api/portal/query/run/' + $scope.queryName + '?entity_id=' + $scope.fund.ID + '&start_date=' + $scope.startDate + '&start_date=' + $scope.endDate)
            .success(function (results) {
                console.log(results);
                for (var i = 0 ; i < results.Fields.length; i++) {

                    var column = {
                        name: results.Fields[i].Description,
                        field: "" + i
                    }
                    console.log(column);
                    $scope.gridOptions.columnDefs[i] = column;
                    $scope.dataLoading = false;
                }
                $scope.gridOptions.data = results.Values;
                console.log($scope.gridOptions.data);
            }).error(function () {
                $scope.dataLoading = false;
            });
        }

        $scope.getFunds = function (val) {
            return $http.get($rootScope.baseUrl + 'api/core/fund/startsWith', {
                params: {
                    startsWith: val
                }
            }).then(function (response) {
                return response.data;
            });

        };


    }]);
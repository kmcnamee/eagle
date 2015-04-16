eagleRest.controller('HoldingCtrl',
    ['$scope', '$http',
    function ($scope, $http) {        
        $scope.gridOptions = {
            rowHeight: 30, // set row height, this is default size
            enableSorting: true,
            columnDefs: [                
            ]            
        };

        $scope.dataLoading = false;
        $scope.effectiveDate = "CURRENT";

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.getTableHeight = function () {            
            return {
                height: window.innerHeight - 175 + "px"
            };
        };
        
        $scope.run = function () {
            $scope.dataLoading = true;
            $http.get('http://kmcnamee300/eagle.rest/api/portal/query/run/holdings?entity_id=' + $scope.fund.ID + '&effective_date=' + $scope.effectiveDate) //1520
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
            }).error(function(){
                $scope.dataLoading = false;
            });
        }

        $scope.getFunds = function (val) {
            return $http.get('http://kmcnamee300/eagle.rest/api/core/fund/startsWith', {
                params: {
                    startsWith: val                    
                }
            }).then(function (response) {
                return response.data;
              });
           
        };
        
        
    }]);
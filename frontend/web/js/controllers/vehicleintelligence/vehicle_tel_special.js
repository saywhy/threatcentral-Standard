var myApp = angular.module("myApp", []);
myApp.controller("vehicleTelSpecialCtrl", function($scope, $http, $filter) {

    $scope.toggleCountry = false;

    $scope.select_vehicle_search_if = false;
    $scope.select_indicator_if = false;
    $scope.select_device_ip_if = false;


    $scope.choosetime = {
        startDate: moment().subtract(90, "days"),
        endDate: moment()
    };


    $scope.searchData = {
        client_ip: "",
        category: "",
        indicator: "",
        company: ""
    };

    $scope.category_select = [
        {
            num: "",
            type: "请选择预警类型"
        }
    ];

    $scope.company_select = [
        {
            num: "",
            type: "请选择资产分组"
        }
    ];

    $scope.search_picker = function() {
        $("#search_picker").daterangepicker(
            {
                singleDatePicker: true,
                showDropdowns: true,
                timePicker: true,
                timePicker24Hour: true,
                drops: "down",
                opens: "center",
                maxDate: $scope.choosetime.endDate,
                startDate: $scope.choosetime.startDate,
                locale: {
                    applyLabel: "确定",
                    cancelLabel: "取消",
                    format: "YYYY-MM-DD HH:mm:ss"
                }
            },
            function(start, end, label) {
                $scope.outTime.startDate = start.unix();
            }
        );
    };


    $scope.search_picker();
});

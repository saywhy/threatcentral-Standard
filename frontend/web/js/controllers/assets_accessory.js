var myApp = angular.module("myApp", []);
myApp.controller("assetsAccessoryCtrl", function($scope, $http, $filter) {

    $scope.init = function () {

        $scope.acc_data = {
            id: '',
            name: '',
            sup: '',
            sys: '',
            core: '',
            sup_id: ''
        };

        $scope.accssory = {
            PN_ID:[{num: '', status: '全部'}, {num: '高', status: '高'}, {num: '中', status: '中'}, {num: '低', status: '低'}],
            PN_NAME:[{num: '', status: '全部'}, {num: '高', status: '高'}, {num: '中', status: '中'}, {num: '低', status: '低'}],
            PN_SUP:[{num: '', status: '全部'}, {num: '高', status: '高'}, {num: '中', status: '中'}, {num: '低', status: '低'}],
            PN_SYS:[{num: '', status: '全部'}, {num: '高', status: '高'}, {num: '中', status: '中'}, {num: '低', status: '低'}],
            PN_CORE:[{num: '', status: '全部'}, {num: '高', status: '高'}, {num: '中', status: '中'}, {num: '低', status: '低'}],
            PN_SUP_ID:[{num: '', status: '全部'}, {num: '高', status: '高'}, {num: '中', status: '中'}, {num: '低', status: '低'}]
        }
    }


    $scope.init();
});

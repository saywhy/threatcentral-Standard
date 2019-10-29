var myApp = angular.module("myApp", []);
myApp.controller("vehicleTelLoopholeCtrl", function($scope, $http, $filter) {

    $scope.choosetime = {
        startDate: moment().subtract(90, "days"),
        endDate: moment()
    };
    $scope.pages = {
        data:[{degree:'高',hid:'001',headline:'CVE-2019-16180:iTERM2远程执行代码漏洞警报',
            describe:'Limesurvey before 3.17.14 allows remote attackers to remote…',source:'内部系统',
            type:[{name:'信息泄露',status:false}]},
            {degree:'中',hid:'002',headline:'CVE-2019-16180:iTERM2远程执行代码漏洞警报',
                describe:'Limesurvey before 3.17.14 allows remote attackers to remote…',source:'upstream',
                type:[{name:'信息泄露',status:false},{name:'跨站脚本',status:false},{name:'跨站信息',status:false}]},
            {degree:'低',hid:'003',headline:'CVE-2019-16180:iTERM2远程执行代码漏洞警报',
                describe:'Limesurvey before 3.17.14 allows remote attackers to remote…',source:'CVE',
                type:[{name:'信息泄露',status:false},{name:'跨站脚本',status:false}]},
            {degree:'高',hid:'004',headline:'CVE-2019-16180:iTERM2远程执行代码漏洞警报',
                describe:'Limesurvey before 3.17.14 allows remote attackers to remote…',source:'内部系统',
                type:[{name:'信息泄露',status:false},{name:'跨站脚本',status:false},{name:'跨站信息',status:false},{name:'本站信息',status:false}]},
            {degree:'高',hid:'005',headline:'CVE-2019-16180:iTERM2远程执行代码漏洞警报',
                describe:'Limesurvey before 3.17.14 allows remote attackers to remote…',source:'内部系统',
                type:[{name:'信息泄露',status:false}]},
            {degree:'中',hid:'006',headline:'CVE-2019-16180:iTERM2远程执行代码漏洞警报',
                describe:'Limesurvey before 3.17.14 allows remote attackers to remote…',source:'upstream',
                type:[{name:'信息泄露',status:false},{name:'跨站脚本',status:false},{name:'跨站信息',status:false}]},
            {degree:'低',hid:'007',headline:'CVE-2019-16180:iTERM2远程执行代码漏洞警报',
                describe:'Limesurvey before 3.17.14 allows remote attackers to remote…',source:'CVE',
                type:[{name:'信息泄露',status:false},{name:'跨站脚本',status:false}]},
            {degree:'高',hid:'008',headline:'CVE-2019-16180:iTERM2远程执行代码漏洞警报',
                describe:'Limesurvey before 3.17.14 allows remote attackers to remote…',source:'内部系统',
                type:[{name:'信息泄露',status:false},{name:'跨站脚本',status:false},{name:'跨站信息',status:false},{name:'本站信息',status:false}]}],
        count: 8,
        maxPage: "...",
        pageNow: 1
    };

    $scope.toggleCountry = false;

    $scope.select_vehicle_search_if = false;
    $scope.select_indicator_if = false;
    $scope.select_device_ip_if = false;

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

    $scope.start_picker = function() {
        $("#start_picker").daterangepicker(
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


    $scope.start_picker();


});

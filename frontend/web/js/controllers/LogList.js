var myApp = angular.module("myApp", []);
myApp.controller("logCtrl", function ($scope, $http, $filter) {
    $scope.init = function () {
        $scope.choosetime = {
            startDate: '',
            endDate: ''
        };
        $scope.parmas_data = {
            username: "",
            start_time: '',
            end_time: '',
            page: 1,
            rows: 10,
            role: ""
        };
        $scope.select_type = [{
            num: "",
            type: "所有"
        }];
        $scope.select_name = "";
        $scope.picker_search();
        $scope.get_role_list();
        $scope.get_page_list();
    };

    $scope.picker_search = function () {
        $("#picker_search").daterangepicker({
                autoUpdateInput: false,
                'locale': {
                    "format": 'YYYY/MM/DD',
                    "separator": " - ",
                    "applyLabel": "确定",
                    "cancelLabel": "清空",
                    "fromLabel": "起始时间",
                    "toLabel": "结束时间'",
                    "customRangeLabel": "自定义",
                    "weekLabel": "W",
                    "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
                    "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    "firstDay": 1
                },
                ranges: {
                    '最近7天': [moment().subtract(6, 'days'), moment()],
                    '最近30天': [moment().subtract(29, 'days'), moment()],
                    '今年': [moment().startOf('year'), moment()],
                    '去年': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year')
                        .endOf('year')
                    ],
                },
                showDropdowns: true,
                "alwaysShowCalendars": true,
                timePickerSeconds: false,
                drops: "down",
                opens: "right",
                autoUpdateInput: false,
            },
            function (start, end, label) {
                $scope.parmas_data.start_time = start.unix();
                $scope.parmas_data.end_time = end.unix();
                console.log($scope.parmas_data.start_time);
                console.log($scope.parmas_data.end_time);
            },
        )
        $('#picker_search').on('apply.daterangepicker', function (ev, picker) {
            $(this).val(picker.startDate.format('YYYY/MM/DD') + ' - ' + picker.endDate.format('YYYY/MM/DD'));
            $scope.parmas_data.start_time = picker.startDate.unix()
            $scope.parmas_data.end_time = picker.endDate.unix()
        });
        $('#picker_search').on('cancel.daterangepicker', function (ev, picker) {
            $(this).val('');
            $scope.parmas_data.start_time = ''
            $scope.parmas_data.end_time = ''
        });
    };
    // 获取角色列表
    $scope.get_role_list = function () {
        $http.get("/user/role-list").then(
            function success(rsp) {
                console.log(rsp);
                $scope.select_type = [{
                    num: "",
                    type: "所有"
                }];
                if (rsp.data.status == "success") {
                    $scope.role_list = rsp.data.data;
                    angular.forEach($scope.role_list, function (item) {
                        var obj = {
                            num: item.name,
                            type: item.name
                        };
                        $scope.select_type.push(obj);
                    });
                }
            },
            function err(rsp) {}
        );
    };
    //获取列表
    $scope.get_page_list = function (pageNow) {
        pageNow = pageNow ? pageNow : 1;
        $scope.parmas_data.page = pageNow;
        $scope.parmas_data.role = $scope.select_name;
        var loading = zeroModal.loading(4);
        $http.post("/userlog/page", $scope.parmas_data).then(
            function success(rsp) {
                zeroModal.close(loading);
                if (rsp.data.status == "success") {
                    $scope.page_list = rsp.data;
                }
            },
            function err(rsp) {}
        );
    };

    $scope.init();
});
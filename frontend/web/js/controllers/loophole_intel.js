var myApp = angular.module("myApp", []);
myApp.controller("loopholeIntelCtrl", function ($scope, $http, $filter) {
    $scope.init = function () {
        $scope.get_page();
        $scope.searchTime = {
            startDate: moment()
                .subtract(90, "days")
                .unix(),
            endDate: moment().unix()
        };
        $scope.seach_data = {
            source: '所有',
            stauts: 0,
        };
        $scope.status_search = [{
                num: 0,
                status: '所有'
            },
            {
                num: 1,
                status: '已发布'
            },
            {
                num: 2,
                status: '未发布'
            }
        ]
        $scope.picker_search();
        $scope.start_time_picker();
        $scope.get_loophole_source();
        $scope.get_tag_list();
        $scope.tag_list_if = false;
    }
    // 初始化时间
    $scope.start_time_picker = function () {
        $("#start_time_picker").daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                timePicker: true,
                timePicker24Hour: true,
                drops: "down",
                opens: "center",
                startDate: moment(),
                locale: {
                    applyLabel: "确定",
                    cancelLabel: "取消",
                    format: "YYYY-MM-DD HH:mm:ss"
                }
            },
            function (start, end, label) {
                console.log(start.unix());
                console.log(end.unix());
            }
        );
    };
    $scope.picker_search = function () {
        $("#picker_search").daterangepicker({
                showDropdowns: true,
                timePicker: true,
                timePicker24Hour: true,
                drops: "down",
                opens: "right",
                maxDate: $scope.searchTime.endDate,
                startDate: $scope.searchTime.startDate,
                endDate: $scope.searchTime.endDate,
                locale: {
                    applyLabel: "确定",
                    cancelLabel: "取消",
                    format: "YYYY-MM-DD HH:mm"
                }
            },
            function (start, end, label) {

                console.log(start.unix());
                console.log(end.unix());
            }
        );
    };
    // 漏洞来源
    $scope.get_loophole_source = function () {
        $http({
            method: "get",
            url: "/site/intelligence-sourse",
            params: {
                sourse: ''
            }
        }).then(
            function (data) {
                $scope.loop_source = [];
                $scope.loop_source_add = [];
                angular.forEach(data.data, function (item) {
                    $scope.loop_source.push(item.sourse);
                    $scope.loop_source_add.push(item.sourse);
                })
                $scope.loop_source.push('所有');
                $scope.loop_source_add.push('请选择');
            },
            function () {}
        );
    }

    $scope.get_page = function () {
        var data = {
            stime: '',
            etime: '',
            sourse: '',
            status: '',
            level: '',
            detail: '',
        }
        $http.get("/seting/loophole-intelligence-list", data).then(
            function success(data) {
                console.log(data);
                $scope.pages = data.data;
            },
            function err(data) {}
        );
    }
    $scope.add_loophole_inteligence = function () {
        $http({
            method: "post",
            url: "/seting/loophole-inteligence-add",
            data: {
                title: '',
                level: '',
                first_seen_time: '',
                sourse: '',
                detail: '',
                label_id: {
                    exist: [1, 2, 3, 4],
                    unexist: ['新标签']
                },
            }
        }).then(
            function (data) {
                console.log(data);

            },
            function () {}
        );
    }
    // 情报录入-弹窗
    $scope.add_loop_box = function (item) {
        $scope.alert_item = {
            title: '',
            level: '',
            first_seen_time: '',
            sourse: '请选择',
            detail: '',
            label_id: {
                exist: [],
                unexist: []
            },
            tag_list: [],
            tag_list_str: ''
        }
        var W = 828;
        var H = 532;
        zeroModal.show({
            title: "情报录入",
            content: alert_time,
            width: W + "px",
            height: H + "px",
            ok: false,
            cancel: false,
            okFn: function () {},
            onCleanup: function () {
                alert_time_box.appendChild(alert_time);
            }
        });
    };
    //   取消弹窗
    $scope.alert_time_cancel = function () {
        zeroModal.closeAll();
    };
    $scope.alert_sure = function () {

    };
    // 触发标签选择
    $scope.tag_focus = function () {
        $scope.tag_list_if = true;
    }
    $scope.tag_blur = function () {
        if ($scope.alert_item.tag_list_str == '') {
            return false;
        }
        $scope.alert_item.tag_list.push($scope.alert_item.tag_list_str);
        $scope.alert_item.tag_list_str = '';
    }
    // 获取标签列表
    $scope.get_tag_list = function () {
        var data = {
            label_name: ''
        }
        $http.get("/site/get-label", data).then(
            function success(data) {
                console.log(data);
                $scope.tag_list = data.data;
            },
            function err(data) {}
        );
    }
    // 选择标签
    $scope.tag_list_item = function (item) {
        $scope.alert_item.tag_list.push(item);
        $scope.tag_list_if = false;
    }

    $scope.init();

});
var myApp = angular.module("myApp", []);
myApp.controller("vehicleTelLoopholeCtrl", function($scope, $http, $filter) {

    $scope.init = function(){
        $scope.searchTime = {
            startDate: moment().subtract(90, "days"),
            endDate: moment()
        };

        $scope.seach_data = {
            source: '全部',
            status: '',
            label_id: '',
            key_word: '',
            level: '',
            startDate: moment().subtract(90, "days").unix(),
            endDate: moment().unix(),
        };

        //漏洞级别
        $scope.search_level = [{
                num: '',
                status: '全部'
            },
            {
                num: '高',
                status: '高'
            },
            {
                num: '中',
                status: '中'
            },
            {
                num: '低',
                status: '低'
            }];

        $scope.picker_search();
        $scope.start_time_picker();
        $scope.get_loophole_source();
        $scope.get_tag_list();
        $scope.get_page();
    }

    //初始化时间
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
                $scope.add_startDate = start.unix()
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
                $scope.seach_data.startDate = start.unix();
                $scope.seach_data.endDate = end.unix();
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
                $scope.loop_source.push('全部');
                $scope.loop_source_add.push('请选择');
            },
            function () {}
        );
    }
    // 获取标签列表
    $scope.get_tag_list = function (name) {
        $http({
            method: "get",
            url: "/site/get-label",
            params: {
                label_name: name,
            }
        }).then(function (data) {
                    console.log(data);
                    $scope.search_tag_list = [];
                    $scope.tag_list = data.data;
                    $scope.search_tag_list_str = JSON.stringify(data.data)
                    $scope.search_tag_list = JSON.parse($scope.search_tag_list_str);
                    $scope.search_tag_list.push({
                        id: '',
                        label_name: '请选择标签'
                    })
            },
            function () {}
        );
    }
    // 获取列表
    $scope.get_page = function (pageNow) {
        pageNow = pageNow ? pageNow : 1;
        var loading = zeroModal.loading(4);
        var params_data = {
            source: '',
            label_id: [],
            label_id_box: [],
            label_id_str: '',
        }
        if ($scope.seach_data.source != '全部') {
            params_data.source = $scope.seach_data.source
        }
        if ($scope.seach_data.label_id != '') {
            params_data.label_id.push($scope.seach_data.label_id * 1);
            params_data.label_id_box.push(params_data.label_id)
            params_data.label_id_str = JSON.stringify(params_data.label_id_box);
        } else {
            params_data.label_id_str = '[]'
        }
        $http({
            method: "get",
            url: "/vehicleintelligence/loophole-intelligence-list",
            params: {
                stime: $scope.seach_data.startDate,
                etime: $scope.seach_data.endDate,
                sourse: params_data.source,
                status: '1',
                level: $scope.seach_data.level,
                label_id: params_data.label_id_str,
                key_word: $scope.seach_data.key_word,
                page: pageNow,
                rows: 10,
            }
        }).then(
            function (data) {
                zeroModal.close(loading);
                $scope.pages = data.data;
            },
            function () {}
        );
    }

    $scope.init();
});

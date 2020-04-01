var myApp = angular.module("myApp", []);
myApp.controller("baseIntelCtrl", function ($scope, $http, $filter) {
    $scope.init = function () {
        $scope.searchTime = {
            startDate: '',
            endDate: ''
        };
        $scope.seach_data = {
            key_word: '',
            level: '',
            startDate: '',
            endDate: '',
        };
        $scope.search_level = [{
                num: '',
                status: '全部'
            },
            {
                num: '暂缺',
                status: '暂缺'
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
            }
        ];

        $scope.search_box_ul = {
            source: false,
            stauts: false,
            level: false,
        };

        $scope.page_num = 1;

        $scope.picker_search();
        $scope.get_page();
    }

    // 初始化时间
    $scope.picker_search = function () {
        $("#picker_search").daterangepicker({
                showDropdowns: true,
                timePicker: true,
                timePicker24Hour: true,
                drops: "down",
                opens: "right",
                autoUpdateInput: false,
                locale: {
                    applyLabel: "确定",
                    cancelLabel: "取消",
                    format: "YYYY-MM-DD HH:mm"
                }
            },
            function (start, end, label) {
                $("#picker_search").data('daterangepicker').autoUpdateInput = true
                $scope.seach_data.startDate = start.unix();
                $scope.seach_data.endDate = end.unix();
            }
        );
    };

    //基础情报详情
    $scope.list_item_click = function (e, item) {

        e.preventDefault();

        $scope.base_data = item;

        var W = 740;
        var H = 484;

        zeroModal.show({
            title: "",
            content: vehicle_loophole,
            width: W + "px",
            height: H + "px",
            ok: false,
            cancel: false,
            drag: false,
            okFn: function () {},
            onOpen: function () {},
            onCleanup: function () {
                vehicle_loophole_box.appendChild(vehicle_loophole);
            }
        });
    };

    //=---- 修改搜索框
    // 搜索框获取焦点
    $scope.search_focus = function (name) {
        switch (name) {
            case 'source':
                $scope.search_box_ul.source = true;
                break;
            case 'stauts':
                $scope.search_box_ul.stauts = true;
                break;
            case 'level':
                $scope.search_box_ul.level = true;
                break;
            default:
                break;
        }

    };
    // 搜索框失去焦点
    $scope.search_blur = function (name) {
        switch (name) {
            case 'source':
                $scope.search_box_ul.source = false;
                break;
            case 'stauts':
                $scope.search_box_ul.stauts = false;
                break;
            case 'level':
                $scope.search_box_ul.level = false;
                break;
            default:
                break;
        }

    };

    // 搜索栏选择
    $scope.search_choose_item = function (data, name) {
        switch (name) {
            case 'source':
                $scope.seach_data.source = data
                break;
            case 'stauts':
                $scope.seach_data.stauts = data
                break;
            case 'level':
                $scope.seach_data.level = data
                break;
            default:
                break;
        }
    }

    //搜索enter事件
    $scope.search_keyup = function ($event) {
        var keycode = window.event ? $event.keyCode : $event.which;
        if (keycode == 13) {
            $scope.get_page();
        }
    };

    ////////
    // 获取列表（基础情报列表）
    $scope.get_page = function (pageNow) {

        var loading = zeroModal.loading(4);

        if(pageNow < 1){
            pageNow = 1;
            $scope.page_num = 1;
        }

        if($scope.pages && pageNow > $scope.pages.maxPage){
            pageNow = 1;
            $scope.page_num = 1;
        }

        pageNow = pageNow ? pageNow : 1;
        // var loading = zeroModal.loading(4);
        var params_data = JSON.stringify($scope.seach_data);
        $scope.params_data = JSON.parse(params_data);

        if ($scope.params_data.level == '全部') {
            $scope.params_data.level = 'all';
        }else if($scope.params_data.level == '暂缺'){
            $scope.params_data.level = '';
        }

        //console.log($scope.params_data)
        $http({
            method: "get",
            url: "/seting/base-intelligence-list",
            params: {
                stime: $scope.params_data.startDate,
                etime: $scope.params_data.endDate,
                key_word: $scope.params_data.key_word,
                level: $scope.params_data.level,
                page: pageNow,
                rows: 10,
            }
        }).then(
            function (data) {
                zeroModal.close(loading);
                console.log(data);
                $scope.pages = data.data;
            },
            function () {}
        );
    }


    $scope.init();


    document.onclick = function (e) {
        if(e.target.className == 'zeromodal-overlay'){
            zeroModal.closeAll();
        }
    }

});

var myApp = angular.module("myApp", []);
myApp.controller("baseIntelCtrl", function ($scope, $http, $filter) {
    $scope.init = function () {
        $scope.searchTime = {
            startDate: '',
            endDate: ''
        };
        $scope.seach_data = {
            key_word: '',
            level: '全部',
            startDate: '',
            endDate: '',
        };
        $scope.search_level = [{
                num: '全部',
                status: '全部'
            },
            {
                num: '',
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
                autoUpdateInput: false,
                'locale': {
                    "format": 'YYYY/MM/DD',
                    "separator": " - ",
                    "applyLabel": "确定",
                    "cancelLabel": "清空",
                    "fromLabel": "起始时间",
                    "customRangeLabel": "自定义",
                    "toLabel": "结束时间'",
                    "weekLabel": "W",
                    "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
                    "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    "firstDay": 1
                },
                showDropdowns: true,
                "alwaysShowCalendars": true,
                timePickerSeconds: false,
                drops: "down",
                opens: "right",
                ranges: {
                    '最近7天': [moment().subtract(6, 'days'), moment()],
                    '最近30天': [moment().subtract(29, 'days'), moment()],
                    '今年': [moment().startOf('year'), moment()],
                    '去年': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year')
                        .endOf('year')
                    ],
                },
            },
            function (start, end, label) {
                $scope.seach_data.startDate = start.unix();
                $scope.seach_data.endDate = end.unix();
            },
        )
        $('#picker_search').on('apply.daterangepicker', function (ev, picker) {
            $(this).val(picker.startDate.format('YYYY/MM/DD') + ' - ' + picker.endDate.format('YYYY/MM/DD'));
            $scope.seach_data.startDate = picker.startDate.unix()
            $scope.seach_data.endDate = picker.endDate.unix()
        });
        $('#picker_search').on('cancel.daterangepicker', function (ev, picker) {
            $(this).val('');
            $scope.seach_data.startDate = ''
            $scope.seach_data.endDate = ''
        });
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
        console.log($scope.seach_data);
        var loading = zeroModal.loading(4);

        if (pageNow < 1) {
            pageNow = 1;
            $scope.page_num = 1;
        }

        if ($scope.pages && pageNow > $scope.pages.maxPage) {
            pageNow = 1;
            $scope.page_num = 1;
        }

        pageNow = pageNow ? pageNow : 1;
        // var loading = zeroModal.loading(4);
        var params_data = JSON.stringify($scope.seach_data);
        $scope.params_data = JSON.parse(params_data);

        let params_data_level = 'all';

        if ($scope.params_data.level == '全部') {
            params_data_level = 'all';
        } else if ($scope.params_data.level == '暂缺') {
            params_data_level = '';
        } else {
            params_data_level = $scope.params_data.level;
        }
        $http({
            method: "get",
            url: "/seting/base-intelligence-list",
            params: {
                stime: $scope.seach_data.startDate,
                etime: $scope.seach_data.endDate,
                key_word: $scope.params_data.key_word,
                level: params_data_level,
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
});
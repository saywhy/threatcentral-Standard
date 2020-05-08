var myApp = angular.module("myApp", []);

myApp.controller("vehicleAlertCtrl", function ($scope, $http, $filter) {



    $scope.init = function () {

        var params = {
            "all_loophole": {
                "each_level_count": {
                    "high": "1",
                    "medium": "0",
                    "low": "1"
                },
                "total_count": 2
            },
            "last_7day_loophole": {
                "each_level_count": {
                    "high": "0",
                    "medium": "0",
                    "low": "0"
                },
                "total_count": 0
            },
            "effect_asset": {
                "each_level_count": {
                    "high": "1",
                    "medium": 0,
                    "low": "1"
                },
                "total_count": 2
            }
        }

        /********************************/
        $scope.item_operation = "-1";

        $scope.searchTime = {
            startDate: '',
            endDate: ''
        };

        $scope.seach_data = {
            source: '',
            status: '',
            label_id: '',
            key_word: '',
            level: '',
            startDate: '',
            endDate: ''
        };

        //漏洞级别


        $scope.status_str = [{
                css: "success",
                label: "新预警"
            },
            {
                css: "danger",
                label: "处置中"
            },
            {
                css: "default",
                label: "已解决"
            },
            {
                css: "default",
                label: "已忽略"
            },
            {
                css: "default",
                label: "白名单"
            },
            {
                css: "default",
                label: "取消白"
            }
        ];


        $scope.pages = {
            count: 8,
            pageNow: 1,
            data: [{
                    "id": "1",
                    "affected": "222",
                    "name": "Hackmd < 1.3.0 xss 漏洞应急报告",
                    "group": "分组1",
                    "time": 1573440677,
                    "status": "0"
                },
                {
                    "id": "2",
                    "affected": "111",
                    "name": "Hackmd < 1.3.0 xss 漏洞应急报告",
                    "group": "分组1",
                    "time": 1573440677,
                    "status": "1"
                },
                {
                    "id": "3",
                    "affected": "222",
                    "name": "Hackmd < 1.3.0 xss 漏洞应急报告",
                    "group": "分组1",
                    "time": 1573440677,
                    "status": "0"
                },
                {
                    "id": "4",
                    "affected": "333",
                    "name": "Hackmd < 1.3.0 xss 漏洞应急报告",
                    "group": "分组1",
                    "time": 1573440677,
                    "status": "0"
                }
            ]
        }

        $scope.picker_search();
        $scope.start_time_picker();
        $scope.get_loophole_source();
        $scope.get_tag_list();

        $scope.echarts_bar(params);
        //$scope.get_page();
        $scope.loop_select()
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
                $scope.seach_data.startDate = start.unix();
                $scope.seach_data.endDate = end.unix();
                console.log($scope.seach_data.startDate);
                console.log($scope.seach_data.endDate);
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

    // 告警类型选择框
    $scope.loop_select = function (data) {
        //showField：设置下拉列表中显示文本的列
        //keyField：设置下拉列表项目中项目的KEY值，用于提交表单
        //data：数据源，可以是JSON数据格式，也可以是URL
        $('#loop_select').selectPage({
            showField: 'num',
            keyField: 'status',
            data: [{
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
            ],
            //仅选择模式，不允许输入查询关键字
            selectOnly: true,
            listSize: 5,
            pagination: false,
            // dropButton: false,
            multiple: false
        });
        console.log(11212);
    }


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

    // 操作预警已解决
    $scope.update_alert = function (item, status) {
        $scope.item_operation = "-1";
        $scope.item_update = true;
        var dataJson = {
            id: [item.id],
            status: status
        };
        /*$http.put("/alert/do-alarm", dataJson).then(
            function success(rsp) {
                if (rsp.data.status == "success") {
                    $scope.getPage($scope.postData.page);
                }
            },
            function err(rsp) {}
        );*/
    };

    // 点击显示操作
    $scope.operation_click = function (index) {
        $scope.item_operation = index;
    };

    $scope.detail = function (item) {
        window.location.href = "/vehiclealert/detail?id=" + item.id;
    };

    //  环形图表
    $scope.echarts_bar = function (params) {

        //  受影响车辆资产;
        var loop_total_data = [];
        if (params.all_loophole.each_level_count.high != "0") {
            loop_total_data.push({
                name: "高危",
                value: params.all_loophole.each_level_count.high,
                itemStyle: {
                    normal: {
                        color: "#FF5F5C"
                    }
                }
            });
        }
        if (params.all_loophole.each_level_count.medium != "0") {
            loop_total_data.push({
                name: "中危",
                value: params.all_loophole.each_level_count.medium,
                itemStyle: {
                    normal: {
                        color: "#FEAA00"
                    }
                }
            });
        }
        if (params.all_loophole.each_level_count.low != "0") {
            loop_total_data.push({
                name: "低危",
                value: params.all_loophole.each_level_count.low,
                itemStyle: {
                    normal: {
                        color: "#7ACE4C"
                    }
                }
            });
        }

        var loop_total_myChart = echarts.init(
            document.getElementById("vehicle1")
        );

        var loop_total_option = {
            grid: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            },
            graphic: {
                type: "text",
                left: "center",
                top: "center",
                style: {
                    text: params.all_loophole.total_count, //使用“+”可以使每行文字居中
                    textAlign: "center",
                    font: "bolder 24px 'Microsoft YaHei'",
                    fill: "#bbb",
                    width: 30,
                    height: 30
                }
            },
            series: [{
                type: "pie",
                radius: [30, 55],
                legendHoverLin: false, //是否启用图例 hover 时的联动高亮。
                hoverAnimation: false, //是否开启 hover 在扇区上的放大动画效果。
                avoidLabelOverlap: true, //是否启用防止标签重叠策略
                center: ["50%", "50%"],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: function (params) {
                                var str = "";
                                switch (params.data.name) {
                                    case "高危":
                                        str =
                                            `{rate|` +
                                            params.data.value +
                                            `}` +
                                            "\n" +
                                            `{nameStyle|高危}`;
                                        break;
                                    case "中危":
                                        str =
                                            `{rate|` +
                                            params.data.value +
                                            `}` +
                                            "\n" +
                                            `{nameStyle|中危}`;
                                        break;
                                    case "低危":
                                        str =
                                            `{rate|` +
                                            params.data.value +
                                            `}` +
                                            "\n" +
                                            `{nameStyle|低危}`;
                                        break;
                                }
                                return str;
                            },
                            textStyle: {
                                rich: {
                                    nameStyle: {
                                        fontSize: 12,
                                        color: "#999",
                                        align: "center"
                                    },
                                    rate: {
                                        fontSize: 18,
                                        align: "center"
                                    }
                                }
                            }
                        },
                        labelLine: {
                            show: true,
                            length: 6,
                            length2: 12,
                            lineStyle: {
                                color: "#bbb"
                            }
                        }
                    },
                    emphasis: {
                        label: {}
                    }
                },
                roseType: false,
                data: loop_total_data
            }]
        };
        loop_total_myChart.setOption(loop_total_option);


        /////////////

        // 受影响零配件资产;
        var loop_total_data = [];
        if (params.all_loophole.each_level_count.high != "0") {
            loop_total_data.push({
                name: "高危",
                value: params.all_loophole.each_level_count.high,
                itemStyle: {
                    normal: {
                        color: "#FF5F5C"
                    }
                }
            });
        }
        if (params.all_loophole.each_level_count.medium != "0") {
            loop_total_data.push({
                name: "中危",
                value: params.all_loophole.each_level_count.medium,
                itemStyle: {
                    normal: {
                        color: "#FEAA00"
                    }
                }
            });
        }
        if (params.all_loophole.each_level_count.low != "0") {
            loop_total_data.push({
                name: "低危",
                value: params.all_loophole.each_level_count.low,
                itemStyle: {
                    normal: {
                        color: "#7ACE4C"
                    }
                }
            });
        }

        var loop_total_myChart = echarts.init(
            document.getElementById("vehicle2")
        );

        var loop_total_option = {
            grid: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            },
            graphic: {
                type: "text",
                left: "center",
                top: "center",
                style: {
                    text: params.all_loophole.total_count, //使用“+”可以使每行文字居中
                    textAlign: "center",
                    font: "bolder 24px 'Microsoft YaHei'",
                    fill: "#bbb",
                    width: 30,
                    height: 30
                }
            },
            series: [{
                type: "pie",
                radius: [30, 55],
                legendHoverLin: false, //是否启用图例 hover 时的联动高亮。
                hoverAnimation: false, //是否开启 hover 在扇区上的放大动画效果。
                avoidLabelOverlap: true, //是否启用防止标签重叠策略
                center: ["50%", "50%"],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: function (params) {
                                var str = "";
                                switch (params.data.name) {
                                    case "高危":
                                        str =
                                            `{rate|` +
                                            params.data.value +
                                            `}` +
                                            "\n" +
                                            `{nameStyle|高危}`;
                                        break;
                                    case "中危":
                                        str =
                                            `{rate|` +
                                            params.data.value +
                                            `}` +
                                            "\n" +
                                            `{nameStyle|中危}`;
                                        break;
                                    case "低危":
                                        str =
                                            `{rate|` +
                                            params.data.value +
                                            `}` +
                                            "\n" +
                                            `{nameStyle|低危}`;
                                        break;
                                }
                                return str;
                            },
                            textStyle: {
                                rich: {
                                    nameStyle: {
                                        fontSize: 12,
                                        color: "#999",
                                        align: "center"
                                    },
                                    rate: {
                                        fontSize: 18,
                                        align: "center"
                                    }
                                }
                            }
                        },
                        labelLine: {
                            show: true,
                            length: 6,
                            length2: 12,
                            lineStyle: {
                                color: "#bbb"
                            }
                        }
                    },
                    emphasis: {
                        label: {}
                    }
                },
                roseType: false,
                data: loop_total_data
            }]
        };
        loop_total_myChart.setOption(loop_total_option);

    };

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
                status: '0',
                level: $('#loop_select').selectPageText(),
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
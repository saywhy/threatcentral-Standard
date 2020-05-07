var myApp = angular.module("myApp", ["ngSanitize"]);
myApp.controller("myCtrl", function ($scope, $http, $filter, $sce) {
    $scope.IDList = [];
    $scope.ItemList = {};
    $scope.init = function () {
        $scope.select_client_ip_if = false;
        $scope.select_indicator_if = false;
        $scope.select_device_ip_if = false;
        $scope.pages = {
            data: [],
            count: 0,
            maxPage: "...",
            pageNow: 1
        };
        $scope.searchData = {
            client_ip: "",
            category: "",
            indicator: "",
            company: "",
            page: 1,
            rows: 10
        };
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

        $scope.check_alert_num = -1;
        // $scope.category_select = [{
        //     num: "",
        //     type: "请选择预警类型"
        // }];
        $scope.category_select = [];
        $scope.company_select = [];
        $scope.select_choose = "1";
        $scope.select_status = [{
                num: "1",
                type: "处置中"
            },
            {
                num: "2",
                type: "已解决"
            },
            {
                num: "3",
                type: "已忽略"
            }
        ];

        $scope.postData = {
            client_ip: "",
            category: "",
            indicator: "",
            company: "",
            page: 1,
            rows: 10
        };
        $scope.location_index = "";
        $scope.item_operation = "-1";
        $scope.choose_all = true;
        $scope.choose_count_array = [];
        $scope.disabled_select = true;
        $scope.alert_trend();
        $scope.search();
        // 获取受影响资产列表;
        $scope.get_client_ip_list();
        // 获取预警类型列表;
        $scope.get_select_category();
        $scope.get_select_indicator();
        $scope.get_select_company();
        $scope.enter();
        setTimeout(() => {}, 100);

    };
    $scope.category_input = function (data) {
        console.log(data);
        //showField：设置下拉列表中显示文本的列
        //keyField：设置下拉列表项目中项目的KEY值，用于提交表单
        //data：数据源，可以是JSON数据格式，也可以是URL
        $('#category_select').selectPage({
            showField: 'num',
            keyField: 'index',
            data: data,
            //仅选择模式，不允许输入查询关键字
            selectOnly: true,
            listSize: 5,
            pagination: false,
            dropButton: false,
            multiple: false
        });
        console.log(11212);

        //获得选中项目的文本内容
        $('#func1').click(function () {
            alert($('#selectPage').selectPageText());
        });
        //清除所有选中的项目
        $('#func2').click(function () {
            $('#selectPage').selectPageClear();
        });
        //动态修改选中项目
        $('#func3').click(function () {
            $('#selectPage').val('20');
            $('#selectPage').selectPageRefresh();
        });
        //设置插件禁用 / 启用
        $('#funcDisabled').click(function () {
            if ($('#selectPage').selectPageDisabled()) //判断当前状态
                $('#selectPage').selectPageDisabled(false);
            else
                $('#selectPage').selectPageDisabled(true);
        });


    }
    $scope.company_input = function (data) {
        console.log(data);
        //showField：设置下拉列表中显示文本的列
        //keyField：设置下拉列表项目中项目的KEY值，用于提交表单
        //data：数据源，可以是JSON数据格式，也可以是URL
        $('#company_input').selectPage({
            showField: 'num',
            keyField: 'index',
            data: data,
            //仅选择模式，不允许输入查询关键字
            selectOnly: true,
            listSize: 5,
            pagination: false,
            dropButton: false,
            multiple: false
        });
        console.log(11212);

        //获得选中项目的文本内容
        $('#func1').click(function () {
            alert($('#selectPage').selectPageText());
        });
        //清除所有选中的项目
        $('#func2').click(function () {
            $('#selectPage').selectPageClear();
        });
        //动态修改选中项目
        $('#func3').click(function () {
            $('#selectPage').val('20');
            $('#selectPage').selectPageRefresh();
        });
        //设置插件禁用 / 启用
        $('#funcDisabled').click(function () {
            if ($('#selectPage').selectPageDisabled()) //判断当前状态
                $('#selectPage').selectPageDisabled(false);
            else
                $('#selectPage').selectPageDisabled(true);
        });


    }
    $scope.enter = function () {
        document.onkeydown = function (e) {
            // 兼容FF和IE和Opera
            var theEvent = e || window.event;
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            if (code == 13) {
                //回车执行查询
                $scope.$apply(function () {
                    $scope.search();
                });
            }
        };
    };
    $scope.alert_trend = function () {
        $http.get("/alert/alert-trend").then(
            function success(rsp) {
                $scope.alarmEchart(rsp.data.data);
            },
            function err(rsp) {}
        );
    };
    //   获取受影响资产列表
    $scope.get_client_ip_list = function (ip) {
        $http({
            method: "get",
            url: "/alert/select-client-ip",
            params: {
                client_ip: $scope.searchData.client_ip
            }
        }).then(
            function (data) {
                if (data.data.status == "success") {
                    $scope.select_client_ip = data.data.data;
                }
            },
            function () {}
        );
    };
    //   获取预警类型列表
    $scope.get_select_category = function () {
        $http({
            method: "get",
            url: "/alert/select-category"
        }).then(
            function (data) {
                if (data.data.status == "success") {
                    angular.forEach(data.data.data, function (item, index) {
                        var obj_category = {};
                        obj_category.index = index;
                        obj_category.num = item.category;
                        obj_category.type = item.category;
                        $scope.category_select.push(obj_category);
                    });
                    console.log($scope.category_select);
                    $scope.category_input($scope.category_select);
                }
            },
            function () {}
        );
    };
    //获取威胁指标列表;
    $scope.get_select_indicator = function (ip) {
        $http({
            method: "get",
            url: "/alert/select-indicator",
            params: {
                indicator: $scope.searchData.indicator
            }
        }).then(
            function (data) {
                if (data.data.status == "success") {
                    $scope.select_indicator = data.data.data;
                }
            },
            function () {}
        );
    };
    //获取分组列表;
    $scope.get_select_company = function () {
        $http({
            method: "get",
            url: "/alert/select-company"
        }).then(
            function (data) {
                if (data.data.status == "success") {
                    angular.forEach(data.data.data, function (item, index) {
                        if (item.company != null && item.company != "") {
                            var obj_company = {};
                            obj_company.index = index;
                            obj_company.num = item.company;
                            obj_company.type = item.company;
                            $scope.company_select.push(obj_company);
                        }
                    });
                    $scope.company_input($scope.company_select);
                }
            },
            function () {}
        );
    };

    $scope.get_client_ip_focus = function () {
        $scope.select_client_ip_if = true;
        $scope.select_indicator_if = false;
    };
    $scope.select_client_ip_item = function (item) {
        $scope.searchData.client_ip = item;
        $scope.select_client_ip_if = false;
    };
    $scope.myKeyup_client_ip = function (ip) {
        $scope.get_client_ip_list();
    };
    //威胁指标搜索;
    $scope.get_indicator_focus = function () {
        $scope.select_indicator_if = true;
        $scope.select_client_ip_if = false;
    };

    $scope.select_indicator_item = function (item) {
        $scope.searchData.indicator = item;
        $scope.select_indicator_if = false;
    };
    $scope.get_indicator_blur = function () {
        $scope.select_indicator_if = false;
    }
    $scope.myKeyup_indicator = function (ip) {
        $scope.get_select_indicator();
    };

    $scope.blur_input = function (ip) {
        $scope.select_indicator_if = false;
        $scope.select_client_ip_if = false;
    };

    $scope.search = function () {
        $scope.select_client_ip_if = false;
        $scope.select_indicator_if = false;
        $scope.postData = {
            client_ip: $scope.searchData.client_ip,
            category: $scope.searchData.category,
            indicator: $scope.searchData.indicator,
            company: $scope.searchData.company,
            page: 1,
            rows: 10
        };
        $scope.getPage();
    };
    // 威胁预警列表
    $scope.getPage = function (pageNow) {
        $scope.item_operation = "-1";
        $scope.choose_count_array = [];
        $scope.choose_all = true;
        $scope.disabled_select = true;
        $scope.select_indicator_if = false;
        $scope.select_client_ip_if = false;
        pageNow = pageNow ? pageNow : 1;
        $scope.pageGeting = true;
        $scope.postData.page = pageNow;
        $http({
            method: "get",
            url: "/alert/page",
            params: $scope.postData
        }).then(
            function (data) {
                $scope.pages = data.data;
                angular.forEach($scope.pages.data, function (item) {
                    item.choose_status = true;
                });
                console.log($scope.pages);
            },
            function () {}
        );
    };
    setInterval(function () {
        $scope.check_alert();
    }, 2000);

    //   检测最新情报
    $scope.check_alert = function () {
        $http({
            method: "get",
            url: "/alert/check-alert"
        }).then(
            function (data) {
                console.log(data.data.data);
                if (parseInt(data.data.data) > $scope.check_alert_num) {
                    $scope.check_alert_num = parseInt(data.data.data);
                    $scope.getPage();
                }
            },
            function () {}
        );
    };

    $scope.setPage = function (data) {
        $scope.pages = data;
        // sessionStorage.setItem("alertPage", $scope.pages.pageNow);
    };

    // 点击显示操作
    $scope.operation_click = function (index) {
        $scope.item_operation = index;
    };
    //   操作预警已解决
    $scope.update_alert = function (item, status) {
        $scope.item_operation = "-1";
        $scope.item_update = true;
        var dataJson = {
            id: [item.id],
            status: status
        };
        $http.put("/alert/do-alarm", dataJson).then(
            function success(rsp) {
                if (rsp.data.status == "success") {
                    $scope.getPage($scope.postData.page);
                }
            },
            function err(rsp) {}
        );
    };
    //   批量处理
    $scope.batch_updata = function () {
        $scope.data_array = [];
        angular.forEach($scope.choose_count_array, function (item) {
            if (item.status != "2" && item.status != "3" && item.status != "4") {
                $scope.data_array.push(item.id);
            }
        });
        var dataJson = {
            id: $scope.data_array,
            status: $scope.select_choose
        };
        $http.put("/alert/do-alarm", dataJson).then(
            function success(rsp) {
                if (rsp.data.status == "success") {
                    $scope.getPage($scope.postData.page);
                }
            },
            function err(rsp) {}
        );
    };
    //   单选
    $scope.choose_click = function (index_data) {
        $scope.choose_count_array = [];
        $scope.for_status = [];
        angular.forEach($scope.pages.data, function (item, index) {
            if (index_data == index) {
                item.choose_status = !item.choose_status;
            }
            if (
                !item.choose_status &&
                item.status != "2" &&
                item.status != "3" &&
                item.status != "4"
            ) {
                $scope.choose_count_array.push(item);
            }
            //   未全选
            if (item.choose_status) {
                $scope.choose_all = true;
            }
            if (item.status != "2" && item.status != "3" && item.status != "4") {
                $scope.for_status.push(item);
            }
        });
        if ($scope.choose_count_array.length == $scope.for_status.length) {
            $scope.choose_all = false;
            $scope.disabled_select = false;
        }
        if ($scope.choose_count_array.length == 0) {
            $scope.disabled_select = true;
        } else {
            $scope.disabled_select = false;
        }
    };
    //   全选
    $scope.choose_click_all = function (status) {
        $scope.choose_count_array = [];
        if (status == "false") {
            $scope.choose_all = false;
            $scope.disabled_select = false;
            angular.forEach($scope.pages.data, function (item, index) {
                item.choose_status = false;
                if (item.status != "2" && item.status != "3" && item.status != "4") {
                    $scope.choose_count_array.push(item);
                }
            });
        } else {
            $scope.choose_all = true;
            $scope.disabled_select = true;
            $scope.choose_count_array = [];
            angular.forEach($scope.pages.data, function (item, index) {
                item.choose_status = true;
            });
        }
    };
    //   取消按钮
    $scope.cel = function () {
        $scope.disabled_select = true;
        $scope.choose_all = true;
        $scope.choose_count_array = [];
        angular.forEach($scope.pages.data, function (item, index) {
            item.choose_status = true;
        });
    };

    $scope.detail = function (item) {
        window.location.href = "/alert/detail?id=" + item.id;
    };

    $scope.showLength = function (str, length) {
        if (!length) {
            length = 60;
        }
        return str.substr(0, length) + "...";
    };

    $scope.download = function () {
        var url =
            "/alert/download-csv?client_ip=" +
            $scope.searchData.client_ip +
            "&category=" +
            $scope.searchData.category +
            "&indicator=" +
            $scope.searchData.indicator +
            "&company=" +
            $scope.searchData.company;
        window.location.href = url;
    };

    $scope.pageGeting = false;

    // 折线图表
    $scope.alarmEchart = function (item) {
        $scope.times_array = [];
        $scope.count_array = [];
        angular.forEach(item, function (i) {
            $scope.times_array.unshift(i.hours);
            $scope.count_array.unshift(i.count);
        });
        var myChart = echarts.init(document.getElementById("alarm_echart"));
        var option = {
            grid: {
                bottom: 80,
                top: 50,
                left: 50,
                right: 50
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    lineStyle: {
                        color: "#ddd"
                    }
                },
                backgroundColor: "rgba(255,255,255,1)",
                padding: [5, 10],
                textStyle: {
                    color: "#0070FF"
                },
                extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)"
            },
            dataZoom: [{
                    show: true,
                    realtime: true,
                    start: 80, //   startValue: 10, //数据窗口范围的起始数值
                    end: 100, //   endValue: 100, //数据窗口范围的结束数值。
                    dataBackground: {
                        //数据阴影的样式。
                        lineStyle: {
                            color: "#0070FF"
                        }, //阴影的线条样式
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [{
                                        offset: 0,
                                        color: "#0070FF"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(0,112,255,.16)"
                                    }
                                ],
                                false
                            )
                        } //阴影的填充样式
                    },
                    fillerColor: "rgba(0,112,255,.16)",
                    borderColor: "#A1CAFF"
                },
                {
                    type: "inside",
                    realtime: true,
                    start: 80,
                    end: 100
                }
            ],
            xAxis: [{
                type: "category",
                boundaryGap: false,
                axisLine: {
                    onZero: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#ECECEC",
                        type: "dashed"
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#ECECEC",
                            type: "dashed"
                        }
                    }
                },
                data: $scope.times_array.map(function (str) {
                    return str.replace(" ", "\n");
                }),
                axisTick: {
                    show: false
                }
            }],
            yAxis: [{
                name: "",
                type: "value",
                minInterval: 1,
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#ECECEC",
                        type: "dashed"
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "#ECECEC",
                        type: "dashed"
                    }
                },
                axisLabel: {
                    margin: 5,
                    textStyle: {
                        color: "#666",
                        fontSize: 12
                    }
                }
            }],
            series: [{
                name: "预警",
                type: "line",
                smooth: true,
                showSymbol: false,
                symbol: "circle",
                symbolSize: 3,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [{
                                    offset: 0,
                                    color: "#0070FF"
                                },
                                {
                                    offset: 1,
                                    color: "rgba(0,112,255,.16)"
                                }
                            ],
                            false
                        )
                    }
                },
                animation: true,
                lineStyle: {
                    normal: {
                        width: 2,
                        color: "#0070FF"
                    },
                    itemStyle: {
                        color: "#0070FF"
                    }
                },
                data: $scope.count_array
            }]
        };
        myChart.setOption(option);
        myChart.on("datazoom", function (params) {
            var opt = myChart.getOption();
            var dz = opt.dataZoom[0];
            var s = opt.xAxis[0].data[dz.startValue];
            var e = opt.xAxis[0].data[dz.endValue];
        });
    };
    $scope.click_clientip = function () {};
    $scope.choose_click_td = function () {};
    $scope.init();
});
var rootScope;
var myApp = angular.module("myApp", []);
myApp.controller("myApi", function ($scope, $rootScope, $http, $filter) {
    $scope.init = function () {
        $scope.set_true = true;

        $scope.outTime = {
            startDate: '',
            endDate: ''
        };
        $scope.choosetime = {
            startDate: ''
        };
        $scope.picker_add();
        $scope.get_api_list(1);
    };

    $scope.picker_add = function () {
        $("#picker_add").daterangepicker({
                autoUpdateInput: false,
                'locale': {
                    "format": 'YYYY/MM/DD',
                    "separator": " - ",
                    "applyLabel": "确定",
                    "cancelLabel": "清空",
                    "fromLabel": "起始时间",
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
            },
            function (start, end, label) {
                $scope.outTime.startDate = start.unix();
                $scope.outTime.endDate = end.unix();
                console.log($scope.outTime.startDate);
                console.log($scope.outTime.endDate);
            },
        )
        $('#picker_add').on('apply.daterangepicker', function (ev, picker) {
            $(this).val(picker.startDate.format('YYYY/MM/DD') + ' - ' + picker.endDate.format('YYYY/MM/DD'));
            $scope.outTime.startDate = picker.startDate.unix()
            $scope.outTime.endDate = picker.endDate.unix()
        });
        $('#picker_add').on('cancel.daterangepicker', function (ev, picker) {
            $(this).val('');
            $scope.outTime.startDate = ''
            $scope.outTime.endDate = ''
        });
    };
    $scope.picker_edit = function () {
        $("#picker_edit").daterangepicker({
                'locale': {
                    "format": 'YYYY/MM/DD',
                    "separator": " - ",
                    "applyLabel": "确定",
                    "cancelLabel": "清空",
                    "fromLabel": "起始时间",
                    "toLabel": "结束时间'",
                    "weekLabel": "W",
                    "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
                    "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    "firstDay": 1
                },
                startDate: moment(new Date($scope.edit_token_item.start_time * 1000)),
                endDate: moment(new Date($scope.edit_token_item.end_time * 1000)),
                showDropdowns: true,
                "alwaysShowCalendars": true,
                timePickerSeconds: false,
                drops: "down",
                opens: "right",
            },
            function (start, end, label) {
                $scope.edit_token_item.start_time = start.unix();
                $scope.edit_token_item.end_time = end.unix();
            },
        )
        $('#picker_edit').on('apply.daterangepicker', function (ev, picker) {
            $(this).val(picker.startDate.format('YYYY/MM/DD') + ' - ' + picker.endDate.format('YYYY/MM/DD'));
            $scope.edit_token_item.start_time = picker.startDate.unix()
            $scope.edit_token_item.end_time = picker.endDate.unix()
        });
        $('#picker_edit').on('cancel.daterangepicker', function (ev, picker) {
            $(this).val('');
            $scope.edit_token_item.start_time = ''
            $scope.edit_token_item.end_time = ''
        });
    };
    $scope.net_choose = function (name) {
        if (name == "open") {
            $scope.set_true = true;
            var loading = zeroModal.loading(4);
            $http({
                method: "put",
                url: "/api/cert-verify",
                data: {
                    SSL: "2"
                }
            }).then(
                function successCallback(data) {
                    zeroModal.close(loading);
                    console.log(data);
                    if (data.data.status == "success") {
                        zeroModal.success("开启证书验证成功");
                        $scope.get_api_list($scope.page_local);
                    }
                    if (data.data.status == "fail") {
                        zeroModal.error(data.data.errorMessage);
                    }
                },
                function errorCallback(data) {}
            );
        }
        if (name == "closed") {
            $scope.set_true = false;
            var loading = zeroModal.loading(4);
            $http({
                method: "put",
                url: "/api/cert-verify",
                data: {
                    SSL: "0"
                }
            }).then(
                function successCallback(data) {
                    zeroModal.close(loading);
                    console.log(data);
                    if (data.data.status == "success") {
                        zeroModal.success("关闭证书验证成功");
                        $scope.get_api_list($scope.page_local);
                    }
                    if (data.data.status == "fail") {
                        zeroModal.error(data.data.errorMessage);
                    }
                },
                function errorCallback(data) {}
            );
        }
    };
    //   打开生成token弹窗
    $scope.token_add = function () {
        $scope.add_token_data = {
            institution: "",
            search_count: ''
        };
        $('#picker_add').val('');
        $scope.outTime.startDate = ''
        $scope.outTime.endDate = ''
        var W = 552;
        var H = 445;
        zeroModal.show({
            title: "生成TOKEN",
            content: token,
            width: W + "px",
            height: H + "px",
            ok: false,
            cancel: false,
            okFn: function () {},
            onCleanup: function () {
                token_box.appendChild(token);
            }
        });
    };
    // 获取列表
    $scope.get_api_list = function (page) {
        page = page ? page : 1;
        $scope.page_local = page;
        var loading = zeroModal.loading(4);
        $http({
            method: "get",
            url: "/api/list",
            params: {
                page: page,
                rows: 10
            }
        }).then(
            function successCallback(data) {
                zeroModal.close(loading);
                console.log(data);
                if (data.data.status == "success") {
                    $scope.api_list = data.data;
                    if ($scope.api_list.SSL == "2") {
                        $scope.set_true = true;
                    }
                    if ($scope.api_list.SSL == "0") {
                        $scope.set_true = false;
                    }
                    angular.forEach($scope.api_list.data, function (item) {
                        if (item.status == "1") {
                            item.choose = true;
                        } else {
                            item.choose = false;
                        }
                    });
                }
            },
            function errorCallback(data) {}
        );
    };
    //   搜索列表
    $scope.token_search = function (page) {
        page = page ? page : 1;
        $scope.page_local = page;
        var loading = zeroModal.loading(4);
        $http({
            method: "get",
            url: "/api/list",
            params: {
                page: page,
                rows: 10,
                institution: $scope.token_institution
            }
        }).then(
            function successCallback(data) {
                zeroModal.close(loading);
                console.log(data);
                if (data.data.status == "success") {
                    $scope.api_list = data.data;
                    angular.forEach($scope.api_list.data, function (item) {
                        if (item.status == "1") {
                            item.choose = true;
                        } else {
                            item.choose = false;
                        }
                    });
                }
            },
            function errorCallback(data) {}
        );
    };

    //生成token
    $scope.token_save = function () {
        if ($scope.add_token_data.institution == '') {
            zeroModal.error("请输入分支结构名称");
            return false;
        }
        $scope.add_token_data.start_time = $scope.outTime.startDate;
        $scope.add_token_data.end_time = $scope.outTime.endDate;
        console.log($scope.outTime);
        if ($scope.add_token_data.start_time == '' || $scope.add_token_data.end_time == '') {
            zeroModal.error("请选择生效时间");
            return false;
        }
        if ($scope.add_token_data.search_count != '' &&
            $scope.add_token_data.search_count != null &&
            $scope.add_token_data.search_count != undefined &&
            $scope.add_token_data.search_count < 1) {
            zeroModal.error("查询次数不能为负数和0");
            return false;
        }
        if ($scope.add_token_data.search_count == null || $scope.add_token_data.search_count == undefined) {
            $scope.add_token_data.search_count = ''
        }
        console.log($scope.add_token_data.search_count);
        var loading = zeroModal.loading(4);
        $http({
            method: "put",
            url: "/api/create-token",
            data: {
                institution: $scope.add_token_data.institution,
                start_time: $scope.add_token_data.start_time,
                end_time: $scope.add_token_data.end_time,
                search_count: $scope.add_token_data.search_count
            }
        }).then(
            function successCallback(data) {
                zeroModal.close(loading);
                console.log(data);
                if (data.data.status == "success") {
                    zeroModal.success("生成TOKEN成功");
                    $scope.get_api_list(1);
                    zeroModal.closeAll();
                }
                if (data.data.status == "fail") {
                    zeroModal.error(data.data.errorMessage);
                }
            },
            function errorCallback(data) {}
        );
    };
    //  关闭生成token弹窗
    $scope.token_cancel = function () {
        zeroModal.closeAll();
    };
    //   禁用启用token
    $scope.choose_open = function (item) {
        if (item.choose) {
            $scope.status_token = "0";
        } else {
            $scope.status_token = "1";
        }
        var loading = zeroModal.loading(4);
        $http({
            method: "put",
            url: "/api/forbide-token",
            data: {
                institution: item.institution,
                id: item.id,
                status: $scope.status_token
            }
        }).then(
            function successCallback(data) {
                zeroModal.close(loading);
                console.log(data);
                if (data.data.status == "success") {
                    $scope.get_api_list($scope.page_local);
                }
            },
            function errorCallback(data) {}
        );
    };
    //   刷新token
    $scope.update_token = function (item) {
        var loading = zeroModal.loading(4);
        $http({
            method: "put",
            url: "/api/create-token",
            data: {
                institution: item.institution,
                id: item.id
            }
        }).then(
            function successCallback(data) {
                zeroModal.close(loading);
                console.log(data);
                if (data.data.status == "success") {
                    zeroModal.success("刷新TOKEN成功");
                    $scope.get_api_list($scope.page_local);
                }
                if (data.data.status == "fail") {
                    zeroModal.error(data.data.errorMessage);
                }
            },
            function errorCallback(data) {}
        );
    };
    //   编辑token弹窗
    $scope.edit_token = function (item) {
        $scope.edit_token_data = JSON.stringify(item);
        $scope.edit_token_item = JSON.parse($scope.edit_token_data);
        $scope.edit_token_item.rest_count = $scope.edit_token_item.rest_count - 0;
        if ($scope.edit_token_item.rest_count === 0) {
            $scope.edit_token_item.rest_count = ''
        }
        console.log($scope.edit_token_item);
        var W = 552;
        var H = 445;
        zeroModal.show({
            title: "编辑TOKEN",
            content: edit_token,
            width: W + "px",
            height: H + "px",
            ok: false,
            cancel: false,
            okFn: function () {},
            onCleanup: function () {
                edit_token_box.appendChild(edit_token);
            }
        });
        console.log(moment(new Date($scope.edit_token_item.start_time * 1000)));
        $scope.picker_edit()
    };
    $scope.edit_token_save = function () {
        if ($scope.edit_token_item.start_time == '' || $scope.edit_token_item.end_time == '') {
            zeroModal.error("请选择生效时间");
            return false;
        }
        if ($scope.edit_token_item.rest_count === 0) {
            zeroModal.error("查询次数不能为负数和0");
            return false;
        }
        if ($scope.edit_token_item.rest_count != '' &&
            $scope.edit_token_item.rest_count != null &&
            $scope.edit_token_item.rest_count != undefined &&
            $scope.edit_token_item.rest_count < 1) {
            zeroModal.error("查询次数不能为负数和0");
            return false;
        }
        if ($scope.edit_token_item.rest_count == null || $scope.edit_token_item.rest_count == undefined) {
            $scope.edit_token_item.rest_count = ''
        }
        console.log($scope.edit_outTime);
        var loading = zeroModal.loading(4);
        $http({
            method: "put",
            url: "/api/edit-api",
            data: {
                id: $scope.edit_token_item.id,
                start_time: $scope.edit_token_item.start_time,
                end_time: $scope.edit_token_item.start_time,
                rest_count: $scope.edit_token_item.rest_count
            }
        }).then(
            function successCallback(data) {
                zeroModal.close(loading);
                console.log(data);
                if (data.data.status == "success") {
                    zeroModal.success("修改TOKEN成功");
                    $scope.get_api_list($scope.page_local);
                    zeroModal.closeAll();
                }
                if (data.data.status == "fail") {
                    zeroModal.error(data.data.errorMessage);
                }
            },
            function errorCallback(data) {}
        );
    };
    $scope.edit_token_cancel = function () {
        zeroModal.closeAll();
    };
    //   删除token
    $scope.cel_tolen = function (item) {
        var loading = zeroModal.loading(4);
        $http({
            method: "delete",
            url: "/api/del-token",
            data: {
                institution: item.institution,
                id: item.id
            }
        }).then(
            function successCallback(data) {
                zeroModal.close(loading);
                console.log(data);
                if (data.data.status == "success") {
                    zeroModal.success("删除TOKEN成功");
                    $scope.get_api_list($scope.page_local);
                }
                if (data.data.status == "fail") {
                    zeroModal.error(data.data.errorMessage);
                }
            },
            function errorCallback(data) {}
        );
    };
    //   下载证书
    $scope.download = function () {
        var loading = zeroModal.loading(4);
        $http({
            method: "get",
            url: "/api/download-cert",
            responseType: "blob"
        }).then(
            function successCallback(data) {
                zeroModal.close(loading);
                var elink = document.createElement("a");
                elink.download = "证书.zip";
                elink.style.display = "none";
                var blob = new Blob([data.data], {
                    type: "application/vnd.ms-excel"
                });
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                document.body.removeChild(elink);
            },
            function errorCallback(data) {}
        );
    };
    // 复制token
    $scope.copy_token = function (token) {
        var input = document.getElementById(token);
        input.value = token; // 修改文本框的内容
        input.select(); // 选中文本
        document.execCommand("Copy"); // 执行浏览器复制命令
    };
    //证书验证
    $scope.cert_verify = function () {};
    $scope.init();
});
var myApp = angular.module("myApp", []);
myApp.controller("specialIntelCtrl", function ($scope, $http, $filter) {
    $scope.init = function () {
        $scope.searchTime = {
            startDate: moment().subtract(90, "days"),
            endDate: moment()
        };
        $scope.seach_data = {
            source: '情报来源',
            stauts: '',
            label_id: [],
            key_word: '',
            level: '',
            startDate: moment().subtract(90, "days").unix(),
            endDate: moment().unix(),
        };
        $scope.status_search = [{
                num: '',
                status: '状态'
            },
            {
                num: '1',
                status: '已发布'
            },
            {
                num: '0',
                status: '未发布'
            }
        ]
        $scope.search_level = [{
                num: '',
                status: '情报等级'
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
        ]
        $scope.add_level = [{
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
        ]

        $scope.add_startDate = moment().unix();
        $scope.picker_search();
        $scope.start_time_picker();
        $scope.get_loophole_source();
        $scope.get_tag_list();
        $scope.get_page();
        $scope.tag_list_if = false;
        $scope.add_source_list_if = false;
        $scope.edit_source_list_if = false;

        $scope.label_data = [];
        //前端选中标签展示列表
        $scope.label_checked_list = [];
        //展开\折叠更多
        $scope.toggleCount = 2;
        $scope.toggleStatus = false;
        $scope.get_lab_list()
        $scope.alert_item = {
            title: '',
            level: '高',
            first_seen_time: '',
            sourse: '',
            detail: '',
            label_id: {
                exist: [],
                unexist: []
            },
            tag_list: [],
            add_new_tag: [],
            tag_list_str: '',
        }
        $scope.tag_key_add = {
            active_index: -1,
            listHeight: 156,
            listItemHeight: 34,
            list_length: 0
        }
        $scope.tag_list_scrollTop = {
            active_index: -1,
            listHeight: 156,
            listItemHeight: 34,
            list_length: 0
        }
        $scope.tag_key_edit = {
            active_index: -1,
            listHeight: 156,
            listItemHeight: 34,
            list_length: 0
        }
        $scope.edit_tag_scrollTop = {
            active_index: -1,
            listHeight: 156,
            listItemHeight: 34,
            list_length: 0
        }
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
    $scope.picker_edit = function (startDate) {
        $("#picker_edit").daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                timePicker: true,
                timePicker24Hour: true,
                drops: "down",
                opens: "center",
                startDate: startDate,
                locale: {
                    applyLabel: "确定",
                    cancelLabel: "取消",
                    format: "YYYY-MM-DD HH:mm:ss"
                }
            },
            function (start, end, label) {
                $scope.edit_time = start.unix()
            }
        );
    };
    // 漏洞来源
    $scope.get_loophole_source = function (source) {
        var loading = zeroModal.loading(4);
        source = source ? source : '';
        $http({
            method: "get",
            url: "/site/intelligence-sourse",
            params: {
                sourse: source
            }
        }).then(
            function (data) {
                zeroModal.close(loading);
                $scope.loop_source = [];
                $scope.loop_source_add = [];
                angular.forEach(data.data, function (item) {
                    var obj = {
                        name: item.sourse,
                        active: false
                    }
                    $scope.loop_source.push(item.sourse);
                    $scope.loop_source_add.push(obj);
                })
                angular.forEach($scope.loop_source_add, function (item, index) {
                    if ($scope.alert_item.sourse == item.name) {
                        $scope.tag_key_add.active_index = 0;
                    }
                })
                $scope.loop_source.push('情报来源');
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
        if ($scope.seach_data.source != '情报来源') {
            params_data.source = $scope.seach_data.source
        }
        console.log(params_data);
        $http({
            method: "get",
            url: "/seting/special-intelligence-list",
            params: {
                stime: $scope.seach_data.startDate,
                etime: $scope.seach_data.endDate,
                sourse: params_data.source,
                status: $scope.seach_data.stauts,
                level: $scope.seach_data.level,
                label_id: JSON.stringify($scope.seach_data.label_id),
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

    // 情报录入-弹窗
    $scope.add_loop_box = function (item) {
        $scope.alert_item = {
            title: '',
            level: '高',
            first_seen_time: '',
            sourse: '',
            detail: '',
            label_id: {
                exist: [],
                unexist: []
            },
            tag_list: [],
            add_new_tag: [],
            tag_list_str: '',
        }
        var W = 828;
        var H = 550;
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
    $scope.add_cancel = function () {
        zeroModal.closeAll();
    };
    // 添加漏洞情报
    $scope.add_sure = function () {
        $scope.add_source_list_if = false;
        var label_id_exist = []
        if ($scope.alert_item.label_id.exist.length != 0) {
            angular.forEach($scope.alert_item.label_id.exist, function (item) {
                label_id_exist.push(item.id * 1)
            })
        }
        if ($scope.alert_item.sourse == '') {
            zeroModal.error('请选择情报来源')
            return false
        }
        if ($scope.alert_item.title == '') {
            zeroModal.error('请输入标题')
            return false
        }
        var loading = zeroModal.loading(4);
        $http({
            method: "post",
            url: "/seting/special-intelligence-add",
            data: {
                title: $scope.alert_item.title,
                level: $scope.alert_item.level,
                first_seen_time: $scope.add_startDate,
                sourse: $scope.alert_item.sourse,
                detail: $scope.alert_item.detail,
                label_id: {
                    exist: label_id_exist,
                    unexist: $scope.alert_item.add_new_tag
                }
            }
        }).then(
            function (data) {
                zeroModal.close(loading);
                if (data.data.status == 'success') {
                    zeroModal.success("添加成功");
                } else {
                    zeroModal.error(data.data.errorMessage);
                }
                setTimeout(zeroModal.closeAll(), 3000)
                $scope.get_page();
            },
            function () {}
        );
    };
    // 触发标签选择
    $scope.tag_focus = function () {
        $scope.tag_list_if = true;
        $scope.get_tag_list($scope.alert_item.tag_list_str);
        $scope.tag_list_scrollTop.active_index = -1
    }
    $scope.tag_blur = function () {
        $scope.tag_list_if = false;
        if ($scope.alert_item.tag_list_str == '') {
            return false;
        }
        $scope.alert_item.tag_list_str = '';

    }
    // 获取标签列表
    $scope.get_tag_list = function (name) {
        $http({
            method: "get",
            url: "/site/get-label",
            params: {
                label_name: name,
            }
        }).then(
            function (data) {
                console.log(data);
                $scope.search_tag_list = [];
                $scope.data_location = JSON.stringify(data.data);
                $scope.tag_list = JSON.parse($scope.data_location);
                $scope.search_tag_list_str = $scope.data_location;
                $scope.search_tag_list = JSON.parse($scope.search_tag_list_str);
                $scope.search_tag_list.push({
                    id: '',
                    label_name: '全部'
                })
            },
            function () {}
        );
    }
    $scope.tag_change = function (name) {
        $scope.get_tag_list(name);
        $scope.tag_list_scrollTop.active_index = -1
    }
    // 选择标签
    $scope.tag_list_item = function (item) {
        $scope.alert_item.tag_list.push(item.label_name);
        $scope.alert_item.label_id.exist.push(item);
        $scope.tag_list_if = false;
        $scope.alert_item.tag_list_str = ''
    }
    $scope.tag_blur = function () {
        $scope.tag_list_if = false;
    }
    // 删除标签
    $scope.tag_del = function (name, index) {
        angular.forEach($scope.alert_item.add_new_tag, function (value, key) {
            if ($scope.alert_item.tag_list[index] == value) {
                $scope.alert_item.add_new_tag.splice(key, 1);
            }
        })
        angular.forEach($scope.alert_item.label_id.exist, function (item, key) {
            if ($scope.alert_item.tag_list[index] == item.label_name) {
                $scope.alert_item.label_id.exist.splice(key, 1);
            }
        })
        $scope.alert_item.tag_list.splice(index, 1);
    }
    $scope.mykey = function (e) {
        var keycode = window.event ? e.keyCode : e.which; //获取按键编码
        if (keycode == 13) {
            if ($scope.alert_item.tag_list_str != '') {
                $scope.alert_item.tag_list.push($scope.alert_item.tag_list_str);
                $scope.alert_item.add_new_tag.push($scope.alert_item.tag_list_str);
                $scope.alert_item.tag_list_str = '';
            }
            $('.tag_input').blur();
            $scope.tag_blur();
        } else if (keycode == 40) {
            //下键
            if ($scope.tag_list_scrollTop.active_index == ($scope.tag_list.length - 1)) {
                $scope.tag_list_scrollTop.active_index = 0
            } else {
                $scope.tag_list_scrollTop.active_index++
            }
            console.log($scope.tag_list_scrollTop.active_index);
            $scope.alert_item.tag_list_str = $scope.tag_list[$scope.tag_list_scrollTop.active_index].label_name;
        } else if (keycode == 38) {
            //上键
            if ($scope.tag_list_scrollTop.active_index === 0 || $scope.tag_list_scrollTop.active_index === -1) {
                $scope.tag_list_scrollTop.active_index = $scope.tag_list.length - 1;
            } else {
                $scope.tag_list_scrollTop.active_index--;
            }
            $scope.alert_item.tag_list_str = $scope.tag_list[$scope.tag_list_scrollTop.active_index].label_name;
        }
        var scrollTop = 0;
        if ($scope.tag_list_scrollTop.listHeight < $scope.tag_list_scrollTop.listItemHeight *
            ($scope.tag_list_scrollTop.active_index + 1)) {
            scrollTop = $scope.tag_list_scrollTop.listItemHeight *
                ($scope.tag_list_scrollTop.active_index + 1) - $scope.tag_list_scrollTop.listHeight;
        }
        document.getElementById('tag_list_scrollTop').scrollTop = scrollTop;
    }
    // 发布漏洞情报
    $scope.release = function (id) {
        var loading = zeroModal.loading(4);
        $http({
            method: "put",
            url: "/seting/special-intelligence-publish",
            data: {
                id: id
            }
        }).then(
            function (data) {
                zeroModal.close(loading);
                if (data.data.status == 'success') {
                    zeroModal.success("发布成功");
                } else {
                    zeroModal.error(data.data.errorMessage);
                }
                $scope.get_page();
            },
            function () {}
        );
    }
    // 删除漏洞情报
    $scope.delete = function (id) {
        var loading = zeroModal.loading(4);
        $http({
            method: "delete",
            url: "/seting/special-intelligence-del",
            data: {
                id: id
            }
        }).then(
            function (data) {
                zeroModal.close(loading);
                if (data.data.status == 'success') {
                    zeroModal.success("删除成功");
                } else {
                    zeroModal.error(data.data.errorMessage);
                }
                $scope.get_page();
            },
            function () {}
        );
    }
    // 打开编辑框
    $scope.edit_loop_box = function (item) {
        $scope.picker_edit(moment(new Date(item.first_seen_time * 1000)));
        console.log(item);
        $scope.edit_time = item.first_seen_time;
        $scope.edit_item = {
            id: item.id,
            title: item.title,
            level: item.level,
            first_seen_time: item.first_seen_time,
            sourse: item.sourse,
            detail: item.detail,
            label_name: item.label_name,
            tag_list: item.label_name,
            tag_list_str: '',
            status: item.status
        }
        var W = 828;
        var H = 550;
        zeroModal.show({
            title: "情报编辑",
            content: edit,
            width: W + "px",
            height: H + "px",
            ok: false,
            cancel: false,
            okFn: function () {},
            onCleanup: function () {
                edit_box.appendChild(edit);
            }
        });
    };
    // 触发标签选择
    $scope.edit_tag_focus = function () {
        $scope.edit_tag_list_if = true;
        $scope.get_tag_list($scope.edit_item.tag_list_str);
        $scope.edit_tag_scrollTop.active_index = -1;
    }
    $scope.edit_tag_blur = function () {
        $scope.edit_tag_list_if = false;
        if ($scope.edit_item.tag_list_str == '') {
            return false;
        }
        $scope.edit_item.tag_list_str = '';
    }
    // 编辑选择标签
    $scope.edit_tag_list_item = function (item) {
        $scope.edit_item.tag_list.push(item.label_name);
        $scope.edit_tag_list_if = false;
        $scope.edit_item.tag_list_str = '';
    }
    $scope.edit_mykey = function (e) {
        var keycode = window.event ? e.keyCode : e.which; //获取按键编码
        if (keycode == 13) {
            if ($scope.edit_item.tag_list_str != '') {
                $scope.edit_item.tag_list.push($scope.edit_item.tag_list_str);
                $scope.edit_item.tag_list_str = '';
            }
            $('.tag_input').blur();
            $scope.edit_tag_blur();
        } else if (keycode == 40) {
            //下键
            if ($scope.edit_tag_scrollTop.active_index == ($scope.tag_list.length - 1)) {
                $scope.edit_tag_scrollTop.active_index = 0
            } else {
                $scope.edit_tag_scrollTop.active_index++
            }
            console.log($scope.edit_tag_scrollTop.active_index);
            $scope.edit_item.tag_list_str = $scope.tag_list[$scope.edit_tag_scrollTop.active_index].label_name;
        } else if (keycode == 38) {
            //上键
            if ($scope.edit_tag_scrollTop.active_index === 0 || $scope.edit_tag_scrollTop.active_index === -1) {
                $scope.edit_tag_scrollTop.active_index = $scope.tag_list.length - 1;
            } else {
                $scope.edit_tag_scrollTop.active_index--;
            }
            $scope.edit_item.tag_list_str = $scope.tag_list[$scope.edit_tag_scrollTop.active_index].label_name;
        }
        var scrollTop = 0;
        if ($scope.edit_tag_scrollTop.listHeight < $scope.edit_tag_scrollTop.listItemHeight *
            ($scope.edit_tag_scrollTop.active_index + 1)) {
            scrollTop = $scope.edit_tag_scrollTop.listItemHeight *
                ($scope.edit_tag_scrollTop.active_index + 1) - $scope.edit_tag_scrollTop.listHeight;
        }
        document.getElementById('edit_tag_scrollTop').scrollTop = scrollTop;
    }
    // 编辑删除标签
    $scope.edit_tag_del = function (name, index) {
        $scope.edit_item.tag_list.splice(index, 1);
    }
    $scope.edit_tag_change = function (name) {
        $scope.get_tag_list(name);
        $scope.edit_tag_scrollTop.active_index = -1;
    }

    $scope.edit_sure = function () {
        console.log($scope.edit_item);
        if ($scope.edit_item.sourse == '请选择') {
            zeroModal.error('请选择情报来源')
            return false
        }
        if ($scope.edit_item.title == '') {
            zeroModal.error('请输入标题')
            return false
        }
        var loading = zeroModal.loading(4);
        $http({
            method: "put",
            url: "/seting/special-intelligence-edit",
            data: {
                id: $scope.edit_item.id,
                title: $scope.edit_item.title,
                level: $scope.edit_item.level,
                first_seen_time: $scope.edit_time,
                sourse: $scope.edit_item.sourse,
                detail: $scope.edit_item.detail,
                label_name: $scope.edit_item.label_name,
                status: $scope.edit_item.status,
            }
        }).then(
            function (data) {
                zeroModal.close(loading);
                if (data.data.status == 'success') {
                    zeroModal.success("修改成功");
                } else {
                    zeroModal.error(data.data.errorMessage);
                }
                setTimeout(zeroModal.closeAll(), 3000)
                $scope.get_page();
            },
            function () {}
        );

    }

    // 添加漏洞来源

    $scope.add_source_focus = function () {
        $scope.add_source_list_if = true;
        $scope.get_loophole_source($scope.alert_item.sourse);
        $scope.tag_key_add.active_index = -1;
    }
    $scope.add_source_list_item = function (item, index) {
        $scope.alert_item.sourse = item;
        console.log(item);
        $scope.add_source_list_if = false;
    }
    $scope.add_source_blur = function () {
        $scope.add_source_list_if = false;
    }
    $scope.add_source_change = function (item) {
        $scope.tag_key_add.active_index = -1;
        $scope.get_loophole_source(item);
    }
    $scope.add_source_mykey = function (e) {
        var keycode = window.event ? e.keyCode : e.which; //获取按键编码
        if (keycode == 13) {
            $('#tag_source').blur();
            $scope.add_source_list_if = false;
        } else if (keycode == 40) {
            //下键
            if ($scope.tag_key_add.active_index == ($scope.loop_source_add.length - 1)) {
                $scope.tag_key_add.active_index = 0
            } else {
                $scope.tag_key_add.active_index++
            }
            console.log($scope.tag_key_add.active_index);
            $scope.alert_item.sourse = $scope.loop_source_add[$scope.tag_key_add.active_index].name;
        } else if (keycode == 38) {
            //上键
            if ($scope.tag_key_add.active_index === 0 || $scope.tag_key_add.active_index === -1) {
                $scope.tag_key_add.active_index = $scope.loop_source_add.length - 1;
            } else {
                $scope.tag_key_add.active_index--;
            }
            $scope.alert_item.sourse = $scope.loop_source_add[$scope.tag_key_add.active_index].name;
        }
        var scrollTop = 0;
        if ($scope.tag_key_add.listHeight < $scope.tag_key_add.listItemHeight *
            ($scope.tag_key_add.active_index + 1)) {
            scrollTop = $scope.tag_key_add.listItemHeight *
                ($scope.tag_key_add.active_index + 1) - $scope.tag_key_add.listHeight;
        }
        document.getElementById('add_tag_list').scrollTop = scrollTop;

    }
    // 编辑漏洞来源

    $scope.edit_source_focus = function (name) {
        $scope.edit_source_list_if = true;
        $scope.get_loophole_source(name);
        $scope.tag_key_edit.active_index = -1;
    }
    $scope.edit_source_list_item = function (item) {
        $scope.edit_item.sourse = item;
        $scope.edit_source_list_if = false;
    }
    $scope.edit_source_blur = function () {
        $scope.edit_source_list_if = false;
    }
    $scope.edit_source_change = function (item) {
        $scope.get_loophole_source(item);
        $scope.tag_key_edit.active_index = -1;
    }
    $scope.edit_source_mykey = function (e) {
        var keycode = window.event ? e.keyCode : e.which; //获取按键编码
        if (keycode == 13) {
            $scope.edit_source_list_if = false;
        } else if (keycode == 40) {
            //下键
            if ($scope.tag_key_edit.active_index == ($scope.loop_source_add.length - 1)) {
                $scope.tag_key_edit.active_index = 0
            } else {
                $scope.tag_key_edit.active_index++
            }
            console.log($scope.tag_key_edit.active_index);
            $scope.edit_item.sourse = $scope.loop_source_add[$scope.tag_key_edit.active_index].name;
        } else if (keycode == 38) {
            //上键
            if ($scope.tag_key_edit.active_index === 0 || $scope.tag_key_edit.active_index === -1) {
                $scope.tag_key_edit.active_index = $scope.loop_source_add.length - 1;
            } else {
                $scope.tag_key_edit.active_index--;
            }
            $scope.edit_item.sourse = $scope.loop_source_add[$scope.tag_key_edit.active_index].name;
        }
        var scrollTop = 0;
        if ($scope.tag_key_edit.listHeight < $scope.tag_key_edit.listItemHeight *
            ($scope.tag_key_edit.active_index + 1)) {
            scrollTop = $scope.tag_key_edit.listItemHeight *
                ($scope.tag_key_edit.active_index + 1) - $scope.tag_key_edit.listHeight;
        }
        document.getElementById('loop_source_add').scrollTop = scrollTop;
    }


    // 获取标签列表
    $scope.get_lab_list = function () {
        var loading = zeroModal.loading(4);
        $http({
            method: "get",
            url: "/site/label-list",
        }).then(function (resp) {
                zeroModal.close(loading);
                if (resp.status == 200) {
                    let result = JSON.parse(resp.data);
                    let labelAttr = [];
                    angular.forEach(result, function (key, value) {
                        if (value === '' || value === null) {
                            value = '未分类标签';
                        }
                        labelAttr.push({
                            name: value,
                            label: key,
                            label_attr_id: []
                        });
                    });
                    $scope.label_data = labelAttr;
                    console.log($scope.label_data);


                }
            },
            function () {}
        );
    }

    //展开、收起按钮切换事件
    $scope.tog_count_change = function (e) {
        e.preventDefault();
        let length = $scope.label_data.length;
        if (length <= 3) {
            $scope.toggleCount = length;
            $scope.toggleStatus = !$scope.toggleStatus;
        } else {
            let toggle = $scope.toggleCount += 3;
            let tog = Math.ceil(toggle / 3);
            let label = Math.ceil($scope.label_data.length / 3);
            $scope.toggleCount = tog > label ? 2 : toggle;
            $scope.toggleStatus = tog == label ? true : false;
        }
    }

    //标签列表事件高亮切换
    $scope.tog_change_status = function (e, item, it) {
        $(event.target).toggleClass('active');
        let isActive = $(event.target).hasClass('active');
        if (isActive) {
            angular.forEach($scope.label_data, function (value, key) {
                if (value.name == item.name) {
                    //每个类别的id数组（后端需要）
                    value.label_attr_id.push(it.id);
                    //前端展示的列表数据
                    $scope.label_checked_list.push(it);
                }
            });
        } else {
            angular.forEach($scope.label_data, function (value, key) {
                if (value.name == item.name) {
                    for (let i = 0; i < value.label_attr_id.length; i++) {
                        if (value.label_attr_id[i] == it.id) {
                            value.label_attr_id.splice(i, 1);
                        }
                    }
                    for (let j = 0; j < $scope.label_checked_list.length; j++) {
                        if ($scope.label_checked_list[j].id == it.id) {
                            $scope.label_checked_list.splice(j, 1);
                        }
                    }
                }
            });
        }

        //向后端传递label_id的数组拼接
        var attr = [];
        angular.forEach($scope.label_data, function (value, key) {
            if (value.label_attr_id.length > 0) {
                attr.push(value.label_attr_id);
            }
        });
        console.log(attr);
        //向后端传递的label_id（每个类别的id数组的组合）
        $scope.seach_data.label_id = attr;
        console.log($scope.seach_data.label_id);
    };



    $scope.init();

});
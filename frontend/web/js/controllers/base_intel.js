var myApp = angular.module("myApp", []);
myApp.controller("baseIntelCtrl", function ($scope, $http, $filter) {
    $scope.init = function () {
        $scope.searchTime = {
            startDate: moment().subtract(90, "days"),
            endDate: moment()
        };
        $scope.seach_data = {
            source: '',
            stauts: '',
            label_id: [],
            key_word: '',
            level: '',
            startDate: moment().subtract(90, "days").unix(),
            endDate: moment().unix(),
        };
        $scope.status_search = [{
                num: '',
                status: '全部'
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


        $scope.picker_search();
        $scope.start_time_picker();
        $scope.get_loophole_source();
        $scope.get_tag_list();
        $scope.get_page();
        $scope.tag_list_if = false;
        $scope.add_source_list_if = false;
        $scope.edit_source_list_if = false;

        $scope.label_data = [];
        //------
        $scope.pop_show = {
            add: false,
            add_level_list: false,
            add_tag_category: false,
            add_tag_name: false,
            add_NVD_list: false,
            add_source_list: false,
            edit: false,
            edit_level_list: false,
            edit_tag_category: false,
            edit_tag_name: false,
            edit_NVD_list: false,
            edit_source_list: false,
        }
        $scope.search_box_ul = {
            source: false,
            stauts: false,
            level: false,
        }
        //=---------
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
                    format: "YYYY-MM-DD HH:mm"
                }
            },
            function (start, end, label) {
                $scope.add_item.first_seen_time = start.unix()
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
        console.log(startDate);
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
                $scope.edit_item.first_seen_time = start.unix()
            }
        );
    };
    // 获取情报来源
    $scope.get_loophole_source = function (source) {
        source = source ? source : '';
        $http({
            method: "get",
            url: "/site/intelligence-sourse",
            params: {
                sourse: source
            }
        }).then(
            function (data) {
                console.log(data);
                $scope.loop_source = [];
                $scope.loop_source_add = [];
                angular.forEach(data.data, function (item) {
                    var obj = {
                        name: item.sourse,
                        active: false
                    }
                    $scope.loop_source_add.push(obj);
                    $scope.loop_source.push(obj);
                })
                angular.forEach($scope.loop_source_add, function (item, index) {
                    if ($scope.alert_item.sourse == item.name) {
                        $scope.tag_key_add.active_index = 0;
                    }
                })
                $scope.loop_source.unshift({
                    name: '全部',
                    active: false
                })
            },
            function () {}
        );
    }
    // 获取列表
    $scope.get_page = function (pageNow) {
        pageNow = pageNow ? pageNow : 1;
        // var loading = zeroModal.loading(4);
        var params_data = JSON.stringify($scope.seach_data);
        $scope.params_data = JSON.parse(params_data)
        switch ($scope.params_data.stauts) {
            case '全部':
                $scope.params_data.stauts = ''
                break;
            case '已发布':
                $scope.params_data.stauts = 1
                break;
            case '未发布':
                $scope.params_data.stauts = 0
                break;

            default:
                break;
        }
        if ($scope.params_data.source == '全部') {
            $scope.params_data.source = ''
        }
        if ($scope.params_data.level == '全部') {
            $scope.params_data.level = ''
        }
        console.log($scope.params_data);
        $http({
            method: "get",
            url: "/seting/special-intelligence-list",
            params: {
                stime: $scope.params_data.startDate,
                etime: $scope.params_data.endDate,
                sourse: $scope.params_data.source,
                status: $scope.params_data.stauts,
                level: $scope.params_data.level,
                label_id: JSON.stringify($scope.params_data.label_id),
                key_word: $scope.params_data.key_word,
                page: pageNow,
                rows: 10,
            }
        }).then(
            function (data) {
                // zeroModal.close(loading);
                $scope.pages = data.data;
            },
            function () {}
        );
    }

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

    }
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

    }
    // 搜索栏选择
    $scope.search_choose_item = function (data, index, name) {
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

    // 情报录入-弹窗
    $scope.add_loop_box = function (item) {
        $scope.pop_show.add = true;
        $scope.add_item = {
            title: '',
            level: '',
            link: '',
            original_intelligence: '',
            level_list: [{
                    name: '高危',
                    num: '高危'
                },
                {
                    name: '中危',
                    num: '高危'
                },
                {
                    name: '低危',
                    num: '高危'
                },
            ],
            reference: [{
                name: '',
                icon: true
            }],
            reference_information: [],
            NVD: [{
                name: '',
                icon: true
            }],
            nvd_list: [],
            tag: [{
                category: '',
                name: '',
                tag_name_list: [],
                category_ul: false,
                name_ul: false,
                icon: true,
                id: ''
            }],
            label_category: [],
            first_seen_time: moment().unix(),
            sourse: '',
            detail: '',
            exist: [],
        }
    };
    //   取消弹窗
    $scope.add_cancel = function () {
        $scope.pop_show.add = false;
    };
    //   取消编辑弹窗
    $scope.edit_cancel = function () {
        $scope.pop_show.edit = false;
    };
    // 添加漏洞情报
    $scope.add_sure = function () {
        console.log($scope.add_item);
        //------
        // {
        //     "title": "3462454",
        //     "level": "高",
        //     "first_seen_time": 1577691334,
        //     "sourse": "https://www.upstream.auto/research/automotive-cybersecurity",
        //     "link": "链接",
        //     "detail": "23253534",
        //     "original_intelligence": "yuanshi qingbao",
        //     "reference_information": ["123", "adfg", "dfd", "f佛挡杀佛的"],
        //     "label_id": {
        //         "exist": [112, 118],
        //         "unexist": ["5656565656"]
        //     },
        //     "nvd": ["sssss", "adfg", "ss", "aaaa"]
        // }
        //  tag: [{
        //      category: '',
        //      name: '',
        //      tag_name_list: [],
        //      category_ul: false,
        //      name_ul: false,
        //      icon: true,
        //      id: ''
        //  }],
        //----
        if ($scope.add_item.title == '') {
            zeroModal.error('请输入标题')
            return false
        }
        switch ($scope.add_item.level) {
            case '':
                zeroModal.error('请选择漏洞等级')
                return false
                break;
            case '高危':
                $scope.add_item.level_cn = '高'
                break;
            case '中危':
                $scope.add_item.level_cn = '中'
                break;
            case '低危':
                $scope.add_item.level_cn = '低'
                break;
            default:
                break;
        }
        // if ($scope.add_item.sourse == '') {
        //     zeroModal.error('请选择情报来源')
        //     return false
        // }
        angular.forEach($scope.add_item.tag, function (item, index) {
            if (item.name != '') {
                $scope.add_item.exist.push(item.id)
            }
        })
        angular.forEach($scope.add_item.reference, function (item, index) {
            if (item.name != '') {
                $scope.add_item.reference_information.push(item.name)
            }
        })
        angular.forEach($scope.add_item.NVD, function (item, index) {
            if (item.name != '') {
                $scope.add_item.nvd_list.push(item.name)
            }
        })
        // var loading = zeroModal.loading(4);
        $http({
            method: "post",
            url: "/seting/special-intelligence-add",
            data: {
                title: $scope.add_item.title,
                level: $scope.add_item.level_cn,
                first_seen_time: $scope.add_item.first_seen_time,
                sourse: $scope.add_item.sourse,
                link: $scope.add_item.link,
                detail: $scope.add_item.detail,
                nvd: ['0000', '9999', '8888'],
                reference_information: $scope.add_item.reference_information,
                original_intelligence: $scope.add_item.original_intelligence,
                label_id: {
                    exist: $scope.add_item.exist,
                    unexist: []
                }
            }
        }).then(
            function (data) {
                // zeroModal.close(loading);
                console.log(data);
                if (data.data.status == 'success') {
                    zeroModal.success("添加成功");
                    $scope.get_tag_list()
                    $scope.get_loophole_source();
                    $scope.get_page();
                    $scope.pop_show.add = false;
                } else {
                    zeroModal.error(data.data.errorMessage);
                }
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
        // var loading = zeroModal.loading(4);
        $http({
            method: "put",
            url: "/seting/special-intelligence-publish",
            data: {
                id: id
            }
        }).then(
            function (data) {
                // zeroModal.close(loading);
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
        // var loading = zeroModal.loading(4);
        $http({
            method: "delete",
            url: "/seting/special-intelligence-del",
            data: {
                id: id
            }
        }).then(
            function (data) {
                // zeroModal.close(loading);
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
        var item_str = JSON.stringify(item);
        $scope.edit_item_str = JSON.parse(item_str);
        console.log($scope.edit_item_str);
        $scope.picker_edit(moment(new Date($scope.edit_item_str.first_seen_time * 1000)));
        $scope.edit_item = {
            title: $scope.edit_item_str.title,
            level: '',
            link: $scope.edit_item_str.link,
            original_intelligence: $scope.edit_item_str.original_intelligence,
            level_list: [{
                    name: '高危',
                    num: '高危'
                },
                {
                    name: '中危',
                    num: '高危'
                },
                {
                    name: '低危',
                    num: '高危'
                },
            ],
            reference: [],
            reference_information: [],
            NVD: [{
                name: '',
                icon: true
            }],
            nvd_list: [],
            tag: [{
                category: '',
                name: '',
                tag_name_list: [],
                category_ul: false,
                name_ul: false,
                icon: true,
                id: ''
            }],
            label_category: [],
            first_seen_time: moment(new Date($scope.edit_item_str.first_seen_time * 1000)),
            sourse: $scope.edit_item_str.sourse,
            detail: $scope.edit_item_str.detail,
            exist: [],
        }
        switch ($scope.edit_item_str.level) {
            case '高':
                $scope.edit_item.level = '高危'
                break;
            case '中':
                $scope.edit_item.level = '中危'
                break;
            case '低':
                $scope.edit_item.level = '低危'
                break;
            default:
                break;
        }
        angular.forEach($scope.edit_item_str.reference_information, function (item, index) {
            var obj = {
                name: item,
                icon: false
            }
            if (index == $scope.edit_item_str.reference_information.length - 1) {
                obj.icon = true
            }
            $scope.edit_item.reference.push(obj);
        })



        $scope.pop_show.edit = true;
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
        // var loading = zeroModal.loading(4);
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
                // zeroModal.close(loading);
                if (data.data.status == 'success') {
                    zeroModal.success("修改成功");
                    $scope.get_tag_list();
                    $scope.get_lab_list()
                } else {
                    zeroModal.error(data.data.errorMessage);
                }
                setTimeout(zeroModal.closeAll(), 3000)
                $scope.get_page();
            },
            function () {}
        );

    }

    // ---------------录入情报来源
    // add_level_list: false,
    //    add_tag_category: false,
    //        add_tag_name: false,
    //        add_NVD_list: false,
    //        add_source_list: false,
    //获取焦点
    $scope.add_focus = function (name, index) {
        switch (name) {
            case 'level':
                $scope.pop_show.add_level_list = true;
                break;
            case 'tag_category':
                angular.forEach($scope.add_item.tag, function (item) {
                    item.category_ul = false;
                })
                angular.forEach($scope.add_item.tag, function (key, value) {
                    if (value == index) {
                        key.category_ul = true;
                    }
                })
                break;
            case 'tag_name':
                angular.forEach($scope.add_item.tag, function (item) {
                    item.name_ul = false;
                })
                angular.forEach($scope.add_item.tag, function (key, value) {
                    if (value == index) {
                        key.name_ul = true;
                    }
                })
                $scope.pop_show.add_tag_name = true;
                break;
            case 'NVD':
                $scope.pop_show.add_NVD_list = true;
                break;
            case 'source':
                $scope.pop_show.add_source_list = true;
                break;

            default:
                break;
        }
    }
    // 失去焦点
    $scope.add_blur = function (name, index) {
        switch (name) {
            case 'level':
                $scope.pop_show.add_level_list = false;
                break;
            case 'tag_category':
                angular.forEach($scope.add_item.tag, function (key, value) {
                    if (value == index) {
                        key.category_ul = false;
                    }
                })
                break;
            case 'tag_name':
                angular.forEach($scope.add_item.tag, function (key, value) {
                    if (value == index) {
                        key.name_ul = false;
                    }
                })
                break;
            case 'NVD':
                $scope.pop_show.add_NVD_list = false;
                break;
            case 'source':
                $scope.pop_show.add_source_list = false;
                break;
            default:
                break;
        }

    }
    // 选择列表
    $scope.choose_item = function (data, index, name) {
        switch (name) {
            case 'level':
                $scope.add_item.level = data;
                break;
            case 'source':
                $scope.add_item.sourse = data;
                break;
            case 'tag_category':
                angular.forEach($scope.add_item.tag, function (key, value) {
                    if (value == index) {
                        key.category = data;
                        key.name = '';
                    }
                })
                // 联动改变
                angular.forEach($scope.label_data, function (key, value) {
                    if (key.name == data) {
                        $scope.add_item.tag[index].tag_name_list = key.label
                    }
                })
                break;
            case 'tag_name':
                angular.forEach($scope.add_item.tag, function (key, value) {
                    if (value == index) {
                        key.name = data.label_name;
                        key.id = data.id;
                    }
                })

                break;

            default:
                break;
        }

    }
    // 增加input框
    $scope.add_input_list = function (name, index) {
        switch (name) {
            case 'reference':
                angular.forEach($scope.add_item.reference, function (item) {
                    item.icon = false;
                })
                $scope.add_item.reference.push({
                    name: '',
                    icon: true
                })
                break;
            case 'NVD':
                angular.forEach($scope.add_item.NVD, function (item) {
                    item.icon = false;
                })
                $scope.add_item.NVD.push({
                    name: '',
                    icon: true
                })
                break;
            case 'tag':
                angular.forEach($scope.add_item.tag, function (item) {
                    item.icon = false;
                })
                $scope.add_item.tag.push({
                    category: '',
                    name: '',
                    tag_name_list: [],
                    category_ul: false,
                    name_ul: false,
                    icon: true

                })
                break;

            default:
                break;
        }
    }
    // 删除input框
    $scope.delete_input_list = function (name, index) {
        switch (name) {
            case 'reference':
                $scope.add_item.reference.splice(index, 1);
                break;
            case 'NVD':
                $scope.add_item.NVD.splice(index, 1);
                break;
            case 'tag':
                $scope.add_item.tag.splice(index, 1);
                break;

            default:
                break;
        }
    }
    // 触发情报来源输入改变
    $scope.add_source_change = function (item) {
        $scope.tag_key_add.active_index = -1;
        $scope.get_loophole_source(item);
    }
    // 按上下按键选择
    $scope.add_source_mykey = function (e) {
        var keycode = window.event ? e.keyCode : e.which; //获取按键编码
        if (keycode == 13) {
            $('#input_source_add').blur();
            $scope.pop_show.add_source_list = false;
            console.log('enter');
        } else if (keycode == 40) {
            //下键
            if ($scope.tag_key_add.active_index == ($scope.loop_source_add.length - 1)) {
                $scope.tag_key_add.active_index = 0
            } else {
                $scope.tag_key_add.active_index++
            }
            console.log($scope.tag_key_add.active_index);
            $scope.add_item.sourse = $scope.loop_source_add[$scope.tag_key_add.active_index].name;
        } else if (keycode == 38) {
            //上键
            if ($scope.tag_key_add.active_index === 0 || $scope.tag_key_add.active_index === -1) {
                $scope.tag_key_add.active_index = $scope.loop_source_add.length - 1;
            } else {
                $scope.tag_key_add.active_index--;
            }
            $scope.add_item.sourse = $scope.loop_source_add[$scope.tag_key_add.active_index].name;
        }
        var scrollTop = 0;
        if ($scope.tag_key_add.listHeight < $scope.tag_key_add.listItemHeight *
            ($scope.tag_key_add.active_index + 1)) {
            scrollTop = $scope.tag_key_add.listItemHeight *
                ($scope.tag_key_add.active_index + 1) - $scope.tag_key_add.listHeight;
        }
        document.getElementById('loop_source_add').scrollTop = scrollTop;
    }

    //--------------- 编辑情报
    //获取焦点
    $scope.edit_focus = function (name, index) {
        switch (name) {
            case 'level':
                $scope.pop_show.edit_level_list = true;
                break;
            case 'tag_category':
                angular.forEach($scope.edit_item.tag, function (item) {
                    item.category_ul = false;
                })
                angular.forEach($scope.edit_item.tag, function (key, value) {
                    if (value == index) {
                        key.category_ul = true;
                    }
                })
                break;
            case 'tag_name':
                angular.forEach($scope.edit_item.tag, function (item) {
                    item.name_ul = false;
                })
                angular.forEach($scope.edit_item.tag, function (key, value) {
                    if (value == index) {
                        key.name_ul = true;
                    }
                })
                $scope.pop_show.edit_tag_name = true;
                break;
            case 'NVD':
                $scope.pop_show.edit_NVD_list = true;
                break;
            case 'source':
                $scope.pop_show.edit_source_list = true;
                break;

            default:
                break;
        }
    }
    // 失去焦点
    $scope.edit_blur = function (name, index) {
        switch (name) {
            case 'level':
                $scope.pop_show.edit_level_list = false;
                break;
            case 'tag_category':
                angular.forEach($scope.edit_item.tag, function (key, value) {
                    if (value == index) {
                        key.category_ul = false;
                    }
                })
                break;
            case 'tag_name':
                angular.forEach($scope.edit_item.tag, function (key, value) {
                    if (value == index) {
                        key.name_ul = false;
                    }
                })
                break;
            case 'NVD':
                $scope.pop_show.edit_NVD_list = false;
                break;
            case 'source':
                $scope.pop_show.edit_source_list = false;
                break;
            default:
                break;
        }

    }
    // 选择列表
    $scope.choose_item_edit = function (data, index, name) {
        switch (name) {
            case 'level':
                $scope.edit_item.level = data;
                break;
            case 'source':
                $scope.edit_item.sourse = data;
                break;
            case 'tag_category':
                angular.forEach($scope.edit_item.tag, function (key, value) {
                    if (value == index) {
                        key.category = data;
                        key.name = '';
                    }
                })
                // 联动改变
                angular.forEach($scope.label_data, function (key, value) {
                    if (key.name == data) {
                        $scope.edit_item.tag[index].tag_name_list = key.label
                    }
                })
                break;
            case 'tag_name':
                angular.forEach($scope.edit_item.tag, function (key, value) {
                    if (value == index) {
                        key.name = data.label_name;
                        key.id = data.id;
                    }
                })

                break;

            default:
                break;
        }

    }
    // 增加input框
    $scope.edit_add_input_list = function (name, index) {
        switch (name) {
            case 'reference':
                angular.forEach($scope.edit_item.reference, function (item) {
                    item.icon = false;
                })
                $scope.edit_item.reference.push({
                    name: '',
                    icon: true
                })
                break;
            case 'NVD':
                angular.forEach($scope.edit_item.NVD, function (item) {
                    item.icon = false;
                })
                $scope.edit_item.NVD.push({
                    name: '',
                    icon: true
                })
                break;
            case 'tag':
                angular.forEach($scope.edit_item.tag, function (item) {
                    item.icon = false;
                })
                $scope.edit_item.tag.push({
                    category: '',
                    name: '',
                    tag_name_list: [],
                    category_ul: false,
                    name_ul: false,
                    icon: true

                })
                break;

            default:
                break;
        }
    }
    // 删除input框
    $scope.edit_delete_input_list = function (name, index) {
        switch (name) {
            case 'reference':
                $scope.edit_item.reference.splice(index, 1);
                break;
            case 'NVD':
                $scope.edit_item.NVD.splice(index, 1);
                break;
            case 'tag':
                $scope.edit_item.tag.splice(index, 1);
                break;
            default:
                break;
        }
    }
    // 触发情报来源输入改变
    $scope.edit_source_change = function (item) {
        $scope.tag_key_add.active_index = -1;
        $scope.get_loophole_source(item);
    }
    // 按上下按键选择
    $scope.edit_source_mykey = function (e) {
        var keycode = window.event ? e.keyCode : e.which; //获取按键编码
        if (keycode == 13) {
            $('#input_source_edit').blur();
            $scope.pop_show.edit_source_list = false;
        } else if (keycode == 40) {
            //下键
            if ($scope.tag_key_add.active_index == ($scope.loop_source_add.length - 1)) {
                $scope.tag_key_add.active_index = 0
            } else {
                $scope.tag_key_add.active_index++
            }
            $scope.edit_item.sourse = $scope.loop_source_add[$scope.tag_key_add.active_index].name;
        } else if (keycode == 38) {
            //上键
            if ($scope.tag_key_add.active_index === 0 || $scope.tag_key_add.active_index === -1) {
                $scope.tag_key_add.active_index = $scope.loop_source_add.length - 1;
            } else {
                $scope.tag_key_add.active_index--;
            }
            $scope.edit_item.sourse = $scope.loop_source_add[$scope.tag_key_add.active_index].name;
        }
        var scrollTop = 0;
        if ($scope.tag_key_add.listHeight < $scope.tag_key_add.listItemHeight *
            ($scope.tag_key_add.active_index + 1)) {
            scrollTop = $scope.tag_key_add.listItemHeight *
                ($scope.tag_key_add.active_index + 1) - $scope.tag_key_add.listHeight;
        }
        document.getElementById('loop_source_edit').scrollTop = scrollTop;
    }



    // 获取标签列表
    $scope.get_lab_list = function () {
        // var loading = zeroModal.loading(4);
        $http({
            method: "get",
            url: "/site/label-list",
        }).then(function (resp) {
                // zeroModal.close(loading);
                if (resp.status == 200) {
                    let result = JSON.parse(resp.data);
                    let labelAttr = [];
                    angular.forEach(result, function (key, value) {
                        if (value == '' || value === null) {
                            value = '未分类标签';
                        } else {
                            value = value.substring(0, value.length - 10);
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

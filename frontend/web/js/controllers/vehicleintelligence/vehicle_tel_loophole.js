var myApp = angular.module("myApp", []);
myApp.controller("vehicleTelLoopholeCtrl", function($scope, $http, $filter) {

    $scope.init = function(){
        $scope.label_data = [];

        //展开\折叠更多
        $scope.toggleCount = 2;
        $scope.toggleStatus = false;

        //前端选中标签展示列表
        $scope.label_checked_list = [];

        $scope.searchTime = {
            startDate: moment().subtract(90, "days"),
            endDate: moment()
        };

        $scope.seach_data = {
            source: '漏洞来源',
            status: '',
            label_id: [],
            key_word: '',
            level: '',
            startDate: moment().subtract(90, "days").unix(),
            endDate: moment().unix(),
        };

        //漏洞级别
        $scope.search_level = [{
            num: '',
            status: '漏洞级别'
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
        $scope.get_loophole_source();
        $scope.get_lab_list();
        $scope.get_page();
    }

    //初始化时间
    $scope.picker_search = function () {
        $("#picker_search").daterangepicker({
                showDropdowns: true,
                timePicker: false,
                timePicker24Hour: true,
                drops: "down",
                opens: "right",
                maxDate: $scope.searchTime.endDate,
                startDate: $scope.searchTime.startDate,
                endDate: $scope.searchTime.endDate,
                locale: {
                    applyLabel: "确定",
                    cancelLabel: "取消",
                    format: "YYYY-MM-DD"
                }
            },
            function (start, end, label) {
                $scope.seach_data.startDate = start.unix();
                $scope.seach_data.endDate = end.unix();
            }
        );
    };

    // 漏洞来源下拉框
    $scope.get_loophole_source = function () {
        $http({
            method: "get",
            url: "/site/intelligence-sourse",
            params: {
                sourse: ''
            }
        }).then(function (resp) {
                $scope.loop_source = [];
                angular.forEach(resp.data, function (item) {
                    $scope.loop_source.push(item.sourse);
                })
                $scope.loop_source.unshift('漏洞来源');
            },
            function () {}
        );
    }

    // 获取标签列表
    $scope.get_lab_list = function () {

        var loading = zeroModal.loading(4);

        $http({
            method: "get",
            url: "/site/label-list",
        }).then(function (resp) {

                zeroModal.close(loading);

                if(resp.status == 200) {

                    let result = JSON.parse(resp.data);

                    let labelAttr = [];

                    angular.forEach(result, function (key,value) {
                        if(value === '' || value === null){
                            value = '未分类标签';
                        }
                        labelAttr.push({name:value,label:key,label_attr_id:[]});
                    });

                    $scope.label_data = labelAttr;
                }
            },
            function () {}
        );
    }

    //展开、收起按钮切换事件
    $scope.tog_count_change = function (e) {

        e.preventDefault();

        let length = $scope.label_data.length;

        if(length <= 3){
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
    $scope.tog_change_status = function (e,item,it) {

        $(event.target).toggleClass('active');

        let isActive = $(event.target).hasClass('active');

        if(isActive){

            angular.forEach($scope.label_data, function (value, key) {

                if (value.name == item.name) {
                    //每个类别的id数组（后端需要）
                    value.label_attr_id.push(it.id);
                    //前端展示的列表数据
                    $scope.label_checked_list.push(it);
                }
            });

        }else {

            angular.forEach($scope.label_data, function (value, key) {
                if (value.name == item.name) {
                    for(let i = 0;i < value.label_attr_id.length; i++){
                        if(value.label_attr_id[i] == it.id){
                            value.label_attr_id.splice(i, 1);
                        }
                    }
                    for(let j = 0; j < $scope.label_checked_list.length; j++){
                        if($scope.label_checked_list[j].id == it.id){
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
        //向后端传递的label_id（每个类别的id数组的组合）
        $scope.seach_data.label_id = attr;
    };

    //漏洞情报事件详情
    $scope.list_item_click = function (e,item) {

        e.preventDefault();

        item.label_new_name = item.label_name.join('/');
        $scope.label_item_data = item;

        var W = 740;
        var H = 352;

        zeroModal.show({
            title: "漏洞情报详情",
            content: vehicle_loophole,
            width: W + "px",
            height: H + "px",
            ok: false,
            cancel: false,
            okFn: function () {},
            onOpen: function () {},
            onCleanup: function () {
                vehicle_loophole_box.appendChild(vehicle_loophole);
            }
        });
    }

    // 获取列表
    $scope.get_page = function (pageNow) {
        pageNow = pageNow ? pageNow : 1;
        var loading = zeroModal.loading(4);
        var params_data = {
            source: '',
            label_id: []
        }
        if ($scope.seach_data.source != '漏洞来源') {
            params_data.source = $scope.seach_data.source
        }
        /*if ($scope.seach_data.label_id != '') {
            params_data.label_id.push($scope.seach_data.label_id * 1);
            params_data.label_id_box.push(params_data.label_id)
            params_data.label_id_str = JSON.stringify(params_data.label_id_box);
        } else {
            params_data.label_id_str = '[]'
        }*/
        $http({
            method: "get",
            url: "/vehicleintelligence/loophole-intelligence-list",
            params: {
                stime: $scope.seach_data.startDate,
                etime: $scope.seach_data.endDate,
                sourse: params_data.source,
                status: '1',
                level: $scope.seach_data.level,
                //label_id: params_data.label_id_str,
                label_id: JSON.stringify($scope.seach_data.label_id),
                key_word: $scope.seach_data.key_word,
                page: pageNow,
                rows: 10,
            }
        }).then(function (data) {
                zeroModal.close(loading);
                $scope.pages = data.data;
            },
            function () {}
        );
    }

    $scope.init();
});

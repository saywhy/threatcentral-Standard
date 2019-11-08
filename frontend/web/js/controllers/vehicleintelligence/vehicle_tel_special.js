var myApp = angular.module("myApp", []);
myApp.controller("vehicleTelSpecialCtrl", function($scope, $http, $filter) {



    $scope.init = function(){
        $scope.label_data = [];

        //展开\折叠更多
        $scope.toggleCount = 2;
        $scope.toggleStatus = false;

        $scope.label_info = {
            tag_list:[],
            tab_tag_list: [],
            tag_checked_list:[],
            tag_list_str:''
        }

        $scope.searchTime = {
            startDate: moment().subtract(90, "days"),
            endDate: moment()
        };

        $scope.seach_data = {
            source: '全部',
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
        $scope.start_time_picker();
        $scope.get_loophole_source();
        //$scope.get_tag_list();
        $scope.get_lab_show();
        $scope.get_page();

        //$scope.tag_list_if = false;
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
    /*$scope.get_tag_list = function (name) {
        $http({
            method: "get",
            url: "/site/get-label",
            params: {
                label_name: name,
            }
        }).then(function (resp) {

                //console.log(resp)
                $scope.label_info.tag_list = resp.data;

               // $scope.search_tag_list_str = JSON.stringify(resp.data)
               // $scope.search_tag_list = JSON.parse($scope.search_tag_list_str);
            },
            function () {}
        );
    }*/

    // 获取标签展示
    $scope.get_lab_show = function () {

        var loading = zeroModal.loading(4);
        $http({
            method: "get",
            url: "/site/label-list",
        }).then(function (resp) {
                zeroModal.close(loading);

                if(resp.status == 200){

                    let result = JSON.parse(resp.data);

                    let labelAttr = [];

                    angular.forEach(result, function (key,value) {
                        if(value === '' || value === null){
                            value = '自定义标签';
                        }
                        labelAttr.push({name:value,label:key,label_attr_id:[]});
                    });

                    $scope.label_data = labelAttr;
                }
            },
            function () {}
        );
    }

    //展开按钮事件
    $scope.tog_count_change = function (e) {

        e.preventDefault();

        let toggle = $scope.toggleCount += 3;

        let tog = Math.ceil(toggle / 3);
        let label = Math.ceil($scope.label_data.length / 3);

        $scope.toggleCount = tog > label ? 2 : toggle;

        if(tog > label){
            $scope.toggleCount = 2;
        }else {
            $scope.toggleCount = toggle;
        }

        if(tog < label){
            $scope.toggleCount = toggle;
            $scope.toggleStatus = false;
        }else if(tog == label){
            $scope.toggleCount = toggle;
            $scope.toggleStatus = true;
        }else{
            $scope.toggleCount = 2;
            $scope.toggleStatus = false;
        }
    }


    //标签事件切换
    $scope.tog_change_status = function (e,item,it){

        $(event.target).toggleClass('active');
        let isActive = $(event.target).hasClass('active');

        if(isActive){
            angular.forEach($scope.label_data, function (value, key) {
                if (value.name == item.name) {
                    value.label_attr_id.push(it.id);
                    $scope.label_info.tab_tag_list.push(it);
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

                    for(let j = 0; j < $scope.label_info.tab_tag_list.length; j++){
                        if($scope.label_info.tab_tag_list[j].id == it.id){
                            $scope.label_info.tab_tag_list.splice(j, 1);
                        }
                    }
                }
            });
        }
       // console.log($scope.label_info.tab_tag_list);

        var attr = [];
        angular.forEach($scope.label_data, function (value, key) {

            if (value.label_attr_id.length > 0) {
                attr.push(value.label_attr_id);
            }
        });

        $scope.seach_data.label_id = attr;

        //console.log($scope.seach_data.label_id);
    };

    // 获取行业情报列表
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
            params_data.source = $scope.seach_data.source;
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
            url: "/vehicleintelligence/special-intelligence-list",
            params: {
                stime: $scope.seach_data.startDate,
                etime: $scope.seach_data.endDate,
                sourse: params_data.source,
                status: '0',
                level: $scope.seach_data.level,
                label_id: JSON.stringify($scope.seach_data.label_id),
                key_word: $scope.seach_data.key_word,
                page: pageNow,
                rows: 10
            }
        }).then(function (resp) {
                zeroModal.close(loading);
                $scope.pages = resp.data;

                console.log($scope.pages)
            },
            function () {}
        );
    }

    $scope.init();

    // 删除标签
    /*$scope.tag_del = function (name, index) {
        /!*angular.forEach($scope.alert_item.add_new_tag, function (value, key) {
            if ($scope.alert_item.tag_list[index] == value) {
                $scope.alert_item.add_new_tag.splice(key, 1);
            }
        })
        angular.forEach($scope.alert_item.label_id.exist, function (item, key) {
            if ($scope.alert_item.tag_list[index] == item.label_name) {
                $scope.alert_item.label_id.exist.splice(key, 1);
            }
        })*!/
        $scope.label_info.tab_tag_list.splice(index, 1);
    }*/

});

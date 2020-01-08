var myApp = angular.module("myApp", []);
myApp.controller("assetsAccessoryCtrl", function ($scope, $http, $filter) {
    $scope.init = function () {
        $scope.select_list = {
            id: {
                choose: '',
                show: false,
                list: []
            },
            name: {
                choose: '',
                show: false,
                list: []
            },
            supplier_name: {
                choose: '',
                show: false,
                list: []
            },
            hardware: {
                choose: '',
                show: false,
                list: []
            },
            software: {
                choose: '',
                show: false,
                list: []
            },
            os_version: {
                choose: '',
                show: false,
                list: []
            },
            os_kernel: {
                choose: '',
                show: false,
                list: []
            },
            supplier_id: {
                choose: '',
                show: false,
                list: []
            },
        }

        $scope.get_select_list('id');
        $scope.get_select_list('name');
        $scope.get_select_list('supplier_name');
        $scope.get_select_list('supplier_id');
        $scope.get_select_list('os_kernel');
        $scope.get_select_list('os_version');
        $scope.get_page();
        // id
        // name
        // supplier_name
        // hardware
        // software
        // os_version
        // os_kernel
        // supplier_id
    }

    // 点击展开收起
    $scope.click_item = function (key) {
        if (key.class != 'master') {
            return false;
        }
        angular.forEach($scope.new_list, function (item) {
            if (key.master_index == item.index) {
                console.log(item);
                item.show = !item.show;
                item.show_index = item.show;
                key.show_clild = item.show;
            }
        })
    }

    // 获取搜索下拉框
    $scope.get_select_list = function (name) {
        $http({
            method: "get",
            url: "/assets/accessory-filters",
            params: {
                filter: name,
                value: '',
            }
        }).then(
            function (data) {
                // zeroModal.close(loading);
                switch (name) {
                    case 'id':
                        $scope.select_list.id.list = data.data.data;
                        break;
                    case 'name':
                        $scope.select_list.name.list = data.data.data;
                        break;
                    case 'supplier_name':
                        $scope.select_list.supplier_name.list = data.data.data;
                        break;
                    case 'supplier_id':
                        $scope.select_list.supplier_id.list = data.data.data;
                        break;
                    case 'os_kernel':
                        $scope.select_list.os_kernel.list = data.data.data;
                        break;
                    case 'os_version':
                        $scope.select_list.os_version.list = data.data.data;
                        break;
                    default:
                        break;

                }
            },
            function () {}
        );
    }
    // 搜索框获取焦点
    $scope.search_focus = function (name) {
        switch (name) {
            case 'id':
                $scope.select_list.id.show = true;
                break;
            case 'name':
                $scope.select_list.name.show = true;
                break;
            case 'supplier_name':
                $scope.select_list.supplier_name.show = true;
                break;

            case 'supplier_id':
                $scope.select_list.supplier_id.show = true;
                break;
            case 'os_kernel':
                $scope.select_list.os_kernel.show = true;
                break;
            case 'os_version':
                $scope.select_list.os_version.show = true;
                break;
            default:
                break;
        }

    }
    // 搜索框失去焦点
    $scope.search_blur = function (name) {
        switch (name) {
            case 'id':
                $scope.select_list.id.show = false;
                break;
            case 'name':
                $scope.select_list.name.show = false;
                break;
            case 'supplier_name':
                $scope.select_list.supplier_name.show = false;
                break;

            case 'supplier_id':
                $scope.select_list.supplier_id.show = false;
                break;
            case 'os_kernel':
                $scope.select_list.os_kernel.show = false;
                break;
            case 'os_version':
                $scope.select_list.os_version.show = false;
                break;
            default:
                break;
        }
    }
    // 搜索栏选择
    $scope.search_choose_item = function (data, index, name) {
        switch (name) {
            case 'id':
                $scope.select_list.id.choose = data
                break;
            case 'name':
                $scope.select_list.name.choose = data
                break;
            case 'supplier_name':
                $scope.select_list.supplier_name.choose = data
                break;

            case 'supplier_id':
                $scope.select_list.supplier_id.choose = data
                break;
            case 'os_kernel':
                $scope.select_list.os_kernel.choose = data
                break;
            case 'os_version':
                $scope.select_list.os_version.choose = data
                break;
            default:
                break;
        }
    }

    //    重置
    $scope.reset = function () {

        $scope.select_list.id.choose = '';
        $scope.select_list.name.choose = '';
        $scope.select_list.supplier_name.choose = '';
        $scope.select_list.supplier_id.choose = '';
        $scope.select_list.os_kernel.choose = '';
        $scope.select_list.os_version.choose = '';
    }
    // 获取列表
    $scope.get_page = function (page) {
        console.log('222');
        // id
        // name
        // supplier_name
        // hardware
        // software
        // os_version
        // os_kernel
        // supplier_id
        page = page ? page : 1
        var loading = zeroModal.loading(4);
        $http({
            method: "get",
            url: "/assets/accessory-assets-list",
            params: {
                id: $scope.select_list.id.choose,
                name: $scope.select_list.name.choose,
                supplier_name: $scope.select_list.supplier_name.choose,
                os_kernel: $scope.select_list.os_kernel.choose,
                supplier_id: $scope.select_list.supplier_id.choose,
                os_version: $scope.select_list.os_version.choose,
                rows: 10,
                page: page,
            }
        }).then(
            function (data) {
                zeroModal.close(loading);
                console.log(data);
                if (data.data.status == 'success') {
                    $scope.table_list = data.data.data;
                    angular.forEach($scope.table_list.data, function (item) {
                        item.children = []
                        item.show = false;
                    })
                }
                console.log($scope.table_list);
            },
            function () {}
        );
    }
    // 获取车辆详情
    $scope.detail = function (item) {
        console.log(item);
        if (item.show) {
            item.show = !item.show;
            return false
        }
        var loading = zeroModal.loading(4);
        $http({
            method: "get",
            url: "/assets/accessory-vehicles",
            params: {
                accessory_id: item.id
            }
        }).then(
            function (data) {
                console.log(data.data.data.data);
                zeroModal.close(loading);
                if (data.data.status == 'success') {
                    item.children = [];
                    item.children = [{
                        vehicle_id: '车辆ID',
                        manufactory: '主机厂',
                        brand: '品牌',
                        series: '系列名',
                        code: '车型代码',
                        model: '车型',
                        styles: '车款',
                        os_kernel: '车辆年份',
                        os_kernel: '显示品牌',
                        os_kernel: '显示车型',
                        head: true
                    }]
                    angular.forEach($scope.table_list.data, function (key, value) {
                        if (item.id == key.id) {
                            item.show = true;
                            angular.forEach(data.data.data.data, function (o, b) {
                                o.head = false;
                                item.children.push(o)
                            })
                        }
                    })
                }
                console.log($scope.table_list.data);
            },
            function () {}
        );
    }
    // 导出
    $scope.export = function () {
        window.open("/assets/accessory-export?id=" + $scope.select_list.id.choose + '&name=' + $scope.select_list.name.choose + '&supplier_name=' + $scope.select_list.supplier_name.choose + '&os_version=' + $scope.select_list.os_version.choose + '&os_kernel=' + $scope.select_list.os_kernel.choose + '&supplier_id=' + $scope.select_list.supplier_id.choose)
    }
    $scope.init();
});
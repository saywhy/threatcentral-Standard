var myApp = angular.module("myApp", []);
myApp.controller("assetsVehicleCtrl", function ($scope, $http, $filter) {
    console.log('11');
    $scope.init = function () {
        $scope.select_list = {
            brand: {
                choose: '',
                show: false,
                list: []
            },
            manufactory: {
                choose: '',
                show: false,
                list: []
            },
            series: {
                choose: '',
                show: false,
                list: []
            },
            model: {
                choose: '',
                show: false,
                list: []
            },
            code: {
                choose: '',
                show: false,
                list: []
            },
            styles: {
                choose: '',
                show: false,
                list: []
            },
        }
        $scope.get_select_list('brand');
        $scope.get_select_list('manufactory');
        $scope.get_select_list('series');
        $scope.get_select_list('code');
        $scope.get_select_list('model');
        $scope.get_select_list('styles');
        $scope.get_page();
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
            url: "/assets/vehicle-filters",
            params: {
                filter: name,
                value: '',
            }
        }).then(
            function (data) {
                // zeroModal.close(loading);
                switch (name) {
                    case 'brand':
                        $scope.select_list.brand.list = data.data.data;
                        break;
                    case 'manufactory':
                        $scope.select_list.manufactory.list = data.data.data;
                        break;
                    case 'series':
                        $scope.select_list.series.list = data.data.data;
                        break;
                    case 'code':
                        $scope.select_list.code.list = data.data.data;
                        break;
                    case 'model':
                        $scope.select_list.model.list = data.data.data;
                        break;
                    case 'styles':
                        $scope.select_list.styles.list = data.data.data;
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
            case 'brand':
                $scope.select_list.brand.show = true;
                break;
            case 'manufactory':
                $scope.select_list.manufactory.show = true;
                break;
            case 'series':
                $scope.select_list.series.show = true;
                break;
            case 'code':
                $scope.select_list.code.show = true;
                break;
            case 'model':
                $scope.select_list.model.show = true;
                break;
            case 'styles':
                $scope.select_list.styles.show = true;
                break;
            default:
                break;
        }

    }
    // 搜索框失去焦点
    $scope.search_blur = function (name) {
        switch (name) {
            case 'brand':
                $scope.select_list.brand.show = false;
                break;
            case 'manufactory':
                $scope.select_list.manufactory.show = false;
                break;
            case 'series':
                $scope.select_list.series.show = false;
                break;
            case 'code':
                $scope.select_list.code.show = false;
                break;
            case 'model':
                $scope.select_list.model.show = false;
                break;
            case 'styles':
                $scope.select_list.styles.show = false;
                break;
            default:
                break;
        }

    }
    // 搜索栏选择
    $scope.search_choose_item = function (data, index, name) {
        switch (name) {
            case 'brand':
                $scope.select_list.brand.choose = data
                break;
            case 'manufactory':
                $scope.select_list.manufactory.choose = data
                break;
            case 'series':
                $scope.select_list.series.choose = data
                break;
            case 'code':
                $scope.select_list.code.choose = data
                break;
            case 'model':
                $scope.select_list.model.choose = data
                break;
            case 'styles':
                $scope.select_list.styles.choose = data
                break;
            default:
                break;
        }
    }
    //    重置
    $scope.reset = function () {
        $scope.select_list.manufactory.choose = '';
        $scope.select_list.brand.choose = '';
        $scope.select_list.series.choose = '';
        $scope.select_list.model.choose = '';
        $scope.select_list.code.choose = '';
        $scope.select_list.styles.choose = '';
    }
    // 获取列表
    $scope.get_page = function () {
        var loading = zeroModal.loading(4);
        $http({
            method: "get",
            url: "/assets/vehicle-assets-list",
            params: {
                brand: '',
                series: '',
                manufactory: '',
                model: '',
                styles: '',
                row: 5,
                page: 1,
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
            url: "/assets/vehicle-accessorys",
            params: {
                vehicle_id: item.vehicle_id
            }
        }).then(
            function (data) {
                console.log(data.data.data.data);
                zeroModal.close(loading);
                if (data.data.status == 'success') {
                    item.children = [];
                    item.children = [{
                        pn_id: 'PN#',
                        name: 'PN名称',
                        supplier_id: '供应商ID',
                        supplier_name: '供应商名称',
                        hardware: '硬件版本',
                        software: '软件版本',
                        os_version: '操作系统版',
                        os_kernel: '操作系统内核',
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
    $scope.init();
});
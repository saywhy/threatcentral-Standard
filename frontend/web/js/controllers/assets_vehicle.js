var myApp = angular.module("myApp", []);
myApp.controller("assetsVehicleCtrl", function ($scope, $http, $filter) {
    console.log('11');
    $scope.init = function () {
        $scope.data = [{
                id: '2001',
                host: '印度名爵',
                brand: 'MG',
                series: 'CN202SR',
                model: 'hector',
                style: 'hectorxx',
                master: true,
                show_index: true,
                master_index: 0,
                show_clild: false,
                class: 'master',
                info: [{
                        index: 0,
                        info_index: 0,
                        show_index: false,
                        ids: 1001,
                        PN: '1v1(导航系统)',
                        Supplier: '航盛',
                        Hardware: 'S02',
                        Software: 'V12.0',
                        OS: 'andiord',
                        branch: true,
                        show: false,
                        class: 'branch',
                    },
                    {
                        index: 0,
                        ids: 111,
                        info_index: 1,
                        show_index: false,
                        PN: '1v1(导航系统)',
                        Supplier: '111',
                        Hardware: '111',
                        Software: '111.0',
                        OS: '1111',
                        branch: true,
                        show: false,
                        class: 'branch',
                    },
                    {
                        index: 0,
                        ids: 111,
                        show_index: false,
                        PN: '1v1(导航系统)',
                        Supplier: '111',
                        Hardware: '111',
                        Software: '111.0',
                        OS: '1111',
                        branch: true,
                        show: false,
                        class: 'branch',
                    },
                ]
            },
            {
                id: '2222',
                host: '22',
                brand: '2222',
                series: '222',
                model: '222',
                style: '2222',
                master: true,
                show_index: true,
                master_index: 1,
                show_clild: false,
                class: 'master',
                info: [{
                        index: 1,
                        ids: 3333,
                        PN: '1v1(33333)',
                        Supplier: '333',
                        Hardware: '33333',
                        Software: '3333',
                        OS: '33333',
                        show_index: false,
                        class: 'branch',
                        branch: true,
                        show: false
                    },
                    {
                        index: 1,
                        ids: 4444,
                        PN: '4444',
                        Supplier: '4444',
                        Hardware: '4444',
                        Software: '44444.0',
                        OS: '4444',
                        branch: true,
                        show: false,
                        show_index: false,
                        class: 'branch',
                    },
                ]
            }
        ]
        angular.forEach($scope.data, function (item) {
            var title = {
                index: item.master_index,
                ids: '配件ID',
                PN: 'PN名称',
                Supplier: '供应商',
                Hardware: '硬件版本',
                Software: '软件版本',
                OS: '操作系统',
                operation: '操作',
                show_index: false,
                class: 'title',
                branch: true,
                show: false
            }
            item.info.unshift(title);
        })
        $scope.new_list = [];
        angular.forEach($scope.data, function (item) {
            $scope.new_list.push(item);
            if (item.info) {
                angular.forEach(item.info, function (key) {
                    $scope.new_list.push(key);
                })
            }

        })
        angular.forEach($scope.new_list, function (item) {
            if (item.master_index && item.master_index % 2 == 0) {
                item.style_bg = {
                    background: '#fff'
                }
            } else if (item.master_index && item.master_index % 2 == 1) {
                item.style_bg = {
                    background: '#eef6ff'
                }
            } else {
                item.style_bg = {}
            }
        })
        console.log($scope.new_list);

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

    $scope.init();
});
var myApp = angular.module("myApp", []);
myApp.controller("EditRoleController", [
    "$scope",
    "$http",
    "$rootScope",
    function ($scope, $http, $rootScope) {
        $scope.init = function () {
            $scope.get_license_version()
        }
        $scope.edit_role = JSON.parse(sessionStorage.getItem("edit_role"));
        $scope.new_edit_role = {
            name: $scope.edit_role.name,
            description: $scope.edit_role.description,
            permissionsList: []
        };
        console.log($scope.edit_role);
        $scope.get_license_version = function () {
            $http.get('/site/license-version').then(function success(rsp) {
                console.log(rsp.data.data.edition);
                if (rsp.data.data.edition == 1) {
                    console.log('1111');
                    $scope.zNodes = [{
                            id: "1",
                            name: "首页",
                            children: [{
                                name: "概览",
                                id: "2"
                            }, ]
                        },
                        {
                            id: "15",
                            name: "情报",
                            children: [{
                                    name: "情报查询",
                                    id: "16"
                                },
                                {
                                    name: "情报提取",
                                    id: "24"
                                },
                                {
                                    name: "情报共享",
                                    id: "29"
                                },
                                {
                                    name: "情报源管理",
                                    id: "46"
                                },
                                {
                                    name: "APT武器库",
                                    id: "50"
                                },
                            ]
                        },
                        {
                            name: "资产",
                            id: "54",
                            children: [{
                                    name: "资产管理",
                                    id: "55"
                                },
                                {
                                    name: "受影响资产",
                                    id: "72"
                                },
                            ]
                        },
                        {
                            name: "预警",
                            id: "77",
                            children: [{
                                    name: "威胁预警",
                                    isSelected: false,
                                    id: "78"
                                },
                                {
                                    name: "漏洞预警",
                                    isSelected: false,
                                    id: "85"
                                },
                                {
                                    name: "暗网预警",
                                    isSelected: false,
                                    id: "90"
                                },
                            ]
                        },
                        {
                            name: "报表",
                            id: "127",
                            children: [{
                                    name: "报表生成",
                                    id: "128"
                                },
                                {
                                    name: "报表发送",
                                    id: "129"
                                }
                            ]
                        },
                        {
                            name: "设置",
                            id: "93",
                            children: [{
                                    name: "网络配置",
                                    id: "94"
                                },
                                {
                                    name: "威胁通知",
                                    id: "97"
                                },
                                {
                                    name: "漏洞关联",
                                    id: "104"
                                },
                                {
                                    name: "集中管理",
                                    id: "130"
                                },
                                {
                                    name: "账号管理",
                                    id: "110"
                                },
                                {
                                    name: "审计日志",
                                    id: "126"
                                },
                                {
                                    name: "SYSLOG配置",
                                    id: "229"
                                },
                                {
                                    name: "情报API",
                                    id: "151"
                                },
                                {
                                    name: "更新",
                                    id: "236"
                                },
                                {
                                    name: "许可证",
                                    id: "223"
                                },
                            ]
                        }
                    ];
                }
                if (rsp.data.data.edition == 2) {
                    $scope.zNodes = [{
                            id: "1",
                            name: "首页",
                            children: [{
                                name: "概览",
                                id: "2"
                            }, ]
                        },
                        {
                            id: "15",
                            name: "情报",
                            children: [{
                                    name: "情报查询",
                                    id: "16"
                                },
                                {
                                    name: "情报提取",
                                    id: "24"
                                },
                                {
                                    name: "情报共享",
                                    id: "29"
                                },
                                {
                                    name: "情报源管理",
                                    id: "46"
                                },
                                {
                                    name: "APT武器库",
                                    id: "50"
                                },
                                {
                                    name: "行业情报",
                                    id: "186"
                                },
                                {
                                    name: "漏洞情报",
                                    id: "187"
                                },
                            ]
                        },
                        {
                            name: "资产",
                            id: "54",
                            children: [{
                                    name: "资产管理",
                                    id: "55"
                                },
                                {
                                    name: "受影响资产",
                                    id: "72"
                                },
                                {
                                    name: "车辆资产",
                                    id: "184"
                                },
                                {
                                    name: "零配件资产",
                                    id: "185"
                                }
                            ]
                        },
                        {
                            name: "预警",
                            id: "77",
                            children: [{
                                    name: "威胁预警",
                                    isSelected: false,
                                    id: "78"
                                },
                                {
                                    name: "漏洞预警",
                                    isSelected: false,
                                    id: "85"
                                },
                                {
                                    name: "暗网预警",
                                    isSelected: false,
                                    id: "90"
                                },
                                {
                                    name: "车联网预警",
                                    isSelected: false,
                                    id: "205"
                                }
                            ]
                        },
                        {
                            name: "报表",
                            id: "127",
                            children: [{
                                    name: "报表生成",
                                    id: "128"
                                },
                                {
                                    name: "报表发送",
                                    id: "129"
                                }
                            ]
                        },
                        {
                            name: "设置",
                            id: "93",
                            children: [{
                                    name: "网络配置",
                                    id: "94"
                                },
                                {
                                    name: "威胁通知",
                                    id: "97"
                                },
                                {
                                    name: "漏洞关联",
                                    id: "104"
                                },
                                {
                                    name: "集中管理",
                                    id: "130"
                                },
                                {
                                    name: "账号管理",
                                    id: "110"
                                },
                                {
                                    name: "审计日志",
                                    id: "126"
                                },
                                {
                                    name: "SYSLOG配置",
                                    id: "229"
                                },
                                {
                                    name: "情报API",
                                    id: "151"
                                },
                                {
                                    name: "更新",
                                    id: "236"
                                },
                                {
                                    name: "许可证",
                                    id: "223"
                                },
                                {
                                    name: "标签管理",
                                    id: "181"
                                },
                                {
                                    name: "行业情报管理",
                                    id: "182"
                                },
                                {
                                    name: "漏洞情报管理",
                                    id: "183"
                                },
                                {
                                    name: "基础情报管理",
                                    id: "209"
                                },
                            ]
                        }
                    ];
                }
                if ($scope.edit_role.permissions_id != "") {
                    angular.forEach($scope.edit_role.permissions_id.split(","), function (
                        item
                    ) {
                        angular.forEach($scope.zNodes, function (item_node) {
                            if (item == item_node.id) {
                                item_node.checked = true;
                            }
                            angular.forEach(item_node.children, function (ele) {
                                if (item == ele.id) {
                                    ele.checked = true;
                                }
                            });
                        });
                    });
                }
                $.fn.zTree.init($("#tree"), $scope.setting, $scope.zNodes);
            }, function err(rsp) {});
        }
        $scope.setting = {
            data: {
                key: {
                    name: "name"
                }
            },
            check: {
                chkboxType: {
                    Y: "ps",
                    N: "ps"
                },
                enable: true
            },
            view: {
                fontCss: {
                    color: "#333333",
                    background: "transparent",
                    border: "none"
                }
            }
        };


        $scope.save = function () {
            if ($scope.new_edit_role.name == "") {
                zeroModal.error("角色名不能为空");
                return false;
            }
            var treeObj = $.fn.zTree.getZTreeObj("tree");
            $scope.tree_nodes = treeObj.getNodes();
            $scope.new_edit_role.permissionsList = [];
            angular.forEach($scope.tree_nodes, function (item) {
                if (item.checked) {
                    $scope.new_edit_role.permissionsList.push(item.id);
                }
                angular.forEach(item.children, function (ele) {
                    if (ele.checked) {
                        $scope.new_edit_role.permissionsList.push(ele.id);
                    }
                });
            });
            console.log($scope.new_edit_role.permissionsList);
            var loading = zeroModal.loading(4);
            var post_data = {
                id: $scope.edit_role.id,
                old_name: $scope.edit_role.name,
                name: $scope.new_edit_role.name,
                description: $scope.new_edit_role.description,
                permissions_id: $scope.new_edit_role.permissionsList.join(",")
            };
            console.log(post_data);
            $http.post("/user/edit-role", post_data).then(
                function success(data) {
                    console.log(data);
                    if (data.data.status == "success") {
                        zeroModal.close(loading);
                        // 添加成功，更新角色列表
                        zeroModal.success("修改角色成功");
                        window.location.href = "/seting/user";
                    } else if (data.status == 600) {
                        console.log(data.msg);
                    } else {
                        zeroModal.error(data.data.errorMessage);
                    }
                },
                function err(data) {}
            );
        };
        // 取消
        $scope.cancel = function () {
            window.location.href = "/seting/user";
        };
        $scope.init()
    }
]);
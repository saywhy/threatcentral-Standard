var myApp = angular.module("asideApp", []);

myApp.controller("asideCtrl", function($scope,$http) {

    $scope.indexCode = 0;
    $scope.alertDetail = false;
    $scope.menu_aside = {
        site: {
            system: true,
            vehicle: false
        },
        search: {
            system: true,
            vehicle: false
        },
        assets: {
            system: true,
            vehicle: false
        },
        alert: {
            system: true,
            vehicle: false
        },
        report: {
            system: true,
            vehicle: false
        },
        seting: {
            system: true,
            vehicle: false
        }
    };

    $scope.menu_list = {
        //   首页
        index: false,
        index_overview: false,
        index_BigScreen: false,
        // 情报
        intelligence: false,
        intelligence_query: false,
        intelligence_extract: false,
        intelligence_share: false,
        intelligence_sourceAdmin: false,
        intelligence_apt: false,
        // 资产
        assets: false,
        assets_admin: false,
        assets_risk: false,
        // 预警
        warning: false,
        warning_threat: false,
        warning_loophole: false,
        warning_drakNet: false,
        // 报表
        report: false,
        report_creat: false,
        report_send: false,
        // 设置
        set: false,
        set_sys: false,
        set_notice: false,
        set_loopholeRelation: false,
        set_admin: false,
        set_user: false,
        set_log: false,
        api: false
    };

    $scope.getProjectName = function(){

        //获取主机地址之后的目录
        var pathName = window.document.location.pathname;

        console.log(pathName)

        if(pathName === '/alert/detail' || pathName === '/alert/loophole-detail'
        || pathName === '/alert/darknet-detail'){
            $scope.alertDetail = true;
            return false;
        }else {
            $scope.alertDetail = false;
        }
        var projectName = pathName.substring(1, pathName.substr(1).indexOf('/')+1);
        return projectName;
    }

    $scope.init_code = function(){

        let names = $scope.getProjectName();
        if(names === 'site' || names == null || names== '/'){
            $scope.indexCode = 0;
        }else if(names === 'search' || names === 'agent' || names === 'share' || names === 'intelligence'){
            $scope.indexCode = 1;
        }else if(names === 'assets'){
            $scope.indexCode = 2;
        }else if(names === 'alert'){
            $scope.indexCode = 3;
        }else if(names === 'report'){
            $scope.indexCode = 4;
        }else if(names === 'seting' || names === 'api'){
            $scope.indexCode = 5;
        }
    }

    $scope.get_menu = function() {
        $http.get("/site/menu").then(
            function success(data) {
                if (data.data.status == "success") {
                    angular.forEach(data.data.data, function(item) {
                        // 首页
                        if (item.permissions_id == "1") {
                            $scope.menu_list.index = true;
                            angular.forEach(item.child_menu, function(child) {
                                if (child.permissions_id == "2") {
                                    $scope.menu_list.index_overview = true;
                                }
                                if (child.permissions_id == "14") {
                                    $scope.menu_list.index_BigScreen = true;
                                }
                            });
                        }
                        // 情报
                        if (item.permissions_id == "15") {
                            $scope.menu_list.intelligence = true;
                            angular.forEach(item.child_menu, function(child) {
                                if (child.permissions_id == "16") {
                                    $scope.menu_list.intelligence_query = true;
                                }
                                if (child.permissions_id == "24") {
                                    $scope.menu_list.intelligence_extract = true;
                                }
                                if (child.permissions_id == "29") {
                                    $scope.menu_list.intelligence_share = true;
                                }
                                if (child.permissions_id == "46") {
                                    $scope.menu_list.intelligence_sourceAdmin = true;
                                }
                                if (child.permissions_id == "50") {
                                    $scope.menu_list.intelligence_apt = true;
                                }
                            });
                        }
                        // 资产
                        if (item.permissions_id == "54") {
                            $scope.menu_list.assets = true;
                            angular.forEach(item.child_menu, function(child) {
                                if (child.permissions_id == "55") {
                                    $scope.menu_list.assets_admin = true;
                                }
                                if (child.permissions_id == "72") {
                                    $scope.menu_list.assets_risk = true;
                                }
                            });
                        }
                        // 预警
                        if (item.permissions_id == "77") {
                            $scope.menu_list.warning = true;
                            angular.forEach(item.child_menu, function(child) {
                                if (child.permissions_id == "78") {
                                    $scope.menu_list.warning_threat = true;
                                }
                                if (child.permissions_id == "85") {
                                    $scope.menu_list.warning_loophole = true;
                                }
                                if (child.permissions_id == "90") {
                                    $scope.menu_list.warning_drakNet = true;
                                }
                            });
                        }
                        // 报表
                        if (item.permissions_id == "127") {
                            $scope.menu_list.report = true;
                            angular.forEach(item.child_menu, function(child) {
                                if (child.permissions_id == "128") {
                                    $scope.menu_list.report_creat = true;
                                }
                                if (child.permissions_id == "129") {
                                    $scope.menu_list.report_send = true;
                                }
                            });
                        }
                        // 设置
                        if (item.permissions_id == "93") {
                            $scope.menu_list.set = true;
                            angular.forEach(item.child_menu, function(child) {
                                if (child.permissions_id == "94") {
                                    $scope.menu_list.set_sys = true;
                                }
                                if (child.permissions_id == "97") {
                                    $scope.menu_list.set_notice = true;
                                }
                                if (child.permissions_id == "104") {
                                    $scope.menu_list.set_loopholeRelation = true;
                                }
                                if (child.permissions_id == "130") {
                                    $scope.menu_list.set_admin = true;
                                }
                                if (child.permissions_id == "110") {
                                    $scope.menu_list.set_user = true;
                                }
                                if (child.permissions_id == "126") {
                                    $scope.menu_list.set_log = true;
                                }
                                if (child.permissions_id == "151") {
                                    $scope.menu_list.api = true;
                                }
                            });
                        }
                    });
                }
            },
            function err(rsp) {}
        );
    };

    $scope.init = function() {

        //左侧栏显示判定
        $scope.init_code();
        //左侧栏权限设置
        $scope.get_menu();


    };

    $scope.init();

});


angular.element(document).ready(function() {
    angular.bootstrap(document.getElementById("asideApp"), ['asideApp']);
});

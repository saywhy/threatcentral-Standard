var myApp = angular.module("asideApp", []);

myApp.controller("asideCtrl", function($scope,$http) {

    $scope.indexCode = 0;
    $scope.alertDetail = false;
    $scope.menu_aside = {
        site: {
            system: false,
            vehicle: false
        },
        search: {
            system: false,
            vehicle: false
        },
        assets: {
            system: false,
            vehicle: false
        },
        alert: {
            system: false,
            vehicle: false
        },
        report: {
            system: false,
            vehicle: false
        },
        seting: {
            system: false,
            vehicle: false,
            manage:{
                set: false
            }
        }
    };
    $scope.menu_list = {
        //首页
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

    $scope.get_status = function(){
        var name = window.document.location.pathname;

        switch (name) {
            case '':
            case '/':
            case '/site/index':
            case '/map.html':
                $scope.menu_aside.site.system = true;
                break;
            case '/search/index':
            case '/agent/index':
            case '/share/index':
            case '/intelligence/source-management':
            case '/search/apt-lib':
                $scope.menu_aside.search.system = true;
                break;
            case '/vehicleintelligence/special':
            case '/vehicleintelligence/loophole':
                $scope.menu_aside.search.vehicle = true;
                break;

            case '/assets/asset-management':
            case '/assets/asset-risky':
                $scope.menu_aside.assets.system = true;
                break;
            case '/assets/vehicle':
            case '/assets/accessory':
                $scope.menu_aside.assets.vehicle = true;
                break;

            case '/alert/index':
            case '/alert/loophole':
            case '/alert/darknet':
                $scope.menu_aside.alert.system = true;
                break;

            case '/report/index':
            case '/report/send':
                $scope.menu_aside.report.system = true;
                break;
            /*配置*/
            case '/seting/network':
            case '/seting/systemnotice':
            case '/seting/custom-information-search':
            case '/seting/centralmanager':
            case '/seting/user':
            case '/seting/log':
            case '/api/index':
                $scope.menu_aside.seting.system = true;
                break;
            case '/seting/label-manage':
                $scope.menu_aside.seting.vehicle = true;
                break;
            case '/seting/special-intelligence':
            case '/seting/loophole-intelligence':
                $scope.menu_aside.seting.vehicle = true;
                $scope.menu_aside.seting.manage.set = true;
                break;
        }
    }

    $scope.init_code = function(){

        //获取主机地址之后的目录
        var pathName = window.document.location.pathname;

        //预警详情去掉侧边栏
        if(pathName === '/alert/detail' || pathName === '/alert/loophole-detail'
            || pathName === '/alert/darknet-detail'){
            $scope.alertDetail = true;
            return false;
        }else {
            $scope.alertDetail = false;
        }
        var names = pathName.substring(1, pathName.substr(1).indexOf('/')+1);

        if(names === 'site' || names == null || names== '/'){
            $scope.indexCode = 0;
        }else if(names === 'search' || names === 'agent' || names === 'share'
            || names === 'intelligence'|| names === 'vehicleintelligence'){
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

        //左侧栏显示设置
        $scope.init_code();
        //左侧栏权限设置
        $scope.get_menu();
        //左侧栏状态
        $scope.get_status();

    };

    $scope.init();

});

angular.element(document).ready(function() {
    angular.bootstrap(document.getElementById("asideApp"), ['asideApp']);
});

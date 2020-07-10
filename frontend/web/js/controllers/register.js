var myApp = angular.module("myApp", []);
myApp.controller("registerCtrl", function ($scope, $http, $filter, $sce) {
    $scope.init = function () {
        $scope.user = {
            username: "",
            password: "",
            repassword: "",
        };
        $scope.success_code = false;
        $scope.errorMessage = {
            username: "",
            password: "",
            repassword: "",
        };
        sessionStorage.setItem("tab_active", "true");
        document.onkeydown = function (e) {
            // 兼容FF和IE和Opera
            var theEvent = e || window.event;
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            if (code == 13) {
                //回车执行查询
                console.log(13);
                $scope.$apply(function () {
                    if ($scope.user.username == "") {
                        $scope.errorMessage.username = "用户名不能为空";
                    } else if ($scope.user.password == "") {
                        $scope.errorMessage.password = "密码不能为空";
                    } else if ($scope.user.repassword != $scope.user.password) {
                        $scope.errorMessage.repassword = "两次密码输入不一致";
                    } else {
                        $scope.login_in();
                    }
                });
            }
        };
    };

    $scope.login_in = function () {
        if ($scope.user.username == "") {
            $scope.errorMessage.username = "用户名不能为空";
            return false
        }
        if ($scope.user.password == "") {
            $scope.errorMessage.password = "密码不能为空";
            return false
        }
        if ($scope.user.repassword != $scope.user.password) {
            $scope.errorMessage.repassword = "两次密码输入不一致";
            return false
        }
        $http({
            method: "POST",
            url: "/site/signin",
            data: {
                LoginForm: {
                    username: $scope.user.username,
                    password: $scope.user.password,
                    repassword: $scope.user.repassword
                },
                "login-button": ""
            }
        }).then(
            function successCallback(data) {
                console.log(data);
                if (data.data.status_code == "202") {
                    $http.get('/site/menu').then(function (resp) {
                        let permission = resp.data;
                        localStorage.removeItem('permission_id');
                        if (permission.status == "success") {
                            let per_id = [];
                            angular.forEach(permission.data, function (item) {
                                per_id.push(item.permissions_id);
                                if (item.child_menu && item.child_menu.length > 0) {
                                    angular.forEach(item.child_menu, function (itm) {
                                        per_id.push(itm.permissions_id);
                                    })
                                }
                            });
                            localStorage.setItem("pemission_id", JSON.stringify(per_id));
                            window.location.href = "/site/index";
                            // if (per_id.includes('1')) {
                            //     if (per_id.includes('2')) {
                            //         window.location.href = "/site/index";
                            //     } else if (per_id.includes('14')) {
                            //         window.location.href = "/map.html";
                            //     }
                            // } else if (per_id.includes('15')) {
                            //     if (per_id.includes('16')) {
                            //         window.location.href = "/search/index";
                            //     } else if (per_id.includes('24')) {
                            //         window.location.href = "/agent/index";
                            //     } else if (per_id.includes('29')) {
                            //         window.location.href = "/share/index";
                            //     } else if (per_id.includes('46')) {
                            //         window.location.href = "/intelligence/source-management";
                            //     } else if (per_id.includes('50')) {
                            //         window.location.href = "/search/apt-lib";
                            //     } else if (per_id.includes('186')) {
                            //         window.location.href = "/vehicleintelligence/special";
                            //     } else if (per_id.includes('187')) {
                            //         window.location.href = "/vehicleintelligence/loophole";
                            //     }
                            // } else if (per_id.includes('54')) {
                            //     if (per_id.includes('55')) {
                            //         window.location.href = "/assets/asset-management";
                            //     } else if (per_id.includes('72')) {
                            //         window.location.href = "/assets/asset-risky";
                            //     } else if (per_id.includes('184')) {
                            //         window.location.href = "/assets/vehicle";
                            //     } else if (per_id.includes('185')) {
                            //         window.location.href = "/assets/accessory";
                            //     }
                            // } else if (per_id.includes('77')) {
                            //     if (per_id.includes('78')) {
                            //         window.location.href = "/alert/index";
                            //     } else if (per_id.includes('85')) {
                            //         window.location.href = "/alert/loophole";
                            //     } else if (per_id.includes('90')) {
                            //         window.location.href = "/alert/darknet";
                            //     } else if (per_id.includes('205')) {
                            //         window.location.href = "/vehiclealert/index";
                            //     }
                            // } else if (per_id.includes('127')) {
                            //     if (per_id.includes('128')) {
                            //         window.location.href = "/report/index";
                            //     } else if (per_id.includes('129')) {
                            //         window.location.href = "/report/send";
                            //     }
                            // } else if (per_id.includes('93')) {
                            //     if (per_id.includes('94')) {
                            //         window.location.href = "/seting/network";
                            //     } else if (per_id.includes('97')) {
                            //         window.location.href = "/seting/systemnotice";
                            //     } else if (per_id.includes('104')) {
                            //         window.location.href = "/seting/custom-information-search";
                            //     } else if (per_id.includes('110')) {
                            //         window.location.href = "/seting/user";
                            //     } else if (per_id.includes('126')) {
                            //         window.location.href = "/seting/log";
                            //     } else if (per_id.includes('229')) {
                            //         window.location.href = "/seting/syslog";
                            //     } else if (per_id.includes('130')) {
                            //         window.location.href = "/seting/centralmanager";
                            //     } else if (per_id.includes('223')) {
                            //         window.location.href = "/seting/license";
                            //     } else if (per_id.includes('151')) {
                            //         window.location.href = "/api/index";
                            //     } else if (per_id.includes('181')) {
                            //         window.location.href = "/seting/label-manage";
                            //     } else if (per_id.includes('182')) {
                            //         window.location.href = "/seting/special-intelligence";
                            //     } else if (per_id.includes('183')) {
                            //         window.location.href = "/seting/loophole-intelligence";
                            //     } else if (per_id.includes('209')) {
                            //         window.location.href = "/seting/base-intelligence";
                            //     }
                            // }
                        }
                    })
                }
                if (data.data.status_code == "1") {
                    if (data.data.errorMessage.username) {
                        $scope.errorMessage.username = data.data.errorMessage.username[0];
                    }
                    if (data.data.errorMessage.allow_ip) {
                        $scope.errorMessage.username = data.data.errorMessage.allow_ip[0];
                    }
                    if (data.data.errorMessage.password) {
                        $scope.errorMessage.password = data.data.errorMessage.password[0];
                    }
                    if (data.data.errorMessage.repassword) {
                        $scope.errorMessage.repassword = data.data.errorMessage.repassword[0];
                    }
                }
            },
            function errorCallback(data) {}
        );
    };
    $scope.username_focus = function () {
        $scope.errorMessage.username = "";
    };
    $scope.password_focus = function () {
        $scope.errorMessage.password = "";
    };
    $scope.repassword_focus = function () {
        $scope.errorMessage.repassword = "";
    };

    $scope.init();
});
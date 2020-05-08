var myApp = angular.module("myApp", []);
var rootScope;
myApp.controller("shareCtrl", function ($scope, $http, $filter) {
    $scope.init = function () {
        $scope.listObj = {};
        $scope.list = [];
        $scope.listCount = 0;
        $scope.offset = 1;
        $scope.limit = 5;
        $scope.btn_show = true;
        $scope.btn_text = "加载更多";
        $scope.wds = [];
        $scope.searchWd = "";
        $scope.get_list();
    };
    $scope.push2list = function (item) {
        if (!$scope.listObj[item.id]) {
            item.timeString = moment(item.created_at, "X").fromNow();
            $scope.list.push(item);
            $scope.listObj[item.id] = item;
        }
    };
    $scope.search = function () {
        $scope.wds = $scope.searchWd.split(/\s+/);
        $scope.listObj = {};
        $scope.list = [];
        $scope.listCount = 0;
        $scope.get_list();
    };
    $scope.get_list = function () {
        var postData = {
             limit: $scope.limit,
             offSet: $scope.offset
        };
        $http.post("/share/list", postData).then(
            function success(rsp) {
                console.log('*****')
                console.log(rsp);
                if ($scope.offset * $scope.limit >= rsp.data.count) {
                    $scope.btn_show = false;
                    //$scope.btn_text = "加载完成";
                }

                if (rsp.data.status == "success") {
                    $scope.listCount = rsp.data.count;
                    angular.forEach(rsp.data.data, function (item) {
                        $scope.push2list(item);
                    });
                }
            },
            function err(rsp) {}
        );
    };

    $scope.add_more = function () {
       // console.log($scope.list);
        $scope.offset += 1;
        $scope.get_list();
    };
    //   共享情报提交
    $scope.add = function (item) {
        window.location.href = "/share/add";
    };
    $scope.detail = function (item) {
        window.location.href = "/share/detail?id=" + item.id;
    };
    // 跳转评论详情
    $scope.goto_comment = function (item) {
        sessionStorage.setItem("share_comment", JSON.stringify(item));
        window.location.href = "/share/comment-detail";
    };
    $scope.del = function (item, index) {
        zeroModal.confirm({
            content: "确定删除这个分享吗？",
            okFn: function () {
                var postData = {
                    id: item.id,
                    wds: $scope.wds
                };
                var loading = zeroModal.loading(4);
                $http.post("/share/del", postData).then(
                    function success(rsp) {
                        console.log(rsp);
                        if (rsp.data.status == "success") {
                            $scope.list.splice(index, 1);
                            delete $scope.listObj["" + item.id];
                        }
                        zeroModal.close(loading);
                    },
                    function err(rsp) {
                        zeroModal.close(loading);
                    }
                );
            },
            cancelFn: function () {}
        });
    };

    $scope.init();
});

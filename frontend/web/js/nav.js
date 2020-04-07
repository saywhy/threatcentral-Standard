var rootScope;
var navApp = angular.module("navApp", []);
navApp.controller("mainNavCtrl", function($scope, $rootScope, $http, $filter,$timeout) {
  $scope.init = function() {
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
    $scope.get_menu();
  };


  // 接口调用
 /* $scope.getPermiss = function () {
    return $http.get('/site/menu');
  }
  $scope.get_menu = async function() {

    let str = window.localStorage.permission;

    var permission = '';

    if(str != undefined){
      permission = JSON.parse(str);
    }else {
      permission = await $scope.getPermiss().then(function (resp) {

        let locale = window.localStorage;
        let permission = JSON.stringify(resp.data);
        locale.permission = permission;

        return resp.data;
      });
    }

    $timeout(function () {
      if (permission.status == "success") {
        angular.forEach(permission.data, function(item) {
          // 首页
          if (item.permissions_id == "1") {
            $scope.menu_list.index = true;
            /!*angular.forEach(item.child_menu, function(child) {
              if (child.permissions_id == "2") {
                $scope.menu_list.index_overview = true;
              }
              if (child.permissions_id == "14") {
                $scope.menu_list.index_BigScreen = true;
              }
            });*!/
          }
          // 情报
          if (item.permissions_id == "15") {
            $scope.menu_list.intelligence = true;
            /!*angular.forEach(item.child_menu, function(child) {
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
            });*!/
          }
          // 资产
          if (item.permissions_id == "54") {
            $scope.menu_list.assets = true;
            /!* angular.forEach(item.child_menu, function(child) {
               if (child.permissions_id == "55") {
                 $scope.menu_list.assets_admin = true;
               }
               if (child.permissions_id == "72") {
                 $scope.menu_list.assets_risk = true;
               }
             });*!/
          }
          // 预警
          if (item.permissions_id == "77") {
            $scope.menu_list.warning = true;
            /!*angular.forEach(item.child_menu, function(child) {
              if (child.permissions_id == "78") {
                $scope.menu_list.warning_threat = true;
              }
              if (child.permissions_id == "85") {
                $scope.menu_list.warning_loophole = true;
              }
              if (child.permissions_id == "90") {
                $scope.menu_list.warning_drakNet = true;
              }
            });*!/
          }
          // 报表
          if (item.permissions_id == "127") {
            $scope.menu_list.report = true;
            /!*angular.forEach(item.child_menu, function(child) {
              if (child.permissions_id == "128") {
                $scope.menu_list.report_creat = true;
              }
              if (child.permissions_id == "129") {
                $scope.menu_list.report_send = true;
              }
            });*!/
          }
          // 设置
          if (item.permissions_id == "93") {
            $scope.menu_list.set = true;
            /!* angular.forEach(item.child_menu, function(child) {
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
             });*!/
          }
        });
      }
    },100)

  };*/

  $scope.get_menu = function() {

    let per_id = JSON.parse(localStorage.getItem('pemission_id'));

    if(per_id.includes('1')){
      $scope.menu_list.index = true;
    }
    if(per_id.includes('15')){
      $scope.menu_list.intelligence = true;
    }
    if(per_id.includes('54')){
      $scope.menu_list.assets = true;
    }
    if(per_id.includes('77')){
      $scope.menu_list.warning = true;
    }
    if(per_id.includes('127')){
      $scope.menu_list.report = true;
    }
    if(per_id.includes('93')){
      $scope.menu_list.set = true;
    }
  };


  $scope.get_Path = function(p_id){
    let per_id = JSON.parse(localStorage.getItem('pemission_id'));
    if(p_id == '1'){
      if(per_id.includes('2')){
        window.location.href = "/site/index";
      }else if(per_id.includes('14')){
        window.location.href = "/map.html";
      }
    }else if(p_id == '15'){
      if(per_id.includes('16')){
        window.location.href = "/search/index";
      }else if(per_id.includes('24')){
        window.location.href = "/agent/index";
      }else if(per_id.includes('29')){
        window.location.href = "/share/index";
      }else if(per_id.includes('46')){
        window.location.href = "/intelligence/source-management";
      }else if(per_id.includes('50')){
        window.location.href = "/search/apt-lib";
      }else if(per_id.includes('186')){
        window.location.href = "/vehicleintelligence/special";
      }else if(per_id.includes('187')){
        window.location.href = "/vehicleintelligence/loophole";
      }
    }else if(p_id == '54'){
      if(per_id.includes('55')){
        window.location.href = "/assets/asset-management";
      }else if(per_id.includes('72')){
        window.location.href = "/assets/asset-risky";
      }else if(per_id.includes('184')){
        window.location.href = "/assets/vehicle";
      }else if(per_id.includes('185')){
        window.location.href = "/assets/accessory";
      }
    }else if(p_id == '77'){
      if(per_id.includes('78')){
        window.location.href = "/alert/index";
      }else if(per_id.includes('85')){
        window.location.href = "/alert/loophole";
      }else if(per_id.includes('90')){
        window.location.href = "/alert/darknet";
      }else if(per_id.includes('205')){
        window.location.href = "/vehiclealert/index";
      }
    }else if(p_id == '127'){
      if(per_id.includes('128')){
        window.location.href = "/report/index";
      }else if(per_id.includes('129')){
        window.location.href = "/report/send";
      }
    }else if(p_id == '93'){
      if(per_id.includes('94')){
        window.location.href = "/seting/network";
      }else if(per_id.includes('97')){
        window.location.href = "/seting/systemnotice";
      }else if(per_id.includes('104')){
        window.location.href = "/seting/custom-information-search";
      }else if(per_id.includes('110')){
        window.location.href = "/seting/user";
      }else if(per_id.includes('126')){
        window.location.href = "/seting/log";
      }else if(per_id.includes('130')){
        window.location.href = "/seting/centralmanager";
      }else if(per_id.includes('151')){
        window.location.href = "/api/index";
      } else if(per_id.includes('181')){
        window.location.href = "/seting/label-manage";
      }else if(per_id.includes('182')){
        window.location.href = "/seting/special-intelligence";
      }else if(per_id.includes('183')){
        window.location.href = "/seting/loophole-intelligence";
      }else if(per_id.includes('209')){
        window.location.href = "/seting/base-intelligence";
      }
    }
  }

  $scope.init();
});



angular.element(document).ready(function() {
  angular.bootstrap(document.getElementById("navApp"), ["navApp"]);
});

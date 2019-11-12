<?php
/* @var $this yii\web\View */
$this->title = '零配件资产';
?>
<link rel="stylesheet" href="/css/assets/accessory.css">
<section class="assets_accessory_container" ng-app="myApp" ng-controller="assetsAccessoryCtrl" ng-cloak>
    <div class="assets_special">
        <div class="assets_box_top">

            <!-- PNID -->
            <select class="accessory_search_input source_input" ng-model="acc_data.id"
              ng-options="x.num as x.status for x in accssory.PN_ID">
            </select>

            <!-- PN名称 -->
            <select class="accessory_search_input source_input" ng-model="acc_data.name"
              ng-options="x.num as x.status for x in accssory.PN_NAME">
            </select>

            <!-- 供应商 -->
            <select class="accessory_search_input source_input" ng-model="acc_data.sup"
              ng-options="x.num as x.status for x in accssory.PN_SUP">
            </select>

            <!-- 操作系统 -->
            <select class="accessory_search_input source_input" ng-model="acc_data.sys"
              ng-options="x.num as x.status for x in accssory.PN_SYS">
            </select>

            <!-- 操作系统内核 -->
            <select class="accessory_search_input source_input" ng-model="acc_data.core"
              ng-options="x.num as x.status for x in accssory.PN_CORE">
            </select>

            <!-- 供应商ID -->
            <select class="accessory_search_input source_input" ng-model="acc_data.sup_id"
              ng-options="x.num as x.status for x in accssory.PN_SUP_ID">
            </select>

            <!-- 筛选 -->
            <button class="button_search" ng-click="get_page()" ng-keyup="label_keyup($event)">搜索</button>

            <!-- 重置 -->
            <button class="button_search" ng-click="get_page()" ng-keyup="label_keyup($event)">搜索</button>
       </div>

    </div>
</section>
<script src="/js/controllers/assets_accessory.js"></script>

<?php
/* @var $this yii\web\View */
$this->title = '零配件资产';
?>
<link rel="stylesheet" href="/css/assets/accessory.css">
<section class="assets_vehicle_container" ng-app="myApp" ng-controller="assetsAccessoryCtrl" ng-cloak>
    <div class="assets_vehicle">
        <div class="search_box">
            <!-- id -PNID -->
            <div class="search_input_box">
                <img src="/images/set/label_triangle_down.png" class="select_down_icon" alt="">
                <input type="text" placeholder="PN ID" ng-model="select_list.id.choose" ng-focus="search_focus('id')"
                    ng-blur="search_blur('id');" class="search_input" readonly>
                <ul class="select_list_box" ng-if="select_list.id.show" style="height:107px;margin:0">
                    <li ng-mousedown="search_choose_item(item,$index,'id');"
                        ng-repeat="item in select_list.id.list track by $index">
                        {{item}}
                    </li>
                </ul>
            </div>
            <!-- name -PN名称 -->
            <div class="search_input_box">
                <img src="/images/set/label_triangle_down.png" class="select_down_icon" alt="">
                <input type="text" placeholder="PN名称" ng-model="select_list.name.choose" ng-focus="search_focus('name')"
                    ng-blur="search_blur('name');" class="search_input" readonly>
                <ul class="select_list_box" ng-if="select_list.name.show" style="height:107px;margin:0">
                    <li ng-mousedown="search_choose_item(item,$index,'name');"
                        ng-repeat="item in select_list.name.list track by $index">
                        {{item}}
                    </li>
                </ul>
            </div>
            <!-- supplier_name - 供应商 -->
            <div class="search_input_box">
                <img src="/images/set/label_triangle_down.png" class="select_down_icon" alt="">
                <input type="text" placeholder="供应商" ng-model="select_list.supplier_name.choose"
                    ng-focus="search_focus('supplier_name')" ng-blur="search_blur('supplier_name');"
                    class="search_input" readonly>
                <ul class="select_list_box" ng-if="select_list.supplier_name.show" style="height:107px;margin:0">
                    <li ng-mousedown="search_choose_item(item,$index,'supplier_name');"
                        ng-repeat="item in select_list.supplier_name.list track by $index">
                        {{item}}
                    </li>
                </ul>
            </div>
            <!-- os_version - 操作系统 -->
            <div class="search_input_box">
                <img src="/images/set/label_triangle_down.png" class="select_down_icon" alt="">
                <input type="text" placeholder="操作系统" ng-model="select_list.os_version.choose"
                    ng-focus="search_focus('os_version')" ng-blur="search_blur('os_version');" class="search_input"
                    readonly>
                <ul class="select_list_box" ng-if="select_list.os_version.show" style="height:107px;margin:0">
                    <li ng-mousedown="search_choose_item(item,$index,'os_version');"
                        ng-repeat="item in select_list.os_version.list track by $index">
                        {{item}}
                    </li>
                </ul>
            </div>
            <!-- os_kernel - 操作系统内核 -->
            <div class="search_input_box">
                <img src="/images/set/label_triangle_down.png" class="select_down_icon" alt="">
                <input type="text" placeholder="操作系统内核" ng-model="select_list.os_kernel.choose"
                    ng-focus="search_focus('os_kernel')" ng-blur="search_blur('os_kernel');" class="search_input"
                    readonly>
                <ul class="select_list_box" ng-if="select_list.os_kernel.show" style="height:107px;margin:0">
                    <li ng-mousedown="search_choose_item(item,$index,'os_kernel');"
                        ng-repeat="item in select_list.os_kernel.list track by $index">
                        {{item}}
                    </li>
                </ul>
            </div>
            <!-- supplier_id - 供应商ID -->
            <div class="search_input_box">
                <img src="/images/set/label_triangle_down.png" class="select_down_icon" alt="">
                <input type="text" placeholder="供应商ID" ng-model="select_list.supplier_id.choose"
                    ng-focus="search_focus('supplier_id')" ng-blur="search_blur('supplier_id');" class="search_input"
                    readonly>
                <ul class="select_list_box" ng-if="select_list.supplier_id.show" style="height:107px;margin:0">
                    <li ng-mousedown="search_choose_item(item,$index,'supplier_id');"
                        ng-repeat="item in select_list.supplier_id.list track by $index">
                        {{item}}
                    </li>
                </ul>
            </div>
            <button class="btn_i" ng-click="get_page()">查询</button>
            <button class="btn_o" ng-click="reset()">重置</button>
            <button class="btn_o" ng-click="export()">导出</button>
        </div>
        <div class="t_box">
            <ul class="t_head">
                <li class="t_head_frist"></li>
                <li class="t_head_flex">PN ID</li>
                <li class="" style="width:200px;">PN名称</li>
                <li class="t_head_flex">供应商名称</li>
                <li class="t_head_flex">硬件版本</li>
                <li class="t_head_flex">软件版本</li>
                <li class="t_head_flex">操作系统名称</li>
                <li class="t_head_flex"></li>
            </ul>
            <div class="t_body" ng-repeat="item in table_list.data">
                <ul>
                    <li class="main" ng-click="detail(item)" ng-class="$index%2==0?'':'background_odd' ">
                        <span class="t_head_frist">
                            <img src="/images/assets/label_right.png" class="label_right" ng-if="!item.show" alt="">
                            <img src="/images/assets/label_down.png" class="label_right" ng-if="item.show" alt="">
                        </span>
                        <span class="t_head_flex"> {{item.id}}</span>
                        <span class="" style="width:200px;"> {{item.name}}</span>
                        <span class="t_head_flex"> {{item.supplier_name}}</span>
                        <span class="t_head_flex"> {{item.hardware}}</span>
                        <span class="t_head_flex"> {{item.software}}</span>
                        <span class="t_head_flex"> {{item.os_version}}</span>
                        <span class="t_head_flex"></span>
                    </li>
                    <div class="children_box">
                        <li class="children" ng-repeat="key in item.children" ng-class="key.head?'children_head':''"
                            ng-show='item.show'>
                            <span class="t_head_frist"></span>
                            <span class="t_head_flex"> {{key.vehicle_id}}</span>
                            <span class="" style="width:200px;"> {{key.manufactory}}</span>
                            <span class="t_head_flex"> {{key.brand}}</span>
                            <span class="t_head_flex"> {{key.series}}</span>
                            <span class="t_head_flex"> {{key.code}}</span>
                            <span class="t_head_flex"> {{key.model}}</span>
                            <span class="t_head_flex"> {{key.styles}}</span>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
        <div style="padding: 20px;min-height: 20px;">
            <em style="font-size: 14px;color: #BBBBBB;">共有
                <span>{{table_list.count}}</span>条结果</em>
            <ul class="pagination pagination-sm no-margin pull-right ng-cloak">
                <li>
                    <a href="javascript:void(0);" ng-click="get_page(table_list.pageNow-1)"
                        ng-if="table_list.pageNow>1">上一页</a>
                </li>
                <li>
                    <a href="javascript:void(0);" ng-click="get_page(1)" ng-if="table_list.pageNow>1">1</a>
                </li>
                <li>
                    <a href="javascript:void(0);" ng-if="table_list.pageNow>4">...</a>
                </li>
                <li>
                    <a href="javascript:void(0);" ng-click="get_page(table_list.pageNow-2)"
                        ng-bind="table_list.pageNow-2" ng-if="table_list.pageNow>3"></a>
                </li>
                <li>
                    <a href="javascript:void(0);" ng-click="get_page(table_list.pageNow-1)"
                        ng-bind="table_list.pageNow-1" ng-if="table_list.pageNow>2"></a>
                </li>
                <li class="active">
                    <a href="javascript:void(0);" ng-bind="table_list.pageNow"></a>
                </li>
                <li>
                    <a href="javascript:void(0);" ng-click="get_page(table_list.pageNow+1)"
                        ng-bind="table_list.pageNow+1" ng-if="table_list.pageNow<table_list.maxPage-1"></a>
                </li>
                <li>
                    <a href="javascript:void(0);" ng-click="get_page(table_list.pageNow+2)"
                        ng-bind="table_list.pageNow+2" ng-if="table_list.pageNow<table_list.maxPage-2"></a>
                </li>
                <li>
                    <a href="javascript:void(0);" ng-if="table_list.pageNow<table_list.maxPage-3">...</a>
                </li>
                <li>
                    <a href="javascript:void(0);" ng-click="get_page(table_list.maxPage)" ng-bind="table_list.maxPage"
                        ng-if="table_list.pageNow<table_list.maxPage"></a>
                </li>
                <li>
                    <a href="javascript:void(0);" ng-click="get_page(table_list.pageNow+1)"
                        ng-if="table_list.pageNow<table_list.maxPage">下一页</a>
                </li>
            </ul>
        </div>
    </div>

</section>
<script src="/js/controllers/assets_accessory.js"></script>

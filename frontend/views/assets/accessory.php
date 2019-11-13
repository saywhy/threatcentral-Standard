<?php
/* @var $this yii\web\View */
$this->title = '零配件资产';
?>
<link rel="stylesheet" href="/css/assets/accessory.css">
<section class="assets_accessory_container" ng-app="myApp" ng-controller="assetsAccessoryCtrl" ng-cloak>
    <div class="assets_vehicle">
        <div class="search_box">
            <div class="select_item_box">
                <select class="select_item"></select>
            </div>
            <div class="select_item_box">
                <select class="select_item"></select>
            </div>
            <div class="select_item_box">
                <select class="select_item"></select>
            </div>
            <div class="select_item_box">
                <select class="select_item"></select>
            </div>
            <div class="select_item_box">
                <select class="select_item"></select>
            </div>
            <div class="select_item_box">
                <select class="select_item"></select>
            </div>
            <div class="btn_box">
                <button class="reset_btn">重置</button>
            </div>
            <div class="btn_box">
                <button class="search_btn">筛选</button>
            </div>
            <div class="sync_btn_box">
                <button class="reset_btn">同步资产</button>
            </div>
        </div>


        <div class="table_box">
            <div id="info" class="tab-pane active">
                <table class="table ng-cloak domain_table">
                    <tr class="th_bg">
                        <th style="width: 100px;text-align: left; padding-left: 24px;" >
                            <img src="/images/login/select_o.png" alt="">
                        </th>
                        <th style="min-width: 80px;">配件ID</th>
                        <th style="min-width: 80px;">PN名称</th>
                        <th style="min-width: 80px;">供应商</th>
                        <th style="min-width: 80px;">硬件版本</th>
                        <th style="width: 150px;">软件版本</th>
                        <th style="min-width: 80px;">操作系统</th>
                        <th style="min-width: 80px;">操作</th>
                    </tr>
                    <tr style="cursor: pointer;" ng-repeat="item in new_list" ng-style="item.style_bg"
                        ng-class="{'branch':'info_bg','title':'title_bg'}[item.class]" ng-click="click_item(item)"
                        ng-if="item.show_index">
                        <td style="width: 100px;text-align: left; padding-left: 24px;">
                            <div ng-if="item.master">
                                <img src="/images/login/select_o.png" alt="">
                                <!-- <img src="/images/login/select_i.png"   alt=""> -->
                                <img src="/images/assets/label_right.png"class="label_right" ng-if="!item.show_clild" alt="">
                                <img src="/images/assets/label_down.png" class="label_right" ng-if="item.show_clild" alt="">
                            </div>
                        </td>
                        <td ng-if="item.master">{{item.id}}</td>
                        <td ng-if="item.master">{{item.host}}</td>
                        <td ng-if="item.master">{{item.brand}}</td>
                        <td ng-if="item.master">{{item.series}}</td>
                        <td ng-if="item.master">{{item.model}}</td>
                        <td ng-if="item.master"> {{item.style}}</td>
                        <td ng-if="item.branch && item.show">{{item.ids}}</td>
                        <td ng-if="item.branch&& item.show">{{item.PN}}</td>
                        <td ng-if="item.branch&& item.show">{{item.Supplier}}</td>
                        <td ng-if="item.branch&& item.show">{{item.Hardware}}</td>
                        <td ng-if="item.branch&& item.show">{{item.Software}}</td>
                        <td ng-if="item.branch&& item.show">{{item.OS}}</td>
                        <td ng-if="item.class!='title'">
                            <img src="/images/set/edit_icon.png" ng-if="item.master" class="img_icon"
                                ng-click="edit_loop(item)" alt="">
                            <img src="/images/set/cel_icon.png" class="img_icon" ng-click="cel_loop(item)" alt="">
                        </td>
                        <td ng-if="item.class=='title'">
                            操作
                        </td>
                    </tr>
                </table>
                <div style="border-top: 1px solid #f4f4f4;padding: 20px;">
                    <em style="font-size: 14px;color: #BBBBBB;">共有<span ng-bind="domain_data.count"></span>条资产</em>
                    <ul class="pagination pagination-sm no-margin pull-right ng-cloak">
                        <li><a href="javascript:void(0);" ng-click="domain_get(domain_data.pageNow-1)"
                                ng-if="domain_data.pageNow>1">上一页</a></li>
                        <li><a href="javascript:void(0);" ng-click="domain_get(1)" ng-if="domain_data.pageNow>1">1</a>
                        </li>
                        <li><a href="javascript:void(0);" ng-if="domain_data.pageNow>4">...</a></li>
                        <li><a href="javascript:void(0);" ng-click="domain_get(domain_data.pageNow-2)"
                                ng-bind="domain_data.pageNow-2" ng-if="domain_data.pageNow>3"></a></li>
                        <li><a href="javascript:void(0);" ng-click="domain_get(domain_data.pageNow-1)"
                                ng-bind="domain_data.pageNow-1" ng-if="domain_data.pageNow>2"></a></li>
                        <li class="active"><a href="javascript:void(0);" ng-bind="domain_data.pageNow"></a>
                        </li>
                        <li><a href="javascript:void(0);" ng-click="domain_get(domain_data.pageNow+1)"
                                ng-bind="domain_data.pageNow+1" ng-if="domain_data.pageNow<domain_data.maxPage-1"></a>
                        </li>
                        <li><a href="javascript:void(0);" ng-click="domain_get(domain_data.pageNow+2)"
                                ng-bind="domain_data.pageNow+2" ng-if="domain_data.pageNow<domain_data.maxPage-2"></a>
                        </li>
                        <li><a href="javascript:void(0);" ng-if="domain_data.pageNow<domain_data.maxPage-3">...</a>
                        </li>
                        <li><a href="javascript:void(0);" ng-click="domain_get(domain_data.maxPage)"
                                ng-bind="domain_data.maxPage" ng-if="domain_data.pageNow<domain_data.maxPage"></a>
                        </li>
                        <li><a href="javascript:void(0);" ng-click="domain_get(domain_data.pageNow+1)"
                                ng-if="domain_data.pageNow<domain_data.maxPage">下一页</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</section>
<script src="/js/controllers/assets_accessory.js"></script>

<?php
/* @var $this yii\web\View */
$this->title = '车辆资产';
?>
<link rel="stylesheet" href="/css/assets/vehicle.css">
<section class="assets_vehicle_container" ng-app="myApp" ng-controller="assetsVehicleCtrl" ng-cloak>
    <div class="assets_vehicle">
        <div class="search_box">
            <!-- manufactory -主机厂 -->
            <div class="search_input_box">
                <img src="/images/set/label_triangle_down.png" class="select_down_icon" alt="">
                <input type="text" placeholder="主机厂" ng-model="select_list.manufactory.choose"
                    ng-focus="search_focus('manufactory')" ng-blur="search_blur('manufactory');" class="search_input"
                    readonly>
                <ul class="select_list_box" ng-if="select_list.manufactory.show" style="height:107px;margin:0">
                    <li ng-mousedown="search_choose_item(item,$index,'manufactory');"
                        ng-repeat="item in select_list.manufactory.list track by $index">
                        {{item}}
                    </li>
                </ul>
            </div>
            <!-- brand -品牌 -->
            <div class="search_input_box">
                <img src="/images/set/label_triangle_down.png" class="select_down_icon" alt="">
                <input type="text" placeholder="品牌" ng-model="select_list.brand.choose" ng-focus="search_focus('brand')"
                    ng-blur="search_blur('brand');" class="search_input" readonly>
                <ul class="select_list_box" ng-if="select_list.brand.show" style="height:107px;margin:0">
                    <li ng-mousedown="search_choose_item(item,$index,'brand');"
                        ng-repeat="item in select_list.brand.list track by $index">
                        {{item}}
                    </li>
                </ul>
            </div>
            <!-- model - 车型 -->
            <div class="search_input_box">
                <img src="/images/set/label_triangle_down.png" class="select_down_icon" alt="">
                <input type="text" placeholder="车型" ng-model="select_list.model.choose" ng-focus="search_focus('model')"
                    ng-blur="search_blur('model');" class="search_input" readonly>
                <ul class="select_list_box" ng-if="select_list.model.show" style="height:107px;margin:0">
                    <li ng-mousedown="search_choose_item(item,$index,'model');"
                        ng-repeat="item in select_list.model.list track by $index">
                        {{item}}
                    </li>
                </ul>
            </div>
            <!-- series - 系列名 -->
            <div class="search_input_box">
                <img src="/images/set/label_triangle_down.png" class="select_down_icon" alt="">
                <input type="text" placeholder="系列名" ng-model="select_list.series.choose"
                    ng-focus="search_focus('series')" ng-blur="search_blur('series');" class="search_input" readonly>
                <ul class="select_list_box" ng-if="select_list.series.show" style="height:107px;margin:0">
                    <li ng-mousedown="search_choose_item(item,$index,'series');"
                        ng-repeat="item in select_list.series.list track by $index">
                        {{item}}
                    </li>
                </ul>
            </div>
            <!-- styles - 车款 -->
            <div class="search_input_box">
                <img src="/images/set/label_triangle_down.png" class="select_down_icon" alt="">
                <input type="text" placeholder="车款" ng-model="select_list.styles.choose"
                    ng-focus="search_focus('styles')" ng-blur="search_blur('styles');" class="search_input" readonly>
                <ul class="select_list_box" ng-if="select_list.styles.show" style="height:107px;margin:0">
                    <li ng-mousedown="search_choose_item(item,$index,'styles');"
                        ng-repeat="item in select_list.styles.list track by $index">
                        {{item}}
                    </li>
                </ul>
            </div>
            <button class="btn_i">查询</button>
            <button class="btn_o" ng-click="reset()">重置</button>
            <button class="btn_o">导出</button>
        </div>
        <div class="t_box">
            <ul class="t_head">
                <li class="t_head_frist"></li>
                <li class="t_head_flex">车辆ID</li>
                <li class="t_head_flex">主机厂</li>
                <li class="t_head_flex">车辆品牌</li>
                <li class="t_head_flex">系列名</li>
                <li class="t_head_flex">车型代码</li>
                <li class="t_head_flex">车款</li>
                <li class="t_head_flex"></li>
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
                        <span class="t_head_flex"> {{item.manufactory}}</span>
                        <span class="t_head_flex"> {{item.brand}}</span>
                        <span class="t_head_flex"> {{item.series}}</span>
                        <span class="t_head_flex"> {{item.model}}</span>
                        <span class="t_head_flex"> {{item.styles}}</span>
                        <span class="t_head_flex"></span>
                        <span class="t_head_flex"></span>
                    </li>
                    <div class="children_box">
                        <li class="children" ng-repeat="key in item.children" ng-class="key.head?'children_head':''"
                            ng-show='item.show'>
                            <span class="t_head_frist"></span>
                            <span class="t_head_flex"> {{key.pn_id}}</span>
                            <span class="t_head_flex"> {{key.name}}</span>
                            <span class="t_head_flex"> {{key.supplier_id}}</span>
                            <span class="t_head_flex"> {{key.supplier_name}}</span>
                            <span class="t_head_flex"> {{key.hardware}}</span>
                            <span class="t_head_flex"> {{key.software}}</span>
                            <span class="t_head_flex"> {{key.os_version}}</span>
                            <span class="t_head_flex"> {{key.os_kernel}}</span>
                        </li>
                    </div>
                </ul>
            </div>
        </div>


        <!-- <div class="table_box">
            <div id="info" class="tab-pane active">
                <table class="table ng-cloak domain_table">
                    <tr class="th_bg t_head">
                        <th style="width: 50px;text-align: center; padding-left: 24px;">
                        </th>
                        <td style="min-width: 80px;">车辆ID</td>
                        <td style="min-width: 80px;">主机厂</td>
                        <td style="min-width: 80px;">车辆品牌</td>
                        <td style="min-width: 80px;">系列名</td>
                        <td style="width: 150px;">车型代码</td>
                        <td style="min-width: 80px;">车款</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr style="cursor: pointer;" class="t_body" ng-repeat="item in new_list" ng-style="item.style_bg"
                        ng-class="{'branch':'info_bg','title':'title_bg'}[item.class]" ng-click="click_item(item)"
                        ng-if="item.show_index">
                        <td style="width: 50px;text-align: center; padding-left: 24px;">
                            <div ng-if="item.master">
                                <img src="/images/assets/label_right.png" class="label_right" ng-if="!item.show_clild"
                                    alt="">
                                <img src="/images/assets/label_down.png" class="label_right" ng-if="item.show_clild"
                                    alt="">
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
        </div> -->
    </div>

</section>
<script src="/js/controllers/assets_vehicle.js"></script>

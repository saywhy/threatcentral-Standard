<?php
/* @var $this yii\web\View */
$this->title = '漏洞情报管理';
?>
<style>

</style>
<link rel="stylesheet" href="/css/set/loophole.css">
<section class="loophole_intel_container" ng-app="myApp" ng-controller="loopholeIntelCtrl" ng-cloak>
    <div class="loophole_intel">
    </div>
    <div class="intel_loophole">
        <div class="intel_box_top">
            <span class="intel_icon_box">
                <img src="/images/alert/search_icon.png" class="search_icon" alt="">
                <input type="text" class="intel_search_input" ng-focus="get_intel_search_focus()"
                    ng-blur="get_intel_search_blur()" ng-keyup="myKeyup_intel_search(seach_data.client_ip)"
                    placeholder="输入关键字" ng-model="seach_data.client_ip">
                <ul class="container_ul" ng-show="select_intel_search_if">
                    <li ng-repeat="item in select_intel_ip" class="li_hover"
                        ng-click="select_intel_ip_item(item.client_ip)">
                        {{item.client_ip}}
                    </li>
                </ul>
            </span>
            <select class="intel_search_input source_input" ng-model="seach_data.source"
                ng-options="x for x in loop_source track by $index"></select>
            <select class="intel_search_input source_input" ng-model="seach_data.stauts"
                ng-options="x.num as x.status for x in status_search"></select>
            <div class="intel_search_time ">
                <img src="/images/report/time.png" class="time_icon_search" alt="">
                <input class="input_box" id="picker_search" readonly type="text" placeholder="时间">
            </div>

            <span class="intel_icon_box">
                <img src="/images/alert/search_icon.png" class="search_icon" alt="">
                <input type="text" class="intel_search_input" ng-focus="get_client_ip_focus()"
                    ng-blur="get_client_ip_blur()" ng-keyup="myKeyup_client_ip(searchData.client_ip)" placeholder="标签"
                    ng-model="searchData.client_ip">
                <ul class="container_ul" ng-show="select_client_ip_if">
                    <li ng-repeat="item in select_client_ip" class="li_hover"
                        ng-click="select_client_ip_item(item.client_ip)">
                        {{item.client_ip}}
                    </li>
                </ul>
            </span>
            <button class="button_search" ng-click="search()">搜索</button>
            <button class="button_add" ng-click="add_loop_box()">情报录入</button>
        </div>
    </div>
    <div class="loophole_table_content" ng-click="blur_input()">
        <table class="table table-striped ng-cloak">
            <tr class="loophole_table_tr">
                <th>情报 ID</th>
                <th>漏洞标题</th>
                <th>漏洞描述</th>
                <th>情报来源</th>
                <th>标签类型</th>
                <th>获取时间</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            <tr class="loophole_table_tr" style="cursor: pointer;" ng-repeat="item in pages.data track by $index"
                ng-click="detail(item)">
                <td>
                    <img src="/images/alert/h.png" ng-if="item.level === '高'" alt="">
                    <img src="/images/alert/m.png" ng-if="item.level === '中'" alt="">
                    <img src="/images/alert/l.png" ng-if="item.level === '低'" alt="">
                    <span ng-bind="item.id"> </span>
                </td>
                <td ng-bind="item.title"></td>
                <td ng-bind="item.detail"></td>
                <td ng-bind="item.sourse"></td>
                <td class="td_operation">
                    <button class="btn_loophole" ng-class="{'active':it.status}" ng-repeat="it in item.type"
                        ng-click="it.status = !it.status">
                        {{it.name}}
                        <img class="loop_img" src="/images/loophole/tick.png" alt="" ng-show="it.status">
                    </button>
                </td>
                <td ng-bind="item.first_seen_time"></td>
                <td ng-bind="item.status"></td>
                <td ng-bind="item.status"></td>
            </tr>
        </table>
        <p>
            <span class="loophole_result_length">共有<span ng-bind="pages.count"></span>条结果</span>
        </p>
        <div style="padding: 0px; position: relative;height:60px;">
            <ul class="pagination pagination-sm  pull-right ng-cloak" style="margin-right:36px;">
                <li><a href="javascript:void(0);" ng-click="getPage(pages.pageNow-1)" ng-if="pages.pageNow>1">上一页</a>
                </li>
                <li><a href="javascript:void(0);" ng-click="getPage(1)" ng-if="pages.pageNow>1">1</a>
                </li>
                <li><a href="javascript:void(0);" ng-if="pages.pageNow>4">...</a></li>
                <li><a href="javascript:void(0);" ng-click="getPage(pages.pageNow-2)" ng-bind="pages.pageNow-2"
                        ng-if="pages.pageNow>3"></a></li>
                <li><a href="javascript:void(0);" ng-click="getPage(pages.pageNow-1)" ng-bind="pages.pageNow-1"
                        ng-if="pages.pageNow>2"></a></li>
                <li class="active"><a href="javascript:void(0);" ng-bind="pages.pageNow"></a></li>
                <li><a href="javascript:void(0);" ng-click="getPage(pages.pageNow+1)" ng-bind="pages.pageNow+1"
                        ng-if="pages.pageNow<pages.maxPage-1"></a></li>
                <li><a href="javascript:void(0);" ng-click="getPage(pages.pageNow+2)" ng-bind="pages.pageNow+2"
                        ng-if="pages.pageNow<pages.maxPage-2"></a></li>
                <li><a href="javascript:void(0);" ng-if="pages.pageNow<pages.maxPage-3">...</a></li>

                <li><a href="javascript:void(0);" ng-click="getPage(pages.maxPage)" ng-bind="pages.maxPage"
                        ng-if="pages.pageNow<pages.maxPage"></a></li>
                <li><a href="javascript:void(0);" ng-click="getPage(pages.pageNow+1)"
                        ng-if="pages.pageNow<pages.maxPage">下一页</a></li>
            </ul>
        </div>
    </div>
    <!-- 添加新增弹窗 -->
    <div style="display: none;" id="alert_time_box">
        <div id="alert_time">
            <div class="alert_item_box">
                <p class="alert_name">漏洞标题</p>
                <input class="alert_input_box" placeholder="请输入漏洞标题" type="text" ng-model="alert_item.title">
            </div>
            <div class="alert_item_box time_select_box">
                <div class="flex_item">
                    <p class="alert_name">获取时间</p>
                    <img src="/images/report/time.png" class="time_icon" alt="">
                    <input class="alert_input_box" type="text" placeholder="请选择" id="start_time_picker" readonly>
                </div>
                <div class="flex_item">
                    <p class="alert_name">漏洞来源</p>
                    <!-- <img src="/images/report/time.png" class="time_icon" alt=""> -->
                    <select class="loop_select_box" ng-model="alert_item.sourse"
                        ng-options="x for x in loop_source_add"></select>
                </div>
            </div>
            <div class="alert_item_box">
                <p class="alert_name">漏洞描述</p>
                <textarea class="textarea_box" ng-model="alert_item.detail" name="" id="" cols="30"
                    rows="10"></textarea>
            </div>
            <div class="alert_item_box">
                <p class="alert_name">添加标签</p>
                <div class="tag_add_box">
                    <ul class="tag_box_ul">
                        <li ng-repeat="item in alert_item.tag_list track by $index">
                            {{item}}
                        </li>
                    </ul>
                     <input class="tag_input" placeholder="请输入关键字选择筛选结果" ng-focus="tag_focus()"
                        ng-blur="tag_blur()" type="text" ng-model="alert_item.tag_list_str">
                </div>
                <ul class="tag_list_box" ng-if="tag_list_if">
                    <li ng-click="tag_list_item(item.label_name)" ng-repeat="item in tag_list track by $index">
                        {{item.label_name}}
                    </li>
                </ul>
            </div>
            <div class="alert_btn_box">
                <button class="alert_btn_ok" ng-click="alert_sure()">确认</button>
                <button class="alert_btn_cancel" ng-click="alert_time_cancel()">取消</button>
            </div>
        </div>
    </div>
</section>
<script src="/js/controllers/loophole_intel.js"></script>

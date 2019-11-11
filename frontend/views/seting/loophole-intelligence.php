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
                    placeholder="输入关键字" ng-model="seach_data.key_word">
            </span>
            <!-- 来源 -->
            <select class="intel_search_input source_input" ng-model="seach_data.source"
                ng-options="x for x in loop_source"></select>
            <!-- 状态 -->
            <select class="intel_search_input source_input" ng-model="seach_data.stauts"
                ng-options="x.num as x.status for x in status_search "></select>
            <!-- 漏洞级别 -->
            <select class="intel_search_input source_input" ng-model="seach_data.level"
                ng-options="x.num as x.status for x in search_level"></select>
            <div class="intel_search_time ">
                <img src="/images/report/time.png" class="time_icon_search" alt="">
                <input class="input_box" id="picker_search" readonly type="text" placeholder="时间">
            </div>
            <!-- 标签选择 -->
            <select class="intel_search_input source_input" ng-model="seach_data.label_id"
                ng-options="x.id as x.label_name for x in search_tag_list"></select>
            <button class="button_search" ng-click="get_page()">搜索</button>
            <button class="button_add" ng-click="add_loop_box()">情报录入</button>
        </div>
    </div>
    <div class="loophole_table_content" ng-click="blur_input()">
        <table class="table table-striped ng-cloak">
            <tr class="loophole_table_tr">
                <th class="th_id">情报 ID</th>
                <th>漏洞标题</th>
                <th>漏洞描述</th>
                <th>情报来源</th>
                <th class="tag_th">标签类型</th>
                <th class="th_time">获取时间</th>
                <th>状态</th>
                <th class="td_operation th_id">操作</th>
            </tr>
            <tr class="loophole_table_tr" style="cursor: pointer;" ng-repeat="item in pages.data track by $index"
                ng-click="detail(item)">
                <td class="th_id">
                    <img src="/images/alert/h.png" ng-if="item.level === '高'" alt="">
                    <img src="/images/alert/m.png" ng-if="item.level === '中'" alt="">
                    <img src="/images/alert/l.png" ng-if="item.level === '低'" alt="">
                    <span ng-bind="item.id"> </span>
                </td>
                <td ng-bind="item.title"></td>
                <td ng-bind="item.detail"></td>
                <td ng-bind="item.sourse"></td>
                <td>
                    <button class="btn_loophole" ng-repeat="it in item.label_name">
                        {{it}}
                        <!-- <img class="loop_img" src="/images/loophole/tick.png" alt="" ng-show="it.status"> -->
                    </button>
                </td>
                <td>{{item.first_seen_time*1000 | date : 'yyyy-MM-dd HH:mm:ss'}}</td>
                <td>{{item.status=='0'? '未发布':'已发布'}}</td>
                <td class="td_operation th_id">
                    <button ng-class="item.status=='0'? 'btn_operation':'btn_unoperation'"
                        ng-disabled="item.status=='1'" ng-click="release(item.id)">发布</button>
                    <button class="btn_operation" ng-click="edit_loop_box(item)">编辑</button>
                    <button class="btn_operation" ng-click="delete(item.id)">删除</button>
                </td>
            </tr>
        </table>
        <p>
            <span class="loophole_result_length">共有<span ng-bind="pages.count"></span>条结果</span>
        </p>
        <div style="padding: 0px; position: relative;height:60px;">
            <ul class="pagination pagination-sm  pull-right ng-cloak" style="margin-right:36px;">
                <li><a href="javascript:void(0);" ng-click="get_page(pages.pageNow-1)" ng-if="pages.pageNow>1">上一页</a>
                </li>
                <li><a href="javascript:void(0);" ng-click="get_page(1)" ng-if="pages.pageNow>1">1</a>
                </li>
                <li><a href="javascript:void(0);" ng-if="pages.pageNow>4">...</a></li>
                <li><a href="javascript:void(0);" ng-click="get_page(pages.pageNow-2)" ng-bind="pages.pageNow-2"
                        ng-if="pages.pageNow>3"></a></li>
                <li><a href="javascript:void(0);" ng-click="get_page(pages.pageNow-1)" ng-bind="pages.pageNow-1"
                        ng-if="pages.pageNow>2"></a></li>
                <li class="active"><a href="javascript:void(0);" ng-bind="pages.pageNow"></a></li>
                <li><a href="javascript:void(0);" ng-click="get_page(pages.pageNow+1)" ng-bind="pages.pageNow+1"
                        ng-if="pages.pageNow<pages.maxPage-1"></a></li>
                <li><a href="javascript:void(0);" ng-click="get_page(pages.pageNow+2)" ng-bind="pages.pageNow+2"
                        ng-if="pages.pageNow<pages.maxPage-2"></a></li>
                <li><a href="javascript:void(0);" ng-if="pages.pageNow<pages.maxPage-3">...</a></li>

                <li><a href="javascript:void(0);" ng-click="get_page(pages.maxPage)" ng-bind="pages.maxPage"
                        ng-if="pages.pageNow<pages.maxPage"></a></li>
                <li><a href="javascript:void(0);" ng-click="get_page(pages.pageNow+1)"
                        ng-if="pages.pageNow<pages.maxPage">下一页</a></li>
            </ul>
        </div>
    </div>
    <!-- 添加新增弹窗 -->
    <div style="display: none;" id="alert_time_box">
        <div id="alert_time">
            <div class="alert_item_box time_select_box">
                <div class="flex_item">
                    <p class="alert_name">漏洞标题</p>
                    <input class="alert_input_box" placeholder="请输入漏洞标题" type="text" ng-model="alert_item.title">
                </div>
                <div class="flex_item">
                    <p class="alert_name">漏洞等级</p>
                    <select class="loop_select_box" ng-model="alert_item.level"
                        ng-options="x.num as x.status for x in add_level "></select>
                </div>
            </div>
            <div class="alert_item_box time_select_box">
                <div class="flex_item">
                    <p class="alert_name">获取时间</p>
                    <img src="/images/report/time.png" class="time_icon" alt="">
                    <input class="alert_input_box" type="text" placeholder="请选择" id="start_time_picker" readonly>
                </div>
                <div class="flex_item">
                    <p class="alert_name">漏洞来源</p>
                        <div class="tag_add_box">
                        <input class="tag_input" ng-model="alert_item.sourse" placeholder="请选择来源或按enter键添加新来源" ng-keyup="add_source_mykey($event)"
                            ng-focus="add_source_focus()" ng-change="add_source_change(alert_item.sourse)"
                            ng-blur="add_source_blur();$event.stopPropagation();" type="text" >
                    </div>
                    <ul class="tag_list_box" ng-if="add_source_list_if">
                        <li ng-click="add_source_list_item(item);$event.stopPropagation();"
                        ng-repeat="item in loop_source_add track by $index">
                            {{item}}
                        </li>
                    </ul>
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
                    <ul class="tag_box_ul" ng-if="alert_item.tag_list.length!=0">
                        <li ng-repeat="item in alert_item.tag_list track by $index">
                            <span>{{item}}</span>
                            <img src="/images/set/tag_del.png" alt="" class="tag_icon" ng-click="tag_del(item,$index)">
                        </li>
                    </ul>
                    <input class="tag_input" placeholder="请选择标签或按enter键添加新标签" ng-keyup="mykey($event)"
                        ng-focus="tag_focus()" ng-change="tag_change(alert_item.tag_list_str)" ng-blur="tag_blur()"
                        type="text" ng-model="alert_item.tag_list_str">
                </div>
                <ul class="tag_list_box" ng-if="tag_list_if">
                    <li ng-click="tag_list_item(item)" ng-repeat="item in tag_list track by $index">
                        {{item.label_name}}
                    </li>
                </ul>
            </div>
            <div class="alert_btn_box">
                <button class="alert_btn_ok" ng-click="add_sure()">确认</button>
                <button class="alert_btn_cancel" ng-click="add_cancel()">取消</button>
            </div>
        </div>
    </div>
    <!-- 编辑情报 -->
    <div style="display: none;" id="edit_box">
        <div id="edit">
            <div class="alert_item_box time_select_box">
                <div class="flex_item">
                    <p class="alert_name">漏洞标题</p>
                    <input class="alert_input_box" placeholder="请输入漏洞标题" type="text" ng-model="edit_item.title">
                </div>
                <div class="flex_item">
                    <p class="alert_name">漏洞等级</p>
                    <select class="loop_select_box" ng-model="edit_item.level"
                        ng-options="x.num as x.status for x in add_level "></select>
                </div>
            </div>
            <div class="alert_item_box time_select_box">
                <div class="flex_item">
                    <p class="alert_name">获取时间</p>
                    <img src="/images/report/time.png" class="time_icon" alt="">
                    <input class="alert_input_box" type="text" placeholder="请选择" id="picker_edit" readonly>
                </div>
                <div class="flex_item">
                    <p class="alert_name">漏洞来源</p>
                     <div class="tag_add_box">
                        <input class="tag_input" ng-model="edit_item.sourse" placeholder="请选择来源或按enter键添加新来源" ng-keyup="edit_source_mykey($event)"
                            ng-focus="edit_source_focus()" ng-change="edit_source_change(edit_item.sourse)"
                            ng-blur="edit_source_blur()" type="text" >
                    </div>
                    <ul class="tag_list_box" ng-if="edit_source_list_if">
                        <li ng-click="edit_source_list_item(item)" ng-repeat="item in loop_source_add track by $index">
                            {{item}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="alert_item_box">
                <p class="alert_name">漏洞描述</p>
                <textarea class="textarea_box" ng-model="edit_item.detail" name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div class="alert_item_box">
                <p class="alert_name">添加标签</p>
                <div class="tag_add_box">
                    <ul class="tag_box_ul" ng-if="edit_item.tag_list.length!=0">
                        <li ng-repeat="item in edit_item.tag_list track by $index">
                            <span>{{item}}</span>
                            <img src="/images/set/tag_del.png" alt="" class="tag_icon"
                                ng-click="edit_tag_del(item,$index)">
                        </li>
                    </ul>
                    <input class="tag_input" placeholder="请选择标签或按enter键添加新标签" ng-keyup="edit_mykey($event)"
                        ng-focus="edit_tag_focus()" ng-change="edit_tag_change(edit_item.tag_list_str)"
                        ng-blur="edit_tag_blur()" type="text" ng-model="edit_item.tag_list_str">
                </div>
                <ul class="tag_list_box" ng-if="edit_tag_list_if">
                    <li ng-click="edit_tag_list_item(item)" ng-repeat="item in tag_list track by $index">
                        {{item.label_name}}
                    </li>
                </ul>
            </div>
            <div class="alert_btn_box">
                <button class="alert_btn_ok" ng-click="edit_sure()">确认</button>
                <button class="alert_btn_cancel" ng-click="add_cancel()">取消</button>
            </div>
        </div>
    </div>
</section>
<script src="/js/controllers/loophole_intel.js"></script>

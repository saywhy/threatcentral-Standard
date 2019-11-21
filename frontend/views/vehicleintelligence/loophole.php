<?php
/* @var $this yii\web\View */
$this->title = '漏洞情报';
?>
<link rel="stylesheet" href="/css/vehicleintelligence/loophole.css">
<section class="vehicle_loophole_container" ng-app="myApp" ng-controller="vehicleTelLoopholeCtrl" ng-cloak>
        <div class="vehicle_loophole">
            <div class="vehicle_box_top">
                <!-- 输入关键字 -->
                <span class="vehicle_icon_box">
                   <img src="/images/alert/search_icon.png" class="search_icon" alt="">
                   <input type="text" style="padding-left:34px;" class="vehicle_search_input" placeholder="关联编号/漏洞关键字"
                        ng-model="seach_data.key_word" ng-keyup="vehicle_key_up($event)">
                </span>

                <!-- 漏洞来源 -->
                <select class="vehicle_search_select source_input" ng-model="seach_data.source"
                   ng-options="x for x in loop_source">
                </select>

                <!-- 漏洞级别 -->
                <select class="vehicle_search_select source_input" ng-model="seach_data.level"
                   ng-options="x.num as x.status for x in search_level">
                </select>

                <!-- 获取时间 -->
                <div class="vehicle_search_time">
                   <img src="/images/report/time.png" class="time_icon_search" alt="">
                   <input class="input_box" id="picker_search" readonly type="text" placeholder="时间">
                </div>

                <!-- 标签选择 -->
                <!--<select class="vehicle_search_select source_input" ng-model="seach_data.label_id"
                   ng-options="x.id as x.label_name for x in search_tag_list">
                </select>-->

                <!-- 搜索 -->
                <button class="button_search" ng-click="get_page()" ng-keyup="label_keyup($event)">搜索</button>
            </div>

            <!-- 选中标签列表 -->
            <!--<div class="vehicle_item_box">
               <div class="tag_add_box">
                 <p class="tag_tip" ng-show="label_checked_list.length == 0">标签</p>
                 <ul class="tag_box_ul">
                     <li ng-repeat="item in label_checked_list track by $index">
                         <span>{{item.label_name}}</span>
                         <img src="/images/set/tag_del.png" alt="" class="tag_icon" ng-click="label_tag_del($event,item,$index)">
                     </li>
                 </ul>
               </div>
            </div>-->
        </div>

        <!-- 标签列表展示 -->
        <div class="vehicle_search_country">
            <ul class="search_country">
                <li class="search_country_item" ng-repeat="item in label_data" ng-hide="$index>toggleCount">
                     <span class="title">{{item.name}}：</span>
                     <span class="lists">
                         <span class="item" ng-repeat="it in item.label"
                         ng-click="tog_change_status($event,item,it);">{{it.label_name}}</span>
                     </span>
                </li>
            </ul>
            <div class="search_toggle" ng-show="label_data.length > 0">
               <a class="toggle" ng-class="{'active':toggleStatus}" ng-click="tog_count_change($event);">
                   <span class="caret"></span>
                   <span ng-show="!toggleStatus">展开</span><span ng-show="toggleStatus">收起</span>更多
               </a>
            </div>
        </div>

        <div class="loophole_table_content">
            <table class="table table-striped ng-cloak">
              <tr class="loophole_table_tr">
                  <th>情报 ID</th>
                  <th>漏洞标题</th>
                  <th>漏洞描述</th>
                  <th>情报来源</th>
                  <th>标签类型</th>
                  <th>获取时间</th>
              </tr>
              <tr class="loophole_table_tr" style="cursor: pointer;" ng-repeat="item in pages.data"
              ng-click="list_item_click($event,item);">
                  <td>
                    <img src="/images/alert/h.png" ng-if="item.level === '高'" alt="">
                    <img src="/images/alert/m.png" ng-if="item.level === '中'" alt="">
                    <img src="/images/alert/l.png" ng-if="item.level === '低'" alt="">
                    <span ng-bind="item.id"> </span>
                  </td>
                  <td ng-bind="item.title"></td>
                  <td ng-bind="item.detail" style="color:#0070ff;"></td>
                  <td ng-bind="item.sourse"></td>
                  <td class="td_operation" style="white-space: nowrap;text-overflow: ellipsis;">
                      <button class="btn_loophole" ng-class="{'active':it.status}" ng-repeat="it in item.label_name">
                          {{it}}
                          <img class="loop_img" src="/images/loophole/tick.png" alt="" ng-show="it.status">
                      </button>
                  </td>
                  <td>{{item.first_seen_time*1000 | date : 'yyyy-MM-dd'}}</td>
              </tr>
            </table>
            <p>
              <span class="loophole_result_length">共有<span ng-bind="pages.count"></span>条结果</span>
            </p>
            <div style="padding: 0px; position: relative;height:60px;">
               <ul class="pagination pagination-sm  pull-right ng-cloak" style="margin-right:36px;">
                   <li><a href="javascript:void(0);" ng-click="get_page(pages.pageNow-1)"
                           ng-if="pages.pageNow>1">上一页</a></li>
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

        <!-- 新增标签弹窗 -->
        <div style="display: none;" id="vehicle_loophole_box">
            <div id="vehicle_loophole">
                <h1 class="l_top">{{label_item_data.title}}</h1>
                <div class="l_mid">
                    <p class="item">
                      <span class="l_item"><span class="l_name">威胁等级：</span><span class="l_value">{{label_item_data.level}}危</span></span>
                      <span class="l_item1"><span class="l_name">时间：</span><span class="l_value">{{label_item_data.first_seen_time*1000 | date : 'yyyy-MM-dd'}}</span></span>
                    </p>
                    <p class="item">
                      <span class="l_item"><span class="l_name">来源：</span><span class="l_value">{{label_item_data.sourse}}</span></span>
                      <span class="l_item1"><span class="l_name">标签：</span><span class="l_value">{{label_item_data.label_new_name}}</span></span>
                    </p>
                </div>
                <dl class="l_bom">
                    <dt class="l_title">漏洞描述：</dt>
                    <dd class="l_content">{{label_item_data.detail}}</dd>
                </dl>
            </div>
        </div>
</section>
<script src="/js/controllers/vehicleintelligence/vehicle_tel_loophole.js"></script>

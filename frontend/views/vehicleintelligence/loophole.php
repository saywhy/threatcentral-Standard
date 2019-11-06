<?php
/* @var $this yii\web\View */
$this->title = '漏洞情报';
?>
<link rel="stylesheet" href="/css/vehicleintelligence/loophole.css">
<section class="vehicle_loophole_container" ng-app="myApp" ng-controller="vehicleTelLoopholeCtrl" ng-cloak>
      <div class="vehicle_loophole">
           <div class="vehicle_box_top">

                <!-- 漏洞来源 -->
                <span class="vehicle_icon_box">
                    <img src="/images/alert/search_icon.png" class="search_icon" alt="">
                    <input type="text" style="padding-left:34px;" class="vehicle_search_input"
                        placeholder="输入关键字" ng-model="seach_data.key_word">
                </span>

                <!-- 漏洞来源 -->
                <select class="vehicle_search_input source_input" ng-model="seach_data.source"
                    ng-options="x for x in loop_source">
                </select>

                <!-- 漏洞级别 -->
                <select class="vehicle_search_input source_input" ng-model="seach_data.level"
                    ng-options="x.num as x.status for x in search_level">
                </select>

                <!-- 获取时间 -->
                <div class="vehicle_search_time">
                    <img src="/images/report/time.png" class="time_icon_search" alt="">
                    <input class="input_box" id="picker_search" readonly type="text" placeholder="时间">
                </div>

                <!-- 标签选择 -->
                <select class="vehicle_search_input source_input" ng-model="seach_data.label_id"
                    ng-options="x.id as x.label_name for x in search_tag_list">
                </select>

                <!-- 搜索 -->
                <button class="button_search" ng-click="get_page()" ng-keyup="label_keyup($event)">搜索</button>
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
              </tr>
              <tr class="loophole_table_tr" style="cursor: pointer;" ng-repeat="item in pages.data" ng-click="detail(item)">
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
                      <button class="btn_loophole" ng-class="{'active':it.status}" ng-repeat="it in item.label_name"
                      ng-click="it.status = !it.status">
                          {{it}}
                          <img class="loop_img" src="/images/loophole/tick.png" alt="" ng-show="it.status">
                      </button>
                  </td>
                  <td>{{item.first_seen_time*1000 | date : 'yyyy-MM-dd'}}</td>
              </tr>
          </table>
          <p>
              <span class="loophole_result_length">共有<span
                      ng-bind="pages.data.length"></span>条结果</span>
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
</section>
<script src="/js/controllers/vehicleintelligence/vehicle_tel_loophole.js"></script>

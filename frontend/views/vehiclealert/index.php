<?php
/* @var $this yii\web\View */
$this->title = '车联网预警';
?>
<link rel="stylesheet" href="/css/vehiclealert/index.css">

<section class="vehicle_alert_container" ng-app="myApp" ng-controller="vehicleAlertCtrl" ng-cloak>
        <div class="vehicle_echarts">
            <div class="vehicle_echarts_item">
                <div class="left">
                   <h1 class="left_num">5</h1>
                   <p class="left_tip">受影响车辆资产</p>
                </div>
                <div class="right">
                   <div id="vehicle1"></div>
                </div>
            </div>

            <div class="vehicle_echarts_item">
                <div class="left">
                   <h1 class="left_num">6</h1>
                   <p class="left_tip">受影响零配件资产</p>
                </div>
                <div class="right">
                   <div id="vehicle2"></div>
                </div>
            </div>
        </div>
        <div class="vehicle_content">

            <!-- 受影响资产 -->
            <span class="vehicle_alert_word">
                <img src="/images/alert/search_icon.png" class="word_icon" alt="">
                <input type="text" class="word_input" placeholder="输入关键字" ng-model="seach_data.key_word">
            </span>

            <!-- 预警事件 -->
              <div class="vehicle_alert_time ">
        <img src="/images/report/time.png" class="start_time_icon" alt="">
        <input class="time_picker" autocomplete="off" id="picker_search" type="text" placeholder="时间">
      </div>
            <!-- 处理状态 -->
            <select class="vehicle_alert_select" ng-model="seach_data.level"
                ng-options="x.num as x.status for x in search_level">
            </select>

            <!-- 搜索 -->
            <button class="button_search" ng-click="get_page()" ng-keyup="label_keyup($event)">搜索</button>
        </div>
        <div class="vehicle_table">
          <table class="table table-striped table_th ng-cloak">
              <tr class="vehicle_table_tr">
                  <th>受影响资产</th>
                  <th>漏洞名称</th>
                  <th>所属分组</th>
                  <th>预警时间</th>
                  <th>风险状态</th>
                  <th>处理状态</th>
              </tr>
              <tr class="vehicle_table_tr" style="cursor: pointer;" ng-repeat="item in pages.data" ng-click="detail(item);">
                  <td ng-bind="item.affected"></td>
                  <td ng-bind="item.name"></td>
                  <td ng-bind="item.group"></td>
                  <td>{{item.time*1000 | date : 'yyyy-MM-dd HH:mm'}}</td>
                  <td>
                      <span ng-bind="status_str[item.status].label"></span>
                  </td>
                  <td style="padding-right:36px;" class="td_operation" ng-click="$event.stopPropagation();">
                      <button class="btn_look" ng-click="operation_click($index);$event.stopPropagation();" ng-if="item.status!='2' && item.status!='3'">
                          <span ng-bind="status_str[item.status].label"></span>
                          <img class="btn_look_icon" src="/images/alert/down.png" alt="">
                          <ul class="td_ul" ng-if="item_operation == $index">
                              <li class="td_li" ng-click="update_alert(item,'1');$event.stopPropagation();"
                                  ng-if="item.status!='1'&& item.status!='4'">
                                  处置中
                              </li>
                              <li class="td_li" ng-if="item.status!='4'" ng-click="update_alert(item,'2');$event.stopPropagation();">
                                  已解决
                              </li>
                              <li class="td_li" ng-if="item.status!='4'" ng-click="update_alert(item,'3');$event.stopPropagation();">
                                  已忽略
                              </li>
                              <li class="td_li" ng-click="update_alert(item,'4');$event.stopPropagation();" ng-if="item.category=='钓鱼仿冒'&& item.status!='4'">
                                  白名单
                              </li>
                              <li class="td_li" ng-if="item.status=='4'"
                              ng-click="update_alert(item,'5'); $event.stopPropagation();">
                                  取消白
                              </li>
                          </ul>
                      </button>
                      <button class="btn_look_closed" ng-if="item.status=='2'" ng-click="$event.stopPropagation();">
                          已解决
                      </button>
                      <button class="btn_look_closed" ng-if="item.status=='3'" ng-click="$event.stopPropagation();">
                          已忽略
                      </button>
                  </td>
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
</section>
<script src="/js/controllers/vehiclealert/index.js"></script>

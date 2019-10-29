<?php
/* @var $this yii\web\View */
$this->title = '漏洞情报';
?>
<link rel="stylesheet" href="/css/vehicleintelligence/loophole.css">
<section class="vehicle_loophole_container" ng-app="myApp" ng-controller="vehicleTelLoopholeCtrl" ng-cloak>
      <div class="vehicle_loophole">
           <div class="vehicle_box_top">
               <span class="vehicle_icon_box">
                   <img src="/images/alert/search_icon.png" class="search_icon" alt="">
                   <input type="text" class="vehicle_search_input" ng-focus="get_vehicle_search_focus()"
                       ng-blur="get_vehicle_search_blur()" ng-keyup="myKeyup_vehicle_search(searchData.client_ip)"
                       placeholder="输入关键字" ng-model="searchData.client_ip">
                   <ul class="container_ul" ng-show="select_vehicle_search_if">
                       <li ng-repeat="item in select_vehicle_ip" class="li_hover"
                           ng-click="select_vehicle_ip_item(item.client_ip)">
                           {{item.client_ip}}
                       </li>
                   </ul>
               </span>
               <select class="vehicle_search_input"  ng-model="searchData.category"
                   ng-options="x.num as x.type for x in category_select"></select>

               <select class="vehicle_search_input"  ng-model="searchData.company"
                   ng-options="x.num as x.type for x in company_select"></select>


               <div class="vehicle_search_time">
                    <img src="/images/report/time.png" class="time_icon" alt="">
                    <input class="input_box" id="start_picker" readonly type="text" placeholder="时间">
               </div>

               <span class="vehicle_icon_box">
                     <img src="/images/alert/search_icon.png" class="search_icon" alt="">
                     <input type="text" class="vehicle_search_input" ng-focus="get_client_ip_focus()"
                         ng-blur="get_client_ip_blur()" ng-keyup="myKeyup_client_ip(searchData.client_ip)"
                         placeholder="标签" ng-model="searchData.client_ip">
                     <ul class="container_ul" ng-show="select_client_ip_if">
                         <li ng-repeat="item in select_client_ip" class="li_hover"
                             ng-click="select_client_ip_item(item.client_ip)">
                             {{item.client_ip}}
                         </li>
                     </ul>
                </span>
                <button class="button_search" ng-click="search()">搜索</button>
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
              </tr>
              <tr class="loophole_table_tr" style="cursor: pointer;" ng-repeat="item in pages.data" ng-click="detail(item)">
                  <td>
                    <img src="/images/alert/h.png" ng-if="item.degree === '高'" alt="">
                    <img src="/images/alert/m.png" ng-if="item.degree === '中'" alt="">
                    <img src="/images/alert/l.png" ng-if="item.degree === '低'" alt="">
                    <span ng-bind="item.hid"> </span>
                  </td>
                  <td ng-bind="item.headline"></td>
                  <td ng-bind="item.describe"></td>
                  <td ng-bind="item.source"></td>
                  <td class="td_operation">
                      <button class="btn_loophole" ng-class="{'active':it.status}" ng-repeat="it in item.type"
                      ng-click="it.status = !it.status">
                          {{it.name}}
                          <img class="loop_img" src="/images/loophole/tick.png" alt="" ng-show="it.status">
                      </button>
                  </td>
              </tr>
          </table>
          <p>
              <span class="loophole_result_length">共有<span
                      ng-bind="pages.data.length"></span>条结果</span>
          </p>
          <div style="padding: 0px; position: relative;height:60px;">
               <ul class="pagination pagination-sm  pull-right ng-cloak" style="margin-right:36px;">
                   <li><a href="javascript:void(0);" ng-click="getPage(pages.pageNow-1)"
                           ng-if="pages.pageNow>1">上一页</a></li>
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
</section>
<script src="/js/controllers/vehicleintelligence/vehicle_tel_loophole.js"></script>

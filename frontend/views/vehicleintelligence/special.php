<?php
/* @var $this yii\web\View */
$this->title = '行业情报111';
?>
<link rel="stylesheet" href="/css/vehicleintelligence/special.css">
<section class="vehicle_special_container" ng-app="myApp" ng-controller="vehicleTelSpecialCtrl" ng-cloak>
    <div class="vehicle_special">
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
            <!--<select class="vehicle_search_input source_input" ng-model="seach_data.label_id"
                ng-options="x.id as x.label_name for x in search_tag_list">
            </select>-->

            <div class="vehicle_item_box" title="点击标签列表选择">
                <div class="tag_add_box">
                  <p class="tag_tip" ng-show="label_info.tab_tag_list == 0">标签</p>
                  <ul class="tag_box_ul" ng-if="alert_item.tag_list.length!=0">
                      <li ng-repeat="item in label_info.tab_tag_list track by $index">
                          <span>{{item.label_name}}</span>
                          <!--<img src="/images/set/tag_del.png" alt="" class="tag_icon" ng-click="tag_del(item,$index)">-->
                      </li>
                  </ul>
                  <!--<input class="tag_input" placeholder="标签" ng-keyup="mykey($event)"
                      ng-focus="tag_focus()" ng-change="tag_change(alert_item.tag_list_str)" ng-blur="tag_blur()"
                      type="text" ng-model="alert_item.tag_list_str">-->
                </div>
               <!-- <ul class="tag_list_box" ng-show="tag_list_if">
                  <li  ng-repeat="item in label_info.tag_list track by $index" ng-click="tag_list_item(item)">
                      {{item.label_name}}
                  </li>
                </ul>-->
            </div>

            <!-- 搜索 -->
            <button class="button_search" ng-click="get_page()" ng-keyup="label_keyup($event)">搜索</button>
       </div>

        <div class="vehicle_search_country">
            <ul class="search_country">
                <li class="search_country_item" ng-repeat="item in label_data" ng-hide="$index>toggleCount">
                     <span class="title">{{item.name}}:</span>
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

        <div class="vehicle_search_covenant">
            <p class="covenant_tack">
              <span class="tack">共有<span class="num">{{pages.count}}</span>条结果</span>
            </p>
            <ul class="covenant_lists">
               <li class="covenant_lists_item" ng-repeat="item in pages.data">
                  <p class="covenant_1">
                     <img class="status" src="/images/alert/h.png" ng-if="item.level === '高'" alt="">
                     <img class="status" src="/images/alert/m.png" ng-if="item.level === '中'" alt="">
                     <img class="status" src="/images/alert/l.png" ng-if="item.level === '低'" alt="">
                     <span class="name">{{item.title}}</span>
                  </p>
                  <p class="covenant_2">
                     <span class="item"><img class="covenant_img" src="/images/login/user.png" alt=""/><span class="ct person">{{item.publish_user}}</span></span>
                     <span class="item"><embed class="cov_time" src="/images/alert/time.svg" width="16" height="16" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/" />
                     <span class="ct time">{{item.first_seen_time*1000 | date : 'yyyy-MM-dd'}}</span></span>
                     <span class="item"><embed class="cov_time" src="/images/alert/twitter.svg" width="16" height="16" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/" />
                     <span class="ct twitter">{{item.sourse}}</span></span>
                  </p>
                  <p class="covenant_3">{{item.detail}}</p>
                  <p class="covenant_4"><button class="covenant_btn">系统安全</button></p>
               </li>
            </ul>
        </div>
    </div>

</section>
<script src="/js/controllers/vehicleintelligence/vehicle_tel_special.js"></script>

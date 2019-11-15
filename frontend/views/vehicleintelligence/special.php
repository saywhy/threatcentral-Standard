<?php
/* @var $this yii\web\View */
$this->title = '行业情报';
?>
<link rel="stylesheet" href="/css/vehicleintelligence/special.css">
<section class="vehicle_special_container" ng-app="myApp" ng-controller="vehicleTelSpecialCtrl" ng-cloak>
    <div class="vehicle_special">
        <div class="vehicle_box_top">

            <!-- 输入关键字 -->
            <span class="vehicle_icon_box">
                <img src="/images/alert/search_icon.png" class="search_icon" alt="">
                <input type="text" style="padding-left:34px;" class="vehicle_search_input" placeholder="关联编号/行业关键字"
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

        <div class="vehicle_search_covenant">
            <p class="covenant_tack">
              <span class="tack">共有<span class="num">{{pages.count}}</span>条结果</span>
            </p>
            <ul class="covenant_lists">
               <li class="covenant_lists_item" ng-repeat="item in pages.data" ng-click="list_item_click($event,item);">
                  <p class="covenant_1">
                     <img class="status" src="/images/alert/h.png" ng-if="item.level === '高'" alt="">
                     <img class="status" src="/images/alert/m.png" ng-if="item.level === '中'" alt="">
                     <img class="status" src="/images/alert/l.png" ng-if="item.level === '低'" alt="">
                     <span class="name">{{item.title}}</span>
                  </p>
                  <p class="covenant_2">
                     <span class="item"><img class="covenant_img" src="/images/loophole/user.png" alt=""/><span class="ct person">{{item.publish_user}}</span></span>
                     <span class="item"><img class="cov_img" src="/images/loophole/loop_8.png" alt=""/>
                     <span class="ct time">{{item.first_seen_time*1000 | date : 'yyyy-MM-dd'}}</span></span>
                     <span class="item"><img class="cov_img" src="/images/loophole/loop_5.png" alt=""/><span class="ct twitter">{{item.sourse}}</span></span>
                  </p>
                  <p class="covenant_3">{{item.detail}}</p>
                  <p class="covenant_4"><a ng-repeat="tm in item.label_name" class="covenant_btn">{{tm}}</a></p>
               </li>
            </ul>
        </div>
    </div>


    <!-- 新增标签弹窗 -->
    <div style="display:none;" id="vehicle_special_box">
        <div id="vehicle_special">
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
                <p class="item">
                  <span class="l_item1"><span class="l_name">链接：</span><span class="l_value">https://threateye.hoohoolab.com/#/app/set_black_list</span></span>
                </p>
            </div>
            <dl class="l_bom">
                <dt class="l_title">行业描述：</dt>
                <dd class="l_content">{{label_item_data.detail}}</dd>
            </dl>
        </div>
    </div>

</section>
<script src="/js/controllers/vehicleintelligence/vehicle_tel_special.js"></script>

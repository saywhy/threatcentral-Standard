<?php
/* @var $this yii\web\View */
$this->title = '行业情报';
?>
<link rel="stylesheet" href="/css/vehicleintelligence/special.css">
<section class="vehicle_special_container" ng-app="myApp" ng-controller="vehicleTelSpecialCtrl" ng-cloak>
    <div class="vehicle_special">
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

         <div class="vehicle_search_country">
           <ul class="search_country">
                <li class="search_country_item">
                 <span class="title">Country:</span>
                 <span class="lists">
                     <span class="item">China</span>
                     <span class="item">Thailand</span
                 </span>
                </li>
                <li class="search_country_item">
                  <span class="title">Company Impacted:</span>
                  <span class="lists">
                      <span class="item">DealerLeads</span>
                      <span class="item active">BMW</span>
                      <span class="item">Benz</span>
                  </span>
                </li>
                <li class="search_country_item">
                   <span class="title">Physical/Remote access:</span>
                   <span class="lists">
                       <span class="item">Physical access</span>
                       <span class="item">Remote access</span>
                   </span>
                </li>
                <li class="search_country_item" ng-show="toggleCountry">
                    <span class="title">Country:</span>
                    <span class="lists">
                        <span class="item">China</span>
                        <span class="item">Thailand</span
                    </span>
                </li>
                <li class="search_country_item" ng-show="toggleCountry">
                     <span class="title">Company Impacted:</span>
                     <span class="lists">
                         <span class="item">DealerLeads</span>
                         <span class="item active">BMW</span>
                         <span class="item">Benz</span>
                     </span>
                </li>
                <li class="search_country_item" ng-show="toggleCountry">
                    <span class="title">Physical/Remote access:</span>
                    <span class="lists">
                      <span class="item">Physical access</span>
                      <span class="item">Remote access</span>
                    </span>
                </li>
           </ul>
           <div class="search_toggle">
               <a class="toggle" ng-class="{'active':toggleCountry}"
                href="javascript:void(0);" ng-click="toggleCountry =! toggleCountry">
                   <span class="caret"></span>
                   <span ng-show="!toggleCountry">展开</span><span ng-show="toggleCountry">收起</span>更多
               </a>
           </div>
         </div>

         <div class="vehicle_search_covenant">
            <p class="covenant_tack">
              <span class="tack">共有<span class="num">2</span>条记录</span>
            </p>
            <ul class="covenant_lists">
               <li class="covenant_lists_item">
                  <p class="covenant_1">
                     <span class="status">高</span>
                     <span class="name">Covenant：针对红队设计的命令行控制框架</span>
                  </p>
                  <p class="covenant_2">
                     <span class="item"><img class="covenant_img" src="/images/login/user.png" alt=""/><span class="ct person">Admin</span></span>
                     <span class="item"><i class="fa fa-cog"></i><span class="ct time">2019-09-26</span></span>
                     <span class="item"><i class="fa fa-area-chart"></i><span class="ct twitter">Twitter</span></span>
                  </p>
                  <p class="covenant_3">上海宽娱数码科技有限公司成立于2005年08月12日，注册地位于上海市杨浦区政立路489号801室，法人代表为陈睿。技术开发、技术服务；计算机软硬件的销售月12日，注册地位于上海市杨浦区政立路489号801室。</p>
                  <p class="covenant_4"><button class="covenant_btn">系统安全</button></p>
               </li>
               <li class="covenant_lists_item">
                  <p class="covenant_1">
                     <span class="status">高</span>
                     <span class="name">Covenant：针对红队设计的命令行控制框架</span>
                  </p>
                  <p class="covenant_2">
                     <span class="item"><img class="covenant_img" src="/images/login/user.png" alt=""/><span class="ct person">Admin</span></span>
                     <span class="item"><i class="fa fa-cog"></i><span class="ct time">2019-09-26</span></span>
                     <span class="item"><i class="fa fa-area-chart"></i><span class="ct twitter">Twitter</span></span>
                  </p>
                  <p class="covenant_3">上海宽娱数码科技有限公司成立于2005年08月12日，注册地位于上海市杨浦区政立路489号801室，法人代表为陈睿。技术开发、技术服务；计算机软硬件的销售月12日，注册地位于上海市杨浦区政立路489号801室。</p>
                  <p class="covenant_4"><button class="covenant_btn">系统安全</button></p>
                </li>
            </ul>
         </div>
    </div>

</section>
<script src="/js/controllers/vehicleintelligence/vehicle_tel_special.js"></script>

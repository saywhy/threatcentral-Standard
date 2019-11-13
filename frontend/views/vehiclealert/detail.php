<?php
/* @var $this yii\web\View */

$this->title = '车联网预警详情';
?>
<link rel="stylesheet" href="/css/vehiclealert/detail.css">
<section class="vehicle_detail_container" ng-app="myApp" ng-controller="vehicleDetailCtrl" ng-cloak>
    <div class="vehicle_info">
        <div class="vehicle_info_top">
           <img class="status" src="/images/alert/h.png" alt="">
          <!-- <img class="status" src="/images/alert/m.png" ng-if="item.level === '中'" alt="">
           <img class="status" src="/images/alert/l.png" ng-if="item.level === '低'" alt="">-->
           <span class="name">Hackmd 1.3.0 xss 漏洞应急报告</span>
        </div>
        <div class="vehicle_info_bottom">
           <span class="item1"><span class="name">CVE ID：</span><span class="price">CVE-2018-0909</span></span>
           <span class="item2"><span class="name">漏洞编号：</span><span class="price">1009</span></span>
           <span class="item3"><span class="name">预警时间：</span><span class="price">2019-09-12</span></span>
           <span class="item4"><span class="name">预警状态：</span><span class="price">未处理</span></span>
        </div>
    </div>
</section>

<script type="text/javascript" src="/plugins/angular/angular-sanitize.min.js"></script>
<script type="text/javascript" src="/js/controllers/vehiclealert/detail.js"></script>


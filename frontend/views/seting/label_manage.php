<?php
/* @var $this yii\web\View */
$this->title = '标签管理';
?>
<link rel="stylesheet" href="/css/set/label.css">
<section class="label_container" ng-app="myApp" ng-controller="labelCtrl" ng-cloak>
    <div class="label_search_box">
         <input class="label_box_mid_input" placeholder="请输入标签关键字" type="text" ng-model="token_institution">
         <img src="/images/alert/search_icon.png" class="search_icon" alt="">
         <button class="label_box_mid_button_left" ng-click="token_search()">搜索</button>
         <button class="label_box_mid_button_right" ng-click="token_add()">新增标签</button>
    </div>
    <div class="label_sort_box">
         <ul class="label-lists">
            <li class="item">
               <a class="toggle" href="javascript:void(0);">
                  <span class="caret"></span>
                  <span class="name">Long/Short range<span>
              </a>
              <div class="toggle_content">
                <button class="btn_label"><img class="btn_img" src="/images/set/label_edit.png"/><span class="btn_span">Long-rangle</span></button>
                <button class="btn_label"><img class="btn_img" src="/images/set/label_edit.png"/><span class="btn_span">Short-rangle</span></button>
                <button class="btn_label"><img class="btn_img" src="/images/set/label_add.png"/><span class="btn_span">新增标签</span></button>
              </div>
            </li>
            <li class="item">
               <a class="toggle" href="javascript:void(0);">
                  <span class="caret"></span>
                  <span class="name">Physical/Remote access<span>
              </a>
              <div class="toggle_content">
                <button class="btn_label"><img class="btn_img" src="/images/set/label_edit.png"/><span class="btn_span">Physical access</span></button>
                <button class="btn_label"><img class="btn_img" src="/images/set/label_edit.png"/><span class="btn_span">Remote access</span></button>
                <button class="btn_label"><img class="btn_img" src="/images/set/label_add.png"/><span class="btn_span">新增标签</span></button>
              </div>
            </li>

            <li class="item">
               <a class="toggle" href="javascript:void(0);">
                  <span class="caret"></span>
                  <span class="name">Access Complexity<span>
              </a>
              <div class="toggle_content">
                <button class="btn_label"><img class="btn_img" src="/images/set/label_add.png"/><span class="btn_span">新增标签</span></button>
              </div>
            </li>
         </ul>
    </div>
</section>
<script src="/js/controllers/seting/labelList.js"></script>

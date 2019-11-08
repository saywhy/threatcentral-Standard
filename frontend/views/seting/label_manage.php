<?php
/* @var $this yii\web\View */
$this->title = '标签管理';
?>
<link rel="stylesheet" href="/css/set/label.css">
<section class="label_container" ng-app="myApp" ng-controller="labelCtrl" ng-cloak>
    <div class="label_search_box">
         <input class="label_box_mid_input" placeholder="请输入标签关键字" type="text" ng-model="label_name"
         ng-keyup="label_keyup($event)">
         <img src="/images/alert/search_icon.png" class="search_icon" alt="">
         <button class="label_box_mid_button_left" ng-click="label_search()">搜索</button>
         <button class="label_box_mid_button_right" ng-click="label_add('',$event)">新增标签</button>
    </div>
    <div class="label_sort_box">
         <ul class="label-lists">
            <li class="item" ng-repeat="item in label_data" ng-click="item.status = !item.status">
              <a class="toggle" ng-class="{'active':item.status}" href="javascript:void(0);">
                  <span class="name">{{item.name | labelNull}}<span>
              </a>
              <div class="toggle_content" ng-show="item.status">
                <button class="btn_label" ng-repeat="it in item.label" ng-click="label_edit(it,$event);">
                    <img class="btn_img" src="/images/set/label_edit.png"/>
                    <span class="btn_span" title="{{it.label_name}}">{{it.label_name}}</span>
                </button>
                <button class="btn_label" ng-click="label_add(item.name,$event);">
                    <img class="btn_img" src="/images/set/label_add.png"/>
                    <span class="btn_span">新增标签</span>
                </button>
              </div>
            </li>
         </ul>
    </div>

    <!--*********************************************************-->
    <!-- 新增标签弹窗 -->
    <div style="display: none;" id="lab_add_box">
        <div id="lab_add">
            <div class="lab_top">
                <p class="lab_name">标签类别<span class="lab_tab">*</span></p>
                <div class="lab_item">
                    <img src="/images/set/label_triangle_down.png" class="lab_item_icon" alt="">
                    <input type="text" class="lab_mid_name" ng-class="{'disabled':category_status}" placeholder="下拉选择或直接输入"  ng-model="label_data_info.category_name"
                     ng-disabled="category_status" ng-click="label_category_select.status = true" ng-change="label_category_click(label_data_info.category_name);" required>
                    <ul class="lab_top_list" ng-show="label_category_select.status">
                       <li class="item" ng-repeat="item in label_category_select.category" ng-click="category_click(item.category_name);">{{item.category_name}}</li>
                    </ul>
                </div>
            </div>
            <div class="lab_mid">
                <p class="lab_name">标签名称<span class="lab_tab">*</span></p>
                <div class="lab_item">
                   <input type="text" class="lab_mid_name" placeholder="请输入标签名称"  ng-model="label_data_info.label_name" required>
                </div>
            </div>
            <div class="lab_bom">
                <p class="lab_name">标签描述</p>
                <textarea class="token_bom_content"
                placeholder="请输入标签描述内容" ng-model="label_data_info.detail"></textarea>
            </div>
            <div class="lab_btn_box">
                <button class="lab_btn_ok" ng-click="lab_save()">保存</button>
                <button class="lab_btn_cancel" ng-click="lab_cancel()">取消</button>
            </div>
        </div>
    </div>

    <!-- 编辑标签弹窗 -->
    <div style="display: none;" id="lab_edit_box">
        <div id="lab_edit">
            <div class="lab_top">
                <p class="lab_name">标签类别<span class="lab_tab">*</span></p>
                <div class="lab_item">
                    <img src="/images/set/label_triangle_down.png" class="lab_item_icon" alt="">
                    <input type="text" class="lab_mid_name" ng-class="{'disabled':category_status}" placeholder="下拉选择或直接输入"  ng-model="label_data_info.category_name"
                     ng-disabled="category_status"  required>
                    <ul class="lab_top_list" ng-show="label_category_select.status">
                       <li class="item" ng-repeat="item in label_category_select.category" ng-click="category_click(item.category_name);">{{item.category_name}}</li>
                    </ul>
                </div>
            </div>
            <div class="lab_mid">
                <p class="lab_name">标签名称<span class="lab_tab">*</span></p>
                <div class="lab_item">
                   <input type="text" class="lab_mid_name" placeholder="请输入标签名称"  ng-model="label_data_info.label_name" required>
                </div>
            </div>
            <div class="lab_bom">
                <p class="lab_name">标签描述</p>
                <textarea class="token_bom_content"
                placeholder="请输入标签描述内容" ng-model="label_data_info.detail"></textarea>
            </div>

            <div class="lab_btn_box">
                <button class="lab_btn_ok" ng-click="lab_edit_save()">保存</button>
                <button class="lab_btn_cancel" ng-click="lab_cancel()">取消</button>
                <button class="lab_btn_delete" ng-click="lab_edit_delete()">删除标签</button>
            </div>
        </div>
    </div>

    <!-- 删除标签弹窗 -->
    <div style="display: none;" id="lab_delete_box">
        <div id="lab_delete">
            <div class="lab_content">
               <p class="lab_tip">有{{intelligence}}条情报在使用这个标签，请确认是否删除?</p>
            </div>
            <div class="lab_btn_box">
                <button class="lab_btn_ok" ng-click="lab_delete_ok()">确认</button>
                <button class="lab_btn_cancel" ng-click="lab_delete_cancel()">取消</button>
            </div>
        </div>
    </div>

    <!-- 合并标签弹窗 -->
    <div style="display: none;" id="lab_merge_box">
        <div id="lab_merge">
            <div class="lab_content">
               <p class="lab_tip">该标签已经存在，请确认是否合并?</p>
            </div>
            <div class="lab_btn_box">
                <button class="lab_btn_ok" ng-click="lab_merge_ok()">确认</button>
                <button class="lab_btn_cancel" ng-click="lab_merge_cancel()">取消</button>
            </div>
        </div>
    </div>
</section>
<script src="/js/controllers/seting/label_manage.js"></script>

<?php
/* @var $this yii\web\View */
$this->title = '标签管理';
?>
<link rel="stylesheet" href="/css/set/label.css">
<section class="label_container" ng-app="myApp" ng-controller="labelCtrl" ng-cloak>
    <div class="label_search_box">
         <input class="label_box_mid_input" placeholder="请输入标签或类别关键字" type="text" ng-model="label_name"
         ng-keyup="label_keyup($event)">
         <img src="/images/alert/search_icon.png" class="search_icon" alt="">
         <button class="label_box_mid_button_left" ng-click="get_label_list();">搜索</button>
         <button class="label_box_mid_button_right" ng-click="label_edit($event,'','add');">新增标签</button>
    </div>

    <div class="label_sort_box">
         <ul class="label-lists">
            <li class="item" ng-repeat="($idx,item) in label_data" ng-value="item.label[0].category_id">
              <!-- 名称和操作 -->
              <div class="toggle_cate">
                  <div class="tog_cate">
                    <span class="name">{{item.name | labelNull}}<span>
                  </div>
                  <div class="tog_list">
                    <div class="tog_edit_seat">
                         <img ng-if="item.name != ''" class="tog_img tog_img_edit" src="/images/set/label_edit.png"
                          title="编辑标签类别" ng-click="category_edit($event,item);"/>
                    </div>
                    <div class="tog_edit_seat">
                        <img ng-if="item.name != ''" class="tog_img tog_img_top" ng-value="$idx" src="/images/set/is_top.png" title="置顶"/>
                    </div>
                    <div class="tog_edit_seat">
                       <img ng-if="item.name != ''" class="tog_img tog_img_drag" src="/images/set/label_drag_h.png" title="拖动"/>
                    </div>
                    <a class="tog_arrow" ng-class="{'active':item.status}" href="javascript:void(0);"
                     ng-click="item.status = !item.status">
                       <span class="name" ng-show="item.status">收起</span>
                       <span class="name" ng-show="!item.status">展开</span>
                    </a>
                  </div>
              </div>
              <!-- 标签列表 -->
              <div class="toggle_content" ng-show="item.status" style="font-size:0;">
                <ul class="sortable sortable{{$idx}}">
                    <li ng-repeat="it in item.label" class="sortable_list" ng-if="it.label_name != null" ng-value="it.id">
                        <button class="btn_label">
                            <div class="b_label">
                                <span class="b_span" title="{{it.label_name}}">{{it.label_name}}</span>
                            </div>
                        </button>
                        <div class="btn_img">
                            <img class="b_img b_img_drag b_img_drag{{$idx}}" src="/images/set/label_drag_v.png"/>
                            <img class="b_img b_img_edit" title="编辑标签" ng-click="label_edit($event,it,'edit');" src="/images/set/label_edit.png"/>
                        </div>
                    </li>
                </ul>
                <button class="btn_label_add" ng-click="label_edit($event,item.name,'add');">
                    <img class="ba_img" src="/images/set/label_add.png"/>
                    <span class="ba_span">新增标签</span>
                </button>
              </div>
            </li>
         </ul>
    </div>


    <!-- ****************************************************************************************** -->
    <!-- 新增或编辑标签弹窗 -->
    <div style="display: none;" id="lab_edit_box">
        <div id="lab_edit">
            <div class="lab_top">
                <p class="lab_name">标签类别<!--<span class="lab_tab">*</span>--></p>
                <div class="lab_item">
                    <img src="/images/set/label_triangle_down.png" class="lab_item_icon" alt="">
                    <input type="text" class="lab_mid_name"  placeholder="下拉选择或直接输入"  ng-model="label.category_name"
                       ng-keyup="lab_key_func($event);" ng-click="lab_click_open();" ng-change="lab_change_func();" ng-blur="label.status = false">
                </div>
                <ul class="lab_top_list" id="lab_top_list" ng-show="label.status">
                   <li class="item" ng-class="{'active':label.active_index == $index}" ng-repeat="item in label.lists"
                   ng-mousedown="lab_down_func(item.category_name,$index);">{{item.category_name}}</li>
                </ul>
            </div>
            <div class="lab_mid">
                <p class="lab_name">标签名称<span class="lab_tab">*</span></p>
                <div class="lab_item">
                   <input type="text" class="lab_mid_name" placeholder="请输入标签名称"  ng-model="label.label_name" required>
                </div>
            </div>
            <div class="lab_bom">
                <p class="lab_name">标签描述</p>
                <textarea class="token_bom_content"
                placeholder="请输入标签描述内容" ng-model="label.detail"></textarea>
            </div>

            <div class="lab_btn_box" ng-show = "label.types == 'add'">
                <button class="lab_btn_ok" ng-click="lab_save()">保存</button>
                <button class="lab_btn_cancel" ng-click="lab_cancel()">取消</button>
            </div>
            <div class="lab_btn_box" ng-show = "label.types == 'edit'">
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
               <p class="lab_tip">有{{intelligence}}条情报在使用这个标签，删除这个标签，原有情报将不再使用此标签。请确认是否删除?</p>
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

    <!-- ****************************************************************************************** -->
    <!-- 编辑标签类别弹窗 -->
    <div style="display: none;" id="cate_edit_box">
        <div id="cate_edit">
            <div class="cate_top">
                <p class="cate_name">标签类别名称<span class="cate_tab">*</span></p>
            <!--<div class="cate_item">
                    <input type="text" class="cate_mid_name" placeholder="下拉选择或直接输入"  ng-model="category.name"
                      ng-keyup="cate_key_func($event);" ng-click="cate_click_open();"
                      ng-change="cate_change_func();" ng-blur="category.status = false;">
                </div>-->
                <div class="cate_item">
                    <input type="text" class="cate_mid_name" placeholder="请输入标签类别"  ng-model="category.name">
                </div>
                <ul class="cate_top_list" id="cate_top_list" ng-show="category.status">
                   <li class="item" ng-class="{'active':category.active_index == $index}" ng-repeat="item in category.lists"
                   ng-mousedown="cate_down_func(item.category_name,$index);">{{item.category_name}}</li>
                </ul>
            </div>
            <div class="cate_btn_box">
                <button class="cate_btn_ok" ng-click="cate_edit_save();">保存</button>
                <button class="cate_btn_cancel" ng-click="cate_edit_cancel();">取消</button>
                <button class="cate_btn_delete" ng-click="cate_edit_delete();">删除类别</button>
            </div>
        </div>
    </div>

    <!-- 删除标签类别1 -->
    <div style="display: none;" id="cate_delete_box_1">
        <div id="cate_delete_1">
            <div class="cate_content">
               <p class="cate_tip">该标签类别下还存在标签，请处理后再删除本分类。</p>
            </div>
            <div class="cate_btn_delete_box">
                <button class="cate_btn_aware" ng-click="cate_delete_aware()">知道了</button>
            </div>
        </div>
    </div>

    <!-- 删除标签类别2 -->
    <div style="display: none;" id="cate_delete_box_2">
        <div id="cate_delete_2">
            <div class="cate_content">
               <p class="cate_tip">请确认是否删除此标签分类？</p>
            </div>
            <div class="cate_btn_delete_box">
                <button class="cate_btn_ok" ng-click="cate_delete_ok()">确认</button>
                <button class="cate_btn_cancel" ng-click="cate_delete_cancel();">取消</button>
            </div>
        </div>
    </div>

</section>
<script src="/js/controllers/seting/label_manage.js"></script>

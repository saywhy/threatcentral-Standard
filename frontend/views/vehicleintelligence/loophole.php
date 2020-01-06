<?php
/* @var $this yii\web\View */
$this->title = '漏洞情报';
?>
<link rel="stylesheet" href="/css/vehicleintelligence/loophole.css">
<section class="vehicle_loophole_container" ng-app="myApp" ng-controller="vehicleTelLoopholeCtrl" ng-cloak>
        <div class="vehicle_loophole">
            <div class="vehicle_box_top">
                <!-- 输入关键字 -->
                <span class="vehicle_icon_box">
                   <img src="/images/alert/search_icon.png" class="search_icon" alt="">
                   <input type="text" style="padding-left:34px;" class="vehicle_search_input" placeholder="关联编号/漏洞关键字"
                        ng-model="seach_data.key_word" ng-keyup="vehicle_key_up($event)">
                </span>

                <!-- 漏洞来源 -->
               <div class="vehicle_icon_box">
                   <img src="/images/set/label_triangle_down.png" class="select_down_icon" alt="">
                   <input type="text" placeholder="漏洞来源" ng-model="seach_data.source" ng-focus="search_focus('source')"
                        ng-blur="search_blur('source');" class="search_input" readonly>
                   <ul class="select_list_box" ng-if="search_box_ul.source" style="height:107px;margin:0">
                       <li ng-mousedown="search_choose_item(item,$index,'source');"
                           ng-repeat="item in loop_source track by $index">
                           {{item}}
                       </li>
                   </ul>
               </div>

               <!-- 漏洞级别 -->
                <div class="vehicle_icon_box">
                   <img src="/images/set/label_triangle_down.png" class="select_down_icon" alt="">
                   <input type="text" placeholder="漏洞级别" ng-model="seach_data.level" ng-focus="search_focus('level')"
                        ng-blur="search_blur('level');" class="search_input" readonly>
                   <ul class="select_list_box" ng-if="search_box_ul.level" style="height:107px;margin:0">
                       <li ng-mousedown="search_choose_item(item.status, $index, 'level');"
                           ng-repeat="item in search_level track by $index">
                           {{item.status}}
                       </li>
                   </ul>
               </div>

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
        </div>

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

        <div class="loophole_table_content">
            <table class="table table-striped ng-cloak">
              <tr class="loophole_table_tr">
                  <th>情报 ID</th>
                  <th>漏洞标题</th>
                  <th>漏洞描述</th>
                  <th>情报来源</th>
                  <th>标签类型</th>
                  <th>获取时间</th>
              </tr>
              <tr class="loophole_table_tr" style="cursor: pointer;" ng-repeat="item in pages.data"
              ng-click="list_item_click($event,item);">
                  <td>
                    <img src="/images/alert/h.png" ng-if="item.level === '高'" alt="">
                    <img src="/images/alert/m.png" ng-if="item.level === '中'" alt="">
                    <img src="/images/alert/l.png" ng-if="item.level === '低'" alt="">
                    <span ng-bind="item.id"> </span>
                  </td>
                  <td ng-bind="item.title"></td>
                  <td ng-bind="item.detail" style="color:#0070ff;"></td>
                  <td ng-bind="item.sourse"></td>
                  <td class="td_operation" style="white-space: nowrap;text-overflow: ellipsis;">
                      <button class="btn_loophole" ng-class="{'active':it.status}" ng-repeat="it in item.label_name">
                          {{it}}
                          <img class="loop_img" src="/images/loophole/tick.png" alt="" ng-show="it.status">
                      </button>
                  </td>
                  <td>{{item.first_seen_time*1000 | date : 'yyyy-MM-dd'}}</td>
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

        <!-- 新增标签弹窗 -->
        <div style="display:none;" id="vehicle_loophole_box">
            <div id="vehicle_loophole">
                <h1 class="l_top">{{label_item_data.title}}</h1>
                <ul class="l_mid">
                  <li class="item">
                        <img class="i_img" src="/images/loophole/sp1.png" alt=""/>
                        <h4 class="title">漏洞等级：</h4>
                        <span class="stance">高危</span>
                  </li>
                  <li class="item">
                        <img class="i_img" src="/images/loophole/sp2.png" alt=""/>
                        <h4 class="title">发现时间：</h4>
                        <span class="stance">2019-09-26</span>
                  </li>
                   <li class="item">
                        <img class="i_img" src="/images/loophole/sp3.png" alt=""/>
                        <h4 class="title">情报来源：</h4>
                        <span class="stance">内部系统</span>
                    </li>
                    <li class="item">
                        <img class="i_img" src="/images/loophole/sp4.png" alt=""/>
                        <h4 class="title">影响产品：</h4>
                        <span class="stance">Windows 10 Version 1067 for 32-bit systems</span>
                    </li>
                    <li class="item">
                        <img class="i_img" src="/images/loophole/sp7.png" alt=""/>
                        <h4 class="title">漏洞描述：</h4>
                        <span class="stance s_content">Limesurvey before 3.17.14 allows remote attackers to remot Limesurvey before 3.17.14 allows remote attackers to remot Limesurvey before 3.17.14 allows remote attackers to remote Limesurvey before 3.17.14 allows remote attackers to remote.</span>
                    </li>
                    <li class="item">
                        <img class="i_img" src="/images/loophole/sp8.png" alt=""/>
                        <h4 class="title">建议处理措施：</h4>
                        <span class="stance s_content">Windows DNS (Domain Name System) 服务器处理请求时存在缺陷，从而导致存在远程执行代码漏洞，远程且未经授权的攻击者通过向 Windows DNS 服务端发送精心构造的恶意请求，即能以本地系统账户权限执行任意代码。</span>
                    </li>
                    <li class="item">
                        <img class="i_img" src="/images/loophole/sp6.png" alt=""/>
                        <h4 class="title">标签：</h4>
                        <p class="s_label" style="margin-top:6px;">
                          <span class="s_name">标签类别1：</span>
                          <span class="s_lab">
                            <!--<a ng-repeat="tm in item.label_name" class="s_lab_val">{{tm}}</a>-->
                            <a class="s_lab_val">消息泄露</a>
                            <a class="s_lab_val">跨站脚本</a>
                            <a class="s_lab_val">跨站脚本</a>
                          </span>
                        </p>
                        <p class="s_label">
                          <span class="s_name">标签类别2：</span>
                          <span class="s_lab">
                            <!--<a ng-repeat="tm in item.label_name" class="s_lab_val">{{tm}}</a>-->
                            <a class="s_lab_val">消息泄露</a>
                            <a class="s_lab_val">跨站脚本</a>
                            <a class="s_lab_val">跨站脚本</a>
                          </span>
                        </p>
                    </li>
                </ul>
            </div>
       </div>
</section>
<script src="/js/controllers/vehicleintelligence/vehicle_tel_loophole.js"></script>

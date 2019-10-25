<!--侧边栏 ycl20191021-->

<div id="asideApp" ng-class="{'active':alertDetail}" ng-controller="asideCtrl" ng-cloak>

    <!--首页-->
    <ul class="aside-lists" ng-show="indexCode === 0">
        <li class="aside-item">
            <a class="aside-item-a" ng-click="menu_aside.site.system = !menu_aside.site.system">
                <i class="fa fa-home"></i>
                <span class="name">IT 系统首页</span>
                <span class="caret" ng-class="{'active':!menu_aside.site.system}"></span>
            </a>
            <ul class="aside-lists-second" ng-show="menu_aside.site.system">
                <li class="aside-item-second <?=isActive(['/site/index', '/'])?>" ng-if="menu_list.index_overview">
                    <a class="aside-item-second-a" href="<?=getPath('/site/index')?>">
                        <span>概览</span>
                    </a>
                </li>
                <li class="aside-item-second <?=isActive(['/map.html'])?>" ng-if="menu_list.index_BigScreen">
                    <a class="aside-item-second-a" href="<?=getPath('/map.html')?>">
                        <span>可视化大屏</span>
                    </a>
                </li>
            </ul>
        </li>

        <!--<li class="aside-item">
             <a class="aside-item-a" href="javascript:void(0);">
                <i class="fa fa-home"></i>
                <span class="name">车联网首页</span>
                <span class="caret"></span>
             </a>
        </li>-->
    </ul>

    <!--情报-->
    <ul class="aside-lists" ng-show="indexCode === 1">
        <li class="aside-item">
            <a class="aside-item-a" ng-click="menu_aside.search.system = !menu_aside.search.system">
                <i class="fa fa-podcast"></i>
                <span class="name">IT 系统情报</span>
                <span class="caret" ng-class="{'active':!menu_aside.search.system}"></span>
            </a>
            <ul class="aside-lists-second" ng-show="menu_aside.search.system">
                <li class="aside-item-second <?=isActive(['/search/index'])?>"
                  ng-if="menu_list.intelligence_query">
                  <a class="aside-item-second-a" href="<?=getPath('/search/index')?>" >
                      <span>情报查询</span>
                  </a>
                </li>
                <li class="aside-item-second <?=isActive(['/agent/index'])?>"
                  ng-if="menu_list.intelligence_extract">
                  <a class="aside-item-second-a" href="<?=getPath('/agent/index')?>" >
                      <span>情报聚合</span>
                  </a>
                </li>
                <li class="aside-item-second <?=isActive(['/share/index'])?>"
                  ng-if="menu_list.intelligence_share">
                  <a class="aside-item-second-a" href="<?=getPath('/share/index')?>">
                      <span>情报共享</span>
                  </a>
                </li>
                <li class="aside-item-second <?=isActive(['/intelligence/source-management'])?>"
                  ng-if="menu_list.intelligence_sourceAdmin">
                  <a class="aside-item-second-a" href="<?=getPath('/intelligence/source-management')?>" >
                      <span>情报源管理</span>
                  </a>
                </li>
                <li class="aside-item-second <?=isActive(['/search/apt-lib'])?>"
                  ng-if="menu_list.intelligence_apt">
                  <a class="aside-item-second-a" href="<?=getPath('/search/apt-lib')?>" >
                      <span>APT武器库</span>
                  </a>
                </li>
            </ul>
        </li>

        <li class="aside-item">
             <a class="aside-item-a" ng-click="menu_aside.search.vehicle = !menu_aside.search.vehicle">
                <i class="fa fa-podcast"></i>
                <span class="name">车联网情报</span>
                <span class="caret" ng-class="{'active':!menu_aside.search.vehicle}"></span>
             </a>
             <ul class="aside-lists-second" ng-show="menu_aside.search.vehicle">
               <li class="aside-item-second <?=isActive(['/vehicleintelligence/special'])?>"
               ng-if="menu_list.intelligence_special">
                 <a class="aside-item-second-a" href="<?=getPath('/vehicleintelligence/special')?>">
                     <span>行业情报</span>
                 </a>
               </li>
               <li class="aside-item-second <?=isActive(['/vehicleintelligence/loophole'])?>"
               ng-if="menu_list.intelligence_loophole">
                 <a class="aside-item-second-a" href="<?=getPath('/vehicleintelligence/loophole')?>">
                     <span>漏洞情报</span>
                 </a>
               </li>
             </ul>
        </li>
    </ul>

    <!--资产-->
    <ul class="aside-lists" ng-show="indexCode === 2">
        <li class="aside-item">
            <a class="aside-item-a" ng-click="menu_aside.assets.system = !menu_aside.assets.system">
                <i class="fa fa-database"></i>
                <span class="name">IT 资产</span>
                <span class="caret" ng-class="{'active':!menu_aside.assets.system}"></span>
            </a>
            <ul class="aside-lists-second" ng-show="menu_aside.assets.system">
               <li class="aside-item-second <?=isActive(['/assets/asset-management'])?>"
                   ng-if="menu_list.assets_admin">
                   <a class="aside-item-second-a" href="<?=getPath('/assets/asset-management')?>" >
                       <span>资产管理</span>
                   </a>
               </li>
               <li class="aside-item-second <?=isActive(['/assets/asset-risky'])?>"
                   ng-if="menu_list.assets_risk">
                   <a class="aside-item-second-a" href="<?=getPath('/assets/asset-risky')?>" >
                       <span>受影响资产</span>
                   </a>
               </li>
            </ul>
        </li>

        <li class="aside-item">
             <a class="aside-item-a" ng-click="menu_aside.assets.vehicle = !menu_aside.assets.vehicle">
                <i class="fa fa-database"></i>
                <span class="name">车联网资产</span>
                <span class="caret" ng-class="{'active':!menu_aside.assets.vehicle}"></span>
             </a>
             <ul class="aside-lists-second" ng-show="menu_aside.assets.vehicle">
                <li class="aside-item-second <?=isActive(['/assets/vehicle'])?>"
                ng-if="menu_list.assets_vehicle">
                    <a class="aside-item-second-a" href="<?=getPath('/assets/vehicle')?>" >
                        <span>车辆资产</span>
                    </a>
                </li>
                <li class="aside-item-second <?=isActive(['/assets/accessory'])?>"
                ng-if="menu_list.assets_accessory">
                    <a class="aside-item-second-a" href="<?=getPath('/assets/accessory')?>" >
                        <span>零配件资产</span>
                    </a>
                </li>
             </ul>
        </li>
    </ul>

    <!--预警-->
    <ul class="aside-lists" ng-show="indexCode === 3">
        <li class="aside-item">
            <a class="aside-item-a" ng-click="menu_aside.alert.system = !menu_aside.alert.system">
                <i class="fa fa-heartbeat"></i>
                <span class="name">IT 系统预警</span>
                <span class="caret" ng-class="{'active':!menu_aside.alert.system}"></span>
            </a>
            <ul class="aside-lists-second" ng-show="menu_aside.alert.system">
               <li class="aside-item-second <?=isActive(['/alert/index'])?>"
                   ng-if="menu_list.warning_threat">
                   <a class="aside-item-second-a" href="<?=getPath('/alert/index')?>" >
                       <span>威胁预警</span>
                   </a>
               </li>
               <li class="aside-item-second <?=isActive(['/alert/loophole'])?>"
                   ng-if="menu_list.warning_loophole">
                   <a class="aside-item-second-a" href="<?=getPath('/alert/loophole')?>" >
                       <span>漏洞预警</span>
                   </a>
               </li>
               <li class="aside-item-second <?=isActive(['/alert/darknet'])?>"
                   ng-if="menu_list.warning_drakNet">
                   <a class="aside-item-second-a" href="<?=getPath('/alert/darknet')?>">
                       <span>暗网预警</span>
                   </a>
               </li>
            </ul>
        </li>

        <li class="aside-item">
             <a class="aside-item-a" href="javascript:void(0);">
                <i class="fa fa-heartbeat"></i>
                <span class="name">车联网预警</span>
                <!--<span class="caret"></span>-->
             </a>
        </li>
    </ul>

    <!--报表-->
    <ul class="aside-lists" ng-show="indexCode === 4">
        <li class="aside-item">
            <a class="aside-item-a" ng-click="menu_aside.report.system = !menu_aside.report.system">
                <i class="fa fa-area-chart"></i>
                <span class="name">IT 系统报表</span>
                <span class="caret" ng-class="{'active':!menu_aside.report.system}"></span>
            </a>
            <ul class="aside-lists-second" ng-show="menu_aside.report.system">
               <li class="aside-item-second <?=isActive(['/report/index'])?>"
                   ng-if="menu_list.report_creat">
                   <a class="aside-item-second-a" href="<?=getPath('/report/index')?>">
                       <span>报表生成</span>
                   </a>
               </li>
               <li class="aside-item-second <?=isActive(['/report/send'])?>" ng-if="menu_list.report_send">
                   <a class="aside-item-second-a" href="<?=getPath('/report/send')?>" >
                       <span>报表发送</span>
                   </a>
               </li>
            </ul>
        </li>

        <!--<li class="aside-item">
             <a class="aside-item-a" href="javascript:void(0);">
                <i class="fa fa-area-chart"></i>
                <span class="name">车联网报表</span>
                <span class="caret"></span>
             </a>
        </li>-->
    </ul>

    <!--配置-->
    <ul class="aside-lists" ng-show="indexCode === 5">
        <li class="aside-item">
            <a class="aside-item-a" ng-click="menu_aside.seting.system = !menu_aside.seting.system">
                <i class="fa fa-cog"></i>
                <span class="name">IT 系统配置</span>
                <span class="caret" ng-class="{'active':!menu_aside.seting.system}"></span>
            </a>
            <ul class="aside-lists-second" ng-show="menu_aside.seting.system">
               <li class="aside-item-second <?=isActive(['/seting/network'])?>" ng-if="menu_list.set_sys">
                   <a class="aside-item-second-a" href="<?=getPath('/seting/network')?>" >
                       <span>网络配置</span>
                   </a>
               </li>
               <li class="aside-item-second <?=isActive(['/seting/systemnotice'])?>"
                   ng-if="menu_list.set_notice">
                   <a class="aside-item-second-a" href="<?=getPath('/seting/systemnotice')?>" >
                       <span>威胁通知</span>
                   </a>
               </li>
               <li class="aside-item-second <?=isActive(['/seting/custom-information-search'])?>"
                   ng-if="menu_list.set_loopholeRelation">
                   <a class="aside-item-second-a" href="<?=getPath('/seting/custom-information-search')?>">
                       <span>漏洞关联</span>
                   </a>
               </li>
               <li class="aside-item-second <?=isActive(['/seting/centralmanager'])?>"
                   ng-if="menu_list.set_admin">
                   <a class="aside-item-second-a" href="<?=getPath('/seting/centralmanager')?>">
                       <span>集中管理</span>
                   </a>
               </li>
               <li class="aside-item-second <?=isActive(['/seting/user'])?>" ng-if="menu_list.set_user">
                   <a class="aside-item-second-a" href="<?=getPath('/seting/user')?>" >
                       <span>账号管理</span>
                   </a>
               </li>
               <li class="aside-item-second <?=isActive(['/seting/log'])?>" ng-if="menu_list.set_log">
                   <a class="aside-item-second-a" href="<?=getPath('/seting/log')?>" >
                       <span>审计日志</span>
                   </a>
               </li>
               <li class="aside-item-second <?=isActive(['/api/index'])?>" ng-if="menu_list.api">
                   <a class="aside-item-second-a" href="<?=getPath('/api/index')?>" >
                       <span>情报API</span>
                   </a>
               </li>
            </ul>
        </li>

        <li class="aside-item">
             <a class="aside-item-a" ng-click="menu_aside.seting.vehicle = !menu_aside.seting.vehicle">
                <i class="fa fa-cog"></i>
                <span class="name">车联网系统配置</span>
                <span class="caret" ng-class="{'active':!menu_aside.seting.vehicle}"></span>
             </a>
             <ul class="aside-lists-second" ng-show="menu_aside.seting.vehicle">
                <li class="aside-item-second <?=isActive(['/seting/label-manage'])?>"
                ng-if="menu_list.set_label">
                    <a class="aside-item-second-a" href="<?=getPath('/seting/label-manage')?>" >
                        <span>标签管理</span>
                    </a>
                </li>
                <li class="aside-item-second">
                    <a class="aside-item-second-a"
                     ng-click="menu_aside.seting.manage.set = !menu_aside.seting.manage.set">
                        <span>情报管理</span>
                        <span class="caret" ng-class="{'active':!menu_aside.seting.manage.set}"></span>
                    </a>
                    <ul class="aside-lists-three" ng-show="menu_aside.seting.manage.set">
                       <li class="aside-item-three <?=isActive(['/seting/special-intelligence'])?>"
                       ng-if="menu_list.set_special">
                            <a class="aside-item-three-a" href="<?=getPath('/seting/special-intelligence')?>" >
                                <span>行业情报管理</span>
                            </a>
                        </li>
                        <li class="aside-item-three <?=isActive(['/seting/loophole-intelligence'])?>"
                        ng-if="menu_list.set_loophole">
                            <a class="aside-item-three-a" href="<?=getPath('/seting/loophole-intelligence')?>" >
                                <span>漏洞情报管理</span>
                            </a>
                        </li>
                     </ul>
                </li>
             </ul>
        </li>
    </ul>
</div>

<script type="text/javascript" src="/js/controllers/aside.js"></script>




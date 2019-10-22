<style>
    .dropdown-menu {
        min-width: 100px;
    }
    #navApp{
        height: 64px;
    }
    .dropdown{
        height:64px;
    }
    .nav_li_a{
    color: #FFF;
    height: 64px;
    border: 0;
    line-height: 64px;
    padding: 0 20px !important;
}
#navApp a{
    font-size:16px;
}
.dropdown-menu{
    background: #FFFFFF;
box-shadow: 0 6px 6px 0 rgba(0,0,0,0.16);
border-radius: 4px;
width:200px;
/* height:210px; */
    left: 50%;
    transform: translateX(-50%);
    margin:0;
    font-size: 16px;
color: #333333;
padding-top:21px;
}
.skin-blue .main-header .navbar .nav > li > a:hover, .skin-blue .main-header .navbar .nav > li > a:active, .skin-blue .main-header .navbar .nav > li > a:focus, .skin-blue .main-header .navbar .nav .open > a, .skin-blue .main-header .navbar .nav .open > a:hover, .skin-blue .main-header .navbar .nav .open > a:focus, .skin-blue .main-header .navbar .nav > .active > a {
    background: transparent;
    color: #fff;
}
.nav .open>a, .nav .open>a:focus, .nav .open>a:hover {
background: transparent;
border-color:transparent;
color:#fff;
}
.dropdown-menu>li{
height:38px;
padding:0px;
}
.dropdown-menu>li>a{
height:38px;
line-height:38px;
padding:0 24px;
}
.dropdown-menu>li>a:hover{
background: #0070FF;
color:#fff;
padding:0 24px;
}
.dropdown-menu>.active>a, .dropdown-menu>.active>a:focus, .dropdown-menu>.active>a:hover {
background: #0070FF;
color: #fff;
}
.hover_li_title:hover{
    background: #456196;
}
.nav-pills>li.active>a {
border-top-color:transparent;
}
.nav-pills>li>a {
    border-top:none;
}
 .skin-blue .main-header .navbar .nav > .active > a{
     background: #456196;
 }
.nav-pills>li.active>a {
    font-weight: normal;
}
.nav>li>a{
   display:inherit;

}
.hover_li_title.active{
   background:#456196 !important;
}

</style>
<div ng-controller="mainNavCtrl" id="navApp" ng-cloak>
    <ul class="nav nav-pills">
        <!-- 首页 -->
        <li role="presentation" class="dropdown  <?=isActive(['/site/index', '/'])?> <?=isActive(['/map.html'])?> hover_li_title"  ng-if="menu_list.index">
            <a class="dropdown-toggle nav_li_a" href="<?=getPath('/site/index')?>">
                <i class="fa fa-home"></i> 首页
            </a>
        </li>
        <!-- 情报 -->
        <li role="presentation" class="dropdown hover_li_title <?=isActive(['/search/index', '/agent/index', '/share/index', '/intelligence/source-management', '/search/apt-lib'])?> " ng-if="menu_list.intelligence">
            <a class="dropdown-toggle nav_li_a"  href="<?=getPath('/search/index')?>">
                <i class="fa fa-podcast"></i> 情报
            </a>
        </li>
        <!-- 资产 -->
        <li role="presentation" class="dropdown hover_li_title <?=isActive(['/assets/asset-management', '/assets/asset-risky', '/assets/details'])?>" ng-if="menu_list.assets">
            <a class="dropdown-toggle nav_li_a" href="<?=getPath('/assets/asset-management')?>">
            <i class="fa fa-database"></i>
                 资产
            </a>
        </li>
        <!-- 预警 -->
        <li role="presentation" class="dropdown hover_li_title <?=isActive(['/alert/index', '/alert/loophole', '/alert/darknet', '/alert/loophole-detail'])?>" ng-if="menu_list.warning">
            <a class="dropdown-toggle nav_li_a" href="<?=getPath('/alert/index')?>">
                <i class="fa fa-heartbeat"></i> 预警
            </a>
        </li>
        <!-- 报表 -->
        <li role="presentation" class="dropdown hover_li_title <?=isActive(['/report/index', '/report/send'])?>" ng-if="menu_list.report">
            <a class="dropdown-toggle nav_li_a"  href="<?=getPath('/report/index')?>">
                <i class="fa fa-area-chart"></i> 报表
            </a>
        </li>
        <!-- 设置 -->
        <li role="presentation" class="dropdown hover_li_title <?=isActive(['/seting/network', '/seting/systemnotice', '/seting/custom-information-search', '/seting/centralmanager', '/seting/user', '/seting/log', '/api/index'])?> " ng-if="menu_list.set">
            <a class="dropdown-toggle nav_li_a"  href="<?=getPath('/seting/network')?>" >
                <i class="fa fa-cog"></i> 设置
            </a>

        </li>
    </ul>
</div>
<script type="text/javascript" src="/js/nav.js"></script>

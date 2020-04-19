<?php
/* @var $this yii\web\View */

$this->title = '许可证';
?>
<section class="content" ng-app="myApp"  ng-cloak >
  <style type="text/css">
    .nav-tabs-custom {
      overflow: visible;
    }
  </style>
  <div class="row">
    <div class="col-xs-12">
      <div class="nav-tabs-custom">
        <div class="tab-content">
          <div class="tab-pane active" id="License" ng-controller="LicenseCtrl">
            <section class="ng-cloak" ng-show="License.list">
              <h4 class="seting-header" style="margin-bottom: -1px;border:0;">
                <i class="fa fa-key"></i>
                证书列表
              </h4>
              <div class="row">
                <div class="col-sm-12">
                    <table class="table table-striped  table_th ng-cloak">
                        <tr>
                          <th style="text-align:center;width:80px;">序号</th>
                          <th>序列号</th>
                          <th>受保护机构</th>
                          <th style="width: 120px;">授权时间</th>
                          <th style="width: 120px;">授权到期时间</th>
                          <th style="width: 120px;">威胁情报</th>
                          <th style="width: 120px;">许可证状态</th>
                        </tr>

                        <tr style="cursor: pointer;" ng-repeat="(SN, item) in License.list">
                            <td style="text-align:center;width:80px;" ng-bind="$index+1"></td>
                            <td ng-bind="item.SN"></td>
                            <td ng-bind="item.orgName"></td>
                            <td style="width: 120px;" ng-bind="item.startTime | date:'yyyy-MM-dd'"></td>
                            <td style="width: 120px;" ng-bind="item.endTime | date:'yyyy-MM-dd'"></td>
                            <td style="width: 120px;" ng-bind="item.edition=='1'?'企业版':'高级版'"></td>
                            <td style="width: 120px;" ng-bind="item.status"></td>
                        </tr>
                      </table>
                </div>
              </div>
            </section>

            <section>
              <div class="form-group">
                <input type="file" id="LicenseFile" name="" style="display: none;">
                <div class="btn-group pull-right">
                  <button type="button" class="btn btn-primary" ng-click="online();">在线激活</button>
                  <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                  <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" role="menu" style="min-width: 100%;">
                    <li>
                      <a href="javascript:void(0);" ng-click="import()">导入许可证</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div id="hide_box" style="display: none;">
                <div id="inputSN" >
                  <form>
                    <div class="box-body">
                      <div class="form-group col-md-12">
                        <label for="InputVersion">序列号：</label>
                        <input class="form-control" ng-model="SN">
                        <p class="help-block" ng-bind="'机器码：'+key"></p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<script type="text/javascript" src="/js/controllers/License.js"></script>

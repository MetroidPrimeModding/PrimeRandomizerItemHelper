package com.pwootage.prime.controllers

import angular.AngularHTTPService.AngularHTTP
import angular.AngularScala.{AngularController}

import scala.scalajs.js

/**
 * Created by pwootage on 8/2/14.
 */
class PageController extends AngularController {
  val console = js.Dynamic.global.console

  var $scope: js.Dynamic = null
  var $http: AngularHTTP = null

  override val $inject = js.Array("$scope", "$http")

  override def inject(services: js.Array[js.Any]): Unit = {
    $scope = services(0).asInstanceOf[js.Dynamic]
    $http = services(0).asInstanceOf[AngularHTTP]

    $scope.mode = 1
    $scope.loadBlankDropdown = false
  }

  //  $scope.update("mode", 1)
}

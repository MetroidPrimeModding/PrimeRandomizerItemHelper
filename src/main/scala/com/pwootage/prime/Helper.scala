package com.pwootage.prime

import scala.scalajs.js
import scala.scalajs.js.JSApp
import angular._

import com.pwootage.prime.controllers.PageController

/**
 * Created by pwootage on 8/2/14.
 */
object Helper extends JSApp {
  val console = js.Dynamic.global.console

  def main(): Unit = {
    val helper = angular.module("helper", js.Array("ui.bootstrap"))
    val pc = helper.scalaController("PageController", new PageController())
  }
}

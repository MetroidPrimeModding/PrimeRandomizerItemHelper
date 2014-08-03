package com.pwootage.prime.model

import com.pwootage.prime.model.LocationData._

import scala.scalajs.js

/**
 * Created by pwootage on 8/2/14.
 */
object Conversions {
  private implicit def dynToString(dyn: js.Dynamic) = dyn.asInstanceOf[js.String]

  private implicit def dynToBoolean(dyn: js.Dynamic) = dyn.asInstanceOf[js.Boolean]

  private implicit def dynToArray(dyn: js.Dynamic) = dyn.asInstanceOf[js.Array[js.Dynamic]]

  def dynamicToLocation(dyn: js.Dynamic, store: LocationStore): Seq[RandomizedLocation] = dyn.map(
    (loc: js.Dynamic) => RandomizedLocation(
      store.locByName(dyn.location),
      store.itemByName(dyn.ActualItem),
      dyn.obtained,
      dyn.found
    )
  )

}

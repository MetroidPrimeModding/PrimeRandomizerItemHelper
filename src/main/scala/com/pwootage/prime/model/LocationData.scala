package com.pwootage.prime.model

import scala.scalajs.js

/**
 * Created by pwootage on 8/2/14.
 */
object LocationData {

  case class RandomizedLocation(loc: Location, item: Item, obtained: Boolean, found: Boolean)

  case class Location(area: String, name: String, item: Item, requirementSets: Seq[RequirementSet] = Seq())

  case class Item(name: String, count: Int)

  case class RequirementSet(reqs: Seq[Requirement], difficulty: Int)

  case class Requirement(name: String, items: Seq[Item] = Seq(), tricks: Seq[Trick] = Seq(), subRequirements: Seq[Requirement] = Seq())

  case class Trick(name: String, desc: String, difficulty: Int)

  trait LocationStore {
    def locByName(name: String): Location

    def itemByName(name: String): Item

    def requirementByName(name: String): Requirement

    def trickByName(name: String): Trick
  }

}

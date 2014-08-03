package com.pwootage.prime.model

import com.pwootage.prime.model.LocationData._

/**
 * Created by pwootage on 8/3/14.
 */
object Prime1LocationStore extends LocationStore {
  override def locByName(name: String): Location = ???

  override def itemByName(name: String): Item = ???

  override def requirementByName(name: String): Requirement = ???

  override def trickByName(name: String): Trick = ???

  implicit def strToItem(str: String): Item = itemByName(str)

  implicit def strToLoc(str: String): Location = locByName(str)

  implicit def strToReq(str: String): Requirement = requirementByName(str)

  implicit def strToTrick(str: String): Trick = trickByName(str)

  val itemsList = Seq(
    Item("Artifact of Chozo", 1),
    Item("Artifact of Elder", 1),
    Item("Artifact of Lifegiver", 1),
    Item("Artifact of Nature", 1),
    Item("Artifact of Newborn", 1),
    Item("Artifact of Spirit", 1),
    Item("Artifact of Strength", 1),
    Item("Artifact of Sun", 1),
    Item("Artifact of Truth", 1),
    Item("Artifact of Warrior", 1),
    Item("Artifact of Wild", 1),
    Item("Artifact of World", 1),
    Item("Bombs", 1),
    Item("Boost Ball", 1),
    Item("Charge Beam", 1),
    Item("Energy Tank", 14),
    Item("Flamethrower", 1),
    Item("Grapple Beam", 1),
    Item("Gravity Suit", 1),
    Item("Ice Beam", 1),
    Item("Ice Spreader", 1),
    Item("Missile Expansion", 49),
    Item("Missile Launcher", 1),
    Item("Morph Ball", 1),
    Item("Phazon Suit", 1),
    Item("Plasma Beam", 1),
    Item("Power Bomb Expansion", 4),
    Item("Power Bombs", 1),
    Item("Space Jump Boots", 1),
    Item("Spider Ball", 1),
    Item("Super Missile", 1),
    Item("Thermal Visor", 1),
    Item("Varia Suit", 1),
    Item("Wave Beam", 1),
    Item("Wavebuster", 1),
    Item("X-Ray Visor", 1)
  )

  val reqList = Seq(
    Requirement(
      "Wave Beam",
      Seq("Wave Beam")
    ),
    Requirement(
      "Ice Beam",
      Seq("Ice Beam")
    ),
    Requirement(
      "Plasma Beam",
      Seq("Plasma Beam")
    ),
    Requirement(
      "Boost Ball",
      Seq("Morph Ball", "Boost Ball")
    ),
    Requirement(
      "Spider Ball",
      Seq("Morph Ball", "Spider Ball")
    ),
    Requirement(
      "Super Missile",
      Seq("Super Missile", "Charge Beam")
    ),
    Requirement(
      "Wave Beam",
      Seq("Wave Beam")
    )
  )

  val locList = Seq(
    Location(
      "Chozo",
      "Main Plaza (Half-pipe)",
      "Missile Expansion"
    ),
    Location(
      "Chozo",
      "Main Plaza (Grapple ledge)",
      "Missile Expansion"
    ),
    Location(
      "Chozo",
      "Main Plaza (Tree)",
      "Missile Expansion"
    ),
    Location(
      "Chozo",
      "Main Plaza (Locked door)",
      "Energy Tank"
    ),
    Location(
      "Chozo",
      "Ruined Fountain",
      "Missile Expansion"
    ),
    Location(
      "Chozo",
      "Ruined Shrine (\"Beetle battle\")",
      "Morph Ball"
    ),
    Location(
      "Chozo",
      "Ruined Shrine (Half-pipe)",
      "Missile Expansion"
    ),
    Location(
      "Chozo",
      "Ruined Shrine (Lower tunnel)",
      "Missile Expansion"
    ),
    Location(
      "Chozo",
      "Vault",
      "Missile Expansion"
    ),
    Location(
      "Chozo",
      "Training Chamber",
      "Energy Tank"
    ),
    Location(
      "Chozo",
      "Ruined Nursery",
      "Missile Expansion"
    ),
    Location(
      "Chozo",
      "Training Chamber Access",
      "Missile Expansion"
    ),
    Location(
      "Chozo",
      "Magma Pool",
      "Power Bomb Expansion"
    ),
    Location(
      "Chozo",
      "Tower of Light",
      "Wavebuster"
    ),
    Location(
      "Chozo",
      "Tower Chamber",
      "Artifact of Lifegiver"
    ),
    Location(
      "Chozo",
      "Ruined Gallery (Missile wall)",
      "Missile Expansion"
    ),
    Location(
      "Chozo",
      "Ruined Gallery (Morph tunnel)",
      "Missile Expansion"
    ),
    Location(
      "Chozo",
      "Transport Access North",
      "Energy Tank"
    ),
    Location(
      "Chozo",
      "Gathering Hall",
      "Missile Expansion"
    ),
    Location(
      "Chozo",
      "Hive Totem",
      "Missile Launcher"
    ),
    Location(
      "Chozo",
      "Sunchamber (Flaahgra)",
      "Varia Suit"
    ),
    Location(
      "Chozo",
      "Sunchamber (Ghosts)",
      "Artifact of Wild"
    ),
    Location(
      "Chozo",
      "Watery Hall Access",
      "Missile Expansion"
    ),
    Location(
      "Chozo",
      "Watery Hall (Scan puzzle)",
      "Charge Beam"
    ),
    Location(
      "Chozo",
      "Watery Hall (Underwater)",
      "Missile Expansion"
    ),
    Location(
      "Chozo",
      "Dynamo (Lower)",
      "Missile Expansion"
    ),
    Location(
      "Chozo",
      "Dynamo (Spider track)",
      "Missile Expansion"
    ),
    Location(
      "Chozo",
      "Burn Dome (Missile)",
      "Missile Expansion"
    ),
    Location(
      "Chozo",
      "Burn Dome (I. Drone)",
      "Bombs"
    ),
    Location(
      "Chozo",
      "Furnace (Spider tracks)",
      "Missile Expansion"
    ),
    Location(
      "Chozo",
      "Furnace (Inside Furnace)",
      "Energy Tank"
    ),
    Location(
      "Chozo",
      "Hall of the Elders",
      "Energy Tank"
    ),
    Location(
      "Chozo",
      "Crossway",
      "Missile Expansion"
    ),
    Location(
      "Chozo",
      "Elder Chamber",
      "Artifact of World"
    ),
    Location(
      "Chozo",
      "Antechamber",
      "Ice Beam"
    ),
    Location(
      "Phendrana",
      "Phendrana Shorelines (Behind ice)",
      "Missile Expansion"
    ),
    Location(
      "Phendrana",
      "Phendrana Shorelines (Spider track)",
      "Missile Expansion"
    ),
    Location(
      "Phendrana",
      "Chozo Ice Temple",
      "Artifact of Sun"
    ),
    Location(
      "Phendrana",
      "Ice Ruins West",
      "Power Bomb Expansion"
    ),
    Location(
      "Phendrana",
      "Ice Ruins East (Behind ice)",
      "Missile Expansion"
    ),
    Location(
      "Phendrana",
      "Ice Ruins East (Spider track)",
      "Missile Expansion"
    ),
    Location(
      "Phendrana",
      "Chapel of the Elders",
      "Wave Beam"
    ),
    Location(
      "Phendrana",
      "Ruined Courtyard",
      "Energy Tank"
    ),
    Location(
      "Phendrana",
      "Phendrana Canyon",
      "Boost Ball"
    ),
    Location(
      "Phendrana",
      "Quarantine Cave",
      "Spider Ball"
    ),
    Location(
      "Phendrana",
      "Research Lab Hydra",
      "Missile Expansion"
    ),
    Location(
      "Phendrana",
      "Quarantine Monitor",
      "Missile Expansion"
    ),
    Location(
      "Phendrana",
      "Observatory",
      "Super Missile"
    ),
    Location(
      "Phendrana",
      "Transport Access",
      "Energy Tank"
    ),
    Location(
      "Phendrana",
      "Control Tower",
      "Artifact of Elder"
    ),
    Location(
      "Phendrana",
      "Research Core",
      "Thermal Visor"
    ),
    Location(
      "Phendrana",
      "Frost Cave",
      "Missile Expansion"
    ),
    Location(
      "Phendrana",
      "Research Lab Aether (Tank)",
      "Energy Tank"
    ),
    Location(
      "Phendrana",
      "Research Lab Aether (Morph track)",
      "Missile Expansion"
    ),
    Location(
      "Phendrana",
      "Gravity Chamber (Underwater)",
      "Gravity Suit"
    ),
    Location(
      "Phendrana",
      "Gravity Chamber (Grapple ledge)",
      "Missile Expansion"
    ),
    Location(
      "Phendrana",
      "Storage Cave",
      "Artifact of Spirit"
    ),
    Location(
      "Phendrana",
      "Security Cave",
      "Power Bomb Expansion"
    ),
    Location(
      "Tallon",
      "Landing Site",
      "Missile Expansion"
    ),
    Location(
      "Tallon",
      "Alcove",
      "Space Jump Boots"
    ),
    Location(
      "Tallon",
      "Frigate Crash Site",
      "Missile Expansion"
    ),
    Location(
      "Tallon",
      "Overgrown Cavern",
      "Missile Expansion"
    ),
    Location(
      "Tallon",
      "Root Cave",
      "Missile Expansion"
    ),
    Location(
      "Tallon",
      "Artifact Temple",
      "Artifact of Truth"
    ),
    Location(
      "Tallon",
      "Transport Tunnel B",
      "Missile Expansion"
    ),
    Location(
      "Tallon",
      "Arbor Chamber",
      "Missile Expansion"
    ),
    Location(
      "Tallon",
      "Cargo Freight Lift to Deck Gamma",
      "Energy Tank"
    ),
    Location(
      "Tallon",
      "Biohazard Containment",
      "Missile Expansion"
    ),
    Location(
      "Tallon",
      "Hydro Access Tunnel",
      "Energy Tank"
    ),
    Location(
      "Tallon",
      "Great Tree Chamber",
      "Missile Expansion"
    ),
    Location(
      "Tallon",
      "Life Grove Tunnel",
      "Missile Expansion"
    ),
    Location(
      "Tallon",
      "Life Grove (Start)",
      "X-Ray Visor"
    ),
    Location(
      "Tallon",
      "Life Grove (Underwater spinner)",
      "Artifact of Chozo"
    ),
    Location(
      "Mines",
      "Main Quarry",
      "Missile Expansion"
    ),
    Location(
      "Mines",
      "Security Access A",
      "Missile Expansion"
    ),
    Location(
      "Mines",
      "Storage Depot B",
      "Grapple Beam"
    ),
    Location(
      "Mines",
      "Storage Depot A",
      "Flamethrower"
    ),
    Location(
      "Mines",
      "Elite Research (Phazon Elite)",
      "Artifact of Warrior"
    ),
    Location(
      "Mines",
      "Elite Research (Laser)",
      "Missile Expansion"
    ),
    Location(
      "Mines",
      "Elite Control Access",
      "Missile Expansion"
    ),
    Location(
      "Mines",
      "Ventilation Shaft",
      "Energy Tank"
    ),
    Location(
      "Mines",
      "Phazon Processing Center",
      "Missile Expansion"
    ),
    Location(
      "Mines",
      "Processing Center Access",
      "Energy Tank"
    ),
    Location(
      "Mines",
      "Elite Quarters",
      "Phazon Suit"
    ),
    Location(
      "Mines",
      "Central Dynamo",
      "Power Bombs"
    ),
    Location(
      "Mines",
      "Metroid Quarantine B",
      "Missile Expansion"
    ),
    Location(
      "Mines",
      "Metroid Quarantine A",
      "Missile Expansion"
    ),
    Location(
      "Mines",
      "Fungal Hall B",
      "Missile Expansion"
    ),
    Location(
      "Mines",
      "Phazon Mining Tunnel",
      "Artifact of Newborn"
    ),
    Location(
      "Mines",
      "Fungal Hall Access",
      "Missile Expansion"
    ),
    Location(
      "Magmoor",
      "Lava Lake",
      "Artifact of Nature"
    ),
    Location(
      "Magmoor",
      "Triclops Pit",
      "Missile Expansion"
    ),
    Location(
      "Magmoor",
      "Storage Cavern",
      "Missile Expansion"
    ),
    Location(
      "Magmoor",
      "Transport Tunnel A",
      "Energy Tank"
    ),
    Location(
      "Magmoor",
      "Warrior Shrine",
      "Artifact of Strength"
    ),
    Location(
      "Magmoor",
      "Shore Tunnel",
      "Ice Spreader"
    ),
    Location(
      "Magmoor",
      "Fiery Shores (Morph track)",
      "Missile Expansion"
    ),
    Location(
      "Magmoor",
      "Fiery Shores (Warrior Shrine tunnel)",
      "Power Bomb Expansion"
    ),
    Location(
      "Magmoor",
      "Plasma Processing",
      "Plasma Beam"
    ),
    Location(
      "Magmoor",
      "Magmoor Workstation",
      "Energy Tank"
    )
  )
}

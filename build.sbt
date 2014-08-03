scalaJSSettings

name := "Prime Randomizer Helper"

version := "1.0"

scalaVersion := "2.11.2"

libraryDependencies ++= Seq(
  "com.pwootage" %%% "angular-scala" % "1.0-1.3.0-beta.17"
)

ScalaJSKeys.jsDependencies ++= Seq(
  ProvidedJS / "ui-bootstrap-tpls-0.11.0.min.js",
  ProvidedJS / "helper.js"
)

skip in ScalaJSKeys.packageJSDependencies := false

ScalaJSKeys.requiresDOM := true
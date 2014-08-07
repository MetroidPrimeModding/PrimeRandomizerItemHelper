import 'package:angular/angular.dart';
import 'package:angular/application_factory.dart';
import 'PageController.dart';

class HelperModule extends Module {
  HelperModule() {
    type(PageController);
  }
}

void main() {
  applicationFactory()
    ..addModule(new HelperModule())
    ..run();
}
import 'package:angular/angular.dart';
import 'package:angular/application_factory.dart';

@Decorator(selector: '[page-controller]')
class PageController {
  Http _http;

  PageController(this._http) {
  }

  String test = "test";
}

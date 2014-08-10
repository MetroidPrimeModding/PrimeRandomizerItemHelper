library itemGrid;
import 'dart:html' as dom;
import 'dart:async' as async;
import 'package:angular/angular.dart';

@Component(
  selector: 'item-grid',
  templateUrl: 'components/itemGrid/itemGrid.html',
  cssUrl: 'less/items.css',//maybe?
  publishAs: 'grid'
)
class ItemGrid {
  ItemGrid() {
  }

  Map<String, bool> enabled = {};
}

@Decorator(
  selector: '.item',
  map: const {
    'enabled': '<=>enabled',
    'toggle-click': '@toggleClick'
  }
)
class ItemDecorator {
  final dom.Element element;
  ItemDecorator(this.element, Scope scope) {
    if (toggleClick) {
      element.onClick.listen((evt) => toggle());
      element.classes.add('clickable');
    }
  }

  void toggle() {
    enabled = !_enabled;
  }

  bool _enabled = false;
  bool toggleClick = true;

  void _updClass() {
    if (_enabled) {
      element.classes.remove('item-disabled');
    } else {
      element.classes.add('item-disabled');
    }
  }

  set enabled(bool b) {
    _enabled = b;
    _updClass();
  }

  bool get enabled => _enabled;
}
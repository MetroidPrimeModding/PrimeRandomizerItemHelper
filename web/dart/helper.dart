import 'package:angular/angular.dart';
import 'package:angular/application_factory.dart';
import 'PageController.dart';
import '../components/itemGrid/ItemGrid.dart';

class HelperModule extends Module {
  HelperModule() {
    type(PageController);
    type(ItemGrid);
    type(ItemDecorator);
    value(RouteInitializerFn,
        (Router router, RouteViewFactory views) => views.configure({
        'home': ngRoute(
          path: '/',
          view: 'partials/home.html',
          defaultRoute: true
        ),
        'items-p1': ngRoute(
            path: '/items',
            view: 'partials/itemsView.html'
        )
    })
    );
    factory(NgRoutingUsePushState,
        (_) => new NgRoutingUsePushState.value(false));
  }
}

void main() {
  applicationFactory()
    ..addModule(new HelperModule())
    ..run();
}
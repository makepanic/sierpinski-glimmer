import Application, { DOMBuilder, RuntimeCompilerLoader, AsyncRenderer, SyncRenderer } from '@glimmer/application';
import Resolver, { BasicModuleRegistry } from '@glimmer/resolver';
import moduleMap from '../config/module-map';
import resolverConfiguration from '../config/resolver-configuration';

export default class App extends Application {
  constructor() {
    let moduleRegistry = new BasicModuleRegistry(moduleMap);
    let resolver = new Resolver(resolverConfiguration, moduleRegistry);
    const element = document.body;

    const renderer = location.search.endsWith('async') ? new AsyncRenderer() : new SyncRenderer();

    super({
      builder: new DOMBuilder({ element, nextSibling: null }),
      loader: new RuntimeCompilerLoader(resolver),
      renderer,
      resolver,
      rootName: resolverConfiguration.app.rootName
    });
  }
}

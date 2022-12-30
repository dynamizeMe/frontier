const routeUtilsData = `
import { loadRemoteModule } from './federation-utils';
import { Routes } from '@angular/router';
import { Microfrontend } from '../models/microfrontend.model';
import { APP_ROUTES } from '../app-routing.module';

export function buildRoutes(options: Microfrontend[]): Routes {
  const lazyRoutes: Routes = options.map(o => ({
    path: o.routePath,
    loadChildren: () => loadRemoteModule(o).then(m => m[o.ngModuleName]),
  }));

  return [...APP_ROUTES, ...lazyRoutes];
}`;

module.exports = routeUtilsData;
export const routefactoryData =
`import { getManifest, loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { CustomManifest } from './custom-manifest';
import { routes } from './routes';

export function createRoutes(): Routes {
  return routes.concat(Object.entries(getManifest<CustomManifest>()).map(([key, value]) => ({
    path: value.route,
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: key,
        exposedModule: value.exposedModule,
      }).then((m) => m[value.routeConfigName]),
  })));
}
`;


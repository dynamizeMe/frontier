const routesData =
`import { Routes } from '@angular/router';
import { MainComponent } from '../components/main/main.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent,
  },
];
`;

module.exports = routesData;

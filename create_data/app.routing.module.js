const appRoutingModuleData = `
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { loadRemoteModule } from './utils/federation-utils';

export const APP_ROUTES: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  {
    path: 'home',
    component: AppComponent,
  },
];

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  {
    path: 'home',
    component: AppComponent,
  },
  //Example of the remote app route
  // {
  //   path: 'example_remote',
  //   loadChildren: () =>
  //     loadRemoteModule({
  //       remoteName: 'example_remote',
  //       remoteEntry: 'http://localhost:4201/remoteEntry.js',
  //       exposedModule: 'ProfileModule',
  //     }).then(m => m.ProfileModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {};`

module.exports = appRoutingModuleData;
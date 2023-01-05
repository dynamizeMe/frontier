export const appRoutingModuleData =
`import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { createRoutes } from './microfrontends/route-factory';

@NgModule({
  imports: [RouterModule.forRoot(createRoutes())],
  exports: [RouterModule]
})
export class AppRoutingModule { }`;



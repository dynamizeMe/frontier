const microfrontendServiceData = `
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { buildRoutes } from '../utils/route-utils';
import { Microfrontend } from '../models/microfrontend.model';

@Injectable({ providedIn: 'root' })
export class MicrofrontendService {
  microfrontends!: Microfrontend[];

  constructor(private router: Router) {}

  initialise(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.microfrontends = this.loadConfig();
      this.router.resetConfig(buildRoutes(this.microfrontends));
      resolve();
    });
  }

  loadConfig(): Microfrontend[] {
    return [ ];
  }
}`;

module.exports = microfrontendServiceData;


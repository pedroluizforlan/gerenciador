import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {registerLocaleData } from "@angular/common";
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    { provide: LOCALE_ID, useValue: 'pt-BR' }, // Configura o locale para pt-BR
  ],
}).catch((err) => console.error(err));

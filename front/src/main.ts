import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeEsAr, 'es-AR');

bootstrapApplication(App, {
  ...appConfig,
  providers: [...(appConfig.providers || []), { provide: LOCALE_ID, useValue: 'es-AR' }],
}).catch((err) => console.error(err));

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideCharts } from 'ng2-charts';
import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideClientHydration(withEventReplay()),
    provideCharts(), // ✅ This replaces NgChartsModule import
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
};

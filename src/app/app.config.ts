import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './core/services/in-memory-data.service';
import { MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        MessageService,
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(
            HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
                delay: 500,
                dataEncapsulation: false,
            }),
        ),
        provideRouter(routes),
        provideAnimations(),
    ],
};

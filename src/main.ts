import { bootstrap } from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms'; 
import { enableProdMode, Provider, provide } from '@angular/core';
import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';
import { AppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

// Create config options (see ILocalStorageServiceConfigOptions) for deets:
let localStorageServiceConfig = {
    prefix: 'note-app',
    storageType: 'localStorage'
};
// Provide the config to the service:
const LOCAL_STORAGE_CONFIG_PROVIDER: Provider = provide(LOCAL_STORAGE_SERVICE_CONFIG, {
    useValue: localStorageServiceConfig
});

bootstrap(AppComponent, [
	disableDeprecatedForms(),
	provideForms(),
	LocalStorageService, 
	LOCAL_STORAGE_CONFIG_PROVIDER
])
.catch((err: any) => console.log(err));

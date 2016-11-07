// import { bootstrap } from '@angular/platform-browser-dynamic';
// import { disableDeprecatedForms, provideForms } from '@angular/forms'; 
// import { enableProdMode, Provider, provide } from '@angular/core';
// import { AppComponent, environment } from './app/';

// if (environment.production) {
//   enableProdMode();
// }

// bootstrap(AppComponent, [
// 	disableDeprecatedForms(),
// 	provideForms()
// ])
// .catch((err: any) => console.log(err));

import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { disableDeprecatedForms, provideForms } from '@angular/forms'; 
import { enableProdMode, Provider, platformCore } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, [
	// disableDeprecatedForms(),
   	// provideForms()
]);

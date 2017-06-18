import { Injector } from '@angular/core';
import { UIRouter } from '@uirouter/angular';

export function uiRouterConfigFn(router: UIRouter, injector: Injector) {
  // const peopleService = injector.get(PeopleService);
  
  // this is already set in root module
  // router.urlService.rules.otherwise({ state: 'hello' });
}

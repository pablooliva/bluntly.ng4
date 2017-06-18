import { Ng2StateDeclaration } from '@uirouter/angular';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const appState = {
  name: 'app',
  redirectTo: 'home',
  component: AppComponent,
};

export const homeState = {
  parent: 'app',
  name: 'home',
  url: '/home',
  component: HomeComponent,
};

export const APP_STATES: Ng2StateDeclaration[] = [
  appState,
  homeState
];

import { Routes } from '@angular/router';
import { RandomizeComponent } from './pages/randomize/randomize.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: RandomizeComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
];

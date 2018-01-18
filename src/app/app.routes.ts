import { Routes } from '@angular/router';
import { IndexComponent } from './index/components';

export const ROUTES: Routes = [
  {
    path: '',
    component: IndexComponent,
    pathMatch: 'full'
  },
];

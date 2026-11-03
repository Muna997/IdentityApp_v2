import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home, title: 'home Page' },
  {
    path: 'account',
    loadChildren: () => import('./account/account.routes').then((m) => m.routes),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then((m) => m.routes),
  },
];

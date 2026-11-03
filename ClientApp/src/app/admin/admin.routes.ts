import { Routes } from '@angular/router';
import { UserList } from './user-list/user-list';
import { adminGuard } from '../core/guards/admin-guard';
import { UserAddEdit } from './user-add-edit/user-add-edit';

export const routes: Routes = [
  { path: 'users', component: UserList, canActivate: [adminGuard] },
  {
    path: 'add',
    component: UserAddEdit,
    canActivate: [adminGuard],
  },
  {
    path: 'edit/:id',
    component: UserAddEdit,
    canActivate: [adminGuard],
  },
];

import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Login } from './login/login';
import { ConfirmEmail } from './confirm-email/confirm-email';
import { ForgotUsernamePassword } from './forgot-username-password/forgot-username-password';
import { ResetPassword } from './rest-password/reset-password';
import { EditProfile } from './edit-profile/edit-profile';
import { ChangePassword } from './change-password/change-password';
import { DeleteAccount } from './delete-account/delete-account';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'confirm-email', component: ConfirmEmail },
  { path: 'forgot-user-password', component: ForgotUsernamePassword },
  { path: 'reset-password', component: ResetPassword },
  { path: 'edit-profile', component: EditProfile, canActivate: [authGuard] },
  { path: 'change-password', component: ChangePassword, canActivate: [authGuard] },
  { path: 'delete-account', component: DeleteAccount, canActivate: [authGuard] },
];

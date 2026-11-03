import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../../account/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  const user = accountService.$user();
  if (user) {
    return true;
  } else router.navigateByUrl('/account/login');
  return false;
};

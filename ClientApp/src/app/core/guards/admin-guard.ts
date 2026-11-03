import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../../account/account.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  if (accountService.isAdmin()) {
    return true;
  }
  router.navigateByUrl('/');
  return false;
};

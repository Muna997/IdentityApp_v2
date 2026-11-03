import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from '../../shared/shared.service';
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let sharedService = inject(SharedService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      sharedService.showNotification(error.error);
      return throwError(() => error);
    }),
  );
};

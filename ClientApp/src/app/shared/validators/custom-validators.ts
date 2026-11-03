import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { AdminService } from '../../admin/admin.service';
import { map, of } from 'rxjs';

export function specialCharNotAllowedValidator(control: AbstractControl): ValidationErrors | null {
  const allowName = /^[a-zA-Z0-9]+$/;
  if (!allowName.test(control.value)) {
    return { specialCharNotAllowed: true };
  }
  return null;
}
export function nameTakenValidator(
  adminService: AdminService,
  getOriginalName: () => string,
  isEditMode: () => boolean,
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (isEditMode() && control.value === getOriginalName()) {
      return of(null);
    }
    return adminService
      .nameTaken(control.value)
      .pipe(map((response) => (response.isTaken ? { nameTaken: true } : null)));
  };
}

export function emailTakenValidator(
  adminService: AdminService,
  getOriginalEmail: () => string,
  isEditMode: () => boolean,
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (isEditMode() && control.value === getOriginalEmail()) {
      return of(null);
    }
    return adminService
      .emailTaken(control.value)
      .pipe(map((response) => (response.isTaken ? { emailTaken: true } : null)));
  };
}

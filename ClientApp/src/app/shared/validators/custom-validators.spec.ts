import { specialCharNotAllowedValidator } from './custom-validators';
import { AbstractControl } from '@angular/forms';
describe('specialCharNotAllowedValidator', () => {
  it('returns null for a valid alphanumeric name', () => {
    const control = { value: 'nana123' } as AbstractControl;
    expect(specialCharNotAllowedValidator(control)).toBeNull();
  });
  it('returns an error object for a name with special characters', () => {
    const control = { value: 'nana@' } as AbstractControl;
    expect(specialCharNotAllowedValidator(control)).toEqual({ specialCharNotAllowed: true });
  });
});

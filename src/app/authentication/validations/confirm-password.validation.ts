import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && confirmPassword.value !== '' && password.value !== confirmPassword.value) {
    return { confirmPasswordError: true };
  }

  return null;
};

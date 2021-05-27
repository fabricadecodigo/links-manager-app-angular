import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '@authentication/validations/confirm-password.validation';
@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss'],
})
export class ResetPasswordPageComponent implements OnInit {
  form = this.formBuild.group(
    {
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    { validator: confirmPasswordValidator }
  );

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.form.get('confirmPassword') as FormControl;
  }

  showPassword = false;
  showConfirmPassword = false;

  constructor(private formBuild: FormBuilder) {}

  ngOnInit(): void {}

  handleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  handleShowConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}

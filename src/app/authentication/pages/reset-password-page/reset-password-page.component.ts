import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordHandler } from '@authentication/business-rules/reset-password.handler';
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
  code = '';

  constructor(
    private formBuild: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private resetPasswordHandler: ResetPasswordHandler
  ) {}

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.queryParams.code;
  }

  handleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  handleShowConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async onSubmit(): Promise<void> {
    await this.resetPasswordHandler.execute(this.code, this.password.value);
  }
}

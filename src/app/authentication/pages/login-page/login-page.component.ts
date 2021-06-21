import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginHandler } from '@authentication/business-rules/login.handler';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form = this.formBuild.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  showPassword = false;

  constructor(private formBuild: FormBuilder, private loginHandler: LoginHandler) {}

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    await this.loginHandler.execute(this.email.value, this.password.value);
  }

  handleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
}

import { IAuthenticatedUserData } from './../../../onboarding/models/iauthenticated-user';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ChangePasswordHandler } from '@users/business-rules/change-password.handler';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  form = this.formBuild.group({
    password: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
  });

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }
  get newPassword(): FormControl {
    return this.form.get('newPassword') as FormControl;
  }

  @Input()
  user: IAuthenticatedUserData | undefined;

  constructor(private formBuild: FormBuilder, private changePasswordHandler: ChangePasswordHandler) {}

  ngOnInit(): void {
    console.log({ user: this.user });
  }

  async onSubmit(): Promise<void> {
    await this.changePasswordHandler.execute({
      id: this.user?.id.toString(),
      password: this.newPassword.value,
    });
  }
}

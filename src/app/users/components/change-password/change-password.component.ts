import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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

  constructor(private formBuild: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.form.value);
  }
}

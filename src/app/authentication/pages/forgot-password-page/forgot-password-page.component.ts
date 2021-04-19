import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
})
export class ForgotPasswordPageComponent implements OnInit {
  form = this.formBuild.group({
    email: ['', [Validators.required, Validators.email]],
  });

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  constructor(private formBuild: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.form.value);
  }
}

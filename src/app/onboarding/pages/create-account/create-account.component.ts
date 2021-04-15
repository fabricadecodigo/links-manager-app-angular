import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  form = this.formBuild.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', Validators.required],
    agreeTerms: [false, Validators.requiredTrue],
  });

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }
  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }
  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }
  get agreeTerms(): FormControl {
    return this.form.get('agreeTerms') as FormControl;
  }

  showPassword = false;

  constructor(private formBuild: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.form.value);
  }

  handleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
}

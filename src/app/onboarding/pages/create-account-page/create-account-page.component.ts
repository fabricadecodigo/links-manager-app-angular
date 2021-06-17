import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingHandler } from '@onboarding/business-rules/onboarding.handler';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.scss'],
})
export class CreateAccountPageComponent implements OnInit {
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

  constructor(private formBuild: FormBuilder, private router: Router, private onboardingHandler: OnboardingHandler) {}

  ngOnInit(): void {}

  handleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    const { agreeTerms, ...user } = this.form.value;
    this.onboardingHandler.addUser(user);
    this.router.navigate(['create-company']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingHandler } from '@onboarding/business-rules/onboarding.handler';

@Component({
  selector: 'app-create-company-page',
  templateUrl: './create-company-page.component.html',
  styleUrls: ['./create-company-page.component.scss'],
})
export class CreateCompanyPageComponent implements OnInit {
  form = this.formBuild.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    url: ['', [Validators.required, Validators.minLength(2)]],
  });

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }
  get url(): FormControl {
    return this.form.get('url') as FormControl;
  }

  constructor(private formBuild: FormBuilder, private router: Router, private onboardingHandler: OnboardingHandler) {}

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    this.onboardingHandler.addCompany({
      name: this.name.value,
      slug: this.url.value,
    });
    await this.onboardingHandler.execute();
    this.router.navigate(['onboarding-status']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private formBuild: FormBuilder, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.form.value);
    this.router.navigate(['onboarding-status']);
  }
}

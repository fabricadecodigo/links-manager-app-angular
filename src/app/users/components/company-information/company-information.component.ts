import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UpdateCompanyHandler } from '@users/business-rules/update-company.handler';
import { IAuthenticatedUserCompanyData } from './../../../onboarding/models/iauthenticated-user';

@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.scss'],
})
export class CompanyInformationComponent implements OnInit {
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

  @Input()
  company: IAuthenticatedUserCompanyData | undefined;

  constructor(private formBuild: FormBuilder, private updateCompanyHandler: UpdateCompanyHandler) {}

  ngOnInit(): void {
    if (this.company) {
      this.form.patchValue({
        name: this.company.name,
        url: this.company.slug,
      });
    }
  }

  onUrlBlur(): void {
    const slug = this.url.value;
    if (slug) {
      const newSlug = slug.split(' ').join('');
      this.url.setValue(newSlug);
    }
  }

  async onSubmit(): Promise<void> {
    await this.updateCompanyHandler.execute({
      id: this.company?.id.toString(),
      name: this.name.value,
      slug: this.url.value,
    });
  }
}

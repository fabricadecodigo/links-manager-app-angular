import { IAuthenticatedUserData } from '@onboarding/models/iauthenticated-user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@authentication/services/auth.service';
import { UpdatePersonalInformationHandler } from '@users/business-rules/update-personal-information.handler';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent implements OnInit {
  form = this.formBuild.group({
    name: ['', [Validators.required]],
    email: [''],
  });

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }
  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  user: IAuthenticatedUserData | undefined;

  constructor(
    private formBuild: FormBuilder,
    private authService: AuthService,
    private updatePersonalInformationHandler: UpdatePersonalInformationHandler
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.form.patchValue({
      name: this.user?.Name,
      email: this.user?.email,
    });
  }

  async onSubmit(): Promise<void> {
    await this.updatePersonalInformationHandler.execute({
      id: this.user?.id.toString(),
      Name: this.name.value,
    });
  }
}

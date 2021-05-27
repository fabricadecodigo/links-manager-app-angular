import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '@core/modules';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CompanyInformationComponent } from './components/company-information/company-information.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { MyAccountPageComponent } from './pages/my-account-page/my-account-page.component';

@NgModule({
  declarations: [
    MyAccountPageComponent,
    PersonalInformationComponent,
    ChangePasswordComponent,
    CompanyInformationComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, AngularMaterialModule],
})
export class UserModule {}

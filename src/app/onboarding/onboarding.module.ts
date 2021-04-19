import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '@core/modules';
import { CreateAccountPageComponent } from './pages/create-account-page/create-account-page.component';
import { CreateCompanyPageComponent } from './pages/create-company-page/create-company-page.component';
import { OnboardingFinishedPageComponent } from './pages/onboarding-finished-page/onboarding-finished-page.component';

@NgModule({
  declarations: [CreateAccountPageComponent, CreateCompanyPageComponent, OnboardingFinishedPageComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, AngularMaterialModule],
})
export class OnboardingModule {}

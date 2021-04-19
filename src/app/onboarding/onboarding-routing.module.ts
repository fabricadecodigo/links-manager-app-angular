import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountPageComponent } from './pages/create-account-page/create-account-page.component';
import { CreateCompanyPageComponent } from './pages/create-company-page/create-company-page.component';
import { OnboardingFinishedPageComponent } from './pages/onboarding-finished-page/onboarding-finished-page.component';

const routes: Routes = [
  {
    path: 'create-account',
    component: CreateAccountPageComponent,
  },
  {
    path: 'create-company',
    component: CreateCompanyPageComponent,
  },
  {
    path: 'onboarding-status',
    component: OnboardingFinishedPageComponent,
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class OnboardingRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthenticationRoutingModule {}

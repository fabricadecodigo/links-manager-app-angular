import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '@core/modules';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';

@NgModule({
  declarations: [LoginPageComponent, ForgotPasswordPageComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, AngularMaterialModule],
})
export class AuthenticationModule {}

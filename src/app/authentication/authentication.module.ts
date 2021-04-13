import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '@core/modules';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, ReactiveFormsModule, AngularMaterialModule],
})
export class AuthenticationModule {}

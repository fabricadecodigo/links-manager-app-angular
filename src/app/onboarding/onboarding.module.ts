import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '@core/modules';
import { CreateAccountComponent } from './pages/create-account/create-account.component';

@NgModule({
  declarations: [CreateAccountComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, AngularMaterialModule],
})
export class OnboardingModule {}

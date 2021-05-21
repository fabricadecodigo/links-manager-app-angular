import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '@core/modules';
import { LinksFormPageComponent } from './pages/links-form-page/links-form-page.component';
import { LinksListPageComponent } from './pages/links-list-page/links-list-page.component';

@NgModule({
  declarations: [LinksListPageComponent, LinksFormPageComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, AngularMaterialModule],
})
export class LinkModule {}

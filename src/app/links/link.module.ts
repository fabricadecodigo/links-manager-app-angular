import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksListPageComponent } from './pages/links-list-page/links-list-page.component';
import { AngularMaterialModule } from '@core/modules';

@NgModule({
  declarations: [LinksListPageComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, AngularMaterialModule],
})
export class LinkModule {}

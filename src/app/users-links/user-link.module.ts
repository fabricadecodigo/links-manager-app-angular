import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '@core/modules';
import { UsersLinksPageComponent } from './pages/users-links-page/users-links-page.component';

@NgModule({
  declarations: [UsersLinksPageComponent],
  imports: [CommonModule, RouterModule, AngularMaterialModule],
})
export class UserLinkModule {}

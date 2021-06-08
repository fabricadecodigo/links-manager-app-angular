import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedComponentModule } from '@core/components/shared-component.module';
import { AuthenticatedLayoutComponent } from './page-layout/authenticated-layout/authenticated-layout.component';
import { NonAuthenticatedLayoutComponent } from './page-layout/non-authenticated-layout/non-authenticated-layout.component';
import { UserLinksLayoutComponent } from './page-layout/user-links-layout/user-links-layout.component';

@NgModule({
  declarations: [NonAuthenticatedLayoutComponent, AuthenticatedLayoutComponent, UserLinksLayoutComponent],
  imports: [CommonModule, RouterModule, SharedComponentModule],
})
export class PageLayoutModule {}

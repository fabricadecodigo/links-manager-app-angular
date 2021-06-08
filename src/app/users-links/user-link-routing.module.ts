import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersLinksPageComponent } from './pages/users-links-page/users-links-page.component';

const routes: Routes = [
  {
    path: '',
    component: UsersLinksPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class UserLinkRoutingModule {}

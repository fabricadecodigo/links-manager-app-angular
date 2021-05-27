import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAccountPageComponent } from './pages/my-account-page/my-account-page.component';

const routes: Routes = [
  {
    path: 'my-account',
    component: MyAccountPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class UserRoutingModule {}

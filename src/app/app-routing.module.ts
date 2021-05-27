import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication-routing.module').then(
        (m) => m.AuthenticationRoutingModule
      ),
  },
  {
    path: 'links',
    loadChildren: () =>
      import('./links/link-routing.module').then(
        (m) => m.LinkRoutingModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/user-routing.module').then(
        (m) => m.UserRoutingModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./onboarding/onboarding-routing.module').then(
        (m) => m.OnboardingRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedLayoutComponent } from '@core/pages-layouts/page-layout/authenticated-layout/authenticated-layout.component';
import { NonAuthenticatedLayoutComponent } from '@core/pages-layouts/page-layout/non-authenticated-layout/non-authenticated-layout.component';
import { UserLinksLayoutComponent } from '@core/pages-layouts/page-layout/user-links-layout/user-links-layout.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AuthenticatedLayoutComponent,
    children: [
      {
        path: 'links',
        loadChildren: () => import('./links/link-routing.module').then((m) => m.LinkRoutingModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./users/user-routing.module').then((m) => m.UserRoutingModule),
      },
      {
        path: '',
        redirectTo: 'links',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'auth',
        component: NonAuthenticatedLayoutComponent,
        loadChildren: () =>
          import('./authentication/authentication-routing.module').then((m) => m.AuthenticationRoutingModule),
      },
      {
        path: '',
        component: NonAuthenticatedLayoutComponent,
        loadChildren: () => import('./onboarding/onboarding-routing.module').then((m) => m.OnboardingRoutingModule),
      },
      {
        path: ':slug',
        component: UserLinksLayoutComponent,
        loadChildren: () => import('./users-links/user-link-routing.module').then((m) => m.UserLinkRoutingModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

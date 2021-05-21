import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinksFormPageComponent } from './pages/links-form-page/links-form-page.component';
import { LinksListPageComponent } from './pages/links-list-page/links-list-page.component';

const routes: Routes = [
  {
    path: 'new',
    component: LinksFormPageComponent,
  },
  {
    path: 'edit/:id',
    component: LinksFormPageComponent,
  },
  {
    path: '',
    component: LinksListPageComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class LinkRoutingModule {}

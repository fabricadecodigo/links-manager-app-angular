import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinksListPageComponent } from './pages/links-list-page/links-list-page.component';

const routes: Routes = [
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

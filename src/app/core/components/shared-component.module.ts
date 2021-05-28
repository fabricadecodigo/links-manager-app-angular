import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AngularMaterialModule } from '@core/modules';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, RouterModule, AngularMaterialModule],
  exports: [ToolbarComponent]
})
export class SharedComponentModule {}

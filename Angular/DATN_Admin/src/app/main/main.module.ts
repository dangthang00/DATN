import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MainRoutes } from './main.route';
import { MainComponent } from './main.component';
import { ProductModule } from './product/product.module';
@NgModule({
  declarations: [ MainComponent],
  imports: [
    CommonModule,
    ProductModule,
    SharedModule,
    RouterModule.forChild(MainRoutes)
  ]
})
export class MainModule { }

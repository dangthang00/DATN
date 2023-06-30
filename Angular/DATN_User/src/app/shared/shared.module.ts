import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [HeaderComponent,
    FooterComponent,NgxPaginationModule],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule
  ]
})
export class SharedModule { }

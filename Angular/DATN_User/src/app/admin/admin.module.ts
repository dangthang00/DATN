
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { HomeService } from '../services/home.service';
import { FormsModule } from '@angular/forms';
import { adminRoutes } from './admin.route';




@NgModule({
  declarations: [
     AdminComponent,


  ],
  providers: [HomeService],
  imports: [

    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { homeRoutes } from './home.route';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { IndexComponent } from './index/index.component';
import { ShopComponent } from './shop/shop.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { HomeService } from '../services/home.service';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { DanhsachComponent } from './danhsach/danhsach.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    HomeComponent,
    IndexComponent,
    ShopComponent,
    ShopDetailComponent,
    CartComponent,
    BlogComponent,
    BlogDetailComponent,
    ContactComponent,
    AboutComponent,
    DanhsachComponent,
    LoginComponent,
    CheckoutComponent,

  ],
  providers: [HomeService],
  imports: [
    FormsModule,
    ReactiveFormsModule,
NgxPaginationModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(homeRoutes)
  ]
})
export class HomeModule { }
